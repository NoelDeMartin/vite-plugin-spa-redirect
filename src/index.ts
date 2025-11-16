import type { Plugin, ResolvedConfig } from 'vite';

import htmlTemplate from './templates/404.html?raw';

export default function spaRedirect(): Plugin {
    let config: ResolvedConfig;

    return {
        name: 'vite-plugin-spa-redirect',
        configResolved(value) {
            config = value;
        },
        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: '404.html',
                source: htmlTemplate.replace('{{ basePath }}', config.base),
            });
        },
    };
}
