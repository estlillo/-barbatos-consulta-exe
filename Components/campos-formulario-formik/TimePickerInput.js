import React from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FormControl, FormHelperText, TextField } from "@mui/material";
import moment from "moment";
import "moment/locale/es";
moment.locale();

export default function TimePickerInput(props) {
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
    setFieldValue(name,value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl fullWidth margin="normal">
        <TimePicker
          {...other}
          key={name}
          margin="normal"
          id={name}
          label={label}
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
