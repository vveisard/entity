import type { EntityState, EntityChunkAdapter } from "..";

/**
 * Create standard implementation of an {@link EntityAdapter}
 */
const createStandardEntityAdapter = <
  TEntityState extends EntityState,
>(): EntityChunkAdapter<TEntityState> => {
  // TODO consider moving these functions to a namespace (or package)
  return {
    addOne(baseChunkState, entityId, entityState, options) {
      const exists = baseChunkState.ids.includes(entityId);
      if (exists) {
        if (options?.throwWhenIdExists ?? true) {
          throw new Error(
            `Invalid state! An entity with id '${String(
              entityId,
            )}' already exists.`,
          );
        }

        return baseChunkState;
      }

      return {
        ids: [...baseChunkState.ids, entityId],
        entities: {
          ...baseChunkState.entities,
          [entityId]: entityState,
        },
      };
    },
    addMany(baseChunkState, entities, options) {
      const nextEntityIds: Array<string> = Object.keys(entities);
      const missingNextEntityId = nextEntityIds.filter(
        // get next entity id which are not in base state
        (iAddEntityId) =>
          !(baseChunkState.ids as Array<string>).includes(iAddEntityId),
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
        return baseChunkState;
      }

      return {
        ...baseChunkState,
        ids: [...baseChunkState.ids, ...missingNextEntityId],
        entities: Object.assign(
          // merge existing and missing entity
          {},
          baseChunkState.entities,
          Object.fromEntries(
            missingNextEntityId.map((iMissingEntityId) => [
              iMissingEntityId,
              entities[iMissingEntityId],
            ]),
          ),
        ),
      };
    },
  };
};

export { createStandardEntityAdapter };
