
import {
  DialogContent,
  Stack
} from "@mui/material";
import { Storage } from 'aws-amplify';
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import MaterialTable from "@material-table/core";
import { Content, Footer, Fullscreen, getContentBasedScheme, Root } from "@mui-treasury/layout";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import Modal from "../../../components/otros/Modal";
import ProductosCard from "../../../components/productos/ProductoCard";
import { ProductosImageList } from "../../../components/productos/ProductosImageList";
import ProductoViewEmcabezado from "../../../components/productos/view/ProductoViewEmcabezado";
import ProductoViewFooter from "../../../components/productos/view/ProductoViewFooter";
import { useModelInventarioByProductoId, useModelProductoById } from "../../../hooks/models/useModelProducto";
import LayoutApp from "../../../layout/LayoutApp";
import InventariosHelpers from './../../../helpers/inventariosHelpers'

moment.locale("es");

const scheme = getContentBasedScheme();




export default function ProductoID(props) {



  const { value, setValue, appStore, userStore } = props

  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();



  const helperInventario = useMemo(() => new InventariosHelpers(enqueueSnackbar, dispatch, confirm), [enqueueSnackbar, dispatch, confirm]);



  const {
    loading: loadingProducto,
    producto,
    linea,
    categoria,
    marca,
    error: errorProducto,
  } = useModelProductoById(router.query.id);

const { inventarioProducto } = useModelInventarioByProductoId(producto?.id)

  const { material_table } = appStore
  const { almacenesAutorizados } = userStore

  const [documentos, setDocumentos] = useState([]);
  const [open_inventarios, setOpenInventarios] = useState(false);







  const activeStepComponent = useCallback(() => {
    switch (value) {
      case 0:
        return (
          <ProductosCard

            producto={producto}
            linea={linea}
            categoria={categoria}
            marca={marca}
            inventarios={inventarioProducto}
          />
        );
      case 1:
        return (
          <ProductosImageList producto={producto} documentos={documentos} onRemoveDocumento={onRemoveDocumento} detalle={'EL PRODUCTO'} />
        );

      default:
        break;
    }
  }, [
    value,
    producto,
    linea,
    categoria,
    marca,
    inventarioProducto
  ]);



  return (
    producto && (
      < >
        <Fullscreen >
          <Root scheme={{
            ...scheme,

          }}>
            <ProductoViewEmcabezado producto={producto} value={value} setValue={setValue}  setOpenInventarios={setOpenInventarios} />

            <Stack sx={{
              flex: '1 1 auto',
              overflowY: 'auto',
            }} >


              <Content  >


                {activeStepComponent()}


              </Content>
            </Stack>

            <Footer>
              <ProductoViewFooter inventarios={inventarioProducto} setOpenInventarios={setOpenInventarios} />
            </Footer>

          </Root>
        </Fullscreen>
        <Modal
          open={open_inventarios}
          onClose={() => {

            setOpenInventarios(false)
          }}

          maxWidth='md'
          sx={{ width: '100%' }}
        >

          <DialogContent >
            <MaterialTable
              title={'Almacenes Autorizados'}
              data={inventarioProducto}

              columns={[
                {
                  title: "Almacen",
                  field: "inventarioAlmacenId",
                  lookup: almacenesAutorizados?.reduce((acc, { id, codigo, tradeName }) => {
                    acc[id] = tradeName;
                    return acc;
                  }, {}),
                },

                { title: "Inventario", field: "inventario", hidden:true,type: 'numeric', initialEditValue: 0, editable: 'never' },
                { title: "Separado", field: "separado", hidden:true, type: 'numeric', initialEditValue: 0, editable: 'never' },
                { title: "Costo", field: "costo", type: 'numeric',hidden:true, initialEditValue: 0, editable: 'never', hidden: true },
                { title: "Precio", field: "precio", type: 'numeric', initialEditValue: 0 },

              ]}
              options={{
                ...material_table.options,
                pageSize: 5,
              }}
              icons={material_table.icons}
              localization={material_table.localization}
              style={material_table.style}
              editable={{
                onRowAdd: (newData) => helperInventario.onRowAddTableInventario(newData, producto.id),
                onRowUpdate: (newData,oldData) => helperInventario.onRowUpdateTableInventario(newData, oldData),
              }}
            />
          </DialogContent>



        </Modal>

      </ >
    )
  );
}
ProductoID.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props} >{page}</LayoutApp>;
};