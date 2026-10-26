---
name: create-instructions-prompt
description: Describe what this skill does and when to use it. Include keywords that help agents identify relevant tasks.
agent: Instructions Generator
---

use the Instructions Generator agent.

Take the information below and generate an agent insturctions .md file for it in the /docs directory. if a .md filename is provided, use that, otherwise generate an appropriate filename based on the content. Make sure the instructions are concise and not too long. Make sure to update the AGENTS.md file to reference this new docs file. If no information is provided below, promt the user to give the necessary details about the layer of architecture or coding standards to document.