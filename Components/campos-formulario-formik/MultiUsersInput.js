import useObtenerData from "@/customHooks/useObtenerData";
import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListSubheader,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { FieldArray } from "formik";
import InputText from "./InputText";
import SelectInput from "./SelectInput";

export default function MultiUsersInput(props) {
  const { name, value, setFieldValue, onChange, label } = props;

  const [options, loadingTde, errorTde] = useObtenerData({
    url: "/api/servicios/tipoImplicadoOptions",
  });

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <FieldArray
        name="implicados"
        render={(arrayHelpers) => (
          <List
            sx={{
              flexGrow: 1,
              maxWidth: "xl",
              padding: "1rem",
            }}
            dense={true}
            subheader={<ListSubheader></ListSubheader>}
          >
            {value &&
              value.map((option, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Grid item xs={12} md={4}>
                    <InputText
                      sx={{ paddingRight: "1rem" }}
                      label="Usuario"
                      placeholder="Escriba el nombre del usuario"
                      name={`${name}[${index}].usuario`}
                      value={value[index].name}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <InputText
                      sx={{ paddingRight: "1rem" }}
                      label="Cargo"
                      placeholder="Escriba el cargo del usuario"
                      name={`${name}[${index}].cargo`}
                      value={value[index].cargo}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SelectInput
                      sx={{ paddingRight: "1rem" }}
                      name={`${name}[${index}].tipo`}
                      label="Tipo de implicado"
                      value={value[index].tipo}
                      onChange={onChange}
                      options={options}
                    />
                  </Grid>
                </ListItem>
              ))}

            <Button
              variant="outlined"
              endIcon={<AddIcon />}
              onClick={() =>
                arrayHelpers.push({
                  usuario: "",
                  cargo: "",
                  tipo: "",
                })
              }
            >
              Agregar
            </Button>
          </List>
        )}
      />
    </FormControl>
  );
}
