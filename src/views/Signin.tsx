import {Button }from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

import * as yup from "yup";
import {useNavigate} from 'react-router-dom';
import {signIn} from '../api/auth';
import {AxiosError} from 'axios';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../contexts/auth';
import {flushSync} from 'react-dom';
import {ErrorData, parseErrorMessage} from '../util';
import {ToasterContext} from '../contexts/toast';

interface Signin {
  email: string
  password: string
}

const schema = yup.object<Signin>({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
}).required();

export default function () {
  const { register, handleSubmit, formState:{ errors } } = useForm<Signin>({
    resolver: yupResolver(schema)
  });

  const authContext = useContext(AuthContext)
  const toast = useContext(ToasterContext)
  const navigate = useNavigate()
  const onSubmit = async (data: Signin) =>  {
    try {
      await signIn(data)
      flushSync(() => {
        authContext?.setAuthState({
          email: "hi@hi.com",
          isAdmin: false,
          isLoggedIn: true
        })
      })
      navigate('/questions')
    } catch (e: unknown) {
      toast.current?.show({
        severity: 'error',
        summary: parseErrorMessage(e as AxiosError<ErrorData>)
      })
    }
  }
  useEffect(() => {
    // console.log(process.env)
  }, [])
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
        <label htmlFor="email1" className="block text-900 font-medium mb-2">Email</label>
        <InputText id="email1" value="ashfaq@dev.com" type="text" className="w-full mb-3"
          {...register("email")}
        />

        <label htmlFor="password1" className="block text-900 font-medium mb-2">Password</label>
        <InputText id="password1" type="password" value="ashfaq" className="w-full mb-3"
          {...register("password")}
        />
        {errors.password && <span className='text-red-500 text-right text-sm'>{errors.password.message}</span>}

      <div className='flex justify-content-between'>
        <Button type="submit" label="Sign in"/>
        <span onClick={() => navigate('/sign-in/admin')} className='mt-3 underline cursor-pointer'>Sign in as Admin</span>
        <Button onClick={() => navigate('/sign-up')} label="Sign up" />
      </div>
    </form>
  )
}

