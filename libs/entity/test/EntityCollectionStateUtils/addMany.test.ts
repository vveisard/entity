//
import { describe, expect, test } from "bun:test";
//
import {
  EntityCollectionStateUtils,
  type EntityCollection,
} from "../../src/index.ts";
//
import { TestEntityState } from "../type.ts";

describe("EntityCollectionStateUtils.addMany", () => {
  test("does add", () => {
    const initialEntityCollectionState: EntityCollection<TestEntityState> = {
      ids: [],
      entities: {},
    };

    const finalEntityCollectionState: EntityCollection<TestEntityState> =
      EntityCollectionStateUtils.addMany(initialEntityCollectionState, {
        a: {
          flag: true,
        },
        b: {
          flag: false,
        },
      });

    expect(finalEntityCollectionState).not.toBe(initialEntityCollectionState); // reference changed
    expect(finalEntityCollectionState).toEqual({
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
    const initialEntityCollectionState: EntityCollection<TestEntityState> = {
      ids: ["a"],
      entities: {
        ["a"]: {
          flag: true,
        },
      },
    };

    const finalEntityCollectionState: EntityCollection<TestEntityState> =
      EntityCollectionStateUtils.addMany(
        initialEntityCollectionState,
        {
          b: {
            flag: false,
          },
        },
        {
          throwWhenAnyIdExists: false,
        },
      );

    expect(finalEntityCollectionState).not.toBe(initialEntityCollectionState); // reference did change
    expect(finalEntityCollectionState).toEqual({
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
    const initialEntityCollectionState: EntityCollection<TestEntityState> = {
      ids: ["a"],
      entities: {
        ["a"]: {
          flag: true,
        },
      },
    };

    const finalEntityCollectionState: EntityCollection<TestEntityState> =
      EntityCollectionStateUtils.addMany(
        initialEntityCollectionState,
        {
          a: {
            flag: false,
          },
        },
        {
          throwWhenAnyIdExists: false,
        },
      );

    expect(finalEntityCollectionState).toBe(initialEntityCollectionState); // reference did not change
  });

  test("does throw when id exists and options throw is true", () => {
    const initialEntityCollectionState: EntityCollection<TestEntityState> = {
      ids: ["a"],
      entities: {
        ["a"]: {
          flag: true,
        },
      },
    };

    expect(() =>
      EntityCollectionStateUtils.addMany(
        initialEntityCollectionState,
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
