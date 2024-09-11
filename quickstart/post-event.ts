import { ApiClient, ExternalEvent } from 'community-bot-api'

async function main() {
    const client = new ApiClient(
        'API_KEY',
    )

    const events: ExternalEvent[] = [
        {
            slug:       'test-1',   // Event slug
            telegramId: BigInt(1),  // Telegram ID to identify user or wallet address
            isDelete:   true,       // If task should be deleted
        },
        {
            slug:           'test-2',                                           // Event slug
            walletAddress:  "EQAt_V50zZzQW7hjFtqaj20ZPnN7fp4F5X_cKQWxkt_DMEl9", // e.g: EQAt_V50zZzQW7hjFtqaj20ZPnN7fp4F5X_cKQWxkt_DMEl9
        }
    ]
    const response = await client.postEvent(events)
    
    console.log(response.data)
}

main().catch(console.error)