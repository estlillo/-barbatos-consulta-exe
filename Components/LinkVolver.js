import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";

export default function LinkVolver({ redirect, mensaje }) {
  if (!redirect) redirect = "/";
  if (!mensaje) mensaje = "&larr; Volver al inicio";
  return (
    <>
      <Link href={redirect}>
        
          <IconButton aria-label="upload picture" component="span">
            <HomeIcon fontSize="large" />
          </IconButton>
     
      </Link>
    </>
  );
}
