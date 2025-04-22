
import HandleError from '../RepeatedElements/HandleError'
import { Loader } from 'lucide-react'

export default function FormSign({data=null,setData=null,handleSubmit=()=>{},errors={},isPending=false}) {
  const handleChange = (e)=> setData(p=> ({...p,[e.target.name]:e.target.value}))
   
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={data?.email}
              onChange={handleChange}
              className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <HandleError dataErrors={errors} name='email'/>
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              name="password"
              type="password"
              value={data?.password}
              onChange={handleChange}
              className="w-full px-5 py-4 text-lg rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <HandleError dataErrors={errors} name='password'/>
          </div>

          <button
  type="submit"
  className={`w-full py-4 mt-6 text-lg rounded-xl font-semibold transition-colors duration-200 shadow-md
    ${isPending ? 'bg-indigo-400 cursor-not-allowed' : 'bg-primary hover:bg-indigo-700'}
    text-white`}
  disabled={isPending}
>
  {isPending ? (
    <div className="flex items-center justify-center gap-2">
      <Loader className="w-5 h-5 animate-spin" />
      Chargement...
    </div>
  ) : (
    "Se connecter"
  )}
</button>
        </form>
  )
}
