export default function handler(req, res) {
  const relacionEmpresaOptions = [
    {
      id: "Empleado",
      description: "Empleado",
    },
    {
      id: "Cliente",
      description: "Cliente",
    },
    {
      id: "Proveedor",
      description: "Proveedor",
    },
    {
      id: "Contratista",
      description: "Contratista",
    },
    {
      id: "Ex-empleado",
      description: "Ex-empleado",
    },
    {
      id: "Otro",
      description: "Otro",
    }
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(relacionEmpresaOptions));
}