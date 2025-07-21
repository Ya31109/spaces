/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
//23FI049 佐藤直弥




class ThreeJSContainer {
    scene;
    light;
    cloud;
    particleVelocity;
    constructor() { }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0x000000));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
        let gui = new lil_gui__WEBPACK_IMPORTED_MODULE_3__["default"](); // GUI用のインスタンスの生成
        let guiObj = {
            firework: "Generation",
            color: "rgb(255, 0, 0)",
            rains: "Off",
            Rcolor: "rgba(74, 180, 255, 1)",
            warps: "Off",
            stars: "Off"
        }; // GUIのパラメータ
        const fireworkController = gui.add(guiObj, "firework", [
            "Generation",
            "Off",
        ]);
        const color = gui.addColor(guiObj, "color");
        const rainsController = gui.add(guiObj, "rains", ["ON", "Off"]);
        const Rcolor = gui.addColor(guiObj, "Rcolor");
        const warpController = gui.add(guiObj, "warps", ["Cause", "Off"]);
        const starsController = gui.add(guiObj, "stars", ["ON", "Off"]);
        let rains = (color) => {
            //新しいキャンバスの作成
            let canvas = document.createElement("canvas");
            canvas.width = 8;
            canvas.height = 8;
            //円形のグラデーションの作成
            let context = canvas.getContext("2d");
            let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(0.4, color);
            gradient.addColorStop(1, "rgba(0,0,0,1)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            //テクスチャの生成
            let texture = new three__WEBPACK_IMPORTED_MODULE_2__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        //const material = new THREE.PointsMaterial({ size: 1, color: 0xFFFFFF, transparent: true, opacity:0.8 });
        //particleの作成
        const rainMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.SpriteMaterial({
            map: rains(guiObj.Rcolor),
        });
        const rainCubes = [];
        let rainsX = [];
        let rainsY = [];
        let rainsZ = [];
        let raininfo = [];
        let rainsUpdatePositions = [];
        for (let i = 0; i < 500; i++) {
            rainsX[i] = -35 * Math.random() - 15;
            rainsY[i] = -50 * Math.random() + 25;
            rainsZ[i] = -50 * Math.random() + 25;
            rainCubes[i] = new three__WEBPACK_IMPORTED_MODULE_2__.Sprite(rainMaterial);
            rainCubes[i].scale.set(0.4, 0.4, 0.4);
            rainCubes[i].position.x = rainsX[i];
            rainCubes[i].position.y = rainsY[i];
            rainCubes[i].position.z = rainsZ[i];
            rainCubes[i].visible = false;
            this.scene.add(rainCubes[i]);
            raininfo.push({
                positionX: rainsX[i],
                positionY: rainsY[i],
                positionZ: rainsZ[i],
            });
            rainCubes[i].material.transparent = true;
            rainsUpdatePositions[i] = () => {
                rainCubes[i].position.x = raininfo[i].positionX;
                rainCubes[i].position.y = raininfo[i].positionY;
                rainCubes[i].position.z = raininfo[i].positionZ;
            };
        }
        const rains1 = [];
        const rains2 = [];
        for (let i = 0; i < 500; i++) {
            rains1[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(raininfo[i])
                .to({
                positionX: rainsX[i] + 50,
                positionY: rainsY[i] - 1,
                positionZ: rainsZ[i],
            }, Math.random() * 5000 + 3000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Linear.None)
                .onUpdate(rainsUpdatePositions[i]);
            rains2[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(raininfo[i])
                .to({
                positionX: rainsX[i] + 50,
                positionY: rainsY[i] - 1,
                positionZ: rainsZ[i],
            }, 0)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out)
                .onUpdate(rainsUpdatePositions[i]);
            rains1[i].chain(rains2[i]);
            rains2[i].chain(rains1[i]);
        }
        for (let i = 0; i < 500; i++) {
            rains1[i].start();
        }
        let warps = (color) => {
            //新しいキャンバスの作成
            let canvas = document.createElement("canvas");
            canvas.width = 8;
            canvas.height = 8;
            //円形のグラデーションの作成
            let context = canvas.getContext("2d");
            let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(0.4, color);
            gradient.addColorStop(1, "rgba(0,0,0,1)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            //テクスチャの生成
            let texture = new three__WEBPACK_IMPORTED_MODULE_2__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        //const material = new THREE.PointsMaterial({ size: 1, color: 0xFFFFFF, transparent: true, opacity:0.8 });
        //particleの作成
        const warpsMaterial = [];
        const warpsCubes = [];
        let warpsX = [];
        let warpsY = [];
        let warpsZ = [];
        let warpsinfo = [];
        let warpsUpdatePositions = [];
        for (let i = 0; i < 500; i++) {
            warpsMaterial[i] = new three__WEBPACK_IMPORTED_MODULE_2__.SpriteMaterial({
                map: warps(guiObj.Rcolor),
            });
            warpsX[i] = -35 * Math.random() - 15;
            warpsY[i] = -50 * Math.random() + 25;
            warpsZ[i] = -50 * Math.random() + 25;
            warpsCubes[i] = new three__WEBPACK_IMPORTED_MODULE_2__.Sprite(warpsMaterial[i]);
            warpsCubes[i].material.transparent = true;
            warpsCubes[i].scale.set(0.4, 0.4, 0.4);
            warpsCubes[i].position.x = warpsX[i];
            warpsCubes[i].position.y = warpsY[i];
            warpsCubes[i].position.z = warpsZ[i];
            warpsCubes[i].material.opacity = 0;
            this.scene.add(warpsCubes[i]);
            warpsinfo.push({
                positionX: warpsX[i],
                positionY: warpsY[i],
                positionZ: warpsZ[i],
                opacity: 0,
            });
            warpsCubes[i].material.transparent = true;
            warpsUpdatePositions[i] = () => {
                warpsCubes[i].position.x = warpsinfo[i].positionX;
                warpsCubes[i].position.y = warpsinfo[i].positionY;
                warpsCubes[i].position.z = warpsinfo[i].positionZ;
                warpsCubes[i].material.opacity = warpsinfo[i].opacity;
            };
        }
        const warps1 = [];
        const warps2 = [];
        const warps3 = [];
        const warps4 = [];
        const warps5 = [];
        const warps6 = [];
        for (let i = 0; i < 500; i++) {
            warps1[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(warpsinfo[i])
                .to({
                positionX: warpsX[i] + 20,
                positionY: warpsY[i] - 1,
                positionZ: warpsZ[i],
                opacity: 1,
            }, Math.random() * 1500 + 500)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out)
                .onUpdate(warpsUpdatePositions[i]);
            warps2[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(warpsinfo[i])
                .to({
                positionX: warpsX[i] + 10,
                positionY: warpsY[i] - 1,
                positionZ: warpsZ[i],
                opacity: 1,
            }, 500)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Linear.None)
                .onUpdate(warpsUpdatePositions[i]);
            warps3[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(warpsinfo[i])
                .to({
                positionX: warpsX[i] + 300,
                positionY: warpsY[i] - 1,
                positionZ: warpsZ[i],
                opacity: 1,
            }, 1500)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.In)
                .onUpdate(warpsUpdatePositions[i]);
            warps4[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(warpsinfo[i])
                .to({
                positionX: warpsX[i],
                positionY: warpsY[i] - 1,
                positionZ: warpsZ[i],
                opacity: 1,
            }, 0)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Linear.None)
                .onUpdate(warpsUpdatePositions[i]);
            warps5[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(warpsinfo[i])
                .to({
                positionX: warpsX[i] + 300,
                positionY: warpsY[i] - 1,
                positionZ: warpsZ[i],
                opacity: 1,
            }, 1000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.In)
                .onUpdate(warpsUpdatePositions[i]);
            warps6[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(warpsinfo[i])
                .to({
                positionX: warpsX[i],
                positionY: warpsY[i] - 1,
                positionZ: warpsZ[i],
                opacity: 0,
            }, 0)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Linear.None)
                .onUpdate(warpsUpdatePositions[i]);
            warps1[i].chain(warps2[i]);
            warps2[i].chain(warps3[i]);
            warps3[i].chain(warps4[i]);
            warps4[i].chain(warps5[i]);
            warps5[i].chain(warps6[i]);
        }
        let generateSprite = (color) => {
            //新しいキャンバスの作成
            let canvas = document.createElement("canvas");
            canvas.width = 8;
            canvas.height = 8;
            //円形のグラデーションの作成
            let context = canvas.getContext("2d");
            let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(0.4, color);
            gradient.addColorStop(1, "rgba(0,0,0,1)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            //テクスチャの生成
            let texture = new three__WEBPACK_IMPORTED_MODULE_2__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.SpriteMaterial({
            map: generateSprite(guiObj.color),
        });
        const cubes = [];
        let startX = -80;
        let startY = -40;
        let startZ = 0;
        let X = -60;
        let Y = 10;
        let Z = 0;
        for (let i = 0; i < 1000; i++) {
            cubes[i] = new three__WEBPACK_IMPORTED_MODULE_2__.Sprite(material);
            cubes[i].position.x = startX;
            cubes[i].position.y = startY;
            cubes[i].position.z = startZ;
            this.scene.add(cubes[i]);
        }
        // Tweenでコントロールする変数の定義
        let fireworkinfo = [];
        for (let i = 0; i < 1000; i++) {
            fireworkinfo.push({
                positionX: -80,
                positionY: -40,
                positionZ: 0,
                opacity: 1,
            });
        }
        //  Tweenでパラメータの更新の際に呼び出される関数
        let updatePositions = [];
        for (let i = 0; i < 1000; i++) {
            cubes[i].material.transparent = true;
            updatePositions[i] = () => {
                cubes[i].position.x = fireworkinfo[i].positionX;
                cubes[i].position.y = fireworkinfo[i].positionY;
                cubes[i].position.z = fireworkinfo[i].positionZ;
                cubes[i].material.opacity = fireworkinfo[i].opacity;
            };
        }
        let scale = 30;
        const fireworks1 = [];
        const fireworks2 = [];
        const fireworks3 = [];
        const fireworks4 = [];
        for (let i = 0; i < 1000; i++) {
            const phi = Math.random() * Math.PI * 2 - Math.PI;
            const theta = Math.random() * Math.PI * 2;
            fireworks1[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(fireworkinfo[i])
                .to({ positionX: X, positionY: Y, positionZ: Z, opacity: 1 }, 5000)
                .delay(500)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out)
                .onUpdate(updatePositions[i]);
            fireworks2[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(fireworkinfo[i])
                .to({
                positionX: X + scale * Math.sin(phi) * Math.cos(theta),
                positionY: Y + scale * Math.cos(phi),
                positionZ: Z + scale * Math.sin(phi) * Math.sin(theta),
            }, 1000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out)
                .onUpdate(updatePositions[i]);
            fireworks3[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(fireworkinfo[i])
                .to({
                positionX: X + (scale + 2) * Math.sin(phi) * Math.cos(theta),
                positionY: Y + (scale + 1) * Math.cos(phi),
                positionZ: Z + (scale + 1) * Math.sin(phi) * Math.sin(theta),
                opacity: 0,
            }, 2000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out)
                .onUpdate(updatePositions[i]);
            fireworks4[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(fireworkinfo[i])
                .to({
                positionX: startX,
                positionY: startY,
                positionZ: startZ,
                opacity: 0,
            }, 1)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out)
                .onUpdate(updatePositions[i]);
            fireworks1[i].chain(fireworks2[i]);
            fireworks2[i].chain(fireworks3[i]);
            fireworks3[i].chain(fireworks4[i]);
        }
        // アニメーションの開始
        for (let i = 0; i < 1000; i++) {
            fireworks1[i].start();
        }
        let drawStar = () => {
            let star = new three__WEBPACK_IMPORTED_MODULE_2__.Shape();
            star.moveTo(0, 1);
            star.lineTo(0.25, 0.5);
            star.lineTo(0.75, 0.5);
            star.lineTo(0.4, 0.1);
            star.lineTo(0.6, -0.5);
            star.lineTo(0, -0.2);
            star.lineTo(-0.6, -0.5);
            star.lineTo(-0.4, 0.1);
            star.lineTo(-0.75, 0.5);
            star.lineTo(-0.25, 0.5);
            return star;
        };
        let exStar = {
            steps: 1,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 1,
            bevelSegment: 5,
        };
        let starAmounts = 12;
        let list = [];
        let positionList = [];
        let groupStar = [];
        let starsinfo = [];
        let starsUpdatePositions = [];
        for (let i = 0; i < starAmounts; i++) {
            let GeometryStar = new three__WEBPACK_IMPORTED_MODULE_2__.ExtrudeGeometry(drawStar(), exStar);
            let meshStar = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhongMaterial({
                color: 0xffff99,
                side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide,
            });
            groupStar[i] = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
            groupStar[i].add(new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(GeometryStar, meshStar));
            if (i < 2) {
                positionList.push({
                    x: -35 * Math.random() - 50,
                    y: -20 * Math.random() + 10,
                    z: -20 * Math.random() + 10,
                });
            }
            else if (i < starAmounts * 2 / 3) {
                positionList.push({
                    x: -35 * Math.random() - 35,
                    y: 15 * Math.random(),
                    z: -30 * Math.random() + 15,
                });
            }
            else {
                positionList.push({
                    x: -35 * Math.random() - 35,
                    y: -10 * Math.random(),
                    z: -30 * Math.random() + 15,
                });
            }
            groupStar[i].position.x = positionList[i].x;
            groupStar[i].position.y = positionList[i].y;
            groupStar[i].position.z = positionList[i].z;
            let s = 0;
            if (i < 2) {
                s = Math.random() * 1 + 0.5;
            }
            else {
                s = Math.random() * 0.2 + 0.02;
            }
            groupStar[i].scale.set(s, s, s);
            groupStar[i].rotateX(Math.random() * 0.03 - 0.015);
            groupStar[i].rotateY(Math.random() * 0.03 - 0.015);
            groupStar[i].rotateZ(Math.random() * 0.03 - 0.015);
            list.push({
                x: Math.random() * 0.03 - 0.015,
                y: Math.random() * 0.03 - 0.015,
                z: Math.random() * 0.03 - 0.015,
            });
            this.scene.add(groupStar[i]);
            starsinfo.push({
                positionX: positionList[i].x,
                positionY: positionList[i].y,
                positionZ: positionList[i].z,
            });
            starsUpdatePositions[i] = () => {
                groupStar[i].position.x = starsinfo[i].positionX;
                groupStar[i].position.y = starsinfo[i].positionY;
                groupStar[i].position.z = starsinfo[i].positionZ;
            };
        }
        const stars1 = [];
        const stars2 = [];
        for (let i = 0; i < starAmounts; i++) {
            stars1[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(starsinfo[i])
                .to({
                positionX: positionList[i].x + 120,
                positionY: positionList[i].y - 1,
                positionZ: positionList[i].z,
            }, Math.random() * 10000 + 2000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Linear.None)
                .onUpdate(starsUpdatePositions[i]);
            stars2[i] = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(starsinfo[i])
                .to({
                positionX: positionList[i].x + 120,
                positionY: positionList[i].y - 1,
                positionZ: positionList[i].z,
            }, 0)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out)
                .onUpdate(starsUpdatePositions[i]);
            stars1[i].chain(stars2[i]);
            stars2[i].chain(stars1[i]);
        }
        for (let i = 0; i < starAmounts; i++) {
            stars1[i].start();
        }
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, 0).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        const bottomLight = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff, 0.5); // 下からの光
        const bottomLvec = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, -1, 0).clone().normalize();
        bottomLight.position.set(bottomLvec.x, bottomLvec.y, bottomLvec.z);
        this.scene.add(bottomLight);
        // 毎フレームのupdateを呼んで，更新
        // requestAnimationFrame により次フレームを呼ぶ
        color.onChange((value) => {
            material.map = generateSprite(value);
            material.needsUpdate = true;
        });
        Rcolor.onChange((value) => {
            // valueは変更後のRcolorの値（例: 'rgb(X, Y, Z)'）
            // warpsMaterialは各キューブに個別なのでループして更新
            rainMaterial.map = generateSprite(value);
            rainMaterial.needsUpdate = true;
            for (let i = 0; i < 500; i++) {
                warpsMaterial[i].map = generateSprite(value);
                warpsMaterial[i].needsUpdate = true;
            }
        });
        let boolrains = false;
        let boolrainsSave = false;
        let boolstars = false;
        let boolstarsSave = false;
        let update = (time) => {
            for (let i = 0; i < starAmounts; i++) {
                groupStar[i].rotateX(list[i].x);
                groupStar[i].rotateY(list[i].y);
                groupStar[i].rotateZ(list[i].z);
            }
            switch (guiObj.firework) {
                case "Generation":
                    for (let i = 0; i < 1000; i++) {
                        fireworks1[i].start();
                    }
                    guiObj.firework = "Off";
                    fireworkController.updateDisplay();
                    break;
                case "Off":
                    break;
            }
            switch (guiObj.rains) {
                case "ON":
                    boolrains = true;
                    for (let i = 0; i < 500; i++) {
                        rainCubes[i].visible = true;
                    }
                    break;
                case "Off":
                    boolrains = false;
                    for (let i = 0; i < 500; i++) {
                        rainCubes[i].visible = false;
                    }
                    break;
            }
            switch (guiObj.warps) {
                case "Cause":
                    setTimeout(() => {
                        if (boolrains) {
                            boolrainsSave = true;
                            guiObj.rains = "Off";
                            rainsController.updateDisplay();
                        }
                        if (boolstars) {
                            boolstarsSave = true;
                            for (let i = 0; i < starAmounts; i++) {
                                guiObj.stars = "Off";
                            }
                            starsController.updateDisplay();
                        }
                    }, 2000);
                    for (let i = 0; i < 500; i++) {
                        warps1[i].start();
                    }
                    guiObj.warps = "Off";
                    warpController.updateDisplay();
                    setTimeout(() => {
                        if (boolrainsSave) {
                            boolrainsSave = false;
                            guiObj.rains = "ON";
                            rainsController.updateDisplay();
                        }
                        if (boolstarsSave) {
                            boolstarsSave = false;
                            for (let i = 0; i < starAmounts; i++) {
                                guiObj.stars = "ON";
                            }
                            starsController.updateDisplay();
                        }
                    }, 4000);
                    break;
                case "Off":
                    break;
            }
            switch (guiObj.stars) {
                case "ON":
                    boolstars = true;
                    for (let i = 0; i < starAmounts; i++) {
                        groupStar[i].visible = true;
                    }
                    break;
                case "Off":
                    boolstars = false;
                    for (let i = 0; i < starAmounts; i++) {
                        groupStar[i].visible = false;
                    }
                    break;
            }
            requestAnimationFrame(update);
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update(); //追加分
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(5, 0, 0));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_lil-gui_dist_lil-gui_esm-9ea7c3"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vMjNGSTA0OSDkvZDol6Tnm7TlvKVcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5pbXBvcnQgR1VJIGZyb20gXCJsaWwtZ3VpXCI7XG5cbmNsYXNzIFRocmVlSlNDb250YWluZXIge1xuICAgIHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0O1xuXG4gICAgcHJpdmF0ZSBjbG91ZDogVEhSRUUuUG9pbnRzO1xuICAgIHByaXZhdGUgcGFydGljbGVWZWxvY2l0eTogVEhSRUUuVmVjdG9yM1tdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQKOihqOekuuOBmeOCi+aeoOOBlOOBqOOBqykqXG4gICAgcHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKFxuICAgICAgICB3aWR0aDogbnVtYmVyLFxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcbiAgICAgICAgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzXG4gICAgKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHgwMDAwMDApKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAvL+OCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShcbiAgICAgICAgICAgIDc1LFxuICAgICAgICAgICAgd2lkdGggLyBoZWlnaHQsXG4gICAgICAgICAgICAwLjEsXG4gICAgICAgICAgICAxMDAwXG4gICAgICAgICk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCBjYW1lcmEpO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfTtcblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgICBsZXQgZ3VpID0gbmV3IEdVSSgpOyAvLyBHVUnnlKjjga7jgqTjg7Pjgrnjgr/jg7Pjgrnjga7nlJ/miJBcbiAgICAgICAgbGV0IGd1aU9iaiA9IHtcbiAgICAgICAgICAgIGZpcmV3b3JrOiBcIkdlbmVyYXRpb25cIixcbiAgICAgICAgICAgIGNvbG9yOiBcInJnYigyNTUsIDAsIDApXCIsXG4gICAgICAgICAgICByYWluczogXCJPZmZcIixcbiAgICAgICAgICAgIFJjb2xvcjogXCJyZ2JhKDc0LCAxODAsIDI1NSwgMSlcIixcbiAgICAgICAgICAgIHdhcnBzOiBcIk9mZlwiLFxuICAgICAgICAgICAgc3RhcnM6IFwiT2ZmXCJcbiAgICAgICAgfTsgLy8gR1VJ44Gu44OR44Op44Oh44O844K/XG4gICAgICAgIGNvbnN0IGZpcmV3b3JrQ29udHJvbGxlciA9IGd1aS5hZGQoZ3VpT2JqLCBcImZpcmV3b3JrXCIsIFtcbiAgICAgICAgICAgIFwiR2VuZXJhdGlvblwiLFxuICAgICAgICAgICAgXCJPZmZcIixcbiAgICAgICAgXSk7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gZ3VpLmFkZENvbG9yKGd1aU9iaiwgXCJjb2xvclwiKTtcbiAgICAgICAgY29uc3QgcmFpbnNDb250cm9sbGVyID0gZ3VpLmFkZChndWlPYmosIFwicmFpbnNcIiwgW1wiT05cIiwgXCJPZmZcIl0pO1xuICAgICAgICBjb25zdCBSY29sb3IgPSBndWkuYWRkQ29sb3IoZ3VpT2JqLCBcIlJjb2xvclwiKTtcbiAgICAgICAgY29uc3Qgd2FycENvbnRyb2xsZXIgPSBndWkuYWRkKGd1aU9iaiwgXCJ3YXJwc1wiLCBbXCJDYXVzZVwiLCBcIk9mZlwiXSk7XG4gICAgICAgIGNvbnN0IHN0YXJzQ29udHJvbGxlciA9IGd1aS5hZGQoZ3VpT2JqLCBcInN0YXJzXCIsIFtcIk9OXCIsIFwiT2ZmXCJdKTtcblxuICAgICAgICBsZXQgcmFpbnMgPSAoY29sb3IpID0+IHtcbiAgICAgICAgICAgIC8v5paw44GX44GE44Kt44Oj44Oz44OQ44K544Gu5L2c5oiQXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDg7XG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gODtcblxuICAgICAgICAgICAgLy/lhoblvaLjga7jgrDjg6njg4fjg7zjgrfjg6fjg7Pjga7kvZzmiJBcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIGxldCBncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoXG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoIC8gMlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDI1NSwyNTUsMSlcIik7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC40LCBjb2xvcik7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCJyZ2JhKDAsMCwwLDEpXCIpO1xuXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgLy/jg4bjgq/jgrnjg4Hjg6Pjga7nlJ/miJBcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKTtcbiAgICAgICAgICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XG4gICAgICAgIH07XG4gICAgICAgIC8vY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoeyBzaXplOiAxLCBjb2xvcjogMHhGRkZGRkYsIHRyYW5zcGFyZW50OiB0cnVlLCBvcGFjaXR5OjAuOCB9KTtcblxuICAgICAgICAvL3BhcnRpY2xl44Gu5L2c5oiQXG4gICAgICAgIGNvbnN0IHJhaW5NYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCh7XG4gICAgICAgICAgICBtYXA6IHJhaW5zKGd1aU9iai5SY29sb3IpLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmFpbkN1YmVzID0gW107XG5cbiAgICAgICAgbGV0IHJhaW5zWCA9IFtdO1xuICAgICAgICBsZXQgcmFpbnNZID0gW107XG4gICAgICAgIGxldCByYWluc1ogPSBbXTtcbiAgICAgICAgbGV0IHJhaW5pbmZvID0gW107XG4gICAgICAgIGxldCByYWluc1VwZGF0ZVBvc2l0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDUwMDsgaSsrKSB7XG4gICAgICAgICAgICByYWluc1hbaV0gPSAtMzUgKiBNYXRoLnJhbmRvbSgpIC0gMTU7XG4gICAgICAgICAgICByYWluc1lbaV0gPSAtNTAgKiBNYXRoLnJhbmRvbSgpICsgMjU7XG4gICAgICAgICAgICByYWluc1pbaV0gPSAtNTAgKiBNYXRoLnJhbmRvbSgpICsgMjU7XG4gICAgICAgICAgICByYWluQ3ViZXNbaV0gPSBuZXcgVEhSRUUuU3ByaXRlKHJhaW5NYXRlcmlhbCk7XG4gICAgICAgICAgICByYWluQ3ViZXNbaV0uc2NhbGUuc2V0KDAuNCwgMC40LCAwLjQpO1xuICAgICAgICAgICAgcmFpbkN1YmVzW2ldLnBvc2l0aW9uLnggPSByYWluc1hbaV07XG4gICAgICAgICAgICByYWluQ3ViZXNbaV0ucG9zaXRpb24ueSA9IHJhaW5zWVtpXTtcbiAgICAgICAgICAgIHJhaW5DdWJlc1tpXS5wb3NpdGlvbi56ID0gcmFpbnNaW2ldO1xuICAgICAgICAgICAgcmFpbkN1YmVzW2ldLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHJhaW5DdWJlc1tpXSk7XG5cbiAgICAgICAgICAgIHJhaW5pbmZvLnB1c2goe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcmFpbnNYW2ldLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWTogcmFpbnNZW2ldLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogcmFpbnNaW2ldLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJhaW5DdWJlc1tpXS5tYXRlcmlhbC50cmFuc3BhcmVudCA9IHRydWU7XG4gICAgICAgICAgICByYWluc1VwZGF0ZVBvc2l0aW9uc1tpXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByYWluQ3ViZXNbaV0ucG9zaXRpb24ueCA9IHJhaW5pbmZvW2ldLnBvc2l0aW9uWDtcbiAgICAgICAgICAgICAgICByYWluQ3ViZXNbaV0ucG9zaXRpb24ueSA9IHJhaW5pbmZvW2ldLnBvc2l0aW9uWTtcbiAgICAgICAgICAgICAgICByYWluQ3ViZXNbaV0ucG9zaXRpb24ueiA9IHJhaW5pbmZvW2ldLnBvc2l0aW9uWjtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYWluczEgPSBbXTtcbiAgICAgICAgY29uc3QgcmFpbnMyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTAwOyBpKyspIHtcbiAgICAgICAgICAgIHJhaW5zMVtpXSA9IG5ldyBUV0VFTi5Ud2VlbihyYWluaW5mb1tpXSlcbiAgICAgICAgICAgICAgICAudG8oXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcmFpbnNYW2ldICsgNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHJhaW5zWVtpXSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblo6IHJhaW5zWltpXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDUwMDAgKyAzMDAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkxpbmVhci5Ob25lKVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZShyYWluc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XG4gICAgICAgICAgICByYWluczJbaV0gPSBuZXcgVFdFRU4uVHdlZW4ocmFpbmluZm9baV0pXG4gICAgICAgICAgICAgICAgLnRvKFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHJhaW5zWFtpXSArIDUwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZOiByYWluc1lbaV0gLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25aOiByYWluc1pbaV0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUocmFpbnNVcGRhdGVQb3NpdGlvbnNbaV0pO1xuXG4gICAgICAgICAgICByYWluczFbaV0uY2hhaW4ocmFpbnMyW2ldKTtcbiAgICAgICAgICAgIHJhaW5zMltpXS5jaGFpbihyYWluczFbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1MDA7IGkrKykge1xuICAgICAgICAgICAgcmFpbnMxW2ldLnN0YXJ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd2FycHMgPSAoY29sb3IpID0+IHtcbiAgICAgICAgICAgIC8v5paw44GX44GE44Kt44Oj44Oz44OQ44K544Gu5L2c5oiQXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDg7XG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gODtcblxuICAgICAgICAgICAgLy/lhoblvaLjga7jgrDjg6njg4fjg7zjgrfjg6fjg7Pjga7kvZzmiJBcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIGxldCBncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoXG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCAvIDIsXG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoIC8gMlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDI1NSwyNTUsMSlcIik7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC40LCBjb2xvcik7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCJyZ2JhKDAsMCwwLDEpXCIpO1xuXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgLy/jg4bjgq/jgrnjg4Hjg6Pjga7nlJ/miJBcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKTtcbiAgICAgICAgICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XG4gICAgICAgIH07XG4gICAgICAgIC8vY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoeyBzaXplOiAxLCBjb2xvcjogMHhGRkZGRkYsIHRyYW5zcGFyZW50OiB0cnVlLCBvcGFjaXR5OjAuOCB9KTtcblxuICAgICAgICAvL3BhcnRpY2xl44Gu5L2c5oiQXG4gICAgICAgIGNvbnN0IHdhcnBzTWF0ZXJpYWwgPSBbXTtcbiAgICAgICAgY29uc3Qgd2FycHNDdWJlcyA9IFtdO1xuXG4gICAgICAgIGxldCB3YXJwc1ggPSBbXTtcbiAgICAgICAgbGV0IHdhcnBzWSA9IFtdO1xuICAgICAgICBsZXQgd2FycHNaID0gW107XG4gICAgICAgIGxldCB3YXJwc2luZm8gPSBbXTtcbiAgICAgICAgbGV0IHdhcnBzVXBkYXRlUG9zaXRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTAwOyBpKyspIHtcbiAgICAgICAgICAgIHdhcnBzTWF0ZXJpYWxbaV0gPSBuZXcgVEhSRUUuU3ByaXRlTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIG1hcDogd2FycHMoZ3VpT2JqLlJjb2xvciksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdhcnBzWFtpXSA9IC0zNSAqIE1hdGgucmFuZG9tKCkgLSAxNTtcbiAgICAgICAgICAgIHdhcnBzWVtpXSA9IC01MCAqIE1hdGgucmFuZG9tKCkgKyAyNTtcbiAgICAgICAgICAgIHdhcnBzWltpXSA9IC01MCAqIE1hdGgucmFuZG9tKCkgKyAyNTtcbiAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0gPSBuZXcgVEhSRUUuU3ByaXRlKHdhcnBzTWF0ZXJpYWxbaV0pO1xuICAgICAgICAgICAgd2FycHNDdWJlc1tpXS5tYXRlcmlhbC50cmFuc3BhcmVudCA9IHRydWU7XG4gICAgICAgICAgICB3YXJwc0N1YmVzW2ldLnNjYWxlLnNldCgwLjQsIDAuNCwgMC40KTtcbiAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0ucG9zaXRpb24ueCA9IHdhcnBzWFtpXTtcbiAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0ucG9zaXRpb24ueSA9IHdhcnBzWVtpXTtcbiAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0ucG9zaXRpb24ueiA9IHdhcnBzWltpXTtcbiAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0ubWF0ZXJpYWwub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh3YXJwc0N1YmVzW2ldKTtcblxuICAgICAgICAgICAgd2FycHNpbmZvLnB1c2goe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogd2FycHNYW2ldLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWTogd2FycHNZW2ldLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogd2FycHNaW2ldLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd2FycHNDdWJlc1tpXS5tYXRlcmlhbC50cmFuc3BhcmVudCA9IHRydWU7XG4gICAgICAgICAgICB3YXJwc1VwZGF0ZVBvc2l0aW9uc1tpXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB3YXJwc0N1YmVzW2ldLnBvc2l0aW9uLnggPSB3YXJwc2luZm9baV0ucG9zaXRpb25YO1xuICAgICAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0ucG9zaXRpb24ueSA9IHdhcnBzaW5mb1tpXS5wb3NpdGlvblk7XG4gICAgICAgICAgICAgICAgd2FycHNDdWJlc1tpXS5wb3NpdGlvbi56ID0gd2FycHNpbmZvW2ldLnBvc2l0aW9uWjtcbiAgICAgICAgICAgICAgICB3YXJwc0N1YmVzW2ldLm1hdGVyaWFsLm9wYWNpdHkgPSB3YXJwc2luZm9baV0ub3BhY2l0eTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3YXJwczEgPSBbXTtcbiAgICAgICAgY29uc3Qgd2FycHMyID0gW107XG4gICAgICAgIGNvbnN0IHdhcnBzMyA9IFtdO1xuICAgICAgICBjb25zdCB3YXJwczQgPSBbXTtcbiAgICAgICAgY29uc3Qgd2FycHM1ID0gW107XG4gICAgICAgIGNvbnN0IHdhcnBzNiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDUwMDsgaSsrKSB7XG4gICAgICAgICAgICB3YXJwczFbaV0gPSBuZXcgVFdFRU4uVHdlZW4od2FycHNpbmZvW2ldKVxuICAgICAgICAgICAgICAgIC50byhcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOiB3YXJwc1hbaV0gKyAyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWTogd2FycHNZW2ldIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogd2FycHNaW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDE1MDAgKyA1MDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUod2FycHNVcGRhdGVQb3NpdGlvbnNbaV0pO1xuICAgICAgICAgICAgd2FycHMyW2ldID0gbmV3IFRXRUVOLlR3ZWVuKHdhcnBzaW5mb1tpXSlcbiAgICAgICAgICAgICAgICAudG8oXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogd2FycHNYW2ldICsgMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHdhcnBzWVtpXSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblo6IHdhcnBzWltpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDUwMFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZSlcbiAgICAgICAgICAgICAgICAub25VcGRhdGUod2FycHNVcGRhdGVQb3NpdGlvbnNbaV0pO1xuICAgICAgICAgICAgd2FycHMzW2ldID0gbmV3IFRXRUVOLlR3ZWVuKHdhcnBzaW5mb1tpXSlcbiAgICAgICAgICAgICAgICAudG8oXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogd2FycHNYW2ldICsgMzAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZOiB3YXJwc1lbaV0gLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25aOiB3YXJwc1pbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAxNTAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5JbilcbiAgICAgICAgICAgICAgICAub25VcGRhdGUod2FycHNVcGRhdGVQb3NpdGlvbnNbaV0pO1xuICAgICAgICAgICAgd2FycHM0W2ldID0gbmV3IFRXRUVOLlR3ZWVuKHdhcnBzaW5mb1tpXSlcbiAgICAgICAgICAgICAgICAudG8oXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogd2FycHNYW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZOiB3YXJwc1lbaV0gLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25aOiB3YXJwc1pbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkxpbmVhci5Ob25lKVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh3YXJwc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XG4gICAgICAgICAgICB3YXJwczVbaV0gPSBuZXcgVFdFRU4uVHdlZW4od2FycHNpbmZvW2ldKVxuICAgICAgICAgICAgICAgIC50byhcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOiB3YXJwc1hbaV0gKyAzMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHdhcnBzWVtpXSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblo6IHdhcnBzWltpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDEwMDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLkluKVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh3YXJwc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XG4gICAgICAgICAgICB3YXJwczZbaV0gPSBuZXcgVFdFRU4uVHdlZW4od2FycHNpbmZvW2ldKVxuICAgICAgICAgICAgICAgIC50byhcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOiB3YXJwc1hbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHdhcnBzWVtpXSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblo6IHdhcnBzWltpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmUpXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKHdhcnBzVXBkYXRlUG9zaXRpb25zW2ldKTtcblxuICAgICAgICAgICAgd2FycHMxW2ldLmNoYWluKHdhcnBzMltpXSk7XG4gICAgICAgICAgICB3YXJwczJbaV0uY2hhaW4od2FycHMzW2ldKTtcbiAgICAgICAgICAgIHdhcnBzM1tpXS5jaGFpbih3YXJwczRbaV0pO1xuICAgICAgICAgICAgd2FycHM0W2ldLmNoYWluKHdhcnBzNVtpXSk7XG4gICAgICAgICAgICB3YXJwczVbaV0uY2hhaW4od2FycHM2W2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBnZW5lcmF0ZVNwcml0ZSA9IChjb2xvcikgPT4ge1xuICAgICAgICAgICAgLy/mlrDjgZfjgYTjgq3jg6Pjg7Pjg5Djgrnjga7kvZzmiJBcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gODtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSA4O1xuXG4gICAgICAgICAgICAvL+WGhuW9ouOBruOCsOODqeODh+ODvOOCt+ODp+ODs+OBruS9nOaIkFxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgbGV0IGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoIC8gMixcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggLyAyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIFwicmdiYSgyNTUsMjU1LDI1NSwxKVwiKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjQsIGNvbG9yKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMCwwLDAsMSlcIik7XG5cbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICAvL+ODhuOCr+OCueODgeODo+OBrueUn+aIkFxuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpO1xuICAgICAgICAgICAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGV4dHVyZTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCh7XG4gICAgICAgICAgICBtYXA6IGdlbmVyYXRlU3ByaXRlKGd1aU9iai5jb2xvciksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjdWJlcyA9IFtdO1xuXG4gICAgICAgIGxldCBzdGFydFggPSAtODA7XG4gICAgICAgIGxldCBzdGFydFkgPSAtNDA7XG4gICAgICAgIGxldCBzdGFydFogPSAwO1xuICAgICAgICBsZXQgWCA9IC02MDtcbiAgICAgICAgbGV0IFkgPSAxMDtcbiAgICAgICAgbGV0IFogPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xuICAgICAgICAgICAgY3ViZXNbaV0gPSBuZXcgVEhSRUUuU3ByaXRlKG1hdGVyaWFsKTtcbiAgICAgICAgICAgIGN1YmVzW2ldLnBvc2l0aW9uLnggPSBzdGFydFg7XG4gICAgICAgICAgICBjdWJlc1tpXS5wb3NpdGlvbi55ID0gc3RhcnRZO1xuICAgICAgICAgICAgY3ViZXNbaV0ucG9zaXRpb24ueiA9IHN0YXJ0WjtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKGN1YmVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFR3ZWVu44Gn44Kz44Oz44OI44Ot44O844Or44GZ44KL5aSJ5pWw44Gu5a6a576pXG4gICAgICAgIGxldCBmaXJld29ya2luZm8gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcbiAgICAgICAgICAgIGZpcmV3b3JraW5mby5wdXNoKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvblg6IC04MCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvblk6IC00MCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvblo6IDAsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gIFR3ZWVu44Gn44OR44Op44Oh44O844K/44Gu5pu05paw44Gu6Zqb44Gr5ZG844Gz5Ye644GV44KM44KL6Zai5pWwXG4gICAgICAgIGxldCB1cGRhdGVQb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcbiAgICAgICAgICAgIGN1YmVzW2ldLm1hdGVyaWFsLnRyYW5zcGFyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHVwZGF0ZVBvc2l0aW9uc1tpXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjdWJlc1tpXS5wb3NpdGlvbi54ID0gZmlyZXdvcmtpbmZvW2ldLnBvc2l0aW9uWDtcbiAgICAgICAgICAgICAgICBjdWJlc1tpXS5wb3NpdGlvbi55ID0gZmlyZXdvcmtpbmZvW2ldLnBvc2l0aW9uWTtcbiAgICAgICAgICAgICAgICBjdWJlc1tpXS5wb3NpdGlvbi56ID0gZmlyZXdvcmtpbmZvW2ldLnBvc2l0aW9uWjtcbiAgICAgICAgICAgICAgICBjdWJlc1tpXS5tYXRlcmlhbC5vcGFjaXR5ID0gZmlyZXdvcmtpbmZvW2ldLm9wYWNpdHk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNjYWxlID0gMzA7XG4gICAgICAgIGNvbnN0IGZpcmV3b3JrczEgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyZXdvcmtzMiA9IFtdO1xuICAgICAgICBjb25zdCBmaXJld29ya3MzID0gW107XG4gICAgICAgIGNvbnN0IGZpcmV3b3JrczQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBoaSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMiAtIE1hdGguUEk7XG4gICAgICAgICAgICBjb25zdCB0aGV0YSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIGZpcmV3b3JrczFbaV0gPSBuZXcgVFdFRU4uVHdlZW4oZmlyZXdvcmtpbmZvW2ldKVxuICAgICAgICAgICAgICAgIC50byhcbiAgICAgICAgICAgICAgICAgICAgeyBwb3NpdGlvblg6IFgsIHBvc2l0aW9uWTogWSwgcG9zaXRpb25aOiBaLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgIDUwMDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmRlbGF5KDUwMClcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVQb3NpdGlvbnNbaV0pO1xuICAgICAgICAgICAgZmlyZXdvcmtzMltpXSA9IG5ldyBUV0VFTi5Ud2VlbihmaXJld29ya2luZm9baV0pXG4gICAgICAgICAgICAgICAgLnRvKFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IFggKyBzY2FsZSAqIE1hdGguc2luKHBoaSkgKiBNYXRoLmNvcyh0aGV0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IFkgKyBzY2FsZSAqIE1hdGguY29zKHBoaSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblo6IFogKyBzY2FsZSAqIE1hdGguc2luKHBoaSkgKiBNYXRoLnNpbih0aGV0YSksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDEwMDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlUG9zaXRpb25zW2ldKTtcbiAgICAgICAgICAgIGZpcmV3b3JrczNbaV0gPSBuZXcgVFdFRU4uVHdlZW4oZmlyZXdvcmtpbmZvW2ldKVxuICAgICAgICAgICAgICAgIC50byhcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFggKyAoc2NhbGUgKyAyKSAqIE1hdGguc2luKHBoaSkgKiBNYXRoLmNvcyh0aGV0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IFkgKyAoc2NhbGUgKyAxKSAqIE1hdGguY29zKHBoaSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblo6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWiArIChzY2FsZSArIDEpICogTWF0aC5zaW4ocGhpKSAqIE1hdGguc2luKHRoZXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDIwMDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlUG9zaXRpb25zW2ldKTtcbiAgICAgICAgICAgIGZpcmV3b3JrczRbaV0gPSBuZXcgVFdFRU4uVHdlZW4oZmlyZXdvcmtpbmZvW2ldKVxuICAgICAgICAgICAgICAgIC50byhcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOiBzdGFydFgsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHN0YXJ0WSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogc3RhcnRaLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVQb3NpdGlvbnNbaV0pO1xuXG4gICAgICAgICAgICBmaXJld29ya3MxW2ldLmNoYWluKGZpcmV3b3JrczJbaV0pO1xuICAgICAgICAgICAgZmlyZXdvcmtzMltpXS5jaGFpbihmaXJld29ya3MzW2ldKTtcbiAgICAgICAgICAgIGZpcmV3b3JrczNbaV0uY2hhaW4oZmlyZXdvcmtzNFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g44Ki44OL44Oh44O844K344On44Oz44Gu6ZaL5aeLXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XG4gICAgICAgICAgICBmaXJld29ya3MxW2ldLnN0YXJ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZHJhd1N0YXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhciA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuXG4gICAgICAgICAgICBzdGFyLm1vdmVUbygwLCAxKTtcbiAgICAgICAgICAgIHN0YXIubGluZVRvKDAuMjUsIDAuNSk7XG4gICAgICAgICAgICBzdGFyLmxpbmVUbygwLjc1LCAwLjUpO1xuICAgICAgICAgICAgc3Rhci5saW5lVG8oMC40LCAwLjEpO1xuICAgICAgICAgICAgc3Rhci5saW5lVG8oMC42LCAtMC41KTtcbiAgICAgICAgICAgIHN0YXIubGluZVRvKDAsIC0wLjIpO1xuICAgICAgICAgICAgc3Rhci5saW5lVG8oLTAuNiwgLTAuNSk7XG4gICAgICAgICAgICBzdGFyLmxpbmVUbygtMC40LCAwLjEpO1xuICAgICAgICAgICAgc3Rhci5saW5lVG8oLTAuNzUsIDAuNSk7XG4gICAgICAgICAgICBzdGFyLmxpbmVUbygtMC4yNSwgMC41KTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0YXI7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGV4U3RhciA9IHtcbiAgICAgICAgICAgIHN0ZXBzOiAxLFxuICAgICAgICAgICAgZGVwdGg6IDAuMixcbiAgICAgICAgICAgIGJldmVsRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIGJldmVsVGhpY2tuZXNzOiAwLjUsXG4gICAgICAgICAgICBiZXZlbFNpemU6IDEsXG4gICAgICAgICAgICBiZXZlbFNlZ21lbnQ6IDUsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBzdGFyQW1vdW50cyA9IDEyO1xuICAgICAgICBsZXQgbGlzdDogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgejogbnVtYmVyIH1bXSA9IFtdO1xuICAgICAgICBsZXQgcG9zaXRpb25MaXN0OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyOyB6OiBudW1iZXIgfVtdID0gW107XG4gICAgICAgIGxldCBncm91cFN0YXI6IFRIUkVFLkdyb3VwW10gPSBbXTtcbiAgICAgICAgbGV0IHN0YXJzaW5mbyA9IFtdO1xuICAgICAgICBsZXQgc3RhcnNVcGRhdGVQb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFyQW1vdW50czsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgR2VvbWV0cnlTdGFyID0gbmV3IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeShkcmF3U3RhcigpLCBleFN0YXIpO1xuXG4gICAgICAgICAgICBsZXQgbWVzaFN0YXIgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIGNvbG9yOiAweGZmZmY5OSxcbiAgICAgICAgICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdyb3VwU3RhcltpXSA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLmFkZChuZXcgVEhSRUUuTWVzaChHZW9tZXRyeVN0YXIsIG1lc2hTdGFyKSk7XG5cbiAgICAgICAgICAgIGlmIChpIDwgMikge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTM1ICogTWF0aC5yYW5kb20oKSAtIDUwLFxuICAgICAgICAgICAgICAgICAgICB5OiAtMjAgKiBNYXRoLnJhbmRvbSgpICsgMTAsXG4gICAgICAgICAgICAgICAgICAgIHo6IC0yMCAqIE1hdGgucmFuZG9tKCkgKyAxMCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IHN0YXJBbW91bnRzICogMiAvIDMpIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0zNSAqIE1hdGgucmFuZG9tKCkgLSAzNSxcbiAgICAgICAgICAgICAgICAgICAgeTogMTUgKiBNYXRoLnJhbmRvbSgpLFxuICAgICAgICAgICAgICAgICAgICB6OiAtMzAgKiBNYXRoLnJhbmRvbSgpICsgMTUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25MaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB4OiAtMzUgKiBNYXRoLnJhbmRvbSgpIC0gMzUsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0xMCAqIE1hdGgucmFuZG9tKCksXG4gICAgICAgICAgICAgICAgICAgIHo6IC0zMCAqIE1hdGgucmFuZG9tKCkgKyAxNSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLnBvc2l0aW9uLnggPSBwb3NpdGlvbkxpc3RbaV0ueDtcbiAgICAgICAgICAgIGdyb3VwU3RhcltpXS5wb3NpdGlvbi55ID0gcG9zaXRpb25MaXN0W2ldLnk7XG4gICAgICAgICAgICBncm91cFN0YXJbaV0ucG9zaXRpb24ueiA9IHBvc2l0aW9uTGlzdFtpXS56O1xuXG4gICAgICAgICAgICBsZXQgcyA9IDA7XG4gICAgICAgICAgICBpZiAoaSA8IDIpIHtcbiAgICAgICAgICAgICAgICBzID0gTWF0aC5yYW5kb20oKSAqIDEgKyAwLjU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSBNYXRoLnJhbmRvbSgpICogMC4yICsgMC4wMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdyb3VwU3RhcltpXS5zY2FsZS5zZXQocywgcywgcyk7XG5cbiAgICAgICAgICAgIGdyb3VwU3RhcltpXS5yb3RhdGVYKE1hdGgucmFuZG9tKCkgKiAwLjAzIC0gMC4wMTUpO1xuICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLnJvdGF0ZVkoTWF0aC5yYW5kb20oKSAqIDAuMDMgLSAwLjAxNSk7XG4gICAgICAgICAgICBncm91cFN0YXJbaV0ucm90YXRlWihNYXRoLnJhbmRvbSgpICogMC4wMyAtIDAuMDE1KTtcblxuICAgICAgICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLnJhbmRvbSgpICogMC4wMyAtIDAuMDE1LFxuICAgICAgICAgICAgICAgIHk6IE1hdGgucmFuZG9tKCkgKiAwLjAzIC0gMC4wMTUsXG4gICAgICAgICAgICAgICAgejogTWF0aC5yYW5kb20oKSAqIDAuMDMgLSAwLjAxNSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChncm91cFN0YXJbaV0pO1xuXG4gICAgICAgICAgICBzdGFyc2luZm8ucHVzaCh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25YOiBwb3NpdGlvbkxpc3RbaV0ueCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHBvc2l0aW9uTGlzdFtpXS55LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogcG9zaXRpb25MaXN0W2ldLnosXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc3RhcnNVcGRhdGVQb3NpdGlvbnNbaV0gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLnBvc2l0aW9uLnggPSBzdGFyc2luZm9baV0ucG9zaXRpb25YO1xuICAgICAgICAgICAgICAgIGdyb3VwU3RhcltpXS5wb3NpdGlvbi55ID0gc3RhcnNpbmZvW2ldLnBvc2l0aW9uWTtcbiAgICAgICAgICAgICAgICBncm91cFN0YXJbaV0ucG9zaXRpb24ueiA9IHN0YXJzaW5mb1tpXS5wb3NpdGlvblo7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RhcnMxID0gW107XG4gICAgICAgIGNvbnN0IHN0YXJzMiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJBbW91bnRzOyBpKyspIHtcbiAgICAgICAgICAgIHN0YXJzMVtpXSA9IG5ldyBUV0VFTi5Ud2VlbihzdGFyc2luZm9baV0pXG4gICAgICAgICAgICAgICAgLnRvKFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHBvc2l0aW9uTGlzdFtpXS54ICsgMTIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZOiBwb3NpdGlvbkxpc3RbaV0ueSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblo6IHBvc2l0aW9uTGlzdFtpXS56LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAwMDAgKyAyMDAwXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkxpbmVhci5Ob25lKVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZShzdGFyc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XG4gICAgICAgICAgICBzdGFyczJbaV0gPSBuZXcgVFdFRU4uVHdlZW4oc3RhcnNpbmZvW2ldKVxuICAgICAgICAgICAgICAgIC50byhcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOiBwb3NpdGlvbkxpc3RbaV0ueCArIDEyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWTogcG9zaXRpb25MaXN0W2ldLnkgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25aOiBwb3NpdGlvbkxpc3RbaV0ueixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZShzdGFyc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XG5cbiAgICAgICAgICAgIHN0YXJzMVtpXS5jaGFpbihzdGFyczJbaV0pO1xuICAgICAgICAgICAgc3RhcnMyW2ldLmNoYWluKHN0YXJzMVtpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJBbW91bnRzOyBpKyspIHtcbiAgICAgICAgICAgIHN0YXJzMVtpXS5zdGFydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/jg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgY29uc3QgbHZlYyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDApLm5vcm1hbGl6ZSgpO1xuICAgICAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XG4gICAgICAgIGNvbnN0IGJvdHRvbUxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDAuNSk7IC8vIOS4i+OBi+OCieOBruWFiVxuICAgICAgICBjb25zdCBib3R0b21MdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApLm5vcm1hbGl6ZSgpO1xuICAgICAgICBib3R0b21MaWdodC5wb3NpdGlvbi5zZXQoYm90dG9tTHZlYy54LCBib3R0b21MdmVjLnksIGJvdHRvbUx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGJvdHRvbUxpZ2h0KTtcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIzmm7TmlrBcbiAgICAgICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuXG4gICAgICAgIGNvbG9yLm9uQ2hhbmdlKCh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBtYXRlcmlhbC5tYXAgPSBnZW5lcmF0ZVNwcml0ZSh2YWx1ZSk7XG4gICAgICAgICAgICBtYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFJjb2xvci5vbkNoYW5nZSgodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgLy8gdmFsdWXjga/lpInmm7Tlvozjga5SY29sb3Ljga7lgKTvvIjkvos6ICdyZ2IoWCwgWSwgWikn77yJXG4gICAgICAgICAgICAvLyB3YXJwc01hdGVyaWFs44Gv5ZCE44Kt44Ol44O844OW44Gr5YCL5Yil44Gq44Gu44Gn44Or44O844OX44GX44Gm5pu05pawXG4gICAgICAgICAgICByYWluTWF0ZXJpYWwubWFwID0gZ2VuZXJhdGVTcHJpdGUodmFsdWUpO1xuICAgICAgICAgICAgcmFpbk1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTAwOyBpKyspIHtcbiAgICAgICAgICAgICAgICB3YXJwc01hdGVyaWFsW2ldLm1hcCA9IGdlbmVyYXRlU3ByaXRlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB3YXJwc01hdGVyaWFsW2ldLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJvb2xyYWlucyA9IGZhbHNlO1xuICAgICAgICBsZXQgYm9vbHJhaW5zU2F2ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgYm9vbHN0YXJzID0gZmFsc2U7XG4gICAgICAgIGxldCBib29sc3RhcnNTYXZlID0gZmFsc2U7XG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhckFtb3VudHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGdyb3VwU3RhcltpXS5yb3RhdGVYKGxpc3RbaV0ueCk7XG4gICAgICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLnJvdGF0ZVkobGlzdFtpXS55KTtcbiAgICAgICAgICAgICAgICBncm91cFN0YXJbaV0ucm90YXRlWihsaXN0W2ldLnopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChndWlPYmouZmlyZXdvcmspIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiR2VuZXJhdGlvblwiOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZXdvcmtzMVtpXS5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGd1aU9iai5maXJld29yayA9IFwiT2ZmXCI7XG4gICAgICAgICAgICAgICAgICAgIGZpcmV3b3JrQ29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJPZmZcIjpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGd1aU9iai5yYWlucykge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJPTlwiOlxuICAgICAgICAgICAgICAgICAgICBib29scmFpbnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDUwMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByYWluQ3ViZXNbaV0udmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIk9mZlwiOlxuICAgICAgICAgICAgICAgICAgICBib29scmFpbnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1MDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFpbkN1YmVzW2ldLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoZ3VpT2JqLndhcnBzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkNhdXNlXCI6XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYm9vbHJhaW5zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvb2xyYWluc1NhdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3VpT2JqLnJhaW5zID0gXCJPZmZcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhaW5zQ29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihib29sc3RhcnMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2xzdGFyc1NhdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhckFtb3VudHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBndWlPYmouc3RhcnMgPSBcIk9mZlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyc0NvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1MDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FycHMxW2ldLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZ3VpT2JqLndhcnBzID0gXCJPZmZcIjtcbiAgICAgICAgICAgICAgICAgICAgd2FycENvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGJvb2xyYWluc1NhdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9vbHJhaW5zU2F2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3VpT2JqLnJhaW5zID0gXCJPTlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFpbnNDb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGJvb2xzdGFyc1NhdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2xzdGFyc1NhdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJBbW91bnRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3VpT2JqLnN0YXJzID0gXCJPTlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyc0NvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCA0MDAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIk9mZlwiOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoZ3VpT2JqLnN0YXJzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIk9OXCI6XG4gICAgICAgICAgICAgICAgICAgIGJvb2xzdGFycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhckFtb3VudHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJPZmZcIjpcbiAgICAgICAgICAgICAgICAgICAgYm9vbHN0YXJzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhckFtb3VudHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICAgICAgVFdFRU4udXBkYXRlKCk7IC8v6L+95Yqg5YiGXG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH07XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcblxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTShcbiAgICAgICAgNjQwLFxuICAgICAgICA0ODAsXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDUsIDAsIDApXG4gICAgKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdHdlZW5qc190d2Vlbl9qc19kaXN0X3R3ZWVuX2VzbV9qcy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtLTllYTdjM1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==