/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UserInfos from './UserInfos'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { updateUser } from '../../actions/authActions'
import { button } from '../../config'


type FormInputs = {
  email: string
  password: string
  firstname: string
  lastname: string
  register: string
}

export const UpdateForm = () => {
  const authState = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const [userInfos, setUserInfos] = useState<any>(authState.email ? authState : UserInfos())

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      firstname: userInfos?.firstname || "",
      lastname: userInfos?.lastname || ""
    }
  })

  const postForm = async (data: FormInputs) => {
    dispatch(updateUser(
      {
        user: {
          firstname: data.firstname,
          lastname: data.lastname
        }
      }
    )).then((response: any) => {
      if (response.error) {
        setError('register', { type: 'custom', message: response.payload });
      } else {
        setUserInfos(response.data)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit((data) => postForm(data))}>
      <div>
        <label>Firstname</label>
        <input {...register('firstname')} data-testid="firstname" />
        {errors.firstname && <p>Please enter your firstname.</p>}
      </div>
      <div>
        <label>Lastname</label>
        <input {...register('lastname')} data-testid="lastname" />
        {errors.lastname && <p>Please enter your lastname.</p>}
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
