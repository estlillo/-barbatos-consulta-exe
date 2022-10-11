import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import useObtenerData from "@/customHooks/useObtenerData";

export default function MultipleUsersImplicados({
  nombreLista,
  label,
  register,
}) {

  const [options, loadingTde, errorTde] = useObtenerData({
    url: "/api/servicios/tipoImplicadoOptions",
  });


  const { control } = useForm();
  const [dense, setDense] = React.useState(true);
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: nombreLista,
    });

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "xl",
        padding: "1rem",
      }}
    >
      <FormControl fullWidth margin="normal">
        <List dense={dense} subheader={<ListSubheader> {label}</ListSubheader>}>
          {fields.map((item, index) => {
            return (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <TextField
                  {...register(`${nombreLista}.${index}.usuario`)}
                  margin="normal"
                  fullWidth
                  label="Escribe el nombre"
                  variant="outlined"
                />

                <TextField
                  {...register(`${nombreLista}.${index}.cargo`)}
                  margin="normal"
                  fullWidth
                  label="Escribe el cargo"
                  variant="outlined"
                  sx={{ marginLeft: "1rem", marginRight: "1rem" }}
                />
               <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Tipo Implicado</InputLabel>
                <Select
                  {...(register && register(`${nombreLista}.${index}.tipo`))}
                  label="Escribe el tipo de implicado" 
                >
                   <MenuItem key="-1" value="Seleccione" default>
                        Seleccione
                  </MenuItem>
                  {options &&
                    options.map((option, index) => (
                      <MenuItem key={index} value={option.id}>
                        {option.description}
                      </MenuItem>
                    ))}
                </Select>
                </FormControl>
              </ListItem>
            );
          })}
        </List>

        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          onClick={() => {
            append({ usuario: "" });
          }}
        >
          Agregar
        </Button>
      </FormControl>
    </Box>
  );
}
