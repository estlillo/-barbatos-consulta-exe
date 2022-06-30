export default function handler(req, res) {
  console.log("carga de servicios activos");

  const servicios = [
    {
      title: "Consulta expedientes",
      description:
        "Consulta la información de un expediente, incluyendo todos los documentos que este posee.",
      urlRedirect: "/Consulta",
      active: false,
    },
    {
      title: "Verificación de documentos",
      description: "Consulta la información de un documento firmado mediante el código de barra.",
      urlRedirect: "/ConsultaDocumento",
      active: true,
    },
    {
      title: "Historial de acciones",
      description:
        "Consulta la información de todas las acciones que realiza un usuario.",
      urlRedirect: "/HistorialAcciones",
      active: false,
    },
    {
      title: "Inyección de documentos (En construcción)",
      description: "Inyecta documentos al gestor.",
      urlRedirect: "/InyectarDocumento",
      active: false,
    },
  ];

  const serviciosFiltrados = servicios.filter((servicio) => servicio.active);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(serviciosFiltrados));
}
