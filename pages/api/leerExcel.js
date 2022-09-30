import axios from "axios";
import { obtenerAccessToken } from "./ObtenerToken";
import path from "path";
const XLSX = require('xlsx');

export default async function handler(req, res) {
  //Pedir hora al inicio del proceso para calcular tiempo de carga
  const hora = new Date;
  try {
    //Ruta y lectura de archivo Excel
    const excelDirectory = path.join(process.cwd(), 'archivos_subir');
    const workbook = XLSX.readFile(excelDirectory + '/Excel_plantilla.xlsx');
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    const jsonGeneral = []

    //Lectura de cada fila del excel  
    for (const itemFila of dataExcel) {
      const bearerToken = await obtenerAccessToken();

      //Traducción de variables "TIPO DE DOCUMENTO"
      const tipodocumento = itemFila['TIPO DOCUMENTO (debe existir en bd)'].toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
      var CodigoTipodocumento = "";
      switch (tipodocumento) {
        case "carta":
          CodigoTipodocumento = 70;
          break;
        case "decreto":
          CodigoTipodocumento = 71;
          break;
        case "decreto exento":
          CodigoTipodocumento = 72;
          break;
        case "decreto exento con registro":
          CodigoTipodocumento = 73;
          break;
        case "decreto supremo":
          CodigoTipodocumento = 74;
          break;
        case "memorandum":
          CodigoTipodocumento = 75;
          break;
        case "oficio circular":
          CodigoTipodocumento = 76;
          break;
        case "oficio ordinario":
          CodigoTipodocumento = 77;
          break;
        case "oficio reservado":
          CodigoTipodocumento = 78;
          break;
        case "providencia":
          CodigoTipodocumento = 79;
          break;
        case "resolucion afecta":
          CodigoTipodocumento = 80;
          break;
        case "resolucion exenta":
          CodigoTipodocumento = 81;
          break;
        case "resolucion exenta con registro":
          CodigoTipodocumento = 82;
          break;
      }

      //Creación e inserción del JSON
      const body = {
        emisor: req.body.data.emisorExpediente,
        destinatariosExpediente: [
          {
            usuario: req.body.data.destinatarioExpediente,
            copia: false,
          },
        ],
        destinatarioGrupo: [],
        observaciones: [],
        documentos: [
          {
            tieneProceso: false,
            idProceso: "",
            tipoDocumentoExpediente: 1,
            formatoDocumento: 2,
            tipoDocumento: CodigoTipodocumento,
            numero: "",
            //Numero externo
            numeroDocumentoPapel: itemFila['N DOCUMENTO (numérico)'],
            fecha: itemFila['FECHA DE RECEPCION'],
            ciudad: "",
            antecedentes: itemFila['ANTECEDENTES'],
            materia: itemFila['MATERIA'],
            reservado: false,
            plazo: "",
            nivelUrgencia: "",
            indicacion: "",
            autor: itemFila['AUTOR (debe existir en bd)'],
            emisor: itemFila['EMISOR DOCUMENTO (debe existir en bd)'],
            dataArchivo: req.body.data.rutaExpediente + itemFila['NOMBRE DOCUMENTO'],
            nombreArchivo: itemFila['NOMBRE DOCUMENTO'],
            contentType: "application/pdf",
            tipoDescarga: "url",
            distinatarios: [
              {
                usuario: itemFila['DESTINATARIO (debe existir en bd)'],
              },
            ],
            parrafos: []
          },
        ]
      };
      jsonGeneral.push(body);
      const resultado = await axios.post("http://testing.exedoc.cl:80/exedoc/rest/api/inyectarDocumento", body, {
        headers: {
          Authorization: bearerToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  const mensaje = "Excel inyectado correctamente";
  res.status(200).json(mensaje);

  //Calculo demora del proceso
  const hora2 = new Date();
  console.log(`El proceso tardó: ${(hora2 - hora) / 1000} s`);
}


