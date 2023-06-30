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
  display: inline-flex;
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

      li {
        a {
          padding: 15px 10px;
          color: ${theme.colors.primary};
        }
      }
    }
  }
`

export default StyledMainHeader