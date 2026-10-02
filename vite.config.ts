import { fmt, lint, pack, raw } from '@noeldemartin/vite-plus-config';
import { defineConfig } from 'vite-plus';

const html = raw(/\.html$/);

export default defineConfig({
    pack: {
        ...pack,
        entry: {
            index: 'src/index.ts',
            'react-router': 'src/react-router/index.ts',
        },
        plugins: [html],
    },
    plugins: [html],
    fmt,
    lint: { extends: [lint] },
});
