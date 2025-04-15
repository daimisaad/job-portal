import { useParams } from 'react-router-dom';
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

function JobDetails() {
  const { id } = useParams();
 
  const job = {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
    type: 'Full Time',
    posted: '2d ago',
    description: `We are looking for a Senior Frontend Developer to join our team and help build amazing user experiences.

Requirements:
• 5+ years of experience with React
• Strong understanding of modern JavaScript
• Experience with responsive design and CSS frameworks
• Knowledge of frontend testing practices

Benefits:
• Competitive salary
• Health insurance
• Flexible working hours
• Remote work options
• Professional development budget`,
    companyInfo: 'TechCorp is a leading technology company focused on building innovative solutions for enterprise clients.',
    requiredSkills: [
      'React',
      'JavaScript',
      'CSS',
      'HTML',
      'Git',
      'Testing'
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Job Header */}
        <div className="p-8 border-b">
          <div className="flex items-start gap-6">
            <div className="text-5xl">🏢</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-xl text-gray-600 mt-2">{job.company}</p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center text-gray-500">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-500">
                  <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                  {job.salary}
                </div>
                <div className="flex items-center text-gray-500">
                  <BriefcaseIcon className="h-5 w-5 mr-1" />
                  {job.type}
                </div>
                <div className="flex items-center text-gray-500">
                  <ClockIcon className="h-5 w-5 mr-1" />
                  {job.posted}
                </div>
              </div>
            </div>
            <button
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition"
              onClick={() => alert('Application feature coming soon!')}
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Job Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
              <div className="prose max-w-none">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Company Information</h2>
                <p className="text-gray-600">{job.companyInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;