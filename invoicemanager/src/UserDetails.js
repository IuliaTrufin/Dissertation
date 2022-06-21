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
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const theme = createTheme();

export default function UserDetails({ myUser }) {
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [myCompanyUsers, setMyCompanyUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/users/${id}`, axiosDefaults).then(({ data }) => setUser(data));
  }, []);
  useEffect(() => {
    axios.get('/companies', axiosDefaults).then(({ data }) => {
      setCompanies(data);
    });
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
            User details
          </Typography>
          <Grid container columns={{ xs: 2, sm: 3 }}>
            {myUser?.role === 'SuperAdmin' || (myUser?.role === 'Admin' && myUser.companyId === user.companyId) ? (
              <Grid item xs={0.5}>
                <Button
                  onClick={() => axios.delete(`/users/${id}`, axiosDefaults).then(() => navigate('/users'))}
                  sx={{ marginBottom: 2 }}
                  variant='outlined'
                >
                  Delete
                </Button>
              </Grid>
            ) : (
              <></>
            )}
            {myUser?.role === 'SuperAdmin' || (myUser?.role === 'Admin' && myUser.companyId === user.companyId) ? (
              <Grid item xs={0.4}>
                <Button
                  onClick={() => {
                    navigate(`/user/${id}/edit`);
                  }}
                  sx={{ marginBottom: 2 }}
                  variant='outlined'
                >
                  Edit
                </Button>
              </Grid>
            ) : (
              <></>
            )}
            {myUser?.role === 'SuperAdmin' || (myUser?.role === 'Admin' && myUser.companyId === user.companyId) ? (
              <Grid item xs={0.5}>
                <Button
                  onClick={() =>
                    axios.put(`/users/${id}/toggleActive`, {}, axiosDefaults).then(({ data }) => setUser({ ...user, ...data }))
                  }
                  sx={{ marginBottom: 2 }}
                  variant='outlined'
                >
                  {!user.active ? 'Active' : 'Deactivate'}
                </Button>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>

          <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 5 }}>
            <Grid item xs={0.7}>
              <p>Username</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user.username}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Name</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user.name}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Mail</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user.mail}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Company</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{companies.find((c) => c.id === user.companyId)?.name}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Role</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user.role}</strong>
              </p>
            </Grid>
            <Grid item xs={0.7}>
              <p>Active</p>
            </Grid>
            <Grid item xs={1.5}>
              <p>
                <strong>{user.active ? 'Yes' : 'No'}</strong>
              </p>
            </Grid>
            <Grid item xs={3}>
              <img style={{ height: 300, position: 'absolute', top: 300, right: 150 }} src={user.profileImage} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
