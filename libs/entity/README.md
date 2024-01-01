# @vveisard/entity

Immutable data structure for entities.

Inspired by [redux entity adapters](https://redux-toolkit.js.org/api/createEntityAdapter) and [@ngrx/entity](https://v8.ngrx.io/guide/entity).

# Design

This library is best used for _representational data transformation_ of another another system. Ideally, you should implement your own adapters with CRUD functions for that system. (eg, writing to a database, localStorage, or an "engine").

However, a "standard" adapter implementation for a normalized state tree is provided.

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
