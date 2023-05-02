import './index.css'
import {RouterProvider} from 'react-router-dom'
import {router} from './router/router'
import AuthProvider from './contexts/auth'
import ToastProvider from './contexts/toast'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
