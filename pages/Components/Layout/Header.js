import React from "react";
import Head from "next/head";

export default function Header({}) {
  return (
    <Head>
      <title>SocialDoc</title>
      <meta name="description" content="Consulta documentos / expedientes" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
