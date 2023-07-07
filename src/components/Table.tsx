/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { nanoid } from "nanoid"
import { theme } from '../config'


const style = css`
  display: table;

  thead {
    tr {
      border-bottom: 1px solid ${theme.colors.secondary};

      th {
        color: ${theme.colors.primary};
        font-weight: bold;
        text-align: left;
        padding: ${theme.table.cellPadding};
      }
    }
  }

  tbody {
    tr {
      td {
        padding: ${theme.table.cellPadding};
      }
    }
  }
`

interface DataProps {
  [key: string]: any
}

interface Props {
  headers: Array<string>
  data: Array<DataProps>
}

const Table = ({ headers, data }: Props) => {
  return (
    <table key={nanoid()} css={style}>
      <thead key={nanoid()}>
        <tr key={nanoid()}>
          {headers.map(header => {
            return (
              <th scope="col" key={nanoid()}>
                {header}
              </th>
            )
          })}
        </tr>
      </thead>

      <tbody key={nanoid()}>
        {data.map(trData => {
          return (
            <tr key={nanoid()}>
              {Object.entries(trData).map(([key, val]: any) => {
                return (
                  <td key={key}>
                    {val}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


export default Table
