// processors/solana/utils/rpc.ts
import { Connection } from '@solana/web3.js';
import SOLANA_CONFIG from '../config';

let currentConnection: Connection | null = null;
let currentRpcIndex = 0;

export function getBestConnection(): Connection {
    if (currentConnection) return currentConnection;

    const rpc = SOLANA_CONFIG.rpcEndpoints[currentRpcIndex];
    currentConnection = new Connection(rpc, {
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 45000,
    });

    console.log(`[RPC] Using: ${rpc}`);
    return currentConnection;
}

export async function switchRpc() {
    currentRpcIndex = (currentRpcIndex + 1) % SOLANA_CONFIG.rpcEndpoints.length;
    currentConnection = null;
    console.log(`[RPC] Switched to backup RPC #${currentRpcIndex}`);
    return getBestConnection();
}

// Test RPC health
export async function testRpcHealth(connection: Connection): Promise<boolean> {
    try {
        await connection.getSlot();
        return true;
    } catch {
        return false;
    }
}