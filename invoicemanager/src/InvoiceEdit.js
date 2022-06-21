import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { axiosDefaults } from './axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { convertBase64 } from './shared';

const theme = createTheme();

export default function InvoiceEditDetails() {
  const { id } = useParams();

  const [invoice, setInvoice] = useState([]);
  const [invoiceNoInput, setInvoiceNoInput] = useState('');
  const [serialNoInput, setSerialNoInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState(new Date());
  const [issuerInput, setIssuerInput] = useState('');
  const [billedToInput, setBilledToInput] = useState('');
  const [paidInput, setPaidInput] = useState(true);
  const [totalAmountInput, setTotalAmountInput] = useState('');
  const [createdAtInput, setCreatedAtInput] = React.useState(new Date());
  const [typeInput, setTypeInput] = React.useState('');
  const [pictureInput, setPictureInput] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  useEffect(() => {
    axios.get(`/invoices/${id}`, axiosDefaults).then((request) => {
      setInvoice(request.data);
      setInvoiceNoInput(request.data.invoiceNo);
      setSerialNoInput(request.data.serialNo);
      setDueDateInput(request.data.dueDate);
      setIssuerInput(request.data.issuer);
      setBilledToInput(request.data.billedTo);
      setPaidInput(request.data.paid);
      setTotalAmountInput(request.data.totalAmount);
      setCreatedAtInput(request.data.createdAt);
      setTypeInput(request.data.type);
      setPictureInput(request.data.profileImage);
    });
  }, []);

  return (
    <div>
      <Container component='main'>
        <CssBaseline />
        <Box
          onSubmit={handleSubmit}
          sx={{
            marginTop: 3,
          }}
        >
          <Typography component='h1' variant='h5' sx={{ fontSize: 30, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
            Edit invoice
          </Typography>

          <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 5 }}>
            <Grid item xs={0.7}>
              <p>Invoice no.*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={invoiceNoInput}
                onChange={(event) => setInvoiceNoInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='standard-required'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Serial no.*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={serialNoInput}
                onChange={(event) => setSerialNoInput(event.target.value)}
                style={{ top: 5 }}
                id='standard-optional'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Due date*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={dueDateInput}
                onChange={(event) => setDueDateInput(event.target.value)}
                style={{ top: 5 }}
                id='standard-required'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Issuer*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={issuerInput}
                onChange={(event) => setIssuerInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='standard-required'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Billed to*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={billedToInput}
                onChange={(event) => setBilledToInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='standard-required'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Paid*</p>
            </Grid>
            <Grid item xs={1.5}>
              <Select
                style={{ top: 5 }}
                labelId='active-select'
                label='Active'
                value={paidInput}
                onChange={(event) => setPaidInput(event.target.value)}
                variant='standard'
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={0.7}>
              <p>Total price*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={totalAmountInput}
                onChange={(event) => setTotalAmountInput(event.target.value)}
                style={{ top: 5 }}
                id='standard-optional'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Created at</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={createdAtInput}
                onChange={(event) => setCreatedAtInput(event.target.value)}
                style={{ top: 5 }}
                id='standard-optional'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Type</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={typeInput}
                onChange={(event) => setTypeInput(event.target.value)}
                style={{ top: 5 }}
                id='standard-optional'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Invoice PDF</p>
            </Grid>
            <Grid item xs={1.5}>
              <Button style={{ top: 5 }} component='label' variant='outlined' sx={{ marginRight: '1rem' }}>
                Upload
                <input
                  type='file'
                  accept='.pdf, .jpg, .jpeg, .png'
                  hidden
                  onChange={async (event) => {
                    const file = event.target.files[0];
                    setPictureInput(await convertBase64(file));
                  }}
                />
              </Button>
              <Box></Box>
            </Grid>
          </Grid>
          <Button
            style={{ top: 5 }}
            component='label'
            variant='outlined'
            sx={{ marginLeft: '25rem', marginTop: '1rem', marginBottom: '2rem' }}
            onClick={() =>
              axios
                .put(
                  `/invoices/${id}`,
                  {
                    id: invoice.id,
                    invoiceNo: invoiceNoInput,
                    serialNo: serialNoInput,
                    dueDate: dueDateInput,
                    issuer: issuerInput,
                    billedTo: billedToInput,
                    paid: paidInput,
                    totalAmount: totalAmountInput,
                    createdAt: createdAtInput,
                    type: typeInput,
                    profileImage: pictureInput,
                  },
                  axiosDefaults
                )
                .then(() => navigate(`/invoice/${id}`))
            }
          >
            Save
          </Button>
        </Box>
      </Container>
    </div>
  );
}
