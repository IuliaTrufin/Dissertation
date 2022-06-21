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
      <Link onClick={() => navigate(`/company/${params.row.id}`)} underline='hover'>
        {params.row.name}
      </Link>
    ),
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
    editable: false,
    renderCell: (params) => <Typography>{params.row.phone}</Typography>,
  },
  {
    field: 'mail',
    headerName: 'Mail',
    width: 110,
    editable: false,
    renderCell: (params) => <Typography>{params.row.mail}</Typography>,
  },
  {
    field: 'iban',
    headerName: 'IBAN',
    width: 160,
    editable: false,
    renderCell: (params) => <Typography>{params.row.iban}</Typography>,
  },
  {
    field: 'capitalAmt',
    headerName: 'Capital Amount',
    width: 160,
    editable: false,
    renderCell: (params) => <Typography>{params.row.capitalAmt}</Typography>,
  },
];
const groupDataInvoicesPerCompany = (companies) => ({
  labels: companies.map((x) => x.name),
  datasets: [
    {
      label: 'Total of expenses',
      data: companies.map((x) => x.paidInvoices.reduce((acc, invoice) => (acc += invoice.totalAmount), 0)),
      // fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      // borderColor: 'rgba(255, 99, 132, 0.4)',
      // yAxisID: 'y-axis-1',
    },
    {
      label: 'Total of income',
      data: companies.map((x) => x.issuedInvoices.reduce((acc, invoice) => (acc += invoice.totalAmount), 0)),
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
      text: 'Costs per companies',
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

export default function CompaniesDataGrid({ myUser }) {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const data = React.useMemo(() => {
    return companies.map((d) => {
      const company = { ...d };
      company.issuedInvoices = '';
      company.paidInvoices = '';
      company.profileImage = '';
      return Object.values(company);
    });
  }, [companies]);

  useEffect(() => {
    const asyncFn = async () => {
      const invoices = await (await axios.get('/invoices', axiosDefaults)).data;
      const companies = await (await axios.get('/companies', axiosDefaults)).data;

      companies.forEach((company) => {
        company.issuedInvoices = invoices.filter((invoice) => invoice.issuer === company.id);
        company.paidInvoices = invoices.filter((invoice) => invoice.billedTo === company.name);
      });

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
            Companies
          </Typography>
          <Grid container columns={{ xs: 2, sm: 3 }}></Grid>

          <Grid container columns={{ xs: 1, sm: 1, md: 5, lg: 5 }}>
            <Grid item xs={1}>
              <Button onClick={saveCanvas} sx={{ marginBottom: 2 }} variant='outlined'>
                Export chart
              </Button>
            </Grid>
            <Grid item xs={5} style={{ marginBottom: 100 }}>
              <Bar id='userChart' options={options} data={groupDataInvoicesPerCompany(companies)} />
            </Grid>
            <Grid item xs={0.5}>
              <CSVLink data={data} style={{ textDecoration: 'none' }} underline='hover' filename='CompanyData.csv'>
                <Button sx={{ marginBottom: 2 }} variant='outlined'>
                  Export
                </Button>
              </CSVLink>
            </Grid>
            {myUser?.role === 'SuperAdmin' ? (
              <Grid item xs={0.4}>
                <Button onClick={() => navigate('/company/add')} sx={{ marginBottom: 2 }} variant='outlined'>
                  Add
                </Button>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={5}>
              <DataGrid
                style={{ height: 650 }}
                rows={companies}
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
