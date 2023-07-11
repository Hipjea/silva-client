/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Card } from '../../types'
import { RootState } from '../../store'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { useSelector } from 'react-redux'
import { getCards } from '../../actions/cardsActions'
import { resultRow } from '../../config'

export default function Cards() {
  const cards = useSelector<RootState, Array<Card>>(state => state.cards.cards)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCards(null))
  }, [])

  return (
    <>
      {cards.map(card => {
        return card
          ? (
            <div css={resultRow} key={card.id}>
              <Link to={`${card.id}`}>
                <div>
                  {card.attributes.typeable_type}
                </div>
                <div>
                  {card.attributes.name}
                </div>
              </Link>
            </div>
          )
          : null
      })}
    </>
  )

}