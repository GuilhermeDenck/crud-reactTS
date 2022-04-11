import Notiflix from "notiflix";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { FC, createContext, useState, useEffect, ReactNode } from 'react';

import api from '../service/api';
import { PersonDTO } from '../model/PersonDTO';

export const PersonContext = createContext({});

const PersonProvider: FC<ReactNode> = ({ children }) => {

  const [persons, setPersons] = useState<PersonDTO['persons']>([]);
  const [loadingPerson, setLoading] = useState(true);
  const [errorPerson, setError] = useState(false);

  const getPersons = async () => {
    try {
      const {data} = await api.get('/pessoa');
      setPersons(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  }

  const deletePerson = async (id: number) => {
        Notiflix.Confirm.show(
      'Alerta de Confirmação',
      'Tem certeza que deseja apagar este usuário?',
      'Sim',
      'Não',
      async function confirmButton() {
          Loading.circle();
          try {
            await api.delete(`/pessoa/${id}`)
            Notiflix.Notify.success('Você excluiu esse usuário!');
          } catch (error) {
            Notiflix.Notify.failure('Ocorreu um erro ao excluir este usuário!');
            console.log(error)
          } finally {
            Loading.remove();
            getPersons();
          }
      },
      function cancelButton() {
          Notiflix.Notify.warning('Operação cancelada');
      },
      {
        width: '420px',
        borderRadius: '10px',
      },
    );

    getPersons();
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      api.defaults.headers.common['Authorization'] = token;
    }
  },[])

  return (
    <PersonContext.Provider value={{getPersons, deletePerson, persons, errorPerson, loadingPerson}}>
      {children}
    </PersonContext.Provider>
  )
}

export default PersonProvider;