import styled from 'styled-components';
import { Button } from 'components/common/Button';

const ModeButton = styled(Button)`
  // right: 320px;
  // bottom: 20px;

  &:after {
    // font-size: 30px;
    content: '[-]';
  }
`;

const NavigateMode = (props) => {
  const { longitude, latitude, zoom } = props

  const onClick = () => {
    localStorage.setItem('longitude', longitude)
    localStorage.setItem('latitude', latitude)
    localStorage.setItem('zoom', zoom)
    alert('Пачатковы каардынаты абноўлены')
  }

  return <>
    <ModeButton onClick={onClick}/>
  </>
}

export default NavigateMode
