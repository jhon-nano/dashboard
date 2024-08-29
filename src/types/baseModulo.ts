

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}


// Clase base abstracta que implementa las interfaces
export  abstract class ModuloBase {
  
  router: any;
  visible: boolean;
  icon: string;
  nombreModulo: string;
  path: string;
  detalle: string;
  maneja_almacenes: boolean;
  maneja_consecutivos: boolean;

  constructor(
    visible: boolean,
    icon: string,
    nombreModulo: string,
    path: string,
    detalle: string,
    maneja_almacenes: boolean,
    maneja_consecutivos: boolean,
    router: any
  ) {
    this.visible = visible;
    this.icon = icon;
    this.nombreModulo = nombreModulo;
    this.path = path;
    this.detalle = detalle;
    this.maneja_almacenes = maneja_almacenes;
    this.maneja_consecutivos = maneja_consecutivos;
    this.router = router;
  }



  obtenerNombreModulo(): string {
    return this.nombreModulo;
  }

  obtenerIcon(): string {
    return this.icon;
  }


  pushPath(): void {
    this.router.push(
      { pathname: this.path },
      undefined,
      { shallow: true, scroll: false }
    );
  }

  pushPathCreate(subfijo: string = ''): void {
    this.router.push(    
      { pathname: this.path +  '/create' + subfijo },
      undefined,
      { shallow: true, scroll: false }
    );
  }

  pushPathUpdate(id:string, subfijo: string = ''): void {
    this.router.push(
      { pathname: this.path +  '/update' + subfijo, query: { id: id } },
      undefined,
      { shallow: true, scroll: false }
    )
  }



  pushPathImportar(): void {
    this.router.push(    
      { pathname: this.path +  '/update' },
      undefined,
      { shallow: true, scroll: false }
    );
  }

  pushPathView(id: any, subfijo: string = ''): void {

  // Validar si `id` es un string o un objeto.
  let queryParams = undefined;

  if (typeof id === 'string') { // Si es un string, usa directamente el id.
    queryParams = { id: id };
  } else if (typeof id === 'object' && id !== null) { // Si es un objeto y no es null.
    // Suponiendo que quieras usar una propiedad específica del objeto como `id`.
    queryParams = { ...id }; // Cambia `someProperty` por la propiedad real que quieres usar.
  } else if (id !== null || id !== undefined) { // Si id es algo más que no es null (por ejemplo, un número).

    queryParams = { id: id.toString() }; // Convertimos el valor a string.
  }

  this.router.push(
    { pathname: this.path + '/view' + subfijo, query: queryParams },
    undefined,
    { shallow: true, scroll: false }
  );
  }

  pushPathReports(subfijo: string = ''): void {
    this.router.push(
      { pathname: this.path +  '/informes' + subfijo },
      undefined,
      { shallow: true, scroll: false }
    )
  }

  pushPathOther(subfijo: string = ''): void {
    this.router.push(
      { pathname: this.path +  subfijo },
      undefined,
      { shallow: true, scroll: false }
    )
  }


  // Método para obtener todos los permisos
  static getAllPermisos(): Record<string, Permiso> {
    const allPermisos: Record<string, Permiso> = {};
    for (const categoria in this.Permisos) {
      Object.assign(allPermisos, this.Permisos[categoria]);
    }
    return allPermisos;
  }
  
  // Propiedad abstracta para definir permisos en clases derivadas
  static Permisos: CategoriaPermisos;

  } 
