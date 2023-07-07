/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { getScenario } from '../../actions/scenariiActions'
import type { Scenario } from '../../types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Table from '../Table'


export default function Scenario() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [scenario, setScenario] = useState<Scenario>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id)
      dispatch(getScenario(id)).then(res => setScenario(res.payload))
  }, [])

  return (
    scenario
      ?
      <>
        <Table
          headers={['Id', 'Author', 'Name', 'Level', 'Subject', 'Description', 'Created at', 'Updated at',]}
          data={[scenario]}
        />
        <Link to={`/scenarii/${id}/edit`} state={{ scenario: scenario }}>
          <button>Edit</button>
        </Link>
      </>
      : null
  )
}
