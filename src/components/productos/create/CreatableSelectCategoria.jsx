import { useAuthenticator } from '@aws-amplify/ui-react';
import { FormHelperText, Skeleton, useTheme } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import CreatableSelect from "react-select/creatable";
import CategoriasHelpers from '../../../helpers/categoriasHelpers';
import { useModel } from '../../../hooks/useModel';
import { Categoria, Estado } from '../../../models';
import TypesProductos from '../../../types/typesProductos';
import AuthUtils from '../../../utils/authUtils';


export default function CategoriaCreatableSelect({ loading }) {

    const theme = useTheme();
    const confirm = useConfirm()

    const { enqueueSnackbar } = useSnackbar();

    const userStore = useSelector((state) => state.usuario);
    const { user: userCognito } = useAuthenticator((context) => [context.user]);


    const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);
    const helpersCategorias = useMemo(() => new CategoriasHelpers(confirm, enqueueSnackbar), [confirm, enqueueSnackbar]);


    const {
        formState: { errors },
        control,
        setFocus,
        setValue
    } = useFormContext();

    const {
        loading: loadingCategorias,
        data: categorias,
        error: errorCategorias,
    } = useModel(Categoria);



    return (loading ? (
        <Skeleton height={50} />
    ) : (
        <>
            <FormHelperText
                id="helper-text-categoria"
                color={theme.palette.secondary.main}
                sx={{ fontWeight: 'bold' }}
            >
                {categorias.length + ' CATEGORIAS'}
            </FormHelperText>
            <Controller
                render={({ field }) => (
                    <CreatableSelect
                        {...field}
                        placeholder="Seleccione una Categoria"
                        isClearable
                        styles={{
                            // Fixes the overlapping problem of the component
                            menu: (provided) => ({
                                ...provided,
                                zIndex: 9999,
                            }),
                        }}
                        options={categorias.filter((e) => e.estado == Estado.ACTIVO).map((e) => {
                            return { value: e.id, label: e.nombreCategoria, ...e };
                        })}
                        isOptionDisabled={(option) =>
                            option.estado == Estado.INACTIVO
                        }
                        onCreateOption={(inputValue) =>
                            utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().AGREGAR_CATEGORIA, true)
                            && helpersCategorias.onSubmitCreateCategoria(inputValue)}
                        isLoading={loadingCategorias}
                        isDisabled={errorCategorias}
                    />
                )}
                name="categoria"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: "Esta entrada es Obligatoria.",
                    },
                }}
            />
            <FormHelperText id="helper-text-tipo-pedido" error>
                {errors && errors.categoria && errors.categoria.message}
            </FormHelperText>
        </>
    ));
}
