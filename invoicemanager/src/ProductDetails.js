import * as React from 'react';
import AccountMenu from './MenuLogged';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { axiosDefaults } from './axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const theme = createTheme();

export default function ProductDetails({ myUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get(`/Products/${id}`, axiosDefaults).then((request) => setProduct(request.data));
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
            Product details
          </Typography>
          {myUser?.role === 'SuperAdmin' ? (
            <Grid container columns={{ xs: 2, sm: 3 }}>
              <Grid item xs={0.5}>
                <Button
                  onClick={() => axios.delete(`/products/${id}`, axiosDefaults).then(() => navigate('/products'))}
                  sx={{ marginBottom: 2 }}
                  variant='outlined'
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={0.4}>
                <Button
                  onClick={() => {
                    navigate(`/product/${id}/edit`);
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
              <p>Name</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{product.name}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Stock</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{product.stock}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Price</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{product.price}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Tax</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{product.vat}</strong>
              </p>
            </Grid>
            <Grid item xs={3}>
              <img style={{ height: 300, position: 'absolute', top: 300, right: 150 }} src={product.profileImage} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
