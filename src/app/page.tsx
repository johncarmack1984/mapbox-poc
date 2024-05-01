import { env } from "@/env";
import { notFound } from "next/navigation";

const getX = (lon: number, n: number) => Math.round((n * (lon + 180)) / 360);
const getY = (lat: number, n: number) =>
  Math.round(
    (n *
      (1 -
        Math.log(
          Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
        ) /
          Math.PI)) /
      2
  );

async function getMapTiles() {
  const accessToken = env.MAPBOX_ACCESS_TOKEN;
  const tilesetId = "mapbox.mapbox-streets-v8";
  const lon = -93.1222;
  const lat = 44.9465;
  const zoom = 14;
  const n = 2 ** zoom;
  const x = getX(lon, n);
  const y = getY(lat, n);
  const radius = 25;
  const limit = 5;
  const format = "mvt";
  const query = `https://api.mapbox.com/v4/${tilesetId}/${zoom}/${x}/${y}.${format}?access_token=${accessToken}`;
  console.log("query", query);
  const exampleQuery = `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/14/4823/6160.mvt?access_token=${accessToken}`;
  console.log("2uery", exampleQuery);
  const res = await fetch(query);
  if (!res) notFound();
  return res.json();
}

export default async function Page() {
  const tiles = await getMapTiles();
  return <>{JSON.stringify(tiles, null, 2)}</>;
}
