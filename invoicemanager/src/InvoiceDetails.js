import * as React from 'react';
import AccountMenu from './MenuLogged';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState, useRef } from 'react';
import invoice1 from './Invoice1.pdf';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import axios from 'axios';
import { axiosDefaults } from './axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const theme = createTheme();

export default function InvoiceDetails({ myUser }) {
  const { id } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [products, setProducts] = useState([]);
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const asyncFn = async () => {
      const invoice = await (await axios.get(`/Invoices/${id}`, axiosDefaults)).data;
      const products = await (await axios.get('/Products', axiosDefaults)).data;
      const invoiceProducts = await (await axios.get('/InvoiceProducts', axiosDefaults)).data;

      setInvoice(invoice);
      setProducts(products);
      setInvoiceProducts(invoiceProducts);
    };
    asyncFn();
  }, []);
  useEffect(() => {}, []);
  useEffect(() => {}, []);
  function getProducts(invoice) {
    const nn = invoiceProducts.filter((ip) => ip.invoiceId === invoice?.id).map((ip) => ip.productId);
    return products.filter((product) => nn.includes(product.id));
  }

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
            Invoice details
          </Typography>
          {myUser?.role === 'SuperAdmin' || (myUser?.role === 'Admin' && myUser.companyId === invoice?.issuer) ? (
            <Grid container columns={{ xs: 2, sm: 3 }}>
              <Grid item xs={0.5}>
                <Button
                  onClick={() => axios.delete(`/invoices/${id}`, axiosDefaults).then(() => navigate('/companies'))}
                  sx={{ marginBottom: 2 }}
                  variant='outlined'
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={0.5}>
                <Button
                  onClick={() => {
                    navigate(`/invoice/${id}/edit`);
                  }}
                  sx={{ marginBottom: 2 }}
                  variant='outlined'
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
          <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 5 }}>
            <Grid item xs={0.7}>
              <p>Invoice no.</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{invoice?.invoiceNo}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Serial no.</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{invoice?.serialNo}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Due date</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{new Date(invoice?.dueDate).toDateString()}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Issuer</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{invoice?.issuer}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Billed to</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{invoice?.billedTo}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Paid</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{invoice?.paid ? 'Yes' : 'No'}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Total price</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{invoice?.totalAmount}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Total VAT</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{invoice?.totalVat}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Created at</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{new Date(invoice?.createdAt).toDateString()}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Type</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{invoice?.type}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Products</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>
                  {getProducts(invoice)
                    .map((product) => product.name)
                    .join(',')}
                </strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Quantity</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>
                  {String(
                    getProducts(invoice).reduce(
                      (acc, product) => (acc += invoiceProducts.find((ip) => ip.productId === product.id)?.quantity ?? 0),
                      0
                    )
                  )}
                </strong>
              </p>
            </Grid>
            <Grid item xs={3}>
              {/* <img
                style={{ width: 1000, height: 400, marginTop: 50 }}
                src={`https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=164&h=164&fit=crop&auto=format`}
              /> */}
              <object
                style={{ width: 1000, height: 1000, marginTop: 50 }}
                data={invoice?.profileImage}
                type='application/pdf'
                width='100%'
                height='100%'
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
