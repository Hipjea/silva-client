import React, { useEffect, useState } from "react"
import { API_URL } from "../../config"
import axios from "axios"
import { Link } from "react-router-dom"
import type { Scenarii } from "../../types"


export default function Scenarii() {

  const config = `${API_URL}/api/v1/scenarii`
  const [scenarii, setScenarii] = useState<Array<Scenarii>>([])

  useEffect(() => {
    axios.get(config)
      .then((response) => {
        setScenarii(response.data)
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
