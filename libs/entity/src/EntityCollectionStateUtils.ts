import {
  type AddManyFunctionOptions,
  type AddOneFunctionOptions,
  type EntityCollection,
  type EntityId,
} from "./type.ts";

/**
 * Utilities for {@link EntityCollection} with immutable state.
 */
namespace EntityCollectionStateUtils {
  /**
   * @see AddOneFunction
   * @returns `collectionState` when entity already exist (ie, a no-op).
   */
  export function addOne<TEntity>(
    baseCollectionState: EntityCollection<TEntity>,
    nextEntityId: EntityId,
    nextEntityState: TEntity,
    options?: AddOneFunctionOptions,
  ): EntityCollection<TEntity> {
    const exists = baseCollectionState.ids.includes(nextEntityId);
    if (exists) {
      if (options?.throwWhenIdExists ?? true) {
        throw new Error(
          `Invalid state! An entity with id '${String(
            nextEntityId,
          )}' already exists.`,
        );
      }

      return baseCollectionState;
    }

    return {
      ids: [...baseCollectionState.ids, nextEntityId],
      entities: {
        ...baseCollectionState.entities,
        [nextEntityId]: nextEntityState,
      },
    };
  }

  /**
   * @see AddManyFunction
   * Can partially complete.
   * @returns `collectionState` when all entity already exist (ie, a no-op).
   */
  export function addMany<TEntityState>(
    baseCollectionState: EntityCollection<TEntityState>,
    nextEntityIdToState: Record<EntityId, TEntityState>,
    options?: AddManyFunctionOptions,
  ): EntityCollection<TEntityState> {
    const nextEntityIds: Array<string> = Object.keys(nextEntityIdToState);
    const missingNextEntityId = nextEntityIds.filter(
      // get next entity id which are not in base state
      (iAddEntityId) =>
        !(baseCollectionState.ids as Array<string>).includes(iAddEntityId),
    );

    // some already exist
    if (missingNextEntityId.length !== nextEntityIds.length) {
      if (options?.throwWhenAnyIdExists ?? true) {
        // TODO display which (ie, create the difference between existing and missing)
        throw new Error(
          `Invalid state! Some entity with id '${nextEntityIds}' already exists.`,
        );
      }
    }

    // all ids exist, no-op
    if (missingNextEntityId.length === 0) {
      return baseCollectionState;
    }

    return {
      ...baseCollectionState,
      ids: [...baseCollectionState.ids, ...missingNextEntityId],
      entities: Object.assign(
        // merge existing and missing entity
        {},
        baseCollectionState.entities,
        Object.fromEntries(
          missingNextEntityId.map((iMissingEntityId) => [
            iMissingEntityId,
            nextEntityIdToState[iMissingEntityId],
          ]),
        ),
      ),
    };
  }
}

export { EntityCollectionStateUtils };
