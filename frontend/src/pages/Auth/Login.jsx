import React from 'react'
import AuthLayouts from '../../Components/layouts/AuthLayouts'

const Login = () => {
  return (
    <AuthLayouts>
        <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
             <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
                <p className='text-x5 text-slate-700 mt-[5px] mb-6'>
                    Please Enter your detail to login
                </p>
            
        </div>
    </AuthLayouts>
  )
}

export default Login