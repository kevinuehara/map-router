export interface GeocoderResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

export type SearchValueType = GeocoderResult | string | undefined;
