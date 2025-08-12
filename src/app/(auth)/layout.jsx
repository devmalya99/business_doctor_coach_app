import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-106px)]'>
      {children}
    </div>
  )
}

export default AuthLayout
