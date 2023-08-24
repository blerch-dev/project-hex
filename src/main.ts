import App from './App';
const Game = new App();

// External to App (Dev Dependent)
document.addEventListener('DOMContentLoaded', () => {
    let button  = document.getElementById('Fullscreen');
    const aspect = window.innerWidth / window.innerHeight;
    const isMobile = aspect < 1; if(isMobile) { document.body.classList.add('touch'); }
    if(button instanceof Element) { button.onclick = () => { Game.RequestFullscreen(); } }
});

