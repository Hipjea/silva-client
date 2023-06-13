import React, { useEffect, useState } from "react"
import { API_URL } from "../../config"
import { useParams } from "react-router-dom"
import axios from "axios"
import type { AxiosResponse } from "axios"
import type { Scenario } from "../../types"
import { Link } from "react-router-dom"


export default function Scenario() {
  const { id } = useParams()
  const [scenario, setScenario] = useState<Scenario>()
  const config = `${API_URL}/api/v1/scenarii/${id}`

  useEffect(() => {
    axios.get(config).then((res: AxiosResponse) => setScenario(res.data))
  }, [])

  return (
    scenario
      ? <>
          <table>
            <thead>
              <tr>
                <th>Author</th>
                <th>Name</th>
                <th>Level</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Created at</th>
                <th>Updated at</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{scenario.author}</td>
                <td>{scenario.name}</td>
                <td>{scenario.level}</td>
                <td>{scenario.subject}</td>
                <td>{scenario.description}</td>
                <td>{scenario.created_at}</td>
                <td>{scenario.updated_at}</td>
                </tr>
            </tbody>
          </table>
          <Link to={`/scenarii/${id}/edit`} state={{ scenario: scenario }}>
            <button>Edit</button>
          </Link>
        </>
      : null
  )
}
