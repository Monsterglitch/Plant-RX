import React, { useContext, useState, useEffect } from "react";

const Context = React.createContext();

export function ContextProvider({ children }) {
  const [state, setState] = useState(false);
  const [name, setName] = useState("");

  function setOptions(name){
    setName(name);
    setState(true);
  }

  function closeCamera(){
    setName("");
    setState(false);
  }

  const value = {
    state,
    name,
    setOptions,
    closeCamera,
    // language
  };

  const loadGoogleTranslate = () =>{
    new google.translate.TranslateElement({
      pageLanguage: 'en', 
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, "google-translator");
  }

  useEffect(()=>{
    loadGoogleTranslate();
  })


  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
  
}

export const useContent = () =>{
    return useContext(Context);
}