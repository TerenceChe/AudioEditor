import * as actions from "./ActionTypes";

export function uploadFile(data) {
  return {
    type: actions.FILE_UPLOADED,
    payload: {
      file: data,
    },
  };
}
