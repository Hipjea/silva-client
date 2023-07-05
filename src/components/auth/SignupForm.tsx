/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { signupUser } from '../../actions/authActions'
import { button } from '../../config'
import { useTranslation } from 'react-i18next'


type FormInputs = {
  email: string
  password: string
  firstname: string
  lastname: string
  register: string
}

export const SignupForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [signupAttempt, setSignupAttempt] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>()

  useEffect(() => {
    if (signupAttempt) {
      navigate("/", { replace: true })
    }
  }, [signupAttempt])

  const postForm = async (data: FormInputs) => {
    dispatch(signupUser(
      {
        user: {
          email: data.email,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname
        }
      }
    )).then((response: any) => {
      if (response.error) {
        setError('register', { type: 'custom', message: response.payload });
      } else {
        setSignupAttempt(true)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit((data) => postForm(data))}>
      <div>
        <label>{t('fields.firstname')}</label>
        <input {...register('firstname')} value="jean" data-testid="firstname" />
        {errors.firstname && <p>{t('errors.pleaseEnterField', { field: t('fields.firstname').toLowerCase() })}</p>}
      </div>
      <div>
        <label>{t('fields.lastname')}</label>
        <input {...register('lastname')} value="jean" data-testid="lastname" />
        {errors.lastname && <p>{t('errors.pleaseEnterField', { field: t('fields.lastname').toLowerCase() })}</p>}
      </div>
      <div>
        <label>{t('fields.email')}</label>
        <input {...register('email', { required: true })} data-testid="email" />
        {errors.email && <p>{t('errors.pleaseEnterField', { field: t('fields.email').toLowerCase() })}</p>}
      </div>
      <div>
        <label>{t('fields.password')}</label>
        <input type='password' {...register('password')} value="password" data-testid="password" />
        {errors.password && <p>{t('errors.pleaseEnterField', { field: t('fields.password').toLowerCase() })}</p>}
      </div>
      {errors.register ?
        <p>
          {errors.register.message}
          <button type="button" onClick={() => { clearErrors(); }}>{t('actions.retry')}</button>
        </p>
        : <input type='submit' data-testid="submit" css={css`${button}`} />
      }
    </form>
  )
}
