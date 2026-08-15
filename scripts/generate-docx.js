import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType } from 'docx'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = join(__dirname, '..', 'docs')
const OUTPUT = join(__dirname, '..', 'X-Music-软件工程课设文档.docx')

const CHAPTERS = [
  '01-问题定义.md',
  '02-需求分析.md',
  '03-概要设计.md',
  '04-详细设计.md',
  '05-实现和测试.md',
]

function readAndParse(file) {
  const raw = readFileSync(join(DOCS_DIR, file), 'utf-8')
  const lines = raw.split('\n')
  const blocks = []
  let i = 0
  let inCode = false
  let codeBlock = []
  let inTable = false
  let tableRows = []

  while (i < lines.length) {
    const line = lines[i]

    // Code block
    if (line.trim().startsWith('```')) {
      if (inCode) {
        blocks.push({ type: 'code', content: codeBlock.join('\n') })
        codeBlock = []
        inCode = false
      } else {
        inCode = true
      }
      i++
      continue
    }
    if (inCode) {
      codeBlock.push(line)
      i++
      continue
    }

    // Table detection (markdown table)
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) { inTable = true; tableRows = [] }
      if (line.includes('---')) { i++; continue } // separator
      tableRows.push(line)
      // Check if next line is still table
      if (i + 1 >= lines.length || !lines[i + 1].startsWith('|')) {
        blocks.push({ type: 'table', rows: tableRows })
        inTable = false
        tableRows = []
      }
      i++
      continue
    }

    // Empty line
    if (line.trim() === '') {
      blocks.push({ type: 'empty' })
      i++
      continue
    }

    // Headings
    if (line.match(/^#### /)) {
      blocks.push({ type: 'h4', text: line.replace(/^#### /, '') })
      i++; continue
    }
    if (line.match(/^### /)) {
      blocks.push({ type: 'h3', text: line.replace(/^### /, '') })
      i++; continue
    }
    if (line.match(/^## /)) {
      blocks.push({ type: 'h2', text: line.replace(/^## /, '') })
      i++; continue
    }
    if (line.match(/^# /)) {
      blocks.push({ type: 'h1', text: line.replace(/^# /, '') })
      i++; continue
    }

    // Regular paragraph
    blocks.push({ type: 'p', text: line })
    i++
  }

  return blocks
}

function parseInlineText(text) {
  const runs = []
  // Bold **text**
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|(.+?))/g
  let match
  while ((match = regex.exec(text)) !== null) {
    if (match[2] !== undefined) {
      runs.push(new TextRun({ text: match[2], bold: true }))
    } else if (match[3] !== undefined) {
      runs.push(new TextRun({ text: match[3], font: 'Consolas', size: 20 }))
    } else if (match[4] !== undefined && match[4].length > 0) {
      runs.push(new TextRun({ text: match[4] }))
    }
  }
  return runs
}

function blocksToDocx(allBlocks) {
  const children = []

  for (const block of allBlocks) {
    switch (block.type) {
      case 'empty':
        children.push(new Paragraph({ spacing: { after: 100 } }))
        break

      case 'h1':
        children.push(new Paragraph({
          text: block.text,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        }))
        break

      case 'h2':
        children.push(new Paragraph({
          text: block.text,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 360, after: 180 },
        }))
        break

      case 'h3':
        children.push(new Paragraph({
          text: block.text,
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 280, after: 120 },
        }))
        break

      case 'h4':
        children.push(new Paragraph({
          text: block.text,
          heading: HeadingLevel.HEADING_4,
          spacing: { before: 200, after: 100 },
        }))
        break

      case 'code':
        for (const codeLine of block.content.split('\n')) {
          children.push(new Paragraph({
            children: [new TextRun({ text: codeLine || ' ', font: 'Consolas', size: 18 })],
            spacing: { after: 0, line: 260 },
          }))
        }
        children.push(new Paragraph({ spacing: { after: 120 } }))
        break

      case 'table': {
        const rows = block.rows.map(r =>
          r.split('|').filter(c => c.trim() !== '').map(c => c.trim())
        )
        if (rows.length === 0) break
        const colCount = Math.max(...rows.map(r => r.length))
        const tableRows = rows.map((row, ri) =>
          new TableRow({
            children: Array.from({ length: colCount }, (_, ci) =>
              new TableCell({
                children: [new Paragraph({
                  text: row[ci] || '',
                  alignment: AlignmentType.LEFT,
                })],
                width: { size: 100 / colCount, type: WidthType.PERCENTAGE },
                ...(ri === 0 ? {
                  shading: { fill: '2B579A' },
                  // children override for header
                } : {}),
              })
            ),
          })
        )
        // Fix: recreate header row with bold text
        const finalRows = rows.map((row, ri) => {
          return new TableRow({
            children: Array.from({ length: colCount }, (_, ci) =>
              new TableCell({
                children: [new Paragraph({
                  children: ri === 0
                    ? [new TextRun({ text: row[ci] || '', bold: true, color: 'FFFFFF' })]
                    : [new TextRun({ text: row[ci] || '' })],
                  alignment: AlignmentType.LEFT,
                })],
                width: { size: 100 / colCount, type: WidthType.PERCENTAGE },
                shading: ri === 0 ? { fill: '2B579A' } : (ri % 2 === 0 ? { fill: 'F2F2F2' } : undefined),
              })
            ),
          })
        })
        children.push(new Table({
          rows: finalRows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        }))
        children.push(new Paragraph({ spacing: { after: 200 } }))
        break
      }

      case 'p':
        children.push(new Paragraph({
          children: parseInlineText(block.text),
          spacing: { after: 80, line: 320 },
        }))
        break
    }
  }

  return children
}

async function main() {
  let allBlocks = []

  // Title page
  allBlocks.push({ type: 'empty' })
  allBlocks.push({ type: 'empty' })
  allBlocks.push({ type: 'h1', text: 'X-Music 音乐播放器' })
  allBlocks.push({ type: 'h2', text: '软件工程课程设计文档' })
  allBlocks.push({ type: 'empty' })
  allBlocks.push({ type: 'p', text: '基于 React + TypeScript + Node.js 的网易云音乐第三方Web播放器' })
  allBlocks.push({ type: 'empty' })
  allBlocks.push({ type: 'empty' })
  allBlocks.push({ type: 'p', text: '小组成员：___________________________' })
  allBlocks.push({ type: 'p', text: '学　　号：___________________________' })
  allBlocks.push({ type: 'p', text: '日　　期：2026年8月5日' })
  allBlocks.push({ type: 'empty' })
  allBlocks.push({ type: 'empty' })

  for (const chapter of CHAPTERS) {
    const blocks = readAndParse(chapter)
    allBlocks = allBlocks.concat(blocks)
  }

  const children = blocksToDocx(allBlocks)

  const doc = new Document({
    sections: [{
      properties: {},
      children,
    }],
    styles: {
      default: {
        document: {
          run: { font: '宋体', size: 22 },
        },
      },
      paragraphStyles: [],
    },
  })

  const buffer = await Packer.toBuffer(doc)
  writeFileSync(OUTPUT, buffer)
  console.log(`✅ Word document generated: ${OUTPUT}`)
}

main().catch(err => { console.error(err); process.exit(1) })
