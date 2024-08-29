import React from "react";
// layout for this page

import { Usuario } from "../../models";

import UsuariosTable from "../../components/usuarios/UsuariosTable";
import LayoutApp from "../../layout/LayoutApp";

import { useModel } from "./../../hooks/useModel";

export default function Usuarios() {


  const {
    loading: loadingUsuarios,
    data: usuarios,
    error: errorUsuarios,
  } = useModel(Usuario);

  return (<UsuariosTable data={usuarios} loadingUsuarios={loadingUsuarios} />);
}


Usuarios.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props} >{page}</LayoutApp>;
};
