import * as actions from "./ActionTypes";

let initialState = {
  file: "",
  audioData: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FILE_UPLOADED:
      return { ...state, file: action.payload.file };

    case actions.AUDIO_DATA_UPLOADED:
      return { ...state, audioData: action.payload.audioData };

    default:
      return state;
  }
}

export default reducer;
