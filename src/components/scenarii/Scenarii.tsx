import React, { useEffect } from "react"
import { API_URL } from "../../config"
import axios from "axios"
import { Link } from "react-router-dom"
import type { IScenario } from "../../types"
import { RootState } from "../../store"
import { useDispatch, useSelector } from 'react-redux'
import { populate } from '../../slices/scenariiSlice'


export default function Scenarii() {
  const config = `${API_URL}/api/v1/scenarii`
  const scenarii = useSelector<RootState, Array<IScenario>>(state => state.scenarii.scenarii)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(config)
      .then((response) => {
        dispatch(populate(response.data))
      })
  }, [])

  return (
    <>
      { scenarii.map(scenario => {
          { return scenario
            ? (
                <div className="scenario" key={scenario.id}>
                  <div>
                    {scenario.attributes.name}
                  </div>
                    <div>
                    {scenario.attributes.author}
                  </div>
                  <Link to={`${scenario.id}`}>Scenario Page</Link>
                </div>
              )
            : null
          }
        })
      }
    </>
  )
}
