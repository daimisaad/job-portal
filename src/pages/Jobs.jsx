import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

function Jobs() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchParams] = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get('category') || '',
    type: '',
    location: searchParams.get('location') || '',
    experience: '',
    salary: [0, 150000],
  });

  
  const allJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      type: 'Full Time',
      category: 'technology',
      experience: 'Senior Level',
      posted: '2d ago',
      logo: '🏢',
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'DesignHub',
      location: 'Remote',
      salary: '$90k - $120k',
      type: 'Full Time',
      category: 'design',
      experience: 'Mid Level',
      posted: '1d ago',
      logo: '🎨',
    },
    
  ];

  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    let filtered = allJobs;

    if (selectedFilters.category) {
      filtered = filtered.filter(job => 
        job.category.toLowerCase() === selectedFilters.category.toLowerCase()
      );
    }

    if (selectedFilters.type) {
      filtered = filtered.filter(job => 
        job.type === selectedFilters.type
      );
    }

    if (selectedFilters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(selectedFilters.location.toLowerCase())
      );
    }

    if (selectedFilters.experience) {
      filtered = filtered.filter(job => 
        job.experience === selectedFilters.experience
      );
    }

    setFilteredJobs(filtered);
  }, [selectedFilters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">{t('filters.title')}</h2>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">{t('categories.title')}</h3>
              <div className="space-y-2">
              {[
                  { key: 'technology', label: t('categories.technology') },
                  { key: 'design', label: t('categories.design') },
                  { key: 'marketing', label: t('categories.marketing') },
                  { key: 'sales', label: t('categories.sales') },
                  { key: 'finance', label: t('categories.finance') },
                  { key: 'healthcare', label: t('categories.healthcare') },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.category === key}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={(e) => setSelectedFilters({
                        ...selectedFilters,
                        category: e.target.checked ? key : ''
                      })}
                    />
                    <span className="ml-2">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">{t('filters.title')}</h3>
              <div className="space-y-2">
                {[
                  {key:'Full Time', label: t('filters.types.fullTime')}, 
                  {key:'part Time', label: t('filters.types.partTime')}, 
                  {key:'remote', label: t('filters.types.remote')}, 
                  {key:'contract', label: t('filters.types.contract')}, 
                ].map(({key, label}) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.filters === key}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={(e) => setSelectedFilters({
                        ...selectedFilters,
                        type: e.target.checked ? key : ''
                      })}
                    />
                    <span className="ml-2">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">{t('filters.experience')}</h3>
              <div className="space-y-2">
              {[
      { key: 'Entry Level', label: t('filters.levels.entry') },
      { key: 'Mid Level', label: t('filters.levels.mid') },
      { key: 'Senior Level', label: t('filters.levels.senior') },
      { key: 'Lead', label: t('filters.levels.lead') },
    ].map(({ key, label }) => (
      <label key={key} className="flex items-center">
        <input
          type="checkbox"
          checked={selectedFilters.experience === key}
          className="rounded border-gray-300 text-primary focus:ring-primary"
          onChange={(e) =>
            setSelectedFilters({
              ...selectedFilters,
              experience: e.target.checked ? key : '',
            })
          }
        />
        <span className="ml-2">{label}</span>
      </label>
    ))}
              </div>
            </div>

            {/* Salary Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">{t('filters.salary')}</h3>
              <input
                type="range"
                min="0"
                max="15000"
                step="1000"
                value={selectedFilters.salary[1]}
                onChange={(e) => setSelectedFilters({
                  ...selectedFilters,
                  salary: [0, parseInt(e.target.value)]
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>0 DH</span>
                <span>{selectedFilters.salary[1].toLocaleString()} DH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="lg:w-3/4">
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{job.logo}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600 mt-1">{job.company}</p>
                    <div className="flex flex-wrap gap-4 mt-4">
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
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-300">Previous</button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-300">2</button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-300">3</button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-300">Next</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;