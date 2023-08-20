import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id";

export type CategoryProperties = {
    name: string;
    isActive?: boolean;
    description?: string;
    createdAt?: Date;
}

export default class Category {
    public readonly id: UniqueEntityId;

    constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
        this.id = id || new UniqueEntityId();
        this.description = this.props.description ?? null;
        this.isActive = this.props.isActive ?? true;
        this.props.createdAt = this.props.createdAt ?? new Date();
    }

    get name(): string {
        return this.props.name;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    private set isActive(value: boolean) {
        this.props.isActive = value ?? true;
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