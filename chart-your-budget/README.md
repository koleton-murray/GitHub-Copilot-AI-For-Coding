# Chart your budget

A static monthly budget app. Open `index.html` in a browser to use it; the app has no build step or backend.

## Tests

Tests use Vitest and jsdom. Node.js 22.12 or later is recommended. npm dependencies are needed only for testing, not for running the app.

```sh
npm ci
npm test
```

For watch mode, run `npm run test:watch`.

The tests load the actual page markup and exercise monthly inputs, totals, example data, chart updates, and clearing data. Chart.js is mocked, so these tests do not verify canvas rendering or CDN dependencies.