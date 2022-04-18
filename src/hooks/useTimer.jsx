import { useCallback, useEffect, useState } from 'react';

const useTimer = ({ isRunning, stop, time }) => {
  const [referenceTime, setReferenceTime] = useState();
  const [timeLeft, setTimeLeft] = useState();

  const handleCountDown = useCallback(() => {
    const difference = new Date(referenceTime) - new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    stop();
    setReferenceTime(undefined);
    return undefined;
  }, [referenceTime, stop]);

  useEffect(() => {
    if (isRunning) {
      if (referenceTime === undefined) {
        setReferenceTime(new Date().getTime() + time);
      }

      const timer = setTimeout(() => {
        setTimeLeft(handleCountDown());
      }, 1000);

      return () => clearTimeout(timer);
    }

    return null;
  }, [isRunning, timeLeft, referenceTime, time, handleCountDown]);

  return { timeLeft };
};

export default useTimer;
