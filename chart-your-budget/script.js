const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const rowsEl = document.getElementById('budget-rows');
const chartEmptyEl = document.getElementById('chart-empty');
const chartContainerEl = document.getElementById('chart-container');
const downloadChartEl = document.getElementById('download-chart');
const usernameEl = document.getElementById('username');
const usernameErrorEl = document.getElementById('username-error');
const accountToggleEl = document.getElementById('account-toggle');
const accountNameEl = document.getElementById('account-name');
let chart = null;

function createAmountCell(month, kind) {
    const td = document.createElement('td');
    const group = document.createElement('div');
    group.className = 'input-group';

    const prefix = document.createElement('span');
    prefix.className = 'input-group-text';
    prefix.textContent = '$';

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'form-control';
    input.min = '0';
    input.step = '0.01';
    input.inputMode = 'decimal';
    input.dataset.kind = kind;
    input.setAttribute('aria-label', `${month} ${kind}`);

    group.append(prefix, input);
    td.append(group);
    return td;
}

function buildRows() {
    MONTHS.forEach((month) => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = month;
        tr.append(th, createAmountCell(month, 'income'), createAmountCell(month, 'expenses'));
        rowsEl.append(tr);
    });
}

function toAmount(value) {
    const n = Number.parseFloat(value);
    return Number.isFinite(n) && n > 0 ? n : 0;
}

function readValues(kind) {
    return Array.from(rowsEl.querySelectorAll(`input[data-kind="${kind}"]`), (input) => toAmount(input.value));
}

function sum(values) {
    return values.reduce((a, b) => a + b, 0);
}

function updateTotals() {
    const income = sum(readValues('income'));
    const expenses = sum(readValues('expenses'));
    document.getElementById('total-income').textContent = usd.format(income);
    document.getElementById('total-expenses').textContent = usd.format(expenses);
    document.getElementById('total-net').textContent = usd.format(income - expenses);

    const hasEntries = Array.from(rowsEl.querySelectorAll('input')).some((input) => input.value !== '');
    document.getElementById('generate-data').hidden = hasEntries;
    document.getElementById('generate-chart-data').hidden = hasEntries;
    document.getElementById('clear-data').hidden = !hasEntries;
    document.getElementById('clear-chart-data').hidden = !hasEntries;
}

function renderChart() {
    const income = readValues('income');
    const expenses = readValues('expenses');
    const net = income.map((value, i) => value - expenses[i]);
    const hasData = sum(income) > 0 || sum(expenses) > 0;

    chartEmptyEl.hidden = hasData;
    chartContainerEl.hidden = !hasData;
    downloadChartEl.hidden = !hasData;
    if (!hasData) {
        return;
    }

    const datasets = [
        { type: 'bar', label: 'Income', data: income, backgroundColor: '#198754' },
        { type: 'bar', label: 'Expenses', data: expenses, backgroundColor: '#dc3545' },
        {
            type: 'line',
            label: 'Net',
            data: net,
            borderColor: '#0d6efd',
            backgroundColor: '#0d6efd',
            tension: 0.2
        }
    ];

    if (chart) {
        chart.data.datasets = datasets;
        chart.update();
        return;
    }

    chart = new Chart(document.getElementById('budget-chart'), {
        data: { labels: MONTHS.map((m) => m.slice(0, 3)), datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                y: { ticks: { callback: (value) => usd.format(value) } }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${usd.format(ctx.parsed.y)}`
                    }
                }
            }
        }
    });
}

function downloadChart() {
    if (!chart || chartContainerEl.hidden) {
        return;
    }

    chart.stop();
    chart.update('none');
    const link = document.createElement('a');
    link.href = chart.toBase64Image('image/png');
    link.download = 'budget-chart.png';
    document.body.append(link);
    link.click();
    link.remove();
}

function randomAmount(min, max) {
    return (Math.round((min + Math.random() * (max - min)) * 100) / 100).toFixed(2);
}

function generateData() {
    rowsEl.querySelectorAll('input[data-kind="income"]').forEach((input) => {
        input.value = randomAmount(3000, 6000);
    });
    rowsEl.querySelectorAll('input[data-kind="expenses"]').forEach((input) => {
        input.value = randomAmount(2000, 5500);
    });
    updateTotals();
}

function clearData() {
    rowsEl.querySelectorAll('input').forEach((input) => {
        input.value = '';
    });
    if (chart) {
        chart.destroy();
        chart = null;
    }
    updateTotals();
    renderChart();
}

function validateUsername() {
    const value = usernameEl.value;
    const errors = [];

    if (value === '') {
        errors.push('Enter a username.');
    } else {
        if (value.length < 5) {
            errors.push('Use at least 5 characters.');
        }
        if (!/[A-Z]/.test(value)) {
            errors.push('Include an uppercase letter.');
        }
        if (!/[0-9]/.test(value)) {
            errors.push('Include a number.');
        }
        if (!/[^A-Za-z0-9\s]/.test(value)) {
            errors.push('Include a special character.');
        }
    }

    const message = errors.join(' ');
    usernameEl.setCustomValidity(message);
    usernameEl.classList.toggle('is-invalid', errors.length > 0);
    usernameEl.setAttribute('aria-invalid', String(errors.length > 0));
    usernameErrorEl.textContent = message;
    usernameErrorEl.hidden = errors.length === 0;
    return errors.length === 0;
}

buildRows();
updateTotals();

document.getElementById('username-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateUsername()) {
        usernameEl.focus();
        return;
    }
    accountNameEl.textContent = usernameEl.value;
    accountToggleEl.title = usernameEl.value;
    bootstrap.Dropdown.getOrCreateInstance(accountToggleEl).hide();
    bootstrap.Toast.getOrCreateInstance(document.getElementById('username-success')).show();
    accountToggleEl.focus();
});
usernameEl.addEventListener('input', () => {
    validateUsername();
});
accountToggleEl.addEventListener('shown.bs.dropdown', () => {
    usernameEl.focus();
});

document.getElementById('generate-data').addEventListener('click', generateData);
document.getElementById('generate-chart-data').addEventListener('click', () => {
    generateData();
    renderChart();
});
document.getElementById('clear-data').addEventListener('click', clearData);
document.getElementById('clear-chart-data').addEventListener('click', clearData);
downloadChartEl.addEventListener('click', downloadChart);
rowsEl.addEventListener('input', updateTotals);
document.getElementById('chart-tab').addEventListener('shown.bs.tab', renderChart);