import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '@pages/Home';
import Play from '@pages/Play';
import Level from '@components/Level';
import GlobalProvider from '@contexts';

import { phases } from '@constants/phases';

import GlobalStyle from '@styles/GlobalStyle';

export default function App() {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="play" element={<Play />}>
            <Route path=":phase" element={<Level />} />
            <Route
              index
              path="*"
              element={<Navigate to={phases[0]} replace />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
