# Chart your budget

[Back to the monorepo](../README.md)

A static, client-side app for entering monthly income and expenses in USD and visualizing the year. Built with vanilla JavaScript, Bootstrap 5.3.3, and Chart.js 4.4.4.

## Screenshots

### Monthly chart

![Monthly income and expense bars with a net line and PNG download control](./docs/screenshots/chart.png)

### Data entry and totals

![Twelve months of example budget data with annual totals and net income](./docs/screenshots/data.png)

Screenshots show generated example data, not saved financial records.

## What we've built

- A Data tab with income and expense inputs for January through December.
- Live annual income, expense, and net totals formatted in USD.
- A Chart tab combining income and expense bars with a monthly net line.
- Random example data, clear-data controls, and an empty-chart state.
- A **Download** button that exports the current chart as `budget-chart.png`.
- A username dropdown with validation, account-label updates, and a success toast.
- Responsive layouts, accessible input labels, and pink primary controls.
- Automated tests covering page behavior.

The **Log in** dropdown is a frontend-only username demo, not authentication. Budget values and the username live only in page memory: refreshing resets them. There is no backend, account storage, or budget persistence.

## Run locally

Open [index.html](./index.html) in a browser. No package installation, build step, or server is required.

Internet access is needed for Bootstrap, Chart.js, and Lucide icons loaded from CDNs.

1. Enter monthly amounts or select **Generate example data**.
2. Switch to **Chart** to view the income, expense, and net comparison.
3. Select **Download** to save a PNG, or **Clear data** to start over.

## Project structure

| File | Purpose |
| --- | --- |
| [index.html](./index.html) | Page markup, tabs, table, account dropdown, and CDN dependencies |
| [script.js](./script.js) | Inputs, totals, example data, charts, export, and username validation |
| [styles.css](./styles.css) | Custom layout, chart sizing, and button styling |
| [script.test.js](./script.test.js) | Browser-behavior tests using jsdom |
| [.github/copilot-instructions.md](./.github/copilot-instructions.md) | Project-specific Copilot conventions |

## Tests

Tests use Vitest and jsdom. Node.js 22.12 or later is recommended. npm dependencies are needed only for testing, not for running the app.

From this directory:

```sh
npm ci
npm test
```

For watch mode, run `npm run test:watch`.

The tests load the actual page markup and exercise monthly inputs, totals, example data, chart updates, clearing data, downloads, and username validation. Chart.js is mocked, so these tests do not verify canvas rendering or CDN dependencies.