import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected, metaMask, walletConnect, coinbaseWallet } from '@wagmi/connectors';
import { FC, ReactNode } from 'react';
import { WagmiProvider, createConfig } from 'wagmi';
import { http } from '@wagmi/core';
import { mainnet, sepolia } from '@wagmi/core/chains';

const projectId = 'test';
// const connectors: any = [injected(), metaMask(), walletConnect({ projectId }), coinbaseWallet()];
const connectors: any = [injected()];

// @ts-ignore
const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: connectors,
  transports: {
    [mainnet.id]: http(''),
    [sepolia.id]: http(''),
  },
});

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};
const Web3Provider: FC<Props> = ({ children }) => {
  return (
    <WagmiProvider
      // config={wagmiConfig({
      //   chains: [mainnet, sepolia],
      //   connectors: connectors,
      //   transports: {
      //     [mainnet.id]: http(''),
      //     [sepolia.id]: http(''),
      //   },
      // })}
      config={wagmiConfig}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
