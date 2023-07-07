/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { IScenario } from '../../types'
import { RootState } from '../../store'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { useSelector } from 'react-redux'
import { getScenarii } from '../../actions/scenariiActions'
import { resultRow } from '../../config'


export default function Scenarii() {
  const scenarii = useSelector<RootState, Array<IScenario>>(state => state.scenarii.scenarii)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getScenarii(null))
  }, [])

  return (
    <>
      {scenarii.map(scenario => {
        {
          return scenario
            ? (
              <div css={resultRow} key={scenario.id}>
                <Link to={`${scenario.id}`}>
                  <div>
                    {scenario.attributes.name}
                  </div>
                  <div>
                    {scenario.attributes.author}
                  </div>
                </Link>
              </div>
            )
            : null
        }
      })}
    </>
  )
}
