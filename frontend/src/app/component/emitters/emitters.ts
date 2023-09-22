import { EventEmitter } from "@angular/core";

export class Emitters {
    static authEmitter = new EventEmitter<boolean>()
    static adminAuthEmitter = new EventEmitter<boolean>()
}