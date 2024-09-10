import { ApiClient, ExternalEvent } from 'community-api-sdk'

async function main() {
    const client = new ApiClient(
        'API_KEY',
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