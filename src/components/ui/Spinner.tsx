// components/Spinner.tsx
import React from 'react';
import { Circles } from 'react-loader-spinner';

interface SpinnerProps {
  height?: string | number;
  width?: string | number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ height = 80, width = 80, color = "yellow" }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Circles
        height={height}
        width={width}
        color={color}
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};

export default Spinner;