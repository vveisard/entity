// @region-begin Core

/**
 * Type of entity id.
 */
type EntityId = string;

/**
 * Base type of entity state.
 * @remarks
 * Entity state should be "plain" (ie, Jsonifiable).
 * Entity state must not be `undefined`, as `undefined` has meaning for function results.
 */
type EntityState = any;

/**
 * Collection of entities in a normalized data structure.
 */
interface EntityCollection<TEntityState extends EntityState = EntityState> {
  readonly entities: Record<EntityId, TEntityState>;
  readonly ids: Array<EntityId>;
}

// @region-end

// @region-add Add One

/**
 * Options for {@link AddOneFunction}.
 */
interface AddOneFunctionOptions {
  /**
   * Throw when id already exists, else do nothing.
   * @default false
   */
  readonly throwWhenIdExists: boolean;
}

/**
 * Add one entity.
 * @returns new entity state when not no-op.
 */
type AddOneFunction<TEntityState extends EntityState> = (
  nextEntityId: EntityId,
  nextEntityState: TEntityState,
  options?: AddOneFunctionOptions,
) => void;

// @region-end

// @region-add Add Many

/**
 * Options for {@link AddManyFunction}.
 */
interface AddManyFunctionOptions {
  /**
   * Throw when any id already exists, else do continue.
   * @default false
   */
  readonly throwWhenAnyIdExists: boolean;
}

/**
 * Add many entity.
 */
type AddManyFunction<TEntityState extends EntityState> = (
  collectionState: EntityCollection<TEntityState>,
  nextEntityIdToState: Record<EntityId, TEntityState>,
  options?: AddManyFunctionOptions,
) => void;

// @region-end

// @region-begin Entity Adapter

/**
 * Data structure with CRUD operations for a {@link EntityCollection},
 */
interface EntityCollectionAdapter<TEntityState extends EntityState> {
  /**
   * Implementation of {@link AddOneFunction}.
   */
  addOne: AddOneFunction<TEntityState>;
  /**
   * Implementation of {@link AddManyFunction}.
   */
  addMany: AddManyFunction<TEntityState>;
}

// @region-end

export {
  type EntityId,
  type EntityState,
  type AddOneFunction,
  type AddManyFunction,
  type EntityCollectionAdapter,
  type EntityCollection,
  type AddOneFunctionOptions,
  type AddManyFunctionOptions,
};
