import { TextField } from "@mui/material";
import React from "react";

export default function InputTextBusqueda({
  onChangeHandler,
  value,
  id,
  label
}) {
  return (
    <TextField
      onChange={onChangeHandler}
      value={value}
      fullWidth
      id={id}
      margin="normal"
      label={label}
      variant="standard"
    />
  );
}
