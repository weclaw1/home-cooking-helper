import configureMeasurements, {
  volume,
  VolumeSystems,
  VolumeUnits,
  mass,
  MassSystems,
  MassUnits,
  pieces,
  PiecesSystems,
  PiecesUnits,
} from "convert-units";

// Measures: The names of the measures being used
type Measures = "mass" | "volume" | "pieces";
// Systems: The systems being used across all measures
type Systems = MassSystems | VolumeSystems | PiecesSystems;
// Units: All the units across all measures and their systems
export type Units = MassUnits | VolumeUnits | PiecesUnits;

export const convert = configureMeasurements<Measures, Systems, Units>({
  mass,
  volume,
  pieces,
});
