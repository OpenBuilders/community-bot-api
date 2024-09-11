# Community API SDK
This SDK provides simple interface for interacting with Community external API. It enables developers to seamlessly integrate service's features into their applications, allowing easy communication with API, participants retrieval and external events posting.
![Demo](/images/demo.avif)
## Installation
```bash
npm i community-api-sdk
```

## Usage
> **Requires unique API key - contact [@metaverserk](https://t.me/metaverserk) or [@chak_zefir](https://t.me/chak_zefir)**

### Get participant
Typescript code snippet [[Here]](/quickstart/get-participants.ts)
```ts
import { ApiClient } from 'community-api-sdk'

async function main() {
    const client = new ApiClient(
        'API_KEY',
    )
    
    const participantByTG       = await client.getParticipantByTG(BigInt(1))
    const participantByWallet   = await client.getParticipantByWallet("EQAt_V50zZzQW7hjFtqaj20ZPnN7fp4F5X_cKQWxkt_DMEl9")
    
    console.log(participantByTG.data, participantByWallet.data)
}

main().catch(console.error)
```

cURL example (with telegram ID)
```bash
curl -X GET https://api.joincommunity.xyz/external/participant/tg/1 \
-H "api-key: API_KEY" 
```
cURL example (with wallet address)
```bash
curl -X GET https://api.joincommunity.xyz/external/participant/wallet/EQAt_V50zZzQW7hjFtqaj20ZPnN7fp4F5X_cKQWxkt_DMEl9 \
-H "api-key: API_KEY" 
```

### Post events
Typescript code snippet [[Here]](/quickstart/post-event.ts)
```ts
import { ApiClient, ExternalEvent } from 'community-api-sdk'

async function main() {
    const client = new ApiClient(
        'API_KEY',
    )

    const events: ExternalEvent[] = [
        {
            slug: 'test',
            telegramId: BigInt(1),
            isDelete: true,
        },
    ]
    const response = await client.postEvent(events)
    
    console.log(response.data)
}

main().catch(console.error)
```
cURL example
```bash
curl -X POST https://api.joincommunity.xyz/external/events \
-H "api-key: API_KEY" \
-H "Content-Type: application/json" \
-d '[{"slug":"some-unique-slug","telegramId":1,"isDelete":true}]'
```

## API
> **Requires unique API key - contact [@metaverserk](https://t.me/metaverserk) or [@chak_zefir](https://t.me/chak_zefir)**

**Host:** `https://api.joincommunity.xyz`

### `/external/participant/tg/:id`
Retrieve participant by telegram ID  
**URI:** `https://api.joincommunity.xyz/external/participant/tg/:id`  
**Method:** `GET`  
**Headers:**
```json
{
    "api-key": "API_KEY"
}
```

### `/external/participant/wallet/:walletAddress`
Retrieve participant by wallet address  
**URI:** `https://api.joincommunity.xyz/external/participant/wallet/:walletAddress`  
**Method:** `GET`  
**Headers:**
```json
{
    "api-key": "API_KEY"
}
```

### `/external/events`
Post external events  
**URI:** `https://api.joincommunity.xyz/external/events`  
**Method:** `POST`  
**Headers:**
```json
{
    "Content-Type": "application/json",
    "api-key": "API_KEY"
}
```
**Body:**
```json
[
    {
        "slug": "example-slug-1",
        "telegramId": 1,
        "isDelete": true,
    },
    {
        "slug": "example-slug-2",
        "walletAddress": "EQAt_V50zZzQW7hjFtqaj20ZPnN7fp4F5X_cKQWxkt_DMEl9",
    },
]
```