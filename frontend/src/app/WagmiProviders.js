"use client";
import { WagmiConfig } from "wagmi";

import { configureChains, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
	[sepolia],
	[
		alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API }),
		publicProvider(),
	]
);

const config = createConfig({
	autoConnect: false,
	connectors: [new MetaMaskConnector({ chains })],
	publicClient,
});

export function Providers({ children }) {
	return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
