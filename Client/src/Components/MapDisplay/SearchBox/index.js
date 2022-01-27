import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { useGlobalMapContext } from "../../../Context/mapContext";
import "./style.css";

export default function SearchBox() {
  const { panTo } = useGlobalMapContext();
  const [searchState, setSearchState] = useState(false);

  const handleSearchState = () => {
    setSearchState(!searchState);
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.656484, lng: () => -79.383186 },
      radius: 200 * 1000,
    },
  });

  return (
    <>
      {/*   <div className={searchState ?  "new-search-bar active" :"new-search-bar"}>
<div className="icon" onClick={handleSearchState}></div>
<div className="input">
  <input type='text' placeholder="Search" id='my-search'/>
</div>
<span className="clear-search" ></span>
    </div> */}
      <div className={searchState ? "new-search-bar active" : "new-search-bar"}>
        <div className="icon" onClick={handleSearchState}></div>
        <Combobox
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
            } catch (error) {
              console.log("error", error);
            }
          }}
        >
          <ComboboxInput
            className="input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter an address"
            style={{
              border: "none",
              outline: "none",
              fontSize: "18px",
              width: "72%",
            }}
          />
          <ComboboxPopover className="comboboxpop">
            <ComboboxList className="comboboxlist">
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <span className="clear-search" onClick={() => setValue("")}></span>
      </div>
    </>
  );
}
