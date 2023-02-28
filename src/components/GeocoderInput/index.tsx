import { GeocoderResult } from "../types";
import { pinIcon } from "../icons";

interface GeocoderInputProps {
  placeholder?: string;
  results: GeocoderResult[];
  value?: GeocoderResult;
  onSelect: (value: GeocoderResult) => void;
  onSearch: (event: any) => void;
}

export const GeocoderInput = ({
  placeholder,
  onSearch,
  results,
  onSelect,
  value,
}: GeocoderInputProps) => {
  return (
    <div className="z-10 relative w-1/3">
      <input
        type="search"
        name="geocoder"
        placeholder={placeholder}
        onChange={onSearch}
        className="w-full p-2 mt-1"
        value={value ? value.display_name : ""}
      />
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
