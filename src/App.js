import React, { useState } from 'react';
import MapView from './components/MapView';
import './App.css';

const baseMapDefinition = ['arcgis-topographic', 'gray-vector'];

function App() {
  const [baseMap1, setBaseMap1] = useState(baseMapDefinition[0]);
  const [baseMap2, setBaseMap2] = useState(baseMapDefinition[1]);

  const onClickHandler1 = () => {
    setBaseMap1(baseMap =>
      baseMap === baseMapDefinition[0]
        ? baseMapDefinition[1]
        : baseMapDefinition[0],
    );
  };

  const onClickHandler2 = () => {
    setBaseMap2(baseMap =>
      baseMap === baseMapDefinition[0]
        ? baseMapDefinition[1]
        : baseMapDefinition[0],
    );
  };

  const mapOnClickHandler = () => {
    console.log('mapOnClick');
  };

  return (
    <div className="App">
      <MapView
        basemap={baseMap1}
        zoom="13"
        center={[-118.805, 34.027]}
        onClick={mapOnClickHandler}
      />
      {/* <MapView basemap={baseMap2} zoom="8" center={[-120.805, 40.027]} /> */}
      {/* <button onClick={onClickHandler1}>Change 1</button> */}
      {/* <button onClick={onClickHandler2}>Change 2</button> */}
    </div>
  );
}

export default App;
