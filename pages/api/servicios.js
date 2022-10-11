export default function handler(req, res) {

  const servicios = [
    {
      title: "Consulta expedientes",
      description:
        "Consulta la información de un expediente, incluyendo todos los documentos que este posee.",
      urlRedirect: "/Consulta",
      active: true,
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
      title: "Inyección de documentos",
      description: "Inyecta tipos de documento específicos al gestor.",
      urlRedirect: "/DocumentosEspecificos",
      active: true,
    },
  ];

  const serviciosFiltrados = servicios.filter((servicio) => servicio.active);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(serviciosFiltrados));
}
