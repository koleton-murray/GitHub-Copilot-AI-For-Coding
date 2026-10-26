import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const markup = readFileSync(resolve(import.meta.dirname, 'index.html'), 'utf8');
let chartMock;

function enterAmount(month, kind, value) {
    const input = document.querySelector(`input[aria-label="${month} ${kind}"]`);
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
}

function showChart() {
    document.getElementById('chart-tab').dispatchEvent(new Event('shown.bs.tab'));
}

function expectTotals(income, expenses, net) {
    expect(document.getElementById('total-income').textContent).toBe(income);
    expect(document.getElementById('total-expenses').textContent).toBe(expenses);
    expect(document.getElementById('total-net').textContent).toBe(net);
}

beforeEach(async () => {
    vi.resetModules();
    document.body.innerHTML = new DOMParser().parseFromString(markup, 'text/html').body.innerHTML;
    chartMock = vi.fn(function Chart(canvas, configuration) {
        this.data = configuration.data;
        this.update = vi.fn();
        this.destroy = vi.fn();
    });
    vi.stubGlobal('Chart', chartMock);
    await import('./script.js');
});

describe('username submission', () => {
    let showToast;
    let hideDropdown;
    let getToast;

    beforeEach(() => {
        showToast = vi.fn();
        hideDropdown = vi.fn();
        getToast = vi.fn(() => ({ show: showToast }));
        vi.stubGlobal('bootstrap', {
            Dropdown: { getOrCreateInstance: vi.fn(() => ({ hide: hideDropdown })) },
            Toast: { getOrCreateInstance: getToast }
        });
    });

    it('shows a success toast after a valid username is submitted', () => {
        document.getElementById('username').value = 'User1!';
        document.getElementById('username-form').dispatchEvent(new Event('submit', { cancelable: true }));

        expect(document.getElementById('account-name').textContent).toBe('User1!');
        expect(hideDropdown).toHaveBeenCalledOnce();
        expect(getToast).toHaveBeenCalledWith(document.getElementById('username-success'));
        expect(showToast).toHaveBeenCalledOnce();
        expect(document.getElementById('username-success').textContent).toContain('Username submitted successfully.');
    });

    it.each(['', 'U1!', 'user1!', 'Username!', 'User123'])('does not show a success toast for invalid username %s', (value) => {
        document.getElementById('username').value = value;
        document.getElementById('username-form').dispatchEvent(new Event('submit', { cancelable: true }));

        expect(getToast).not.toHaveBeenCalled();
        expect(hideDropdown).not.toHaveBeenCalled();
        expect(document.getElementById('username').getAttribute('aria-invalid')).toBe('true');
    });
});

describe('budget data', () => {
    it('creates twelve monthly rows with accessible amount inputs and zero totals', () => {
        const rows = document.querySelectorAll('#budget-rows tr');
        expect(rows).toHaveLength(12);
        expect(rows[0].querySelector('th').textContent).toBe('January');
        expect(rows[11].querySelector('th').textContent).toBe('December');
        const inputs = document.querySelectorAll('#budget-rows input');
        expect(inputs).toHaveLength(24);
        inputs.forEach((input) => {
            expect(input.type).toBe('number');
            expect(input.min).toBe('0');
            expect(input.step).toBe('0.01');
            expect(input.getAttribute('aria-label')).toBeTruthy();
        });
        expectTotals('$0.00', '$0.00', '$0.00');
        expect(document.getElementById('generate-data').hidden).toBe(false);
        expect(document.getElementById('clear-data').hidden).toBe(true);
    });

    it('updates USD totals and net when amounts change across months', () => {
        enterAmount('January', 'income', '1200.50');
        enterAmount('February', 'income', '300.25');
        enterAmount('January', 'expenses', '1600');
        expectTotals('$1,500.75', '$1,600.00', '-$99.25');
        expect(document.getElementById('generate-data').hidden).toBe(true);
        expect(document.getElementById('generate-chart-data').hidden).toBe(true);
        expect(document.getElementById('clear-data').hidden).toBe(false);
        expect(document.getElementById('clear-chart-data').hidden).toBe(false);
    });

    it('treats negative, invalid, and empty amounts as zero', () => {
        enterAmount('January', 'income', '-100');
        enterAmount('February', 'income', 'not-a-number');
        enterAmount('March', 'expenses', '');
        enterAmount('April', 'income', '12.34');
        expectTotals('$12.34', '$0.00', '$12.34');
    });

    it('generates example amounts within the configured income and expense ranges', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
        document.getElementById('generate-data').click();
        document.querySelectorAll('input[data-kind="income"]').forEach((input) => {
            expect(input.value).toBe('4500.00');
        });
        document.querySelectorAll('input[data-kind="expenses"]').forEach((input) => {
            expect(input.value).toBe('3750.00');
        });
        expectTotals('$54,000.00', '$45,000.00', '$9,000.00');
        expect(chartMock).not.toHaveBeenCalled();
    });
});

