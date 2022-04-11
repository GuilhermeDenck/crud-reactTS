import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #EEE;
`;

export const Card = styled.button`
  width: 600px;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;

  h2 {
    font-size: 80px;
    text-align: center;
  }
`;

export const CardTitle = styled.h1`
  color: #333;
  font-size: 30px;
  text-align: center;
`;