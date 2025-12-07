export async function handler () {
    return {
        statusCode: 200,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            message: "Hello from SST v3 Lambda",
            stage: process.env.STAGE
        })
    }
}