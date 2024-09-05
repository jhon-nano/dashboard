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
import LayoutApp from "../../../layout/LayoutApp";
import TypesTickets from "../../../types/typesTickets";



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


function CreateTicket({utilsAuth}) {

  const router = useRouter();
  const { material_table } = useSelector((state) => state.app)

  const moduloTickets = useMemo(() => new TypesTickets(router), [router]);


  return (<>


CREATE









  </>)
}

CreateTicket.getLayout = function getLayout(page) {

  return <LayoutApp {...page.props}  >{page}</LayoutApp>;
};


export default CreateTicket;