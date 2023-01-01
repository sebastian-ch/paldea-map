import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// import the mapbox-gl styles so that the map is displayed correctly

function MapboxMap() {
    // this is where the map instance will be stored after initialization
  const [map, setMap] = React.useState<mapboxgl.Map>();
    const tileUrl = 'https://sebastian-ch.github.io/tiles/poke/{z}/tile_{x}_{y}.png'
    //const tileUrl = 'https://sebastian-ch.github.io/tiles/poke/{z}/{x}/{y}.png'
    // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
    const mapNode = React.useRef(null);


    const addMapData = () => {

        // map.addSource('poke', {
        //     'type': 'vector',
        //     'tiles': [
        //         './poke/{z}/{x}/{y}.png'
        //     ]
        // })


    }

  React.useEffect(() => {
    const node = mapNode.current;
        // if the window object is not found, that means
        // the component is rendered on the server
        // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

        // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
            accessToken: 'pk.eyJ1Ijoic2ViYXN0aWFuLWNoIiwiYSI6ImNpejkxdzZ5YzAxa2gyd21udGpmaGU0dTgifQ.IrEd_tvrl6MuypVNUGU5SQ',
            //style: "mapbox://styles/mapbox/streets-v11",
            style: {
                "version": 8,
                "sources": {
                    "poke": {
                        "type": 'raster',
                        "tiles": [
                            tileUrl
                        ],
                        "tileSize": 256
                    }
                },
                "layers": [{
                    "id": 'pokes',
                    "type": 'raster',
                    "source": 'poke',
                    "minzoom": 0,
                    "maxzoom": 6
                }]
            },

      center: [0, 0],
      zoom: 1,
      renderWorldCopies: false
    });

        // save the map object to React.useState
    setMap(mapboxMap);

    //addMapData();

        return () => {
      mapboxMap.remove();
    };
  }, []);

    return <div ref={mapNode} style={{ width: "100%", height: "100vh" }} />;
}

export default MapboxMap
