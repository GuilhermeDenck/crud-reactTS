import styled from 'styled-components';

export const SideBar = styled.header`
  width: 15%;
  background-color: #363740;
`;

export const UlNav = styled.ul`
    padding: 0;
    margin: 0;

  a {
    width: 90%;
    height: 60px;
    color: #DDE2FF;

    display: flex;
    align-items: center;

    padding-left: 20px;

    text-decoration: none;
  }

  a:hover {
    background-color: #9fa2b436 ;
    border-left: 3px solid  #DDE2FF;
  }

  button {
    width: 240px;
    height: 50px;
    background: #3751FF;
    color: white;

    margin-top: 20px;
    margin-left: 10px;

    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    border-radius: 8px;
    border: none;
    outline: none;
  }

  button:hover {
    cursor: pointer;
    background: #2538b1;
  }
`;

export const LogoA = styled.a`
  cursor: pointer;
`;