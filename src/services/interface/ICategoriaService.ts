import { Categoria, CategoriaAtributoNew } from "../../models";


export interface ICategoriaService {

    getCategoriaByNombre(nombreCategoria: string): Promise<Categoria[] | null>;

    //----------------------------------------------------------------------------



    updateCategoriaAtributos(categoriaId: string, data: [CategoriaAtributoNew]): Promise<Categoria | null>;


  }