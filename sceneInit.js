"use strict";


const sceneInit = (function() {

return {

    // Création et ajout de lumière dans le graphe de scène
insertLight: function(sceneGraph) {
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-5,8,0);
        sceneGraph.add(spotLight);
    },

    // Création et ajout d'une caméra dans le graphe de scène
createCamera: function(x,y,z) {
        const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,500);
        camera.position.set(x,y,z);
        camera.lookAt(0,0,0);

        return camera;
    },

    // Initialisation du moteur de rendu
createRenderer : function(){
        const renderer = new THREE.WebGLRenderer( );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor(0xaaaaaa,1.0);
        renderer.setSize( window.innerWidth, window.innerHeight );

        return renderer;
    },


insertRenderInHtml : function(domElement) {
    const baliseHtml = document.querySelector("#AffichageScene3D");
    baliseHtml.appendChild(domElement);
},

};

})();
