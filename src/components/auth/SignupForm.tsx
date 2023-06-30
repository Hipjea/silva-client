/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { signupUser } from '../../actions/authActions'
import { button } from '../../config'


type FormInputs = {
  email: string
  password: string
  firstname: string
  lastname: string
  register: string
}

export const SignupForm = () => {
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
        <label>Firstname</label>
        <input {...register('firstname')} value="jean" data-testid="firstname" />
        {errors.firstname && <p>Please enter your firstname.</p>}
      </div>
      <div>
        <label>Lastname</label>
        <input {...register('lastname')} value="jean" data-testid="lastname" />
        {errors.lastname && <p>Please enter your lastname.</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email', { required: true })} data-testid="email" />
        {errors.email && <p>Please enter your email.</p>}
      </div>
      <div>
        <label>Password</label>
        <input type='password' {...register('password')} value="password" data-testid="password" />
        {errors.password && <p>Please enter your password.</p>}
      </div>
      {errors.register ?
        <p>
          {errors.register.message}
          <button type="button" onClick={() => { clearErrors(); }}>Retenter</button>
        </p>
        : <input type='submit' data-testid="submit" css={css`${button}`} />
      }
    </form>
  )
}
