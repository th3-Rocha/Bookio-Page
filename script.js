

let booksInDOM = document.getElementsByName("3d");
let Bookcount =0;

booksInDOM.forEach(element => {
  let scene,
  camera,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  container,
  object,
  HEIGHT,
  WIDTH;
  let State = "pyphone";
  let createScene = () => {

  HEIGHT = 300;
  WIDTH = 200;
  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 10;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.x = 0;
  camera.position.z = 6;
  camera.position.y = 0;
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;

  container = booksInDOM[Bookcount];

  container.appendChild(renderer.domElement);
  window.addEventListener("resize", handleWindowResize, true);
  
  let loader = new THREE.GLTFLoader();

    let heightb = booksInDOM[Bookcount].getAttribute("heightb");
    let pageCountb = booksInDOM[Bookcount].getAttribute("pageCountb");
    let widthb = booksInDOM[Bookcount].getAttribute("widthb");


    loader.load('gltf/book.gltf',
      (gltf) => {
        object = gltf.scene;
        object.position.y = 0;
        object.position.z = 0;
        object.position.x = 0;
        object.scale.set(widthb,heightb,pageCountb);
        scene.add(object);
      }
    );
  




    let bookCoverTex = '/imgs/booksCovers/book-id-' + booksInDOM[Bookcount].id + '.jpg';


  };
  let stateFunction = (name) =>{
  State = name;
  console.log(State);

  }
  
  const handleWindowResize = () => {
  camera.updateProjectionMatrix();
  };

  const createLights = () => {
  const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040,2);

  const directionalLight = new THREE.DirectionalLight(0xdfebff, 2);
  directionalLight.position.set(0, 0, 0);


  scene.add(ambientLight, directionalLight);
  };


  const loop = () => {
  renderer.render(scene, camera);
  renderer.outputEncoding = THREE.sRGBEncoding;
  if (object) {
    object.rotation.y -= 0.01;
  }

  requestAnimationFrame(loop);

  };



  let main = () => {
  // create and renders 3d objects
  createScene();
  createLights();
  renderer.render(scene, camera);
  loop();
  // create and renders 3d objects
  };

  main();


  Bookcount++;
});




