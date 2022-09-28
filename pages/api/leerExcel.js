import axios from "axios";
import { obtenerAccessToken } from "./ObtenerToken";
import path from "path";
import { promises as fs } from 'fs';

const XLSX = require('xlsx');

export default async function handler(req, res) {
  try {

    const ruta = req.body.data.rutaExpediente + '/';
    console.log(ruta);
    //Ruta del archivo Excel
    const excelDirectory = path.join(process.cwd(), 'archivos_subir');
    const fileContents = await fs.readFile(excelDirectory + '/Excel_plantilla.xlsx', 'utf8');
    const workbook = XLSX.readFile(excelDirectory + '/Excel_plantilla.xlsx');
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    // Todos los valores de la tabla
    //    console.log(dataExcel);

    //PEDIR HORA
    const hora = new Date;


    const jsonGeneral = []
    //Inicio de ciclo for para leer cada fila del excel  
    for (const itemFila of dataExcel) {
      const bearerToken = await obtenerAccessToken();
      var varExcel = itemFila['NOMBRE DOCUMENTO'];
      var file = ruta + varExcel;
      console.log(itemFila['ANTECEDENTES']);





      //Traducción de variables TIPO DE DOCUMENTO
      const tipodocumento = itemFila['TIPO DOCUMENTO (debe existir en bd)'].toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
      console.log("Tipo de documento es: " + tipodocumento);
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
      //jsonGeneral.push(body);
      const resultado = await axios.post("http://testing.exedoc.cl:80/exedoc/rest/api/inyectarDocumento", body, {
        headers: {
          Authorization: bearerToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log(response.data);
          res.status(200).json(response.data);
        }).catch(function (error) {
          console.log(error.response.data);
          res.status(200).json(error.response.data);
        });

    }
  } catch (error) {
    res.status(500).json({ message: error.message });

  }

 // res.status(200).json(jsonGeneral);
  //PEDIR HORA
  const hora2 = new Date;

  console.log("LA HORA INICIAL ES: " + hora);
  console.log("LA HORA FINAL ES: " + hora2);
}


//Ubicación del archivo PDF a copiar desde el Excel
//leerExcel('../../pdf/');


