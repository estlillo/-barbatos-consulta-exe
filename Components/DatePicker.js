import { FormControl, InputLabel, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";

export default function DateCustomPicker({ inputLabel, name, placeholder, value, onChange }) {
  const [val, setVal] = React.useState(new Date());
  if (!name) name = "";
  if (!inputLabel) inputLabel = "";
  if (!placeholder) placeholder = "";
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        key={name}
        margin="normal"
        id={name}
        disableFuture
        label={inputLabel}
        inputFormat="dd/MM/yyyy"
        value={value}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        onChange={(value) => {
          formik.setFieldValue('fecha', Date.parse(value));
        }}
        renderInput={(params) => (
          <TextField margin="normal" fullWidth {...params} />
        )}
      />
    </LocalizationProvider>
  );
}
