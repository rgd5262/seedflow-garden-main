import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// Garden Theme Colors
				'garden-soil': 'hsl(var(--garden-soil))',
				'garden-earth': 'hsl(var(--garden-earth))',
				'garden-earth-foreground': 'hsl(var(--garden-earth-foreground))',
				
				// Plant Growth States
				'seed-dormant': 'hsl(var(--seed-dormant))',
				'seed-planted': 'hsl(var(--seed-planted))',
				'plant-growing': 'hsl(var(--plant-growing))',
				'plant-bloomed': 'hsl(var(--plant-bloomed))',
				'plant-highlight': 'hsl(var(--plant-highlight))',
				
				// Nature Accents
				'earth-brown': 'hsl(var(--earth-brown))',
				'earth-brown-foreground': 'hsl(var(--earth-brown-foreground))',
				'forest-green': 'hsl(var(--forest-green))',
				'forest-green-foreground': 'hsl(var(--forest-green-foreground))',
				
				// Seasonal Colors
				'spring-bloom': 'hsl(var(--spring-bloom))',
				'autumn-gold': 'hsl(var(--autumn-gold))',
				'winter-frost': 'hsl(var(--winter-frost))',
				
				// Interaction States
				'hover-glow': 'hsl(var(--hover-glow))',
				'focus-ring': 'hsl(var(--focus-ring))',
				'success': 'hsl(var(--success))',
				'warning': 'hsl(var(--warning))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--garden-earth))',
					foreground: 'hsl(var(--garden-earth-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
