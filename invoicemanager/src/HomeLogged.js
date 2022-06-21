import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Typography from '@mui/material/Typography';

const dataInvoicesImport = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Number of imported invoices',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.4)',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'Number of exported invoices',
      data: [1, 2, 1, 1, 2, 2],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.4)',
      yAxisID: 'y-axis-2',
    },
  ],
};

const dataInvoicesCreated = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Number of created invoices',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(188, 80, 100)',
      borderColor: 'rgba(188, 80, 100, 0.4)',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'Number of updated invoices',
      data: [1, 2, 1, 1, 2, 2],
      fill: false,
      backgroundColor: 'rgb(87, 76, 158)',
      borderColor: 'rgba(87, 76, 158, 0.4)',
      yAxisID: 'y-axis-2',
    },
  ],
};

const dataProducts = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Number of created products',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(0, 157, 154)',
      borderColor: 'rgba(0, 157, 154, 0.4)',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'Number of updated products',
      data: [1, 2, 1, 1, 2, 2],
      fill: false,
      backgroundColor: 'rgb(210, 161, 6)',
      borderColor: 'rgba(210, 161, 6, 0.4)',
      yAxisID: 'y-axis-2',
    },
  ],
};

const dataMail = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Number of received notifications',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(0, 45, 156)',
      borderColor: 'rgba(0, 45, 156, 0.4)',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'Number of created notifications',
      data: [1, 2, 1, 1, 2, 2],
      fill: false,
      backgroundColor: 'rgb(255, 131, 43)',
      borderColor: 'rgba(255, 131, 43, 0.4)',
      yAxisID: 'y-axis-2',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  maintainAspectRatio: false,
};

const MultiAxisLine = () => {
  return (
    <div fluid='md' style={{ height: 600, width: '76%', marginTop: 30, marginLeft: 170 }}>
      <Typography component='h1' variant='h5' sx={{ fontSize: 30, marginBottom: 10, textAlign: 'center' }}>
        Welcome back!
      </Typography>
      <div className='row d-flex justify-content-center flex-xl-wrap'>
        <div className='col-5 chart' style={{ height: 300 }}>
          <Line data={dataInvoicesImport} options={options} />
        </div>
        <div className='col-5 chart' style={{ height: 300, marginTop: 100 }}>
          <Line data={dataInvoicesCreated} options={options} />
        </div>
        <div className='col-5 chart' style={{ height: 300, marginTop: 100 }}>
          <Line data={dataProducts} options={options} />
        </div>
        <div className='col-5 chart' style={{ height: 300, marginTop: 100 }}>
          <Line data={dataMail} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MultiAxisLine;
