import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import ApplicationModal from "../components/ApplicationModal";
import { useDispatch, useSelector } from "react-redux";
import { TAKE_JOBS } from "../Redux/SimpleWaytoReturnSlice";
import { getJobs } from "../Api/Apiconditions";
import { calculateTimePosted, returnSalary } from "../Api/conditions";

function JobDetails() {
  const jobs = useSelector(TAKE_JOBS);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const check = !(jobs.filter((job) => job.id == id).length == 0);

  const job = check ? jobs.filter((job) => job.id == id)[0] : null;

  return (
    <>
      {check && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Job Header */}
            {!check ? (
              <h1>There Is Nothing</h1>
            ) : (
              <>
                {" "}
                <div className="p-8 border-b">
                  <div className="flex items-start gap-6">
                    <div className="text-5xl">🏢</div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {job.title}
                      </h1>
                      <p className="text-xl text-gray-600 mt-2">
                        {job.company_name}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-6">
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
                    <button
                      className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
                {/* Job Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h2 className="text-2xl font-semibold mb-4">
                        Job Description
                      </h2>
                      <div className="prose max-w-none">{job.description}</div>

                      {job.requirements.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-xl font-semibold mb-4">
                            Requirements
                          </h3>
                          <ul className="gap gap-2 pl-6 list-disc">
                            {job.requirements.map((skill, ind) => {
                              return <li key={ind}>{skill}</li>;
                            })}
                          </ul>
                        </div>
                      )}
                      {job.benefits.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-xl font-semibold mb-4">
                            Benifits
                          </h3>
                          <ul className="gap gap-2 pl-6 list-disc">
                            {job.benefits.map((ben, ind) => {
                              return <li key={ind}>{ben}</li>;
                            })}
                          </ul>
                        </div>
                      )}
                      {job.skills.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-xl font-semibold mb-4">
                            Required Skills
                          </h3>
                          <ul className="flex flex-wrap gap-2">
                            {job.skills.map((skill, ind) => {
                              return <li key={ind}>{skill}</li>;
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                          Company Information
                        </h2>
                        <p className="text-gray-600">We Are A Greate Company</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <ApplicationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            jobTitle={job.title}
          />
        </div>
      )}
    </>
  );
}

export default JobDetails;
