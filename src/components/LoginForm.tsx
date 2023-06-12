import React from "react"
import { useForm } from "react-hook-form"
import {
  useNavigate,
  useLocation
} from "react-router-dom"
import Cookies from "js-cookie"
import { API_URL, CLIENT_TOKEN_NAME } from "../config"
import { useAuth } from "../Auth"


export default function LoginForm() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const postForm = async (data: any) => {
    const JSONdata = JSON.stringify({ user: data })
    const endpoint = `${API_URL}/login`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    const authHeader = response.headers.get('Authorization') as string

    if (authHeader.startsWith("Bearer ")) {
      const accessToken = authHeader.substring(7, authHeader.length);
      Cookies.set(CLIENT_TOKEN_NAME, accessToken, { secure: true })

      auth.signin(data.email, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });
    } else {
      console.log("error, no token found")
    }
  }

  return (
    <form onSubmit={handleSubmit((data) => postForm(data))}>
      <input {...register('email', { required: true })} value="test@localhost.com" />
      {errors.email && <p>Please enter your email.</p>}
      <input type="password" {...register('password')} />
      {errors.password && <p>Please enter your password.</p>}
      <input type="submit" />
    </form>
  )
}
