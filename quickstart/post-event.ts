import { ApiClient, ExternalEvent } from '../src/main'

async function main() {
    const client = new ApiClient(
        'api-key',
    )

    const events: ExternalEvent[] = [
        {
            slug: 'test',
            telegramId: BigInt(1),
        },
    ]
    const response = await client.postEvent(events)
    
    console.log(response.data)
}

main().catch(console.error)