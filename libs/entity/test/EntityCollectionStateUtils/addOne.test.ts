//
import { describe, expect, test } from "bun:test";
//
import {
  EntityCollectionStateUtils,
  EntityCollectionState,
} from "../../src/index.ts";
//
import { TestEntityState } from "../type.ts";

describe("StandardEntityAdapter.addOne", () => {
  test("does add", () => {
    const initialEntityCollectionState: EntityCollectionState<TestEntityState> =
      {
        ids: [],
        entities: {},
      };

    const finalEntityCollectionState: EntityCollectionState =
      EntityCollectionStateUtils.addOne(initialEntityCollectionState, "a", {
        flag: true,
      });

    expect(finalEntityCollectionState).not.toBe(initialEntityCollectionState); // reference changed
    expect(finalEntityCollectionState).toEqual({
      ids: ["a"],
      entities: {
        a: {
          flag: true,
        },
      },
    }); // value changed
  });

  test("does no-op when id exists and options throw is false", () => {
    const initialEntityCollectionState: EntityCollectionState<TestEntityState> =
      {
        ids: ["a"],
        entities: {
          ["a"]: {
            flag: true,
          },
        },
      };

    const finalEntityCollectionState: EntityCollectionState<TestEntityState> =
      EntityCollectionStateUtils.addOne(
        initialEntityCollectionState,
        "a",
        {
          flag: false,
        },
        {
          throwWhenIdExists: false,
        },
      );

    expect(finalEntityCollectionState).toBe(initialEntityCollectionState); // reference did not change
  });

  test("does throw when id exists and options throw is true", () => {
    const initialEntityCollectionState: EntityCollectionState<TestEntityState> =
      {
        ids: ["a"],
        entities: {
          ["a"]: {
            flag: true,
          },
        },
      };

    expect(() =>
      EntityCollectionStateUtils.addOne(initialEntityCollectionState, "a", {
        flag: false,
      }),
    ).toThrow();
  });
});
