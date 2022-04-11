import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SideBar } from "./Header.styles";
import Logo from "./Logo.component";
import Menu from "./Menu.component";

const Header = () => {

  const {hasToken} = useContext<any>(AuthContext);

  return (
    <>
      {
        hasToken && (
          <SideBar>
            <Logo />
            <Menu />
          </SideBar>
        )
      }
    </>
    
  )
}

export default Header