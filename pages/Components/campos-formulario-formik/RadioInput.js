import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import Image from "next/image";
import React from "react";

export default function RadioInput(props) {
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
    spacing = 0
  } = props;

  return (
    <FormControl fullWidth margin="normal" error={error && Boolean(error)}>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
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
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={spacing}
                  >
                    <span>
                      {item.flag && (
                        <Image
                          src={"/flags/" + item.flag}
                          width={17}
                          height={17}
                        />
                      )}
                    </span>
                    <span>{item.description}</span>
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
