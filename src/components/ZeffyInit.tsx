"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ZeffyInit() {
    const pathname = usePathname();
    type ZeffyAPI = { init?: () => void };

    useEffect(() => {
        // Ensure script exists
        const scriptSrc = 'https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js';
        const existing = document.querySelector(`script[src="${scriptSrc}"]`);
        if (!existing) {
            const s = document.createElement('script');
            s.src = scriptSrc;
            s.onload = () => (window as Window & { Zeffy?: ZeffyAPI }).Zeffy?.init?.();
            document.head.appendChild(s);
        }

        // Try immediate init and a short, fast retry window
        const tryInit = () => (window as Window & { Zeffy?: ZeffyAPI }).Zeffy?.init?.();
        tryInit();
        const t1 = setTimeout(tryInit, 100);
        const t2 = setTimeout(tryInit, 250);
        const t3 = setTimeout(tryInit, 500);

        // When clicking any trigger, run init first for instant modal
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const el = target.closest('[zeffy-form-link]') as HTMLElement | null;
            if (el) {
                (window as Window & { Zeffy?: ZeffyAPI }).Zeffy?.init?.();
            }
        };
        document.addEventListener('click', handleClick, true);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            document.removeEventListener('click', handleClick, true);
        };
    }, [pathname]);

    return null;
}



