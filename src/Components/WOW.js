"use client";

import { useEffect } from "react";

export default function WowInit() {
    useEffect(() => {
        const initWOW = async () => {
            const WOWModule = await import("wowjs");

            const WOW = WOWModule.default || WOWModule.WOW;

            if (typeof WOW === "function") {
                new WOW().init();
            }
        };

        initWOW();
    }, []);

    return null;
}