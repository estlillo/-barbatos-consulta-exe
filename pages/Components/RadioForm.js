import { FormHelperText, TextField } from "@mui/material";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioForm({
  inputLabel,
  register,
  options,
  name,
  helper,
  disabled,
  errors,
  rules,
  ...props
}) {
  return (
    <FormControl fullWidth margin="normal">
      <FormLabel id="demo-row-radio-buttons-group-label">
        {inputLabel}
      </FormLabel>
      <RadioGroup
        {...(register && register(name, rules))}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={name}
        id="demo-row-radio-buttons-group"
      >
        <FormControlLabel
          value="Empleado"
          control={<Radio />}
          label="Empleado"
        />
        <FormControlLabel value="Cliente" control={<Radio />} label="Cliente" />
        <FormControlLabel
          value="Proveedor"
          control={<Radio />}
          label="Proveedor"
        />
        <FormControlLabel
          value="Contratista"
          control={<Radio />}
          label="Contratista"
        />
        <FormControlLabel
          value="Ex-empleado"
          control={<Radio />}
          label="Ex-empleado"
        />
        <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
      </RadioGroup>
    </FormControl>
  );
}
