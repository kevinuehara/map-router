import { useCallback, useState } from "react";
import { GeocoderResult } from "../types";
import { GeocoderInput } from "../GeocoderInput";
import { GeocoderService } from "../../services/GeocoderService";
import debounce from "lodash.debounce";

interface GeocoderFormProps {
  onOriginSelectEvent: (value?: GeocoderResult) => void;
  onDestinySelectEvent: (value?: GeocoderResult) => void;
}

export const GeocoderForm = ({
  onOriginSelectEvent,
  onDestinySelectEvent,
}: GeocoderFormProps) => {
  const [originResults, setOriginResults] = useState<GeocoderResult[]>([]);
  const [destinyResults, setDestinyResults] = useState<GeocoderResult[]>([]);

  const [originValue, setOriginValue] = useState<string | GeocoderResult>();
  const [destinyValue, setDestinyValue] = useState<string | GeocoderResult>();

  const onSearchOrigin = async (value: string) => {
    setOriginValue(value);
    if (value) {
      const results = await GeocoderService.getResults(value);
      setOriginResults(results);
    } else {
      onOriginSelectEvent(undefined);
    }
  };

  const onOriginSelect = (value: GeocoderResult) => {
    onOriginSelectEvent(value);
    setOriginValue(value);
    setOriginResults([]);
  };

  const onSearchDestiny = async (value: string) => {
    setDestinyValue(value);
    if (value) {
      const results = await GeocoderService.getResults(value);
      setDestinyResults(results);
    } else {
      onDestinySelectEvent(undefined);
    }
  };

  const onDestinySelect = (value: GeocoderResult) => {
    onDestinySelectEvent(value);
    setDestinyValue(value);
    setDestinyResults([]);
  };

  return (
    <div className="m-2 md:w-1/3">
      <GeocoderInput
        onSearch={onSearchOrigin}
        placeholder="Digite a origem"
        valueSelectedOnAutoComplete={originValue}
        onSelect={onOriginSelect}
        results={originResults}
      />

      <GeocoderInput
        onSearch={onSearchDestiny}
        placeholder="Digite o destino"
        valueSelectedOnAutoComplete={destinyValue}
        onSelect={onDestinySelect}
        results={destinyResults}
      />
    </div>
  );
};
