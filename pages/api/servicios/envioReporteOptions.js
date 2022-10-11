export default function handler(req, res) {
  const relacionEmpresaOptions = [
    {
      id: "Anonimo",
      description: "Anonimo",
    },
    {
      id: "Dar mis datos personales",
      description: "Far mis datos personales",
    }
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(relacionEmpresaOptions));
}