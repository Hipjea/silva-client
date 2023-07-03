/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Banner from '../containers/Banner';


export const HomePage = () => {
  return (
    <Banner>
      <h1 css={css`
        font-size: 2em;
      `}>
        Public
      </h1>
    </Banner>
  )
}
