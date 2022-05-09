import { phases } from '@constants/phases';

export const getNextPhase = (current) => {
  const currentIndex = phases.indexOf(current);

  if (currentIndex === -1) {
    console.error('Current value is not a valid phase');
    return null;
  }

  if (currentIndex === phases.length - 1) {
    return null;
  }

  return phases[currentIndex + 1];
};
