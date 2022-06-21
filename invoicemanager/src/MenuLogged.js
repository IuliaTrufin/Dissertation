import * as React from 'react';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Routes, Route, BrowserRouter, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

export default function AccountMenuLogged({ setUser, myUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Grid container style={{ marginTop: 20 }} spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 3, md: 6, lg: 8 }}>
        <Grid item xs={0.3}>
          <img
            style={{ height: 40, marginTop: -10, marginLeft: 10 }}
            src='https://upload.wikimedia.org/wikipedia/commons/d/d5/Icon_Transparent_Blue.png'
          />
        </Grid>
        <Grid item xs={0.5}>
          <Link style={{ color: 'black' }} to='home' underline='hover'>
            Home
          </Link>
        </Grid>
        {myUser?.role === 'SuperAdmin' ? (
          <Grid item xs={0.6}>
            <Link sx={{ color: 'black' }} to='news' underline='hover'>
              News
            </Link>
          </Grid>
        ) : (
          <></>
        )}
        <Grid item xs={0.6}>
          <Link to='users' sx={{ color: 'black' }} underline='hover'>
            Users
          </Link>
        </Grid>
        <Grid item xs={0.8}>
          <Link sx={{ color: 'black' }} to='companies' underline='hover'>
            Companies
          </Link>
        </Grid>
        <Grid item xs={0.7}>
          <Link sx={{ color: 'black' }} to='products' underline='hover'>
            Products
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link sx={{ color: 'black' }} to='invoices' underline='hover'>
            Invoices
          </Link>
        </Grid>
        <Grid item xs={1}>
          <Link sx={{ color: 'black' }} to='myprofile' underline='hover'>
            My Profile
          </Link>
        </Grid>
        <Grid item xs={1}>
          <Link onClick={() => setUser(null)} sx={{ color: 'black' }} to='home' underline='hover'>
            Sign Out
          </Link>
        </Grid>
      </Grid>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> */}
      {/* <Link sx={{ minWidth: 100, marginTop: 3, marginLeft: 2 }} href='#' underline='hover'>
          Home
        </Link> */}
      {/* <Link sx={{ minWidth: 100, marginTop: 3, marginLeft: 2 }} href='#' underline='hover'>
          Mails
        </Link> */}
      {/* <Link sx={{ minWidth: 100, marginTop: 3, marginLeft: 2 }} href='#' underline='hover'>
          Users
        </Link>
        <Link sx={{ minWidth: 100, marginTop: 3, marginLeft: 2 }} href='#' underline='hover'>
          Companies
        </Link> */}
      {/* <Link sx={{ minWidth: 100, marginTop: 3, marginLeft: 2 }} href='#' underline='hover'>
          Products
        </Link>
        <Link sx={{ minWidth: 100, marginTop: 3, marginLeft: 2 }} href='#' underline='hover'>
          Invoices
        </Link> */}
      {/* <Link sx={{ minWidth: 100, marginTop: 3, marginLeft: 88 }} href='#' underline='hover'>
          Log out
        </Link>
      </Box> */}
    </React.Fragment>
  );
}
