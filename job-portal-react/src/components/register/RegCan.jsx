import { useState, useTransition } from "react";
import RegForm from "./RegForm";
import Input from "../RepeatedElements/Input";
import HandleError from "../RepeatedElements/HandleError";
import { useDispatch } from "react-redux";
import { getSanctumCsrf, register } from "../../Api/Apiconditions";
import {
  getDataFromLocal,
  handleSwitchToCandidate,
} from "../../Api/conditions";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export default function RegCan() {
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
      await register(formData)
        .then((res) => {
          if (res.status == 200) {
            handleSwitchToCandidate(dispatch, res.data);
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
      <div className="grid grid-rows-[repeat(4,90px)] lg:grid-cols-2 md:grid-cols-2 lg:grid-rows-[repeat(2,70px)] md:grid-rows-[repeat(2,70px)] gap-6">
        <div className="grid">
          <Input
            name="first_name"
            label="First_Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <HandleError dataErrors={errors} name="first_name" />
        </div>
        <div className="grid">
          <Input
            name="last_name"
            label="Last_Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <HandleError dataErrors={errors} name="last_name" />
        </div>
        <div className="grid">
          <Input
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <HandleError dataErrors={errors} name="phone" />
        </div>
        <div className="grid">
          <Input
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <HandleError dataErrors={errors} name="email" />
        </div>
      </div>
      <div className="grid mt-6 gap-1 h-20">
        <Input
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <HandleError dataErrors={errors} name="password" />
      </div>
      <div className="grid mt-7 gap-1 h-20">
        <Input
          type="password"
          name="password_confirmation"
          label="Password_Confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
        <HandleError dataErrors={errors} name="password" />
      </div>
      <button
        className={
          "font-semibold mt-10 text-white w-full py-4 rounded cursor-pointer mt-4 " +
          (isPending ? "bg-primary/50 flex gap-2" : "bg-primary")
        }
      >
        {isPending && <LoaderCircle className="animate-spin" />}
        Inscription
      </button>
    </form>
  );
}
