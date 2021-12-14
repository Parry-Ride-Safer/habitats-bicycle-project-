import React, {createContext} from 'react';

mapContext = createContext();

const mapProvider = ({children}) => {

    return(
        <ItemContext.Provider>
        
        </ItemContext.Provider>
    )
}

export {mapContext, mapProvider};
