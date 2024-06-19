import styled from 'styled-components'

export const NavigateMode = (props) => {
  const { longitude, latitude, zoom } = props

  const onClick = () => {
    localStorage.setItem('longitude', longitude)
    localStorage.setItem('latitude', latitude)
    localStorage.setItem('zoom', zoom)
    alert('Пачатковы каардынаты абноўлены')
  }

  return <>
    <div onClick={onClick}>Абнавіць пачатковыя каардынаты</div>
  </>
}
