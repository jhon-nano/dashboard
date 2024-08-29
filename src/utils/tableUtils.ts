import { ExportPdf } from "@material-table/exporters";

export default class TableUtils {



exportMenuTable(data: any, nombreArchivo: any): any{

    return [
        {
            label: "Exportar PDF",
            exportFunc: (cols: any, datas: any): any => ExportPdf(cols, data, nombreArchivo)
        },
    ]
}

obtenerFiltroColumnBoolean(filter: any, columna: any) {
    if (filter.find((element: any) => element.column.title == columna)) {
      const filtro = filter.find((element: any) => element.column.title == columna);
      const { value } = filtro;
  
      return value == undefined ? undefined : value;
    } else {
      return undefined;
    }
  }


}