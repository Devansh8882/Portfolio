import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Preloader, CustomCursor, Navbar } from './shared/ui';
import { HomePage } from './pages/Home/HomePage.jsx';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      <CustomCursor />
      {!loading && <Navbar />}
      <HomePage loading={loading} />
    </>
  );
}

export default App;
