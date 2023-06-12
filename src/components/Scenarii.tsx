import React, { useEffect, useState } from "react"
import { API_URL } from "../config"
import axios from "axios"

interface Scenario {
  id: number
  attributes: {
    author: string
    name: string
  }
}

export default function Scenarii() {
  const config = `${API_URL}/api/v1/scenarii`
  const [scenarii, setScenarii] = useState<Array<Scenario>>([])

  useEffect(() => {
    axios.get(config)
      .then((response) => {
        setScenarii(response.data)
      })
  }, [])

  console.log(scenarii)

  return (
    <>
      { scenarii.length &&
        scenarii.map(scenario => {
          { return scenario
            ? (
                <div className="scenario" key={scenario.id}>
                  <div>
                    {scenario.attributes.name}
                  </div>
                    <div>
                    {scenario.attributes.author}
                  </div>
                </div>
              )
            : null
          }
        })
      }
    </>
  )
}