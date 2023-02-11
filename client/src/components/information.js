import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 30px;
  z-index: 10;
  color: #fff;

  .Mode {
    align-items: center;
    justify-content: center;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 50px;
    background-color: #0005;
    font-size: 20px;
    color: #fff;
    width: 100vw;
  }

  .Year {
    position: fixed;
    top: 0px;
    right: 10px;
    z-index: 1;
    color: #fff8;
    font-size: 24px;
    line-height: 0;
    pointer-events: none;
  }
`

const Information = ({ zoom, date, selectedAreaData }) => {
  return (
    <Container>
      {
        (localStorage.getItem('filters.info') === 'true') && (
          <p>
            zoom: {zoom}
          </p>
        )
      }
      {
        selectedAreaData && <div className="Mode">{selectedAreaData.number}</div>
      }
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
