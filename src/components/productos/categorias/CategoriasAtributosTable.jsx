import MaterialTable from '@material-table/core';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAuthenticator } from '@aws-amplify/ui-react';
import CategoriasHelpers from '../../../helpers/categoriasHelpers';
import { useModelID } from '../../../hooks/useModel';
import { Categoria } from '../../../models';
import CategoriaService from '../../../services/categoriaService';
import TypesProductos from '../../../types/typesProductos';
import AuthUtils from '../../../utils/authUtils';
import TitleTable from '../../tablas/TitleTable';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';

export default function CategoriasAtributosTable({ id }) {

    const { enqueueSnackbar } = useSnackbar();
    const confirm = useConfirm();

    const userStore = useSelector((state) => state.usuario)
    const { user: userCognito } = useAuthenticator((context) => [context.user]);


    const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);

    const helpersCategorias = useMemo(() => new CategoriasHelpers(confirm, enqueueSnackbar), [confirm, enqueueSnackbar]);
    const serviceCategorias = useMemo(() => new CategoriaService(), []);

    const {
        material_table
    } = useSelector((state) => state.app);

    const { data: categoria } = useModelID(Categoria, id);

    useEffect(() => {
        if (categoria && categoria.Atributos == null) {
            serviceCategorias.updateCategoriaAtributos(id, [])
        }
    }, [categoria])



    return categoria && categoria.Atributos !== null && (
        <MaterialTable
            title={<TitleTable icon={'edit_attributes'} nombreModulo={'ATRIBUTOS'} detalle={"Categoria " + categoria?.nombreCategoria} />

            }
            data={categoria.Atributos}
            columns={helpersCategorias.columns_atributos}
            options={{
                ...material_table.options,

                pageSize: 5,

            }}
            icons={material_table.icons}
            localization={material_table.localization}

            editable={utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().EDITAR_CATEGORIAS_ATRIBUTOS) ? {
                onRowAdd: newData => helpersCategorias.onRowAddTableCategoriaAtributos(categoria, newData),
                onRowUpdate: (newData, oldData) => helpersCategorias.onRowUpdateTableCategoriaAtributos(categoria, newData, oldData),
                onRowDelete: oldData => helpersCategorias.onRowDeleteTableCategoriaAtributos(categoria, oldData)
            } : null}
        />
    )
}
