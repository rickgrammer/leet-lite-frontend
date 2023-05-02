import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Signin from '../views/Signin'
import Signup from '../views/Signup'
import EmptyLayout from '../layouts/empty.layout'
import Quesions from '../views/Quesions'
import QuestionDetail from '../views/QuestionDetail'
import CreateQuestion from '../views/CreateQuestion'
import ProtectedRoute from './ProtectedRoute'
import SigninAdmin from '../views/SigninAdmin'
import SignupAdmin from '../views/SignupAdmin'
import RedirectToHome from './RedirectToHome'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<EmptyLayout />}>
      <Route element={<RedirectToHome />}>
        <Route path='sign-up' element={<Signup />}/>
        <Route path='sign-in' element={<Signin />}/>
        <Route path='sign-up/admin' element={<SignupAdmin />}/>
        <Route path='sign-in/admin' element={<SigninAdmin />}/>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='questions' element={<Quesions />}/>
        <Route path='questions/:id' element={<QuestionDetail />}/>
        <Route path='questions/create' element={<CreateQuestion />}/>
      </Route>
    </Route>
  )
)
