import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
  } from "@mui/material";
import React from "react";

export default function SelectInput(props) {
    const {
        name,
        label,
        value,
        onChange,
        touched,
        error = null,
        placeholder,
        type = null,
        options = [],
        row = null,
      } = props;
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options &&
          options.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.description}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
