import * as THREE from 'three';

import UI from './UI';
import GameObject from './GameObjects/GameObject';

export default class App {
    // Three.js
    private aspectRatio = window.innerWidth / window.innerHeight;
    private scene: THREE.Scene = new THREE.Scene();
    private renderer: THREE.Renderer = new THREE.WebGLRenderer();
    private camera: THREE.Camera = new THREE.PerspectiveCamera(80, this.aspectRatio, 0.1, 1000);

    // DOM Elements
    private elements = {
        Debug: document.createElement('div') as Element,
        Game: document.createElement('div') as Element,
        UI: document.createElement('div') as Element
    };

    // Game Managed
    private settings = {
        debug: true,
        fixedUpdateSpeed: 30,
        updateSpeed: 0,
    };

    // State
    private state = {
        initialized: false,
        shouldRender: true,
        lastTimestamp: 0
    };

    // Player Settings / Render Options
    protected options: {} = {};

    // Game Objects
    protected gameObjects: Set<GameObject> = new Set();

    constructor(...props: any) {
        document.addEventListener('DOMContentLoaded', () => {
            this.elements = {
                Debug: document.getElementById('Debug') ?? document.createElement('div'),
                Game: document.getElementById('Game') ?? document.createElement('div'),
                UI: document.getElementById('UI') ?? document.createElement('div'),
            }

            this.Initialize(); 
        });
    }

    private Initialize() {
        this.state.initialized = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => {
            this.aspectRatio = window.innerWidth / window.innerHeight;
            (this.camera as any).aspect = this.aspectRatio;
            (this.camera as any).updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            // might need to mirror to canvas
        });

        this.camera.position.z = 5;

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.gameObjects.add(new GameObject((delta) => {
            cube.rotation.x += 0.01 * delta / 20;

            cube.rotation.y += 0.01 * delta / 20;
        }));

        this.scene.add(cube);
        this.scene.add(new THREE.AmbientLight(0x222222));
        this.Start();
    }

    public async Start() {
        this.render();
    }

    public RequestFullscreen() {
        this.elements.Game.requestFullscreen();
    }

    public DeviceDetails() {
        let text = `Window Aspect: ${Math.round(this.aspectRatio * 100) / 100}`;
        text += `\nNavigator: ${navigator.userAgent}`;
        text += `\nScreen Orientation: ${screen.orientation.type}`;
        text += `\n`;
        return text;
    }

    protected render(ts: number = 0) {
        if(this.state.shouldRender) {
            if(this.settings.updateSpeed === 0) { requestAnimationFrame((ts) => { this.render(ts) }) }
        }

        // Set Delta
        const delta = ts - this.state.lastTimestamp;
    
        // Objects
        let objects = Array.from(this.gameObjects);
        for(let i = 0; i < objects.length; i++) {
            objects[i].run(delta);
        }

        // Debug
        this.elements.Debug.textContent = this.DeviceDetails();
    
        this.state.lastTimestamp = ts;
        this.renderer.render(this.scene, this.camera);
    }
}