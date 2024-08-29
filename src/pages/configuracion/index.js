import {
  ManageAccountsTwoTone,
  StoreTwoTone
} from "@mui/icons-material";
import {
  Tab,
  Tabs
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AlmacenesTable from "../../components/almacenes/AlmacenesTable";

import { API } from "aws-amplify";
import UsuariosCognitoTable from "../../components/usuarios/UsuariosCognitoTable";
import UsuariosTable from "../../components/usuarios/UsuariosTable";
import { useModel } from "../../hooks/useModel";
import LayoutApp from "../../layout/LayoutApp";
import { Almacen, Usuario } from "../../models";

moment.locale("es");

function ConfiguracionAppBar({ value, setValue }) {
  return (
    <Tabs
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue); {/* Pasa la función para actualizar el valor desde la prop de la página */ }
      }}
      centered
      textColor="inherit"
      indicatorColor='secondary'
      aria-label="icon position tabs example"
      sx={{ color: 'white' }}
    >
      <Tab
        icon={<ManageAccountsTwoTone fontSize='large' />}
        iconPosition="start"
        label="USUARIOS"
      />
      <Tab
        icon={<StoreTwoTone fontSize='large' />}
        iconPosition="start"
        label="ALMACENES"
      />
      <Tab
        icon={<ManageAccountsTwoTone fontSize='large' />}
        iconPosition="start"
        label="COGNITO"
      />
    </Tabs>
  )
}




export default function Configuracion({ value }) {

  const {
    loading: loadingAlmacenes,
    data: almacenes,
    error: errorAlmacenes,
  } = useModel(Almacen);

  const {
    loading: loadingUsuarios,
    data: usuarios,
    error: errorUsuarios,
  } = useModel(Usuario);


  const [companies, setCompanies] = useState([]);



  const fetchCompanies = async () => {
    try {
      const response = await API.get('alegraAPI', '/companies');
      console.log('Companies:', response);
      setCompanies(response.data)
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    fetchCompanies()
  }, []);


  console.log(companies);


  switch (value) {
    case 3:
      return (
        <div>
          <h1>Companies</h1>
          <ul>

          </ul>
        </div>
      );
    case 0:
      return (
        <UsuariosTable data={usuarios} loadingUsuarios={loadingUsuarios} />
      );
    case 1:
      return (
        <AlmacenesTable data={almacenes} />
      );
    case 2:
      return (
        <UsuariosCognitoTable />
      );
    default:
      break;
  }
}

Configuracion.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props} header={<ConfiguracionAppBar />}>{page}</LayoutApp>;
};

