import {isEqual} from "lodash";
import {deepFreeze} from "../utils/object";

export default abstract class ValueObject<Value = any> {
    protected readonly _value: Value;

    constructor(value: Value) {
        this._value = deepFreeze(value);
    }

    get value(): Value {
        return this._value;
    }

    equals(obj: this): boolean {
        if (obj === null || obj === undefined) {
            return false;
        }

        if (obj.value === undefined) {
            return false;
        }

        if (obj.constructor.name !== this.constructor.name) {
            return false;
        }

        return isEqual(this.value, obj.value);
    };

    toString = (): string => {
       if(typeof this.value !== 'object' || this.value === null) {
          try {
              return this.value?.toString();
          } catch (e) {
              return this.value + '';
          }
       }

       const stringValue = this.value.toString();
       return stringValue === '[object Object]' ? JSON.stringify(this.value) : stringValue;
    }
}