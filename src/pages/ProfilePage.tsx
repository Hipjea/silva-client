/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Banner from '../containers/Banner'
import { AuthStatus } from '../components/auth/AuthStatus'
import { UpdateForm } from "../components/auth/UpdateForm"
import { main } from '../config'


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

      <section css={main({ withPadding: true })}>
        <AuthStatus />

        <UpdateForm />
      </section>
    </>
  )
}
