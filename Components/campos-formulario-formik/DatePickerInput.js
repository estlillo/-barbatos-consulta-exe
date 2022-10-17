import React from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import moment from "moment";
import "moment/locale/es";
moment.locale();

export default function DatePickerInput(props) {
  const {
    name,
    label,
    inputFormat = "dd/MM/yyyy",
    value,
    touched,
    error = null,
    placeholder,
    type = null,
    setFieldValue,
    ...other
  } = props;

  const handleChange = (value) => {
    setFieldValue(name, new Date(value));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl fullWidth margin="normal">
        <DesktopDatePicker
          {...other}
          key={name}
          margin="normal"
          id={name}
          label={label}
          inputFormat={inputFormat}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          value={value}
          name={name}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
            onKeyDown={(e) => {
              e.preventDefault();
           }}
              {...params}
            />
          )}
        />
        <FormHelperText>{touched && error}</FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
}