import { useState } from 'react'

export default function Input({type='text',label='',...props}) {
    const [isFocused,setIsFocused] = useState(false)
    const onFocus = ()=> setIsFocused(true);
    const onBlur = ()=> setIsFocused(false);
  return (
    <div className='grid gap-2 h-22'>
        <label className='font-semibold text-gray-700/80 pl-1'>{label}</label>
        <input {...props} type={type}  onFocus={onFocus} onBlur={onBlur} className={'outline-0 outline-primary/10  rounded border-1  h-14 px-2 transition-all ' + (isFocused ? 'border-primary outline-3 ' : 'border-gray-700/20')}/>
    </div>
  )
}
