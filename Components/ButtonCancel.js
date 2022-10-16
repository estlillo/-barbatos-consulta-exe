import { Button } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";

export default function ButtonCancel({ onClick, label }) {
  return (
    <Button onClick={onClick} variant="contained" color="error">
      {label ? label : "Cancelar"}
    </Button>
  );
}
