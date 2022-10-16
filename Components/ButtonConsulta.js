import React from "react";

import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function ButtonConsulta({isLoading}) {
  return (
    <Button
      sx={{
        mt: 3,
        mb: 2,
      }}
      fullWidth
      disabled={isLoading}
      type="submit"
      variant="contained"
      endIcon={<SearchIcon />}
    >
      Consultar
    </Button>
  );
}
