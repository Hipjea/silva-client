import { Card } from "../../types"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from '../../hooks/redux-hooks'
import { useForm } from "react-hook-form"
import { updateCard } from "../../actions/cardsActions"

export const CardEditForm = () => {
  let location = useLocation()
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { card } = location.state
  const { register, handleSubmit, formState: {errors} } = useForm<Card>()
  const onSubmit = (data: Card) => updateForm(data)

  const updateForm = async (data: any) => {
    const promise = dispatch(updateCard({ id: card.id, data: { id: card.id, ...data } }))
    promise.then((_: any) => navigate(`/cards/${card.id}`, { replace: true }))
  }

  return (
    card
    ?
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" defaultValue={card.name} {...register('attributes.name', { required: true })} />
          <textarea defaultValue={card.description} {...register('attributes.description', { required: true })} />
          <input type="submit" />
        </form>
    </>
    : null
  )
}