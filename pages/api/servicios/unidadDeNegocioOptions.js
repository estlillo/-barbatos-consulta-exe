export default function handler(req, res) {
  const relacionEmpresaOptions = [
    {
      id: "Chile",
      description: "Chile",
    },
    {
      id: "Paraguay",
      description: "Paraguay",
    },
    {
      id: "Peru",
      description: "Peru",
    }
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(relacionEmpresaOptions));
}