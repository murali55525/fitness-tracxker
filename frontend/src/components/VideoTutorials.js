import React, { useState } from 'react';
import { fetchVideos } from '../api/videoApi';
import './VideoTutorials.css';

const VideoTutorials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const videoData = await fetchVideos(searchTerm);
      setVideos(videoData);
    } catch (err) {
      setError('Failed to load videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-tutorials">
      <h3>Search Video Tutorials</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div>Loading videos...</div>}
      {error && <div>{error}</div>}

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <h4>{video.title}</h4>
            <iframe
              width="320"
              height="180"
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTutorials;
