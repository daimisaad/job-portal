import React, { useState } from 'react';
import { User, Briefcase } from 'lucide-react';
import SignCan from './SignCan';
import SignEmp from './SignEmp';

export default function Login() {
  const [role, setRole] = useState('candidate');



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-12">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Connectez-vous</h2>

        {/* Role toggle */}
        <div className="flex justify-center mb-10 space-x-6">
          <button
            type="button"
            onClick={() => setRole('candidate')}
            className={`flex items-center px-6 py-3 text-lg rounded-xl font-semibold transition-colors duration-200 ${
              role === 'candidate'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <User className="w-6 h-6 mr-3" />
            Candidat
          </button>

          <button
            type="button"
            onClick={() => setRole('employer')}
            className={`flex items-center px-6 py-3 text-lg rounded-xl font-semibold transition-colors duration-200 ${
              role === 'employer'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Briefcase className="w-6 h-6 mr-3" />
            Employeur
          </button>
        </div>

        {/* Login form */}
        {role == 'candidate' ? <SignCan /> : <SignEmp />}
      </div>
    </div>
  );
}
