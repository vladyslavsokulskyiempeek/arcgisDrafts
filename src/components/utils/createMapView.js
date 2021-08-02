import esriConfig from '@arcgis/core/config.js';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Legend from '@arcgis/core/widgets/Legend';
import LayerList from '@arcgis/core/widgets/LayerList';
import WebMap from '@arcgis/core/WebMap';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';

const createMapView = (
  mapRefCurrent,
  mapProperties,
  viewProperties,
  layerProperties,
) => {
  const { hiddenLayer, openedGroup, setHiddendLayer, setOpendGroup } =
    layerProperties;

  console.log('hiddenLayer - ', hiddenLayer);

  esriConfig.apiKey =
    'AAPK24ea9d3d17a74d238ea2614e09072fd0bmq_CxiHaVYWYokES8VbHaullxvW2eZymZIB1jfgbHG36MIDZVoQ0Dd4c_-lf5hV';
  const map = new ArcGISMap(mapProperties);
  // const map = new ArcGISMap({ ...mapProperties, ground: 'world-elevation' });

  /*
  const webmap = new WebMap({
    portalItem: {
      id: '41281c51f9de45edaf1c8ed44bb10e30',
    },
  });

  const view = new MapView({
    container: mapRefCurrent,
    map: webmap,
  });

*/

  // const scalebar = new ScaleBar({
  // view: view,
  // });

  // view.ui.add(scalebar, 'bottom-left');

  // const legend = new Legend({
  //   view: view,
  // });
  // view.ui.add(legend, 'top-right');

  const view = new MapView({
    map: map,
    container: mapRefCurrent,
    ui: {
      components: ['attribution'],
    },
    ...viewProperties,
  });
  // 'zoom', 'attribution', "compas"

  /* ---- Query a feature layer Spatial --- */
  /*

  // Add sketch widget
  const graphicsLayerSketch = new GraphicsLayer();
  map.add(graphicsLayerSketch);

  const sketch = new Sketch({
    layer: graphicsLayerSketch,
    view: view,
    creationMode: 'update', // Auto-select
  });

  view.ui.add(sketch, 'top-right');

  // Add sketch events to listen for and execute query
  sketch.on('update', event => {
    // Create
    if (event.state === 'start') {
      queryFeaturelayer(event.graphics[0].geometry);
    }
    if (event.state === 'complete') {
      graphicsLayerSketch.remove(event.graphics[0]); // Clear the graphic when a user clicks off of it or sketches new one
    }
    // Change
    if (
      event.toolEventInfo &&
      (event.toolEventInfo.type === 'scale-stop' ||
        event.toolEventInfo.type === 'reshape-stop' ||
        event.toolEventInfo.type === 'move-stop')
    ) {
      queryFeaturelayer(event.graphics[0].geometry);
    }
  });

  // Reference query layer
  const parcelLayer = new FeatureLayer({
    url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0',
  });

  function queryFeaturelayer(geometry) {
    const parcelQuery = {
      spatialRelationship: 'intersects', // Relationship operation to apply
      geometry: geometry, // The sketch feature geometry
      outFields: ['APN', 'UseType', 'TaxRateCity', 'Roll_LandValue'], // Attributes to return
      returnGeometry: true,
    };

    parcelLayer
      .queryFeatures(parcelQuery)
      .then(results => {
        console.log('Feature count: ' + results.features.length);

        displayResults(results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Show features (graphics)
  function displayResults(results) {
    // Create a blue polygon
    const symbol = {
      type: 'simple-fill',
      color: [20, 130, 200, 0.5],
      outline: {
        color: 'white',
        width: 0.5,
      },
    };

    const popupTemplate = {
      title: 'Parcel {APN}',
      content:
        'Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}',
    };

    // Set symbol and popup
    results.features.map(feature => {
      feature.symbol = symbol;
      feature.popupTemplate = popupTemplate;
      return feature;
    });

    // Clear display
    view.popup.close();
    view.graphics.removeAll();
    // Add features to graphics layer
    view.graphics.addMany(results.features);
  }
   */
  /* ---- Query a feature layer Spatial --- */

  /* ---- Query a feature layer SQL --- */
  /*

  // SQL query array
  const parcelLayerSQL = [
    'Choose a SQL where clause...',
    "UseType = 'Residential'",
    "UseType = 'Government'",
    "UseType = 'Irrigated Farm'",
    'TaxRateArea = 10853',
    'TaxRateArea = 10860',
    'TaxRateArea = 08637',
    'Roll_LandValue > 1000000',
    'Roll_LandValue < 1000000',
  ];
  let whereClause = parcelLayerSQL[0];

  // Add SQL UI
  const select = document.createElement('select', '');
  select.setAttribute('class', 'esri-widget esri-select');
  select.setAttribute(
    'style',
    "width: 200px; font-family: 'Avenir Next'; font-size: 1em",
  );
  parcelLayerSQL.forEach(function (query) {
    let option = document.createElement('option');
    option.innerHTML = query;
    option.value = query;
    select.appendChild(option);
  });

  view.ui.add(select, 'top-right');

  // Listen for changes
  select.addEventListener('change', event => {
    whereClause = event.target.value;
  });

  // Get query layer and set up query
  const parcelLayer = new FeatureLayer({
    url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0',
  });

  function queryFeatureLayer(extent) {
    const parcelQuery = {
      where: whereClause, // Set by select element
      spatialRelationship: 'intersects', // Relationship operation to apply
      geometry: extent, // Restricted to visible extent of the map
      outFields: ['APN', 'UseType', 'TaxRateCity', 'Roll_LandValue'], // Attributes to return
      returnGeometry: true,
    };

    parcelLayer
      .queryFeatures(parcelQuery)
      .then(results => {
        // console.log('Feature count: ' + results.features.length);
        displayResults(results);
      })
      .catch(error => {
        console.log(error.error);
      });
  }

  function displayResults(results) {
    // Create a blue polygon
    const symbol = {
      type: 'simple-fill',
      color: [20, 130, 200, 0.5],
      outline: {
        color: 'white',
        width: 0.5,
      },
    };

    const popupTemplate = {
      title: 'Parcel {APN}',
      content:
        'Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}',
    };

    // Assign styles and popup to features
    results.features.map(feature => {
      feature.symbol = symbol;
      feature.popupTemplate = popupTemplate;
      return feature;
    });

    // Clear display
    view.popup.close();
    view.graphics.removeAll();
    // Add features to graphics layer
    view.graphics.addMany(results.features);
  }

  // Listen for changes
  select.addEventListener('change', event => {
    whereClause = event.target.value;

    queryFeatureLayer(view.extent);
  });
  
  */
  /* ---- Query a feature layer  SQL --- */

  const trailheadsLayer = new FeatureLayer({
    url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0',
  });
  map.add(trailheadsLayer);

  //Trails feature layer (lines)
  const trailsLayer = new FeatureLayer({
    url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0',
  });
  map.add(trailsLayer, 0);

  const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: 'arcgis-imagery',
  });

  view.ui.add(basemapToggle, 'bottom-right');

  // Parks and open spaces (polygons)
  const parksLayer = new FeatureLayer({
    url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0',
  });

  map.add(parksLayer, 0);

  const layerList = new LayerList({
    view: view,
    listItemCreatedFunction: function (event) {
      const item = event.item;
      // if (item.layer.type != 'group') {
      // don't show legend twice
      item.layer.visible = true;
      // item.panel = {
      //   content: 'legend',
      // };
      // item.panel.open = true;
      // }
    },
    listItemCreatedFunction: defineActions,
  });
  view.ui.add(layerList, 'bottom-left');

  console.log('layerList - ', layerList);

  let uniqueParentItems = [];
  function defineActions(event) {
    var item = event.item;
    if (!item.parent) {
      //only add the item if it has not been added before
      if (!uniqueParentItems.includes(item.title)) {
        uniqueParentItems.push(item.title);
        item.watch(
          'visible',
          function (newValue, oldValue, propertyName, target) {
            console.info(newValue);
            console.info(oldValue);
            console.info(propertyName);
            console.info(target);
          },
        );
        // item.watch();
        item.panel = {
          content: 'legend',
          open: true,
        };
        item.panel.watch(
          'open',
          function (newValue, oldValue, propertyName, target) {
            console.info(newValue);
            console.info(oldValue);
            console.info(propertyName);
            console.info(target);
          },
        );
      }
    }
  }

  layerList.on('trigger-action', function (event) {
    console.log('event - ', event);
    // The layer visible in the view at the time of the trigger.
    // var visibleLayer = USALayer.visible ? USALayer : censusLayer;

    // // Capture the action id.
    // var id = event.action.id;

    // if (id === "full-extent") {]
    //   // If the full-extent action is triggered then navigate
    //   // to the full extent of the visible layer.
    //   view.goTo(visibleLayer.fullExtent);
    // } else if (id === "information") {
    //   // If the information action is triggered, then
    //   // open the item details page of the service layer.
    //   window.open(visibleLayer.url);
    // } else if (id === "increase-opacity") {
    //   // If the increase-opacity action is triggered, then
    //   // increase the opacity of the GroupLayer by 0.25.

    //   if (demographicGroupLayer.opacity < 1) {
    //     demographicGroupLayer.opacity += 0.25;
    //   }
    // } else if (id === "decrease-opacity") {
    //   // If the decrease-opacity action is triggered, then
    //   // decrease the opacity of the GroupLayer by 0.25.

    //   if (demographicGroupLayer.opacity > 0) {
    //     demographicGroupLayer.opacity -= 0.25;
    //   }
    // }
  });

  // const legend = new Legend({
  //   view: view,
  //   layerInfos: [
  //     {
  //       layer: trailheadsLayer,
  //       title: 'trailheadsLayer',
  //     },
  //     {
  //       layer: trailsLayer,
  //       title: 'trailsLayer',
  //     },
  //     {
  //       layer: parksLayer,
  //       title: 'parksLayer',
  //     },
  //   ],
  // });

  // view.ui.add(legend, 'bottom-left');

  // const basemapGallery = new BasemapGallery({
  //   view: view,
  //   source: {
  //     query: {
  //       title: '"World Basemaps for Developers" AND owner:esri',
  //     },
  //   },
  // });

  // view.ui.add(basemapGallery, 'top-right');

  // const view = new SceneView({
  //   map: map,
  //   container: mapRefCurrent,
  //   camera: {
  //     position: {
  //       x: -118.808, //Longitude
  //       y: 33.961, //Latitude
  //       z: 2000, //Meters
  //     },
  //     tilt: 75,
  //   },
  // });

  return { map, view };
};

export default createMapView;
