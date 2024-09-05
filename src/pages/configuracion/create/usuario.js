import { Container } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import UsuarioFormCreate from '../../../components/usuarios/UsuarioFormCreate';
import UsuariosHelpers from '../../../helpers/usuariosHelpers';
import LayoutApp from '../../../layout/LayoutApp';


export default function CreateUsuario() {


  const { enqueueSnackbar } = useSnackbar();

  const confirm = useConfirm();
  const router = useRouter();
  const { query: { sub, username } } = router



  const helpersUsuario = useMemo(() => new UsuariosHelpers(confirm, enqueueSnackbar, router), [confirm, enqueueSnackbar, router]);



  const methods = useForm({
    defaultValues: {
      sub: sub,
      username: username
    }
  });
  const { handleSubmit } = methods;


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
        <form onSubmit={handleSubmit(helpersUsuario.onSubmitCreateUsuario, onError)}>
          <UsuarioFormCreate />
        </form>
      </FormProvider>
    </Container>
  );

}


CreateUsuario.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props}>{page}</LayoutApp>;
};