/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#111827",
                secondary: "#6D7280",
                primaryBg: "#FFFFFF",
                secondaryBg: "#EAF2FF",
                tertiaryBg: "#F3F4F6",
                linkText: "#0043FF",
                linkDisabled: "#4B5563",
                beige: "#FFFCF5",
                green: "#48BB78",
                accent: "#6600CC",
                disabled: "#C5C5C5",
                // find a way to describe better these colors
                inputUnselected: "#E0E0E0",
                inputSelected: "#0570DE",
                placeholderUnselected: "#A5ACB8",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            lineHeight: {
                h1: "98px",
                h2: "24.2px",
                h3: "20px",
            },
            screens: {
                xlDashboard: "1350px",
                lgDashboard: "1280px",
            },
        },
    },
    plugins: [],
};
