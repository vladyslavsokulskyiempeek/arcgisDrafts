import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ZoomViewModel from '@arcgis/core/widgets/Zoom/ZoomViewModel';
import * as watchUtils from '@arcgis/core/core/watchUtils';
import './ZoomWidget.css';

const ZoomWidgetNew = ({ view, map, position = 'bottom-left' }) => {
  const [viewModel, setViewModel] = useState(new ZoomViewModel());
  const [maxZoomed, setMaxZoomed] = useState(false);
  const [minZoomed, setMinZoomed] = useState(false);
  const [inited, setInited] = useState(false);

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

  const ZoomWidget = () => {
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

  const init = () => {
    if (inited) return;
    const node = document.createElement('div');
    view.ui.add(node, position);
    ReactDOM.render(<ZoomWidget view={view} />, node);
    setInited(true);
  };

  useEffect(() => {
    if (!view) return;
    init();
  }, [view]);

  return null;
};

export default ZoomWidgetNew;
