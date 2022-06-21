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
import { convertBase64 } from './shared';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const theme = createTheme();

export default function ProductEditDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [stockInput, setStockInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [vatInput, setVatInput] = useState('');
  const [pictureInput, setPictureInput] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/products/${id}`, axiosDefaults).then((request) => {
      setProduct(request.data);
      setNameInput(request.data.name);
      setStockInput(request.data.stock);
      setPriceInput(request.data.price);
      setVatInput(request.data.vat);
      setPictureInput(request.data.profileImage);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

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
            Edit product
          </Typography>

          <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 5 }}>
            <Grid item xs={0.7}>
              <p>Name*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='nameInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Stock*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={stockInput}
                onChange={(event) => setStockInput(event.target.value)}
                style={{ top: 5 }}
                id='standard-optional'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Price*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={priceInput}
                onChange={(event) => setPriceInput(event.target.value)}
                style={{ top: 5 }}
                id='standard-required'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>VAT*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={vatInput}
                onChange={(event) => setVatInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='standard-required'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Picture</p>
            </Grid>
            <Grid item xs={1.5}>
              <Button style={{ top: 5 }} component='label' variant='outlined' sx={{ marginRight: '1rem' }}>
                Upload
                <input
                  type='file'
                  accept='.jpg'
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
                  `/products/${id}`,
                  {
                    id: product.id,
                    name: nameInput,
                    stock: stockInput,
                    price: priceInput,
                    vat: vatInput,
                    profileImage: pictureInput,
                  },
                  axiosDefaults
                )
                .then(() => navigate(`/product/${id}`))
            }
          >
            Save
          </Button>
        </Box>
      </Container>
    </div>
  );
}
