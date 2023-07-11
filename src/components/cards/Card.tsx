/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { getCard } from '../../actions/cardsActions'
import type { Card } from '../../types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Table from '../Table'


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
        <Table
          headers={['Id', 'Name', 'Description', 'note', 'typeable_type', 'typeable_id', 'Created at', 'Updated at',]}
          data={[card]}
        />
        <Link to={`/cards/${id}/edit`} state={{ card: card }}>
          <button>Edit</button>
        </Link>
      </>
      : null
  )
}
