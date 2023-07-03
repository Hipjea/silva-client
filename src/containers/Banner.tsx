/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import headerImg from '../assets/images/silva-header.jpg'


const style = css`
  background-image: url(${headerImg});
  background-size: cover;
  background-position: 50%;

  .inner {
    backdrop-filter: blur(0px);
    width: 100%;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 50px 0;
    color: white;
    transition: all .25s ease-in-out;

    &:hover {
      backdrop-filter: blur(1.8px);
    }
  }
`

interface Props {
  children: JSX.Element
  className?: string
}

const Banner = ({ children, className }: Props) => {
  return (
    <div css={style}>
      <div className="inner">
        {children}
      </div>
    </div>
  )
}

export default Banner