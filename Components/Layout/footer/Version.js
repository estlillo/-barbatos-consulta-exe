import React from "react";
import { Typography } from "@mui/material";
import packageJson from "@/root/package.json";

export default function Version() {
  const [version, setVersion] = React.useState(packageJson.version);
  const [name, setName] = React.useState(packageJson.name);
  return (
    <>
      <Typography variant="body2">
        v {version}
      </Typography>
    </>
  );
}
