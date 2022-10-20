import {GET_LABELS} from './constant';

export const getLabels = labels => {
  return {
    type: GET_LABELS,
    payload: labels,
  };
};
