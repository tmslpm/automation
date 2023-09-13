# automation

Sample code for automation 

🚦This project **uses NPM for dependencies and project management** ([*Getting Started*](https://docs.npmjs.com/getting-started)) and **require [NodeJS](https://nodejs.org/fr) >=`v18.7.0.`**

### Table
 
|  |  |
|--|--|
| 🚀 | [/folder structure](#folder-structure) |
| 🚀 | [/about billing for GitHub Actions](#about-billing-for-github-actions) |

### Folder structure:
```
📂/. 
├── 📂.github/workflows
│   ├── ... github action script file ...
│
├── 📂build
│   ├── 📂dist
│   │   ├── ... build file ...
│   │
│   ├── 📂tmp
│   │   ├── ... temp file ...
│
├── 📂src
│   ├── ... script/code source typescript
│  
├── ...
│
└── package.json (NPM)
``` 

### About billing for GitHub Actions

> GitHub Actions usage is free for standard GitHub-hosted runners in public repositories, and for self-hosted runners. For private repositories, each GitHub account receives a certain amount of free minutes and storage for use with GitHub-hosted runners, depending on the account's plan. Any usage beyond the included amounts is controlled by spending limits.

<div align=center> 

| Plan       | Storage | Minutes per month |
|------------|---------|-------------------|
| Free       | 500 MB  | 2000              |
| Pro        | 1 GB    | 3,000             | 
| Team       | 2 GB    | 3,000             |
| Enterprise | 50 GB   | 50,000            | 

[source: docs.github.com](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions)

</div> 

<pre align=center>
    ↑↑↑ <a href="#automation" title="click to scroll up" alt="click to scroll up">BACK TO TOP</a> ↑↑↑
</pre>
