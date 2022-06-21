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
import axios from 'axios';
import { axiosDefaults } from './axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getColumns = (navigate) => [
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
    editable: false,
    renderCell: (params) => (
      <Link onClick={() => navigate(`/user/${params.row.id}`)} underline='hover'>
        {params.row.username}
      </Link>
    ),
  },
  {
    field: 'name',
    headerName: 'Full name',
    width: 150,
    editable: false,
    renderCell: (params) => (
      <Link onClick={() => navigate(`/user/${params.row.id}`)} underline='hover'>
        {params.row.name}
      </Link>
    ),
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 110,
    editable: false,
    renderCell: (params) => <Typography>{params.row.company?.name}</Typography>,
  },
  {
    field: 'active',
    headerName: 'Active',
    width: 160,
    editable: false,
    renderCell: (params) => <Typography>{params.row.active ? 'Yes' : 'No'}</Typography>,
  },
];

const groupDataUsersPerCompany = (companies) => ({
  labels: companies.map((x) => x.name),
  datasets: [
    {
      label: 'Number of active users',
      data: companies.map((x) => x.activeUsers),
      // fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      // borderColor: 'rgba(255, 99, 132, 0.4)',
      // yAxisID: 'y-axis-1',
    },
    {
      label: 'Number of inactive users',
      data: companies.map((x) => x.inactiveUsers),
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
      text: 'Users per companies',
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

export default function UsersDataGrid({ myUser }) {
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const data = React.useMemo(() => {
    return users.map((d) => {
      const user = { ...d };
      user.company = `${d.company?.name}`;
      user.cnp = `'${user.cnp}'`;
      return Object.values(user);
    });
  }, [users]);

  useEffect(() => {
    const asyncFn = async () => {
      const users = await (await axios.get('/users', axiosDefaults)).data;
      const companies = await (await axios.get('/companies', axiosDefaults)).data;

      console.log(users, companies);
      users.forEach((user) => {
        user.company = companies.find((x) => x.id === user.companyId);
      });

      companies.forEach((company) => {
        company.users = users.filter((user) => user.companyId === company.id);
        company.activeUsers = company.users.reduce((acc, curr) => (acc += curr.active), 0);
        company.inactiveUsers = company.users.length - company.activeUsers;
      });

      setUsers(users);
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
            Users
          </Typography>
          <Grid container columns={{ xs: 2, sm: 3 }}></Grid>

          <Grid container columns={{ xs: 1, sm: 1, md: 5, lg: 5 }}>
            <Grid item xs={1}>
              <Button onClick={saveCanvas} sx={{ marginBottom: 2 }} variant='outlined'>
                Export chart
              </Button>
            </Grid>
            <Grid item xs={5} style={{ marginBottom: 100 }}>
              <Bar id='userChart' options={options} data={groupDataUsersPerCompany(companies)} />
            </Grid>
            <Grid item xs={0.5}>
              <CSVLink data={data} style={{ textDecoration: 'none' }} underline='hover' filename='UserData.csv'>
                <Button sx={{ marginBottom: 2 }} variant='outlined'>
                  Export
                </Button>
              </CSVLink>
            </Grid>
            {myUser?.role === 'SuperAdmin' ? (
              <Grid item xs={0.4}>
                <Button onClick={() => navigate('/user/add')} sx={{ marginBottom: 2 }} variant='outlined'>
                  Add
                </Button>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={5}>
              <DataGrid
                style={{ height: 650 }}
                rows={users}
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
