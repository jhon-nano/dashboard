import { FormHelperText, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from "react-select/creatable";
import { Estado } from '../../../models';
import { openCreateProducto } from '../../../store/actions/productos';
import TypesProductos from '../../../types/typesProductos';
import AuthUtils from '../../../utils/authUtils';
import { useSnackbar } from 'notistack';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function CreatableSelectProducto({ selectOption, clearOption }) {

    const dispatch = useDispatch()
    const {
        productos
    } = useSelector((state) => state.productos);


    const { enqueueSnackbar } = useSnackbar();

    const userStore = useSelector((state) => state.usuario);
    const { user: userCognito } = useAuthenticator((context) => [context.user]);

    const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);




    return (
        <Stack sx={{ minWidth: 360 }}>
            <CreatableSelect
                isClearable

                error={true}
                placeholder="Buscar o Ingresar un Producto"
                styles={{
                    option: (base) => ({
                        ...base,
                        border: `1px dotted grey`,
                        height: "100%",
                    }),
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "grey" : "green",
                        color: "red",
                    }),
                    // Fixes the overlapping problem of the component
                    menu: (provided) => {
                        return ({
                            ...provided,
                            zIndex: 9999,
                            minWidth: 320,
                            width: 520
                        });
                    },
                    menuList: (base) => {
                        return ({
                            ...base,
                            color: 'black'
                        })
                    }
                }}
                getOptionLabel={(option) =>
                    `${option.codigo}: ${option.nombreProducto} - ${option.barras} ${option.presentacion}`
                }
                onCreateOption={() => utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().AGREGAR_PRODUCTO, true)
                    && dispatch(openCreateProducto(true))}
                options={productos.map((element) => {


                    return {
                        value: element.id,
                        label: `${element.nombreProducto} - ${element.presentacion}`,
                        ...element,
                    };


                })}
                onChange={(data, e) => {


                    switch (e.action) {
                        case "select-option":
                            selectOption(data)
                            break;
                        case "clear":
                            clearOption()
                            break;
                        default:
                            break;
                    }
                }}
                //filterOption={(option, inputValue) =>
                //    inputValue.length >= 4 ?
                //        inputValue
                //            .split(" ")
                //            .every((s) =>
                //                option.nombreProducto
                //                    .toLowerCase()
                //                    .includes(s.toLowerCase())
                //            )
                //        : false
                //}
                noOptionsMessage={({ inputValue }) =>
                    inputValue.trim().length < 4
                        ? "Ingrese una búsqueda para comenzar"
                        : "No hay datos disponibles"
                }
                //onChange={onChange}
                isOptionDisabled={(option) => option.estado == Estado.INACTIVO}
            />
        </Stack>
    )
}
