import React from "react";
import styles from "@/styles/Home.module.css";
import Version from "./Version";
import Info from "./Info";
import DatosInsitucion from "./DatosInsitucion";

export default function Footer({}) {
  return (
    <footer className={styles.footer}>
      <DatosInsitucion />
      <Info />
      <Version />
    </footer>
  );
}
