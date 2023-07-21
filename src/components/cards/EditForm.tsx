import { useEffect, useState } from 'react'
import { AutoComplete, Input } from 'antd'
import { Card } from '../../types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { getCards, updateCard } from '../../actions/cardsActions'


export const CardEditForm = () => {
  let location = useLocation()
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { card } = location.state
  const cards = useSelector<RootState, Array<Card>>(state => state.cards.cards)
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<Card>()
  const onSubmit = (data: Card) => updateForm(data)
  const [options, setOptions] = useState<Array<{}>>([])

  useEffect(() => {
    dispatch(getCards(null))
  }, [])

  useEffect(() => {
    setOptions(cards.map(card => { return { label: card.attributes.name, value: card.id } }))
  }, [cards])

  const updateForm = async (data: any) => {
    const promise = dispatch(updateCard({ id: card.id, data: { id: card.id, ...data } }))
    promise.then((_: any) => navigate(`/cards/${card.id}`, { replace: true }))
  }

  const [selectedOption, setSelectedOption] = useState('')
  const [inputValue, setInputValue] = useState('')

  const onSelect = (data: any, option: any) => {
    setSelectedOption(option)
    setInputValue(option.label)
  };

  const onChange = (data: any, option: any) => {
    setInputValue(data)
    setSelectedOption(option)
    setValue('predators_attributes', option.value)
  };

  return (
    card
      ?
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type='text' defaultValue={card.name} {...register('attributes.name', { required: { value: true, message: "Champ requis" } })} />
            {errors.attributes?.name && <p>{errors.attributes.name.message}</p>}
          </div>
          <div>
            <textarea defaultValue={card.description} {...register('attributes.description', { required: { value: true, message: "Champ requis" } })} />
            {errors.attributes?.description && <p>{errors.attributes.description.message}</p>}
          </div>
          <div>
            <Controller
              render={({ field }) =>
                <AutoComplete
                  value={inputValue}
                  options={options}
                  style={{ width: 200 }}
                  onSelect={onSelect}
                  onChange={onChange}
                />
              }
              name='predators_attributes'
              control={control}
              rules={{ required: { value: true, message: "Champ requis" } }}
            />
            {errors.predators_attributes && <p>{errors.predators_attributes.message}</p>}
          </div>
          <input type='submit' />
        </form>
      </>
      : null
  )
}