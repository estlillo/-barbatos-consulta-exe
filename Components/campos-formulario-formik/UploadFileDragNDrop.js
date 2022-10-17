import {
  Avatar,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
export default function UploadFileDragNDrop(props) {
  const { name, fileNames, label, setFieldValue } = props;
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      let myFiles = Array.from(acceptedFiles);

      let nombreArchivos = [];

      myFiles.forEach((file) => {
        //get filename extension
        const extension = file.name.split(".").pop();
        const newKeyFromUuid = uuidv4() + "." + extension;
        const nombreArchivoAux = file.name;

        Object.assign(file, {
          llave: newKeyFromUuid,
        });

        let archivoObj = {
          nombre: nombreArchivoAux,
          llave: newKeyFromUuid,
        };

        nombreArchivos.push(archivoObj);
      });
      setFieldValue(name, myFiles);
      setFieldValue(fileNames, nombreArchivos);
      setFileList(myFiles);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const [fileList, setFileList] = React.useState([]);

  return (
    <FormControl fullWidth margin="normal">
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />

          <p>
            <strong>{label}</strong>
          </p>

          <p>
            <AudioFileIcon fontSize="large" />
            <VideoFileIcon fontSize="large" />
            <PictureAsPdfIcon fontSize="large" />
            <ImageIcon fontSize="large" />
            <TextSnippetIcon fontSize="large" />
          </p>

          <p>
            Haz <strong>clic aquí</strong>, o <strong>arrastra</strong> los
            archivos
          </p>
        </div>
        <aside>
          {fileList && fileList.length > 0 ? (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {fileList.map((file, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={file.name} secondary={file.size} />
                </ListItem>
              ))}
            </List>
          ) : (
            <></>
          )}
        </aside>
      </div>
    </FormControl>
  );
}