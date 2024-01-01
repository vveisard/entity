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
 * Normalized data structure.
 */
interface EntityChunkState<TEntityState extends EntityState = EntityState> {
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
  chunkState: EntityChunkState<TEntityState>,
  entityId: EntityId,
  entityState: TEntityState,
  options?: AddOneFunctionOptions,
) => EntityChunkState<TEntityState>;

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
 * @returns `chunkState` when all already exist (ie, a no-op).
 */
type AddManyFunction<TEntityState extends EntityState> = (
  chunkState: EntityChunkState<TEntityState>,
  manyEntityIdToState: Record<EntityId, TEntityState>,
  options?: AddManyFunctionOptions,
) => EntityChunkState<TEntityState>;

// @region-end

// @region-begin Entity Adapter

/**
 * Data structure with CRUD operations for a {@link EntityChunkState},
 */
interface EntityChunkAdapter<TEntityState extends EntityState> {
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
  type EntityChunkAdapter,
  type EntityChunkState,
};
