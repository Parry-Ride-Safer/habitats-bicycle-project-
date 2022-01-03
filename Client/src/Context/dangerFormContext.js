import React, {createContext, useContext, useState} from "react";
  
  const DangerFormContext = createContext();
  
  const DangerFormProvider = ({ children }) => {
    
    const [dangerDescriptionInputs, setDangerDescriptionInputs] = useState([])
    const [isBoxDangerDetailsOpen, setIsBoxDangerDetailsOpen] = useState(false)
 
    
    const handleBoxDangerDetails = () => {
      setIsBoxDangerDetailsOpen(true)
    }

    const handleDangerDescriptionInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDangerDescriptionInputs(values=>({...values, [name]:value}))
    }

    return (
      <DangerFormContext.Provider
        value={{
            isBoxDangerDetailsOpen,
            dangerDescriptionInputs,
            handleDangerDescriptionInputs,
            handleBoxDangerDetails
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
