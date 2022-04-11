import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom"
import { UlNav } from './Header.styles'

const Menu = () => {

  const {handleLogout} = useContext<any>(AuthContext);

  return (
    <nav>
      <UlNav>
        <Link to={'/'}>Home</Link>
        <Link to={'/users'}>Users</Link>
        <Link to={'/address'}>Address</Link>
        <button onClick={handleLogout}> Logout </button>
      </UlNav>
    </nav>
  )
}
export default Menu