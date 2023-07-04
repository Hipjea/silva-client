/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Banner from '../containers/Banner'
import { AuthStatus } from '../components/auth/AuthStatus'


export const ProfilePage = () => {
  return (
    <>
      <Banner>
        <h1 css={css`
        font-size: 2em;
      `}>
          Profile
        </h1>
      </Banner>

      <section>
        <AuthStatus />
      </section>
    </>
  )
}
