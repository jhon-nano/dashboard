import { Estado, ModuloNew } from "../models";
import CustomNotification from "../models/CustomNotification";
import UsuarioService from "../services/usuarioService";
import TypesUsuarios from "../types/typesUsuario";
import FormatUtils from "../utils/formatUtils";

export default class UsuariosHelpers {
  
  private moduloUsuario: TypesUsuarios;
  private confirm: any;
  private notificacion: any;
  private serviceUsuario: any;

  private utilsFormat : FormatUtils;



  constructor(confirm: any,notificacion: any, router:any) {

    this.confirm = confirm;
    this.notificacion = notificacion;

    this.moduloUsuario = new TypesUsuarios(router);
    this.serviceUsuario = new UsuarioService();
    this.utilsFormat = new FormatUtils();

  }

  onSubmitCreateUsuario = (data: any) => {

    this.confirm({
      title: "Confirma que desea Registrar el Usuario?",
      description: "Presione el botón CONFIRMAR para REGISTRAR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "primary",
      },
    })
    .then(async () => {
      try {
        
        const formattedData = this.utilsFormat.formatUsuarioData(data); // Formatear y validar los datos utilizando los "helpers"
        console.log(formattedData);
        
        const usuario =  await this.serviceUsuario.create(formattedData); // Guardar el Tercero con los datos formateados
    
        if (usuario) {
            this.notificacion("Usuario Completado", { variant: "success" });

            this.moduloUsuario.pushPathView(usuario.id,'/usuario');
        }
      } catch (error: any) {
        if (error instanceof CustomNotification) {
          // Mostrar notificación de error
          error.showNotification(this.notificacion);
        }else{
          const error_500 = new CustomNotification(error.message,500);
          error_500.showNotification(this.notificacion);
        }
  }
    })
    .catch((error: any) => {
      console.error(error)
    });
  }

  onSubmitUpdateUsuario = (data: any) => {

  this.confirm({
    title: "Confirma que desea Registrar el Usuario?",
    description: "Presione el botón CONFIRMAR para REGISTRAR.",
    confirmationText: "CONFIRMAR",
    confirmationButtonProps: {
      variant: "contained",
      color: "primary",
    },
    cancellationText: "CANCELAR",
    cancellationButtonProps: {
      variant: "outlined",
      color: "primary",
    },
  })
  .then(async () => {
    try {
      
      const formattedData = this.utilsFormat.formatUsuarioData(data); // Formatear y validar los datos utilizando los "helpers"
      const usuario =  await this.serviceUsuario.update(data.id,formattedData); // Guardar el Tercero con los datos formateados
  
      if (usuario) {
          this.notificacion("Usuario Completado", { variant: "success" });
          this.moduloUsuario.pushPathView(usuario.id,'/usuario');
      }
    } catch (err) {
      console.error(err);
      this.notificacion("Error Registrando Tercero", { variant: "error" });
    } 
  })
  .catch((error: any) => {
    console.error(error)
  });
  }

  handleToProfile(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    this.confirm({
      title: "IR A VER TU PERFIL?",
      description: "Presione el botón CONFIRMAR para IR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "primary",
      },
    })
      .then(() => {

      })
      .catch((error: any) => {
        console.error(error)
      });
  }


   handleToggleGestionarModulo (datos: any, checkedModulos: any,usuario: any)  {

 
    let modulos = usuario.modulos_new ? [...usuario.modulos_new] : [];

    const modu = new ModuloNew({
      icon: datos.icon,
      nombreModulo:
        datos.nombreModulo,
      path: datos.path,
      detalle: datos.detalle,
      maneja_almacenes: datos.maneja_almacenes,
    })


    const currentIndex = checkedModulos.indexOf(datos.path);
    //console.log(currentIndex)
    if (currentIndex === -1) {


      modulos.push(modu)

      this.serviceUsuario.gestionarModulos(modulos, usuario)
        .then((datos: any) => {
          //newChecked.push(datos.moduloID);
          //setCheckedModulos(newChecked);
          this.notificacion("Almacen Autorizado !", {
            variant: "success",
          });
        })
        .catch((err: any) => {
      
          this.notificacion("Error Autorizando Modulo!", {
            variant: "error",
          });
          console.error(err);
        });
    } else {

      const modulosFiltrados = modulos.filter((modulo: any) => modulo.path !== datos.path);

      this.serviceUsuario.gestionarModulos(modulosFiltrados, usuario)
        .then((datos: any) => {
          //console.log(datos);
          this.notificacion("Modulo Eliminado!", {
            variant: "info",
          });
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  };

   handleTogglePermisoModulo (code:any, checked:any, modulo:any, permisos_usuario:any, usuario:any) {
    console.group('handleTogglePermisoModulo');
    console.log(code);
    console.log(checked);
    console.log(modulo);
    console.log(permisos_usuario);
    console.log(usuario);
    console.groupEnd();
    const currentIndex = checked.indexOf(code);

    const permiso_usuario = permisos_usuario.find(
      (e : any) =>
        e.moduloUserPermisoModuloId == modulo.id &&
        e.code == code && e.estado == Estado.ACTIVO
    );

    if (currentIndex === -1) {
  
      if (permiso_usuario !== undefined) {
        this.serviceUsuario.actualizarEstadoPermisoModulo(
          permiso_usuario.id,
          Estado.ACTIVO
        )
          .then((datos: any) => {

            this.notificacion("Permiso Autorizado!", {
              variant: "success",
            });
          })
          .catch((err: any) => {
    
            console.error(err);
          });
      } else {
        this.serviceUsuario.autorizarPermisoModulo(modulo, usuario, code)
          .then((datos: any) => {
            //newChecked.push(datos.moduloID);
            //setCheckedModulos(newChecked);
            this.notificacion("Permiso Autorizado!", {
              variant: "success",
            });
          })
          .catch((err:any) => {

            this.notificacion("Error Autorizando Modulo!", {
              variant: "error",
            });
            console.error(err);
          });
      }
    } else {
        this.serviceUsuario.actualizarEstadoPermisoModulo(
              permiso_usuario.id,
              Estado.INACTIVO
            )
        .then((datos:any) => {
     
          this.notificacion("Permiso Eliminado!", {
            variant: "info",
          });
        })
        .catch((err:any) => {
        
          console.error(err);
        });
    }
  };
  handleToggleAlmacenModulo (almacen:any, checkedAlmacenes:any, modulo:any, almacenes_usuario:any, usuario: any) {

    const currentIndex = checkedAlmacenes.indexOf(almacen);

    const almacen_usuario = almacenes_usuario
      .find(
        (e:any) =>
          e.ModuloNew?.path == modulo.path &&
          e.moduloUserAlmacenesAlmacenId == almacen
      );

    if (currentIndex === -1) {
      //console.log(almacen_usuario);
      if (almacen_usuario !== undefined) {
        this.serviceUsuario.actualizarEstadoAlmacenModulo(
          almacen_usuario.id,
          Estado.ACTIVO
        )
          .then((datos:any) => {
            //console.log(datos);
            this.notificacion("Almacen Autorizado!", {
              variant: "success",
            });
          })
          .catch((err:any) => {
            //console.log("error Eliminando Autorizando Modulo");
            console.error(err);
          });
      } else {
        this.serviceUsuario.autorizarAlmacenModulo(modulo, usuario, { id: almacen })
          .then((datos:any) => {
            //newChecked.push(datos.moduloID);
            //setCheckedModulos(newChecked);
            this.notificacion("Almacen Autorizado!", {
              variant: "success",
            });
          })
          .catch((err:any) => {
            //console.log("error Autorizando Almacen");
            this.notificacion("Error Autorizando Almacen!", {
              variant: "error",
            });
            console.error(err);
          });
      }
    } else {
      this.serviceUsuario.actualizarEstadoAlmacenModulo(
        almacen_usuario.id,
        Estado.INACTIVO
      )
        .then((datos:any) => {
          //console.log(datos);
          this.notificacion. enqueueSnackbar("Almacen Eliminado!", {
            variant: "info",
          });
        })
        .catch((err:any) => {
          //console.log("error Eliminando Autorizando Modulo");
          console.error(err);
        });
    }
  };
}

