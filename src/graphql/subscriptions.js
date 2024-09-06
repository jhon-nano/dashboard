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
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      organizationType
      identificationNumber
      dv
      name
      tradeName
      direccion
      ciudad
      telefono
      address {
        address
        city
        department
        country
        __typename
      }
      contact {
        name
        email
        phone
        __typename
      }
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
      regimeCode
      taxCode {
        email
        phone
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
      organizationType
      identificationNumber
      dv
      name
      tradeName
      direccion
      ciudad
      telefono
      address {
        address
        city
        department
        country
        __typename
      }
      contact {
        name
        email
        phone
        __typename
      }
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
      regimeCode
      taxCode {
        email
        phone
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
      organizationType
      identificationNumber
      dv
      name
      tradeName
      direccion
      ciudad
      telefono
      address {
        address
        city
        department
        country
        __typename
      }
      contact {
        name
        email
        phone
        __typename
      }
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
      regimeCode
      taxCode {
        email
        phone
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
export const onCreateInventario = /* GraphQL */ `
  subscription OnCreateInventario(
    $filter: ModelSubscriptionInventarioFilterInput
  ) {
    onCreateInventario(filter: $filter) {
      id
      inventario
      separado
      costo_promedio
      costo
      precio
      auditoria {
        fecha
        saldo
        UsuarioID
        __typename
      }
      ubicacion {
        seccion
        estante
        nivel
        caja
        detalle
        __typename
      }
      estado
      Producto {
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
        imagen
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
      Almacen {
        id
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      inventarioProductoId
      inventarioAlmacenId
      __typename
    }
  }
`;
export const onUpdateInventario = /* GraphQL */ `
  subscription OnUpdateInventario(
    $filter: ModelSubscriptionInventarioFilterInput
  ) {
    onUpdateInventario(filter: $filter) {
      id
      inventario
      separado
      costo_promedio
      costo
      precio
      auditoria {
        fecha
        saldo
        UsuarioID
        __typename
      }
      ubicacion {
        seccion
        estante
        nivel
        caja
        detalle
        __typename
      }
      estado
      Producto {
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
        imagen
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
      Almacen {
        id
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      inventarioProductoId
      inventarioAlmacenId
      __typename
    }
  }
`;
export const onDeleteInventario = /* GraphQL */ `
  subscription OnDeleteInventario(
    $filter: ModelSubscriptionInventarioFilterInput
  ) {
    onDeleteInventario(filter: $filter) {
      id
      inventario
      separado
      costo_promedio
      costo
      precio
      auditoria {
        fecha
        saldo
        UsuarioID
        __typename
      }
      ubicacion {
        seccion
        estante
        nivel
        caja
        detalle
        __typename
      }
      estado
      Producto {
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
        imagen
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
      Almacen {
        id
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      inventarioProductoId
      inventarioAlmacenId
      __typename
    }
  }
`;
export const onCreateTicket = /* GraphQL */ `
  subscription OnCreateTicket($filter: ModelSubscriptionTicketFilterInput) {
    onCreateTicket(filter: $filter) {
      id
      consecutivo
      forma_pago
      cliente
      telefono
      costo
      precio_venta
      Almacen {
        id
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      ticketAlmacenId
      ticketUsuarioId
      __typename
    }
  }
`;
export const onUpdateTicket = /* GraphQL */ `
  subscription OnUpdateTicket($filter: ModelSubscriptionTicketFilterInput) {
    onUpdateTicket(filter: $filter) {
      id
      consecutivo
      forma_pago
      cliente
      telefono
      costo
      precio_venta
      Almacen {
        id
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      ticketAlmacenId
      ticketUsuarioId
      __typename
    }
  }
`;
export const onDeleteTicket = /* GraphQL */ `
  subscription OnDeleteTicket($filter: ModelSubscriptionTicketFilterInput) {
    onDeleteTicket(filter: $filter) {
      id
      consecutivo
      forma_pago
      cliente
      telefono
      costo
      precio_venta
      Almacen {
        id
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      estado
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      ticketAlmacenId
      ticketUsuarioId
      __typename
    }
  }
`;
export const onCreateTicketItem = /* GraphQL */ `
  subscription OnCreateTicketItem(
    $filter: ModelSubscriptionTicketItemFilterInput
  ) {
    onCreateTicketItem(filter: $filter) {
      id
      consecutivo
      valor
      Productos {
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
        imagen
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
      Almacen {
        id
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      Ticket {
        id
        consecutivo
        forma_pago
        cliente
        telefono
        costo
        precio_venta
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        ticketAlmacenId
        ticketUsuarioId
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      ticketItemProductosId
      ticketItemAlmacenId
      ticketItemUsuarioId
      ticketItemTicketId
      __typename
    }
  }
`;
export const onUpdateTicketItem = /* GraphQL */ `
  subscription OnUpdateTicketItem(
    $filter: ModelSubscriptionTicketItemFilterInput
  ) {
    onUpdateTicketItem(filter: $filter) {
      id
      consecutivo
      valor
      Productos {
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
        imagen
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
      Almacen {
        id
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      Ticket {
        id
        consecutivo
        forma_pago
        cliente
        telefono
        costo
        precio_venta
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        ticketAlmacenId
        ticketUsuarioId
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      ticketItemProductosId
      ticketItemAlmacenId
      ticketItemUsuarioId
      ticketItemTicketId
      __typename
    }
  }
`;
export const onDeleteTicketItem = /* GraphQL */ `
  subscription OnDeleteTicketItem(
    $filter: ModelSubscriptionTicketItemFilterInput
  ) {
    onDeleteTicketItem(filter: $filter) {
      id
      consecutivo
      valor
      Productos {
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
        imagen
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
      Almacen {
        id
        organizationType
        identificationNumber
        dv
        name
        tradeName
        direccion
        ciudad
        telefono
        secciones
        estantes
        niveles
        cajas
        regimeCode
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
      Ticket {
        id
        consecutivo
        forma_pago
        cliente
        telefono
        costo
        precio_venta
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        ticketAlmacenId
        ticketUsuarioId
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      ticketItemProductosId
      ticketItemAlmacenId
      ticketItemUsuarioId
      ticketItemTicketId
      __typename
    }
  }
`;
