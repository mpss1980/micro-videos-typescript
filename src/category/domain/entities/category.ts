import UniqueEntityIdVo from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import UniqueEntityIdValueObject from "../../../@shared/domain/value-objects/unique-entity-id.vo";

export type CategoryProperties = {
    name: string,
    description?: string,
    isActive?: boolean,
    createdAt?: Date,
}

export default class Category extends UniqueEntityIdValueObject {

    constructor(public readonly props: CategoryProperties, entityId?: string) {
        super(entityId);
        Category.validate(props);
        this.description = this.props.description;
        this.isActive = this.props.isActive ?? true;
        this.createdAt = this.props.createdAt ?? new Date();
    }

    update(name: string, description: string) {
        Category.validate({name, description});
        this.name = name;
        this.description = description;
    }

    static validate(props: CategoryProperties) {
        return true; //todo: implement validate
    }

    activate() {
        this.props.isActive = true;
    }

    deactivate() {
        this.props.isActive = false;
    }

    private set name(value: string) {
        this.props.name = value;
    }

    get name() {
        return this.props.name;
    }

    private set description(value: string) {
        this.props.description = value ?? null;
    }

    get description() {
        return this.props.description;
    }

    private set isActive(value: boolean) {
        this.props.isActive = value;
    }

    get isActive() {
        return this.props.isActive;
    }

    private set createdAt(value: Date) {
        this.props.createdAt = value;
    }

    get createdAt() {
        return this.props.createdAt;
    }
}