import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';
import Play from '@pages/Play';
import GlobalProvider from '@contexts';
import GlobalStyle from '@styles/GlobalStyle';

export default function App() {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
