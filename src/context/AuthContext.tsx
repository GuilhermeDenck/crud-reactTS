import Notiflix from "notiflix";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { useNavigate } from "react-router-dom";
import { FC, createContext, useEffect, useState, ReactNode } from 'react';

import api from '../service/api'
import { LoginDTO } from '../model/LoginDTO';

export const AuthContext = createContext({});

const AuthProvider: FC<ReactNode> = ({children }) => {

  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken ] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (user: LoginDTO) => {
    Loading.circle();
    try {
      const {data} = await api.post('/auth', user);
      localStorage.setItem('token', data);
      api.defaults.headers.common['Authorization'] = data;
      setLoading(false);
      setHasToken(true);
      navigate('/');
    } catch (error) {
      Notiflix.Notify.failure('Ocorreu um erro ao tentar logar');
      console.log(error);
    } finally {
      Loading.remove();
    }
  }

  const handleLogout = () => {
    Loading.circle();
    localStorage.removeItem('token');
    setHasToken(false);
    navigate('/login');
    Loading.remove();
  }

  const isLogged = () => {
    const hasToken = localStorage.getItem('token');
    if(!hasToken) {
      navigate('/login');
    } else {
      setHasToken(true);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      api.defaults.headers.common['Authorization'] = token;
      setHasToken(true);
    }

    isLogged();
    console.log(api.defaults.headers.common['Authorization']);
  },[]);

  return (
    <AuthContext.Provider value={{handleLogin, handleLogout, loading, error, hasToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;