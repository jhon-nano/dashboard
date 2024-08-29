import { Auth  } from 'aws-amplify';

export default  class AuthHelpers {
  private confirm: any;
  private notificacion: any;
  private channel: any



  constructor(confirm: any,notificacion: any,channel:any) {
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.channel = channel;
   
  }


  handleExitToApp(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    this.confirm({
      title: "SALIR DE LA APLICACION ?",
      description: "Presione el botón CONFIRMAR para SALIR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "primary",
      },
    })
      .then(() => {
        try {
          //console.log('Cerrando sesión...');


          // Llama a tu función de cierre de sesión aquí
          Auth.signOut({global:true})
          window.localStorage.clear();

          this.channel.postMessage('CLOSE_APP');
          this.channel.close();
        } catch (error) {
          // Manejo de errores
        }
      })
      .catch((error: any) => {
        console.error(error)
      });
  }


}
