import  { useState } from 'react'
import Input from '../RepeatedElements/Input'
import HandleError from '../RepeatedElements/HandleError'

export default function RegForm({errors={},setErrors=()=>{}}) {
  
  return (
    <form> 
      <div className='grid lg:grid-cols-2 md:grid-cols-2 lg:grid-rows-2 md:grid-rows-2 gap-2'>
        <div className='grid'>
        <Input name='first_name'/>
        <HandleError dataErrors={errors} name='first_name' />
        </div>
        <div className='grid'>
        <Input name='last_name'/>
        <HandleError dataErrors={errors} name='last_name' />
        </div>
        <div className='grid'>
        <Input name='phone'/>
        <HandleError dataErrors={errors} name='phone' />
        </div>
        <div className='grid'>
        <Input name='email'/>
        <HandleError dataErrors={errors} name='email' />
        </div>
      </div>
        <div className='grid mt-2'>
        <Input name='password'/>
        <HandleError dataErrors={errors} name='password' />
        </div>
        <div className='grid mt-2'>
        <Input name='password_confirmation'/>
        <HandleError dataErrors={errors} name='password_confirmation' />
        </div>
        <button className='bg-purple-700 font-bold text-white w-full py-4 rounded cursor-pointer mt-4'>Register</button>
    </form>
  )
}
