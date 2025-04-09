import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import musicData from '../data/data.json';

const PlayerContext = createContext(null);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);

  const timerRef = useRef(null);

  const getImageSource = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith('assets/')) {
      try {
      
        switch (imagePath) {
          // Song covers
          case 'assets/songcover/blindinglight.png':
            return require('../assets/songcover/blindinglight.png');
          case 'assets/songcover/kissmemore.png':
            return require('../assets/songcover/kissmemore.png');
          case 'assets/songcover/rockyoulikeahurricane.png':
            return require('../assets/songcover/rockyoulikeahurricane.png');
          case 'assets/songcover/intheend.png':
            return require('../assets/songcover/intheend.png');
          case 'assets/songcover/numb.png':
            return require('../assets/songcover/numb.png');
          case 'assets/songcover/stilllovingyou.png':
            return require('../assets/songcover/stilllovingyou.png');
          case 'assets/songcover/anti-hero.png':
            return require('../assets/songcover/anti-hero.png');
          case 'assets/songcover/woman.png':
            return require('../assets/songcover/woman.png');

          // Artist covers
          case 'assets/artistcover/scorpions.png':
            return require('../assets/artistcover/scorpions.png');
          case 'assets/artistcover/linkinpark.png':
            return require('../assets/artistcover/linkinpark.png');

          default:
            console.warn("Unknown local asset path:", imagePath);
            return { uri: 'https://via.placeholder.com/350' };
        }
      } catch (error) {
        console.error("Error loading image:", error);
        return { uri: 'https://via.placeholder.com/350' };
      }
    }

    return { uri: imagePath };
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (isPlaying && currentSong) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            clearInterval(timerRef.current);
            setTimeout(() => handleNext(), 500);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentSong]);

  const playSong = (song, playlist, index, songsList) => {
    if (song.artistId && !song.artistName) {
      const artist = musicData.artists.find(a => a.id === song.artistId);
      if (artist) {
        song = { ...song, artistName: artist.name };
      }
    }

    setCurrentSong(song);
    setCurrentPlaylist(playlist);
    setCurrentIndex(index);
    setSongs(songsList || []);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
      return;
    }

    let newIndex;
    if (shuffleActive) {
      newIndex = Math.floor(Math.random() * songs.length);
    } else {
      newIndex = (currentIndex - 1 + songs.length) % songs.length;
    }

    setCurrentIndex(newIndex);
    setCurrentSong(songs[newIndex]);
    setCurrentTime(0);
  };

  const handleNext = () => {
    let newIndex;
    if (repeatMode === 2) {
      setCurrentTime(0);
      return;
    } else if (shuffleActive) {
      newIndex = Math.floor(Math.random() * songs.length);
    } else {
      newIndex = (currentIndex + 1) % songs.length;
    }

    setCurrentIndex(newIndex);
    setCurrentSong(songs[newIndex]);
    setCurrentTime(0);
  };

  const toggleShuffle = () => {
    setShuffleActive(!shuffleActive);
  };

  const toggleRepeat = () => {
    setRepeatMode((repeatMode + 1) % 3);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        currentPlaylist,
        currentIndex,
        songs,
        isPlaying,
        currentTime,
        shuffleActive,
        repeatMode,
        getImageSource,
        playSong,
        togglePlayPause,
        handlePrevious,
        handleNext,
        toggleShuffle,
        toggleRepeat,
        formatTime,
        setCurrentTime,
        startTimer
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};