export default function handler(req, res) {
  const relacionEmpresaOptions = [
    {
      id: "Infractor",
      description: "Infractor",
    },
    {
      id: "Testigo",
      description: "Testigo",
    },
    {
      id: "Víctima",
      description: "Víctima",
    }
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(relacionEmpresaOptions));
}