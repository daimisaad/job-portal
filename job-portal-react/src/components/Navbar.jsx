import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ProfileDropdown from "./RepeatedElements/ProfileDropDown";
import { useDispatch, useSelector } from "react-redux";
import { TAKE_CANDIADTE, TAKE_EMPLOYER, TAKE_JOBS, TAKE_WHO } from "../Redux/SimpleWaytoReturnSlice";
import {
  getCandidate,
  getEmployer,
  getJobs,
  getSanctumCsrf,
} from "../Api/Apiconditions";

function Navbar() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isShowed, setIsShowed] = useState(false);
  const who = useSelector(TAKE_WHO);
  const jobs = useSelector(TAKE_JOBS);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "ar" : "fr";
    i18n.changeLanguage(newLang);
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const returnOnDepenceWhosIsConnected = () => {
    if (who == "candidate") {
      return <WhenCandidateConnect />;
    } else if (who == "employer") {
      return <WhenEmployerConnect />;
    }
    return false;
  };

  useEffect(() => {
    if (!who) {
      navigate("/");
    }
  }, [who]);
  useEffect(() => {
    const callCandidate = async () => {
      await getSanctumCsrf();
      await getCandidate(dispatch);
    };
    const callEmployer = async () => {
      await getSanctumCsrf();
      await getEmployer(dispatch);
    };
    if (who == "candidate") {
      callCandidate();
      return;
    }
    if (who == "employer") {
      callEmployer();
    }
  }, []);

  useEffect(() => {
    const callJobs = async () => {
      await getJobs(dispatch);
    };
    if (jobs.length == 0) {
      callJobs();
    }
  }, []);
  return (
    <nav
      className="fixed z-30 w-full bg-white shadow-lg"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/*Logo + Language Toggle */}
          <div className=" flex items-center gap-3 ">
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-x-8">
              <Link
                to="/"
                className="font-semibold text-gray-700 hover:text-[#5f48f1] transition-colors"
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/jobs"
                className="font-semibold text-gray-700 hover:text-[#5f48f1] transition-colors"
              >
                {t("nav.jobs")}
              </Link>
              {/* <Link
                to="/jobs/1"
                className="text-gray-700 hover:text-[#5f48f1] transition-colors"
              >
                {t("nav.jobDetails")}
              </Link> */}
            </div>
          </div>

          {/* Right Section: Auth Buttons */}
          <div className="hidden md:flex items-center gap-x-4">
            {who ? (
              returnOnDepenceWhosIsConnected()
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile  */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#5f48f1]"
            aria-label="Toggle menu"
            onClick={() => setIsShowed((is) => !is)}
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
        <div
          className={`md:hidden transition-all duration-500 ${
            isShowed ? "max-h-96" : "max-h-0 overflow-hidden"
          }`}
        >
          <div
            className={`grid px-2 pt-2 pb-3 space-y-1 transition-all duration-300 ${
              isShowed ? "opacity-100" : "opacity-0"
            }`}
          >
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
            {/* <Link
              to="/jobs/1"
              className="block px-3 py-2 text-gray-700 hover:text-[#5f48f1] transition-colors"
            >
              {t("nav.jobDetails")}
            </Link> */}
            {who ? (
              returnOnDepenceWhosIsConnected()
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

function WhenCandidateConnect() {
  const candidate = useSelector(TAKE_CANDIADTE);
  return (
    <>
      <ProfileDropdown name={candidate.first_name + ' ' + candidate.last_name} src={candidate['profile_image']}/>

      <Link
        to="/createresume"
        className="block px-3 py-2 text-gray-700 hover:text-[#5f48f1] transition-colors lg:bg-[#5f48f1] md:bg-[#5f48f1] lg:text-white md:text-white  lg:rounded-lg md:rounded-lg lg:hover:bg-[#5f48f1]/90 md:hover:bg-[#5f48f1]/90 lg:hover:text-white md:hover:text-white"
      >
        create Resume
      </Link>
    </>
  );
}
function WhenEmployerConnect() {
  const employer = useSelector(TAKE_EMPLOYER);
  return (
    <>
      <ProfileDropdown type="employer" src={employer['profile_image']} name={employer.company_name}/>

      <Link
        to="/postjob"
        className="block px-3 py-2 text-gray-700 hover:text-[#5f48f1] transition-colors lg:bg-[#5f48f1] md:bg-[#5f48f1] lg:text-white md:text-white  lg:rounded-lg md:rounded-lg lg:hover:bg-[#5f48f1]/90 md:hover:bg-[#5f48f1]/90 lg:hover:text-white md:hover:text-white"
      >
        Post Job
      </Link>
    </>
  );
}
