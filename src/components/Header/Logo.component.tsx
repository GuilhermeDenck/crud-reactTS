import Globo from '../../images/globo.png'
import { useNavigate } from 'react-router-dom'
import { LogoA } from './Header.styles';

const Logo = () => {

  const navigate = useNavigate()

  return (
   <LogoA onClick={ () => navigate('/') }> <img src={Globo} alt="Logotipo vemser" width={290} height={220} /> </LogoA>
  )
}
export default Logo