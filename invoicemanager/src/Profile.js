import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { axiosDefaults } from './axios';
import { useState } from 'react';
import { useEffect } from 'react';

const theme = createTheme();

export default function ProfileDetails({ myUser }) {
  const [user, setUser] = useState(myUser);

  useEffect(() => {
    const asyncFn = async () => {
      const companies = await (await axios.get('/companies', axiosDefaults)).data;
      myUser.company = companies.find((x) => x.id === myUser?.companyId);

      setUser(user);
    };

    asyncFn();
  }, [myUser]);

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
            My profile
          </Typography>
          <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 5 }}>
            <Grid item xs={0.7}>
              <p>Username</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.username}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Name</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.name}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Mail</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.mail}</strong>
              </p>
            </Grid>

            <Grid item xs={0.7}>
              <p>CNP</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.cnp}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>IC no.</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.icnumber}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Role</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.role}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Active</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.active ? 'Yes' : 'No'}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Company name</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.company?.name}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Registration no.</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.company?.regNo}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Company address</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.company?.address}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Company phone</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.company?.phone}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Company mail</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.company?.mail}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>IBAN</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.company?.iban}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>CUI</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.company?.cui}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Bank name</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.company?.bankName}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Capital amount</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user?.company?.capitalAmt}</strong>
              </p>
            </Grid>

            <Grid item xs={3}>
              <img style={{ height: 300, position: 'absolute', top: 300, right: 150 }} src={user?.profileImage} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
