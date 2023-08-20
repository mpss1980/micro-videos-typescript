import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id";
import Entity from "../../../@shared/domain/entitties/entity";
import ValidatorRules from "../../../@shared/domain/validators/validator-rules";
import CategoryValidatorFactory from "../validators/category.validator";

export type CategoryProperties = {
    name: string;
    isActive?: boolean;
    description?: string;
    createdAt?: Date;
}

export default class Category extends Entity<CategoryProperties> {

    constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
        Category.validate(props);
        super(props, id);
        this.description = this.props.description ?? null;
        this.props.isActive = this.props.isActive ?? true;
        this.props.createdAt = this.props.createdAt ?? new Date();
    }

    update(name: string, description: string): void {
        Category.validate({ name, description });
        this.name = name;
        this.description = description;
    }

    static validate(props: CategoryProperties): void {
        const validator = CategoryValidatorFactory.create();
        validator.validate(props);
    }

    activate(): void {
        this.props.isActive = true;
    }

    deactivate(): void {
        this.props.isActive = false;
    }

    get name(): string {
        return this.props.name;
    }

    private set name(value: string) {
        this.props.name = value;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    get description(): string {
        return this.props.description;
    }

    private set description(value: string) {
        this.props.description = value ?? null;
    }

    get createdAt(): Date | undefined {
        return this.props.createdAt;
    }
}