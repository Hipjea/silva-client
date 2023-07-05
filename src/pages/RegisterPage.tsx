import { SignupForm } from '../components/auth/SignupForm'
import { useTranslation } from 'react-i18next'


export const RegisterPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <h3>{t('actions.signUp')}</h3>
      <SignupForm />
    </>
  )
}
