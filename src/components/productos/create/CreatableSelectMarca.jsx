import { useAuthenticator } from '@aws-amplify/ui-react';
import { FormHelperText, Skeleton, useTheme } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import CreatableSelect from "react-select/creatable";
import MarcasHelpers from '../../../helpers/marcasHelpers';
import { useModel } from '../../../hooks/useModel';
import { Estado, Marca } from '../../../models';
import TypesProductos from '../../../types/typesProductos';
import AuthUtils from '../../../utils/authUtils';


export default function MarcaCreatableSelect({ loading }) {

    const theme = useTheme();
    const confirm = useConfirm();

    const { enqueueSnackbar } = useSnackbar();

    const userStore = useSelector((state) => state.usuario);
    const { user: userCognito } = useAuthenticator((context) => [context.user]);

    const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);
    const helpersMarcas = useMemo(() => new MarcasHelpers(confirm, enqueueSnackbar), [confirm, enqueueSnackbar]);



    const {
        formState: { errors },
        control,
        setFocus,
        setValue
    } = useFormContext();

    const {
        loading: loadingMarcas,
        data: marcas,
        error: errorMarcas,
    } = useModel(Marca);

    return (
        loading ? (
            <Skeleton height={50} />
        ) : (
            <>
                <FormHelperText
                    id="helper-text-marca"
                    color={theme.palette.secondary.main}
                    sx={{ fontWeight: 'bold' }}
                >
                    {marcas.length + ' MARCAS'}
                </FormHelperText>
                <Controller
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}
                            placeholder="Seleccione una Marca"
                            isClearable
                            styles={{
                                // Fixes the overlapping problem of the component
                                menu: (provided) => ({
                                    ...provided,
                                    zIndex: 9999,
                                }),
                            }}
                            options={marcas.filter((e) => e.estado == Estado.ACTIVO).map((e) => {
                                return { value: e.id, label: e.nombreMarca, ...e };
                            })}
                            isOptionDisabled={(option) =>
                                option.estado == Estado.INACTIVO
                            }
                            onCreateOption={(inputValue) =>
                                utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().AGREGAR_MARCA, true)
                                && helpersMarcas.onSubmitCreateMarca(inputValue)}
                            isLoading={loadingMarcas}
                            isDisabled={errorMarcas}
                        />
                    )}
                    name="marca"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Esta entrada es Obligatoria.",
                        },
                    }}
                />
                <FormHelperText id="helper-text-tipo-pedido" error>
                    {errors && errors.marca && errors.marca.message}
                </FormHelperText>
            </>
        )
    )
}
