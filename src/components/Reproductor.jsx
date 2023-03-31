import React, { useState, useRef } from "react";
import "../styles/Reproductor.css";

import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaForward,
  FaBackward,
} from "react-icons/fa";

function Reproductor() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const videoRef = useRef(null); // conecta por referencia con el elemento video

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      setIsPlaying(true);
      video.play();
    } else {
      setIsPlaying(false);
      video.pause();
    }
  };

  const handleRewind = () => {
    const video = videoRef.current;
    video.currentTime -= 10;
  };

  const handleFastForward = () => {
    const video = videoRef.current;
    video.currentTime += 10;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  };

  const handleProgressChange = (event) => {
    const video = videoRef.current;
    video.currentTime = event.target.value;
  };

  const handleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (event) => {
    const video = videoRef.current;
    video.volume = event.target.value;
    setVolume(video.volume);
  };

  // Mostrar u ocultar la barra de volumen
  const [seeBar, setSeeBar] = useState("no_seeBar");
  function bar(e) {
    seeBar === "seeBar" ? setSeeBar("no_seeBar") : setSeeBar("seeBar");
  }
  function barSetTimeOut() {
    if (seeBar === "seeBar") {
      setTimeout(() => {
        setSeeBar("no_seeBar");
      }, 2000);
    }
  }

  // Full screen
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  return (
    // console.log("videoRef current: ", videoRef.current),
    <div className="reproductor-container">
      <h1 className="reproductor-title">Video - Player</h1>
      <video
        onClick={handlePlayPause}
        className="video-container"
        ref={videoRef}
        // src="videos/guardianes.mp4"
        src="https://media.istockphoto.com/id/473164821/es/v%C3%ADdeo/ruise%C3%B1or-ruso.mp4?s=mp4-640x640-is&k=20&c=8b8peR9orzjDStS1EoARJJ7xNVRnBHeuP7HcE1UdKJE="
        // src="https://www.facebook.com/mauriciogastonluquezmarquez/videos/10217374115174682"
        onTimeUpdate={handleTimeUpdate}
      ></video>
      <progress
        className="reproductor-progress"
        max={duration}
        value={currentTime}
        onChange={handleProgressChange}
      />
      <div className="reproductor-controls" onMouseLeave={barSetTimeOut}>
        <button className="rewind-button" onClick={handleRewind}>
          <FaBackward />
        </button>
        <button className="play-pause-button" onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="fast-forward-button" onClick={handleFastForward}>
          <FaForward />
        </button>
        <div className="volume-container">
          <input
            className={seeBar}
            type="range"
            id="volume-slider"
            name="volume-slider"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
          <button
            className="mute-button"
            onMouseEnter={bar}
            onClick={handleMute}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
        <div className="reproductor-time">
          {currentTime.toFixed(2)} / {duration.toFixed(2)}
        </div>
        <div className="fullscreen">
          <button onClick={toggleFullScreen}>
            {isFullScreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reproductor;

/*
Añade el atributo controls para habilitar los controles de reproducción del video, como el botón de reproducción/pausa, el control de volumen y la bar de progreso.
<video
        ref={videoRef}
        src="://wwhttpsw.w3schools.com/html/mov_bbb.mp4"
        controls
        onTimeUpdate={handleTimeUpdate}
      />


para anexar videos de youtube es:
<iframe width="640" height="360" src="https://www.youtube.com/embed/VIDEO_ID"></iframe>

https://media.istockphoto.com/id/473154903/es/v%C3%ADdeo/wolf-howls.mp4?s=mp4-640x640-is&k=20&c=LlffN7kIgIf78mS2qtuApl44YRUFeY9uiY-e2DLZ7Vc=




Reemplaza "VIDEO_ID" con el ID del video de YouTube que deseas reproducir. 
El ID del video se encuentra en la URL del video después de "v=".
*/


/*
Para controlar el progreso del video con el cursor, puedes agregar un evento onMouseDown 
al elemento <progress> para detectar cuando el usuario hace clic en la barra de progreso. 
Luego, en la función de manejo de eventos, puedes calcular la posición del cursor en relación 
con la barra de progreso y actualizar la posición de reproducción del video. Aquí hay un 
ejemplo de cómo puedes modificar la función handleProgress para permitir el control del 
progreso con el cursor:


function handleProgress(e) {
  const video = videoRef.current;
  const pos = (e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;
  video.currentTime = pos * video.duration;
  setCurrentTime(video.currentTime);
}
En este ejemplo, se calcula la posición del cursor dividiendo la diferencia entre la 
posición X del evento del mouse y la posición X del elemento de progreso en el ancho 
del elemento de progreso. Luego, la posición del tiempo de reproducción se establece 
multiplicando esta posición por la duración total del video. También se actualiza el 
estado currentTime para reflejar el tiempo de reproducción actual del video. 
Finalmente, asegúrate de agregar el evento onMouseDown al elemento <progress> en el 
renderizado del componente:


<progress
  max={duration}
  value={currentTime}
  onMouseDown={handleProgress}
></progress>
Con esta implementación, los usuarios podrán hacer clic en la barra de progreso para saltar 
a una posición específica del video.
*/
