/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "mapbox-poc",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: { aws: true },
    };
  },
  async run() {
    const { getDomain } = await import("./src/lib/domain");

    new sst.aws.Nextjs("MyWeb", {
      domain: getDomain($app.stage),
    });
  },
});
