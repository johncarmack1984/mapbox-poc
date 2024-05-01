import { env } from "@/env";

async function getMap() {
  const accessToken = env.MAPBOX_ACCESS_TOKEN;
  const tilesetId = "mapbox.mapbox-streets-v8";
  const lon = -93.1222;
  const lat = 44.9465;
  const radius = 25;
  const limit = 5;
  const res = await fetch(
    `https://api.mapbox.com/v4/${tilesetId}/tilequery/${lon},${lat}.json?radius=${radius}&limit=${limit}&dedupe&access_token=${accessToken}`
  );
  const data = await res.json();
  return data;
}

const Indent = ({ children }: any) => {
  return <div className="border-l-2 pl-2 ml-2">{children}</div>;
};

const H2 = ({ children }: any) => {
  return <h2 className="font-medium text-xl mb-1">{children}</h2>;
};

const H3 = ({ children }: any) => {
  return <h3 className="font-medium text-lg mb-0.5">{children}</h3>;
};

const Properties = ({ ...properties }: any) => {
  return (
    <Indent>
      <H3>Properties</H3>
      <ul>
        {Object.entries(properties).map(([key, value]: any) => (
          <li key={key}>
            <strong>{key}</strong>:{" "}
            <span className=" whitespace-break-spaces">
              {JSON.stringify(value, null, 2)}
            </span>
          </li>
        ))}
      </ul>
    </Indent>
  );
};

const Geometry = ({ type, coordinates }: any) => {
  return (
    <Indent>
      <H3>Geometry</H3>
      <Indent>
        {type}: {JSON.stringify(coordinates)}
      </Indent>
    </Indent>
  );
};

const Feature = ({ id, geometry, type, properties, ...feature }: any) => {
  return (
    <div key={id}>
      <H2>{type}</H2>
      {properties ? <Properties {...properties} /> : null}
      {geometry ? <Geometry {...geometry} /> : null}
    </div>
  );
};

const FeatureCollection = (featureCollection: any) => {
  return (
    <div>
      <H2>FeatureCollection</H2>
      <Indent>{featureCollection.features.map(Feature)}</Indent>
    </div>
  );
};

const UnsupportedComponent = (data: any) => {
  return <div>Unsupported component type: {data.type}</div>;
};

const componentMap = {
  FeatureCollection,
  Feature,
};

type ComponentMap = typeof componentMap;
type ComponentKey = keyof ComponentMap;

const MapComponent = (data: any) => {
  const Component =
    componentMap[data.type as ComponentKey] || UnsupportedComponent;
  return <Component {...data} />;
};

export default async function TileQuery() {
  const data = await getMap();
  return <MapComponent {...data} />;
}
