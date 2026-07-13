// hooks/useBaseNetworkEnforcer.ts
import { useEffect } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { base, lisk, celo } from 'wagmi/chains';
import { toast } from 'sonner';
import { CONTRACTS } from '@/config/contract';

const SUPPORTED_CHAINS = [base.id, lisk.id, celo.id] as const;

export function useBaseNetworkEnforcer() {
  const { isConnected, address } = useAccount();
  const currentChainId = useChainId();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();

  const isOnSupportedChain = (SUPPORTED_CHAINS as readonly number[]).includes(currentChainId);
  const isOnBaseChain = currentChainId === base.id;

  const getCurrentChain = () => {
    const c = Object.values(CONTRACTS).find((x) => x.chainId === currentChainId);
    return c ? { name: c.name, id: c.chainId, contractAddress: c.address, explorer: c.explorer } : null;
  };
  const currentChain = getCurrentChain();

  useEffect(() => {
    if (isConnected && address && !isOnSupportedChain && !isSwitchingChain) {
      toast.warning('Please switch to a supported network (Base, Lisk, or Celo).', { id: 'switch-chain', duration: 8000 });
    }
    if (!isConnected) toast.dismiss('switch-chain');
  }, [isConnected, address, isOnSupportedChain, isSwitchingChain]);

  const promptSwitchToBase = () => {
    if (!address) { toast.error('No wallet found. Please connect a wallet.'); return false; }
    if (!isOnBaseChain && !isSwitchingChain) {
      toast.info('Switching to Base network...', { id: 'switch-chain-manual' });
      switchChain({ chainId: base.id });
      return false;
    }
    return isOnBaseChain;
  };

  return { isOnBaseChain, isOnSupportedChain, currentChain, isSwitchingChain, promptSwitchToBase, supportedChains: ['Base', 'Lisk', 'Celo'] };
}
