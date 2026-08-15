import styled from 'styled-components'

export const SearchWrapper = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 35px 0 80px;
  min-height: 700px;

  .search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 35px;
    position: relative;
  }

  .search-box {
    width: 100%;
    max-width: 620px;
    position: relative;
  }

  .search-main {
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.color.card};
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.color.border};
    transition: all 0.25s ease;

    &:focus-within {
      border-color: #FF4D4F;
      box-shadow: 0 4px 20px rgba(255, 77, 79, 0.12);
    }

    .search-icon {
      color: #888;
      margin-left: 16px;
      flex-shrink: 0;
    }
  }

  .search-input {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 18px;
    font-size: 15px;
    background: transparent;
    color: ${(props) => props.theme.color.textPrimary};

    &::placeholder {
      color: ${(props) => props.theme.color.textTertiary};
    }
  }

  .search-btn {
    width: 110px;
    height: 100%;
    border: none;
    background: #FF4D4F;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: ${(props) => props.theme.color.primaryHover};
    }
  }

  .keywords {
    margin-bottom: 18px;
    padding-left: 4px;
    color: ${(props) => props.theme.color.textTertiary};
    font-size: 14px;

    span {
      color: #FF4D4F;
      font-weight: 600;
    }
  }

  .list-wrapper {
    background: ${(props) => props.theme.color.card};
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.color.border};
  }

  .header {
    height: 46px;
    display: grid;
    grid-template-columns: 4fr 2fr 3fr 80px;
    align-items: center;
    padding: 0 20px;
    background: #1A1D26;
    border-bottom: 1px solid ${(props) => props.theme.color.border};
    font-size: 13px;
    color: ${(props) => props.theme.color.textTertiary};
    user-select: none;
  }

  .song-list {
    width: 100%;
  }

  .song-item {
    height: 58px;
    display: grid;
    grid-template-columns: 4fr 2fr 3fr 80px;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid ${(props) => props.theme.color.border};

    &:hover {
      background: rgba(255, 255, 255, 0.04);
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .song-name {
    display: flex;
    align-items: center;
    overflow: hidden;

    .name-text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: ${(props) => props.theme.color.textPrimary};
      font-size: 14px;
      font-weight: 500;
    }
  }

  .artist-name,
  .album-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.color.textTertiary};
    font-size: 13px;
  }

  .song-link {
    color: ${(props) => props.theme.color.textPrimary};
    cursor: pointer;

    &:hover {
      color: #FF4D4F;
    }
  }

  .artist-link {
    color: ${(props) => props.theme.color.textTertiary};
    cursor: pointer;

    &:hover {
      color: #FF4D4F;
    }
  }

  .duration {
    font-size: 12px;
    color: ${(props) => props.theme.color.textTertiary};
  }

  .empty {
    padding-top: 120px;
    text-align: center;

    .empty-icon {
      font-size: 72px;
      opacity: 0.4;
      margin-bottom: 18px;
    }

    .empty-text {
      font-size: 15px;
      color: #888;
      text-align: center;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .discover {
    margin-top: 30px;

    .empty-text {
      font-size: 15px;
      color: #888;
      text-align: center;
    }
  }

  .hot-search {
    margin-top: 40px;
    background: ${(props) => props.theme.color.card};
    border-radius: 12px;
    padding: 20px;

    .title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
      color: ${(props) => props.theme.color.textPrimary};
    }

    .hot-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .hot-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: ${(props) => props.theme.color.cardHover};
      }

      .index {
        width: 30px;
        font-weight: bold;
        color: #FF4D4F;
      }

      .word {
        flex: 1;
        font-size: 15px;
        color: ${(props) => props.theme.color.textPrimary};
      }

      .score {
        color: ${(props) => props.theme.color.textTertiary};
        font-size: 13px;
      }
    }
  }

  .suggest-list {
    position: absolute;
    top: 56px;
    left: 0;
    width: 100%;
    background: ${(props) => props.theme.color.card};
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
    border: 1px solid ${(props) => props.theme.color.border};
    overflow: hidden;
    z-index: 999;
  }

  .suggest-item {
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
    color: ${(props) => props.theme.color.textPrimary};

    &:hover {
      background: ${(props) => props.theme.color.cardHover};
      color: #FF4D4F;
    }
  }
`
