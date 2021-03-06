import * as constants from '../constants';

export const uploadImage = (data, onUploadProgress, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/files',
    data,
    success: (response) => uploadedImage(response),
    onUploadProgress: onUploadProgress,
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const deleteImage = (imageKey) => ({
  type: constants.API,
  payload: {
    method: 'DELETE',
    url: `/files/${imageKey}`,
    success: (response) => deletedImage(response),
  },
});

const uploadedImage = (data) => ({
  type: constants.UPLOAD_IMAGE,
  payload: data,
});

const deletedImage = (data) => ({
  type: constants.DELETE_IMAGE,
  payload: data,
});
