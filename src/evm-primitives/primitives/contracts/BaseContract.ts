import { Address, getAddress, isAddress } from "viem"
import { IChainClientService } from "../../../evm-chain-client/chain-client-service-interface"
import { createCustomError } from "../../../evm-utils/common"

export const BaseContractError = createCustomError("BaseContractError")

export abstract class BaseContract {
	public readonly address: Address

	constructor(
		public readonly chainClientService: IChainClientService,
		address: Address,
		public readonly chainId: number,
	) {
		this.validateAddress(address)
		this.address = getAddress(address)
	}

	private validateAddress(address: Address) {
		if (!isAddress(address)) {
			throw new BaseContractError(`Contract address is invalid ${address}`)
		}
	}

	get client(): ReturnType<IChainClientService["getClient"]> {
		return this.chainClientService.getClient(this.chainId)
	}

	get wallet(): ReturnType<IChainClientService["getWalletClient"]> {
		return this.chainClientService.getWalletClient(this.chainId)
	}

	get account() {
		return this.wallet.account
	}
}
