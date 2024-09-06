export const schema = {
    "models": {
        "ModuloUserAlmacenes": {
            "name": "ModuloUserAlmacenes",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "ModuloNew": {
                    "name": "ModuloNew",
                    "isArray": false,
                    "type": {
                        "nonModel": "ModuloNew"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "Almacen": {
                    "name": "Almacen",
                    "isArray": false,
                    "type": {
                        "model": "Almacen"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "moduloUserAlmacenesAlmacenId"
                        ]
                    }
                },
                "Usuario": {
                    "name": "Usuario",
                    "isArray": false,
                    "type": {
                        "model": "Usuario"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "moduloUserAlmacenesUsuarioId"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "moduloUserAlmacenesAlmacenId": {
                    "name": "moduloUserAlmacenesAlmacenId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "moduloUserAlmacenesUsuarioId": {
                    "name": "moduloUserAlmacenesUsuarioId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ModuloUserAlmacenes",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ModuloUserPermiso": {
            "name": "ModuloUserPermiso",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "ModuloNew": {
                    "name": "ModuloNew",
                    "isArray": false,
                    "type": {
                        "nonModel": "ModuloNew"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "Usuario": {
                    "name": "Usuario",
                    "isArray": false,
                    "type": {
                        "model": "Usuario"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "moduloUserPermisoUsuarioId"
                        ]
                    }
                },
                "code": {
                    "name": "code",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "moduloUserPermisoUsuarioId": {
                    "name": "moduloUserPermisoUsuarioId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ModuloUserPermisos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Consecutivo": {
            "name": "Consecutivo",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "consecutivo": {
                    "name": "consecutivo",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "ModuloNew": {
                    "name": "ModuloNew",
                    "isArray": false,
                    "type": {
                        "nonModel": "ModuloNew"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "Almacen": {
                    "name": "Almacen",
                    "isArray": false,
                    "type": {
                        "model": "Almacen"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "consecutivoAlmacenId"
                        ]
                    }
                },
                "codigo": {
                    "name": "codigo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "consecutivoAlmacenId": {
                    "name": "consecutivoAlmacenId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Consecutivos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Almacen": {
            "name": "Almacen",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "organizationType": {
                    "name": "organizationType",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "identificationNumber": {
                    "name": "identificationNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "dv": {
                    "name": "dv",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "tradeName": {
                    "name": "tradeName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "direccion": {
                    "name": "direccion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ciudad": {
                    "name": "ciudad",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "telefono": {
                    "name": "telefono",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "address": {
                    "name": "address",
                    "isArray": false,
                    "type": {
                        "nonModel": "Direccion"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "contact": {
                    "name": "contact",
                    "isArray": false,
                    "type": {
                        "nonModel": "Contact"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "secciones": {
                    "name": "secciones",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "estantes": {
                    "name": "estantes",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "niveles": {
                    "name": "niveles",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "cajas": {
                    "name": "cajas",
                    "isArray": true,
                    "type": "String",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "cajas_registradoras": {
                    "name": "cajas_registradoras",
                    "isArray": true,
                    "type": {
                        "nonModel": "CajaRegistradora"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "regimeCode": {
                    "name": "regimeCode",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "taxCode": {
                    "name": "taxCode",
                    "isArray": false,
                    "type": {
                        "nonModel": "TaxCode"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Almacens",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Usuario": {
            "name": "Usuario",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "username": {
                    "name": "username",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nombreUsuario": {
                    "name": "nombreUsuario",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "sub": {
                    "name": "sub",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "modulos_new": {
                    "name": "modulos_new",
                    "isArray": true,
                    "type": {
                        "nonModel": "ModuloNew"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Usuarios",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Producto": {
            "name": "Producto",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "codigo": {
                    "name": "codigo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nombreProducto": {
                    "name": "nombreProducto",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "nombreCorto": {
                    "name": "nombreCorto",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "iva": {
                    "name": "iva",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "venta": {
                    "name": "venta",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "insumos": {
                    "name": "insumos",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "preparacion": {
                    "name": "preparacion",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "barras": {
                    "name": "barras",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "presentacion": {
                    "name": "presentacion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "descripcion": {
                    "name": "descripcion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "cambio_precio": {
                    "name": "cambio_precio",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "datos_producto": {
                    "name": "datos_producto",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "Proveedores": {
                    "name": "Proveedores",
                    "isArray": true,
                    "type": {
                        "nonModel": "ProductoProveedor"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "imagen": {
                    "name": "imagen",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Linea": {
                    "name": "Linea",
                    "isArray": false,
                    "type": {
                        "model": "Linea"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "productoLineaId"
                        ]
                    }
                },
                "Categoria": {
                    "name": "Categoria",
                    "isArray": false,
                    "type": {
                        "model": "Categoria"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "productoCategoriaId"
                        ]
                    }
                },
                "Marca": {
                    "name": "Marca",
                    "isArray": false,
                    "type": {
                        "model": "Marca"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "productoMarcaId"
                        ]
                    }
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "productoLineaId": {
                    "name": "productoLineaId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "productoCategoriaId": {
                    "name": "productoCategoriaId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "productoMarcaId": {
                    "name": "productoMarcaId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Productos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Marca": {
            "name": "Marca",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "nombreMarca": {
                    "name": "nombreMarca",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Marcas",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Categoria": {
            "name": "Categoria",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "nombreCategoria": {
                    "name": "nombreCategoria",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "Atributos": {
                    "name": "Atributos",
                    "isArray": true,
                    "type": {
                        "nonModel": "CategoriaAtributoNew"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Categorias",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Linea": {
            "name": "Linea",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "nombreLinea": {
                    "name": "nombreLinea",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Lineas",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Inventario": {
            "name": "Inventario",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "inventario": {
                    "name": "inventario",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "separado": {
                    "name": "separado",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "costo_promedio": {
                    "name": "costo_promedio",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "costo": {
                    "name": "costo",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "precio": {
                    "name": "precio",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "auditoria": {
                    "name": "auditoria",
                    "isArray": false,
                    "type": {
                        "nonModel": "AuditoriaInventario"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "ubicacion": {
                    "name": "ubicacion",
                    "isArray": true,
                    "type": {
                        "nonModel": "UbicacionInventario"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "Producto": {
                    "name": "Producto",
                    "isArray": false,
                    "type": {
                        "model": "Producto"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "inventarioProductoId"
                        ]
                    }
                },
                "Almacen": {
                    "name": "Almacen",
                    "isArray": false,
                    "type": {
                        "model": "Almacen"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "inventarioAlmacenId"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "inventarioProductoId": {
                    "name": "inventarioProductoId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "inventarioAlmacenId": {
                    "name": "inventarioAlmacenId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Inventarios",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Ticket": {
            "name": "Ticket",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "consecutivo": {
                    "name": "consecutivo",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "forma_pago": {
                    "name": "forma_pago",
                    "isArray": false,
                    "type": {
                        "enum": "FormasPago"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "cliente": {
                    "name": "cliente",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "telefono": {
                    "name": "telefono",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "costo": {
                    "name": "costo",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "precio_venta": {
                    "name": "precio_venta",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "Almacen": {
                    "name": "Almacen",
                    "isArray": false,
                    "type": {
                        "model": "Almacen"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "ticketAlmacenId"
                        ]
                    }
                },
                "Usuario": {
                    "name": "Usuario",
                    "isArray": false,
                    "type": {
                        "model": "Usuario"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "ticketUsuarioId"
                        ]
                    }
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "EstadoTicket"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "ticketAlmacenId": {
                    "name": "ticketAlmacenId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "ticketUsuarioId": {
                    "name": "ticketUsuarioId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Tickets",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "TicketItem": {
            "name": "TicketItem",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "consecutivo": {
                    "name": "consecutivo",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "valor": {
                    "name": "valor",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "Productos": {
                    "name": "Productos",
                    "isArray": false,
                    "type": {
                        "model": "Producto"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "ticketItemProductosId"
                        ]
                    }
                },
                "Almacen": {
                    "name": "Almacen",
                    "isArray": false,
                    "type": {
                        "model": "Almacen"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "ticketItemAlmacenId"
                        ]
                    }
                },
                "Usuario": {
                    "name": "Usuario",
                    "isArray": false,
                    "type": {
                        "model": "Usuario"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "ticketItemUsuarioId"
                        ]
                    }
                },
                "Ticket": {
                    "name": "Ticket",
                    "isArray": false,
                    "type": {
                        "model": "Ticket"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "ticketItemTicketId"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "ticketItemProductosId": {
                    "name": "ticketItemProductosId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "ticketItemAlmacenId": {
                    "name": "ticketItemAlmacenId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "ticketItemUsuarioId": {
                    "name": "ticketItemUsuarioId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "ticketItemTicketId": {
                    "name": "ticketItemTicketId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "TicketItems",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "FormasPago": {
            "name": "FormasPago",
            "values": [
                "ANTICIPO",
                "ABONO",
                "CANCELACION"
            ]
        },
        "EstadoTicket": {
            "name": "EstadoTicket",
            "values": [
                "PENDIENTE",
                "CANCELADO"
            ]
        },
        "TipoTerceros": {
            "name": "TipoTerceros",
            "values": [
                "CC",
                "NIT",
                "TI",
                "PASAPORTE",
                "CE"
            ]
        },
        "TipoPago": {
            "name": "TipoPago",
            "values": [
                "CONTADO",
                "CREDITO"
            ]
        },
        "TipoCompras": {
            "name": "TipoCompras",
            "values": [
                "COMPRA",
                "DEVOLUCION",
                "NOTA_PROVEEDOR"
            ]
        },
        "TipoReciboCaja": {
            "name": "TipoReciboCaja",
            "values": [
                "ANTICIPO",
                "RECAUDO"
            ]
        },
        "TipoComprobanteEgreso": {
            "name": "TipoComprobanteEgreso",
            "values": [
                "ANTICIPO",
                "PAGO",
                "NOTA_CREDITO"
            ]
        },
        "TipoCarteraClientes": {
            "name": "TipoCarteraClientes",
            "values": [
                "ANTICIPO",
                "CXC",
                "NOTA_DEBITO"
            ]
        },
        "TipoCarteraProveedores": {
            "name": "TipoCarteraProveedores",
            "values": [
                "ANTICIPO",
                "CXP"
            ]
        },
        "TipoPedidos": {
            "name": "TipoPedidos",
            "values": [
                "PEDIDO",
                "SEPARADO"
            ]
        },
        "TipoFacturas": {
            "name": "TipoFacturas",
            "values": [
                "FACTURA",
                "FACTURA_POS",
                "FACTURA_ELECTRONICA"
            ]
        },
        "TipoMovimientos": {
            "name": "TipoMovimientos",
            "values": [
                "TRASLADO",
                "INVENTARIO_FISICO",
                "AJUSTES_INVENTARIO"
            ]
        },
        "EstadoFactura": {
            "name": "EstadoFactura",
            "values": [
                "FACTURADO",
                "PENDIENTE",
                "ANULADO"
            ]
        },
        "EstadoCredito": {
            "name": "EstadoCredito",
            "values": [
                "PENDIENTE",
                "REVISADO",
                "AUTORIZADO",
                "RECHAZADO",
                "ANULADO"
            ]
        },
        "Estado": {
            "name": "Estado",
            "values": [
                "ACTIVO",
                "INACTIVO"
            ]
        }
    },
    "nonModels": {
        "DatosSolicitud": {
            "name": "DatosSolicitud",
            "fields": {
                "ocupacion": {
                    "name": "ocupacion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nombre_empresa": {
                    "name": "nombre_empresa",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "direccion_empresa": {
                    "name": "direccion_empresa",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "telefono_empresa": {
                    "name": "telefono_empresa",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "antiguedad": {
                    "name": "antiguedad",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ingresos": {
                    "name": "ingresos",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "personas_cargo": {
                    "name": "personas_cargo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "estado_civil": {
                    "name": "estado_civil",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "vivienda": {
                    "name": "vivienda",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref1_familiar_nombre": {
                    "name": "ref1_familiar_nombre",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref1_familiar_parentesco": {
                    "name": "ref1_familiar_parentesco",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref1_familiar_telefono": {
                    "name": "ref1_familiar_telefono",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref2_familiar_nombre": {
                    "name": "ref2_familiar_nombre",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref2_familiar_parentesco": {
                    "name": "ref2_familiar_parentesco",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref2_familiar_telefono": {
                    "name": "ref2_familiar_telefono",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref1_comercial_nombre": {
                    "name": "ref1_comercial_nombre",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref1_comercial_observacion": {
                    "name": "ref1_comercial_observacion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref2_comercial_nombre": {
                    "name": "ref2_comercial_nombre",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ref2_comercial_observacion": {
                    "name": "ref2_comercial_observacion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "TaxCode": {
            "name": "TaxCode",
            "fields": {
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "phone": {
                    "name": "phone",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "Direccion": {
            "name": "Direccion",
            "fields": {
                "address": {
                    "name": "address",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "city": {
                    "name": "city",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "department": {
                    "name": "department",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "country": {
                    "name": "country",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "Contact": {
            "name": "Contact",
            "fields": {
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "phone": {
                    "name": "phone",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "ProductoProveedor": {
            "name": "ProductoProveedor",
            "fields": {
                "nit_proveedor": {
                    "name": "nit_proveedor",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "codigo": {
                    "name": "codigo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "Auditoria": {
            "name": "Auditoria",
            "fields": {
                "fecha": {
                    "name": "fecha",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "UsuarioID": {
                    "name": "UsuarioID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "ModuloNew": {
            "name": "ModuloNew",
            "fields": {
                "icon": {
                    "name": "icon",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "path": {
                    "name": "path",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "nombreModulo": {
                    "name": "nombreModulo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "detalle": {
                    "name": "detalle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "maneja_almacenes": {
                    "name": "maneja_almacenes",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "CategoriaAtributoNew": {
            "name": "CategoriaAtributoNew",
            "fields": {
                "nombre": {
                    "name": "nombre",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "tipo": {
                    "name": "tipo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "facturacion": {
                    "name": "facturacion",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "filtrar": {
                    "name": "filtrar",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "AuditoriaInventario": {
            "name": "AuditoriaInventario",
            "fields": {
                "fecha": {
                    "name": "fecha",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "saldo": {
                    "name": "saldo",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "UsuarioID": {
                    "name": "UsuarioID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "CotizacionItem": {
            "name": "CotizacionItem",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "consecutivo": {
                    "name": "consecutivo",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "codigo_item": {
                    "name": "codigo_item",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "nombre_item": {
                    "name": "nombre_item",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "cantidad": {
                    "name": "cantidad",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "costo_item": {
                    "name": "costo_item",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "subtotal_item": {
                    "name": "subtotal_item",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "iva_item": {
                    "name": "iva_item",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "total_item": {
                    "name": "total_item",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "UbicacionInventario": {
            "name": "UbicacionInventario",
            "fields": {
                "seccion": {
                    "name": "seccion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "estante": {
                    "name": "estante",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nivel": {
                    "name": "nivel",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "caja": {
                    "name": "caja",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "detalle": {
                    "name": "detalle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "CajaRegistradora": {
            "name": "CajaRegistradora",
            "fields": {
                "numero_caja": {
                    "name": "numero_caja",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "prefijo": {
                    "name": "prefijo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "resolucion": {
                    "name": "resolucion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "en_uso": {
                    "name": "en_uso",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "usuario_en_uso": {
                    "name": "usuario_en_uso",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "estado": {
                    "name": "estado",
                    "isArray": false,
                    "type": {
                        "enum": "Estado"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.4.4",
    "version": "722835cf790537acea44e81bbd94faa6"
};