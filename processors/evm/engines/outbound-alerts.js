// src/processors/core-engines/outbound-alerts.js

export class OutboundAlerts {
    /**
     * Main Public Orchestrator Entry Point
     */
    async sendAlert(title, message, options = {}) {
        try {
            // Call the local Next.js API middleman instead of an external server
            const response = await fetch("/api/telemetry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: `${options.emoji || '📢'} ${title}`,
                    description: message,
                    level: options.level || 'info',
                    data: options.data || null
                })
            });

            return response.ok;
        } catch (err) {
            console.error("[Alerts] Telemetry route error:", err.message);
            return false;
        }
    }

    async success(title, message, data = null) {
        return this.sendAlert(title, message, { level: 'success', emoji: '✅', data });
    }

    async error(title, message, data = null) {
        return this.sendAlert(title, message, { level: 'error', emoji: '❌', data });
    }

    async warning(title, message, data = null) {
        return this.sendAlert(title, message, { level: 'warning', emoji: '⚠️', data });
    }

    async info(title, message, data = null) {
        return this.sendAlert(title, message, { level: 'info', emoji: 'ℹ️', data });
    }
}

export default OutboundAlerts;
