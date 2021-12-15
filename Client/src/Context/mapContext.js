import React, {createContext, useCallback, useContext, useRef, useState} from 'react';


const MapContext = createContext();

const MapProvider = ({children}) => {

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
          
    const mapRef = useRef();
    const onMapLoad = useCallback ((map)=> {
        mapRef.current = map;
    }, []);

    const onMapClick = useCallback((event) => {
        /*open Accident Type*/
        setMarkers((current) => [
          ...current, 
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          },
        ]);
       }, [])  

       const options = {
        styles: [
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ],
        disableDefaultUI:true,
        zoomControl:true
      }

    const panTo = useCallback(({lat, lng}) => {
      mapRef.current.panTo({ lat, lng});
      mapRef.current.setZoom(14);
    }, []);

    return(
        <MapContext.Provider value={{markers, selected, setSelected, panTo, onMapClick, onMapLoad, options}}>
            {children}
        </MapContext.Provider>
    )
}

export const useGlobalMapContext = () => {
    return useContext(MapContext)
}

export {MapProvider};
