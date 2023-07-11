import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Card } from '../types'


export interface CardState {
  cards: Array<Card>
}

const initialState: CardState = {
  cards: []
}

/**
 * Cards slice containing the reducers
 */
export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    fetchAll: (state, action: PayloadAction<Array<Card>>) => {
      state.cards = action.payload
    },
    update: (state, action) => {
      const { id, name } = action.payload
      const existingCard = state.cards.find(card => card.id == id)

      if (existingCard) {
        existingCard.attributes.name = name
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { fetchAll, update } = cardsSlice.actions

export default cardsSlice.reducer
