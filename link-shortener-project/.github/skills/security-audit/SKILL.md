---
name: security-audit
description: Perform a security audit of the codebase
agent: ask
---

Perform a security audit of this codebase to detect any potential security vulnerabilities in this project.

Output your findings as a markdown formatted table with the following columns: "ID" (should start at 1 and increment by 1), "Severity", "Description", "File path (should link to actual file)", "Line number(s)", "Recommendations"

Next, ask the user which issues they want to fix by either replying "all", or a comma sepated list of Ids. After their reply, run a seperate sub agent ( #runSubagent ) to fix each issue that the user has specified. Each sub agent should report back with a simple: `subAgentSuccess: true | false`