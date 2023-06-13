import React from "react"
import { API_URL } from "../../config"
import axios from "axios"
import type { Scenario } from "../../types"
import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { update } from "../../features/scenariiSlice"


export const Updated = () => {
  let location = useLocation()
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { scenario } = location.state
  const { register, handleSubmit, formState: { errors } } = useForm<Scenario>()
  const onSubmit = (data: Scenario) => updateForm(data)

  const updateForm = async (data: any) => {
    const url = `${API_URL}/api/v1/scenarii/${scenario.id}`
    axios.patch(url, data)
    dispatch(update({id: scenario.id, ...data}))
    navigate(`/scenarii/${scenario.id}`, { replace: true })
  }

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