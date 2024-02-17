import React, { useState, useEffect } from 'react';

function DownloadButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
    const videoUrl = window.location.href;

    try {
      const response = await fetch('https://co.wuk.sh/api/json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          url: encodeURI(videoUrl),
          vQuality: 'max',
          filenamePattern: 'basic',
          isAudioOnly: false,
          disableMetadata: true,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData && responseData.url) {
          location.href = responseData.url;
        } else {
          throw new Error('URL не найден');
        }
      } else {
        throw new Error('Сетевой ответ не был успешным.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      id="downloadButton"
      className="button-30"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
      }}
    >
      <img
        src="https://raw.githubusercontent.com/barantaran/youtube-downloader/fix-button/src/img.png"
        alt="Download"
        style={{ width: '95%', height: 'auto' }}
      />
    </button>
  );
}

function App() {
  return <DownloadButton />;
}

export default App;
