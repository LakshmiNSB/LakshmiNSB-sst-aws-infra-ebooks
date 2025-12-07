/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "lakshminsb-sst-aws-infra-ebooks",
      region: "ap-southeast-1",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const lambda = new sst.aws.Function("HelloWorld", {
      runtime: "nodejs22.x",
      url: true,
      handler: "./src/index.handler"
    });
  },
});
