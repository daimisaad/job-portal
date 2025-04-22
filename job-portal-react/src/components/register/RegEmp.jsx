import React, { useState, useTransition } from "react";
import Input from "../RepeatedElements/Input";
import HandleError from "../RepeatedElements/HandleError";
import { useDispatch } from "react-redux";
import { getSanctumCsrf, register } from "../../Api/Apiconditions";
import { handleSwitchToEmployer } from "../../Api/conditions";
import { useNavigate } from "react-router-dom";
export default function RegEmp() {
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({})
    startTransition(async () => {
      await getSanctumCsrf();
      await register( {...formData,phone:+formData.phone}, "employer")
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            handleSwitchToEmployer(dispatch,res.data);
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.response.data) return setErrors(err.response.data.errors);
        });
    });
  }
  const handleChange = (event) =>
    setFormData((fr) => ({ ...fr, [event.target.name]: event.target.value }));
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 lg:grid-rows-2 md:grid-rows-2 gap-6">
        <div className="grid">
          <Input
            name="company_name"
            label="Company_Name"
            value={formData.company_name}
            onChange={handleChange}
          />
          <HandleError dataErrors={errors} name="Company_name" />
        </div>
        <div className="grid">
          <Input name="phone" label="Phone" value={formData.phone} onChange={handleChange} />
          <HandleError dataErrors={errors} name="phone" />
        </div>
        <div className="grid">
          <Input name="email" label="Email" value={formData.email} onChange={handleChange} />
          <HandleError dataErrors={errors} name="email" />
        </div>
        <div className="grid">
          <Input
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <HandleError dataErrors={errors} name="password" />
        </div>
      </div>

      <div className="grid  mt-7 gap-1">
        <Input
          type="password"
          name="password_confirmation"
          label="Password_Confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
        <HandleError dataErrors={errors} name="password" />
      </div>
      <button className="bg-primary font-bold text-white w-full py-4 rounded cursor-pointer mt-4">
        Register
      </button>
    </form>
  );
}
