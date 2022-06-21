import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { FaFirstdraft, FaShoppingCart, FaWarehouse, FaUserAlt, FaMailBulk } from 'react-icons/fa';

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Container component='main'>
        <CssBaseline />

        <Box
          component='img'
          sx={{
            height: 300,
            width: 1150,
            marginTop: 5,
          }}
          src='https://i.pinimg.com/originals/4a/94/26/4a94268541d7a0ed95a8be5138e8a288.jpg'
        />
        <h1 style={{ position: 'absolute', color: 'white', top: '40%', left: '52%', transform: 'translate(-50%, -150%)' }}>
          BILL & STAMPED INC.
        </h1>
        <Card sx={{ marginTop: 5 }}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              <FaFirstdraft />
              Create your own invoices
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              The subcontractors say that after they completed all required work according to construction specifications, Tom would either
              outright refuse to pay their invoices or would only pay them one-third of the amount they had billed.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginTop: 5 }}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              <FaShoppingCart />
              Manage transacted products
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              As with many consumer products, it is increasingly expected of manufacturers that they design their products to minimize the
              probability of failure when consumers use those products in ways not intended by manufacturers.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginTop: 5 }}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              <FaWarehouse />
              Perform your own company's transactions
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Today's supply chain transaction times are much shorter and transaction amounts are much smaller. The transaction is expected
              to save $3 billion over the two years after the transaction is closed.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginTop: 5 }}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              <FaUserAlt />
              Register all your employees
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              The key factor of an open door policy is that employees should feel free to approach their boss about any issue that concerns
              them.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ marginTop: 5, marginBottom: 2 }}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              <FaMailBulk />
              Contact us today
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              You can reach out to us for more details about our project at billstamped@gmail.com.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
