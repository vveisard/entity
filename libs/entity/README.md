# @vveisard/entity

Entity with immutable state.

Inspired by [redux entity adapters](https://redux-toolkit.js.org/api/createEntityAdapter) and [@ngrx/entity](https://v8.ngrx.io/guide/entity).

# Design

Entity state a _representational data structure_ for normalized state. The adapter is an implementation detail.

Chosen to avoid components, as they do not add any additional value to this representational data structure.

`undefined` and `Function` are not allowed. This is because `Function` may be used as arguments.

# Development

## Prerequisites

### Install [bun](https://bun.sh/):

```bash
curl -fsSL https://bun.sh/install | bash
```

### Install dependencies:

```bash
bun install
```

This will setup [husky](https://typicode.github.io/husky/).
