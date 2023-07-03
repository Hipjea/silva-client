import styled from '@emotion/styled'


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
  max-width: 1040px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;

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
    }
  }
`

export default StyledMainHeader