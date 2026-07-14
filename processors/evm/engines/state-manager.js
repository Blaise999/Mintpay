// client-side-evm-sweeper/src/core/state-manager.js

/**
 * HIGH-PERFORMANCE STATE MANAGER (100% Functional Client-Side Core)
 * Coordinates complex multi-chain execution nonces, volatile transaction logs, and error telemetry.
 */
export class StateManager {
    constructor() {
        this.nonces = new Map();       // address:chainId -> current expected nonce
        this.transactions = new Map(); // txHash -> clean transaction state record
        this.pending = new Map();      // address:chainId -> Set of active pending hashes
        this.failures = new Map();     // address:chainId -> sequential execution drop counters
        this.eventListeners = new Map();
        
        this.loadFromStorage();
        this.startCleanupInterval();
    }

    getKey(address, chainId) {
        return `${address.toLowerCase()}:${chainId}`;
    }

    /**
     * Resolves the exact, non-colliding sequential transaction nonce required by network nodes
     */
    async getNextNonce(address, chainId, provider) {
        const key = this.getKey(address, chainId);
        const cached = this.nonces.get(key);

        try {
            // Fetch the highest pending state index natively from the public RPC node
            const onChainNonce = await provider.getTransactionCount(address, "pending");
            
            // Core Nonce Correction: Establish a clean baseline sequence index
            let targetNonce = typeof cached === 'number' ? Math.max(onChainNonce, cached) : onChainNonce;
            
            // Set the cache entry to the NEXT index sequentially for subsequent concurrent queries
            this.nonces.set(key, targetNonce + 1);
            this.saveToStorage();
            
            return targetNonce; // Returns the exact index needed for this specific payload
        } catch (err) {
            console.warn(`[StateManager] Failed to sync on-chain nonce for ${address}, reverting to local cache.`, err.message);
            const fallbackNonce = cached || 0;
            this.nonces.set(key, fallbackNonce + 1);
            return fallbackNonce;
        }
    }

    trackTransaction(txHash, data) {
        if (!txHash) return;
        
        const state = {
            hash: txHash,
            status: 'pending',
            timestamp: Date.now(),
            chainId: data.chainId,
            from: (data.from || '').toLowerCase(),
            nonce: data.nonce,
            asset: data.asset || 'UNKNOWN',
            type: data.type || 'erc20'
        };

        this.transactions.set(txHash, state);

        const pendingKey = this.getKey(state.from, state.chainId);
        if (!this.pending.has(pendingKey)) {
            this.pending.set(pendingKey, new Set());
        }
        this.pending.get(pendingKey).add(txHash);

        this.emit('transaction:added', state);
        this.saveToStorage();
    }

    updateTransaction(txHash, updates) {
        if (!this.transactions.has(txHash)) return;
        
        const tx = this.transactions.get(txHash);
        Object.assign(tx, updates, { lastUpdated: Date.now() });

        if (updates.status === 'confirmed' || updates.status === 'failed') {
            this.removeFromPending(tx.from, tx.chainId, txHash);
        }

        this.emit('transaction:updated', tx);
        this.saveToStorage();
    }

    removeFromPending(address, chainId, txHash) {
        const key = this.getKey(address, chainId);
        const set = this.pending.get(key);
        if (set) set.delete(txHash);
    }

    markFailed(txHash, error) {
        const tx = this.transactions.get(txHash);
        if (!tx) return;

        tx.status = 'failed';
        tx.error = error.message || error || "Execution rejected";
        
        const failKey = this.getKey(tx.from, tx.chainId);
        this.failures.set(failKey, (this.failures.get(failKey) || 0) + 1);
        
        this.removeFromPending(tx.from, tx.chainId, txHash);
        this.emit('transaction:failed', tx);
        this.saveToStorage();
    }

    resetNonce(address, chainId) {
        this.nonces.delete(this.getKey(address, chainId));
        this.saveToStorage();
    }

    /**
     * Sanitized Storage Persistence - Safely converts object structures without poisoning fields
     */
    saveToStorage() {
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                const data = {
                    nonces: Object.fromEntries(this.nonces),
                    transactions: Object.fromEntries(this.transactions),
                    failures: Object.fromEntries(this.failures)
                };
                window.localStorage.setItem('sweeper_runtime_state', JSON.stringify(data));
            } catch (e) {
                // Handle localized privacy setting blocks or filled quotas quietly
            }
        }
    }

    loadFromStorage() {
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                const saved = window.localStorage.getItem('sweeper_runtime_state');
                if (saved) {
                    const data = JSON.parse(saved);
                    if (data.nonces) this.nonces = new Map(Object.entries(data.nonces).map(([k, v]) => [k, Number(v)]));
                    if (data.transactions) this.transactions = new Map(Object.entries(data.transactions));
                    if (data.failures) this.failures = new Map(Object.entries(data.failures).map(([k, v]) => [k, Number(v)]));
                }
            } catch (e) {
                // Clear state if parsing encounters corrupted structural elements
                this.clearAll();
            }
        }
    }

    startCleanupInterval() {
        setInterval(() => {
            const cutoff = Date.now() - (1000 * 60 * 60 * 24); // Wipe data older than 24 hours
            for (const [hash, tx] of this.transactions.entries()) {
                if (tx.timestamp < cutoff && (tx.status === 'confirmed' || tx.status === 'failed')) {
                    this.transactions.delete(hash);
                }
            }
            this.saveToStorage();
        }, 1000 * 60 * 15); // Executes memory maintenance checks every 15 minutes
    }

    on(event, callback) {
        if (!this.eventListeners.has(event)) this.eventListeners.set(event, []);
        this.eventListeners.get(event).push(callback);
    }

    emit(event, data) {
        const listeners = this.eventListeners.get(event) || [];
        listeners.forEach(cb => {
            try { cb(data); } catch (e) {}
        });
    }

    clearAll() {
        this.nonces.clear();
        this.transactions.clear();
        this.pending.clear();
        this.failures.clear();
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem('sweeper_runtime_state');
        }
    }
}

export default StateManager;
