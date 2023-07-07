/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { getCard } from '../../actions/cardsActions'
import type { Card } from '../../types'
import { useTranslation } from 'react-i18next'


export default function Card() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [card, setCard] = useState<Card>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id)
      dispatch(getCard(id)).then((res: any) => setCard(res.payload))
  }, [])

  return (
    card
      ?
      <>
        Card
      </>
      : null
  )
}
