import * as THREE from 'three';

export default class GameObject {
    
    private runFrame: Function;

    constructor(anme: string, mesh: THREE.Mesh, callback: (delta: number, ...args: any[]) => void) {
        this.runFrame = callback;
    }

    run(delta: number) {
        this.runFrame(delta);
    }
}