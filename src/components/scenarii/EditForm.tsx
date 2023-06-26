import React, { useState } from "react"
import { API_URL } from "../../config"
import axios from "axios"
import type { Scenario } from "../../types"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from '../../hooks/redux-hooks'
import { useForm } from "react-hook-form"
import { updateScenario } from "../../actions/scenariiActions"


export const Updated = () => {
  let location = useLocation()
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { scenario } = location.state
  const [updated, setUpdated] = useState<boolean>(false) // Used to redirect when the object is updated
  const { register, handleSubmit, formState: { errors } } = useForm<Scenario>()
  const onSubmit = (data: Scenario) => updateForm(data)

  const updateForm = async (data: any) => {
    const url = `${API_URL}/api/v1/scenarii/${scenario.id}`
    axios.patch(url, data).then((response) => {
      // Solution 1 :
      // dispatch(update({id: scenario.id, ...data}))
      // setUpdated(true)

      // Solution 2 :
      const promise = dispatch(updateScenario({id: scenario.id, ...data}))
      promise.then((_: any) => navigate(`/scenarii/${scenario.id}`, { replace: true }))
    })
  }

  // Solution 1 :
  // useEffect(() => {
  //  if (updated)
  //    navigate(`/scenarii/${scenario.id}`, { replace: true })
  // }, [updated])

  return (
    scenario
    ?
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" defaultValue={scenario.author} {...register('author', { required: true })} />
          <input type="text" defaultValue={scenario.name} {...register('name', { required: true })} />
          <input type="submit" />
        </form>
      </>
    : null
)
}