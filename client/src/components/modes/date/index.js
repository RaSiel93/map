// import styled from 'styled-components';

const DateMode = ({ date, setDate }) => {
  const onChange = (event) => {
    const date = event.target.value

    setDate(date)
    localStorage.setItem('date', date)
  }

  return <input
    type="number"
    style={{ backgroundColor: '#000a', zIndex: 10, color: '#fff', fontSize: '20px', width: '58px' }}
    value={date}
    onChange={onChange}
  />
}

export default DateMode
