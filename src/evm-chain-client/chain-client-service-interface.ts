import { Chain, FallbackTransport, LocalAccount, PublicClient, WalletClient } from "viem"

export interface IChainClientService {
	// constructor(private readonly config: ChainClientConfigService) {}

	getWalletClient(chainId: number): WalletClient<FallbackTransport, Chain, LocalAccount, undefined>

	/**
	 * Creates new client for passed chainId, or retrieves instance if it already exists
	 * @param chainId
	 * @returns PublicClient
	 * @dev If custom rpc url is set, it will be used ONCE the client is created
	 */
	getClient(chainId: number): PublicClient<FallbackTransport, Chain, undefined, undefined>

	getTransport(chainId: number): FallbackTransport

	getChain(chainId: number): Chain

	findChainById(chainId: number): Chain

	findChainByName(chainName: string): Chain

	clearClients(): void

	getChainNameById(id: number): string
}
