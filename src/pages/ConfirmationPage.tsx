import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME } from '../config'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { confirmUser } from '../actions/authActions'
import { useAppDispatch } from '../hooks/redux-hooks'


export const ConfirmationPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const [error, setError] = useState<string | null>(null)

  let [searchParams, _] = useSearchParams()
  const confirmationToken = searchParams.get("confirmation_token") as string

  useEffect(() => {
    if (authToken) {
      navigate("/profile", { replace: true })
    }
  })

  const handleConfirm = () => {
    dispatch(confirmUser(confirmationToken))
      .then((response: any) => {
        if (response.error) {
          setError(t('errors.cannotConfirmAccount'));
        } else {
          navigate("/login", { replace: true })
        }
      })
  }

  return (
    <>
      <h3>{t('actions.confirmation')}</h3>
      <p>
        <span>{t('actions.clickOnTheLinkToConfirm')}</span>
        <button onClick={handleConfirm}>{t('actions.confirm')}</button>
      </p>
      <p>{error}</p>
    </>
  )
}
