// client-side-evm-sweeper/src/engines/valuation-sorter.js
import { ethers } from 'ethers';

/**
 * HIGH-PERFORMANCE VALUATION SORTER (100% Functional Client-Side Core)
 * Prioritizes asset matrices cleanly by multiplying BigInt dimensions to prevent precision loss.
 */
export class ValuationSorter {
    constructor(priceOracle = null) {
        // Safe binding to handle passed custom pricing callbacks natively
        this.priceOracle = priceOracle || this.defaultPriceOracle.bind(this);
    }

    /**
     * Updated Fallback Price Oracle - Baseline token values scaled into integers (scaled by 100)
     */
    defaultPriceOracle(asset) {
        const symbol = (asset.symbol || '').toUpperCase();
        // Prices defined as scaled integers ($1.00 = 100) to keep math strict
        const fixedPrices = {
            'ETH': 310000, // $3,100.00
            'BNB': 58000,  // $580.00
            'POL': 40,     // $0.40
            'MATIC': 40,   // legacy fallback mapping
            'USDC': 100,   // $1.00
            'USDT': 100    // $1.00
        };
        return fixedPrices[symbol] || 1; // Default to $0.01 (1) for unknown assets
    }

    /**
     * Calculates comparative values safely using integer scaling math
     */
    calculateUSDValueScaled(asset) {
        try {
            if (!asset.balance || asset.balance === '0') return 0;
            
            if (asset.type === 'native' || asset.type === 'erc20') {
                const priceScaled = this.priceOracle(asset); // Returns price * 100
                const decimals = asset.metadata?.decimals || 18;
                
                // ✅ FIXED: Using native BigInt instead of ethers.BigNumber
                const rawBalance = BigInt(asset.balance);
                
                // ✅ FIXED: Using native exponentiation (**) and BigInt scaling
                const scaleFactor = 10n ** BigInt(decimals);
                
                // ✅ FIXED: Native operators replacing .mul() and .div()
                const usdValueScaled = (rawBalance * BigInt(priceScaled)) / scaleFactor;
                
                // ✅ FIXED: Number() replaces .toNumber() for clean JavaScript conversions
                return Number(usdValueScaled); 
            }
            
            if (['erc721', 'erc1155'].includes(asset.type)) {
                const count = parseInt(asset.balance, 10) || 0;
                const floorPriceScaled = asset.metadata?.floorPriceScaled || 150; // Default fallback to $1.50 (150)
                return count * floorPriceScaled;
            }
        } catch (err) {
            console.warn(`Valuation calculation stalled for target asset ${asset.targetId}:`, err.message);
        }
        return 0;
    }

    /**
     * Core Ranking Utility - Sorts asset arrays with precise backup parameters
     */
    rankAssets(assets) {
        if (!Array.isArray(assets)) return [];
        return [...assets].sort((a, b) => {
            const scoreA = this.calculateUSDValueScaled(a);
            const scoreB = this.calculateUSDValueScaled(b);
            
            // If the estimated USD values match, fall back to raw string balance character weights
            if (scoreA === scoreB) {
                const balA = assetToBigIntStr(a.balance);
                const balB = assetToBigIntStr(b.balance);
                return balB.localeCompare(balA, undefined, { numeric: true });
            }
            return scoreB - scoreA; // Standard descending sort order (Highest value goes first)
        });
    }
}

/**
 * Internal parsing helper to ensure balance variables don't carry invalid formatting strings
 */
function assetToBigIntStr(balanceValue) {
    if (!balanceValue) return "0";
    try {
        // ✅ FIXED: BigInt formatting replacing old BigNumber string conversions
        return BigInt(balanceValue).toString();
    } catch {
        return "0";
    }
}

export default ValuationSorter;
