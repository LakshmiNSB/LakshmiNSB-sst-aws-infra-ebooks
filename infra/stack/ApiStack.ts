import { Stack } from 'sst';
import { Api } from "sst/aws";

export class ApiStack {
    readonly stack: Stack;
    readonly api: Api;

    constructor(stack: Stack, props: any) {
        this.stack = stack;
        this.api = new Api(stack, "HttpApi", {});

        // Map routes to Lambda
        this.api.route('GET /hello', props.helloWorld);
    }

    get url() { return this.api.url }
}