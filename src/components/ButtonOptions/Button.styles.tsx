import styled from 'styled-components';

export const ButtonArea = styled.button<{ color: string }>`
  width: 40px;
  height: 40px;

  border-radius: 10px;

  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;

  border: none;
  background: ${props => props.color};
  outline: none;
  cursor: pointer;
`;