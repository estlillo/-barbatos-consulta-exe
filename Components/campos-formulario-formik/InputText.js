import { TextField } from "@mui/material";
import React from "react";

export default function InputText(props) {
    const { name, label, value, onChange, touched, error = null, placeholder, type = null, ...other } = props;
  return (
    <TextField
      {...other}
      margin="normal"
      fullWidth
      type={type}
      id={name}
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error && Boolean(error)}
      helperText={touched && error}
    />
  );
}
