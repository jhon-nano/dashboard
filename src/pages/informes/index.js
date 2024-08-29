import React, { useState } from "react";
// layout for this page
import { Content, Footer, Fullscreen, getContentBasedScheme, Root } from "@mui-treasury/layout";
import { BarChartTwoTone, ImportExportTwoTone, MoneyOffTwoTone, TrendingDownTwoTone, TrendingUpTwoTone } from "@mui/icons-material";
import { CardHeader, Divider, Grid, Stack, useTheme } from "@mui/material";
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
import moment from "moment";
import { Bar, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import DashboardCard from "../../components/informes/DashboardCard";
import FormFooterInformes from "../../components/informes/FormFooter";
import { useInformeAlmacenes, useInformeDia, useModelCompras, useModelInventarios, useModelPedidos } from "../../hooks/models/useModelInformes";
import LayoutCaja from "../../layout/LayoutCaja";
import DashboardListProductos from "../../components/informes/DashboardListProductos";



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


function Index() {


 

  const informes = useSelector((state) => state.informes);



  const { filter_fechas, compras, pedidos, inventarios } = informes



  const [filter, setFilter] = useState('week')
  const [filterData, setFilterData] = useState(0)


  const startOfDay = moment(moment().add(filterData, filter)).startOf(filter).format('LL');
  const endOfDay = moment(moment().add(filterData, filter)).endOf(filter).format('LL');






  return (<>

    <Fullscreen >
      <Root scheme={{
        ...scheme,

      }}>
        <FormFooterInformes startOfDay={startOfDay} endOfDay={endOfDay} filter={filter} setFilter={setFilter} filterData={filterData} setFilterData={setFilterData} />

        <Stack sx={{
          flex: '1 1 auto',
          overflowY: 'auto',
        }} >


          <Content  >



              CONTENIDO

          </Content>
        </Stack>

        <Footer >
          PedidoFormFooter
        </Footer>

      </Root>
    </Fullscreen>








  </>)
}

Index.getLayout = function getLayout(page) {

  return <LayoutCaja {...page.props}  >{page}</LayoutCaja>;
};


export default Index;