describe('budget chart', () => {
    it('keeps the chart and download button hidden when there is no data', () => {
        showChart();
        expect(chartMock).not.toHaveBeenCalled();
        expect(document.getElementById('chart-empty').hidden).toBe(false);
        expect(document.getElementById('chart-container').hidden).toBe(true);
        expect(document.getElementById('download-chart').hidden).toBe(true);
    });

    it('renders income and expense bars and a net line when the chart tab is shown', () => {
        enterAmount('January', 'income', '200');
        enterAmount('January', 'expenses', '75');
        showChart();
        expect(chartMock).toHaveBeenCalledTimes(1);
        const configuration = chartMock.mock.calls[0][1];
        expect(configuration.data.labels).toEqual([
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]);
        expect(configuration.data.datasets.map((dataset) => dataset.type)).toEqual(['bar', 'bar', 'line']);
        expect(configuration.data.datasets.map((dataset) => dataset.data[0])).toEqual([200, 75, 125]);
        expect(document.getElementById('chart-empty').hidden).toBe(true);
        expect(document.getElementById('chart-container').hidden).toBe(false);
        expect(document.getElementById('download-chart').hidden).toBe(false);
    });

    it('updates the existing chart rather than creating a second instance', () => {
        enterAmount('January', 'income', '200');
        showChart();
        const chart = chartMock.mock.instances[0];
        enterAmount('January', 'expenses', '50');
        showChart();
        expect(chartMock).toHaveBeenCalledTimes(1);
        expect(chart.update).toHaveBeenCalledTimes(1);
        expect(chart.data.datasets.map((dataset) => dataset.data[0])).toEqual([200, 50, 150]);
    });

    it('generates data and renders a chart from the chart tab example button', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
        document.getElementById('generate-chart-data').click();
        expect(chartMock).toHaveBeenCalledTimes(1);
        expectTotals('$54,000.00', '$45,000.00', '$9,000.00');
        expect(document.getElementById('chart-container').hidden).toBe(false);
    });

    it.each(['clear-data', 'clear-chart-data'])('clears amounts and destroys the chart using %s', (buttonId) => {
        enterAmount('January', 'income', '200');
        enterAmount('January', 'expenses', '50');
        showChart();
        const chart = chartMock.mock.instances[0];
        document.getElementById(buttonId).click();
        document.querySelectorAll('#budget-rows input').forEach((input) => {
            expect(input.value).toBe('');
        });
        expect(chart.destroy).toHaveBeenCalledTimes(1);
        expectTotals('$0.00', '$0.00', '$0.00');
        expect(document.getElementById('chart-empty').hidden).toBe(false);
        expect(document.getElementById('chart-container').hidden).toBe(true);
        expect(document.getElementById('download-chart').hidden).toBe(true);
        expect(document.getElementById('generate-data').hidden).toBe(false);
        expect(document.getElementById('clear-data').hidden).toBe(true);
        enterAmount('February', 'income', '100');
        showChart();
        expect(chartMock).toHaveBeenCalledTimes(2);
    });
});