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

const getColumns = (navigate) => [
  {
    field: 'invoice',
    headerName: 'News',
    width: 1200,
    editable: false,
    renderCell: (params) => (
      <Typography>{`A new invoice with number ${params.row.invoiceNo} was created at ${new Date(
        params.row.createdAt
      ).toDateString()} for company ${params.row.issuerCompany?.name}`}</Typography>
    ),
  },
];

export default function NewsDataGrid({ myUser }) {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  const data = React.useMemo(() => {
    return invoices.map((d) => {
      return [
        `A new invoice with number ${d.invoiceNo} was created at ${new Date(d.createdAt).toDateString()} for company ${
          d.issuerCompany?.name
        }`,
      ];
    });
  }, []);

  useEffect(() => {
    const asyncFn = async () => {
      const companies = await (await axios.get('/companies', axiosDefaults)).data;
      const invoices = await (await axios.get('/invoices', axiosDefaults)).data;

      invoices.forEach((invoice) => {
        invoice.issuerCompany = companies.find((company) => invoice.issuer === company.id);
      });

      setInvoices(invoices);
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
            News
          </Typography>
          <Grid container columns={{ xs: 2, sm: 3 }}></Grid>

          <Grid container columns={{ xs: 1, sm: 1, md: 5, lg: 5 }}>
            <Grid item xs={0.5}>
              <CSVLink data={data} style={{ textDecoration: 'none' }} underline='hover' filename='NewsData.csv'>
                <Button sx={{ marginBottom: 2 }} variant='outlined'>
                  Export
                </Button>
              </CSVLink>
            </Grid>
            <Grid item xs={5}>
              <DataGrid
                style={{ height: 650 }}
                rows={invoices}
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
