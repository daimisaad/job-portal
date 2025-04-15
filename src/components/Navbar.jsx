import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "ar" : "fr";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <nav className="bg-white shadow-lg" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo + Language Toggle */}
          <div className="flex items-center gap-3 ">
            <Link
              to="/"
              className={`text-xl font-bold text-[#5f48f1] ${
                isRTL ? "font-[Poppins]" : "font-[Poppins]"
              }`}
            >
              JobPortal
            </Link>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#5f48f1] transition-colors rounded-md border border-gray-300 hover:border-[#5f48f1]"
            >
              {i18n.language === "fr" ? "FR" : "عربي"}
            </button>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-[#5f48f1] transition-colors"
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/jobs"
                className="text-gray-700 hover:text-[#5f48f1] transition-colors"
              >
                {t("nav.jobs")}
              </Link>
              <Link
                to="/jobs/1"
                className="text-gray-700 hover:text-[#5f48f1] transition-colors"
              >
                {t("nav.jobDetails")}
              </Link>
            </div>
          </div>

          {/* Right Section: Auth Buttons */}
          <div className="hidden md:flex items-center gap-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-[#5f48f1] transition-colors"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/register"
              className="bg-[#5f48f1] text-white px-4 py-2 rounded-lg hover:bg-[#5f48f1]/90 transition-colors"
            >
              {t("nav.register")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#5f48f1]"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-[#5f48f1] transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/jobs"
              className="block px-3 py-2 text-gray-700 hover:text-[#5f48f1] transition-colors"
            >
              {t("nav.jobs")}
            </Link>
            <Link
              to="/jobs/1"
              className="block px-3 py-2 text-gray-700 hover:text-[#5f48f1] transition-colors"
            >
              {t("nav.jobDetails")}
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-gray-700 hover:text-[#5f48f1] transition-colors"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 text-gray-700 hover:text-[#5f48f1] transition-colors"
            >
              {t("nav.register")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
