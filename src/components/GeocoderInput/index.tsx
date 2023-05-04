import { GeocoderResult, SearchValueType } from "../types";
import { pinIcon, searchIcon } from "../icons";
import { useState } from "react";

interface GeocoderInputProps {
  placeholder?: string;
  results: GeocoderResult[];
  valueSelectedOnAutoComplete?: GeocoderResult | string;
  onSelect: (value: GeocoderResult) => void;
  onSearch: (event: any) => void;
}

export const GeocoderInput = ({
  placeholder,
  onSearch,
  results,
  onSelect,
  valueSelectedOnAutoComplete,
}: GeocoderInputProps) => {
  const [searchValue, setSearchValue] = useState("");

  const getValueToDisplayOnInput = (
    valueSelectedOnAutoComplete: SearchValueType
  ) => {
    const valueSelectedType: GeocoderResult =
      valueSelectedOnAutoComplete as GeocoderResult;

    if (!valueSelectedOnAutoComplete && !searchValue) {
      return "";
    }

    return valueSelectedType ? valueSelectedType.display_name : searchValue;
  };

  return (
    <div className="z-10 relative w-full">
      <div className="flex">
        <input
          type="search"
          name="geocoder"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="p-2 mt-1 w-full"
          onReset={() => setSearchValue("")}
          value={getValueToDisplayOnInput(valueSelectedOnAutoComplete)}
        />
        <button
          onClick={() => onSearch(searchValue)}
          className={`flex justify-center items-center 
            m-2 py-2 px-4 rounded bg-white hover:bg-gray-100
          `}
        >
          {searchIcon()}
        </button>
      </div>

      <div className="flex flex-col">
        {results.map((result) => (
          <div
            key={result.place_id}
            className="flex items-center text-gray-800 bg-white hover:bg-gray-200 hover:cursor-pointer"
            onClick={() => onSelect(result)}
          >
            <div className="mr-2">{pinIcon()}</div>
            {result.display_name}
          </div>
        ))}
      </div>
    </div>
  );
};
