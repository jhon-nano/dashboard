/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateModuloUserAlmacenes = /* GraphQL */ `
  subscription OnCreateModuloUserAlmacenes(
    $filter: ModelSubscriptionModuloUserAlmacenesFilterInput
  ) {
    onCreateModuloUserAlmacenes(filter: $filter) {
      id
      estado
      ModuloNew {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      Almacen {
        id
        codigo
        nit
        nombreAlmacen
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Usuario {
        id
        username
        nombreUsuario
        sub
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      moduloUserAlmacenesAlmacenId
      moduloUserAlmacenesUsuarioId
      __typename
    }
  }
`;
export const onUpdateModuloUserAlmacenes = /* GraphQL */ `
  subscription OnUpdateModuloUserAlmacenes(
    $filter: ModelSubscriptionModuloUserAlmacenesFilterInput
  ) {
    onUpdateModuloUserAlmacenes(filter: $filter) {
      id
      estado
      ModuloNew {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      Almacen {
        id
        codigo
        nit
        nombreAlmacen
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Usuario {
        id
        username
        nombreUsuario
        sub
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      moduloUserAlmacenesAlmacenId
      moduloUserAlmacenesUsuarioId
      __typename
    }
  }
`;
export const onDeleteModuloUserAlmacenes = /* GraphQL */ `
  subscription OnDeleteModuloUserAlmacenes(
    $filter: ModelSubscriptionModuloUserAlmacenesFilterInput
  ) {
    onDeleteModuloUserAlmacenes(filter: $filter) {
      id
      estado
      ModuloNew {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      Almacen {
        id
        codigo
        nit
        nombreAlmacen
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Usuario {
        id
        username
        nombreUsuario
        sub
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      moduloUserAlmacenesAlmacenId
      moduloUserAlmacenesUsuarioId
      __typename
    }
  }
`;
export const onCreateModuloUserPermiso = /* GraphQL */ `
  subscription OnCreateModuloUserPermiso(
    $filter: ModelSubscriptionModuloUserPermisoFilterInput
  ) {
    onCreateModuloUserPermiso(filter: $filter) {
      id
      estado
      ModuloNew {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      Usuario {
        id
        username
        nombreUsuario
        sub
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      code
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      moduloUserPermisoUsuarioId
      __typename
    }
  }
`;
export const onUpdateModuloUserPermiso = /* GraphQL */ `
  subscription OnUpdateModuloUserPermiso(
    $filter: ModelSubscriptionModuloUserPermisoFilterInput
  ) {
    onUpdateModuloUserPermiso(filter: $filter) {
      id
      estado
      ModuloNew {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      Usuario {
        id
        username
        nombreUsuario
        sub
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      code
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      moduloUserPermisoUsuarioId
      __typename
    }
  }
`;
export const onDeleteModuloUserPermiso = /* GraphQL */ `
  subscription OnDeleteModuloUserPermiso(
    $filter: ModelSubscriptionModuloUserPermisoFilterInput
  ) {
    onDeleteModuloUserPermiso(filter: $filter) {
      id
      estado
      ModuloNew {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      Usuario {
        id
        username
        nombreUsuario
        sub
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      code
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      moduloUserPermisoUsuarioId
      __typename
    }
  }
`;
export const onCreateConsecutivo = /* GraphQL */ `
  subscription OnCreateConsecutivo(
    $filter: ModelSubscriptionConsecutivoFilterInput
  ) {
    onCreateConsecutivo(filter: $filter) {
      id
      consecutivo
      ModuloNew {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      Almacen {
        id
        codigo
        nit
        nombreAlmacen
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      codigo
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      consecutivoAlmacenId
      __typename
    }
  }
`;
export const onUpdateConsecutivo = /* GraphQL */ `
  subscription OnUpdateConsecutivo(
    $filter: ModelSubscriptionConsecutivoFilterInput
  ) {
    onUpdateConsecutivo(filter: $filter) {
      id
      consecutivo
      ModuloNew {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      Almacen {
        id
        codigo
        nit
        nombreAlmacen
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      codigo
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      consecutivoAlmacenId
      __typename
    }
  }
`;
export const onDeleteConsecutivo = /* GraphQL */ `
  subscription OnDeleteConsecutivo(
    $filter: ModelSubscriptionConsecutivoFilterInput
  ) {
    onDeleteConsecutivo(filter: $filter) {
      id
      consecutivo
      ModuloNew {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      Almacen {
        id
        codigo
        nit
        nombreAlmacen
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      codigo
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      consecutivoAlmacenId
      __typename
    }
  }
`;
export const onCreateAlmacen = /* GraphQL */ `
  subscription OnCreateAlmacen($filter: ModelSubscriptionAlmacenFilterInput) {
    onCreateAlmacen(filter: $filter) {
      id
      codigo
      nit
      nombreAlmacen
      direccion
      ciudad
      telefono
      secciones
      estantes
      niveles
      cajas
      cajas_registradoras {
        numero_caja
        prefijo
        resolucion
        en_uso
        usuario_en_uso
        estado
        __typename
      }
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateAlmacen = /* GraphQL */ `
  subscription OnUpdateAlmacen($filter: ModelSubscriptionAlmacenFilterInput) {
    onUpdateAlmacen(filter: $filter) {
      id
      codigo
      nit
      nombreAlmacen
      direccion
      ciudad
      telefono
      secciones
      estantes
      niveles
      cajas
      cajas_registradoras {
        numero_caja
        prefijo
        resolucion
        en_uso
        usuario_en_uso
        estado
        __typename
      }
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteAlmacen = /* GraphQL */ `
  subscription OnDeleteAlmacen($filter: ModelSubscriptionAlmacenFilterInput) {
    onDeleteAlmacen(filter: $filter) {
      id
      codigo
      nit
      nombreAlmacen
      direccion
      ciudad
      telefono
      secciones
      estantes
      niveles
      cajas
      cajas_registradoras {
        numero_caja
        prefijo
        resolucion
        en_uso
        usuario_en_uso
        estado
        __typename
      }
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateUsuario = /* GraphQL */ `
  subscription OnCreateUsuario($filter: ModelSubscriptionUsuarioFilterInput) {
    onCreateUsuario(filter: $filter) {
      id
      username
      nombreUsuario
      sub
      estado
      modulos_new {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateUsuario = /* GraphQL */ `
  subscription OnUpdateUsuario($filter: ModelSubscriptionUsuarioFilterInput) {
    onUpdateUsuario(filter: $filter) {
      id
      username
      nombreUsuario
      sub
      estado
      modulos_new {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteUsuario = /* GraphQL */ `
  subscription OnDeleteUsuario($filter: ModelSubscriptionUsuarioFilterInput) {
    onDeleteUsuario(filter: $filter) {
      id
      username
      nombreUsuario
      sub
      estado
      modulos_new {
        icon
        path
        nombreModulo
        detalle
        maneja_almacenes
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateProducto = /* GraphQL */ `
  subscription OnCreateProducto($filter: ModelSubscriptionProductoFilterInput) {
    onCreateProducto(filter: $filter) {
      id
      codigo
      nombreProducto
      nombreCorto
      iva
      venta
      insumos
      preparacion
      barras
      presentacion
      descripcion
      cambio_precio
      datos_producto
      Proveedores {
        nit_proveedor
        codigo
        __typename
      }
      imagen
      Linea {
        id
        nombreLinea
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Categoria {
        id
        nombreCategoria
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Marca {
        id
        nombreMarca
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productoLineaId
      productoCategoriaId
      productoMarcaId
      __typename
    }
  }
`;
export const onUpdateProducto = /* GraphQL */ `
  subscription OnUpdateProducto($filter: ModelSubscriptionProductoFilterInput) {
    onUpdateProducto(filter: $filter) {
      id
      codigo
      nombreProducto
      nombreCorto
      iva
      venta
      insumos
      preparacion
      barras
      presentacion
      descripcion
      cambio_precio
      datos_producto
      Proveedores {
        nit_proveedor
        codigo
        __typename
      }
      imagen
      Linea {
        id
        nombreLinea
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Categoria {
        id
        nombreCategoria
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Marca {
        id
        nombreMarca
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productoLineaId
      productoCategoriaId
      productoMarcaId
      __typename
    }
  }
`;
export const onDeleteProducto = /* GraphQL */ `
  subscription OnDeleteProducto($filter: ModelSubscriptionProductoFilterInput) {
    onDeleteProducto(filter: $filter) {
      id
      codigo
      nombreProducto
      nombreCorto
      iva
      venta
      insumos
      preparacion
      barras
      presentacion
      descripcion
      cambio_precio
      datos_producto
      Proveedores {
        nit_proveedor
        codigo
        __typename
      }
      imagen
      Linea {
        id
        nombreLinea
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Categoria {
        id
        nombreCategoria
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Marca {
        id
        nombreMarca
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productoLineaId
      productoCategoriaId
      productoMarcaId
      __typename
    }
  }
`;
export const onCreateMarca = /* GraphQL */ `
  subscription OnCreateMarca($filter: ModelSubscriptionMarcaFilterInput) {
    onCreateMarca(filter: $filter) {
      id
      nombreMarca
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateMarca = /* GraphQL */ `
  subscription OnUpdateMarca($filter: ModelSubscriptionMarcaFilterInput) {
    onUpdateMarca(filter: $filter) {
      id
      nombreMarca
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteMarca = /* GraphQL */ `
  subscription OnDeleteMarca($filter: ModelSubscriptionMarcaFilterInput) {
    onDeleteMarca(filter: $filter) {
      id
      nombreMarca
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateCategoria = /* GraphQL */ `
  subscription OnCreateCategoria(
    $filter: ModelSubscriptionCategoriaFilterInput
  ) {
    onCreateCategoria(filter: $filter) {
      id
      nombreCategoria
      estado
      Atributos {
        nombre
        tipo
        facturacion
        filtrar
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateCategoria = /* GraphQL */ `
  subscription OnUpdateCategoria(
    $filter: ModelSubscriptionCategoriaFilterInput
  ) {
    onUpdateCategoria(filter: $filter) {
      id
      nombreCategoria
      estado
      Atributos {
        nombre
        tipo
        facturacion
        filtrar
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteCategoria = /* GraphQL */ `
  subscription OnDeleteCategoria(
    $filter: ModelSubscriptionCategoriaFilterInput
  ) {
    onDeleteCategoria(filter: $filter) {
      id
      nombreCategoria
      estado
      Atributos {
        nombre
        tipo
        facturacion
        filtrar
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateLinea = /* GraphQL */ `
  subscription OnCreateLinea($filter: ModelSubscriptionLineaFilterInput) {
    onCreateLinea(filter: $filter) {
      id
      nombreLinea
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateLinea = /* GraphQL */ `
  subscription OnUpdateLinea($filter: ModelSubscriptionLineaFilterInput) {
    onUpdateLinea(filter: $filter) {
      id
      nombreLinea
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteLinea = /* GraphQL */ `
  subscription OnDeleteLinea($filter: ModelSubscriptionLineaFilterInput) {
    onDeleteLinea(filter: $filter) {
      id
      nombreLinea
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
