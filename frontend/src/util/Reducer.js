import * as actions from "./ActionTypes";

function reducer(state = null, action) {
  switch (action.type) {
    case actions.FILE_UPLOADED:
      console.log(action.payload.file);
      return action.payload.file;
    default:
      return state;
  }
}

export default reducer;
