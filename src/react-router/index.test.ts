import { FakeLocalStorage } from '@noeldemartin/testing';
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';

import spaRedirect from './index';

vi.mock('react-router', () => ({
    redirect: (path: string) => new Error(`Redirect to ${path}`),
}));

describe('spaRedirect (react-router)', () => {
    beforeEach(() => {
        FakeLocalStorage.reset();
        FakeLocalStorage.patchGlobal();
    });

    it('does nothing without a pending redirect', () => {
        expect(() => spaRedirect()).not.toThrow();
    });

    it('redirects to the stored route', () => {
        localStorage.setItem('spa-redirect', JSON.stringify({ path: '/movies/42', hash: '', query: {} }));

        expect(() => spaRedirect()).toThrow('Redirect to /movies/42');
        expect(localStorage.getItem('spa-redirect')).toBeNull();
    });
});
