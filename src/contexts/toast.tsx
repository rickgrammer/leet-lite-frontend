import {createContext, ReactNode, RefObject, useRef, useState} from "react"
import { Toast } from 'primereact/toast';

export const ToasterContext = createContext<RefObject<Toast>>({current: null})

const ToastProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const toast = useRef<Toast>(null)
  return (
    <ToasterContext.Provider value={toast}>
      {
        <Toast ref={toast} />
      }
      {children}
    </ToasterContext.Provider>
  )
}

export default ToastProvider

