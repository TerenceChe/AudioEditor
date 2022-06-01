import * as actions from "./ActionTypes";

export function uploadFile(data) {
  return {
    type: actions.FILE_UPLOADED,
    payload: {
      file: data,
    },
  };
}

export function uploadAudioData(data) {
  return {
    type: actions.AUDIO_DATA_UPLOADED,
    payload: {
      audioData: data,
    },
  };
}
