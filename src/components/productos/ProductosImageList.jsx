import { Image } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { Delete, StarBorderTwoTone } from '@mui/icons-material';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Skeleton, useTheme } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Storage } from 'aws-amplify';
import { useConfirm } from "material-ui-confirm";
import dynamic from 'next/dynamic';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ProductosHelpers from "../../helpers/productosHelpers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
const ReactViewer = dynamic(() => import("react-viewer"), { ssr: false });





export function ProductosImageList({  producto, documentos, onRemoveDocumento, detalle }) {

  const theme = useTheme();
  const confirm = useConfirm()

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currImg, setCurrImg] = useState(0);


  const [viewer_open, setOpenViewer] = useState(false);

  const helpersProducto = new ProductosHelpers(useSelector((state) => state.productos),useDispatch(), useConfirm(), useSnackbar(), useRouter());



  useEffect(() => {

    // //console.log(documentos);
    async function fetchData() {
      setLoading(true);
    
      // You can await here
      let signedFiles = documentos.map((f) => Storage.get(f.key));
      // //console.log(signedFiles);
      Promise.all(signedFiles).then((e) => {
        setFiles([])
        setLoading(false);
        setFiles(
          e.map((file) => {
            const src = file;

            return { src };
          })
        );
      });

      // ...
    }

    if (documentos.length > 0) {
      fetchData();
    }
  }, [documentos]); 






  return (
    <>
      <Image
        level="public"
        style={{
          "--width": "100%",
        }}
        onClick={() => {
          setCurrImg(i);
          setOpenViewer(true);
        }}
      />
      {!loading && files.length > 0 ? (
        documentos.length > 0 && (
          <Paper >
            <ImageList

              images={files}
              rows={1}
              sx={{
                minHeight: 300
              }}
            >


              {files.map((file, i) => (
                <ImageListItem key={i}>
                  <Image
                    level="public"
                    src={file.src}
                    style={{
                      "--width": "100%",
                    }}
                    onClick={() => {
                      setCurrImg(i);
                      setOpenViewer(true);
                    }}
                  />
                  <ImageListItemBar
                    title={file.key}
                    position="top"
                    sx={{
                      background:
                        "linear-gradient(to bottom, " +
                        theme.palette.primary.main +
                        " 0%, " +
                        "" +
                        theme.palette.primary.light +
                        " 10%, rgba(0,0,0,0) 100%)",
                    }}
                    actionIcon={
                      <IconButton onClick={() => helpersProducto.handleStarImagen(producto?.id,documentos[i].key)}>
                        <StarBorderTwoTone />
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <ReactViewer
              visible={viewer_open}
              onClose={() => {
                setOpenViewer(false);
              }}
              images={files}
              zIndex={1500}
              activeIndex={currImg}
            />
          </Paper >
        )
      ) : (
        <Box>
          <Alert variant="filled" severity="error">
            <AlertTitle>EL PRODUCTO</AlertTitle>
            No presenta ninguna Imagen — <strong>SIN ARCHIVOS!</strong>
          </Alert>
          <Skeleton sx={{ height: 190, margin: 2 }} variant="rectangular" />
        </Box>
      )
      }


    </>
  );
}

