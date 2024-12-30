import React, { useEffect, useRef, useState } from 'react';
import '../css/Camera.css';
import Sidebar from '../components/Sidebar';

const CameraPage = () => {
  const exampleIframeRef = useRef(null);
  const addedIframeRef = useRef(null);
  const [cameraUrl, setCameraUrl] = useState('');
  const [storedCameraUrl, setStoredCameraUrl] = useState(localStorage.getItem('cameraUrl') || '');

  useEffect(() => {
    const exampleIframeElement = exampleIframeRef.current;
    if (exampleIframeElement) {
      exampleIframeElement.src = 'https://rtsp.me/embed/KPbwo57M/';
    }
  }, []);

  const handleAddCamera = () => {
    localStorage.setItem('cameraUrl', cameraUrl);
    setStoredCameraUrl(cameraUrl);
  };

  const handleRemoveCamera = () => {
    localStorage.removeItem('cameraUrl');
    setStoredCameraUrl('');
  };

  return (
    <div className="camera-page">
      <Sidebar />
      <div className="camera-content">
        <h1>Quan sát</h1>
        <div className="camera-blocks">
          {!storedCameraUrl && (
            <>
              <div className="camera-block">
                <h2>Hình ảnh camera ví dụ</h2>
                <iframe ref={exampleIframeRef} className="camera-video" title="Example Camera Feed"></iframe>
              </div>
              <div className="camera-block">
                <h2>Thêm đường dẫn camera</h2>
                <input
                  type="text"
                  value={cameraUrl}
                  onChange={(e) => setCameraUrl(e.target.value)}
                  placeholder="Nhập đường dẫn camera"
                />
                <button onClick={handleAddCamera}>Add Camera</button>
              </div>
            </>
          )}
          {storedCameraUrl && (
            <div className="camera-block">
              <iframe ref={addedIframeRef} src={storedCameraUrl} className="camera-video" title="Added Camera Feed"></iframe>
              <button onClick={handleRemoveCamera}>Remove Camera</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraPage;
