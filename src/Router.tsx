import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider, PersonProvider, AddressProvider } from './context'
import { Header } from './components';

import { Home, Login, Users, Address } from './pages';

import './index.css';
const Routers = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PersonProvider>
          <AddressProvider>
            <div className='main'>
              <Header/>
                <Routes>
                  <Route path='/' element={ <Home /> }/>
                  <Route path='/login' element={ <Login /> }/>
                  <Route path='/users' element={ <Users /> }/>
                  <Route path='/address' element={ <Address /> } /> 
                  
                  <Route path='*' element={ <Home /> }/>
                </Routes>
            </div>
          </AddressProvider>
        </PersonProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers;
