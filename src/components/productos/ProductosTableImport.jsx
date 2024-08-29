import { useAuthenticator } from '@aws-amplify/ui-react';
import MaterialTable from '@material-table/core';
import { BackupTwoTone } from '@mui/icons-material';
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Input,
    useMediaQuery
} from '@mui/material';
import FileSaver from "file-saver";
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeAnimated from 'react-select/animated';
import CreatableSelect from "react-select/creatable";
import * as XLSX from "xlsx";
import ProductosHelpers from '../../helpers/productosHelpers';
import { openFiltroData } from '../../store/actions/app';
import { filteringAtributosProductos, filteringCategoriasProductos, filteringLineasProductos, filteringMarcasProductos, filteringProductos, groupingProductos } from '../../store/actions/productos';
import TypesProductos from '../../types/typesProductos';
import AuthUtils from '../../utils/authUtils';
import FormatUtils from '../../utils/formatUtils';
import FilterComponent from '../otros/FilterComponent';
import { CheckCategorias, CheckLineas, CheckMarcas } from '../tablas/Filtros/CheckProductos';
import { DrawerFiltrosTable } from '../tablas/FiltrosTable';

const animatedComponents = makeAnimated();

export default function ProductosTableImport({ data, loadingProducto, data_lineas, data_categorias, data_marcas }) {

    const tableRef = useRef(null);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const [data_excel, setData] = useState([]);
    const [lineas, setLineas] = useState({});
    const [categorias, setCategorias] = useState({});
    const [marcas, setMarcas] = useState({});

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


    const moduloProducto = new TypesProductos(useRouter());


    const { user: userCognito } = useAuthenticator((context) => [context.user]);
    const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);

    const utilsFormat = new FormatUtils();
    const helpersProducto = new ProductosHelpers(useSelector((state) => state.productos),useDispatch(), useConfirm(), useSnackbar(), useRouter());


    const [propiedadesUnicas, setDataFiltros] = useState([]);


    const handleFilterChange = (selectedFilters) => {
        // Implement your filtering logic here
        // For example, you could filter your data based on the selected filters
        // and then update the 'filteredData' state with the result
        dispatch(filteringAtributosProductos(selectedFilters))

    };


    const calcularPropiedadesUnicas = () => {
        const propiedades = {};

        productosData.forEach(producto => {
            const datosProducto = producto.datos_producto;

            for (const prop in datosProducto) {
                if (datosProducto.hasOwnProperty(prop)) {
                    if (!propiedades[prop]) {
                        propiedades[prop] = [];
                    }

                    if (!propiedades[prop].includes(datosProducto[prop])) {
                        propiedades[prop].push(datosProducto[prop]);
                    }
                }
            }
        });

        return propiedades;
    };

    useEffect(() => {


        const propiedades = calcularPropiedadesUnicas();




        setDataFiltros(propiedades);


    }, [data]);


    useEffect(() => {
        setLineas(
            data_lineas.reduce(function (res, value) {
                res[value.id] = String(value.nombreLinea);
                return res;
            }, {})
        );

        return () => {
            setLineas({});
        };
    }, [data_lineas]);
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
    useEffect(() => {
        setMarcas(
            data_marcas.reduce(function (res, value) {
                res[value.id] = String(value.nombreMarca);
                return res;
            }, {})
        );

        return () => {
            setMarcas({});
        };
    }, [data_marcas]);



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

                setData(Object.values(data_excel[0].data));

            
            };
        }
    };




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
                title='Importar Productos Excel'
                columns={[
                    {
                        title: "CODIGO",
                        field: "codigo",
                        align: "center",
                        filtering: false,
                    },
                    {
                        title: "PRODUCTO",
                        field: "nombreProducto",
                        render: (rowData) => rowData.nombreProducto.toUpperCase(),
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
                    {
                        title: "IVA",
                        field: "iva",
                        align: "center",
                        hidden: false,
                        headerStyle: {
                            width: "5%",
                            maxWidth: "5%",
                            align: "center",
                        },
                        cellStyle: (rowData) => ({
                            width: "5%",
                            maxWidth: "5%",
                        }),
                    },
                    {
                        title: "BARRAS",
                        field: "barras",
                        align: "center",
                        hidden: false,
                        headerStyle: {
                            width: "5%",
                            maxWidth: "5%",
                            align: "center",
                        },
                        cellStyle: (rowData) => ({
                            width: "5%",
                            maxWidth: "5%",
                        }),
                    },
                    {
                        title: "PRESENTACION",
                        field: "presentacion",
                        type: "string",
                        align: "left",
                        filtering: false,
                        grouping: false,
                        defaultSort: "asc",
                        headerStyle: {
                            width: "15%",
                            maxWidth: "15%",
                            align: "center",
                        },
                        cellStyle: (rowData) => ({
                            width: "15%",
                            maxWidth: "15%",
                        }),
                    },
                    {
                        title: "LINEA",
                        field: "productoLineaId",
                        align: "center",
                        type: "string",
                        lookup: lineas,

                        headerStyle: {
                            width: "15%",
                            maxWidth: "15%",
                            align: "center",
                        },
                        cellStyle: (rowData) => ({
                            width: "15%",
                            maxWidth: "15%",
                        }),
                    },
                    {
                        title: "CATEGORIA",
                        field: "productoCategoriaId",
                        align: "center",
                        type: "string",
                        lookup: categorias,
                        editComponent: (props) => (
                            <CreatableSelect
                                placeholder="Categorias"
                                isClearable
                                styles={{
                                    // Fixes the overlapping problem of the component
                                    menu: (provided) => ({
                                        ...provided,
                                        zIndex: 9999,
                                    }),
                                }}
                                options={data_categorias.map((element) => {
                                    return {
                                        key: element.id,
                                        value: element.id,
                                        label: element.nombreCategoria,
                                    };
                                })}
                                onCreateOption={handleCreateCategoria}
                                onChange={(e) => props.onChange(e.value)}
                                isLoading={loading_cat}
                                isDisabled={loading_cat}
                            />
                        ),
                        headerStyle: {
                            width: "5%",
                            maxWidth: "5%",
                            align: "center",
                        },
                        cellStyle: (rowData) => ({
                            width: "5%",
                            maxWidth: "5%",
                        }),
                    },

                    {
                        title: "MARCA",
                        field: "productoMarcaId",
                        align: "center",
                        lookup: marcas,
                        type: "string",
                        headerStyle: {
                            width: "15%",
                            maxWidth: "15%",
                            align: "center",
                        },
                        cellStyle: (rowData) => ({
                            width: "15%",
                            maxWidth: "15%",
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
                        disabled: data.some(
                            (art) =>
                                art.barras ===
                                rowData.barras || art.codigo ===
                                rowData.codigo 
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
                                        nombreProducto,
                                        iva,
                                        venta,
                                        insumos,

                                        barras,
                                        presentacion,
                                        descripcion,
                                        estado,
                                        cambio_precio,
                                        productoCategoriaId,
                                    } = element;

                                    nombreProducto = nombreProducto.toUpperCase();

                                    return {
                                        nombreProducto,
                                        iva,
                                        venta,
                                        insumos,

                                        barras,
                                        presentacion,
                                        descripcion,
                                        estado,
                                        cambio_precio,
                                        productoCategoriaId,
                                    };
                                });

                                exportToExcel(datos_export, "Listado Articulos Importar");
                            },
                        },
                        {
                            label: "Plantilla",
                            exportFunc: (cols, datas) =>    {
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
                                  id: "",
                                  nombreProducto: "",
                                  iva: "",
                                  venta: "",
                                  insumos: "",
                            
                                  barras: "",
                                  presentacion: "",
                                  descripcion: "",
                                  estado: "",
                                  cambio_precio: "",
                                  productoCategoriaId: "",
                                },
                              ];
                              exportToExcel(data2, "Plantilla Articulos");
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
                            if (datas.some((art) => art.iva == undefined)) {
                                return enqueueSnackbar("Falta completar IVAS!", {
                                    variant: "error",
                                });
                            } else if (
                                datas.some((art) => art.productoLineaId == undefined)
                            ) {
                                return enqueueSnackbar("Falta completar Linea!", {
                                    variant: "error",
                                });
                            } else if (
                                datas.some((art) => art.productoMarcaId == undefined)
                            ) {
                                return enqueueSnackbar("Falta completar Marca!", {
                                    variant: "error",
                                });
                            } else if (
                                datas.some((art) => art.productoCategoriaId == undefined)
                            ) {
                                return enqueueSnackbar("Falta completar Categorias!", {
                                    variant: "error",
                                });
                            } else {
                                //console.log('INGRESANDO')
                                datas.map((newData) => {
                                    helpersProducto.onRowAddTableProducto(newData);
                                })
                             
                              
                            }
                        },
                    },
                ]}
            />


            <DrawerFiltrosTable
                open={open_filtro}
                setOpen={openFiltroData}
                filtering={filtering}
                grouping={grouping}
                filteringApp={filteringProductos}
                groupingApp={groupingProductos}
                filter_fechas={null}

            >
                <CheckLineas data={data_lineas} filter={filter_lineas} filtering={filteringLineasProductos} />
                <CheckCategorias data={data_categorias} filter={filter_categorias} filtering={filteringCategoriasProductos} />

                <CheckMarcas data={data_marcas} filter={filter_marcas} filtering={filteringMarcasProductos} />


                <Divider variant="middle" >Otros Filtros</Divider>
                <FilterComponent data={propiedadesUnicas} onFilterChange={handleFilterChange} />


            </DrawerFiltrosTable>
        </>

    )
}
