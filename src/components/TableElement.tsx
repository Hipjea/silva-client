/** @jsxRuntime classic */
/** @jsx jsx */
import { nanoid } from "nanoid"
import { jsx, css } from '@emotion/react'


const style = css`
  color: hotpink;
`

interface DataProps {
    [key: string]: any
}

interface Props {
    headers: Array<string>
    data: Array<DataProps>
}

const TableElement = ({ headers, data }: Props) => {
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

export default TableElement
