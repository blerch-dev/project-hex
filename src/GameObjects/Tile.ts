import * as THREE from 'three';
import GameObject from './GameObject';

export interface TileSegment {
    Mesh: THREE.Mesh,
    Material: THREE.MeshBasicMaterial,
}

export class Tile extends GameObject {

    public Position: THREE.Vector;
    public Radius: number;

    protected Segments: TileSegment[] = [];

    constructor(callback: (delta: number, ...args: any[]) => void, position = new THREE.Vector3(0, 0, 0), radius = 2) {
        super(callback);
        this.Position = position;
        this.Radius = radius;
        
        // Need way to get where the edges are lining up to their neighbors
    }

    getSegments() { return this.Segments; }

    generateSegments(pos = this.Position, radius = this.Radius) {

        const points = [
            pos.add(new THREE.Vector2(-radius, radius/2)),
            pos.add(new THREE.Vector2(-radius, -radius/2)),
            pos.add(new THREE.Vector2(0, -radius)),
            pos.add(new THREE.Vector2(radius, -radius/2)),
            pos.add(new THREE.Vector2(radius, radius/2)),
            pos.add(new THREE.Vector2(0, radius)),
        ];

        const types = [
            0x909a24, // Muted Yellow - Crop
            0x595c84, // Muted Blue - City
            0x019626, // Muted Green - Grass
            0x123b60, // Muted Blue - Water
            0xb46d55, // Muted Brown/Orange - Trees
        ] as number[];

        for(let i = 0; i < points.length; i++) {
            let seg = {} as TileSegment;

            let third_pos = i + 1 >= points.length ? points[0] : points[i + 1];
            let geo = [ pos, points[i], third_pos ] as THREE.Vector2[];

            seg.Material = new THREE.MeshBasicMaterial({ color: types[Math.floor(Math.random() * types.length)], side: THREE.DoubleSide });
            seg.Mesh = new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(geo)), seg.Material);

            this.Segments.push(seg);
        }
    }

    run(delta: number) {
        this.runFrame(delta);
    }
}

export class TileMap {
    constructor() {}
}