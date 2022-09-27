import axios from "axios";
import { obtenerAccessToken } from "./ObtenerToken";
import path from "path";
import { promises as fs } from 'fs';

const XLSX = require('xlsx');

export default async function handler(req, res) {

  
  const ruta = req.body.data.rutaExpediente+'/';
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

  //Valores nombre documento
  const jsonGeneral = []
  for (const itemFila of dataExcel) {
    const bearerToken = await obtenerAccessToken();
    var varExcel = itemFila['NOMBRE DOCUMENTO'];
    var file = ruta + varExcel;
    console.log(itemFila['ANTECEDENTES']);

    //Copiar archivo
    const fs = require('fs');
    fs.copyFile(file, "pdfGuardados/" + itemFila['NOMBRE DOCUMENTO'], (err) => {
      if (err) {
        console.log("Error no se encuentra:", err);
      }
      else {
      }
    });



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
          tipoDocumento: itemFila['TIPO DOCUMENTO (debe existir en bd)'],
          numero: "",
          numeroDocumentoPapel: itemFila['N DOCUMENTO (numérico)'],
          fecha: "",
          ciudad: "",
          antecedentes: itemFila['ANTECEDENTES'],
          materia: itemFila['MATERIA'],
          reservado: false,
          plazo: "",
          nivelUrgencia: "",
          indicacion: "",
          autor: itemFila['AUTOR (debe existir en bd)'],
          emisor: itemFila['EMISOR DOCUMENTO (debe existir en bd)'],
          dataArchivo: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          nombreArchivo: "dummy.pdf",
          contentType: "application/pdf",
          tipoDescarga: "url",
          distinatarios: [
            {
              usuario: itemFila['DESTINATARIO (debe existir en bd)'],
            },
          ],
          parrafos: []
         // revisores: [],
          //visadores: "",
          //firmantes: "",
          //distribucion: "",
        },
      ]
    };
    //jsonGeneral.push(body);
    const resultado= await axios.post("http://testing.exedoc.cl:80/exedoc/rest/api/inyectarDocumento", body, {
        headers: {
          Authorization: bearerToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      
      console.log(resultado);

  }

  res.status(200).json(jsonGeneral);
 //PEDIR HORA
 const hora2 = new Date;
 
 console.log("LA HORA INICIAL ES: "+hora);
 console.log("LA HORA FINAL ES: "+hora2);
}


//Ubicación del archivo PDF a copiar desde el Excel
//leerExcel('../../pdf/');


