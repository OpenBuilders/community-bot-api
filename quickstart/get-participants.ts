import { ApiClient } from 'community-bot-api'

async function main() {
    const client = new ApiClient(
        'API_KEY',
    )
    
    const participantByTG       = await client.getParticipantByTG(BigInt(1))
    const participantByWallet   = await client.getParticipantByWallet("EQAt_V50zZzQW7hjFtqaj20ZPnN7fp4F5X_cKQWxkt_DMEl9")
    
    console.log(participantByTG.data, participantByWallet.data)
}

main().catch(console.error)