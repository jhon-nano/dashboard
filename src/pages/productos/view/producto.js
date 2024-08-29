
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
import InventariosHelpers from "../../../helpers/inventariosHelpers";
import { useModelInventarioByProductoId } from "../../../hooks/models/useModelInventario";
import { useModelProductoById } from "../../../hooks/models/useModelProducto";
import LayoutCaja from "../../../layout/LayoutCaja";
import ProductoViewFooter from "../../../components/productos/view/ProductoViewFooter";


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

  const {
    loading,
    inventarioProducto: inventarios,
    error
  } = useModelInventarioByProductoId(router.query.id)

  const { material_table } = appStore
  const { almacenesAutorizados } = userStore

  const [documentos, setDocumentos] = useState([]);
  const [open_inventarios, setOpenInventarios] = useState(false);






  const listFiles = () => {



    Storage.list(`/productos/${producto.codigo}/`)
      .then((data) => {
        setDocumentos([]);
        if (data.results.length > 0) {
          const arraySinPDF = data.results.filter(elemento => !elemento.key.endsWith(".pdf"));
          //console.log('setDocumentos')
          setDocumentos(arraySinPDF);
        }
      })
      .catch((e) => console.error(e));
  };


  const onRemoveDocumento = (key) => {
    try {
      confirm({
        title: "Confirma que desea Eliminar Documento?",
        description: key,
        confirmationText: "Si",
        cancellationText: "Cancelar",
      })
        .then(async () => {
          //console.log("ELIMINANDO");

          await Storage.remove(documentos[key].key);

          listFiles();
        })
        .catch((error) => {
          //console.log(error);
          //dispatch({ type: 'LOADING', isLoading: false })
        });
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeUpload = (files) => {

    try {
      Array.from(files).map(async (file, i) => {
        await Storage.put(`/productos/${producto.codigo}/` + file.name, file, {
          contentType: "image/*",
        })
          .then((data) => {


            listFiles();
          })
          .catch((e) => console.error(e));
      });
    } catch (error) {
      //console.log("Error uploading file: ", error);
    }
  };


  useEffect(() => {
    if (producto) {


      listFiles();

    }
  }, [producto]);



  const activeStepComponent = useCallback(() => {
    switch (value) {
      case 0:
        return (
          <ProductosCard

            producto={producto}
            linea={linea}
            categoria={categoria}
            marca={marca}
            inventarios={inventarios}
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
    inventarios
  ]);



  return (
    producto && (
      < >
        <Fullscreen >
          <Root scheme={{
            ...scheme,

          }}>
            <ProductoViewEmcabezado producto={producto} value={value} setValue={setValue} onChangeUpload={onChangeUpload} setOpenInventarios={setOpenInventarios} />

            <Stack sx={{
              flex: '1 1 auto',
              overflowY: 'auto',
            }} >


              <Content  >


                {activeStepComponent()}


              </Content>
            </Stack>

            <Footer>
              <ProductoViewFooter inventarios={inventarios} setOpenInventarios={setOpenInventarios} />
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
              data={inventarios}

              columns={[
                {
                  title: "Almacen",
                  field: "inventarioAlmacenId",
                  lookup: almacenesAutorizados?.reduce((acc, { id, codigo, nombreAlmacen }) => {
                    acc[id] = nombreAlmacen;
                    return acc;
                  }, {}),
                },

                { title: "Inventario", field: "inventario", type: 'numeric', initialEditValue: 0, editable: 'never' },
                { title: "Separado", field: "separado", type: 'numeric', initialEditValue: 0, editable: 'never' },
                { title: "Costo", field: "costo", type: 'numeric', initialEditValue: 0, editable: 'never', hidden: true },
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


              }}
            />
          </DialogContent>



        </Modal>

      </ >
    )
  );
}
ProductoID.getLayout = function getLayout(page) {
  return <LayoutCaja {...page.props} >{page}</LayoutCaja>;
};