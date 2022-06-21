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

export default function CompanyAddDetails() {
  const [company, setCompany] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [cuiInput, setCuiInput] = useState('');
  const [regNoInput, setRegNoInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [mailInput, setMailInput] = useState('');
  const [ibanInput, setIbanInput] = useState('');
  const [bankNameInput, setBankNameInput] = React.useState('');
  const [capitalAmtInput, setCapitalAmtInput] = React.useState('');
  const [pictureInput, setPictureInput] = React.useState('');
  const navigate = useNavigate();

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
            Add company
          </Typography>

          <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 5 }}>
            <Grid item xs={0.7}>
              <p>Registration no.*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={regNoInput}
                onChange={(event) => setRegNoInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='regNoInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Name*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                style={{ top: 5 }}
                id='nameInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Address</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={addressInput}
                onChange={(event) => setAddressInput(event.target.value)}
                style={{ top: 5 }}
                id='addressInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Phone*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={phoneInput}
                onChange={(event) => setPhoneInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='phoneInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Mail*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={mailInput}
                onChange={(event) => setMailInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='mailInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>IBAN*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={ibanInput}
                onChange={(event) => setIbanInput(event.target.value)}
                style={{ top: 5 }}
                id='ibanInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>CUI*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={cuiInput}
                onChange={(event) => setCuiInput(event.target.value)}
                style={{ top: 5 }}
                id='cuiInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Bank name</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={bankNameInput}
                onChange={(event) => setBankNameInput(event.target.value)}
                style={{ top: 5 }}
                id='bankNameInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Capital amount</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={capitalAmtInput}
                onChange={(event) => setCapitalAmtInput(event.target.value)}
                style={{ top: 5 }}
                id='capitalAmtInput'
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
            onClick={() =>
              axios
                .post(
                  `/Companies`,
                  {
                    name: nameInput,
                    cui: cuiInput,
                    regNo: regNoInput,
                    address: addressInput,
                    profileImage: pictureInput,
                    phone: phoneInput,
                    mail: mailInput,
                    iban: ibanInput,
                    bankName: bankNameInput,
                    capitalAmt: capitalAmtInput,
                  },
                  axiosDefaults
                )
                .then(({ data }) => navigate(`/company/${data.id}`))
            }
            style={{ top: 5 }}
            component='label'
            variant='outlined'
            sx={{ marginLeft: '25rem', marginTop: '1rem', marginBottom: '2rem' }}
          >
            Save
          </Button>
        </Box>
      </Container>
    </div>
  );
}
