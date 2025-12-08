/// <reference path="./.sst/platform/config.d.ts" />
  const { Stack } = await import("sst");

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
    // const lambda = new sst.aws.Function("HelloWorld", {
    //   runtime: "nodejs22.x",
    //   url: true,
    //   handler: "./src/index.handler"
    // });

    const { ComputeStack } = await import("./infra/stacks/ComputeStack");
    const { ApiStack } = await import("./infra/stacks/ApiStack");

      const compute = new ComputeStack(new Stack("ComputeStack"));

      const api = new ApiStack(new Stack("ApiStack"), {
        hello: compute.helloWrold,
      });

      compute.stack.addOutput({
        Fn_HelloWorld_URL: compute.helloWrold,
      });

      api.stack.addOutput({
        Api_HelloWorld_GET_URL: api.url
      });

  },
});
