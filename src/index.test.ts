import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { build } from 'vite';
import type { Rolldown } from 'vite';
import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test';

import spaRedirect from './index';

describe('spaRedirect', () => {
    let root: string;

    beforeEach(() => {
        root = mkdtempSync(path.join(tmpdir(), 'vite-plugin-spa-redirect-'));

        writeFileSync(path.join(root, 'index.html'), '<!doctype html><html><body></body></html>');
    });

    afterEach(() => rmSync(root, { recursive: true, force: true }));

    async function build404(base?: string): Promise<string> {
        const output = (await build({
            root,
            base,
            logLevel: 'silent',
            plugins: [spaRedirect()],
            build: { write: false },
        })) as Rolldown.RolldownOutput;
        const asset = output.output.find((file) => file.fileName === '404.html');

        if (asset?.type !== 'asset') {
            throw new Error('404.html was not emitted');
        }

        return asset.source.toString();
    }

    it('emits a 404.html redirecting to the root', async () => {
        const html = await build404();

        expect(html).toContain("const basePath = '/';");
        expect(html).not.toContain('{{ basePath }}');
    });

    it('uses the configured base path', async () => {
        const html = await build404('/my-app/');

        expect(html).toContain("const basePath = '/my-app/';");
    });
});
