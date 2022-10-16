import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import convertSize from "convert-size";
import DescriptionIcon from "@mui/icons-material/Description";
import React from "react";

export default function UploadFiles(props) {
  const {
    name,
    setFieldValue,
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

  const [fileList, setFileList] = React.useState([]);
  return (
    <>
      <Button variant="contained" component="label">
        Cargar archivos
        <input
          id={name}
          name={name}
          type="file"
          multiple
          onChange={(event) => {
            const files = event.target.files;

            //get file names in array
            const fileNames = Object.values(files).map((file) => file.name);

            let myFiles = Array.from(files);
            setFieldValue(name, myFiles);
            setFieldValue(name+"Urls", fileNames);
            setFileList(myFiles);
          }}
          hidden
        />
      </Button>

      <br />

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
              <ListItemText
                primary={file.name}
                secondary={convertSize(file.size, { accuracy: 0 })}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No hay archivos seleccionados</p>
      )}
    </>
  );
}
