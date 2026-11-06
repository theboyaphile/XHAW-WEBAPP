import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'adventureEscapeSelections';
const QuoteContext = createContext(null);

export function QuoteProvider({ children }) {
  const [selected, setSelected] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setSelected(JSON.parse(raw));
      } catch (err) {
        console.warn('Could not load selections:', err);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(selected)).catch((err) =>
      console.warn('Could not save selections:', err),
    );
  }, [selected, loaded]);

  const toggleActivity = (activity) => {
    setSelected((prev) => {
      const exists = prev.some((item) => item.id === activity.id);
      if (exists) return prev.filter((item) => item.id !== activity.id);
      return [...prev, activity];
    });
  };

  const removeActivity = (id) =>
    setSelected((prev) => prev.filter((item) => item.id !== id));

  const isSelected = (id) => selected.some((item) => item.id === id);

  const total = selected.reduce((sum, item) => sum + item.price, 0);

  return (
    <QuoteContext.Provider
      value={{ selected, toggleActivity, removeActivity, isSelected, total }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>');
  return ctx;
}
