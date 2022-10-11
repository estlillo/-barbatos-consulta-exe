export default function handler(req, res) {
  const relacionEmpresaOptions = [
    {
      id: "Información Financiera",
      description: "Información Financiera",
    },
    {
      id: "Operaciones",
      description: "Operaciones",
    },
    {
      id: "Recursos Humanos",
      description: "Recursos Humanos",
    },
    {
      id: "Seguridad y Salud Ocupacional",
      description: "Seguridad y Salud Ocupacional",
    }
    
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(relacionEmpresaOptions));
}