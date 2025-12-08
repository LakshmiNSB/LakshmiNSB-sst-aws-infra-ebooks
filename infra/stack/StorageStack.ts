import { aws, Stack } from 'sst';

export class ApiStack {
    readonly stack: Stack;
    readonly api: aws.ApiGatewayV2;

    constructor(stack: Stack, props: any) {
        this.stack = stack;
        this.api = new aws.ApiGatewayV2("HttpApi", {});

        // Map routes to Lambda
        this.api.route('GET /hello', props.helloWorld);
    }

    get url() { return this.api.url }
}