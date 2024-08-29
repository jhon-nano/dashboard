import MaterialTable from '@material-table/core';
import { BackupTwoTone } from '@mui/icons-material';
import {
    Box,
    Button,
    ButtonGroup,
    Input,
    useMediaQuery
} from '@mui/material';
import FileSaver from "file-saver";
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from "xlsx";
import CategoriasHelpers from '../../../helpers/categoriasHelpers';



export default function CategoriasTableImport({ loadingProducto, data_categorias }) {

    const tableRef = useRef(null);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const [data_excel, setData] = useState([]);
    const [lineas, setLineas] = useState({});
    const [categorias, setCategorias] = useState({});
    const [marcas, setMarcas] = useState({});
    const helpersCategorias = new CategoriasHelpers(useConfirm(), useSnackbar());
    const productos = useSelector((state) => state.productos);

    const {
        material_table,
        open_filtro
    } = useSelector((state) => state.app);

    const {
        usuario
    } = useSelector((state) => state.usuario);



    const {
        filtro,
        productos: productosData,
        filtering,
        grouping,
        filter_lineas,
        filter_categorias,
        filter_marcas
    } = productos;






    useEffect(() => {
        setCategorias(
            data_categorias.reduce(function (res, value) {
                res[value.id] = String(value.nombreCategoria);
                return res;
            }, {})
        );

        return () => {
            setCategorias({});
        };
    }, [data_categorias]);




    const handleClickCartera = (event) => {
        const target = event.target;
        const name = target.name;

        if (name === "file") {
            let reader = new FileReader();
            reader.readAsArrayBuffer(target.files[0]);
            reader.onloadend = (e) => {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: "array", cellDates: true });

                workbook.SheetNames.forEach(function (sheetName) {
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheetName]
                    );
                    data_excel.push({
                        data: XL_row_object,
                        sheetName,
                    });
                });

                // Crear un conjunto para almacenar las categorías únicas
                const uniqueCategories = new Set();

                // Filtrar el array original para obtener solo los elementos únicos
                const uniqueData = Object.values(data_excel[0].data).filter(item => {
                    // Si la categoría no está en el conjunto, agregarla y devolver true para mantener el elemento
                    if (!uniqueCategories.has(item.nombreCategoria)) {
                        uniqueCategories.add(item.nombreCategoria);
                        return true;
                    }
                    // Si la categoría ya está en el conjunto, devolver false para eliminar el elemento duplicado
                    return false;
                });

                console.log(uniqueData);



                setData(uniqueData);


            };
        }
    };

    console.log(data_excel)


    return (
        <>
            <ButtonGroup>
                <Button
                    startIcon={<BackupTwoTone />}
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    <Box display="none">
                        <Input
                            required
                            type="file"
                            name="file"
                            id="file"
                            accept="application/vnd.ms-Excel"
                            onChange={handleClickCartera}
                            placeholder="Archivo de excel"
                        />
                    </Box>
                    <label htmlFor="file">Cargar</label>
                </Button>

            </ButtonGroup>
            <MaterialTable
                tableRef={tableRef}
                title='Importar Categorias Excel'
                columns={[

                    {
                        title: "CATEGORIA",
                        field: "nombreCategoria",
                        render: (rowData) => rowData.nombreCategoria.toUpperCase(),
                        type: "string",
                        align: "left",
                        filtering: false,
                        grouping: false,
                        defaultSort: "asc",
                        headerStyle: {
                            width: "40%",
                            maxWidth: "40%",
                            align: "center",
                        },
                        cellStyle: (rowData) => ({
                            width: "70%",
                            maxWidth: "70%",
                        }),
                    },

                ]}
                onSelectionChange={(e) => {
                    //console.log(e);
                }}
                data={data_excel}

                options={{
                    ...material_table.options,
                    filtering: filtering,
                    grouping: grouping,
                    selection: true,

                    selectionProps: (rowData) => ({
                        disabled: data_categorias.some(
                            (art) =>
                                art.nombreCategoria ===
                                rowData.nombreCategoria
                        ),
                        color: "primary",
                    }),
                    exportMenu: [
                        {
                            label: "Exportar Excel",
                            exportFunc: (cols, datas) => {
                                const fileType =
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                                const fileExtension = ".xlsx";

                                const exportToExcel = (csvData, fileName) => {
                                    const ws = XLSX.utils.json_to_sheet(csvData);
                                    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                                    const excelBuffer = XLSX.write(wb, {
                                        bookType: "xlsx",
                                        type: "array",
                                    });
                                    const data = new Blob([excelBuffer], { type: fileType });
                                    FileSaver.saveAs(data, fileName + fileExtension);
                                };

                                const datos_export = data_excel.map((element) => {
                                    const {
                                        nombreCategoria
                                    } = element;

                                    nombreProducto = nombreProducto.toUpperCase();

                                    return {
                                        nombreCategoria,
                                    };
                                });

                                exportToExcel(datos_export, "Listado Articulos Importar");
                            },
                        },
                        {
                            label: "Plantilla",
                            exportFunc: (cols, datas) => {
                                const fileType =
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                                const fileExtension = ".xlsx";

                                const exportToExcel = (csvData, fileName) => {
                                    const ws = XLSX.utils.json_to_sheet(csvData);
                                    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                                    const excelBuffer = XLSX.write(wb, {
                                        bookType: "xlsx",
                                        type: "array",
                                    });
                                    const data = new Blob([excelBuffer], { type: fileType });
                                    FileSaver.saveAs(data, fileName + fileExtension);
                                };
                                const data2 = [
                                    {

                                        nombreCategoria: "",

                                    },
                                ];
                                exportToExcel(data2, "Plantilla Categorias");
                            }
                        }
                    ],
                }}
                localization={material_table.localization}
                style={material_table.style}
                actions={[
                    {
                        tooltip: "INGRESAR PRODUCTOS",
                        icon: "add",
                        onClick: (evt, datas) => {
                            //console.log(datas);

                            //console.log('INGRESANDO')
                            datas.map((newData) => {
                                helpersCategorias.onRowAddTableCategoria(newData)
                            })

                            enqueueSnackbar("Articulos Registrados!", {
                                variant: "success",
                            });

                        },
                    },
                ]}
            />


        </>

    )
}
