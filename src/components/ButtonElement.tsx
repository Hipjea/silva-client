/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { button } from '../config'


interface Props {
  label: string
  callback: () => void
  className?: string
}

const ButtonElement = ({ label, callback, className }: Props) => {
  return (
    <button
      onClick={callback}
      css={css`${button}`}
      className={className}
    >
      {label}
    </button>
  )
}

export { type Props as ButtonElementProps, ButtonElement }