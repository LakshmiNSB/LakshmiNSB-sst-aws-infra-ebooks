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
    const { ComputeStack } = await import("./infra/stack/ComputeStack");
    const { ApiStack } = await import("./infra/stack/ApiStack");

      const compute = new ComputeStack(new Stack("ComputeStack"));

      const api = new ApiStack(new Stack("ApiStack"), {
        hello: compute.helloWorld,
      });

      compute.stack.addOutput({
        Fn_HelloWorld_URL: compute.helloWorld.url,
      });

      api.stack.addOutput({
        Api_HelloWorld_GET_URL: api.url
      });

  },
});
