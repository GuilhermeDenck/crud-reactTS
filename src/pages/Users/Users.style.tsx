import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const ContainerPage = styled.div`
  background-color: #F7F8FC;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 85%;
`;




export const FormUser = styled.form` 
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;

  border-radius: 8px;
  border: 1px solid #DFE0EB;
  box-sizing: border-box;
`;

export const GridInputs = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-left: 5%;
  grid-template-columns: repeat(2, 50%);
`;

export const DivInput = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const InputForm = styled.input`
  width: 300px;
  height: 40px;
  background: #FCFDFE;

  padding: 10px;

  border: none;
  outline: none;
  border: 1px solid #F0F1F7;
  box-sizing: border-box;
  border-radius: 8px;
`;

export const ButtonSend = styled.button`
  width: 90%;
  height: 40px;
  background: #3751FF;
  color: white;

  margin-left: 5%;
  margin-top: 20px;
  margin-bottom: 20px;

  box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
  border-radius: 8px;
  border: none;
  outline: none;

  :hover {
    cursor: pointer;
    background: #2538b1;
  }
`;


export const TablePersons = styled.div`
  display: grid;
  grid-template-columns: 25% repeat(3, 20%) repeat(2, 8%);
  
  span {
    opacity: 0.5;
    margin-bottom: 5px;
  }
`;

export const ListPersons = styled.div`
  display: grid;
  grid-template-columns: 25% repeat(3, 20%) repeat(2, 8%);
  border-top: 1px #DFE0EB solid;
`;

export const ContainerList = styled.div`
  display: flex;
  width: 92%;
  margin-left: 30px;
  margin-bottom: 30px;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
`;