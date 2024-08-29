import { Container } from '@mui/material';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import UsuarioFormCreate from '../../../components/usuarios/UsuarioFormCreate';
import LayoutApp from '../../../layout/LayoutApp';
import UsuariosHelpers from '../../../helpers/usuariosHelpers';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';


export default function CreateUsuario() {

  const methods = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit } = methods;
  const confirm = useConfirm();
  const router = useRouter();



  const helpersUsuario = useMemo(() => new UsuariosHelpers(confirm, enqueueSnackbar, router),[confirm, enqueueSnackbar, router]);



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