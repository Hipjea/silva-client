/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { dropdown } from '../config'


interface StylesProps {
  isShown: boolean
}

interface Props {
  children: JSX.Element
  className?: string
  isShown: boolean
}

const Dropdown = ({ children, className, isShown, ...rest }: Props) => {
  const styles = ({ isShown }: StylesProps) => css`
    display: none;
    ${isShown === true &&
    `
      display: block;
    `}
  `

  return (
    <div
      css={styles({ isShown })}
      className={`dropdown-inner ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

const StyledDropdown = styled(Dropdown)`
  ${dropdown}
`

export { Dropdown, StyledDropdown }