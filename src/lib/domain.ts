import { BRANCH, COMMIT_SHA } from "./git";

function getDomain(stage: string) {
  const isProd = stage === "production";

  const production = "mapbox.johncarmack.com";
  const preview = `${stage}.${production}`;
  const branch = `${BRANCH}.${production}`;
  const commit = `${BRANCH}-${COMMIT_SHA.slice(0, 8)}.${production}`;

  return {
    name: isProd ? production : preview,
    aliases: [branch, commit],
  };
}

export { getDomain };
