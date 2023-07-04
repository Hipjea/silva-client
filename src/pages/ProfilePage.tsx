/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Banner from '../containers/Banner';


export const ProfilePage = () => {
  return (
    <Banner>
      <h1 css={css`
        font-size: 2em;
      `}>
        Profile
      </h1>
    </Banner>
  )
}
