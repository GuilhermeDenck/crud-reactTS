import styled from 'styled-components';

export const FormAddress = styled.form`
  width: 93%;
  
  margin-left: 2.5%;
  margin-top: 20px;

  border-radius: 8px;
  border: 1px solid #DFE0EB;
  box-sizing: border-box;
`;

export const GridInputsAddress = styled.div`
  display: grid;
  justify-content: center;
  margin-left: 2.5%;
  margin-top: 2%;
  margin-bottom: 2.5%;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(2, 50%);
`;

export const TableAddress = styled.div`
  display: grid;
  grid-template-columns: 25% repeat(6, 10%) repeat(2, 10%);
  
  span {
    opacity: 0.5;
    margin-bottom: 5px;
  }
`;

export const ListAddressDiv = styled.div`
  display: grid;
  grid-template-columns: 25% repeat(8, 10%) repeat(2, 10%);
  border-top: 1px #DFE0EB solid;
`;

export const SelectAddress = styled.select`
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

export const ButtonRegister = styled.button`
  width: 45%;
  height: 40px;
  background: #3751FF;
  color: white;

  margin-left: 27.5%;
  margin-bottom: 2.5%;

  box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
  border-radius: 8px;
  border: none;
  outline: none;

  :hover {
    cursor: pointer;
    background: #2538b1;
  }
`;