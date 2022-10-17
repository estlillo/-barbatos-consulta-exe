export default function handler(req, res) {
  console.log(req.query);

  const subTiposDenuncia = [
    {
      id: "Disponer de información confidencial o privilegiada en beneficio personal",
      description:
        "Disponer de información confidencial o privilegiada en beneficio personal",
      details:
        "Haber realizado compra o venta de acciones a un precio preferencial por haber tenido acceso a información privilegiada o confidencial.",
      tipoDenuncia: "Información Financiera",
    },
    {
      id: "Distorsionar registros contables",
      description: "Distorsionar registros contables",
      details:
        "Registro de estimaciones o provisiones en exceso o defecto, sub o sobrevaluación de activos financieros o no financieros, así como activos realizados no registrados en gastos, tales como, pagos anticipados, consumo de inventarios no aplicados, etc.",
      tipoDenuncia: "Información Financiera",
    },
    {
      id: "Operaciones ficticias",
      description: "Operaciones ficticias",
      details:
        "Registro de operaciones no reales, como ventas no realizadas, etc.",
      tipoDenuncia: "Información Financiera",
    },
    {
      id: "Revelaciones no realizadas",
      description: "Revelaciones no realizadas",
      details:
        "Falta de revelaciones contractuales, de normas de información financieras, o regulatorias.",
      tipoDenuncia: "Información Financiera",
    },
    {
      id: "Otros",
      description: "Otros",
      details: "Otros asuntos que afecten la Información Financiera de la empresa.",
      tipoDenuncia: "Información Financiera",
    },

    {
      id: "Apropiación indebida",
      description: "Apropiación indebida",
      details: "Apropiarse (en el caso de la propiedad confiada al cuidado de uno) fraudulentamente para uso propio (ejemplos: apropiación incorrecta de bienes y fondos y manejo incorrecto del efectivo).",
      tipoDenuncia: "Operaciones",
    },

    {
      id: "Conflicto de Intereses",
      description: "Conflicto de Intereses",
      details: "Cuando en lugar de cumplir con lo debido, actúa en beneficio propio o de un tercero. ( ejemplos: relaciones inapropiadas con vendedores, clientes o proveedores, corrupción, uso incorrecto de información confidencial, relaciones inapropiadas con clientes)",
      tipoDenuncia: "Operaciones",
    },

    {
      id: "Divulgar o sustraer información confidencial",
      description: "Divulgar o sustraer información confidencial",
      details: "Divulgar o sustraer información confidencial que vaya en contra de los intereses y prestigio de la compañía o hacerlo para obtener un beneficio personal o de terceros.",
      tipoDenuncia: "Operaciones",
    },

    {
      id: "Robo",
      description: "Robo",
      details: "El acto de robar, específicamente: tomar y sustraer criminalmente bienes personales o de la compañía con la intención de despojar de ellos al propietario legal.",
      tipoDenuncia: "Operaciones",
    },

    {
      id: "Otros asuntos que afecten a las operaciones de la compañía",
      description: "Otros asuntos que afecten a las operaciones de la compañía",
      details: "Otros asuntos que afecten a las operaciones de la compañía",
      tipoDenuncia: "Operaciones",
    },



    {
      id: "Abuso o uso incorrecto de autoridad",
      description: "Abuso o uso incorrecto de autoridad",
      details: "Cuando un superior aprovecha su mando en beneficio propio o para tratar a una persona de manera impropia, incorrecta, improcedente, ilícita o ilegal.",
      tipoDenuncia: "Recursos Humanos",
    },
    {
      id: "Conducta contra la moral o comportamiento inapropiado",
      description: "Conducta contra la moral o comportamiento inapropiado",
      details: "Comportarse de manera errónea intencional; específicamente: infracción deliberada de una ley o norma.",
      tipoDenuncia: "Recursos Humanos",
    },
    {
      id: "Contratación o remuneración indebida",
      description: "Contratación o remuneración indebida",
      details: "Contratar, remunerar o compensar al personal fuera de lo autorizado; contratar personal con antecedents delictivos, por compadrazgo o por conductas inapropiadas.",
      tipoDenuncia: "Recursos Humanos",
    },
    {
      id: "Desprestigio",
      description: "Desprestigio",
      details: "Dañar de manera intencional el prestigio de otra persona",
      tipoDenuncia: "Recursos Humanos",
    },
    {
      id: "Discriminación o acoso",
      description: "Discriminación o acoso",
      details: "Conducta verbal o física no propiciada y que genera molestias a un empleado debido a su sexo, religión, antecedente étnico o creencias. (Los ejemplos se pueden dar en contratación, en asignaciones, despidos, ascensos, prestaciones, capacitaciones, lenguaje y trato hacia una persona.",
      tipoDenuncia: "Recursos Humanos",
    },
    {
      id: "Extorsión",
      description: "Extorsión",
      details: "Consiste en obligar a una persona a través de la intimidación, violencia o amenaza a realizer un acto en contra de la voluntad o las normas establecidas por la empresa.",
      tipoDenuncia: "Recursos Humanos",
    },
    {
      id: "Sabotaje o vandalismo",
      description: "Sabotaje o vandalismo",
      details: "La destrucción de las pertenencias de la empresa o de un empleado (tales como herramientas o materiales) o la obstrucción de la producción por parte de trabajadores descontentos. (ejemplos: destrucción de equipo, robo, retrasos, virus en computadoras, etc.)",
      tipoDenuncia: "Recursos Humanos",
    },
    {
      id: "Violación a las políticas",
      description: "Violación a las políticas",
      details: "Acciones deliberadas o no intencionadas que van en infracción directa a las políticas, procedimientos, códigos de conducta o responsabilidades contractuales implícitas de la compañía. (Los ejemplos incluyen: seguridad, uso de Internet, directrices corporativas)",
      tipoDenuncia: "Recursos Humanos",
    },
    {
      id: "Violencia",
      description: "Violencia",
      details: "Violencia es el hecho o intención de causar, lesión o daño a una persona o a su propiedad. (Entre los ejemplos se incluyen este tipo de actos de forma directa, encubierta, condicional, violenta).",
      tipoDenuncia: "Recursos Humanos",
    },
    {
      id: "Otros asuntos que afecten a los recursos",
      description: "Otros asuntos que afecten a los recursos",
      details: "Otros temas no descritos en la clasificación y que afectan a los recursos humanos.",
      tipoDenuncia: "Recursos Humanos",
    },

    {
      id: "Uso de sustancias",
      description: "Uso de sustancias",
      details: "Uso incorrecto tanto de drogas ilegales como las autorizadas por la ley, inclusive el alcohol, y llegar bajo la influencia de estas sustancias, además de consumir, distribuir, transportar, vender o poseer cualquier tipo de droga prohibida",
      tipoDenuncia: "Seguridad y Salud Ocupacional",
    },
    {
      id: "Violación a normas de seguridad",
      description: "Violación a normas de seguridad",
      details: "Incumplimiento de normas de seguridad necesarios para desarrollar todas las actividades en un entorno seguro. Que pongan en riesgo al personal, los recursos materiales de la empresa y el medio ambiente. (deficiente aseo y mantenimiento de las instalaciones)",
      tipoDenuncia: "Seguridad y Salud Ocupacional",
    },
    {
      id: "Otros asuntos que afecten la seguridad y la salud",
      description: "Otros asuntos que afecten la seguridad y la salud",
      details: "Otros temas no descritos en la clasificación y que afectan la seguridad y salud ocupacional.",
      tipoDenuncia: "Seguridad y Salud Ocupacional",
    },


    
  ];

  const filtrados = subTiposDenuncia.filter(function (td) {
    return td.tipoDenuncia === req.query.tipoDenuncia;
  });


  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(filtrados));
}
