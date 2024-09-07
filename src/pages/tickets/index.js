import React, { useMemo } from "react";
// layout for this page
import MaterialTable from "@material-table/core";
import { getContentBasedScheme } from "@mui-treasury/layout";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LayoutApp from "../../layout/LayoutApp";
import TypesTickets from "../../types/typesTickets";
import { useModelTickets } from "../../hooks/models/useModelTicket";
import { AssignmentTwoTone } from "@mui/icons-material";



const scheme = getContentBasedScheme();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Title,
  Legend
);


function Index({utilsAuth}) {

  const router = useRouter();
  const { material_table } = useSelector((state) => state.app)

  const moduloTickets = useMemo(() => new TypesTickets(router), [router]);

  const { tickets } = useModelTickets()

  return (<>


    <MaterialTable
      title='TICKETS'
      columns={[
        { 
          title: '#', 
          field: 'consecutivo',
          headerStyle: {
            width: "1%",
            maxWidth: "1%",
            align: "center",
            fontSize: 12
          },
          cellStyle: (rowData) => ({
            width: "1%",
            maxWidth: "1%",
            fontSize: 12
          }),
        },
        { 
          title: 'FP', 
          field: 'forma_pago', 
          headerStyle: {
            width: "10%",
            maxWidth: "10%",
            align: "center",
            fontSize: 12
          },
          cellStyle: (rowData) => ({
            width: "10%",
            maxWidth: "10%",
            fontSize: 12
          }),
        },
        { 
          title: 'CLIENTE', 
          field: 'cliente',
          headerStyle: {
            width: "35%",
            maxWidth: "35%",
            align: "center",
            fontSize: 12
          },
          cellStyle: (rowData) => ({
            width: "35%",
            maxWidth: "35%",
            fontSize: 12
          }),
        },
        {
          title: 'VALOR',
          field: 'precio_venta',
           type: 'numeric',
           headerStyle: {
            width: "10%",
            maxWidth: "10%",
            align: "center",
            fontSize: 12
          },
          cellStyle: (rowData) => ({
            width: "10%",
            maxWidth: "10%",
            fontSize: 12
          }),

        },
      ]}
      data={tickets}
      actions={[
        {
          icon: 'add',
          tooltip: 'Add Ticket',
          isFreeAction: true,
          onClick: (event,rowData) => utilsAuth.isPermisoAuthorized(TypesTickets.getAllPermisos().CREATE_TICKET, true)
            && moduloTickets.pushPathCreate('/ticket')
        },
        {
          icon: () => (
            <AssignmentTwoTone sx={{ fontSize: 24 }} color={"action"} />
          ),
          tooltip: 'View Ticket',

          onClick: (event,rowData) => utilsAuth.isPermisoAuthorized(TypesTickets.getAllPermisos().VER_TICKET
          , true)
            && moduloTickets.pushPathView(rowData.id,'/ticket')
        }

      ]}
      options={{
        ...material_table.options,
        search: false,
        pageSize: 15,
        actionsColumnIndex: 0,
      }}
      icons={material_table.icons}
      style={material_table.style}
      localization={material_table.localization}
    />









  </>)
}

Index.getLayout = function getLayout(page) {

  return <LayoutApp {...page.props}  >{page}</LayoutApp>;
};


export default Index;