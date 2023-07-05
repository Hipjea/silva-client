/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { loginUser } from '../../actions/authActions'
import { button } from '../../config'
import { useTranslation } from 'react-i18next'


type FormInputs = {
  email: string
  password: string
  login: string
}

export const LoginForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [loginAttempt, setLoginAttempt] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>()

  useEffect(() => {
    if (loginAttempt) {
      navigate(location.state && location.state.from.pathname ? location.state.from.pathname : '/', { replace: true })
    }
  }, [loginAttempt])

  const postForm = async (data: any) => {
    dispatch(loginUser(
      {
        user: {
          email: data.email,
          password: data.password
        }
      }
    )).then((response: any) => {
      if (response.error) {
        setError('login', { type: 'custom', message: response.payload });
      } else {
        setLoginAttempt(true)
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit((data) => postForm(data))}>
        <div>
          <label>{t('fields.email')}</label>
          <input {...register('email', { required: true })} data-testid='email' />
          {errors.email && <p>{t('errors.pleaseEnterField', { field: t('fields.email') })}</p>}
        </div>
        <div>
          <label>{t('fields.password')}</label>
          <input type='password' {...register('password')} data-testid=' password' />
          {errors.password && <p>{t('errors.pleaseEnterField', { field: t('fields.password') })}</p>}
        </div>
        {errors.login ?
          <p>
            {errors.login.message}
            <button type='button' onClick={() => { clearErrors(); }}>{t('actions.retry')}</button>
          </p>
          : <input type='submit' data-testid='submit' css={css`${button}`} />
        }
      </form>
      <Link to='/register'>{t('actions.signUp')}</Link>
    </>
  )
}
