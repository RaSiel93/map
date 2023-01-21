import { connect } from 'react-redux';
import styled from 'styled-components';
import { AreaMode, EditMode, PointMode, ShowMode, NoteMode, ImportMode, NavigateMode, DateMode } from 'components/modes';

const Container = styled.div`
  padding: 8px;
  gap: 8px;
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
`

const Navigation = ({ date, setDate, longitude, latitude, zoom }) => {
  return (
    <Container>
      <DateMode date={date} setDate={setDate}/>
      <ImportMode/>
      <NavigateMode longitude={longitude} latitude={latitude} zoom={zoom}/>
      <PointMode/>
      <ShowMode/>
      <EditMode/>
      <AreaMode/>
      <NoteMode/>
      {/*<PersonMode*/}
    </Container>
  )
}

export default connect(
  (state) => ({
    zoom: state.main.zoom,
  }),
  (dispatch) => ({
  })
)(Navigation);
