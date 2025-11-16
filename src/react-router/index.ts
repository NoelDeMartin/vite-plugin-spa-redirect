import { redirect } from 'react-router';

export default function spaRedirect() {
    const routeJson = localStorage.getItem('spa-redirect');

    if (!routeJson) {
        return;
    }

    const route = JSON.parse(routeJson) as { path: string; hash: string; query: Record<string, string> };

    localStorage.removeItem('spa-redirect');

    throw redirect(route.path);
}
