import { Container } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import UsuarioFormUpdate from '../../../components/usuarios/UsuarioFormUpdate';
import UsuariosHelpers from '../../../helpers/usuariosHelpers';
import { useModelIDUsuario } from '../../../hooks/models/useModelUsuario';
import LayoutApp from '../../../layout/LayoutApp';



export default function UpdateUsuarioId() {

  const confirm = useConfirm();
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const helpersUsuario = useMemo(() => new UsuariosHelpers(confirm, enqueueSnackbar, router), [confirm, enqueueSnackbar, router]);


  const methods = useForm({
    defaultValues: {
      username: '',
      nombreUsuario: '',
      sub: ''
    }
  });

  const { handleSubmit, control, setValue, reset } = methods;

  const { loading, usuario, almacenes_usuario, permisos_usuario, error } = useModelIDUsuario(router.query.id);


  const onError = (errors, e) => {
    for (const campo in errors) {
      if (errors.hasOwnProperty(campo)) {
        const errores = errors[campo];
        const mensaje = `Campo ${campo}: ${errores.message}`;
        // Utiliza notificacion para mostrar notificaciones
        enqueueSnackbar(mensaje, {
          variant: "warning",
        });
      }
    };
  }


  return (
    <Container maxWidth='md'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(helpersUsuarios.onSubmitUpdateUsuario, onError)}>
          <UsuarioFormUpdate
            usuario={usuario}
          />
        </form>
      </FormProvider>
    </Container>
  );
}

UpdateUsuarioId.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props}>{page}</LayoutApp>;
};