import React, {createContext, useContext, useState} from "react";
  
  const DangerFormContext = createContext();
  
  const DangerFormProvider = ({ children }) => {
    
    const [dangerTitle, setDangerTitle] = useState("")
  
    return (
      <DangerFormContext.Provider
        value={{
            dangerTitle,
            setDangerTitle
        }}
      >
        {children}
      </DangerFormContext.Provider>
    );
  };
  
  export const useGlobalDangerContext = () => {
    return useContext(DangerFormContext);
  };
  
  export { DangerFormProvider };
