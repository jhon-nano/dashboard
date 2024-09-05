import {
  AssignmentIndTwoTone,
  AssignmentTwoTone,
  GroupAddTwoTone,
  ManageAccountsTwoTone,
  StoreTwoTone
} from "@mui/icons-material";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import AlmacenesTable from "../../components/almacenes/AlmacenesTable";

import { API, Auth } from "aws-amplify";
import { useRouter } from "next/router";
import UsuariosCognitoTable from "../../components/usuarios/UsuariosCognitoTable";
import UsuariosTable from "../../components/usuarios/UsuariosTable";
import { useModel } from "../../hooks/useModel";
import LayoutApp from "../../layout/LayoutApp";
import { Almacen, Usuario } from "../../models";
import TypesUsuarios from "../../types/typesUsuario";

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




export default function Configuracion({ value, utilsAuth }) {


  const router = useRouter();
  const moduloUsuario = useMemo(() => new TypesUsuarios(router), [router]);

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
  const [usersCognito, setUsers] = useState([]);


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


  useEffect(() => {
    const listUsers = async () => {
      try {

        const apiName = 'AdminQueries';
        const path = '/listUsers';
        const myInit = {
          queryStringParameters: {
            limit: 10,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
          },
        };
        const response = await API.get(apiName, path, myInit);
        setUsers(response.Users);
      } catch (error) {
        console.error('Error listing users', error);
      }
    };

    listUsers();
  }, []);


  console.log(usersCognito);

  const mergedUsers = usersCognito.map(usuario => {
    const cognitoUser = usuarios.find(user => {
      return usuario.Attributes.some(attr => attr.Name === 'sub' && attr.Value === user.sub);
    });




      const attributes = usuario.Attributes.reduce((acc, attr) => {
        acc[attr.Name] = attr.Value;
        return acc;
      }, {});


      return {
        ...usuario,
        ...cognitoUser,
        ...attributes

      };
    

 
  });

  console.log(mergedUsers);



      return (
        <Grid container>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
          <AlmacenesTable data={almacenes} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <List sx={{ bgcolor: 'background.paper' }}>
              {mergedUsers.map((element) =>
              (<ListItem secondaryAction={
                element.id ?
                  <IconButton edge="end" aria-label="delete" onClick={() => utilsAuth.isPermisoAuthorized(TypesUsuarios.getAllPermisos().VER_USUARIO, true)
                    && moduloUsuario.pushPathView(element.id, '/usuario')}>
                    <AssignmentTwoTone />
                  </IconButton> :
                  <IconButton edge="end" aria-label="delete" onClick={() => utilsAuth.isPermisoAuthorized(TypesUsuarios.getAllPermisos().AGREGAR_USUARIO, true)
                    && moduloUsuario.pushPathCreate('/usuario', { sub: element.sub, username: element.Username })}>
                    <GroupAddTwoTone />
                  </IconButton>
              }>
                <ListItemAvatar>
                  <Avatar variant="rounded">
                    <AssignmentIndTwoTone color="primary" fontSize="large" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={element.nombreUsuario || 'Usuario No Registrado BD.'} secondary={element.Username} />

              </ListItem>))}


            </List>
          </Grid>

        </Grid>
      );

}

Configuracion.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props} >{page}</LayoutApp>;
};

