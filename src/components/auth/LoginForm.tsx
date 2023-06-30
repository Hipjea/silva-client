/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { loginUser } from '../../actions/authActions'
import { button } from '../../config'


export const LoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loginAttempt, setLoginAttempt] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (loginAttempt) {
      navigate(location.state && location.state.from.pathname ? location.state.from.pathname : "/", { replace: true })
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
    )).then(() => {
      setLoginAttempt(true)
    })
  }

  return (
    <form onSubmit={handleSubmit((data) => postForm(data))}>
      <input {...register('email', { required: true })} value='test@localhost.com' data-testid="email" />
      {errors.email && <p>Please enter your email.</p>}
      <input type='password' {...register('password')} value="password" data-testid="password" />
      {errors.password && <p>Please enter your password.</p>}
      <input type='submit' data-testid="submit" css={css`${button}`} />
    </form>
  )
}
