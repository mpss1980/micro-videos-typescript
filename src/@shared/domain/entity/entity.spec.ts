import Entity from "./entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";

class StubEntity extends Entity<UniqueEntityId, { prop1: string; prop2: number }> {

    constructor(props: { prop1: string; prop2: number }, entityId?: UniqueEntityId) {
        super(props, entityId ?? new UniqueEntityId());
    }

    toJSON(): Required<{ id: string; } & { prop1: string; prop2: number; }> {
        return {
            id: this.id,
            prop1: this.props.prop1,
            prop2: this.props.prop2,
        };
    }
}

describe('Entity', () => {

    it('should set props and id', () => {
        const arrange = {prop1: 'test', prop2: 10};
        const entity = new StubEntity(arrange);

        expect(entity.props).toStrictEqual(arrange);
        expect(entity.entityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBeTruthy();
    });

    it('should accept a valid uuid', () => {
        const arrange = {prop1: 'test', prop2: 10};
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(arrange, uniqueEntityId);

        expect(entity.entityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.value);
    });

    it('should convert an entity to a JSON object', () => {
        const arrange = {prop1: 'test', prop2: 10};
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(arrange, uniqueEntityId);

        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange,
        });
    });
});