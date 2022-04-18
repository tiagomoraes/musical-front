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
