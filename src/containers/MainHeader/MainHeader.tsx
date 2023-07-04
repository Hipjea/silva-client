import styled from '@emotion/styled'
import { theme } from '../../config'


interface Props {
  children: JSX.Element
  className?: string
}

const MainHeader = ({ children, className }: Props) => {
  return (
    <header className={className}>
      {children}
    </header>
  )
}

const StyledMainHeader = styled(MainHeader)`
  display: flex;
  width: 100%;

  nav {
    display: flex;
    align-items: center;
    flex-grow: 1;

    ul {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      justify-content: flex-end;
      list-style: none;
      padding-left: 0;
      padding-right: ${theme.navbar.paddingX}
    }
  }
`

export default StyledMainHeader