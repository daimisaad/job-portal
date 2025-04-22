import { useState } from 'react';

export default function JobPostingForm() {
  const [formType, setFormType] = useState('basic');
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    minSalary: '',
    maxSalary: '',
    jobType: 'Full Time',
    category: 'Technology',
    description: '',
    requirements: [],
    benefits: [],
    skills: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRequirementAdd = () => {
    if (requirementInput.trim() && !formData.requirements.includes(requirementInput.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        requirements: [...prev.requirements, requirementInput.trim()]
      }));
      setRequirementInput('');
    }
  };

  const handleBenefitAdd = () => {
    if (benefitInput.trim() && !formData.benefits.includes(benefitInput.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        benefits: [...prev.benefits, benefitInput.trim()]
      }));
      setBenefitInput('');
    }
  };

  const handleSkillRemove = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleRequirementRemove = (requirement) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(r => r !== requirement)
    }));
  };

  const handleBenefitRemove = (benefit) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(b => b !== benefit)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job posting submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Poster une offre d'emploi</h1>
        
        {/* Form Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-md flex w-full max-w-md">
            <button
              onClick={() => setFormType('basic')}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                formType === 'basic' 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Informations de base
            </button>
            <button
              onClick={() => setFormType('details')}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                formType === 'details' 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Détails du poste
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          {formType === 'basic' && (
            <div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 mb-2">Titre du poste</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ex: Développeur Frontend Senior"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700 mb-2">Nom de l'entreprise</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ex: TechCorp"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 mb-2">Localisation</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ex: Paris, France"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="minSalary" className="block text-gray-700 mb-2">Salaire minimum</label>
                  <input
                    type="number"
                    id="minSalary"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ex: 40000"
                  />
                </div>
                
                <div>
                  <label htmlFor="maxSalary" className="block text-gray-700 mb-2">Salaire maximum</label>
                  <input
                    type="number"
                    id="maxSalary"
                    name="maxSalary"
                    value={formData.maxSalary} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ex: 60000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="jobType" className="block text-gray-700 mb-2">Type de poste</label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Full Time">Temps plein</option>
                    <option value="Part Time">Temps partiel</option>
                    <option value="Contract">Contrat</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Stage</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-gray-700 mb-2">Catégorie</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Technology">Technologie</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Ventes</option>
                    <option value="Customer Service">Service client</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setFormType('details')}
                className="w-full p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
              >
                Continuer
              </button>
            </div>
          )}
          
          {/* Job Details Section */}
          {formType === 'details' && (
            <div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 mb-2">Description du poste</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                  placeholder="Décrivez le poste, les responsabilités et les missions..."
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="requirements" className="block text-gray-700 mb-2">Prérequis</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    id="requirements"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ex: 3+ ans d'expérience en développement"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleRequirementAdd())}
                  />
                  <button
                    type="button"
                    onClick={handleRequirementAdd}
                    className="bg-indigo-500 text-white px-4 rounded-r-md hover:bg-indigo-600"
                  >
                    Ajouter
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
                      <span>{requirement}</span>
                      <button
                        type="button"
                        onClick={() => handleRequirementRemove(requirement)}
                        className="ml-2 text-indigo-700 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="benefits" className="block text-gray-700 mb-2">Avantages</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    id="benefits"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ex: Assurance santé"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleBenefitAdd())}
                  />
                  <button
                    type="button"
                    onClick={handleBenefitAdd}
                    className="bg-indigo-500 text-white px-4 rounded-r-md hover:bg-indigo-600"
                  >
                    Ajouter
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
                      <span>{benefit}</span>
                      <button
                        type="button"
                        onClick={() => handleBenefitRemove(benefit)}
                        className="ml-2 text-indigo-700 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="skills" className="block text-gray-700 mb-2">Compétences requises</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ex: React"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
                  />
                  <button
                    type="button"
                    onClick={handleSkillAdd}
                    className="bg-indigo-500 text-white px-4 rounded-r-md hover:bg-indigo-600"
                  >
                    Ajouter
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-2 text-indigo-700 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setFormType('basic')}
                  className="flex-1 p-3 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Publier l'offre
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}