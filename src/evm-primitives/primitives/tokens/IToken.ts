import { TokenId } from "../../../caip-id/value-objects/token-id"

export type IToken = {
	id: TokenId

	address: string

	formatUnits(amount: bigint): string
	parseUnits(amount: string | bigint): bigint
	toString(): string
} & TokenMetadata

export interface TokenMetadata {
	symbol: string
	name?: string
	decimals: number
}
