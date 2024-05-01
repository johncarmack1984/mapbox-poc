import { useState } from "react";

const tilesets = [
  {
    id: "mapbox.mapbox-streets-v8",
    name: "Mapbox Streets",
  },
  {
    id: "mapbox.mapbox-satellite-v9",
    name: "Mapbox Satellite",
  },
  {
    id: "mapbox.mapbox-terrain-v2",
    name: "Mapbox Terrain",
  },
];

function TilesetOption(option: any) {
  return (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  );
}

function TilesetSelect() {
  const [tilesetId, setTilesetId] = useState("mapbox.mapbox-streets-v8");
  return (
    <div>
      <label htmlFor="tileset">Tileset</label>
      <select id="tileset" value={tilesetId}>
        {tilesets.map(TilesetOption)}
      </select>
    </div>
  );
}

export default TilesetSelect;
