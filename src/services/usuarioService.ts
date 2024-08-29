
// services/lazyUsuarioService.js
import { DataStore } from "@aws-amplify/datastore";
import { Estado, LazyAlmacen, LazyModuloNew, LazyModuloUserAlmacenes, LazyModuloUserPermiso, LazyUsuario, ModuloUserAlmacenes, ModuloUserPermiso, Usuario } from "../models";
import CustomNotification from "../models/CustomNotification";
import { BaseService } from './baseService';
import { IUsuarioService } from './interface/IUsuarioService';

export default class UsuarioService  extends BaseService<Usuario> implements IUsuarioService{


  
  constructor() {
    super()


  }

  async getById(id: string): Promise<LazyUsuario | null> {


      const usuario = await DataStore.query(Usuario, id);
      
      if (!usuario) {
        throw new CustomNotification("No se pudo obtener el Usuario.", 404);
      };
      return  usuario;

  }

  async getAll(): Promise<LazyUsuario[] | null> {
 

      return await DataStore.query(Usuario)

  }

  async create(data: Usuario): Promise<Usuario | null> {

    console.log('CREATE')


    const usuario = await DataStore.query(Usuario, (p) =>
        p.and((p) => [p.sub.eq(data.sub)])
      );
  
    if (usuario && usuario.length > 0) {
      throw new CustomNotification("Codigo de Verificacion En Uso.", 404);
    };



      return await DataStore.save(data);

  }

  async update(id: string, data: LazyUsuario): Promise<LazyUsuario | null> {

    const usuario = await DataStore.query(Usuario, id);

    if (!usuario) {
      throw new CustomNotification("No se pudo obtener el Usuario.", 404);
    };

    return await DataStore.save(
      Usuario.copyOf(usuario, (updated) => {
        updated.username = data.username || usuario.username;
        updated.nombreUsuario = data.nombreUsuario || usuario.nombreUsuario;
        updated.sub = data.sub || usuario.sub;
        updated.modulos_new = data.modulos_new || usuario.modulos_new;
      })
    );


  }

  async delete(id: string): Promise<LazyUsuario | null> {
  

      const usuario = this.getById(id);
      
      if (!usuario) {
        throw new CustomNotification("No se pudo obtener el Usuario.", 404);
      };

      return  DataStore.delete(usuario);
      

  }

//-------------------------------------------------------------------------------------------------------


  async getUsuarioBySub(sub: string): Promise<any | null> {

      const usuarios = await DataStore.query(Usuario, (p) =>
        p.and((p) => [p.sub.eq(sub), p.estado.eq(Estado.ACTIVO)])
      );
  
      const usuario = usuarios[0];

      if (!usuario) {
        throw new CustomNotification("No se pudo obtener el Usuario.", 404);
      };
      

      return { ...usuario };

  }

  async getUsuarioPermisos(usuario: LazyUsuario): Promise<any[]> {
    const model_permisos = await DataStore.query(ModuloUserPermiso, (c) =>
    c.and((c) => [
      c.moduloUserPermisoUsuarioId.eq(usuario.id),
      c.estado.eq(Estado.ACTIVO),
    ])
  );

  return model_permisos.map((e) => e.code);
  }

  async gestionarModulos(modulos: [LazyModuloNew], usuario: LazyUsuario): Promise<LazyUsuario | null> {


      const user = await DataStore.query(Usuario, usuario.id);
      
      if (!user) {
        throw new CustomNotification("No se pudo obtener el Usuario.", 404);
      };
      
      return await DataStore.save(
        Usuario.copyOf(usuario, (updated) => {
          updated.modulos_new = modulos || user.modulos_new;
        })
      );

  }

  async  autorizarAlmacenModulo(modulo: LazyModuloNew, usuario: LazyUsuario, almacen: LazyAlmacen): Promise<LazyModuloUserAlmacenes> {

    return await  DataStore.save(
      new ModuloUserAlmacenes({
        ModuloNew: modulo,
        Almacen: almacen,
        moduloUserAlmacenesAlmacenId: almacen.id,
        Usuario: usuario,
        moduloUserAlmacenesUsuarioId: usuario.id,
        estado: Estado.ACTIVO,

      })
    )
  }

  async actualizarEstadoAlmacenModulo(id: string, estado: Estado): Promise<LazyModuloUserAlmacenes | null> {
      const original: LazyModuloUserAlmacenes  | undefined =  await DataStore.query(ModuloUserAlmacenes, id)

      if(!original) return null
      //console.log('original', original)
      return await DataStore.save(
        ModuloUserAlmacenes.copyOf(original, (updated) => {
          updated.estado = estado;
        })
      );
 
  }

  async autorizarPermisoModulo(modulo: LazyModuloNew, usuario: LazyUsuario, code: string): Promise<LazyModuloUserPermiso> {
    return await DataStore.save(
      new ModuloUserPermiso({
        ModuloNew: modulo,
        Usuario: usuario,
        moduloUserPermisoUsuarioId: usuario.id,
        code: code,
        estado: Estado.ACTIVO,
      })
    )
  }

  async actualizarEstadoPermisoModulo(id: string, estado: Estado): Promise<LazyModuloUserPermiso | null> {

    const original: LazyModuloUserPermiso  | undefined =  await DataStore.query(ModuloUserPermiso, id)

    if(!original) return null
    //console.log('original', original)
    return await DataStore.save(
      ModuloUserPermiso.copyOf(original, (updated) => {
        updated.estado = estado;
      })
    );

}



}

