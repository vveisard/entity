# @vveisard/entity

Representational state transfer for entities in normalized data structures.

Inspired by [redux entity adapters](https://redux-toolkit.js.org/api/createEntityAdapter) and [@ngrx/entity](https://v8.ngrx.io/guide/entity), [GraphQL](https://graphql.org/) and [MongoDB](https://www.mongodb.com/).

# Design

The purpose of this library is _representational state transfer_ between systems. Ideally, you should implement your own adapters with CRUD functions for that system. (eg, for a database, localStorage, an ECS engine, a render engine).

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
