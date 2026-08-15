import styled from "styled-components"

export const DjRadioWrapper = styled.div`
  width: 100%;
  padding: 12px 30px 24px;
  background: #0F1117;
  border: 1px solid #1F2230;
  border-top: none;

  @media (max-width: 768px) {
    padding: 12px 12px 24px;
  }

  /* ========== Section Header ========== */
  .section-header {
    position: relative;
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: none;

    .header-left {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      color: #E8E8E8;
      letter-spacing: -0.3px;
      margin: 0;
    }

    .subtitle {
      font-size: 12px;
      color: #666;
    }

    .more-link {
      margin-left: auto;
      font-size: 13px;
      color: #666;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: #E8E8E8;
      }
    }
  }

  /* ========== ① Banner Carousel ========== */
  .banner-section {
    margin-bottom: 16px;
  }

  .banner-carousel {
    position: relative;
    width: 100%;
    height: 220px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
  }

  .banner-track {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .banner-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;

    .slide-bg {
      position: absolute;
      inset: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(24px) brightness(0.32);
        transform: scale(1.1);
      }
    }

    .slide-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(0,0,0,0.45) 0%,
        transparent 45%,
        rgba(0,0,0,0.25) 100%
      );
    }

    .slide-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 28px;
      padding: 24px 36px;
      width: 100%;
    }

    .slide-cover {
      flex-shrink: 0;
      width: 120px;
      height: 120px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 6px 24px rgba(0,0,0,0.5);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .slide-info {
      flex: 1;
      min-width: 0;
      padding-bottom: 2px;

      .slide-title {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        line-height: 1.3;
        margin-bottom: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .slide-desc {
        font-size: 13px;
        color: rgba(255,255,255,0.55);
        line-height: 1.5;
        margin-bottom: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .slide-play-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 32px;
        padding: 0 18px;
        border-radius: 16px;
        background: #FF4D4F;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        transition: background 0.2s, transform 0.2s;

        &:hover {
          background: #ff6b6d;
          transform: scale(1.04);
        }

        &::before {
          content: "";
          display: block;
          width: 0;
          height: 0;
          border-left: 8px solid #fff;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
      }
    }
  }

  /* dots */
  .banner-dots {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 2;
  }

  .banner-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background 0.25s, transform 0.25s;

    &.active {
      background: #fff;
      transform: scale(1.3);
    }
  }

  /* ========== ② Small Card Grid ========== */
  .recommend-section {
    margin-bottom: 20px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    padding: 0 32px;
  }

  .sub-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: none;

    .sub-header-title {
      font-size: 15px;
      font-weight: 500;
      color: #ccc;
    }

    .sub-header-more {
      font-size: 12px;
      color: #666;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: #E8E8E8;
      }
    }
  }

  .program-card {
    border-radius: 8px;
    overflow: hidden;
    background: #161822;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.35);
    }

    .card-cover {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.35s ease;
      }

      .program-card:hover & img {
        transform: scale(1.05);
      }

      .card-play {
        position: absolute;
        right: 8px;
        bottom: 8px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #FF4D4F;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transform: translateY(5px);
        transition: opacity 0.22s ease, transform 0.22s ease,
                    background 0.15s ease;
        box-shadow: 0 3px 12px rgba(255,77,79,0.35);

        &:hover {
          background: #ff6b6d;
        }

        &::after {
          content: "";
          display: block;
          width: 0;
          height: 0;
          border-left: 8px solid #fff;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          margin-left: 2px;
        }
      }

      .program-card:hover & .card-play {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card-info {
      padding: 10px 12px;

      .card-title {
        font-size: 13px;
        font-weight: 500;
        color: #E8E8E8;
        line-height: 1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 4px;
      }

      .card-sub {
        font-size: 11px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  /* ========== ③ Ranking Section ========== */
  .ranking-section {
    /* ranking card provides its own visual container */
  }
`
