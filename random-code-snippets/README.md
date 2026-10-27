# Python exercises

[Back to the monorepo](../README.md)

Small, standalone Python exercises exploring prompting, functions, validation, random data, and terminal interaction. All use only the Python 3 standard library; no package installation is required.

## Scripts

| Script | What it does |
| --- | --- |
| [rock_paper_scissors.py](./rock_paper_scissors.py) | Continuous rounds against a random opponent, numeric or named choices, running win/loss/tie totals, and a final score |
| [monthly_random_finances.py](./monthly_random_finances.py) | Generates twelve month records from January to December, each with random integer income and expense values from 10 to 5000 |
| [password_strength_checker.py](./password_strength_checker.py) | Prompts for a password and returns `weak`, `medium`, or `strong` using a simple scoring heuristic |

## Run locally

From this directory:

```sh
python3 rock_paper_scissors.py
python3 monthly_random_finances.py
python3 password_strength_checker.py
```

Run one command at a time. In Rock, Paper, Scissors, enter `1`, `2`, or `3`, or the choice name. Enter `q`, `quit`, or `exit` to stop.

The password exercise awards points for length of at least 8, length of at least 12, mixed-case letters, a digit, and a non-alphanumeric character. Scores of 0-2 are weak, 3-4 are medium, and 5 is strong. This is a learning example, not a security guarantee. Input is visible in the terminal, so use a made-up password rather than a real credential.

These are terminal programs, not web apps. See the [monorepo screenshot gallery](../README.md#app-screenshots) for the browser-based projects.
