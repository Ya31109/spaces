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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vMjNGSTA0OSDkvZDol6Tnm7TlvKVcclxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XHJcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcclxuaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XHJcbmltcG9ydCBHVUkgZnJvbSBcImxpbC1ndWlcIjtcclxuXHJcbmNsYXNzIFRocmVlSlNDb250YWluZXIge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XHJcbiAgICBwcml2YXRlIGxpZ2h0OiBUSFJFRS5MaWdodDtcclxuXHJcbiAgICBwcml2YXRlIGNsb3VkOiBUSFJFRS5Qb2ludHM7XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlVmVsb2NpdHk6IFRIUkVFLlZlY3RvcjNbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQKOihqOekuuOBmeOCi+aeoOOBlOOBqOOBqykqXHJcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAoXHJcbiAgICAgICAgd2lkdGg6IG51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjNcclxuICAgICkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcclxuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XHJcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAvL+OCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xyXG5cclxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxyXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShcclxuICAgICAgICAgICAgNzUsXHJcbiAgICAgICAgICAgIHdpZHRoIC8gaGVpZ2h0LFxyXG4gICAgICAgICAgICAwLjEsXHJcbiAgICAgICAgICAgIDEwMDBcclxuICAgICAgICApO1xyXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XHJcbiAgICAgICAgY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XHJcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXHJcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XHJcbiAgICAgICAgY29uc3QgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XHJcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcclxuXHJcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xyXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XHJcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxyXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcblxyXG4gICAgICAgIGxldCBndWkgPSBuZXcgR1VJKCk7IC8vIEdVSeeUqOOBruOCpOODs+OCueOCv+ODs+OCueOBrueUn+aIkFxyXG4gICAgICAgIGxldCBndWlPYmogPSB7XHJcbiAgICAgICAgICAgIGZpcmV3b3JrOiBcIkdlbmVyYXRpb25cIixcclxuICAgICAgICAgICAgY29sb3I6IFwicmdiKDI1NSwgMCwgMClcIixcclxuICAgICAgICAgICAgcmFpbnM6IFwiT2ZmXCIsXHJcbiAgICAgICAgICAgIFJjb2xvcjogXCJyZ2JhKDc0LCAxODAsIDI1NSwgMSlcIixcclxuICAgICAgICAgICAgd2FycHM6IFwiT2ZmXCIsXHJcbiAgICAgICAgICAgIHN0YXJzOiBcIk9mZlwiXHJcbiAgICAgICAgfTsgLy8gR1VJ44Gu44OR44Op44Oh44O844K/XHJcbiAgICAgICAgY29uc3QgZmlyZXdvcmtDb250cm9sbGVyID0gZ3VpLmFkZChndWlPYmosIFwiZmlyZXdvcmtcIiwgW1xyXG4gICAgICAgICAgICBcIkdlbmVyYXRpb25cIixcclxuICAgICAgICAgICAgXCJPZmZcIixcclxuICAgICAgICBdKTtcclxuICAgICAgICBjb25zdCBjb2xvciA9IGd1aS5hZGRDb2xvcihndWlPYmosIFwiY29sb3JcIik7XHJcbiAgICAgICAgY29uc3QgcmFpbnNDb250cm9sbGVyID0gZ3VpLmFkZChndWlPYmosIFwicmFpbnNcIiwgW1wiT05cIiwgXCJPZmZcIl0pO1xyXG4gICAgICAgIGNvbnN0IFJjb2xvciA9IGd1aS5hZGRDb2xvcihndWlPYmosIFwiUmNvbG9yXCIpO1xyXG4gICAgICAgIGNvbnN0IHdhcnBDb250cm9sbGVyID0gZ3VpLmFkZChndWlPYmosIFwid2FycHNcIiwgW1wiQ2F1c2VcIiwgXCJPZmZcIl0pO1xyXG4gICAgICAgIGNvbnN0IHN0YXJzQ29udHJvbGxlciA9IGd1aS5hZGQoZ3VpT2JqLCBcInN0YXJzXCIsIFtcIk9OXCIsIFwiT2ZmXCJdKTtcclxuXHJcbiAgICAgICAgbGV0IHJhaW5zID0gKGNvbG9yKSA9PiB7XHJcbiAgICAgICAgICAgIC8v5paw44GX44GE44Kt44Oj44Oz44OQ44K544Gu5L2c5oiQXHJcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSA4O1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gODtcclxuXHJcbiAgICAgICAgICAgIC8v5YaG5b2i44Gu44Kw44Op44OH44O844K344On44Oz44Gu5L2c5oiQXHJcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgbGV0IGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChcclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0IC8gMixcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCAvIDIsXHJcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggLyAyXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDI1NSwyNTUsMSlcIik7XHJcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjQsIGNvbG9yKTtcclxuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIFwicmdiYSgwLDAsMCwxKVwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnQ7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgLy/jg4bjgq/jgrnjg4Hjg6Pjga7nlJ/miJBcclxuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpO1xyXG4gICAgICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL2NvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHsgc2l6ZTogMSwgY29sb3I6IDB4RkZGRkZGLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTowLjggfSk7XHJcblxyXG4gICAgICAgIC8vcGFydGljbGXjga7kvZzmiJBcclxuICAgICAgICBjb25zdCByYWluTWF0ZXJpYWwgPSBuZXcgVEhSRUUuU3ByaXRlTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICBtYXA6IHJhaW5zKGd1aU9iai5SY29sb3IpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHJhaW5DdWJlcyA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgcmFpbnNYID0gW107XHJcbiAgICAgICAgbGV0IHJhaW5zWSA9IFtdO1xyXG4gICAgICAgIGxldCByYWluc1ogPSBbXTtcclxuICAgICAgICBsZXQgcmFpbmluZm8gPSBbXTtcclxuICAgICAgICBsZXQgcmFpbnNVcGRhdGVQb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDUwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhaW5zWFtpXSA9IC0zNSAqIE1hdGgucmFuZG9tKCkgLSAxNTtcclxuICAgICAgICAgICAgcmFpbnNZW2ldID0gLTUwICogTWF0aC5yYW5kb20oKSArIDI1O1xyXG4gICAgICAgICAgICByYWluc1pbaV0gPSAtNTAgKiBNYXRoLnJhbmRvbSgpICsgMjU7XHJcbiAgICAgICAgICAgIHJhaW5DdWJlc1tpXSA9IG5ldyBUSFJFRS5TcHJpdGUocmFpbk1hdGVyaWFsKTtcclxuICAgICAgICAgICAgcmFpbkN1YmVzW2ldLnNjYWxlLnNldCgwLjQsIDAuNCwgMC40KTtcclxuICAgICAgICAgICAgcmFpbkN1YmVzW2ldLnBvc2l0aW9uLnggPSByYWluc1hbaV07XHJcbiAgICAgICAgICAgIHJhaW5DdWJlc1tpXS5wb3NpdGlvbi55ID0gcmFpbnNZW2ldO1xyXG4gICAgICAgICAgICByYWluQ3ViZXNbaV0ucG9zaXRpb24ueiA9IHJhaW5zWltpXTtcclxuICAgICAgICAgICAgcmFpbkN1YmVzW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQocmFpbkN1YmVzW2ldKTtcclxuXHJcbiAgICAgICAgICAgIHJhaW5pbmZvLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25YOiByYWluc1hbaV0sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHJhaW5zWVtpXSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogcmFpbnNaW2ldLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJhaW5DdWJlc1tpXS5tYXRlcmlhbC50cmFuc3BhcmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJhaW5zVXBkYXRlUG9zaXRpb25zW2ldID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmFpbkN1YmVzW2ldLnBvc2l0aW9uLnggPSByYWluaW5mb1tpXS5wb3NpdGlvblg7XHJcbiAgICAgICAgICAgICAgICByYWluQ3ViZXNbaV0ucG9zaXRpb24ueSA9IHJhaW5pbmZvW2ldLnBvc2l0aW9uWTtcclxuICAgICAgICAgICAgICAgIHJhaW5DdWJlc1tpXS5wb3NpdGlvbi56ID0gcmFpbmluZm9baV0ucG9zaXRpb25aO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmFpbnMxID0gW107XHJcbiAgICAgICAgY29uc3QgcmFpbnMyID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1MDA7IGkrKykge1xyXG4gICAgICAgICAgICByYWluczFbaV0gPSBuZXcgVFdFRU4uVHdlZW4ocmFpbmluZm9baV0pXHJcbiAgICAgICAgICAgICAgICAudG8oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHJhaW5zWFtpXSArIDUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHJhaW5zWVtpXSAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogcmFpbnNaW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIDUwMDAgKyAzMDAwXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZSlcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZShyYWluc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIHJhaW5zMltpXSA9IG5ldyBUV0VFTi5Ud2VlbihyYWluaW5mb1tpXSlcclxuICAgICAgICAgICAgICAgIC50byhcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcmFpbnNYW2ldICsgNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWTogcmFpbnNZW2ldIC0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25aOiByYWluc1pbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKHJhaW5zVXBkYXRlUG9zaXRpb25zW2ldKTtcclxuXHJcbiAgICAgICAgICAgIHJhaW5zMVtpXS5jaGFpbihyYWluczJbaV0pO1xyXG4gICAgICAgICAgICByYWluczJbaV0uY2hhaW4ocmFpbnMxW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTAwOyBpKyspIHtcclxuICAgICAgICAgICAgcmFpbnMxW2ldLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgd2FycHMgPSAoY29sb3IpID0+IHtcclxuICAgICAgICAgICAgLy/mlrDjgZfjgYTjgq3jg6Pjg7Pjg5Djgrnjga7kvZzmiJBcclxuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDg7XHJcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSA4O1xyXG5cclxuICAgICAgICAgICAgLy/lhoblvaLjga7jgrDjg6njg4fjg7zjgrfjg6fjg7Pjga7kvZzmiJBcclxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICBsZXQgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KFxyXG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgLyAyLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0IC8gMixcclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCAvIDJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIFwicmdiYSgyNTUsMjU1LDI1NSwxKVwiKTtcclxuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNCwgY29sb3IpO1xyXG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCJyZ2JhKDAsMCwwLDEpXCIpO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAvL+ODhuOCr+OCueODgeODo+OBrueUn+aIkFxyXG4gICAgICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKGNhbnZhcyk7XHJcbiAgICAgICAgICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoeyBzaXplOiAxLCBjb2xvcjogMHhGRkZGRkYsIHRyYW5zcGFyZW50OiB0cnVlLCBvcGFjaXR5OjAuOCB9KTtcclxuXHJcbiAgICAgICAgLy9wYXJ0aWNsZeOBruS9nOaIkFxyXG4gICAgICAgIGNvbnN0IHdhcnBzTWF0ZXJpYWwgPSBbXTtcclxuICAgICAgICBjb25zdCB3YXJwc0N1YmVzID0gW107XHJcblxyXG4gICAgICAgIGxldCB3YXJwc1ggPSBbXTtcclxuICAgICAgICBsZXQgd2FycHNZID0gW107XHJcbiAgICAgICAgbGV0IHdhcnBzWiA9IFtdO1xyXG4gICAgICAgIGxldCB3YXJwc2luZm8gPSBbXTtcclxuICAgICAgICBsZXQgd2FycHNVcGRhdGVQb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDUwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHdhcnBzTWF0ZXJpYWxbaV0gPSBuZXcgVEhSRUUuU3ByaXRlTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICAgICAgbWFwOiB3YXJwcyhndWlPYmouUmNvbG9yKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHdhcnBzWFtpXSA9IC0zNSAqIE1hdGgucmFuZG9tKCkgLSAxNTtcclxuICAgICAgICAgICAgd2FycHNZW2ldID0gLTUwICogTWF0aC5yYW5kb20oKSArIDI1O1xyXG4gICAgICAgICAgICB3YXJwc1pbaV0gPSAtNTAgKiBNYXRoLnJhbmRvbSgpICsgMjU7XHJcbiAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0gPSBuZXcgVEhSRUUuU3ByaXRlKHdhcnBzTWF0ZXJpYWxbaV0pO1xyXG4gICAgICAgICAgICB3YXJwc0N1YmVzW2ldLm1hdGVyaWFsLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2FycHNDdWJlc1tpXS5zY2FsZS5zZXQoMC40LCAwLjQsIDAuNCk7XHJcbiAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0ucG9zaXRpb24ueCA9IHdhcnBzWFtpXTtcclxuICAgICAgICAgICAgd2FycHNDdWJlc1tpXS5wb3NpdGlvbi55ID0gd2FycHNZW2ldO1xyXG4gICAgICAgICAgICB3YXJwc0N1YmVzW2ldLnBvc2l0aW9uLnogPSB3YXJwc1pbaV07XHJcbiAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0ubWF0ZXJpYWwub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHdhcnBzQ3ViZXNbaV0pO1xyXG5cclxuICAgICAgICAgICAgd2FycHNpbmZvLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25YOiB3YXJwc1hbaV0sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHdhcnBzWVtpXSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogd2FycHNaW2ldLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB3YXJwc0N1YmVzW2ldLm1hdGVyaWFsLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2FycHNVcGRhdGVQb3NpdGlvbnNbaV0gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3YXJwc0N1YmVzW2ldLnBvc2l0aW9uLnggPSB3YXJwc2luZm9baV0ucG9zaXRpb25YO1xyXG4gICAgICAgICAgICAgICAgd2FycHNDdWJlc1tpXS5wb3NpdGlvbi55ID0gd2FycHNpbmZvW2ldLnBvc2l0aW9uWTtcclxuICAgICAgICAgICAgICAgIHdhcnBzQ3ViZXNbaV0ucG9zaXRpb24ueiA9IHdhcnBzaW5mb1tpXS5wb3NpdGlvblo7XHJcbiAgICAgICAgICAgICAgICB3YXJwc0N1YmVzW2ldLm1hdGVyaWFsLm9wYWNpdHkgPSB3YXJwc2luZm9baV0ub3BhY2l0eTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdhcnBzMSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHdhcnBzMiA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHdhcnBzMyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHdhcnBzNCA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHdhcnBzNSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHdhcnBzNiA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTAwOyBpKyspIHtcclxuICAgICAgICAgICAgd2FycHMxW2ldID0gbmV3IFRXRUVOLlR3ZWVuKHdhcnBzaW5mb1tpXSlcclxuICAgICAgICAgICAgICAgIC50byhcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogd2FycHNYW2ldICsgMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWTogd2FycHNZW2ldIC0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25aOiB3YXJwc1pbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMTUwMCArIDUwMFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh3YXJwc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIHdhcnBzMltpXSA9IG5ldyBUV0VFTi5Ud2Vlbih3YXJwc2luZm9baV0pXHJcbiAgICAgICAgICAgICAgICAudG8oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHdhcnBzWFtpXSArIDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHdhcnBzWVtpXSAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogd2FycHNaW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgNTAwXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZSlcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh3YXJwc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIHdhcnBzM1tpXSA9IG5ldyBUV0VFTi5Ud2Vlbih3YXJwc2luZm9baV0pXHJcbiAgICAgICAgICAgICAgICAudG8oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHdhcnBzWFtpXSArIDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZOiB3YXJwc1lbaV0gLSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblo6IHdhcnBzWltpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDE1MDBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5JbilcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh3YXJwc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIHdhcnBzNFtpXSA9IG5ldyBUV0VFTi5Ud2Vlbih3YXJwc2luZm9baV0pXHJcbiAgICAgICAgICAgICAgICAudG8oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHdhcnBzWFtpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZOiB3YXJwc1lbaV0gLSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblo6IHdhcnBzWltpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkxpbmVhci5Ob25lKVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKHdhcnBzVXBkYXRlUG9zaXRpb25zW2ldKTtcclxuICAgICAgICAgICAgd2FycHM1W2ldID0gbmV3IFRXRUVOLlR3ZWVuKHdhcnBzaW5mb1tpXSlcclxuICAgICAgICAgICAgICAgIC50byhcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogd2FycHNYW2ldICsgMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHdhcnBzWVtpXSAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogd2FycHNaW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgMTAwMFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLkluKVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKHdhcnBzVXBkYXRlUG9zaXRpb25zW2ldKTtcclxuICAgICAgICAgICAgd2FycHM2W2ldID0gbmV3IFRXRUVOLlR3ZWVuKHdhcnBzaW5mb1tpXSlcclxuICAgICAgICAgICAgICAgIC50byhcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogd2FycHNYW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHdhcnBzWVtpXSAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogd2FycHNaW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmUpXHJcbiAgICAgICAgICAgICAgICAub25VcGRhdGUod2FycHNVcGRhdGVQb3NpdGlvbnNbaV0pO1xyXG5cclxuICAgICAgICAgICAgd2FycHMxW2ldLmNoYWluKHdhcnBzMltpXSk7XHJcbiAgICAgICAgICAgIHdhcnBzMltpXS5jaGFpbih3YXJwczNbaV0pO1xyXG4gICAgICAgICAgICB3YXJwczNbaV0uY2hhaW4od2FycHM0W2ldKTtcclxuICAgICAgICAgICAgd2FycHM0W2ldLmNoYWluKHdhcnBzNVtpXSk7XHJcbiAgICAgICAgICAgIHdhcnBzNVtpXS5jaGFpbih3YXJwczZbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdlbmVyYXRlU3ByaXRlID0gKGNvbG9yKSA9PiB7XHJcbiAgICAgICAgICAgIC8v5paw44GX44GE44Kt44Oj44Oz44OQ44K544Gu5L2c5oiQXHJcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSA4O1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gODtcclxuXHJcbiAgICAgICAgICAgIC8v5YaG5b2i44Gu44Kw44Op44OH44O844K344On44Oz44Gu5L2c5oiQXHJcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgbGV0IGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChcclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0IC8gMixcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCAvIDIsXHJcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggLyAyXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDI1NSwyNTUsMSlcIik7XHJcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjQsIGNvbG9yKTtcclxuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIFwicmdiYSgwLDAsMCwxKVwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnQ7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgLy/jg4bjgq/jgrnjg4Hjg6Pjga7nlJ/miJBcclxuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpO1xyXG4gICAgICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU3ByaXRlTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICBtYXA6IGdlbmVyYXRlU3ByaXRlKGd1aU9iai5jb2xvciksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgY3ViZXMgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9IC04MDtcclxuICAgICAgICBsZXQgc3RhcnRZID0gLTQwO1xyXG4gICAgICAgIGxldCBzdGFydFogPSAwO1xyXG4gICAgICAgIGxldCBYID0gLTYwO1xyXG4gICAgICAgIGxldCBZID0gMTA7XHJcbiAgICAgICAgbGV0IFogPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGN1YmVzW2ldID0gbmV3IFRIUkVFLlNwcml0ZShtYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGN1YmVzW2ldLnBvc2l0aW9uLnggPSBzdGFydFg7XHJcbiAgICAgICAgICAgIGN1YmVzW2ldLnBvc2l0aW9uLnkgPSBzdGFydFk7XHJcbiAgICAgICAgICAgIGN1YmVzW2ldLnBvc2l0aW9uLnogPSBzdGFydFo7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKGN1YmVzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFR3ZWVu44Gn44Kz44Oz44OI44Ot44O844Or44GZ44KL5aSJ5pWw44Gu5a6a576pXHJcbiAgICAgICAgbGV0IGZpcmV3b3JraW5mbyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZpcmV3b3JraW5mby5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogLTgwLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25ZOiAtNDAsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvblo6IDAsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICBUd2VlbuOBp+ODkeODqeODoeODvOOCv+OBruabtOaWsOOBrumam+OBq+WRvOOBs+WHuuOBleOCjOOCi+mWouaVsFxyXG4gICAgICAgIGxldCB1cGRhdGVQb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjdWJlc1tpXS5tYXRlcmlhbC50cmFuc3BhcmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHVwZGF0ZVBvc2l0aW9uc1tpXSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN1YmVzW2ldLnBvc2l0aW9uLnggPSBmaXJld29ya2luZm9baV0ucG9zaXRpb25YO1xyXG4gICAgICAgICAgICAgICAgY3ViZXNbaV0ucG9zaXRpb24ueSA9IGZpcmV3b3JraW5mb1tpXS5wb3NpdGlvblk7XHJcbiAgICAgICAgICAgICAgICBjdWJlc1tpXS5wb3NpdGlvbi56ID0gZmlyZXdvcmtpbmZvW2ldLnBvc2l0aW9uWjtcclxuICAgICAgICAgICAgICAgIGN1YmVzW2ldLm1hdGVyaWFsLm9wYWNpdHkgPSBmaXJld29ya2luZm9baV0ub3BhY2l0eTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzY2FsZSA9IDMwO1xyXG4gICAgICAgIGNvbnN0IGZpcmV3b3JrczEgPSBbXTtcclxuICAgICAgICBjb25zdCBmaXJld29ya3MyID0gW107XHJcbiAgICAgICAgY29uc3QgZmlyZXdvcmtzMyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGZpcmV3b3JrczQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwaGkgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIgLSBNYXRoLlBJO1xyXG4gICAgICAgICAgICBjb25zdCB0aGV0YSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcclxuICAgICAgICAgICAgZmlyZXdvcmtzMVtpXSA9IG5ldyBUV0VFTi5Ud2VlbihmaXJld29ya2luZm9baV0pXHJcbiAgICAgICAgICAgICAgICAudG8oXHJcbiAgICAgICAgICAgICAgICAgICAgeyBwb3NpdGlvblg6IFgsIHBvc2l0aW9uWTogWSwgcG9zaXRpb25aOiBaLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgNTAwMFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmRlbGF5KDUwMClcclxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXHJcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlUG9zaXRpb25zW2ldKTtcclxuICAgICAgICAgICAgZmlyZXdvcmtzMltpXSA9IG5ldyBUV0VFTi5Ud2VlbihmaXJld29ya2luZm9baV0pXHJcbiAgICAgICAgICAgICAgICAudG8oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IFggKyBzY2FsZSAqIE1hdGguc2luKHBoaSkgKiBNYXRoLmNvcyh0aGV0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWTogWSArIHNjYWxlICogTWF0aC5jb3MocGhpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25aOiBaICsgc2NhbGUgKiBNYXRoLnNpbihwaGkpICogTWF0aC5zaW4odGhldGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgMTAwMFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVQb3NpdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICBmaXJld29ya3MzW2ldID0gbmV3IFRXRUVOLlR3ZWVuKGZpcmV3b3JraW5mb1tpXSlcclxuICAgICAgICAgICAgICAgIC50byhcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFggKyAoc2NhbGUgKyAyKSAqIE1hdGguc2luKHBoaSkgKiBNYXRoLmNvcyh0aGV0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWTogWSArIChzY2FsZSArIDEpICogTWF0aC5jb3MocGhpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25aOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWiArIChzY2FsZSArIDEpICogTWF0aC5zaW4ocGhpKSAqIE1hdGguc2luKHRoZXRhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDIwMDBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXHJcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlUG9zaXRpb25zW2ldKTtcclxuICAgICAgICAgICAgZmlyZXdvcmtzNFtpXSA9IG5ldyBUV0VFTi5Ud2VlbihmaXJld29ya2luZm9baV0pXHJcbiAgICAgICAgICAgICAgICAudG8oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHN0YXJ0WCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZOiBzdGFydFksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogc3RhcnRaLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVQb3NpdGlvbnNbaV0pO1xyXG5cclxuICAgICAgICAgICAgZmlyZXdvcmtzMVtpXS5jaGFpbihmaXJld29ya3MyW2ldKTtcclxuICAgICAgICAgICAgZmlyZXdvcmtzMltpXS5jaGFpbihmaXJld29ya3MzW2ldKTtcclxuICAgICAgICAgICAgZmlyZXdvcmtzM1tpXS5jaGFpbihmaXJld29ya3M0W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g44Ki44OL44Oh44O844K344On44Oz44Gu6ZaL5aeLXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcclxuICAgICAgICAgICAgZmlyZXdvcmtzMVtpXS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRyYXdTdGFyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RhciA9IG5ldyBUSFJFRS5TaGFwZSgpO1xyXG5cclxuICAgICAgICAgICAgc3Rhci5tb3ZlVG8oMCwgMSk7XHJcbiAgICAgICAgICAgIHN0YXIubGluZVRvKDAuMjUsIDAuNSk7XHJcbiAgICAgICAgICAgIHN0YXIubGluZVRvKDAuNzUsIDAuNSk7XHJcbiAgICAgICAgICAgIHN0YXIubGluZVRvKDAuNCwgMC4xKTtcclxuICAgICAgICAgICAgc3Rhci5saW5lVG8oMC42LCAtMC41KTtcclxuICAgICAgICAgICAgc3Rhci5saW5lVG8oMCwgLTAuMik7XHJcbiAgICAgICAgICAgIHN0YXIubGluZVRvKC0wLjYsIC0wLjUpO1xyXG4gICAgICAgICAgICBzdGFyLmxpbmVUbygtMC40LCAwLjEpO1xyXG4gICAgICAgICAgICBzdGFyLmxpbmVUbygtMC43NSwgMC41KTtcclxuICAgICAgICAgICAgc3Rhci5saW5lVG8oLTAuMjUsIDAuNSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3RhcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgZXhTdGFyID0ge1xyXG4gICAgICAgICAgICBzdGVwczogMSxcclxuICAgICAgICAgICAgZGVwdGg6IDAuMixcclxuICAgICAgICAgICAgYmV2ZWxFbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBiZXZlbFRoaWNrbmVzczogMC41LFxyXG4gICAgICAgICAgICBiZXZlbFNpemU6IDEsXHJcbiAgICAgICAgICAgIGJldmVsU2VnbWVudDogNSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBzdGFyQW1vdW50cyA9IDEyO1xyXG4gICAgICAgIGxldCBsaXN0OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyOyB6OiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uTGlzdDogeyB4OiBudW1iZXI7IHk6IG51bWJlcjsgejogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgIGxldCBncm91cFN0YXI6IFRIUkVFLkdyb3VwW10gPSBbXTtcclxuICAgICAgICBsZXQgc3RhcnNpbmZvID0gW107XHJcbiAgICAgICAgbGV0IHN0YXJzVXBkYXRlUG9zaXRpb25zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFyQW1vdW50czsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBHZW9tZXRyeVN0YXIgPSBuZXcgVEhSRUUuRXh0cnVkZUdlb21ldHJ5KGRyYXdTdGFyKCksIGV4U3Rhcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWVzaFN0YXIgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IDB4ZmZmZjk5LFxyXG4gICAgICAgICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBncm91cFN0YXJbaV0gPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLmFkZChuZXcgVEhSRUUuTWVzaChHZW9tZXRyeVN0YXIsIG1lc2hTdGFyKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaSA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB4OiAtMzUgKiBNYXRoLnJhbmRvbSgpIC0gNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogLTIwICogTWF0aC5yYW5kb20oKSArIDEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHo6IC0yMCAqIE1hdGgucmFuZG9tKCkgKyAxMCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPCBzdGFyQW1vdW50cyAqIDIgLyAzKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogLTM1ICogTWF0aC5yYW5kb20oKSAtIDM1LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IDE1ICogTWF0aC5yYW5kb20oKSxcclxuICAgICAgICAgICAgICAgICAgICB6OiAtMzAgKiBNYXRoLnJhbmRvbSgpICsgMTUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IC0zNSAqIE1hdGgucmFuZG9tKCkgLSAzNSxcclxuICAgICAgICAgICAgICAgICAgICB5OiAtMTAgKiBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHo6IC0zMCAqIE1hdGgucmFuZG9tKCkgKyAxNSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBncm91cFN0YXJbaV0ucG9zaXRpb24ueCA9IHBvc2l0aW9uTGlzdFtpXS54O1xyXG4gICAgICAgICAgICBncm91cFN0YXJbaV0ucG9zaXRpb24ueSA9IHBvc2l0aW9uTGlzdFtpXS55O1xyXG4gICAgICAgICAgICBncm91cFN0YXJbaV0ucG9zaXRpb24ueiA9IHBvc2l0aW9uTGlzdFtpXS56O1xyXG5cclxuICAgICAgICAgICAgbGV0IHMgPSAwO1xyXG4gICAgICAgICAgICBpZiAoaSA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHMgPSBNYXRoLnJhbmRvbSgpICogMSArIDAuNTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHMgPSBNYXRoLnJhbmRvbSgpICogMC4yICsgMC4wMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBncm91cFN0YXJbaV0uc2NhbGUuc2V0KHMsIHMsIHMpO1xyXG5cclxuICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLnJvdGF0ZVgoTWF0aC5yYW5kb20oKSAqIDAuMDMgLSAwLjAxNSk7XHJcbiAgICAgICAgICAgIGdyb3VwU3RhcltpXS5yb3RhdGVZKE1hdGgucmFuZG9tKCkgKiAwLjAzIC0gMC4wMTUpO1xyXG4gICAgICAgICAgICBncm91cFN0YXJbaV0ucm90YXRlWihNYXRoLnJhbmRvbSgpICogMC4wMyAtIDAuMDE1KTtcclxuXHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB4OiBNYXRoLnJhbmRvbSgpICogMC4wMyAtIDAuMDE1LFxyXG4gICAgICAgICAgICAgICAgeTogTWF0aC5yYW5kb20oKSAqIDAuMDMgLSAwLjAxNSxcclxuICAgICAgICAgICAgICAgIHo6IE1hdGgucmFuZG9tKCkgKiAwLjAzIC0gMC4wMTUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoZ3JvdXBTdGFyW2ldKTtcclxuXHJcbiAgICAgICAgICAgIHN0YXJzaW5mby5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcG9zaXRpb25MaXN0W2ldLngsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHBvc2l0aW9uTGlzdFtpXS55LFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25aOiBwb3NpdGlvbkxpc3RbaV0ueixcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzdGFyc1VwZGF0ZVBvc2l0aW9uc1tpXSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdyb3VwU3RhcltpXS5wb3NpdGlvbi54ID0gc3RhcnNpbmZvW2ldLnBvc2l0aW9uWDtcclxuICAgICAgICAgICAgICAgIGdyb3VwU3RhcltpXS5wb3NpdGlvbi55ID0gc3RhcnNpbmZvW2ldLnBvc2l0aW9uWTtcclxuICAgICAgICAgICAgICAgIGdyb3VwU3RhcltpXS5wb3NpdGlvbi56ID0gc3RhcnNpbmZvW2ldLnBvc2l0aW9uWjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXJzMSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHN0YXJzMiA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhckFtb3VudHM7IGkrKykge1xyXG4gICAgICAgICAgICBzdGFyczFbaV0gPSBuZXcgVFdFRU4uVHdlZW4oc3RhcnNpbmZvW2ldKVxyXG4gICAgICAgICAgICAgICAgLnRvKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOiBwb3NpdGlvbkxpc3RbaV0ueCArIDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZOiBwb3NpdGlvbkxpc3RbaV0ueSAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWjogcG9zaXRpb25MaXN0W2ldLnosXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAwMDAgKyAyMDAwXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZSlcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZShzdGFyc1VwZGF0ZVBvc2l0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIHN0YXJzMltpXSA9IG5ldyBUV0VFTi5Ud2VlbihzdGFyc2luZm9baV0pXHJcbiAgICAgICAgICAgICAgICAudG8oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHBvc2l0aW9uTGlzdFtpXS54ICsgMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblk6IHBvc2l0aW9uTGlzdFtpXS55IC0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25aOiBwb3NpdGlvbkxpc3RbaV0ueixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXHJcbiAgICAgICAgICAgICAgICAub25VcGRhdGUoc3RhcnNVcGRhdGVQb3NpdGlvbnNbaV0pO1xyXG5cclxuICAgICAgICAgICAgc3RhcnMxW2ldLmNoYWluKHN0YXJzMltpXSk7XHJcbiAgICAgICAgICAgIHN0YXJzMltpXS5jaGFpbihzdGFyczFbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFyQW1vdW50czsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0YXJzMVtpXS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/jg6njgqTjg4jjga7oqK3lrppcclxuICAgICAgICB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYpO1xyXG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAwKS5ub3JtYWxpemUoKTtcclxuICAgICAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcclxuICAgICAgICBjb25zdCBib3R0b21MaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAwLjUpOyAvLyDkuIvjgYvjgonjga7lhYlcclxuICAgICAgICBjb25zdCBib3R0b21MdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTEsIDApLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIGJvdHRvbUxpZ2h0LnBvc2l0aW9uLnNldChib3R0b21MdmVjLngsIGJvdHRvbUx2ZWMueSwgYm90dG9tTHZlYy56KTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZChib3R0b21MaWdodCk7XHJcblxyXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jOabtOaWsFxyXG4gICAgICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcclxuXHJcbiAgICAgICAgY29sb3Iub25DaGFuZ2UoKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwubWFwID0gZ2VuZXJhdGVTcHJpdGUodmFsdWUpO1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFJjb2xvci5vbkNoYW5nZSgodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAvLyB2YWx1ZeOBr+WkieabtOW+jOOBrlJjb2xvcuOBruWApO+8iOS+izogJ3JnYihYLCBZLCBaKSfvvIlcclxuICAgICAgICAgICAgLy8gd2FycHNNYXRlcmlhbOOBr+WQhOOCreODpeODvOODluOBq+WAi+WIpeOBquOBruOBp+ODq+ODvOODl+OBl+OBpuabtOaWsFxyXG4gICAgICAgICAgICByYWluTWF0ZXJpYWwubWFwID0gZ2VuZXJhdGVTcHJpdGUodmFsdWUpO1xyXG4gICAgICAgICAgICByYWluTWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDUwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB3YXJwc01hdGVyaWFsW2ldLm1hcCA9IGdlbmVyYXRlU3ByaXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHdhcnBzTWF0ZXJpYWxbaV0ubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBib29scmFpbnMgPSBmYWxzZTtcclxuICAgICAgICBsZXQgYm9vbHJhaW5zU2F2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBib29sc3RhcnMgPSBmYWxzZTtcclxuICAgICAgICBsZXQgYm9vbHN0YXJzU2F2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFyQW1vdW50czsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cFN0YXJbaV0ucm90YXRlWChsaXN0W2ldLngpO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBTdGFyW2ldLnJvdGF0ZVkobGlzdFtpXS55KTtcclxuICAgICAgICAgICAgICAgIGdyb3VwU3RhcltpXS5yb3RhdGVaKGxpc3RbaV0ueik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChndWlPYmouZmlyZXdvcmspIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJHZW5lcmF0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZXdvcmtzMVtpXS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBndWlPYmouZmlyZXdvcmsgPSBcIk9mZlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmV3b3JrQ29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiT2ZmXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChndWlPYmoucmFpbnMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJPTlwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGJvb2xyYWlucyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1MDA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWluQ3ViZXNbaV0udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIk9mZlwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGJvb2xyYWlucyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTAwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFpbkN1YmVzW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChndWlPYmoud2FycHMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJDYXVzZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihib29scmFpbnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29scmFpbnNTYXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3VpT2JqLnJhaW5zID0gXCJPZmZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFpbnNDb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihib29sc3RhcnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbHN0YXJzU2F2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJBbW91bnRzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBndWlPYmouc3RhcnMgPSBcIk9mZlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnNDb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTAwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2FycHMxW2ldLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGd1aU9iai53YXJwcyA9IFwiT2ZmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FycENvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihib29scmFpbnNTYXZlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9vbHJhaW5zU2F2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBndWlPYmoucmFpbnMgPSBcIk9OXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhaW5zQ29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYm9vbHN0YXJzU2F2ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sc3RhcnNTYXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJBbW91bnRzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBndWlPYmouc3RhcnMgPSBcIk9OXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyc0NvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiT2ZmXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChndWlPYmouc3RhcnMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJPTlwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGJvb2xzdGFycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFyQW1vdW50czsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwU3RhcltpXS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiT2ZmXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbHN0YXJzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFyQW1vdW50czsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwU3RhcltpXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xyXG4gICAgICAgICAgICBUV0VFTi51cGRhdGUoKTsgLy/ov73liqDliIZcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xyXG4gICAgfTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGxldCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xyXG5cclxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTShcclxuICAgICAgICA2NDAsXHJcbiAgICAgICAgNDgwLFxyXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDUsIDAsIDApXHJcbiAgICApO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190d2VlbmpzX3R3ZWVuX2pzX2Rpc3RfdHdlZW5fZXNtX2pzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc20tOWVhN2MzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9