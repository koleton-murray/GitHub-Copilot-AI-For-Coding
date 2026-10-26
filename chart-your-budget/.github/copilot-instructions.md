# Project: Chart your budget

## Overview

A static, client-side web app for entering monthly income and expenses in USD and viewing them as a chart. There is no build step, backend, or package manager.

## Files

- `index.html`: Page markup, Bootstrap 5.3.3 layout, a Data tab, and a Chart tab.
- `script.js`: All app logic. Builds the month table, computes totals, generates random example data, and renders the Chart.js chart.
- `styles.css`: Custom styles. `.chart-display` sets a minimum height, and `#chart-container` sets a fixed 600px height that Chart.js requires.

## Dependencies

Loaded from CDN in `index.html` with SRI hashes. Do not change versions without updating the hashes.

- Bootstrap 5.3.3 (CSS and JS bundle)
- Chart.js 4.4.4
- Lucide icon SVG (header icon)

## Conventions

- Use plain HTML, CSS, and vanilla JavaScript. Do not add frameworks or a build step unless asked.
- Use `const` and `let`, 4-space indentation, and single quotes in JS.
- Format money with `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })`.
- Amount inputs are `type="number"` with `min="0"` and `step="0.01"`. Read them with `toAmount()`, which treats invalid or negative values as 0.
- Keep the Data and Chart tabs in sync. The chart renders on the `shown.bs.tab` event for the Chart tab.
- Keep accessibility attributes, such as `aria-label`, on inputs and the canvas.

## Behavior

- The Data tab has one row per month (January to December) with income and expense inputs, plus totals and net.
- "Generate example data" fills inputs with random values: income from 3000 to 6000 and expenses from 2000 to 5500.
- "Clear data" resets all inputs and destroys the chart.
- The chart shows income and expense bars and a net line. It appears only when there is data.

## Button styling

- All buttons must have a pink background color.
- Use the Bootstrap pink, `#d63384`, or a `--budget-pink` CSS variable defined in `styles.css`.
- Keep the text color readable against the pink background, such as white.
- Do not add inline `style` attributes to buttons. Put the color in `styles.css`.
