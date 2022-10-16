import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ObservacionContent from "@/components/ObservacionContent";
import ButtonCancel from "@/components/ButtonCancel";

export default function DialogObservacion(props) {
  const { onClose, open, numeroExpediente, observaciones } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {"Observaciones del expediente " + numeroExpediente}
        </DialogTitle>
        <DialogContent dividers sx={{ minHeight: 100 }}>
          {observaciones?.map((observacion, index) => (
            <ObservacionContent
              texto={observacion?.texto}
              adjuntadoPor={observacion?.adjuntadoPor}
              dataUrl={observacion?.archivo?.data}
              key={index}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <ButtonCancel onClick={onClose} label="Cerrar" />
        </DialogActions>
      </Dialog>
    </>
  );
}
