export default function handler(req, res) {
  const relacionEmpresaOptions = [
    {
      id: "Comunicación Interna",
      description: "Comunicación Interna",
    },
    {
      id: "Compañeros de Trabajo",
      description: "Compañeros de Trabajo",
    },
    {
      id: "Póster",
      description: "Póster",
    },
    {
      id: "Correo Electrónico",
      description: "Correo Electrónico",
    },
    {
      id: "Tríptico/Brochure",
      description: "Tríptico/Brochure",
    },
    {
      id: "Intranet",
      description: "Intranet",
    },
    {
      id: "Circular",
      description: "Circular",
    },
    {
      id: "Aviso",
      description: "Aviso",
    },
    {
      id: "Vídeo",
      description: "Vídeo",
    },
    {
      id: "Tarjeta",
      description: "Tarjeta",
    },
    {
      id: "Junta o Reunión",
      description: "Junta o Reunión",
    },
    {
      id: "Kit de Bienvenida",
      description: "Kit de Bienvenida",
    },
    {
      id: "Código de Ética",
      description: "Código de Ética",
    },
    {
      id: "Otro",
      description: "Otro",
    },
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(relacionEmpresaOptions));
}
