/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import headerImg from '../assets/images/silva-header.jpg'


const style = css`
  display: flex;
  justify-content: center;
  width: 100%;
  background-image: url(${headerImg});
  background-size: cover;
  padding: 50px 0;
  color: white;
`

interface Props {
  children: JSX.Element
  className?: string
}

const Banner = ({ children, className }: Props) => {
  return (
    <div css={style}>
      {children}
    </div>
  )
}

export default Banner