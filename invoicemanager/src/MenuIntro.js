import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

export default function AccountMenuIntro({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Grid container style={{ marginTop: 20 }} spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 3, md: 3, lg: 8 }}>
        <Grid item xs={0.5}>
          <img
            style={{ height: 40, marginTop: -10, marginLeft: 50 }}
            src='https://upload.wikimedia.org/wikipedia/commons/d/d5/Icon_Transparent_Blue.png'
          />
        </Grid>
        <Grid item xs={6}>
          <Link onClick={() => navigate('/home')} style={{ color: 'black' }} underline='hover'>
            Home
          </Link>
        </Grid>
        {/* {!!user && (
          <Grid item xs={2}>
            <Link to={'/coolstuff'}>Show omn login</Link>
          </Grid>
        )} */}
        {/* {!user && ( */}
        <Grid item xs={0.5} sx={{ justifyContent: 'flex-end' }}>
          <Link onClick={() => navigate('/signin')} style={{ color: 'black' }} underline='hover'>
            {!!user ? `${user.username} Profile` : 'Sign In'}
          </Link>
        </Grid>
        {/* )} */}
        {/* {!!user && (
          <Grid item xs={1} sx={{ justifyContent: 'flex-end' }}>
            <Link onClick={handleUserLoggin} style={{ color: 'black' }} href='#' underline='hover'>
              Profile
            </Link>
          </Grid>
        )} */}
      </Grid>
    </React.Fragment>
  );
}
