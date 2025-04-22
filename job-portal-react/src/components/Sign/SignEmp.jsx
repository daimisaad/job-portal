import { useState, useTransition } from "react";
import FormSign from "./FormSign";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSanctumCsrf, login } from "../../Api/Apiconditions";
import { handleSwitchToEmployer } from "../../Api/conditions";

export default function SignEmp() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    startTransition(async () => {
      await getSanctumCsrf();
      await login(formData, "employer")
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            handleSwitchToEmployer(dispatch, res.data);
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
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}
