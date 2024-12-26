import React, { useEffect, useRef } from 'react';
import '../css/Camera.css';
import Sidebar from '../components/Sidebar';

const CameraPage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const player = new window.JSMpeg.Player('ws://your-rtsp-server-url', {
        canvas: videoElement,
      });
      return () => {
        player.destroy();
      };
    }
  }, []);

  return (
    <div className="camera-page">
      <Sidebar />
      <div className="camera-content">
        <h1>Camera Feed</h1>
        <canvas ref={videoRef} className="camera-video"></canvas>
      </div>
    </div>
  );
};

export default CameraPage;
