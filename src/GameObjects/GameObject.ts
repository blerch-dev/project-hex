import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';

export default class GameObject {
    
    static Objects: Set<GameObject> = new Set();

    public Name: string = "GameObject";

    protected runFrame: Function;

    private _ID: string;
    protected set ID(value: string) { this._ID = value; }
    public get ID(): string { return this._ID }

    constructor(callback: (delta: number, ...args: any[]) => void) {
        this._ID = uuidv4();
        this.runFrame = callback;
        
        GameObject.Objects.add(this);
    }

    run(delta: number) {
        this.runFrame(delta);
    }
}