import Link from "next/link";
import React from "react";
import styles from "@/styles/Home.module.css";
export default function CardServicio({title, description, urlServicio}) {

  //handle undefined props
  if(!title) title = "";
  if(!description) description = "";
  if(!urlServicio) urlServicio = "";

  return (
    <Link href={urlServicio}>
      <a className={styles.card}>
        <h2>{title}</h2>
        <p>
          {description}
        </p>
      </a>
    </Link>
  );
}
