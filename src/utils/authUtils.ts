import CustomNotification from "../models/CustomNotification";

export default  class AuthUtils {


  private notificacion: any;
  private store: any;
  private autenticador: any;

  constructor(notificacion:any,store:any,autenticador:any,) {
    this.notificacion = notificacion;
    this.store = store
    this.autenticador = autenticador;
  }

  isAdmin(userCognito: any): boolean {
    return userCognito.signInUserSession?.idToken?.payload['cognito:groups']?.includes('ADMINS')
  }
  
  isUser(userCognito: any): boolean {
    return userCognito.signInUserSession?.idToken?.payload['cognito:groups']?.includes('USERS')
  }

  isModuloAuthorized = (modulo: any, onNotification: boolean): boolean => {
    try{  
      
      const autorizacion = this.isAdmin(this.autenticador) ||  this.store.usuario.modulos_new.some((e: any) => e.path === modulo.path);

      if(!autorizacion && onNotification){
        throw new CustomNotification("No tiene Autorizacion!", 404,modulo);
      }else if(autorizacion && onNotification){
        this.notificacion("Bienvenido a la LINEA de "+modulo.nombreModulo+"!", {
          variant: 'info',
          data: modulo
        }
        );
      }

      return   autorizacion
  } catch (error: any) {
    if (error instanceof CustomNotification) {
      this.notificacion(error.message, {
        variant: 'authModuloReport',
        data: error.data
      });
    }else{
      const error_500 = new CustomNotification(error.message,500);
      error_500.showNotification(this.notificacion);
    }
    return false
  }


  };
  
  isPermisoAuthorized = ( permiso: any,onNotification: boolean ): boolean => {
     try{  

      const isAdminUser = this.isAdmin(this.autenticador)
      //

      const isUserWithPermission =
      this.isUser(this.autenticador) && 
      this.store.permisosAutorizados.some((elem: any) => elem == permiso.code);

      if(!isAdminUser && !isUserWithPermission && onNotification){
        throw new CustomNotification("No tiene Permiso.", 404,permiso);
      }

      return isAdminUser || isUserWithPermission;
    } catch (error: any) {
      console.error(error)
      if (error instanceof CustomNotification) {
        this.notificacion(error.message, {
          variant: 'authPermisoReport',
          data: error.data
        });
      }else{
        const error_500 = new CustomNotification(error.message,500);
        error_500.showNotification(this.notificacion);
      }
      return false
    }

  }
  
  
}
