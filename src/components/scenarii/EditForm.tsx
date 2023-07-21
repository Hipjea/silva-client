import type { Scenario } from "../../types"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from '../../hooks/redux-hooks'
import { useForm } from "react-hook-form"
import { updateScenario } from "../../actions/scenariiActions"


export const ScenarioEditForm = () => {
  let location = useLocation()
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { scenario } = location.state
  const { register, handleSubmit, formState: { errors } } = useForm<Scenario>()
  const onSubmit = (data: Scenario) => updateForm(data)

  const updateForm = async (data: any) => {
    const promise = dispatch(updateScenario({ id: scenario.id, data: { ...data } }))
    promise.then((_: any) => navigate(`/scenarii/${scenario.id}`, { replace: true }))
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
