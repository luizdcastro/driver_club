import React from 'react';
import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import './upload-image.styles.css';

const UploadImage = () => {
  const UploadMessage = ({ message }) => {
    return (
      <div className="image-upload__message">
        <p>{message}</p>
      </div>
    );
  };

  const FileInfo = () => {
    return (
      <div className="file-info">
        <Preview url="http://localhost:8000/files/18aaabcd10a3b4c2f8f834d2b14f1018-unnamed.jpg" />
        <div className="file-info__data">
          <strong>profile.png</strong>
          <span className="file-info__span">
            64kb
            <button className="file-info__button" onClick={() => {}}>
              Excluir
            </button>
          </span>
        </div>
      </div>
    );
  };

  const Preview = ({ url }) => {
    return (
      <img
        style={{
          width: 36,
          height: 36,
          borderRadius: 5,
          backgroundImage: `url(${url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          marginRight: 10,
        }}
        alt=""
      />
    );
  };

  const FileList = () => {
    return (
      <div className="file-list">
        <li className="file-list__li">
          <FileInfo />
          <div>
            <CircularProgressbar
              styles={{
                root: { width: 24 },
                path: { stroke: '#7159c1' },
              }}
              strokeWidth={10}
              percentage={60}
            />
            <a
              href="http://localhost:8000/files/18aaabcd10a3b4c2f8f834d2b14f1018-unnamed.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
            <MdCheckCircle size={24} color="#78e5d5" />
            <MdError size={24} color="#e57878" />
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
      <Dropzone accept="image/*" onDropAccepted={() => {}}>
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
      <div>
        <FileList />
      </div>
    </div>
  );
};

export default UploadImage;
