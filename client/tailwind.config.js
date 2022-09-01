/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            colors: ({ colors }) => ({
                ...colors,
                primary: {
                    DEFAULT: "#3b82f6",
                    dark: "#2563eb",
                },
            }),
        },
    },
    plugins: [],
};
