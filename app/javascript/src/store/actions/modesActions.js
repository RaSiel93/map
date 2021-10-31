import {
  ADD_NEW_AREA_POINT_FOR_AREA_MODE,
  RESET_NEW_AREA_POINTS_FOR_AREA_MODE,
} from 'src/constants';

export const addNewAreaPointForAreaMode = (coordinates) => ({
  type: ADD_NEW_AREA_POINT_FOR_AREA_MODE, payload: coordinates
});

export const resetNewAreaPointsForAreaMode = () => ({
  type: RESET_NEW_AREA_POINTS_FOR_AREA_MODE
});
