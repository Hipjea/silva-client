/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import UserInfos from './UserInfos'
import type { RootState } from '../../store'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { updateUser } from '../../actions/authActions'
import { button } from '../../config'
import { useTranslation } from 'react-i18next'


type FormInputs = {
  email: string
  password: string
  firstname: string
  lastname: string
  register: string
}

export const UpdateForm = () => {
  const { t } = useTranslation()
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
        <label>{t('fields.firstname')}</label>
        <input {...register('firstname')} data-testid="firstname" />
        {errors.firstname && <p>{t('errors.pleaseEnterField', { field: t('fields.firstname') })}</p>}
      </div>
      <div>
        <label>{t('fields.lastname')}</label>
        <input {...register('lastname')} data-testid="lastname" />
        {errors.lastname && <p>{t('errors.pleaseEnterField', { field: t('fields.lastname') })}</p>}
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
