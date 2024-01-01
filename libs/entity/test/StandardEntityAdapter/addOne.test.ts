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

describe("StandardEntityAdapter.addOne", () => {
  const adapter: EntityChunkAdapter<TestEntityState> =
    createStandardEntityAdapter();

  test("does add", () => {
    const initialEntityChunkState: EntityChunkState<TestEntityState> = {
      ids: [],
      entities: {},
    };

    const finalEntityChunkState: EntityChunkState = adapter.addOne(
      initialEntityChunkState,
      "a",
      {
        flag: true,
      },
    );

    expect(finalEntityChunkState).not.toBe(initialEntityChunkState); // reference changed
    expect(finalEntityChunkState).toEqual({
      ids: ["a"],
      entities: {
        a: {
          flag: true,
        },
      },
    }); // value changed
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
      adapter.addOne(
        initialEntityChunkState,
        "a",
        {
          flag: false,
        },
        {
          throwWhenIdExists: false,
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
      adapter.addOne(initialEntityChunkState, "a", {
        flag: false,
      }),
    ).toThrow();
  });
});
