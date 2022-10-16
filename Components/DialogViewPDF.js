import React from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ButtonCancel from "@/components/ButtonCancel";

import ViewerPDF from "@/components/pdfViewer/ViewerPDF";

export default function DialogViewPDF(props) {
  const { onClose, open, url, nombreArchivo } = props;

  const [fullWidth, setFullWidth] = React.useState(true);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth="xl"
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <strong>Visualización del archivo:</strong> {nombreArchivo}
        </DialogTitle>
        <DialogContent dividers>
          <ViewerPDF url={url} />
        </DialogContent>
        <DialogActions>
          <ButtonCancel onClick={onClose} label="Cerrar" />
        </DialogActions>
      </Dialog>
    </>
  );
}
