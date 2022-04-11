
import { ButtonArea } from './Button.styles'

interface ButtonUpdateProps {
  onClick: () => void,
  img: any,
  color: string,
  text: string,
}

const ButtonUpdate: React.FC<ButtonUpdateProps> = ({ onClick, img, color, text }) => {
  return (
    <ButtonArea color={color}>
      <img src={img} alt={text} onClick={onClick} width={25} height={25} />
    </ButtonArea>
  )
}

export default ButtonUpdate;