import React, { useState, useTransition } from "react";
import FormSign from "./FormSign";
import { useDispatch } from "react-redux";
import { getSanctumCsrf, login } from "../../Api/Apiconditions";
import { handleSwitchToCandidate } from "../../Api/conditions";
import { useNavigate } from "react-router-dom";

export default function SignCan() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({})
    startTransition(async () => {
        await getSanctumCsrf();
        await login(formData)
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
  return (
    <FormSign
      data={formData}
      setData={setFormData}
      isPending={isPending}
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
}
