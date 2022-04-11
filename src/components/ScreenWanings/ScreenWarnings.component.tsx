import { DivWarning } from './ScreenWanings.styles'

interface ScreenWarningsProps {
  img: any,
  alt: string,
}

const ScreenWarning: React.FC<ScreenWarningsProps> = ({img, alt}) => {
  return (
    <DivWarning>
      <img src={img} alt={alt} />
    </DivWarning>
  );
}

export default ScreenWarning;