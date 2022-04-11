import axios from 'axios';
import Notiflix from "notiflix";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { FC, createContext, useState, ReactNode } from 'react';

import { AddressDTO } from '../model/AddressDTO';
import { CepDTO } from '../model/CepDTO';
import api from '../service/api';

export const AddressContext = createContext({});

const AddressProvider: FC<ReactNode> = ({ children }) => {

  const [ address, setAddress ] = useState<AddressDTO['address']>([]);
  const [ loadingAddress, setLoading ] = useState(true);
  const [ errorAddress, setError ] = useState(false);

  const getAddress = async (values: CepDTO, formikProps: any) => {
    Loading.circle();
    try {
      const {data} = await axios.get(`https://viacep.com.br/ws/${values}/json/`);
      formikProps.setFieldValue('logradouro', data.logradouro);
      formikProps.setFieldValue('complemento', data.complemento);
      formikProps.setFieldValue('bairro', data.bairro);
      formikProps.setFieldValue('localidade', data.localidade);
      formikProps.setFieldValue('uf', data.uf);
    } catch (error) {
      console.log(error);
    } finally {
      Loading.remove();
    }
  }

  const getAllAddress = async () => {
    try {
      const {data} = await api.get('/endereco');
      setLoading(false);
      setAddress(data);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error)
    }
  }

  const deleteAddress = async (id: number) => {
    Notiflix.Confirm.show(
      'Alerta de Confirmação',
      'Tem certeza que deseja apagar este endereço?',
      'Sim',
      'Não',
      async function confirmButton() {
          Loading.circle();
          try {
              await api.delete(`/endereco/${id}`)
              Notiflix.Notify.success('Você excluiu esse endereço!');
            } catch (error) {
              Notiflix.Notify.failure('Ocorreu um erro ao excluir este endereço!');
              console.log(error)
            } finally {
              getAllAddress();
              Loading.remove();
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

  }

  return (
    <AddressContext.Provider value={{ getAddress, getAllAddress, deleteAddress, address,  errorAddress, loadingAddress }}>
      {children}
    </AddressContext.Provider>
  )
}

export default AddressProvider;