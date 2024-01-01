//
import { describe, expect, test } from "bun:test";
//
import {
  type EntityChunkAdapter,
  createStandardEntityAdapter,
  EntityChunkState,
} from "../../src/index.ts";
//
import { TestEntityState } from "../type.ts";

describe("StandardEntityAdapter.addMany", () => {
  const adapter: EntityChunkAdapter<TestEntityState> =
    createStandardEntityAdapter();

  test("does add", () => {
    const initialEntityChunkState: EntityChunkState<TestEntityState> = {
      ids: [],
      entities: {},
    };

    const finalEntityChunkState: EntityChunkState<TestEntityState> =
      adapter.addMany(initialEntityChunkState, {
        a: {
          flag: true,
        },
        b: {
          flag: false,
        },
      });

    expect(finalEntityChunkState).not.toBe(initialEntityChunkState); // reference changed
    expect(finalEntityChunkState).toEqual({
      ids: ["a", "b"],
      entities: {
        a: {
          flag: true,
        },
        b: {
          flag: false,
        },
      },
    });
  });

  test("does add some when some id exists and options throw is false", () => {
    const initialEntityChunkState: EntityChunkState<TestEntityState> = {
      ids: ["a"],
      entities: {
        ["a"]: {
          flag: true,
        },
      },
    };

    const finalEntityChunkState: EntityChunkState<TestEntityState> =
      adapter.addMany(
        initialEntityChunkState,
        {
          b: {
            flag: false,
          },
        },
        {
          throwWhenAnyIdExists: false,
        },
      );

    expect(finalEntityChunkState).not.toBe(initialEntityChunkState); // reference did change
    expect(finalEntityChunkState).toEqual({
      ids: ["a", "b"],
      entities: {
        a: {
          flag: true,
        },
        b: {
          flag: false,
        },
      },
    });
  });

  test("does no-op when id exists and options throw is false", () => {
    const initialEntityChunkState: EntityChunkState<TestEntityState> = {
      ids: ["a"],
      entities: {
        ["a"]: {
          flag: true,
        },
      },
    };

    const finalEntityChunkState: EntityChunkState<TestEntityState> =
      adapter.addMany(
        initialEntityChunkState,
        {
          a: {
            flag: false,
          },
        },
        {
          throwWhenAnyIdExists: false,
        },
      );

    expect(finalEntityChunkState).toBe(initialEntityChunkState); // reference did not change
  });

  test("does throw when id exists and options throw is true", () => {
    const initialEntityChunkState: EntityChunkState<TestEntityState> = {
      ids: ["a"],
      entities: {
        ["a"]: {
          flag: true,
        },
      },
    };

    expect(() =>
      adapter.addMany(
        initialEntityChunkState,
        {
          a: {
            flag: false,
          },
        },
        {
          throwWhenAnyIdExists: true,
        },
      ),
    ).toThrow();
  });
});
