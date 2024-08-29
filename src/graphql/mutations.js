/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createModuloUserAlmacenes = /* GraphQL */ `
  mutation CreateModuloUserAlmacenes(
    $input: CreateModuloUserAlmacenesInput!
    $condition: ModelModuloUserAlmacenesConditionInput
  ) {
    createModuloUserAlmacenes(input: $input, condition: $condition) {
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
export const updateModuloUserAlmacenes = /* GraphQL */ `
  mutation UpdateModuloUserAlmacenes(
    $input: UpdateModuloUserAlmacenesInput!
    $condition: ModelModuloUserAlmacenesConditionInput
  ) {
    updateModuloUserAlmacenes(input: $input, condition: $condition) {
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
export const deleteModuloUserAlmacenes = /* GraphQL */ `
  mutation DeleteModuloUserAlmacenes(
    $input: DeleteModuloUserAlmacenesInput!
    $condition: ModelModuloUserAlmacenesConditionInput
  ) {
    deleteModuloUserAlmacenes(input: $input, condition: $condition) {
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
export const createModuloUserPermiso = /* GraphQL */ `
  mutation CreateModuloUserPermiso(
    $input: CreateModuloUserPermisoInput!
    $condition: ModelModuloUserPermisoConditionInput
  ) {
    createModuloUserPermiso(input: $input, condition: $condition) {
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
export const updateModuloUserPermiso = /* GraphQL */ `
  mutation UpdateModuloUserPermiso(
    $input: UpdateModuloUserPermisoInput!
    $condition: ModelModuloUserPermisoConditionInput
  ) {
    updateModuloUserPermiso(input: $input, condition: $condition) {
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
export const deleteModuloUserPermiso = /* GraphQL */ `
  mutation DeleteModuloUserPermiso(
    $input: DeleteModuloUserPermisoInput!
    $condition: ModelModuloUserPermisoConditionInput
  ) {
    deleteModuloUserPermiso(input: $input, condition: $condition) {
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
export const createConsecutivo = /* GraphQL */ `
  mutation CreateConsecutivo(
    $input: CreateConsecutivoInput!
    $condition: ModelConsecutivoConditionInput
  ) {
    createConsecutivo(input: $input, condition: $condition) {
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
export const updateConsecutivo = /* GraphQL */ `
  mutation UpdateConsecutivo(
    $input: UpdateConsecutivoInput!
    $condition: ModelConsecutivoConditionInput
  ) {
    updateConsecutivo(input: $input, condition: $condition) {
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
export const deleteConsecutivo = /* GraphQL */ `
  mutation DeleteConsecutivo(
    $input: DeleteConsecutivoInput!
    $condition: ModelConsecutivoConditionInput
  ) {
    deleteConsecutivo(input: $input, condition: $condition) {
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
export const createAlmacen = /* GraphQL */ `
  mutation CreateAlmacen(
    $input: CreateAlmacenInput!
    $condition: ModelAlmacenConditionInput
  ) {
    createAlmacen(input: $input, condition: $condition) {
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
export const updateAlmacen = /* GraphQL */ `
  mutation UpdateAlmacen(
    $input: UpdateAlmacenInput!
    $condition: ModelAlmacenConditionInput
  ) {
    updateAlmacen(input: $input, condition: $condition) {
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
export const deleteAlmacen = /* GraphQL */ `
  mutation DeleteAlmacen(
    $input: DeleteAlmacenInput!
    $condition: ModelAlmacenConditionInput
  ) {
    deleteAlmacen(input: $input, condition: $condition) {
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
export const createUsuario = /* GraphQL */ `
  mutation CreateUsuario(
    $input: CreateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    createUsuario(input: $input, condition: $condition) {
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
export const updateUsuario = /* GraphQL */ `
  mutation UpdateUsuario(
    $input: UpdateUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    updateUsuario(input: $input, condition: $condition) {
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
export const deleteUsuario = /* GraphQL */ `
  mutation DeleteUsuario(
    $input: DeleteUsuarioInput!
    $condition: ModelUsuarioConditionInput
  ) {
    deleteUsuario(input: $input, condition: $condition) {
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
export const createProducto = /* GraphQL */ `
  mutation CreateProducto(
    $input: CreateProductoInput!
    $condition: ModelProductoConditionInput
  ) {
    createProducto(input: $input, condition: $condition) {
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
export const updateProducto = /* GraphQL */ `
  mutation UpdateProducto(
    $input: UpdateProductoInput!
    $condition: ModelProductoConditionInput
  ) {
    updateProducto(input: $input, condition: $condition) {
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
export const deleteProducto = /* GraphQL */ `
  mutation DeleteProducto(
    $input: DeleteProductoInput!
    $condition: ModelProductoConditionInput
  ) {
    deleteProducto(input: $input, condition: $condition) {
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
export const createMarca = /* GraphQL */ `
  mutation CreateMarca(
    $input: CreateMarcaInput!
    $condition: ModelMarcaConditionInput
  ) {
    createMarca(input: $input, condition: $condition) {
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
export const updateMarca = /* GraphQL */ `
  mutation UpdateMarca(
    $input: UpdateMarcaInput!
    $condition: ModelMarcaConditionInput
  ) {
    updateMarca(input: $input, condition: $condition) {
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
export const deleteMarca = /* GraphQL */ `
  mutation DeleteMarca(
    $input: DeleteMarcaInput!
    $condition: ModelMarcaConditionInput
  ) {
    deleteMarca(input: $input, condition: $condition) {
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
export const createCategoria = /* GraphQL */ `
  mutation CreateCategoria(
    $input: CreateCategoriaInput!
    $condition: ModelCategoriaConditionInput
  ) {
    createCategoria(input: $input, condition: $condition) {
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
export const updateCategoria = /* GraphQL */ `
  mutation UpdateCategoria(
    $input: UpdateCategoriaInput!
    $condition: ModelCategoriaConditionInput
  ) {
    updateCategoria(input: $input, condition: $condition) {
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
export const deleteCategoria = /* GraphQL */ `
  mutation DeleteCategoria(
    $input: DeleteCategoriaInput!
    $condition: ModelCategoriaConditionInput
  ) {
    deleteCategoria(input: $input, condition: $condition) {
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
export const createLinea = /* GraphQL */ `
  mutation CreateLinea(
    $input: CreateLineaInput!
    $condition: ModelLineaConditionInput
  ) {
    createLinea(input: $input, condition: $condition) {
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
export const updateLinea = /* GraphQL */ `
  mutation UpdateLinea(
    $input: UpdateLineaInput!
    $condition: ModelLineaConditionInput
  ) {
    updateLinea(input: $input, condition: $condition) {
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
export const deleteLinea = /* GraphQL */ `
  mutation DeleteLinea(
    $input: DeleteLineaInput!
    $condition: ModelLineaConditionInput
  ) {
    deleteLinea(input: $input, condition: $condition) {
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
export const createTercero = /* GraphQL */ `
  mutation CreateTercero(
    $input: CreateTerceroInput!
    $condition: ModelTerceroConditionInput
  ) {
    createTercero(input: $input, condition: $condition) {
      id
      tipo_tercero
      identificacion
      dv
      expedida
      lugar_nacimiento
      fecha_nacimiento
      nombre_completo
      primer_apellido
      segundo_apellido
      primer_nombre
      segundo_nombre
      direccion
      telefono
      ciudad
      correo
      datos_personales {
        ocupacion
        nombre_empresa
        direccion_empresa
        telefono_empresa
        antiguedad
        ingresos
        personas_cargo
        estado_civil
        vivienda
        ref1_familiar_nombre
        ref1_familiar_parentesco
        ref1_familiar_telefono
        ref2_familiar_nombre
        ref2_familiar_parentesco
        ref2_familiar_telefono
        ref1_comercial_nombre
        ref1_comercial_observacion
        ref2_comercial_nombre
        ref2_comercial_observacion
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
export const updateTercero = /* GraphQL */ `
  mutation UpdateTercero(
    $input: UpdateTerceroInput!
    $condition: ModelTerceroConditionInput
  ) {
    updateTercero(input: $input, condition: $condition) {
      id
      tipo_tercero
      identificacion
      dv
      expedida
      lugar_nacimiento
      fecha_nacimiento
      nombre_completo
      primer_apellido
      segundo_apellido
      primer_nombre
      segundo_nombre
      direccion
      telefono
      ciudad
      correo
      datos_personales {
        ocupacion
        nombre_empresa
        direccion_empresa
        telefono_empresa
        antiguedad
        ingresos
        personas_cargo
        estado_civil
        vivienda
        ref1_familiar_nombre
        ref1_familiar_parentesco
        ref1_familiar_telefono
        ref2_familiar_nombre
        ref2_familiar_parentesco
        ref2_familiar_telefono
        ref1_comercial_nombre
        ref1_comercial_observacion
        ref2_comercial_nombre
        ref2_comercial_observacion
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
export const deleteTercero = /* GraphQL */ `
  mutation DeleteTercero(
    $input: DeleteTerceroInput!
    $condition: ModelTerceroConditionInput
  ) {
    deleteTercero(input: $input, condition: $condition) {
      id
      tipo_tercero
      identificacion
      dv
      expedida
      lugar_nacimiento
      fecha_nacimiento
      nombre_completo
      primer_apellido
      segundo_apellido
      primer_nombre
      segundo_nombre
      direccion
      telefono
      ciudad
      correo
      datos_personales {
        ocupacion
        nombre_empresa
        direccion_empresa
        telefono_empresa
        antiguedad
        ingresos
        personas_cargo
        estado_civil
        vivienda
        ref1_familiar_nombre
        ref1_familiar_parentesco
        ref1_familiar_telefono
        ref2_familiar_nombre
        ref2_familiar_parentesco
        ref2_familiar_telefono
        ref1_comercial_nombre
        ref1_comercial_observacion
        ref2_comercial_nombre
        ref2_comercial_observacion
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
