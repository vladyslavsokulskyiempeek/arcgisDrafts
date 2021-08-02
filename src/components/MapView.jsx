import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import createMapView from './utils/createMapView';
import ZoomWidget from './ZoomWidget';
import ZoomWidgetNew from './ZoomWidgetNew';

function MapView({ basemap, zoom, center, onClick }) {
  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  // in case we add widget through useEffect
  const [customWidgets, setCustomWidgets] = useState(null);

  // state for layerList
  const [hiddenLayer, setHiddendLayer] = useState(null);
  const [openedGroup, setOpendGroup] = useState(null);

  // console.log('customWidgets - ', customWidgets);
  // console.log('view - ', view);

  const mapRef = useRef();

  // first init
  useEffect(() => {
    if (view) return;
    const mapProperties = { basemap };
    const viewProperties = {
      zoom,
      center,
    };
    const layerProperties = {
      hiddenLayer,
      openedGroup,
      setHiddendLayer,
      setOpendGroup,
    };
    const { map: mapProp, view: viewProp } = createMapView(
      mapRef.current,
      mapProperties,
      viewProperties,
      layerProperties,
    );
    setMap(mapProp);
    setView(viewProp);
    return () => {
      view && view.destroy();
    };
  }, []);

  // basemap change
  useEffect(() => {
    if (!view) return;
    view.map.basemap = basemap;
  }, [view, basemap]);

  // onClick change
  useEffect(() => {
    if (!view) return;
    const handle = view.on('click', onClick);
    return function removeHandle() {
      handle && handle.remove();
    };
  }, [view, onClick]);

  // useEffect(() => {
  //   if (!view && !customWidgets?.ZoomWidget) return;
  //   const node = document.createElement('div');
  //   view.ui.add(node, 'bottom-left');
  //   ReactDOM.render(<ZoomWidget view={view} />, node);
  //   setCustomWidgets(customWidgets => ({ ...customWidgets, ZoomWidget: true }));
  // }, [view]);

  return (
    <div className="ArcGISMap" ref={mapRef}>
      {view && <ZoomWidgetNew map={map} view={view} position="bottom-right" />}
    </div>
  );
}

export default MapView;
