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
import { useNavigate } from 'react-router-dom';
import { convertBase64 } from './shared';

const theme = createTheme();

export default function UserAddDetails() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [mailInput, setMailInput] = useState('');
  const [companyInput, setCompanyInput] = useState('');
  const [cnpInput, setCnpInput] = useState('');
  const [icNoInput, setIcNoInput] = useState('');
  const [pictureInput, setPictureInput] = useState('');
  const [roleInput, setRoleInput] = React.useState('SuperAdmin');
  const [activeInput, setActiveInput] = React.useState(true);
  const navigate = useNavigate();

  // const handleChangeRole = (event) => {
  //   setRole(event.target.value);
  // };
  // const handleChangeActive = (event) => {
  //   setActive(event.target.value);
  // };
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
            Add user
          </Typography>

          <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 5 }}>
            <Grid item xs={0.7}>
              <p>Username*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={usernameInput}
                onChange={(event) => setUsernameInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='usernameInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Password*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={passwordInput}
                type='password'
                onChange={(event) => setPasswordInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='passwordInput'
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
              <p>Mail</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={mailInput}
                onChange={(event) => setMailInput(event.target.value)}
                style={{ top: 5 }}
                id='mailInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Company*</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={companyInput}
                onChange={(event) => setCompanyInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='companyInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>CNP</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={cnpInput}
                onChange={(event) => setCnpInput(event.target.value)}
                style={{ top: 5 }}
                required
                id='cnpInput'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>IC no.</p>
            </Grid>
            <Grid item xs={1.5}>
              <TextField
                value={icNoInput}
                onChange={(event) => setIcNoInput(event.target.value)}
                style={{ top: 5 }}
                id='standard-optional'
                variant='standard'
              />
            </Grid>
            <Grid item xs={0.7}>
              <p>Role*</p>
            </Grid>
            <Grid item xs={1.5}>
              <Select
                style={{ top: 5 }}
                labelId='role-select'
                label='Role'
                value={roleInput}
                onChange={(event) => setRoleInput(event.target.value)}
                variant='standard'
              >
                <MenuItem value={'SuperAdmin'}>Super Admin</MenuItem>
                <MenuItem value={'Admin'}>Admin</MenuItem>
                <MenuItem value={'User'}>User</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={0.7}>
              <p>Active*</p>
            </Grid>
            <Grid item xs={1.5}>
              <Select
                style={{ top: 5 }}
                labelId='active-select'
                label='Active'
                value={activeInput}
                onChange={(event) => setActiveInput(event.target.value)}
                variant='standard'
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
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
                .post(
                  '/users',
                  {
                    active: activeInput,
                    cnp: cnpInput,
                    icnumber: icNoInput,
                    mail: mailInput,
                    profileImage: pictureInput,
                    companyId: parseInt(companyInput, 10),
                    name: nameInput,
                    password: passwordInput,
                    role: roleInput,
                    username: usernameInput,
                  },
                  axiosDefaults
                )
                .then(({ data }) => navigate(`/user/${data.id}`))
            }
          >
            Save
          </Button>
        </Box>
      </Container>
    </div>
  );
}
