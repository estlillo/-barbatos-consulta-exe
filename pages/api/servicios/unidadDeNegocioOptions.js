export default function handler(req, res) {
  const relacionEmpresaOptions = [
    {
      id: "Chile",
      description: "Chile",
      flag: "chile.png",
    },
    {
      id: "Paraguay",
      description: "Paraguay",
      flag: "paraguay.png",
    },
    {
      id: "Perú",
      description: "Perú",
      flag: "peru.png",
    }
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(relacionEmpresaOptions));
}