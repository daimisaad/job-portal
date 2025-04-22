import React from 'react'


export default function HandleError({dataErrors={},name=''}) {
  return (
    <div>
        <p className='text-amber-700 font-semibold'>{dataErrors[name] || ''}</p>
    </div>
  )
}
