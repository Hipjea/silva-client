/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { button } from '../config'
import { theme } from '../config'


interface Props {
  label: string
  callback: () => void
  isPushed: boolean
  disabled: boolean
  className?: string
}

const ButtonElement = ({ label, callback, isPushed, disabled, ...rest }: Props) => {
  const disabledButton = isPushed || disabled
  const color = isPushed ? theme.colors.secondary : theme.colors.primary

  return (
    <button
      disabled={disabledButton}
      color={color}
      onClick={callback}
      {...rest}
    >
      {label}
    </button>
  )
}

const StyledButton = styled(ButtonElement)`
  ${button}
  &:hover,
  &:disabled {
    color: white;
    transition: all 0.5s ease;
    background-color: ${theme.colors.secondary};
    border-color: ${theme.colors.secondary};
  }
`

export { type Props as ButtonElementProps, ButtonElement, StyledButton }