/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'my_bg_image' : "url('../public/Background.jpg')",
			},
			colors: {
				notes_background: "#FAF3F2",
				notes_text: "#0A0505",
				notes_primary: "#FF3131",
				notes_secondary: "#FF914D",
				notes_accent: "#FFDE59",

			}
		},
	},
	plugins: [],
};
