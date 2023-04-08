import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const DATA_TIME_STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

onResumeVideo();

player.on('timeupdate', throttle(setDataTime, 500));

function setDataTime(data) {
  localStorage.setItem(DATA_TIME_STORAGE_KEY, data.seconds);
}

function onResumeVideo() {
  const currentVideoplayerTime = localStorage.getItem(DATA_TIME_STORAGE_KEY);

  if (currentVideoplayerTime) {
    player.setCurrentTime(currentVideoplayerTime);
  }
}