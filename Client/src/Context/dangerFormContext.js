import React, {createContext, useContext, useState} from "react";
  
  const DangerFormContext = createContext();
  
  const DangerFormProvider = ({ children }) => {
    
    const [dangerDescriptionInputs, setDangerDescriptionInputs] = useState([])
    
    const handleDangerDescriptionInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDangerDescriptionInputs(values=>({...values, [name]:value}))
    }
    

    return (
      <DangerFormContext.Provider
        value={{
            dangerDescriptionInputs,
            handleDangerDescriptionInputs
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
