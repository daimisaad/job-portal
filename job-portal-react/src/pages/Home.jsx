import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { TechnologyIcon, MarketingIcon, DesignIcon, SalesIcon, FinanceIcon, HealthcareIcon } from '../components/icons';
import CompanyLogosSlider from "../components/CompanyLogoSlider";

function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?q=${searchQuery}&location=${location}`);
  };

  const categories = [
    { name: t('categories.technology'), icon: TechnologyIcon, count: 150 },
    { name: t('categories.marketing'), icon: MarketingIcon, count: 90 },
    { name: t('categories.design'), icon: DesignIcon, count: 120 },
    { name: t('categories.sales'), icon: SalesIcon, count: 80 },
    { name: t('categories.finance'), icon: FinanceIcon, count: 70 },
    { name: t('categories.healthcare'), icon: HealthcareIcon, count: 100 },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/jobs?category=${category.name.toLowerCase()}`);
  };

  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
    {/* Hero Section */} 
    <div className=" relative h-[600px] bg-[url('/src/images/hero.jpg')] bg-cover bg-center bg-black/70 ">
      <div className=" absolute inset-0 bg-black/70 backdrop-blur-sm shadow-[inset_0_-25px_30px_rgba(255,255,255,1)]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center ">
          <div className="text-center mb-16">
            <p className="text-xl text-primary font-medium mb-4">
              {t("hero.welcome")}
            </p>
            <h1 className="text-5xl font-bold text-white mb-8">
              {t("hero.title")}
            </h1>
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="flex gap-4 shadow-lg rounded-lg bg-white p-2">
                <div className="flex-1 flex items-center border-r">
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 mx-3" />
                  <input
                    type="text"
                    placeholder={t("hero.searchPlaceholder")}
                    className="w-full p-3 outline-none bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex-1 flex items-center">
                  <MapPinIcon className="h-6 w-6 text-gray-400 mx-3" />
                  <input
                    type="text"
                    placeholder={t("hero.locationPlaceholder")}
                    className="w-full p-3 outline-none bg-transparent"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition duration-300"
                >
                  {t("hero.findButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    {/* Categories Section */}
    <CompanyLogosSlider />
    <div className="bg-[#F3F4F6] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h2 className="text-3xl font-bold text-center mb-12">
        {t("categories.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className="bg-[linear-gradient(115deg,_#5f48f1,_#C0C5ED)] rounded-xl shadow-xl p-6 hover:scale-105 transition duration-300 transform hover:-translate-y-1 cursor-pointer"
             >
              {/* 130deg,_#5F48F1,_#f0ffff */}
            <div
              className={`bg-gradient-to-r ${category.color} text-white rounded-xl shadow-xl p-6 hover:scale-105 transition duration-300 transform hover:-translate-y-1 cursor-pointer`}
            >
              <div
                className={`w-16 h-16 ${category.iconBg} rounded-full flex items-center justify-center mb-4`}
              >
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white ">{category.name}</h3>
              <p className="text-white/80">
                {category.count} {t("categories.jobsAvailable")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/jobs")}
          className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition duration-300"
        >
          {t("categories.browseAll")}
        </button>
      </div>
    </div>
  </div>
);
}

export default Home;
