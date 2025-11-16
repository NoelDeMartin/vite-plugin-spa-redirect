# Vite Plugin SPA Redirect

Vite plugin to handle SPA redirects in [Github Pages](https://docs.github.com/en/pages). It works by emitting a `404.html` file that will redirect to index and load the route from localStorage.

## Installation

Install `vite-plugin-spa-redirect` with your favorite package manager, and use it in your Vite config:

```ts
import spaRedirect from 'vite-plugin-spa-redirect';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [spaRedirect()],
});
```

This will generate the `404.html` in your bundle, but you still need to configure the redirect in your app code.

### React Router

```ts
import spaRedirect from 'vite-plugin-spa-redirect/react-router';

createBrowserRouter([
    {
        path: '/',
        loader: spaRedirect,
    },
]);
```
