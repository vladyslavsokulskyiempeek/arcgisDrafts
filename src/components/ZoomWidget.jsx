import React, { useState, useEffect } from 'react';
import ZoomViewModel from '@arcgis/core/widgets/Zoom/ZoomViewModel';
import * as watchUtils from '@arcgis/core/core/watchUtils';
import './ZoomWidget.css';

const ZoomWidget = ({ view }) => {
  const [viewModel, setViewModel] = useState(new ZoomViewModel());
  const [maxZoomed, setMaxZoomed] = useState(false);
  const [minZoomed, setMinZoomed] = useState(false);

  useEffect(() => {
    view.when(onViewLoaded);
  }, []);

  const onViewLoaded = value => {
    viewModel.view = view;
    watchUtils.init(view, 'zoom', onZoomChange);
  };

  const onZoomChange = value => {
    setMaxZoomed(maxZoomed => value === view.constraints.maxZoom);
    setMinZoomed(minZoomed => value === view.constraints.minZoom);
  };

  const maxstate = maxZoomed
    ? 'button circle raised disable'
    : 'button circle raised';
  const minstate = minZoomed
    ? 'button circle raised disable'
    : 'button circle raised';

  const zoomIn = () => {
    if (!maxZoomed) {
      viewModel.zoomIn();
    }
  };

  const zoomOut = () => {
    if (!minZoomed) {
      viewModel.zoomOut();
    }
  };

  return (
    <div className="zoom-btns">
      <div className={maxstate} onClick={zoomIn}>
        <div className="center">
          <span className="material-icons">+</span>
        </div>
      </div>
      <div className={minstate} onClick={zoomOut}>
        <div className="center">
          <span className="material-icons">-</span>
        </div>
      </div>
    </div>
  );
};

export default ZoomWidget;
