import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TAKE_JOBS } from "../Redux/SimpleWaytoReturnSlice";
import { calculateTimePosted, returnSalary } from "../Api/conditions";

function Jobs() {
  const jobs = useSelector(TAKE_JOBS);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const minSalary = useMemo(() => {
    return Math.min(...jobs.map((e) => e.minSalary));
  }, [jobs]);
  const maxSalary = useMemo(() => {
    return Math.max(...jobs.map((e) => e.maxSalary));
  }, [jobs]);
  const pages = useMemo(() => {
    const arr = [];
    if (jobs.length <= 5) return [jobs];
    jobs.slice(1, jobs.length).forEach((e, ind) => {
      if ((ind + 1) % 5 == 0) {
        arr.append(jobs.slice(ind - 5, ind + 1));
      }
    });
    return arr;
  }, [jobs]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get("category") || "",
    type: "",
    location: searchParams.get("location") || "",
    experience: "",
    salary: [minSalary, maxSalary],
  });

  const [filteredJobs, setFilteredJobs] = useState(pages[page - 1]);

  useEffect(() => {
    let filtered = pages[page - 1];

    if (selectedFilters.category) {
      filtered = filtered.filter(
        (job) =>
          job.category.toLowerCase() === selectedFilters.category.toLowerCase()
      );
    }

    if (selectedFilters.jobType) {
      filtered = filtered.filter(
        (job) => job.jobType === selectedFilters.jobType
      );
    }

    if (selectedFilters.location) {
      filtered = filtered.filter((job) =>
        job.location
          .toLowerCase()
          .includes(selectedFilters.location.toLowerCase())
      );
    }
    if(selectedFilters.salary[1]){
      filtered = filtered.filter((job) => {
        return (
          job.minSalary >= selectedFilters.salary[0] &&
          job.maxSalary <= selectedFilters.salary[1]
        );
      });
    }

    if (selectedFilters.experience) {
      filtered = filtered.filter(
        (job) => job.experience === selectedFilters.experience
      );
    }

    setFilteredJobs(filtered);
  }, [selectedFilters]);

  useEffect(()=>{
    setFilteredJobs(pages[page-1])
  },[jobs])
  console.log(filteredJobs);
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">{t("filters.title")}</h2>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">{t("categories.title")}</h3>
              <div className="space-y-2 flex flex-col ">
                {[
                  { key: "technology", label: t("categories.technology") },
                  { key: "design", label: t("categories.design") },
                  { key: "marketing", label: t("categories.marketing") },
                  { key: "sales", label: t("categories.sales") },
                  { key: "finance", label: t("categories.finance") },
                  { key: "healthcare", label: t("categories.healthcare") },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 ">
                    <input
                      type="checkbox"
                      checked={selectedFilters.category === key}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={(e) =>
                        setSelectedFilters({
                          ...selectedFilters,
                          category: e.target.checked ? key : "",
                        })
                      }
                    />
                    <span className="ml-2">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">{t("filters.title")}</h3>
              <div className="space-y-2">
                {[
                  { key: "Full Time", label: t("filters.types.fullTime") },
                  { key: "part Time", label: t("filters.types.partTime") },
                  { key: "remote", label: t("filters.types.remote") },
                  { key: "contract", label: t("filters.types.contract") },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.filters === key}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={(e) =>
                        setSelectedFilters({
                          ...selectedFilters,
                          type: e.target.checked ? key : "",
                        })
                      }
                    />
                    <span className="ml-2">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="mb-6 ">
              <h3 className="font-medium mb-3">{t("filters.experience")}</h3>
              <div className="space-y-2">
                {[
                  { key: "Entry Level", label: t("filters.levels.entry") },
                  { key: "Mid Level", label: t("filters.levels.mid") },
                  { key: "Senior Level", label: t("filters.levels.senior") },
                  { key: "Lead", label: t("filters.levels.lead") },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.experience === key}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={(e) =>
                        setSelectedFilters({
                          ...selectedFilters,
                          experience: e.target.checked ? key : "",
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
              <h3 className="font-medium mb-3">{t("filters.salary")}</h3>
              <input
                type="range"
                min={minSalary}
                max={maxSalary}
                step="1000"
                value={selectedFilters.salary[1]}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    salary: [minSalary, parseInt(e.target.value)],
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{minSalary} DH</span>
                <span>{selectedFilters.salary[1].toLocaleString()} DH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="lg:w-3/4">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏢</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{job.company_name}</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center text-gray-500">
                        <MapPinIcon className="h-5 w-5 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <CurrencyDollarIcon className="h-5 w-5 mr-1" />$
                        {returnSalary(job.minSalary)} - $
                        {returnSalary(job.maxSalary)}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <BriefcaseIcon className="h-5 w-5 mr-1" />
                        {job.jobType}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <ClockIcon className="h-5 w-5 mr-1" />
                        {calculateTimePosted(job.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {
            filteredJobs.length > 0 ? <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              <button onClick={()=> setPage(p=> p-1)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-300">
                {t("Pagination.Previous")}
              </button>
              {pages.map((e, i) => {
                return (
                  <>
                    <button onClick={()=> setPage(i+1)} className={"px-4 py-2 rounded-lg " + (page == i+1 ? 'bg-primary text-white ' : ' border-3 border-primary')}>
                      {i+1}
                    </button>
                  </>
                );
              })}
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-300">
                {t("Pagination.Next")}
              </button>
            </nav>
          </div> : <h1 className="text-center text-2xl bg-white p-2 shadow-md rounded">There Is No Jobs</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default Jobs;
