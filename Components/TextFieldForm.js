import { TextField } from "@mui/material";
import React from "react";

export default function TextFieldForm({
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
    <TextField
      {...(register && register(name, rules))}
      {...props}
      margin="normal"
      fullWidth
      label={inputLabel}
      variant="outlined"
      error={hasError}
      helperText={errorMessages?.message || helper}
    />
  );
}
