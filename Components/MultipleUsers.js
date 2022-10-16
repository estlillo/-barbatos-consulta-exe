import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from 'prop-types';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";

export default function MultipleUsers({
  nombreLista,
  label,
  register,
}) {


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
