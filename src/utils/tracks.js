import { sampleSize, shuffle } from 'lodash';
import { available } from '@constants/tracks';

export const getRandomTrack = () => {
  const random = Math.floor(Math.random() * available.length);
  return available[random];
};

export const getAvailableAnswers = (expectedId) => {
  const expected = available.find(({ id }) => expectedId === id);

  if (!expected) {
    return null;
  }

  return shuffle([
    expected,
    ...sampleSize(
      available.filter(({ id }) => expectedId !== id),
      3,
    ),
  ]);
};

export const getShuffledTracks = () => {
  const tracks = available;
  for (var i = tracks.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    [tracks[i], tracks[rand]] = [tracks[rand], tracks[i]];
  }
  return tracks;
};
