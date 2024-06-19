import { connect } from 'react-redux'
import styled from 'styled-components'
import cx from 'classnames'

const Container = styled.div`
  position: absolute;
  // top: 30px;
  z-index: 10;
  color: #fff;
  display: flex;
  flex-direction: row;
  width: 100%;

  &.active {
    background-color: #0005;
  }

  .Info {
    padding: 0 8px 0 64px;
  }

  .Mode {
    align-items: center;
    justify-content: center;
    display: flex;
    // position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    height: 50px;
    font-size: 20px;
    color: #fff;
    // width: 100vw;
    flex-grow: 1;
  }

  .Year {
    // flex-grow: 1;
    // position: fixed;
    // top: 0px;
    // right: 10px;
    padding: 0 8px;
    z-index: 1;
    color: #fff8;
    font-size: 24px;
    line-height: 0;
    pointer-events: none;
  }
`

const Information = ({ zoom, date, selectedAreaData }) => {
  return (
    <Container className={cx({ active: selectedAreaData })}>
      <div className='Info'>
        {
          (localStorage.getItem('filters.info') === 'true') && (
            <p>
              zoom: {zoom}
            </p>
          )
        }
      </div>
      <div className="Mode">
        {
          selectedAreaData && <div>{selectedAreaData.number}</div>
        }
      </div>
      <div className="Year">
        <h1>{date}</h1>
      </div>
    </Container>
  )
}

export default connect(
  (state) => ({
    zoom: state.main.zoom,
    selectedAreaData: state.main.selectedAreaData,
  }),
  (dispatch) => ({
  })
)(Information);
