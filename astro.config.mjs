// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  vite: {
    assetsInclude: ['**/*.base', '**/.obsidian/**', '**/_bases/**'],
    server: {
      watch: {
        ignored: ['**/.obsidian/**', '**/_bases/**', '**/bases/**', '**/_home/**', '**/home/**', '**/_base/**', '**/base/**']
      }
    }
  },
	integrations: [
		starlight({
			title: 'Homelab - Gautier RAYEROUX',
			locales: {
				root: {
				label: 'Français',
				lang: 'fr',
				}
			},
			social: [
				{ icon: 'email', label: 'Email', href: 'mailto:g.rayeroux974@gmail.com' },
				{ icon: 'linkedin', label: 'Linkedin', href: 'https://www.linkedin.com/in/gautier-rayeroux/' },
				// { icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }
			],
			sidebar: [
				// {
				// 	label: 'Général',
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: 'Example Guide', slug: 'guides/example' },
				// 	],
				// },
				// {
				// 	label: 'Reference',
				// 	items: [{ autogenerate: { directory: 'reference' } }],
				// },
				{
					label: 'Général',
					items: [{ autogenerate: { directory: 'general' }}],
				},
				{
					label: 'Conteneur Applications',
					items: [{ autogenerate: { directory: 'Conteneur Applications', collapsed:true }}],
				},
				{
					label: 'Conteneur Supervision',
					items: [{ autogenerate: { directory: 'Conteneur Supervision', collapsed:true }}],
				},
			],
		}),
	],
});
