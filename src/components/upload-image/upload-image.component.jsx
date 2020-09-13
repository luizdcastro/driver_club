import React, { useEffect, useState } from 'react';
import { uniqueId } from 'loadsh';
import filesize from 'filesize';
import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import api from '../../services/api-axios';

import './upload-image.styles.css';
import 'react-circular-progressbar/dist/styles.css';

const UploadImage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [droppedFile, setDroppedFile] = useState(false);

  const handleUpload = (files) => {
    setUploadedFiles(
      files.map((file) => ({
        file,
        id: uniqueId(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: file.progress,
        uploaded: false,
        error: false,
        url: null,
      }))
    );
    setDroppedFile(!droppedFile);
  };

  const updateFile = (id, data) => {
    setUploadedFiles(
      uploadedFiles.map((uploadedFiles) => {
        return id === uploadedFiles.id
          ? { ...uploadedFiles, ...data }
          : uploadedFiles;
      })
    );
  };

  const handleRequest = () => {
    const data = new FormData();
    data.append('file', uploadedFiles[0].file);
    api
      .post('files', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          updateFile(uploadedFiles[0].id, {
            progress: progress,
          });
        },
      })
      .then((response) => {
        updateFile(uploadedFiles[0].id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
      })
      .catch(() => {
        updateFile(uploadedFiles[0].id, {
          error: true,
        });
      });
  };

  const handleDelete = async (id) => {
    await api.delete(`files/${id}`);
    setUploadedFiles([]);
  };

  useEffect(() => {
    if (uploadedFiles.length) {
      handleRequest();
    }
  }, [droppedFile]);

  const UploadMessage = ({ message }) => {
    return (
      <div className="image-upload__message">
        <p>{message}</p>
      </div>
    );
  };

  const Preview = () => {
    return (
      <img
        src={uploadedFiles[0].preview}
        style={{
          width: 36,
          height: 36,
          borderRadius: 5,
          backgroundImage: `url(${uploadedFiles[0].preview})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          marginRight: 10,
        }}
        alt=""
      />
    );
  };

  const FileInfo = () => {
    return (
      <div className="file-info">
        <Preview />
        <div className="file-info__data">
          <strong className="file-info__name">
            {uploadedFiles[0].name.substr(0, 20)}
          </strong>
          <span className="file-info__span">
            {uploadedFiles[0].readableSize}
            {uploadedFiles[0].uploaded && (
              <button
                className="file-info__button"
                onClick={() => {
                  handleDelete(uploadedFiles[0].id);
                }}
              >
                Excluir
              </button>
            )}
          </span>
        </div>
      </div>
    );
  };

  const FileList = () => {
    return (
      <div className="file-list">
        <li className="file-list__li">
          <FileInfo />
          <div>
            {!uploadedFiles[0].uploaded && !uploadedFiles[0].error && (
              <CircularProgressbar
                strokeWidth={10}
                value={uploadedFiles[0].progress}
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1' },
                }}
              />
            )}
            {uploadedFiles[0].url && (
              <a
                href={uploadedFiles[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}
            {uploadedFiles[0].uploaded && (
              <MdCheckCircle size={24} color="#78e5d5" />
            )}
            {uploadedFiles[0].error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      </div>
    );
  };

  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage message="Arraste sua imagem aqui" />;
    }
    if (isDragReject) {
      return <UploadMessage message="Arquivo não suportado" />;
    }
    return <UploadMessage message="Solte a imagem aqui" />;
  };

  return (
    <div className="upload-image__container">
      <Dropzone accept="image/*" onDropAccepted={handleUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
            className="image-dropzone"
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </div>
        )}
      </Dropzone>
      <div>{!!uploadedFiles.length && <FileList />}</div>
    </div>
  );
};

export default UploadImage;
