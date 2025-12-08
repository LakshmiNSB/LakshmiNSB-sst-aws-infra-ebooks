import { aws, Stack } from "sst";

export class ComputeStack {
    readonly stack: Stack;
    readonly helloWorld: aws.Function;

    constructor(stack: Stack) {
        this.stack = stack;
        
        // HelloWorld Lambda defination
        this.helloWorld = new aws.Function("HelloWrold", {
            runtime: "nodejs22.x",
            handler: "./src/functions/hello_world.handler",
            memory: "128 MB",
            timeout: "10 seconds",
            environment: {
                STAGE: stack.stage,
                REGION: stack.region
            }
        })

    }
    get helloWrold() { return this.helloWorld.url; }
}