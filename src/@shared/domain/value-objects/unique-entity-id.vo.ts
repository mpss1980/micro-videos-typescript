import { v4 as uuidv4 } from 'uuid';

export default class UniqueEntityIdValueObject {
  private readonly _value: string;

  constructor(value?: string) {
    this._value = value ?? uuidv4();
  }

  get uniqueId(): string {
    return this._value;
  }
}