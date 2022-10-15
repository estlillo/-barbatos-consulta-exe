import { TextField } from "@mui/material";
import React from "react";

export default function FileUploadFieldForm({
  inputLabel,
  register,
  name,
  helper,
  disabled,
  errors,
  rules,
  ...props
}) {
  let errorMessages = "";
  if (errors && errors[name]) {
    errorMessages = errors[name];
  }
  const hasError = !!(errors && errorMessages);

  return (

    <input type="file" {...(register && register(name, rules))}/>

  );
}
