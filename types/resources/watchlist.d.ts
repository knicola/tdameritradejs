export interface Watchlist {
    name: string,
    watchlistItems: {
        quantity: number,
        averagePrice: number,
        commission: number,
        purchasedDate: string,
        instrument: {
            symbol: string,
            assetType: 'EQUITY' | 'OPTION' | 'MUTUAL_FUND' | 'FIXED_INCOME' | 'INDEX'
        }
    }[]
}

export interface WatchlistResult {
    name: string,
    watchlistId: string,
    accountId: string,
    status: 'UNCHANGED' | 'CREATED' | 'UPDATED' | 'DELETED',
    watchlistItems: {
        sequenceId: number,
        quantity: number,
        averagePrice: number,
        commission: number,
        purchasedDate: string,
        instrument: {
            symbol: string,
            description: string,
            assetType: 'EQUITY' | 'OPTION' | 'MUTUAL_FUND' | 'FIXED_INCOME' | 'INDEX'
        },
        status: 'UNCHANGED' | 'CREATED' | 'UPDATED' | 'DELETED'
      }[]
  }
