import { createCustomError } from "../../evm-utils/common"
import { ChainId } from "../value-objects/chain-id"
import { TokenId, tokenIdScheme } from "../value-objects/token-id"

export const TokenIdError = createCustomError("TokenIdError")

export class TokenIdUtils {
	static parseId(tokenId: TokenId): {
		chainId: ChainId
		address: string
	} {
		const tokenIdChecked = tokenIdScheme.parse(tokenId)

		const [namespace, reference, address] = tokenIdChecked.split(":")

		if (namespace === undefined || reference === undefined || address === undefined) {
			throw new TokenIdError(`Invalid token id: ${tokenId}`)
		}

		return { chainId: `${namespace}:${reference}`, address }
	}

	static generateId(chainId: ChainId, address: string): TokenId {
		return `${chainId}:${address}`
	}
}
