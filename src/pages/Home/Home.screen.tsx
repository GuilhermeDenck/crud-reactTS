import CountUp from 'react-countup';
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import api from "../../service/api";

import { AddressContext } from '../../context/AddressContext';
import { PersonContext } from "../../context/PersonContext";

import { ScreenWarning } from "../../components";

import { Card, Container, CardTitle } from "./Home.styles";

import Error from '../../images/error.gif';
import Loader from '../../images/loader.gif';
const Home = () => {

  const navigate = useNavigate();

  const { getAllAddress, address, errorAddress, loadingAddress } = useContext<any>(AddressContext);
  const { getPersons, persons, errorPerson, loadingPerson } = useContext<any>(PersonContext);

  const hasToken = localStorage.getItem('token');
  useEffect(() => {
    if (hasToken) {
      api.defaults.headers.common["Authorization"] = hasToken;
    }

    getAllAddress();
    getPersons();
  }, []);

  if(loadingAddress || loadingPerson) return ( <ScreenWarning img={Loader} alt={'Carregando'}/> )
  if(errorAddress || errorPerson ) return ( <ScreenWarning img={Error} alt={'Error'}/> )
  return (    
    <Container>
      <Card onClick={ () => navigate('/users') }>
        <CardTitle> Total de Pessoas Registradas </CardTitle>
        <h2><CountUp end={persons.length} duration={0.5}/></h2>
      </Card>
      <Card onClick={ () => navigate('/address') } >
        <CardTitle> Total de Endereços Registrados </CardTitle>
        <h2><CountUp end={address.length} duration={0.5} /></h2>
      </Card>
    </Container>
  )
}

export default Home