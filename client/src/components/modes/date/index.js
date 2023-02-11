import styled from 'styled-components';

const Container = styled('div')`
  align-items: center;
  gap: 4px;
  display: flex;
  height: 36px;

  .Button {
    color: #aaa;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    line-height: 36px;
    // background-color: #000a;
    background-color: #222;
    width: 24px;
    cursor: pointer;
    height: 36px;

    &:hover {
      background-color: #333;
      color: #ccc;
    }
  }

  .Date {
    padding: 0 2px 0 16px;
    height: 100%;
    background-color: #222;
    z-index: 10;
    color: #aaa;
    font-size: 20px;
    width: 60px;
    border: none;
  }
`

const DateMode = ({ date, setDate }) => {
  const onChange = (event) => {
    const date = event.target.value

    setDate(date)
    localStorage.setItem('date', date)
  }

  return <Container>
    <div className="Button">
      ↞
    </div>
    <div className="Button">
      ←
    </div>
    <input
      type="number"
      value={date}
      onChange={onChange}
      className="Date"
    />
    <div className="Button">
      →
    </div>
    <div className="Button">
      ↠
    </div>
  </Container>
}

export default DateMode
