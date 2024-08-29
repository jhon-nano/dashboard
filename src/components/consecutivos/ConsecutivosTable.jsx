import MaterialTable, { MTableToolbar } from "@material-table/core";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ConsecutivosHelpers from "../../helpers/consecutivosHelpers";
import TypesConsecutivos from "../../types/typesConsecutivos";
import TypesModulos from "../../types/typesModulos";
import TitleTable from "../tablas/TitleTable";
import { grey } from "@mui/material/colors";



export default function ConsecutivosTable({ almacen, data }) {

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    material_table
  } = useSelector((state) => state.app);


  const modulo = useMemo(() => new TypesConsecutivos(), []);
  const typesModulos = useMemo(() => new TypesModulos(router), [router]);
  const helpersConsecutivo = useMemo(() => new ConsecutivosHelpers(enqueueSnackbar, router), [enqueueSnackbar, router]);

  let data_modulo = typesModulos.getModulosApp().reduce(function (res, value) {
    if (!res[value.path] && value.maneja_consecutivos) {
      res[value.path] = value.nombreModulo;
    }
    return res;
  }, {});





  return (
    <>
      <MaterialTable
        title={<TitleTable icon={modulo.icon} nombreModulo={modulo.nombreModulo} detalle={'de ' + almacen?.nombreAlmacen} />}
        data={data}
        components={{
          Toolbar: (props) => (
            <div style={{ backgroundColor: grey[300] }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        columns={[
          {
            title: "MODULO",
            field: "ModuloNew.path",
            lookup: data_modulo,
          },
          {
            title: "CODIGO",
            field: "codigo", type: 'string'
          },
          { title: "CONSECUTIVO", field: "consecutivo", type: 'numeric' },
        ]}
        options={{
          ...material_table.options,
          pageSize: 5,
        }}
        icons={material_table.icons}
        localization={material_table.localization}
        style={material_table.style}
        editable={{
          onRowAdd: (newData) => helpersConsecutivo.onRowAddTableConsecutivo(almacen, newData),
          onRowUpdate: (newData, oldData) => helpersConsecutivo.onRowUpdateTableConsecutivo(newData, oldData),

        }}
      />


    </>

  )
}
