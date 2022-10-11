export default function handler(req, res) {

  const servicios = [
    {
      title: "Documento estándar Digital / Electrónico",
      description: "Inyecta documentos tipo oficios, cartas o resoluciones en formato digital o electrónico.",
      urlRedirect: "/Inyectar",
      active: true,
    },
    {
      title: "Reporte de denuncias",
      description:
        "Reporte de denuncias",
      urlRedirect: "/InyectarReporte",
      active: true,
    }
  ];

  const serviciosFiltrados = servicios.filter((servicio) => servicio.active);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(serviciosFiltrados));
}
