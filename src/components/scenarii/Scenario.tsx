import React, { useEffect, useState } from 'react'
import { API_URL } from '../../config'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Scenario } from '../../types'
import { Link } from 'react-router-dom'
import TableElement from '../Table'


export default function Scenario() {
  const { id } = useParams()
  const [scenario, setScenario] = useState<Scenario>()

  useEffect(() => {
    const config = `${API_URL}/api/v1/scenarii/${id}`
    axios.get(config).then((res: AxiosResponse) => setScenario(res.data))
  }, [])

  return (
    scenario
      ? <>
        <TableElement
          headers={['Author', 'Name', 'Level', 'Subject', 'Description', 'Created at', 'Updated at',]}
          data={[scenario]}
        />
        <Link to={`/scenarii/${id}/edit`} state={{ scenario: scenario }}>
          <button>Edit</button>
        </Link>
      </>
      : null
  )
}
