import { createCustomError } from "../../evm-utils/common"
import { ChainId, chainIdScheme } from "../value-objects/chain-id"

export const ChainIdError = createCustomError("ChainIdError")

export class ChainIdUtils {
	static parseId(chainId: ChainId): {
		namespace: string
		reference: string
	} {
		if (!this.isChainId(chainId)) {
			throw new ChainIdError(`Invalid chain id: ${chainId}`)
		}

		const [namespace, reference] = chainId.split(":")

		return { namespace: namespace!, reference: reference! }
	}

	static isChainId(chainId: string): chainId is ChainId {
		return chainIdScheme.safeParse(chainId).success
	}

	static generateId(namespace: string, reference: string): ChainId {
		return `${namespace}:${reference}`
	}
}
