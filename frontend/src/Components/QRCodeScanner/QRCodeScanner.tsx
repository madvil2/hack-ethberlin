import React from 'react';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import styles from './styles.module.scss';

const QRCodeScanner: React.FC = () => {
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const result = detectedCodes[0].rawValue;
      console.log(result);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scannerContainer}>
        <Scanner onScan={handleScan} />
      </div>
    </div>
  );
};

export default QRCodeScanner;
