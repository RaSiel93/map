import styled from 'styled-components';
import { connect } from 'react-redux'
import dayjs from 'dayjs'

import {
  setDate,
} from 'store/actions'

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
    saveDate(event.target.value)
  }

  const saveDate = (date) => {
    setDate(date)
    localStorage.setItem('date', date)
  }

  const changeDate = (shift) => {
    const changedDate = dayjs(date).add(shift, 'year').format("YYYY")

    saveDate(changedDate)
  }

  return <Container>
    <div className="Button" title="100 гадоў назад" onClick={() => changeDate(-100)}>
      ⇇
    </div>
    <div className="Button" title="10 гадоў назад" onClick={() => changeDate(-10)}>
      ↞
    </div>
    <div className="Button" title="1 гадоў назад" onClick={() => changeDate(-1)}>
      ←
    </div>
    <input
      type="number"
      value={date}
      onChange={onChange}
      className="Date"
    />
    <div className="Button" title="1 гадоў наперад" onClick={() => changeDate(1)}>
      →
    </div>
    <div className="Button" title="10 гадоў наперад" onClick={() => changeDate(10)}>
      ↠
    </div>
    <div className="Button" title="100 гадоў наперад" onClick={() => changeDate(100)}>
      ⇉
    </div>
  </Container>
}

export default connect(
  (state) => ({
    date: state.main.date,
  }),
  (dispatch) => ({
    setDate: (date) => dispatch(setDate(date))
  })
)(DateMode);
