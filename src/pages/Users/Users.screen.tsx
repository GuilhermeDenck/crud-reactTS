import * as Yup from "yup";
import moment from "moment";
import Notiflix from "notiflix";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { useEffect, useContext, useState } from "react";

import api from '../../service/api';
import { UserDTO } from "../../model/PersonDTO";

import { PersonContext } from "../../context/PersonContext";

import { ButtonOptions, ScreenWarning } from '../../components';

import { TitlePage, LabelForm, DivError } from '../../global.style'
import { ContainerPage, TablePersons, ContainerList, FormUser, GridInputs, DivInput, InputForm, ButtonSend, ListPersons } from './Users.style';

import Error from '../../images/error.gif';
import Loader from '../../images/loader.gif'
import BtnUpdate from '../../images/btnUpdate.svg';
import BtnDelete from '../../images/btnDelete.svg';
const Users = () => {

  const { getPersons, persons, deletePerson, errorPerson, loadingPerson } = useContext<any>(PersonContext);
  const hasToken = localStorage.getItem("token");

  const [ update, setUpdate ] = useState(false);
  const [ id, setId ] = useState<number>(0);

  useEffect( () => {
    if (hasToken) {
      api.defaults.headers.common["Authorization"] = hasToken;
    }
    getPersons();
  },[]);

  const createNewPerson = async (values: UserDTO) => {
    Loading.circle();
    const cpf = values.cpf.replace(/\D/g, '');
    const birthDate = moment(values.dataNascimento, "DD/MM/YYYY").format("YYYY-MM-DD");
    
    const PersonObj = {
      nome: values.nome,
      email: values.email,
      cpf: cpf,
      dataNascimento: birthDate,
    }

    try {
      const {data} = await api.post('/pessoa', PersonObj);
      Notiflix.Notify.success("Usuário adicionado com sucesso!");
    } catch (error) {
      Notiflix.Notify.failure(
        "Ocorreu um erro ao adicionar o usuário tente novamente!"
      );
      console.log(error);
    } finally {
      formikProps.resetForm();
      getPersons();
      Loading.remove();
    }
  }

  const maskCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const alterPerson = async (id: number, formikProps: any) => {
    Loading.circle();
    try {
      const { data } = await api.get(`/pessoa/{idPessoa}?idPessoa=${id}`);
      setId(id);
      setUpdate(true);
      formikProps.setFieldValue('nome', data.nome);
      formikProps.setFieldValue('email', data.email);
      formikProps.setFieldValue('cpf', maskCPF(data.cpf));
      formikProps.setFieldValue('dataNascimento', moment(data.dataNascimento).format("DD/MM/YYYY"));
    } catch (error) {
      console.log(error);
    } finally {
      Loading.remove();
    }
  }

  const updatePerson = async (values: UserDTO) => {
    Loading.circle();
    const cpf = values.cpf.replace(/\D/g, '');
    const birthDate = moment(values.dataNascimento, "DD/MM/YYYY").format("YYYY-MM-DD");
    
    const PersonObj = {
      idPessoa: id,
      nome: values.nome,
      email: values.email,
      cpf: cpf,
      dataNascimento: birthDate,
    }

    try {
      const {data} = await api.put(`/pessoa/${id}`, PersonObj);

      Notiflix.Notify.success("Usuário alterado com sucesso!");
    } catch (error) {
      Notiflix.Notify.failure(
        "Ocorreu um erro ao alterar o usuário tente novamente!"
      );
      console.log(error);
    } finally {
      formikProps.resetForm();
      getPersons();
      setUpdate(false);
      Loading.remove();
    }
  }

  const msgRequired = 'Você precisa preencher esse campo';
  const formikProps = useFormik({
    initialValues: {
      nome: "",
      email: "",
      cpf: "",
      dataNascimento: ""
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .min(2, "muito curto")
        .max(50, "muito extenso")
        .required(msgRequired),
      email: Yup.string()
        .email("Este campo precisa ser um email.")
        .required(msgRequired),
      cpf: Yup.string().required(msgRequired),
      dataNascimento: Yup.string().required(msgRequired),
    }),
    onSubmit: values => {
      if(update) {
        updatePerson(values);
      } else {
        createNewPerson(values);  
      } 
    },
  });
    
  if(loadingPerson) return ( <ScreenWarning img={Loader} alt={'Carregando'}/> )
  if(errorPerson ) return ( <ScreenWarning img={Error} alt={'Error'}/> )
  return (
    <ContainerPage>
      <FormUser onSubmit={formikProps.handleSubmit}>
        <GridInputs>
          <DivInput>
            <LabelForm>Nome</LabelForm>
            <InputForm id="nome" name="nome" placeholder="Digite seu nome" value={formikProps.values.nome} onChange={formikProps.handleChange} />
            {formikProps.errors.nome && formikProps.touched.nome ? ( <DivError>{formikProps.errors.nome}</DivError> ) : null}
          </DivInput>

          <DivInput>
            <LabelForm>E-mail</LabelForm>
            <InputForm id="email" name="email" placeholder="Digite seu E-mail" value={formikProps.values.email} onChange={formikProps.handleChange} />
            {formikProps.errors.email && formikProps.touched.email ? ( <DivError>{formikProps.errors.email}</DivError> ) : null}
          </DivInput>

          <DivInput>
            <LabelForm>CPF</LabelForm>
            <InputForm id="cpf" name="cpf" as={InputMask} mask="999.999.999-99" placeholder="Digite seu Cpf" value={formikProps.values.cpf} onChange={formikProps.handleChange} />
            {formikProps.errors.cpf && formikProps.touched.cpf ? ( <DivError>{formikProps.errors.cpf}</DivError> ) : null}
          </DivInput>

          <DivInput>
            <LabelForm>Data de Nascimento</LabelForm>
            <InputForm id="dataNascimento" as={InputMask} mask="99/99/9999" name="dataNascimento" placeholder="Digite seu Data de Nascimento" value={formikProps.values.dataNascimento} onChange={formikProps.handleChange} />
            {formikProps.errors.dataNascimento && formikProps.touched.dataNascimento ? ( <DivError>{formikProps.errors.dataNascimento}</DivError> ) : null}
          </DivInput>
        </GridInputs>
        <ButtonSend type="submit"> { update ? 'Alterar Pessoa' : 'Cadastrar Pessoa' }  </ButtonSend>
      </FormUser>
      <TitlePage> Persons </TitlePage>
      <ContainerList>
        <TablePersons>
          <span>Nome</span>
          <span>Aniverásario</span>
          <span>Cpf</span>
          <span>E-mail</span>
          <span> Atualizar </span>
          <span> Deletar </span>
        </TablePersons>
        {
          persons.map( (p: any) => (
            <ListPersons key={p.idPessoa}>
                <p> {p.nome} </p>
                <p> {moment(p.dataNascimento).format('DD/MM/YYYY')} </p>
                <p> {maskCPF(p.cpf)} </p>
                <p> {p.email} </p>
                <ButtonOptions onClick={ () => alterPerson(p.idPessoa, formikProps) } color={'#FEC400'} img={BtnUpdate} text={'botão para alterar'} />
                <ButtonOptions onClick={ () => deletePerson(p.idPessoa) } color={'#F12B2C'} img={BtnDelete} text={'botão para deletar'}/>
            </ListPersons>
          ) )
      }
      </ContainerList>
    </ContainerPage>
  )
}

export default Users;