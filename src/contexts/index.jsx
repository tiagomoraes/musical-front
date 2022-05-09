import React from 'react';

import StemProvider from './StemProvider';
import CorrectTrackProvider from './CorrectTrackProvider';

export default function GlobalProvider({ children }) {
  return (
    <CorrectTrackProvider>
      <StemProvider>{children}</StemProvider>
    </CorrectTrackProvider>
  );
}
