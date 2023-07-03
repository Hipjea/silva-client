import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { theme } from '../../../config'


interface Props {
  to: string
  name: string
  className?: string
}

const ListElement = ({ to, name, ...rest }: Props) => {
  return (
    <li className={rest.className}>
      <NavLink {...rest}
        end to={to}
        className={({ isActive }) => isActive ? "active" : ""}
      >
        <span>{name}</span>
      </NavLink>
    </li>
  )
}

export const listElementCss = `
  & {
    a {
      text-decoration: none;
      padding: ${theme.navlink.paddingY} ${theme.navlink.paddingX};
      color: ${theme.colors.primary};

      &.active {
        position: relative;
        &::after {
          position: absolute;
          content: '';
          display: block;
          bottom: 0;
          left: ${theme.navlink.paddingX};
          width: calc(100% - (2 * ${theme.navlink.paddingX}));
          height: ${theme.navlink.activeHeight};
          background-color: ${theme.colors.primary};
        }
      }
    }
  }
`

const StyledListElement = styled(ListElement)`
  ${listElementCss}
`

export { StyledListElement }