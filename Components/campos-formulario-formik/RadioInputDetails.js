import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export default function RadioInputDetails(props) {
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
    spacing = 0,
  } = props;

  return (
    <FormControl fullWidth margin="normal" error={error && Boolean(error)}>
      <FormLabel id="demo-radio-buttons-group-label"> </FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby="demo-radio-buttons-group-label"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options &&
          options.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item.id}
              control={<Radio />}
              label={
                <>
                  <Stack
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={spacing}
                  >
                    <span>
                      <strong>{item.description}</strong>
                    </span>
                    <span>
                      <Typography variant="body2" gutterBottom>
                        {item.details}
                      </Typography>
                    </span>
                  </Stack>
                </>
              }
            />
          ))}
      </RadioGroup>
      <FormHelperText>{touched && error}</FormHelperText>
    </FormControl>
  );
}
