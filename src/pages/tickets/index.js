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


  return (<>


    <MaterialTable
      title='TICKETS'
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]}
      actions={[
        {
          icon: 'add',
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event,rowData) => utilsAuth.isPermisoAuthorized(TypesTickets.getAllPermisos().CREATE_TICKET, true)
            && moduloTickets.pushPathCreate('/ticket')
        }
      ]}
      options={{
        ...material_table.options,
        search: false,
        pageSize: 15
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