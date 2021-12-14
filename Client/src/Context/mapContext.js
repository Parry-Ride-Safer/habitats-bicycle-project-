import React, {createContext, useCallback, useRef} from 'react';

const MapContext = createContext();

const MapProvider = ({children}) => {

    const mapRef = useRef();
    const onMapLoad = useCallback ((map)=> {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({ lat, lng});
    mapRef.current.setZoom(14);
    }, []); 

    return(
        <MapContext.Provider value={{panTo:panTo}}>
            {children}
        </MapContext.Provider>
    )
}

export {MapContext, MapProvider};
