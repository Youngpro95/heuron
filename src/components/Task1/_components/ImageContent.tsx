import React, { createContext, useContext, useState } from 'react';

interface ImageContextType {
  isGrayscale: boolean;
  toggleGrayscale: () => void;
}

const ImageContext = createContext<ImageContextType>({
  isGrayscale: false,
  toggleGrayscale: () => {},
});

export function ImageProvider({ children }: { children: React.ReactNode }) {
  const [isGrayscale, setIsGrayscale] = useState(false);

  const toggleGrayscale = () => {
    setIsGrayscale((prev) => !prev);
  };

  return (
    <ImageContext.Provider value={{ isGrayscale, toggleGrayscale }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImageContext() {
  return useContext(ImageContext);
}
