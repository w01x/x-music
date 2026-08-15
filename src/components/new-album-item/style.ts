import styled from 'styled-components'

export const AlbumItemWrapper = styled.div`
  .top {
    display: block;
    position: relative;
    width: 118px;
    height: 100px;
    overflow: hidden;
    margin-top: 15px;

    img {
      width: 100px;
      height: 100px;
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: linear-gradient(transparent 60%, rgba(0,0,0,0.3));
    }
  }
  .bottom {
    font-size: 12px;
    width: 100px;
    .name {
      color: #E0E0E0;
      ${(props) => props.theme.mixin.textNowrap}
    }

    .artist {
      color: #6A6A6A;
      ${(props) => props.theme.mixin.textNowrap}
    }
  }
`
