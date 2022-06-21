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
    field: 'number',
    headerName: 'Number',
    width: 150,
    editable: false,
    renderCell: (params) => (
      <Link onClick={() => navigate(`/invoice/${params.row.id}`)} underline='hover'>
        {params.row.invoiceNo}
      </Link>
    ),
  },
  {
    field: 'due',
    headerName: 'Due date',
    width: 150,
    editable: false,
    renderCell: (params) => <Typography>{`${new Date(params.row.dueDate).toDateString()}`}</Typography>,
  },
  {
    field: 'issuer',
    headerName: 'Issuer',
    width: 110,
    editable: false,
    renderCell: (params) => <Typography>{params.row.issuerCompany.name}</Typography>,
  },
  {
    field: 'billedto',
    headerName: 'Billed to',
    width: 160,
    editable: false,
    renderCell: (params) => <Typography>{params.row.billedTo}</Typography>,
  },
  {
    field: 'amount',
    headerName: 'Total amount',
    width: 160,
    editable: false,
    renderCell: (params) => <Typography>{params.row.totalAmount}</Typography>,
  },
  {
    field: 'paid',
    headerName: 'Paid',
    width: 160,
    editable: false,
    renderCell: (params) => <Typography>{params.row.paid ? 'Yes' : 'No'}</Typography>,
  },
];

const groupDataPerInvoice = (companies) => ({
  labels: companies.map((x) => x.name),
  datasets: [
    {
      label: 'Number of paid invoices',
      data: companies.map((company) => company.issuedInvoices.filter((invoice) => invoice.paid).length),
      // fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      // borderColor: 'rgba(255, 99, 132, 0.4)',
      // yAxisID: 'y-axis-1',
    },
    {
      label: 'Number of unpaid invoices',
      data: companies.map((company) => company.issuedInvoices.filter((invoice) => !invoice.paid).length),
      // fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      // borderColor: 'rgba(54, 162, 235, 0.4)',
      // yAxisID: 'y-axis-2',
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
      text: 'Invoices per companies',
    },
  },
};

function saveCanvas() {
  const canvasSave = document.getElementById('userChart');
  canvasSave.toBlob(function (blob) {
    saveAs(blob, 'testing.png');
  });
}

export default function InvoicesDataGrid({ myUser }) {
  const [companies, setCompanies] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  const data = React.useMemo(() => {
    return invoices.map((d) => {
      const invoice = { ...d };
      invoice.issuerCompany = '';
      return Object.values(invoice);
    });
  }, []);

  useEffect(() => {
    const asyncFn = async () => {
      const companies = await (await axios.get('/companies', axiosDefaults)).data;
      const invoices = await (await axios.get('/invoices', axiosDefaults)).data;

      companies.forEach((company) => {
        company.issuedInvoices = invoices.filter((invoice) => invoice.issuer === company.id || invoice.billedTo === company.name);
      });

      invoices.forEach((invoice) => {
        invoice.issuerCompany = companies.find((company) => invoice.issuer === company.id);
      });

      setInvoices(invoices);
      setCompanies(companies);
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
            Invoices
          </Typography>
          <Grid container columns={{ xs: 2, sm: 3 }}></Grid>

          <Grid container columns={{ xs: 1, sm: 1, md: 5, lg: 5 }}>
            <Grid item xs={1}>
              <Button onClick={saveCanvas} sx={{ marginBottom: 2 }} variant='outlined'>
                Export chart
              </Button>
            </Grid>
            <Grid item xs={5} style={{ marginBottom: 100 }}>
              <Bar id='userChart' options={options} data={groupDataPerInvoice(companies)} />
            </Grid>
            <Grid item xs={0.5}>
              <CSVLink data={data} style={{ textDecoration: 'none' }} underline='hover' filename='InvoiceData.csv'>
                <Button sx={{ marginBottom: 2 }} variant='outlined'>
                  Export
                </Button>
              </CSVLink>
            </Grid>
            <Grid item xs={0.4}>
              <Button onClick={() => navigate('/invoice/add')} sx={{ marginBottom: 2 }} variant='outlined'>
                Add
              </Button>
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
