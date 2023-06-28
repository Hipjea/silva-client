/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'


const style = css`
  color: hotpink;
`

interface Props {
  label: string
  callback: () => void
}

const ButtonElement = ({ label, callback }: Props) => {
  return (
    <button
      onClick={callback}
      css={style}
    >
      {label}
    </button>
  )
}

export { type Props as ButtonElementProps, ButtonElement }