import ValueObject from "../value-objects/value-object";

export default abstract class Entity<
    EntityId extends ValueObject = any,
    Props = any,
    JsonProps = Required<{ id: string } & Props>
> {
    protected constructor(
        public readonly props: Props,
        public readonly entityId: EntityId,
        ) {
    }

    get id(): string {
        return this.entityId.value;
    }

    abstract toJSON(): JsonProps;
}