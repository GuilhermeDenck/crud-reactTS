import * as Yup from "yup";
import InputMask from "react-input-mask";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Notiflix from "notiflix";
import { useFormik, FormikHelpers } from 'formik';
import { useEffect, useContext, useState } from 'react';

import api from '../../service/api';
import { CepDTO } from '../../model/CepDTO';

import { AddressContext } from '../../context/AddressContext';

import { ButtonOptions, ScreenWarning } from '../../components';

import { TitlePage, LabelForm, DivError } from '../../global.style';
import { ContainerPage, ContainerList, DivInput, InputForm } from '../Users/Users.style';
import { TableAddress, FormAddress, GridInputsAddress, ButtonRegister, SelectAddress, ListAddressDiv } from './Address.style';

import Error from '../../images/error.gif';
import Loader from '../../images/loader.gif'
import BtnUpdate from '../../images/btnUpdate.svg';
import BtnDelete from '../../images/btnDelete.svg';
const Address = () => {

  const { address, getAllAddress, getAddress, deleteAddress, errorAddress, loadingAddress } = useContext<any>(AddressContext);

  const [ update, setUpdate ] = useState(false);
  const [ id, setId ] = useState<number>(0);

  const hasToken = localStorage.getItem("token");
  useEffect( () => {
    if (hasToken) {
      api.defaults.headers.common["Authorization"] = hasToken;
    }
    getAllAddress();
  },[]);

  const maskCep = (cep:string) => {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  
  const sendAddress = async (values: CepDTO ) => {    
    Loading.circle();
    try {
      const { cep, logradouro, complemento, localidade, uf, tipo, numero, pais } = values;

      const newAddress = {
        cep: cep.replace(/-/g, ''),
        cidade: localidade,
        complemento: complemento,
        estado: uf,
        logradouro: logradouro,
        numero: parseInt(numero),
        pais: pais,
        tipo: tipo
      }

      const { data } = await api.post(`/endereco/${648}`, newAddress);
      Notiflix.Notify.success('Endereço cadastrado com sucesso!');
    } catch (error) {
      Notiflix.Notify.failure('Ocorreu um erro ao cadastrar este endereço!');
      console.log(error);
    } finally {
      formikProps.resetForm();
      formikProps.setFieldValue('localidade', 'RESIDENCIAL');
      getAllAddress();
      Loading.remove();
    }
  }

  const alterAddress = async (idAddress: number) => {
    Loading.circle();
    try {
      const { data } = await api.get(`/endereco/${idAddress}`);
      setId(idAddress);
      setUpdate(true);     
      
      formikProps.setFieldValue('cep', data.cep);
      formikProps.setFieldValue('logradouro', data.logradouro);
      formikProps.setFieldValue('localidade', data.cidade);
      formikProps.setFieldValue('uf', data.estado);
      formikProps.setFieldValue('tipo', data.tipo);
      formikProps.setFieldValue('numero', data.numero);
      formikProps.setFieldValue('pais', data.pais);
    } catch (error) {
      console.log(error);
    } finally {
      Loading.remove();
    }
  }

  const updateAddress = async (values: CepDTO) => {
    Loading.circle();
    try {
      const newAddress = {
        idEndereco: id,
        cep: values.cep.replace(/-/g, ''),
        logradouro: values.logradouro,
        cidade: values.localidade,
        estado: values.uf,
        numero: parseInt(values.numero),
        pais: values.pais,
        tipo: values.tipo
      }
      
      const { data } = await api.put(`/endereco/${id}`, newAddress);
      Notiflix.Notify.success('Endereço cadastrado com sucesso!');
    } catch (error) {
      Notiflix.Notify.failure('Ocorreu um erro ao cadastrar este endereço!');
      console.log(error);
    } finally {
      formikProps.resetForm();
      formikProps.setFieldValue('localidade', 'RESIDENCIAL');
      getAllAddress();
      setUpdate(false);
      Loading.remove();
    }
  }

  const msgRequired = 'Você precisa preencher esse campo';
  const formikProps = useFormik({
    initialValues: {
      cep: '',
      logradouro: '',
      complemento: '',
      localidade: '',
      uf: '',

      tipo: 'RESIDENCIAL',
      numero: '',
      pais: ''
    },
    validationSchema: Yup.object({
      cep: Yup.string().required(msgRequired),
      logradouro: Yup.string()
        .min(2, "logradouro muito curto")
        .max(50, "logradouro muito extensa")
        .required(msgRequired),
      complemento: Yup.string()
        .min(3, "Complemento precisa conter alguma coisa mais especifica.")
        .max(50, "Complemento muito extenso"),
      bairro: Yup.string()
        .min(3, "Nome do bairro muito curto")
        .max(50, "Nome do bairro muito extenso")
        .required(msgRequired),
      localidade: Yup.string()
        .min(3, "Nome da cidade muito curta.")
        .max(50, "Nome da cidade muito extensa.")
        .required(msgRequired),
      uf: Yup.string()
        .min(2, "UF precisa conter duas letras. Ex: RS")
        .max(2, "UF precisa conter duas letras. Ex: RS")
        .required(msgRequired),
      numero: Yup.number()
        .max(9999,"Número muito grande")
        .positive("O campo deve ser positivo.")
        .integer("O campo deve ser um número inteiro.")
        .typeError('O campo precisar ser um número')
        .required(msgRequired),
      pais: Yup.string()
        .max(25, 'O país não pode ter mais do que 25 caracteres')
        .required(msgRequired),
        }),
    onSubmit: (values:CepDTO, { setSubmitting }: FormikHelpers<CepDTO>) => {
      setSubmitting(false);
      if(update) {
        updateAddress(values);
      } else {
        sendAddress(values);
      }      
    },
  });

  if(loadingAddress) return ( <ScreenWarning img={Loader} alt={'Carregando'}/> )
  if(errorAddress ) return ( <ScreenWarning img={Error} alt={'Error'}/> )
  return (
      <ContainerPage>
        <FormAddress onSubmit={formikProps.handleSubmit}>
          <GridInputsAddress>
            <DivInput>
              <LabelForm>CEP</LabelForm>
              <InputForm id="cep" as={InputMask} mask="99999-999" name="cep" placeholder="Digite seu CEP" value={formikProps.values.cep} onChange={formikProps.handleChange} onBlur={ () => getAddress(formikProps.values.cep, formikProps) } />
              {formikProps.errors.cep && formikProps.touched.cep ? ( <DivError>{formikProps.errors.cep}</DivError> ) : null}
            </DivInput>

            <DivInput>
              <LabelForm>Logradouro</LabelForm>
              <InputForm id="logradouro" name="logradouro" placeholder="Digite seu Logradouro" value={formikProps.values.logradouro} onChange={formikProps.handleChange} />
              {formikProps.errors.logradouro && formikProps.touched.logradouro ? ( <DivError>{formikProps.errors.logradouro}</DivError> ) : null}
            </DivInput>

            <DivInput>
              <LabelForm>Complemento</LabelForm>
              <InputForm id="complemento" name="complemento" placeholder="Digite seu Complemento" value={formikProps.values.complemento} onChange={formikProps.handleChange} />
              {formikProps.errors.complemento && formikProps.touched.complemento ? ( <DivError>{formikProps.errors.complemento}</DivError> ) : null}
            </DivInput>

            <DivInput>
              <LabelForm>Localidade</LabelForm>
              <InputForm id="localidade" name="localidade" placeholder="Digite sua Localidade" value={formikProps.values.localidade} onChange={formikProps.handleChange} />
              {formikProps.errors.localidade && formikProps.touched.localidade ? ( <DivError>{formikProps.errors.localidade}</DivError> ) : null}
            </DivInput>

            <DivInput>
              <LabelForm>UF</LabelForm>
              <InputForm id="uf" name="uf" placeholder="Digite seu UF" value={formikProps.values.uf} onChange={formikProps.handleChange} />
              {formikProps.errors.uf && formikProps.touched.uf ? ( <DivError>{formikProps.errors.uf}</DivError> ) : null}
            </DivInput>

            <DivInput>
              <LabelForm>Tipo</LabelForm>
              <SelectAddress id="tipo" name="tipo" placeholder="Digite seu Tipo" value={formikProps.values.tipo} onChange={formikProps.handleChange} >
                  <option value="RESIDENCIAL">Residencial</option>
                  <option value="COMERCIAL">Comercial</option>
              </SelectAddress>
            </DivInput>

            <DivInput>
              <LabelForm>Número</LabelForm>
              <InputForm id="numero" name="numero" placeholder="Digite seu Número" value={formikProps.values.numero} onChange={formikProps.handleChange} />
              {formikProps.errors.numero && formikProps.touched.numero ? ( <DivError>{formikProps.errors.numero}</DivError> ) : null}
            </DivInput>

            <DivInput>
              <LabelForm>Pais</LabelForm>
              <InputForm id="pais" name="pais" placeholder="Digite seu País" value={formikProps.values.pais} onChange={formikProps.handleChange} />
              {formikProps.errors.pais && formikProps.touched.pais ? ( <DivError>{formikProps.errors.pais}</DivError> ) : null}
            </DivInput>

          </GridInputsAddress>
          <ButtonRegister type="submit"> { update ? 'Atualizar Endereço' : 'Registrar Endereço' }  </ButtonRegister>
        </FormAddress>
        <TitlePage> Address </TitlePage>
        <ContainerList>
          <TableAddress>
            <span>Logradouro</span>
            <span>Número</span>
            <span>Tipo</span>
            <span>CEP</span>
            <span>Cidade</span>
            <span>Estado</span>
            <span>Pais</span>
            <span> Atualizar </span>
            <span> Deletar </span>
          </TableAddress>
          {
            address.map( (a:any) => (
              <ListAddressDiv key={a.idEndereco}>
                <p> {a.logradouro} </p>
                <p> {a.numero} </p>
                <p> {a.tipo} </p>
                <p> {maskCep(a.cep)} </p>
                <p> {a.cidade} </p>
                <p> {a.estado} </p>
                <p> {a.pais} </p>
                <ButtonOptions onClick={ () => alterAddress(a.idEndereco) } color={'#FEC400'} img={BtnUpdate} text={'botão para alterar'} />
                <ButtonOptions onClick={ () => deleteAddress(a.idEndereco) } color={'#F12B2C'} img={BtnDelete} text={'botão para deletar'} />
              </ListAddressDiv>
            ))
          }
        </ContainerList>
    </ContainerPage>
  )
}

export default Address