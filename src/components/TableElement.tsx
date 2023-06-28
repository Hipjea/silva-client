import React from "react"
import { nanoid } from "nanoid"


interface DataProps {
    [key: string]: any
}

interface Props {
    headers: Array<string>
    data: Array<DataProps>
}

const TableElement = ({ headers, data }: Props) => {
    return (
        <table key={nanoid()}>
            <thead key={nanoid()}>
                <tr key={nanoid()}>
                    { headers.map(header => {
                        return (
                            <th scope="col" key={nanoid()}>
                                {header}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody key={nanoid()}>
                { data.map(trData => {
                    return (
                        <tr key={nanoid()}>
                            { Object.entries(trData).map(([key, val]: any) => {
                                return (
                                    <td key={key}>
                                        {val}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}

export default TableElement
