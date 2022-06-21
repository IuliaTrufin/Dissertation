import './index.css';
import { useEffect, useState } from 'react';
import AccountMenuIntro from './MenuIntro';
import AccountMenuLogged from './MenuLogged';
import MultiAxisLine from './HomeLogged';
import Home from './Home';
import SignIn from './SignIn';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import InvoiceProfile from './InvoiceProfile';
import UsersDataGrid from './Users';
import UserDetails from './UserDetails';
import UserEditDetails from './UserEdit';
import UserAddDetails from './UserAdd';
import CompaniesDataGrid from './Companies';
import CompanyDetails from './CompanyDetails';
import CompanyEditDetails from './CompanyEdit';
import CompanyAddDetails from './CompanyAdd';
import ProductsDataGrid from './Products';
import ProductDetails from './ProductDetails';
import ProductEditDetails from './ProductEdit';
import ProductAddDetails from './ProductAdd';
import InvoicesDataGrid from './Invoices';
import InvoiceDetails from './InvoiceDetails';
import InvoiceEditDetails from './InvoiceEdit';
import InvoiceAddDetails from './InvoiceAdd';
import ProfileDetails from './Profile';
import axios from 'axios';
import { axiosDefaults } from './axios';
import NewsDataGrid from './News';

function App() {
  const [myUser, setMyUser] = useState(null);
  const handleUserLoggin = () => {
    if (myUser) {
      setMyUser(null);
    } else {
      setMyUser({ username: 'admin', userId: 1 });
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/Users', axiosDefaults).then((request) => setUsers(request.data));
  }, []);

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleSignin = (user) => {
    setMyUser(user);
    routeChange('/home');
    // Do navigsation to homepage
  };

  const handleSignout = (user) => {
    setMyUser(null);
    routeChange('/home');
    // Do navigsation to homepage
  };

  const updateMyUser = (user) => {
    if (user.id === myUser.id) setMyUser(user);
  };

  // fetch('https://localhost:44483/user').then((response) => console.log(response.json()));
  return (
    <>
      {/* <p>{users.map((x) => x.id).join(',')}</p>
      <button onClick={() => axios.get('/Users', axiosDefaults).then((request) => setUsers(request.data))}></button> */}
      {!!myUser ? <AccountMenuLogged setUser={setMyUser} myUser={myUser} /> : <AccountMenuIntro />}
      {/* <AccountMenu user={user} handleUserLoggin={handleUserLoggin} /> */}
      {/* <AccountMenu /> */}
      <Routes>
        <Route element={<Home myUser={myUser} />} path='/home' />
        <Route element={<Home myUser={myUser} />} exact path='/' />
        <Route element={<UsersDataGrid myUser={myUser} />} path='users' />
        <Route element={<UserDetails myUser={myUser} />} path='user/:id' />
        <Route element={<UserEditDetails myUser={myUser} updateMyUser={updateMyUser} />} path='user/:id/edit' />
        <Route element={<UserAddDetails myUser={myUser} />} path='user/add' />
        <Route element={<CompaniesDataGrid myUser={myUser} />} path='companies' />
        <Route element={<CompanyDetails myUser={myUser} />} path='company/:id' />
        <Route element={<CompanyEditDetails myUser={myUser} />} path='company/:id/edit' />
        <Route element={<CompanyAddDetails myUser={myUser} />} path='company/add' />
        <Route element={<ProductsDataGrid myUser={myUser} />} path='products' />
        <Route element={<ProductDetails myUser={myUser} />} path='product/:id' />
        <Route element={<ProductEditDetails myUser={myUser} />} path='product/:id/edit' />
        <Route element={<ProductAddDetails myUser={myUser} />} path='product/add' />
        <Route element={<InvoicesDataGrid myUser={myUser} />} path='invoices' />
        <Route element={<InvoiceDetails myUser={myUser} />} path='invoice/:id' />
        <Route element={<InvoiceEditDetails myUser={myUser} />} path='invoice/:id/edit' />
        <Route element={<InvoiceAddDetails myUser={myUser} />} path='invoice/add' />
        <Route element={<ProfileDetails myUser={myUser} />} path='myprofile' />
        <Route element={<NewsDataGrid myUser={myUser} />} path='news' />
        <Route element={<SignIn handleSignin={handleSignin} />} path='signin' />
        <Route exact element={<InvoiceProfile user={myUser} />} path='/invoice/:id' />
      </Routes>
    </>
  );
}

export default App;
