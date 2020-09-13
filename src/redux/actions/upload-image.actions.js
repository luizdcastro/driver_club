import * as constants from '../constants';

export const uploadImage = (data, uploadProgress) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/files',
    data,
    uploadProgress: uploadProgress,
    success: (response) => uploadedImage(response),
  },
});

export const deleteImage = (imageKey) => ({
  type: constants.API,
  payload: {
    method: 'POST',
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
