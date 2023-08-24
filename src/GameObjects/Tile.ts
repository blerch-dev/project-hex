import * as THREE from 'three';
import GameObject from './GameObject';

export interface TileSegment {
    Mesh: THREE.Mesh,
    Material: THREE.MeshBasicMaterial,
}

export class Tile extends GameObject {

    public Position: THREE.Vector;

    protected Segments: TileSegment[] = [];

    constructor(position: THREE.Vector, callback: (delta: number, ...args: any[]) => void) {
        super(callback);
        this.Position = position;
        
        // Need way to get where the edges are lining up to their neighbors
    }

    run(delta: number) {
        this.runFrame(delta);
    }
}