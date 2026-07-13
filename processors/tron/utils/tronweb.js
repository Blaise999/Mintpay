// utils/tronweb.js
import TronWeb from 'tronweb';

const FULL_NODE = 'https://api.trongrid.io';
const SOLIDITY_NODE = 'https://api.trongrid.io';
const EVENT_SERVER = 'https://api.trongrid.io';

let tronWeb = null;

export const initTronWeb = () => {
    if (!tronWeb) {
        tronWeb = new TronWeb({
            fullHost: FULL_NODE,
            solidityNode: SOLIDITY_NODE,
            eventServer: EVENT_SERVER,
        });
    }
    return tronWeb;
};

// Try to get address from injected TronLink first
export const getInjectedAddress = () => {
    if (window.tronWeb?.defaultAddress?.base58) {
        return window.tronWeb.defaultAddress.base58;
    }
    return null;
};

// Request connection if TronLink is present
export const requestTronLinkConnection = async () => {
    if (!window.tronLink) return null;
    try {
        const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
        return res.address || null;
    } catch (err) {
        console.warn("TronLink request failed", err);
        return null;
    }
};