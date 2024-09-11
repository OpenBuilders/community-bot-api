import axios from 'axios'

export interface ExternalEvent {
    slug:           string, // Event slug
    telegramId?:    string, // Telegram ID to identify user or wallet address
    walletAddress?: string, // e.g: EQAt_V50zZzQW7hjFtqaj20ZPnN7fp4F5X_cKQWxkt_DMEl9
    isDelete?:      boolean // If task should be deleted
}

export interface ExternalEventResponse {
    ok: boolean,
    data: [
        {
            success:    ExternalEvent[], // Events successfully pushed
            failed:     ExternalEvent[], // Events that have not passed validation (telegramId || walletAddress)
        }
    ]
}

export interface ExternalParticipant {
    internalId:         number,     // Community user ID,
    registeredAt:       string,     // Date when user registered in event
    telegramId:         string,     // Telegram ID
    friendlyAddress:    string,     // User-friendly address
    isCompleted:        boolean,    // Is challenge completed by user
}

export interface ExternalParticipantResponse {
    ok: boolean,
	data: {
        total:          number,
        offset:         number,
        limit:          number,
        participants:   ExternalParticipant[],
	}
}


export class ApiClient {
    private apiKey: string;

    private static readonly API_URL                 = 'https://api.joincommunity.xyz/external'
    private static readonly API_EVENTS              = '/events'
    private static readonly API_PARTICIPANT_TG      = '/participant/tg'
    private static readonly API_PARTICIPANT_WALLET  = '/participant/wallet'

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async postEvent(eventData: ExternalEvent[]): Promise<ExternalEventResponse> {
        try {
            const response = await axios.post<ExternalEventResponse>(
                `${ApiClient.API_URL}${ApiClient.API_EVENTS}`,
                eventData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': this.apiKey,
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.log('Request failed:', error);
            throw error
        }
    }

    async getParticipantByTG(telegramId: string) {
        try {
            const response = await axios.get<ExternalParticipantResponse>(
                `${ApiClient.API_URL}${ApiClient.API_PARTICIPANT_TG}/${telegramId}`,
                {
                    headers: {
                        'api-key': this.apiKey,
                    }
                }
            )
            return response.data;
        } catch (error) {
            console.log('Request failed:', error);
            throw error
        }
    }

    async getParticipantByWallet(wallet: string) {
        try {
            const response = await axios.get<ExternalParticipantResponse>(
                `${ApiClient.API_URL}${ApiClient.API_PARTICIPANT_WALLET}/${wallet}`,
                {
                    headers: {
                        'api-key': this.apiKey,
                    }
                }
            )
            return response.data;
        } catch (error) {
            console.log('Request failed:', error);
            throw error
        }
    }
}