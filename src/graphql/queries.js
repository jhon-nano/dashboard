/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getModuloUserAlmacenes = /* GraphQL */ `
  query GetModuloUserAlmacenes($id: ID!) {
    getModuloUserAlmacenes(id: $id) {
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
export const listModuloUserAlmacenes = /* GraphQL */ `
  query ListModuloUserAlmacenes(
    $filter: ModelModuloUserAlmacenesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModuloUserAlmacenes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        moduloUserAlmacenesAlmacenId
        moduloUserAlmacenesUsuarioId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncModuloUserAlmacenes = /* GraphQL */ `
  query SyncModuloUserAlmacenes(
    $filter: ModelModuloUserAlmacenesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncModuloUserAlmacenes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        moduloUserAlmacenesAlmacenId
        moduloUserAlmacenesUsuarioId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getModuloUserPermiso = /* GraphQL */ `
  query GetModuloUserPermiso($id: ID!) {
    getModuloUserPermiso(id: $id) {
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
export const listModuloUserPermisos = /* GraphQL */ `
  query ListModuloUserPermisos(
    $filter: ModelModuloUserPermisoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModuloUserPermisos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        estado
        code
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        moduloUserPermisoUsuarioId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncModuloUserPermisos = /* GraphQL */ `
  query SyncModuloUserPermisos(
    $filter: ModelModuloUserPermisoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncModuloUserPermisos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        estado
        code
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        moduloUserPermisoUsuarioId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getConsecutivo = /* GraphQL */ `
  query GetConsecutivo($id: ID!) {
    getConsecutivo(id: $id) {
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
export const listConsecutivos = /* GraphQL */ `
  query ListConsecutivos(
    $filter: ModelConsecutivoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConsecutivos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        consecutivo
        codigo
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        consecutivoAlmacenId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncConsecutivos = /* GraphQL */ `
  query SyncConsecutivos(
    $filter: ModelConsecutivoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncConsecutivos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        consecutivo
        codigo
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        consecutivoAlmacenId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getAlmacen = /* GraphQL */ `
  query GetAlmacen($id: ID!) {
    getAlmacen(id: $id) {
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
export const listAlmacens = /* GraphQL */ `
  query ListAlmacens(
    $filter: ModelAlmacenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAlmacens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncAlmacens = /* GraphQL */ `
  query SyncAlmacens(
    $filter: ModelAlmacenFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAlmacens(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUsuario = /* GraphQL */ `
  query GetUsuario($id: ID!) {
    getUsuario(id: $id) {
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
export const listUsuarios = /* GraphQL */ `
  query ListUsuarios(
    $filter: ModelUsuarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsuarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsuarios = /* GraphQL */ `
  query SyncUsuarios(
    $filter: ModelUsuarioFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsuarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getProducto = /* GraphQL */ `
  query GetProducto($id: ID!) {
    getProducto(id: $id) {
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
export const listProductos = /* GraphQL */ `
  query ListProductos(
    $filter: ModelProductoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncProductos = /* GraphQL */ `
  query SyncProductos(
    $filter: ModelProductoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProductos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getMarca = /* GraphQL */ `
  query GetMarca($id: ID!) {
    getMarca(id: $id) {
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
export const listMarcas = /* GraphQL */ `
  query ListMarcas(
    $filter: ModelMarcaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMarcas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncMarcas = /* GraphQL */ `
  query SyncMarcas(
    $filter: ModelMarcaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMarcas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCategoria = /* GraphQL */ `
  query GetCategoria($id: ID!) {
    getCategoria(id: $id) {
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
export const listCategorias = /* GraphQL */ `
  query ListCategorias(
    $filter: ModelCategoriaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCategorias = /* GraphQL */ `
  query SyncCategorias(
    $filter: ModelCategoriaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCategorias(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getLinea = /* GraphQL */ `
  query GetLinea($id: ID!) {
    getLinea(id: $id) {
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
export const listLineas = /* GraphQL */ `
  query ListLineas(
    $filter: ModelLineaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLineas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncLineas = /* GraphQL */ `
  query SyncLineas(
    $filter: ModelLineaFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLineas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getInventario = /* GraphQL */ `
  query GetInventario($id: ID!) {
    getInventario(id: $id) {
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
export const listInventarios = /* GraphQL */ `
  query ListInventarios(
    $filter: ModelInventarioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        inventario
        separado
        costo_promedio
        costo
        precio
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        inventarioProductoId
        inventarioAlmacenId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncInventarios = /* GraphQL */ `
  query SyncInventarios(
    $filter: ModelInventarioFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInventarios(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        inventario
        separado
        costo_promedio
        costo
        precio
        estado
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        inventarioProductoId
        inventarioAlmacenId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTicket = /* GraphQL */ `
  query GetTicket($id: ID!) {
    getTicket(id: $id) {
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
export const listTickets = /* GraphQL */ `
  query ListTickets(
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTickets = /* GraphQL */ `
  query SyncTickets(
    $filter: ModelTicketFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTickets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTicketItem = /* GraphQL */ `
  query GetTicketItem($id: ID!) {
    getTicketItem(id: $id) {
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
export const listTicketItems = /* GraphQL */ `
  query ListTicketItems(
    $filter: ModelTicketItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTicketItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        consecutivo
        valor
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTicketItems = /* GraphQL */ `
  query SyncTicketItems(
    $filter: ModelTicketItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTicketItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        consecutivo
        valor
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
      nextToken
      startedAt
      __typename
    }
  }
`;
