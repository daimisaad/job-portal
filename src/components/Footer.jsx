import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const {t, i18n} = useTranslation();
  const isRTL = i18n.language === 'ar';
 
  return (
    <footer className="bg-gray-900 text-white mt-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">JobPortal</h3>
            <p className="text-gray-400">
            {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.jobSeekers')}</h4>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-400 hover:text-white">{t('footer.browseJobs')} </Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-white">{t('footer.remoteJobs')}</Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-white">{t('footer.featuredJobs')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.featuredJobs')}</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-white">{t('footer.blog')}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t('footer.careerAdvice')}</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white">{t('footer.helpCenter')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">contact@jobportal.com</li>
              <li className="text-gray-400">+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p> {t('footer.rights')} {new Date().getFullYear()} &copy;</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;