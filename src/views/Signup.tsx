import { InputText } from 'primereact/inputtext';
import {Button }from 'primereact/button'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";

import {useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../contexts/auth';
import {ToasterContext} from '../contexts/toast';
import {signUp} from '../api/auth';
import {ErrorData, parseErrorMessage} from '../util';
import {AxiosError} from 'axios';

interface Signup {
  email: string
  password: string
}
type SignupForm = Signup & {cpassword: string}

const schema = yup.object<SignupForm>({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  cpassword: yup.string().min(6).required().oneOf([yup.ref('password')], 'Password mismatch')
}).required();

const Signup = () => {
  const [posts, setPosts] = useState<any>()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const toast = useContext(ToasterContext)
  const { register, handleSubmit, formState:{ errors } } = useForm<SignupForm>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    // const a = await api.get('posts')
    // setPosts(JSON.parse(a.data))
    console.log('setting tosat', toast)
    // authContext?.setAuthState({
    //   isLoggedIn: true,
    //   email: 'ih'
    // })
    toast.current?.show({
      severity: 'warn',
      detail: 'something',
      summary: 'hi',
    })
  }, [])
  const onSubmit = async (data: SignupForm) =>  {
    try {
      const response = await signUp({email: data.email, password: data.password})
      console.log(response)
      navigate('/sign-in')
    } catch (e: unknown) {
      toast.current?.show({
        severity: 'error',
        summary: parseErrorMessage(e as AxiosError<ErrorData>)
      })
    }
  }
  return (
    <div className="surface-card p-4 shadow-2 border-round w-full">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-5">
        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span className="text-600 font-medium line-height-3">Don't have an account?</span>
        <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>

      <div>
        <label htmlFor="email1" className="block text-900 font-medium mb-2">Email</label>
        <InputText id="email1" type="text" className="w-full mb-3"
          {...register("email")}
        />
        {errors.email && <span className='text-red-500 text-right text-sm'>{errors.email.message}</span>}

        <label htmlFor="password1" className="block text-900 font-medium mb-2">Password</label>
        <InputText id="password1" type="password" className="w-full mb-3"
          {...register("password")}
        />
        {errors.password && <span className='text-red-500 text-right text-sm'>{errors.password.message}</span>}

        <label htmlFor="password1" className="block text-900 font-medium mb-2">Confirm Password</label>
        <InputText id="cpassword" type="password" className="w-full mb-3"
          {...register("cpassword")}
        />
        {errors.cpassword && <span className='text-red-500 text-right text-sm'>{errors.cpassword.message}</span>}

        <Button label="Sign In" icon="pi pi-user" className="w-full" />
      </div>
    </form>
    </div>
  )
};
export default Signup

