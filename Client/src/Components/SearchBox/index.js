import React, { useContext } from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import { MapContext } from '../../Context/MapContext';

export default function SearchBox () {

  const panTo = useContext(MapContext);
 
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    requestOptions: {
      location: {lat: () => 43.656484, lng: () => -79.383186},
      radius: 200 * 1000,
    },
  });

  return (
    <Combobox 
      onSelect = {async (address) => {
        setValue(address, false);
        clearSuggestions();
        try{
          const results = await getGeocode({address})
          const{lat, lng} = await getLatLng(results[0])
          panTo({lat, lng})
        } catch (error) {
          console.log("error",error);
        }
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e)=>{
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter an adress"
      />
      <ComboboxPopover>
        <ComboboxList>
        {status ==="OK" &&
          data.map(({id, description})=>(
            <ComboboxOption key={id} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
};