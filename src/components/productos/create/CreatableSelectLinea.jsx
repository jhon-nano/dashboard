import { useAuthenticator } from '@aws-amplify/ui-react';
import { FormHelperText, Skeleton, useTheme } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import CreatableSelect from "react-select/creatable";
import LineasHelpers from '../../../helpers/lineasHelpers';
import { useModel } from '../../../hooks/useModel';
import { Estado, Linea } from '../../../models';
import TypesProductos from '../../../types/typesProductos';
import AuthUtils from '../../../utils/authUtils';

export default function CreatableSelectLinea({ loading }) {

    const theme = useTheme();
    const confirm = useConfirm();
    const { enqueueSnackbar } = useSnackbar();

    const userStore = useSelector((state) => state.usuario);

    const { user: userCognito } = useAuthenticator((context) => [context.user]);

    const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);
    const helpersLineas = useMemo(() => new LineasHelpers(confirm, enqueueSnackbar), [confirm, enqueueSnackbar]);


    const {
        formState: { errors },
        control,
        setFocus,
        setValue
    } = useFormContext();

    const {
        loading: loadingLinea,
        data: lineas,
        error: errorLinea,
    } = useModel(Linea);

    return (
        loading ? (
            <Skeleton height={50} />
        ) : (
            <>
                <FormHelperText
                    id="helper-text-linea"
                    color={theme.palette.secondary.main}
                    sx={{ fontWeight: 'bold' }}
                >
                    {lineas.length + ' LINEAS'}
                </FormHelperText>
                <Controller
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}
                            placeholder="Seleccione una Linea"
                            isClearable
                            styles={{
                                // Fixes the overlapping problem of the component
                                menu: (provided) => ({
                                    ...provided,
                                    zIndex: 9999,
                                }),
                            }}
                            options={lineas.filter((e) => e.estado == Estado.ACTIVO).map((e) => {
                                return { value: e.id, label: e.nombreLinea, ...e };
                            })}
                            isOptionDisabled={(option) =>
                                option.estado == Estado.INACTIVO
                            }
                            onCreateOption={(inputValue) =>
                                utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().AGREGAR_LINEA, true)
                                && helpersLineas.onSubmitCreateLinea(inputValue)}
                            isLoading={loadingLinea}
                            isDisabled={errorLinea}
                        />
                    )}
                    name="linea"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Esta entrada es Obligatoria.",
                        },
                    }}
                />
                <FormHelperText id="helper-text-tipo-pedido" error>
                    {errors && errors.linea && errors.linea.message}
                </FormHelperText>
            </>
        )
    )
}
