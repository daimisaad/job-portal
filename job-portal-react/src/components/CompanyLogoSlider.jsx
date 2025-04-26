import React from "react";
import { useTranslation } from "react-i18next"; // نستعمل اللغة

import logo1 from "../images/logo1.png";
import logo2 from "../images/logo2.png";
import logo3 from "../images/logo3.png";
import logo4 from "../images/logo4.png";
import logo5 from "../images/logo5.png";
import logo6 from "../images/logo6.png";
import logo7 from "../images/logo7.png";
import logo8 from "../images/logo8.png";
import logo9 from "../images/logo9.png";
import logo10 from "../images/logo10.png";

const companyLogos = [
  logo1, logo2, logo3, logo4, logo5,
  logo6, logo7, logo8, logo9, logo10
];

const CompanyLogosSlider = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="overflow-hidden bg-[#F3F4F6]  py-8">
      <div className={`flex whitespace-nowrap ${isRTL ? 'animate-scroll-rtl' : 'animate-scroll'}`}>
        {companyLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Company Logo ${index}`}
            className="h-20 w-auto mx-8 inline-block drop-shadow-xl"
          />
        ))}
        {companyLogos.map((logo, index) => (
          <img
            key={index + companyLogos.length}
            src={logo}
            alt={`Company Logo ${index}`}
            className="h-20 w-auto mx-8 inline-block drop-shadow-xl"
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyLogosSlider;
