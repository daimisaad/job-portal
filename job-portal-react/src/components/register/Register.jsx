import React, { useState } from "react";


import { Link } from "react-router-dom";
import {  BriefcaseBusiness, ChevronDown, UserRound } from "lucide-react";
import RegCan from "./RegCan";
import RegEmp from "./RegEmp";
import Choose from "../RepeatedElements/Choose";
export default function Register() {
  const [chosen,setChosen] = useState(false);
  return (
    <>
      
      <main className="grid grid-rows-[80px_1fr] gap-4 h-full">
            <section className="flex flex-col justify-center gap-3 items-center">
                <h1 className="font-semibold text-4xl">Créez votre compte</h1>
                <div className="relative w-60">
                    <div className="w-full h-0.5 bg-primary"></div>
                    <ChevronDown className="absolute text-primary top-0 left-1/2 bg-white -translate-x-1/2 -translate-y-[40%]"/>
                </div>
            </section>
            <section className="grid px-8 lg:p-0 md:p-0 lg:grid-cols-[20%_1fr_20%] md:grid-cols-[20%_1fr_20%]">
              <div className="grid lg:grid-rows-[20%_1fr] lg:col-start-2 lg:col-end-3 md:col-start-2 md:col-end-3">
                <div className="grid lg:flex gap-4">
                  <Choose type="Condidate" isChoosed={!chosen} change={setChosen}>
                    <UserRound />
                  </Choose>
                  <Choose type="Employer" isChoosed={chosen} change={setChosen}>
                    <BriefcaseBusiness />
                  </Choose>
                </div>
                {!chosen ?<RegCan /> : <RegEmp />}
              </div>
            </section>
      </main>
    </>
  );
}



