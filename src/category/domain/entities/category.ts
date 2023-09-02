export type CategoryProperties = {
    name: string,
    description?: string,
    isActive?: boolean,
    createdAt?: Date,
}
export default class Category {

    constructor(public readonly props: CategoryProperties) {
        Category.validate(props);
        this.description = this.props.description;
        this.isActive = this.props.isActive ?? true;
        this.createdAt = this.props.createdAt ?? new Date();
    }

    static validate(props: CategoryProperties) {
        return true; //todo: implement validate
    }

    private set description(value: string) {
        this.props.description = value ?? null;
    }

    private set isActive(value: boolean) {
        this.props.isActive = value;
    }

    private set createdAt(value: Date) {
        this.props.createdAt = value;
    }
}