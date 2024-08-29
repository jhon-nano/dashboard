import React, { useState } from "react";
// layout for this page
import { Content, Footer, Fullscreen, getContentBasedScheme, Root } from "@mui-treasury/layout";
import { Stack } from "@mui/material";
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
import { useSelector } from "react-redux";
import FormFooterInformes from "../../components/informes/FormFooter";
import LayoutCaja from "../../layout/LayoutCaja";



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


export default function IndexInformes() {




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

IndexInformes.getLayout = function getLayout(page) {

  return <LayoutCaja {...page.props}  >{page}</LayoutCaja>;
};


