import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [showSidebarToggle, setShowSidebarToggle] = useState(true);

  return (
    <LayoutContext.Provider value={{ showSidebarToggle, setShowSidebarToggle }}>
      {children}
    </LayoutContext.Provider>
  );
}

// یک هوک سفارشی برای استفاده راحت‌تر از کانتکست
export const useLayout = () => useContext(LayoutContext);
