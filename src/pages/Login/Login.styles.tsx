import styled from 'styled-components';

export const ContainerLogin = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #363740;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleForm = styled.h1`
  font-size: 24px;
  color: #252733;
`;

export const DivForm = styled.div`
  width: 480px;
  height: 650px;
  background-color: white;

  border-radius: 8px;
  border: 1px solid #DFE0EB;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    color: #9FA2B4;
    font-size: 14px;
  }
`;

export const LogoForm = styled.img`
  width: 100px;
  height: 100px;
`;

export const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  position: relative;

  img {
    position: absolute;
    left: 90%;
    top: 45%;
    z-index: 1;
    cursor: pointer;
  }
`;

export const InputLogin = styled.input`
  width: 400px;
  height: 50px;
  background: #FCFDFE;

  padding: 10px;

  border: none;
  outline: none;
  border: 1px solid #F0F1F7;
  box-sizing: border-box;
  border-radius: 8px;
`;

export const ButtonLogin = styled.button`
  width: 400px;
  height: 50px;
  background: #3751FF;
  color: white;

  margin-top: 20px;

  box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
  border-radius: 8px;
  border: none;
  outline: none;

  :hover {
    cursor: pointer;
    background: #2538b1;
  }
`;

export const DivSignUp = styled.div`
  margin-top: 20px;
  margin-left: 25%;

  span {
    color: #3751FF;
  }
`;