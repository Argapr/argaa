import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Theme-aware tokens (see src/styles/globals.css)
                nb: {
                    bg: "var(--nb-bg)",
                    surface: "var(--nb-surface)",
                    ink: "var(--nb-ink)",
                    muted: "var(--nb-muted)",
                    border: "var(--nb-border)",
                    // Fixed accents — always paired with black text/border
                    yellow: "#FFDD00",
                    pink: "#FF5C8A",
                    blue: "#5B9DFF",
                    lime: "#B8FF3D",
                    purple: "#B08CFF",
                    orange: "#FF8A3D",
                    red: "#FF5A47",
                },
            },
            fontFamily: {
                display: ['"Archivo Black"', '"Arial Black"', "Impact", "sans-serif"],
                sans: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
                mono: ['"Space Mono"', "ui-monospace", "monospace"],
            },
            borderWidth: {
                3: "3px",
                5: "5px",
            },
            boxShadow: {
                // Theme-aware: black offset on light, light offset on dark
                "nb-sm": "2px 2px 0 0 var(--nb-shadow)",
                nb: "4px 4px 0 0 var(--nb-shadow)",
                "nb-lg": "8px 8px 0 0 var(--nb-shadow)",
                "nb-xl": "12px 12px 0 0 var(--nb-shadow)",
                // Always-black offset, for bright accent surfaces
                "ink-sm": "2px 2px 0 0 #111111",
                ink: "4px 4px 0 0 #111111",
                "ink-lg": "8px 8px 0 0 #111111",
            },
            keyframes: {
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
                "nb-bounce": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            animation: {
                marquee: "marquee 24s linear infinite",
                "nb-bounce": "nb-bounce 0.7s ease-in-out infinite",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/line-clamp"),
    ],
};

export default config;
