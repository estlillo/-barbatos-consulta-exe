import React from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/footer/Footer";
import styles from "@/styles/Home.module.css";
import LinkVolver from "@/components/LinkVolver";
import NavBar from "@/components/Layout/NavBar";


export default function Layout({ children }) {
  return (
    <>
      <Header />
     {/* <NavBar /> */}
     
      <div className={styles.container}>
      <LinkVolver redirect="/" mensaje="Inicio" />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
