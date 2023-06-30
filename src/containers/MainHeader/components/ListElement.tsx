import { Link } from 'react-router-dom'


interface Props {
  to: string
  name: string
}

const ListElement = ({ to, name }: Props) => {
  return (
    <li>
      <Link to={to}>{name}</Link>
    </li>
  )
}

export default ListElement