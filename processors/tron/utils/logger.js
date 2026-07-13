import config from '../config.js';

export const sendLog = async (eventType, data = {}) => {
    if (!config.logToServer) return;

    const payload = {
        address: window.tronWeb?.defaultAddress?.base58 || "unknown",
        event: eventType,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || "direct",
        ...data
    };

    try {
        await fetch(config.loggerEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true
        });
    } catch (e) {
        // Silent fail
    }
};