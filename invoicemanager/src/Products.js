import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chart from 'chart.js/auto';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';
import { axiosDefaults } from './axios';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getColumns = (navigate) => [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
    renderCell: (params) => (
      <Link onClick={() => navigate(`/product/${params.row.id}`)} underline='hover'>
        {params.row.name}
      </Link>
    ),
  },
  {
    field: 'stock',
    headerName: 'Stock',
    width: 150,
    editable: false,
    renderCell: (params) => <Typography>{params.row.stock}</Typography>,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 110,
    editable: false,
    renderCell: (params) => <Typography>{params.row.price}</Typography>,
  },
  {
    field: 'vat',
    headerName: 'VAT',
    width: 160,
    editable: false,
    renderCell: (params) => <Typography>{params.row.vat}</Typography>,
  },
];

const groupDataProductsPerproduct = (products) => ({
  labels: products.map((x) => x.name),
  datasets: [
    {
      label: 'Number of exported products',
      data: products.map((x) => x.quantites.reduce((acc, y) => (acc += y), 0)),
      // fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      // borderColor: 'rgba(255, 99, 132, 0.4)',
      // yAxisID: 'y-axis-1',
    },
  ],
});
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Costs per products',
    },
  },
};

function saveCanvas() {
  //save to png
  const canvasSave = document.getElementById('userChart');
  canvasSave.toBlob(function (blob) {
    saveAs(blob, 'testing.png');
  });
}

export default function ProductsDataGrid({ myUser }) {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  const data = React.useMemo(() => {
    return products.map((d) => {
      const product = { ...d };
      product.quantites = '';
      return Object.values(product);
    });
  }, [products]);

  useEffect(() => {
    const asyncFn = async () => {
      const invoiceProducts = await (await axios.get('/invoiceProducts', axiosDefaults)).data;
      const products = await (await axios.get('/products', axiosDefaults)).data;

      products.forEach((product) => {
        product.quantites = invoiceProducts.filter((invoiceProduct) => invoiceProduct.productId === product.id).map((x) => x.quantity);
      });

      setproducts(products);
    };

    asyncFn();
  }, []);

  return (
    <div>
      <Container component='main'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
          }}
        >
          <Typography component='h1' variant='h5' sx={{ fontSize: 30, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
            Products
          </Typography>
          <Grid container columns={{ xs: 2, sm: 3 }}></Grid>

          <Grid container columns={{ xs: 1, sm: 1, md: 5, lg: 5 }}>
            <Grid item xs={1}>
              <Button onClick={saveCanvas} sx={{ marginBottom: 2 }} variant='outlined'>
                Export chart
              </Button>
            </Grid>
            <Grid item xs={5} style={{ marginBottom: 100 }}>
              <Bar id='userChart' options={options} data={groupDataProductsPerproduct(products)} />
            </Grid>
            <Grid item xs={0.5}>
              <CSVLink data={data} style={{ textDecoration: 'none' }} underline='hover' filename='ProductData.csv'>
                <Button sx={{ marginBottom: 2 }} variant='outlined'>
                  Export
                </Button>
              </CSVLink>
            </Grid>
            {myUser?.role === 'SuperAdmin' || myUser?.role === 'Admin' ? (
              <Grid item xs={0.4}>
                <Button onClick={() => navigate('/product/add')} sx={{ marginBottom: 2 }} variant='outlined'>
                  Add
                </Button>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={5}>
              <DataGrid
                style={{ height: 650 }}
                rows={products}
                columns={getColumns(navigate)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
