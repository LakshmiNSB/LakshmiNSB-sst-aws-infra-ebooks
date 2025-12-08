/// <reference path="./.sst/platform/config.d.ts" />
import { Stack } from "sst";
import { Function } from "sst/aws";

export class ComputeStack {
    readonly stack: Stack;
    readonly helloWorld: Function;

    constructor(stack: Stack) {
        this.stack = stack;
        
        // HelloWorld Lambda defination
        this.helloWorld = new Function(stack, "HelloWrold", {
            runtime: "nodejs22.x",
            handler: "./src/functions/hello_world.handler",
            memory: "128 MB",
            environment: {
                STAGE: stack.stage,
                REGION: stack.region
            }
        })

    }
    // get helloWrold() { return this.helloWorld.url; }
}