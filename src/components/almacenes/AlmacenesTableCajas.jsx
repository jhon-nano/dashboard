import MaterialTable from '@material-table/core';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlmacenesHelpers from '../../helpers/almacenesHelpers';
import { Estado } from '../../models';





export default function AlmacenesTableCajas({ almacen }) {

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();


  const {
    material_table, open_filtro
  } = useSelector((state) => state.app);



  const helpersAlmacen = useMemo(() => new AlmacenesHelpers(enqueueSnackbar),[enqueueSnackbar]) 



  return (
    <MaterialTable
      title="CAJAS"
      columns={[
        {
          title: 'NUMERO', field: 'numero_caja', initialEditValue: '', type: 'numeric'
        },
        {
          title: 'PREFIJO', field: 'prefijo', initialEditValue: '',
        },
        {
          title: 'RESOLUCION', field: 'resolucion', initialEditValue: '',
        },
        {
          title: 'EN USO', field: 'en_uso', initialEditValue: '', type: 'boolean'
        },
        {
          title: 'ESTADO', field: 'estado', initialEditValue: '', lookup: Estado
        },
      ]}
      isLoading={!almacen}
      data={almacen?.cajas_registradoras ? almacen.cajas_registradoras : []}
      options={{
        ...material_table.options,
        pageSize: 5,
      }}
      icons={material_table.icons}
      localization={material_table.localization}
      style={material_table.style}
      editable={{
        //isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
        //isEditHidden: rowData => rowData.name === 'x',
        //isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
        //isDeleteHidden: rowData => rowData.name === 'y',
        //onBulkUpdate: changes =>
        //  new Promise((resolve, reject) => {
        //    setTimeout(() => {
        //      /* setData([...data, newData]); */
        //      resolve();
        //    }, 1000);
        //  }),
        onRowAddCancelled: rowData => console.log('Row adding cancelled'),
        onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),

        onRowAdd: (newData) => helpersAlmacen.onRowAddTableAlmacenCaja(newData, almacen.id),
        onRowUpdate: (newData, oldData) => helpersAlmacen.onRowUpdateTableAlmacenCaja(newData, oldData, almacen.id),

 

      }}

    />
  )
}
