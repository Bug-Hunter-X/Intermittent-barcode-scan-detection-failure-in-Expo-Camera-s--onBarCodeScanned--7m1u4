```javascript
import { Camera, BarCodeScanner } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setScanned(true);
      setBarcodeData(data);
    }, 200);
  };

  if (hasPermission === null) {
    return <View />; // Or some loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View>
          <Text>Scanned! {barcodeData}</Text>
          <Button title={'Scan again'} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
};

export default App;
```