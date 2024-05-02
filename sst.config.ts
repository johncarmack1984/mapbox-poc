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
    new sst.aws.Nextjs("MyWeb", {
      domain: "mapbox.johncarmack.com",
    });
  },
});
