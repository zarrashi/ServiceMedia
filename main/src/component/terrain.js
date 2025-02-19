!function() {
    "use strict";
    var e = e=>{
        e.utils = {
            uid: (()=>{
                const e = {
                    value: "0"
                };
                let t = "123456789".split("").reduce((e,t,n,i)=>{
                    const o = {};
                    o.value = t;
                    o.prev = e;
                    return o
                }
                , e);
                e.prev = t;
                return function() {
                    let e = Date.now();
                    return "object" == typeof performance && "function" == typeof performance.now && (e = performance.now().toString().replace(".", "")),
                    t = t.prev,
                    `${e}${Math.random().toString(16).substr(2)}${t.value}`
                }
            }
            )(),
            isEqual: function(e, t) {
                for (var n in e)
                    if (e.hasOwnProperty(n) && !1 === function(e, t) {
                        var n = Object.prototype.toString.call(e);
                        if (n !== Object.prototype.toString.call(t))
                            return !1;
                        if ("[object Function]" === n) {
                            if (e.toString() !== t.toString())
                                return !1
                        } else if (e !== t)
                            return !1
                    }(e[n], t[n]))
                        return !1;
                return !0
            },
            toColor: function(e) {
                return "rgba(" + [(16711680 & (e >>>= 0)) >>> 16, (65280 & e) >>> 8, 255 & e, ((4278190080 & e) >>> 24) / 255].join(",") + ")"
            },
            randomFromArray: function(e) {
                return e.length > 0 && e[Math.floor(Math.random() * e.length)]
            }
        }
    }
    ;
    (()=>{
        window.addEventListener("load", function() {
            let e = document.createElement("div");
            e.className = "lds-grid";
            for (let t = 0; t < 9; t++)
                e.appendChild(document.createElement("div"));
            e.style.left = window.innerWidth / 2 - 32 + "px";
            let t = document.querySelector("#loading-screen");
            t.style.width = window.innerWidth + "px",
            t.style.height = window.innerHeight + "px",
            t.appendChild(e)
        }, !1)
    }
    )();
    var t = function() {
        var e = new THREE.Matrix4;
        return function(t, n) {
            n.matrix.copy(t.matrixWorld),
            n.applyMatrix(e.getInverse(n.parent.matrixWorld))
        }
    }();
    !function() {
        AFRAME.registerComponent("grabbable", {
            schema: {
                origin: {
                    type: "selector"
                }
            },
            init: function() {
                function e() {
                    "Mobile" == CS1.device ? (a.el.addEventListener("click", function(e) {
                        n(e),
                        setTimeout(function(e) {
                            document.querySelector("#cam-cursor").setAttribute("material", "color: yellow"),
                            i(e),
                            setTimeout(function(e) {
                                document.querySelector("#cam-cursor").setAttribute("material", "color: crimson")
                            }, 500)
                        }, 5e3)
                    }),
                    a.el.addEventListener("mouseenter", e=>{
                        document.querySelector("#cam-cursor").setAttribute("material", {
                            color: "green"
                        })
                    }
                    ),
                    a.el.addEventListener("mouseleave", e=>{
                        document.querySelector("#cam-cursor").setAttribute("material", {
                            color: "crimson"
                        })
                    }
                    )) : "Standard" == CS1.device && (a.el.addEventListener("mouseenter", e=>{
                        document.querySelector("#cam-cursor").setAttribute("material", {
                            color: "green"
                        })
                    }
                    ),
                    a.el.addEventListener("mouseleave", e=>{
                        document.querySelector("#cam-cursor").setAttribute("material", {
                            color: "crimson"
                        })
                    }
                    )),
                    document.removeEventListener("gameStart", e)
                }
                function n(e) {
                    e.cancelBubble = !0,
                    a.isDragging || (a.isDragging = !0,
                    a.cursor = e.detail.cursorEl,
                    a.cursor == a.el.sceneEl && (a.cursor = document.querySelector("[camera]")),
                    CS1.socket.emit("logall", {
                        msg: `${CS1.myPlayer.name} grabbing!`,
                        channel: a.name
                    }),
                    a.el.setAttribute("visible", !1),
                    setTimeout(function() {
                        a.el.setAttribute("visible", !0)
                    }, 20),
                    o(a.cursor.object3D),
                    a.originEl.emit("grabStart", e),
                    a.originEl.addState("moving"))
                }
                function i(e) {
                    a.isDragging && (CS1.socket.emit("logall", {
                        msg: `${CS1.myPlayer.name} releasing!`,
                        channel: a.name
                    }),
                    a.isDragging = !1,
                    a.proxyObject && (a.proxyObject.parent.remove(a.proxyObject),
                    a.proxyObject = null),
                    a.originEl.setAttribute("position", a.originEl.getAttribute("position")),
                    a.originEl.setAttribute("rotation", a.originEl.getAttribute("rotation")),
                    a.originEl.emit("grabEnd", e),
                    a.originEl.removeState("moving"))
                }
                function o(e) {
                    a.proxyObject = new THREE.Object3D,
                    a.originEl.visible = !1,
                    setTimeout(function() {
                        a.originEl.visible = !0
                    }, 1e3),
                    e.add(a.proxyObject),
                    t(a.originEl.object3D, a.proxyObject)
                }
                var a = this;
                a.cursor = !1,
                a.isDragging = !1,
                a.originEl = this.data.origin || this.el,
                a.proxyObject = null,
                a.el.classList.add("interactive"),
                CS1.grabbables || (CS1.grabbables = {}),
                a.name = Object.keys(CS1.grabbables).length,
                CS1.grabbables[a.name] = a.el,
                a.el.components.log && (a.el.setAttribute("log", `channel:${String(a.name)}`),
                CS1.socket._callbacks["$vr-log"] || CS1.socket.on("vr-log", e=>{
                    CS1.log(e.msg, String(e.channel))
                }
                )),
                a.el.addEventListener("mousedown", n),
                a.el.addEventListener("mouseup", i),
                document.addEventListener("gameStart", e),
                AFRAME.utils.device.checkHeadsetConnected(),
                a.el.addEventListener("mouseup", i),
                CS1.updateGrabbables || (CS1.updateGrabbables = (e=>{
                    if (0 === Object.keys(CS1.grabbables).length || !CS1.grabbables[e[0].name] || !CS1.game.hasBegun)
                        return;
                    e.forEach((e,t)=>{
                        let n = CS1.grabbables[e.name];
                        CS1.debug && (console.log("Individual body data from server:"),
                        console.log(e));
                        e.position && n.object3D.position.copy(e.position);
                        e.scale && n.object3D.scale.copy(e.scale);
                        e.rotation && n.object3D.quaternion.copy(e.rotation)
                    }
                    )
                }
                ))
            },
            tick: function() {
                var e = this;
                e.proxyObject && (t(e.proxyObject, e.originEl.object3D),
                e.originEl.setAttribute("position", e.originEl.getAttribute("position")),
                e.originEl.setAttribute("rotation", e.originEl.getAttribute("rotation")))
            }
        })
    }(),
    function() {
        AFRAME.registerComponent("nav-pointer", {
            init: function() {
                const e = this.el;
                e.addEventListener("click", t=>{
                    const n = e.sceneEl.querySelector("[nav-agent]");
                    n && n.setAttribute("nav-agent", {
                        active: !0,
                        destination: t.detail.intersection.point
                    })
                }
                ),
                e.addEventListener("mouseenter", t=>{
                    e.setAttribute("material", {
                        color: "green"
                    })
                }
                ),
                e.addEventListener("mouseleave", t=>{
                    e.setAttribute("material", {
                        color: "crimson"
                    })
                }
                ),
                e.addEventListener("mousedown", e=>{}
                ),
                e.sceneEl.addEventListener("object3dset", e=>{
                    this.el.components.raycaster.refreshObjects()
                }
                )
            }
        })
    }(),
    function() {
        AFRAME.registerComponent("weather-viz", {
            schema: {
                side: {
                    type: "string",
                    default: "double"
                },
                url: {
                    type: "string",
                    default: "https://api.openweathermap.org/data/2.5/forecast/?appid=56df5e300fabead0a56fc2d706e6aa7d&id=4959473"
                }
            },
            dependencies: ["geometry", "material"],
            init: function() {
                this.el.setAttribute("width", 6),
                this.el.setAttribute("height", 4),
                this.canvas = document.createElement("canvas"),
                this.canvas.style.position = "absolute",
                this.canvas.style.left = -2e3,
                this.canvas.id = CS1.utils.uid(),
                this.canvas.setAttribute("crossOrigin", "anonymous"),
                document.querySelector("a-scene").appendChild(this.canvas),
                this.el.setAttribute("material", `shader:flat;src:#${this.canvas.id};side:${this.data.side}`),
                this.cursor = document.querySelector("#cam-cursor");
                var e = this.ctx = this.canvas.getContext("2d");
                e.fillStyle = "rgb(0, 0, 0)",
                e.fillRect(0, 0, this.canvas.width, this.canvas.height),
                this.dataProcessed = !1,
                fetch(this.data.url).then(e=>e.json()).then(e=>{
                    this.processData(e)
                }
                ).catch(e=>{
                    console.log(e)
                }
                )
            },
            processData: function(e) {
                this.data = [],
                e.list.forEach(e=>{
                    this.data.push({
                        dt: e.dt_txt,
                        temp_max: this.k2f(e.main.temp_max)
                    })
                }
                ),
                this.dataProcessed = !0
            },
            k2f: function(e) {
                return Math.round(9 * (e - 273.15) / 5 + 32)
            },
            tick: function(e, t) {
                this.dataProcessed && (this.visualizeData(e),
                this.updateCanvas())
            },
            visualizeData: function(e) {
                let t = this.canvas
                  , n = t.width / this.data.length
                  , i = this.ctx;
                "green" == this.cursor.getAttribute("material").color && (e = 1e3),
                this.data.forEach((o,a)=>{
                    let r = e * (o.temp_max / 900);
                    i.fillStyle = "hsl(" + r + ", 50%, 30%)";
                    i.fillRect(a * n, 0, n, t.height)
                }
                )
            },
            drawRectangles: function(e) {
                var t, n, i = this.canvas, o = this.ctx, a = e / 10;
                o.fillStyle = "hsl(" + a + ", 50%, 80%)",
                o.fillRect(0, 0, i.width, i.height),
                a = e / 15,
                o.fillStyle = "hsl(" + a + ", 50%, 60%)",
                t = i.width / 10,
                n = i.height / 10,
                o.fillRect(t, n, i.width - 2 * t, i.height - 2 * n),
                a = e / 20,
                o.fillStyle = "hsl(" + a + ", 50%, 40%)",
                t = i.width / 5,
                n = i.height / 5,
                o.fillRect(t, n, i.width - 2 * t, i.height - 2 * n)
            },
            updateCanvas: function() {
                var e;
                (e = this.el.getObject3D("mesh").material).map && (e.map.needsUpdate = !0)
            }
        })
    }();
    var n = {
        id: 139,
        name: "Polkadot Shader",
        fragment: "// Gives us dFdx\n#extension GL_OES_standard_derivatives : enable\n\nprecision highp float;\nprecision highp int;\n\nuniform vec3 cameraPosition;\nuniform vec3 color1;\nuniform vec3 color2;\nuniform float frequency;\nuniform float radius;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n\n// Anti-alias step function\nfloat aastep(float threshold, float value) {\n    float afwidth = 0.7 * length(vec2(dFdx(value), dFdy(value)));\n    return smoothstep(threshold - afwidth, threshold + afwidth, value);\n}\n \nvoid main() {\n    // Rotate the UV coord by 45 degrees. See \n    // https://en.wikipedia.org/wiki/Rotation_matrix#Common_rotations\n    vec2 st2 = mat2( 0.5, -0.5, 0.5, 0.5 ) * vUv;\n    vec2 nearest = 2.0 * fract( frequency * st2 ) - 1.0;\n    float dist = length( nearest );\n    \n    vec3 fragcolor = mix( color1, color2, aastep( radius, dist ) );\n    gl_FragColor = vec4( fragcolor, 1.0 );\n}",
        vertex: "/**\n* Example Vertex Shader\n* Sets the position of the vertex by setting gl_Position\n*/\n\n// Set the precision for data types used in this shader\nprecision highp float;\nprecision highp int;\n\n// Default THREE.js uniforms available to both fragment and vertex shader\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\n\n// Default uniforms provided by ShaderFrog.\nuniform vec3 cameraPosition;\nuniform float time;\n\n// Default attributes provided by THREE.js. Attributes are only available in the\n// vertex shader. You can pass them to the fragment shader using varyings\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n\n// Examples of variables passed from vertex to fragment shader\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec2 vUv2;\n\nvoid main() {\n\n    // To pass variables to the fragment shader, you assign them here in the\n    // main function. Traditionally you name the varying with vAttributeName\n    vNormal = normal;\n    vUv = uv;\n    vUv2 = uv2;\n    vPosition = position;\n\n    // This sets the position of the vertex in 3d space. The correct math is\n    // provided below to take into account camera and object data.\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}",
        uniforms: {
            cameraPosition: {
                name: "cameraPosition",
                type: "v3",
                glslType: "vec3",
                description: ""
            },
            time: {
                name: "time",
                type: "f",
                glslType: "float",
                description: ""
            },
            color1: {
                name: null,
                type: "c",
                glslType: "vec3",
                value: {
                    r: 1,
                    g: .5411764705882353,
                    b: .7294117647058823
                },
                description: ""
            },
            color2: {
                name: null,
                type: "c",
                glslType: "vec3",
                value: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                description: ""
            },
            frequency: {
                name: null,
                type: "f",
                glslType: "float",
                value: "10",
                description: ""
            },
            radius: {
                name: null,
                type: "f",
                glslType: "float",
                value: "0.5",
                description: ""
            }
        },
        url: "http://shaderfrog.com/app/view/139",
        user: {
            username: "andrewray",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , i = {
        id: 1068,
        name: "Sun Shader",
        fragment: "#define OCTAVES 2\n\n#extension GL_OES_standard_derivatives : enable\n\nprecision highp float;\nprecision highp int;\nuniform float time;\nuniform float brightness;\nuniform float sunSpots;\nuniform vec3 color;\nuniform vec2 speed;\nuniform vec2 resolution;\nvarying vec2 vUv;\nfloat rand(vec2 n) \n{\n    return fract(sin(dot(n, vec2(13, 5))) * 43758.5453);\n}\nfloat noise(vec2 n) \n{\n    const vec2 d = vec2(0.0, 1.0);\n    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));\n    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);\n}\nfloat fbm(vec2 n) \n{\n    float total = 0.0;\n    float amplitude = 2.0;\n    for (int i = 0;\n i < OCTAVES; i++) \n    {\n        total += noise(n) * amplitude;\n        n += n;\n        amplitude *= 0.3;\n    }\n    return total;\n}\nvec3 tex(vec2 pos) \n{\n    vec3 c1 = (1.0 - sunSpots) * vec3(3.1, 0.0, 0.0);\n    vec3 c2 = vec3(c1);\n    vec3 c3 = vec3(c1);\n    vec3 c4 = vec3(3.0, 0.9, 0.0) * color;\n    vec3 c5 = vec3(c3);\n    vec3 c6 = vec3(c1);\n    vec2 p = pos;\n    float q = fbm(p + time * speed);\n    vec2 r = vec2(fbm(p + q + (time * speed.x) - p.x - p.y), fbm(p + p + (time * speed.y)));\n    vec3 c = color * (mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y));\n    return c;\n}\nvec4 Surface_of_The_Sun1478777938883_101_main() \n{\n    vec4 Surface_of_The_Sun1478777938883_101_gl_FragColor = vec4(0.0);\n    vec2 p = (vUv - 0.5) * resolution;\n    vec3 col = tex(p);\n    Surface_of_The_Sun1478777938883_101_gl_FragColor = vec4(col * brightness, 1.0);\n    return Surface_of_The_Sun1478777938883_101_gl_FragColor *= 1.0;\n}\nvoid main() \n{\n    gl_FragColor = (Surface_of_The_Sun1478777938883_101_main());}\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform float time;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec2 vUv2;\nvec4 Surface_of_The_Sun1478777938883_101_main() \n{\n    vec4 Surface_of_The_Sun1478777938883_101_gl_Position = vec4(0.0);\n    vNormal = normal;\n    vUv = uv;\n    vUv2 = uv2;\n    vPosition = position;\n    Surface_of_The_Sun1478777938883_101_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    return Surface_of_The_Sun1478777938883_101_gl_Position *= 1.0;\n}\nvoid main() \n{\n    gl_Position = Surface_of_The_Sun1478777938883_101_main();}\n",
        uniforms: {
            cameraPosition: {
                type: "v3",
                glslType: "vec3"
            },
            time: {
                type: "f",
                glslType: "float"
            },
            resolution: {
                value: {
                    x: "100",
                    y: "100"
                },
                type: "v2",
                glslType: "vec2"
            },
            brightness: {
                value: "0.52098325",
                type: "f",
                glslType: "float"
            },
            speed: {
                value: {
                    x: .9230769230769231,
                    y: .9230769230769231
                },
                type: "v2",
                glslType: "vec2"
            },
            color: {
                value: {
                    r: "1",
                    g: "1",
                    b: "1"
                },
                type: "c",
                glslType: "vec3"
            },
            sunSpots: {
                value: "1",
                type: "f",
                glslType: "float"
            }
        },
        url: "http://shaderfrog.com/app/view/1068",
        user: {
            username: "entropy",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , o = {
        id: 2901,
        name: "Jelly Shader",
        fragment: "#define TAU 6.28318530718\n#define MAX_ITER 5\n#define tau 6.2831853\n\n#extension GL_OES_standard_derivatives : enable\n\nprecision highp float;\nprecision highp int;\nuniform vec2 Tiling_Caustic1477531952046_152_resolution;\nuniform vec3 backgroundColor;\nuniform vec3 Tiling_Caustic1477531952046_152_color;\nuniform float Tiling_Caustic1477531952046_152_speed;\nuniform float Tiling_Caustic1477531952046_152_brightness;\nuniform float time;\nuniform float contrast;\nuniform float distortion;\nuniform float Noise_Ripples1477531959288_166_speed;\nuniform vec3 Noise_Ripples1477531959288_166_color;\nuniform float Noise_Ripples1477531959288_166_brightness;\nuniform sampler2D noiseImage;\nuniform vec2 Noise_Ripples1477531959288_166_resolution;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat3 normalMatrix;\nuniform float highlightIntensity;\nuniform vec3 highlightColor;\nuniform vec3 Wiggly_Improved1477532051339_181_color;\nuniform vec3 Transparent_Glow1477532059126_201_color;\nuniform float Transparent_Glow1477532059126_201_start;\nuniform float Transparent_Glow1477532059126_201_end;\nuniform float Transparent_Glow1477532059126_201_alpha;\nuniform vec3 Glow_Effect1477532183055_216_color;\nuniform float Glow_Effect1477532183055_216_start;\nuniform float Glow_Effect1477532183055_216_end;\nuniform float Glow_Effect1477532183055_216_alpha;\nvarying vec2 Tiling_Caustic1477531952046_152_vUv;\nvarying vec2 Noise_Ripples1477531959288_166_vUv;\nmat2 makem2(in float theta) \n    {\n        float c = cos(theta);\n        float s = sin(theta);\n        return mat2(c, -s, s, c);\n    }\nfloat noise(in vec2 x) \n    {\n        return texture2D(noiseImage, x * .01).x;\n    }\nfloat fbm(in vec2 p) \n    {\n        float z = 2.;\n        float rz = 0.;\n        vec2 bp = p;\n        for (float i = 1.;\n i < 6.0; i++) \n        {\n            rz += abs((noise(p) - 0.5) * 2.0) / z;\n            z = z * 2.;\n            p = p * 2.;\n        }\n        return rz;\n    }\nfloat dualfbm(in vec2 p) \n    {\n        vec2 p2 = p * distortion;\n        vec2 basis = vec2(fbm(p2 - time * Noise_Ripples1477531959288_166_speed * 1.6), fbm(p2 + time * Noise_Ripples1477531959288_166_speed * 1.7));\n        basis = (basis - .5) * .2;\n        p += basis;\n        return fbm(p * makem2(time * Noise_Ripples1477531959288_166_speed * 0.2));\n    }\nvarying vec3 Wiggly_Improved1477532051339_181_vNormal;\nvarying float light;\nvarying vec3 Transparent_Glow1477532059126_201_fPosition;\nvarying vec3 Transparent_Glow1477532059126_201_fNormal;\nvarying vec3 Glow_Effect1477532183055_216_fPosition;\nvarying vec3 Glow_Effect1477532183055_216_fNormal;\nvec4 Tiling_Caustic1477531952046_152_main() \n    {\n        vec4 Tiling_Caustic1477531952046_152_gl_FragColor = vec4(0.0);\n        vec2 uv = Tiling_Caustic1477531952046_152_vUv * Tiling_Caustic1477531952046_152_resolution;\n        vec2 p = mod(uv * TAU, TAU) - 250.0;\n        vec2 i = vec2(p);\n        float c = 1.0;\n        float inten = 0.005;\n        for (int n = 0;\n n < MAX_ITER; n++) \n        {\n            float t = time * Tiling_Caustic1477531952046_152_speed * (1.0 - (3.5 / float(n + 1)));\n            i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));\n            c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));\n        }\n        c /= float(MAX_ITER);\n        c = 1.17 - pow(c, Tiling_Caustic1477531952046_152_brightness);\n        vec3 rgb = vec3(pow(abs(c), 8.0));\n        Tiling_Caustic1477531952046_152_gl_FragColor = vec4(rgb * Tiling_Caustic1477531952046_152_color + backgroundColor, 1.0);\n        return Tiling_Caustic1477531952046_152_gl_FragColor *= 1.0;\n    }\nvec4 Noise_Ripples1477531959288_166_main() \n    {\n        vec4 Noise_Ripples1477531959288_166_gl_FragColor = vec4(0.0);\n        vec2 p = (Noise_Ripples1477531959288_166_vUv.xy - 0.5) * Noise_Ripples1477531959288_166_resolution;\n        float rz = dualfbm(p);\n        vec3 col = (Noise_Ripples1477531959288_166_color / rz) * Noise_Ripples1477531959288_166_brightness;\n        col = ((col - 0.5) * max(contrast, 0.0)) + 0.5;\n        Noise_Ripples1477531959288_166_gl_FragColor = vec4(col, 1.0);\n        return Noise_Ripples1477531959288_166_gl_FragColor *= 1.0;\n    }\nvec4 Wiggly_Improved1477532051339_181_main() \n    {\n        vec4 Wiggly_Improved1477532051339_181_gl_FragColor = vec4(0.0);\n        Wiggly_Improved1477532051339_181_gl_FragColor = vec4(clamp(highlightColor * highlightIntensity * light, 0.0, 1.0), 1.0);\n        return Wiggly_Improved1477532051339_181_gl_FragColor *= 1.0;\n    }\nvec4 Transparent_Glow1477532059126_201_main() \n    {\n        vec4 Transparent_Glow1477532059126_201_gl_FragColor = vec4(0.0);\n        vec3 normal = normalize(Transparent_Glow1477532059126_201_fNormal);\n        vec3 eye = normalize(-Transparent_Glow1477532059126_201_fPosition.xyz);\n        float rim = smoothstep(Transparent_Glow1477532059126_201_start, Transparent_Glow1477532059126_201_end, 1.0 - dot(normal, eye));\n        float value = clamp(rim * Transparent_Glow1477532059126_201_alpha, 0.0, 1.0);\n        Transparent_Glow1477532059126_201_gl_FragColor = vec4(Transparent_Glow1477532059126_201_color * value, value);\n        return Transparent_Glow1477532059126_201_gl_FragColor *= 1.0;\n    }\nvec4 Glow_Effect1477532183055_216_main() \n    {\n        vec4 Glow_Effect1477532183055_216_gl_FragColor = vec4(0.0);\n        vec3 normal = normalize(Glow_Effect1477532183055_216_fNormal);\n        vec3 eye = normalize(-Glow_Effect1477532183055_216_fPosition.xyz);\n        float rim = smoothstep(Glow_Effect1477532183055_216_start, Glow_Effect1477532183055_216_end, 1.0 - dot(normal, eye));\n        Glow_Effect1477532183055_216_gl_FragColor = vec4(clamp(rim, 0.0, 1.0) * Glow_Effect1477532183055_216_alpha * Glow_Effect1477532183055_216_color, 1.0);\n        return Glow_Effect1477532183055_216_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = (Tiling_Caustic1477531952046_152_main() + Noise_Ripples1477531959288_166_main() + Wiggly_Improved1477532051339_181_main() + Transparent_Glow1477532059126_201_main() + Glow_Effect1477532183055_216_main());    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform float time;\nuniform float Wiggly_Improved1477532051339_181_speed;\nuniform float frequency;\nuniform float amplitude;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec3 Tiling_Caustic1477531952046_152_vPosition;\nvarying vec3 Tiling_Caustic1477531952046_152_vNormal;\nvarying vec2 Tiling_Caustic1477531952046_152_vUv;\nvarying vec2 Tiling_Caustic1477531952046_152_vUv2;\nvarying vec3 Noise_Ripples1477531959288_166_vPosition;\nvarying vec3 Noise_Ripples1477531959288_166_vNormal;\nvarying vec2 Noise_Ripples1477531959288_166_vUv;\nvarying vec2 Noise_Ripples1477531959288_166_vUv2;\nvarying vec3 Wiggly_Improved1477532051339_181_vNormal;\nvarying float light;\nvarying vec3 Wiggly_Improved1477532051339_181_vPosition;\nvarying vec3 Transparent_Glow1477532059126_201_fNormal;\nvarying vec3 Transparent_Glow1477532059126_201_fPosition;\nvarying vec3 Glow_Effect1477532183055_216_fNormal;\nvarying vec3 Glow_Effect1477532183055_216_fPosition;\nvec4 Tiling_Caustic1477531952046_152_main() \n    {\n        vec4 Tiling_Caustic1477531952046_152_gl_Position = vec4(0.0);\n        Tiling_Caustic1477531952046_152_vNormal = normal;\n        Tiling_Caustic1477531952046_152_vUv = uv;\n        Tiling_Caustic1477531952046_152_vUv2 = uv2;\n        Tiling_Caustic1477531952046_152_vPosition = position;\n        Tiling_Caustic1477531952046_152_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Tiling_Caustic1477531952046_152_gl_Position *= 1.0;\n    }\nvec4 Noise_Ripples1477531959288_166_main() \n    {\n        vec4 Noise_Ripples1477531959288_166_gl_Position = vec4(0.0);\n        Noise_Ripples1477531959288_166_vNormal = normal;\n        Noise_Ripples1477531959288_166_vUv = uv;\n        Noise_Ripples1477531959288_166_vUv2 = uv2;\n        Noise_Ripples1477531959288_166_vPosition = position;\n        Noise_Ripples1477531959288_166_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Noise_Ripples1477531959288_166_gl_Position *= 1.0;\n    }\nvec4 Wiggly_Improved1477532051339_181_main() \n    {\n        vec4 Wiggly_Improved1477532051339_181_gl_Position = vec4(0.0);\n        vec3 offset = normalize(vec3(0.0) - position) * (amplitude * sin(Wiggly_Improved1477532051339_181_speed * time + position.y * frequency));\n        vec3 newPosition = position + vec3(offset.x, 0.0, offset.z);\n        light = amplitude * sin(Wiggly_Improved1477532051339_181_speed * time + 1.0 + position.y * frequency);\n        Wiggly_Improved1477532051339_181_vPosition = newPosition;\n        Wiggly_Improved1477532051339_181_gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);\n        return Wiggly_Improved1477532051339_181_gl_Position *= 1.0;\n    }\nvec4 Transparent_Glow1477532059126_201_main() \n    {\n        vec4 Transparent_Glow1477532059126_201_gl_Position = vec4(0.0);\n        Transparent_Glow1477532059126_201_fNormal = normalize(normalMatrix * normal);\n        vec4 pos = modelViewMatrix * vec4(position, 1.0);\n        Transparent_Glow1477532059126_201_fPosition = pos.xyz;\n        Transparent_Glow1477532059126_201_gl_Position = projectionMatrix * pos;\n        return Transparent_Glow1477532059126_201_gl_Position *= 1.0;\n    }\nvec4 Glow_Effect1477532183055_216_main() \n    {\n        vec4 Glow_Effect1477532183055_216_gl_Position = vec4(0.0);\n        Glow_Effect1477532183055_216_fNormal = normalize(normalMatrix * normal);\n        vec4 pos = modelViewMatrix * vec4(position, 1.0);\n        Glow_Effect1477532183055_216_fPosition = pos.xyz;\n        Glow_Effect1477532183055_216_gl_Position = projectionMatrix * pos;\n        return Glow_Effect1477532183055_216_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Tiling_Caustic1477531952046_152_main() + Noise_Ripples1477531959288_166_main() + Wiggly_Improved1477532051339_181_main() + Transparent_Glow1477532059126_201_main() + Glow_Effect1477532183055_216_main();    }\n",
        uniforms: {
            cameraPosition: {
                type: "v3",
                glslType: "vec3"
            },
            time: {
                type: "f",
                glslType: "float"
            },
            backgroundColor: {
                value: {
                    r: "0",
                    g: "0",
                    b: "0"
                },
                type: "c",
                glslType: "vec3"
            },
            Tiling_Caustic1477531952046_152_resolution: {
                value: {
                    x: 1,
                    y: 1
                },
                type: "v2",
                glslType: "vec2"
            },
            Tiling_Caustic1477531952046_152_color: {
                value: {
                    r: 1,
                    g: 1,
                    b: 1
                },
                type: "c",
                glslType: "vec3"
            },
            Tiling_Caustic1477531952046_152_speed: {
                value: "0.5",
                type: "f",
                glslType: "float"
            },
            Tiling_Caustic1477531952046_152_brightness: {
                value: "1.5",
                type: "f",
                glslType: "float"
            },
            noiseImage: {
                value: null,
                type: "t",
                glslType: "sampler2D"
            },
            distortion: {
                value: "2",
                type: "f",
                glslType: "float"
            },
            contrast: {
                value: "1.5",
                type: "f",
                glslType: "float"
            },
            Noise_Ripples1477531959288_166_speed: {
                value: "0.1",
                type: "f",
                glslType: "float"
            },
            Noise_Ripples1477531959288_166_color: {
                value: {
                    r: 1,
                    g: .2823529411764706,
                    b: .4823529411764706
                },
                type: "c",
                glslType: "vec3"
            },
            Noise_Ripples1477531959288_166_brightness: {
                value: "0.1",
                type: "f",
                glslType: "float"
            },
            Noise_Ripples1477531959288_166_resolution: {
                value: {
                    x: "2",
                    y: "2"
                },
                type: "v2",
                glslType: "vec2"
            },
            amplitude: {
                value: "2",
                type: "f",
                glslType: "float"
            },
            frequency: {
                value: "2",
                type: "f",
                glslType: "float"
            },
            highlightIntensity: {
                value: "0.4",
                type: "f",
                glslType: "float"
            },
            highlightColor: {
                value: {
                    r: 1,
                    g: .5450980392156862,
                    b: .23529411764705882
                },
                type: "c",
                glslType: "vec3"
            },
            Wiggly_Improved1477532051339_181_color: {
                value: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                type: "c",
                glslType: "vec3"
            },
            Wiggly_Improved1477532051339_181_speed: {
                value: "1",
                type: "f",
                glslType: "float"
            },
            Transparent_Glow1477532059126_201_color: {
                value: {
                    r: 1,
                    g: .5294117647058824,
                    b: .8156862745098039
                },
                type: "c",
                glslType: "vec3"
            },
            Transparent_Glow1477532059126_201_start: {
                value: "0.54674743",
                type: "f",
                glslType: "float"
            },
            Transparent_Glow1477532059126_201_end: {
                value: "0.44399246",
                type: "f",
                glslType: "float"
            },
            Transparent_Glow1477532059126_201_alpha: {
                value: "0.5",
                type: "f",
                glslType: "float"
            },
            Glow_Effect1477532183055_216_color: {
                value: {
                    r: "1",
                    g: "1",
                    b: "1"
                },
                type: "c",
                glslType: "vec3"
            },
            Glow_Effect1477532183055_216_start: {
                value: "0",
                type: "f",
                glslType: "float"
            },
            Glow_Effect1477532183055_216_end: {
                value: "1.9",
                type: "f",
                glslType: "float"
            },
            Glow_Effect1477532183055_216_alpha: {
                value: "1",
                type: "f",
                glslType: "float"
            }
        },
        url: "http://shaderfrog.com/app/view/2901",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , a = {
        id: 2894,
        name: "Green Dance",
        fragment: "#define PI 3.1415926535897932384626433832795\n\nprecision highp float;\nprecision highp int;\nuniform float time;\nuniform float Flowing_Image_Combination1547651045656_420_speed;\nuniform float Flowing_Image_Combination1547651045656_420_resolution;\nuniform sampler2D image1;\nuniform sampler2D image2;\nuniform vec3 Flowing_Image_Combination1547651045656_420_color;\nuniform vec3 Horizontal_Stripes1547651045669_423_color1;\nuniform vec3 Horizontal_Stripes1547651045669_423_color2;\nuniform float Horizontal_Stripes1547651045669_423_speed;\nuniform float Horizontal_Stripes1547651045669_423_multiplicationFactor;\nuniform vec3 Vertical_2_Color_Graident1547651045681_426_color1;\nuniform vec3 Vertical_2_Color_Graident1547651045681_426_color2;\nuniform float Checkerboard1547651045687_429_multiplicationFactor;\nuniform float Borg_Hull1547651045698_432_speed;\nuniform float Borg_Hull1547651045698_432_resolution;\nuniform vec3 Borg_Hull1547651045698_432_color;\nuniform float brightness;\nuniform float Disco_Dots1547651045724_435_speed;\nuniform vec2 Disco_Dots1547651045724_435_resolution;\nuniform vec3 Disco_Dots1547651045724_435_color;\nvarying vec2 Flowing_Image_Combination1547651045656_420_vUv;\nvarying vec2 Horizontal_Stripes1547651045669_423_vUv;\nvarying vec2 Vertical_2_Color_Graident1547651045681_426_vUv;\nvarying vec2 Checkerboard1547651045687_429_vUv;\nvarying vec3 vPosition;\nvarying vec2 Borg_Hull1547651045698_432_vUv;\nvec2 circuit(vec2 p) \n    {\n        p = fract(p);\n        float r = 5.123;\n        float v = 0.0, g = 0.0;\n        r = fract(r * 9184.928);\n        float cp, d;\n        d = p.x;\n        g += pow(clamp(1.0 - abs(d), 0.0, 1.0), 1000.0);\n        d = p.y;\n        g += pow(clamp(1.0 - abs(d), 0.0, 1.0), 1000.0);\n        d = p.x - 1.0;\n        g += pow(clamp(3.0 - abs(d), 0.0, 1.0), 1000.0);\n        d = p.y - 1.0;\n        g += pow(clamp(1.0 - abs(d), 0.0, 1.0), 10000.0);\n        const int iter = 20;\n        for (int i = 0;\n i < iter; i++) \n        {\n            cp = 0.5 + (r - 0.5) * 0.9;\n            d = p.x - cp;\n            g += pow(clamp(1. - abs(d), 0.0, 1.0), 200.0);\n            if (d > 0.0) \n            {\n                r = fract(r * 4829.013);\n                p.x = (p.x - cp) / (1.0 - cp);\n                v += 1.0;\n            }\n else \n            {\n                r = fract(r * 1239.528);\n                p.x = p.x / cp;\n            }\n            p = p.yx;\n        }\n        v /= float(iter);\n        return vec2(g, v);\n    }\nvarying vec2 Disco_Dots1547651045724_435_vUv;\nfloat rand(vec2 co) \n    {\n        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n    }\nvec4 Flowing_Image_Combination1547651045656_420_main() \n    {\n        vec4 Flowing_Image_Combination1547651045656_420_gl_FragColor = vec4(0.0);\n        vec2 uv = Flowing_Image_Combination1547651045656_420_vUv.xy * Flowing_Image_Combination1547651045656_420_resolution;\n        vec4 texCol = vec4(texture2D(image1, uv));\n        mat3 tfm;\n        tfm[0] = vec3(texCol.z, 0.0, 0);\n        tfm[1] = vec3(0.0, texCol.y, 0);\n        tfm[2] = vec3(0, 0, 1.0);\n        vec2 muv = (vec3(uv, 1.0) * tfm).xy + time * Flowing_Image_Combination1547651045656_420_speed;\n        texCol = vec4(vec3(texture2D(image2, muv)) * Flowing_Image_Combination1547651045656_420_color, 1.0);\n        Flowing_Image_Combination1547651045656_420_gl_FragColor = texCol;\n        return Flowing_Image_Combination1547651045656_420_gl_FragColor *= 1.0;\n    }\nvec4 Horizontal_Stripes1547651045669_423_main() \n    {\n        vec4 Horizontal_Stripes1547651045669_423_gl_FragColor = vec4(0.0);\n        float x = fract((Horizontal_Stripes1547651045669_423_vUv.y + (time * Horizontal_Stripes1547651045669_423_speed)) * Horizontal_Stripes1547651045669_423_multiplicationFactor);\n        float f = smoothstep(0.40, 0.5, x) - smoothstep(0.90, 1.0, x);\n        Horizontal_Stripes1547651045669_423_gl_FragColor = vec4(mix(Horizontal_Stripes1547651045669_423_color2, Horizontal_Stripes1547651045669_423_color1, f), 1.0);\n        return Horizontal_Stripes1547651045669_423_gl_FragColor *= 0.3;\n    }\nvec4 Vertical_2_Color_Graident1547651045681_426_main(void) \n    {\n        vec4 Vertical_2_Color_Graident1547651045681_426_gl_FragColor = vec4(0.0);\n        vec3 mixCol = mix(Vertical_2_Color_Graident1547651045681_426_color2, Vertical_2_Color_Graident1547651045681_426_color1, Vertical_2_Color_Graident1547651045681_426_vUv.y);\n        Vertical_2_Color_Graident1547651045681_426_gl_FragColor = vec4(mixCol, 1.);\n        return Vertical_2_Color_Graident1547651045681_426_gl_FragColor *= 1.0;\n    }\nvec4 Checkerboard1547651045687_429_main() \n    {\n        vec4 Checkerboard1547651045687_429_gl_FragColor = vec4(0.0);\n        vec2 t = Checkerboard1547651045687_429_vUv * Checkerboard1547651045687_429_multiplicationFactor;\n        vec3 p = vPosition * Checkerboard1547651045687_429_multiplicationFactor;\n        vec3 color;\n        if (mod(floor(t.x) + floor(t.y), 2.0) == 1.0) color = vec3(1.0, 1.0, 1.0);\n else color = vec3(0.0, 0.0, 0.0);\n        Checkerboard1547651045687_429_gl_FragColor = vec4(color, 1.0);\n        return Checkerboard1547651045687_429_gl_FragColor *= -0.5;\n    }\nvec4 Borg_Hull1547651045698_432_main() \n    {\n        vec4 Borg_Hull1547651045698_432_gl_FragColor = vec4(0.0);\n        float scale = 2.0;\n        vec2 uv = (Borg_Hull1547651045698_432_vUv.yx - 0.5) * Borg_Hull1547651045698_432_resolution;\n        uv = uv * scale + vec2(0.0, time * Borg_Hull1547651045698_432_speed);\n        vec2 cid2 = floor(uv);\n        float cid = (cid2.y * 10.0 + cid2.x) * 0.1;\n        vec2 dg = circuit(uv);\n        float d = dg.x;\n        vec3 col1 = (brightness - vec3(max(min(d, 2.0) - 1.0, 0.0) * 2.0 * 0.25)) * Borg_Hull1547651045698_432_color;\n        Borg_Hull1547651045698_432_gl_FragColor = vec4(col1, 1.0);\n        return Borg_Hull1547651045698_432_gl_FragColor *= -0.7;\n    }\nvec4 Disco_Dots1547651045724_435_main(void) \n    {\n        vec4 Disco_Dots1547651045724_435_gl_FragColor = vec4(0.0);\n        vec2 v = Disco_Dots1547651045724_435_vUv.xy * Disco_Dots1547651045724_435_resolution;\n        float brightness = fract(rand(floor(v)) + time * Disco_Dots1547651045724_435_speed);\n        brightness *= 0.5 - length(fract(v) - vec2(0.5, 0.5));\n        Disco_Dots1547651045724_435_gl_FragColor = vec4(2.0 * brightness * Disco_Dots1547651045724_435_color, 1.0);\n        return Disco_Dots1547651045724_435_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = (Flowing_Image_Combination1547651045656_420_main() + Horizontal_Stripes1547651045669_423_main() + Vertical_2_Color_Graident1547651045681_426_main() + Checkerboard1547651045687_429_main() + Borg_Hull1547651045698_432_main() + Disco_Dots1547651045724_435_main());    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec2 Flowing_Image_Combination1547651045656_420_vUv;\nvarying vec2 Horizontal_Stripes1547651045669_423_vUv;\nvarying vec2 Vertical_2_Color_Graident1547651045681_426_vUv;\nvarying vec2 Checkerboard1547651045687_429_vUv;\nvarying vec3 vPosition;\nvarying vec2 Borg_Hull1547651045698_432_vUv;\nvarying vec2 Disco_Dots1547651045724_435_vUv;\nvec4 Flowing_Image_Combination1547651045656_420_main() \n    {\n        vec4 Flowing_Image_Combination1547651045656_420_gl_Position = vec4(0.0);\n        Flowing_Image_Combination1547651045656_420_vUv = uv;\n        Flowing_Image_Combination1547651045656_420_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Flowing_Image_Combination1547651045656_420_gl_Position *= 1.0;\n    }\nvec4 Horizontal_Stripes1547651045669_423_main() \n    {\n        vec4 Horizontal_Stripes1547651045669_423_gl_Position = vec4(0.0);\n        Horizontal_Stripes1547651045669_423_vUv = uv;\n        Horizontal_Stripes1547651045669_423_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Horizontal_Stripes1547651045669_423_gl_Position *= 0.3;\n    }\nvec4 Vertical_2_Color_Graident1547651045681_426_main() \n    {\n        vec4 Vertical_2_Color_Graident1547651045681_426_gl_Position = vec4(0.0);\n        Vertical_2_Color_Graident1547651045681_426_vUv = uv;\n        Vertical_2_Color_Graident1547651045681_426_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Vertical_2_Color_Graident1547651045681_426_gl_Position *= 1.0;\n    }\nvec4 Checkerboard1547651045687_429_main() \n    {\n        vec4 Checkerboard1547651045687_429_gl_Position = vec4(0.0);\n        Checkerboard1547651045687_429_vUv = uv;\n        vPosition = position;\n        Checkerboard1547651045687_429_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Checkerboard1547651045687_429_gl_Position *= -0.5;\n    }\nvec4 Borg_Hull1547651045698_432_main() \n    {\n        vec4 Borg_Hull1547651045698_432_gl_Position = vec4(0.0);\n        Borg_Hull1547651045698_432_vUv = uv;\n        Borg_Hull1547651045698_432_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Borg_Hull1547651045698_432_gl_Position *= -0.7;\n    }\nvec4 Disco_Dots1547651045724_435_main() \n    {\n        vec4 Disco_Dots1547651045724_435_gl_Position = vec4(0.0);\n        Disco_Dots1547651045724_435_vUv = uv;\n        Disco_Dots1547651045724_435_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Disco_Dots1547651045724_435_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Flowing_Image_Combination1547651045656_420_main() + Horizontal_Stripes1547651045669_423_main() + Vertical_2_Color_Graident1547651045681_426_main() + Checkerboard1547651045687_429_main() + Borg_Hull1547651045698_432_main() + Disco_Dots1547651045724_435_main();    }\n",
        uniforms: {
            time: {
                type: "f",
                glslType: "float"
            },
            image1: {
                value: null,
                type: "t",
                glslType: "sampler2D"
            },
            image2: {
                value: null,
                type: "t",
                glslType: "sampler2D"
            },
            Flowing_Image_Combination1547651045656_420_speed: {
                value: "0.1",
                type: "f",
                glslType: "float"
            },
            Flowing_Image_Combination1547651045656_420_resolution: {
                value: "2",
                type: "f",
                glslType: "float"
            },
            Flowing_Image_Combination1547651045656_420_color: {
                value: {
                    r: 1,
                    g: 1,
                    b: 1
                },
                type: "c",
                glslType: "vec3"
            },
            Horizontal_Stripes1547651045669_423_color1: {
                value: {
                    r: 1,
                    g: 1,
                    b: 1
                },
                type: "c",
                glslType: "vec3"
            },
            Horizontal_Stripes1547651045669_423_color2: {
                value: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                type: "c",
                glslType: "vec3"
            },
            Horizontal_Stripes1547651045669_423_speed: {
                value: "0",
                type: "f",
                glslType: "float"
            },
            Horizontal_Stripes1547651045669_423_multiplicationFactor: {
                value: "6",
                type: "f",
                glslType: "float"
            },
            Vertical_2_Color_Graident1547651045681_426_color1: {
                value: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                type: "c",
                glslType: "vec3"
            },
            Vertical_2_Color_Graident1547651045681_426_color2: {
                value: {
                    r: 0,
                    g: .9764705882352941,
                    b: 0
                },
                type: "c",
                glslType: "vec3"
            },
            Checkerboard1547651045687_429_multiplicationFactor: {
                value: "12",
                type: "f",
                glslType: "float"
            },
            brightness: {
                value: "0.25",
                type: "f",
                glslType: "float"
            },
            Borg_Hull1547651045698_432_speed: {
                value: "0.001",
                type: "f",
                glslType: "float"
            },
            Borg_Hull1547651045698_432_resolution: {
                value: "1",
                type: "f",
                glslType: "float"
            },
            Borg_Hull1547651045698_432_color: {
                value: {
                    r: 1,
                    g: 1,
                    b: 1
                },
                type: "c",
                glslType: "vec3"
            },
            Disco_Dots1547651045724_435_speed: {
                value: "0.01",
                type: "f",
                glslType: "float"
            },
            Disco_Dots1547651045724_435_resolution: {
                value: {
                    x: "12",
                    y: "12",
                    z: 0
                },
                type: "v2",
                glslType: "vec2"
            },
            Disco_Dots1547651045724_435_color: {
                value: {
                    r: .5254901960784314,
                    g: .9725490196078431,
                    b: .6352941176470588
                },
                type: "c",
                glslType: "vec3"
            }
        },
        url: "http://shaderfrog.com/app/view/2894",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/sirfizx"
        }
    }
      , r = {
        id: 2987,
        name: "Cosmic Shader",
        fragment: "#define TAU 6.28318530718\n#define MAX_ITER 5\n#define tau 6.2831853\n\n#extension GL_OES_standard_derivatives : enable\n\nprecision highp float;\nprecision highp int;\nuniform vec2 Tiling_Caustic1477531952046_152_resolution;\nuniform vec3 backgroundColor;\nuniform vec3 Tiling_Caustic1477531952046_152_color;\nuniform float Tiling_Caustic1477531952046_152_speed;\nuniform float Tiling_Caustic1477531952046_152_brightness;\nuniform float time;\nuniform float contrast;\nuniform float distortion;\nuniform float Noise_Ripples1477531959288_166_speed;\nuniform vec3 Noise_Ripples1477531959288_166_color;\nuniform float Noise_Ripples1477531959288_166_brightness;\nuniform sampler2D noiseImage;\nuniform vec2 Noise_Ripples1477531959288_166_resolution;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat3 normalMatrix;\nuniform float highlightIntensity;\nuniform vec3 highlightColor;\nuniform vec3 Wiggly_Improved1477532051339_181_color;\nuniform vec3 Transparent_Glow1477532059126_201_color;\nuniform float Transparent_Glow1477532059126_201_start;\nuniform float Transparent_Glow1477532059126_201_end;\nuniform float Transparent_Glow1477532059126_201_alpha;\nuniform vec3 Glow_Effect1477532183055_216_color;\nuniform float Glow_Effect1477532183055_216_start;\nuniform float Glow_Effect1477532183055_216_end;\nuniform float Glow_Effect1477532183055_216_alpha;\nvarying vec2 Tiling_Caustic1477531952046_152_vUv;\nvarying vec2 Noise_Ripples1477531959288_166_vUv;\nmat2 makem2(in float theta) \n    {\n        float c = cos(theta);\n        float s = sin(theta);\n        return mat2(c, -s, s, c);\n    }\nfloat noise(in vec2 x) \n    {\n        return texture2D(noiseImage, x * .01).x;\n    }\nfloat fbm(in vec2 p) \n    {\n        float z = 2.;\n        float rz = 0.;\n        vec2 bp = p;\n        for (float i = 1.;\n i < 6.0; i++) \n        {\n            rz += abs((noise(p) - 0.5) * 2.0) / z;\n            z = z * 2.;\n            p = p * 2.;\n        }\n        return rz;\n    }\nfloat dualfbm(in vec2 p) \n    {\n        vec2 p2 = p * distortion;\n        vec2 basis = vec2(fbm(p2 - time * Noise_Ripples1477531959288_166_speed * 1.6), fbm(p2 + time * Noise_Ripples1477531959288_166_speed * 1.7));\n        basis = (basis - .5) * .2;\n        p += basis;\n        return fbm(p * makem2(time * Noise_Ripples1477531959288_166_speed * 0.2));\n    }\nvarying vec3 Wiggly_Improved1477532051339_181_vNormal;\nvarying float light;\nvarying vec3 Transparent_Glow1477532059126_201_fPosition;\nvarying vec3 Transparent_Glow1477532059126_201_fNormal;\nvarying vec3 Glow_Effect1477532183055_216_fPosition;\nvarying vec3 Glow_Effect1477532183055_216_fNormal;\nvec4 Tiling_Caustic1477531952046_152_main() \n    {\n        vec4 Tiling_Caustic1477531952046_152_gl_FragColor = vec4(0.0);\n        vec2 uv = Tiling_Caustic1477531952046_152_vUv * Tiling_Caustic1477531952046_152_resolution;\n        vec2 p = mod(uv * TAU, TAU) - 250.0;\n        vec2 i = vec2(p);\n        float c = 1.0;\n        float inten = 0.005;\n        for (int n = 0;\n n < MAX_ITER; n++) \n        {\n            float t = time * Tiling_Caustic1477531952046_152_speed * (1.0 - (3.5 / float(n + 1)));\n            i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));\n            c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));\n        }\n        c /= float(MAX_ITER);\n        c = 1.17 - pow(c, Tiling_Caustic1477531952046_152_brightness);\n        vec3 rgb = vec3(pow(abs(c), 8.0));\n        Tiling_Caustic1477531952046_152_gl_FragColor = vec4(rgb * Tiling_Caustic1477531952046_152_color + backgroundColor, 1.0);\n        return Tiling_Caustic1477531952046_152_gl_FragColor *= 1.0;\n    }\nvec4 Noise_Ripples1477531959288_166_main() \n    {\n        vec4 Noise_Ripples1477531959288_166_gl_FragColor = vec4(0.0);\n        vec2 p = (Noise_Ripples1477531959288_166_vUv.xy - 0.5) * Noise_Ripples1477531959288_166_resolution;\n        float rz = dualfbm(p);\n        vec3 col = (Noise_Ripples1477531959288_166_color / rz) * Noise_Ripples1477531959288_166_brightness;\n        col = ((col - 0.5) * max(contrast, 0.0)) + 0.5;\n        Noise_Ripples1477531959288_166_gl_FragColor = vec4(col, 1.0);\n        return Noise_Ripples1477531959288_166_gl_FragColor *= 1.0;\n    }\nvec4 Wiggly_Improved1477532051339_181_main() \n    {\n        vec4 Wiggly_Improved1477532051339_181_gl_FragColor = vec4(0.0);\n        Wiggly_Improved1477532051339_181_gl_FragColor = vec4(clamp(highlightColor * highlightIntensity * light, 0.0, 1.0), 1.0);\n        return Wiggly_Improved1477532051339_181_gl_FragColor *= 1.0;\n    }\nvec4 Transparent_Glow1477532059126_201_main() \n    {\n        vec4 Transparent_Glow1477532059126_201_gl_FragColor = vec4(0.0);\n        vec3 normal = normalize(Transparent_Glow1477532059126_201_fNormal);\n        vec3 eye = normalize(-Transparent_Glow1477532059126_201_fPosition.xyz);\n        float rim = smoothstep(Transparent_Glow1477532059126_201_start, Transparent_Glow1477532059126_201_end, 1.0 - dot(normal, eye));\n        float value = clamp(rim * Transparent_Glow1477532059126_201_alpha, 0.0, 1.0);\n        Transparent_Glow1477532059126_201_gl_FragColor = vec4(Transparent_Glow1477532059126_201_color * value, value);\n        return Transparent_Glow1477532059126_201_gl_FragColor *= 1.0;\n    }\nvec4 Glow_Effect1477532183055_216_main() \n    {\n        vec4 Glow_Effect1477532183055_216_gl_FragColor = vec4(0.0);\n        vec3 normal = normalize(Glow_Effect1477532183055_216_fNormal);\n        vec3 eye = normalize(-Glow_Effect1477532183055_216_fPosition.xyz);\n        float rim = smoothstep(Glow_Effect1477532183055_216_start, Glow_Effect1477532183055_216_end, 1.0 - dot(normal, eye));\n        Glow_Effect1477532183055_216_gl_FragColor = vec4(clamp(rim, 0.0, 1.0) * Glow_Effect1477532183055_216_alpha * Glow_Effect1477532183055_216_color, 1.0);\n        return Glow_Effect1477532183055_216_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = (Glow_Effect1477532183055_216_main() + Noise_Ripples1477531959288_166_main() + Tiling_Caustic1477531952046_152_main() + Wiggly_Improved1477532051339_181_main());    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform float time;\nuniform float Wiggly_Improved1477532051339_181_speed;\nuniform float frequency;\nuniform float amplitude;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec3 Tiling_Caustic1477531952046_152_vPosition;\nvarying vec3 Tiling_Caustic1477531952046_152_vNormal;\nvarying vec2 Tiling_Caustic1477531952046_152_vUv;\nvarying vec2 Tiling_Caustic1477531952046_152_vUv2;\nvarying vec3 Noise_Ripples1477531959288_166_vPosition;\nvarying vec3 Noise_Ripples1477531959288_166_vNormal;\nvarying vec2 Noise_Ripples1477531959288_166_vUv;\nvarying vec2 Noise_Ripples1477531959288_166_vUv2;\nvarying vec3 Wiggly_Improved1477532051339_181_vNormal;\nvarying float light;\nvarying vec3 Wiggly_Improved1477532051339_181_vPosition;\nvarying vec3 Transparent_Glow1477532059126_201_fNormal;\nvarying vec3 Transparent_Glow1477532059126_201_fPosition;\nvarying vec3 Glow_Effect1477532183055_216_fNormal;\nvarying vec3 Glow_Effect1477532183055_216_fPosition;\nvec4 Tiling_Caustic1477531952046_152_main() \n    {\n        vec4 Tiling_Caustic1477531952046_152_gl_Position = vec4(0.0);\n        Tiling_Caustic1477531952046_152_vNormal = normal;\n        Tiling_Caustic1477531952046_152_vUv = uv;\n        Tiling_Caustic1477531952046_152_vUv2 = uv2;\n        Tiling_Caustic1477531952046_152_vPosition = position;\n        Tiling_Caustic1477531952046_152_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Tiling_Caustic1477531952046_152_gl_Position *= 1.0;\n    }\nvec4 Noise_Ripples1477531959288_166_main() \n    {\n        vec4 Noise_Ripples1477531959288_166_gl_Position = vec4(0.0);\n        Noise_Ripples1477531959288_166_vNormal = normal;\n        Noise_Ripples1477531959288_166_vUv = uv;\n        Noise_Ripples1477531959288_166_vUv2 = uv2;\n        Noise_Ripples1477531959288_166_vPosition = position;\n        Noise_Ripples1477531959288_166_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Noise_Ripples1477531959288_166_gl_Position *= 1.0;\n    }\nvec4 Wiggly_Improved1477532051339_181_main() \n    {\n        vec4 Wiggly_Improved1477532051339_181_gl_Position = vec4(0.0);\n        vec3 offset = normalize(vec3(0.0) - position) * (amplitude * sin(Wiggly_Improved1477532051339_181_speed * time + position.y * frequency));\n        vec3 newPosition = position + vec3(offset.x, 0.0, offset.z);\n        light = amplitude * sin(Wiggly_Improved1477532051339_181_speed * time + 1.0 + position.y * frequency);\n        Wiggly_Improved1477532051339_181_vPosition = newPosition;\n        Wiggly_Improved1477532051339_181_gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);\n        return Wiggly_Improved1477532051339_181_gl_Position *= 1.0;\n    }\nvec4 Transparent_Glow1477532059126_201_main() \n    {\n        vec4 Transparent_Glow1477532059126_201_gl_Position = vec4(0.0);\n        Transparent_Glow1477532059126_201_fNormal = normalize(normalMatrix * normal);\n        vec4 pos = modelViewMatrix * vec4(position, 1.0);\n        Transparent_Glow1477532059126_201_fPosition = pos.xyz;\n        Transparent_Glow1477532059126_201_gl_Position = projectionMatrix * pos;\n        return Transparent_Glow1477532059126_201_gl_Position *= 1.0;\n    }\nvec4 Glow_Effect1477532183055_216_main() \n    {\n        vec4 Glow_Effect1477532183055_216_gl_Position = vec4(0.0);\n        Glow_Effect1477532183055_216_fNormal = normalize(normalMatrix * normal);\n        vec4 pos = modelViewMatrix * vec4(position, 1.0);\n        Glow_Effect1477532183055_216_fPosition = pos.xyz;\n        Glow_Effect1477532183055_216_gl_Position = projectionMatrix * pos;\n        return Glow_Effect1477532183055_216_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Tiling_Caustic1477531952046_152_main() + Noise_Ripples1477531959288_166_main() + Wiggly_Improved1477532051339_181_main() + Transparent_Glow1477532059126_201_main() + Glow_Effect1477532183055_216_main();    }\n",
        uniforms: {
            cameraPosition: {
                type: "v3",
                glslType: "vec3"
            },
            time: {
                type: "f",
                glslType: "float"
            },
            backgroundColor: {
                value: {
                    r: .08235294117647059,
                    g: .06274509803921569,
                    b: .19607843137254902
                },
                type: "c",
                glslType: "vec3"
            },
            Tiling_Caustic1477531952046_152_resolution: {
                value: {
                    x: 1,
                    y: 1
                },
                type: "v2",
                glslType: "vec2"
            },
            Tiling_Caustic1477531952046_152_color: {
                value: {
                    r: .4666666666666667,
                    g: .9294117647058824,
                    b: .9529411764705882
                },
                type: "c",
                glslType: "vec3"
            },
            Tiling_Caustic1477531952046_152_speed: {
                value: "0.5",
                type: "f",
                glslType: "float"
            },
            Tiling_Caustic1477531952046_152_brightness: {
                value: "1.5",
                type: "f",
                glslType: "float"
            },
            noiseImage: {
                value: null,
                type: "t",
                glslType: "sampler2D"
            },
            distortion: {
                value: "1",
                type: "f",
                glslType: "float"
            },
            contrast: {
                value: "1.4",
                type: "f",
                glslType: "float"
            },
            Noise_Ripples1477531959288_166_speed: {
                value: "0.1",
                type: "f",
                glslType: "float"
            },
            Noise_Ripples1477531959288_166_color: {
                value: {
                    r: .6823529411764706,
                    g: .7725490196078432,
                    b: .6666666666666666
                },
                type: "c",
                glslType: "vec3"
            },
            Noise_Ripples1477531959288_166_brightness: {
                value: "0.1",
                type: "f",
                glslType: "float"
            },
            Noise_Ripples1477531959288_166_resolution: {
                value: {
                    x: "2",
                    y: "2"
                },
                type: "v2",
                glslType: "vec2"
            },
            amplitude: {
                value: "0.2",
                type: "f",
                glslType: "float"
            },
            frequency: {
                value: "2",
                type: "f",
                glslType: "float"
            },
            highlightIntensity: {
                value: ".5",
                type: "f",
                glslType: "float"
            },
            highlightColor: {
                value: {
                    r: .8274509803921568,
                    g: .5882352941176471,
                    b: .2627450980392157
                },
                type: "c",
                glslType: "vec3"
            },
            Wiggly_Improved1477532051339_181_color: {
                value: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                type: "c",
                glslType: "vec3"
            },
            Wiggly_Improved1477532051339_181_speed: {
                value: "1",
                type: "f",
                glslType: "float"
            },
            Transparent_Glow1477532059126_201_color: {
                value: {
                    r: .9803921568627451,
                    g: .9215686274509803,
                    b: .596078431372549
                },
                type: "c",
                glslType: "vec3"
            },
            Transparent_Glow1477532059126_201_start: {
                value: "0.54674743",
                type: "f",
                glslType: "float"
            },
            Transparent_Glow1477532059126_201_end: {
                value: "0.44399246",
                type: "f",
                glslType: "float"
            },
            Transparent_Glow1477532059126_201_alpha: {
                value: "0.5",
                type: "f",
                glslType: "float"
            },
            Glow_Effect1477532183055_216_color: {
                value: {
                    r: .9921568627450981,
                    g: .7254901960784313,
                    b: .3411764705882353
                },
                type: "c",
                glslType: "vec3"
            },
            Glow_Effect1477532183055_216_start: {
                value: "0",
                type: "f",
                glslType: "float"
            },
            Glow_Effect1477532183055_216_end: {
                value: "1.9",
                type: "f",
                glslType: "float"
            },
            Glow_Effect1477532183055_216_alpha: {
                value: "2",
                type: "f",
                glslType: "float"
            }
        },
        url: "http://shaderfrog.com/app/view/2987",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , s = {
        id: 138,
        name: "Cool Tiles Shader",
        fragment: "precision highp float;\nprecision highp int;\nuniform float time;\nuniform float Flowing_Image_Combination1532324436254_38_speed;\nuniform float resolution;\nuniform sampler2D image1;\nuniform sampler2D image2;\nuniform vec3 Flowing_Image_Combination1532324436254_38_color;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform vec3 lightPosition;\nuniform sampler2D map;\nuniform vec3 diffuseColor;\nuniform vec3 specularColor;\nuniform float shininess;\nuniform vec2 scaleBias;\nuniform float scale;\nuniform float Disco_Ball1532324436329_44_speed;\nuniform vec3 Vignette1532324436351_47_color;\nuniform float intensity;\nuniform float spread;\nuniform float mirrorReflection;\nuniform samplerCube reflectionSampler;\nvarying vec2 Flowing_Image_Combination1532324436254_38_vUv;\nvarying vec3 vPosition;\nvarying vec3 Parallax_Mapping1532324436298_41_vNormal;\nvarying vec2 Parallax_Mapping1532324436298_41_vUv;\nvarying vec2 vUv2;\nvarying vec3 tsPosition;\nvarying vec3 tsCameraPosition;\nvarying vec3 tsLightSource;\nvarying vec3 Disco_Ball1532324436329_44_vNormal;\nvarying vec2 Disco_Ball1532324436329_44_vUv;\nfloat rand(in vec2 p) \n    {\n        return abs(fract(sin(p.x * 95325.328 + p.y * -48674.077) + cos(p.x * -46738.322 + p.y * 76485.077) + time * Disco_Ball1532324436329_44_speed) - .5) + .5;\n    }\nvarying vec2 Vignette1532324436351_47_vUv;\nvarying vec3 vReflect;\nvec4 Flowing_Image_Combination1532324436254_38_main() \n    {\n        vec4 Flowing_Image_Combination1532324436254_38_gl_FragColor = vec4(0.0);\n        vec2 uv = Flowing_Image_Combination1532324436254_38_vUv.xy * resolution;\n        vec4 texCol = vec4(texture2D(image1, uv));\n        mat3 tfm;\n        tfm[0] = vec3(texCol.z, 0.0, 0);\n        tfm[1] = vec3(0.0, texCol.y, 0);\n        tfm[2] = vec3(0, 0, 1.0);\n        vec2 muv = (vec3(uv, 1.0) * tfm).xy + time * Flowing_Image_Combination1532324436254_38_speed;\n        texCol = vec4(vec3(texture2D(image2, muv)) * Flowing_Image_Combination1532324436254_38_color, 1.0);\n        Flowing_Image_Combination1532324436254_38_gl_FragColor = texCol;\n        return Flowing_Image_Combination1532324436254_38_gl_FragColor *= 0.6;\n    }\nvec4 Parallax_Mapping1532324436298_41_main() \n    {\n        vec4 Parallax_Mapping1532324436298_41_gl_FragColor = vec4(0.0);\n        float height = texture2D(map, Parallax_Mapping1532324436298_41_vUv).a;\n        float v = height * scaleBias.r - scaleBias.g;\n        vec3 eye = normalize(tsCameraPosition);\n        vec2 newCoords = Parallax_Mapping1532324436298_41_vUv + (eye.xy * v);\n        vec3 color = vec3(0.0);\n        vec3 normal = texture2D(map, newCoords).rgb * 2.0 - 1.0;\n        vec3 viewVector = normalize(tsCameraPosition - tsPosition);\n        vec3 lightVector = normalize(tsLightSource - tsPosition);\n        float nxDir = max(0.0, dot(normal, lightVector));\n        float specularPower = 0.0;\n        if (nxDir != 0.0) \n        {\n            vec3 halfVector = normalize(lightVector + viewVector);\n            float nxHalf = max(0.0, dot(normal, halfVector));\n            specularPower = pow(nxHalf, shininess);\n        }\n         vec3 specular = specularColor * specularPower;\n        Parallax_Mapping1532324436298_41_gl_FragColor = vec4((diffuseColor * nxDir) + specular, 1.0);\n        return Parallax_Mapping1532324436298_41_gl_FragColor *= 0.9;\n    }\nvec4 Disco_Ball1532324436329_44_main(void) \n    {\n        vec4 Disco_Ball1532324436329_44_gl_FragColor = vec4(0.0);\n        vec2 position = (Disco_Ball1532324436329_44_vUv.xy) * scale;\n        vec3 color = vec3(rand(vec2(floor(position.x), floor(position.y))), rand(vec2(floor(position.x), floor(position.x))), rand(vec2(floor(position.x * .5), floor(position.y * .5))));\n        float scale = 1. - pow(pow((mod(position.x, 1.) - .5), 2.) + pow((mod(position.y, 1.) - .5), 2.), .7);\n        Disco_Ball1532324436329_44_gl_FragColor = vec4(color * scale, 1.);\n        return Disco_Ball1532324436329_44_gl_FragColor *= 0.1;\n    }\nvec4 Vignette1532324436351_47_main() \n    {\n        vec4 Vignette1532324436351_47_gl_FragColor = vec4(0.0);\n        float vignette = Vignette1532324436351_47_vUv.y * Vignette1532324436351_47_vUv.x * (1. - Vignette1532324436351_47_vUv.x) * (1. - Vignette1532324436351_47_vUv.y) * spread;\n        vec3 multiplier = 1.0 - (vignette * Vignette1532324436351_47_color * intensity);\n        Vignette1532324436351_47_gl_FragColor = vec4(clamp(Vignette1532324436351_47_color * multiplier, 0.0, 1.0), multiplier);\n        return Vignette1532324436351_47_gl_FragColor *= 0.2;\n    }\nvec4 Reflection_Cube_Map1532324436362_50_main() \n    {\n        vec4 Reflection_Cube_Map1532324436362_50_gl_FragColor = vec4(0.0);\n        vec4 cubeColor = textureCube(reflectionSampler, vec3(mirrorReflection * vReflect.x, vReflect.yz));\n        cubeColor.w = 1.0;\n        Reflection_Cube_Map1532324436362_50_gl_FragColor = cubeColor;\n        return Reflection_Cube_Map1532324436362_50_gl_FragColor *= 0.3;\n    }\nvoid main() \n    {\n        gl_FragColor = (Flowing_Image_Combination1532324436254_38_main() + Parallax_Mapping1532324436298_41_main() + Disco_Ball1532324436329_44_main() + Vignette1532324436351_47_main() + Reflection_Cube_Map1532324436362_50_main());    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 lightPosition;\nuniform vec3 cameraPosition;\nuniform float time;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec2 Flowing_Image_Combination1532324436254_38_vUv;\nattribute vec4 tangent;\nvarying vec3 vPosition;\nvarying vec3 Parallax_Mapping1532324436298_41_vNormal;\nvarying vec2 Parallax_Mapping1532324436298_41_vUv;\nvarying vec2 vUv2;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 tsPosition;\nvarying vec3 tsCameraPosition;\nvarying vec3 tsLightSource;\nvarying vec2 Disco_Ball1532324436329_44_vUv;\nvarying vec3 Disco_Ball1532324436329_44_vNormal;\nvarying vec2 Vignette1532324436351_47_vUv;\nvarying vec3 vReflect;\nvec4 Flowing_Image_Combination1532324436254_38_main() \n    {\n        vec4 Flowing_Image_Combination1532324436254_38_gl_Position = vec4(0.0);\n        Flowing_Image_Combination1532324436254_38_vUv = uv;\n        Flowing_Image_Combination1532324436254_38_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Flowing_Image_Combination1532324436254_38_gl_Position *= 0.6;\n    }\nvec4 Parallax_Mapping1532324436298_41_main(void) \n    {\n        vec4 Parallax_Mapping1532324436298_41_gl_Position = vec4(0.0);\n        Parallax_Mapping1532324436298_41_vUv = uv;\n        vPosition = position;\n        Parallax_Mapping1532324436298_41_vNormal = normalize(normal);\n        vTangent = normalize(tangent.xyz);\n        vBinormal = normalize(cross(Parallax_Mapping1532324436298_41_vNormal, vTangent) * tangent.w);\n        mat3 TBNMatrix = mat3(vTangent, vBinormal, Parallax_Mapping1532324436298_41_vNormal);\n        tsPosition = position * TBNMatrix;\n        tsCameraPosition = cameraPosition * TBNMatrix;\n        tsLightSource = lightPosition * TBNMatrix;\n        Parallax_Mapping1532324436298_41_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Parallax_Mapping1532324436298_41_gl_Position *= 0.9;\n    }\nvec4 Disco_Ball1532324436329_44_main() \n    {\n        vec4 Disco_Ball1532324436329_44_gl_Position = vec4(0.0);\n        Disco_Ball1532324436329_44_vNormal = normal;\n        Disco_Ball1532324436329_44_vUv = uv;\n        Disco_Ball1532324436329_44_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Disco_Ball1532324436329_44_gl_Position *= 0.1;\n    }\nvec4 Vignette1532324436351_47_main() \n    {\n        vec4 Vignette1532324436351_47_gl_Position = vec4(0.0);\n        Vignette1532324436351_47_vUv = uv;\n        Vignette1532324436351_47_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Vignette1532324436351_47_gl_Position *= 0.2;\n    }\nvec4 Reflection_Cube_Map1532324436362_50_main() \n    {\n        vec4 Reflection_Cube_Map1532324436362_50_gl_Position = vec4(0.0);\n        vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;\n        vec3 cameraToVertex = normalize(worldPosition - cameraPosition);\n        vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);\n        vReflect = reflect(cameraToVertex, worldNormal);\n        Reflection_Cube_Map1532324436362_50_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Reflection_Cube_Map1532324436362_50_gl_Position *= 0.3;\n    }\nvoid main() \n    {\n        gl_Position = Flowing_Image_Combination1532324436254_38_main() + Parallax_Mapping1532324436298_41_main() + Disco_Ball1532324436329_44_main() + Vignette1532324436351_47_main() + Reflection_Cube_Map1532324436362_50_main();    }\n",
        uniforms: {
            resolution: {
                value: "1",
                type: "f",
                glslType: "float"
            },
            image1: {
                value: null,
                type: "t",
                glslType: "sampler2D"
            },
            image2: {
                value: null,
                type: "t",
                glslType: "sampler2D"
            },
            time: {
                type: "f",
                glslType: "float"
            },
            Flowing_Image_Combination1532324436254_38_speed: {
                value: "0.05",
                type: "f",
                glslType: "float"
            },
            Flowing_Image_Combination1532324436254_38_color: {
                value: {
                    r: 1,
                    g: "1",
                    b: "1"
                },
                type: "c",
                glslType: "vec3"
            },
            map: {
                value: null,
                type: "t",
                glslType: "sampler2D"
            },
            diffuseColor: {
                value: {
                    r: .2235294117647059,
                    g: .2235294117647059,
                    b: .2235294117647059
                },
                type: "c",
                glslType: "vec3"
            },
            specularColor: {
                value: {
                    r: 1,
                    g: 1,
                    b: 1
                },
                type: "c",
                glslType: "vec3"
            },
            shininess: {
                value: "10",
                type: "f",
                glslType: "float"
            },
            scaleBias: {
                value: {
                    x: "0.04",
                    y: "0.001",
                    z: 0
                },
                type: "v2",
                glslType: "vec2"
            },
            Parallax_Mapping1532324436298_41_lightPosition: {
                value: {
                    x: -.04058137118438604,
                    y: .3281411389717793,
                    z: 2.4780388506290807
                },
                type: "v3",
                glslType: "vec3"
            },
            scale: {
                value: "4",
                type: "f",
                glslType: "float"
            },
            Disco_Ball1532324436329_44_speed: {
                value: "1",
                type: "f",
                glslType: "float"
            },
            intensity: {
                value: "0.5",
                type: "f",
                glslType: "float"
            },
            spread: {
                value: "100",
                type: "f",
                glslType: "float"
            },
            Vignette1532324436351_47_color: {
                value: {
                    r: .8980392156862745,
                    g: .9607843137254902,
                    b: .9921568627450981
                },
                type: "c",
                glslType: "vec3"
            },
            mirrorReflection: {
                value: "1",
                type: "f",
                glslType: "float"
            },
            reflectionSampler: {
                value: null,
                type: "t",
                glslType: "samplerCube"
            }
        },
        url: "http://shaderfrog.com/app/view/138",
        user: {
            username: "andrewray",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , l = {
        id: 3033,
        name: "Disco Shader",
        fragment: "precision highp float;\nprecision highp int;\nuniform float time;\nuniform float scale;\nuniform float speed;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nfloat rand(in vec2 p) \n    {\n        return abs(fract(sin(p.x * 95325.328 + p.y * -48674.077) + cos(p.x * -46738.322 + p.y * 76485.077) + time * speed) - .5) + .5;\n    }\nvec4 Disco_Ball1551665981578_213_main(void) \n    {\n        vec4 Disco_Ball1551665981578_213_gl_FragColor = vec4(0.0);\n        vec2 position = (vUv.xy) * scale;\n        vec3 color = vec3(rand(vec2(floor(position.x), floor(position.y))), rand(vec2(floor(position.x), floor(position.x))), rand(vec2(floor(position.x * .5), floor(position.y * .5))));\n        float scale = 1. - pow(pow((mod(position.x, 1.) - .5), 2.) + pow((mod(position.y, 1.) - .5), 2.), .7);\n        Disco_Ball1551665981578_213_gl_FragColor = vec4(color * scale, 1.);\n        return Disco_Ball1551665981578_213_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = Disco_Ball1551665981578_213_main();    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvec4 Disco_Ball1551665981578_213_main() \n    {\n        vec4 Disco_Ball1551665981578_213_gl_Position = vec4(0.0);\n        vNormal = normal;\n        vUv = uv;\n        Disco_Ball1551665981578_213_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Disco_Ball1551665981578_213_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Disco_Ball1551665981578_213_main();    }\n",
        uniforms: {
            time: {
                type: "f",
                glslType: "float"
            },
            scale: {
                value: "30",
                type: "f",
                glslType: "float"
            },
            speed: {
                value: "1",
                type: "f",
                glslType: "float"
            }
        },
        url: "http://shaderfrog.com/app/view/3033",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , c = {
        id: 3053,
        name: "Marching Ants Shader",
        fragment: "precision highp float;\nprecision highp int;\nuniform float edgeWidth;\nuniform float sharpness;\nuniform float antSize;\nuniform float antSpeed;\nuniform float time;\nuniform vec3 color;\nvarying vec2 vUv;\nvec4 Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_main() \n    {\n        vec4 Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_gl_FragColor = vec4(0.0);\n        vec2 borderUv = abs((vUv - 0.5) * 2.0);\n        float leftRight = clamp((borderUv.x - (1.0 - edgeWidth)) * sharpness, 0.0, 1.0);\n        float upDown = clamp((borderUv.y - (1.0 - edgeWidth)) * sharpness, 0.0, 1.0);\n        vec2 antUv = vUv * antSize;\n        float antOffset = time * antSpeed;\n        if (mod(floor(antUv.x + antOffset), 2.0) != 1.0) \n        {\n            upDown = 0.0;\n        }\n         if (mod(floor(antUv.y + antOffset), 2.0) != 1.0) \n        {\n            leftRight = 0.0;\n        }\n         float alpha = clamp(leftRight + upDown, 0.0, 1.0);\n        Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_gl_FragColor = vec4(color * alpha, alpha);\n        return Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_main();    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec2 vUv;\nvec4 Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_main() \n    {\n        vec4 Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_gl_Position = vec4(0.0);\n        vUv = uv;\n        Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Marching_Ants_UV_Based_Border_Edge_Outline1551694606526_1465_main();    }\n",
        uniforms: {
            color: {
                value: {
                    r: "1",
                    g: "1",
                    b: "1"
                },
                type: "c",
                glslType: "vec3"
            },
            edgeWidth: {
                value: "0.1",
                type: "f",
                glslType: "float"
            },
            sharpness: {
                value: "100",
                type: "f",
                glslType: "float"
            },
            antSize: {
                value: "10",
                type: "f",
                glslType: "float"
            },
            antSpeed: {
                value: "1",
                type: "f",
                glslType: "float"
            },
            time: {
                type: "f",
                glslType: "float"
            }
        },
        url: "http://shaderfrog.com/app/view/3053",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , u = {
        id: 3060,
        name: "Goo Shader",
        fragment: "precision highp float;\nprecision highp int;\nuniform vec3 color;\nuniform float time;\nuniform float Configurable_Oil_Spill1525321525720_28_speed;\nuniform vec3 color1;\nuniform vec3 color2;\nuniform vec3 color3;\nuniform vec3 color4;\nvarying float vNoise;\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nfloat rand(vec2 n) \n    {\n        return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);\n    }\nfloat noise(vec2 n) \n    {\n        const vec2 d = vec2(0.0, 1.0);\n        vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));\n        return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);\n    }\nfloat fbm(vec2 n) \n    {\n        float total = 0.0, amplitude = 1.0;\n        for (int i = 0;\n i < 7; i++) \n        {\n            total += noise(n) * amplitude;\n            n += n;\n            amplitude *= 0.5;\n        }\n        return total;\n    }\nvec4 Big_Wiggles1525321525655_25_main() \n    {\n        vec4 Big_Wiggles1525321525655_25_gl_FragColor = vec4(0.0);\n        Big_Wiggles1525321525655_25_gl_FragColor = vec4(color * vNoise, 1.0);\n        return Big_Wiggles1525321525655_25_gl_FragColor *= 1.0;\n    }\nvec4 Configurable_Oil_Spill1525321525720_28_main() \n    {\n        vec4 Configurable_Oil_Spill1525321525720_28_gl_FragColor = vec4(0.0);\n        const vec3 c5 = vec3(0.1);\n        const vec3 c6 = vec3(0.9);\n        vec2 p = vUv.xy * 8.0;\n        float timed = time * Configurable_Oil_Spill1525321525720_28_speed;\n        float q = fbm(p - timed * 0.1);\n        vec2 r = vec2(fbm(p + q + timed * 0.7 - p.x - p.y), fbm(p + q - timed * 0.4));\n        vec3 c = mix(color1, color2, fbm(p + r)) + mix(color3, color4, r.x) - mix(c5, c6, r.y);\n        Configurable_Oil_Spill1525321525720_28_gl_FragColor = vec4(c * cos(1.57 * vUv.y), 1.0);\n        return Configurable_Oil_Spill1525321525720_28_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = (Big_Wiggles1525321525655_25_main() + Configurable_Oil_Spill1525321525720_28_main());    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform float scale;\nuniform float displacement;\nuniform float time;\nuniform float Big_Wiggles1525321525655_25_speed;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying float vNoise;\nvec3 mod289(vec3 x) \n    {\n        return x - floor(x * (1.0 / 289.0)) * 289.0;\n    }\nvec4 mod289(vec4 x) \n    {\n        return x - floor(x * (1.0 / 289.0)) * 289.0;\n    }\nvec4 permute(vec4 x) \n    {\n        return mod289(((x * 34.0) + 1.0) * x);\n    }\nvec4 taylorInvSqrt(vec4 r) \n    {\n        return 1.79284291400159 - 0.85373472095314 * r;\n    }\nvec3 fade(vec3 t) \n    {\n        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n    }\nfloat cnoise(vec3 P) \n    {\n        vec3 Pi0 = floor(P);\n        vec3 Pi1 = Pi0 + vec3(1.0);\n        Pi0 = mod289(Pi0);\n        Pi1 = mod289(Pi1);\n        vec3 Pf0 = fract(P);\n        vec3 Pf1 = Pf0 - vec3(1.0);\n        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n        vec4 iy = vec4(Pi0.yy, Pi1.yy);\n        vec4 iz0 = Pi0.zzzz;\n        vec4 iz1 = Pi1.zzzz;\n        vec4 ixy = permute(permute(ix) + iy);\n        vec4 ixy0 = permute(ixy + iz0);\n        vec4 ixy1 = permute(ixy + iz1);\n        vec4 gx0 = ixy0 * (1.0 / 7.0);\n        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n        gx0 = fract(gx0);\n        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n        vec4 sz0 = step(gz0, vec4(0.0));\n        gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n        gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n        vec4 gx1 = ixy1 * (1.0 / 7.0);\n        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n        gx1 = fract(gx1);\n        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n        vec4 sz1 = step(gz1, vec4(0.0));\n        gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n        gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n        vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n        vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n        vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n        vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n        vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n        vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n        vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n        vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n        g000 *= norm0.x;\n        g010 *= norm0.y;\n        g100 *= norm0.z;\n        g110 *= norm0.w;\n        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n        g001 *= norm1.x;\n        g011 *= norm1.y;\n        g101 *= norm1.z;\n        g111 *= norm1.w;\n        float n000 = dot(g000, Pf0);\n        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n        float n111 = dot(g111, Pf1);\n        vec3 fade_xyz = fade(Pf0);\n        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n        return 2.2 * n_xyz;\n    }\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvec4 Big_Wiggles1525321525655_25_main() \n    {\n        vec4 Big_Wiggles1525321525655_25_gl_Position = vec4(0.0);\n        vNoise = cnoise(normalize(position) * scale + (time * Big_Wiggles1525321525655_25_speed));\n        vec3 pos = position + normal * vNoise * vec3(displacement);\n        Big_Wiggles1525321525655_25_gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n        return Big_Wiggles1525321525655_25_gl_Position *= 1.0;\n    }\nvec4 Configurable_Oil_Spill1525321525720_28_main() \n    {\n        vec4 Configurable_Oil_Spill1525321525720_28_gl_Position = vec4(0.0);\n        vUv = uv;\n        vPosition = position;\n        vNormal = normal;\n        Configurable_Oil_Spill1525321525720_28_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Configurable_Oil_Spill1525321525720_28_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Big_Wiggles1525321525655_25_main() + Configurable_Oil_Spill1525321525720_28_main();    }\n",
        uniforms: {
            scale: {
                value: ".8",
                type: "f",
                glslType: "float"
            },
            displacement: {
                value: ".5",
                type: "f",
                glslType: "float"
            },
            time: {
                type: "f",
                glslType: "float"
            },
            Big_Wiggles1525321525655_25_speed: {
                value: ".3",
                type: "f",
                glslType: "float"
            },
            color: {
                value: {
                    r: ".3",
                    g: 0,
                    b: 0
                },
                type: "c",
                glslType: "vec3"
            },
            color1: {
                value: {
                    r: ".4",
                    g: ".1",
                    b: ".2"
                },
                type: "c",
                glslType: "vec3"
            },
            color2: {
                value: {
                    r: ".5",
                    g: "1",
                    b: ".5"
                },
                type: "c",
                glslType: "vec3"
            },
            color3: {
                value: {
                    r: ".2",
                    g: ".9",
                    b: 0
                },
                type: "c",
                glslType: "vec3"
            },
            color4: {
                value: {
                    r: "1.1",
                    g: "1.1",
                    b: "2"
                },
                type: "c",
                glslType: "vec3"
            },
            Configurable_Oil_Spill1525321525720_28_speed: {
                value: ".4",
                type: "f",
                glslType: "float"
            }
        },
        url: "http://shaderfrog.com/app/view/3060",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , v = {
        id: 3055,
        name: "Psycho Shader",
        fragment: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform float time;\nuniform vec2 Randomise_Fractal;\nuniform float NUM_SIDES;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec2 vUv2;\nconst float PI = 3.14159265359;\nfloat KA = PI / NUM_SIDES;\nvoid koleidoscope(inout vec2 uv) \n    {\n        float angle = atan(uv.y, uv.x);\n        angle = mod(angle, 2.0 * KA);\n        angle = abs(angle - KA);\n        angle += 0.1 * time;\n        float d = length(uv);\n        uv = d * vec2(cos(angle), sin(angle));\n    }\nvoid smallKoleidoscope(inout vec2 uv) \n    {\n        float angle = abs(mod(atan(uv.y, uv.x), 2.0 * KA) - KA) + 0.1 * time;\n        uv = length(uv) * vec2(cos(angle), sin(angle));\n    }\nvec4 Kaleidoscope_Fractal_Shader1551694817060_1634_main() \n    {\n        vec4 Kaleidoscope_Fractal_Shader1551694817060_1634_gl_FragColor = vec4(0.0);\n        vec2 uv = 12.0 * (2.0 * vUv.xy - 1.0);\n        smallKoleidoscope(uv);\n        vec3 p = vec3(uv, Randomise_Fractal.x);\n        for (int i = 0;\n i < 44; i++) p.xzy = vec3(1.3, 0.999, 0.678) * abs((abs(p) / dot(p, p) - vec3(1.0, 1.02, Randomise_Fractal.y * 0.4)));\n        Kaleidoscope_Fractal_Shader1551694817060_1634_gl_FragColor = vec4(p, 1.0);\n        return Kaleidoscope_Fractal_Shader1551694817060_1634_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = Kaleidoscope_Fractal_Shader1551694817060_1634_main();    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform float time;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec2 vUv2;\nvec4 Kaleidoscope_Fractal_Shader1551694817060_1634_main() \n    {\n        vec4 Kaleidoscope_Fractal_Shader1551694817060_1634_gl_Position = vec4(0.0);\n        vNormal = normal;\n        vUv = uv;\n        vUv2 = uv2;\n        vPosition = position;\n        Kaleidoscope_Fractal_Shader1551694817060_1634_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Kaleidoscope_Fractal_Shader1551694817060_1634_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Kaleidoscope_Fractal_Shader1551694817060_1634_main();    }\n",
        uniforms: {
            cameraPosition: {
                type: "v3",
                glslType: "vec3"
            },
            time: {
                type: "f",
                glslType: "float"
            },
            Randomise_Fractal: {
                value: {
                    x: .5076923076923077,
                    y: .7076923076923077
                },
                type: "v2",
                glslType: "vec2"
            },
            NUM_SIDES: {
                value: "12",
                type: "f",
                glslType: "float"
            }
        },
        url: "http://shaderfrog.com/app/view/3055",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , m = {
        id: 3301,
        name: "Ova Shader",
        fragment: "precision highp float;\nprecision highp int;\nuniform float time;\nuniform vec3 color1;\nuniform vec3 color2;\nvarying vec3 vPosition;\nvarying float vJitter;\nvec3 permute(vec3 x) \n    {\n        return mod((34.0 * x + 1.0) * x, 289.0);\n    }\nvec3 dist(vec3 x, vec3 y, vec3 z) \n    {\n        return x * x + y * y + z * z;\n    }\nvec2 worley(vec3 P, float jitter) \n    {\n        float K = 0.142857142857;\n        float Ko = 0.428571428571;\n        float K2 = 0.020408163265306;\n        float Kz = 0.166666666667;\n        float Kzo = 0.416666666667;\n        vec3 Pi = mod(floor(P), 289.0);\n        vec3 Pf = fract(P) - 0.5;\n        vec3 Pfx = Pf.x + vec3(1.0, 0.0, -1.0);\n        vec3 Pfy = Pf.y + vec3(1.0, 0.0, -1.0);\n        vec3 Pfz = Pf.z + vec3(1.0, 0.0, -1.0);\n        vec3 p = permute(Pi.x + vec3(-1.0, 0.0, 1.0));\n        vec3 p1 = permute(p + Pi.y - 1.0);\n        vec3 p2 = permute(p + Pi.y);\n        vec3 p3 = permute(p + Pi.y + 1.0);\n        vec3 p11 = permute(p1 + Pi.z - 1.0);\n        vec3 p12 = permute(p1 + Pi.z);\n        vec3 p13 = permute(p1 + Pi.z + 1.0);\n        vec3 p21 = permute(p2 + Pi.z - 1.0);\n        vec3 p22 = permute(p2 + Pi.z);\n        vec3 p23 = permute(p2 + Pi.z + 1.0);\n        vec3 p31 = permute(p3 + Pi.z - 1.0);\n        vec3 p32 = permute(p3 + Pi.z);\n        vec3 p33 = permute(p3 + Pi.z + 1.0);\n        vec3 ox11 = fract(p11 * K) - Ko;\n        vec3 oy11 = mod(floor(p11 * K), 7.0) * K - Ko;\n        vec3 oz11 = floor(p11 * K2) * Kz - Kzo;\n        vec3 ox12 = fract(p12 * K) - Ko;\n        vec3 oy12 = mod(floor(p12 * K), 7.0) * K - Ko;\n        vec3 oz12 = floor(p12 * K2) * Kz - Kzo;\n        vec3 ox13 = fract(p13 * K) - Ko;\n        vec3 oy13 = mod(floor(p13 * K), 7.0) * K - Ko;\n        vec3 oz13 = floor(p13 * K2) * Kz - Kzo;\n        vec3 ox21 = fract(p21 * K) - Ko;\n        vec3 oy21 = mod(floor(p21 * K), 7.0) * K - Ko;\n        vec3 oz21 = floor(p21 * K2) * Kz - Kzo;\n        vec3 ox22 = fract(p22 * K) - Ko;\n        vec3 oy22 = mod(floor(p22 * K), 7.0) * K - Ko;\n        vec3 oz22 = floor(p22 * K2) * Kz - Kzo;\n        vec3 ox23 = fract(p23 * K) - Ko;\n        vec3 oy23 = mod(floor(p23 * K), 7.0) * K - Ko;\n        vec3 oz23 = floor(p23 * K2) * Kz - Kzo;\n        vec3 ox31 = fract(p31 * K) - Ko;\n        vec3 oy31 = mod(floor(p31 * K), 7.0) * K - Ko;\n        vec3 oz31 = floor(p31 * K2) * Kz - Kzo;\n        vec3 ox32 = fract(p32 * K) - Ko;\n        vec3 oy32 = mod(floor(p32 * K), 7.0) * K - Ko;\n        vec3 oz32 = floor(p32 * K2) * Kz - Kzo;\n        vec3 ox33 = fract(p33 * K) - Ko;\n        vec3 oy33 = mod(floor(p33 * K), 7.0) * K - Ko;\n        vec3 oz33 = floor(p33 * K2) * Kz - Kzo;\n        vec3 dx11 = Pfx + jitter * ox11;\n        vec3 dy11 = Pfy.x + jitter * oy11;\n        vec3 dz11 = Pfz.x + jitter * oz11;\n        vec3 dx12 = Pfx + jitter * ox12;\n        vec3 dy12 = Pfy.x + jitter * oy12;\n        vec3 dz12 = Pfz.y + jitter * oz12;\n        vec3 dx13 = Pfx + jitter * ox13;\n        vec3 dy13 = Pfy.x + jitter * oy13;\n        vec3 dz13 = Pfz.z + jitter * oz13;\n        vec3 dx21 = Pfx + jitter * ox21;\n        vec3 dy21 = Pfy.y + jitter * oy21;\n        vec3 dz21 = Pfz.x + jitter * oz21;\n        vec3 dx22 = Pfx + jitter * ox22;\n        vec3 dy22 = Pfy.y + jitter * oy22;\n        vec3 dz22 = Pfz.y + jitter * oz22;\n        vec3 dx23 = Pfx + jitter * ox23;\n        vec3 dy23 = Pfy.y + jitter * oy23;\n        vec3 dz23 = Pfz.z + jitter * oz23;\n        vec3 dx31 = Pfx + jitter * ox31;\n        vec3 dy31 = Pfy.z + jitter * oy31;\n        vec3 dz31 = Pfz.x + jitter * oz31;\n        vec3 dx32 = Pfx + jitter * ox32;\n        vec3 dy32 = Pfy.z + jitter * oy32;\n        vec3 dz32 = Pfz.y + jitter * oz32;\n        vec3 dx33 = Pfx + jitter * ox33;\n        vec3 dy33 = Pfy.z + jitter * oy33;\n        vec3 dz33 = Pfz.z + jitter * oz33;\n        vec3 d11 = dist(dx11, dy11, dz11);\n        vec3 d12 = dist(dx12, dy12, dz12);\n        vec3 d13 = dist(dx13, dy13, dz13);\n        vec3 d21 = dist(dx21, dy21, dz21);\n        vec3 d22 = dist(dx22, dy22, dz22);\n        vec3 d23 = dist(dx23, dy23, dz23);\n        vec3 d31 = dist(dx31, dy31, dz31);\n        vec3 d32 = dist(dx32, dy32, dz32);\n        vec3 d33 = dist(dx33, dy33, dz33);\n        vec3 d1a = min(d11, d12);\n        d12 = max(d11, d12);\n        d11 = min(d1a, d13);\n        d13 = max(d1a, d13);\n        d12 = min(d12, d13);\n        vec3 d2a = min(d21, d22);\n        d22 = max(d21, d22);\n        d21 = min(d2a, d23);\n        d23 = max(d2a, d23);\n        d22 = min(d22, d23);\n        vec3 d3a = min(d31, d32);\n        d32 = max(d31, d32);\n        d31 = min(d3a, d33);\n        d33 = max(d3a, d33);\n        d32 = min(d32, d33);\n        vec3 da = min(d11, d21);\n        d21 = max(d11, d21);\n        d11 = min(da, d31);\n        d31 = max(da, d31);\n        d11.xy = (d11.x < d11.y) ? d11.xy : d11.yx;\n        d11.xz = (d11.x < d11.z) ? d11.xz : d11.zx;\n        d12 = min(d12, d21);\n        d12 = min(d12, d22);\n        d12 = min(d12, d31);\n        d12 = min(d12, d32);\n        d11.yz = min(d11.yz, d12.xy);\n        d11.y = min(d11.y, d12.z);\n        d11.y = min(d11.y, d11.z);\n        return sqrt(d11.xy);\n    }\nvec4 Ruby_Mine1553790481262_158_main() \n    {\n        vec4 Ruby_Mine1553790481262_158_gl_FragColor = vec4(0.0);\n        vec2 worl = worley(vPosition, vJitter);\n        float world = worl.y - worl.x;\n        vec3 color = mix(color1, color2, clamp(world * 2.0, 0.0, 1.0));\n        Ruby_Mine1553790481262_158_gl_FragColor = vec4((color * 0.1) + (color * world), 1.0);\n        return Ruby_Mine1553790481262_158_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = Ruby_Mine1553790481262_158_main();    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform float time;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nvarying vec3 vPosition;\nvarying float vJitter;\nvec3 permute(vec3 x) \n    {\n        return mod((34.0 * x + 1.0) * x, 289.0);\n    }\nvec3 dist(vec3 x, vec3 y, vec3 z) \n    {\n        return x * x + y * y + z * z;\n    }\nvec2 worley(vec3 P, float jitter) \n    {\n        float K = 0.142857142857;\n        float Ko = 0.428571428571;\n        float K2 = 0.020408163265306;\n        float Kz = 0.166666666667;\n        float Kzo = 0.416666666667;\n        vec3 Pi = mod(floor(P), 289.0);\n        vec3 Pf = fract(P) - 0.5;\n        vec3 Pfx = Pf.x + vec3(1.0, 0.0, -1.0);\n        vec3 Pfy = Pf.y + vec3(1.0, 0.0, -1.0);\n        vec3 Pfz = Pf.z + vec3(1.0, 0.0, -1.0);\n        vec3 p = permute(Pi.x + vec3(-1.0, 0.0, 1.0));\n        vec3 p1 = permute(p + Pi.y - 1.0);\n        vec3 p2 = permute(p + Pi.y);\n        vec3 p3 = permute(p + Pi.y + 1.0);\n        vec3 p11 = permute(p1 + Pi.z - 1.0);\n        vec3 p12 = permute(p1 + Pi.z);\n        vec3 p13 = permute(p1 + Pi.z + 1.0);\n        vec3 p21 = permute(p2 + Pi.z - 1.0);\n        vec3 p22 = permute(p2 + Pi.z);\n        vec3 p23 = permute(p2 + Pi.z + 1.0);\n        vec3 p31 = permute(p3 + Pi.z - 1.0);\n        vec3 p32 = permute(p3 + Pi.z);\n        vec3 p33 = permute(p3 + Pi.z + 1.0);\n        vec3 ox11 = fract(p11 * K) - Ko;\n        vec3 oy11 = mod(floor(p11 * K), 7.0) * K - Ko;\n        vec3 oz11 = floor(p11 * K2) * Kz - Kzo;\n        vec3 ox12 = fract(p12 * K) - Ko;\n        vec3 oy12 = mod(floor(p12 * K), 7.0) * K - Ko;\n        vec3 oz12 = floor(p12 * K2) * Kz - Kzo;\n        vec3 ox13 = fract(p13 * K) - Ko;\n        vec3 oy13 = mod(floor(p13 * K), 7.0) * K - Ko;\n        vec3 oz13 = floor(p13 * K2) * Kz - Kzo;\n        vec3 ox21 = fract(p21 * K) - Ko;\n        vec3 oy21 = mod(floor(p21 * K), 7.0) * K - Ko;\n        vec3 oz21 = floor(p21 * K2) * Kz - Kzo;\n        vec3 ox22 = fract(p22 * K) - Ko;\n        vec3 oy22 = mod(floor(p22 * K), 7.0) * K - Ko;\n        vec3 oz22 = floor(p22 * K2) * Kz - Kzo;\n        vec3 ox23 = fract(p23 * K) - Ko;\n        vec3 oy23 = mod(floor(p23 * K), 7.0) * K - Ko;\n        vec3 oz23 = floor(p23 * K2) * Kz - Kzo;\n        vec3 ox31 = fract(p31 * K) - Ko;\n        vec3 oy31 = mod(floor(p31 * K), 7.0) * K - Ko;\n        vec3 oz31 = floor(p31 * K2) * Kz - Kzo;\n        vec3 ox32 = fract(p32 * K) - Ko;\n        vec3 oy32 = mod(floor(p32 * K), 7.0) * K - Ko;\n        vec3 oz32 = floor(p32 * K2) * Kz - Kzo;\n        vec3 ox33 = fract(p33 * K) - Ko;\n        vec3 oy33 = mod(floor(p33 * K), 7.0) * K - Ko;\n        vec3 oz33 = floor(p33 * K2) * Kz - Kzo;\n        vec3 dx11 = Pfx + jitter * ox11;\n        vec3 dy11 = Pfy.x + jitter * oy11;\n        vec3 dz11 = Pfz.x + jitter * oz11;\n        vec3 dx12 = Pfx + jitter * ox12;\n        vec3 dy12 = Pfy.x + jitter * oy12;\n        vec3 dz12 = Pfz.y + jitter * oz12;\n        vec3 dx13 = Pfx + jitter * ox13;\n        vec3 dy13 = Pfy.x + jitter * oy13;\n        vec3 dz13 = Pfz.z + jitter * oz13;\n        vec3 dx21 = Pfx + jitter * ox21;\n        vec3 dy21 = Pfy.y + jitter * oy21;\n        vec3 dz21 = Pfz.x + jitter * oz21;\n        vec3 dx22 = Pfx + jitter * ox22;\n        vec3 dy22 = Pfy.y + jitter * oy22;\n        vec3 dz22 = Pfz.y + jitter * oz22;\n        vec3 dx23 = Pfx + jitter * ox23;\n        vec3 dy23 = Pfy.y + jitter * oy23;\n        vec3 dz23 = Pfz.z + jitter * oz23;\n        vec3 dx31 = Pfx + jitter * ox31;\n        vec3 dy31 = Pfy.z + jitter * oy31;\n        vec3 dz31 = Pfz.x + jitter * oz31;\n        vec3 dx32 = Pfx + jitter * ox32;\n        vec3 dy32 = Pfy.z + jitter * oy32;\n        vec3 dz32 = Pfz.y + jitter * oz32;\n        vec3 dx33 = Pfx + jitter * ox33;\n        vec3 dy33 = Pfy.z + jitter * oy33;\n        vec3 dz33 = Pfz.z + jitter * oz33;\n        vec3 d11 = dist(dx11, dy11, dz11);\n        vec3 d12 = dist(dx12, dy12, dz12);\n        vec3 d13 = dist(dx13, dy13, dz13);\n        vec3 d21 = dist(dx21, dy21, dz21);\n        vec3 d22 = dist(dx22, dy22, dz22);\n        vec3 d23 = dist(dx23, dy23, dz23);\n        vec3 d31 = dist(dx31, dy31, dz31);\n        vec3 d32 = dist(dx32, dy32, dz32);\n        vec3 d33 = dist(dx33, dy33, dz33);\n        vec3 d1a = min(d11, d12);\n        d12 = max(d11, d12);\n        d11 = min(d1a, d13);\n        d13 = max(d1a, d13);\n        d12 = min(d12, d13);\n        vec3 d2a = min(d21, d22);\n        d22 = max(d21, d22);\n        d21 = min(d2a, d23);\n        d23 = max(d2a, d23);\n        d22 = min(d22, d23);\n        vec3 d3a = min(d31, d32);\n        d32 = max(d31, d32);\n        d31 = min(d3a, d33);\n        d33 = max(d3a, d33);\n        d32 = min(d32, d33);\n        vec3 da = min(d11, d21);\n        d21 = max(d11, d21);\n        d11 = min(da, d31);\n        d31 = max(da, d31);\n        d11.xy = (d11.x < d11.y) ? d11.xy : d11.yx;\n        d11.xz = (d11.x < d11.z) ? d11.xz : d11.zx;\n        d12 = min(d12, d21);\n        d12 = min(d12, d22);\n        d12 = min(d12, d31);\n        d12 = min(d12, d32);\n        d11.yz = min(d11.yz, d12.xy);\n        d11.y = min(d11.y, d12.z);\n        d11.y = min(d11.y, d11.z);\n        return sqrt(d11.xy);\n    }\nvec4 Ruby_Mine1553790481262_158_main() \n    {\n        vec4 Ruby_Mine1553790481262_158_gl_Position = vec4(0.0);\n        vJitter = 1.0;\n        vPosition = (position * 2.0) + vec3(sin(time), cos(time), cos(time + 3.14));\n        vec2 worl = worley(vPosition, vJitter);\n        vec3 pos = position - (length(worl) * normal * 0.2);\n        Ruby_Mine1553790481262_158_gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n        return Ruby_Mine1553790481262_158_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Ruby_Mine1553790481262_158_main();    }\n",
        uniforms: {
            time: {
                type: "f",
                glslType: "float"
            },
            color1: {
                value: {
                    r: .95,
                    g: .1,
                    b: .8
                },
                type: "c",
                glslType: "vec3"
            },
            color2: {
                value: {
                    r: .7,
                    g: .07,
                    b: .6
                },
                type: "c",
                glslType: "vec3"
            }
        },
        url: "http://shaderfrog.com/app/view/3301",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , d = {
        id: 3345,
        name: "Thruster Shader",
        fragment: "#define TAU 6.28318530718\n#define MAX_ITER 5\n#define tau 6.2831853\n\n#extension GL_OES_standard_derivatives : enable\n\nprecision highp float;\nprecision highp int;\nuniform vec2 Tiling_Caustic1477531952046_152_resolution;\nuniform vec3 backgroundColor;\nuniform vec3 Tiling_Caustic1477531952046_152_color;\nuniform float Tiling_Caustic1477531952046_152_speed;\nuniform float Tiling_Caustic1477531952046_152_brightness;\nuniform float time;\nuniform float contrast;\nuniform float distortion;\nuniform float Noise_Ripples1477531959288_166_speed;\nuniform vec3 Noise_Ripples1477531959288_166_color;\nuniform float Noise_Ripples1477531959288_166_brightness;\nuniform sampler2D noiseImage;\nuniform vec2 Noise_Ripples1477531959288_166_resolution;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat3 normalMatrix;\nuniform float highlightIntensity;\nuniform vec3 highlightColor;\nuniform vec3 Wiggly_Improved1477532051339_181_color;\nuniform vec3 Transparent_Glow1477532059126_201_color;\nuniform float Transparent_Glow1477532059126_201_start;\nuniform float Transparent_Glow1477532059126_201_end;\nuniform float Transparent_Glow1477532059126_201_alpha;\nuniform vec3 Glow_Effect1477532183055_216_color;\nuniform float Glow_Effect1477532183055_216_start;\nuniform float Glow_Effect1477532183055_216_end;\nuniform float Glow_Effect1477532183055_216_alpha;\nvarying vec2 Tiling_Caustic1477531952046_152_vUv;\nvarying vec2 Noise_Ripples1477531959288_166_vUv;\nmat2 makem2(in float theta) \n    {\n        float c = cos(theta);\n        float s = sin(theta);\n        return mat2(c, -s, s, c);\n    }\nfloat noise(in vec2 x) \n    {\n        return texture2D(noiseImage, x * .01).x;\n    }\nfloat fbm(in vec2 p) \n    {\n        float z = 2.;\n        float rz = 0.;\n        vec2 bp = p;\n        for (float i = 1.;\n i < 6.0; i++) \n        {\n            rz += abs((noise(p) - 0.5) * 2.0) / z;\n            z = z * 2.;\n            p = p * 2.;\n        }\n        return rz;\n    }\nfloat dualfbm(in vec2 p) \n    {\n        vec2 p2 = p * distortion;\n        vec2 basis = vec2(fbm(p2 - time * Noise_Ripples1477531959288_166_speed * 1.6), fbm(p2 + time * Noise_Ripples1477531959288_166_speed * 1.7));\n        basis = (basis - .5) * .2;\n        p += basis;\n        return fbm(p * makem2(time * Noise_Ripples1477531959288_166_speed * 0.2));\n    }\nvarying vec3 Wiggly_Improved1477532051339_181_vNormal;\nvarying float light;\nvarying vec3 Transparent_Glow1477532059126_201_fPosition;\nvarying vec3 Transparent_Glow1477532059126_201_fNormal;\nvarying vec3 Glow_Effect1477532183055_216_fPosition;\nvarying vec3 Glow_Effect1477532183055_216_fNormal;\nvec4 Tiling_Caustic1477531952046_152_main() \n    {\n        vec4 Tiling_Caustic1477531952046_152_gl_FragColor = vec4(0.0);\n        vec2 uv = Tiling_Caustic1477531952046_152_vUv * Tiling_Caustic1477531952046_152_resolution;\n        vec2 p = mod(uv * TAU, TAU) - 250.0;\n        vec2 i = vec2(p);\n        float c = 1.0;\n        float inten = 0.005;\n        for (int n = 0;\n n < MAX_ITER; n++) \n        {\n            float t = time * Tiling_Caustic1477531952046_152_speed * (1.0 - (3.5 / float(n + 1)));\n            i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));\n            c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));\n        }\n        c /= float(MAX_ITER);\n        c = 1.17 - pow(c, Tiling_Caustic1477531952046_152_brightness);\n        vec3 rgb = vec3(pow(abs(c), 8.0));\n        Tiling_Caustic1477531952046_152_gl_FragColor = vec4(rgb * Tiling_Caustic1477531952046_152_color + backgroundColor, 1.0);\n        return Tiling_Caustic1477531952046_152_gl_FragColor *= 1.0;\n    }\nvec4 Noise_Ripples1477531959288_166_main() \n    {\n        vec4 Noise_Ripples1477531959288_166_gl_FragColor = vec4(0.0);\n        vec2 p = (Noise_Ripples1477531959288_166_vUv.xy - 0.5) * Noise_Ripples1477531959288_166_resolution;\n        float rz = dualfbm(p);\n        vec3 col = (Noise_Ripples1477531959288_166_color / rz) * Noise_Ripples1477531959288_166_brightness;\n        col = ((col - 0.5) * max(contrast, 0.0)) + 0.5;\n        Noise_Ripples1477531959288_166_gl_FragColor = vec4(col, 1.0);\n        return Noise_Ripples1477531959288_166_gl_FragColor *= 1.0;\n    }\nvec4 Wiggly_Improved1477532051339_181_main() \n    {\n        vec4 Wiggly_Improved1477532051339_181_gl_FragColor = vec4(0.0);\n        Wiggly_Improved1477532051339_181_gl_FragColor = vec4(clamp(highlightColor * highlightIntensity * light, 0.0, 1.0), 1.0);\n        return Wiggly_Improved1477532051339_181_gl_FragColor *= 1.0;\n    }\nvec4 Transparent_Glow1477532059126_201_main() \n    {\n        vec4 Transparent_Glow1477532059126_201_gl_FragColor = vec4(0.0);\n        vec3 normal = normalize(Transparent_Glow1477532059126_201_fNormal);\n        vec3 eye = normalize(-Transparent_Glow1477532059126_201_fPosition.xyz);\n        float rim = smoothstep(Transparent_Glow1477532059126_201_start, Transparent_Glow1477532059126_201_end, 1.0 - dot(normal, eye));\n        float value = clamp(rim * Transparent_Glow1477532059126_201_alpha, 0.0, 1.0);\n        Transparent_Glow1477532059126_201_gl_FragColor = vec4(Transparent_Glow1477532059126_201_color * value, value);\n        return Transparent_Glow1477532059126_201_gl_FragColor *= 1.0;\n    }\nvec4 Glow_Effect1477532183055_216_main() \n    {\n        vec4 Glow_Effect1477532183055_216_gl_FragColor = vec4(0.0);\n        vec3 normal = normalize(Glow_Effect1477532183055_216_fNormal);\n        vec3 eye = normalize(-Glow_Effect1477532183055_216_fPosition.xyz);\n        float rim = smoothstep(Glow_Effect1477532183055_216_start, Glow_Effect1477532183055_216_end, 1.0 - dot(normal, eye));\n        Glow_Effect1477532183055_216_gl_FragColor = vec4(clamp(rim, 0.0, 1.0) * Glow_Effect1477532183055_216_alpha * Glow_Effect1477532183055_216_color, 1.0);\n        return Glow_Effect1477532183055_216_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = (Tiling_Caustic1477531952046_152_main() + Noise_Ripples1477531959288_166_main() + Wiggly_Improved1477532051339_181_main() + Transparent_Glow1477532059126_201_main() + Glow_Effect1477532183055_216_main());    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform float time;\nuniform float Wiggly_Improved1477532051339_181_speed;\nuniform float frequency;\nuniform float amplitude;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec3 Tiling_Caustic1477531952046_152_vPosition;\nvarying vec3 Tiling_Caustic1477531952046_152_vNormal;\nvarying vec2 Tiling_Caustic1477531952046_152_vUv;\nvarying vec2 Tiling_Caustic1477531952046_152_vUv2;\nvarying vec3 Noise_Ripples1477531959288_166_vPosition;\nvarying vec3 Noise_Ripples1477531959288_166_vNormal;\nvarying vec2 Noise_Ripples1477531959288_166_vUv;\nvarying vec2 Noise_Ripples1477531959288_166_vUv2;\nvarying vec3 Wiggly_Improved1477532051339_181_vNormal;\nvarying float light;\nvarying vec3 Wiggly_Improved1477532051339_181_vPosition;\nvarying vec3 Transparent_Glow1477532059126_201_fNormal;\nvarying vec3 Transparent_Glow1477532059126_201_fPosition;\nvarying vec3 Glow_Effect1477532183055_216_fNormal;\nvarying vec3 Glow_Effect1477532183055_216_fPosition;\nvec4 Tiling_Caustic1477531952046_152_main() \n    {\n        vec4 Tiling_Caustic1477531952046_152_gl_Position = vec4(0.0);\n        Tiling_Caustic1477531952046_152_vNormal = normal;\n        Tiling_Caustic1477531952046_152_vUv = uv;\n        Tiling_Caustic1477531952046_152_vUv2 = uv2;\n        Tiling_Caustic1477531952046_152_vPosition = position;\n        Tiling_Caustic1477531952046_152_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Tiling_Caustic1477531952046_152_gl_Position *= 1.0;\n    }\nvec4 Noise_Ripples1477531959288_166_main() \n    {\n        vec4 Noise_Ripples1477531959288_166_gl_Position = vec4(0.0);\n        Noise_Ripples1477531959288_166_vNormal = normal;\n        Noise_Ripples1477531959288_166_vUv = uv;\n        Noise_Ripples1477531959288_166_vUv2 = uv2;\n        Noise_Ripples1477531959288_166_vPosition = position;\n        Noise_Ripples1477531959288_166_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Noise_Ripples1477531959288_166_gl_Position *= 1.0;\n    }\nvec4 Wiggly_Improved1477532051339_181_main() \n    {\n        vec4 Wiggly_Improved1477532051339_181_gl_Position = vec4(0.0);\n        vec3 offset = normalize(vec3(0.0) - position) * (amplitude * sin(Wiggly_Improved1477532051339_181_speed * time + position.y * frequency));\n        vec3 newPosition = position + vec3(offset.x, 0.0, offset.z);\n        light = amplitude * sin(Wiggly_Improved1477532051339_181_speed * time + 1.0 + position.y * frequency);\n        Wiggly_Improved1477532051339_181_vPosition = newPosition;\n        Wiggly_Improved1477532051339_181_gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);\n        return Wiggly_Improved1477532051339_181_gl_Position *= 1.0;\n    }\nvec4 Transparent_Glow1477532059126_201_main() \n    {\n        vec4 Transparent_Glow1477532059126_201_gl_Position = vec4(0.0);\n        Transparent_Glow1477532059126_201_fNormal = normalize(normalMatrix * normal);\n        vec4 pos = modelViewMatrix * vec4(position, 1.0);\n        Transparent_Glow1477532059126_201_fPosition = pos.xyz;\n        Transparent_Glow1477532059126_201_gl_Position = projectionMatrix * pos;\n        return Transparent_Glow1477532059126_201_gl_Position *= 1.0;\n    }\nvec4 Glow_Effect1477532183055_216_main() \n    {\n        vec4 Glow_Effect1477532183055_216_gl_Position = vec4(0.0);\n        Glow_Effect1477532183055_216_fNormal = normalize(normalMatrix * normal);\n        vec4 pos = modelViewMatrix * vec4(position, 1.0);\n        Glow_Effect1477532183055_216_fPosition = pos.xyz;\n        Glow_Effect1477532183055_216_gl_Position = projectionMatrix * pos;\n        return Glow_Effect1477532183055_216_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Tiling_Caustic1477531952046_152_main() + Noise_Ripples1477531959288_166_main() + Wiggly_Improved1477532051339_181_main() + Transparent_Glow1477532059126_201_main() + Glow_Effect1477532183055_216_main();    }\n",
        uniforms: {
            cameraPosition: {
                type: "v3",
                glslType: "vec3"
            },
            time: {
                type: "f",
                glslType: "float"
            },
            backgroundColor: {
                value: {
                    r: "0",
                    g: "0",
                    b: "0"
                },
                type: "c",
                glslType: "vec3"
            },
            Tiling_Caustic1477531952046_152_resolution: {
                value: {
                    x: 1,
                    y: 1
                },
                type: "v2",
                glslType: "vec2"
            },
            Tiling_Caustic1477531952046_152_color: {
                value: {
                    r: 1,
                    g: 1,
                    b: 1
                },
                type: "c",
                glslType: "vec3"
            },
            Tiling_Caustic1477531952046_152_speed: {
                value: "0.5",
                type: "f",
                glslType: "float"
            },
            Tiling_Caustic1477531952046_152_brightness: {
                value: "1.5",
                type: "f",
                glslType: "float"
            },
            noiseImage: {
                value: null,
                type: "t",
                glslType: "sampler2D"
            },
            distortion: {
                value: "2",
                type: "f",
                glslType: "float"
            },
            contrast: {
                value: "1.5",
                type: "f",
                glslType: "float"
            },
            Noise_Ripples1477531959288_166_speed: {
                value: "0.1",
                type: "f",
                glslType: "float"
            },
            Noise_Ripples1477531959288_166_color: {
                value: {
                    r: 1,
                    g: .2823529411764706,
                    b: .4823529411764706
                },
                type: "c",
                glslType: "vec3"
            },
            Noise_Ripples1477531959288_166_brightness: {
                value: "0.1",
                type: "f",
                glslType: "float"
            },
            Noise_Ripples1477531959288_166_resolution: {
                value: {
                    x: "2",
                    y: "2"
                },
                type: "v2",
                glslType: "vec2"
            },
            amplitude: {
                value: "1",
                type: "f",
                glslType: "float"
            },
            frequency: {
                value: "20",
                type: "f",
                glslType: "float"
            },
            highlightIntensity: {
                value: "0.4",
                type: "f",
                glslType: "float"
            },
            highlightColor: {
                value: {
                    r: 1,
                    g: .5450980392156862,
                    b: .23529411764705882
                },
                type: "c",
                glslType: "vec3"
            },
            Wiggly_Improved1477532051339_181_color: {
                value: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                type: "c",
                glslType: "vec3"
            },
            Wiggly_Improved1477532051339_181_speed: {
                value: "12",
                type: "f",
                glslType: "float"
            },
            Transparent_Glow1477532059126_201_color: {
                value: {
                    r: 1,
                    g: .5294117647058824,
                    b: .8156862745098039
                },
                type: "c",
                glslType: "vec3"
            },
            Transparent_Glow1477532059126_201_start: {
                value: "0.54674743",
                type: "f",
                glslType: "float"
            },
            Transparent_Glow1477532059126_201_end: {
                value: "0.44399246",
                type: "f",
                glslType: "float"
            },
            Transparent_Glow1477532059126_201_alpha: {
                value: "0.5",
                type: "f",
                glslType: "float"
            },
            Glow_Effect1477532183055_216_color: {
                value: {
                    r: "1",
                    g: "1",
                    b: "1"
                },
                type: "c",
                glslType: "vec3"
            },
            Glow_Effect1477532183055_216_start: {
                value: "0",
                type: "f",
                glslType: "float"
            },
            Glow_Effect1477532183055_216_end: {
                value: "1.9",
                type: "f",
                glslType: "float"
            },
            Glow_Effect1477532183055_216_alpha: {
                value: "1",
                type: "f",
                glslType: "float"
            }
        },
        url: "http://shaderfrog.com/app/view/3345",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , p = {
        id: 3369,
        name: "Flowing Circles",
        fragment: "precision highp float;\nprecision highp int;\nuniform vec2 resolution;\nuniform float time;\nuniform float speed;\nuniform float baseRadius;\nuniform float colorVariation;\nuniform float brightnessVariation;\nuniform vec3 backgroundColor;\nuniform float variation;\nvarying vec2 vUv;\nvec3 n(vec2 x, float t) \n    {\n        vec3 v = floor(vec3(x, t));\n        vec3 u = vec3(mod(v.xy, variation), v.z);\n        vec3 c = fract(u.xyz * (vec3(0.16462, 0.84787, 0.98273) + u.xyz * vec3(0.24808, 0.75905, 0.13898) + u.yzx * vec3(0.31517, 0.62703, 0.26063) + u.zxy * vec3(0.47127, 0.58568, 0.37244)) + u.yzx * (vec3(0.35425, 0.65187, 0.12423) + u.yzx * vec3(0.95238, 0.93187, 0.95213) + u.zxy * vec3(0.31526, 0.62512, 0.71837)) + u.zxy * (vec3(0.95213, 0.13841, 0.16479) + u.zxy * vec3(0.47626, 0.69257, 0.19738)));\n        return v + c;\n    }\nvec3 col(vec2 x, float t) \n    {\n        return vec3(0.5 + max(brightnessVariation * cos(x.y * x.x), 0.0)) + clamp(colorVariation * cos(fract(vec3(x, t)) * 371.0241), vec3(-0.4), vec3(1.0));\n    }\nvec2 idx(vec2 x) \n    {\n        return floor(fract(x * 29.0) * 3.0) - vec2(1.0);\n    }\nfloat circle(vec2 x, vec2 c, float r) \n    {\n        return max(0.0, 1.0 - dot(x - c, x - c) / (r * r));\n    }\nvec4 Fluid_Circles1551693972791_443_main() \n    {\n        vec4 Fluid_Circles1551693972791_443_gl_FragColor = vec4(0.0);\n        vec2 x = vUv * resolution;\n        float t = time * speed;\n        vec4 c = vec4(vec3(0.0), 0.1);\n        for (int N = 0;\n N < 3; N++) \n        {\n            for (int k = -1;\n k <= 0; k++) \n            {\n                for (int i = -1;\n i <= 1; i++) \n                {\n                    for (int j = -1;\n j <= 1; j++) \n                    {\n                        vec2 X = x + vec2(j, i);\n                        float t = t + float(N) * 38.0;\n                        float T = t + float(k);\n                        vec3 a = n(X, T);\n                        vec2 o = idx(a.xy);\n                        vec3 b = n(X + o, T + 1.0);\n                        vec2 m = mix(a.xy, b.xy, (t - a.z) / (b.z - a.z));\n                        float r = baseRadius * sin(3.1415927 * clamp((t - a.z) / (b.z - a.z), 0.0, 1.0));\n                        if (length(a.xy - b.xy) / (b.z - a.z) > 2.0) \n                        {\n                            r = 0.0;\n                        }\n                         c += vec4(col(a.xy, a.z), 1.0) * circle(x, m, r);\n                    }\n                }\n            }\n        }\n        Fluid_Circles1551693972791_443_gl_FragColor = vec4(c.rgb / max(1e-5, c.w) + backgroundColor, 1.0);\n        return Fluid_Circles1551693972791_443_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = Fluid_Circles1551693972791_443_main();    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform float time;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec2 vUv2;\nvec4 Fluid_Circles1551693972791_443_main() \n    {\n        vec4 Fluid_Circles1551693972791_443_gl_Position = vec4(0.0);\n        vNormal = normal;\n        vUv = uv;\n        vUv2 = uv2;\n        vPosition = position;\n        Fluid_Circles1551693972791_443_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Fluid_Circles1551693972791_443_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Fluid_Circles1551693972791_443_main();    }\n",
        uniforms: {
            cameraPosition: {
                type: "v3",
                glslType: "vec3"
            },
            time: {
                type: "f",
                glslType: "float"
            },
            resolution: {
                value: {
                    x: "8",
                    y: "9"
                },
                type: "v2",
                glslType: "vec2"
            },
            speed: {
                value: ".2",
                type: "f",
                glslType: "float"
            },
            baseRadius: {
                value: ".2",
                type: "f",
                glslType: "float"
            },
            backgroundColor: {
                value: {
                    r: 0,
                    g: ".",
                    b: "0.9"
                },
                type: "c",
                glslType: "vec3"
            },
            brightnessVariation: {
                value: "0",
                type: "f",
                glslType: "float"
            },
            colorVariation: {
                value: "0.99",
                type: "f",
                glslType: "float"
            },
            variation: {
                value: "50",
                type: "f",
                glslType: "float"
            }
        },
        url: "http://shaderfrog.com/app/view/3369",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , f = {
        id: 3373,
        name: "Electric Shader",
        fragment: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform float time;\nuniform float opacity;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec2 vUv2;\nfloat Hash(vec2 p) \n    {\n        vec3 p2 = vec3(p.xy, 1.0);\n        return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);\n    }\nfloat noise(in vec2 p) \n    {\n        vec2 i = floor(p);\n        vec2 f = fract(p);\n        f *= f * (3.0 - 2.0 * f);\n        return mix(mix(Hash(i + vec2(0., 0.)), Hash(i + vec2(1., 0.)), f.x), mix(Hash(i + vec2(0., 1.)), Hash(i + vec2(1., 1.)), f.x), f.y);\n    }\nfloat fbm(vec2 p) \n    {\n        float v = 0.0;\n        v += noise(p * 1.0) * .5;\n        v += noise(p * 2.) * .25;\n        v += noise(p * 4.) * .125;\n        return v * 1.0;\n    }\nconst float PI = acos(0.0) * 2.0;\nvec2 RadialCoords(vec3 a_coords) \n    {\n        vec3 a_coords_n = normalize(a_coords);\n        float lon = atan(a_coords_n.z, a_coords_n.x);\n        float lat = acos(a_coords_n.y);\n        vec2 sphereCoords = vec2(lon, lat) / PI;\n        return vec2(fract(sphereCoords.x * 0.5 + 0.5), 1.0 - sphereCoords.y);\n    }\nvec4 Lightning_main() \n    {\n        vec4 Lightning_gl_FragColor = vec4(0.0);\n        vec2 uv = RadialCoords(vPosition * 1.0) * 2.0 - 1.0;\n        vec3 finalColor = vec3(0.0);\n        const float strength = 0.01;\n        const float dx = 0.1;\n        float t = 0.0;\n        for (int k = -4;\n k < 14; ++k) \n        {\n            vec2 thisUV = uv;\n            thisUV.x -= dx * float(k);\n            thisUV.y -= float(k);\n            t += abs(strength / (thisUV.x + fbm(thisUV + time)));\n        }\n        finalColor += t * vec3(0.1, 0.3, 1.0);\n        Lightning_gl_FragColor = vec4(finalColor, opacity);\n        return Lightning_gl_FragColor;\n    }\nvec4 Electric_Shader1556488915096_215_main() \n    {\n        vec4 Electric_Shader1556488915096_215_gl_FragColor = vec4(0.0);\n        Electric_Shader1556488915096_215_gl_FragColor = Lightning_main();\n        return Electric_Shader1556488915096_215_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = Electric_Shader1556488915096_215_main();\n if (gl_FragColor.a < 0.5  && gl_FragColor.g <0.5) discard;   }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform float time;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec2 vUv2;\nvec4 Lightning_main() \n    {\n        vec4 Lightning_gl_Position = vec4(0.0);\n        vNormal = normal;\n        vUv = uv;\n        vUv2 = uv2;\n        vPosition = position;\n        Lightning_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Lightning_gl_Position *= 0.5;\n    }\nvec4 Electric_Shader1556488915096_215_main() \n    {\n        vec4 Electric_Shader1556488915096_215_gl_Position = vec4(0.0);\n        Electric_Shader1556488915096_215_gl_Position = Lightning_main();\n        return Electric_Shader1556488915096_215_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Electric_Shader1556488915096_215_main();    }\n",
        uniforms: {
            cameraPosition: {
                type: "v3",
                glslType: "vec3"
            },
            time: {
                type: "f",
                glslType: "float"
            },
            opacity: {
                value: "0.4",
                type: "f",
                glslType: "float"
            }
        },
        side: 2,
        url: "http://shaderfrog.com/app/view/3373",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/sirfizx"
        }
    }
      , h = {
        id: 3386,
        name: "CS1 Shader",
        fragment: "#define DOWN_SCALE 1.0\n#define MAX_INT_DIGITS 4\n#define NORMAL 0\n#define INVERT 1\n#define UNDERLINE 2\n\nprecision highp float;\nprecision highp int;\nuniform float time;\nuniform vec2 resolution;\nuniform vec3 color;\nuniform vec3 background_color;\nvarying vec2 vUv;\nint TEXT_MODE = NORMAL;\nvec4 ch_spc = vec4(0x000000, 0x000000, 0x000000, 0x000000);\nvec4 ch_exc = vec4(0x003078, 0x787830, 0x300030, 0x300000);\nvec4 ch_quo = vec4(0x006666, 0x662400, 0x000000, 0x000000);\nvec4 ch_hsh = vec4(0x006C6C, 0xFE6C6C, 0x6CFE6C, 0x6C0000);\nvec4 ch_dol = vec4(0x30307C, 0xC0C078, 0x0C0CF8, 0x303000);\nvec4 ch_pct = vec4(0x000000, 0xC4CC18, 0x3060CC, 0x8C0000);\nvec4 ch_amp = vec4(0x0070D8, 0xD870FA, 0xDECCDC, 0x760000);\nvec4 ch_apo = vec4(0x003030, 0x306000, 0x000000, 0x000000);\nvec4 ch_lbr = vec4(0x000C18, 0x306060, 0x603018, 0x0C0000);\nvec4 ch_rbr = vec4(0x006030, 0x180C0C, 0x0C1830, 0x600000);\nvec4 ch_ast = vec4(0x000000, 0x663CFF, 0x3C6600, 0x000000);\nvec4 ch_crs = vec4(0x000000, 0x18187E, 0x181800, 0x000000);\nvec4 ch_com = vec4(0x000000, 0x000000, 0x000038, 0x386000);\nvec4 ch_dsh = vec4(0x000000, 0x0000FE, 0x000000, 0x000000);\nvec4 ch_per = vec4(0x000000, 0x000000, 0x000038, 0x380000);\nvec4 ch_lsl = vec4(0x000002, 0x060C18, 0x3060C0, 0x800000);\nvec4 ch_0 = vec4(0x007CC6, 0xD6D6D6, 0xD6D6C6, 0x7C0000);\nvec4 ch_1 = vec4(0x001030, 0xF03030, 0x303030, 0xFC0000);\nvec4 ch_2 = vec4(0x0078CC, 0xCC0C18, 0x3060CC, 0xFC0000);\nvec4 ch_3 = vec4(0x0078CC, 0x0C0C38, 0x0C0CCC, 0x780000);\nvec4 ch_4 = vec4(0x000C1C, 0x3C6CCC, 0xFE0C0C, 0x1E0000);\nvec4 ch_5 = vec4(0x00FCC0, 0xC0C0F8, 0x0C0CCC, 0x780000);\nvec4 ch_6 = vec4(0x003860, 0xC0C0F8, 0xCCCCCC, 0x780000);\nvec4 ch_7 = vec4(0x00FEC6, 0xC6060C, 0x183030, 0x300000);\nvec4 ch_8 = vec4(0x0078CC, 0xCCEC78, 0xDCCCCC, 0x780000);\nvec4 ch_9 = vec4(0x0078CC, 0xCCCC7C, 0x181830, 0x700000);\nvec4 ch_col = vec4(0x000000, 0x383800, 0x003838, 0x000000);\nvec4 ch_scl = vec4(0x000000, 0x383800, 0x003838, 0x183000);\nvec4 ch_les = vec4(0x000C18, 0x3060C0, 0x603018, 0x0C0000);\nvec4 ch_equ = vec4(0x000000, 0x007E00, 0x7E0000, 0x000000);\nvec4 ch_grt = vec4(0x006030, 0x180C06, 0x0C1830, 0x600000);\nvec4 ch_que = vec4(0x0078CC, 0x0C1830, 0x300030, 0x300000);\nvec4 ch_ats = vec4(0x007CC6, 0xC6DEDE, 0xDEC0C0, 0x7C0000);\nvec4 ch_A = vec4(0x003078, 0xCCCCCC, 0xFCCCCC, 0xCC0000);\nvec4 ch_B = vec4(0x00FC66, 0x66667C, 0x666666, 0xFC0000);\nvec4 ch_C = vec4(0x003C66, 0xC6C0C0, 0xC0C666, 0x3C0000);\nvec4 ch_D = vec4(0x00F86C, 0x666666, 0x66666C, 0xF80000);\nvec4 ch_E = vec4(0x00FE62, 0x60647C, 0x646062, 0xFE0000);\nvec4 ch_F = vec4(0x00FE66, 0x62647C, 0x646060, 0xF00000);\nvec4 ch_G = vec4(0x003C66, 0xC6C0C0, 0xCEC666, 0x3E0000);\nvec4 ch_H = vec4(0x00CCCC, 0xCCCCFC, 0xCCCCCC, 0xCC0000);\nvec4 ch_I = vec4(0x007830, 0x303030, 0x303030, 0x780000);\nvec4 ch_J = vec4(0x001E0C, 0x0C0C0C, 0xCCCCCC, 0x780000);\nvec4 ch_K = vec4(0x00E666, 0x6C6C78, 0x6C6C66, 0xE60000);\nvec4 ch_L = vec4(0x00F060, 0x606060, 0x626666, 0xFE0000);\nvec4 ch_M = vec4(0x00C6EE, 0xFEFED6, 0xC6C6C6, 0xC60000);\nvec4 ch_N = vec4(0x00C6C6, 0xE6F6FE, 0xDECEC6, 0xC60000);\nvec4 ch_O = vec4(0x00386C, 0xC6C6C6, 0xC6C66C, 0x380000);\nvec4 ch_P = vec4(0x00FC66, 0x66667C, 0x606060, 0xF00000);\nvec4 ch_Q = vec4(0x00386C, 0xC6C6C6, 0xCEDE7C, 0x0C1E00);\nvec4 ch_R = vec4(0x00FC66, 0x66667C, 0x6C6666, 0xE60000);\nvec4 ch_S = vec4(0x0078CC, 0xCCC070, 0x18CCCC, 0x780000);\nvec4 ch_T = vec4(0x00FCB4, 0x303030, 0x303030, 0x780000);\nvec4 ch_U = vec4(0x00CCCC, 0xCCCCCC, 0xCCCCCC, 0x780000);\nvec4 ch_V = vec4(0x00CCCC, 0xCCCCCC, 0xCCCC78, 0x300000);\nvec4 ch_W = vec4(0x00C6C6, 0xC6C6D6, 0xD66C6C, 0x6C0000);\nvec4 ch_X = vec4(0x00CCCC, 0xCC7830, 0x78CCCC, 0xCC0000);\nvec4 ch_Y = vec4(0x00CCCC, 0xCCCC78, 0x303030, 0x780000);\nvec4 ch_Z = vec4(0x00FECE, 0x981830, 0x6062C6, 0xFE0000);\nvec4 ch_lsb = vec4(0x003C30, 0x303030, 0x303030, 0x3C0000);\nvec4 ch_rsl = vec4(0x000080, 0xC06030, 0x180C06, 0x020000);\nvec4 ch_rsb = vec4(0x003C0C, 0x0C0C0C, 0x0C0C0C, 0x3C0000);\nvec4 ch_pow = vec4(0x10386C, 0xC60000, 0x000000, 0x000000);\nvec4 ch_usc = vec4(0x000000, 0x000000, 0x000000, 0x00FF00);\nvec4 ch_a = vec4(0x000000, 0x00780C, 0x7CCCCC, 0x760000);\nvec4 ch_b = vec4(0x00E060, 0x607C66, 0x666666, 0xDC0000);\nvec4 ch_c = vec4(0x000000, 0x0078CC, 0xC0C0CC, 0x780000);\nvec4 ch_d = vec4(0x001C0C, 0x0C7CCC, 0xCCCCCC, 0x760000);\nvec4 ch_e = vec4(0x000000, 0x0078CC, 0xFCC0CC, 0x780000);\nvec4 ch_f = vec4(0x00386C, 0x6060F8, 0x606060, 0xF00000);\nvec4 ch_g = vec4(0x000000, 0x0076CC, 0xCCCC7C, 0x0CCC78);\nvec4 ch_h = vec4(0x00E060, 0x606C76, 0x666666, 0xE60000);\nvec4 ch_i = vec4(0x001818, 0x007818, 0x181818, 0x7E0000);\nvec4 ch_j = vec4(0x000C0C, 0x003C0C, 0x0C0C0C, 0xCCCC78);\nvec4 ch_k = vec4(0x00E060, 0x60666C, 0x786C66, 0xE60000);\nvec4 ch_l = vec4(0x007818, 0x181818, 0x181818, 0x7E0000);\nvec4 ch_m = vec4(0x000000, 0x00FCD6, 0xD6D6D6, 0xC60000);\nvec4 ch_n = vec4(0x000000, 0x00F8CC, 0xCCCCCC, 0xCC0000);\nvec4 ch_o = vec4(0x000000, 0x0078CC, 0xCCCCCC, 0x780000);\nvec4 ch_p = vec4(0x000000, 0x00DC66, 0x666666, 0x7C60F0);\nvec4 ch_q = vec4(0x000000, 0x0076CC, 0xCCCCCC, 0x7C0C1E);\nvec4 ch_r = vec4(0x000000, 0x00EC6E, 0x766060, 0xF00000);\nvec4 ch_s = vec4(0x000000, 0x0078CC, 0x6018CC, 0x780000);\nvec4 ch_t = vec4(0x000020, 0x60FC60, 0x60606C, 0x380000);\nvec4 ch_u = vec4(0x000000, 0x00CCCC, 0xCCCCCC, 0x760000);\nvec4 ch_v = vec4(0x000000, 0x00CCCC, 0xCCCC78, 0x300000);\nvec4 ch_w = vec4(0x000000, 0x00C6C6, 0xD6D66C, 0x6C0000);\nvec4 ch_x = vec4(0x000000, 0x00C66C, 0x38386C, 0xC60000);\nvec4 ch_y = vec4(0x000000, 0x006666, 0x66663C, 0x0C18F0);\nvec4 ch_z = vec4(0x000000, 0x00FC8C, 0x1860C4, 0xFC0000);\nvec4 ch_lpa = vec4(0x001C30, 0x3060C0, 0x603030, 0x1C0000);\nvec4 ch_bar = vec4(0x001818, 0x181800, 0x181818, 0x180000);\nvec4 ch_rpa = vec4(0x00E030, 0x30180C, 0x183030, 0xE00000);\nvec4 ch_tid = vec4(0x0073DA, 0xCE0000, 0x000000, 0x000000);\nvec4 ch_lar = vec4(0x000000, 0x10386C, 0xC6C6FE, 0x000000);\nvec2 res = vec2(1.0) / 1.0;\nvec2 print_pos = vec2(0.0);\nfloat extract_bit(float n, float b) \n    {\n        b = clamp(b, -1.0, 24.0);\n        return floor(mod(floor(n / pow(2.0, floor(b))), 2.0));\n    }\nfloat sprite(vec4 spr, vec2 size, vec2 uv) \n    {\n        uv = floor(uv);\n        float bit = (size.x - uv.x - 1.0) + uv.y * size.x;\n        bool bounds = all(greaterThanEqual(uv, vec2(0))) && all(lessThan(uv, size));\n        float pixels = 0.0;\n        pixels += extract_bit(spr.x, bit - 72.0);\n        pixels += extract_bit(spr.y, bit - 48.0);\n        pixels += extract_bit(spr.z, bit - 24.0);\n        pixels += extract_bit(spr.w, bit - 00.0);\n        return bounds ? pixels : 0.0;\n    }\nfloat char(vec4 ch, vec2 uv) \n    {\n        if (TEXT_MODE == INVERT) \n        {\n            ch = pow(2.0, 24.0) - 1.0 - ch;\n        }\n         if (TEXT_MODE == UNDERLINE) \n        {\n            ch.w = floor(ch.w / 256.0) * 256.0 + 255.0;\n        }\n         float px = sprite(ch, vec2(8, 12), uv - print_pos);\n        print_pos.x += 8.;\n        return px;\n    }\nvec4 get_digit(float d) \n    {\n        d = floor(d);\n        if (d == 0.0) return ch_0;\n         if (d == 1.0) return ch_1;\n         if (d == 2.0) return ch_2;\n         if (d == 3.0) return ch_3;\n         if (d == 4.0) return ch_4;\n         if (d == 5.0) return ch_5;\n         if (d == 6.0) return ch_6;\n         if (d == 7.0) return ch_7;\n         if (d == 8.0) return ch_8;\n         if (d == 9.0) return ch_9;\n         return vec4(0.0);\n    }\nfloat print_number(float number, vec2 uv) \n    {\n        float result = 0.0;\n        for (int i = 3;\n i >= -1; i--) \n        {\n            float digit = mod(number / pow(10.0, float(i)), 10.0);\n            if (i == -1) \n            {\n                result += char(ch_per, uv);\n            }\n             if (abs(number) > pow(10.0, float(i)) || i == 0) \n            {\n                result += char(get_digit(digit), uv);\n            }\n         }\n        return result;\n    }\nfloat print_integer(float number, int zeros, vec2 uv) \n    {\n        float result = 0.0;\n        for (int i = MAX_INT_DIGITS;\n i >= 0; i--) \n        {\n            float digit = mod(number / pow(10.0, float(i)), 10.0);\n            if (abs(number) > pow(10.0, float(i)) || zeros > i || i == 0) \n            {\n                result += char(get_digit(digit), uv);\n            }\n         }\n        return result;\n    }\nfloat text(vec2 uv) \n    {\n        float col = 0.0;\n        vec2 center = res / 2.0;\n        print_pos = floor(center - vec2((17.0 * 8.), (1.0 * 12.)) / 2.0);\n        col += char(ch_C, uv);\n        col += char(ch_S, uv);\n        col += char(ch_1, uv);\n        TEXT_MODE = INVERT;\n        col += char(ch_G, uv);\n        col += char(ch_a, uv);\n        col += char(ch_m, uv);\n        col += char(ch_e, uv);\n        TEXT_MODE = NORMAL;\n        col += char(ch_E, uv);\n        col += char(ch_n, uv);\n        col += char(ch_g, uv);\n        col += char(ch_i, uv);\n        col += char(ch_n, uv);\n        col += char(ch_e, uv);\n        col += char(ch_exc, uv);\n        return col;\n    }\nvec4 Text_main() \n    {\n        vec4 Text_gl_FragColor = vec4(0.0);\n        vec2 uv = (vUv.xy - 0.5) * resolution;\n        vec2 duv = floor(uv.xy / 1.0);\n        float pixel = text(duv);\n        if (pixel > 0.0) \n        {\n            Text_gl_FragColor = vec4(vec3(pixel) * color, 1.0);\n            return Text_gl_FragColor *= 1.0;\n        }\n else \n        {\n            discard;\n        }\n    }\nvec4 Text_Only_Shader1556670324252_90_main() \n    {\n        vec4 Text_Only_Shader1556670324252_90_gl_FragColor = vec4(0.0);\n        Text_Only_Shader1556670324252_90_gl_FragColor = Text_main();\n        return Text_Only_Shader1556670324252_90_gl_FragColor *= 1.0;\n    }\nvoid main() \n    {\n        gl_FragColor = Text_Only_Shader1556670324252_90_main();    }\n",
        vertex: "precision highp float;\nprecision highp int;\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\nvarying vec2 vUv;\nvec4 Hello_ShaderFrog1551692717683_383_main() \n    {\n        vec4 Hello_ShaderFrog1551692717683_383_gl_Position = vec4(0.0);\n        vUv = uv;\n        Hello_ShaderFrog1551692717683_383_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        return Hello_ShaderFrog1551692717683_383_gl_Position *= 1.0;\n    }\nvec4 Text_Only_Shader1556670324252_90_main() \n    {\n        vec4 Text_Only_Shader1556670324252_90_gl_Position = vec4(0.0);\n        Text_Only_Shader1556670324252_90_gl_Position = Hello_ShaderFrog1551692717683_383_main();\n        return Text_Only_Shader1556670324252_90_gl_Position *= 1.0;\n    }\nvoid main() \n    {\n        gl_Position = Text_Only_Shader1556670324252_90_main();    }\n",
        uniforms: {
            time: {
                type: "f",
                glslType: "float"
            },
            color: {
                value: {
                    r: .7176470588235294,
                    g: 0,
                    b: 0
                },
                type: "c",
                glslType: "vec3"
            },
            resolution: {
                value: {
                    x: "200",
                    y: "80"
                },
                type: "v2",
                glslType: "vec2"
            },
            background_color: {
                value: {
                    r: 0,
                    g: .8156862745098039,
                    b: 1
                },
                type: "c",
                glslType: "vec3"
            }
        },
        side: 2,
        url: "http://shaderfrog.com/app/view/3386",
        user: {
            username: "SirFizX",
            url: "http://shaderfrog.com/app/profile/andrewray"
        }
    }
      , g = {};
    g.Polkadot_Shader = n,
    g.Sun_Shader = i,
    g.Jelly_Shader = o,
    g.Green_Dance_Shader = a,
    g.Cosmic_Shader = r,
    g.Cool_Tiles_Shader = s,
    g.Disco_Shader = l,
    g.Marching_Ants_Shader = c,
    g.Goo_Shader = u,
    g.Psycho_Shader = v,
    g.Ova_Shader = m,
    g.Thruster_Shader = d,
    g.Flowing_Circles_Shader = p,
    g.Electric_Shader = f,
    g.CS1_Shader = h;
    var _ = e=>{
        function t() {}
        function n() {
            let e = arguments.length
              , t = arguments[0];
            if (e < 2)
                return t;
            for (let n = 1; n < e; n++) {
                let e = arguments[n]
                  , i = Object.keys(e || {})
                  , o = i.length;
                for (let n = 0; n < o; n++) {
                    let o = i[n];
                    t[o] = e[o]
                }
            }
            return t
        }
        function i(e) {
            return n({}, e)
        }
        function o(e, ...t) {
            let n, o, a = i(e);
            for (n = 0; o = t[n++]; )
                delete a[o];
            return a
        }
        e.shaderfrog = g;
        t.prototype = {
            mainCamera: null,
            cubeCameras: {},
            reserved: {
                time: null,
                cameraPosition: null
            },
            umap: {
                float: {
                    type: "f",
                    value: 0
                },
                int: {
                    type: "i",
                    value: 0
                },
                vec2: {
                    type: "v2",
                    value() {
                        return new THREE.Vector2
                    }
                },
                vec3: {
                    type: "v3",
                    value() {
                        return new THREE.Vector3
                    }
                },
                vec4: {
                    type: "v4",
                    value() {
                        return new THREE.Vector4
                    }
                },
                samplerCube: {
                    type: "t"
                },
                sampler2D: {
                    type: "t"
                }
            },
            getUmap(e) {
                let t = this.umap[e].value;
                return "function" == typeof t ? t() : t
            },
            registerCamera(e) {
                if (!(e instanceof THREE.Camera))
                    throw new Error("Cannot register a non-camera as a camera!");
                this.mainCamera = e
            },
            registerCubeCamera(e, t) {
                if (!t.renderTarget)
                    throw new Error("Cannot register a non-camera as a camera!");
                this.cubeCameras[e] = t
            },
            unregisterCamera(e) {
                if (e in this.cubeCameras)
                    delete this.cubeCameras[e];
                else {
                    if (e !== this.mainCamera)
                        throw new Error("You never registered camera " + e);
                    delete this.mainCamera
                }
            },
            updateSource(e, t, i) {
                if (i = i || "name",
                !this.shaderTypes[e])
                    throw new Error("Runtime Error: Cannot update shader " + e + " because it has not been added.");
                let a, r, s = this.add(e, t);
                for (r = 0; a = this.runningShaders[r++]; )
                    a[i] === e && (n(a.material, o(s, "id")),
                    a.material.needsUpdate = !0)
            },
            renameShader(e, t) {
                let n, i;
                if (!(e in this.shaderTypes))
                    throw new Error("Could not rename shader " + e + " to " + t + ". It does not exist.");
                for (this.shaderTypes[t] = this.shaderTypes[e],
                delete this.shaderTypes[e],
                n = 0; i = this.runningShaders[n++]; )
                    i.name === e && (i.name = t)
            },
            get(e) {
                let t = this.shaderTypes[e];
                return t.initted || this.create(e),
                t.material
            },
            add(e, t) {
                let o, a = i(t);
                a.fragmentShader = t.fragment,
                a.vertexShader = t.vertex,
                delete a.fragment,
                delete a.vertex;
                for (var r in a.uniforms)
                    null === (o = a.uniforms[r]).value && (a.uniforms[r].value = this.getUmap(o.glslType));
                return e in this.shaderTypes ? n(this.shaderTypes[e], a) : this.shaderTypes[e] = a,
                a
            },
            create(e) {
                let t = this.shaderTypes[e];
                return delete t.id,
                t.material = new THREE.RawShaderMaterial(t),
                this.runningShaders.push(t),
                t.init && t.init(t.material),
                t.material.needsUpdate = !0,
                t.initted = !0,
                t.material
            },
            updateRuntime(e, t, n) {
                n = n || "name";
                let i, o, a, r;
                for (o = 0; i = this.runningShaders[o++]; )
                    if (i[n] === e)
                        for (a in t.uniforms)
                            a in this.reserved || a in i.material.uniforms && ("t" === (r = t.uniforms[a]).type && "string" == typeof r.value && (r.value = this.cubeCameras[r.value].renderTarget),
                            i.material.uniforms[a].value = t.uniforms[a].value)
            },
            updateShaders(e, t) {
                let n, i;
                for (t = t || {},
                i = 0; n = this.runningShaders[i++]; ) {
                    for (let e in t.uniforms)
                        e in n.material.uniforms && (n.material.uniforms[e].value = t.uniforms[e]);
                    "cameraPosition"in n.material.uniforms && this.mainCamera && (n.material.uniforms.cameraPosition.value = this.mainCamera.position.clone()),
                    "viewMatrix"in n.material.uniforms && this.mainCamera && (n.material.uniforms.viewMatrix.value = this.mainCamera.matrixWorldInverse),
                    "time"in n.material.uniforms && (n.material.uniforms.time.value = e)
                }
            },
            shaderTypes: g,
            runningShaders: []
        };
        AFRAME.registerSystem("shader-frog", {
            init: function() {
                function e() {
                    var e = document.querySelector("a-scene").systems.camera;
                    e && e.sceneEl && e.sceneEl.camera && (e = e.sceneEl.camera,
                    n.frog_runtime.registerCamera(e))
                }
                this.frog_runtime = new t,
                this.clock = new THREE.Clock;
                var n = this
                  , i = document.querySelector("a-scene");
                i.hasLoaded ? e().bind(this) : i.addEventListener("loaded", e)
            },
            tick: function(e) {
                this.frog_runtime.updateShaders(this.clock.getElapsedTime())
            }
        });
        AFRAME.registerComponent("shader-frog", {
            schema: {
                name: {
                    type: "string"
                }
            },
            init: function() {
                this.originalMaterial = this.el.getObject3D("mesh").material,
                this.shaderData = g[this.data.name]
            },
            update: function() {
                this.system.frog_runtime.add(this.data.name, this.shaderData);
                var e = this.system.frog_runtime.get(this.data.name);
                this.el.getObject3D("mesh").material = e
            },
            remove: function() {
                this.el.getObject3D("mesh").material = this.originalMaterial
            }
        })
    }
    ;
    !function() {
        !function(e) {
            function t(i) {
                if (n[i])
                    return n[i].exports;
                var o = n[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return e[i].call(o.exports, o, o.exports, t),
                o.l = !0,
                o.exports
            }
            var n = {};
            t.m = e,
            t.c = n,
            t.i = function(e) {
                return e
            }
            ,
            t.d = function(e, n, i) {
                t.o(e, n) || Object.defineProperty(e, n, {
                    configurable: !1,
                    enumerable: !0,
                    get: i
                })
            }
            ,
            t.n = function(e) {
                var n = e && e.__esModule ? function() {
                    return e.default
                }
                : function() {
                    return e
                }
                ;
                return t.d(n, "a", n),
                n
            }
            ,
            t.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            ,
            t.p = "",
            t(t.s = 1)
        }([function(e, t) {
            THREE.BufferGeometryUtils = {
                computeTangents: function(e) {
                    function t(e) {
                        R.fromArray(r, 3 * e),
                        A.copy(R),
                        S = u[e],
                        M.copy(S),
                        M.sub(R.multiplyScalar(R.dot(S))).normalize(),
                        z.crossVectors(A, S),
                        P = z.dot(v[e]),
                        T = P < 0 ? -1 : 1,
                        c[4 * e] = M.x,
                        c[4 * e + 1] = M.y,
                        c[4 * e + 2] = M.z,
                        c[4 * e + 3] = T
                    }
                    var n = e.index
                      , i = e.attributes;
                    if (null === n || void 0 === i.position || void 0 === i.normal || void 0 === i.uv)
                        return void console.warn("THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
                    var o = n.array
                      , a = i.position.array
                      , r = i.normal.array
                      , s = i.uv.array
                      , l = a.length / 3;
                    void 0 === i.tangent && e.addAttribute("tangent", new THREE.BufferAttribute(new Float32Array(4 * l),4));
                    for (var c = i.tangent.array, u = [], v = [], m = 0; m < l; m++)
                        u[m] = new THREE.Vector3,
                        v[m] = new THREE.Vector3;
                    var d = new THREE.Vector3
                      , p = new THREE.Vector3
                      , f = new THREE.Vector3
                      , h = new THREE.Vector2
                      , g = new THREE.Vector2
                      , _ = new THREE.Vector2
                      , y = new THREE.Vector3
                      , x = new THREE.Vector3
                      , b = e.groups;
                    0 === b.length && (b = [{
                        start: 0,
                        count: o.length
                    }]);
                    for (var m = 0, C = b.length; m < C; ++m)
                        for (var E = D = (F = b[m]).start, w = D + (I = F.count); E < w; E += 3)
                            !function(e, t, n) {
                                d.fromArray(a, 3 * e),
                                p.fromArray(a, 3 * t),
                                f.fromArray(a, 3 * n),
                                h.fromArray(s, 2 * e),
                                g.fromArray(s, 2 * t),
                                _.fromArray(s, 2 * n);
                                var i = p.x - d.x
                                  , o = f.x - d.x
                                  , r = p.y - d.y
                                  , l = f.y - d.y
                                  , c = p.z - d.z
                                  , m = f.z - d.z
                                  , b = g.x - h.x
                                  , C = _.x - h.x
                                  , E = g.y - h.y
                                  , w = _.y - h.y
                                  , T = 1 / (b * w - C * E);
                                y.set((w * i - E * o) * T, (w * r - E * l) * T, (w * c - E * m) * T),
                                x.set((b * o - C * i) * T, (b * l - C * r) * T, (b * m - C * c) * T),
                                u[e].add(y),
                                u[t].add(y),
                                u[n].add(y),
                                v[e].add(x),
                                v[t].add(x),
                                v[n].add(x)
                            }(o[E + 0], o[E + 1], o[E + 2]);
                    for (var T, S, P, M = new THREE.Vector3, z = new THREE.Vector3, R = new THREE.Vector3, A = new THREE.Vector3, m = 0, C = b.length; m < C; ++m)
                        for (var F = b[m], D = F.start, I = F.count, E = D, w = D + I; E < w; E += 3)
                            t(o[E + 0]),
                            t(o[E + 1]),
                            t(o[E + 2])
                },
                mergeBufferGeometries: function(e, t) {
                    for (var n = null !== e[0].index, i = new Set(Object.keys(e[0].attributes)), o = new Set(Object.keys(e[0].morphAttributes)), a = {}, r = {}, s = new THREE.BufferGeometry, l = 0, c = 0; c < e.length; ++c) {
                        var u = e[c];
                        if (n !== (null !== u.index))
                            return null;
                        for (var v in u.attributes) {
                            if (!i.has(v))
                                return null;
                            void 0 === a[v] && (a[v] = []),
                            a[v].push(u.attributes[v])
                        }
                        for (var v in u.morphAttributes) {
                            if (!o.has(v))
                                return null;
                            void 0 === r[v] && (r[v] = []),
                            r[v].push(u.morphAttributes[v])
                        }
                        if (s.userData = s.userData || {},
                        s.userData.mergedUserData = s.userData.mergedUserData || [],
                        s.userData.mergedUserData.push(u.userData),
                        t) {
                            var m;
                            if (n)
                                m = u.index.count;
                            else {
                                if (void 0 === u.attributes.position)
                                    return null;
                                m = u.attributes.position.count
                            }
                            s.addGroup(l, m, c),
                            l += m
                        }
                    }
                    if (n) {
                        for (var d = 0, p = [], c = 0; c < e.length; ++c) {
                            for (var f = e[c].index, h = 0; h < f.count; ++h)
                                p.push(f.getX(h) + d);
                            d += e[c].attributes.position.count
                        }
                        s.setIndex(p)
                    }
                    for (var v in a) {
                        var g = this.mergeBufferAttributes(a[v]);
                        if (!g)
                            return null;
                        s.addAttribute(v, g)
                    }
                    for (var v in r) {
                        var _ = r[v][0].length;
                        if (0 === _)
                            break;
                        s.morphAttributes = s.morphAttributes || {},
                        s.morphAttributes[v] = [];
                        for (c = 0; c < _; ++c) {
                            for (var y = [], h = 0; h < r[v].length; ++h)
                                y.push(r[v][h][c]);
                            var x = this.mergeBufferAttributes(y);
                            if (!x)
                                return null;
                            s.morphAttributes[v].push(x)
                        }
                    }
                    return s
                },
                mergeBufferAttributes: function(e) {
                    for (var t, n, i, o = 0, a = 0; a < e.length; ++a) {
                        var r = e[a];
                        if (r.isInterleavedBufferAttribute)
                            return null;
                        if (void 0 === t && (t = r.array.constructor),
                        t !== r.array.constructor)
                            return null;
                        if (void 0 === n && (n = r.itemSize),
                        n !== r.itemSize)
                            return null;
                        if (void 0 === i && (i = r.normalized),
                        i !== r.normalized)
                            return null;
                        o += r.array.length
                    }
                    for (var s = new t(o), l = 0, a = 0; a < e.length; ++a)
                        s.set(e[a].array, l),
                        l += e[a].array.length;
                    return new THREE.BufferAttribute(s,n,i)
                }
            }
        }
        , function(e, t, n) {
            function i(e, t, n, i, o) {
                const r = t.attributes.position.array
                  , s = e * a;
                c.vertices[0].set(n[s + 0], n[s + 1], n[s + 2]),
                c.vertices[1].set(n[s + 3], n[s + 4], n[s + 5]),
                c.vertices[2].set(n[s + 6], n[s + 7], n[s + 8]),
                o && (c.rotateX(o.x),
                c.rotateY(o.y),
                c.rotateZ(o.z)),
                c.vertices[0].add(i),
                c.vertices[1].add(i),
                c.vertices[2].add(i),
                r[s + 0] = c.vertices[0].x,
                r[s + 1] = c.vertices[0].y,
                r[s + 2] = c.vertices[0].z,
                r[s + 3] = c.vertices[1].x,
                r[s + 4] = c.vertices[1].y,
                r[s + 5] = c.vertices[1].z,
                r[s + 6] = c.vertices[2].x,
                r[s + 7] = c.vertices[2].y,
                r[s + 8] = c.vertices[2].z,
                c.vertices[0].set(n[s + 3], n[s + 4], n[s + 5]),
                c.vertices[1].set(n[s + 6], n[s + 7], n[s + 8]),
                c.vertices[2].set(n[s + 9], n[s + 10], n[s + 11]),
                o && (c.rotateX(o.x),
                c.rotateY(o.y),
                c.rotateZ(o.z)),
                c.vertices[0].add(i),
                c.vertices[1].add(i),
                c.vertices[2].add(i),
                r[s + 9] = c.vertices[2].x,
                r[s + 10] = c.vertices[2].y,
                r[s + 11] = c.vertices[2].z,
                t.attributes.position.needsUpdate = !0
            }
            function o(e, t) {
                e.length = 0;
                for (let n = 0; n < t.length; n++)
                    e[n] = t[n]
            }
            if (n(0),
            "undefined" == typeof AFRAME)
                throw new Error("Component attempted to register before AFRAME was available.");
            const a = 12
              , r = {
                normal: THREE.NormalBlending,
                additive: THREE.AdditiveBlending,
                substractive: THREE.SubstractiveBlending,
                multiply: THREE.MultiplyBlending
            }
              , s = {
                flat: THREE.MeshBasicMaterial,
                lambert: THREE.MeshLambertMaterial,
                phong: THREE.MeshPhongMaterial,
                standard: THREE.MeshStandardMaterial
            }
              , l = new THREE.Vector3(-99999,-99999,-99999);
            AFRAME.registerComponent("particleplayer", {
                schema: {
                    blending: {
                        default: "additive",
                        oneOf: ["normal", "additive", "multiply", "substractive"]
                    },
                    color: {
                        default: "#fff",
                        type: "color"
                    },
                    count: {
                        default: "100%"
                    },
                    delay: {
                        default: 0,
                        type: "int"
                    },
                    dur: {
                        default: 1e3,
                        type: "int"
                    },
                    img: {
                        type: "selector"
                    },
                    interpolate: {
                        default: !1
                    },
                    loop: {
                        default: "false"
                    },
                    on: {
                        default: "play"
                    },
                    poolSize: {
                        default: 5,
                        type: "int"
                    },
                    protation: {
                        type: "vec3"
                    },
                    pscale: {
                        default: 1,
                        type: "float"
                    },
                    scale: {
                        default: 1,
                        type: "float"
                    },
                    shader: {
                        default: "flat",
                        oneOf: ["flat", "lambert", "phong", "standard"]
                    },
                    src: {
                        type: "string",
                        default: "energy"
                    }
                },
                multiple: !0,
                init: function() {
                    this.frame = 0,
                    this.framedata = null,
                    this.indexPool = null,
                    this.lastFrame = 0,
                    this.material = null,
                    this.msPerFrame = 0,
                    this.numFrames = 0,
                    this.numParticles = 0,
                    this.originalVertexPositions = [],
                    this.particleCount = 0,
                    this.particleSystems = [],
                    this.protation = !1,
                    this.restPositions = [],
                    this.restRotations = [],
                    this.sprite_rotation = !1,
                    this.systems = null,
                    this.useRotation = !1,
                    this.src = CS1.particles[this.data.src]
                },
                update: function(e) {
                    const t = this.data;
                    if (t.src) {
                        e.on !== t.on && (e.on && this.el.removeEventListener(e.on, this.start),
                        "play" !== t.on && this.el.addEventListener(t.on, this.start.bind(this))),
                        this.loadParticlesJSON(this.src, t.scale),
                        this.numFrames = this.framedata.length,
                        this.numParticles = this.numFrames > 0 ? this.framedata[0].length : 0,
                        "%" === t.count[t.count.length - 1] ? this.particleCount = Math.floor(parseInt(t.count) * this.numParticles / 100) : this.particleCount = parseInt(t.count),
                        this.particleCount = Math.min(this.numParticles, Math.max(0, this.particleCount)),
                        this.msPerFrame = t.dur / this.numFrames,
                        this.indexPool = new Array(this.numParticles);
                        const n = {
                            color: new THREE.Color(t.color),
                            side: THREE.DoubleSide,
                            blending: r[t.blending],
                            map: t.img ? (new THREE.TextureLoader).load(t.img.src) : null,
                            depthWrite: !1,
                            opacity: t.opacity,
                            transparent: !!t.img || "normal" !== t.blending || t.opacity < 1
                        };
                        void 0 !== s[t.shader] ? this.material = new s[t.shader](n) : this.material = new s.flat(n),
                        this.createParticles(t.poolSize),
                        "init" === t.on && this.start()
                    }
                },
                loadParticlesJSON: function(e, t) {
                    var n;
                    this.restPositions.length = 0,
                    this.restRotations.length = 0;
                    const i = e
                      , o = i.frames
                      , a = i.precision;
                    this.useRotation = i.rotation,
                    !1 !== i.sprite_rotation ? this.sprite_rotation = {
                        x: i.sprite_rotation[0] / a,
                        y: i.sprite_rotation[1] / a,
                        z: i.sprite_rotation[2] / a
                    } : this.sprite_rotation = !1,
                    this.framedata = new Array(o.length);
                    for (let e = 0; e < o.length; e++) {
                        this.framedata[e] = new Array(o[e].length);
                        for (let r = 0; r < o[e].length; r++) {
                            let s = o[e][r];
                            n = 0 !== s;
                            let l = this.framedata[e][r] = {
                                position: n ? {
                                    x: s[0] / a * t,
                                    y: s[1] / a * t,
                                    z: s[2] / a * t
                                } : null,
                                alive: n
                            };
                            i.rotation && (l.rotation = n ? {
                                x: s[3] / a,
                                y: s[4] / a,
                                z: s[5] / a
                            } : null),
                            n && 0 === e && (this.restPositions[r] = l.position ? {
                                x: l.position.y,
                                y: l.position.y,
                                z: l.position.z
                            } : null,
                            this.restRotations[r] = l.rotation ? {
                                x: l.rotation.y,
                                y: l.rotation.y,
                                z: l.rotation.z
                            } : null)
                        }
                    }
                },
                createParticles: function() {
                    const e = [];
                    return function(t) {
                        const n = this.data;
                        var i = parseInt(this.data.loop);
                        this.particleSystems.length = 0,
                        isNaN(i) && (i = "true" === this.data.loop ? Number.MAX_VALUE : 0);
                        for (let a = 0; a < t; a++) {
                            let t = {
                                active: !1,
                                activeParticleIndices: new Array(this.particleCount),
                                loopCount: 0,
                                loopTotal: i,
                                mesh: null,
                                time: 0
                            };
                            const r = n.img ? n.img.width / n.img.height : 1;
                            e.length = 0;
                            for (let t = 0; t < this.numParticles; t++) {
                                let t = new THREE.PlaneBufferGeometry(.1 * r * n.pscale,.1 * n.pscale);
                                !1 !== this.sprite_rotation ? (t.rotateX(this.sprite_rotation.x),
                                t.rotateY(this.sprite_rotation.y),
                                t.rotateZ(this.sprite_rotation.z)) : (t.rotateX(this.data.protation.x * Math.PI / 180),
                                t.rotateY(this.data.protation.y * Math.PI / 180),
                                t.rotateZ(this.data.protation.z * Math.PI / 180)),
                                e.push(t)
                            }
                            let s = THREE.BufferGeometryUtils.mergeBufferGeometries(e);
                            t.mesh = new THREE.Mesh(s,this.material),
                            t.mesh.visible = !1,
                            this.el.setObject3D(`particleplayer${a}`, t.mesh),
                            o(this.originalVertexPositions, s.attributes.position.array);
                            for (let e = 0; e < s.attributes.position.array.length; e++)
                                s.attributes.position.array[e] = -99999;
                            for (let e = 0; e < t.activeParticleIndices.length; e++)
                                t.activeParticleIndices[e] = e;
                            this.particleSystems.push(t)
                        }
                    }
                }(),
                start: function(e) {
                    this.data.delay > 0 ? setTimeout(()=>this.startAfterDelay(e), this.data.delay) : this.startAfterDelay(e)
                },
                startAfterDelay: function(e) {
                    var t, n = -1, i = 0, o = e ? e.detail.position : null, a = e ? e.detail.rotation : null;
                    o instanceof THREE.Vector3 || (o = new THREE.Vector3),
                    a instanceof THREE.Euler || (a = new THREE.Euler);
                    for (var r = 0; r < this.particleSystems.length; r++) {
                        if (!1 === this.particleSystems[r].active) {
                            n = r;
                            break
                        }
                        this.particleSystems[r].time > i && (n = r,
                        i = this.particleSystems[r].time)
                    }
                    (t = this.particleSystems[n]).active = !0,
                    t.loopCount = 1,
                    t.mesh.visible = !0,
                    t.mesh.position.copy(o),
                    t.mesh.rotation.copy(a),
                    t.time = 0,
                    this.resetParticles(t)
                },
                doLoop: function(e) {
                    e.loopCount++,
                    e.frame = -1,
                    e.time = 0,
                    this.resetParticles(e)
                },
                resetParticle: function(e, t) {
                    const n = e.mesh.geometry;
                    this.restPositions[t] ? i(t, n, this.originalVertexPositions, this.restPositions[t], this.useRotation && this.restRotations[t]) : i(t, n, this.originalVertexPositions, l)
                },
                resetParticles: function(e) {
                    var t, n;
                    if (this.particleCount !== this.numParticles) {
                        const o = e.mesh.geometry;
                        for (t = 0; t < this.numParticles; t++)
                            t < this.particleCount && i(e.activeParticleIndices[t], o, this.originalVertexPositions, l),
                            this.indexPool[t] = t;
                        for (t = 0; t < this.particleCount; t++)
                            n = t + Math.floor(Math.random() * (this.numParticles - t)),
                            e.activeParticleIndices[t] = this.indexPool[n],
                            this.indexPool[n] = this.indexPool[t],
                            this.resetParticle(e, e.activeParticleIndices[t])
                    } else
                        for (t = 0; t < this.numParticles; t++)
                            this.resetParticle(e, t)
                },
                tick: function() {
                    const e = new THREE.Vector3;
                    return function(t, n) {
                        var o, a, r, s, c, u = this.useRotation;
                        for (let t = 0; t < this.particleSystems.length; t++) {
                            let v = this.particleSystems[t];
                            if (v.active) {
                                c = this.data.interpolate && this.data.dur / this.numFrames > n,
                                o = v.time / this.data.dur * this.numFrames,
                                a = this.framedata[Math.floor(o)],
                                c && (s = o - Math.floor(o),
                                r = o < this.numFrames - 1 ? this.framedata[Math.floor(o) + 1] : null);
                                for (let t = 0; t < v.activeParticleIndices.length; t++) {
                                    let n = v.activeParticleIndices[t]
                                      , o = u && a[n].rotation;
                                    a[n].alive ? c && r && r[n].alive ? (e.lerpVectors(a[n].position, r[n].position, s),
                                    i(n, v.mesh.geometry, this.originalVertexPositions, e, o)) : i(n, v.mesh.geometry, this.originalVertexPositions, a[n].position, o) : i(n, v.mesh.geometry, this.originalVertexPositions, l)
                                }
                                v.time += n,
                                v.time >= this.data.dur && (v.loopCount < v.loopTotal ? (this.el.emit("particleplayerloop", null, !1),
                                this.doLoop(v)) : (this.el.emit("particleplayerfinished", null, !1),
                                v.active = !1,
                                v.mesh.visible = !1))
                            }
                        }
                    }
                }(),
                _transformPlane: i
            });
            const c = function() {
                const e = new THREE.Geometry;
                return e.vertices.push(new THREE.Vector3),
                e.vertices.push(new THREE.Vector3),
                e.vertices.push(new THREE.Vector3),
                e.faces.push(new THREE.Face3(0,1,2)),
                e
            }();
            e.exports.transformPlane = i
        }
        ])
    }();
    var y = {
        sprite_rotation: !1,
        precision: 1e3,
        velocity: !1,
        frames: [[[-559, 313, 30], [-414, 317, -500], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-560, 320, 32], [-416, 322, -502], [24, 507, -39], [-268, 568, 78], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-561, 326, 35], [-418, 327, -504], [27, 511, -38], [-268, 572, 80], [3, 559, 173], [565, 285, -128], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-562, 333, 37], [-420, 332, -505], [29, 516, -38], [-269, 575, 83], [1, 566, 175], [564, 289, -131], [-557, 308, 28], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-563, 339, 39], [-422, 337, -507], [32, 520, -38], [-270, 579, 85], [0, 574, 176], [563, 294, -133], [-554, 312, 29], [-5, 320, -172], [-36, 504, 26], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-565, 346, 41], [-424, 342, -509], [35, 525, -38], [-270, 582, 87], [-1, 581, 177], [562, 299, -136], [-551, 317, 30], [-6, 326, -170], [-38, 510, 24], [-556, 133, 28], [405, 220, -227], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-566, 353, 43], [-426, 347, -511], [37, 529, -37], [-271, 586, 89], [-2, 589, 178], [561, 304, -138], [-549, 321, 30], [-7, 333, -167], [-40, 515, 22], [-553, 138, 27], [407, 223, -227], [-171, 353, 404], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-567, 359, 45], [-428, 352, -513], [40, 534, -37], [-272, 589, 91], [-3, 596, 180], [560, 309, -141], [-546, 325, 31], [-8, 340, -165], [-42, 521, 20], [-551, 143, 26], [410, 227, -227], [-172, 359, 406], [609, 330, -232], [3, 316, 173], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-568, 366, 47], [-430, 357, -515], [43, 538, -37], [-272, 593, 93], [-4, 604, 181], [559, 313, -144], [-544, 329, 32], [-8, 346, -163], [-44, 527, 18], [-548, 148, 25], [412, 231, -227], [-172, 366, 408], [608, 333, -233], [4, 321, 176], [1, 506, 43], [-504, 505, -240], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-569, 372, 50], [-431, 362, -517], [46, 543, -36], [-273, 597, 95], [-5, 611, 182], [558, 318, -146], [-541, 334, 32], [-9, 353, -161], [-46, 532, 16], [-545, 154, 24], [414, 234, -226], [-172, 373, 411], [607, 336, -234], [5, 327, 178], [-2, 513, 42], [-503, 511, -242], [70, 83, -159], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-570, 379, 52], [-433, 367, -519], [48, 548, -36], [-274, 600, 98], [-6, 619, 184], [557, 323, -149], [-539, 338, 33], [-10, 360, -158], [-48, 538, 14], [-543, 159, 23], [417, 238, -226], [-172, 379, 413], [606, 338, -235], [5, 333, 181], [-4, 519, 42], [-501, 517, -245], [71, 90, -160], [-188, 508, -263], [-625, 308, 270], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-572, 385, 54], [-435, 372, -521], [51, 552, -36], [-274, 604, 100], [-7, 626, 185], [556, 328, -151], [-536, 342, 33], [-11, 366, -156], [-50, 544, 13], [-540, 164, 22], [419, 242, -226], [-172, 386, 415], [605, 341, -236], [6, 339, 184], [-7, 525, 41], [-500, 523, -247], [73, 97, -162], [-188, 514, -266], [-623, 313, 268], [-59, 318, 644], [170, 431, -404], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-573, 392, 56], [-437, 377, -523], [54, 557, -35], [-275, 607, 102], [-8, 633, 186], [555, 332, -154], [-534, 346, 34], [-12, 373, -154], [-52, 549, 11], [-538, 169, 21], [421, 246, -226], [-172, 393, 418], [604, 344, -237], [6, 345, 186], [-9, 531, 40], [-498, 529, -249], [75, 105, -163], [-187, 521, -268], [-621, 318, 267], [-57, 323, 644], [170, 433, -404], [-504, 507, -239], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-574, 399, 58], [-439, 382, -525], [56, 561, -35], [-276, 611, 104], [-9, 641, 187], [554, 337, -157], [-531, 350, 35], [-13, 379, -152], [-54, 555, 9], [-535, 174, 20], [424, 249, -226], [-173, 399, 420], [603, 346, -238], [7, 350, 189], [-12, 537, 39], [-497, 535, -251], [76, 112, -164], [-186, 527, -271], [-618, 323, 265], [-54, 328, 645], [169, 435, -404], [-504, 514, -237], [286, 224, -367], [-171, 351, 402], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-575, 405, 60], [-441, 387, -527], [59, 566, -35], [-276, 614, 106], [-10, 648, 189], [553, 342, -159], [-529, 355, 35], [-14, 386, -149], [-56, 561, 7], [-532, 179, 19], [426, 253, -226], [-173, 406, 423], [602, 349, -238], [8, 356, 192], [-14, 543, 38], [-495, 541, -253], [78, 119, -165], [-185, 533, -273], [-616, 328, 263], [-51, 333, 645], [169, 438, -404], [-504, 521, -234], [284, 230, -368], [-169, 357, 401], [-475, 309, -448], [3, 315, 173], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-576, 412, 62], [-443, 392, -529], [62, 570, -35], [-277, 618, 108], [-11, 656, 190], [553, 347, -162], [-526, 359, 36], [-15, 393, -147], [-58, 566, 5], [-530, 185, 18], [428, 257, -226], [-173, 413, 425], [601, 352, -239], [8, 362, 194], [-17, 549, 37], [-494, 548, -255], [79, 126, -166], [-184, 540, -276], [-614, 333, 262], [-48, 339, 645], [168, 440, -404], [-504, 527, -232], [282, 236, -370], [-166, 363, 400], [-473, 313, -450], [5, 320, 175], [2, 206, 437], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-577, 418, 65], [-445, 397, -531], [65, 575, -34], [-278, 621, 111], [-12, 663, 191], [552, 352, -164], [-523, 363, 36], [-16, 399, -145], [-60, 572, 3], [-527, 190, 17], [431, 260, -225], [-173, 419, 427], [600, 355, -240], [9, 368, 197], [-19, 555, 36], [-492, 554, -258], [81, 134, -167], [-184, 546, -278], [-612, 338, 260], [-46, 344, 646], [168, 443, -404], [-504, 534, -230], [280, 242, -372], [-164, 369, 399], [-471, 317, -452], [7, 326, 177], [0, 213, 436], [-213, 573, -181], [227, 221, 405], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-579, 425, 67], [-447, 403, -533], [67, 580, -34], [-278, 625, 113], [-13, 671, 193], [551, 356, -167], [-521, 367, 37], [-17, 406, -143], [-62, 577, 1], [-524, 195, 16], [433, 264, -225], [-173, 426, 430], [599, 357, -241], [10, 374, 200], [-22, 561, 35], [-491, 560, -260], [83, 141, -168], [-183, 552, -281], [-609, 343, 258], [-43, 349, 646], [167, 445, -404], [-504, 541, -227], [278, 248, -374], [-161, 375, 397], [-469, 320, -453], [8, 332, 179], [-3, 219, 435], [-212, 579, -183], [229, 227, 403], [-170, 352, 402], [-504, 328, -240], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-580, 431, 69], [-449, 408, -535], [70, 584, -34], [-279, 628, 115], [-14, 678, 194], [550, 361, -170], [-518, 371, 38], [-17, 412, -140], [-64, 583, -1], [-522, 200, 15], [436, 268, -225], [-173, 433, 432], [598, 360, -242], [10, 380, 202], [-24, 567, 34], [-489, 566, -262], [84, 148, -169], [-182, 559, -283], [-607, 348, 257], [-40, 354, 647], [166, 448, -404], [-504, 547, -225], [276, 254, -376], [-159, 381, 396], [-467, 324, -455], [10, 337, 181], [-5, 226, 435], [-211, 585, -186], [231, 232, 402], [-169, 355, 401], [-503, 333, -238], [-71, 323, 158], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, [-451, 413, -537], [73, 589, -33], [-279, 632, 117], [-15, 686, 195], [549, 366, -172], [-516, 376, 38], [-18, 419, -138], [-66, 589, -3], [-519, 205, 14], [438, 271, -225], [-173, 439, 434], [597, 363, -243], [11, 385, 205], [-27, 573, 33], [-488, 572, -264], [86, 155, -170], [-181, 565, -285], [-605, 353, 255], [-37, 360, 647], [166, 450, -404], [-504, 554, -223], [274, 260, -378], [-157, 387, 395], [-466, 328, -457], [12, 343, 183], [-7, 232, 434], [-210, 591, -188], [234, 238, 400], [-167, 359, 400], [-502, 337, -235], [-73, 330, 159], [28, 506, -36], [213, 568, 178], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, [75, 593, -33], [-280, 635, 119], [-16, 693, 196], [548, 371, -175], [-513, 380, 39], [-19, 426, -136], [-67, 594, -5], [-517, 210, 13], [440, 275, -225], [-174, 446, 437], [597, 366, -244], [12, 391, 208], [-29, 579, 33], [-486, 578, -266], [87, 163, -171], [-180, 571, -288], [-602, 358, 253], [-35, 365, 648], [165, 453, -405], [-504, 561, -220], [272, 265, -380], [-154, 393, 393], [-464, 332, -458], [14, 348, 186], [-10, 239, 433], [-209, 597, -191], [236, 244, 399], [-165, 362, 398], [-501, 342, -233], [-75, 337, 160], [28, 510, -38], [215, 572, 180], [2, 558, 174], [170, 350, -404], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, [-17, 701, 198], [547, 376, -177], [-511, 384, 40], [-20, 432, -134], [-69, 600, -7], [-514, 216, 12], [443, 279, -225], [-174, 453, 439], [596, 368, -245], [12, 397, 210], [-32, 585, 32], [-485, 584, -268], [89, 170, -172], [-179, 578, -290], [-600, 363, 252], [-32, 370, 648], [165, 455, -405], [-504, 567, -218], [270, 271, -382], [-152, 399, 392], [-462, 336, -460], [15, 354, 188], [-12, 245, 432], [-208, 603, -193], [238, 250, 398], [-163, 365, 397], [-500, 346, -230], [-77, 344, 161], [27, 514, -40], [217, 575, 181], [1, 563, 176], [168, 354, -404], [633, 309, 251], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, [-508, 388, 40], [-21, 439, -131], [-71, 606, -9], [-511, 221, 11], [445, 282, -224], [-174, 459, 442], [595, 371, -246], [13, 403, 213], [-34, 591, 31], [-483, 590, -271], [90, 177, -173], [-179, 584, -293], [-598, 368, 250], [-29, 375, 648], [164, 458, -405], [-504, 574, -215], [268, 277, -384], [-150, 405, 391], [-460, 340, -461], [17, 360, 190], [-15, 252, 431], [-207, 609, -196], [241, 256, 396], [-161, 369, 396], [-499, 351, -227], [-79, 351, 161], [26, 517, -43], [218, 579, 183], [0, 569, 179], [166, 358, -405], [634, 316, 253], [-515, 320, 89], [682, 432, 48], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, [-22, 446, -129], [-73, 611, -11], [-509, 226, 10], [447, 286, -224], [-174, 466, 444], [594, 374, -247], [13, 409, 216], [-37, 597, 30], [-482, 597, -273], [92, 184, -174], [-178, 590, -295], [-596, 373, 249], [-26, 381, 649], [164, 460, -405], [-504, 581, -213], [266, 283, -385], [-147, 411, 389], [-458, 344, -463], [19, 365, 192], [-17, 258, 431], [-206, 615, -198], [243, 261, 395], [-160, 372, 395], [-498, 356, -225], [-81, 358, 162], [26, 521, -45], [220, 582, 184], [-1, 575, 181], [163, 362, -406], [635, 323, 255], [-517, 326, 87], [684, 437, 46], [611, 507, -231], [-281, 80, 439], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, [-506, 231, 9], [450, 290, -224], [-174, 473, 446], [593, 377, -248], [14, 414, 218], [-39, 603, 29], [-480, 603, -275], [94, 192, -176], [-177, 597, -298], [-593, 378, 247], [-24, 386, 649], [163, 463, -405], [-503, 587, -211], [264, 289, -387], [-145, 417, 388], [-457, 348, -465], [20, 371, 194], [-19, 264, 430], [-205, 622, -201], [245, 267, 393], [-158, 375, 394], [-497, 360, -222], [-83, 365, 163], [25, 525, -48], [221, 585, 186], [-3, 580, 184], [161, 366, -407], [636, 330, 257], [-519, 332, 85], [686, 442, 44], [614, 512, -232], [-281, 88, 440], [-4, 286, -439], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-174, 479, 449], [592, 379, -249], [15, 420, 221], [-42, 609, 28], [-479, 609, -277], [95, 199, -177], [-176, 603, -300], [-591, 383, 245], [-21, 391, 650], [163, 465, -405], [-503, 594, -208], [262, 295, -389], [-142, 422, 387], [-455, 352, -466], [22, 377, 196], [-22, 271, 429], [-204, 628, -203], [248, 273, 392], [-156, 379, 393], [-496, 365, -220], [-85, 372, 164], [25, 529, -50], [223, 589, 187], [-4, 586, 186], [158, 370, -407], [637, 336, 260], [-520, 338, 84], [688, 448, 42], [617, 517, -232], [-280, 96, 441], [-5, 290, -442], [-278, 573, -295], [-70, 321, 158], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [591, 382, -250], [15, 426, 224], [-44, 615, 27], [-477, 615, -279], [97, 206, -178], [-175, 609, -302], [-589, 388, 244], [-18, 396, 650], [162, 467, -405], [-503, 601, -206], [260, 301, -391], [-140, 428, 386], [-453, 355, -468], [24, 382, 198], [-24, 277, 428], [-203, 634, -205], [250, 279, 391], [-154, 382, 392], [-495, 369, -217], [-87, 379, 164], [24, 533, -52], [225, 592, 189], [-5, 592, 189], [156, 374, -408], [637, 343, 262], [-522, 345, 82], [690, 453, 40], [620, 522, -232], [-280, 103, 442], [-5, 294, -444], [-276, 579, -294], [-72, 325, 155], [4, 206, 438], [-447, 130, 475], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-47, 621, 26], [-476, 621, -282], [98, 213, -179], [-175, 616, -305], [-587, 393, 242], [-15, 402, 651], [161, 470, -405], [-503, 607, -204], [258, 306, -393], [-138, 434, 384], [-451, 359, -470], [26, 388, 201], [-26, 284, 427], [-202, 640, -208], [252, 285, 389], [-153, 386, 390], [-494, 374, -215], [-89, 385, 165], [23, 536, -55], [226, 596, 190], [-7, 597, 191], [153, 378, -409], [638, 350, 264], [-524, 351, 80], [692, 458, 38], [622, 527, -233], [-279, 111, 443], [-6, 298, -447], [-274, 586, -292], [-74, 329, 153], [6, 210, 439], [-448, 134, 477], [-500, 556, 413], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [100, 220, -180], [-174, 622, -307], [-584, 398, 240], [-12, 407, 651], [161, 472, -405], [-503, 614, -201], [257, 312, -395], [-135, 440, 383], [-449, 363, -471], [27, 394, 203], [-29, 290, 427], [-201, 646, -210], [255, 290, 388], [-151, 389, 389], [-493, 379, -212], [-91, 392, 166], [23, 540, -57], [228, 599, 192], [-8, 603, 194], [151, 382, -409], [639, 357, 266], [-525, 357, 78], [694, 464, 36], [625, 532, -233], [-279, 119, 443], [-7, 302, -449], [-272, 592, -291], [-75, 334, 151], [8, 213, 441], [-449, 138, 480], [-502, 561, 414], [-335, 353, 571], [503, 329, 240], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-173, 628, -310], [-582, 403, 239], [-10, 412, 651], [160, 475, -406], [-503, 621, -199], [255, 318, -397], [-133, 446, 382], [-447, 367, -473], [29, 399, 205], [-31, 297, 426], [-200, 652, -213], [257, 296, 386], [-149, 392, 388], [-492, 383, -210], [-93, 399, 166], [22, 544, -59], [229, 603, 193], [-9, 609, 196], [149, 386, -410], [640, 363, 268], [-527, 364, 76], [696, 469, 35], [628, 536, -233], [-278, 127, 444], [-7, 306, -452], [-270, 599, -289], [-77, 338, 149], [10, 217, 442], [-451, 142, 482], [-504, 565, 416], [-337, 357, 572], [502, 336, 242], [-407, 223, 205], [5, 503, -45], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-7, 417, 652], [160, 477, -406], [-503, 627, -196], [253, 324, -399], [-131, 452, 380], [-446, 371, -475], [31, 405, 207], [-34, 303, 425], [-199, 658, -215], [259, 302, 385], [-147, 396, 387], [-491, 388, -207], [-95, 406, 167], [21, 548, -62], [231, 606, 195], [-10, 614, 198], [146, 390, -411], [641, 370, 270], [-529, 370, 74], [698, 474, 33], [631, 541, -234], [-278, 135, 445], [-8, 311, -454], [-268, 605, -288], [-78, 342, 147], [12, 220, 443], [-452, 146, 484], [-506, 569, 417], [-339, 360, 574], [500, 343, 244], [-409, 228, 203], [8, 508, -44], [502, 507, 240], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-503, 634, -194], [251, 330, -401], [-128, 458, 379], [-444, 375, -476], [32, 411, 209], [-36, 310, 424], [-198, 665, -218], [262, 308, 383], [-146, 399, 386], [-490, 392, -205], [-97, 413, 168], [21, 552, -64], [232, 609, 196], [-12, 620, 201], [144, 394, -412], [642, 377, 273], [-531, 376, 72], [700, 480, 31], [633, 546, -234], [-277, 142, 446], [-8, 315, -457], [-266, 612, -287], [-80, 347, 145], [14, 224, 444], [-453, 151, 487], [-508, 574, 419], [-341, 364, 575], [499, 349, 246], [-410, 233, 201], [11, 513, -44], [501, 514, 241], [-5, 557, -175], [-4, 285, -438], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [249, 336, -403], [-126, 464, 378], [-442, 379, -478], [34, 416, 211], [-38, 316, 423], [-197, 671, -220], [264, 313, 382], [-144, 402, 385], [-489, 397, -202], [-99, 420, 169], [20, 556, -66], [234, 613, 197], [-13, 626, 203], [141, 398, -412], [642, 384, 275], [-532, 383, 70], [702, 485, 29], [636, 551, -234], [-277, 150, 447], [-9, 319, -459], [-264, 618, -285], [-81, 351, 142], [16, 227, 446], [-454, 155, 489], [-511, 578, 420], [-343, 368, 577], [498, 356, 248], [-412, 238, 199], [14, 518, -43], [499, 520, 243], [-7, 561, -177], [-3, 288, -437], [-280, 570, -295], [643, 315, 60], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-440, 383, -480], [36, 422, 214], [-41, 323, 423], [-196, 677, -223], [266, 319, 381], [-142, 406, 383], [-488, 402, -199], [-101, 427, 169], [20, 559, -69], [236, 616, 199], [-14, 632, 206], [139, 402, -413], [643, 390, 277], [-534, 389, 68], [704, 490, 27], [639, 556, -235], [-276, 158, 448], [-9, 323, -462], [-262, 625, -284], [-83, 355, 140], [18, 231, 447], [-455, 159, 491], [-513, 583, 422], [-345, 371, 578], [497, 363, 250], [-414, 242, 197], [16, 523, -43], [497, 527, 244], [-8, 565, -179], [-2, 291, -436], [-281, 574, -292], [641, 320, 62], [-172, 432, 402], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-43, 329, 422], [-195, 683, -225], [269, 325, 379], [-140, 409, 382], [-487, 406, -197], [-103, 434, 170], [19, 563, -71], [237, 620, 200], [-16, 637, 208], [137, 406, -414], [644, 397, 279], [-536, 395, 66], [707, 496, 25], [642, 560, -235], [-276, 166, 449], [-10, 327, -464], [-260, 631, -282], [-84, 360, 138], [19, 235, 448], [-456, 163, 494], [-515, 587, 424], [-347, 375, 580], [495, 369, 252], [-416, 247, 194], [19, 528, -42], [495, 534, 246], [-9, 569, -181], [-1, 293, -435], [-281, 578, -290], [639, 326, 63], [-174, 435, 401], [557, 133, -27], [3, 556, 173], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-194, 689, -227], [271, 331, 378], [-139, 412, 381], [-486, 411, -194], [-105, 441, 171], [18, 567, -73], [239, 623, 202], [-17, 643, 211], [134, 410, -415], [645, 404, 281], [-537, 402, 64], [709, 501, 23], [644, 565, -235], [-275, 174, 450], [-11, 331, -467], [-258, 638, -281], [-86, 364, 136], [21, 238, 449], [-457, 167, 496], [-517, 592, 425], [-349, 379, 581], [494, 376, 254], [-418, 252, 192], [22, 533, -41], [493, 540, 247], [-11, 573, -183], [0, 296, -434], [-282, 583, -287], [636, 331, 65], [-176, 439, 400], [558, 136, -25], [1, 562, 175], [-5, 287, -440], [557, 307, -29], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-137, 416, 380], [-485, 415, -192], [-108, 448, 172], [18, 571, -76], [240, 626, 203], [-18, 649, 213], [132, 414, -415], [646, 411, 283], [-539, 408, 62], [711, 506, 21], [647, 570, -236], [-275, 181, 451], [-11, 335, -469], [-256, 644, -279], [-87, 368, 134], [23, 242, 450], [-458, 171, 498], [-519, 596, 427], [-350, 383, 582], [493, 382, 256], [-420, 257, 190], [24, 537, -41], [491, 547, 249], [-12, 576, -185], [1, 299, -433], [-283, 587, -285], [634, 337, 66], [-178, 442, 399], [559, 140, -23], [-1, 569, 177], [-7, 291, -442], [559, 311, -28], [-439, 222, 124], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-110, 455, 172], [17, 575, -78], [242, 630, 205], [-19, 654, 216], [129, 418, -416], [647, 417, 286], [-541, 414, 60], [713, 512, 20], [650, 575, -236], [-274, 189, 452], [-12, 339, -472], [-254, 651, -278], [-89, 372, 132], [25, 245, 452], [-460, 175, 501], [-522, 601, 428], [-352, 386, 584], [492, 389, 258], [-422, 262, 188], [27, 542, -40], [489, 554, 250], [-13, 580, -187], [2, 302, -432], [-283, 591, -282], [632, 343, 68], [-180, 446, 398], [559, 144, -21], [-2, 575, 178], [-8, 295, -443], [561, 315, -26], [-441, 226, 126], [1, 208, 438], [556, 130, -29], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [16, 578, -80], [244, 633, 206], [-21, 660, 218], [127, 422, -417], [648, 424, 288], [-543, 420, 59], [715, 517, 18], [653, 580, -236], [-274, 197, 453], [-12, 343, -474], [-252, 657, -276], [-91, 377, 130], [27, 249, 453], [-461, 180, 503], [-524, 605, 430], [-354, 390, 585], [490, 396, 260], [-423, 267, 186], [30, 547, -40], [487, 560, 252], [-15, 584, -189], [3, 305, -431], [-284, 595, -280], [629, 348, 69], [-182, 449, 398], [560, 148, -18], [-4, 582, 180], [-10, 300, -445], [563, 319, -24], [-443, 231, 128], [-2, 212, 439], [555, 133, -28], [-38, 222, 464], [-220, 503, 235], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-22, 666, 220], [124, 426, -418], [648, 431, 290], [-544, 427, 57], [717, 522, 16], [655, 585, -237], [-273, 205, 454], [-13, 347, -477], [-250, 664, -275], [-92, 381, 127], [29, 252, 454], [-462, 184, 505], [-526, 609, 431], [-356, 394, 587], [489, 402, 262], [-425, 272, 184], [33, 552, -39], [485, 567, 253], [-16, 588, -191], [4, 307, -430], [-285, 599, -277], [627, 354, 71], [-184, 453, 397], [561, 151, -16], [-6, 588, 182], [-12, 304, -447], [565, 323, -23], [-445, 236, 130], [-4, 217, 440], [554, 136, -27], [-38, 227, 467], [-222, 508, 237], [-559, 309, 28], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [649, 438, 292], [-546, 433, 55], [719, 528, 14], [658, 589, -237], [-273, 212, 455], [-13, 351, -479], [-248, 670, -274], [-94, 385, 125], [31, 256, 455], [-463, 188, 508], [-528, 614, 433], [-358, 398, 588], [488, 409, 264], [-427, 277, 182], [35, 557, -39], [483, 574, 255], [-17, 592, -193], [5, 310, -429], [-285, 604, -275], [625, 360, 72], [-186, 456, 396], [562, 155, -14], [-7, 595, 184], [-14, 308, -449], [567, 328, -21], [-447, 240, 131], [-7, 222, 441], [553, 139, -27], [-39, 231, 469], [-225, 514, 238], [-561, 314, 26], [-69, 326, 158], [42, 504, -12], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-548, 439, 53], [721, 533, 12], [661, 594, -237], [-272, 220, 456], [-14, 355, -482], [-246, 677, -272], [-95, 390, 123], [33, 259, 457], [-464, 192, 510], [-530, 618, 435], [-360, 401, 590], [487, 416, 266], [-429, 282, 180], [38, 562, -38], [482, 580, 256], [-19, 595, -195], [6, 313, -428], [-286, 608, -272], [622, 365, 74], [-188, 459, 395], [562, 159, -12], [-9, 601, 185], [-15, 312, -451], [569, 332, -19], [-449, 245, 133], [-9, 227, 442], [551, 142, -26], [-39, 235, 472], [-227, 520, 239], [-564, 319, 25], [-68, 334, 159], [42, 511, -15], [179, 570, -215], [-4, 554, -174], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [664, 599, -238], [-272, 228, 457], [-15, 359, -484], [-244, 683, -271], [-97, 394, 121], [35, 263, 458], [-465, 196, 512], [-533, 623, 436], [-362, 405, 591], [485, 422, 268], [-431, 287, 178], [41, 567, -38], [480, 587, 258], [-20, 599, -197], [7, 316, -427], [-287, 612, -270], [620, 371, 75], [-190, 463, 394], [563, 162, -10], [-11, 608, 187], [-17, 316, -453], [571, 336, -18], [-451, 250, 135], [-12, 232, 443], [550, 145, -25], [-40, 240, 474], [-230, 525, 241], [-566, 324, 24], [-67, 341, 159], [42, 518, -17], [181, 575, -217], [-2, 561, -173], [3, 286, 436], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-15, 363, -487], [-242, 690, -269], [-98, 398, 119], [37, 267, 459], [-466, 200, 515], [-535, 627, 438], [-364, 409, 593], [484, 429, 270], [-433, 292, 176], [44, 572, -37], [478, 593, 259], [-21, 603, -199], [8, 318, -426], [-287, 616, -267], [618, 377, 76], [-192, 466, 393], [564, 166, -7], [-12, 615, 189], [-19, 321, -455], [573, 340, -16], [-453, 255, 137], [-14, 236, 445], [549, 147, -24], [-41, 244, 477], [-232, 531, 242], [-569, 329, 23], [-65, 349, 159], [42, 524, -20], [183, 580, -219], [0, 567, -172], [2, 290, 434], [232, 331, 611], [69, 321, -159], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-240, 696, -268], [-100, 403, 117], [38, 270, 460], [-467, 204, 517], [-537, 632, 439], [-366, 412, 594], [483, 436, 272], [-435, 297, 174], [46, 577, -37], [476, 600, 260], [-23, 607, -202], [8, 321, -425], [-288, 620, -265], [615, 382, 78], [-194, 470, 392], [565, 170, -5], [-14, 621, 191], [-20, 325, -457], [575, 345, -14], [-455, 259, 139], [-17, 241, 446], [547, 150, -23], [-41, 248, 480], [-234, 536, 243], [-571, 334, 22], [-64, 357, 160], [42, 531, -22], [185, 585, -221], [3, 574, -171], [1, 293, 432], [234, 336, 613], [66, 326, -157], [169, 432, -404], [-558, 130, 28], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [40, 274, 462], [-469, 209, 519], [-539, 636, 441], [-367, 416, 595], [482, 442, 274], [-436, 302, 172], [49, 582, -36], [474, 607, 262], [-24, 611, -204], [9, 324, -424], [-289, 624, -262], [613, 388, 79], [-196, 473, 391], [565, 173, -3], [-16, 628, 193], [-22, 329, -459], [577, 349, -13], [-457, 264, 141], [-19, 246, 447], [546, 153, -22], [-42, 253, 482], [-237, 542, 245], [-574, 339, 21], [-63, 364, 160], [41, 538, -24], [187, 590, -223], [5, 581, -170], [0, 297, 430], [235, 340, 615], [64, 332, -155], [167, 436, -404], [-557, 137, 30], [68, 82, -160], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-541, 641, 442], [-369, 420, 597], [480, 449, 276], [-438, 307, 169], [52, 587, -36], [472, 613, 263], [-25, 614, -206], [10, 327, -423], [-289, 629, -260], [611, 394, 81], [-198, 477, 390], [566, 177, -1], [-17, 634, 194], [-24, 333, -461], [579, 353, -11], [-459, 269, 143], [-22, 251, 448], [545, 156, -22], [-42, 257, 485], [-239, 548, 246], [-576, 344, 19], [-62, 372, 160], [41, 544, -27], [189, 594, -225], [7, 587, -170], [-1, 301, 428], [237, 344, 617], [62, 337, -154], [166, 439, -405], [-557, 143, 33], [67, 86, -162], [-126, 289, -564], [503, 329, 239], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-371, 424, 598], [479, 456, 278], [-440, 312, 167], [55, 592, -35], [470, 620, 265], [-27, 618, -208], [11, 330, -422], [-290, 633, -257], [609, 399, 82], [-200, 480, 389], [567, 181, 2], [-19, 641, 196], [-25, 337, -463], [581, 357, -10], [-461, 273, 145], [-25, 255, 449], [544, 159, -21], [-43, 261, 487], [-242, 553, 247], [-579, 349, 18], [-60, 380, 160], [41, 551, -29], [191, 599, -227], [10, 594, -169], [-1, 304, 425], [239, 349, 619], [60, 343, -152], [164, 442, -405], [-557, 150, 35], [65, 90, -164], [-124, 295, -563], [501, 336, 237], [92, 317, 512], [334, 431, -474], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-442, 317, 165], [57, 597, -35], [468, 627, 266], [-28, 622, -210], [12, 332, -421], [-291, 637, -255], [606, 405, 84], [-201, 483, 388], [568, 184, 4], [-21, 647, 198], [-27, 342, -465], [583, 361, -8], [-463, 278, 147], [-27, 260, 450], [542, 162, -20], [-43, 265, 490], [-244, 559, 248], [-581, 354, 17], [-59, 387, 161], [41, 558, -31], [193, 604, -229], [12, 600, -168], [-2, 308, 423], [241, 353, 621], [57, 348, -150], [162, 445, -405], [-557, 157, 37], [63, 94, -166], [-122, 301, -561], [499, 342, 236], [93, 321, 509], [336, 436, -472], [-491, 506, 473], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [466, 633, 268], [-29, 626, -212], [13, 335, -420], [-291, 641, -252], [604, 411, 85], [-203, 487, 387], [568, 188, 6], [-22, 654, 200], [-29, 346, -467], [585, 366, -6], [-465, 283, 148], [-30, 265, 451], [541, 165, -19], [-44, 270, 493], [-247, 564, 250], [-584, 359, 16], [-58, 395, 161], [41, 564, -34], [195, 609, -231], [14, 607, -167], [-3, 312, 421], [243, 357, 623], [55, 353, -149], [160, 448, -406], [-556, 164, 40], [61, 98, -167], [-120, 307, -559], [497, 349, 234], [95, 325, 507], [338, 441, -470], [-493, 510, 473], [69, 85, -157], [333, 351, -474], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-31, 630, -214], [14, 338, -419], [-292, 645, -250], [602, 416, 87], [-205, 490, 386], [569, 192, 8], [-24, 660, 202], [-31, 350, -469], [587, 370, -5], [-467, 287, 150], [-32, 270, 452], [540, 167, -18], [-45, 274, 495], [-249, 570, 251], [-586, 364, 15], [-57, 403, 161], [40, 571, -36], [197, 614, -233], [17, 613, -166], [-4, 315, 419], [244, 361, 625], [53, 359, -147], [158, 451, -406], [-556, 171, 42], [60, 103, -169], [-118, 313, -558], [495, 356, 233], [96, 329, 505], [340, 447, -468], [-496, 514, 473], [70, 92, -155], [332, 358, -476], [558, 309, -30], [-281, 320, 439], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-293, 650, -247], [599, 422, 88], [-207, 494, 385], [570, 195, 11], [-26, 667, 203], [-32, 354, -471], [589, 374, -3], [-469, 292, 152], [-35, 274, 453], [539, 170, -18], [-45, 278, 498], [-252, 576, 252], [-589, 369, 13], [-55, 411, 162], [40, 578, -39], [199, 618, -235], [19, 620, -166], [-5, 319, 417], [246, 366, 627], [51, 364, -146], [157, 454, -406], [-556, 177, 44], [58, 107, -171], [-116, 319, -556], [493, 362, 232], [97, 333, 503], [342, 452, -467], [-498, 518, 472], [70, 99, -153], [330, 364, -478], [559, 314, -33], [-279, 325, 440], [-129, 205, -565], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-209, 497, 384], [571, 199, 13], [-27, 673, 205], [-34, 358, -473], [591, 378, -1], [-471, 297, 154], [-37, 279, 454], [537, 173, -17], [-46, 283, 500], [-254, 581, 254], [-591, 374, 12], [-54, 418, 162], [40, 584, -41], [201, 623, -236], [21, 626, -165], [-5, 323, 414], [248, 370, 629], [48, 370, -144], [155, 457, -407], [-556, 184, 47], [56, 111, -173], [-114, 325, -554], [491, 369, 230], [99, 337, 501], [344, 457, -465], [-501, 521, 472], [70, 106, -150], [328, 371, -480], [561, 319, -35], [-276, 330, 440], [-130, 208, -565], [-278, 573, -28], [3, 555, 172], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [572, 203, 15], [-29, 680, 207], [-36, 362, -475], [593, 383, 0], [-473, 302, 156], [-40, 284, 455], [536, 176, -16], [-46, 287, 503], [-256, 587, 255], [-594, 379, 11], [-53, 426, 162], [40, 591, -43], [203, 628, -238], [24, 633, -164], [-6, 326, 412], [250, 374, 631], [46, 375, -142], [153, 460, -407], [-555, 191, 49], [54, 115, -175], [-112, 331, -552], [489, 375, 229], [100, 341, 499], [346, 463, -463], [-503, 525, 472], [71, 113, -148], [327, 378, -482], [563, 324, -37], [-273, 335, 441], [-131, 211, -564], [-278, 580, -26], [1, 559, 171], [171, 353, -402], [144, 568, 380], 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-37, 367, -477], [596, 387, 2], [-475, 306, 158], [-42, 289, 456], [535, 179, -15], [-47, 291, 506], [-259, 592, 256], [-596, 384, 10], [-51, 434, 163], [40, 598, -46], [205, 633, -240], [26, 640, -163], [-7, 330, 410], [251, 379, 633], [44, 380, -141], [151, 463, -407], [-555, 198, 51], [53, 119, -177], [-110, 337, -551], [487, 382, 227], [102, 345, 497], [348, 468, -461], [-505, 529, 472], [71, 120, -146], [325, 384, -483], [565, 329, -39], [-271, 340, 442], [-133, 214, -563], [-279, 586, -24], [-1, 563, 169], [173, 358, -400], [141, 573, 380], [437, 223, -125], 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-477, 311, 160], [-45, 294, 457], [533, 182, -14], [-47, 296, 508], [-261, 598, 258], [-599, 389, 9], [-50, 441, 163], [39, 604, -48], [207, 637, -242], [28, 646, -163], [-8, 334, 408], [253, 383, 635], [41, 386, -139], [149, 467, -408], [-555, 204, 53], [51, 124, -179], [-108, 343, -549], [485, 388, 226], [103, 349, 495], [350, 473, -459], [-508, 533, 471], [71, 126, -144], [324, 391, -485], [566, 333, -41], [-268, 344, 443], [-134, 217, -562], [-279, 593, -22], [-2, 566, 167], [175, 363, -398], [138, 579, 380], [437, 231, -125], [-4, 208, -440], [475, 131, 446], 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-48, 298, 458], [532, 184, -13], [-48, 300, 511], [-264, 604, 259], [-602, 394, 7], [-49, 449, 163], [39, 611, -50], [209, 642, -244], [31, 653, -162], [-9, 338, 406], [255, 387, 637], [39, 391, -137], [147, 470, -408], [-555, 211, 56], [49, 128, -181], [-106, 349, -547], [483, 395, 224], [104, 353, 493], [352, 479, -457], [-510, 537, 471], [71, 133, -141], [322, 397, -487], [568, 338, -43], [-265, 349, 443], [-136, 220, -561], [-280, 600, -19], [-4, 570, 165], [176, 368, -396], [136, 584, 380], [436, 238, -126], [-3, 213, -443], [478, 136, 447], [-144, 221, -442], [473, 350, 334], 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-49, 304, 513], [-266, 609, 260], [-604, 399, 6], [-48, 457, 164], [39, 618, -53], [211, 647, -246], [33, 659, -161], [-10, 341, 403], [257, 392, 638], [37, 397, -136], [146, 473, -408], [-554, 218, 58], [47, 132, -183], [-104, 355, -546], [481, 402, 223], [106, 357, 491], [355, 484, -456], [-513, 541, 471], [72, 140, -139], [320, 404, -489], [570, 343, -45], [-263, 354, 444], [-137, 223, -560], [-280, 606, -17], [-6, 574, 164], [178, 373, -393], [133, 590, 381], [436, 246, -127], [-2, 218, -446], [481, 141, 447], [-145, 224, -442], [473, 356, 336], [-505, 331, -240], 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-607, 404, 5], [-46, 464, 164], [39, 624, -55], [213, 652, -248], [35, 666, -160], [-10, 345, 401], [259, 396, 640], [35, 402, -134], [144, 476, -409], [-554, 225, 60], [45, 136, -185], [-102, 361, -544], [479, 408, 221], [107, 361, 488], [357, 489, -454], [-515, 544, 470], [72, 147, -137], [319, 411, -491], [572, 348, -48], [-260, 359, 445], [-139, 226, -560], [-281, 613, -15], [-7, 578, 162], [180, 378, -391], [130, 595, 381], [435, 254, -128], [-2, 222, -449], [484, 146, 448], [-146, 226, -442], [473, 362, 339], [-507, 337, -241], [70, 323, -161], [-128, 205, -565], 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-45, 472, 164], [39, 631, -58], [215, 657, -250], [38, 672, -159], [-11, 349, 399], [260, 400, 642], [32, 407, -133], [142, 479, -409], [-554, 232, 63], [44, 140, -187], [-100, 368, -542], [477, 415, 220], [109, 365, 486], [359, 495, -452], [-517, 548, 470], [72, 154, -134], [317, 417, -492], [573, 353, -50], [-257, 364, 446], [-140, 229, -559], [-282, 620, -12], [-9, 581, 160], [181, 383, -389], [127, 601, 381], [435, 262, -129], [-1, 227, -451], [486, 152, 448], [-147, 229, -442], [473, 367, 342], [-510, 344, -242], [71, 326, -163], [-126, 209, -563], [-80, 572, -267]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [217, 661, -252], [40, 679, -159], [-12, 352, 397], [262, 405, 644], [30, 413, -131], [140, 482, -409], [-554, 238, 65], [42, 144, -189], [-98, 374, -540], [475, 421, 218], [110, 369, 484], [361, 500, -450], [-520, 552, 470], [73, 160, -132], [315, 424, -494], [575, 357, -52], [-255, 369, 447], [-141, 232, -558], [-282, 627, -10], [-11, 585, 159], [183, 388, -387], [125, 606, 381], [434, 270, -130], [-1, 232, -454], [489, 157, 449], [-148, 231, -442], [473, 373, 345], [-512, 350, -243], [71, 330, -165], [-125, 213, -561], [-82, 578, -265]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-13, 356, 395], [264, 409, 646], [28, 418, -129], [138, 485, -410], [-554, 245, 67], [40, 149, -190], [-95, 380, -539], [473, 428, 217], [112, 373, 482], [363, 505, -448], [-522, 556, 470], [73, 167, -130], [314, 430, -496], [577, 362, -54], [-252, 374, 447], [-143, 234, -557], [-283, 633, -8], [-12, 589, 157], [185, 394, -384], [122, 612, 382], [434, 278, -131], [0, 237, -457], [492, 162, 449], [-149, 234, -442], [473, 379, 347], [-515, 357, -244], [72, 333, -167], [-123, 218, -559], [-84, 585, -264]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [266, 413, 648], [26, 424, -128], [137, 488, -410], [-553, 252, 69], [38, 153, -192], [-93, 386, -537], [471, 434, 216], [113, 377, 480], [365, 511, -446], [-525, 560, 469], [73, 174, -128], [312, 437, -498], [579, 367, -56], [-249, 379, 448], [-144, 237, -556], [-283, 640, -5], [-14, 593, 155], [186, 399, -382], [119, 617, 382], [434, 285, -132], [1, 242, -460], [495, 167, 450], [-150, 237, -442], [473, 385, 350], [-517, 363, -245], [73, 336, -169], [-121, 222, -557], [-86, 591, -263]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [135, 491, -410], [-553, 259, 72], [37, 157, -194], [-91, 392, -535], [470, 441, 214], [114, 381, 478], [367, 516, -444], [-527, 563, 469], [74, 181, -125], [311, 444, -500], [580, 372, -58], [-247, 384, 449], [-146, 240, -555], [-284, 647, -3], [-16, 596, 153], [188, 404, -380], [116, 623, 382], [433, 293, -133], [1, 247, -462], [497, 172, 451], [-151, 239, -442], [473, 391, 353], [-519, 369, -245], [74, 340, -171], [-120, 226, -555], [-88, 598, -261]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [35, 161, -196], [-89, 398, -534], [468, 448, 213], [116, 385, 476], [369, 521, -443], [-530, 567, 469], [74, 188, -123], [309, 450, -501], [582, 377, -60], [-244, 389, 450], [-147, 243, -555], [-284, 653, -1], [-17, 600, 152], [190, 409, -378], [114, 628, 382], [433, 301, -134], [2, 252, -465], [500, 178, 451], [-151, 242, -442], [473, 396, 355], [-522, 376, -246], [75, 343, -173], [-118, 231, -553], [-90, 604, -260]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-87, 404, -532], [466, 454, 211], [117, 389, 474], [371, 527, -441], [-532, 571, 468], [74, 194, -121], [307, 457, -503], [584, 381, -63], [-241, 394, 451], [-149, 246, -554], [-285, 660, 1], [-19, 604, 150], [191, 414, -375], [111, 634, 383], [432, 309, -134], [2, 256, -468], [503, 183, 452], [-152, 244, -442], [473, 402, 358], [-524, 382, -247], [75, 347, -175], [-117, 235, -550], [-92, 611, -259]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [119, 393, 472], [373, 532, -439], [-534, 575, 468], [74, 201, -119], [306, 463, -505], [586, 386, -65], [-239, 398, 451], [-150, 249, -553], [-285, 667, 4], [-21, 608, 148], [193, 419, -373], [108, 639, 383], [432, 317, -135], [3, 261, -470], [506, 188, 452], [-153, 247, -442], [473, 408, 361], [-526, 389, -248], [76, 350, -177], [-115, 239, -548], [-94, 618, -257]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-537, 579, 468], [75, 208, -116], [304, 470, -507], [588, 391, -67], [-236, 403, 452], [-151, 252, -552], [-286, 673, 6], [-22, 611, 147], [195, 424, -371], [105, 645, 383], [431, 324, -136], [4, 266, -473], [508, 193, 453], [-154, 249, -442], [473, 414, 364], [-529, 395, -249], [77, 354, -179], [-114, 243, -546], [-96, 624, -256]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [75, 215, -114], [302, 477, -509], [589, 396, -69], [-233, 408, 453], [-153, 255, -551], [-286, 680, 8], [-24, 615, 145], [196, 429, -369], [102, 650, 383], [431, 332, -137], [4, 271, -476], [511, 198, 453], [-155, 252, -442], [473, 420, 366], [-531, 402, -249], [78, 357, -181], [-112, 248, -544], [-98, 631, -255]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [591, 401, -71], [-231, 413, 454], [-154, 258, -550], [-287, 687, 11], [-26, 619, 143], [198, 434, -366], [100, 656, 384], [431, 340, -138], [5, 276, -479], [514, 203, 454], [-156, 254, -442], [473, 425, 369], [-533, 408, -250], [79, 361, -183], [-110, 252, -542], [-100, 637, -253]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-156, 261, -550], [-287, 693, 13], [-27, 622, 142], [200, 439, -364], [97, 661, 384], [430, 348, -139], [5, 281, -481], [517, 209, 454], [-157, 257, -442], [472, 431, 372], [-536, 415, -251], [80, 364, -185], [-109, 256, -540], [-102, 644, -252]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-288, 700, 15], [-29, 626, 140], [201, 444, -362], [94, 667, 384], [430, 356, -140], [6, 286, -484], [519, 214, 455], [-158, 260, -442], [472, 437, 375], [-538, 421, -252], [80, 367, -187], [-107, 261, -538], [-104, 650, -251]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [203, 449, -360], [91, 673, 384], [429, 364, -141], [7, 291, -487], [522, 219, 455], [-159, 262, -441], [472, 443, 377], [-540, 428, -253], [81, 371, -189], [-106, 265, -535], [-107, 657, -249]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [429, 371, -142], [7, 295, -489], [525, 224, 456], [-160, 265, -441], [472, 449, 380], [-543, 434, -254], [82, 374, -191], [-104, 269, -533], [-109, 664, -248]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [8, 300, -492], [528, 229, 456], [-161, 267, -441], [472, 454, 383], [-545, 441, -254], [83, 378, -193], [-103, 273, -531], [-111, 670, -247]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-162, 270, -441], [472, 460, 386], [-547, 447, -255], [84, 381, -195], [-101, 278, -529], [-113, 677, -245]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-550, 454, -256], [84, 385, -197], [-99, 282, -527], [-115, 683, -244]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [85, 388, -199], [-98, 286, -525], [-117, 690, -242]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-119, 696, -241]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        version: "1.0",
        rotation: !1
    }
      , x = {
        sprite_rotation: [-1636, 994, 0],
        precision: 1e3,
        velocity: !1,
        frames: [[[21, 49, -6, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [21, 49, -6, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[19, 47, -1, 0, 0, 0], [2, 21, -3, 0, 0, 0], [-4, 51, -1, 0, 0, 0], [13, 49, 18, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [22, 45, -11, 0, 0, 0], [4, 21, -7, 0, 0, 0], [-2, 51, -3, 0, 0, 0], [14, 49, 17, 0, 0, 0], [23, 44, 12, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[14, 45, 8, 0, 0, 0], [0, 23, 11, 0, 0, 0], [-4, 48, 7, 0, 0, 0], [11, 47, 21, 0, 0, 0], [20, 43, 16, 0, 0, 0], [-15, 3, -14, 0, 0, 0], [20, 13, 4, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [25, 39, -18, 0, 0, 0], [15, 24, -17, 0, 0, 0], [4, 47, -8, 0, 0, 0], [15, 47, 13, 0, 0, 0], [24, 42, 5, 0, 0, 0], [-14, 3, -16, 0, 0, 0], [21, 14, 3, 0, 0, 0], [16, 32, 4, 0, 0, 0], [22, 53, -17, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[4, 38, 28, 0, 0, 0], [-4, 25, 31, 0, 0, 0], [-6, 41, 25, 0, 0, 0], [6, 42, 30, 0, 0, 0], [11, 39, 28, 0, 0, 0], [-14, 6, -5, 0, 0, 0], [16, 16, 12, 0, 0, 0], [14, 32, 9, 0, 0, 0], [21, 52, -15, 0, 0, 0], [-21, 52, -2, 0, 0, 0], [24, 61, -3, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [30, 24, -36, 132, -1, 36], [29, 29, -32, -12, 83, 15], [16, 37, -20, 0, 0, 0], [18, 42, 2, -1, -1, -1], [26, 36, -11, 0, 0, 0], [-5, 9, -19, 0, 0, 0], [23, 19, -9, -1, -1, -1], [19, 31, -5, 0, -1, 0], [23, 47, -21, 0, 0, 0], [-17, 51, -5, 0, 0, 0], [24, 60, -4, 0, 0, 0], [6, 33, 26, 0, 0, 0], [22, 4, 25, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-9, 29, 54, -33, 3, -15], [-10, 29, 59, -92, -6, -18], [-9, 29, 53, -29, -3, -4], [-6, 31, 50, -7, 1, -4], [2, 34, 40, 0, 0, 0], [-13, 12, 11, 0, 0, 0], [10, 19, 22, -1, 0, 0], [7, 31, 23, 0, 0, 0], [17, 49, -7, 0, 0, 0], [-19, 48, 7, 0, 0, 0], [21, 59, 0, 0, 0, 0], [5, 33, 28, 0, 0, 0], [21, 5, 26, 0, 0, 0], [3, 19, -3, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [37, 16, -61, 428, -20, 114], [46, 35, -54, -32, 214, 36], [36, 23, -39, 161, 126, 84], [25, 32, -22, -1, -1, -1], [28, 29, -28, 46, -12, 9], [11, 18, -25, -1, 0, 0], [26, 25, -22, -1, -1, -1], [26, 29, -24, 0, -1, 0], [26, 37, -26, 0, 0, 0], [-5, 45, -12, 0, 0, 0], [25, 52, -11, 0, 0, 0], [8, 33, 22, 0, 0, 0], [23, 7, 18, -1, 0, 0], [6, 20, -7, 0, 0, 0], [-17, 46, -8, 0, 0, 0], [7, 9, 5, 0, 0, 0], [-14, 60, -26, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-22, 23, 82, -453, 4, -212], [-17, 42, 91, -410, -34, -73], [-13, 19, 88, -181, -18, -23], [-22, 18, 76, -301, 22, -163], [-14, 26, 61, -120, 23, -81], [-11, 19, 30, 0, 0, -1], [3, 22, 34, -1, 0, 0], [-2, 30, 40, 0, 0, 0], [9, 43, 12, 0, 0, 0], [-15, 40, 27, 0, 0, 0], [16, 54, 10, 0, 0, -1], [-1, 31, 39, 0, 0, 0], [13, 11, 33, 0, 0, 0], [1, 20, 6, 0, 0, 0], [-18, 45, -2, 0, 0, 0], [7, 9, 7, 0, 0, 0], [-14, 60, -25, 0, 0, 0], [-10, 8, -6, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [44, 12, -87, 829, -50, 202], [61, 43, -86, -68, 441, 71], [56, 14, -68, 281, 216, 164], [34, 21, -51, 186, 4, 53], [32, 23, -56, 265, -73, 47], [29, 29, -31, -45, 77, 3], [30, 31, -38, -75, -18, -24], [33, 28, -45, 88, 20, 29], [32, 17, -39, 451, 12, 136], [16, 35, -24, 0, 0, 0], [27, 39, -22, 0, 0, 0], [14, 31, 6, 0, 0, 0], [25, 15, 0, -1, 0, 0], [18, 25, -19, -1, 0, -1], [-10, 43, -11, 0, 0, 0], [10, 11, 0, 0, 0, 0], [-9, 57, -26, 0, 0, 0], [-5, 10, -10, 0, 0, 0], [-2, 24, -12, 0, 0, 0], [24, 10, 10, 0, 0, 0], [-24, 4, 27, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-30, 34, 102, -789, -54, -352], [-23, 63, 119, -597, -47, -109], [-16, 17, 113, -556, -65, -58], [-28, 22, 89, -956, -93, -474], [-30, 24, 85, -324, 42, -225], [-9, 29, 57, -59, -17, 11], [-10, 29, 57, -47, 10, -31], [-14, 28, 64, -122, 12, -61], [-3, 34, 39, -1, 0, -1], [-10, 30, 51, -13, -3, 1], [9, 46, 23, 0, 0, -1], [-9, 29, 54, -84, 10, -44], [-3, 24, 49, 0, 0, 0], [-2, 23, 19, 0, -1, 0], [-17, 42, 8, -1, 0, 0], [3, 13, 17, -1, -1, -1], [-13, 57, -18, 0, 0, 0], [-10, 9, -2, 0, 0, 0], [-5, 24, -8, 0, 0, 0], [23, 10, 12, 0, 0, 0], [-24, 4, 27, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [51, 23, -120, 988, -40, 240], [71, 52, -124, -89, 573, 92], [72, 12, -100, 488, 390, 334], [46, 18, -93, 379, 26, 105], [39, 22, -88, 412, -95, 64], [49, 42, -47, -159, 273, -4], [37, 40, -66, -107, -25, -33], [42, 29, -73, 159, 39, 55], [39, 6, -62, 869, -31, 254], [40, 23, -39, 142, 199, 101], [29, 23, -36, 190, -19, 46], [22, 30, -14, 0, 0, 0], [28, 28, -30, -24, -18, -10], [32, 30, -35, -26, 124, 19], [1, 39, -17, 0, 0, 0], [18, 19, -13, 0, 0, 0], [2, 48, -28, 0, 0, 0], [3, 15, -15, -1, -1, -1], [8, 26, -18, 0, 0, 0], [25, 14, 1, 0, 0, 0], [-19, 6, 21, 0, 0, 0], [-20, 50, 11, 0, 0, 0], [6, 18, 24, 0, 0, 0], [-18, 41, -1, 0, 0, 0], [-27, 45, -20, 0, 0, 0], [-9, 30, 22, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-35, 49, 118, -1036, -116, -439], [-27, 93, 143, -794, -52, -159], [-18, 25, 127, -1286, -175, -69], [-31, 31, 97, -1538, -329, -617], [-42, 29, 105, -844, -43, -552], [-8, 46, 85, -318, -79, 73], [-23, 43, 82, -343, 40, -234], [-24, 35, 87, -320, 17, -161], [-19, 23, 77, -289, 6, -119], [-4, 20, 82, -180, -40, 22], [-1, 36, 41, -1, 0, -1], [-22, 33, 81, -331, 21, -177], [-23, 41, 69, -81, 75, -160], [-7, 27, 43, 0, 0, 0], [-15, 39, 18, -2, -1, -1], [-1, 19, 30, -1, -1, -1], [-12, 49, 1, -1, 0, 0], [-10, 15, 14, 0, 0, 0], [-5, 25, 1, 0, 0, 0], [19, 12, 17, 0, 0, 0], [-22, 7, 30, 0, 0, 0], [-23, 49, 19, 0, 0, 0], [4, 18, 27, 0, 0, 0], [-19, 41, 1, 0, 0, 0], [-27, 46, -20, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [56, 37, -155, 1051, -3, 270], [74, 61, -168, -112, 729, 117], [81, 19, -137, 633, 546, 494], [57, 20, -139, 475, 62, 134], [46, 26, -125, 605, -76, 90], [64, 51, -67, -362, 643, -75], [45, 49, -99, -179, 13, -38], [50, 34, -105, 226, 82, 83], [47, 9, -89, 1255, -84, 337], [62, 17, -63, 237, 344, 196], [33, 11, -56, 459, -60, 104], [35, 28, -48, 48, 17, 17], [33, 43, -67, -80, -53, -29], [48, 37, -61, -54, 250, 35], [12, 35, -23, 0, 0, 0], [27, 27, -29, -23, 20, -2], [23, 32, -30, 5, 6, 3], [21, 25, -27, -3, 4, 0], [23, 28, -28, 0, 14, 3], [26, 20, -12, -1, 0, -1], [-9, 11, 11, 0, 0, 0], [-6, 44, -1, 0, 0, 0], [9, 19, 16, -1, 0, 0], [-10, 38, -6, 0, 0, 0], [-18, 43, -22, 0, 0, 0], [-6, 30, 18, 0, 0, 0], [1, 57, -17, 0, 0, 0], [2, 18, 10, 0, 0, 0], [-5, 26, 15, 0, 0, 0], [12, 25, 17, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-39, 67, 130, -1412, -239, -541], [-29, 128, 163, -1051, -53, -260], [-20, 40, 131, -1946, -254, -26], [-31, 46, 101, -2059, -578, -635], [-45, 45, 116, -1587, -384, -799], [-11, 73, 111, -543, -96, 116], [-33, 67, 106, -478, 45, -337], [-32, 45, 106, -784, -38, -383], [-33, 26, 112, -434, -3, -177], [-2, 18, 101, -597, -113, 100], [-13, 24, 62, -110, 12, -55], [-32, 43, 102, -805, -42, -413], [-42, 68, 94, -125, 122, -267], [-13, 32, 72, -260, -17, -53], [-11, 32, 41, -2, -1, 0], [-8, 27, 50, -42, 1, -15], [-11, 38, 31, -1, 0, 0], [-9, 24, 42, 0, 0, 0], [-7, 26, 20, 0, 0, 0], [9, 18, 30, 0, 0, 0], [-16, 17, 41, 0, 0, 0], [-19, 43, 30, 0, 0, 0], [-1, 22, 38, 0, 0, 0], [-17, 39, 9, 0, 0, -1], [-26, 44, -15, 0, 0, 0], [-9, 30, 24, 0, 0, 0], [0, 58, -16, 0, 0, 0], [2, 18, 11, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [59, 54, -192, 1099, 101, 328], [70, 72, -213, -150, 976, 157], [80, 34, -178, 710, 702, 630], [65, 28, -187, 577, 134, 176], [53, 41, -171, 714, 7, 130], [71, 58, -95, -493, 940, -158], [52, 59, -141, -197, 67, -29], [57, 41, -139, 330, 209, 148], [54, 20, -120, 1386, -85, 367], [79, 17, -92, 367, 599, 381], [39, 6, -78, 979, -169, 174], [47, 28, -85, 163, 83, 64], [41, 58, -114, -111, -50, -32], [62, 46, -93, -92, 444, 61], [35, 26, -35, 91, 166, 71], [39, 38, -52, -134, 125, -17], [53, 12, -38, 219, 285, 164], [47, 39, -46, -65, 132, 7], [44, 32, -45, -10, 322, 70], [28, 29, -33, -39, -27, -16], [7, 18, -7, 0, 0, 0], [12, 36, -17, 0, 0, 0], [17, 23, -4, -1, 0, 0], [4, 35, -15, -1, -1, 0], [-3, 38, -25, 0, 0, 0], [3, 30, 5, 0, 0, 0], [7, 51, -20, 0, 0, 0], [7, 20, 3, 0, 0, 0], [-1, 27, 9, -1, 0, -1], [15, 25, 10, 0, -1, 0], [-7, 20, 1, 0, 0, 0], [10, 15, -11, 0, 0, 0], [-17, 32, 21, 0, 0, 0], [10, 53, -5, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-37, 92, 136, -1867, -419, -626], [-25, 173, 177, -1210, -50, -374], [-21, 62, 128, -2154, -271, -13], [-27, 66, 100, -2364, -721, -617], [-43, 68, 121, -2108, -687, -835], [-14, 108, 135, -719, -78, 115], [-39, 98, 128, -673, 45, -503], [-36, 65, 120, -1024, -97, -481], [-44, 34, 142, -622, -22, -250], [-2, 24, 112, -1124, -151, 229], [-28, 19, 90, -355, 17, -179], [-36, 64, 117, -1282, -191, -592], [-54, 101, 118, -191, 213, -481], [-20, 50, 103, -379, -24, -78], [-6, 24, 75, -355, -72, 46], [-18, 44, 81, -168, 3, -59], [-8, 24, 66, -58, -9, 0], [-9, 36, 72, -102, -23, 10], [-9, 28, 51, -38, -5, -3], [-7, 27, 52, -31, 12, -29], [-10, 27, 53, -19, -21, 28], [-13, 36, 44, -1, 0, 0], [-10, 29, 56, -103, 13, -56], [-14, 34, 29, 0, 0, -1], [-24, 42, -5, 0, 0, 0], [-9, 30, 33, 0, 0, 0], [-1, 53, -4, 0, 0, 0], [0, 19, 16, 0, 0, 0], [-5, 27, 17, 0, 0, 0], [11, 25, 19, 0, 0, 0], [-9, 19, 3, 0, 0, 0], [10, 15, -10, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [53, 75, -231, 1097, 312, 430], [53, 83, -261, -184, 1195, 190], [72, 54, -218, 718, 820, 702], [67, 42, -235, 701, 281, 257], [55, 62, -221, 762, 146, 194], [72, 62, -128, -561, 1167, -214], [57, 68, -189, -210, 212, -2], [59, 53, -180, 357, 288, 182], [59, 34, -152, 1481, -45, 409], [88, 23, -124, 416, 749, 493], [45, 15, -104, 1288, -202, 199], [59, 36, -132, 256, 185, 117], [49, 73, -167, -165, 19, -18], [71, 55, -135, -104, 520, 72], [59, 20, -57, 213, 424, 216], [52, 50, -89, -179, 187, -20], [70, 4, -51, 298, 395, 250], [68, 51, -70, -129, 268, 9], [62, 38, -75, -24, 494, 106], [33, 42, -65, -91, -62, -35], [24, 26, -26, -4, 11, 1], [32, 27, -35, 56, 68, 32], [28, 28, -30, 2, 16, 4], [26, 29, -30, 12, 24, 8], [15, 32, -29, 0, 0, 0], [16, 29, -13, 0, -1, 0], [22, 35, -28, 0, 0, 0], [16, 24, -12, 0, 0, 0], [6, 27, -1, -1, 0, -1], [19, 26, -3, 0, -1, 0], [-1, 21, -5, 0, 0, 0], [15, 19, -16, 0, 0, 0], [-11, 32, 14, 0, 0, 0], [11, 52, -7, 0, 0, -1], [-2, 22, -1, 0, 0, 0], [15, 21, -20, 0, 0, 0], [-17, 19, -24, 0, 0, 0], [9, 2, 14, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-31, 123, 138, -2064, -508, -679], [-13, 226, 187, -1279, -42, -486], [-21, 89, 121, -2239, -282, -26], [-19, 94, 96, -2322, -713, -667], [-31, 103, 119, -2263, -784, -853], [-16, 153, 158, -776, -60, 88], [-39, 136, 148, -827, 39, -661], [-37, 87, 130, -1296, -183, -585], [-51, 49, 164, -1058, -105, -396], [-4, 35, 115, -1664, -115, 357], [-37, 20, 110, -565, -4, -281], [-35, 94, 127, -1446, -254, -649], [-57, 140, 142, -228, 311, -699], [-26, 74, 130, -554, -29, -120], [-5, 31, 106, -540, -102, 79], [-26, 65, 110, -411, 8, -158], [-7, 16, 100, -144, -23, 0], [-11, 55, 100, -279, -51, 30], [-12, 37, 86, -357, -49, -14], [-25, 40, 77, -152, 50, -146], [-4, 45, 70, -109, -119, 183], [-6, 25, 63, -1, 0, 0], [-20, 45, 80, -343, 23, -191], [-10, 30, 48, -6, -2, 0], [-18, 37, 18, 0, 0, 0], [-9, 28, 56, -107, -17, -2], [-4, 45, 14, 0, 0, 0], [-4, 23, 34, 0, 0, 0], [-7, 27, 30, 0, 0, 0], [7, 26, 26, 0, 0, 0], [-9, 21, 11, 0, 0, 0], [8, 16, -5, 0, 0, 0], [-16, 32, 24, 0, 0, 0], [10, 53, -4, 0, 0, 0], [-4, 22, 1, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [39, 96, -273, 1038, 520, 512], [24, 95, -309, -210, 1365, 216], [58, 75, -258, 689, 949, 754], [61, 62, -282, 775, 449, 351], [43, 89, -278, 761, 289, 259], [64, 65, -169, -570, 1248, -217], [54, 79, -242, -216, 407, 38], [57, 67, -222, 370, 418, 232], [59, 55, -188, 1543, 87, 496], [89, 33, -158, 434, 884, 579], [52, 31, -133, 1380, -178, 223], [66, 48, -186, 289, 261, 149], [51, 86, -227, -202, 159, 10], [74, 65, -179, -122, 646, 93], [77, 22, -89, 260, 558, 296], [63, 60, -128, -246, 332, -14], [83, -1, -65, 392, 539, 380], [82, 61, -98, -210, 453, 7], [74, 46, -109, -56, 759, 156], [40, 54, -101, -142, -70, -42], [43, 36, -51, -41, 122, 13], [53, 21, -59, 240, 301, 180], [42, 36, -67, 9, 63, 16], [46, 25, -47, 110, 242, 101], [46, 24, -36, 77, 232, 84], [36, 29, -42, 46, 81, 33], [41, 16, -39, 285, 199, 159], [33, 30, -38, -4, 42, 8], [21, 28, -21, 0, 0, 0], [24, 28, -19, 0, -1, 0], [12, 24, -16, 0, 0, 0], [28, 28, -31, -31, 44, 0], [3, 31, -1, 0, 0, 0], [16, 45, -14, 0, 0, -1], [8, 24, -11, 0, 0, 0], [25, 27, -28, 0, 0, 0], [-9, 21, -25, 0, 0, 0], [12, 6, 8, 0, 0, 0], [24, 14, 2, 0, 0, 0], [9, 31, 13, 0, 0, 0], [-2, 8, 16, 0, 0, 0], [-21, 53, -28, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-18, 164, 136, -2067, -519, -737], [6, 282, 196, -1300, -26, -614], [-20, 122, 110, -2194, -300, -110], [-9, 135, 97, -2087, -610, -759], [-17, 142, 117, -2202, -764, -919], [-16, 202, 179, -835, -24, 16], [-30, 184, 165, -900, 46, -778], [-34, 115, 137, -1511, -263, -673], [-53, 71, 177, -1255, -156, -451], [-8, 49, 114, -2122, -34, 423], [-43, 27, 123, -918, -83, -428], [-31, 128, 135, -1629, -326, -747], [-49, 185, 165, -229, 373, -814], [-30, 100, 154, -853, -34, -211], [-5, 41, 132, -960, -130, 164], [-32, 98, 135, -625, 12, -269], [-7, 12, 126, -393, -63, 10], [-12, 76, 125, -462, -62, 44], [-16, 56, 115, -689, -78, -23], [-39, 63, 102, -254, 80, -257], [-3, 67, 87, -182, -186, 314], [2, 12, 86, -1, 0, 0], [-29, 71, 104, -528, 26, -311], [-6, 27, 77, -560, -112, 106], [-11, 31, 45, -9, -3, 1], [-10, 33, 85, -482, -74, 7], [-8, 33, 45, -3, -1, -1], [-10, 30, 60, -144, -6, -35], [-9, 29, 57, -83, -10, -8], [-1, 27, 41, 0, 0, 0], [-9, 24, 31, 0, 0, 0], [5, 19, 7, 0, 0, 0], [-14, 31, 35, 0, 0, 0], [7, 50, 3, 0, -1, -1], [-4, 23, 9, 0, 0, 0], [13, 20, -16, 0, 0, 0], [-18, 19, -23, 0, 0, 0], [9, 3, 15, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [13, 116, -316, 980, 668, 558], [-13, 108, -353, -235, 1534, 242], [36, 97, -296, 587, 1200, 812], [42, 86, -325, 801, 637, 454], [25, 114, -332, 738, 451, 326], [52, 68, -213, -568, 1351, -197], [36, 91, -298, -217, 586, 76], [48, 82, -265, 363, 581, 288], [50, 80, -229, 1530, 157, 534], [85, 46, -190, 423, 1086, 681], [55, 52, -167, 1415, -106, 270], [68, 64, -241, 328, 448, 221], [42, 99, -292, -216, 271, 32], [73, 74, -223, -157, 891, 134], [91, 25, -121, 314, 831, 461], [67, 71, -178, -293, 503, 2], [92, -1, -80, 562, 937, 790], [93, 69, -126, -292, 654, -5], [78, 55, -149, -93, 996, 196], [48, 65, -146, -176, -41, -38], [60, 46, -82, -85, 268, 29], [70, 22, -92, 353, 485, 314], [55, 45, -110, 16, 148, 38], [62, 26, -72, 227, 601, 298], [71, 19, -51, 160, 634, 267], [56, 31, -80, 103, 203, 83], [57, 7, -61, 436, 292, 273], [50, 39, -73, -16, 178, 35], [42, 30, -52, 28, 77, 26], [32, 30, -44, 30, 12, 11], [33, 30, -35, -5, 61, 12], [42, 38, -50, -116, 167, -5], [21, 29, -23, 5, 11, 3], [27, 30, -29, 48, 17, 17], [28, 28, -31, 0, 46, 10], [40, 36, -43, -141, 269, 2], [10, 25, -28, -1, 0, -1], [19, 16, -9, 0, 0, 0], [25, 19, -9, 0, 0, 0], [13, 30, 4, 0, 0, 0], [2, 11, 9, 0, 0, 0], [-15, 50, -29, 0, 0, 0], [24, 52, -7, 0, 0, 0], [26, 33, 23, 0, 0, 0], [25, 5, -18, 0, 0, 0], [-27, 28, -3, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-1, 211, 139, -1994, -494, -804], [36, 342, 205, -1299, -5, -750], [-16, 162, 105, -1979, -296, -242], [1, 178, 106, -1841, -480, -838], [1, 190, 122, -2030, -671, -1001], [-9, 256, 198, -875, 17, -84], [-12, 238, 182, -926, 68, -881], [-26, 150, 141, -1642, -317, -773], [-53, 95, 185, -1565, -252, -522], [-12, 70, 107, -2343, 10, 422], [-46, 37, 133, -1846, -448, -604], [-20, 172, 143, -1648, -330, -824], [-37, 229, 186, -193, 494, -983], [-31, 135, 172, -983, -35, -267], [-7, 63, 147, -1279, -116, 220], [-32, 142, 157, -720, 21, -344], [-7, 15, 144, -1026, -143, 74], [-14, 103, 147, -623, -57, 43], [-20, 88, 140, -948, -83, -46], [-50, 87, 126, -382, 113, -411], [-5, 95, 105, -269, -226, 436], [6, 7, 96, 0, 0, 0], [-34, 106, 127, -658, 32, -419], [-6, 38, 99, -1017, -150, 226], [-3, 25, 86, -310, -77, 68], [-14, 51, 110, -655, -91, 14], [-12, 20, 78, -405, -40, -57], [-18, 44, 90, -246, -11, -59], [-13, 36, 85, -474, -61, -30], [-13, 30, 62, -204, 27, -123], [-9, 28, 53, -81, -15, 2], [0, 22, 24, -1, -1, -1], [-7, 28, 63, -127, -36, 28], [3, 44, 18, 0, -1, -1], [-6, 24, 22, 0, 0, 0], [8, 22, 0, 0, 0, 0], [-17, 20, -12, 0, 0, 0], [5, 7, 22, 0, 0, 0], [20, 15, 9, 0, 0, 0], [7, 31, 17, 0, 0, 0], [-3, 8, 17, 0, 0, 0], [-21, 53, -28, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-23, 134, -356, 922, 806, 592], [-62, 121, -393, -263, 1718, 269], [6, 118, -332, 445, 1475, 834], [14, 110, -364, 776, 845, 553], [-6, 138, -382, 697, 628, 392], [33, 74, -259, -559, 1456, -160], [7, 104, -351, -218, 758, 114], [29, 98, -306, 326, 814, 358], [36, 102, -270, 1478, 298, 596], [73, 61, -224, 345, 1392, 783], [55, 74, -202, 1375, 78, 376], [57, 82, -297, 336, 614, 283], [28, 112, -353, -230, 471, 70], [60, 85, -268, -175, 1020, 155], [92, 37, -157, 314, 1025, 560], [61, 81, -233, -309, 619, 18], [93, 5, -96, 453, 1493, 1176], [97, 76, -155, -361, 846, -22], [72, 66, -195, -127, 1190, 224], [54, 76, -191, -210, 52, -20], [72, 55, -119, -157, 533, 52], [78, 31, -133, 418, 657, 431], [66, 57, -162, 21, 270, 70], [71, 32, -102, 252, 836, 422], [83, 22, -75, 165, 1025, 453], [73, 38, -128, 128, 276, 112], [70, 2, -84, 735, 449, 541], [65, 48, -114, -20, 233, 46], [61, 34, -86, 78, 254, 88], [42, 34, -74, 90, 50, 37], [52, 36, -58, -28, 297, 56], [54, 48, -76, -244, 375, -24], [49, 28, -58, 45, 97, 36], [40, 15, -51, 237, 77, 93], [48, 33, -54, -1, 176, 39], [55, 45, -73, -244, 482, -15], [39, 31, -33, -47, 227, 32], [30, 31, -35, -51, 22, -10], [28, 27, -27, -10, -7, -5], [18, 30, -8, -1, -1, -1], [12, 18, -6, 0, 0, 0], [-4, 44, -29, 0, 0, 0], [26, 40, -20, 0, 0, 0], [26, 32, 15, 0, 0, 0], [26, 11, -21, 0, 0, 0], [-20, 28, -6, 0, 0, 0], [19, 49, -9, 0, 0, 0], [23, 54, 6, 0, 0, 0], [-27, 24, 12, 0, 0, 0], [-10, 36, 5, 0, 0, 0], [7, 42, 9, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[19, 260, 148, -1900, -454, -878], [78, 402, 215, -1305, 4, -815], [-8, 205, 111, -1764, -264, -369], [11, 225, 125, -1733, -412, -883], [20, 241, 133, -1814, -534, -1090], [4, 309, 215, -903, 61, -203], [14, 296, 200, -929, 94, -962], [-12, 191, 145, -1603, -297, -866], [-50, 120, 190, -1864, -359, -574], [-19, 100, 95, -2266, -21, 379], [-43, 55, 132, -2414, -697, -561], [-4, 222, 152, -1618, -310, -872], [-13, 277, 206, -156, 569, -1061], [-27, 175, 185, -1102, -33, -346], [-11, 91, 157, -1621, -71, 246], [-29, 189, 177, -773, 34, -412], [-9, 26, 149, -1861, -158, 194], [-16, 137, 164, -887, -27, -3], [-23, 125, 160, -1146, -72, -100], [-55, 116, 146, -498, 136, -564], [-10, 131, 125, -298, -215, 438], [6, 6, 97, 3075, 610, 208], [-34, 148, 149, -724, 44, -504], [-9, 60, 115, -1373, -124, 300], [1, 32, 118, -453, -103, 107], [-17, 70, 132, -1025, -106, 21], [-16, 27, 102, -909, -115, -99], [-24, 63, 117, -442, -16, -111], [-17, 58, 110, -725, -84, -43], [-25, 42, 87, -511, 19, -311], [-10, 39, 84, -298, -52, 14], [-9, 28, 53, -65, -1, -19], [-3, 32, 90, -647, -138, 187], [-4, 35, 39, 0, -1, -1], [-8, 27, 43, -1, -1, 0], [-1, 25, 27, 0, 0, 0], [-14, 23, 12, 0, 0, 0], [-2, 18, 39, 0, 0, 0], [10, 20, 26, 0, 0, 0], [2, 30, 28, 0, 0, 0], [-4, 12, 24, 0, 0, 0], [-20, 51, -21, 0, 0, -1], [23, 56, -1, 0, 0, 0], [25, 33, 27, 0, 0, 0], [25, 4, -17, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-65, 149, -392, 861, 957, 623], [-121, 136, -426, -277, 1809, 283], [-36, 136, -364, 303, 1733, 824], [-23, 134, -396, 741, 967, 602], [-43, 158, -425, 629, 855, 461], [9, 81, -304, -550, 1573, -114], [-31, 118, -397, -221, 897, 145], [1, 114, -345, 269, 1048, 413], [18, 122, -309, 1401, 469, 657], [50, 79, -257, 273, 1569, 808], [44, 97, -244, 1279, 282, 467], [37, 102, -349, 331, 715, 318], [2, 123, -406, -235, 580, 90], [39, 95, -310, -197, 1168, 179], [85, 50, -193, 270, 1284, 660], [49, 91, -288, -317, 719, 34], [82, 20, -113, 102, 2029, 1298], [92, 80, -186, -472, 1222, -71], [59, 77, -243, -164, 1380, 249], [53, 86, -240, -230, 179, 5], [77, 64, -162, -183, 647, 63], [80, 45, -178, 436, 825, 523], [70, 70, -220, 22, 387, 100], [72, 44, -140, 237, 1028, 500], [88, 29, -101, 139, 1210, 528], [86, 46, -174, 172, 480, 189], [75, 10, -110, 991, 556, 800], [76, 58, -158, -29, 363, 74], [74, 43, -133, 101, 389, 135], [51, 42, -113, 129, 122, 65], [67, 43, -91, -47, 459, 85], [62, 56, -113, -323, 549, -37], [72, 30, -96, 127, 324, 127], [53, 6, -77, 593, 153, 264], [65, 40, -87, -7, 340, 76], [64, 55, -112, -303, 642, -23], [68, 40, -52, -102, 467, 55], [44, 47, -72, -144, 75, -24], [32, 38, -57, -62, -42, -25], [27, 29, -29, 16, 9, 6], [26, 27, -27, -8, 12, 0], [20, 33, -31, 0, 1, 0], [29, 22, -38, 235, -27, 56], [27, 31, -5, 0, -1, 0], [28, 30, -32, -121, -3, -33], [-5, 28, -14, 0, 0, 0], [22, 43, -16, 0, 0, 0], [24, 47, -4, 0, -1, 0], [-19, 24, 6, -1, -1, -1], [-4, 35, -1, 0, 0, 0], [10, 40, 3, 0, 0, 0], [12, 52, 21, 0, 0, 0], [-27, 7, 0, 0, 0, 0], [-24, 12, -14, 0, 0, 0], [5, 47, -26, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[41, 308, 161, -1808, -406, -964], [123, 459, 224, -1354, 7, -929], [4, 249, 129, -1607, -216, -478], [22, 273, 150, -1591, -296, -976], [41, 295, 154, -1679, -433, -1159], [24, 360, 231, -923, 102, -323], [47, 353, 217, -936, 130, -1074], [8, 239, 154, -1526, -255, -923], [-43, 149, 189, -2016, -418, -603], [-23, 134, 89, -2027, -82, 287], [-35, 81, 125, -2550, -755, -543], [15, 273, 165, -1527, -244, -990], [17, 324, 223, -91, 680, -1152], [-20, 216, 195, -1246, -29, -497], [-14, 124, 163, -1836, -35, 214], [-20, 238, 195, -855, 72, -579], [-12, 43, 147, -2261, -131, 238], [-14, 177, 177, -971, -9, -53], [-21, 175, 175, -1263, -55, -187], [-53, 150, 163, -581, 150, -687], [-14, 173, 147, -333, -177, 393], [3, 11, 89, 3075, 610, 208], [-29, 195, 170, -787, 74, -633], [-15, 96, 125, -1564, -86, 294], [4, 42, 145, -881, -131, 233], [-19, 98, 148, -1284, -100, 2], [-20, 43, 118, -1188, -156, -109], [-29, 90, 139, -769, -27, -215], [-21, 86, 131, -914, -88, -65], [-33, 68, 109, -669, 4, -410], [-13, 59, 111, -462, -69, 22], [-19, 40, 88, -219, -5, -64], [-3, 48, 111, -1107, -138, 336], [-13, 23, 68, -194, -2, -61], [-11, 33, 71, -227, -28, -18], [-11, 29, 61, -129, 0, -40], [-11, 27, 41, 0, 0, 0], [-13, 36, 65, -107, 15, -61], [-4, 26, 46, 0, 0, 0], [-5, 29, 45, 0, 0, 0], [-6, 17, 33, 0, 0, 0], [-18, 46, -6, -1, -1, -1], [15, 49, 11, 0, 0, 0], [15, 32, 35, 0, 0, 0], [21, 7, -9, 0, 0, 0], [-26, 28, 2, 0, 0, 0], [17, 50, -5, 0, 0, 0], [23, 54, 8, 0, 0, 0], [-27, 24, 13, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-108, 162, -424, 793, 1133, 650], [-181, 150, -454, -303, 1979, 307], [-87, 151, -391, 200, 1930, 800], [-65, 156, -421, 640, 1212, 675], [-87, 174, -459, 562, 1059, 509], [-21, 91, -347, -549, 1690, -69], [-74, 130, -436, -228, 1092, 187], [-38, 128, -379, 226, 1200, 441], [-8, 138, -345, 1346, 585, 691], [22, 97, -288, 185, 1747, 806], [22, 116, -289, 1216, 403, 510], [11, 121, -396, 297, 961, 394], [-30, 133, -451, -240, 720, 115], [15, 105, -348, -236, 1423, 217], [72, 66, -230, 192, 1538, 717], [30, 101, -339, -332, 952, 76], [65, 40, -131, -128, 2331, 1298], [79, 82, -217, -504, 1381, -92], [32, 91, -293, -198, 1554, 269], [44, 95, -290, -239, 295, 26], [74, 73, -206, -211, 797, 79], [73, 62, -224, 413, 1016, 598], [66, 84, -277, 17, 573, 148], [62, 61, -186, 198, 1193, 538], [88, 37, -127, 32, 1627, 651], [89, 58, -223, 189, 680, 263], [73, 26, -140, 1066, 606, 893], [78, 69, -205, -53, 624, 130], [81, 54, -181, 112, 524, 179], [58, 54, -162, 144, 193, 87], [76, 52, -130, -63, 582, 107], [65, 64, -157, -347, 644, -34], [89, 37, -143, 173, 540, 217], [62, 7, -106, 798, 195, 372], [76, 49, -124, -20, 526, 117], [69, 64, -158, -345, 816, -18], [91, 48, -74, -195, 843, 67], [57, 63, -119, -226, 168, -24], [39, 49, -91, -122, -56, -37], [37, 29, -55, 78, 44, 33], [39, 36, -50, -72, 126, 4], [49, 19, -34, 125, 266, 115], [36, 10, -69, 599, -92, 126], [29, 28, -38, 31, -24, 2], [34, 51, -53, -361, -21, -96], [21, 28, -28, 1, 16, 4], [29, 27, -32, 111, 13, 34], [26, 37, -18, 0, -1, 0], [-1, 26, -8, -1, -1, -1], [8, 32, -12, 0, 0, 0], [17, 36, -10, 0, 0, 0], [14, 49, 15, 0, 0, 0], [-21, 9, -3, 0, 0, 0], [-15, 15, -17, 0, 0, 0], [8, 45, -27, 0, 0, 0], [21, 23, -21, 0, 0, 0], [20, 18, 11, 0, 0, 0], [-22, 40, -22, 0, 0, 0], [-26, 20, -1, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[66, 356, 178, -1732, -351, -1084], [176, 514, 228, -1469, -20, -1030], [18, 292, 152, -1517, -165, -564], [39, 323, 182, -1535, -209, -1078], [69, 353, 184, -1633, -379, -1241], [52, 409, 243, -956, 174, -537], [89, 411, 232, -980, 141, -1183], [33, 291, 169, -1484, -230, -956], [-32, 179, 184, -2181, -492, -648], [-25, 168, 93, -1819, -116, 188], [-25, 109, 116, -2604, -795, -572], [43, 328, 184, -1474, -191, -1091], [54, 370, 238, 53, 893, -1275], [-3, 263, 201, -1283, -26, -568], [-16, 167, 161, -1920, -24, 128], [-2, 289, 211, -878, 90, -658], [-15, 68, 134, -2379, -123, 240], [-10, 221, 188, -1011, 7, -110], [-14, 231, 188, -1291, -44, -243], [-46, 184, 177, -650, 163, -803], [-12, 219, 170, -362, -125, 314], [-4, 21, 70, 3075, 610, 208], [-16, 247, 190, -817, 111, -759], [-20, 138, 134, -1583, -76, 263], [1, 63, 160, -1304, -91, 339], [-20, 138, 158, -1452, -88, -57], [-23, 61, 131, -1647, -216, -115], [-29, 128, 156, -979, -34, -312], [-23, 121, 149, -1116, -79, -123], [-39, 96, 130, -831, -14, -522], [-16, 84, 134, -664, -72, 22], [-27, 61, 119, -504, -12, -154], [-8, 76, 125, -1361, -96, 386], [-23, 23, 98, -368, -13, -113], [-15, 48, 97, -586, -69, -36], [-23, 46, 102, -377, -5, -119], [-7, 33, 78, -185, -45, 31], [-25, 64, 94, -237, 36, -147], [-18, 34, 70, -167, 37, -127], [-12, 28, 62, -313, 9, -138], [-9, 28, 53, -44, -5, -5], [-15, 40, 15, -1, -1, -1], [3, 39, 33, 0, 0, 0], [1, 30, 46, 0, 0, 0], [14, 12, 6, 0, 0, 0], [-23, 28, 10, 0, 0, 0], [11, 46, 8, -1, -1, -1], [17, 50, 16, 0, 0, 0], [-25, 24, 19, 0, 0, 0], [-10, 36, 8, 0, 0, 0], [6, 42, 10, 0, 0, 0], [11, 53, 25, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-156, 172, -449, 703, 1391, 677], [-246, 164, -472, -331, 2155, 331], [-143, 164, -415, 134, 2073, 779], [-114, 174, -440, 516, 1459, 721], [-140, 186, -482, 478, 1300, 548], [-59, 104, -386, -564, 1901, 4], [-124, 143, -466, -240, 1288, 228], [-85, 141, -406, 203, 1280, 454], [-37, 152, -378, 1268, 750, 730], [-14, 114, -320, 112, 1886, 786], [-4, 133, -331, 1109, 622, 569], [-25, 139, -433, 241, 1208, 456], [-65, 141, -486, -250, 949, 156], [-22, 115, -379, -254, 1533, 232], [45, 84, -267, 105, 1754, 730], [2, 111, -385, -339, 1062, 95], [40, 65, -156, -40, 2206, 1239], [60, 84, -247, -515, 1485, -98], [-4, 105, -342, -213, 1630, 278], [29, 104, -335, -242, 412, 48], [63, 82, -251, -233, 944, 98], [53, 83, -271, 382, 1133, 628], [51, 99, -332, 3, 769, 196], [48, 79, -235, 178, 1252, 544], [75, 50, -158, -53, 1867, 683], [78, 73, -271, 182, 906, 340], [68, 44, -169, 1097, 753, 1019], [68, 81, -253, -81, 854, 176], [79, 67, -230, 111, 729, 242], [62, 66, -212, 155, 314, 123], [80, 61, -170, -86, 747, 137], [62, 71, -206, -369, 826, -14], [94, 50, -195, 187, 725, 289], [67, 18, -138, 934, 238, 454], [81, 58, -163, -47, 775, 169], [64, 73, -212, -369, 979, -1], [103, 55, -101, -265, 1128, 58], [66, 77, -176, -279, 288, -13], [46, 59, -128, -173, -23, -34], [47, 31, -81, 201, 136, 96], [54, 47, -84, -109, 211, 8], [66, 14, -46, 204, 477, 232], [45, 9, -104, 778, -106, 148], [33, 28, -74, 101, -70, 6], [41, 67, -81, -551, -28, -130], [48, 29, -43, 22, 326, 86], [39, 14, -60, 440, 29, 141], [30, 21, -44, 132, -22, 30], [24, 28, -28, 2, 26, 6], [26, 29, -29, 26, 50, 19], [30, 28, -34, 45, 21, 17], [19, 42, -1, 0, 0, 0], [-3, 17, -13, 0, 0, 0], [6, 21, -24, 0, 0, 0], [16, 38, -29, 0, 0, 0], [27, 28, -30, -11, 16, 0], [21, 19, 5, -1, -1, -1], [-14, 38, -24, 0, 0, 0], [-22, 21, -3, 0, 0, 0], [11, 29, -15, 0, 0, 0], [-14, 36, -9, 0, 0, 0], [-6, 50, 12, 0, 0, 0], [-22, 44, 8, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[100, 406, 201, -1753, -351, -1147], [236, 566, 224, -1562, -52, -1066], [38, 335, 180, -1485, -128, -624], [64, 374, 218, -1608, -189, -1194], [103, 412, 216, -1807, -489, -1324], [90, 453, 250, -990, 235, -717], [137, 467, 243, -1109, 82, -1276], [61, 342, 185, -1440, -195, -1020], [-18, 211, 178, -2402, -627, -753], [-23, 200, 103, -1526, -119, 9], [-9, 148, 106, -2407, -753, -703], [81, 386, 208, -1492, -186, -1149], [95, 414, 249, 296, 1211, -1380], [16, 308, 207, -1306, -20, -668], [-12, 219, 158, -1879, -36, -3], [20, 339, 224, -902, 119, -773], [-18, 97, 118, -2431, -135, 209], [-2, 265, 198, -1066, 49, -301], [1, 288, 200, -1317, -15, -392], [-36, 218, 190, -721, 179, -948], [-7, 265, 192, -389, -67, 216], [-12, 34, 47, 3075, 610, 208], [8, 303, 209, -831, 152, -878], [-23, 184, 143, -1566, -57, 160], [-3, 92, 168, -1493, -54, 364], [-18, 183, 165, -1500, -78, -129], [-24, 92, 135, -1852, -237, -134], [-26, 171, 170, -1072, -31, -393], [-23, 161, 164, -1250, -61, -212], [-39, 132, 148, -969, -32, -632], [-18, 114, 154, -839, -60, 3], [-33, 92, 146, -657, -15, -212], [-14, 114, 134, -1417, -79, 375], [-31, 26, 123, -785, -71, -224], [-19, 70, 118, -905, -91, -59], [-33, 73, 138, -637, -12, -211], [-6, 51, 114, -337, -70, 59], [-33, 101, 124, -351, 63, -246], [-31, 51, 94, -432, 61, -343], [-21, 38, 84, -495, -5, -217], [-13, 43, 76, -185, -20, -20], [-11, 32, 42, -1, -1, -1], [-11, 27, 57, -54, 6, -27], [-14, 28, 59, -158, 72, -193], [5, 18, 24, 0, 0, 0], [-16, 28, 34, 0, 0, 0], [2, 37, 30, -1, -1, -1], [8, 43, 29, 0, -1, -1], [-20, 26, 29, 0, 0, 0], [-10, 33, 24, 0, 0, 0], [4, 40, 16, 0, 0, 0], [7, 49, 31, 0, 0, 0], [-27, 8, 4, 0, 0, 0], [-24, 12, -12, 0, 0, 0], [5, 47, -26, 0, 0, 0], [19, 22, -19, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-209, 179, -464, 661, 1533, 686], [-314, 178, -479, -344, 2242, 342], [-204, 174, -433, 102, 2157, 768], [-170, 187, -450, 379, 1714, 741], [-195, 194, -496, 393, 1548, 571], [-105, 120, -418, -594, 2091, 57], [-177, 155, -486, -256, 1474, 265], [-134, 153, -430, 168, 1413, 473], [-69, 162, -407, 1093, 1119, 781], [-54, 129, -350, 17, 2072, 742], [-41, 145, -371, 1003, 862, 611], [-70, 154, -460, 199, 1361, 487], [-102, 150, -514, -266, 1201, 197], [-58, 124, -407, -276, 1674, 250], [9, 103, -304, 32, 1915, 716], [-29, 121, -424, -349, 1221, 124], [16, 89, -188, 94, 1958, 1092], [37, 85, -276, -517, 1715, -83], [-46, 119, -386, -247, 1802, 298], [11, 113, -376, -245, 570, 78], [48, 91, -293, -251, 1087, 119], [29, 103, -316, 336, 1264, 650], [23, 113, -380, -18, 965, 241], [29, 97, -285, 131, 1385, 551], [54, 66, -193, -80, 1934, 676], [59, 89, -315, 161, 1064, 387], [53, 69, -204, 1003, 922, 1058], [49, 92, -299, -103, 1018, 206], [70, 81, -277, 91, 952, 303], [56, 81, -264, 156, 456, 164], [76, 70, -211, -110, 912, 165], [49, 80, -258, -375, 936, 5], [88, 66, -249, 185, 801, 316], [70, 32, -171, 1102, 337, 589], [78, 67, -204, -85, 1029, 215], [48, 83, -268, -385, 1156, 27], [104, 61, -132, -309, 1322, 45], [66, 89, -237, -317, 439, 7], [52, 69, -172, -219, 90, -14], [55, 38, -117, 237, 186, 123], [66, 57, -123, -146, 320, 19], [78, 14, -60, 284, 1016, 574], [52, 12, -140, 1051, -85, 183], [38, 31, -111, 230, -112, 9], [48, 79, -110, -699, -14, -145], [72, 35, -74, 15, 643, 171], [49, 11, -94, 725, 42, 229], [36, 13, -74, 515, -101, 98], [50, 31, -51, 20, 263, 69], [50, 27, -58, 83, 163, 68], [42, 22, -60, 232, 103, 101], [27, 30, -28, 50, 3, 14], [19, 25, -26, -1, 2, 0], [36, 31, -34, -43, 149, 18], [31, 26, -32, 75, 83, 42], [35, 34, -44, -107, 164, -2], [23, 23, -8, -1, -1, -1], [9, 33, -28, 0, 0, 0], [-9, 23, -10, 0, 0, 0], [20, 29, -23, 0, 0, 0], [-5, 35, -14, 0, 0, 0], [-2, 48, 6, 0, 0, 0], [-18, 43, 5, 0, 0, 0], [-8, 16, -20, 0, 0, 0], [-15, 26, -23, 0, 0, 0], [11, 35, -6, 0, 0, 0], [-1, 35, -20, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[142, 455, 223, -1875, -415, -1203], [296, 613, 213, -1783, -135, -1105], [60, 376, 208, -1465, -26, -780], [102, 426, 252, -1856, -316, -1282], [148, 472, 246, -2069, -690, -1350], [139, 492, 250, -1008, 254, -768], [194, 520, 246, -1212, 16, -1306], [91, 393, 203, -1441, -181, -1088], [7, 248, 169, -2428, -683, -834], [-16, 231, 123, -1450, -105, -49], [7, 192, 108, -2236, -692, -787], [123, 443, 230, -1633, -257, -1230], [147, 458, 252, 439, 1393, -1421], [41, 353, 212, -1318, -11, -777], [2, 275, 159, -1775, -47, -166], [50, 388, 236, -936, 156, -933], [-20, 134, 99, -2227, -196, 90], [19, 314, 205, -1071, 70, -411], [22, 345, 211, -1324, 6, -504], [-21, 253, 201, -773, 197, -1080], [4, 311, 213, -428, 29, 37], [-19, 43, 30, 3075, 610, 208], [40, 359, 227, -842, 177, -952], [-18, 234, 157, -1537, -42, 77], [-7, 125, 172, -1767, 13, 349], [-11, 234, 171, -1500, -59, -287], [-23, 128, 136, -1932, -243, -178], [-17, 219, 181, -1114, -22, -474], [-15, 212, 176, -1285, -47, -279], [-33, 173, 163, -1071, -42, -739], [-18, 150, 169, -965, -40, -36], [-37, 125, 170, -807, -14, -286], [-19, 158, 143, -1453, -54, 307], [-34, 41, 137, -1225, -166, -309], [-22, 105, 135, -976, -90, -77], [-39, 110, 168, -857, -18, -307], [-6, 73, 146, -530, -81, 92], [-37, 147, 153, -418, 90, -330], [-38, 81, 116, -628, 57, -514], [-27, 56, 103, -716, -32, -311], [-17, 64, 99, -401, -31, -53], [-6, 23, 79, -203, -42, 20], [-28, 19, 89, -315, 18, -162], [-31, 38, 78, -448, 128, -574], [-6, 26, 48, -13, 2, -7], [-5, 30, 70, -220, -73, 79], [-11, 27, 60, -94, 5, -39], [-6, 31, 51, -9, 1, -5], [-10, 28, 52, -58, -27, 29], [-9, 30, 42, 0, 0, 0], [-2, 35, 34, 0, 0, 0], [-3, 38, 46, 0, 0, 0], [-24, 12, 13, 0, 0, 0], [-21, 15, 1, 0, 0, 0], [3, 45, -17, 0, 0, 0], [18, 23, -15, 0, 0, 0], [19, 18, 13, 0, 0, 0], [-22, 40, -21, 0, 0, 0], [-26, 20, -1, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-266, 184, -471, 628, 1676, 693], [-383, 192, -478, -371, 2410, 363], [-264, 183, -449, 43, 2364, 751], [-232, 197, -452, 271, 1921, 739], [-255, 199, -498, 354, 1678, 576], [-161, 138, -440, -607, 2150, 69], [-235, 167, -495, -263, 1547, 279], [-184, 164, -449, 135, 1546, 490], [-110, 168, -427, 996, 1334, 791], [-105, 143, -378, -7, 2126, 729], [-88, 153, -406, 950, 1010, 629], [-117, 167, -480, 131, 1583, 519], [-146, 156, -528, -275, 1314, 214], [-98, 133, -429, -301, 1825, 268], [-38, 122, -341, -39, 2073, 685], [-66, 130, -456, -369, 1456, 166], [-8, 110, -228, 110, 1870, 961], [0, 88, -305, -504, 1810, -57], [-93, 133, -424, -273, 1932, 311], [-11, 120, -411, -249, 736, 109], [28, 99, -331, -281, 1332, 155], [-2, 122, -357, 232, 1527, 673], [-11, 127, -421, -36, 1092, 268], [-1, 114, -334, 96, 1486, 554], [29, 82, -231, -113, 2010, 639], [32, 105, -354, 102, 1339, 451], [31, 93, -241, 864, 1099, 1056], [22, 104, -341, -123, 1157, 231], [46, 95, -321, 71, 1080, 334], [41, 96, -313, 150, 608, 207], [65, 80, -251, -134, 1058, 188], [32, 89, -307, -378, 1064, 31], [75, 82, -299, 172, 937, 358], [62, 56, -207, 1140, 438, 672], [61, 79, -248, -98, 1106, 228], [21, 95, -325, -399, 1327, 59], [99, 66, -164, -356, 1549, 25], [55, 101, -299, -339, 568, 25], [50, 79, -227, -233, 235, 12], [60, 49, -157, 268, 269, 158], [74, 67, -165, -194, 512, 40], [79, 19, -78, 228, 1365, 760], [58, 27, -180, 1237, -16, 233], [45, 41, -157, 337, -73, 22], [53, 86, -146, -855, 36, -152], [85, 43, -115, -15, 938, 242], [58, 16, -131, 976, 83, 315], [45, 15, -110, 749, -116, 124], [73, 38, -88, 22, 494, 131], [70, 27, -88, 172, 387, 172], [55, 24, -96, 344, 170, 161], [39, 18, -66, 232, 7, 67], [45, 35, -43, -75, 230, 22], [66, 43, -55, -109, 367, 33], [51, 13, -42, 357, 404, 288], [43, 39, -62, -178, 274, -13], [28, 28, -31, -5, -8, -3], [37, 27, -33, 30, 114, 35], [13, 26, -23, 0, 0, 0], [39, 28, -42, 31, 104, 33], [5, 33, -19, 0, 0, 0], [10, 40, -8, 0, 0, 0], [-9, 40, -2, 0, 0, 0], [-1, 18, -22, 0, 0, 0], [-1, 27, -25, 0, 0, 0], [15, 33, -12, 0, 0, 0], [6, 33, -23, 0, 0, 0], [20, 20, -21, 0, 0, 0], [13, 19, -24, 0, 0, 0], [27, 46, 13, 0, 0, 0], [4, 50, 20, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[188, 503, 239, -2056, -526, -1228], [352, 654, 190, -1960, -199, -1110], [95, 417, 237, -1509, 51, -899], [150, 477, 277, -2295, -617, -1323], [197, 529, 268, -2403, -950, -1344], [187, 529, 248, -1070, 291, -872], [250, 570, 244, -1472, -171, -1338], [128, 443, 220, -1555, -229, -1192], [35, 286, 165, -2337, -714, -971], [-8, 259, 143, -1337, -55, -162], [22, 237, 118, -2087, -627, -861], [172, 498, 247, -1984, -493, -1290], [200, 500, 250, 825, 1856, -1485], [72, 396, 216, -1330, -4, -880], [22, 330, 167, -1737, -46, -227], [89, 434, 243, -969, 171, -1025], [-18, 179, 92, -1952, -232, -53], [47, 361, 212, -1068, 88, -502], [50, 399, 221, -1335, 40, -678], [3, 288, 208, -805, 223, -1210], [28, 356, 231, -461, 128, -153], [-22, 48, 21, 3075, 610, 208], [76, 413, 242, -866, 197, -1033], [-8, 283, 171, -1507, -23, -9], [-11, 165, 170, -1861, 33, 295], [9, 291, 180, -1462, -39, -422], [-20, 166, 137, -1930, -241, -247], [-3, 268, 192, -1142, 6, -636], [-2, 263, 188, -1297, -29, -362], [-21, 217, 178, -1134, -41, -841], [-16, 187, 182, -1143, 1, -155], [-35, 165, 188, -1023, -14, -424], [-21, 203, 153, -1443, -39, 234], [-36, 58, 146, -1616, -268, -351], [-24, 141, 151, -1071, -76, -130], [-39, 154, 193, -1057, -27, -418], [-7, 99, 173, -827, -66, 124], [-33, 196, 179, -495, 136, -469], [-39, 120, 136, -762, 51, -653], [-31, 77, 120, -1109, -110, -466], [-22, 96, 121, -524, -25, -93], [-4, 24, 108, -388, -76, 46], [-39, 19, 113, -545, 0, -276], [-41, 56, 96, -583, 119, -739], [-19, 39, 76, -242, 22, -130], [2, 45, 108, -403, -113, 155], [-27, 24, 98, -235, 8, -98], [-25, 18, 78, -116, 17, -68], [2, 37, 85, -348, -135, 201], [-9, 27, 70, -377, -62, 11], [-10, 28, 57, -90, 2, -31], [-16, 24, 66, 0, 0, 0], [-17, 19, 32, 0, -1, -1], [-17, 20, 21, 0, 0, 0], [0, 41, 2, 0, -1, 0], [14, 23, -6, 0, 0, 0], [13, 20, 21, 0, 0, 0], [-21, 39, -12, 0, 0, 0], [-24, 21, 5, 0, 0, 0], [6, 29, -9, 0, 0, 0], [-15, 36, -7, 0, 0, 0], [-7, 50, 13, 0, 0, 0], [-22, 44, 8, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-323, 188, -470, 612, 1789, 699], [-450, 206, -465, -391, 2537, 378], [-331, 190, -453, 9, 2532, 744], [-301, 201, -443, 202, 2080, 731], [-315, 201, -492, 324, 1807, 579], [-214, 156, -459, -641, 2286, 91], [-291, 178, -498, -275, 1671, 301], [-237, 173, -461, 90, 1750, 511], [-154, 171, -442, 868, 1664, 786], [-155, 155, -404, -50, 2239, 708], [-141, 159, -434, 914, 1144, 641], [-168, 178, -492, 51, 1832, 540], [-189, 163, -535, -290, 1503, 241], [-141, 142, -445, -323, 1969, 285], [-92, 139, -377, -61, 2128, 675], [-109, 140, -479, -384, 1606, 190], [-34, 126, -280, 80, 1896, 854], [-42, 94, -332, -486, 1870, -25], [-144, 147, -456, -317, 2140, 328], [-40, 128, -438, -257, 933, 145], [-5, 108, -364, -314, 1582, 189], [-41, 139, -393, 187, 1639, 675], [-49, 139, -456, -57, 1228, 295], [-34, 130, -379, 63, 1587, 557], [-2, 98, -275, -131, 2054, 614], [-8, 120, -385, 36, 1572, 487], [7, 115, -280, 732, 1263, 1038], [-10, 115, -379, -163, 1408, 270], [18, 109, -361, 47, 1209, 361], [19, 110, -357, 137, 761, 248], [50, 89, -287, -182, 1338, 229], [5, 99, -352, -386, 1287, 78], [58, 98, -346, 158, 1033, 384], [49, 80, -243, 1104, 570, 737], [43, 89, -289, -120, 1237, 249], [-15, 108, -377, -417, 1515, 95], [91, 71, -194, -407, 1839, -1], [36, 111, -355, -363, 768, 54], [37, 90, -285, -235, 410, 44], [61, 61, -199, 292, 461, 227], [72, 77, -213, -224, 670, 59], [77, 27, -96, 111, 1691, 874], [58, 49, -223, 1307, 59, 283], [50, 56, -209, 372, -16, 40], [55, 90, -185, -1015, 184, -158], [87, 54, -161, -40, 1097, 273], [62, 33, -175, 1055, 127, 357], [52, 25, -149, 842, -93, 140], [89, 47, -133, 9, 719, 188], [83, 32, -125, 232, 635, 296], [64, 31, -136, 473, 292, 250], [51, 13, -109, 420, 40, 119], [67, 46, -71, -169, 519, 31], [88, 53, -82, -211, 702, 37], [63, 9, -58, 591, 704, 638], [49, 45, -85, -250, 430, -20], [35, 36, -61, -19, -29, -11], [60, 24, -45, 84, 381, 132], [41, 31, -39, -13, 206, 42], [56, 30, -65, 100, 403, 147], [21, 30, -28, 0, -1, 0], [26, 30, -28, 41, 30, 18], [9, 34, -17, 0, 0, 0], [10, 22, -26, 0, 0, 0], [25, 28, -30, -2, 52, 11], [26, 29, -28, 25, 23, 12], [21, 30, -28, 0, 0, 0], [25, 25, -27, 0, 0, 0], [21, 24, -28, 0, 0, 0], [27, 44, 7, 0, -1, 0], [6, 48, 16, 0, 0, -1], [18, 31, -9, 0, 0, 0], [21, 11, -19, 0, 0, 0], [-2, 52, 19, 0, 0, 0], [24, 2, 2, 0, 0, 0], [26, 33, -7, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[234, 546, 248, -2291, -669, -1226], [401, 689, 164, -2212, -276, -1098], [141, 456, 260, -1568, 78, -953], [201, 523, 292, -2509, -766, -1318], [246, 580, 280, 295, 1889, -1870], [236, 561, 239, -1121, 310, -924], [302, 614, 235, -1757, -383, -1344], [175, 492, 232, -1836, -408, -1262], [68, 327, 168, -2229, -702, -1062], [7, 287, 169, -1260, 20, -273], [38, 281, 132, -1835, -487, -990], [230, 550, 252, -2365, -758, -1287], [251, 539, 243, -746, 412, -1640], [108, 437, 220, -1382, -7, -1045], [45, 383, 176, -1700, -40, -307], [132, 477, 247, -1006, 170, -1080], [-12, 223, 95, -1721, -229, -192], [77, 406, 219, -1068, 112, -615], [92, 450, 229, -1361, 64, -813], [31, 323, 215, -807, 283, -1372], [64, 399, 245, -482, 183, -255], [-23, 50, 18, 120, -162, 256], [117, 463, 253, -903, 200, -1094], [6, 329, 187, -1476, 6, -121], [-12, 208, 166, -1873, 28, 178], [36, 348, 191, -1425, -13, -549], [-12, 208, 142, -1823, -211, -430], [24, 322, 203, -1142, 17, -689], [17, 314, 200, -1297, 9, -521], [-3, 262, 191, -1170, -31, -936], [-7, 232, 192, -1237, 32, -302], [-26, 210, 199, -1180, -21, -567], [-16, 249, 165, -1416, -20, 130], [-35, 81, 149, -1869, -337, -371], [-21, 183, 164, -1175, -42, -263], [-31, 207, 210, -1132, -28, -478], [-8, 134, 192, -1017, -38, 119], [-24, 248, 204, -553, 194, -635], [-33, 167, 155, -844, 57, -778], [-31, 108, 131, -1358, -176, -572], [-24, 137, 143, -647, 1, -180], [-4, 32, 129, -675, -113, 95], [-45, 28, 127, -1183, -169, -520], [-48, 77, 112, -965, -24, -1068], [-29, 65, 105, -380, 30, -214], [5, 68, 142, -537, -124, 209], [-39, 26, 127, -498, -7, -205], [-35, 16, 95, -243, 27, -144], [7, 57, 114, -624, -173, 376], [-11, 38, 100, -736, -110, 42], [-20, 26, 87, -319, -5, -107], [-29, 9, 87, 0, 0, 0], [-7, 32, 62, -59, -30, 33], [-10, 28, 52, -61, -21, 19], [-5, 34, 30, 0, -1, 0], [6, 25, 15, 0, -1, 0], [0, 25, 40, 0, 0, 0], [-18, 37, 2, 0, 0, 0], [-18, 24, 24, 0, 0, 0], [2, 29, 8, 0, 0, 0], [-14, 35, 4, 0, 0, 0], [-7, 47, 19, 0, 0, 0], [-21, 42, 12, 0, 0, 0], [-10, 15, -18, 0, 0, 0], [-17, 26, -21, 0, 0, 0], [10, 35, -5, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-379, 191, -464, 605, 1909, 707], [-514, 219, -446, -420, 2721, 400], [-402, 196, -445, 0, 2619, 747], [-373, 204, -428, 187, 2138, 729], [-374, 202, -479, 294, 2012, 581], [-270, 173, -471, -663, 2366, 99], [-346, 188, -495, -286, 1786, 321], [-294, 181, -462, 54, 1942, 528], [-202, 171, -449, 803, 1906, 771], [-210, 166, -426, -87, 2362, 693], [-193, 165, -458, 871, 1388, 657], [-225, 186, -491, -11, 2027, 545], [-231, 169, -537, -313, 1759, 272], [-186, 151, -454, -361, 2211, 310], [-147, 155, -410, -90, 2208, 663], [-153, 148, -495, -394, 1699, 205], [-64, 140, -337, 45, 2001, 788], [-84, 101, -359, -460, 1939, 22], [-203, 160, -476, -353, 2316, 339], [-70, 134, -460, -277, 1258, 201], [-48, 117, -390, -331, 1713, 206], [-83, 154, -425, 81, 1904, 669], [-89, 151, -484, -74, 1334, 314], [-69, 144, -418, 21, 1719, 559], [-36, 114, -319, -155, 2125, 588], [-53, 135, -410, -31, 1781, 505], [-22, 134, -319, 472, 1616, 970], [-54, 125, -408, -176, 1489, 282], [-15, 123, -395, -9, 1453, 402], [-10, 123, -395, 118, 914, 286], [23, 99, -321, -232, 1599, 258], [-31, 111, -391, -402, 1509, 125], [35, 114, -386, 135, 1154, 414], [28, 104, -279, 1030, 708, 779], [15, 100, -327, -163, 1479, 284], [-63, 121, -421, -426, 1603, 112], [69, 76, -226, -429, 2e3, -10], [10, 121, -404, -390, 1021, 89], [14, 102, -341, -231, 602, 81], [52, 76, -244, 283, 659, 291], [60, 86, -262, -258, 910, 91], [68, 38, -118, -13, 1957, 923], [49, 77, -266, 1350, 220, 387], [50, 73, -260, 431, 182, 111], [48, 88, -232, -1048, 299, -162], [81, 66, -209, -60, 1211, 293], [61, 54, -219, 1133, 251, 440], [57, 41, -190, 932, -25, 172], [93, 59, -183, -16, 940, 238], [86, 44, -166, 246, 844, 392], [68, 44, -180, 521, 383, 303], [62, 20, -160, 532, 86, 156], [82, 56, -109, -207, 644, 32], [99, 61, -116, -319, 1083, 10], [69, 14, -78, 720, 970, 979], [53, 51, -120, -271, 536, -11], [45, 46, -103, -27, -5, -7], [78, 23, -61, 111, 883, 335], [68, 38, -69, -23, 317, 63], [67, 37, -100, 110, 486, 178], [47, 26, -42, 63, 201, 70], [46, 19, -57, 225, 160, 120], [33, 27, -35, 37, 63, 25], [32, 30, -32, -51, 159, 17], [58, 32, -43, -29, 422, 85], [41, 26, -54, 176, 161, 101], [42, 26, -38, 96, 358, 131], [35, 36, -43, -187, 145, -33], [36, 33, -36, -140, 236, -3], [28, 37, -11, -1, 0, -1], [12, 43, 3, 0, 0, -1], [22, 30, -18, 0, 0, 0], [24, 18, -24, 0, 0, 0], [2, 49, 12, 0, 0, 0], [24, 7, -4, -1, -1, -1], [27, 32, -10, 0, 0, 0], [25, 6, -24, 0, 0, 0], [-11, 28, -4, 0, 0, 0], [-7, 12, 13, 0, 0, 0], [5, 55, 7, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[277, 586, 252, 463, 2266, -1969], [441, 716, 131, -2453, -323, -1065], [188, 492, 276, -1731, 93, -1028], [251, 565, 298, 204, 2111, -1883], [294, 623, 280, 38, 1784, -1978], [284, 589, 224, -1290, 339, -1026], [349, 653, 221, -2097, -624, -1322], [226, 538, 237, -2250, -688, -1273], [108, 373, 180, -2197, -698, -1093], [27, 314, 197, -1204, 177, -436], [57, 328, 160, -1739, -414, -1058], [286, 597, 249, 556, 2249, -1886], [302, 575, 225, -139, 1161, -1731], [157, 476, 220, -1439, -26, -1106], [72, 433, 187, -1664, -23, -424], [177, 517, 247, -1180, 111, -1206], [-2, 265, 112, -1644, -218, -248], [113, 449, 224, -1082, 135, -715], [143, 497, 233, -1427, 77, -942], [72, 359, 219, -802, 307, -1417], [102, 440, 255, -511, 242, -355], [-20, 45, 27, 120, -162, 256], [162, 510, 259, -986, 179, -1167], [26, 371, 203, -1427, 76, -332], [-7, 254, 163, -1791, 2, -9], [70, 404, 205, -1410, 15, -662], [4, 255, 155, -1761, -187, -515], [51, 372, 213, -1141, 41, -798], [43, 364, 212, -1295, 48, -674], [18, 306, 204, -1212, -12, -1089], [11, 282, 199, -1259, 55, -444], [-7, 260, 206, -1238, -24, -652], [-8, 292, 178, -1347, 34, -100], [-32, 107, 148, -2091, -401, -395], [-12, 231, 177, -1199, -17, -365], [-21, 258, 224, -1231, -30, -586], [-8, 175, 205, -1183, -4, 79], [-1, 305, 224, -572, 222, -714], [-19, 219, 174, -872, 81, -883], [-25, 148, 141, -1461, -199, -666], [-21, 186, 163, -679, 21, -238], [-5, 44, 144, -1063, -130, 169], [-47, 43, 136, -1730, -398, -613], [-45, 108, 125, -1328, -265, -1231], [-38, 94, 131, -474, 39, -281], [8, 92, 171, -839, -98, 310], [-47, 34, 150, -764, -43, -305], [-43, 15, 109, -410, 25, -244], [5, 90, 139, -754, -160, 441], [-14, 59, 125, -1051, -126, 67], [-28, 31, 111, -791, -71, -244], [-38, -2, 101, 0, 0, 0], [0, 50, 91, -178, -80, 106], [-3, 41, 89, -175, -57, 59], [-12, 25, 70, -180, -13, -33], [-5, 28, 44, -8, 0, -3], [-16, 32, 65, -118, 28, -88], [-14, 33, 27, 0, 0, -1], [-11, 27, 48, -12, -4, 3], [-2, 29, 25, 0, 0, 0], [-13, 33, 20, 0, 0, 0], [-8, 36, 40, 0, 0, 0], [-18, 39, 23, 0, 0, 0], [-10, 18, -3, 0, 0, 0], [-16, 26, -11, 0, 0, 0], [7, 34, 3, 0, 0, 0], [-2, 34, -16, 0, 0, 0], [17, 17, -15, 0, 0, 0], [12, 18, -24, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-432, 196, -454, 610, 2115, 725], [-574, 231, -417, -447, 2896, 419], [-469, 203, -433, -8, 2772, 764], [-445, 206, -407, 188, 2254, 734], [-433, 202, -454, 288, 2182, 582], [-326, 189, -475, -722, 2566, 111], [-399, 198, -486, -300, 1935, 346], [-352, 189, -455, 31, 2119, 543], [-257, 169, -444, 796, 2e3, 767], [-269, 176, -441, -141, 2588, 678], [-254, 168, -469, 862, 1516, 665], [-283, 192, -482, -45, 2149, 545], [-275, 174, -529, -335, 1993, 296], [-239, 159, -451, -377, 2319, 320], [-204, 170, -439, -129, 2331, 650], [-197, 157, -504, -424, 1947, 240], [-105, 149, -397, 31, 2067, 772], [-131, 112, -384, -441, 2003, 66], [-265, 173, -484, -392, 2503, 348], [-108, 140, -468, -288, 1392, 221], [-93, 127, -412, -346, 1839, 225], [-134, 166, -447, 25, 2055, 658], [-132, 161, -504, -99, 1472, 336], [-107, 157, -450, -59, 1980, 556], [-76, 130, -364, -194, 2260, 560], [-105, 147, -428, -88, 1953, 511], [-64, 147, -359, 377, 1774, 931], [-96, 135, -433, -201, 1650, 304], [-53, 135, -422, -73, 1700, 430], [-39, 135, -428, 71, 1193, 346], [-13, 108, -352, -271, 1803, 277], [-77, 123, -421, -414, 1631, 150], [11, 128, -423, 63, 1451, 471], [2, 125, -315, 902, 911, 817], [-20, 111, -361, -193, 1634, 303], [-111, 135, -460, -442, 1741, 138], [40, 81, -258, -443, 2121, -3], [-28, 129, -442, -401, 1146, 105], [-20, 114, -391, -227, 786, 119], [31, 93, -291, 250, 867, 348], [38, 95, -309, -270, 1027, 108], [53, 53, -142, -56, 2043, 903], [31, 106, -309, 1335, 348, 464], [38, 93, -312, 447, 360, 180], [37, 87, -277, -1044, 402, -163], [72, 78, -254, -113, 1459, 326], [53, 78, -263, 1145, 365, 503], [58, 58, -231, 983, 57, 211], [84, 73, -237, -33, 1054, 261], [79, 59, -210, 228, 1039, 464], [67, 59, -225, 559, 565, 392], [68, 31, -211, 697, 211, 236], [89, 65, -149, -241, 773, 36], [101, 68, -152, -352, 1220, -2], [66, 27, -103, 700, 1155, 1119], [54, 58, -162, -273, 651, 13], [54, 57, -151, -29, 54, 6], [85, 28, -82, 31, 1402, 510], [89, 46, -102, -60, 620, 118], [77, 44, -133, 118, 673, 244], [68, 24, -62, 115, 420, 161], [65, 18, -99, 317, 238, 181], [56, 23, -61, 123, 220, 100], [59, 41, -51, -131, 400, 28], [83, 37, -66, -54, 622, 119], [55, 29, -90, 296, 302, 196], [60, 27, -60, 141, 709, 285], [45, 46, -68, -277, 218, -57], [50, 42, -51, -273, 466, -37], [28, 26, -37, 118, -47, 19], [23, 33, -20, 0, -1, -1], [29, 28, -32, 28, 18, 12], [28, 28, -31, -94, 25, -21], [8, 44, 1, 0, 0, 0], [26, 14, -13, -1, -1, -1], [28, 29, -30, 48, -24, 7], [26, 16, -27, -1, -1, -1], [-6, 28, -7, 0, 0, 0], [-1, 15, 6, 0, 0, 0], [7, 52, 4, 0, 0, 0], [25, 58, -15, 0, 0, 0], [22, 41, 4, 0, 0, 0], [9, 24, -5, 0, 0, 0], [24, 10, 11, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[318, 618, 241, 358, 2226, -1998], [467, 735, 92, -2723, -329, -1010], [236, 525, 279, -1819, 86, -1051], [298, 601, 292, 11, 2031, -1940], [337, 658, 268, -125, 1784, -2098], [329, 612, 198, -1426, 347, -1078], [390, 687, 201, -2335, -770, -1283], [278, 581, 232, -2497, -835, -1243], [149, 419, 193, -2210, -713, -1113], [62, 342, 226, -1237, 288, -519], [80, 374, 190, -1722, -379, -1121], [339, 637, 235, 264, 2126, -1970], [347, 607, 195, 31, 1507, -1848], [207, 513, 217, -1553, -72, -1153], [109, 479, 199, -1645, 18, -598], [227, 553, 239, -1493, -69, -1295], [10, 305, 133, -1439, -148, -429], [153, 489, 227, -1112, 152, -793], [200, 541, 231, -1535, 68, -1036], [115, 396, 221, -935, 218, -1487], [147, 477, 259, -552, 308, -452], [-15, 37, 41, 120, -162, 256], [206, 553, 261, -1173, 85, -1252], [57, 410, 219, -1409, 125, -445], [8, 302, 165, -1684, -14, -189], [118, 459, 219, -1420, 30, -722], [23, 302, 171, -1710, -159, -599], [88, 421, 222, -1163, 71, -960], [80, 413, 224, -1309, 88, -822], [52, 353, 217, -1264, -14, -1209], [41, 336, 205, -1254, 65, -513], [16, 310, 212, -1270, -23, -740], [12, 334, 193, -1316, 68, -211], [-27, 136, 144, -2200, -440, -437], [4, 280, 191, -1199, 23, -513], [-4, 309, 235, -1278, -30, -654], [-4, 221, 213, -1356, 35, -32], [27, 359, 242, -602, 277, -867], [3, 276, 193, -874, 118, -984], [-12, 198, 151, -1454, -187, -716], [-13, 238, 184, -709, 67, -364], [-7, 60, 154, -1628, -93, 258], [-44, 63, 137, -2103, -569, -618], [-33, 146, 137, -1461, -365, -1280], [-42, 127, 155, -672, 55, -445], [7, 127, 193, -1117, -30, 359], [-52, 47, 165, -1403, -214, -475], [-46, 20, 117, -748, -28, -428], [3, 124, 162, -1007, -83, 506], [-18, 92, 143, -1309, -116, 63], [-32, 45, 126, -1136, -146, -323], [-42, -6, 107, 0, 0, 0], [3, 74, 117, -341, -121, 205], [1, 60, 124, -463, -108, 165], [-20, 27, 113, -437, -39, -74], [-19, 33, 81, -149, 6, -59], [-31, 49, 93, -266, 52, -206], [-8, 27, 63, -71, -18, 10], [-3, 34, 77, -338, -109, 141], [-9, 29, 53, -68, -2, -17], [-10, 29, 47, -15, -3, 1], [-10, 25, 63, -56, -6, -6], [-14, 34, 37, 0, 0, 0], [-10, 22, 18, 0, 0, 0], [-14, 27, 6, 0, 0, 0], [1, 32, 24, 0, 0, 0], [-3, 33, -2, 0, 0, 0], [15, 18, -10, 0, 0, 0], [10, 19, -18, 0, 0, -1], [23, 45, 18, 0, 0, 0], [3, 49, 21, 0, 0, 0], [16, 31, -5, 0, 0, 0], [20, 8, -17, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-485, 201, -430, 617, 2178, 732], [-628, 244, -374, -479, 3095, 439], [-536, 210, -408, -8, 2840, 775], [-519, 209, -375, 209, 2317, 743], [-491, 203, -418, 308, 2309, 587], [-384, 204, -468, -762, 2699, 113], [-449, 207, -469, -312, 2064, 366], [-412, 196, -438, 25, 2224, 554], [-311, 168, -436, 818, 2081, 770], [-335, 185, -444, -173, 2756, 675], [-314, 172, -473, 866, 1620, 673], [-343, 196, -464, -87, 2337, 544], [-319, 178, -507, -353, 2211, 315], [-291, 168, -445, -390, 2425, 333], [-267, 183, -460, -181, 2524, 634], [-244, 165, -503, -456, 2178, 267], [-150, 158, -450, -8, 2304, 747], [-181, 125, -406, -431, 2065, 101], [-330, 185, -482, -425, 2666, 354], [-147, 146, -471, -316, 1684, 261], [-144, 137, -428, -360, 1969, 244], [-187, 176, -463, -50, 2283, 636], [-174, 170, -519, -134, 1660, 362], [-152, 167, -472, -102, 2131, 550], [-125, 145, -407, -234, 2420, 540], [-166, 158, -436, -115, 2035, 511], [-108, 158, -397, 307, 1924, 901], [-144, 145, -450, -240, 1895, 333], [-99, 145, -439, -141, 1949, 445], [-78, 145, -449, 14, 1461, 391], [-62, 119, -377, -287, 1892, 285], [-125, 135, -445, -427, 1748, 172], [-21, 140, -449, 16, 1617, 493], [-28, 143, -348, 768, 1116, 835], [-61, 123, -391, -233, 1841, 325], [-163, 148, -491, -452, 1821, 152], [4, 87, -290, -451, 2232, 30], [-68, 136, -472, -420, 1387, 136], [-63, 126, -432, -226, 972, 157], [-2, 110, -336, 227, 975, 373], [8, 105, -353, -287, 1232, 140], [38, 67, -171, -35, 1991, 830], [4, 132, -347, 1295, 477, 533], [13, 114, -360, 446, 451, 215], [19, 87, -320, -998, 656, -154], [49, 91, -297, -169, 1696, 346], [37, 102, -306, 1105, 595, 609], [51, 77, -271, 1013, 163, 261], [72, 86, -288, -81, 1311, 305], [59, 77, -254, 181, 1240, 515], [55, 78, -271, 555, 684, 441], [66, 50, -261, 755, 293, 285], [91, 74, -188, -285, 952, 41], [96, 74, -189, -413, 1516, -29], [57, 47, -132, 609, 1305, 1137], [50, 68, -212, -270, 727, 33], [59, 69, -206, -28, 144, 27], [81, 36, -107, -16, 1575, 550], [102, 54, -137, -117, 959, 166], [77, 54, -172, 101, 951, 330], [81, 28, -88, 152, 786, 320], [81, 19, -140, 392, 320, 238], [75, 22, -87, 238, 490, 248], [80, 50, -75, -213, 653, 25], [97, 43, -91, -130, 1063, 176], [65, 39, -135, 339, 393, 246], [73, 32, -89, 135, 982, 397], [54, 54, -95, -397, 358, -84], [60, 50, -72, -406, 718, -101], [33, 20, -73, 279, -110, 34], [37, 21, -51, 71, 22, 25], [35, 28, -48, 210, 130, 103], [35, 43, -45, -445, 100, -119], [20, 35, -17, 0, 0, 0], [29, 31, -34, -84, -21, -27], [31, 26, -56, 125, -62, 16], [30, 40, -36, -332, 6, -88], [11, 28, -19, 0, 0, 0], [7, 19, -4, 0, 0, 0], [14, 45, -7, 0, 0, 0], [26, 47, -21, 0, -1, 0], [23, 39, -3, 0, 0, 0], [16, 26, -14, 0, 0, 0], [24, 12, 5, 0, 0, 0], [-24, 55, -27, 0, 0, 0], [-15, 12, 22, 0, 0, 0], [-13, 26, 25, 0, 0, 0], [8, 32, -19, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[354, 647, 230, 195, 2192, -2064], [481, 745, 51, -2835, -313, -982], [281, 555, 277, -1954, 67, -1072], [342, 633, 281, -147, 2002, -2012], [375, 687, 250, -195, 1810, -2166], [368, 631, 166, -1498, 351, -1095], [427, 716, 181, -2483, -839, -1243], [327, 618, 216, 447, 2221, -1950], [193, 467, 205, -2302, -758, -1108], [104, 374, 250, -1306, 358, -560], [109, 420, 221, -1787, -398, -1172], [385, 672, 214, 74, 2116, -2071], [384, 635, 155, 87, 1723, -1948], [257, 548, 210, -1696, -132, -1172], [154, 520, 211, -1670, 73, -762], [278, 583, 219, -1655, -172, -1311], [31, 343, 164, -1331, -66, -552], [196, 526, 227, -1220, 172, -929], [259, 580, 223, -1710, 29, -1108], [163, 434, 222, -1511, -305, -1505], [191, 511, 258, -629, 407, -582], [-6, 24, 64, 120, -162, 256], [251, 590, 254, -1442, -90, -1306], [89, 446, 233, -1405, 191, -575], [31, 348, 172, -1633, -14, -277], [168, 511, 229, -1486, 53, -827], [49, 348, 190, -1667, -111, -727], [133, 468, 229, -1228, 72, -1078], [128, 460, 232, -1355, 110, -932], [96, 400, 227, -1346, -55, -1278], [75, 389, 212, -1251, 74, -567], [44, 358, 217, -1310, -21, -908], [35, 374, 209, -1268, 152, -421], [-18, 169, 139, -2214, -473, -556], [32, 333, 205, -1190, 66, -654], [20, 359, 242, -1352, -36, -776], [7, 272, 214, -1434, 51, -164], [65, 411, 254, -626, 310, -966], [34, 334, 213, -872, 162, -1091], [2, 246, 163, -1428, -167, -767], [5, 294, 204, -716, 96, -442], [-11, 84, 156, -1856, -63, 271], [-40, 85, 136, -2339, -676, -610], [-19, 185, 149, -1534, -420, -1329], [-39, 168, 174, -771, 63, -548], [5, 171, 207, -1259, 20, 348], [-51, 69, 170, -1994, -431, -532], [-48, 26, 123, -1708, -429, -693], [-2, 172, 179, -1144, -15, 479], [-20, 134, 156, -1408, -102, 32], [-34, 66, 134, -1623, -280, -394], [-41, -4, 105, 2930, -890, -437], [4, 99, 140, -593, -126, 334], [1, 90, 153, -596, -107, 204], [-27, 41, 147, -760, -73, -119], [-31, 48, 116, -354, 10, -144], [-41, 72, 117, -530, 68, -429], [-3, 28, 99, -414, -91, 77], [-1, 54, 106, -494, -135, 212], [-17, 33, 87, -383, -24, -89], [-7, 28, 82, -259, -52, 26], [-11, 16, 85, -292, -34, -26], [-7, 26, 62, -135, -37, 27], [-9, 27, 48, -33, -7, 1], [-11, 28, 34, 0, 0, 0], [-8, 29, 51, -26, 0, -9], [-6, 31, 23, -1, 0, -1], [8, 21, 10, 0, 0, 0], [7, 21, -5, 0, 0, -1], [14, 41, 28, 0, 0, 0], [1, 46, 27, 0, 0, 0], [11, 31, 7, 0, 0, 0], [17, 10, -11, 0, 0, 0], [-3, 50, 23, 0, 0, 0], [23, 2, 3, 0, 0, 0], [26, 33, -7, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-534, 206, -405, 639, 2291, 748], [-674, 256, -320, -490, -3105, 448], [-597, 219, -380, -8, 2935, 794], [-589, 214, -341, 246, 2381, 758], [-547, 205, -375, 331, 2361, 591], [-441, 217, -452, -781, 2765, 112], [-496, 215, -450, -320, 2166, 381], [-471, 203, -413, 28, 2327, 568], [-367, 167, -424, 872, 2141, 783], [-404, 195, -438, -190, 2877, 681], [-373, 177, -469, 877, 1698, 680], [-402, 199, -439, -100, 2472, 546], [-364, 183, -474, -359, 2351, 326], [-343, 177, -434, -398, 2511, 345], [-333, 194, -470, -228, 2732, 620], [-292, 173, -490, -467, 2261, 276], [-203, 164, -490, -34, 2495, 740], [-234, 140, -425, -430, 2202, 162], [-393, 196, -473, -457, 2836, 359], [-188, 151, -467, -334, 1893, 285], [-196, 147, -440, -379, 2151, 272], [-245, 183, -469, -110, 2514, 611], [-218, 177, -524, -167, 1830, 381], [-196, 176, -490, -151, 2319, 540], [-182, 159, -443, -255, 2513, 532], [-228, 169, -440, -154, 2177, 512], [-159, 166, -429, 231, 2144, 865], [-197, 154, -458, -269, 2084, 353], [-152, 154, -447, -190, 2137, 448], [-123, 153, -460, -26, 1637, 412], [-114, 130, -399, -296, 1954, 293], [-174, 147, -465, -458, 1973, 212], [-55, 151, -470, -91, 1962, 514], [-62, 158, -378, 566, 1435, 832], [-113, 134, -413, -269, 2028, 342], [-215, 161, -513, -473, 1961, 175], [-42, 97, -324, -453, 2291, 65], [-113, 143, -492, -433, 1549, 156], [-110, 138, -464, -229, 1167, 198], [-36, 126, -378, 205, 1066, 392], [-32, 114, -390, -295, 1345, 158], [20, 83, -209, -25, 1961, 786], [-26, 156, -383, 1231, 630, 602], [-14, 133, -402, 437, 558, 255], [-9, 90, -358, -959, 811, -140], [15, 104, -337, -203, 1832, 353], [8, 124, -345, 1010, 857, 697], [42, 95, -308, 1027, 326, 339], [44, 100, -335, -124, 1509, 331], [30, 96, -299, 145, 1353, 533], [34, 98, -314, 518, 890, 511], [55, 73, -308, 801, 416, 354], [89, 81, -226, -355, 1261, 45], [79, 79, -227, -433, 1640, -36], [42, 70, -171, 504, 1410, 1073], [38, 79, -264, -268, 847, 65], [56, 83, -261, -26, 348, 77], [74, 46, -134, -104, 1851, 585], [101, 63, -178, -148, 1119, 184], [68, 67, -213, 66, 1158, 380], [86, 35, -118, 142, 1010, 411], [91, 25, -182, 513, 490, 359], [85, 28, -120, 304, 755, 406], [92, 59, -105, -324, 1019, -5], [102, 50, -120, -207, 1436, 196], [70, 52, -183, 359, 483, 286], [77, 41, -126, 99, 1227, 478], [59, 61, -136, -426, 423, -87], [65, 55, -99, -509, 972, -170], [39, 20, -112, 415, -136, 39], [52, 13, -86, 292, 99, 110], [44, 34, -79, 274, 189, 146], [45, 55, -76, -622, 144, -169], [36, 23, -45, 112, 52, 45], [33, 48, -62, -206, -55, -61], [37, 28, -87, 265, -107, 26], [37, 61, -57, -664, -16, -172], [37, 29, -38, 23, 168, 46], [22, 26, -23, -1, 1, 0], [22, 36, -21, -1, -1, -1], [28, 26, -32, 65, -4, 17], [26, 33, -19, 0, 0, 0], [28, 28, -31, 5, 49, 12], [26, 18, -9, 0, 0, 0], [-9, 47, -28, 0, 0, 0], [-8, 14, 14, 0, 0, 0], [-10, 26, 20, 0, 0, 0], [15, 31, -23, 0, 0, 0], [-12, 4, -21, 0, 0, 0], [-22, 23, 0, 0, 0, 0], [-25, 15, -2, 0, 0, 0], [2, 45, -12, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0], [[385, 670, 212, -33, 2211, -2192], [491, 754, 11, -2975, -271, -946], [322, 582, 271, -2251, 12, -1096], [380, 659, 264, -343, 2034, -2139], [408, 712, 229, -234, 1836, -2212], [402, 648, 135, -1663, 364, -1120], [458, 741, 158, 470, 2254, -1978], [371, 650, 197, 318, 2202, -2007], [241, 517, 212, -2487, -820, -1051], [149, 408, 266, -1385, 409, -585], [140, 464, 248, -2166, -618, -1257], [422, 698, 184, -69, 2164, -2174], [412, 658, 110, 112, 1932, -2052], [307, 581, 193, -2039, -256, -1162], [205, 557, 218, -1740, 126, -891], [325, 611, 196, -2146, -470, -1306], [59, 379, 200, -1294, 8, -635], [244, 559, 218, -1387, 166, -1033], [318, 613, 201, -1845, -6, -1133], [218, 477, 217, -1792, -555, -1493], [239, 542, 248, -726, 513, -700], [3, 11, 89, 120, -162, 256], [294, 622, 241, -1768, -324, -1331], [129, 477, 243, -1415, 249, -670], [59, 393, 183, -1542, 8, -469], [225, 559, 232, -1604, 60, -917], [81, 394, 211, -1674, -56, -870], [187, 513, 231, -1305, 50, -1132], [184, 505, 234, -1457, 111, -1024], [141, 447, 236, -1613, -243, -1349], [112, 439, 218, -1261, 91, -661], [82, 406, 221, -1330, -24, -975], [71, 411, 224, -1244, 234, -572], [-4, 208, 136, -2084, -457, -684], [68, 386, 219, -1193, 88, -725], [49, 405, 245, -1480, -73, -969], [27, 326, 212, -1459, 54, -320], [107, 460, 263, -684, 343, -1108], [71, 392, 230, -898, 188, -1196], [21, 297, 179, -1370, -111, -888], [28, 349, 222, -729, 161, -611], [-14, 111, 153, -2009, -44, 252], [-30, 114, 129, -2501, -761, -625], [0, 227, 163, -1549, -425, -1386], [-29, 212, 190, -882, 76, -701], [4, 216, 217, -1425, 87, 270], [-45, 98, 166, -2293, -549, -532], [-46, 38, 122, -2619, -877, -596], [-4, 226, 193, -1202, 28, 410], [-19, 180, 167, -1486, -78, -48], [-32, 91, 138, -1945, -378, -435], [-36, 1, 97, 2930, -890, -437], [2, 135, 159, -788, -84, 383], [0, 125, 179, -827, -73, 239], [-32, 63, 171, -1103, -108, -164], [-41, 68, 145, -526, 8, -219], [-45, 103, 137, -650, 64, -538], [-2, 39, 126, -826, -130, 177], [-1, 81, 132, -648, -136, 273], [-25, 51, 118, -569, -39, -132], [-6, 35, 111, -470, -87, 56], [-12, 18, 95, -712, -92, -44], [-1, 25, 93, -450, -106, 111], [-10, 40, 87, -170, -33, 11], [-8, 31, 73, -140, -32, 18], [-17, 31, 81, -210, -1, -67], [-10, 28, 60, -73, -8, -8], [-1, 25, 32, 0, 0, 0], [0, 24, 20, 0, 0, -1], [3, 35, 41, -1, 0, -1], [-4, 36, 42, 0, 0, 0], [3, 30, 26, 0, 0, 0], [12, 14, 3, 0, 0, 0], [-5, 43, 35, 0, 0, 0], [18, 7, 12, 0, 0, 0], [22, 32, 0, 0, 0, 0], [24, 5, -21, 0, 0, 0], [-12, 28, 0, 0, 0, 0], [-7, 13, 15, 0, 0, 0], [5, 55, 7, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-579, 213, -372, 684, 2456, 779], [-715, 268, -267, -504, -2996, 462], [-654, 227, -350, -9, 3123, 837], [-655, 222, -300, 313, 2481, 788], [-599, 210, -329, 354, 2391, 595], [-494, 230, -436, -822, 2913, 110], [-539, 223, -426, -331, 2323, 404], [-528, 212, -383, 39, 2415, 584], [-423, 170, -404, 975, 2189, 809], [-471, 204, -424, -203, 2980, 691], [-429, 182, -462, 917, 1876, 701], [-464, 203, -402, -90, 2567, 555], [-408, 188, -433, -350, 2453, 336], [-397, 187, -415, -407, 2669, 374], [-399, 205, -472, -265, 2924, 612], [-339, 180, -472, -493, 2470, 298], [-259, 170, -518, -51, 2637, 741], [-292, 158, -437, -449, 2352, 213], [-457, 208, -449, -474, 2940, 364], [-234, 156, -452, -337, 1954, 292], [-253, 158, -442, -395, 2316, 299], [-305, 188, -466, -128, 2607, 604], [-261, 183, -522, -197, 1983, 394], [-242, 183, -498, -187, 2468, 530], [-241, 172, -473, -304, 2745, 518], [-296, 178, -436, -180, 2300, 516], [-212, 173, -455, 174, 2400, 837], [-254, 164, -455, -280, 2176, 363], [-210, 162, -446, -226, 2296, 449], [-169, 161, -467, -77, 1861, 431], [-168, 141, -417, -309, 2060, 308], [-228, 159, -473, -473, 2069, 227], [-96, 159, -479, -177, 2236, 507], [-104, 168, -405, 412, 1709, 804], [-171, 146, -428, -284, 2114, 351], [-268, 173, -527, -512, 2198, 209], [-95, 110, -360, -458, 2354, 101], [-160, 150, -505, -451, 1782, 183], [-162, 149, -487, -236, 1359, 236], [-76, 140, -414, 155, 1272, 430], [-74, 124, -421, -312, 1576, 198], [0, 97, -252, -30, 1970, 741], [-64, 174, -412, 1097, 900, 691], [-47, 150, -437, 417, 700, 306], [-43, 95, -390, -897, 1038, -107], [-21, 116, -373, -252, 2033, 359], [-33, 144, -379, 893, 1104, 751], [23, 112, -340, 1e3, 592, 458], [9, 114, -377, -155, 1643, 344], [-6, 114, -340, 90, 1501, 545], [6, 117, -354, 443, 1142, 573], [37, 96, -350, 822, 638, 472], [75, 88, -263, -413, 1556, 42], [56, 84, -265, -457, 1845, -34], [24, 94, -219, 412, 1506, 1e3], [21, 92, -315, -270, 960, 95], [41, 96, -314, -28, 459, 105], [58, 58, -166, -143, 1961, 576], [93, 72, -217, -180, 1281, 199], [49, 81, -257, 41, 1269, 399], [85, 45, -150, 117, 1181, 467], [89, 39, -224, 573, 617, 446], [85, 39, -156, 309, 968, 515], [91, 65, -141, -364, 1174, -22], [95, 57, -153, -249, 1628, 198], [68, 66, -231, 366, 577, 321], [72, 55, -169, 72, 1345, 503], [61, 68, -178, -456, 558, -77], [63, 59, -136, -545, 1130, -192], [45, 23, -153, 627, -112, 47], [64, 15, -126, 388, 145, 153], [53, 43, -117, 293, 246, 170], [54, 65, -112, -707, 195, -186], [52, 17, -80, 266, 127, 117], [42, 63, -101, -303, -58, -74], [44, 34, -122, 379, -102, 36], [45, 76, -85, -955, -22, -219], [62, 33, -68, 36, 307, 87], [42, 35, -51, -42, 141, 17], [36, 21, -46, 141, 48, 53], [32, 10, -49, 716, -86, 162], [31, 24, -45, 179, -34, 38], [43, 33, -56, 12, 131, 33], [29, 30, -34, -25, -18, -11], [17, 34, -30, -1, -1, 0], [5, 20, -2, 0, 0, 0], [1, 27, 5, 0, 0, 0], [29, 28, -32, 48, 136, 47], [-1, 11, -24, 0, 0, 0], [-13, 24, -5, 0, 0, 0], [-20, 16, -4, 0, 0, 0], [5, 43, -15, 0, 0, 0], [-13, 36, -7, 0, 0, 0], [-16, 38, -14, 0, 0, 0], [-11, 28, 7, 0, 0, 0], [10, 15, -11, 0, 0, 0], 0, 0, 0, 0], [[409, 687, 188, 2885, -835, -797], [492, 758, -27, -3115, -201, -909], [356, 603, 252, -2407, -17, -1097], [410, 679, 238, 2697, -1056, -923], [437, 731, 204, -292, 1892, -2287], [426, 661, 99, -1896, 389, -1141], [480, 758, 131, 347, 2258, -2049], [407, 677, 171, 221, 2219, -2069], [292, 567, 205, -2573, -831, -1006], [193, 441, 276, -1462, 448, -602], [180, 503, 264, 454, 2183, -1882], [450, 717, 147, -143, 2212, -2236], [428, 677, 60, 120, 2069, -2116], [350, 610, 163, -2202, -287, -1133], [264, 588, 214, -1843, 172, -981], [367, 633, 165, -2358, -567, -1279], [93, 413, 234, -1298, 57, -684], [295, 587, 195, -1575, 146, -1088], [371, 641, 173, -2063, -54, -1146], [271, 519, 208, -2202, -844, -1410], [288, 568, 222, -823, 609, -782], [9, 2, 105, 120, -162, 256], [334, 650, 225, -2164, -604, -1323], [172, 506, 248, -1441, 303, -747], [100, 435, 198, -1508, 44, -597], [282, 601, 223, -1786, 46, -991], [128, 441, 232, -1750, -34, -968], [243, 554, 226, -1440, -4, -1173], [244, 547, 228, -1571, 93, -1068], [194, 493, 238, -2082, -607, -1368], [154, 486, 221, -1298, 104, -754], [126, 452, 223, -1409, -54, -1094], [116, 445, 237, -1248, 330, -704], [16, 252, 142, -1990, -433, -752], [109, 437, 232, -1231, 122, -851], [89, 447, 244, -1559, -110, -1054], [53, 379, 210, -1454, 52, -468], [156, 506, 263, -755, 340, -1196], [118, 450, 245, -1010, 149, -1307], [46, 347, 196, -1336, -59, -1005], [63, 402, 238, -745, 212, -745], [-17, 142, 147, -2074, -45, 199], [-15, 150, 120, -2425, -766, -726], [20, 270, 178, -1571, -433, -1478], [-12, 258, 204, -977, 90, -879], [8, 267, 222, -1526, 128, 131], [-33, 133, 155, -2425, -611, -548], [-37, 55, 113, -2798, -950, -541], [2, 285, 205, -1227, 61, 310], [-15, 227, 178, -1533, -41, -210], [-27, 126, 135, -2013, -404, -469], [-26, 13, 81, 2931, -890, -437], [-1, 181, 176, -905, -33, 345], [-2, 168, 198, -946, -39, 226], [-34, 91, 189, -1469, -149, -216], [-46, 94, 169, -697, 3, -299], [-45, 137, 155, -757, 60, -646], [-4, 61, 144, -1098, -123, 238], [-3, 113, 155, -882, -96, 329], [-31, 74, 144, -779, -53, -185], [-7, 48, 134, -956, -121, 138], [-13, 25, 99, -1638, -213, 4], [2, 31, 116, -704, -140, 191], [-11, 56, 122, -479, -67, 36], [-6, 41, 108, -265, -55, 37], [-25, 36, 106, -406, -14, -128], [-14, 30, 98, -403, -48, -35], [-12, 30, 61, -71, 4, -28], [-10, 29, 57, -87, -1, -23], [-17, 25, 64, -142, 35, -112], [-12, 24, 62, -41, 1, -14], [-10, 28, 56, -57, 4, -24], [4, 19, 23, 0, 0, 0], [-9, 32, 52, 0, 0, 0], [10, 13, 24, 0, 0, 0], [16, 32, 12, 0, -1, 0], [17, 10, -5, 0, 0, 0], [-12, 28, 6, 0, 0, 0], [-7, 16, 23, 0, 0, 0], [3, 51, 13, 0, 0, 0], [24, 59, -12, 0, 0, 0], [21, 42, 6, 0, 0, 0], [9, 24, -4, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-618, 222, -333, 737, 2606, 816], [-748, 280, -210, -517, -2881, 479], [-700, 238, -308, -12, -3067, 860], [-713, 233, -251, 353, 2541, 809], [-647, 216, -281, 398, 2437, 604], [-544, 240, -409, -871, 3102, 103], [-578, 231, -392, -338, 2439, 421], [-582, 222, -344, 55, 2495, 602], [-482, 180, -375, 1033, 2201, 824], [-535, 214, -406, -214, 3072, 704], [-484, 189, -442, 963, 2040, 727], [-527, 208, -355, -71, 2604, 565], [-454, 194, -381, -331, 2482, 341], [-455, 200, -385, -407, 2738, 390], [-466, 213, -458, -293, 3093, 609], [-385, 187, -447, -502, 2567, 309], [-312, 176, -538, -61, 2722, 743], [-357, 181, -437, -481, 2487, 243], [-518, 218, -420, -498, 3094, 375], [-279, 162, -435, -330, 2081, 308], [-318, 171, -433, -406, 2434, 321], [-365, 193, -455, -145, 2735, 601], [-304, 189, -517, -229, 2152, 405], [-287, 188, -499, -214, 2601, 521], [-305, 184, -489, -340, 2933, 509], [-368, 188, -425, -193, 2419, 526], [-275, 176, -466, 149, 2601, 828], [-313, 173, -447, -288, 2268, 375], [-273, 170, -437, -239, 2382, 452], [-219, 167, -465, -118, 2059, 442], [-224, 152, -430, -321, 2166, 326], [-284, 172, -474, -506, 2260, 254], [-142, 166, -480, -251, 2489, 485], [-154, 172, -424, 349, 1851, 784], [-231, 157, -439, -306, 2265, 368], [-321, 185, -528, -534, 2315, 223], [-152, 125, -394, -470, 2434, 132], [-210, 156, -506, -461, 1930, 199], [-217, 161, -499, -248, 1563, 276], [-120, 154, -444, 103, 1478, 459], [-124, 134, -443, -327, 1757, 228], [-21, 111, -297, -50, 2031, 704], [-107, 188, -435, 934, 1201, 748], [-80, 165, -468, 359, 977, 392], [-83, 104, -415, -830, 1298, -51], [-66, 128, -403, -298, 2227, 359], [-83, 159, -407, 781, 1323, 778], [-5, 127, -366, 947, 797, 535], [-33, 127, -413, -185, 1772, 355], [-44, 131, -378, 6, 1724, 550], [-33, 135, -388, 394, 1275, 596], [9, 119, -385, 801, 799, 549], [49, 93, -297, -450, 1789, 42], [24, 89, -301, -464, 1951, -22], [3, 115, -272, 313, 1653, 926], [-5, 105, -361, -276, 1076, 124], [22, 109, -362, -31, 575, 134], [33, 74, -207, -149, 1973, 559], [77, 81, -255, -233, 1536, 217], [23, 96, -299, 8, 1395, 416], [78, 56, -182, 46, 1479, 536], [80, 55, -262, 602, 762, 532], [77, 54, -195, 290, 1094, 563], [89, 71, -177, -424, 1455, -49], [82, 64, -185, -271, 1736, 198], [65, 79, -276, 365, 688, 359], [63, 68, -212, 18, 1538, 526], [55, 75, -223, -463, 653, -63], [54, 62, -181, -544, 1238, -172], [50, 39, -200, 759, -35, 75], [72, 21, -167, 583, 271, 261], [58, 56, -164, 300, 328, 197], [61, 72, -154, -796, 322, -196], [65, 18, -118, 382, 196, 179], [50, 77, -142, -381, -24, -72], [50, 43, -160, 500, -23, 66], [53, 82, -125, -1062, 2, -229], [83, 37, -98, 43, 571, 164], [60, 46, -88, -81, 296, 36], [50, 13, -77, 431, 131, 182], [38, 6, -70, 1049, -159, 208], [39, 20, -83, 364, -55, 70], [56, 40, -89, 20, 315, 82], [34, 42, -66, -105, -73, -40], [49, 19, -34, 144, 302, 136], [23, 26, -24, -2, 9, 1], [21, 28, -21, 0, 0, 0], [49, 27, -51, 132, 441, 177], [16, 21, -28, 0, 0, 0], [3, 26, -15, 0, 0, 0], [-3, 21, -14, 0, 0, 0], [16, 36, -22, 0, -1, -1], [2, 33, -15, 0, 0, 0], [-5, 36, -18, -1, -1, -1], [-2, 28, -2, 0, 0, 0], [13, 17, -14, -1, 0, -1], [22, 16, -5, 0, 0, 0], [-2, 21, -22, 0, 0, 0], [-8, 35, 0, 0, 0, 0], [13, 43, 17, 0, 0, 0]], [[424, 698, 158, 2699, -705, -671], [487, 758, -62, 2938, -54, -861], [386, 622, 232, -2617, -49, -1089], [435, 694, 208, 2618, -998, -856], [459, 747, 177, 2728, -1106, -699], [442, 670, 62, -2186, 443, -1157], [496, 772, 103, 97, 2340, -2222], [437, 699, 142, 63, 2308, -2197], [337, 613, 192, -2675, -821, -931], [235, 473, 281, -1542, 484, -619], [224, 537, 268, 49, 1971, -1954], [470, 732, 109, 2948, -882, -860], [437, 692, 11, 125, 2185, -2165], [388, 636, 131, -2325, -282, -1095], [321, 613, 201, -1996, 218, -1061], [400, 652, 129, -2628, -611, -1211], [131, 445, 262, -1348, 133, -755], [341, 611, 162, -1681, 140, -1099], [414, 664, 138, -2271, -82, -1140], [321, 562, 190, -2346, -850, -1305], [333, 591, 188, -897, 681, -824], [13, -4, 115, 120, -162, 256], [368, 672, 202, 411, 2212, -1908], [213, 531, 250, -1541, 434, -913], [149, 475, 213, -1518, 78, -666], [336, 635, 203, -1986, 20, -1032], [184, 487, 245, -1911, -49, -1039], [297, 591, 213, -1567, -60, -1190], [302, 586, 215, -1681, 70, -1086], [253, 538, 228, -2376, -815, -1341], [199, 531, 221, -1361, 111, -829], [176, 496, 221, -1489, -92, -1142], [170, 477, 244, -1285, 411, -786], [38, 296, 153, -1919, -409, -809], [158, 486, 240, -1319, 137, -961], [133, 485, 240, -1662, -169, -1127], [92, 430, 208, -1448, 50, -612], [207, 547, 259, -958, 251, -1308], [175, 505, 251, -1180, 35, -1360], [81, 398, 215, -1350, -39, -1083], [104, 452, 250, -772, 246, -841], [-17, 178, 139, -2027, -72, 93], [3, 192, 117, -2211, -695, -848], [50, 319, 198, 826, 1989, -1604], [16, 307, 214, -1003, 99, -958], [23, 324, 220, -1552, 138, 7], [-17, 173, 140, -2425, -636, -599], [-25, 77, 100, -2854, -980, -533], [14, 342, 216, -1235, 90, 190], [1, 281, 189, -1531, -11, -364], [-18, 165, 132, -1997, -406, -520], [-11, 29, 59, 2931, -890, -437], [-1, 239, 189, -963, 15, 225], [0, 217, 212, -1106, 20, 147], [-34, 127, 198, -1616, -166, -247], [-48, 123, 188, -1052, -38, -471], [-42, 171, 170, -944, 38, -852], [-8, 89, 157, -1484, -72, 285], [-5, 155, 173, -974, -65, 325], [-34, 104, 165, -958, -63, -239], [-10, 70, 149, -1245, -111, 176], [-14, 34, 99, -2368, -251, 101], [1, 45, 132, -1317, -116, 380], [-14, 86, 149, -666, -70, 43], [-5, 54, 140, -511, -83, 77], [-31, 46, 125, -676, -41, -208], [-19, 46, 127, -751, -83, -56], [-21, 43, 89, -267, 5, -105], [-21, 41, 98, -357, -13, -95], [-37, 23, 90, -423, 57, -341], [-20, 13, 84, -112, 2, -39], [-22, 34, 87, -394, 1, -165], [-9, 28, 53, -61, 4, -26], [-13, 18, 74, 0, 0, 0], [0, 21, 40, 0, 0, 0], [4, 30, 32, 0, -1, 0], [9, 15, 12, 0, 0, 0], [-11, 28, 27, 0, 0, 0], [-9, 24, 44, 0, 0, 0], [-1, 43, 29, 0, 0, 0], [19, 54, -2, -1, -1, -1], [16, 39, 15, 0, 0, 0], [7, 25, 2, 0, 0, 0], [22, 11, 13, 0, 0, 0], [-27, 56, -24, 0, 0, 0], [-16, 12, 24, 0, 0, 0], [-14, 26, 25, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-652, 234, -284, 783, 2715, 849], [-774, 292, -150, -539, -2683, 508], [-741, 249, -267, -21, -2939, 891], [-763, 247, -199, 387, 2593, 828], [-690, 226, -230, 489, 2522, 627], [-590, 250, -376, -917, -2970, 94], [-613, 238, -355, -346, 2663, 454], [-632, 233, -302, 89, 2642, 641], [-539, 193, -342, 1119, 2216, 846], [-594, 224, -383, -226, -3119, 718], [-536, 199, -411, 1011, 2190, 757], [-587, 216, -305, -48, 2631, 576], [-500, 203, -327, -303, 2478, 343], [-513, 213, -353, -404, 2797, 408], [-529, 222, -436, -320, -2996, 612], [-432, 195, -413, -506, 2699, 327], [-364, 181, -549, -80, 2874, 749], [-424, 203, -427, -503, 2564, 255], [-575, 230, -381, -518, -3041, 387], [-327, 169, -411, -306, 2139, 318], [-386, 185, -417, -411, 2508, 336], [-424, 197, -440, -151, 2839, 607], [-346, 193, -501, -279, 2432, 415], [-331, 193, -497, -268, 2912, 500], [-370, 195, -494, -362, 3057, 504], [-443, 198, -404, -193, 2518, 544], [-342, 180, -466, 137, 2797, 836], [-373, 183, -431, -291, 2332, 385], [-337, 177, -424, -242, 2440, 459], [-275, 172, -449, -133, 2161, 448], [-282, 164, -439, -332, 2264, 343], [-340, 183, -467, -523, 2358, 266], [-191, 170, -470, -293, 2655, 463], [-206, 174, -439, 316, 1959, 773], [-297, 170, -441, -325, 2406, 387], [-373, 195, -521, -556, 2433, 235], [-220, 145, -424, -493, 2545, 158], [-261, 162, -502, -472, 2124, 221], [-277, 172, -497, -256, 1674, 296], [-171, 165, -464, 68, 1620, 475], [-178, 145, -458, -338, 1883, 249], [-49, 124, -344, -78, 2140, 677], [-156, 196, -451, 781, 1483, 767], [-121, 176, -485, 276, 1271, 460], [-130, 116, -432, -805, 1412, -21], [-122, 140, -424, -326, 2351, 359], [-138, 172, -430, 713, 1463, 787], [-39, 140, -387, 842, 1081, 615], [-80, 139, -442, -217, 1911, 364], [-95, 146, -410, -67, 1928, 544], [-76, 150, -417, 355, 1376, 610], [-26, 140, -413, 754, 975, 619], [9, 99, -327, -472, 1987, 51], [-17, 96, -335, -470, 2098, 12], [-28, 133, -330, 268, 1745, 896], [-34, 118, -402, -302, 1327, 183], [0, 121, -405, -46, 830, 195], [5, 90, -252, -159, 1993, 527], [50, 90, -291, -255, 1648, 224], [-11, 110, -339, -24, 1510, 428], [60, 69, -217, 1, 1620, 549], [68, 73, -298, 595, 998, 648], [61, 72, -234, 223, 1326, 616], [72, 76, -216, -448, 1605, -57], [67, 71, -218, -307, 1912, 199], [55, 93, -318, 353, 830, 403], [42, 84, -259, -34, 1706, 530], [44, 82, -266, -467, 787, -38], [39, 68, -232, -530, 1350, -126], [49, 60, -250, 857, 110, 143], [74, 35, -209, 666, 364, 332], [59, 70, -214, 296, 499, 245], [60, 77, -205, -827, 469, -191], [73, 25, -156, 472, 274, 236], [55, 88, -187, -438, 41, -61], [52, 58, -204, 558, 108, 118], [59, 87, -165, -1162, 79, -235], [92, 46, -137, 26, 853, 242], [73, 57, -136, -101, 397, 51], [61, 15, -113, 577, 184, 256], [44, 13, -92, 1475, -231, 234], [48, 23, -128, 512, -31, 96], [66, 48, -127, 19, 486, 126], [41, 53, -103, -170, -78, -48], [72, 12, -50, 255, 639, 337], [44, 35, -53, -25, 135, 21], [44, 30, -55, 24, 70, 23], [64, 32, -83, 147, 529, 216], [45, 39, -38, -141, 237, -3], [22, 28, -27, 0, 9, 2], [26, 28, -30, -10, 57, 9], [36, 24, -37, 155, 161, 94], [24, 29, -29, 12, 34, 11], [19, 31, -27, -1, 0, -1], [13, 28, -17, 0, 0, 0], [24, 26, -27, -1, 0, -1], [26, 23, -19, 0, 0, 0], [11, 24, -26, 0, 0, 0], [-1, 33, -6, 0, 0, 0], [16, 41, 9, 0, 0, 0]], [[430, 702, 121, 2518, -542, -566], [472, 754, -94, 2740, 93, -840], [408, 638, 206, -2955, -72, -1060], [453, 704, 175, 2508, -891, -761], [474, 755, 147, 2625, -980, -584], [441, 675, 22, -2450, 535, -1169], [503, 779, 74, 3023, -667, -765], [458, 716, 110, -22, 2383, -2273], [376, 654, 174, -2803, -775, -815], [273, 505, 277, -1640, 524, -638], [268, 567, 260, -205, 1919, -2056], [485, 743, 71, 2814, -722, -738], [440, 705, -36, 128, 2322, -2220], [418, 659, 96, -2511, -222, -1018], [372, 632, 178, -2108, 250, -1095], [425, 666, 89, -2726, -580, -1171], [169, 474, 285, -1401, 178, -796], [383, 633, 129, -1791, 148, -1098], [448, 683, 101, -2498, -78, -1117], [364, 605, 159, -2426, -790, -1198], [371, 611, 147, -997, 780, -859], [14, -4, 117, 120, -162, 256], [395, 686, 170, 114, 2145, -2015], [258, 552, 239, -1613, 503, -990], [206, 513, 223, -1567, 122, -723], [383, 663, 174, -2136, 3, -1046], [245, 532, 247, -2114, -92, -1067], [346, 624, 196, -1879, -192, -1191], [355, 620, 198, -1807, 45, -1092], [310, 581, 208, 514, 2210, -1875], [247, 572, 214, -1518, 102, -930], [230, 539, 214, -1757, -235, -1203], [230, 507, 241, -1365, 493, -842], [61, 340, 167, -1836, -372, -899], [218, 533, 238, -1404, 130, -1012], [175, 521, 234, -1829, -274, -1193], [139, 480, 205, -1460, 51, -687], [260, 582, 243, -1389, -48, -1387], [231, 557, 253, -1847, -504, -1410], [125, 448, 233, -1420, -54, -1156], [149, 499, 257, -851, 284, -988], [-13, 218, 134, -1854, -111, -87], [22, 239, 125, -2013, -605, -942], [88, 373, 219, -66, 1120, -1619], [47, 355, 223, -1023, 108, -1033], [46, 379, 216, -1550, 138, -164], [4, 217, 130, -2321, -636, -696], [-9, 108, 85, -2734, -956, -605], [34, 395, 225, -1237, 113, 83], [29, 337, 201, -1518, 16, -490], [-6, 207, 134, -1835, -362, -673], [4, 46, 35, 2931, -890, -437], [7, 300, 202, -970, 37, 134], [6, 271, 221, -1202, 64, 16], [-30, 166, 201, -1852, -200, -328], [-45, 156, 199, -1250, -80, -569], [-29, 211, 182, -1063, 12, -1003], [-12, 125, 163, -1585, -52, 272], [-5, 200, 188, -1069, -17, 276], [-34, 136, 181, -1243, -82, -349], [-13, 97, 159, -1492, -87, 184], [-15, 52, 90, -2483, -251, 114], [-3, 65, 139, -1777, -20, 466], [-16, 118, 173, -958, -50, 20], [-6, 74, 165, -673, -87, 101], [-34, 63, 138, -1264, -155, -349], [-23, 72, 149, -1108, -108, -81], [-30, 58, 113, -475, 1, -192], [-30, 68, 135, -469, -14, -128], [-49, 34, 109, -893, -47, -664], [-25, 9, 97, -435, -13, -149], [-32, 49, 114, -781, -43, -320], [-23, 46, 91, -178, 13, -79], [-14, 14, 79, 0, 0, 0], [-11, 30, 58, -78, 22, -62], [-14, 28, 63, -82, 12, -47], [-1, 23, 36, 0, 0, 0], [-9, 29, 57, -78, -16, 5], [-10, 37, 71, -148, -26, 4], [-8, 30, 51, -9, 0, -3], [10, 46, 15, -1, -1, -1], [6, 35, 31, 0, 0, 0], [2, 26, 18, 0, 0, 0], [12, 16, 26, 0, 0, 0], [-25, 52, -14, 0, 0, 0], [-14, 15, 30, 0, 0, 0], [-13, 26, 29, -1, 0, 0], [8, 32, -16, 0, 0, 0], [-14, 4, -19, 0, 0, 0], [-23, 23, 1, 0, 0, 0], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-678, 249, -227, 833, 2812, 883], [-789, 304, -88, -560, -2497, 537], [-774, 261, -222, -48, -2718, 942], [-804, 262, -145, 435, 2673, 859], [-725, 240, -174, 556, 2585, 647], [-629, 257, -328, -950, -2784, 89], [-642, 246, -310, -349, 2832, 479], [-676, 246, -253, 109, 2721, 664], [-594, 209, -305, 1231, 2250, 880], [-648, 235, -354, -241, -3008, 737], [-583, 211, -369, 1056, 2314, 787], [-644, 226, -252, 23, 2704, 614], [-548, 214, -273, -265, 2461, 344], [-569, 227, -316, -400, 2906, 442], [-588, 230, -402, -337, -2868, 618], [-479, 204, -373, -500, 2743, 338], [-412, 186, -557, -95, 2989, 756], [-488, 225, -415, -532, 2656, 265], [-628, 241, -336, -538, -2882, 406], [-385, 179, -377, -272, 2137, 321], [-456, 201, -394, -416, 2602, 357], [-483, 202, -415, -151, 2898, 615], [-387, 197, -475, -304, 2615, 418], [-375, 197, -482, -288, 3067, 490], [-434, 205, -488, -384, -3096, 501], [-520, 211, -374, -187, 2591, 561], [-411, 184, -454, 134, 2962, 858], [-431, 193, -413, -290, 2473, 414], [-401, 186, -407, -236, 2497, 473], [-334, 178, -428, -134, 2267, 458], [-342, 177, -441, -351, 2427, 372], [-397, 195, -453, -557, 2550, 287], [-246, 172, -449, -317, 2782, 448], [-259, 176, -450, 290, 2116, 763], [-370, 184, -432, -333, 2484, 399], [-422, 205, -513, -582, 2569, 247], [-292, 166, -448, -512, 2628, 171], [-313, 169, -485, -478, 2295, 241], [-335, 182, -492, -271, 1878, 331], [-227, 175, -475, 37, 1757, 489], [-234, 156, -466, -355, 2078, 282], [-82, 135, -388, -123, 2338, 648], [-211, 198, -458, 673, 1705, 762], [-167, 184, -491, 234, 1407, 482], [-179, 129, -444, -787, 1516, 9], [-182, 151, -439, -357, 2502, 360], [-198, 182, -446, 646, 1615, 793], [-81, 150, -401, 789, 1204, 639], [-129, 151, -465, -244, 2030, 370], [-155, 159, -434, -119, 2090, 537], [-123, 164, -440, 252, 1642, 631], [-62, 160, -437, 680, 1169, 680], [-37, 105, -354, -474, 2068, 65], [-65, 105, -366, -474, 2215, 52], [-65, 148, -386, 185, 1969, 849], [-71, 131, -435, -325, 1484, 216], [-31, 132, -439, -73, 1078, 248], [-28, 107, -304, -170, 2025, 517], [20, 99, -323, -281, 1782, 233], [-48, 124, -375, -82, 1718, 443], [36, 84, -253, -44, 1743, 547], [44, 92, -328, 551, 1191, 721], [36, 91, -275, 146, 1517, 631], [51, 81, -253, -472, 1828, -48], [45, 79, -250, -324, 2e3, 202], [37, 106, -354, 300, 1143, 483], [11, 101, -308, -87, 1874, 525], [31, 90, -307, -469, 935, -8], [14, 79, -289, -525, 1406, -103], [36, 88, -300, 893, 285, 237], [67, 55, -250, 738, 540, 449], [51, 84, -264, 275, 710, 301], [49, 82, -261, -825, 571, -181], [77, 34, -194, 609, 443, 354], [57, 97, -232, -498, 174, -41], [46, 79, -254, 566, 192, 153], [60, 88, -209, -1217, 189, -239], [92, 56, -178, 5, 1014, 281], [80, 69, -186, -121, 519, 71], [68, 24, -151, 768, 296, 376], [50, 27, -118, 1599, -226, 250], [57, 33, -177, 591, 20, 120], [70, 59, -173, 7, 675, 172], [50, 64, -152, -208, -17, -37], [88, 12, -71, 289, 841, 471], [63, 45, -89, -54, 303, 49], [66, 34, -92, 74, 256, 86], [76, 37, -114, 168, 808, 335], [68, 54, -59, -217, 367, -18], [44, 31, -44, 0, 284, 65], [58, 37, -55, -51, 283, 43], [56, 18, -64, 250, 261, 169], [50, 26, -47, 69, 204, 73], [47, 25, -41, 87, 309, 111], [34, 29, -37, 21, 80, 24], [37, 35, -42, -130, 187, -7], [30, 33, -41, -70, -14, -22], [28, 28, -31, -17, 80, 12], [16, 31, -21, 0, 0, 0], [21, 35, -8, 0, 0, -1]], [[426, 699, 81, 2388, -398, -511], [446, 745, -122, 2649, 180, -842], [423, 649, 175, 3108, -61, -1034], [465, 711, 141, 2422, -790, -691], [481, 758, 113, 2505, -826, -472], [428, 675, -17, -2622, 646, -1181], [501, 780, 43, 2886, -552, -677], [470, 727, 76, 2980, -609, -749], [407, 688, 149, -2942, -683, -670], [307, 535, 267, -1832, 594, -680], [309, 592, 242, -363, 1968, -2163], [489, 748, 32, 2745, -630, -683], [437, 716, -80, -3027, -559, -823], [434, 676, 56, -2598, -165, -972], [413, 647, 148, -2196, 279, -1111], [442, 678, 49, -2807, -514, -1128], [207, 501, 299, -1494, 232, -849], [415, 651, 91, -1984, 189, -1079], [470, 697, 60, -2629, -51, -1098], [399, 644, 122, -2495, -701, -1080], [400, 629, 101, -1095, 889, -876], [13, -3, 115, 3059, 578, 273], [414, 695, 133, -31, 2167, -2089], [300, 570, 222, -1679, 551, -1031], [262, 549, 226, -1643, 167, -761], [422, 686, 141, -2293, -6, -1049], [304, 574, 238, -2317, -134, -1066], [388, 653, 172, -2065, -259, -1176], [401, 651, 174, -2050, 5, -1086], [360, 620, 182, 356, 2218, -1974], [295, 607, 198, -1733, 69, -1003], [286, 577, 197, -2072, -393, -1204], [290, 537, 225, -1418, 529, -856], [91, 385, 188, -1799, -339, -1007], [276, 577, 230, -1575, 98, -1062], [222, 552, 222, -2034, -408, -1230], [193, 527, 200, -1495, 54, -747], [311, 612, 219, -1779, -345, -1400], [289, 603, 243, 720, 2182, -1766], [169, 496, 247, -1672, -186, -1251], [203, 540, 253, -922, 288, -1056], [-2, 258, 138, -1679, -120, -254], [43, 288, 141, -1948, -571, -978], [128, 425, 238, -385, 880, -1719], [84, 402, 230, -1077, 108, -1155], [76, 431, 212, -1537, 136, -350], [25, 262, 127, -2216, -618, -774], [4, 139, 79, -2560, -901, -690], [56, 445, 234, -1241, 144, -49], [62, 392, 213, -1516, 35, -568], [12, 253, 144, -1745, -327, -744], [11, 54, 24, 2931, -890, -437], [25, 362, 214, -971, 49, 79], [20, 327, 226, -1230, 79, -70], [-19, 211, 196, -1982, -234, -420], [-35, 194, 204, -1485, -153, -698], [-5, 256, 191, -1131, -2, -1130], [-16, 164, 166, -1656, -35, 224], [-2, 245, 202, -1144, 37, 175], [-31, 173, 192, -1381, -96, -423], [-16, 130, 163, -1684, -64, 145], [-16, 78, 78, -2367, -262, 72], [-9, 96, 139, -1931, 21, 464], [-16, 161, 189, -1155, -24, -45], [-7, 98, 184, -954, -71, 127], [-34, 86, 144, -1474, -208, -392], [-25, 107, 164, -1284, -113, -110], [-34, 80, 132, -806, -25, -336], [-38, 96, 169, -595, -11, -173], [-54, 49, 123, -1549, -383, -899], [-26, 10, 102, -794, -70, -256], [-36, 78, 133, -976, -78, -397], [-35, 70, 125, -404, 27, -192], [-13, 17, 76, -3103, -471, 160], [-24, 49, 82, -199, 49, -165], [-31, 33, 95, -414, 24, -241], [-13, 32, 63, -147, 13, -71], [-8, 34, 89, -445, -82, 46], [-13, 54, 94, -352, -52, 9], [-18, 17, 83, -389, -17, -113], [-1, 36, 39, -1, -1, -1], [-9, 28, 55, -61, 10, -36], [-7, 28, 46, -15, 0, -5], [-2, 25, 46, 0, 0, 0], [-21, 46, 4, 0, 0, 0], [-11, 24, 46, 0, 0, 0], [-11, 28, 45, -1, 0, 0], [4, 31, -1, 0, 0, 0], [-13, 5, -13, 0, 0, 0], [-21, 24, 9, 0, 0, 0], [-25, 16, 2, 0, 0, 0], [1, 45, -10, 0, 0, 0], [-16, 37, -5, 0, 0, 0], [-18, 38, -13, 0, 0, 0], 0, 0, 0, 0, 0, 0, [-698, 268, -162, 875, 2885, 913], [-792, 317, -23, -571, -2393, 555], [-797, 275, -173, -79, -2549, 977], [-837, 278, -92, 473, 2743, 888], [-752, 258, -115, 625, 2657, 675], [-663, 265, -270, -968, -2641, 91], [-664, 255, -257, -344, 2932, 496], [-713, 262, -198, 137, 2847, 704], [-645, 230, -261, 1327, 2306, 920], [-694, 245, -320, -276, -2792, 771], [-625, 226, -320, 1098, 2416, 815], [-696, 242, -193, 57, 2744, 635], [-597, 228, -218, -194, 2442, 348], [-626, 245, -267, -400, 2967, 461], [-641, 239, -360, -349, -2769, 626], [-526, 215, -330, -485, 2775, 351], [-457, 191, -556, -120, -3116, 766], [-550, 244, -394, -590, 2834, 277], [-674, 253, -281, -549, -2785, 420], [-446, 193, -342, -235, 2115, 320], [-527, 218, -364, -422, 2698, 380], [-537, 208, -389, -148, 2978, 632], [-427, 200, -438, -310, 2710, 422], [-419, 200, -460, -298, -3112, 488], [-494, 215, -476, -407, -2963, 500], [-594, 225, -338, -179, 2677, 585], [-478, 190, -433, 134, 3106, 890], [-490, 205, -387, -287, 2552, 432], [-466, 196, -386, -218, 2602, 506], [-395, 184, -401, -111, 2334, 473], [-404, 190, -433, -373, 2590, 400], [-453, 206, -426, -584, 2717, 305], [-305, 174, -420, -317, 2815, 450], [-316, 176, -451, 288, 2295, 766], [-442, 198, -418, -344, 2601, 420], [-468, 214, -496, -607, 2698, 256], [-366, 188, -464, -535, 2713, 179], [-364, 176, -461, -477, 2385, 254], [-393, 193, -474, -283, 2032, 356], [-280, 184, -483, -8, 1971, 506], [-296, 168, -461, -364, 2175, 298], [-124, 146, -427, -164, 2548, 629], [-270, 197, -457, 646, 1781, 758], [-212, 190, -494, 147, 1680, 512], [-229, 143, -449, -770, 1680, 59], [-245, 163, -448, -387, 2665, 365], [-258, 189, -458, 605, 1730, 796], [-125, 158, -412, 734, 1328, 658], [-178, 161, -483, -276, 2175, 376], [-218, 171, -452, -145, 2187, 535], [-176, 174, -455, 202, 1777, 636], [-105, 175, -452, 593, 1361, 723], [-92, 113, -378, -472, 2105, 76], [-120, 117, -395, -476, 2276, 74], [-112, 159, -435, 131, 2165, 820], [-113, 143, -459, -365, 1708, 256], [-70, 142, -460, -112, 1343, 297], [-65, 124, -356, -189, 2091, 509], [-13, 107, -353, -308, 1933, 244], [-92, 137, -407, -115, 1841, 449], [6, 99, -290, -91, 1865, 532], [12, 111, -354, 483, 1375, 768], [-2, 110, -318, 96, 1631, 628], [19, 87, -292, -482, 1979, -21], [16, 88, -283, -348, 2124, 211], [12, 118, -384, 265, 1291, 513], [-32, 118, -355, -120, 1982, 521], [9, 99, -344, -478, 1189, 45], [-13, 90, -342, -523, 1487, -73], [15, 116, -347, 881, 462, 331], [52, 78, -290, 742, 601, 483], [28, 100, -316, 258, 830, 329], [32, 88, -314, -807, 765, -153], [71, 50, -232, 690, 627, 477], [49, 103, -279, -532, 308, -25], [34, 99, -303, 553, 407, 238], [56, 88, -254, -1253, 437, -246], [87, 67, -219, -41, 1278, 332], [82, 80, -234, -143, 663, 96], [68, 41, -193, 874, 431, 486], [54, 47, -148, 1658, -135, 314], [59, 51, -230, 699, 169, 187], [63, 72, -224, -3, 778, 196], [54, 76, -208, -228, 115, -12], [95, 16, -93, 290, 1060, 602], [77, 55, -132, -66, 382, 62], [82, 43, -139, 91, 361, 121], [77, 47, -152, 157, 980, 397], [88, 67, -81, -380, 670, -75], [62, 37, -72, -18, 569, 129], [85, 48, -88, -99, 524, 73], [72, 16, -92, 442, 495, 368], [72, 25, -71, 147, 533, 218], [71, 25, -65, 127, 523, 203], [53, 31, -62, 51, 209, 67], [50, 45, -69, -234, 349, -26], [38, 43, -69, -125, -19, -35], [48, 35, -44, -124, 545, 58], [36, 27, -39, 47, 108, 39], [30, 27, -35, 88, 4, 25]], [[416, 693, 41, 2280, -248, -484], [414, 734, -145, 2565, 271, -852], [431, 656, 141, 2961, -30, -1012], [470, 714, 105, 2328, -659, -623], [483, 758, 80, 2347, -609, -362], [406, 674, -54, -2695, 754, -1190], [491, 775, 11, 2751, -433, -604], [471, 733, 39, 2891, -502, -680], [427, 714, 118, -3024, -611, -582], [336, 563, 249, -1943, 630, -705], [344, 611, 213, 2638, -1061, -861], [490, 752, -5, 2611, -443, -593], [423, 723, -119, -3041, -431, -778], [445, 691, 18, -2737, -35, -893], [449, 660, 118, -2305, 323, -1124], [452, 687, 10, -2950, -330, -1044], [242, 525, 307, -1625, 285, -908], [434, 666, 50, -2153, 264, -1052], [481, 706, 19, -2827, 25, -1065], [421, 679, 78, -2566, -595, -956], [419, 644, 51, -1160, 969, -881], [11, -1, 111, 3059, 578, 273], [428, 700, 96, -166, 2238, -2167], [338, 585, 201, -1866, 658, -1104], [314, 582, 223, -1705, 197, -777], [454, 705, 107, -2529, 1, -1041], [358, 611, 218, -2442, -152, -1053], [421, 675, 143, -2218, -297, -1152], [437, 676, 144, -2149, -4, -1076], [401, 653, 145, 293, 2261, -2037], [340, 637, 172, -1957, 33, -1038], [340, 612, 167, -2197, -434, -1184], [344, 565, 206, -1547, 601, -867], [127, 430, 211, -1835, -345, -1048], [331, 616, 214, -1823, 37, -1096], [268, 581, 206, -2202, -509, -1237], [249, 572, 190, -1615, 62, -831], [357, 639, 191, -2350, -743, -1365], [343, 642, 219, 501, 2046, -1813], [218, 539, 252, -1848, -298, -1276], [257, 578, 243, -1023, 274, -1112], [15, 298, 149, -1587, -111, -348], [64, 336, 161, -1817, -484, -1090], [179, 479, 249, -377, 987, -1833], [129, 448, 234, -1151, 77, -1225], [120, 479, 208, -1537, 138, -455], [47, 305, 131, -2114, -594, -850], [13, 167, 80, -2075, -682, -858], [86, 488, 239, -1250, 182, -195], [104, 445, 225, -1539, 69, -705], [30, 298, 158, -1617, -259, -859], [15, 58, 18, 2931, -890, -437], [46, 419, 225, -974, 77, -48], [40, 381, 229, -1261, 103, -264], [-4, 259, 190, -2019, -256, -499], [-18, 235, 203, -1609, -206, -787], [28, 304, 200, -1144, 9, -1230], [-15, 208, 167, -1685, -24, 101], [7, 291, 213, -1204, 100, -6], [-20, 215, 197, -1469, -105, -498], [-16, 172, 161, -1732, -59, 88], [-17, 107, 73, -1979, -259, -44], [-16, 133, 135, -1997, 32, 386], [-12, 212, 199, -1221, -10, -104], [-9, 127, 198, -1190, -42, 124], [-31, 113, 146, -1686, -268, -447], [-25, 147, 174, -1480, -113, -184], [-36, 109, 147, -1068, -65, -462], [-43, 127, 198, -770, -3, -248], [-52, 73, 129, -2168, -779, -945], [-27, 13, 105, -1797, -364, -377], [-37, 112, 149, -1240, -132, -514], [-43, 100, 155, -630, 33, -321], [-11, 24, 64, -3104, -471, 160], [-33, 73, 104, -384, 82, -344], [-42, 52, 121, -789, -24, -451], [-26, 51, 96, -277, 21, -138], [-10, 52, 117, -824, -114, 97], [-16, 79, 115, -517, -58, 4], [-22, 20, 98, -716, -63, -196], [-17, 22, 71, -272, 12, -124], [-28, 26, 86, -379, 29, -229], [-16, 33, 79, -307, -8, -94], [-21, 37, 72, -155, 51, -150], [-16, 38, 27, 0, 0, 0], [-7, 37, 67, -190, -79, 97], [-7, 32, 69, -209, -55, 44], [-1, 30, 21, -1, -1, -1], [-12, 11, 3, -1, 0, 0], [-16, 26, 28, -1, 0, 0], [-20, 19, 17, 0, 0, 0], [-1, 41, 4, 0, 0, 0], [-15, 36, 2, 0, 0, 0], [-17, 37, -7, 0, 0, 0], [-12, 28, 9, 0, 0, 0], [10, 15, -10, 0, 0, 0], [21, 14, 0, 0, 0, 0], 0, 0, 0, [-713, 288, -94, -2227, -186, 2198], [-788, 331, 41, -582, -2284, 577], [-812, 288, -123, -111, -2410, 1002], [-861, 295, -39, 516, 2832, 925], [-772, 277, -58, 713, 2761, 719], [-691, 272, -207, -972, -2551, 102], [-681, 265, -199, -330, 3019, 513], [-741, 279, -138, 153, 2929, 731], [-691, 256, -208, 1370, 2351, 947], [-733, 257, -282, -299, -2670, 789], [-661, 244, -262, 1142, 2521, 847], [-741, 258, -134, 119, 2834, 680], [-648, 248, -159, -161, 2452, 353], [-678, 264, -217, -404, 3091, 498], [-689, 247, -317, -364, -2645, 639], [-573, 227, -283, -448, 2824, 381], [-498, 197, -549, -154, -2895, 776], [-607, 262, -361, -643, 3002, 281], [-714, 267, -220, -565, -2636, 446], [-515, 211, -303, -202, 2112, 323], [-597, 236, -325, -426, 2773, 398], [-588, 214, -360, -139, -3138, 677], [-467, 203, -399, -303, 2795, 431], [-460, 203, -435, -312, -2892, 494], [-550, 224, -459, -424, -2863, 500], [-663, 240, -297, -169, 2812, 624], [-542, 199, -402, 135, -3087, 915], [-547, 218, -353, -283, 2625, 452], [-532, 209, -355, -210, 2645, 521], [-462, 194, -365, -88, 2357, 483], [-467, 205, -417, -395, 2738, 423], [-509, 218, -389, -594, 2788, 313], [-365, 176, -389, -291, 2829, 474], [-374, 178, -444, 299, 2363, 775], [-513, 213, -397, -359, 2752, 449], [-510, 222, -475, -626, 2797, 262], [-438, 208, -471, -581, 2887, 189], [-415, 184, -432, -466, 2508, 277], [-452, 204, -444, -288, 2124, 371], [-337, 191, -480, -25, 2067, 513], [-357, 180, -450, -371, 2265, 314], [-172, 155, -458, -188, 2679, 621], [-328, 195, -453, 604, 1983, 745], [-261, 192, -484, 78, 1910, 521], [-283, 159, -447, -768, 1777, 88], [-315, 175, -445, -402, 2758, 370], [-319, 195, -462, 576, 1838, 799], [-172, 164, -419, 636, 1558, 679], [-229, 171, -492, -309, 2333, 381], [-284, 181, -463, -186, 2370, 533], [-229, 183, -465, 129, 1993, 636], [-149, 188, -463, 498, 1550, 750], [-148, 123, -399, -464, 2182, 108], [-178, 130, -419, -488, 2405, 118], [-162, 168, -476, 104, 2285, 809], [-160, 154, -473, -398, 1867, 278], [-115, 150, -472, -158, 1607, 335], [-108, 140, -404, -222, 2219, 500], [-51, 116, -379, -343, 2132, 259], [-143, 149, -432, -143, 1951, 454], [-36, 114, -330, -116, 1933, 523], [-23, 128, -376, 336, 1682, 807], [-47, 128, -358, 16, 1816, 614], [-25, 95, -330, -483, 2042, 0], [-18, 97, -315, -365, 2216, 223], [-19, 129, -408, 205, 1509, 546], [-79, 134, -399, -169, 2158, 513], [-19, 108, -375, -496, 1438, 96], [-43, 103, -392, -528, 1614, -30], [-18, 142, -388, 830, 671, 430], [36, 99, -327, 732, 692, 528], [-1, 115, -363, 222, 1040, 374], [8, 95, -362, -785, 978, -114], [58, 68, -269, 701, 729, 535], [34, 108, -322, -568, 548, -1], [8, 119, -349, 511, 638, 320], [40, 87, -298, -1242, 582, -248], [68, 79, -260, -101, 1540, 367], [74, 91, -281, -164, 807, 121], [58, 65, -239, 886, 522, 539], [53, 72, -186, 1598, 7, 397], [52, 73, -283, 748, 333, 264], [51, 85, -276, -26, 970, 239], [50, 87, -267, -233, 285, 22], [97, 23, -116, 170, 1580, 835], [84, 66, -179, -100, 611, 102], [89, 53, -187, 102, 470, 157], [72, 59, -191, 121, 1206, 459], [97, 75, -108, -534, 1e3, -182], [73, 45, -108, -35, 732, 162], [101, 58, -129, -163, 817, 99], [79, 23, -126, 569, 712, 571], [84, 30, -101, 167, 731, 307], [86, 29, -93, 144, 725, 289], [69, 35, -90, 79, 385, 128], [61, 54, -106, -281, 449, -32], [46, 53, -106, -191, 16, -40], [62, 41, -69, -209, 883, 60], [56, 27, -62, 145, 372, 160], [41, 22, -75, 256, 18, 72]], [[396, 682, -1, 2229, -152, -485], [382, 723, -166, 2452, 417, -882], [432, 661, 105, 2820, 26, -991], [471, 715, 69, 2245, -538, -575], [474, 751, 44, 2199, -405, -299], [375, 672, -87, 428, -2269, -1946], [474, 766, -19, 2603, -283, -548], [469, 737, 5, 2730, -292, -579], [443, 736, 85, -3126, -505, -476], [360, 588, 228, -2080, 669, -737], [372, 625, 176, 2578, -967, -799], [478, 749, -41, 2449, -207, -520], [404, 728, -154, -3062, -268, -728], [445, 702, -20, -2807, 47, -853], [473, 669, 85, -2430, 381, -1134], [450, 693, -29, -3024, -207, -1003], [275, 546, 306, -1857, 342, -995], [442, 677, 10, -2268, 344, -1028], [483, 712, -20, -2935, 85, -1047], [432, 707, 31, -2637, -470, -829], [428, 658, 2, -1223, 1058, -879], [6, 7, 96, 3059, 578, 273], [435, 702, 57, 2827, -771, -892], [368, 597, 169, -2041, 747, -1152], [361, 611, 213, -1782, 232, -789], [474, 718, 69, -2793, 38, -1025], [404, 644, 191, -2561, -158, -1032], [450, 696, 114, -2502, -318, -1084], [466, 698, 114, -2318, -6, -1053], [433, 681, 105, -2938, -761, -986], [378, 659, 135, -2188, 8, -1050], [386, 643, 133, -2379, -449, -1130], [389, 592, 179, -1650, 654, -869], [169, 474, 230, -2090, -448, -1125], [379, 647, 183, -2054, -16, -1101], [312, 605, 185, -2448, -632, -1220], [307, 612, 172, -1711, 69, -862], [395, 658, 153, 415, 2251, -1864], [391, 676, 192, 263, 1978, -1918], [267, 579, 250, -2351, -623, -1278], [307, 611, 225, -1151, 239, -1154], [37, 336, 167, -1529, -94, -423], [92, 387, 189, -1814, -468, -1152], [232, 530, 251, -352, 1058, -1882], [177, 492, 235, -1420, -94, -1316], [169, 524, 201, -1566, 152, -596], [70, 348, 139, -1989, -554, -956], [19, 195, 90, -1506, -345, -942], [122, 527, 241, -1272, 244, -403], [153, 495, 233, -1569, 84, -765], [57, 344, 181, -1577, -226, -918], [15, 59, 17, -106, -120, 190], [73, 471, 234, -983, 106, -166], [71, 432, 229, -1273, 114, -376], [18, 307, 183, -2019, -299, -677], [3, 275, 201, -1729, -282, -923], [72, 355, 210, -1156, 14, -1300], [-7, 255, 170, -1651, -22, -36], [29, 340, 220, -1227, 152, -212], [-7, 257, 201, -1594, -127, -669], [-12, 218, 159, -1701, -66, -87], [-17, 136, 78, -1812, -242, -101], [-21, 177, 130, -1874, -7, 244], [-4, 265, 207, -1290, 10, -241], [-9, 159, 206, -1457, -3, 75], [-25, 144, 145, -1842, -324, -537], [-19, 195, 180, -1516, -111, -217], [-32, 146, 157, -1229, -97, -568], [-42, 164, 219, -896, 2, -313], [-40, 105, 130, -2336, -890, -944], [-27, 19, 104, -2810, -631, -200], [-33, 152, 161, -1341, -153, -578], [-43, 140, 177, -816, 31, -449], [-8, 34, 49, -3103, -471, 160], [-39, 103, 125, -539, 103, -521], [-47, 79, 141, -970, -67, -545], [-37, 78, 127, -429, 32, -226], [-14, 84, 138, -1085, -107, 113], [-19, 107, 135, -673, -49, -24], [-25, 27, 109, -1612, -285, -303], [-32, 22, 105, -446, 2, -202], [-40, 39, 111, -569, 14, -341], [-26, 49, 110, -581, -27, -178], [-38, 60, 100, -318, 93, -327], [-8, 27, 58, -44, -12, 6], [-6, 58, 89, -318, -114, 164], [-7, 44, 89, -717, -141, 192], [-9, 29, 53, -45, -2, -11], [-11, 20, 30, -1, 0, 0], [-10, 28, 53, -43, -15, 12], [-12, 26, 44, 0, 0, 0], [-4, 36, 26, 0, 0, 0], [-13, 34, 15, 0, 0, 0], [-15, 36, 6, 0, 0, 0], [-11, 28, 19, 0, 0, 0], [8, 17, -3, 0, 0, 0], [18, 16, 7, 0, 0, 0], [-5, 21, -19, 0, 0, 0], [-10, 35, 3, 0, 0, 0], [13, 43, 18, 0, 0, 0], [-721, 311, -21, -2204, -140, 2178], [-781, 344, 102, -599, -2101, 616], [-819, 302, -72, -156, -2242, 1029], [-878, 312, 12, 553, 2921, 963], [-780, 301, 2, 792, 2879, 776], [-712, 281, -138, -971, -2481, 118], [-693, 277, -136, -299, 3109, 537], [-764, 297, -79, 175, 3083, 784], [-732, 282, -154, -1735, -719, 2157], [-766, 268, -243, -332, -2519, 809], [-691, 264, -195, 1164, 2575, 865], [-776, 279, -70, 184, 2961, 744], [-698, 272, -97, -121, 2492, 370], [-723, 284, -158, -409, -3121, 518], [-728, 257, -267, -381, -2509, 657], [-622, 244, -228, -429, 2855, 398], [-535, 202, -536, -208, -2575, 785], [-659, 278, -320, -681, 3126, 282], [-746, 281, -156, -574, -2552, 463], [-590, 234, -260, -171, 2150, 336], [-662, 255, -279, -433, 2857, 418], [-633, 224, -321, -136, -2945, 736], [-506, 207, -354, -270, 2856, 450], [-499, 207, -397, -314, -2751, 514], [-601, 233, -435, -444, -2741, 501], [-723, 257, -247, -165, 2968, 669], [-602, 209, -362, 133, -2993, 945], [-602, 232, -318, -276, 2772, 492], [-596, 223, -322, -196, 2732, 553], [-530, 207, -325, -37, 2398, 507], [-530, 221, -386, -417, 2883, 446], [-563, 230, -347, -604, 2912, 332], [-429, 182, -356, -259, 2816, 502], [-432, 180, -430, 350, 2530, 815], [-584, 230, -361, -373, 2884, 474], [-548, 230, -449, -654, 2953, 270], [-508, 228, -468, -612, 2997, 192], [-467, 195, -392, -443, 2613, 303], [-508, 214, -408, -290, 2275, 395], [-392, 198, -470, -58, 2294, 528], [-419, 193, -433, -376, 2350, 330], [-224, 164, -480, -207, 2787, 617], [-389, 191, -438, 611, 2073, 741], [-312, 193, -465, 60, 1987, 522], [-338, 176, -439, -777, 1928, 133], [-386, 187, -436, -424, 2903, 384], [-379, 201, -463, 550, 1986, 805], [-225, 168, -421, 580, 1726, 686], [-281, 179, -493, -354, 2554, 384], [-353, 191, -464, -200, 2454, 536], [-288, 189, -464, 98, 2102, 635], [-195, 198, -468, 387, 1764, 764], [-206, 134, -416, -459, 2256, 139], [-242, 147, -438, -499, 2486, 141], [-214, 177, -509, 58, 2534, 791], [-207, 165, -483, -450, 2102, 303], [-166, 157, -472, -198, 1826, 358], [-156, 155, -446, -256, 2354, 493], [-100, 126, -398, -375, 2319, 275], [-194, 161, -453, -198, 2178, 462], [-82, 129, -368, -162, 2078, 510], [-64, 144, -393, 263, 1816, 808], [-98, 145, -396, -51, 1990, 598], [-72, 105, -367, -485, 2150, 43], [-57, 108, -346, -387, 2334, 242], [-52, 139, -426, 100, 1846, 572], [-135, 150, -435, -183, 2210, 512], [-56, 117, -398, -518, 1655, 137], [-82, 117, -433, -537, 1713, -1], [-63, 164, -421, 793, 778, 474], [16, 120, -360, 642, 1012, 650], [-40, 129, -403, 200, 1159, 397], [-28, 104, -403, -768, 1181, -71], [41, 88, -303, 691, 832, 583], [13, 112, -362, -591, 825, 22], [-29, 137, -389, 483, 753, 356], [14, 87, -339, -1208, 754, -243], [36, 93, -299, -151, 1736, 382], [63, 101, -325, -191, 980, 149], [43, 89, -283, 851, 712, 619], [45, 96, -231, 1532, 120, 450], [31, 99, -334, 755, 429, 308], [28, 100, -326, -53, 1145, 274], [36, 99, -326, -232, 466, 58], [89, 34, -140, 43, 1879, 905], [83, 77, -227, -121, 755, 126], [90, 65, -234, 106, 738, 241], [58, 73, -233, 86, 1353, 485], [96, 78, -140, -623, 1271, -280], [78, 54, -147, -55, 879, 190], [105, 68, -175, -199, 982, 110], [80, 35, -161, 595, 820, 653], [92, 37, -132, 151, 1085, 450], [95, 35, -124, 143, 910, 364], [80, 41, -123, 94, 567, 191], [68, 63, -147, -302, 522, -28], [54, 63, -151, -232, 116, -26], [71, 48, -99, -250, 1062, 57], [70, 32, -98, 189, 577, 256], [53, 25, -124, 397, 70, 116]], [[367, 669, -42, 2205, -63, -500], [339, 708, -177, 2381, 556, -928], [429, 664, 69, 2625, 160, -965], [464, 712, 32, 2108, -325, -518], [457, 739, 8, 2119, -288, -281], [338, 670, -116, 454, -2125, -1942], [448, 752, -47, 2557, -231, -537], [456, 734, -29, 2657, -185, -546], [448, 750, 49, 3092, -430, -412], [379, 610, 202, -2203, 700, -764], [394, 637, 135, 2525, -839, -736], [457, 741, -74, 2345, -39, -499], [377, 730, -182, -3086, -113, -687], [439, 711, -56, -2893, 164, -806], [489, 675, 52, -2655, 499, -1153], [440, 696, -65, -3133, 7, -950], [304, 562, 295, -2211, 364, -1097], [442, 686, -29, -2378, 449, -1002], [480, 716, -57, -3044, 171, -1030], [433, 730, -16, -2685, -382, -748], [431, 670, -44, -1326, 1218, -869], [-4, 21, 70, 3059, 578, 273], [431, 698, 16, 2754, -682, -858], [387, 606, 128, -2127, 802, -1163], [400, 636, 198, -1946, 303, -805], [483, 725, 30, -3063, 107, -1010], [442, 673, 161, -2680, -153, -1003], [467, 710, 81, -2596, -308, -1056], [485, 714, 81, -2446, 4, -1031], [452, 704, 61, -2988, -669, -911], [405, 676, 92, -2259, 11, -1048], [425, 671, 96, -2484, -420, -1080], [424, 616, 147, -1716, 688, -867], [220, 518, 239, -2268, -526, -1130], [418, 673, 145, -2138, -29, -1097], [350, 626, 158, -2760, -702, -1149], [359, 647, 144, -1790, 81, -870], [422, 672, 107, 272, 2265, -1923], [429, 702, 156, 129, 2022, -2025], [315, 611, 235, -2490, -704, -1263], [353, 640, 206, -1426, 140, -1204], [64, 373, 187, -1496, -71, -490], [125, 437, 218, -2019, -581, -1246], [283, 578, 244, -293, 1256, -2023], [235, 535, 224, -1676, -276, -1339], [227, 565, 190, -1635, 180, -708], [96, 389, 153, -1847, -486, -1101], [22, 223, 113, -1157, -110, -954], [162, 559, 238, -1309, 324, -623], [204, 542, 237, -1669, 103, -865], [87, 390, 204, -1580, -200, -997], [11, 54, 24, -106, -120, 190], [103, 518, 241, -1008, 158, -357], [108, 479, 227, -1292, 126, -497], [51, 356, 181, -1990, -327, -816], [34, 319, 197, -1748, -307, -982], [121, 409, 219, -1215, -24, -1334], [9, 301, 175, -1602, -19, -161], [62, 388, 225, -1232, 188, -366], [16, 301, 202, -1628, -139, -764], [0, 268, 161, -1651, -69, -179], [-17, 164, 90, -1515, -180, -217], [-19, 229, 133, -1719, -34, 90], [14, 320, 212, -1310, 20, -347], [-7, 200, 205, -1644, 14, -26], [-14, 184, 142, -1803, -327, -647], [-10, 242, 185, -1559, -102, -331], [-20, 191, 164, -1275, -102, -641], [-40, 200, 236, -1012, 5, -386], [-25, 142, 129, -2379, -925, -965], [-22, 33, 93, -2902, -644, -171], [-25, 194, 171, -1426, -167, -671], [-39, 184, 196, -977, 23, -589], [-6, 41, 37, -3103, -471, 160], [-38, 142, 145, -627, 122, -657], [-48, 111, 156, -1309, -177, -706], [-43, 110, 155, -557, 42, -314], [-17, 124, 154, -1270, -82, 79], [-20, 142, 152, -779, -30, -73], [-25, 43, 110, -2083, -413, -281], [-44, 28, 133, -773, -45, -337], [-47, 55, 130, -807, -27, -471], [-33, 76, 137, -762, -41, -239], [-48, 94, 127, -394, 111, -422], [-2, 23, 93, -201, -49, 33], [-8, 85, 111, -445, -124, 215], [-11, 68, 104, -997, -135, 260], [-17, 32, 86, -406, -28, -92], [-9, 34, 68, -140, -35, 23], [-4, 35, 79, -281, -85, 93], [-4, 36, 75, -249, -91, 112], [-9, 29, 54, -66, -5, -12], [-10, 30, 46, -8, -2, 0], [-13, 33, 24, 0, 0, 0], [-10, 28, 37, -1, -1, 0], [4, 19, 11, 0, 0, 0], [8, 20, 25, 0, 0, 0], [-6, 22, -6, 0, 0, 0], [-9, 33, 12, 0, 0, 0], [10, 41, 23, 0, 0, 0], [-722, 337, 56, -2186, -96, 2159], [-759, 359, 161, -618, -1927, 656], [-822, 316, -22, -267, -1903, 1069], [-886, 328, 60, -2531, -33, 2096], [-779, 326, 62, 836, 2961, 817], [-728, 292, -67, -967, -2417, 139], [-700, 292, -68, -284, 3136, 546], [-776, 316, -16, 182, -3120, 811], [-762, 309, -92, -1718, -667, 2132], [-790, 279, -200, -364, -2382, 824], [-716, 285, -127, -1953, -501, 2254], [-799, 304, -5, 222, 3073, 799], [-741, 299, -31, -86, 2550, 392], [-763, 304, -100, -418, -3023, 545], [-760, 267, -215, -413, -2291, 689], [-669, 263, -169, -401, 2929, 434], [-567, 207, -512, -270, -2222, 784], [-704, 291, -275, -716, -3027, 283], [-772, 295, -91, -585, -2454, 484], [-664, 259, -210, -153, 2203, 354], [-721, 274, -231, -448, 3008, 453], [-671, 237, -272, -143, -2764, 793], [-546, 215, -301, -238, 2860, 464], [-538, 213, -346, -309, -2700, 533], [-646, 241, -406, -484, -2504, 503], [-773, 276, -191, -171, 3139, 718], [-657, 222, -318, 128, -2888, 979], [-651, 248, -272, -275, 2824, 507], [-655, 240, -280, -188, 2804, 578], [-600, 225, -277, -6, 2435, 525], [-590, 237, -345, -425, 2933, 454], [-614, 243, -301, -608, 3001, 349], [-499, 192, -320, -235, 2810, 523], [-489, 187, -403, 384, 2604, 843], [-649, 248, -315, -378, 2938, 485], [-583, 237, -417, -699, -3072, 279], [-572, 246, -455, -637, 3090, 193], [-521, 209, -341, -424, 2651, 318], [-562, 226, -361, -285, 2396, 415], [-446, 204, -447, -63, 2359, 534], [-477, 205, -413, -385, 2498, 359], [-275, 172, -495, -224, 2885, 616], [-451, 188, -416, 669, 2190, 744], [-363, 192, -440, 44, 2151, 521], [-398, 195, -418, -788, 2003, 153], [-459, 201, -416, -443, 3043, 403], [-438, 206, -455, 526, 2210, 817], [-286, 171, -414, 575, 1812, 690], [-333, 187, -486, -396, 2787, 385], [-419, 200, -460, -221, 2615, 546], [-346, 195, -458, 70, 2235, 636], [-244, 204, -465, 242, 2049, 756], [-266, 147, -431, -458, 2380, 187], [-309, 165, -449, -517, 2584, 163], [-270, 183, -529, 22, 2768, 778], [-259, 175, -481, -473, 2202, 310], [-220, 163, -465, -214, 1935, 368], [-207, 169, -478, -287, 2483, 488], [-158, 137, -411, -395, 2445, 288], [-250, 171, -463, -225, 2302, 465], [-136, 144, -404, -184, 2157, 507], [-110, 157, -405, 123, 2063, 787], [-159, 160, -428, -103, 2154, 585], [-127, 119, -400, -491, 2226, 70], [-107, 122, -377, -411, 2453, 258], [-93, 147, -436, 6, 2140, 570], [-190, 164, -466, -217, 2344, 509], [-102, 128, -413, -535, 1788, 161], [-121, 131, -470, -550, 1812, 25], [-110, 182, -448, 764, 856, 502], [-16, 138, -387, 512, 1309, 720], [-80, 143, -439, 170, 1315, 424], [-70, 114, -435, -757, 1398, -21], [19, 106, -334, 645, 1006, 646], [-19, 115, -394, -598, 1072, 40], [-71, 153, -423, 416, 997, 420], [-16, 89, -375, -1165, 908, -231], [-5, 106, -336, -196, 1908, 389], [45, 110, -363, -218, 1151, 173], [16, 113, -326, 797, 868, 668], [31, 118, -277, 1419, 318, 523], [5, 123, -380, 748, 542, 359], [-4, 114, -372, -76, 1275, 297], [8, 111, -380, -231, 567, 78], [74, 49, -166, -53, 2077, 921], [75, 87, -274, -147, 926, 154], [79, 79, -279, 85, 988, 312], [40, 87, -274, 24, 1572, 508], [84, 78, -175, -665, 1511, -352], [80, 63, -186, -81, 1040, 219], [101, 77, -219, -260, 1268, 122], [74, 52, -197, 574, 1048, 767], [83, 50, -170, 125, 1232, 496], [97, 42, -154, 116, 1165, 453], [82, 50, -158, 92, 771, 257], [69, 71, -192, -348, 753, -7], [55, 73, -207, -240, 207, -10], [72, 55, -135, -279, 1196, 58], [79, 41, -138, 200, 709, 313], [63, 33, -177, 442, 109, 136]], [[335, 656, -80, 2205, 6, -523], [290, 693, -179, 2363, 627, -957], [413, 663, 30, 2566, 226, -960], [446, 704, -4, 2012, -153, -502], [434, 723, -26, 2034, -142, -284], [302, 669, -141, 580, -1774, -1946], [418, 736, -74, 2473, -131, -526], [435, 729, -61, 2535, 20, -512], [450, 762, 15, 3019, -338, -346], [392, 629, 172, -2355, 734, -797], [409, 646, 92, 2485, -710, -687], [425, 729, -104, 2292, 60, -499], [346, 730, -204, 3133, 192, -619], [426, 717, -89, -3031, 370, -744], [495, 679, 20, -2875, 653, -1175], [416, 696, -97, 3087, 154, -927], [327, 574, 270, -2616, 320, -1177], [433, 692, -65, -2536, 638, -970], [468, 716, -91, -3124, 258, -1020], [425, 748, -61, -2728, -301, -680], [423, 681, -87, -1399, 1342, -863], [-16, 39, 38, 3057, 578, 272], [422, 693, -24, 2691, -585, -836], [399, 614, 87, -2269, 929, -1162], [432, 657, 179, -2154, 393, -827], [479, 727, -10, 3004, 188, -1006], [474, 698, 129, -2770, -139, -978], [479, 721, 49, -2739, -265, -1006], [498, 726, 48, -2746, 74, -971], [463, 722, 17, -3040, -563, -834], [430, 691, 52, -2370, 37, -1036], [453, 693, 57, -2604, -342, -1006], [455, 638, 115, -1812, 737, -861], [269, 558, 242, -2547, -629, -1097], [452, 696, 109, -2369, -40, -1071], [380, 643, 124, -2981, -655, -1065], [404, 678, 114, -1954, 115, -874], [442, 683, 61, 182, 2331, -1974], [456, 721, 115, 28, 2113, -2130], [357, 641, 217, 298, 2296, -1963], [391, 663, 176, -1766, 0, -1228], [94, 409, 207, -1477, -17, -606], [172, 488, 243, -2265, -742, -1267], [331, 621, 227, -267, 1418, -2154], [290, 574, 206, -2136, -585, -1318], [289, 602, 169, -1690, 205, -744], [127, 432, 175, -1815, -457, -1211], [24, 252, 146, -947, 70, -975], [211, 583, 227, -1350, 410, -796], [259, 583, 230, -1770, 107, -922], [121, 435, 226, -1645, -207, -1064], [2, 44, 37, -107, -120, 190], [141, 558, 244, -1035, 196, -483], [148, 522, 223, -1318, 136, -587], [92, 406, 183, -1977, -347, -915], [72, 363, 195, -1744, -339, -1091], [177, 465, 225, -1397, -161, -1361], [27, 345, 182, -1515, 2, -372], [104, 434, 228, -1244, 230, -520], [44, 345, 204, -1640, -147, -855], [17, 316, 166, -1551, -63, -346], [-15, 192, 111, -1308, -92, -317], [-6, 282, 145, -1602, -35, -45], [41, 375, 216, -1319, 34, -508], [1, 247, 198, -1712, 2, -160], [4, 230, 143, -1678, -292, -736], [5, 289, 190, -1570, -86, -508], [-5, 238, 171, -1270, -82, -775], [-33, 237, 249, -1191, 2, -515], [-10, 177, 130, -2310, -911, -1078], [-14, 55, 73, -2887, -642, -176], [-12, 240, 181, -1467, -168, -763], [-24, 234, 208, -1110, 9, -739], [-5, 45, 32, -3103, -471, 160], [-27, 191, 164, -665, 153, -780], [-42, 150, 166, -1550, -279, -822], [-47, 145, 179, -771, 52, -484], [-18, 176, 166, -1331, -63, 19], [-18, 183, 167, -890, 9, -194], [-24, 64, 107, -2346, -478, -263], [-50, 44, 152, -1267, -181, -488], [-52, 74, 146, -1350, -211, -694], [-37, 107, 160, -1002, -60, -336], [-54, 130, 152, -490, 137, -559], [1, 25, 118, -597, -120, 125], [-10, 118, 132, -519, -112, 223], [-16, 104, 118, -1070, -119, 252], [-24, 47, 116, -601, -46, -134], [-8, 56, 107, -364, -69, 60], [-2, 48, 102, -513, -128, 184], [0, 56, 106, -396, -122, 183], [-16, 27, 93, -419, -39, -66], [-7, 29, 81, -384, -76, 45], [-10, 30, 47, -7, -2, 0], [-9, 29, 60, -200, -40, 16], [-4, 25, 36, 0, 0, 0], [-3, 26, 44, 0, 0, 0], [-7, 24, 12, 0, 0, 0], [-9, 31, 29, 0, 0, 0], [3, 36, 35, 0, 0, 0], [-718, 363, 130, -2172, -65, 2145], [-726, 375, 217, -626, -1844, 676], [-810, 330, 28, -322, -1753, 1080], [-880, 345, 107, -2502, 168, 2014], [-770, 352, 120, -2257, -56, 2259], [-741, 303, 1, -957, -2286, 193], [-704, 309, 1, -246, -3099, 565], [-779, 336, 46, 188, -2950, 867], [-788, 335, -34, -1705, -604, 2103], [-807, 290, -157, -407, -2212, 841], [-735, 307, -57, -1932, -440, 2233], [-808, 330, 60, 240, -3133, 836], [-774, 327, 34, -32, 2684, 449], [-793, 323, -40, -441, -2851, 589], [-783, 278, -159, -449, -2087, 718], [-712, 288, -100, -388, 2995, 461], [-591, 214, -475, -320, -1923, 775], [-741, 303, -224, -765, -2827, 284], [-788, 311, -25, -595, -2371, 503], [-731, 287, -154, -139, 2263, 373], [-770, 293, -177, -461, 3122, 479], [-702, 252, -218, -153, -2647, 829], [-587, 225, -246, -200, 2853, 478], [-575, 221, -294, -290, -2638, 585], [-686, 249, -373, -524, -2263, 501], [-810, 295, -129, -184, -2984, 760], [-706, 236, -273, 119, -2800, 1006], [-697, 264, -225, -274, 2919, 534], [-707, 257, -235, -182, 2981, 638], [-667, 246, -225, 23, 2492, 549], [-646, 252, -306, -439, 3028, 470], [-661, 256, -247, -610, 3119, 376], [-566, 204, -284, -199, 2820, 558], [-543, 196, -373, 444, 2708, 893], [-709, 265, -270, -398, 3101, 518], [-612, 243, -377, -733, -2852, 284], [-630, 262, -436, -692, -2989, 188], [-574, 225, -287, -404, 2680, 332], [-612, 239, -304, -273, 2491, 433], [-498, 211, -420, -70, 2557, 555], [-535, 219, -381, -394, 2639, 388], [-325, 180, -504, -256, 3068, 614], [-513, 190, -381, 724, 2237, 751], [-417, 192, -407, 66, 2237, 522], [-459, 213, -393, -813, 2121, 183], [-532, 216, -386, -453, 3115, 414], [-495, 210, -436, 522, 2403, 831], [-353, 175, -403, 609, 1864, 698], [-387, 194, -464, -425, 2976, 385], [-485, 209, -443, -234, 2736, 557], [-402, 199, -447, 56, 2346, 640], [-295, 206, -455, 146, 2262, 735], [-330, 163, -437, -464, 2468, 217], [-375, 183, -455, -535, 2669, 178], [-327, 188, -536, -5, 2983, 769], [-311, 184, -470, -516, 2404, 322], [-277, 169, -449, -222, 2029, 376], [-258, 182, -505, -343, 2725, 475], [-222, 150, -419, -410, 2559, 305], [-307, 181, -468, -249, 2424, 470], [-193, 158, -435, -224, 2323, 505], [-162, 167, -412, 17, 2255, 750], [-230, 173, -451, -140, 2298, 578], [-188, 135, -429, -506, 2350, 108], [-165, 138, -405, -437, 2569, 270], [-140, 153, -436, -49, 2323, 559], [-246, 177, -489, -265, 2548, 503], [-150, 138, -424, -561, 1987, 194], [-160, 145, -499, -580, 1979, 64], [-156, 200, -473, 673, 1079, 569], [-58, 153, -405, 453, 1424, 736], [-124, 155, -468, 141, 1458, 446], [-119, 126, -457, -756, 1619, 33], [-7, 123, -361, 557, 1225, 700], [-62, 119, -416, -592, 1319, 60], [-120, 165, -449, 349, 1223, 463], [-49, 92, -405, -1084, 1179, -192], [-59, 120, -369, -219, 2e3, 392], [20, 118, -394, -274, 1466, 210], [-17, 134, -365, 686, 1114, 719], [5, 135, -325, 1306, 539, 580], [-23, 145, -420, 705, 785, 455], [-42, 128, -413, -114, 1475, 328], [-22, 123, -428, -230, 710, 108], [52, 66, -194, -132, 2243, 880], [58, 97, -317, -166, 1049, 173], [55, 93, -320, 65, 1120, 344], [10, 102, -315, -10, 1681, 512], [64, 76, -212, -664, 1689, -365], [74, 72, -226, -109, 1197, 243], [87, 86, -261, -290, 1418, 127], [56, 73, -236, 495, 1261, 818], [69, 64, -207, 62, 1466, 543], [94, 51, -183, 85, 1325, 498], [78, 60, -194, 60, 1069, 339], [59, 80, -242, -361, 856, 7], [54, 84, -260, -242, 333, 15], [69, 63, -174, -324, 1425, 66], [81, 52, -180, 192, 929, 393], [67, 47, -230, 493, 183, 167]], [[302, 645, -115, 2263, 254, -618], [240, 679, -176, 2367, 806, -1036], [393, 661, -7, 2500, 371, -961], [416, 692, -40, 1938, 21, -513], [401, 704, -60, 1971, -6, -312], [256, 670, -156, 742, -1390, -1976], [386, 719, -98, 2421, -56, -534], [407, 720, -90, 2427, 224, -508], [446, 769, -18, 2838, -109, -221], [399, 645, 139, -2485, 760, -824], [415, 653, 48, 2441, -494, -627], [388, 716, -129, 2216, 226, -517], [310, 728, -218, 3101, 336, -598], [405, 720, -117, 3124, 590, -705], [488, 681, -12, 65, -2297, -1939], [390, 695, -125, 3058, 247, -919], [344, 582, 238, -2802, 291, -1201], [415, 697, -97, -2626, 770, -955], [453, 717, -121, 2997, 457, -1010], [412, 762, -102, -2777, -203, -608], [407, 691, -125, -1444, 1426, -858], [-22, 48, 22, 3056, 578, 271], [405, 686, -61, 2656, -517, -830], [399, 622, 43, -2395, 1098, -1144], [451, 671, 152, -2440, 516, -863], [463, 724, -48, 2803, 296, -1012], [498, 718, 97, -2963, -82, -915], [483, 728, 17, -2970, -139, -924], [497, 733, 14, -2921, 146, -937], [466, 736, -25, -3072, -490, -787], [448, 703, 12, -2453, 72, -1024], [468, 711, 16, -2740, -212, -914], [475, 658, 81, -1989, 833, -852], [315, 594, 233, -2806, -682, -1031], [472, 713, 68, -2519, -26, -1046], [400, 654, 84, -3081, -564, -1011], [439, 703, 80, -2070, 149, -869], [452, 690, 15, 146, 2384, -1999], [476, 735, 74, -78, 2247, -2245], [392, 663, 189, 128, 2276, -2031], [421, 680, 142, -2158, -148, -1222], [129, 442, 226, -1502, 36, -694], [220, 535, 260, -2492, -885, -1253], [372, 656, 199, -254, 1535, -2246], [342, 609, 176, -2445, -720, -1248], [347, 636, 141, -1745, 234, -762], [170, 475, 202, -2019, -576, -1296], [30, 285, 188, -930, 143, -1022], [264, 600, 206, -1377, 461, -866], [312, 619, 215, -1861, 105, -954], [162, 477, 243, -1884, -302, -1153], [-10, 30, 58, -107, -120, 190], [182, 593, 242, -1074, 238, -604], [192, 561, 216, -1392, 155, -731], [144, 456, 189, -2008, -376, -993], [115, 407, 195, -1746, -367, -1169], [234, 519, 227, -1677, -378, -1364], [56, 387, 194, -1484, 20, -463], [158, 479, 226, -1259, 248, -570], [80, 389, 206, -1655, -162, -981], [42, 363, 177, -1459, -34, -520], [-9, 220, 141, -1201, 14, -408], [15, 334, 165, -1506, -11, -191], [74, 426, 219, -1331, 49, -682], [17, 299, 188, -1697, -18, -259], [28, 281, 153, -1536, -237, -825], [30, 337, 197, -1555, -65, -690], [19, 289, 181, -1241, -60, -842], [-20, 274, 255, -1310, -12, -612], [9, 220, 140, -2135, -808, -1187], [-8, 82, 57, -2433, -567, -321], [7, 286, 190, -1494, -158, -919], [1, 289, 215, -1164, 2, -829], [-6, 43, 35, 20, 63, -97], [-9, 245, 183, -664, 184, -852], [-27, 196, 173, -1648, -328, -891], [-42, 187, 197, -888, 51, -595], [-13, 232, 178, -1345, -48, -42], [-8, 232, 181, -915, 34, -281], [-19, 95, 98, -2325, -485, -312], [-52, 64, 163, -1827, -392, -573], [-50, 100, 155, -1653, -354, -772], [-36, 146, 177, -1204, -80, -444], [-55, 168, 174, -556, 157, -669], [1, 33, 134, -911, -142, 211], [-12, 156, 153, -591, -83, 198], [-20, 141, 133, -1135, -76, 170], [-30, 66, 141, -808, -64, -181], [-11, 93, 144, -495, -68, 70], [-2, 66, 121, -702, -137, 255], [1, 84, 134, -624, -129, 279], [-22, 38, 123, -675, -68, -98], [-7, 40, 110, -652, -110, 90], [-7, 29, 76, -441, -87, 61], [-9, 37, 90, -438, -82, 46], [-12, 31, 63, -172, -3, -50], [-18, 35, 71, -196, 29, -124], [-8, 27, 42, 0, 0, 0], [-9, 28, 57, -110, -18, -1], [-6, 31, 49, -1, 0, -1], [-713, 387, 200, -2128, 45, 2096], [-689, 392, 268, -646, -1669, 723], [-794, 344, 75, -428, -1477, 1093], [-862, 362, 150, 621, -2700, 1220], [-750, 378, 176, -2224, 83, 2188], [-742, 319, 73, -951, -2142, 257], [-704, 328, 69, -215, -3057, 583], [-773, 356, 107, 180, -2743, 932], [-806, 359, 25, -1691, -443, 2034], [-817, 301, -113, -448, -2062, 853], [-747, 330, 16, -1900, -339, 2197], [-810, 355, 123, 257, -2980, 905], [-796, 356, 99, -11, 2757, 482], [-813, 343, 21, -477, -2650, 636], [-795, 290, -100, -495, -1864, 747], [-749, 312, -32, -383, 3045, 481], [-609, 220, -431, -339, -1805, 773], [-770, 314, -170, -792, -2700, 285], [-800, 326, 38, -621, -2183, 547], [-790, 313, -96, -126, 2334, 397], [-810, 311, -121, -471, -3087, 496], [-725, 270, -158, -167, -2545, 859], [-629, 240, -188, -173, 2852, 489], [-613, 234, -234, -265, -2601, 645], [-714, 258, -328, -565, -2006, 496], [-834, 315, -64, -212, -2789, 808], [-747, 251, -224, 82, -2597, 1062], [-735, 281, -173, -280, 3086, 581], [-748, 277, -181, -186, 3093, 673], [-727, 269, -168, 38, 2537, 566], [-696, 268, -263, -452, 3110, 484], [-702, 272, -184, -611, -3027, 411], [-632, 221, -244, -144, 2873, 623], [-594, 209, -334, 504, 2809, 949], [-758, 282, -215, -413, -3069, 541], [-634, 249, -327, -748, -2732, 288], [-681, 276, -409, -730, -2841, 179], [-628, 244, -228, -392, 2700, 341], [-660, 253, -243, -252, 2589, 454], [-547, 218, -382, -65, 2667, 571], [-590, 233, -342, -404, 2786, 419], [-373, 188, -507, -285, -3051, 612], [-572, 194, -342, 785, 2267, 760], [-474, 194, -363, 107, 2257, 525], [-522, 231, -356, -836, 2228, 207], [-601, 232, -350, -463, -3098, 426], [-549, 215, -403, 537, 2593, 853], [-426, 183, -384, 646, 1886, 705], [-442, 201, -430, -434, 3055, 389], [-547, 218, -419, -242, 2830, 569], [-457, 204, -428, 50, 2525, 653], [-349, 205, -436, 95, 2424, 714], [-394, 181, -438, -476, 2567, 245], [-440, 201, -454, -573, 2832, 199], [-383, 193, -530, -31, -3068, 764], [-363, 192, -453, -549, 2581, 330], [-334, 175, -429, -219, 2097, 384], [-310, 192, -518, -369, 2846, 466], [-296, 165, -420, -415, 2602, 313], [-364, 190, -463, -281, 2613, 480], [-256, 171, -458, -266, 2517, 507], [-220, 174, -414, -50, 2396, 716], [-306, 185, -465, -171, 2453, 578], [-253, 152, -451, -533, 2505, 144], [-231, 155, -428, -455, 2646, 275], [-194, 158, -427, -84, 2465, 549], [-304, 188, -501, -319, 2790, 493], [-205, 150, -426, -572, 2070, 207], [-203, 159, -518, -606, 2104, 88], [-207, 211, -487, 560, 1338, 620], [-102, 165, -419, 284, 1735, 749], [-170, 166, -489, 89, 1708, 477], [-175, 140, -468, -760, 1742, 62], [-42, 138, -382, 487, 1371, 723], [-111, 123, -431, -579, 1454, 74], [-176, 175, -466, 309, 1362, 483], [-90, 100, -428, -1038, 1341, -157], [-119, 135, -399, -232, 2057, 395], [-15, 125, -416, -309, 1658, 226], [-59, 152, -398, 554, 1384, 748], [-28, 147, -370, 1195, 788, 621], [-61, 163, -452, 663, 939, 508], [-88, 141, -445, -158, 1693, 355], [-56, 134, -469, -231, 826, 132], [24, 85, -228, -136, 2250, 845], [37, 107, -356, -189, 1194, 194], [29, 106, -356, 8, 1394, 399], [-22, 116, -354, -48, 1806, 514], [31, 74, -254, -644, 1766, -335], [63, 82, -265, -135, 1332, 262], [64, 94, -301, -332, 1647, 135], [28, 96, -278, 420, 1407, 826], [47, 80, -246, 17, 1595, 551], [84, 62, -212, -11, 1687, 566], [64, 72, -232, 32, 1213, 370], [46, 89, -289, -381, 1068, 41], [41, 95, -313, -242, 531, 56], [55, 72, -219, -344, 1544, 77], [74, 66, -224, 156, 1153, 455], [67, 61, -281, 569, 359, 243]], [[259, 642, -140, 2309, 359, -658], [187, 669, -164, 2426, 972, -1106], [364, 658, -43, 2490, 547, -972], [375, 677, -72, 1901, 162, -544], [356, 681, -89, 1955, 48, -333], [207, 675, -162, 850, -1147, -2013], [348, 700, -117, 2373, 30, -557], [367, 707, -114, 2373, 360, -525], [433, 769, -51, 2652, 142, -143], [403, 659, 107, -2627, 788, -852], [409, 657, 2, 2421, -325, -597], [346, 701, -149, 2157, 405, -559], [271, 724, -223, 3069, 504, -586], [373, 719, -139, 3080, 684, -697], [470, 679, -42, -1, -2217, -1926], [361, 694, -149, 3027, 406, -916], [355, 588, 199, -3080, 267, -1223], [389, 699, -124, -2689, 889, -947], [428, 714, -146, 2864, 658, -1018], [393, 772, -139, -2826, -102, -541], [386, 699, -158, -1557, 1654, -848], [-26, 54, 11, 3053, 578, 270], [388, 679, -95, 2606, -389, -832], [388, 631, -2, 705, -1942, -2017], [458, 680, 120, -2604, 591, -888], [435, 716, -83, 2664, 411, -1031], [511, 734, 62, -3059, -39, -881], [478, 731, -14, 3075, 26, -854], [489, 736, -18, -3097, 235, -909], [463, 747, -64, -3129, -353, -708], [457, 712, -26, -2651, 190, -993], [469, 723, -24, -2887, -41, -822], [486, 675, 47, -2067, 877, -849], [355, 624, 214, -2907, -679, -990], [487, 727, 28, -2654, 6, -1020], [413, 663, 42, 3097, -380, -943], [466, 723, 45, -2243, 214, -858], [455, 695, -29, 59, 2563, -2062], [482, 742, 29, 2960, -742, -795], [419, 681, 157, -83, 2324, -2144], [442, 692, 104, -2401, -210, -1201], [168, 474, 240, -1568, 89, -770], [266, 578, 271, 435, 2139, -1928], [408, 686, 167, -250, 1635, -2326], [384, 640, 137, -2616, -707, -1162], [397, 665, 112, -1823, 279, -773], [225, 519, 224, -2237, -713, -1299], [40, 318, 229, -1023, 159, -1097], [313, 615, 185, -1444, 593, -980], [360, 651, 198, -2072, 95, -998], [208, 517, 251, -2231, -480, -1191], [-26, 13, 81, -107, -120, 190], [225, 621, 234, -1157, 310, -791], [243, 593, 200, -1504, 172, -855], [201, 506, 194, -2109, -418, -1034], [168, 455, 197, -1807, -412, -1202], [290, 571, 220, -2114, -690, -1319], [91, 426, 206, -1466, 50, -569], [210, 521, 222, -1328, 299, -665], [123, 432, 208, -1708, -194, -1087], [78, 409, 194, -1410, 8, -660], [4, 252, 179, -1213, 96, -477], [44, 384, 189, -1468, 19, -282], [117, 474, 220, -1362, 58, -824], [43, 352, 181, -1627, -50, -428], [56, 333, 170, -1479, -207, -876], [67, 384, 206, -1546, -45, -836], [48, 341, 193, -1209, -31, -920], [-3, 311, 256, -1545, -74, -807], [32, 267, 156, -1971, -691, -1271], [-4, 105, 54, -1934, -423, -434], [35, 334, 201, -1504, -152, -1001], [32, 343, 221, -1195, -1, -909], [-7, 38, 43, 20, 63, -97], [16, 300, 202, -647, 244, -967], [-5, 246, 178, -1678, -345, -946], [-30, 231, 210, -982, 48, -704], [-3, 287, 190, -1342, -7, -233], [9, 283, 194, -917, 48, -330], [-13, 134, 93, -2069, -433, -430], [-48, 94, 165, -2173, -535, -587], [-44, 130, 159, -1995, -536, -841], [-29, 193, 189, -1355, -101, -564], [-48, 209, 193, -615, 179, -788], [0, 45, 145, -1603, -85, 379], [-11, 200, 172, -686, -16, 94], [-19, 189, 150, -1135, -38, 65], [-34, 91, 161, -1049, -86, -242], [-13, 136, 177, -608, -51, 60], [-5, 90, 136, -916, -119, 317], [-1, 120, 158, -741, -110, 307], [-26, 54, 147, -900, -92, -124], [-9, 61, 133, -912, -119, 132], [-8, 42, 99, -722, -123, 117], [-11, 56, 117, -768, -109, 90], [-21, 46, 95, -446, -16, -131], [-31, 54, 99, -312, 40, -203], [-11, 33, 77, -255, -38, -5], [-10, 31, 93, -318, -51, 4], [-19, 24, 71, -225, 23, -126], [-691, 413, 267, -2109, 88, 2076], [-645, 411, 313, -661, -1544, 759], [-768, 358, 121, -529, -1218, 1097], [-831, 379, 188, 545, -2433, 1287], [-716, 405, 228, -2216, 138, 2161], [-734, 339, 143, -952, -2043, 302], [-697, 349, 137, -179, -3002, 607], [-753, 377, 167, 162, -2578, 980], [-811, 381, 83, -1704, -236, 1957], [-823, 312, -71, -496, -1893, 862], [-747, 354, 91, -1876, -263, 2169], [-803, 380, 182, 250, -2775, 989], [-807, 383, 160, 10, 2849, 524], [-819, 361, 81, -496, -2555, 656], [-795, 304, -37, -516, -1772, 759], [-780, 336, 35, -379, 3133, 514], [-622, 227, -381, -369, -1625, 771], [-789, 323, -112, -812, -2591, 287], [-800, 342, 100, -658, -1979, 591], [-838, 339, -38, -116, 2401, 420], [-841, 329, -64, -501, -2885, 539], [-744, 289, -98, -185, -2445, 886], [-668, 255, -132, -126, 2868, 511], [-651, 253, -166, -254, -2581, 674], [-733, 266, -274, -586, -1874, 493], [-843, 335, 3, -252, -2587, 850], [-779, 267, -171, 54, -2488, 1087], [-764, 298, -118, -296, -3003, 632], [-782, 297, -126, -198, -3062, 710], [-778, 292, -111, 60, 2622, 598], [-739, 283, -217, -484, -2970, 518], [-734, 290, -113, -612, -2890, 449], [-694, 243, -199, -129, 2911, 650], [-641, 226, -287, 529, 2857, 976], [-800, 299, -159, -430, -2958, 562], [-653, 255, -273, -756, -2593, 301], [-725, 288, -378, -782, -2627, 160], [-678, 265, -168, -361, 2784, 375], [-701, 270, -172, -227, 2683, 477], [-592, 226, -338, -47, 2812, 599], [-640, 249, -294, -410, 2884, 440], [-419, 195, -502, -316, -2875, 610], [-627, 201, -301, 862, 2297, 772], [-531, 199, -317, 156, 2259, 528], [-585, 250, -310, -854, 2333, 229], [-665, 248, -311, -479, -2988, 446], [-597, 222, -359, 554, 2670, 867], [-499, 193, -363, 692, 1914, 714], [-493, 208, -397, -441, -3090, 407], [-605, 227, -393, -257, 3027, 597], [-511, 209, -399, 59, 2681, 675], [-407, 201, -408, 98, 2511, 710], [-458, 199, -429, -506, 2736, 282], [-504, 219, -439, -619, 3010, 214], [-437, 197, -515, -53, -2852, 764], [-418, 199, -424, -565, 2699, 338], [-393, 182, -405, -195, 2173, 398], [-361, 202, -524, -400, 3002, 455], [-367, 180, -418, -428, 2708, 335], [-421, 199, -450, -312, 2816, 492], [-324, 184, -469, -303, 2697, 510], [-287, 179, -410, -71, 2471, 707], [-384, 196, -470, -187, 2553, 582], [-321, 172, -464, -567, 2656, 169], [-303, 174, -444, -490, 2795, 282], [-252, 162, -412, -85, 2504, 552], [-363, 198, -499, -365, 3026, 479], [-263, 162, -424, -581, 2148, 221], [-245, 171, -530, -674, 2379, 126], [-262, 218, -492, 445, 1604, 646], [-150, 174, -428, 160, 1964, 733], [-221, 175, -500, 58, 1855, 491], [-233, 154, -471, -766, 1844, 85], [-80, 151, -400, 382, 1574, 739], [-164, 129, -438, -547, 1631, 98], [-237, 182, -473, 286, 1458, 494], [-135, 111, -442, -1001, 1481, -121], [-179, 149, -425, -264, 2214, 406], [-54, 131, -432, -325, 1747, 232], [-109, 167, -425, 418, 1663, 753], [-73, 155, -408, 1117, 1002, 641], [-101, 180, -477, 577, 1195, 576], [-139, 152, -468, -206, 1916, 376], [-93, 144, -501, -233, 953, 158], [-6, 102, -264, -137, 2252, 773], [10, 116, -388, -235, 1475, 230], [-9, 119, -385, -53, 1629, 430], [-61, 130, -389, -94, 1959, 514], [-7, 75, -296, -618, 1824, -287], [44, 92, -300, -170, 1502, 282], [33, 101, -336, -352, 1770, 140], [-5, 117, -319, 350, 1530, 820], [15, 97, -287, -25, 1705, 547], [63, 73, -241, -71, 1872, 579], [41, 85, -271, -13, 1396, 398], [23, 98, -334, -401, 1288, 77], [20, 105, -361, -242, 631, 77], [35, 82, -263, -370, 1699, 98], [55, 83, -270, 126, 1277, 479], [57, 79, -327, 595, 460, 287]], [[218, 640, -162, 2480, 666, -749], [136, 663, -146, -486, -1800, -1931], [321, 655, -77, 2567, 778, -990], [324, 662, -100, 1902, 243, -576], [311, 660, -116, 1940, 197, -414], [157, 683, -162, 957, -852, -2082], [308, 682, -133, 2344, 101, -589], [317, 692, -131, 2356, 449, -550], [411, 764, -81, 2558, 280, -126], [402, 670, 73, -2919, 841, -906], [398, 660, -40, 2417, -200, -582], [294, 684, -161, 2139, 553, -615], [232, 720, -224, 3044, 650, -584], [339, 716, -158, 3028, 828, -694], [444, 677, -69, -86, -2037, -1901], [328, 692, -169, 3013, 568, -920], [360, 591, 154, 3097, 298, -1226], [359, 700, -146, 394, -2094, -2201], [393, 709, -163, 2807, 793, -1033], [370, 778, -171, -2892, 36, -465], [358, 706, -184, -1622, 1799, -846], [-28, 56, 6, 3037, 578, 264], [363, 672, -124, 2564, -241, -850], [370, 639, -44, 674, -1800, -2053], [460, 686, 87, -2752, 667, -913], [397, 704, -113, 2583, 523, -1058], [517, 746, 29, -3133, 0, -855], [461, 729, -45, 2907, 170, -823], [476, 737, -48, 3054, 316, -894], [454, 755, -100, 3043, -118, -591], [453, 717, -62, -2781, 289, -976], [459, 730, -63, -3015, 127, -753], [490, 689, 14, -2278, 1001, -848], [388, 648, 187, -3032, -646, -925], [491, 735, -12, -2763, 44, -999], [413, 669, -1, 3028, -186, -897], [478, 736, 9, -2460, 319, -847], [448, 697, -69, -3124, -474, -1053], [480, 745, -14, 2844, -562, -702], [437, 693, 120, -150, 2361, -2186], [453, 699, 63, -2598, -227, -1176], [210, 504, 248, -1676, 140, -834], [309, 614, 271, 291, 2083, -1973], [436, 712, 132, -249, 1751, -2416], [417, 666, 94, -2689, -652, -1102], [438, 690, 79, -1951, 362, -783], [277, 560, 238, -2550, -874, -1249], [57, 353, 264, -1338, 49, -1223], [357, 622, 149, -1479, 679, -1025], [400, 676, 173, -2288, 82, -1023], [257, 552, 245, -2618, -666, -1171], [-35, 2, 95, -107, -120, 190], [270, 641, 218, -1221, 359, -898], [296, 619, 175, -1574, 184, -900], [268, 557, 192, -2275, -458, -1026], [227, 505, 196, -1904, -464, -1200], [342, 619, 202, -2414, -840, -1227], [128, 463, 217, -1475, 113, -730], [269, 561, 206, -1391, 335, -707], [176, 476, 209, -1811, -246, -1139], [125, 453, 212, -1413, 40, -735], [26, 287, 220, -1250, 129, -507], [76, 430, 212, -1453, 60, -370], [170, 519, 218, -1424, 60, -928], [76, 403, 179, -1594, -62, -506], [87, 386, 189, -1432, -161, -981], [111, 431, 215, -1563, -38, -903], [82, 393, 206, -1191, 5, -1038], [22, 346, 251, -1788, -199, -979], [59, 320, 183, -1953, -676, -1328], [-5, 127, 66, -1408, -224, -486], [70, 381, 212, -1550, -160, -1135], [66, 394, 226, -1247, -13, -1043], [-10, 28, 58, 20, 63, -97], [49, 357, 221, -629, 312, -1088], [21, 296, 185, -1688, -354, -1029], [-12, 276, 220, -1043, 45, -795], [20, 343, 203, -1328, 31, -394], [25, 330, 208, -911, 104, -511], [-6, 178, 100, -1860, -368, -521], [-39, 128, 161, -2393, -633, -604], [-29, 167, 158, -2111, -608, -879], [-12, 247, 196, -1408, -107, -647], [-35, 249, 209, -711, 220, -1015], [-5, 66, 145, -2058, 9, 432], [-3, 250, 191, -714, 20, 14], [-12, 241, 169, -1114, 7, -68], [-35, 122, 176, -1363, -124, -336], [-13, 180, 206, -776, -6, 6], [-8, 119, 148, -1102, -77, 334], [-3, 158, 179, -866, -69, 304], [-30, 74, 166, -1183, -119, -158], [-12, 85, 152, -1074, -110, 148], [-10, 61, 118, -1004, -129, 168], [-14, 83, 139, -1065, -101, 110], [-28, 73, 124, -581, -21, -178], [-40, 78, 124, -432, 50, -291], [-14, 52, 110, -455, -58, -7], [-12, 44, 122, -511, -73, 13], [-28, 26, 88, -529, 10, -295], [-670, 437, 329, -2058, 201, 2021], [-597, 430, 351, -689, -1347, 818], [-729, 373, 165, -617, -986, 1097], [-790, 394, 222, 479, -2275, 1316], [-680, 430, 276, -2207, 279, 2094], [-719, 360, 210, -961, -1895, 368], [-687, 372, 203, -152, -2953, 629], [-720, 397, 224, 149, -2473, 1009], [-805, 401, 138, -1732, -90, 1910], [-823, 322, -29, -605, -1520, 866], [-742, 378, 162, -1857, -207, 2147], [-782, 405, 237, 216, -2574, 1059], [-813, 408, 218, 25, 2937, 565], [-819, 378, 139, -530, -2403, 686], [-788, 319, 24, -562, -1582, 784], [-803, 360, 100, -379, -3058, 548], [-630, 234, -324, -385, -1536, 775], [-801, 331, -55, -833, -2455, 293], [-787, 359, 160, -688, -1834, 619], [-877, 362, 17, -106, 2486, 450], [-862, 345, -7, -525, -2750, 565], [-756, 308, -37, -208, -2339, 912], [-704, 276, -72, -79, 2907, 542], [-687, 275, -97, -247, -2535, 712], [-747, 274, -220, -605, -1754, 494], [-840, 354, 69, -298, -2396, 885], [-803, 285, -118, 27, -2400, 1105], [-782, 316, -59, -320, -2826, 675], [-808, 316, -71, -213, -2948, 741], [-820, 314, -53, 85, 2767, 653], [-771, 297, -163, -508, -2837, 539], [-757, 310, -37, -615, -2766, 485], [-748, 267, -151, -109, 3032, 718], [-682, 246, -233, 556, 2931, 1013], [-831, 316, -101, -445, -2863, 579], [-666, 262, -211, -751, -2502, 321], [-758, 297, -337, -833, -2391, 132], [-722, 289, -100, -350, 2838, 396], [-736, 289, -97, -198, 2790, 505], [-633, 237, -285, -37, 2859, 611], [-685, 265, -239, -415, 2977, 461], [-463, 202, -491, -350, -2672, 604], [-676, 213, -253, 930, 2325, 785], [-589, 209, -268, 220, 2261, 531], [-647, 268, -257, -861, 2411, 246], [-720, 263, -267, -510, -2804, 477], [-642, 230, -311, 593, 2789, 895], [-570, 205, -337, 775, 1983, 736], [-545, 217, -349, -440, -3027, 422], [-656, 237, -357, -273, -3076, 625], [-563, 217, -358, 81, 2826, 706], [-467, 198, -372, 125, 2531, 717], [-520, 218, -412, -531, 2848, 302], [-563, 236, -414, -643, 3100, 219], [-487, 201, -487, -74, -2637, 770], [-474, 207, -387, -566, 2763, 347], [-456, 193, -372, -157, 2227, 414], [-409, 211, -524, -451, -3e3, 427], [-445, 197, -407, -439, 2782, 350], [-478, 208, -425, -333, 2978, 504], [-395, 197, -467, -325, 2815, 513], [-361, 183, -402, -69, 2497, 711], [-458, 206, -468, -200, 2651, 589], [-392, 192, -466, -603, 2796, 184], [-378, 192, -451, -510, 2877, 284], [-313, 166, -395, -58, 2518, 573], [-420, 207, -488, -388, -3129, 472], [-324, 174, -417, -589, 2250, 240], [-287, 183, -531, -754, 2669, 143], [-320, 219, -483, 365, 1816, 651], [-208, 178, -427, 72, 2147, 709], [-272, 183, -503, 5, 2113, 509], [-290, 168, -471, -782, 2013, 123], [-122, 161, -413, 262, 1801, 736], [-221, 137, -437, -509, 1772, 123], [-297, 188, -475, 262, 1588, 507], [-182, 124, -450, -978, 1586, -91], [-249, 164, -443, -290, 2351, 417], [-90, 137, -446, -372, 2031, 248], [-167, 177, -444, 329, 1867, 745], [-124, 159, -440, 1059, 1232, 652], [-149, 191, -490, 517, 1353, 606], [-198, 163, -477, -233, 2048, 386], [-132, 154, -526, -246, 1232, 214], [-44, 119, -309, -151, 2294, 715], [-26, 124, -413, -263, 1635, 247], [-52, 131, -407, -117, 1857, 447], [-106, 143, -419, -158, 2183, 507], [-47, 80, -338, -578, 1921, -194], [19, 102, -332, -210, 1684, 298], [-1, 109, -368, -373, 1909, 149], [-43, 137, -358, 264, 1687, 805], [-20, 112, -327, -53, 1777, 542], [36, 86, -268, -125, 2026, 574], [9, 99, -309, -59, 1564, 414], [-11, 108, -374, -412, 1405, 97], [-6, 116, -403, -243, 737, 100], [7, 93, -309, -387, 1802, 114], [27, 99, -313, 93, 1392, 496], [41, 96, -369, 614, 601, 350]], [[175, 647, -174, 2578, 829, -776], [85, 664, -121, -255, -1493, -1888], [273, 655, -107, -407, -2080, -2144], [270, 650, -123, 1937, 363, -639], [256, 643, -135, 1982, 367, -540], [108, 695, -152, 998, -636, -2148], [266, 666, -145, 2313, 301, -716], [268, 678, -145, 2358, 531, -583], [384, 755, -108, 2437, 479, -128], [388, 676, 34, 103, -2275, -2216], [379, 664, -80, 2421, -85, -573], [237, 669, -164, 2149, 654, -666], [192, 715, -215, 3014, 883, -596], [301, 713, -171, -169, -2082, -2438], [410, 673, -92, -100, -1812, -1880], [289, 690, -179, 3018, 755, -933], [359, 593, 106, -73, -2694, -1923], [325, 700, -163, 343, -1871, -2202], [352, 702, -174, -383, -2147, -2081], [343, 780, -197, -3002, 265, -368], [323, 711, -202, -1667, 1905, -846], [-28, 56, 6, 126, -161, 253], [336, 666, -149, 2529, 54, -912], [347, 649, -82, 654, -1655, -2098], [456, 691, 54, -2903, 753, -943], [352, 692, -137, 2538, 672, -1097], [519, 755, -3, 3041, 67, -818], [435, 723, -72, 2836, 250, -818], [455, 734, -75, 2883, 455, -886], [433, 757, -131, 2923, 110, -503], [442, 719, -95, -2886, 391, -967], [442, 734, -98, -3139, 304, -703], [482, 700, -18, -2437, 1100, -856], [415, 669, 158, -3115, -605, -874], [491, 742, -48, -2878, 101, -975], [402, 672, -44, 2997, -55, -876], [482, 744, -25, -2712, 472, -845], [438, 699, -107, 3101, -305, -1019], [468, 743, -56, 2778, -453, -660], [451, 702, 84, 2931, -728, -915], [456, 703, 23, -2875, -189, -1132], [253, 531, 245, -1760, 168, -863], [348, 648, 269, 144, 2053, -2042], [458, 732, 95, 2874, -1197, -577], [439, 688, 47, -2727, -599, -1062], [465, 708, 45, -2090, 461, -791], [325, 595, 237, 339, 2200, -1982], [84, 388, 287, -1904, -306, -1310], [393, 628, 110, -1538, 870, -1083], [432, 696, 142, -2553, 75, -1037], [303, 583, 230, 241, 2397, -2035], [-40, -4, 104, -107, -120, 190], [314, 655, 196, -1284, 403, -983], [343, 643, 148, -1686, 210, -945], [333, 606, 177, -2367, -463, -1001], [288, 556, 189, -2040, -519, -1169], [385, 660, 172, -2578, -862, -1133], [177, 497, 225, -1516, 158, -815], [324, 598, 183, -1535, 407, -756], [235, 520, 206, -1925, -294, -1147], [177, 495, 227, -1445, 65, -783], [52, 325, 255, -1341, 180, -562], [114, 474, 234, -1460, 154, -525], [233, 560, 209, -1535, 51, -1005], [113, 452, 178, -1555, -75, -651], [129, 440, 213, -1459, -158, -1030], [163, 477, 221, -1620, -40, -964], [126, 445, 220, -1224, 7, -1103], [59, 380, 238, -1915, -290, -1057], [92, 376, 212, -2039, -744, -1345], [-8, 147, 88, -1201, -125, -498], [117, 429, 222, -1690, -237, -1238], [108, 444, 228, -1301, -37, -1119], [-12, 22, 68, 20, 63, -97], [91, 415, 238, -644, 361, -1200], [52, 346, 194, -1703, -369, -1150], [10, 320, 227, -1141, 34, -963], [49, 397, 216, -1325, 55, -485], [53, 378, 220, -910, 135, -605], [2, 225, 118, -1691, -293, -612], [-23, 170, 151, -2458, -684, -656], [-10, 208, 157, -2166, -666, -975], [9, 300, 202, -1433, -108, -734], [-12, 290, 220, -738, 235, -1096], [-11, 93, 139, -2189, 36, 421], [12, 301, 208, -734, 62, -88], [4, 297, 191, -1105, 33, -137], [-30, 160, 182, -1579, -160, -432], [-8, 232, 229, -869, 27, -55], [-11, 152, 158, -1225, -35, 297], [-3, 203, 196, -962, -23, 263], [-32, 99, 179, -1565, -158, -212], [-14, 115, 166, -1250, -87, 146], [-13, 88, 133, -1351, -97, 198], [-17, 122, 154, -1168, -88, 97], [-33, 107, 149, -653, -18, -210], [-46, 106, 145, -584, 58, -414], [-18, 74, 139, -740, -68, -18], [-14, 58, 148, -796, -91, 26], [-33, 33, 100, -1306, -228, -599], [-637, 460, 380, -2032, 254, 1993], [-543, 450, 381, -711, -1221, 856], [-683, 388, 206, -682, -806, 1102], [-745, 409, 252, 374, -2065, 1346], [-635, 454, 318, -2209, 436, 2027], [-694, 384, 272, -981, -1747, 429], [-672, 394, 264, -84, -2813, 696], [-686, 417, 276, 139, -2389, 1033], [-792, 418, 191, -1827, 199, 1840], [-808, 332, 13, -652, -1358, 863], [-730, 400, 230, -1838, -158, 2128], [-752, 427, 286, 178, -2435, 1099], [-809, 432, 269, 42, 3103, 643], [-813, 395, 192, -604, -2117, 731], [-771, 335, 85, -619, -1371, 811], [-814, 383, 162, -382, -2949, 587], [-634, 243, -264, -405, -1443, 794], [-806, 339, 2, -858, -2261, 306], [-765, 377, 215, -745, -1599, 660], [-906, 383, 70, -93, 2634, 503], [-871, 360, 49, -545, -2647, 584], [-763, 327, 23, -282, -2080, 964], [-735, 297, -13, -10, 3013, 608], [-718, 299, -27, -251, -2461, 751], [-755, 282, -165, -626, -1625, 498], [-828, 372, 132, -361, -2169, 918], [-821, 301, -65, -22, -2259, 1129], [-789, 334, 3, -336, -2721, 699], [-824, 334, -15, -252, -2744, 791], [-847, 337, 6, 98, 2920, 710], [-794, 312, -108, -529, -2719, 557], [-771, 331, 39, -622, -2635, 524], [-791, 292, -99, -108, 3135, 767], [-717, 267, -177, 569, 2994, 1041], [-856, 331, -46, -463, -2757, 598], [-674, 272, -141, -738, -2471, 341], [-783, 305, -293, -876, -2149, 96], [-761, 312, -35, -336, 2932, 431], [-762, 311, -17, -180, 2856, 525], [-671, 248, -232, -23, 2905, 626], [-724, 282, -180, -426, 3141, 498], [-502, 209, -468, -372, -2542, 601], [-721, 227, -206, 1013, 2366, 803], [-645, 222, -217, 317, 2287, 541], [-703, 286, -196, -863, 2470, 259], [-764, 280, -215, -545, -2624, 504], [-679, 241, -254, 648, 2904, 932], [-638, 224, -300, 851, 2068, 765], [-595, 229, -297, -431, -2928, 461], [-699, 248, -313, -294, -2876, 657], [-612, 227, -310, 110, 2938, 741], [-528, 197, -332, 223, 2538, 747], [-579, 237, -385, -555, 2950, 317], [-617, 252, -387, -678, -3051, 223], [-534, 206, -447, -85, -2524, 778], [-529, 217, -344, -558, 2818, 361], [-524, 208, -332, -120, 2267, 429], [-454, 217, -511, -480, -2810, 407], [-521, 216, -388, -464, 2942, 379], [-533, 218, -391, -343, 3078, 516], [-464, 209, -460, -340, 2900, 518], [-436, 189, -389, -52, 2546, 731], [-529, 217, -460, -223, 2835, 607], [-465, 212, -453, -642, 2942, 194], [-451, 210, -453, -553, 3057, 287], [-383, 174, -374, -36, 2512, 587], [-475, 215, -467, -411, -2988, 466], [-390, 188, -404, -591, 2305, 251], [-331, 193, -517, -797, 2821, 142], [-379, 217, -467, 342, 1892, 649], [-271, 179, -420, 48, 2225, 701], [-326, 189, -492, -41, 2359, 519], [-348, 182, -462, -794, 2114, 143], [-168, 169, -421, 204, 1916, 729], [-283, 148, -429, -470, 1869, 146], [-356, 194, -470, 239, 1781, 523], [-230, 137, -454, -950, 1761, -35], [-320, 178, -454, -305, 2434, 425], [-133, 142, -450, -391, 2162, 254], [-232, 184, -453, 264, 2050, 733], [-183, 162, -463, 1032, 1409, 656], [-197, 200, -496, 406, 1631, 639], [-257, 173, -481, -255, 2166, 394], [-175, 162, -537, -254, 1344, 235], [-88, 135, -358, -169, 2363, 686], [-66, 131, -431, -291, 1801, 262], [-104, 141, -421, -145, 1954, 451], [-160, 154, -439, -209, 2384, 498], [-94, 91, -378, -561, 1991, -137], [-9, 111, -361, -249, 1858, 310], [-42, 116, -394, -389, 2031, 159], [-86, 154, -394, 150, 1915, 773], [-61, 128, -364, -87, 1872, 535], [2, 99, -296, -183, 2189, 548], [-35, 114, -347, -81, 1639, 420], [-52, 119, -407, -417, 1472, 109], [-35, 126, -438, -246, 885, 132], [-25, 105, -352, -416, 1968, 139], [-2, 115, -354, 43, 1553, 511], [21, 113, -403, 608, 851, 454]], [[134, 657, -179, 2702, 1038, -791], [37, 671, -90, 15, -1133, -1874], [217, 661, -131, -219, -1802, -2161], [215, 644, -140, 2059, 586, -753], [198, 635, -146, 2025, 453, -608], [60, 710, -131, 989, -518, -2186], [216, 655, -145, 2331, 426, -812], [216, 666, -154, 2411, 731, -675], [347, 740, -130, 2338, 671, -158], [372, 680, -3, 4, -2234, -2200], [357, 667, -115, 2437, 106, -563], [179, 658, -161, 2225, 865, -780], [152, 710, -196, 3004, 1040, -615], [256, 708, -175, -179, -1968, -2426], [368, 669, -110, -67, -1673, -1873], [250, 688, -186, -105, -2244, -2198], [346, 597, 51, 42, -2437, -1950], [283, 699, -170, 330, -1728, -2200], [306, 695, -178, -385, -1961, -2051], [311, 777, -215, -3062, 381, -329], [286, 716, -214, 1375, -972, -2288], [-23, 49, 19, 124, -161, 253], [300, 661, -164, 2540, 254, -966], [316, 661, -116, 642, -1537, -2139], [442, 691, 21, 109, -2302, -2169], [298, 679, -153, 2559, 868, -1146], [517, 762, -33, 2889, 181, -772], [406, 716, -97, 2726, 404, -826], [426, 728, -99, 2807, 527, -889], [404, 754, -156, 2860, 234, -470], [427, 719, -123, -3062, 621, -964], [413, 733, -128, 3021, 496, -671], [469, 708, -47, -2556, 1180, -865], [437, 687, 128, 3071, -536, -809], [487, 747, -82, -2991, 179, -953], [384, 674, -83, 2961, 217, -850], [474, 747, -59, -2921, 611, -863], [418, 698, -138, 3031, -54, -989], [446, 737, -95, 2677, -279, -613], [458, 709, 48, 2780, -550, -812], [450, 703, -17, -3026, -130, -1109], [293, 555, 238, -1880, 200, -885], [383, 676, 261, -1, 2061, -2132], [469, 746, 56, 2850, -1068, -482], [455, 707, 2, -2821, -430, -952], [481, 721, 10, -2205, 553, -797], [366, 624, 226, 239, 2206, -2038], [116, 422, 300, -2385, -651, -1314], [418, 631, 69, -1580, 1096, -1115], [454, 709, 105, -2831, 84, -1042], [344, 609, 202, 36, 2408, -2115], [-40, -4, 104, 2926, -885, -446], [353, 665, 169, -1417, 497, -1129], [384, 661, 114, -1853, 265, -986], [392, 650, 158, -2490, -444, -946], [344, 604, 175, -2208, -553, -1100], [421, 696, 137, -2706, -826, -1023], [231, 528, 225, -1587, 198, -869], [373, 631, 150, -1669, 476, -782], [294, 564, 195, -2159, -365, -1115], [229, 535, 238, -1587, 118, -875], [79, 362, 285, -1493, 241, -644], [162, 512, 251, -1483, 217, -608], [295, 597, 192, -1703, 33, -1056], [165, 501, 181, -1570, -77, -763], [174, 493, 234, -1571, -193, -1086], [219, 521, 222, -1801, -76, -1035], [175, 496, 230, -1338, -38, -1171], [101, 412, 224, -2092, -446, -1151], [128, 431, 238, 542, 1944, -1798], [-11, 167, 114, -1076, -21, -529], [174, 478, 229, -1826, -324, -1266], [158, 491, 227, -1365, -71, -1165], [-12, 19, 72, 20, 63, -97], [146, 472, 249, -731, 349, -1297], [93, 398, 206, -1742, -398, -1201], [41, 363, 231, -1199, 18, -1064], [88, 447, 228, -1338, 106, -662], [90, 423, 231, -919, 166, -698], [13, 272, 143, -1550, -195, -722], [0, 220, 142, -2396, -701, -764], [15, 252, 159, -2092, -650, -1072], [37, 353, 208, -1460, -108, -896], [16, 330, 229, -775, 262, -1225], [-17, 125, 129, -2215, 22, 357], [34, 351, 224, -757, 127, -258], [28, 351, 212, -1098, 93, -282], [-20, 204, 183, -1666, -181, -512], [2, 286, 246, -949, 62, -138], [-11, 193, 165, -1275, -4, 214], [1, 250, 211, -1041, 27, 182], [-30, 130, 185, -1704, -175, -242], [-15, 149, 176, -1451, -47, 100], [-17, 125, 143, -1455, -76, 174], [-18, 163, 167, -1312, -52, 20], [-37, 140, 172, -882, -7, -342], [-48, 135, 164, -736, 58, -547], [-21, 108, 161, -978, -62, -49], [-17, 78, 167, -1103, -94, 34], [-33, 49, 105, -1630, -376, -657], [-602, 482, 424, -1996, 317, 1959], [-486, 472, 401, -739, -1076, 900], [-628, 405, 244, -726, -683, 1118], [-695, 423, 279, 172, -1711, 1378], [-580, 476, 353, 932, -2632, 1143], [-661, 410, 327, -1001, -1637, 471], [-644, 420, 317, -49, -2727, 739], [-647, 436, 324, 119, -2209, 1083], [-767, 433, 239, -2052, 645, 1776], [-790, 342, 54, -694, -1205, 858], [-713, 422, 292, -1804, -82, 2097], [-716, 449, 330, 74, -2147, 1166], [-795, 452, 314, 45, -3037, 707], [-793, 409, 240, -646, -1966, 750], [-746, 352, 143, -649, -1263, 825], [-820, 404, 221, -388, -2865, 617], [-634, 255, -193, -417, -1420, 830], [-799, 346, 60, -870, -2140, 316], [-733, 395, 265, -805, -1379, 692], [-923, 401, 119, -89, 2715, 532], [-873, 374, 102, -607, -2367, 626], [-755, 348, 85, -321, -1962, 983], [-754, 324, 50, 19, 3094, 653], [-741, 326, 46, -264, -2383, 782], [-755, 292, -106, -646, -1503, 508], [-802, 390, 191, -433, -1934, 945], [-834, 318, -15, -108, -2044, 1157], [-790, 351, 63, -379, -2494, 746], [-828, 351, 40, -281, -2621, 817], [-862, 358, 64, 101, 3012, 744], [-810, 325, -53, -575, -2483, 590], [-771, 353, 116, -634, -2476, 570], [-826, 317, -47, -116, -3056, 805], [-747, 288, -121, -2567, -56, 2064], [-875, 346, 8, -484, -2639, 619], [-680, 284, -69, -699, -2438, 388], [-797, 310, -241, -902, -1961, 68], [-788, 336, 33, -326, 3072, 483], [-778, 334, 63, -151, 2971, 560], [-704, 261, -177, 19, 3031, 671], [-754, 299, -116, -434, -3033, 524], [-539, 216, -445, -399, -2380, 597], [-759, 243, -157, 1101, 2419, 829], [-697, 242, -160, 374, 2320, 552], [-753, 304, -133, -862, 2639, 296], [-798, 296, -159, -574, -2487, 522], [-708, 255, -190, 680, 2953, 952], [-699, 245, -254, 894, 2133, 789], [-642, 242, -239, -421, -2836, 503], [-733, 259, -262, -318, -2680, 688], [-656, 240, -251, 144, 3035, 779], [-590, 202, -285, 328, 2536, 777], [-633, 255, -353, -608, -3133, 338], [-665, 267, -351, -729, -2852, 224], [-577, 212, -405, -104, -2352, 800], [-584, 228, -297, -537, 2894, 389], [-592, 226, -286, -84, 2323, 450], [-496, 223, -489, -501, -2649, 390], [-594, 235, -359, -491, 3088, 403], [-585, 228, -351, -355, -3040, 543], [-529, 220, -447, -378, 3118, 531], [-510, 197, -373, -18, 2635, 773], [-595, 227, -439, -236, 2949, 619], [-534, 232, -433, -686, 3105, 198], [-522, 227, -438, -595, -3047, 286], [-455, 184, -352, -2, 2512, 611], [-527, 222, -439, -444, -2756, 461], [-458, 203, -385, -593, 2377, 268], [-373, 202, -497, -859, 3044, 130], [-436, 215, -448, 307, 2107, 641], [-335, 181, -411, 52, 2301, 705], [-381, 195, -470, -55, 2463, 523], [-407, 196, -443, -802, 2179, 156], [-217, 174, -425, 133, 2074, 715], [-353, 165, -411, -441, 1929, 163], [-416, 198, -453, 236, 1872, 531], [-281, 154, -449, -943, 1860, -2], [-393, 193, -456, -337, 2614, 444], [-180, 148, -446, -404, 2278, 262], [-299, 188, -456, 222, 2234, 725], [-248, 163, -475, 1030, 1573, 661], [-247, 205, -495, 307, 1880, 648], [-315, 182, -479, -288, 2372, 408], [-216, 170, -543, -271, 1537, 269], [-138, 150, -404, -202, 2507, 658], [-109, 138, -443, -332, 2045, 279], [-159, 151, -429, -189, 2119, 454], [-218, 165, -451, -237, 2512, 494], [-145, 106, -415, -555, 2073, -84], [-45, 120, -384, -284, 2016, 318], [-85, 124, -416, -405, 2155, 172], [-136, 168, -425, 104, 2020, 757], [-106, 142, -398, -137, 2025, 526], [-43, 112, -325, -202, 2242, 535], [-82, 129, -382, -121, 1790, 430], [-90, 128, -437, -440, 1707, 150], [-65, 135, -468, -252, 1050, 167], [-69, 119, -390, -449, 2131, 159], [-38, 130, -390, -11, 1725, 520], [-7, 129, -430, 593, 964, 497]], [[96, 668, -181, -346, -1936, -2356], [-9, 682, -55, 300, -706, -1901], [157, 674, -149, -143, -1674, -2179], [159, 645, -151, 2168, 755, -817], [143, 630, -154, 2148, 661, -738], [16, 725, -104, 952, -422, -2215], [168, 648, -143, 2398, 587, -935], [161, 661, -153, 2486, 896, -745], [301, 720, -145, 2307, 764, -186], [351, 682, -39, -108, -2129, -2182], [330, 671, -144, 2463, 307, -554], [120, 654, -149, 2354, 1106, -881], [114, 706, -172, -131, -1874, -2486], [207, 702, -170, -171, -1807, -2406], [322, 666, -125, 57, -1384, -1874], [209, 688, -185, -35, -1938, -2173], [327, 604, -5, 256, -2122, -2019], [241, 699, -172, 335, -1606, -2199], [253, 688, -172, -358, -1856, -2034], [278, 773, -230, 3091, 638, -278], [247, 719, -217, 1325, -818, -2279], [-16, 39, 36, 123, -161, 254], [260, 659, -171, 2579, 434, -1016], [284, 673, -145, 622, -1391, -2195], [422, 688, -12, -30, -2178, -2127], [240, 669, -162, -492, -2079, -1957], [507, 765, -61, 2746, 294, -740], [365, 704, -117, 2660, 537, -848], [392, 720, -120, 2672, 682, -909], [374, 750, -178, 2759, 453, -439], [402, 716, -147, -10, -2381, -2169], [374, 728, -151, 2924, 675, -663], [449, 714, -74, 500, -1899, -2268], [451, 701, 95, 2982, -452, -746], [477, 749, -114, 3065, 347, -925], [353, 676, -116, 2960, 371, -844], [452, 743, -88, 31, -2389, -2246], [389, 696, -162, 2976, 209, -980], [418, 728, -129, 2590, -117, -592], [458, 711, 12, 2704, -439, -767], [436, 701, -54, 3092, -25, -1091], [328, 577, 225, -2107, 253, -913], [410, 696, 243, -110, 2092, -2214], [472, 754, 17, 2815, -923, -385], [456, 720, -42, -2909, -262, -859], [490, 732, -24, -2392, 712, -817], [402, 650, 213, 72, 2269, -2160], [149, 454, 306, 416, 2259, -1858], [428, 632, 25, -1610, 1362, -1125], [465, 716, 65, -3082, 116, -1044], [378, 631, 165, -51, 2450, -2164], [-32, 5, 92, 2926, -885, -446], [386, 669, 137, -1504, 568, -1213], [413, 673, 75, -2031, 342, -1017], [439, 688, 131, -2596, -406, -886], [390, 647, 150, -2289, -548, -1050], [448, 725, 98, -2776, -782, -950], [284, 557, 216, -1653, 226, -892], [409, 659, 107, -1812, 554, -800], [350, 605, 172, -2335, -379, -1059], [283, 570, 236, -1736, 149, -929], [114, 401, 301, -1587, 269, -693], [214, 546, 258, -1545, 316, -719], [354, 629, 162, -1909, 23, -1075], [222, 548, 182, -1657, -74, -850], [223, 543, 248, -1857, -321, -1142], [279, 563, 211, -1980, -113, -1050], [230, 543, 232, -1481, -112, -1204], [151, 444, 207, -2191, -547, -1195], [173, 487, 257, 294, 1764, -1838], [-11, 192, 152, -1093, 10, -557], [235, 525, 228, -2163, -531, -1267], [210, 536, 222, -1672, -265, -1251], [-12, 19, 72, -3101, -477, 169], [206, 527, 252, -1010, 171, -1381], [137, 448, 216, -1865, -488, -1251], [78, 404, 233, -1327, -47, -1219], [133, 493, 236, -1360, 130, -740], [130, 466, 238, -969, 216, -857], [31, 322, 179, -1509, -135, -795], [27, 272, 140, -2283, -687, -877], [47, 302, 169, -2063, -639, -1100], [75, 405, 214, -1491, -117, -1013], [50, 368, 235, -829, 284, -1384], [-21, 170, 117, -2013, -53, 211], [65, 400, 237, -780, 190, -420], [59, 403, 233, -1103, 133, -369], [-2, 252, 182, -1704, -199, -647], [18, 339, 258, -1061, 113, -312], [-6, 236, 172, -1269, 28, 41], [10, 298, 222, -1095, 72, 69], [-27, 163, 186, -1814, -189, -284], [-14, 186, 182, -1620, -9, -15], [-18, 165, 151, -1528, -44, 73], [-15, 210, 179, -1387, -18, -113], [-32, 182, 189, -1064, -3, -486], [-43, 168, 178, -850, 52, -658], [-22, 146, 178, -1105, -50, -91], [-18, 104, 179, -1458, -83, 16], [-32, 66, 108, -2119, -617, -684], [-568, 502, 463, -1963, 365, 1931], [-429, 494, 415, -798, -849, 964], [-565, 424, 280, -741, -636, 1135], [-639, 436, 300, 50, -1504, 1391], [-526, 497, 384, 939, -2484, 1201], [-623, 436, 376, -1028, -1522, 511], [-614, 445, 365, -13, -2624, 793], [-600, 455, 362, 104, -2076, 1120], [-730, 444, 281, 924, -2220, 1386], [-767, 352, 93, -757, -971, 849], [-691, 443, 347, -1767, -5, 2064], [-671, 468, 366, -72, -1828, 1215], [-777, 471, 354, 22, -2771, 818], [-765, 422, 282, -703, -1765, 771], [-715, 370, 199, -705, -1081, 850], [-817, 424, 274, -412, -2668, 682], [-634, 271, -118, -414, -1462, 877], [-787, 354, 114, -877, -2044, 329], [-693, 414, 308, -835, -1274, 706], [-935, 418, 166, -90, 2925, 606], [-866, 387, 152, -653, -2179, 647], [-742, 369, 145, -399, -1749, 1010], [-764, 351, 111, 35, -3113, 693], [-759, 352, 116, -291, -2268, 819], [-747, 302, -46, -676, -1347, 529], [-768, 406, 246, -483, -1776, 959], [-838, 334, 34, -208, -1823, 1176], [-777, 368, 123, -428, -2273, 786], [-826, 368, 93, -366, -2315, 868], [-872, 378, 119, 94, -3077, 812], [-816, 338, 3, -605, -2336, 607], [-759, 377, 190, -653, -2307, 618], [-851, 341, 4, -129, -2977, 834], [-768, 309, -63, -2572, 42, 2031], [-886, 359, 60, -536, -2387, 657], [-683, 303, 12, -676, -2421, 415], [-799, 314, -183, -921, -1780, 43], [-802, 360, 99, -324, -3050, 542], [-784, 357, 141, -125, 3087, 598], [-730, 276, -118, 41, 3100, 698], [-776, 316, -51, -446, -2881, 560], [-571, 223, -414, -441, -2122, 590], [-785, 264, -104, 1167, 2466, 852], [-741, 268, -98, 427, 2370, 570], [-789, 321, -65, -859, 2784, 330], [-825, 312, -103, -621, -2284, 543], [-734, 270, -126, -2397, -100, 2147], [-753, 268, -205, 923, 2189, 810], [-686, 262, -170, -415, -2738, 549], [-758, 272, -204, -344, -2500, 717], [-694, 258, -183, 163, 3087, 802], [-652, 217, -229, 405, 2543, 800], [-680, 271, -315, -643, -3001, 347], [-705, 280, -307, -781, -2646, 219], [-614, 220, -352, -124, -2203, 826], [-638, 243, -241, -522, 2944, 410], [-659, 247, -233, -63, 2375, 467], [-534, 228, -459, -514, -2537, 380], [-662, 255, -318, -523, -3034, 426], [-632, 240, -300, -364, -2900, 572], [-589, 232, -422, -411, -2979, 540], [-583, 210, -345, 0, 2694, 799], [-654, 238, -409, -259, 3130, 639], [-598, 250, -400, -736, -2992, 197], [-590, 244, -414, -641, -2846, 280], [-528, 198, -326, 55, 2544, 659], [-574, 230, -399, -465, -2589, 462], [-529, 220, -357, -593, 2437, 283], [-414, 209, -466, -907, -3055, 110], [-492, 212, -416, 312, 2195, 637], [-407, 184, -394, 66, 2320, 713], [-435, 201, -439, -68, 2628, 534], [-464, 209, -419, -825, 2344, 187], [-266, 179, -426, 70, 2259, 698], [-426, 185, -387, -417, 1985, 180], [-473, 203, -432, 242, 1975, 540], [-333, 171, -438, -948, 2016, 48], [-465, 208, -449, -352, 2702, 453], [-228, 153, -437, -413, 2444, 279], [-371, 192, -447, 215, 2332, 727], [-313, 165, -478, 1051, 1718, 668], [-301, 206, -481, 282, 1951, 648], [-376, 191, -465, -308, 2522, 420], [-258, 176, -540, -303, 1806, 310], [-200, 163, -445, -240, 2695, 637], [-157, 145, -446, -362, 2248, 292], [-218, 161, -432, -207, 2201, 457], [-280, 174, -455, -272, 2690, 491], [-199, 125, -445, -565, 2237, 0], [-85, 129, -401, -334, 2244, 324], [-132, 132, -432, -419, 2282, 188], [-189, 180, -451, 66, 2123, 744], [-154, 154, -427, -198, 2237, 514], [-90, 125, -355, -228, 2323, 518], [-135, 143, -413, -162, 1953, 440], [-137, 139, -456, -469, 1944, 188], [-99, 143, -488, -262, 1196, 197], [-117, 133, -423, -473, 2243, 171], [-80, 143, -420, -84, 1956, 521], [-37, 144, -452, 515, 1288, 599]], [[62, 682, -177, -242, -1729, -2380], [-49, 698, -10, 393, -505, -1935], [99, 688, -162, -19, -1404, -2241], [105, 653, -155, 2375, 1076, -879], [89, 636, -154, 2246, 819, -804], [-24, 739, -72, 891, -346, -2233], [119, 650, -133, 2482, 737, -1022], [108, 660, -147, 2630, 1159, -827], [252, 700, -155, 2292, 947, -261], [319, 682, -75, -134, -2046, -2178], [298, 676, -166, 2499, 517, -544], [62, 657, -128, -622, -1756, -2193], [78, 704, -135, -115, -1747, -2456], [158, 698, -160, -138, -1666, -2386], [270, 664, -133, 192, -1158, -1891], [167, 689, -176, 27, -1740, -2162], [298, 621, -63, 415, -1889, -2111], [198, 699, -169, 355, -1472, -2199], [200, 682, -162, -225, -1569, -1997], [241, 763, -231, 3033, 765, -270], [204, 721, -209, 1269, -594, -2265], [-7, 25, 62, 125, -161, 253], [221, 659, -174, 2671, 678, -1079], [246, 687, -165, 599, -1274, -2242], [391, 683, -43, -83, -2090, -2104], [179, 662, -162, -216, -1663, -1911], [492, 766, -87, 2620, 409, -721], [315, 691, -131, 2640, 675, -888], [348, 708, -134, 2625, 771, -928], [335, 742, -191, 2702, 582, -432], [371, 712, -164, -122, -2157, -2142], [326, 720, -166, 2858, 840, -673], [426, 718, -99, 371, -1799, -2250], [461, 712, 63, 2880, -338, -677], [456, 746, -140, 2949, 454, -920], [319, 677, -145, 2992, 672, -841], [424, 737, -114, -95, -2262, -2208], [351, 693, -178, 2942, 441, -985], [380, 716, -157, 2513, 53, -595], [448, 710, -23, 2572, -226, -708], [413, 696, -88, 3e3, 73, -1090], [357, 596, 203, -2262, 290, -925], [435, 715, 225, 2900, -983, -821], [470, 759, -21, 2770, -766, -294], [447, 728, -82, -3017, -49, -763], [485, 736, -55, -2532, 838, -844], [427, 670, 190, 12, 2308, -2211], [182, 484, 305, 174, 2117, -1904], [428, 634, -18, -1635, 1663, -1111], [466, 718, 23, 2963, 174, -1049], [405, 649, 125, 2964, -568, -891], [-23, 15, 78, 2926, -885, -446], [410, 668, 100, -1624, 714, -1332], [431, 681, 33, -2201, 446, -1042], [476, 720, 101, -2712, -343, -813], [430, 686, 123, -2405, -517, -963], [466, 748, 57, -2886, -678, -825], [332, 583, 203, -1774, 269, -908], [436, 682, 62, -1958, 646, -811], [397, 642, 140, -2484, -348, -987], [334, 600, 222, -1932, 180, -965], [147, 438, 313, -1770, 303, -783], [266, 575, 258, -1590, 369, -770], [406, 656, 125, -2080, 40, -1069], [291, 593, 172, -1800, -61, -890], [274, 588, 250, -2053, -415, -1150], [335, 602, 188, -2204, -141, -1033], [282, 588, 230, -1732, -251, -1223], [211, 479, 187, -2204, -543, -1187], [220, 539, 268, 19, 1629, -1952], [-9, 218, 186, -1251, 63, -660], [295, 571, 218, -2342, -621, -1240], [265, 576, 207, -1832, -368, -1261], [-10, 27, 60, -3101, -477, 169], [269, 578, 243, -1595, -296, -1421], [185, 496, 222, -1981, -572, -1266], [124, 444, 230, -1431, -118, -1281], [184, 535, 239, -1452, 172, -886], [178, 505, 238, -1021, 235, -932], [55, 370, 216, -1523, -50, -924], [58, 326, 148, -2185, -666, -981], [78, 351, 180, -2011, -623, -1186], [122, 456, 219, -1576, -157, -1122], [92, 405, 237, -940, 220, -1470], [-19, 219, 115, -1817, -96, 75], [106, 446, 245, -813, 252, -568], [98, 452, 249, -1132, 207, -518], [23, 303, 183, -1685, -202, -738], [44, 390, 262, -1112, 134, -415], [9, 284, 182, -1243, 42, -57], [25, 345, 230, -1126, 107, -46], [-21, 198, 185, -1918, -209, -359], [-5, 233, 184, -1657, 1, -112], [-13, 215, 161, -1521, -30, -4], [-2, 265, 188, -1397, 6, -245], [-21, 228, 202, -1184, -4, -622], [-36, 201, 190, -953, 42, -771], [-19, 191, 191, -1249, -29, -188], [-19, 137, 184, -1617, -77, -16], [-25, 94, 106, -2183, -653, -702], [-531, 520, 493, -1920, 425, 1895], [-370, 518, 415, -850, -683, 1004], [-501, 445, 315, -784, -524, 1187], [-577, 449, 316, -69, -1268, 1408], [-465, 517, 403, 951, -2400, 1233], [-581, 462, 416, -1061, -1400, 550], [-577, 469, 402, 12, -2540, 837], [-550, 474, 394, 80, -1885, 1172], [-688, 454, 318, 596, -1687, 1405], [-733, 362, 131, -784, -863, 846], [-663, 461, 394, -1722, 75, 2028], [-618, 485, 394, -247, -1488, 1246], [-747, 485, 384, -17, -2581, 884], [-733, 435, 320, -751, -1600, 783], [-675, 390, 251, -746, -958, 867], [-808, 441, 320, -437, -2521, 726], [-640, 294, -33, -409, -1500, 916], [-769, 362, 166, -883, -1948, 344], [-649, 432, 347, -902, -1047, 733], [-933, 432, 208, -98, 3055, 649], [-847, 398, 197, -727, -1886, 670], [-719, 390, 203, -450, -1616, 1024], [-769, 378, 170, 45, -3014, 742], [-766, 379, 183, -322, -2163, 848], [-731, 315, 17, -696, -1257, 548], [-726, 421, 294, -556, -1539, 978], [-836, 350, 81, -319, -1591, 1185], [-753, 385, 180, -479, -2059, 820], [-811, 383, 143, -427, -2125, 891], [-868, 396, 170, 77, -2935, 858], [-813, 351, 58, -659, -2086, 634], [-734, 400, 259, -677, -2132, 667], [-872, 364, 53, -163, -2832, 881], [-784, 330, -6, 549, -2971, 1148], [-885, 371, 109, -574, -2224, 676], [-683, 324, 92, -636, -2369, 474], [-793, 316, -124, -931, -1630, 29], [-803, 383, 163, -333, -2880, 602], [-777, 381, 214, -98, -3064, 645], [-748, 294, -57, 76, -3051, 751], [-788, 334, 16, -458, -2763, 588], [-598, 229, -377, -465, -1978, 586], [-807, 284, -54, 1242, 2528, 886], [-780, 293, -38, 476, 2431, 594], [-813, 338, 6, -856, 2954, 370], [-837, 327, -44, -656, -2139, 555], [-748, 290, -56, -2374, -69, 2132], [-799, 290, -154, 947, 2244, 831], [-724, 283, -97, -419, -2619, 597], [-773, 285, -142, -375, -2312, 747], [-727, 277, -114, 196, -3093, 848], [-708, 233, -173, 511, 2570, 837], [-719, 287, -269, -700, -2792, 356], [-736, 292, -255, -826, -2450, 209], [-646, 229, -293, -148, -2062, 861], [-688, 259, -183, -499, 3041, 450], [-720, 271, -176, -31, 2481, 504], [-568, 232, -427, -532, -2362, 367], [-722, 275, -269, -559, -2868, 447], [-675, 253, -241, -371, -2768, 605], [-643, 243, -386, -449, -2762, 550], [-652, 223, -316, 26, 2816, 852], [-705, 248, -373, -273, -3051, 651], [-657, 267, -358, -777, -2829, 193], [-650, 259, -374, -682, -2656, 272], [-603, 218, -294, 81, 2589, 690], [-617, 237, -349, -488, -2399, 470], [-596, 237, -327, -595, 2538, 308], [-455, 215, -423, -935, -2925, 94], [-545, 210, -379, 359, 2325, 634], [-476, 188, -376, 128, 2373, 746], [-488, 206, -401, -64, 2705, 543], [-520, 223, -385, -832, 2407, 199], [-323, 182, -417, 62, 2316, 698], [-505, 208, -356, -402, 2049, 200], [-528, 209, -404, 251, 2031, 546], [-389, 190, -417, -959, 2083, 68], [-534, 222, -432, -387, 2902, 474], [-282, 160, -420, -407, 2499, 292], [-443, 195, -431, 227, 2476, 743], [-380, 169, -468, 1089, 1847, 679], [-352, 207, -467, 222, 2160, 641], [-437, 199, -441, -324, 2679, 435], [-300, 182, -527, -326, 1977, 331], [-267, 176, -475, -271, 2865, 627], [-210, 152, -440, -379, 2403, 305], [-281, 170, -428, -226, 2322, 465], [-345, 184, -451, -289, 2801, 494], [-259, 147, -465, -583, 2334, 37], [-133, 137, -412, -355, 2352, 327], [-180, 141, -443, -431, 2391, 204], [-242, 189, -472, 24, 2254, 730], [-212, 166, -447, -230, 2365, 508], [-148, 139, -385, -240, 2372, 514], [-199, 157, -436, -193, 2095, 449], [-188, 149, -466, -498, 2146, 217], [-133, 151, -505, -275, 1350, 227], [-170, 147, -448, -510, 2412, 184], [-129, 155, -443, -125, 2094, 518], [-74, 157, -463, 456, 1459, 639]], [[30, 695, -170, -172, -1570, -2412], [-84, 715, 38, 484, -238, -2e3], [45, 707, -160, 42, -1159, -2322], [53, 668, -149, 2483, 1254, -887], [39, 647, -147, 2309, 923, -832], [-57, 750, -32, 764, -247, -2246], [74, 655, -121, 2627, 968, -1108], [58, 668, -131, -388, -1761, -2279], [196, 681, -154, 2335, 1138, -354], [280, 681, -106, -104, -1809, -2184], [266, 681, -183, 2540, 735, -530], [7, 669, -97, -468, -1489, -2168], [44, 704, -94, -92, -1641, -2428], [110, 695, -143, -76, -1480, -2363], [213, 667, -134, 313, -983, -1917], [126, 693, -161, 162, -1374, -2156], [263, 646, -118, 506, -1693, -2227], [156, 700, -161, 407, -1266, -2203], [145, 680, -144, 2, -1215, -1978], [204, 752, -228, 2920, 1018, -279], [161, 722, -192, 1237, -393, -2253], [1, 14, 81, 133, -161, 250], [181, 663, -169, -358, -2243, -2019], [208, 701, -180, 556, -1128, -2299], [357, 677, -71, -95, -1970, -2084], [117, 663, -153, -61, -1445, -1905], [474, 764, -110, 2507, 518, -713], [257, 678, -137, 2658, 766, -921], [303, 697, -144, 2608, 853, -950], [293, 732, -198, 2626, 778, -441], [331, 705, -172, -167, -1957, -2109], [272, 709, -173, 2841, 929, -687], [400, 721, -121, 270, -1712, -2230], [461, 718, 30, 2691, -108, -574], [429, 741, -160, 2848, 562, -925], [277, 680, -165, 3019, 817, -840], [384, 725, -135, -173, -2138, -2168], [308, 690, -186, 2935, 595, -996], [336, 702, -178, 2454, 220, -622], [429, 706, -56, 2504, -101, -688], [381, 689, -117, 2949, 167, -1098], [380, 612, 177, -2558, 372, -939], [451, 726, 201, 2752, -873, -695], [459, 759, -56, 2658, -452, -152], [428, 733, -118, -3085, 93, -713], [475, 738, -84, -2731, 1050, -900], [447, 685, 165, -39, 2354, -2259], [215, 510, 296, -210, 1983, -2048], [412, 636, -58, -1648, 1821, -1092], [455, 716, -18, 2856, 217, -1054], [419, 662, 79, 2864, -404, -810], [-9, 31, 56, 2926, -885, -446], [422, 661, 59, -1624, 997, -1432], [436, 685, -8, -2304, 538, -1057], [500, 745, 67, -2847, -246, -725], [458, 717, 91, -2485, -478, -896], [475, 765, 16, -3016, -530, -684], [374, 607, 186, -1953, 333, -917], [449, 699, 14, -2112, 759, -820], [433, 674, 101, -2545, -319, -949], [378, 626, 198, -2142, 209, -990], [183, 473, 313, -1876, 312, -831], [314, 600, 252, -1660, 438, -826], [444, 677, 82, -2162, 62, -1059], [356, 633, 151, -1896, -43, -892], [322, 627, 244, -2361, -549, -1128], [384, 636, 156, -2332, -139, -1008], [332, 627, 220, -2089, -445, -1211], [275, 519, 164, -2190, -467, -1133], [269, 585, 264, -109, 1630, -2065], [4, 252, 217, -1447, 79, -765], [351, 612, 200, -2568, -684, -1166], [317, 614, 189, -2034, -485, -1251], [-8, 36, 46, -3073, -481, 161], [330, 623, 222, -2217, -781, -1387], [233, 541, 224, -2288, -784, -1259], [174, 482, 226, -1576, -221, -1318], [241, 571, 232, -1567, 192, -979], [227, 542, 235, -1163, 240, -1034], [95, 419, 252, -1574, -29, -981], [94, 382, 163, -2140, -661, -1077], [117, 403, 196, -2051, -659, -1229], [181, 506, 220, -1694, -220, -1175], [137, 441, 237, 488, 1731, -1611], [-9, 267, 124, -1631, -109, -84], [155, 488, 247, -847, 291, -652], [142, 497, 260, -1181, 282, -658], [54, 354, 186, -1645, -197, -859], [75, 438, 262, -1160, 151, -521], [28, 329, 193, -1188, 79, -245], [44, 388, 237, -1147, 136, -158], [-10, 235, 182, -1985, -237, -478], [7, 279, 186, -1644, 7, -235], [-5, 264, 171, -1467, 2, -175], [21, 323, 198, -1383, 32, -384], [0, 279, 210, -1230, -3, -710], [-23, 235, 198, -1059, 26, -904], [-9, 242, 200, -1308, -15, -279], [-16, 177, 183, -1729, -75, -79], [-15, 128, 105, -2021, -583, -794], [-496, 537, 518, -1878, 470, 1865], [-314, 541, 409, -941, -441, 1053], [-430, 473, 344, -869, -353, 1248], [-508, 463, 326, -50, -1240, 1421], [-403, 535, 415, 968, -2359, 1250], [-536, 487, 446, -1132, -1178, 609], [-540, 492, 433, 37, -2435, 893], [-494, 492, 415, 60, -1736, 1212], [-637, 461, 346, 343, -1247, 1406], [-693, 373, 168, -828, -688, 854], [-634, 479, 435, -1671, 157, 1989], [-558, 500, 411, -401, -1193, 1260], [-715, 498, 409, -69, -2389, 940], [-696, 446, 353, -809, -1400, 793], [-627, 412, 298, -777, -869, 881], [-791, 457, 361, -523, -2182, 809], [-647, 321, 55, -420, -1492, 957], [-748, 370, 213, -889, -1808, 372], [-598, 450, 378, -973, -815, 755], [-926, 444, 246, -148, -2898, 746], [-819, 408, 238, -799, -1605, 680], [-687, 411, 257, -524, -1431, 1040], [-764, 403, 225, 46, -2928, 783], [-766, 404, 245, -371, -2015, 882], [-712, 330, 79, -717, -1172, 576], [-676, 435, 335, -586, -1434, 986], [-829, 364, 125, -434, -1355, 1185], [-717, 401, 233, -502, -1954, 837], [-791, 397, 190, -477, -1975, 905], [-857, 413, 217, 24, -2668, 932], [-796, 363, 112, -709, -1857, 654], [-699, 423, 321, -692, -2037, 693], [-885, 384, 99, -208, -2680, 923], [-790, 350, 51, 472, -2699, 1213], [-874, 383, 156, -617, -2050, 692], [-677, 352, 174, -623, -2329, 505], [-775, 318, -60, -935, -1501, 30], [-793, 405, 222, -346, -2753, 644], [-761, 405, 282, -74, -2921, 697], [-756, 314, 7, 92, -2969, 784], [-790, 351, 83, -467, -2666, 611], [-621, 237, -334, -502, -1750, 584], [-818, 306, -3, -1823, -539, 2212], [-807, 320, 22, 561, 2567, 655], [-825, 355, 75, -854, 3066, 396], [-842, 341, 13, -713, -1909, 568], [-757, 311, 12, -2351, -39, 2116], [-835, 312, -102, 999, 2393, 890], [-752, 310, -15, -426, -2546, 624], [-777, 300, -76, -390, -2217, 762], [-750, 300, -40, 220, -2979, 897], [-756, 256, -112, 574, 2602, 865], [-748, 300, -216, -753, -2586, 358], [-757, 302, -198, -852, -2325, 202], [-672, 242, -226, -173, -1942, 902], [-730, 280, -117, -486, 3120, 481], [-772, 295, -113, -6, 2611, 550], [-599, 236, -390, -550, -2149, 357], [-772, 294, -211, -600, -2688, 465], [-710, 270, -174, -374, -2705, 623], [-689, 254, -342, -487, -2552, 558], [-712, 239, -277, 35, 2888, 881], [-751, 258, -336, -292, -2912, 668], [-707, 282, -306, -798, -2741, 190], [-702, 272, -327, -707, -2532, 267], [-675, 241, -256, 109, 2697, 746], [-653, 246, -292, -499, -2294, 483], [-658, 254, -292, -601, 2689, 345], [-496, 221, -372, -946, -2848, 91], [-595, 211, -329, 425, 2407, 638], [-547, 198, -348, 199, 2432, 786], [-540, 213, -357, -40, 2805, 567], [-574, 237, -350, -840, 2489, 214], [-380, 185, -406, 75, 2444, 717], [-585, 235, -315, -393, 2138, 227], [-578, 216, -374, 277, 2150, 560], [-445, 209, -393, -973, 2135, 83], [-598, 237, -403, -417, 3069, 490], [-337, 168, -402, -383, 2550, 318], [-516, 201, -401, 242, 2540, 756], [-447, 175, -450, 1141, 1973, 697], [-404, 206, -441, 206, 2272, 637], [-498, 209, -404, -327, 2772, 448], [-341, 187, -510, -357, 2216, 355], [-338, 188, -493, -306, 3060, 619], [-268, 160, -426, -380, 2470, 315], [-348, 179, -419, -230, 2421, 480], [-410, 194, -440, -310, 2952, 505], [-318, 170, -477, -609, 2435, 65], [-183, 146, -419, -386, 2524, 336], [-229, 150, -450, -442, 2490, 220], [-296, 197, -486, -18, 2413, 715], [-269, 176, -461, -259, 2503, 506], [-207, 153, -412, -269, 2497, 514], [-269, 171, -451, -221, 2239, 460], [-243, 160, -465, -515, 2264, 232], [-169, 158, -514, -295, 1541, 261], [-229, 161, -464, -538, 2531, 190], [-182, 165, -457, -164, 2238, 513], [-114, 167, -467, 317, 1801, 686]], [[4, 709, -158, -55, -1150, -2555], [-105, 733, 85, 518, -77, -2050], [-3, 727, -149, 47, -1015, -2380], [7, 685, -138, -448, -1489, -2293], [-7, 657, -140, 2459, 1182, -870], [-85, 759, 12, 685, -189, -2249], [31, 666, -102, -308, -1861, -1979], [11, 678, -110, -196, -1386, -2272], [139, 668, -142, 2441, 1338, -451], [234, 683, -133, -13, -1538, -2215], [232, 687, -194, 2584, 962, -510], [-42, 687, -57, -353, -1246, -2180], [12, 705, -50, -69, -1550, -2404], [64, 696, -118, -21, -1337, -2351], [156, 673, -131, 516, -668, -2001], [87, 701, -130, 206, -1255, -2160], [222, 678, -167, 516, -1616, -2281], [116, 701, -150, 489, -973, -2222], [88, 685, -112, 125, -1034, -1981], [167, 739, -214, 2879, 1129, -297], [118, 722, -161, 1230, -243, -2249], [6, 6, 96, 150, -160, 244], [143, 669, -160, -172, -1929, -1980], [168, 715, -185, 456, -892, -2382], [315, 670, -95, -54, -1829, -2075], [59, 667, -139, 149, -1137, -1916], [452, 760, -131, 2422, 610, -715], [199, 666, -140, -369, -2158, -2143], [254, 685, -150, 2621, 940, -976], [248, 721, -197, 2573, 965, -471], [284, 697, -171, -164, -1845, -2090], [219, 699, -175, 2849, 1114, -728], [366, 721, -137, 127, -1558, -2193], [450, 720, -4, 2607, 2, -542], [398, 734, -177, 2710, 730, -946], [233, 683, -178, -42, -1989, -2310], [340, 712, -150, -193, -2073, -2148], [261, 687, -187, -186, -2296, -2117], [284, 688, -188, 2431, 315, -649], [403, 700, -86, 2434, 50, -681], [347, 682, -143, 2897, 388, -1134], [393, 624, 144, -2804, 463, -948], [461, 733, 174, 2604, -743, -583], [439, 754, -89, 2599, -309, -106], [402, 735, -149, -3134, 207, -682], [455, 737, -108, 239, -1895, -2171], [464, 700, 142, 2929, -597, -722], [248, 533, 275, -346, 1985, -2132], [388, 639, -93, -1663, 1967, -1064], [438, 710, -58, 2683, 323, -1072], [425, 672, 32, 2811, -293, -768], [4, 46, 35, 2926, -886, -446], [425, 653, 19, -1237, 1639, -1484], [433, 687, -48, -2457, 748, -1082], [514, 764, 32, -2992, -120, -636], [479, 744, 60, -2628, -379, -764], [472, 774, -25, 3138, -372, -565], [404, 627, 158, -2148, 407, -921], [451, 713, -33, -2269, 890, -834], [459, 702, 61, -2610, -273, -901], [412, 646, 165, -2279, 237, -996], [218, 506, 305, -2020, 311, -887], [357, 622, 241, -1780, 540, -905], [472, 694, 37, -2308, 126, -1035], [412, 669, 125, -1947, -27, -885], [364, 657, 224, -2535, -606, -1099], [425, 667, 120, -2480, -109, -966], [375, 660, 200, -2278, -529, -1183], [338, 566, 131, -2192, -410, -1085], [315, 625, 250, -173, 1667, -2151], [23, 288, 243, -1567, 73, -822], [398, 649, 172, -2719, -677, -1089], [363, 646, 164, -2206, -566, -1226], [-5, 48, 30, -2996, -489, 139], [383, 660, 190, 568, 2163, -1839], [279, 583, 220, -2554, -938, -1213], [225, 518, 217, -1788, -371, -1332], [296, 604, 218, -1729, 197, -1055], [276, 574, 222, -1373, 208, -1113], [136, 465, 280, -1748, -40, -1077], [136, 440, 184, -2171, -684, -1115], [161, 455, 212, -2285, -832, -1261], [244, 553, 214, -1928, -346, -1205], [190, 476, 229, 74, 1374, -1655], [6, 313, 142, -1583, -104, -136], [206, 528, 242, -942, 357, -782], [193, 537, 261, -1221, 322, -728], [93, 405, 193, -1635, -196, -923], [110, 482, 259, -1214, 163, -638], [60, 375, 207, -1154, 125, -405], [67, 429, 241, -1167, 168, -294], [8, 274, 178, -1986, -259, -599], [28, 326, 190, -1616, 12, -335], [17, 317, 187, -1433, 28, -283], [55, 381, 210, -1371, 62, -525], [28, 330, 216, -1271, 1, -841], [-3, 271, 204, -1201, -15, -1098], [5, 292, 207, -1354, 5, -435], [-11, 218, 180, -1800, -86, -218], [-4, 170, 114, -1811, -472, -863], [-461, 552, 536, -1740, 610, 1765], [-259, 565, 393, -1023, -250, 1082], [-356, 505, 366, -972, -182, 1284], [-438, 479, 333, 265, -1458, 1459], [-345, 553, 425, 1027, -2282, 1286], [-490, 510, 467, -1181, -1042, 638], [-500, 513, 455, 58, -2312, 958], [-439, 509, 429, 9, -1465, 1278], [-578, 467, 366, 203, -938, 1409], [-645, 386, 203, -858, -575, 881], [-602, 495, 468, -1616, 248, 1944], [-491, 513, 418, -531, -926, 1267], [-679, 509, 429, -139, -2187, 987], [-653, 456, 377, -848, -1254, 801], [-577, 434, 340, -854, -662, 914], [-761, 470, 391, -568, -2034, 837], [-654, 354, 150, -441, -1449, 977], [-724, 379, 257, -900, -1597, 420], [-538, 469, 396, -1011, -694, 766], [-907, 453, 278, -188, -2720, 789], [-778, 416, 273, -851, -1387, 680], [-652, 432, 306, -640, -1153, 1058], [-755, 427, 275, 40, -2809, 837], [-759, 427, 301, -489, -1718, 931], [-685, 348, 141, -737, -1103, 604], [-623, 449, 370, -625, -1288, 1e3], [-817, 379, 166, -534, -1146, 1177], [-678, 417, 283, -535, -1779, 867], [-765, 410, 232, -515, -1858, 914], [-837, 428, 259, -72, -2345, 999], [-767, 375, 164, -733, -1743, 664], [-663, 446, 377, -726, -1850, 742], [-887, 403, 143, -356, -2302, 994], [-784, 370, 107, 414, -2551, 1240], [-858, 393, 198, -693, -1749, 712], [-666, 382, 254, -605, -2206, 585], [-751, 321, 4, -935, -1447, 39], [-776, 426, 276, -382, -2524, 714], [-732, 428, 342, -62, -2838, 728], [-756, 335, 71, 106, -2861, 827], [-786, 368, 146, -490, -2459, 661], [-638, 245, -283, -531, -1592, 591], [-821, 328, 47, -1753, -461, 2165], [-821, 347, 81, 598, 2640, 691], [-829, 371, 141, -852, -3129, 418], [-836, 355, 69, -775, -1667, 574], [-764, 330, 76, -2283, 65, 2062], [-858, 333, -49, 1023, 2487, 928], [-770, 338, 66, -438, -2466, 649], [-774, 315, -10, -420, -2042, 795], [-763, 325, 37, 229, -2903, 928], [-795, 282, -49, 669, 2675, 919], [-769, 313, -158, -797, -2408, 356], [-771, 311, -139, -890, -2116, 194], [-693, 259, -154, -201, -1840, 941], [-766, 301, -51, -474, -3017, 537], [-812, 321, -46, 10, 2740, 596], [-623, 240, -342, -565, -1976, 358], [-810, 312, -150, -646, -2497, 479], [-740, 287, -105, -378, -2626, 646], [-725, 265, -289, -510, -2422, 564], [-763, 257, -234, 39, 2987, 917], [-790, 268, -295, -326, -2698, 691], [-749, 295, -249, -835, -2573, 186], [-747, 285, -276, -722, -2456, 265], [-737, 268, -207, 114, 2776, 780], [-684, 255, -230, -512, -2170, 508], [-713, 272, -246, -607, 2782, 368], [-538, 227, -311, -942, -2832, 100], [-640, 217, -271, 485, 2449, 642], [-615, 212, -313, 237, 2474, 812], [-591, 223, -303, -7, 2872, 594], [-624, 250, -308, -847, 2575, 231], [-442, 191, -387, 111, 2527, 747], [-662, 263, -265, -388, 2256, 264], [-624, 223, -342, 312, 2270, 579], [-501, 228, -364, -991, 2194, 97], [-656, 250, -369, -452, -3030, 506], [-396, 179, -379, -352, 2570, 345], [-585, 209, -366, 281, 2657, 791], [-511, 184, -422, 1172, 2029, 707], [-455, 204, -409, 218, 2401, 637], [-557, 220, -360, -324, 2885, 471], [-381, 192, -480, -370, 2330, 364], [-408, 199, -500, -316, 3121, 618], [-329, 169, -408, -365, 2542, 341], [-420, 191, -401, -228, 2472, 492], [-475, 204, -419, -321, 3044, 516], [-376, 192, -481, -646, 2552, 87], [-241, 156, -419, -404, 2647, 347], [-279, 159, -451, -454, 2605, 241], [-350, 203, -490, -50, 2566, 703], [-329, 186, -468, -281, 2616, 506], [-278, 169, -433, -289, 2594, 518], [-343, 185, -456, -249, 2398, 475], [-301, 171, -456, -536, 2418, 252], [-206, 165, -514, -340, 1859, 307], [-287, 175, -475, -579, 2709, 195], [-236, 174, -467, -214, 2444, 505], [-160, 174, -461, 212, 2036, 693]], [[-16, 723, -135, -41, -927, -2659], [-117, 749, 126, 534, 114, -2121], [-45, 745, -133, 2, -781, -2479], [-32, 704, -119, -330, -1174, -2378], [-47, 671, -126, -430, -1507, -2281], [-102, 763, 57, 614, -138, -2250], [-7, 681, -79, -125, -1576, -1968], [-28, 695, -77, -126, -1210, -2293], [81, 663, -121, 2522, 1467, -500], [182, 688, -151, 46, -1367, -2246], [198, 693, -197, 2652, 1355, -457], [-85, 707, -11, -315, -1146, -2193], [-17, 708, 1, -53, -1486, -2392], [21, 698, -90, 26, -1207, -2346], [97, 685, -121, 601, -444, -2090], [49, 710, -96, 273, -1029, -2178], [180, 710, -208, 495, -1475, -2389], [77, 706, -125, 532, -804, -2240], [33, 693, -78, 222, -869, -1992], [131, 725, -196, 2849, 1242, -327], [77, 721, -122, 1231, -171, -2249], [7, 4, 97, 3017, 577, 256], [106, 680, -144, 52, -1571, -1969], [129, 728, -177, 391, -774, -2415], [269, 665, -116, 106, -1515, -2086], [5, 674, -122, 389, -715, -1969], [423, 753, -147, 2267, 796, -738], [135, 664, -133, -257, -1990, -2098], [205, 676, -149, -460, -2061, -2127], [198, 707, -183, 2554, 1155, -526], [235, 690, -165, -135, -1724, -2071], [163, 691, -167, -239, -1806, -2364], [323, 717, -146, 83, -1488, -2177], [434, 718, -35, 2456, 231, -505], [360, 725, -187, 2664, 813, -963], [184, 690, -178, 34, -1714, -2326], [290, 699, -160, -188, -1945, -2113], [211, 686, -177, -125, -2053, -2082], [231, 675, -192, 2413, 494, -718], [371, 692, -111, 2393, 176, -690], [304, 675, -160, 2901, 510, -1159], [394, 632, 103, -2914, 530, -950], [465, 734, 143, 2377, -522, -449], [411, 745, -118, 2497, -68, -56], [372, 734, -175, 3082, 374, -650], [423, 730, -128, 129, -1718, -2104], [469, 707, 112, 2713, -351, -567], [278, 553, 249, -441, 2022, -2209], [362, 644, -124, 1433, -912, -2146], [410, 702, -94, 2612, 396, -1088], [421, 679, -14, 2737, -82, -709], [10, 53, 25, 2924, -886, -446], [413, 642, -22, -875, 2141, -1480], [421, 687, -84, -2563, 1005, -1112], [515, 776, -3, 3107, 52, -544], [488, 763, 27, -2720, -299, -681], [460, 777, -65, 3040, -241, -491], [424, 642, 125, -2264, 459, -920], [439, 721, -77, -2401, 1018, -852], [477, 726, 21, -2684, -206, -843], [436, 662, 127, -2528, 309, -998], [251, 536, 293, -2169, 297, -936], [393, 638, 221, -1933, 658, -994], [487, 707, -7, -2481, 238, -1003], [462, 701, 98, -2077, 26, -858], [402, 684, 203, -2807, -654, -1027], [452, 691, 79, -2584, -73, -930], [411, 686, 174, -2584, -611, -1104], [394, 611, 97, -2203, -353, -1032], [356, 659, 230, -205, 1705, -2210], [45, 326, 263, -1794, 36, -917], [436, 680, 138, -2853, -618, -992], [403, 675, 138, -2467, -631, -1151], [-4, 52, 25, -2881, -499, 105], [428, 692, 152, 517, 2155, -1863], [322, 619, 206, 313, 2111, -2034], [277, 553, 200, -2034, -525, -1315], [347, 629, 191, -1933, 188, -1111], [324, 602, 197, -1659, 139, -1163], [183, 507, 297, -1910, -87, -1126], [181, 497, 205, -2268, -743, -1137], [214, 510, 222, -2483, -963, -1242], [306, 597, 200, -2106, -431, -1198], [247, 512, 215, 125, 1504, -1707], [25, 356, 162, -1506, -78, -251], [260, 564, 229, -1063, 413, -880], [244, 572, 256, -1317, 389, -842], [137, 455, 201, -1674, -212, -1019], [149, 521, 251, -1320, 167, -818], [103, 421, 220, -1156, 154, -475], [98, 465, 242, -1207, 229, -553], [31, 313, 177, -1921, -279, -792], [55, 372, 195, -1580, 22, -455], [45, 368, 203, -1411, 59, -385], [99, 437, 220, -1377, 83, -610], [66, 382, 221, -1307, 2, -975], [27, 307, 207, -1258, -41, -1193], [30, 344, 212, -1367, 18, -558], [2, 264, 176, -1784, -97, -318], [8, 214, 128, -1672, -388, -912], [-425, 563, 541, -1617, 685, 1694], [-207, 588, 368, -1146, 10, 1109], [-284, 539, 381, -1255, 230, 1322], [-364, 500, 334, 873, -1983, 1474], [-289, 569, 425, 1154, -2186, 1342], [-442, 532, 478, -1232, -910, 661], [-458, 533, 469, 69, -2195, 1016], [-381, 527, 427, -24, -1317, 1312], [-512, 474, 377, 178, -814, 1420], [-589, 402, 237, -870, -538, 913], [-569, 509, 495, -1493, 427, 1851], [-423, 525, 417, -572, -827, 1271], [-639, 516, 442, -200, -2025, 1017], [-609, 465, 397, -881, -1122, 808], [-521, 459, 373, -952, -428, 943], [-730, 481, 416, -692, -1682, 882], [-656, 388, 243, -533, -1269, 1021], [-688, 390, 293, -908, -1465, 454], [-478, 488, 409, -1048, -570, 780], [-886, 461, 307, -241, -2526, 826], [-731, 424, 303, -873, -1286, 679], [-606, 452, 346, -762, -867, 1067], [-738, 449, 318, 19, -2657, 899], [-740, 449, 347, -569, -1535, 950], [-654, 368, 202, -778, -978, 657], [-569, 463, 399, -687, -1046, 1026], [-796, 392, 203, -733, -686, 1132], [-627, 433, 324, -551, -1675, 888], [-735, 421, 271, -559, -1718, 925], [-804, 439, 294, -214, -1968, 1047], [-734, 388, 212, -751, -1645, 675], [-618, 467, 423, -774, -1632, 795], [-877, 419, 182, -453, -2090, 1017], [-772, 388, 161, 235, -2173, 1289], [-832, 402, 236, -732, -1595, 716], [-642, 417, 326, -607, -2076, 658], [-721, 325, 69, -931, -1373, 71], [-748, 444, 323, -437, -2277, 777], [-700, 450, 395, -44, -2683, 786], [-749, 357, 132, 113, -2767, 864], [-771, 385, 205, -502, -2359, 684], [-648, 256, -220, -545, -1533, 603], [-814, 350, 95, -1651, -324, 2078], [-825, 373, 137, 654, 2786, 766], [-824, 386, 203, -849, -2995, 451], [-816, 368, 123, -836, -1423, 573], [-756, 352, 140, -2215, 185, 1999], [-872, 352, 3, 1043, 2585, 967], [-784, 364, 143, -473, -2291, 700], [-761, 332, 57, -436, -1946, 814], [-768, 351, 112, 233, -2756, 984], [-820, 311, 16, 746, 2751, 974], [-778, 323, -95, -818, -2312, 355], [-776, 319, -77, -918, -1923, 192], [-709, 281, -75, -237, -1732, 982], [-789, 324, 18, -473, -2928, 570], [-839, 347, 23, 17, 2845, 634], [-641, 245, -285, -571, -1895, 368], [-834, 329, -84, -687, -2326, 490], [-761, 306, -33, -386, -2527, 676], [-753, 276, -230, -549, -2196, 575], [-808, 274, -192, 35, 3089, 952], [-817, 277, -249, -368, -2455, 714], [-781, 307, -187, -873, -2382, 182], [-786, 297, -224, -760, -2251, 260], [-791, 294, -157, 108, 2932, 839], [-708, 268, -159, -522, -2086, 533], [-759, 289, -195, -623, 2969, 413], [-581, 235, -250, -928, -2828, 119], [-681, 226, -211, 532, 2474, 646], [-677, 228, -275, 297, 2563, 860], [-640, 237, -242, 35, 2936, 627], [-669, 263, -264, -857, 2749, 265], [-507, 200, -360, 129, 2556, 762], [-732, 291, -207, -388, 2290, 274], [-663, 232, -301, 366, 2442, 612], [-557, 246, -328, -1011, 2265, 114], [-704, 263, -323, -489, -2833, 522], [-463, 195, -350, -323, 2593, 373], [-648, 219, -322, 310, 2735, 818], [-571, 195, -389, 1204, 2080, 718], [-507, 204, -366, 251, 2450, 642], [-613, 232, -310, -317, 2958, 491], [-420, 196, -443, -375, 2429, 372], [-474, 209, -500, -339, -3031, 617], [-395, 180, -385, -342, 2578, 366], [-491, 204, -379, -218, 2569, 520], [-538, 215, -392, -338, -3085, 540], [-432, 212, -478, -715, 2751, 108], [-308, 168, -411, -408, 2693, 357], [-331, 170, -445, -481, 2811, 278], [-401, 208, -489, -97, 2842, 685], [-388, 195, -466, -306, 2760, 510], [-350, 184, -447, -310, 2698, 525], [-419, 199, -449, -264, 2500, 486], [-361, 182, -437, -553, 2559, 271], [-244, 170, -504, -371, 2050, 328], [-348, 188, -474, -610, 2846, 196], [-293, 182, -468, -237, 2558, 502], [-207, 179, -450, 150, 2171, 689]], [[-31, 737, -109, -62, -753, -2750], [-119, 762, 159, 516, 351, -2222], [-78, 760, -106, -49, -663, -2528], [-63, 725, -90, -307, -1002, -2451], [-78, 689, -104, -328, -1285, -2323], [-115, 766, 97, 447, -15, -2242], [-41, 696, -53, 61, -1241, -1995], [-63, 711, -40, -90, -1052, -2329], [27, 662, -98, -545, -1548, -2609], [129, 696, -161, 87, -1215, -2278], [163, 702, -187, 2677, 1547, -424], [-122, 726, 34, -227, -891, -2238], [-42, 713, 54, 23, -1221, -2349], [-17, 703, -56, 114, -911, -2353], [39, 702, -103, 597, -297, -2153], [14, 720, -57, 278, -936, -2194], [137, 742, -235, 443, -1345, -2489], [41, 712, -98, 560, -640, -2261], [-19, 702, -39, 273, -740, -2006], [98, 712, -174, 2824, 1451, -406], [37, 721, -80, 1241, -21, -2253], [5, 8, 91, 3049, 579, 268], [72, 693, -124, 325, -1075, -2018], [92, 740, -165, 253, -570, -2453], [218, 666, -129, 302, -1198, -2141], [-41, 686, -92, 501, -385, -2047], [385, 741, -157, 2203, 886, -758], [75, 665, -122, -22, -1642, -2050], [156, 670, -144, -211, -1659, -2055], [147, 695, -159, 2577, 1302, -587], [189, 685, -157, -20, -1483, -2043], [104, 686, -146, -144, -1566, -2318], [281, 713, -153, 49, -1379, -2158], [407, 712, -64, 2387, 362, -502], [321, 715, -193, 2603, 965, -1001], [134, 699, -166, 82, -1532, -2344], [238, 686, -163, -105, -1688, -2061], [158, 689, -157, -34, -1831, -2051], [178, 666, -187, 2424, 617, -778], [337, 684, -133, 2371, 304, -711], [257, 670, -169, -194, -2461, -1948], [390, 638, 62, -2974, 594, -947], [459, 729, 110, 2263, -394, -403], [375, 732, -141, 2454, 40, -49], [336, 732, -194, 3001, 586, -626], [383, 721, -142, 94, -1585, -2062], [465, 710, 81, 2546, -151, -484], [306, 571, 220, 2626, -1051, -858], [325, 652, -147, 1376, -690, -2214], [377, 692, -126, 2540, 539, -1122], [408, 685, -59, 2703, 57, -682], [11, 53, 25, -103, -121, 191], [399, 634, -59, 2548, -426, -1733], [392, 684, -114, 545, -1905, -2009], [510, 783, -36, 3018, 141, -509], [490, 778, -6, -2837, -183, -580], [437, 773, -101, 2945, -104, -435], [437, 655, 91, -2379, 519, -916], [417, 726, -117, -2534, 1172, -879], [489, 746, -18, -2811, -73, -744], [449, 673, 85, -2595, 339, -997], [281, 562, 273, -2387, 259, -993], [419, 648, 191, -2006, 711, -1032], [492, 717, -49, -2646, 380, -975], [498, 726, 67, -2219, 98, -825], [430, 704, 174, -3075, -637, -930], [471, 712, 37, -2665, -31, -899], [437, 706, 142, -2737, -615, -1047], [441, 654, 61, -2242, -244, -922], [392, 689, 207, -287, 1833, -2373], [75, 365, 273, -1911, 5, -959], [461, 704, 98, -2978, -524, -890], [432, 696, 105, -2675, -609, -1057], [-4, 54, 24, -236, 20, -162], [467, 720, 115, 381, 2192, -1958], [359, 649, 182, 216, 2117, -2097], [326, 586, 179, -2330, -638, -1242], [392, 649, 157, -2030, 187, -1125], [364, 623, 159, -1921, 87, -1174], [228, 545, 306, -2281, -241, -1180], [230, 550, 220, -2421, -828, -1137], [266, 561, 223, 495, 2094, -1945], [363, 636, 180, -2229, -474, -1177], [301, 548, 192, 217, 1668, -1750], [51, 396, 186, -1423, -5, -428], [314, 594, 201, -1181, 456, -938], [293, 601, 242, -1392, 427, -902], [192, 506, 207, -1795, -263, -1082], [192, 554, 238, -1458, 143, -969], [150, 465, 231, -1193, 210, -578], [136, 497, 238, -1234, 264, -685], [63, 352, 182, -1878, -279, -875], [89, 416, 203, -1549, 45, -615], [80, 417, 220, -1404, 116, -537], [147, 491, 229, -1425, 114, -732], [111, 433, 224, -1364, -16, -1077], [62, 345, 210, -1290, -58, -1264], [60, 393, 217, -1373, 28, -653], [21, 310, 174, -1712, -108, -479], [20, 259, 148, -1512, -271, -991], [-389, 574, 541, -1414, 666, 1628], [-158, 612, 335, -1283, 284, 1120], [-213, 576, 383, -1438, 487, 1325], [-287, 527, 329, -1822, 774, 1677], [-235, 585, 414, -1896, 983, 1771], [-396, 553, 485, -1360, -599, 694], [-418, 550, 477, 66, -2019, 1096], [-325, 544, 418, -53, -1171, 1347], [-447, 481, 384, 215, -763, 1442], [-530, 422, 272, -879, -513, 951], [-530, 521, 507, -1431, 539, 1794], [-358, 537, 412, -649, -591, 1289], [-598, 523, 450, -372, -1623, 1060], [-562, 474, 411, -953, -817, 820], [-461, 485, 398, -1049, -212, 961], [-694, 490, 435, -771, -1471, 895], [-647, 426, 330, -648, -1058, 1047], [-651, 402, 326, -918, -1318, 495], [-418, 507, 416, -1084, -451, 795], [-861, 467, 332, -359, -2155, 874], [-681, 431, 328, -911, -1069, 683], [-554, 472, 378, -821, -727, 1071], [-718, 469, 358, -71, -2321, 1009], [-718, 469, 389, -745, -1152, 961], [-617, 393, 260, -831, -844, 706], [-508, 476, 415, -750, -790, 1057], [-764, 404, 236, -809, -468, 1097], [-575, 449, 361, -571, -1500, 929], [-700, 432, 305, -655, -1414, 940], [-762, 449, 323, -333, -1682, 1064], [-699, 399, 257, -776, -1495, 697], [-565, 488, 456, -837, -1395, 843], [-865, 433, 219, -604, -1775, 1029], [-748, 406, 211, 86, -1899, 1310], [-803, 411, 271, -800, -1323, 716], [-608, 452, 389, -619, -1974, 709], [-685, 333, 133, -921, -1288, 146], [-710, 460, 362, -503, -2039, 826], [-661, 470, 439, -37, -2575, 826], [-738, 378, 190, 115, -2669, 901], [-747, 402, 260, -516, -2247, 710], [-657, 268, -156, -554, -1507, 620], [-796, 372, 140, -1597, -231, 2019], [-816, 397, 189, 676, 2863, 807], [-811, 400, 259, -846, -2808, 497], [-785, 380, 174, -878, -1243, 570], [-739, 376, 200, -2164, 295, 1942], [-881, 370, 53, -2083, -436, 2127], [-781, 391, 216, -522, -2099, 747], [-741, 349, 123, -462, -1799, 847], [-763, 377, 184, 228, -2656, 1020], [-832, 340, 79, -2317, -287, 2094], [-783, 334, -34, -855, -2114, 357], [-765, 327, -9, -934, -1785, 200], [-719, 305, 6, -259, -1673, 1e3], [-803, 347, 85, -477, -2817, 609], [-852, 371, 90, 21, 2959, 675], [-655, 251, -226, -577, -1832, 388], [-846, 345, -17, -733, -2131, 498], [-777, 325, 36, -406, -2362, 724], [-770, 287, -166, -559, -2134, 579], [-842, 292, -147, 17, -3038, 999], [-832, 287, -197, -388, -2349, 722], [-803, 318, -121, -902, -2210, 181], [-813, 307, -166, -794, -2054, 255], [-833, 320, -103, 77, 3128, 903], [-726, 282, -87, -531, -2016, 557], [-793, 306, -139, -636, 3084, 439], [-624, 244, -188, -891, -2811, 172], [-717, 239, -150, 656, 2540, 661], [-730, 248, -228, 322, 2613, 885], [-685, 256, -171, 75, 3002, 662], [-706, 277, -210, -864, 2914, 299], [-569, 211, -329, 176, 2634, 805], [-795, 317, -150, -388, 2425, 316], [-694, 245, -253, 394, 2525, 631], [-611, 263, -289, -1045, 2404, 144], [-744, 276, -271, -506, -2742, 528], [-537, 216, -315, -306, 2639, 400], [-705, 232, -274, 359, 2876, 872], [-627, 207, -353, 1242, 2138, 732], [-558, 207, -320, 302, 2475, 651], [-665, 245, -256, -310, 3023, 510], [-459, 201, -398, -369, 2481, 377], [-535, 219, -491, -378, -2812, 616], [-470, 197, -354, -325, 2608, 387], [-563, 219, -349, -213, 2638, 541], [-597, 227, -353, -355, -2939, 566], [-486, 231, -466, -790, 2953, 111], [-377, 181, -401, -411, 2767, 377], [-385, 182, -431, -496, 2919, 296], [-451, 212, -476, -116, 2999, 677], [-445, 204, -455, -340, 2974, 518], [-422, 199, -451, -346, 2872, 538], [-493, 213, -437, -288, 2668, 507], [-422, 195, -412, -563, 2666, 289], [-283, 175, -487, -395, 2207, 342], [-407, 201, -467, -634, 2955, 196], [-350, 189, -461, -265, 2734, 502], [-258, 182, -433, 88, 2311, 678]], [[-39, 749, -77, -125, -591, -2844], [-112, 772, 183, 483, 504, -2291], [-102, 773, -73, -174, -457, -2601], [-85, 744, -54, -336, -790, -2567], [-103, 707, -79, -251, -1050, -2398], [-115, 764, 129, 361, 46, -2233], [-69, 713, -22, 139, -1025, -2043], [-92, 728, 0, -71, -932, -2361], [-23, 665, -69, -432, -1332, -2578], [79, 705, -162, 125, -952, -2343], [128, 710, -169, -452, -1448, -2748], [-144, 744, 79, -159, -630, -2303], [-53, 720, 102, 97, -993, -2327], [-50, 710, -12, 157, -678, -2373], [-14, 722, -73, 574, -251, -2169], [-18, 729, -14, 251, -870, -2215], [96, 770, -246, 367, -1212, -2585], [8, 718, -64, 562, -413, -2293], [-67, 712, 2, 315, -571, -2031], [68, 700, -138, -312, -1588, -2690], [-2, 721, -24, 1243, 71, -2254], [0, 15, 77, 3064, 579, 273], [40, 710, -94, 356, -969, -2046], [59, 748, -138, 171, -470, -2460], [164, 673, -136, 464, -899, -2238], [-80, 701, -56, 505, -274, -2081], [345, 729, -163, 2167, 964, -781], [17, 673, -104, 202, -1278, -2049], [107, 672, -130, 122, -1174, -2043], [96, 685, -126, -507, -1694, -2487], [140, 683, -138, 245, -1056, -2033], [48, 688, -113, -40, -1335, -2291], [231, 707, -152, 52, -1160, -2134], [374, 704, -90, 2319, 545, -518], [273, 703, -187, 2586, 1068, -1030], [87, 709, -151, 127, -1286, -2381], [183, 675, -158, 23, -1465, -2036], [105, 694, -128, 40, -1681, -2034], [126, 660, -176, 2483, 854, -886], [297, 677, -148, 2369, 536, -766], [211, 668, -172, 30, -2028, -1884], [378, 643, 19, 81, -2384, -2204], [447, 721, 74, 2188, -303, -383], [338, 719, -161, 2418, 146, -55], [295, 726, -205, 2931, 790, -621], [337, 709, -150, 97, -1442, -2028], [450, 706, 48, 2429, 9, -447], [330, 587, 185, 2563, -950, -780], [283, 662, -161, 1327, -527, -2273], [333, 682, -150, 2531, 663, -1151], [384, 687, -99, 2667, 299, -652], [6, 49, 31, -105, -120, 190], [375, 627, -92, 2532, -341, -1768], [358, 681, -139, 557, -1728, -1999], [497, 786, -67, 2820, 358, -457], [486, 788, -37, -2943, -73, -501], [409, 765, -132, 2874, 12, -405], [445, 666, 58, -2463, 572, -912], [387, 727, -152, 491, -1796, -2230], [490, 760, -54, -2968, 100, -640], [456, 682, 43, -2766, 442, -991], [309, 584, 244, -2601, 210, -1030], [442, 658, 162, -2083, 769, -1068], [482, 721, -87, -2805, 550, -957], [519, 744, 34, -2380, 191, -793], [447, 715, 137, 2995, -566, -841], [485, 729, -2, -2775, 44, -853], [458, 722, 108, -2977, -556, -935], [470, 692, 22, -2260, -205, -881], [420, 711, 176, 2805, -1222, -675], [106, 403, 277, -2212, -106, -1044], [476, 723, 55, -3059, -443, -821], [450, 711, 69, -2782, -561, -997], [-5, 51, 32, -89, 46, -126], [492, 741, 73, 254, 2291, -2074], [391, 674, 154, 149, 2144, -2154], [366, 615, 146, -2500, -618, -1153], [430, 666, 122, -2109, 194, -1130], [396, 642, 115, -2129, 83, -1161], [273, 577, 302, -2668, -420, -1190], [277, 600, 230, -2580, -902, -1110], [315, 608, 218, 361, 2060, -2015], [412, 671, 154, -2369, -502, -1140], [349, 583, 166, 326, 1877, -1810], [84, 432, 211, -1409, 31, -489], [363, 622, 166, -1272, 489, -963], [339, 627, 224, -1555, 486, -1003], [250, 554, 207, -2049, -371, -1114], [240, 582, 217, -1580, 112, -1049], [201, 507, 236, -1274, 276, -673], [179, 524, 230, -1259, 288, -758], [98, 391, 189, -1853, -279, -943], [133, 459, 210, -1557, 74, -743], [123, 463, 233, -1429, 178, -678], [204, 541, 230, -1516, 137, -835], [166, 483, 224, -1473, -65, -1150], [103, 384, 213, -1352, -101, -1334], [96, 440, 221, -1400, 44, -825], [50, 357, 178, -1665, -109, -570], [37, 308, 176, -1469, -222, -1041], [-355, 582, 530, 1044, -1576, 1594], [-114, 635, 290, -1352, 419, 1121], [-147, 612, 375, -1745, 936, 1294], [-210, 559, 316, -1326, 385, 1711], [-185, 599, 397, -1746, 978, 1743], [-349, 570, 478, -1419, -460, 700], [-379, 566, 477, 37, -1838, 1166], [-271, 560, 405, -76, -1057, 1374], [-381, 490, 385, 460, -871, 1494], [-468, 448, 306, -914, -437, 1029], [-490, 532, 512, -1371, 626, 1749], [-292, 548, 396, -704, -374, 1316], [-553, 526, 448, -512, -1289, 1071], [-510, 482, 412, -1002, -573, 833], [-397, 513, 410, -1091, -122, 966], [-656, 498, 448, -852, -1255, 900], [-627, 465, 407, -772, -841, 1057], [-610, 414, 352, -942, -1069, 573], [-360, 525, 418, -1135, -288, 816], [-824, 470, 350, -420, -1980, 885], [-621, 438, 344, -925, -927, 693], [-499, 491, 403, -948, -425, 1076], [-688, 485, 387, -125, -2176, 1045], [-685, 486, 419, -849, -923, 951], [-572, 423, 315, -914, -657, 754], [-446, 490, 421, -775, -678, 1075], [-729, 415, 264, -858, -300, 1067], [-517, 467, 390, -586, -1328, 976], [-658, 442, 332, -746, -1111, 947], [-714, 457, 345, -433, -1434, 1067], [-656, 412, 297, -811, -1269, 737], [-507, 508, 476, -911, -1151, 882], [-841, 445, 251, -849, -1252, 995], [-717, 422, 257, -161, -1465, 1325], [-761, 418, 298, -834, -1170, 715], [-573, 486, 445, -657, -1797, 787], [-645, 346, 196, -914, -1242, 205], [-665, 474, 392, -551, -1878, 852], [-620, 490, 475, -34, -2374, 897], [-718, 399, 244, 106, -2486, 967], [-718, 417, 309, -548, -2026, 761], [-664, 283, -87, -570, -1477, 665], [-770, 392, 182, -1563, -153, 1970], [-806, 420, 237, 694, 2945, 850], [-789, 413, 308, -848, -2602, 548], [-747, 392, 221, -914, -1077, 569], [-709, 400, 256, -2123, 404, 1886], [-882, 387, 100, -2077, -280, 2069], [-769, 417, 284, -579, -1910, 786], [-710, 369, 187, -478, -1707, 871], [-746, 403, 252, 205, -2469, 1081], [-833, 369, 140, -2259, -181, 2023], [-778, 343, 29, -865, -2047, 361], [-748, 336, 58, -941, -1693, 213], [-724, 332, 87, -329, -1506, 1036], [-810, 369, 149, -485, -2719, 643], [-855, 393, 153, 20, 3061, 710], [-667, 259, -167, -581, -1795, 413], [-848, 359, 49, -782, -1920, 504], [-781, 345, 104, -438, -2179, 772], [-781, 298, -102, -587, -1964, 595], [-866, 309, -101, -18, -2866, 1044], [-843, 297, -147, -409, -2239, 731], [-812, 328, -52, -929, -2040, 183], [-826, 317, -103, -824, -1871, 250], [-858, 344, -46, 23, -2947, 958], [-740, 298, -15, -546, -1917, 595], [-820, 323, -84, -664, -2986, 486], [-670, 262, -116, -878, -2793, 195], [-744, 258, -84, 721, 2580, 673], [-776, 268, -180, 366, 2746, 948], [-725, 279, -95, 98, 3055, 689], [-734, 291, -149, -867, 3009, 319], [-629, 226, -292, 223, 2734, 856], [-843, 341, -87, -392, 2584, 364], [-718, 258, -202, 419, 2594, 649], [-661, 279, -238, -1068, 2540, 172], [-779, 288, -219, -520, -2662, 535], [-612, 240, -273, -301, 2716, 430], [-751, 248, -218, 394, 3003, 923], [-677, 221, -314, 1286, 2209, 751], [-607, 214, -270, 379, 2494, 665], [-711, 261, -197, -299, 3117, 541], [-498, 207, -351, -345, 2516, 383], [-591, 229, -474, -393, -2728, 615], [-546, 216, -320, -315, 2647, 406], [-630, 234, -314, -206, 2781, 584], [-651, 241, -308, -382, -2750, 600], [-537, 248, -442, -841, 3092, 104], [-447, 196, -386, -416, 2858, 404], [-440, 195, -408, -506, 2983, 308], [-497, 214, -457, -129, -3130, 676], [-500, 213, -434, -371, -3104, 528], [-492, 214, -447, -387, 3064, 548], [-563, 227, -412, -311, 2837, 529], [-486, 208, -377, -565, 2747, 306], [-322, 179, -462, -420, 2402, 356], [-464, 213, -453, -678, -3120, 195], [-409, 196, -443, -276, 2835, 507], [-313, 183, -408, 79, 2345, 675]], [[-45, 758, -42, -196, -484, -2909], [-102, 779, 200, 336, 894, -2457], [-117, 781, -34, -310, -269, -2647], [-99, 760, -12, -372, -675, -2633], [-119, 725, -46, -225, -904, -2460], [-110, 760, 156, 132, 208, -2194], [-91, 730, 12, 180, -878, -2085], [-112, 742, 41, -55, -782, -2406], [-67, 675, -31, -308, -1056, -2578], [34, 716, -151, 118, -687, -2412], [95, 719, -146, -448, -1326, -2776], [-153, 759, 119, -119, -386, -2380], [-56, 727, 139, 146, -848, -2319], [-74, 718, 38, 184, -508, -2393], [-62, 740, -40, 530, -206, -2179], [-47, 737, 35, 161, -714, -2263], [59, 793, -247, 228, -1010, -2710], [-20, 726, -16, 534, -328, -2304], [-105, 723, 47, 360, -325, -2075], [41, 691, -100, -252, -1370, -2574], [-38, 721, 38, 1242, 228, -2255], [-9, 28, 55, 3072, 579, 276], [12, 727, -58, 330, -890, -2088], [30, 754, -107, 80, -381, -2457], [108, 686, -134, 511, -758, -2297], [-111, 716, -14, 501, -201, -2105], [303, 715, -166, 2145, 1044, -807], [-35, 686, -76, 255, -1173, -2059], [60, 681, -108, 268, -938, -2066], [45, 682, -83, -424, -1532, -2421], [90, 688, -109, 460, -718, -2062], [-5, 693, -70, 0, -1234, -2286], [179, 701, -142, 89, -1055, -2131], [331, 693, -112, 2288, 717, -550], [224, 692, -176, -539, -1958, -2078], [42, 720, -123, 134, -1164, -2406], [128, 670, -145, 287, -1070, -2031], [53, 702, -94, 98, -1555, -2026], [76, 660, -157, 2597, 1129, -983], [251, 671, -155, 2398, 679, -807], [162, 670, -166, 223, -1729, -1864], [358, 647, -23, 65, -2185, -2224], [430, 709, 39, 2121, -212, -374], [297, 705, -174, 2355, 387, -101], [251, 720, -207, 2894, 939, -630], [282, 696, -151, 162, -1253, -2003], [425, 699, 13, 2400, 57, -443], [347, 600, 142, 2509, -771, -691], [234, 676, -165, 1294, -429, -2312], [290, 672, -170, 2572, 834, -1186], [349, 689, -134, 2645, 531, -636], [-3, 38, 46, -105, -120, 190], [345, 623, -119, 2385, -197, -1893], [316, 678, -156, 594, -1552, -1997], [474, 783, -95, 2655, 547, -445], [474, 792, -66, -3088, 84, -413], [379, 757, -161, 2760, 205, -378], [449, 676, 26, -2679, 733, -905], [346, 725, -177, 410, -1621, -2195], [480, 769, -88, -3063, 210, -589], [454, 688, 2, -2945, 592, -988], [332, 604, 213, -2758, 172, -1047], [459, 665, 131, -2178, 839, -1109], [464, 723, -121, -2882, 641, -953], [531, 758, 1, -2526, 288, -769], [457, 721, 99, 2796, -452, -762], [490, 743, -40, -2884, 135, -808], [467, 731, 71, 3115, -452, -841], [494, 727, -14, -2318, -96, -767], [440, 727, 142, 2719, -1064, -526], [143, 440, 272, -2514, -250, -1094], [483, 738, 13, 3095, -291, -717], [462, 723, 33, -2875, -496, -940], [-9, 40, 53, -84, 47, -125], [505, 754, 30, -3016, -707, -946], [416, 695, 125, 71, 2203, -2234], [398, 642, 107, -2570, -557, -1091], [459, 680, 85, -2297, 228, -1132], [418, 656, 67, -2297, 126, -1138], [314, 602, 283, -2820, -486, -1182], [322, 643, 231, 333, 2162, -2102], [359, 648, 204, 289, 2061, -2068], [452, 700, 124, -2468, -505, -1104], [391, 615, 136, 418, 2140, -1919], [121, 466, 234, -1410, 155, -652], [404, 645, 125, -1366, 525, -977], [378, 647, 195, -1736, 528, -1084], [312, 599, 193, -2256, -438, -1097], [289, 604, 186, -1699, 85, -1095], [258, 546, 229, -1393, 343, -747], [223, 548, 219, -1313, 328, -845], [139, 431, 199, -1871, -286, -999], [182, 499, 215, -1590, 91, -798], [173, 506, 242, -1493, 238, -797], [266, 586, 220, -1642, 149, -906], [227, 532, 217, -1586, -121, -1177], [153, 427, 215, -1434, -161, -1349], [144, 485, 222, -1441, 47, -913], [84, 401, 184, -1622, -104, -675], [61, 357, 207, -1495, -178, -1162], [-323, 589, 516, -1658, 1291, 1494], [-73, 657, 243, -1465, 645, 1112], [-88, 646, 356, -1936, 1274, 1230], [-137, 595, 293, -1119, 247, 1734], [-140, 613, 369, -1610, 947, 1726], [-305, 587, 465, -1542, -167, 694], [-340, 580, 471, -3, -1687, 1214], [-221, 577, 384, -113, -899, 1410], [-314, 505, 373, -1157, 908, 1615], [-400, 481, 337, -1002, -275, 1103], [-450, 541, 510, -1319, 710, 1707], [-228, 561, 368, -731, -209, 1349], [-504, 527, 438, -583, -1108, 1068], [-456, 491, 405, -1021, -440, 847], [-336, 539, 417, -1145, -8, 971], [-615, 504, 455, -978, -897, 887], [-600, 501, 472, -937, -548, 1048], [-559, 431, 365, -958, -935, 618], [-302, 544, 410, -1223, -23, 845], [-785, 472, 364, -535, -1643, 889], [-556, 445, 353, -923, -792, 719], [-440, 509, 415, -1029, -234, 1076], [-654, 500, 411, -220, -1955, 1088], [-649, 500, 442, -951, -684, 928], [-520, 456, 362, -971, -537, 774], [-384, 505, 419, -788, -605, 1091], [-690, 426, 289, -893, -157, 1040], [-455, 486, 408, -589, -1273, 993], [-608, 451, 351, -787, -955, 951], [-656, 463, 360, -509, -1215, 1064], [-601, 427, 328, -842, -1067, 780], [-447, 526, 485, -949, -1034, 898], [-810, 453, 278, -919, -1083, 969], [-676, 437, 298, -392, -1054, 1322], [-715, 425, 320, -860, -1040, 714], [-532, 518, 486, -691, -1682, 830], [-600, 366, 258, -906, -1172, 303], [-618, 486, 415, -590, -1742, 872], [-575, 507, 501, -47, -2148, 971], [-688, 420, 291, 94, -2374, 1005], [-681, 433, 350, -570, -1900, 788], [-672, 302, -14, -592, -1438, 709], [-739, 411, 221, -1538, -66, 1919], [-788, 440, 280, -2424, 27, 2178], [-759, 426, 350, -855, -2440, 587], [-698, 405, 263, -947, -913, 573], [-670, 425, 306, -2109, 441, 1867], [-872, 401, 145, -2111, 13, 1976], [-744, 441, 343, -624, -1776, 809], [-677, 389, 248, -496, -1608, 899], [-718, 428, 313, 158, -2260, 1140], [-823, 397, 196, -2231, -102, 1974], [-765, 353, 90, -889, -1853, 379], [-722, 347, 126, -942, -1617, 235], [-718, 363, 169, -421, -1308, 1063], [-807, 391, 209, -502, -2582, 687], [-855, 414, 212, 7, -3026, 775], [-678, 268, -108, -594, -1718, 493], [-835, 373, 114, -827, -1720, 507], [-773, 367, 171, -461, -2072, 798], [-785, 310, -38, -622, -1764, 617], [-883, 325, -56, -59, -2720, 1075], [-850, 306, -98, -434, -2108, 741], [-811, 338, 19, -940, -1953, 187], [-830, 327, -41, -845, -1734, 249], [-874, 366, 10, -68, -2682, 1010], [-747, 316, 56, -565, -1816, 631], [-835, 338, -27, -697, -2786, 524], [-713, 281, -45, -854, -2705, 262], [-763, 281, -19, 816, 2650, 699], [-809, 290, -127, 391, 2900, 1014], [-757, 304, -18, 128, -3126, 736], [-758, 306, -89, -868, 3101, 340], [-682, 245, -242, 256, 2860, 914], [-876, 363, -22, -403, 2760, 415], [-738, 272, -150, 452, 2686, 674], [-707, 294, -181, -1078, 2634, 190], [-805, 300, -164, -556, -2465, 551], [-684, 267, -223, -305, 2823, 466], [-784, 268, -155, 405, 3057, 944], [-721, 236, -271, 1359, 2336, 791], [-654, 226, -216, 437, 2509, 677], [-749, 278, -135, -292, -3083, 569], [-536, 215, -303, -286, 2517, 389], [-641, 238, -452, -437, -2480, 611], [-623, 238, -278, -309, 2710, 430], [-691, 253, -269, -208, 2925, 626], [-698, 256, -252, -406, -2602, 627], [-583, 262, -409, -882, -3077, 94], [-522, 214, -361, -428, 2971, 434], [-493, 209, -383, -520, 3073, 324], [-540, 217, -431, -138, -2962, 683], [-551, 222, -405, -386, -2998, 535], [-558, 229, -431, -431, -3018, 556], [-627, 241, -374, -334, 3002, 550], [-551, 224, -333, -564, 2796, 319], [-362, 183, -427, -422, 2467, 362], [-519, 224, -424, -702, -2997, 194], [-466, 203, -419, -284, 2953, 520], [-374, 184, -380, 110, 2339, 685]], [[-45, 765, -3, -336, -357, -2994], [-85, 782, 205, 205, 1150, -2542], [-122, 783, 10, -456, -74, -2670], [-108, 774, 30, -427, -529, -2711], [-129, 742, -11, -210, -619, -2600], [-99, 755, 175, -86, 352, -2137], [-107, 745, 46, 220, -584, -2187], [-125, 755, 79, -50, -513, -2493], [-101, 690, 15, -234, -887, -2592], [-6, 727, -130, 78, -473, -2462], [65, 727, -119, -456, -1214, -2805], [-149, 771, 151, -108, -235, -2433], [-55, 733, 167, 181, -749, -2316], [-87, 727, 87, 213, -265, -2428], [-103, 755, -6, 423, -105, -2195], [-60, 740, 87, 85, -590, -2296], [28, 809, -233, 130, -891, -2769], [-44, 732, 36, 463, -174, -2319], [-127, 733, 90, 373, -199, -2102], [17, 687, -53, -174, -1222, -2494], [-59, 722, 104, 1241, 309, -2254], [-18, 44, 34, -2982, 575, 361], [-13, 743, -20, 198, -851, -2160], [5, 757, -69, -60, -274, -2439], [53, 704, -123, 518, -642, -2344], [-138, 730, 25, 484, -59, -2152], [258, 701, -164, 2143, 1194, -860], [-83, 699, -47, 326, -976, -2088], [15, 694, -78, 327, -814, -2086], [-5, 684, -33, -395, -1473, -2404], [39, 700, -70, 521, -593, -2082], [-54, 699, -27, 48, -1077, -2288], [126, 697, -128, 212, -811, -2146], [282, 682, -128, 2305, 879, -593], [176, 683, -158, -493, -1849, -2046], [2, 731, -87, 123, -1046, -2434], [74, 672, -124, 531, -691, -2072], [4, 711, -58, 176, -1322, -2033], [30, 667, -127, -366, -1668, -2090], [204, 669, -155, 2533, 1003, -898], [117, 674, -158, 433, -1417, -1862], [324, 653, -65, 102, -1996, -2253], [409, 696, 5, 2072, -129, -378], [251, 691, -180, 2330, 580, -167], [204, 712, -199, 2879, 1045, -645], [221, 684, -143, 262, -1082, -2e3], [398, 690, -20, 2329, 210, -444], [358, 611, 93, 2505, -715, -674], [185, 691, -163, 1259, -339, -2346], [242, 665, -181, -433, -2016, -1914], [305, 690, -160, 2643, 779, -628], [-16, 23, 67, -99, -122, 192], [307, 625, -138, 2275, -125, -1983], [273, 676, -170, 700, -1206, -2010], [444, 776, -120, 2522, 712, -458], [459, 795, -93, 2998, 316, -332], [341, 744, -182, 2657, 392, -378], [439, 681, -6, -2776, 821, -904], [300, 720, -196, 378, -1501, -2174], [465, 774, -119, 3113, 346, -541], [441, 691, -38, -3021, 679, -990], [352, 620, 176, -3085, 103, -1060], [470, 670, 100, -2292, 926, -1158], [438, 723, -151, -2958, 749, -953], [533, 766, -30, -2656, 386, -752], [455, 720, 57, 2723, -393, -737], [485, 751, -75, -2980, 230, -771], [465, 734, 32, 3011, -374, -793], [506, 756, -49, -2370, -14, -682], [454, 738, 106, 2660, -954, -439], [184, 476, 257, -2822, -408, -1111], [480, 748, -28, 3020, -190, -662], [468, 732, -2, -3047, -345, -838], [-15, 27, 82, -442, -26, -204], [506, 761, -13, 3124, -527, -823], [437, 712, 95, 3083, -795, -766], [422, 665, 67, -2617, -496, -1041], [479, 690, 47, -2436, 269, -1129], [429, 668, 16, -2441, 224, -1108], [352, 625, 265, 134, 2591, -1984], [361, 677, 221, 105, 2143, -2213], [398, 685, 189, 148, 2115, -2212], [487, 726, 95, -2573, -487, -1056], [420, 644, 99, 435, 2234, -1967], [167, 495, 250, -1454, 291, -790], [437, 666, 82, -1539, 606, -989], [408, 660, 158, -1959, 562, -1158], [368, 640, 171, -2374, -457, -1071], [334, 622, 150, -1910, 58, -1134], [313, 583, 208, -1511, 398, -789], [269, 569, 202, -1382, 372, -908], [188, 472, 208, -1979, -318, -1035], [235, 538, 215, -1663, 111, -849], [232, 545, 238, -1586, 284, -880], [326, 626, 199, -1808, 153, -956], [288, 579, 203, -1871, -258, -1187], [203, 469, 215, -1580, -267, -1346], [199, 526, 218, -1557, 31, -1017], [124, 445, 193, -1612, -96, -761], [93, 408, 238, -1671, -254, -1255], [-292, 594, 494, -1462, 1345, 1416], [-38, 679, 184, -1517, 751, 1105], [-36, 678, 326, -2032, 1533, 1142], [-68, 630, 268, -899, 120, 1762], [-99, 626, 337, -1258, 805, 1704], [-263, 600, 445, -1617, 24, 679], [-304, 592, 460, -191, -1262, 1306], [-174, 593, 359, -241, -572, 1470], [-249, 526, 351, -527, 368, 1654], [-331, 519, 361, -1136, -56, 1146], [-411, 549, 503, -1250, 774, 1669], [-168, 577, 329, -733, -133, 1373], [-455, 526, 421, -610, -1016, 1065], [-400, 500, 389, -1035, -272, 881], [-278, 565, 419, -1273, 262, 968], [-566, 507, 449, -1046, -666, 868], [-564, 534, 520, -1024, -390, 1033], [-506, 449, 374, -983, -753, 684], [-248, 564, 390, -1274, 123, 860], [-740, 471, 371, -598, -1437, 880], [-483, 456, 353, -907, -727, 749], [-384, 527, 421, -1157, 74, 1074], [-620, 512, 430, -428, -1531, 1136], [-609, 513, 458, -1082, -335, 867], [-463, 490, 399, -1030, -415, 786], [-325, 520, 415, -816, -455, 1129], [-647, 436, 310, -937, 52, 1001], [-394, 504, 422, -593, -1154, 1034], [-553, 460, 362, -805, -868, 957], [-593, 468, 367, -525, -1150, 1064], [-539, 445, 351, -853, -969, 809], [-390, 543, 489, -1008, -847, 921], [-775, 460, 302, -1016, -802, 911], [-627, 451, 333, -558, -735, 1314], [-665, 431, 337, -876, -951, 716], [-489, 547, 518, -741, -1540, 876], [-550, 393, 316, -912, -1080, 407], [-570, 497, 434, -677, -1446, 905], [-525, 522, 514, -96, -1868, 1048], [-653, 441, 333, 46, -2118, 1082], [-645, 447, 386, -591, -1774, 815], [-677, 328, 67, -622, -1373, 743], [-704, 429, 255, -1522, 20, 1873], [-761, 458, 317, 699, -2879, 1065], [-721, 438, 385, -861, -2323, 613], [-639, 418, 300, -965, -815, 583], [-630, 448, 350, -2061, 564, 1802], [-852, 413, 186, -2130, 102, 1953], [-715, 463, 395, -675, -1633, 829], [-636, 411, 303, -522, -1476, 938], [-680, 452, 365, 70, -1993, 1201], [-803, 423, 247, -2207, 76, 1877], [-740, 363, 151, -900, -1734, 398], [-692, 359, 190, -943, -1484, 293], [-703, 394, 247, -542, -1067, 1079], [-800, 411, 264, -545, -2353, 753], [-844, 432, 265, -27, -2785, 847], [-685, 286, -40, -601, -1686, 530], [-813, 385, 177, -853, -1595, 509], [-759, 388, 234, -493, -1942, 827], [-776, 323, 29, -640, -1665, 631], [-891, 340, -12, -204, -2330, 1135], [-850, 315, -50, -463, -1959, 752], [-802, 348, 87, -951, -1856, 196], [-825, 336, 21, -861, -1623, 250], [-874, 385, 65, -119, -2554, 1028], [-744, 338, 127, -587, -1721, 662], [-835, 352, 31, -719, -2661, 546], [-747, 306, 31, -848, -2631, 306], [-774, 305, 46, 869, 2698, 719], [-830, 312, -73, 388, 3106, 1091], [-780, 330, 60, 140, -3059, 765], [-774, 320, -28, -869, -3013, 380], [-728, 268, -187, 270, 2987, 965], [-894, 382, 42, -423, 2967, 472], [-752, 287, -99, 502, 2835, 720], [-745, 309, -120, -1081, 2714, 206], [-822, 311, -108, -582, -2321, 562], [-749, 294, -166, -320, 2958, 507], [-813, 287, -95, 417, 3134, 974], [-753, 254, -220, -1710, -660, 2297], [-696, 240, -163, 573, 2558, 710], [-783, 294, -75, -287, -2981, 603], [-580, 229, -246, -260, 2511, 390], [-683, 246, -421, -484, -2209, 601], [-694, 261, -233, -307, 2855, 480], [-742, 272, -217, -219, 3092, 672], [-737, 273, -191, -425, -2497, 646], [-625, 274, -370, -945, -2889, 69], [-597, 234, -324, -444, 3085, 460], [-546, 223, -352, -534, -3120, 340], [-578, 220, -396, -144, -2757, 703], [-598, 231, -371, -402, -2875, 547], [-618, 243, -401, -472, -2834, 561], [-684, 255, -329, -361, -3099, 574], [-615, 241, -284, -561, 2905, 349], [-403, 188, -391, -409, 2491, 367], [-571, 235, -388, -735, -2815, 193], [-522, 211, -388, -288, 3059, 538], [-440, 188, -349, 169, 2303, 699]], [[-38, 764, 42, -503, -205, -3066], [-66, 783, 205, -49, 1588, -2617], [-115, 780, 55, -600, 118, -2669], [-106, 781, 71, -528, -311, -2813], [-130, 756, 24, -239, -354, -2739], [-85, 748, 188, -503, 575, -1995], [-110, 757, 78, 202, -280, -2315], [-127, 764, 111, -60, -374, -2539], [-127, 706, 60, -175, -748, -2612], [-38, 738, -101, 37, -348, -2485], [38, 735, -85, -496, -1040, -2856], [-144, 782, 180, -128, 130, -2573], [-52, 738, 190, 310, -379, -2327], [-89, 734, 128, 223, -139, -2448], [-132, 766, 31, 304, 8, -2206], [-64, 741, 129, 43, -525, -2310], [1, 823, -218, 8, -750, -2821], [-54, 735, 90, 422, -87, -2324], [-139, 742, 127, 379, -93, -2126], [-5, 689, 3, -123, -1152, -2453], [-76, 722, 160, 1240, 359, -2254], [-22, 53, 27, -2677, 539, 463], [-34, 754, 28, 19, -835, -2245], [-16, 754, -23, -123, -239, -2427], [4, 720, -110, 484, -469, -2405], [-153, 743, 64, 436, 151, -2223], [206, 687, -150, 2210, 1382, -924], [-124, 713, -13, 403, -696, -2146], [-27, 706, -49, 366, -663, -2118], [-51, 688, 20, -268, -1218, -2350], [-9, 712, -28, 534, -490, -2102], [-94, 708, 23, 118, -836, -2300], [71, 697, -102, 321, -580, -2175], [225, 673, -136, 2348, 984, -626], [128, 677, -137, -397, -1689, -2007], [-35, 741, -49, 72, -885, -2478], [22, 680, -92, 671, -408, -2133], [-41, 721, -12, 187, -1242, -2042], [-11, 680, -88, -198, -1348, -2071], [154, 673, -145, -447, -1849, -2192], [73, 682, -141, 603, -1150, -1877], [284, 661, -103, 155, -1847, -2285], [381, 680, -28, 2040, -48, -394], [201, 678, -175, 2330, 697, -221], [160, 705, -189, 2877, 1167, -668], [159, 675, -130, 520, -730, -2040], [364, 680, -51, 2295, 351, -465], [365, 622, 46, 2520, -555, -641], [135, 708, -154, 1218, -253, -2371], [194, 661, -185, -116, -1491, -1887], [257, 691, -177, 2658, 933, -628], [-29, 8, 87, -89, -125, 196], [268, 630, -153, 2178, -69, -2072], [223, 677, -171, 806, -917, -2043], [403, 761, -139, 2426, 857, -489], [435, 790, -117, 2898, 433, -309], [295, 727, -193, 2602, 512, -396], [423, 685, -36, 196, -2127, -2232], [249, 714, -204, 367, -1384, -2156], [445, 777, -146, 2940, 570, -492], [418, 692, -76, 60, -2359, -2150], [366, 632, 134, 3081, 96, -1056], [472, 672, 67, 671, -2056, -1910], [408, 721, -175, 74, -2189, -2179], [531, 773, -60, -2772, 475, -745], [451, 718, 18, 2622, -286, -709], [478, 758, -107, -3100, 352, -733], [457, 733, -6, 2832, -210, -725], [510, 780, -81, -2426, 71, -599], [463, 745, 70, 2538, -726, -297], [228, 511, 233, -3078, -524, -1094], [470, 753, -67, 2948, -83, -615], [464, 736, -36, 3063, -153, -752], [-18, 30, 98, -829, -128, -253], [496, 763, -55, 3049, -428, -769], [445, 721, 60, 2990, -670, -669], [437, 685, 25, -2658, -419, -987], [488, 697, 9, -2671, 363, -1125], [425, 676, -33, -2552, 378, -1075], [384, 645, 241, 2943, -612, -1090], [394, 704, 203, -127, 2197, -2362], [427, 713, 165, 36, 2199, -2347], [510, 745, 64, -2642, -462, -1019], [442, 671, 63, -2693, -764, -1093], [219, 520, 255, -1499, 364, -848], [454, 681, 35, -1683, 684, -995], [430, 669, 117, -2198, 583, -1219], [417, 675, 143, -2539, -449, -1013], [373, 638, 108, -2097, 79, -1142], [362, 615, 178, -1581, 430, -803], [312, 586, 176, -1426, 401, -931], [241, 515, 211, -2093, -343, -1027], [287, 574, 208, -1730, 124, -869], [291, 580, 225, -1678, 313, -924], [379, 660, 170, -1993, 156, -987], [346, 621, 179, -2097, -342, -1161], [255, 514, 208, -1904, -476, -1303], [258, 564, 205, -1656, 12, -1053], [170, 488, 202, -1645, -89, -832], [135, 457, 262, -1920, -416, -1300], [-264, 596, 461, -1361, 1447, 1360], [-5, 701, 122, -1596, 922, 1086], [8, 707, 284, 1083, -1415, 2094], [-6, 666, 234, -639, -3, 1801], [-64, 639, 298, -875, 620, 1699], [-224, 613, 418, -1717, 301, 640], [-269, 601, 439, -523, -713, 1356], [-132, 610, 324, -371, -354, 1495], [-187, 548, 325, -326, 240, 1697], [-261, 560, 375, -1247, 116, 1159], [-373, 556, 489, -1043, 809, 1603], [-112, 593, 290, -715, -6, 1430], [-406, 526, 402, -625, -856, 1061], [-344, 512, 364, -1031, -204, 908], [-222, 590, 409, -1404, 545, 945], [-514, 509, 434, -1076, -546, 856], [-530, 564, 562, -1116, -214, 1008], [-448, 472, 371, -997, -657, 723], [-196, 583, 362, -1318, 249, 871], [-685, 468, 370, -626, -1328, 873], [-411, 469, 349, -872, -689, 793], [-326, 545, 416, -1226, 241, 1072], [-578, 521, 439, -662, -1084, 1143], [-566, 522, 464, -1127, -184, 835], [-409, 523, 432, -1137, -200, 792], [-268, 537, 400, -874, -222, 1187], [-594, 445, 323, -971, 231, 977], [-335, 524, 428, -610, -961, 1099], [-501, 469, 372, -818, -755, 977], [-529, 472, 370, -538, -983, 1075], [-476, 463, 369, -862, -864, 848], [-334, 559, 481, -1096, -582, 947], [-728, 464, 318, -1070, -588, 856], [-571, 464, 360, -635, -575, 1312], [-614, 438, 350, -887, -858, 722], [-447, 574, 543, -863, -1257, 946], [-495, 429, 366, -940, -960, 502], [-518, 507, 443, -711, -1327, 915], [-473, 535, 515, -171, -1584, 1108], [-609, 460, 366, -23, -1876, 1141], [-603, 461, 414, -611, -1657, 841], [-678, 357, 150, -658, -1290, 765], [-664, 444, 286, -1513, 101, 1833], [-725, 473, 347, 664, -2718, 1122], [-684, 449, 415, -866, -2199, 642], [-577, 432, 331, -992, -650, 619], [-585, 471, 387, -2011, 689, 1735], [-831, 424, 224, -2200, 335, 1902], [-681, 484, 440, -729, -1488, 845], [-591, 433, 351, -572, -1278, 994], [-636, 474, 408, -9, -1802, 1235], [-773, 445, 292, -2239, 276, 1795], [-711, 374, 208, -906, -1628, 423], [-651, 376, 252, -945, -1369, 352], [-674, 428, 319, -693, -772, 1078], [-782, 429, 311, -580, -2207, 789], [-818, 447, 311, -63, -2606, 892], [-689, 306, 28, -625, -1600, 606], [-781, 397, 234, -873, -1488, 513], [-741, 408, 291, -561, -1704, 873], [-759, 338, 94, -658, -1565, 649], [-890, 354, 31, -293, -2129, 1153], [-841, 324, -2, -512, -1717, 768], [-786, 357, 152, -969, -1678, 221], [-815, 344, 80, -874, -1530, 255], [-872, 403, 117, -214, -2332, 1052], [-738, 359, 193, -620, -1601, 697], [-829, 365, 87, -767, -2413, 584], [-773, 333, 104, -849, -2556, 345], [-779, 331, 108, 960, 2799, 767], [-840, 333, -18, 334, -2914, 1170], [-794, 358, 137, 149, -2987, 795], [-781, 334, 34, -870, -2838, 422], [-763, 292, -123, 267, 3089, 1001], [-901, 399, 105, -437, 3081, 501], [-754, 304, -42, 530, 2931, 752], [-775, 323, -57, -1081, 2799, 224], [-829, 322, -51, -626, -2088, 579], [-801, 322, -101, -344, 3114, 550], [-835, 306, -36, 427, -2974, 1037], [-775, 273, -166, -1651, -506, 2238], [-730, 261, -102, 666, 2612, 742], [-804, 313, -12, -286, -2909, 627], [-624, 245, -189, -216, 2511, 395], [-714, 254, -380, -508, -2062, 594], [-754, 286, -176, -316, 2982, 520], [-784, 292, -159, -242, -3011, 717], [-769, 291, -127, -462, -2318, 676], [-661, 283, -326, -998, -2708, 40], [-667, 256, -279, -456, -3125, 476], [-596, 239, -313, -543, -3069, 349], [-612, 225, -354, -145, -2639, 722], [-640, 240, -332, -413, -2790, 558], [-670, 256, -363, -503, -2692, 563], [-733, 269, -277, -389, -2912, 598], [-675, 260, -228, -561, 3011, 380], [-447, 195, -349, -362, 2465, 373], [-618, 245, -343, -751, -2717, 195], [-574, 220, -351, -289, -3127, 561], [-512, 196, -315, 221, 2284, 713]], [[-23, 754, 85, -616, -101, -3099], [-45, 781, 197, -162, 1772, -2619], [-99, 772, 96, -738, 303, -2644], [-94, 783, 106, -620, -137, -2878], [-117, 766, 60, -305, -93, -2868], [-65, 740, 189, -841, 666, -1877], [-103, 765, 105, 155, -67, -2408], [-121, 770, 138, -74, -253, -2580], [-144, 722, 100, -69, -472, -2674], [-64, 746, -65, -1, -264, -2497], [14, 740, -42, -523, -984, -2877], [-130, 788, 200, -167, 342, -2653], [-45, 742, 201, 548, 600, -2512], [-86, 740, 161, 231, 5, -2473], [-148, 773, 67, 216, 92, -2209], [-64, 740, 164, -5, -451, -2325], [-23, 832, -196, -222, -505, -2869], [-58, 737, 135, 368, 25, -2326], [-147, 750, 160, 379, 66, -2163], [-25, 696, 62, 60, -918, -2354], [-86, 722, 203, 1240, 403, -2254], [-24, 59, 26, -1221, 82, 620], [-46, 756, 79, -96, -812, -2303], [-35, 751, 21, -221, -197, -2406], [-40, 737, -87, 441, -367, -2434], [-155, 753, 98, 341, 426, -2311], [153, 677, -129, -775, -1532, -2157], [-151, 727, 24, 431, -550, -2184], [-62, 719, -13, 363, -449, -2175], [-86, 699, 76, -143, -984, -2325], [-53, 725, 23, 519, -335, -2133], [-124, 717, 72, 183, -596, -2323], [16, 702, -66, 363, -458, -2194], [166, 668, -138, 2428, 1119, -666], [83, 673, -116, -215, -1427, -1966], [-65, 748, -3, 36, -808, -2500], [-26, 693, -54, 710, -261, -2173], [-81, 730, 36, 198, -1131, -2057], [-45, 697, -39, -135, -1200, -2082], [105, 681, -130, -278, -1560, -2173], [34, 693, -120, 772, -831, -1917], [239, 673, -137, 201, -1719, -2321], [353, 666, -59, 2023, 50, -428], [151, 669, -164, 2367, 894, -336], [117, 699, -169, -248, -1823, -2439], [95, 674, -111, 695, -471, -2104], [320, 668, -80, 2298, 438, -490], [362, 633, -4, 2552, -409, -621], [88, 724, -140, 1119, -96, -2391], [146, 662, -180, 261, -897, -1928], [206, 694, -188, 2699, 1209, -627], [-37, -1, 98, -72, -131, 202], [227, 641, -160, 2121, -35, -2130], [172, 681, -165, 855, -790, -2066], [352, 742, -152, 2394, 924, -509], [404, 781, -137, 2841, 507, -303], [245, 709, -196, 2546, 681, -445], [399, 687, -64, 122, -2013, -2224], [200, 708, -208, 380, -1223, -2139], [416, 773, -167, 2841, 705, -480], [392, 692, -110, 20, -2250, -2146], [373, 641, 88, 2942, 118, -1044], [468, 672, 35, 509, -1857, -1834], [372, 718, -193, 4, -1999, -2160], [521, 775, -86, -3049, 719, -757], [439, 713, -21, 2542, -181, -696], [462, 761, -135, 3070, 482, -706], [438, 727, -43, 2757, -129, -705], [505, 799, -110, -2481, 149, -528], [461, 745, 31, 2423, -516, -207], [274, 545, 195, -26, 2601, -2072], [452, 755, -102, 2858, 60, -566], [447, 734, -67, 2969, -28, -717], [-21, 39, 108, -1176, -228, -263], [479, 761, -93, 2954, -297, -712], [446, 727, 26, 2837, -441, -535], [448, 703, -14, -2743, -243, -878], [487, 701, -27, -2884, 472, -1127], [412, 683, -80, -2599, 480, -1059], [408, 658, 208, 2677, -592, -1012], [419, 722, 178, 2822, -845, -647], [446, 733, 135, 3039, -807, -630], [530, 762, 34, -2742, -408, -960], [455, 693, 26, -2707, -563, -960], [268, 542, 256, -1562, 430, -890], [462, 694, -10, -1784, 749, -998], [439, 673, 70, -2333, 600, -1247], [453, 703, 108, -2694, -400, -940], [402, 649, 62, -2177, 120, -1137], [406, 645, 149, -1634, 455, -808], [350, 602, 148, -1501, 455, -947], [294, 557, 207, -2299, -364, -977], [335, 606, 196, -1897, 151, -895], [344, 611, 204, -1848, 352, -975], [421, 686, 131, -2079, 161, -994], [395, 657, 144, -2286, -381, -1116], [306, 560, 190, -2055, -549, -1258], [314, 598, 187, -1856, -23, -1078], [217, 528, 207, -1723, -88, -884], [179, 503, 279, -2446, -792, -1313], [-239, 597, 416, -1327, 1506, 1341], [25, 722, 56, -1630, 1e3, 1075], [45, 733, 237, 1096, -1272, 2184], [48, 701, 190, -470, -69, 1830], [-37, 653, 249, -567, 486, 1708], [-189, 622, 381, -1774, 493, 607], [-237, 608, 407, -768, -340, 1363], [-94, 627, 284, -548, -106, 1514], [-129, 573, 295, -123, 182, 1779], [-194, 601, 378, -1332, 248, 1159], [-336, 561, 464, -543, 406, 1582], [-62, 612, 241, -700, 44, 1459], [-357, 525, 373, -581, -760, 1065], [-288, 527, 334, -1013, -150, 948], [-172, 613, 387, -1482, 728, 919], [-463, 510, 415, -1087, -447, 852], [-494, 591, 595, -1258, 95, 937], [-389, 496, 363, -1017, -524, 780], [-149, 603, 331, -1380, 418, 884], [-628, 465, 364, -648, -1186, 862], [-337, 489, 338, -827, -669, 841], [-271, 562, 405, -1309, 443, 1067], [-532, 527, 438, -792, -823, 1129], [-523, 531, 467, -1173, 1, 788], [-354, 555, 453, -1208, -57, 787], [-215, 556, 376, -982, 72, 1249], [-535, 455, 329, -1009, 378, 977], [-277, 544, 423, -628, -844, 1136], [-446, 479, 374, -825, -582, 1028], [-460, 477, 364, -494, -911, 1098], [-411, 485, 378, -876, -719, 911], [-280, 573, 467, -1191, -306, 963], [-674, 465, 328, -1087, -486, 829], [-511, 478, 380, -719, -394, 1316], [-565, 444, 361, -894, -748, 740], [-404, 597, 556, -948, -1083, 975], [-438, 469, 408, -975, -860, 562], [-466, 515, 446, -742, -1191, 928], [-419, 546, 503, -220, -1424, 1135], [-562, 479, 391, -121, -1606, 1193], [-560, 475, 436, -645, -1475, 878], [-672, 389, 232, -698, -1199, 780], [-624, 459, 313, -1503, 188, 1793], [-685, 486, 371, 557, -2405, 1206], [-641, 459, 437, -876, -2048, 675], [-509, 448, 354, -1013, -521, 665], [-533, 492, 414, -1971, 748, 1698], [-800, 433, 257, -2288, 558, 1866], [-646, 503, 478, -857, -1159, 867], [-540, 457, 391, -658, -1022, 1055], [-588, 495, 443, -204, -1407, 1283], [-735, 465, 330, -2332, 497, 1736], [-674, 387, 260, -908, -1560, 443], [-605, 397, 309, -947, -1316, 383], [-633, 460, 381, -771, -617, 1070], [-756, 446, 352, -608, -2103, 812], [-786, 460, 350, -136, -2333, 948], [-689, 331, 98, -650, -1528, 646], [-746, 409, 288, -896, -1361, 521], [-710, 428, 340, -617, -1534, 900], [-738, 353, 157, -675, -1471, 670], [-880, 367, 72, -436, -1825, 1164], [-826, 333, 44, -569, -1448, 781], [-761, 368, 212, -986, -1505, 251], [-797, 353, 137, -906, -1299, 272], [-862, 418, 166, -313, -2111, 1065], [-723, 381, 255, -658, -1478, 727], [-810, 377, 140, -791, -2293, 600], [-788, 360, 175, -854, -2493, 374], [-773, 358, 168, -2108, -244, 2322], [-833, 354, 38, 275, -2745, 1208], [-798, 384, 209, 155, -2890, 836], [-773, 350, 96, -870, -2729, 450], [-789, 316, -60, 259, -3123, 1023], [-898, 413, 163, -459, -3045, 537], [-750, 323, 15, 569, 3080, 804], [-801, 336, 4, -1078, 2974, 261], [-826, 333, 7, -663, -1888, 592], [-841, 348, -34, -361, -3076, 574], [-842, 325, 24, 412, -2771, 1102], [-787, 294, -107, -1617, -381, 2189], [-754, 288, -38, 754, 2687, 787], [-821, 330, 47, -288, -2799, 662], [-667, 265, -128, -157, 2545, 410], [-741, 261, -338, -530, -1920, 588], [-804, 311, -117, -326, 3078, 548], [-813, 312, -95, -260, -2901, 742], [-787, 309, -58, -504, -2135, 704], [-690, 291, -275, -1020, -2614, 26], [-732, 277, -234, -467, -3065, 488], [-641, 254, -272, -559, -2980, 364], [-641, 230, -307, -145, -2459, 767], [-678, 249, -291, -439, -2596, 585], [-716, 269, -319, -552, -2464, 563], [-768, 283, -216, -403, -2824, 610], [-728, 282, -161, -564, 3128, 414], [-498, 207, -305, -330, 2435, 375], [-659, 256, -293, -775, -2560, 204], [-622, 230, -312, -289, -3034, 587], [-584, 209, -279, 311, 2286, 739]], [[-6, 741, 121, -819, 87, -3128], [-23, 776, 182, 2869, -1186, -539], [-72, 759, 130, -858, 468, -2603], [-77, 781, 135, -802, 176, -2950], [-95, 773, 93, -394, 151, -2970], [-40, 730, 177, -949, 671, -1844], [-87, 769, 126, 8, 323, -2562], [-112, 774, 160, -102, -95, -2631], [-148, 737, 135, 28, -147, -2783], [-87, 754, -30, -61, -158, -2504], [-9, 743, 4, -598, -897, -2920], [-110, 791, 210, -293, 764, -2786], [-36, 744, 200, -2659, -1594, -335], [-80, 745, 188, 234, 188, -2506], [-158, 777, 99, 134, 169, -2207], [-60, 738, 188, -134, -259, -2351], [-38, 833, -165, -331, -394, -2871], [-55, 737, 167, 330, 104, -2326], [-147, 756, 184, 343, 402, -2247], [-35, 712, 113, 144, -816, -2324], [-92, 722, 238, 1239, 466, -2254], [-23, 60, 35, -282, -149, 402], [-53, 756, 122, -264, -761, -2388], [-46, 742, 69, -335, -152, -2378], [-77, 751, -59, 377, -261, -2454], [-147, 761, 127, 191, 757, -2393], [97, 673, -102, -566, -1268, -2118], [-168, 740, 61, 449, -409, -2225], [-88, 732, 29, 330, -198, -2244], [-105, 713, 125, -76, -863, -2320], [-85, 737, 75, 494, -175, -2165], [-139, 726, 116, 222, -435, -2345], [-34, 707, -28, 396, -257, -2223], [108, 669, -136, 2534, 1295, -702], [41, 675, -88, 31, -1085, -1945], [-89, 753, 44, -55, -629, -2541], [-68, 707, -9, 719, -62, -2231], [-112, 739, 82, 205, -1027, -2072], [-75, 716, 13, -90, -1080, -2097], [57, 696, -104, -158, -1317, -2188], [-1, 704, -93, 840, -611, -1964], [193, 686, -166, 258, -1497, -2394], [321, 652, -86, 2028, 150, -474], [101, 667, -141, 2442, 1100, -453], [77, 695, -147, -182, -1555, -2379], [30, 680, -82, 767, -325, -2149], [272, 657, -106, 2327, 508, -519], [356, 645, -51, 2623, -154, -588], [44, 739, -116, 1071, -35, -2388], [99, 669, -164, 445, -548, -1997], [151, 698, -182, -399, -1710, -2520], [-40, -5, 103, 1641, -865, 173], [188, 652, -166, 2032, 24, -2222], [123, 686, -155, 915, -618, -2106], [301, 723, -162, 2378, 982, -529], [371, 770, -153, 2762, 620, -305], [194, 691, -189, 2523, 852, -520], [366, 687, -89, 78, -1902, -2218], [151, 703, -204, 420, -1025, -2128], [379, 766, -182, 2771, 813, -482], [361, 691, -140, -20, -2029, -2139], [374, 648, 41, 2825, 216, -1023], [447, 669, 2, 462, -1742, -1802], [327, 712, -200, -27, -1867, -2144], [498, 771, -109, -27, -2318, -2365], [420, 705, -58, 2428, 6, -696], [443, 762, -159, 2878, 720, -686], [414, 719, -78, 2685, -32, -694], [497, 815, -136, -2586, 290, -412], [448, 739, -7, 2355, -387, -171], [318, 579, 152, 3051, -516, -1033], [430, 754, -134, 2764, 213, -529], [428, 731, -96, 2910, 56, -702], [-23, 50, 116, -1961, -417, -183], [454, 755, -127, 2887, -192, -681], [437, 727, -9, 2685, -208, -444], [447, 716, -51, -2861, -18, -755], [472, 701, -61, 59, -2518, -2006], [390, 688, -123, -2659, 672, -1034], [425, 666, 171, 2548, -548, -968], [433, 730, 145, 2711, -764, -572], [455, 745, 101, 2976, -736, -559], [540, 774, 5, -2960, -258, -836], [457, 711, -10, -2739, -416, -857], [314, 563, 249, -1710, 556, -963], [462, 704, -54, -1894, 835, -1e3], [439, 674, 23, -2449, 634, -1269], [478, 725, 70, -2847, -313, -858], [423, 659, 15, -2237, 181, -1127], [441, 671, 115, -1774, 522, -817], [381, 616, 118, -1644, 574, -954], [342, 597, 187, -2480, -347, -906], [377, 634, 177, -2109, 189, -906], [389, 637, 173, -1955, 374, -994], [458, 709, 93, -2259, 182, -999], [434, 687, 103, -2406, -373, -1071], [352, 602, 169, -2263, -594, -1154], [365, 629, 160, -1953, -32, -1077], [267, 565, 204, -1928, -98, -939], [226, 544, 285, 432, 2174, -1856], [-216, 597, 369, -1294, 1608, 1324], [52, 742, -16, -1717, 1218, 1035], [74, 754, 179, 1124, -1169, 2257], [95, 733, 142, -227, -148, 1873], [-15, 666, 193, -395, 445, 1724], [-157, 629, 331, -1789, 551, 598], [-208, 613, 367, -1040, 106, 1351], [-61, 643, 240, -903, 327, 1531], [-76, 604, 255, 11, 182, 1849], [-132, 639, 380, -1443, 424, 1150], [-302, 565, 435, -1467, 1532, 1538], [-18, 635, 186, -669, 128, 1512], [-306, 526, 334, -440, -777, 1079], [-235, 544, 302, -981, -115, 997], [-126, 635, 362, -1539, 873, 892], [-411, 511, 388, -1081, -315, 859], [-456, 613, 611, -1316, 250, 888], [-328, 525, 346, -1031, -450, 813], [-106, 623, 292, -1469, 653, 895], [-564, 460, 351, -639, -1137, 859], [-266, 512, 324, -770, -649, 900], [-219, 580, 383, -1441, 771, 1051], [-486, 532, 433, -926, -496, 1099], [-479, 538, 462, -1203, 158, 750], [-300, 585, 465, -1285, 103, 772], [-166, 576, 342, -1151, 415, 1300], [-471, 467, 329, -1068, 514, 1005], [-222, 566, 408, -656, -715, 1175], [-389, 493, 367, -822, -417, 1101], [-385, 487, 349, -426, -920, 1121], [-346, 509, 380, -905, -543, 985], [-230, 586, 440, -1247, -134, 970], [-619, 465, 336, -1102, -333, 798], [-450, 492, 394, -824, -176, 1329], [-512, 452, 364, -894, -627, 773], [-362, 617, 562, -1183, -642, 1006], [-380, 510, 440, -1057, -675, 640], [-415, 523, 443, -771, -1037, 943], [-366, 556, 485, -257, -1305, 1152], [-508, 496, 406, -242, -1320, 1235], [-514, 488, 449, -685, -1292, 913], [-661, 420, 308, -780, -1020, 798], [-581, 472, 337, -1486, 260, 1760], [-635, 495, 386, 375, -2029, 1266], [-599, 469, 454, -896, -1789, 728], [-435, 470, 369, -1029, -430, 705], [-481, 512, 435, -1926, 770, 1674], [-767, 440, 287, 677, -2205, 1315], [-606, 519, 506, -915, -1013, 869], [-484, 483, 420, -755, -788, 1097], [-533, 513, 464, -420, -1020, 1305], [-691, 483, 363, 408, -2064, 1473], [-638, 400, 309, -911, -1450, 482], [-558, 419, 360, -953, -1233, 430], [-593, 491, 437, -830, -499, 1061], [-727, 462, 387, -662, -1925, 847], [-746, 470, 382, -227, -2046, 990], [-682, 361, 170, -685, -1439, 677], [-706, 420, 335, -919, -1223, 533], [-672, 448, 381, -672, -1379, 921], [-713, 368, 216, -715, -1289, 714], [-864, 379, 111, -627, -1421, 1154], [-795, 343, 90, -596, -1320, 787], [-724, 381, 267, -999, -1383, 278], [-766, 363, 189, -923, -1188, 284], [-844, 431, 211, -497, -1707, 1063], [-704, 403, 311, -749, -1228, 775], [-786, 389, 190, -816, -2158, 617], [-797, 387, 240, -868, -2391, 418], [-753, 387, 224, -2065, -178, 2284], [-820, 373, 93, 186, -2539, 1243], [-795, 410, 275, 155, -2776, 881], [-761, 365, 156, -869, -2656, 470], [-811, 339, 1, 223, -2937, 1075], [-886, 426, 218, -480, -2916, 565], [-735, 343, 73, 597, -3066, 853], [-814, 350, 65, -1075, -3104, 306], [-810, 343, 64, -701, -1677, 606], [-870, 371, 32, -396, -2911, 612], [-840, 345, 81, 386, -2630, 1141], [-785, 316, -43, -1604, -304, 2159], [-767, 318, 29, 785, 2726, 809], [-829, 348, 104, -306, -2582, 730], [-707, 290, -62, -119, 2597, 430], [-762, 268, -294, -571, -1653, 573], [-845, 334, -57, -343, -3094, 579], [-831, 332, -31, -281, -2790, 767], [-795, 329, 13, -552, -1948, 727], [-714, 296, -220, -1037, -2523, 16], [-787, 297, -185, -498, -2907, 518], [-682, 270, -228, -592, -2805, 392], [-661, 240, -248, -143, -2318, 818], [-708, 259, -243, -471, -2384, 617], [-751, 281, -267, -579, -2332, 562], [-800, 296, -156, -432, -2639, 634], [-771, 304, -89, -569, -3055, 442], [-549, 220, -261, -270, 2395, 379], [-695, 267, -238, -785, -2483, 212], [-666, 242, -267, -293, -2855, 641], [-656, 228, -236, 359, 2309, 758]], [[11, 726, 143, -1056, 306, -3113], [0, 767, 156, 2790, -1050, -562], [-39, 742, 153, -999, 673, -2528], [-56, 775, 156, -996, 494, -2964], [-65, 774, 120, -517, 428, -3055], [-16, 721, 162, -1188, 638, -1784], [-64, 768, 137, -167, 674, -2655], [-101, 777, 177, -232, 382, -2757], [-142, 750, 161, 87, 206, -2940], [-102, 758, 9, -175, 38, -2504], [-29, 740, 57, -697, -791, -2965], [-87, 791, 213, -378, 985, -2834], [-23, 744, 185, -2712, -1382, -283], [-71, 749, 207, 225, 445, -2553], [-161, 779, 127, 73, 227, -2204], [-52, 735, 201, -286, -36, -2359], [-51, 832, -133, -467, -263, -2859], [-51, 736, 192, 291, 185, -2323], [-139, 759, 199, 272, 709, -2318], [-44, 725, 157, 223, -721, -2304], [-96, 722, 265, 1239, 513, -2254], [-17, 57, 56, -221, -155, 381], [-51, 750, 150, -513, -656, -2504], [-50, 731, 109, -506, -90, -2330], [-107, 763, -25, 248, -75, -2473], [-126, 765, 148, 101, 934, -2421], [41, 676, -68, -444, -1102, -2111], [-180, 752, 94, 456, -294, -2261], [-98, 742, 72, 306, -86, -2274], [-118, 726, 165, 43, -647, -2325], [-101, 745, 119, 463, -29, -2193], [-146, 735, 154, 243, -334, -2362], [-78, 714, 19, 414, -65, -2254], [54, 672, -129, -512, -1672, -2424], [1, 682, -55, 198, -833, -1952], [-96, 753, 90, -154, -445, -2570], [-97, 724, 44, 715, 61, -2270], [-132, 745, 122, 210, -862, -2097], [-96, 734, 65, -34, -914, -2123], [11, 713, -71, -106, -1105, -2232], [-31, 717, -60, 821, -381, -2033], [145, 702, -183, 276, -1282, -2476], [286, 641, -111, 2119, 426, -611], [53, 672, -110, 2525, 1286, -536], [40, 695, -112, -92, -1290, -2334], [-31, 690, -46, 813, -141, -2205], [222, 652, -127, 2405, 628, -573], [338, 658, -94, 2709, 155, -535], [3, 752, -85, 990, 48, -2367], [56, 683, -136, 525, -300, -2075], [98, 705, -166, -367, -1549, -2528], [-36, -2, 98, 2874, -900, -427], [149, 668, -165, 1951, 86, -2295], [76, 694, -140, 970, -367, -2176], [246, 702, -165, 2374, 1074, -566], [334, 756, -165, 2650, 792, -326], [142, 677, -170, 2528, 912, -554], [331, 686, -110, 62, -1788, -2214], [104, 698, -192, 507, -715, -2128], [342, 757, -193, 2704, 928, -492], [323, 690, -163, -25, -1785, -2131], [368, 654, -8, 2782, 329, -1008], [422, 664, -29, 460, -1624, -1783], [279, 706, -201, -35, -1761, -2130], [473, 766, -129, -128, -2211, -2338], [388, 694, -91, 2353, 185, -722], [415, 758, -177, 2798, 826, -689], [384, 709, -108, 2577, 156, -701], [485, 827, -159, -2706, 445, -307], [429, 729, -45, 2238, -153, -138], [357, 611, 106, 3013, -456, -986], [399, 749, -160, 2714, 303, -516], [401, 725, -121, 2837, 174, -690], [-22, 70, 115, -2312, -471, -121], [425, 748, -157, 2785, -18, -651], [416, 721, -42, 2570, -14, -404], [434, 724, -86, -2943, 138, -685], [446, 698, -90, 5, -2451, -1999], [361, 692, -159, -2703, 877, -1014], [436, 672, 131, 2387, -450, -914], [442, 734, 110, 2505, -573, -455], [462, 756, 68, 2893, -635, -473], [538, 780, -23, -3105, -132, -762], [453, 726, -44, -2779, -288, -768], [351, 579, 228, -1815, 632, -1e3], [456, 712, -93, -2050, 984, -1005], [435, 674, -22, -2558, 708, -1289], [489, 740, 30, -2949, -235, -803], [438, 667, -29, -2286, 265, -1113], [465, 692, 78, -1938, 606, -826], [400, 628, 82, -1814, 739, -952], [383, 633, 160, -2639, -299, -828], [406, 655, 146, -2365, 245, -911], [426, 658, 138, -2164, 419, -1018], [481, 725, 52, -2458, 219, -999], [463, 713, 62, -2490, -348, -1030], [387, 641, 138, -2340, -585, -1098], [409, 656, 130, -2036, -32, -1068], [316, 598, 188, -2040, -100, -947], [271, 581, 282, 230, 2063, -1899], [-196, 596, 313, -1310, 1707, 1334], [65, 757, -86, -1767, 1370, 999], [95, 772, 115, 1167, -1069, 2335], [134, 764, 88, -26, -191, 1917], [1, 680, 130, -319, 474, 1744], [-128, 636, 280, -1810, 657, 587], [-182, 616, 317, -1157, 348, 1339], [-31, 660, 195, 941, -1354, 1615], [-30, 638, 207, 118, 189, 1899], [-76, 674, 371, -1624, 731, 1109], [-269, 569, 396, -1443, 1635, 1522], [22, 660, 127, -673, 193, 1541], [-254, 534, 285, -304, -866, 1083], [-183, 564, 267, -943, -93, 1049], [-84, 655, 331, -1573, 967, 871], [-356, 513, 353, -1051, -272, 880], [-420, 632, 624, -1377, 459, 806], [-269, 554, 326, -1046, -385, 839], [-68, 643, 244, -1518, 780, 897], [-503, 456, 336, -590, -1115, 863], [-198, 539, 307, -740, -632, 935], [-171, 598, 349, -1529, 1006, 1033], [-435, 534, 414, -999, -255, 1069], [-434, 542, 450, -1232, 383, 694], [-250, 611, 468, -1417, 393, 722], [-124, 601, 295, -1250, 590, 1318], [-402, 484, 324, -1121, 596, 1038], [-172, 586, 390, -689, -601, 1205], [-328, 512, 349, -813, -360, 1139], [-312, 502, 329, -239, -1008, 1167], [-280, 538, 368, -957, -360, 1049], [-183, 599, 407, -1278, -32, 975], [-557, 464, 336, -1099, -239, 798], [-391, 506, 403, -942, 45, 1345], [-457, 463, 360, -886, -545, 812], [-322, 632, 554, -1418, -198, 982], [-322, 552, 455, -1126, -541, 677], [-363, 531, 431, -804, -806, 967], [-315, 565, 460, -299, -1151, 1172], [-452, 512, 412, -395, -986, 1270], [-469, 500, 454, -757, -989, 965], [-640, 451, 376, -874, -817, 804], [-536, 485, 357, -1407, 388, 1696], [-580, 501, 393, 184, -1680, 1294], [-550, 479, 458, -919, -1546, 772], [-361, 495, 376, -1062, -289, 769], [-429, 531, 448, -1790, 742, 1636], [-726, 446, 311, 443, -1757, 1335], [-563, 533, 525, -1003, -785, 864], [-423, 509, 434, -888, -507, 1133], [-475, 529, 473, -581, -735, 1311], [-638, 497, 387, -423, -1069, 1486], [-597, 415, 351, -915, -1344, 523], [-509, 443, 406, -977, -1074, 512], [-548, 519, 482, -906, -342, 1046], [-694, 475, 416, -777, -1585, 894], [-698, 479, 405, -257, -1952, 1e3], [-670, 390, 237, -728, -1337, 700], [-662, 431, 376, -953, -1020, 554], [-633, 466, 417, -740, -1193, 940], [-678, 387, 270, -766, -1091, 760], [-840, 389, 147, -740, -1162, 1131], [-761, 353, 133, -614, -1225, 795], [-682, 394, 315, -1009, -1292, 302], [-731, 374, 237, -941, -1066, 302], [-813, 441, 251, -647, -1346, 1035], [-676, 426, 358, -802, -1094, 792], [-755, 399, 235, -861, -1908, 647], [-801, 412, 300, -886, -2291, 458], [-727, 415, 275, -1991, -42, 2202], [-802, 391, 144, 74, -2317, 1271], [-783, 434, 333, 152, -2705, 908], [-741, 381, 212, -866, -2553, 498], [-819, 361, 63, 157, -2708, 1127], [-869, 436, 267, -519, -2684, 608], [-708, 365, 133, 618, -2959, 892], [-813, 363, 125, -1074, -2967, 337], [-782, 355, 120, -714, -1602, 612], [-888, 393, 95, -440, -2728, 650], [-830, 364, 135, 314, -2384, 1196], [-776, 338, 20, -1591, -152, 2102], [-777, 346, 92, 818, 2783, 841], [-823, 366, 157, -326, -2440, 770], [-741, 316, 6, -91, 2659, 454], [-770, 276, -241, -592, -1508, 565], [-878, 356, 2, -376, -2915, 624], [-845, 351, 31, -312, -2647, 795], [-789, 349, 85, -586, -1824, 741], [-733, 301, -165, -1049, -2428, 13], [-830, 316, -133, -539, -2727, 546], [-715, 286, -176, -637, -2597, 421], [-677, 252, -185, -136, -2225, 871], [-727, 272, -185, -510, -2164, 648], [-779, 292, -213, -628, -2094, 558], [-818, 310, -92, -464, -2446, 658], [-804, 327, -17, -575, -2970, 466], [-608, 239, -212, -242, 2398, 386], [-726, 278, -181, -795, -2407, 223], [-701, 257, -212, -299, -2764, 668], [-722, 251, -187, 401, 2347, 781]], [0, [23, 754, 120, 2753, -986, -576], [-4, 725, 164, -1120, 863, -2437], [-29, 763, 165, 1963, -2344, -222], [-27, 768, 135, -599, 596, -3089], [8, 712, 142, -1621, 453, -1718], [-36, 763, 139, -329, 970, -2689], [-84, 776, 184, -448, 966, -2818], [-127, 761, 179, 92, 479, -3074], [-108, 759, 48, -231, 134, -2498], [-41, 734, 104, -747, -737, -2984], [-62, 788, 210, 2618, -1813, -273], [-10, 743, 162, -2770, -1189, -245], [-59, 751, 219, 177, 894, -2628], [-162, 780, 152, -179, 465, -2167], [-42, 732, 208, -711, 614, -2249], [-58, 826, -97, -588, -158, -2834], [-46, 735, 212, 147, 498, -2293], [-127, 762, 210, 58, 1326, -2409], [-49, 738, 190, 316, -609, -2287], [-96, 722, 284, 1237, 746, -2254], [-10, 54, 85, -424, -126, 449], [-43, 742, 165, -922, -432, -2644], [-49, 720, 139, -776, -18, -2246], [-127, 770, 13, 175, 29, -2475], [-103, 767, 164, -70, 1252, -2442], [-13, 683, -31, -366, -972, -2115], [-186, 762, 124, 440, 27, -2370], [-100, 751, 109, 235, 165, -2338], [-122, 738, 195, 220, -312, -2369], [-109, 751, 155, 438, 72, -2211], [-147, 742, 186, 277, -143, -2397], [-108, 723, 70, 422, 112, -2285], [4, 679, -116, -435, -1508, -2424], [-35, 691, -18, 331, -586, -1975], [-94, 749, 128, -270, -233, -2583], [-120, 739, 92, 707, 148, -2298], [-139, 749, 153, 208, -752, -2114], [-107, 749, 111, 2, -793, -2145], [-31, 732, -29, -123, -1021, -2266], [-53, 730, -19, 754, -309, -2063], [97, 720, -186, 267, -1154, -2526], [243, 639, -126, 2232, 608, -695], [8, 682, -71, 2564, 1377, -561], [8, 699, -67, -15, -1085, -2313], [-84, 703, -3, 827, 45, -2264], [174, 650, -146, 2599, 905, -655], [306, 675, -130, 2770, 392, -482], [-33, 761, -47, 917, 108, -2339], [16, 700, -99, 521, -128, -2140], [48, 712, -142, -332, -1313, -2549], [-28, 7, 85, 2898, -894, -436], [112, 687, -156, 1812, 197, -2383], [33, 706, -111, 972, -260, -2207], [192, 683, -164, 2398, 1184, -611], [291, 738, -169, 2575, 945, -368], [93, 666, -150, 2583, 1133, -684], [288, 686, -127, 67, -1641, -2213], [61, 696, -171, 600, -410, -2145], [301, 746, -200, 2620, 1095, -521], [276, 688, -176, 0, -1551, -2127], [352, 659, -56, 2785, 460, -995], [391, 659, -58, 551, -1308, -1766], [232, 700, -199, -20, -1613, -2112], [443, 758, -146, -223, -2111, -2305], [346, 681, -119, 2332, 300, -753], [383, 752, -191, 2673, 1028, -714], [344, 697, -132, 2511, 333, -735], [465, 833, -177, -2923, 713, -178], [398, 715, -79, 2164, 17, -142], [389, 642, 58, 2980, -359, -923], [366, 743, -182, 2616, 512, -508], [374, 718, -144, 2742, 374, -697], [-21, 96, 109, -2354, -481, -139], [386, 736, -179, 2686, 159, -641], [387, 712, -74, 2516, 95, -398], [413, 729, -116, -3066, 375, -605], [418, 695, -116, -92, -2279, -1981], [322, 695, -184, 409, -2012, -2147], [434, 672, 86, 2321, -385, -893], [444, 733, 73, 2336, -385, -392], [464, 762, 36, 2718, -402, -326], [530, 782, -50, 2919, 103, -665], [441, 736, -76, -2843, -119, -657], [384, 593, 204, -1924, 704, -1028], [436, 715, -128, -2115, 1059, -1009], [421, 672, -63, 513, -2314, -1837], [492, 750, -9, -3023, -169, -764], [445, 674, -71, -2366, 458, -1082], [479, 708, 41, -2020, 651, -830], [410, 638, 45, -1892, 830, -947], [412, 663, 124, -2705, -265, -789], [424, 670, 108, -2596, 313, -911], [450, 675, 98, -2399, 480, -1034], [496, 737, 11, -2609, 262, -997], [486, 735, 21, -2574, -304, -983], [416, 675, 103, -2396, -564, -1046], [446, 680, 99, -2221, -7, -1035], [360, 627, 167, -2185, -89, -936], [314, 614, 275, 47, 2e3, -1967], 0, [70, 767, -142, -1784, 1429, 982], [109, 785, 44, 1217, -974, 2409], [162, 790, 29, 154, -205, 1964], [12, 698, 56, -341, 526, 1756], [-102, 643, 226, -1823, 767, 592], [-159, 618, 258, -1137, 405, 1348], [-7, 678, 141, 538, -807, 1652], [11, 674, 151, 195, 186, 1925], [-26, 705, 357, -1697, 869, 1078], [-239, 572, 354, 1591, -1314, 1622], [57, 687, 65, -416, 41, 1591], [-203, 549, 235, -41, -1083, 1065], [-134, 589, 228, -898, -71, 1106], [-46, 674, 300, -1651, 1229, 799], [-303, 518, 314, -937, -290, 943], [-384, 648, 628, -1412, 673, 704], [-212, 583, 304, -1091, -244, 884], [-35, 664, 194, -1593, 977, 894], [-438, 456, 316, -477, -1167, 874], [-134, 569, 285, -682, -566, 1021], [-128, 615, 308, -1579, 1139, 1022], [-381, 534, 384, -1016, -109, 1061], [-389, 546, 431, -1245, 584, 654], [-202, 635, 459, -1478, 547, 683], [-85, 625, 247, -1458, 926, 1338], [-333, 503, 317, -1179, 676, 1070], [-126, 606, 368, -825, -265, 1273], [-270, 535, 327, -788, -261, 1220], [-238, 524, 304, 1, -1152, 1205], [-217, 569, 348, -1004, -237, 1083], [-141, 610, 368, -1326, 133, 983], [-487, 464, 329, -1082, -178, 836], [-332, 521, 404, -1079, 279, 1361], [-402, 477, 353, -863, -466, 873], [-283, 643, 534, -1591, 172, 915], [-267, 591, 466, -1192, -420, 699], [-313, 539, 407, -806, -699, 983], [-268, 573, 428, -325, -1028, 1187], [-394, 528, 407, -475, -805, 1288], [-422, 512, 448, -807, -807, 991], [-610, 482, 431, -937, -683, 801], [-482, 496, 365, -1291, 389, 1670], [-520, 505, 392, 119, -1544, 1300], [-498, 488, 451, -941, -1341, 807], [-288, 524, 374, -1115, -122, 833], [-379, 549, 458, 219, -1046, 1594], [-672, 449, 327, 297, -1462, 1336], [-519, 545, 534, -1072, -598, 853], [-362, 535, 437, -1065, -169, 1153], [-418, 543, 474, -811, -316, 1306], [-580, 509, 403, -929, -410, 1449], [-553, 431, 385, -930, -1155, 601], [-455, 471, 437, -998, -984, 554], [-504, 545, 520, -977, -188, 1026], [-655, 487, 436, -917, -1216, 916], [-651, 486, 424, -358, -1642, 1025], [-650, 422, 300, -785, -1207, 721], [-611, 443, 408, -989, -813, 579], [-592, 483, 446, -865, -877, 957], [-633, 408, 318, -822, -907, 801], [-807, 398, 180, -808, -985, 1110], [-720, 364, 173, -646, -1051, 820], [-639, 408, 359, -1022, -1177, 336], [-693, 385, 281, -963, -931, 328], [-772, 448, 285, -712, -1164, 1013], [-644, 448, 399, -938, -772, 813], [-714, 409, 273, -895, -1688, 673], [-796, 435, 352, -930, -2110, 522], [-689, 441, 319, -1941, 74, 2131], [-778, 407, 192, -91, -2017, 1293], [-767, 455, 386, 131, -2511, 978], [-720, 396, 264, -862, -2367, 553], [-818, 381, 123, 104, -2561, 1153], [-840, 444, 310, -571, -2417, 646], [-674, 388, 192, 633, -2901, 914], [-804, 376, 182, -1073, -2750, 386], [-751, 366, 172, -743, -1423, 633], [-892, 412, 156, -507, -2487, 688], [-807, 383, 185, 259, -2237, 1222], [-759, 360, 83, -1592, -6, 2051], [-780, 374, 152, 874, 2914, 915], [-810, 383, 207, -385, -2163, 836], [-765, 343, 74, -61, 2747, 490], [-774, 283, -189, -610, -1380, 560], [-894, 376, 60, -394, -2827, 645], [-847, 368, 90, -349, -2492, 822], [-775, 369, 153, -611, -1733, 752], [-746, 306, -107, -1061, -2263, 19], [-862, 334, -79, -561, -2639, 558], [-741, 302, -120, -658, -2498, 434], [-687, 270, -113, -130, -2197, 895], [-736, 287, -121, -542, -1999, 674], [-795, 303, -153, -672, -1859, 551], [-828, 323, -29, -488, -2306, 676], [-831, 348, 52, -583, -2874, 493], [-664, 261, -160, -218, 2426, 398], [-751, 289, -123, -818, -2231, 253], [-730, 273, -156, -312, -2638, 705], [-780, 273, -139, 446, 2405, 811]], [0, 0, 0, 0, [11, 759, 142, 2401, -2268, -31], [30, 705, 109, -1925, 265, -1695], [-5, 754, 132, -413, 1120, -2689], [-61, 770, 180, -539, 1202, -2808], [-107, 770, 190, 30, 892, 3016], [-107, 758, 85, -384, 407, -2457], [-50, 728, 143, -789, -693, -2997], [-34, 780, 195, 2552, -1662, -272], [3, 740, 132, -2806, -1075, -228], [-45, 752, 219, 80, 1419, -2685], [-153, 778, 170, -367, 641, -2118], [-31, 728, 203, -863, 899, -2151], [-62, 816, -59, -658, -102, -2816], [-37, 733, 216, -123, 1360, -2098], [-107, 761, 208, -40, 1572, -2417], [-51, 749, 214, 589, -285, -2279], [-92, 722, 291, 1235, 1049, -2252], [-6, 62, 112, -973, 44, 574], [-32, 732, 170, -1221, -247, -2692], [-40, 709, 156, -1050, 20, -2157], [-136, 774, 50, 103, 133, -2471], [-71, 765, 168, -162, 1421, -2436], [-63, 693, 12, -204, -661, -2146], [-181, 769, 148, 394, 275, -2455], [-95, 757, 139, 115, 495, -2402], [-118, 749, 214, 329, -81, -2427], [-109, 756, 182, 409, 179, -2228], [-143, 749, 210, 316, 299, -2500], [-123, 730, 114, 420, 313, -2323], [-40, 688, -98, -371, -1345, -2435], [-66, 702, 22, 437, -358, -2012], [-84, 743, 158, -344, -102, -2580], [-134, 753, 135, 679, 333, -2357], [-145, 752, 180, 188, -472, -2158], [-112, 762, 150, 54, -573, -2196], [-67, 748, 22, -176, -883, -2327], [-69, 741, 26, 627, -179, -2111], [53, 736, -184, 235, -1003, -2582], [199, 641, -138, 2366, 789, -759], [-34, 694, -30, 2611, 1513, -575], [-21, 705, -16, 17, -988, -2310], [-124, 718, 45, 822, 242, -2331], [125, 658, -153, 2742, 1117, -680], [267, 692, -158, 2801, 530, -445], [-65, 768, -8, 816, 177, -2293], [-19, 719, -55, 457, -20, -2180], [3, 720, -112, -318, -1102, -2576], [-16, 20, 65, 2913, -889, -442], [77, 708, -141, 1666, 308, -2422], [-7, 718, -79, 931, -78, -2251], [137, 669, -155, 2504, 1419, -697], [244, 717, -167, 2539, 1080, -423], [47, 661, -121, -470, -1797, -2356], [245, 685, -139, 132, -1381, -2228], [22, 697, -136, 652, -230, -2165], [256, 731, -196, 2568, 1250, -562], [225, 688, -180, 71, -1270, -2134], [330, 665, -100, 2833, 767, -959], [352, 655, -83, 713, -970, -1783], [184, 694, -189, 28, -1440, -2094], [409, 748, -159, -310, -1981, -2258], [299, 669, -141, 2349, 522, -825], [344, 743, -197, 2615, 1131, -734], [296, 683, -148, 2485, 532, -797], [441, 834, -191, -3088, 913, -125], [358, 698, -110, 2109, 193, -175], [411, 670, 9, 2936, -184, -818], [330, 735, -198, 2539, 702, -522], [337, 709, -158, 2702, 492, -714], [-17, 130, 104, -2284, -481, -201], [341, 722, -193, 2634, 262, -647], [351, 700, -102, 2454, 270, -415], [379, 729, -139, -3116, 480, -581], [383, 691, -137, -129, -2156, -1966], [275, 698, -199, 400, -1754, -2163], [427, 670, 42, 2261, -295, -877], [435, 725, 34, 2197, -207, -368], [454, 760, 1, 2568, -197, -244], [512, 779, -74, 2740, 287, -630], [424, 744, -104, -2966, 149, -507], [408, 605, 175, -2056, 788, -1054], [415, 719, -159, -2252, 1247, -1023], [399, 670, -101, 488, -2066, -1818], [490, 758, -46, 3096, -6, -689], [440, 680, -107, -2421, 637, -1057], [486, 721, 5, -2142, 724, -837], [411, 647, 8, -1976, 950, -936], [436, 690, 87, -2782, -213, -739], [434, 682, 69, -2693, 353, -911], [461, 686, 55, -2549, 533, -1042], [500, 744, -28, -2742, 315, -995], [500, 753, -18, -2711, -204, -900], [441, 706, 70, -2517, -484, -916], [472, 698, 66, -2336, 25, -1009], [395, 652, 141, -2370, -55, -909], [352, 642, 262, -110, 1993, -2057], 0, 0, 0, 0, 0, [-79, 651, 161, -1820, 794, 608], [-137, 623, 191, -1009, 287, 1370], [12, 698, 78, 471, -687, 1667], [47, 710, 92, 316, 165, 1949], [19, 733, 336, -1832, 1196, 969], [-211, 577, 308, 1164, -820, 1617], [84, 718, -5, -451, 162, 1632], [-151, 572, 185, 165, -1260, 1025], [-86, 620, 183, -868, -42, 1154], [-14, 691, 260, -1680, 1360, 756], [-249, 530, 271, -843, -351, 981], [-349, 661, 625, -1420, 811, 632], [-154, 616, 269, -1158, -82, 917], [-7, 686, 131, -1625, 1062, 891], [-373, 462, 295, -244, -1345, 876], [-76, 604, 255, -668, -519, 1062], [-89, 634, 260, -1661, 1372, 1002], [-327, 534, 346, -992, -76, 1075], [-343, 548, 399, -1249, 684, 646], [-159, 656, 442, -1530, 692, 638], [-51, 652, 187, -1572, 1102, 1340], [-263, 529, 305, -1350, 908, 1129], [-87, 625, 336, -960, -9, 1304], [-212, 561, 298, -781, -164, 1291], [-167, 554, 273, 121, -1223, 1219], [-157, 601, 320, -1059, -115, 1108], [-103, 622, 324, -1386, 360, 999], [-412, 468, 316, -1037, -169, 929], [-276, 538, 398, -1251, 549, 1373], [-348, 493, 342, -833, -414, 935], [-247, 651, 507, -1650, 326, 875], [-214, 628, 468, -1351, -142, 722], [-266, 547, 381, -786, -544, 1018], [-222, 580, 392, -351, -834, 1210], [-335, 543, 392, -582, -549, 1316], [-375, 524, 436, -886, -528, 1026], [-578, 510, 480, -1015, -515, 789], [-427, 507, 369, -1088, 290, 1661], [-461, 508, 387, 89, -1415, 1305], [-445, 497, 436, -946, -1234, 824], [-217, 557, 360, -1202, 93, 893], [-328, 565, 452, 848, -1525, 1639], [-612, 451, 335, 262, -1349, 1336], [-476, 555, 540, -1153, -362, 830], [-303, 560, 430, -1249, 176, 1151], [-361, 556, 467, -997, 56, 1287], [-518, 518, 411, -1129, -46, 1402], [-507, 450, 411, -963, -944, 685], [-403, 498, 461, -1060, -776, 636], [-459, 568, 549, -1092, 92, 973], [-611, 497, 447, -1033, -906, 913], [-598, 491, 434, -435, -1397, 1034], [-628, 451, 356, -892, -975, 740], [-553, 456, 428, -1012, -683, 596], [-545, 499, 463, -992, -551, 958], [-582, 431, 357, -901, -685, 844], [-770, 406, 210, -897, -703, 1066], [-673, 376, 211, -666, -923, 854], [-593, 424, 396, -1038, -1057, 373], [-650, 397, 318, -1e3, -734, 374], [-726, 453, 314, -786, -904, 977], [-606, 469, 429, -1026, -568, 812], [-663, 419, 306, -919, -1484, 700], [-784, 457, 397, -985, -1928, 575], [-643, 466, 355, -1896, 208, 2052], [-746, 422, 237, -370, -1534, 1302], [-745, 475, 431, 76, -2266, 1052], [-688, 412, 309, -861, -2250, 588], [-807, 400, 179, 55, -2439, 1173], [-802, 451, 346, -606, -2253, 663], [-633, 412, 249, 667, -2815, 949], [-779, 389, 233, -1073, -2649, 409], [-713, 378, 221, -760, -1310, 652], [-881, 427, 211, -592, -2208, 718], [-778, 400, 232, 179, -2052, 1249], [-731, 381, 145, -1601, 144, 2003], [-768, 401, 208, -2230, -93, 2151], [-787, 399, 251, -461, -1896, 886], [-781, 370, 138, -22, 2904, 558], [-770, 290, -133, -630, -1247, 559], [-906, 395, 116, -450, -2601, 690], [-841, 384, 146, -416, -2247, 857], [-756, 388, 217, -668, -1537, 773], [-750, 311, -46, -1062, -2148, 35], [-886, 351, -26, -594, -2506, 574], [-758, 318, -61, -684, -2381, 449], [-695, 290, -41, -123, -2163, 926], [-738, 302, -54, -555, -1934, 687], [-797, 313, -89, -697, -1720, 549], [-826, 336, 34, -509, -2183, 692], [-847, 369, 119, -602, -2711, 538], [-716, 283, -109, -168, 2538, 444], [-766, 301, -62, -832, -2125, 274], [-752, 291, -97, -337, -2470, 750], [-829, 296, -90, 490, 2479, 849]], [0, 0, 0, 0, 0, 0, 0, [-37, 763, 171, 2504, -1667, -371], [-82, 775, 192, -98, 1302, 2873], [-95, 754, 115, -530, 697, -2381], [-53, 721, 171, -892, -583, -3021], [-7, 772, 177, 2512, -1571, -277], [16, 735, 91, -2826, -1016, -221], [-30, 751, 215, 4, 1767, -2695], [-138, 773, 180, -679, 926, -1998], [-18, 724, 190, -973, 1192, -2037], [-62, 801, -18, -782, -19, -2779], [-26, 730, 212, -129, 1817, -1987], [-86, 760, 202, -148, 1843, -2405], [-49, 757, 223, 907, 98, -2348], [-88, 722, 296, -1909, -1157, -896], [-6, 79, 133, -1262, 164, 591], [-20, 722, 167, -1516, -60, -2690], [-30, 700, 164, -1420, 3, -2052], [-143, 777, 85, 16, 259, -2459], [-38, 762, 167, -229, 1547, -2423], [-98, 708, 59, -76, -386, -2199], [-167, 774, 165, 328, 508, -2528], [-80, 759, 159, -39, 860, -2437], [-112, 758, 228, 529, 627, -2757], [-105, 758, 202, 298, 523, -2272], [-133, 754, 226, 271, 905, -2656], [-130, 737, 151, 405, 542, -2366], [-77, 700, -73, -310, -1140, -2464], [-89, 713, 61, 508, -177, -2051], [-70, 737, 180, -519, 223, -2540], [-135, 762, 167, 618, 585, -2434], [-141, 754, 198, 144, -182, -2202], [-112, 772, 181, 91, -285, -2277], [-90, 759, 73, -239, -744, -2385], [-72, 748, 71, 528, -78, -2143], [14, 751, -174, 161, -785, -2653], [156, 650, -144, 2538, 1020, -804], [-69, 710, 19, -455, -1406, -2562], [-46, 713, 42, 85, -769, -2312], [-150, 732, 90, 815, 324, -2361], [78, 670, -156, -223, -1724, -2476], [228, 709, -182, 2824, 665, -404], [-90, 771, 32, 752, 220, -2262], [-48, 738, 1, 383, 20, -2192], [-36, 728, -70, -326, -902, -2608], [1, 39, 39, 3050, -846, -491], [45, 730, -113, 1574, 364, -2417], [-40, 730, -36, 854, 56, -2267], [84, 660, -139, -533, -1542, -2398], [192, 696, -153, 2553, 1221, -502], [5, 662, -85, -400, -1655, -2304], [195, 688, -142, 222, -1124, -2262], [-12, 700, -95, 692, -66, -2186], [207, 715, -184, 2551, 1388, -609], [170, 690, -170, 130, -1091, -2147], [295, 673, -137, -263, -2168, -2214], [302, 652, -101, 825, -767, -1822], [138, 691, -175, 153, -1123, -2078], [364, 734, -164, -345, -1906, -2229], [245, 660, -154, 2428, 751, -900], [300, 731, -195, 2561, 1268, -768], [239, 671, -154, 2527, 728, -877], [410, 830, -200, 3123, 1e3, -113], [310, 679, -133, 2093, 311, -219], [419, 694, -42, 2912, -99, -768], [285, 723, -203, 2473, 913, -556], [295, 698, -167, 2674, 630, -745], [-13, 163, 104, -1996, -436, -399], [294, 708, -203, 2587, 378, -668], [308, 687, -125, 2438, 389, -446], [343, 727, -159, 3079, 697, -552], [344, 686, -154, -134, -2008, -1949], [226, 701, -204, 408, -1603, -2171], [417, 668, -1, 2214, -176, -870], [413, 710, -8, 2114, -77, -375], [436, 753, -32, 2430, -1, -201], [484, 770, -95, 2591, 443, -623], [397, 747, -128, -3084, 379, -411], [426, 615, 145, -2202, 882, -1078], [385, 719, -182, 777, -1713, -2098], [367, 667, -131, 513, -1939, -1815], [478, 761, -79, 2990, 117, -651], [424, 684, -137, -2466, 821, -1034], [485, 731, -29, -2353, 862, -855], [405, 655, -27, -2064, 1106, -919], [454, 714, 51, -2946, -78, -634], [438, 690, 30, -2902, 469, -910], [462, 694, 12, -2634, 573, -1044], [496, 748, -65, -2970, 417, -1e3], [503, 765, -55, -2799, -129, -850], [452, 730, 34, -2565, -440, -859], [487, 712, 31, -2446, 67, -982], [422, 672, 112, -2515, -9, -880], [384, 664, 241, -295, 2054, -2198], 0, 0, 0, 0, 0, 0, 0, 0, 0, [55, 756, 307, -1888, 1447, 845], [-185, 583, 258, -12, 440, 1657], [101, 746, -69, -407, 246, 1692], [-97, 603, 133, 223, -1308, 1010], [-41, 652, 136, -868, 6, 1187], [13, 705, 216, -1699, 1474, 715], [-195, 550, 226, -659, -499, 1033], [-316, 670, 614, -1395, 1122, 461], [-98, 651, 225, -1234, 76, 933], [19, 707, 69, -1650, 1129, 887], [-306, 479, 275, -35, -1512, 853], [-22, 638, 222, -673, -436, 1110], [-55, 653, 205, -1695, 1466, 994], [-274, 536, 305, -923, -96, 1113], [-297, 550, 359, -1253, 758, 654], [-120, 674, 422, -1575, 840, 584], [-20, 680, 126, -1650, 1224, 1336], [-195, 559, 288, -1453, 1052, 1145], [-54, 645, 296, -1245, 461, 1330], [-154, 596, 257, -799, -101, 1319], [-100, 584, 240, 353, -1350, 1244], [-100, 632, 288, -1208, 172, 1143], [-72, 634, 270, -1430, 541, 1015], [-336, 479, 302, -971, -200, 1035], [-223, 555, 388, -1626, 1110, 1371], [-294, 516, 324, -797, -368, 1006], [-213, 656, 475, -1697, 472, 830], [-167, 660, 457, -1513, 138, 705], [-221, 558, 343, -736, -419, 1063], [-181, 588, 349, -335, -756, 1223], [-277, 559, 370, -676, -316, 1345], [-330, 536, 413, -955, -280, 1056], [-542, 535, 516, -1098, -328, 766], [-372, 519, 367, -690, 64, 1676], [-397, 511, 373, 138, -1376, 1310], [-393, 507, 413, -933, -1095, 850], [-151, 592, 334, -1289, 279, 924], [-281, 579, 441, 970, -1529, 1676], [-552, 453, 341, 315, -1285, 1346], [-433, 564, 539, -1207, -185, 807], [-246, 584, 412, -1318, 307, 1145], [-304, 567, 445, -1089, 267, 1273], [-454, 524, 410, -1209, 195, 1367], [-456, 471, 425, -992, -816, 731], [-351, 526, 473, -1112, -638, 679], [-414, 588, 564, -1189, 395, 893], [-562, 504, 449, -1096, -720, 905], [-541, 495, 434, -480, -1193, 1040], [-596, 479, 403, -960, -830, 742], [-495, 469, 441, -1051, -474, 629], [-493, 513, 466, -1065, -361, 951], [-523, 457, 387, -974, -499, 873], [-720, 412, 235, -928, -575, 1046], [-615, 393, 245, -671, -859, 891], [-542, 441, 423, -1057, -935, 413], [-600, 412, 348, -1042, -549, 422], [-670, 456, 336, -812, -776, 960], [-562, 489, 449, -1149, -276, 791], [-602, 431, 330, -924, -1343, 726], [-764, 476, 434, -1101, -1614, 641], [-590, 489, 383, -1882, 255, 2024], [-701, 434, 275, -509, -1281, 1296], [-716, 493, 466, 21, -2094, 1093], [-650, 428, 348, -864, -2018, 658], [-793, 417, 231, -43, -2208, 1203], [-761, 456, 376, -654, -1993, 683], [-585, 437, 303, 701, -2758, 973], [-753, 401, 281, -1071, -2511, 441], [-669, 391, 265, -787, -1124, 694], [-862, 440, 261, -644, -2040, 729], [-747, 417, 274, 66, -1815, 1275], [-691, 402, 208, -1600, 215, 1981], [-745, 426, 259, -2209, 59, 2072], [-755, 415, 288, -557, -1607, 923], [-782, 395, 200, 5, 3081, 636], [-761, 298, -79, -662, -1054, 566], [-907, 411, 168, -502, -2418, 718], [-826, 398, 198, -494, -1987, 884], [-728, 407, 275, -691, -1457, 781], [-744, 318, 19, -1059, -2050, 58], [-900, 366, 26, -635, -2353, 589], [-767, 333, -1, -727, -2189, 472], [-700, 313, 32, -120, -2110, 966], [-736, 319, 12, -588, -1770, 722], [-794, 323, -26, -729, -1534, 551], [-816, 349, 95, -524, -2093, 705], [-851, 388, 182, -632, -2525, 585], [-757, 310, -50, -149, 2610, 474], [-772, 315, 1, -843, -2051, 290], [-763, 310, -35, -358, -2364, 776], [-866, 319, -40, 529, 2563, 892]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [19, 763, 157, 2455, -1437, -290], [27, 728, 45, -2839, -961, -221], [-14, 750, 202, 3091, -1123, -455], [-118, 767, 184, -834, 1060, -1924], [-4, 720, 167, -1003, 1333, -1984], [-56, 781, 26, -905, 59, -2733], [-14, 727, 197, -68, 2140, -1926], [-58, 755, 184, -202, 1985, -2390], [-46, 764, 225, 1280, 598, -2627], [-81, 722, 292, -1904, -277, -899], [-6, 101, 149, -1516, 282, 569], [-7, 713, 157, 1192, -2941, -545], [-19, 692, 167, 396, 2636, -1245], [-142, 777, 115, -108, 442, -2425], [-4, 756, 158, -347, 1779, -2385], [-122, 724, 101, 18, -136, -2272], [-151, 777, 178, 151, 972, -2631], [-59, 758, 168, -219, 1274, -2423], [-99, 764, 229, 511, 1020, -3004], [-96, 759, 213, 28, 1262, -2275], [-114, 756, 229, 207, 1222, -2724], [-127, 742, 179, 385, 711, -2396], [-107, 711, -44, -272, -944, -2505], [-103, 725, 96, 550, -48, -2086], [-51, 729, 190, -653, 495, -2472], [-127, 769, 191, 498, 932, -2520], [-134, 754, 211, -43, 565, -2269], [-104, 778, 201, 94, -96, -2338], [-100, 765, 117, -270, -681, -2410], [-70, 752, 110, 361, 91, -2183], [-19, 763, -154, 94, -634, -2692], [114, 664, -144, 2644, 1174, -812], [-93, 726, 70, -380, -1183, -2570], [-61, 723, 97, 119, -655, -2317], [-165, 745, 129, 789, 490, -2420], [36, 688, -147, -130, -1530, -2513], [187, 725, -195, 2842, 836, -347], [-107, 770, 71, 575, 325, -2168], [-70, 754, 58, 293, 69, -2203], [-68, 735, -20, -355, -730, -2638], [9, 52, 27, -2970, -746, -565], [17, 751, -78, 1413, 429, -2362], [-68, 741, 11, 811, 114, -2269], [34, 656, -118, -350, -1238, -2355], [138, 677, -131, 2646, 1397, -610], [-33, 669, -44, -353, -1558, -2279], [142, 694, -138, 301, -887, -2311], [-41, 704, -50, 713, 55, -2203], [157, 698, -162, -555, -1585, -2468], [116, 694, -155, 180, -948, -2162], [256, 682, -167, -203, -1886, -2266], [251, 652, -117, 929, -574, -1902], [92, 691, -146, 294, -822, -2082], [315, 717, -164, -372, -1788, -2186], [187, 658, -157, 2594, 1054, -975], [251, 717, -185, 2550, 1339, -789], [178, 665, -150, 2643, 966, -967], [377, 824, -206, 3028, 1118, -107], [257, 663, -150, 2101, 435, -281], [417, 716, -89, 2894, -32, -731], [236, 710, -197, 2446, 1093, -603], [250, 689, -169, 2675, 840, -807], [-6, 199, 117, -1760, -353, -555], [245, 694, -204, 2542, 539, -717], [259, 675, -141, 2456, 597, -523], [301, 723, -171, 3056, 770, -549], [301, 682, -165, -76, -1741, -1926], [177, 704, -202, 430, -1353, -2186], [398, 664, -42, 2188, -44, -872], [383, 692, -48, 2051, 72, -409], [410, 741, -64, 2321, 168, -193], [447, 757, -112, 2503, 555, -635], [357, 743, -145, 3138, 498, -376], [435, 623, 112, -2308, 957, -1092], [346, 717, -197, 703, -1540, -2074], [337, 665, -159, 591, -1703, -1816], [464, 762, -110, 2827, 323, -613], [407, 688, -164, -2518, 1026, -1012], [476, 737, -61, -2592, 1022, -897], [390, 663, -59, -2176, 1341, -894], [459, 731, 13, -3110, 81, -543], [430, 695, -10, -3023, 562, -913], [459, 700, -28, -2819, 687, -1050], [483, 747, -99, 3105, 531, -1015], [502, 774, -90, -2889, -41, -800], [457, 750, -1, -2702, -295, -701], [495, 723, -2, -2563, 131, -950], [439, 688, 78, -2761, 107, -829], [408, 680, 211, 2743, -1018, -854], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [2, 685, 87, -901, 90, 1214], [35, 719, 168, -1717, 1643, 649], [-139, 578, 179, -552, -586, 1053], [-285, 675, 593, -1361, 1273, 378], [-45, 685, 174, -1322, 243, 936], [42, 729, 3, -1715, 1312, 869], [-238, 509, 254, 76, -1590, 834], [25, 672, 184, -739, -242, 1182], [-24, 673, 144, -1719, 1533, 990], [-221, 544, 261, -788, -192, 1168], [-254, 553, 317, -1259, 826, 686], [-85, 690, 396, -1635, 1128, 458], [9, 708, 62, -1738, 1369, 1321], [-130, 593, 267, -1601, 1271, 1144], [-27, 664, 247, -1522, 901, 1322], [-98, 630, 215, -910, 101, 1362], [-38, 622, 199, 592, -1468, 1271], [-50, 663, 246, -1382, 479, 1152], [-46, 647, 208, -1445, 620, 1027], [-257, 501, 285, -882, -243, 1147], [-175, 573, 364, -1821, 1411, 1355], [-243, 540, 305, -771, -328, 1063], [-183, 658, 435, -1731, 613, 784], [-125, 688, 433, -1584, 264, 685], [-180, 572, 296, -679, -385, 1093], [-144, 597, 301, -258, -691, 1241], [-220, 576, 339, -771, -78, 1380], [-286, 549, 380, -980, -179, 1070], [-505, 557, 543, -1157, -188, 742], [-316, 532, 355, -432, -16, 1725], [-335, 516, 354, 284, -1433, 1312], [-340, 518, 380, -918, -1053, 860], [-90, 628, 301, -1395, 490, 938], [-235, 592, 423, 1032, -1466, 1714], [-484, 458, 338, 534, -1399, 1363], [-391, 571, 528, -1257, 8, 777], [-192, 607, 386, -1422, 514, 1129], [-251, 577, 416, -1196, 546, 1260], [-386, 529, 397, -1244, 327, 1362], [-407, 493, 432, -1072, -553, 810], [-301, 553, 476, -1236, -352, 740], [-369, 603, 566, -1241, 660, 802], [-513, 511, 445, -1132, -603, 898], [-482, 499, 426, -500, -1020, 1046], [-562, 506, 441, -1103, -524, 724], [-435, 484, 442, -1066, -398, 642], [-443, 526, 466, -1171, -59, 929], [-459, 485, 406, -1021, -387, 887], [-667, 418, 257, -957, -422, 1030], [-554, 412, 278, -666, -827, 929], [-493, 458, 445, -1103, -714, 480], [-543, 431, 368, -1073, -428, 457], [-611, 459, 352, -835, -600, 946], [-515, 508, 458, -1254, 0, 749], [-534, 445, 346, -907, -1223, 764], [-736, 493, 460, -1169, -1448, 662], [-537, 509, 405, -1839, 396, 1947], [-650, 445, 309, -592, -1114, 1292], [-682, 508, 493, -79, -1838, 1142], [-602, 445, 376, -866, -1940, 682], [-772, 433, 277, -248, -1786, 1234], [-711, 459, 398, -691, -1779, 693], [-530, 464, 352, 779, -2668, 1017], [-719, 414, 322, -1071, -2312, 488], [-615, 408, 302, -810, -964, 743], [-837, 451, 306, -676, -1935, 733], [-712, 432, 312, -136, -1433, 1300], [-646, 422, 267, -1573, 314, 1948], [-713, 450, 305, -2206, 165, 2021], [-713, 429, 319, -661, -1317, 945], [-772, 420, 256, 16, -3011, 720], [-741, 308, -21, -693, -909, 585], [-896, 425, 215, -560, -2226, 741], [-800, 411, 245, -538, -1846, 895], [-697, 425, 328, -757, -1243, 802], [-736, 325, 81, -1052, -1964, 89], [-910, 379, 74, -710, -2085, 605], [-769, 349, 58, -759, -2053, 488], [-700, 338, 105, -137, -1986, 1028], [-721, 339, 83, -617, -1640, 753], [-780, 333, 37, -757, -1367, 559], [-804, 362, 153, -550, -1940, 728], [-843, 406, 240, -673, -2317, 631], [-790, 335, 10, -125, 2745, 530], [-777, 329, 60, -858, -1949, 314], [-768, 329, 26, -410, -2149, 821], [-891, 341, 9, 557, 2640, 931]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-92, 758, 180, -1001, 1191, -1840], [10, 716, 130, -1013, 1429, -1950], [-41, 750, 72, -1031, 135, -2676], [-3, 724, 178, -7, 2339, -1898], [-30, 749, 160, -242, 2096, -2374], [-41, 769, 222, -1648, -2014, 165], [-72, 722, 282, -1901, -4, -900], [-7, 130, 161, -1715, 378, 511], [6, 705, 136, 1058, -2868, -593], [-5, 687, 157, -444, 2260, -1182], [-134, 774, 141, -281, 714, -2346], [28, 747, 140, 2705, -1170, -804], [-134, 738, 136, 61, 15, -2328], [-127, 777, 184, 6, 1297, -2658], [-34, 754, 167, -343, 1583, -2378], [-85, 769, 227, -2713, -1805, 45], [-81, 757, 211, -80, 1588, -2236], [-93, 757, 226, 125, 1537, -2771], [-118, 746, 198, 290, 1210, -2469], [-130, 722, -12, -246, -762, -2549], [-112, 736, 127, 607, 232, -2181], [-30, 722, 190, -805, 893, -2330], [-111, 773, 203, 315, 1367, -2576], [-117, 752, 210, -128, 856, -2270], [-92, 782, 214, 74, 146, -2421], [-107, 769, 156, -358, -518, -2466], [-58, 752, 139, 249, 205, -2201], [-46, 771, -127, 19, -490, -2719], [76, 680, -140, -368, -1751, -2346], [-102, 741, 114, -349, -1088, -2578], [-68, 732, 143, 169, -484, -2330], [-170, 756, 161, 733, 720, -2499], [-2, 706, -135, -29, -1225, -2614], [146, 739, -203, 2845, 1113, -245], [-111, 764, 104, 442, 390, -2095], [-85, 766, 110, 246, 95, -2208], [-89, 740, 39, -395, -536, -2666], [12, 60, 24, -2515, -542, -626], [-7, 767, -36, 1286, 437, -2295], [-88, 749, 60, 759, 183, -2270], [-11, 662, -86, -180, -940, -2355], [82, 665, -101, -375, -1579, -2448], [-67, 678, 0, -257, -1362, -2243], [87, 705, -120, 337, -700, -2358], [-65, 709, -2, 736, 303, -2240], [106, 685, -130, -462, -1401, -2399], [64, 700, -132, 228, -782, -2185], [212, 693, -184, -180, -1755, -2296], [197, 658, -128, 992, -400, -2033], [49, 694, -110, 385, -626, -2097], [261, 700, -157, -360, -1709, -2161], [129, 663, -152, -439, -1911, -2141], [204, 703, -172, -579, -1627, -2301], [117, 665, -140, -403, -2015, -2131], [343, 814, -208, 2883, 1305, -122], [203, 653, -160, 2166, 637, -403], [411, 734, -131, 2860, 94, -664], [183, 697, -180, 2459, 1252, -658], [201, 681, -161, 2729, 1060, -879], [4, 237, 141, -1707, -321, -602], [194, 681, -197, 2530, 635, -758], [206, 666, -150, 2545, 833, -624], [256, 717, -178, 3031, 881, -552], [253, 678, -166, 61, -1437, -1915], [126, 708, -186, 456, -1089, -2206], [372, 660, -80, 2181, 239, -894], [341, 670, -85, 2042, 136, -434], [370, 722, -92, 2290, 227, -199], [399, 739, -125, 2465, 609, -645], [315, 738, -157, 3060, 665, -347], [435, 630, 77, -2434, 1060, -1105], [303, 714, -205, 661, -1342, -2050], [302, 665, -179, 776, -1214, -1846], [440, 758, -137, 2675, 523, -605], [383, 691, -184, 549, -1787, -2157], [453, 737, -90, 361, -1983, -2197], [363, 669, -86, -2252, 1550, -873], [453, 741, -25, 3018, 248, -476], [413, 696, -47, -33, -2414, -2216], [445, 703, -66, 164, -2327, -2082], [459, 742, -128, 2979, 624, -1033], [496, 781, -122, -3095, 185, -707], [454, 764, -36, -2782, -203, -617], [499, 732, -33, -2664, 200, -923], [444, 697, 43, -2868, 176, -808], [426, 691, 178, 2578, -860, -708], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [6, 718, 111, -1397, 382, 926], [51, 749, -67, -1764, 1460, 849], [-172, 541, 233, 166, -1637, 821], [67, 706, 141, -897, 47, 1239], [4, 694, 81, -1743, 1596, 989], [-169, 558, 216, -600, -352, 1219], [-212, 560, 270, -1268, 875, 744], [-56, 701, 359, -1649, 1264, 392], [37, 737, -12, 1274, -1527, 1864], [-70, 628, 240, -1747, 1517, 1113], [-7, 682, 193, -1690, 1189, 1298], [-45, 668, 164, -1029, 271, 1375], [19, 663, 151, 812, -1567, 1302], [-6, 693, 196, -1535, 748, 1135], [-22, 661, 147, -1449, 675, 1045], [-179, 534, 264, -839, -250, 1203], [-132, 593, 336, 1129, -1401, 1822], [-194, 569, 280, -756, -222, 1162], [-155, 659, 392, -1751, 728, 744], [-86, 712, 408, -1719, 521, 616], [-141, 591, 243, -557, -405, 1132], [-111, 608, 243, -129, -712, 1252], [-165, 595, 293, -809, 22, 1400], [-244, 563, 341, -994, -92, 1089], [-469, 578, 564, -1277, 141, 658], [-259, 549, 331, -366, 6, 1762], [-273, 525, 329, 490, -1561, 1306], [-289, 531, 345, -875, -1018, 872], [-35, 664, 257, -1448, 593, 936], [-194, 604, 399, 1101, -1316, 1777], [-413, 467, 329, 963, -1752, 1362], [-351, 576, 514, -1315, 291, 726], [-143, 628, 357, -1560, 815, 1091], [-201, 587, 376, -1252, 703, 1257], [-319, 534, 379, -1274, 422, 1372], [-356, 516, 426, -1181, -274, 870], [-255, 579, 468, -1306, -207, 758], [-326, 616, 559, -1259, 840, 733], [-463, 516, 435, -1161, -483, 894], [-418, 502, 406, -482, -896, 1057], [-522, 529, 467, -1225, -242, 679], [-376, 499, 437, -1092, -264, 673], [-391, 537, 451, -1243, 177, 908], [-396, 513, 418, -1137, -126, 910], [-605, 424, 275, -972, -316, 1043], [-490, 437, 309, -659, -792, 981], [-442, 478, 452, -1130, -605, 511], [-483, 452, 380, -1121, -265, 508], [-548, 461, 362, -837, -493, 952], [-465, 525, 456, -1300, 132, 723], [-462, 462, 355, -884, -1180, 789], [-707, 508, 482, -1333, -1066, 675], [-480, 528, 419, -1813, 472, 1907], [-597, 455, 337, -719, -818, 1290], [-644, 521, 511, -320, -1342, 1190], [-553, 462, 399, -869, -1800, 726], [-740, 446, 318, -450, -1388, 1239], [-654, 462, 411, -717, -1594, 698], [-468, 492, 390, 813, -2639, 1033], [-679, 426, 356, -1071, -2199, 514], [-556, 427, 334, -835, -809, 803], [-806, 460, 346, -721, -1784, 737], [-667, 446, 342, -337, -1067, 1306], [-589, 444, 321, -1506, 393, 1916], [-676, 471, 345, -2234, 409, 1922], [-659, 443, 342, -698, -1214, 950], [-746, 442, 305, 15, -2935, 753], [-709, 321, 42, -710, -851, 605], [-880, 437, 258, -664, -1905, 761], [-768, 423, 286, -592, -1666, 906], [-661, 443, 375, -841, -985, 820], [-719, 336, 141, -1039, -1800, 163], [-908, 391, 120, -798, -1773, 606], [-762, 364, 117, -812, -1828, 511], [-689, 369, 181, -185, -1832, 1080], [-695, 362, 155, -647, -1519, 785], [-755, 345, 101, -780, -1228, 575], [-783, 374, 206, -596, -1692, 763], [-825, 423, 291, -726, -2095, 671], [-810, 360, 69, -114, 2853, 575], [-775, 343, 117, -898, -1728, 365], [-764, 349, 87, -443, -2032, 842], [-910, 362, 55, 577, 2712, 966]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [1, 741, 124, 2881, -990, -777], [-35, 771, 213, -1783, -1530, 772], [-60, 722, 263, -1900, 96, -900], [-8, 164, 170, -1841, 445, 424], [18, 699, 107, 959, -2818, -633], [8, 686, 134, -631, 2202, -1150], [-116, 767, 158, -455, 1041, -2213], [56, 736, 109, 2659, -1059, -835], [-136, 751, 163, 96, 197, -2407], [-95, 773, 178, -57, 1438, -2656], [-5, 746, 152, -413, 1785, -2335], [-69, 772, 219, -2813, -1553, 161], [-64, 754, 204, -123, 1740, -2211], [-68, 757, 215, 46, 1804, -2791], [-101, 748, 207, 157, 1733, -2500], [-147, 732, 19, -226, -436, -2639], [-111, 744, 148, 597, 651, -2363], [-8, 715, 179, -860, 1137, -2233], [-92, 774, 207, 197, 1630, -2576], [-97, 749, 204, -180, 1037, -2262], [-79, 784, 223, -89, 768, -2610], [-103, 768, 182, -516, -250, -2533], [-42, 750, 158, -12, 469, -2212], [-66, 777, -97, -67, -355, -2732], [41, 698, -131, -241, -1483, -2405], [-109, 754, 153, -274, -846, -2609], [-67, 739, 176, 206, -350, -2344], [-165, 764, 184, 617, 1056, -2595], [-33, 725, -112, 1, -940, -2746], [107, 750, -197, 2832, 1268, -187], [-111, 757, 133, 131, 474, -1932], [-92, 774, 154, 197, 123, -2213], [-98, 743, 96, -433, -366, -2685], [11, 64, 27, -1050, -4, -275], [-28, 778, 9, 1055, 381, -2175], [-103, 756, 105, 668, 306, -2265], [-49, 673, -46, -69, -703, -2382], [27, 661, -64, -295, -1466, -2408], [-94, 688, 43, -53, -981, -2212], [34, 718, -94, 324, -532, -2396], [-77, 716, 51, 743, 571, -2285], [55, 676, -89, -342, -1222, -2348], [16, 708, -103, 263, -568, -2220], [168, 705, -195, -159, -1559, -2345], [140, 673, -133, 994, -316, -2110], [8, 700, -70, 472, -393, -2125], [208, 684, -147, -288, -1572, -2128], [74, 671, -141, -287, -1656, -2127], [154, 691, -149, -487, -1421, -2244], [58, 668, -124, -294, -1829, -2098], [305, 800, -204, 2787, 1440, -150], [147, 650, -160, 2217, 748, -465], [399, 749, -168, 2827, 202, -609], [130, 687, -154, 2495, 1373, -704], [150, 678, -143, -299, -1853, -2193], [17, 276, 169, -1669, -272, -679], [145, 671, -183, 2546, 852, -866], [147, 666, -146, 2619, 978, -676], [211, 712, -181, 3016, 1015, -564], [201, 677, -160, 273, -1067, -1927], [78, 713, -159, 464, -1009, -2213], [339, 657, -113, 2202, 362, -908], [299, 651, -120, 2064, 318, -525], [328, 703, -117, 2262, 300, -217], [347, 719, -134, 2417, 700, -672], [265, 728, -162, 3013, 802, -345], [429, 636, 43, 539, -1909, -2025], [253, 709, -199, 660, -1218, -2037], [263, 666, -189, 903, -818, -1902], [404, 748, -156, 2617, 615, -612], [351, 693, -195, 524, -1638, -2166], [423, 734, -115, 224, -1856, -2150], [328, 675, -109, 864, -1478, -2283], [439, 747, -62, 2878, 417, -436], [387, 694, -82, -121, -2252, -2198], [421, 703, -99, 23, -2174, -2065], [432, 736, -153, 2877, 705, -1053], [477, 781, -148, 3001, 394, -655], [443, 773, -68, -2945, -11, -473], [494, 738, -61, -2894, 373, -875], [444, 705, 8, -3061, 337, -777], [437, 697, 140, 2502, -770, -648], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [31, 715, 16, -1772, 1667, 988], [-118, 579, 171, -263, -649, 1266], [-170, 573, 221, -1277, 901, 811], [-32, 709, 317, -1654, 1381, 334], [50, 762, -88, 1249, -1472, 1877], [-15, 666, 203, -1801, 1630, 1086], [7, 700, 129, -1792, 1384, 1270], [5, 705, 107, -1168, 456, 1376], [67, 707, 92, 924, -1609, 1327], [32, 721, 133, -1614, 893, 1114], [-2, 677, 81, -1435, 725, 1083], [-104, 571, 241, -816, -226, 1257], [-93, 613, 303, 1058, -1258, 1845], [-146, 605, 245, -806, -83, 1221], [-132, 657, 344, -1765, 876, 699], [-53, 732, 374, -1825, 756, 520], [-105, 615, 184, -418, -482, 1157], [-81, 625, 178, 7, -793, 1250], [-114, 615, 247, -846, 129, 1425], [-204, 577, 300, -990, -36, 1111], [-432, 594, 572, -1356, 446, 549], [-205, 570, 300, -302, 72, 1828], [-214, 539, 299, 871, -1809, 1266], [-240, 547, 306, -806, -1009, 883], [14, 697, 211, -1527, 749, 922], [-157, 615, 366, 1157, -1163, 1832], [-338, 485, 315, 1254, -2004, 1336], [-312, 579, 486, -1343, 504, 689], [-98, 648, 317, -1659, 1073, 1042], [-155, 598, 333, -1300, 839, 1261], [-255, 541, 356, -1427, 720, 1421], [-306, 542, 406, -1240, -138, 889], [-211, 604, 456, -1454, 91, 769], [-285, 626, 543, -1261, 1004, 666], [-413, 521, 420, -1201, -266, 893], [-356, 507, 379, -416, -843, 1075], [-478, 549, 480, -1322, 16, 615], [-321, 514, 429, -1120, -131, 705], [-339, 548, 427, -1299, 392, 891], [-332, 541, 420, -1253, 124, 916], [-532, 433, 288, -973, -264, 1103], [-427, 464, 337, -665, -704, 1070], [-392, 497, 454, -1196, -376, 569], [-421, 477, 382, -1160, -146, 546], [-481, 464, 364, -827, -418, 975], [-417, 540, 453, -1378, 398, 662], [-391, 480, 360, -845, -1144, 822], [-670, 519, 493, -1442, -808, 658], [-422, 545, 427, -1758, 601, 1843], [-538, 465, 359, -768, -675, 1297], [-604, 531, 521, -587, -830, 1191], [-503, 479, 414, -873, -1684, 762], [-700, 458, 351, -553, -1178, 1233], [-593, 463, 414, -719, -1487, 701], [-406, 520, 420, 905, -2577, 1071], [-635, 438, 384, -1069, -2063, 547], [-489, 451, 357, -864, -664, 865], [-771, 468, 380, -774, -1593, 738], [-616, 460, 366, -451, -851, 1305], [-524, 467, 368, -1408, 423, 1893], [-631, 489, 377, -2255, 501, 1891], [-608, 456, 362, -734, -1104, 956], [-722, 462, 349, 0, -2721, 837], [-673, 337, 105, -723, -821, 628], [-852, 446, 295, -767, -1588, 759], [-731, 434, 323, -670, -1404, 916], [-615, 461, 410, -928, -725, 829], [-692, 352, 199, -1032, -1711, 210], [-893, 401, 163, -878, -1475, 587], [-740, 380, 173, -837, -1717, 523], [-669, 402, 255, -228, -1726, 1106], [-664, 387, 226, -687, -1375, 822], [-718, 358, 164, -793, -1152, 590], [-753, 387, 254, -639, -1483, 791], [-799, 438, 336, -797, -1835, 707], [-819, 383, 125, -110, 3039, 650], [-759, 359, 173, -924, -1607, 391], [-753, 369, 145, -515, -1804, 876], [-920, 381, 99, 608, 2902, 1056]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-7, 200, 176, -1908, 500, 249], [27, 696, 74, 848, -2768, -683], [21, 689, 104, -791, 2164, -1116], [-91, 758, 167, -504, 1158, -2160], [79, 724, 77, 2644, -923, -876], [-135, 762, 186, 110, 446, -2533], [-61, 767, 169, -111, 1557, -2649], [23, 736, 125, 2674, -1166, -855], [-51, 773, 203, -2899, -1369, 224], [-46, 750, 193, -184, 2019, -2159], [-42, 755, 196, 3132, -1152, -350], [-80, 748, 205, 108, 1915, -2497], [-149, 741, 51, -234, -193, -2711], [-103, 751, 162, 514, 972, -2511], [13, 708, 162, -874, 1270, -2181], [-70, 773, 205, 121, 1805, -2562], [-77, 746, 196, -226, 1207, -2250], [-62, 782, 219, -275, 1230, -2682], [-93, 765, 198, -818, 227, -2562], [-22, 745, 165, -204, 664, -2195], [-81, 780, -63, -166, -211, -2733], [9, 715, -118, -183, -1297, -2472], [-107, 764, 182, -186, -500, -2682], [-65, 745, 202, 285, -12, -2396], [-151, 769, 199, 479, 1383, -2653], [-53, 743, -77, -45, -699, -2878], [70, 758, -184, 2787, 1527, -95], [-99, 746, 151, -568, 250, -1734], [-95, 780, 190, 136, 157, -2217], [-93, 743, 144, -478, -185, -2699], [8, 66, 34, -617, -2, -47], [-45, 780, 60, 744, 246, -2062], [-103, 758, 140, 600, 397, -2257], [-81, 688, 0, -12, -558, -2410], [-26, 664, -21, -205, -1320, -2374], [-109, 702, 84, 166, -577, -2233], [-16, 732, -55, 297, -451, -2410], [-74, 723, 101, 740, 681, -2305], [4, 676, -37, -262, -1101, -2325], [-27, 717, -69, 260, -384, -2250], [126, 716, -197, -159, -1299, -2417], [85, 691, -130, 944, -179, -2213], [-28, 710, -16, 489, -268, -2145], [154, 671, -132, -147, -1380, -2100], [22, 682, -126, -95, -1292, -2148], [103, 683, -116, -392, -1278, -2214], [3, 677, -101, -102, -1485, -2077], [260, 778, -191, 2750, 1496, -167], [94, 650, -157, 2345, 995, -570], [382, 761, -198, 2743, 439, -500], [78, 680, -120, -591, -1646, -2392], [98, 681, -117, -141, -1594, -2139], [35, 315, 197, -1680, -230, -756], [96, 668, -156, 2617, 1095, -977], [90, 671, -137, -380, -1896, -2405], [167, 706, -177, -126, -1966, -2557], [146, 682, -142, 505, -687, -1975], [33, 718, -129, 475, -805, -2232], [300, 656, -140, 2279, 592, -936], [248, 638, -145, 2110, 434, -588], [285, 684, -138, 2245, 405, -258], [289, 697, -136, 2408, 760, -700], [209, 715, -158, 2990, 912, -359], [411, 640, 8, 471, -1806, -2022], [204, 704, -190, 686, -1058, -2027], [220, 671, -189, 966, -543, -1966], [364, 736, -171, 2567, 714, -627], [314, 695, -199, 492, -1400, -2178], [384, 727, -135, 137, -1730, -2106], [290, 682, -127, 832, -1266, -2315], [414, 748, -95, 2817, 501, -425], [348, 689, -111, -140, -2144, -2187], [387, 701, -127, -65, -2020, -2046], [401, 729, -174, 2730, 865, -1100], [448, 775, -168, 2931, 483, -646], [425, 777, -98, -3098, 180, -373], [482, 740, -87, -3107, 571, -851], [435, 708, -26, 3044, 525, -765], [442, 700, 102, 2381, -605, -565], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [35, 702, 161, -1836, 1730, 1051], [18, 717, 58, -1809, 1420, 1262], [52, 742, 48, -1347, 696, 1365], [111, 749, 32, 1098, -1692, 1358], [65, 748, 68, -1684, 1031, 1084], [17, 698, 7, -1388, 724, 1136], [-35, 612, 211, -831, -151, 1310], [-59, 632, 267, 947, -949, 1919], [-99, 642, 205, -944, 136, 1252], [-112, 653, 287, -1766, 926, 688], [-26, 746, 330, -1876, 895, 447], [-68, 644, 121, -347, -536, 1162], [-52, 644, 112, 94, -863, 1242], [-65, 637, 196, -878, 212, 1447], [-167, 593, 258, -965, 7, 1144], [-393, 606, 567, -1392, 724, 428], [-151, 595, 262, -251, 136, 1887], [-157, 560, 262, 1047, -1914, 1231], [-192, 566, 264, -714, -1027, 890], [59, 729, 163, -1585, 868, 903], [-125, 625, 322, 1177, -1018, 1869], [-266, 508, 300, -1549, 866, 1869], [-275, 580, 448, -1354, 638, 669], [-61, 666, 264, -1720, 1275, 995], [-113, 609, 283, -1388, 1060, 1280], [-193, 553, 320, -1839, 1258, 1472], [-260, 566, 380, -1311, 16, 904], [-173, 625, 430, -1598, 381, 747], [-246, 634, 524, -1257, 1126, 618], [-362, 526, 395, -1214, -105, 903], [-291, 517, 340, -332, -858, 1091], [-432, 566, 482, -1370, 167, 568], [-269, 531, 411, -1160, 30, 744], [-289, 558, 394, -1341, 570, 884], [-268, 570, 407, -1317, 262, 912], [-451, 449, 300, -967, -260, 1145], [-359, 499, 357, -700, -602, 1126], [-344, 517, 448, -1276, -139, 614], [-359, 504, 377, -1220, 15, 593], [-413, 470, 360, -787, -321, 1053], [-367, 554, 434, -1421, 587, 612], [-322, 502, 360, -800, -1110, 860], [-632, 529, 498, -1568, -480, 605], [-362, 559, 423, -1715, 671, 1809], [-475, 477, 372, -839, -449, 1329], [-558, 539, 519, -693, -616, 1177], [-453, 495, 424, -879, -1468, 831], [-656, 468, 377, -709, -826, 1216], [-529, 465, 411, -708, -1400, 706], [-343, 547, 439, 1018, -2517, 1116], [-589, 450, 405, -1064, -1937, 578], [-416, 481, 370, -904, -516, 927], [-733, 474, 408, -855, -1283, 728], [-563, 472, 383, -565, -624, 1303], [-451, 492, 404, -1245, 426, 1871], [-585, 505, 405, 790, -2357, 1324], [-554, 469, 376, -785, -934, 968], [-687, 480, 384, -18, -2588, 884], [-637, 355, 168, -742, -788, 665], [-814, 453, 325, -818, -1417, 750], [-686, 443, 352, -725, -1212, 920], [-563, 478, 434, -979, -573, 831], [-661, 370, 254, -1029, -1608, 269], [-867, 409, 201, -934, -1237, 563], [-713, 395, 226, -864, -1596, 538], [-642, 435, 322, -336, -1496, 1149], [-625, 415, 293, -744, -1201, 863], [-678, 373, 224, -821, -1012, 632], [-714, 401, 295, -661, -1381, 805], [-762, 451, 373, -840, -1683, 722], [-817, 404, 177, -123, -3046, 726], [-739, 376, 224, -982, -1366, 437], [-728, 389, 201, -549, -1701, 889], [-921, 398, 140, -2545, 4, 1986]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [98, 713, 40, 2711, -674, -942], [-129, 771, 201, 16, 965, -2812], [-25, 758, 151, -156, 1660, -2638], [46, 725, 89, 2644, -983, -905], [-31, 771, 181, -2979, -1212, 263], [-24, 743, 168, -206, 2162, -2131], [-13, 750, 165, 3092, -1021, -355], [-57, 748, 198, -3128, -853, -672], [-143, 748, 80, -259, 41, -2778], [-87, 756, 167, 283, 1492, -2694], [33, 703, 139, -861, 1584, -2071], [-47, 770, 200, -8, 2121, -2509], [-55, 742, 183, -270, 1383, -2232], [-42, 777, 208, -344, 1392, -2689], [-78, 760, 204, -1103, 693, -2474], [-2, 739, 164, -483, 947, -2130], [-92, 780, -27, -260, -89, -2721], [-17, 732, -99, -161, -1100, -2566], [-97, 771, 199, -134, -184, -2773], [-58, 749, 216, 322, 210, -2441], [-132, 772, 206, 378, 1603, -2669], [-64, 759, -34, -99, -595, -2941], [38, 763, -161, 2710, 1813, -9], [-80, 734, 160, 871, 2107, -1428], [-95, 783, 219, 65, 198, -2221], [-84, 741, 185, -510, -59, -2704], [0, 63, 48, -477, -22, 25], [-51, 770, 105, 609, 173, -2029], [-99, 758, 168, 501, 533, -2238], [-107, 704, 45, 43, -407, -2446], [-74, 671, 25, -96, -1149, -2350], [-111, 718, 119, 308, -292, -2282], [-61, 743, -11, 251, -368, -2418], [-69, 730, 144, 734, 794, -2324], [-44, 680, 18, -182, -977, -2310], [-64, 726, -25, 226, -224, -2272], [87, 727, -190, -176, -1150, -2459], [32, 712, -119, 859, -57, -2281], [-59, 721, 44, 503, -78, -2177], [102, 663, -115, 53, -1129, -2087], [-23, 698, -98, 21, -972, -2208], [52, 678, -79, -280, -1121, -2192], [-46, 691, -68, 46, -1169, -2095], [216, 755, -175, 2699, 1601, -208], [45, 658, -145, 2486, 1261, -630], [358, 768, -220, 2624, 717, -398], [29, 678, -83, -474, -1422, -2327], [47, 688, -85, 16, -1324, -2117], [58, 354, 225, -1744, -201, -830], [51, 669, -122, -471, -1922, -2119], [36, 681, -119, -328, -1789, -2394], [123, 702, -164, -95, -1721, -2518], [91, 691, -116, 628, -440, -2032], [-7, 724, -90, 470, -697, -2243], [257, 658, -160, 2338, 728, -949], [197, 631, -164, 2242, 664, -694], [241, 667, -154, 2267, 622, -372], [226, 676, -133, 2450, 901, -782], [155, 704, -149, 2992, 985, -382], [389, 644, -24, 431, -1701, -2026], [154, 700, -172, 775, -803, -2026], [174, 680, -176, 989, -383, -2015], [321, 723, -180, 2495, 900, -669], [273, 697, -196, 484, -1292, -2182], [335, 717, -148, 112, -1646, -2083], [246, 689, -138, 824, -1085, -2350], [386, 746, -125, 2742, 622, -418], [306, 684, -135, -129, -2014, -2177], [346, 697, -149, -106, -1849, -2026], [358, 717, -185, -478, -2137, -2e3], [418, 769, -186, 2840, 598, -641], [399, 774, -123, 3096, 300, -331], [461, 738, -109, 3053, 688, -850], [412, 707, -59, 2955, 646, -769], [439, 698, 60, 2267, -424, -508], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [93, 772, 0, -1784, 1264, 1016], [33, 725, -67, -1291, 704, 1224], [28, 654, 178, -917, 6, 1357], [-32, 654, 221, 921, -776, 1977], [-54, 683, 153, -1064, 301, 1251], [-95, 649, 229, -1757, 1021, 691], [-3, 756, 281, -1926, 1071, 338], [-31, 678, 55, -267, -605, 1162], [-24, 667, 44, 216, -978, 1219], [-20, 661, 141, -1007, 439, 1488], [-130, 613, 210, -896, 16, 1196], [-356, 615, 554, -1393, 998, 300], [-100, 624, 215, -206, 177, 1928], [-103, 585, 223, 1175, -1979, 1200], [-146, 588, 221, -564, -1075, 893], [97, 758, 108, -1672, 1065, 854], [-98, 635, 270, 1173, -929, 1884], [-194, 539, 280, -1403, 771, 1910], [-241, 581, 405, -1358, 738, 662], [-28, 683, 204, -1736, 1337, 980], [-76, 623, 226, -1437, 1163, 1295], [-135, 571, 276, 810, -1323, 1654], [-215, 590, 350, -1437, 278, 912], [-139, 645, 395, -1716, 639, 698], [-211, 640, 496, -1246, 1252, 570], [-312, 532, 361, -1205, -35, 923], [-230, 531, 298, -219, -914, 1104], [-387, 581, 478, -1399, 270, 534], [-220, 549, 386, -1207, 197, 782], [-240, 569, 351, -1359, 656, 890], [-208, 598, 389, -1391, 426, 901], [-372, 468, 311, -959, -245, 1216], [-292, 536, 369, -770, -460, 1172], [-297, 538, 431, -1328, 2, 634], [-297, 534, 362, -1257, 108, 614], [-345, 482, 349, -730, -270, 1148], [-318, 566, 408, -1442, 691, 586], [-255, 526, 355, -721, -1046, 932], [-589, 535, 493, -1640, -249, 548], [-304, 573, 413, -1653, 729, 1779], [-408, 490, 376, -934, -199, 1382], [-513, 545, 512, -795, -385, 1154], [-401, 512, 420, -893, -1266, 893], [-608, 476, 397, -825, -515, 1195], [-467, 468, 404, -665, -1285, 717], [-282, 574, 444, -1995, 675, 1978], [-540, 463, 418, -1055, -1720, 633], [-341, 514, 375, -965, -346, 983], [-688, 479, 428, -891, -1119, 719], [-507, 484, 394, -646, -450, 1305], [-376, 518, 429, -1179, 417, 1865], [-533, 518, 421, 626, -2017, 1381], [-498, 481, 385, -850, -689, 990], [-650, 495, 415, -47, -2434, 933], [-599, 378, 230, -760, -755, 695], [-773, 458, 351, -884, -1172, 730], [-638, 452, 375, -789, -960, 924], [-509, 494, 450, -1069, -304, 827], [-626, 391, 303, -1029, -1539, 308], [-831, 415, 236, -960, -1111, 548], [-681, 410, 274, -911, -1385, 567], [-606, 467, 381, -437, -1306, 1173], [-571, 446, 353, -816, -1008, 902], [-631, 391, 280, -836, -943, 657], [-673, 414, 332, -693, -1223, 829], [-724, 463, 404, -917, -1421, 740], [-807, 422, 226, -143, -2901, 776], [-703, 394, 269, -1012, -1255, 456], [-702, 408, 254, -629, -1471, 914], [-909, 413, 177, 485, -2763, 1261]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [65, 714, 47, 2698, -788, -961], [-12, 768, 156, -3076, -1030, 293], [-2, 736, 136, -218, 2284, -2106], [16, 742, 124, 3057, -902, -363], [-33, 746, 183, 3127, -727, -687], [-132, 754, 106, -299, 270, -2838], [-68, 758, 165, 155, 1728, -2739], [47, 700, 106, -785, 1903, -1987], [-21, 764, 180, 3065, -824, -682], [-29, 737, 158, -297, 1505, -2217], [-23, 771, 191, -384, 1482, -2688], [-57, 751, 198, -1231, 934, -2390], [17, 731, 151, -625, 1091, -2080], [-97, 777, 11, -321, -8, -2708], [-37, 748, -74, -180, -988, -2635], [-83, 775, 208, -115, 200, -2903], [-49, 752, 225, 349, 804, -2594], [-113, 775, 212, -2847, -1357, -475], [-72, 771, 10, -164, -489, -2999], [12, 764, -127, -516, -1084, 3096], [-55, 722, 158, 524, 1895, -1379], [-93, 785, 243, -169, 333, -2220], [-71, 739, 215, -583, 222, -2702], [-11, 59, 66, -460, -25, 34], [-56, 760, 146, 126, -129, -1963], [-92, 757, 190, 301, 820, -2171], [-121, 720, 87, 97, -238, -2496], [-113, 682, 70, -14, -1021, -2341], [-105, 733, 147, 478, 141, -2420], [-97, 752, 35, 164, -215, -2427], [-61, 736, 180, 724, 917, -2346], [-85, 686, 72, -30, -742, -2301], [-90, 734, 28, 177, -31, -2294], [52, 737, -174, -218, -962, -2510], [-15, 734, -97, 748, 52, -2312], [-75, 731, 103, 507, 26, -2196], [49, 662, -89, 328, -764, -2111], [-59, 717, -60, 42, -772, -2270], [3, 677, -40, -199, -1e3, -2183], [-87, 706, -30, 127, -916, -2136], [170, 728, -151, 2693, 1656, -237], [1, 671, -125, 2539, 1367, -639], [327, 770, -233, 2523, 927, -344], [-18, 680, -39, -364, -1207, -2292], [-3, 701, -43, 66, -1209, -2122], [86, 393, 250, -1810, -194, -872], [9, 675, -82, -323, -1630, -2044], [-15, 692, -98, -253, -1607, -2393], [81, 700, -141, -38, -1479, -2482], [35, 706, -79, 639, -374, -2050], [-42, 729, -46, 441, -542, -2258], [213, 663, -174, 2470, 998, -963], [147, 631, -176, 2418, 939, -773], [192, 657, -158, 2312, 760, -449], [160, 661, -122, 2537, 1024, -855], [100, 695, -133, 3013, 1104, -427], [362, 649, -54, 404, -1489, -2050], [104, 698, -143, 838, -657, -2033], [130, 690, -158, 992, -198, -2082], [272, 709, -180, 2467, 1053, -715], [232, 699, -187, 486, -1058, -2193], [281, 705, -155, 113, -1591, -2071], [195, 699, -141, 823, -968, -2377], [354, 741, -151, 2680, 744, -422], [261, 681, -154, -51, -1703, -2165], [298, 692, -163, -95, -1711, -2014], [311, 705, -189, -499, -1969, -1952], [384, 760, -198, 2764, 712, -648], [369, 769, -145, 3029, 396, -308], [432, 734, -127, 2907, 861, -866], [383, 703, -89, 2910, 735, -775], [425, 692, 17, 2217, -327, -494], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-10, 722, 98, -1259, 563, 1216], [-80, 646, 166, -1732, 1066, 743], [14, 761, 225, -1949, 1199, 248], [9, 715, -16, -210, -660, 1158], [5, 692, -22, 363, -1126, 1174], [21, 687, 81, -1187, 674, 1508], [-94, 638, 155, -816, -23, 1231], [-320, 620, 526, -1370, 1210, 206], [-51, 657, 159, -153, 203, 1957], [-52, 612, 182, 1256, -2012, 1179], [-101, 618, 171, -469, -1107, 891], [126, 783, 48, -1720, 1186, 816], [-74, 645, 214, 1151, -863, 1889], [-125, 574, 256, -1314, 725, 1934], [-210, 582, 355, -1358, 823, 668], [2, 699, 143, -1759, 1431, 959], [-42, 637, 170, -1489, 1258, 1314], [-80, 591, 230, 290, -740, 1666], [-174, 615, 308, -1538, 489, 901], [-111, 661, 350, -1750, 718, 677], [-179, 644, 466, -1219, 1457, 500], [-262, 540, 320, -1150, 21, 983], [-171, 549, 254, 15, -1057, 1116], [-344, 594, 472, -1457, 547, 433], [-175, 568, 357, -1278, 415, 827], [-193, 581, 299, -1376, 745, 912], [-151, 624, 365, -1449, 559, 888], [-295, 493, 320, -991, -154, 1323], [-228, 574, 373, -984, -110, 1230], [-254, 558, 408, -1384, 147, 649], [-239, 564, 344, -1332, 281, 641], [-277, 503, 329, -647, -249, 1254], [-271, 577, 373, -1463, 811, 564], [-190, 555, 341, -658, -973, 1002], [-540, 538, 477, -1674, -118, 510], [-248, 585, 393, -1518, 775, 1747], [-339, 509, 368, -1078, 63, 1434], [-468, 549, 501, -852, -236, 1135], [-349, 530, 408, -910, -1086, 947], [-554, 484, 408, -869, -375, 1186], [-403, 474, 388, -636, -1254, 722], [-224, 598, 437, -1885, 704, 1940], [-489, 476, 423, -1047, -1525, 684], [-266, 551, 369, -1008, -248, 1006], [-641, 482, 442, -909, -1020, 714], [-450, 496, 397, -796, -116, 1317], [-305, 543, 447, -1054, 392, 1858], [-477, 529, 427, 406, -1625, 1420], [-436, 494, 381, -865, -607, 1003], [-610, 509, 438, -124, -2146, 1008], [-559, 403, 288, -810, -663, 752], [-725, 462, 370, -930, -969, 709], [-582, 461, 388, -816, -829, 931], [-453, 510, 455, -1128, -121, 822], [-586, 414, 346, -1035, -1433, 367], [-791, 420, 266, -997, -892, 520], [-640, 425, 315, -936, -1272, 585], [-567, 497, 431, -615, -993, 1195], [-510, 480, 403, -895, -816, 932], [-580, 412, 331, -884, -768, 724], [-625, 428, 360, -708, -1148, 843], [-677, 473, 426, -967, -1249, 745], [-789, 439, 271, -173, -2744, 826], [-663, 413, 309, -1076, -1030, 490], [-665, 427, 300, -685, -1315, 928], [-889, 426, 211, 159, -2171, 1340]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-9, 743, 164, 3089, -532, -715], [-116, 758, 128, -357, 516, -2890], [-47, 759, 158, -3099, -1212, -388], [55, 700, 66, 2451, -1024, -1202], [6, 753, 148, 3040, -742, -704], [-2, 730, 125, -318, 1607, -2204], [-3, 763, 169, 2705, -1538, -460], [-34, 741, 182, 1838, -2048, -818], [34, 724, 135, -827, 1298, -1990], [-96, 771, 48, -441, 152, -2668], [-54, 761, -48, -283, -747, -2789], [-67, 776, 211, -194, 825, -3107], [-40, 754, 226, -2968, -1375, -332], [-91, 775, 211, -2933, -1167, -491], [-74, 779, 55, -230, -388, -3047], [-10, 761, -87, -593, -891, 3068], [-31, 710, 155, 139, 1773, -1268], [-86, 783, 254, -690, 614, -2154], [-53, 735, 232, -633, 423, -2689], [-25, 56, 92, -723, 23, -102], [-54, 745, 172, -567, -591, -1982], [-79, 754, 201, 119, 1117, -2072], [-127, 736, 124, 133, -94, -2547], [-143, 694, 110, 158, -757, -2345], [-90, 747, 164, 555, 641, -2676], [-120, 757, 79, 83, -73, -2425], [-50, 741, 207, 704, 1086, -2374], [-110, 698, 119, 129, -498, -2317], [-102, 740, 81, 159, 36, -2301], [22, 745, -151, -264, -827, -2544], [-55, 754, -67, 605, 156, -2312], [-84, 741, 151, 507, 98, -2209], [0, 670, -57, 514, -461, -2169], [-87, 734, -15, 15, -584, -2341], [-43, 680, 4, -35, -734, -2183], [-119, 722, 13, 164, -774, -2165], [123, 701, -122, -399, -1377, -2835], [-38, 686, -100, -474, -1480, -2515], [293, 769, -238, 2450, 1083, -319], [-59, 690, 16, -288, -1054, -2280], [-50, 716, 6, 121, -1004, -2148], [117, 430, 270, -2030, -214, -960], [-29, 686, -36, -186, -1367, -2016], [-59, 705, -72, -206, -1462, -2406], [42, 702, -107, 35, -1229, -2457], [-18, 721, -39, 601, -268, -2076], [-70, 733, 7, 415, -446, -2266], [170, 671, -181, -521, -1844, -2189], [99, 637, -180, 2566, 1169, -802], [143, 652, -156, 2445, 1020, -576], [94, 654, -108, -452, -1911, -2202], [48, 689, -111, -97, -1915, -2670], [324, 654, -80, 419, -1360, -2077], [57, 699, -109, 897, -528, -2044], [86, 705, -129, 960, -54, -2133], [220, 694, -173, 2487, 1224, -777], [188, 701, -169, 509, -881, -2204], [226, 694, -158, 160, -1451, -2055], [142, 710, -135, 814, -803, -2414], [315, 734, -171, 2586, 974, -448], [211, 680, -164, 88, -1351, -2179], [248, 688, -172, -8, -1418, -2003], [256, 692, -182, -446, -1784, -1910], [344, 748, -204, 2710, 801, -660], [335, 761, -163, 2891, 604, -284], [396, 726, -140, 2853, 943, -880], [348, 698, -114, 2888, 811, -783], [401, 682, -26, 2153, -149, -496], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [33, 722, -84, 533, -1299, 1090], [59, 714, 18, -1716, 1281, 1525], [-56, 666, 97, -769, -58, 1245], [-285, 620, 486, -1354, 1313, 163], [-3, 693, 94, -114, 207, 1968], [-6, 641, 140, 1424, -2060, 1138], [-54, 656, 115, -435, -1111, 894], [151, 805, -9, -1788, 1404, 732], [-53, 656, 156, 1043, -668, 1892], [-61, 612, 228, -1165, 670, 1966], [-181, 584, 304, -1355, 940, 704], [28, 715, 75, -1782, 1530, 941], [-10, 653, 113, -1700, 1569, 1370], [-31, 615, 180, 16, -416, 1690], [-134, 638, 258, -1578, 573, 892], [-85, 676, 306, -1826, 920, 610], [-151, 646, 427, -1200, 1579, 466], [-213, 554, 272, -1062, -1, 1047], [-114, 576, 206, 134, -1132, 1116], [-302, 604, 453, -1477, 699, 373], [-136, 590, 317, -1356, 625, 860], [-149, 595, 246, -1391, 815, 949], [-100, 648, 334, -1510, 703, 867], [-218, 527, 322, -1212, 157, 1423], [-169, 612, 364, -1306, 365, 1243], [-213, 579, 379, -1474, 376, 660], [-182, 596, 317, -1386, 399, 649], [-210, 533, 302, -555, -247, 1349], [-225, 587, 333, -1475, 875, 559], [-131, 589, 315, -633, -920, 1044], [-493, 540, 457, -1703, 34, 467], [-195, 596, 362, -1411, 775, 1738], [-271, 531, 352, -1502, 612, 1486], [-422, 552, 480, -927, 21, 1098], [-298, 548, 386, -927, -922, 994], [-500, 491, 413, -908, -234, 1182], [-341, 481, 370, -527, -1206, 741], [-171, 621, 423, -1712, 724, 1890], [-433, 490, 412, -1039, -1430, 710], [-193, 589, 354, -1070, -118, 1029], [-591, 485, 449, -945, -782, 701], [-391, 509, 391, -928, 163, 1337], [-238, 568, 457, -829, 337, 1852], [-419, 538, 425, 283, -1409, 1434], [-374, 509, 370, -882, -437, 1050], [-565, 520, 453, -224, -1845, 1064], [-517, 432, 342, -872, -548, 795], [-669, 463, 380, -950, -839, 697], [-527, 469, 396, -837, -695, 944], [-398, 524, 451, -1206, 132, 814], [-545, 438, 381, -1061, -1258, 457], [-740, 424, 290, -1010, -789, 510], [-598, 441, 352, -967, -1132, 609], [-522, 525, 468, -712, -829, 1199], [-445, 512, 440, -999, -586, 957], [-524, 436, 373, -947, -587, 784], [-579, 441, 387, -755, -922, 888], [-628, 481, 440, -1004, -1109, 748], [-763, 454, 309, -245, -2472, 896], [-614, 433, 341, -1145, -803, 518], [-625, 446, 342, -796, -1013, 948], [-856, 435, 240, -266, -1530, 1352]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [61, 703, 20, 2571, -848, -1239], [32, 742, 111, 3011, -638, -735], [25, 723, 82, -331, 1686, -2191], [16, 753, 141, 2659, -1430, -470], [-8, 730, 154, 1805, -1965, -855], [45, 716, 104, -977, 1455, -1909], [-89, 763, 83, -609, 388, -2578], [-64, 770, -15, -334, -678, -2836], [-47, 775, 203, -310, 1254, 3083], [-27, 754, 214, -3054, -1086, -306], [-68, 774, 204, -3018, -970, -523], [-69, 781, 95, -393, -151, -3129], [-25, 754, -40, -620, -829, 3061], [-6, 700, 145, -132, 1795, -1142], [-75, 778, 254, -1324, 845, -1994], [-34, 731, 240, -733, 890, -2628], [-33, 65, 113, -1135, 35, -331], [-47, 730, 186, -1339, -979, -2201], [-63, 749, 205, -58, 1587, -1896], [-130, 750, 156, 165, 74, -2615], [-158, 708, 142, 368, -423, -2399], [-67, 757, 169, 533, 901, -2830], [-131, 759, 118, 40, 4, -2421], [-37, 745, 225, 679, 1249, -2399], [-124, 712, 156, 288, -242, -2364], [-112, 745, 128, 136, 117, -2307], [-6, 752, -127, -337, -657, -2578], [-85, 770, -28, 509, 208, -2297], [-90, 748, 194, 503, 243, -2237], [-46, 684, -16, 608, -220, -2240], [-104, 749, 34, -25, -411, -2405], [-82, 689, 52, 155, -416, -2218], [-142, 737, 56, 197, -604, -2206], [76, 678, -85, -342, -1320, -2794], [-68, 704, -66, -413, -1301, -2547], [259, 766, -238, 2332, 1332, -303], [-90, 702, 70, -207, -896, -2276], [-87, 731, 58, 149, -878, -2167], [155, 464, 279, -2360, -294, -1031], [-61, 701, 20, -87, -1177, -2010], [-97, 718, -43, -169, -1293, -2434], [6, 705, -65, 70, -1101, -2452], [-66, 735, 10, 520, -156, -2097], [-91, 736, 60, 363, -266, -2277], [129, 682, -179, -423, -1632, -2212], [54, 649, -177, -364, -1626, -2348], [97, 654, -147, 2654, 1371, -674], [29, 653, -89, -376, -1798, -2173], [-1, 685, -87, -21, -1660, -2596], [280, 662, -103, 469, -1163, -2139], [12, 701, -71, 970, -342, -2065], [44, 720, -94, 897, 32, -2152], [165, 681, -156, -603, -1784, -2318], [142, 704, -141, 548, -717, -2219], [171, 685, -155, 335, -1111, -2045], [90, 721, -124, 795, -703, -2433], [269, 722, -181, 2544, 1155, -484], [157, 683, -161, 160, -1180, -2198], [192, 686, -167, 109, -1148, -2010], [197, 680, -166, -279, -1494, -1867], [305, 736, -207, 2625, 974, -698], [293, 747, -173, 2801, 762, -293], [356, 717, -149, -324, -2133, -2250], [312, 693, -136, -269, -2102, -2335], [371, 671, -67, 2134, -54, -510], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [42, 729, 26, -43, 204, 1979], [35, 675, 91, -1625, 1067, 2018], [-8, 696, 54, -423, -1096, 905], [161, 818, -64, -1817, 1539, 669], [-34, 671, 87, 887, -491, 1884], [-3, 650, 196, -961, 618, 1998], [-155, 588, 246, -1350, 963, 731], [49, 731, 0, -1812, 1682, 913], [18, 675, 48, 1222, -1305, 1736], [15, 641, 128, -164, -172, 1729], [-97, 661, 203, -1640, 706, 869], [-64, 687, 253, -1847, 982, 585], [-127, 645, 383, -1178, 1718, 435], [-164, 576, 218, -939, -84, 1107], [-60, 607, 156, 320, -1239, 1111], [-262, 610, 426, -1490, 890, 303], [-101, 614, 268, -1433, 815, 880], [-106, 613, 189, -1408, 886, 1016], [-53, 671, 301, -1568, 855, 840], [-145, 569, 313, -1934, 986, 1465], [-115, 647, 341, -1478, 624, 1222], [-176, 599, 341, -1517, 483, 660], [-129, 628, 283, -1427, 487, 648], [-146, 569, 267, -499, -220, 1423], [-182, 598, 292, -1492, 956, 563], [-75, 621, 288, -618, -829, 1102], [-442, 539, 427, -1712, 111, 447], [-146, 607, 329, -1198, 748, 1736], [-205, 558, 326, 740, -1507, 1648], [-376, 553, 450, -963, 201, 1071], [-248, 566, 356, -942, -760, 1042], [-445, 497, 412, -949, -66, 1189], [-281, 495, 343, -455, -1199, 750], [-123, 641, 396, -1580, 720, 1857], [-378, 506, 397, -1010, -1291, 752], [-125, 625, 333, -1149, 35, 1045], [-540, 486, 449, -954, -655, 700], [-330, 525, 374, -1125, 520, 1367], [-176, 592, 452, -682, 298, 1850], [-362, 546, 419, 163, -1173, 1449], [-312, 526, 352, -879, -356, 1086], [-516, 528, 456, -354, -1509, 1103], [-474, 462, 388, -1011, -303, 847], [-611, 464, 385, -958, -752, 692], [-469, 478, 398, -857, -521, 973], [-343, 539, 437, -1286, 405, 801], [-501, 463, 408, -1080, -1171, 497], [-689, 427, 311, -1025, -620, 503], [-552, 457, 380, -1020, -905, 649], [-478, 550, 498, -873, -555, 1194], [-380, 544, 467, -1109, -353, 969], [-464, 464, 405, -1e3, -455, 819], [-528, 456, 403, -813, -688, 933], [-576, 489, 449, -1066, -859, 749], [-732, 466, 342, -301, -2289, 933], [-557, 454, 364, -1202, -623, 536], [-574, 465, 373, -852, -864, 956], [-811, 442, 263, -527, -1118, 1327]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [32, 741, 108, 2594, -1269, -493], [18, 718, 116, 1775, -1875, -896], [52, 710, 68, -1029, 1523, -1857], [-72, 749, 111, -709, 539, -2502], [-71, 777, 18, -527, -432, -2968], [-26, 770, 187, 2750, -1634, 86], [-13, 751, 189, -3101, -934, -302], [-44, 771, 193, -3079, -819, -556], [-58, 777, 128, -579, 109, 3114], [-37, 745, 11, -662, -737, 3054], [19, 692, 124, -270, 1841, -1068], [-61, 771, 246, -1637, 874, -1914], [-15, 727, 240, -781, 1235, -2562], [-37, 82, 128, -1360, 8, -451], [-37, 714, 187, 1463, 2109, -743], [-43, 743, 197, -66, 1827, -1821], [-127, 761, 181, 184, 268, -2701], [-162, 722, 165, 578, -40, -2536], [-44, 766, 170, -2711, -1864, -104], [-136, 758, 151, -35, 138, -2408], [-24, 748, 237, -2588, -1310, -683], [-131, 725, 185, 402, -41, -2425], [-115, 749, 169, 109, 210, -2313], [-26, 756, -93, -396, -545, -2594], [-107, 781, 15, 441, 244, -2285], [-88, 754, 222, 494, 372, -2262], [-83, 702, 32, 669, 8, -2328], [-111, 761, 81, -64, -281, -2451], [-104, 704, 98, 299, -149, -2279], [-156, 750, 95, 226, -327, -2285], [29, 660, -46, -262, -1245, -2746], [-93, 721, -30, -360, -1046, -2623], [222, 759, -228, 2236, 1554, -314], [-113, 714, 117, -146, -775, -2278], [-114, 744, 106, 180, -703, -2199], [196, 496, 277, -2536, -345, -1046], [-85, 718, 74, 21, -970, -2012], [-126, 730, -8, -120, -993, -2498], [-25, 711, -16, 101, -939, -2455], [-101, 747, 65, 483, -106, -2105], [-95, 736, 108, 297, -44, -2282], [90, 694, -173, -327, -1373, -2262], [15, 667, -164, -181, -1272, -2418], [53, 666, -126, -323, -1490, -2446], [-31, 656, -67, -239, -1575, -2139], [-43, 686, -53, 22, -1518, -2568], [228, 675, -120, 518, -985, -2218], [-28, 706, -29, 1009, -198, -2083], [5, 736, -45, 797, 70, -2143], [109, 673, -130, -534, -1663, -2278], [95, 710, -103, 585, -592, -2234], [115, 681, -142, 455, -908, -2058], [39, 732, -104, 733, -513, -2456], [218, 710, -182, 2536, 1335, -527], [104, 689, -153, 260, -914, -2243], [134, 688, -154, 255, -842, -2038], [136, 674, -140, -77, -1228, -1850], [258, 720, -197, 2598, 1062, -727], [247, 730, -175, 2758, 861, -314], [311, 707, -153, -344, -2059, -2233], [269, 688, -152, -239, -1855, -2310], [331, 660, -103, 2134, 73, -545], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-14, 693, 11, 772, -399, 1873], [48, 690, 155, -844, 593, 2008], [-131, 596, 186, -1329, 966, 813], [62, 745, -74, -1836, 1838, 881], [42, 704, -22, 513, -501, 1714], [55, 669, 74, -266, 44, 1799], [-60, 684, 139, -1659, 748, 858], [-45, 698, 200, -1883, 1107, 527], [-108, 643, 328, -1170, 1791, 428], [-114, 604, 162, -857, -149, 1136], [-8, 642, 103, 470, -1309, 1110], [-224, 615, 392, -1493, 1005, 266], [-72, 641, 211, -1464, 888, 885], [-63, 639, 123, -1413, 908, 1049], [-11, 692, 262, -1620, 1004, 806], [-77, 613, 296, 801, -1683, 1698], [-67, 680, 312, -1672, 951, 1162], [-143, 619, 299, -1591, 671, 651], [-80, 659, 244, -1488, 621, 635], [-85, 610, 227, -598, -33, 1486], [-141, 610, 249, -1515, 1047, 583], [-25, 653, 254, -627, -733, 1149], [-390, 537, 390, -1714, 168, 441], [-102, 620, 282, -1122, 739, 1742], [-142, 589, 292, 400, -1092, 1675], [-331, 552, 410, -969, 338, 1064], [-201, 587, 314, -942, -677, 1069], [-389, 505, 401, -1008, 165, 1218], [-225, 512, 313, -285, -1208, 767], [-80, 659, 368, -1439, 699, 1828], [-324, 523, 372, -969, -1186, 789], [-63, 660, 306, -1303, 319, 1054], [-487, 488, 440, -957, -540, 703], [-269, 543, 347, -1347, 857, 1394], [-118, 615, 442, -528, 257, 1851], [-307, 553, 405, 88, -974, 1464], [-251, 546, 326, -863, -246, 1154], [-461, 533, 446, -456, -1237, 1120], [-427, 495, 422, -1094, -159, 860], [-550, 466, 384, -961, -572, 696], [-409, 489, 389, -861, -412, 1004], [-288, 554, 409, -1342, 605, 792], [-456, 488, 427, -1147, -947, 583], [-628, 430, 324, -1028, -526, 509], [-502, 473, 400, -1056, -764, 675], [-434, 573, 520, -1115, -121, 1156], [-316, 573, 478, -1188, -189, 971], [-402, 494, 427, -1103, -229, 863], [-471, 473, 407, -845, -570, 957], [-523, 496, 449, -1115, -629, 748], [-694, 476, 368, -363, -2106, 962], [-495, 476, 378, -1264, -429, 556], [-520, 483, 397, -942, -620, 968], [-760, 447, 281, -668, -857, 1296]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-68, 777, 54, -729, -185, -3045], [-4, 762, 162, 2717, -1535, 91], [1, 746, 154, -3132, -833, -304], [-20, 767, 178, 3130, -611, -614], [-42, 770, 153, -666, 228, 3111], [-46, 735, 61, -716, -618, 3050], [40, 688, 95, -476, 1942, -954], [-44, 762, 224, -1763, 866, -1885], [4, 723, 230, 2341, -1439, -679], [-37, 103, 140, -1808, -112, -652], [-26, 700, 184, 962, 2214, -385], [-22, 735, 180, -37, 1983, -1782], [-118, 771, 198, 185, 466, -2796], [-158, 735, 182, 738, 428, -2837], [-16, 769, 157, -2786, -1677, -21], [-135, 757, 178, -112, 280, -2385], [-10, 749, 234, -2685, -927, -677], [-130, 737, 205, 585, 363, -2626], [-114, 751, 202, 36, 456, -2321], [-43, 758, -59, -509, -368, -2608], [-124, 789, 55, 253, 336, -2244], [-84, 758, 243, 431, 792, -2338], [-105, 722, 79, 698, 209, -2423], [-109, 769, 122, -149, -53, -2522], [-115, 719, 135, 424, 127, -2379], [-157, 761, 129, 225, -149, -2342], [-16, 647, -4, -177, -1159, -2704], [-108, 738, 12, -330, -763, -2724], [183, 748, -207, 2179, 1725, -340], [-130, 726, 159, -85, -656, -2285], [-129, 754, 145, 203, -514, -2239], [238, 525, 265, -2855, -424, -1038], [-101, 734, 123, 114, -789, -2022], [-144, 741, 28, -97, -692, -2575], [-52, 718, 41, 122, -819, -2460], [-127, 757, 115, 417, -18, -2117], [-88, 735, 145, 233, 170, -2278], [55, 707, -158, -278, -1161, -2320], [-18, 688, -143, -81, -991, -2522], [13, 682, -99, -272, -1388, -2453], [-85, 665, -38, -65, -1265, -2129], [-79, 690, -14, 77, -1337, -2545], [173, 692, -133, 528, -830, -2293], [-65, 710, 15, 1034, -68, -2101], [-32, 749, 9, 664, 70, -2117], [56, 670, -101, -346, -1368, -2213], [46, 718, -56, 587, -558, -2238], [62, 681, -124, 648, -547, -2109], [-8, 742, -74, 696, -435, -2459], [166, 698, -174, 2567, 1543, -578], [54, 698, -135, 298, -756, -2277], [78, 692, -134, 358, -594, -2078], [77, 673, -110, 160, -929, -1850], [210, 705, -181, 2590, 1157, -764], [201, 712, -171, 2733, 967, -350], [265, 696, -153, -340, -1858, -2184], [219, 685, -156, -206, -1750, -2302], [288, 652, -134, 2187, 308, -627], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [91, 700, 17, -285, 140, 1847], [-23, 707, 73, -1684, 803, 840], [-30, 706, 139, -1902, 1185, 486], [-92, 641, 272, -1169, 1840, 429], [-64, 636, 106, -793, -200, 1156], [39, 685, 43, 598, -1350, 1118], [-189, 618, 350, -1495, 1107, 243], [-45, 667, 151, -1515, 1006, 886], [-21, 668, 57, -1420, 933, 1096], [26, 711, 219, -1687, 1237, 741], [-17, 657, 271, 649, -1481, 1726], [-24, 709, 276, -1741, 1091, 1120], [-113, 640, 247, -1641, 800, 638], [-35, 688, 198, -1536, 728, 616], [-28, 655, 179, -917, 338, 1509], [-102, 625, 198, -1535, 1108, 608], [18, 685, 213, -703, -517, 1222], [-340, 535, 351, -1700, 261, 462], [-62, 632, 235, -981, 740, 1770], [-83, 621, 251, 217, -791, 1730], [-288, 552, 364, -953, 438, 1081], [-155, 609, 264, -929, -590, 1102], [-332, 515, 380, -1091, 412, 1264], [-171, 540, 276, -133, -1224, 778], [-41, 676, 335, -1263, 655, 1800], [-271, 543, 341, -938, -1142, 808], [-7, 693, 270, -1464, 620, 1035], [-434, 490, 425, -948, -355, 723], [-208, 565, 310, -1509, 1079, 1408], [-66, 637, 426, -255, 188, 1859], [-254, 561, 381, 194, -873, 1496], [-191, 570, 293, -854, -184, 1196], [-407, 537, 429, -515, -1027, 1127], [-381, 527, 446, -1185, -1, 860], [-485, 467, 374, -942, -454, 721], [-348, 503, 372, -855, -279, 1064], [-236, 569, 370, -1372, 717, 791], [-410, 514, 436, -1242, -703, 651], [-564, 434, 333, -1026, -482, 522], [-450, 490, 411, -1114, -544, 716], [-389, 592, 531, -1244, 151, 1108], [-255, 600, 484, -1331, 112, 958], [-341, 525, 440, -1164, -103, 878], [-416, 491, 407, -910, -351, 1001], [-466, 502, 436, -1142, -439, 754], [-655, 484, 390, -414, -1962, 981], [-427, 500, 380, -1316, -266, 576], [-464, 501, 413, -989, -490, 975], [-703, 449, 295, -750, -664, 1266]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [5, 758, 151, 3080, -439, -670], [-24, 759, 168, -948, 622, -3105], [-44, 722, 105, -819, -394, 3060], [56, 690, 58, -583, 1987, -897], [-26, 751, 199, -1918, 843, -1854], [22, 719, 208, 2352, -1220, -723], [-32, 130, 146, -2149, -250, -782], [-13, 689, 167, 751, 2310, -251], [-1, 728, 162, 74, 2269, -1732], [-107, 778, 211, 82, 1024, -3050], [-145, 747, 189, 753, 745, -3102], [10, 771, 141, -2874, -1486, 46], [-128, 754, 197, -288, 641, -2297], [4, 749, 226, -2768, -589, -695], [-124, 748, 217, 655, 654, -2838], [-103, 751, 221, -85, 863, -2306], [-52, 756, -15, -573, -291, -2609], [-131, 791, 91, 123, 394, -2210], [-74, 759, 249, 318, 1248, -2396], [-114, 741, 120, 702, 307, -2474], [-96, 772, 153, -256, 192, -2581], [-117, 734, 164, 515, 430, -2538], [-152, 769, 158, 189, 162, -2445], [-57, 644, 42, -66, -1047, -2662], [-111, 752, 55, -327, -578, -2796], [144, 735, -178, 2154, 1857, -371], [-142, 737, 193, 59, -357, -2325], [-134, 762, 176, 213, -216, -2309], [279, 550, 240, -3004, -440, -1017], [-110, 748, 165, 262, -477, -2058], [-147, 750, 65, -98, -478, -2634], [-71, 725, 94, 143, -689, -2468], [-142, 764, 156, 372, 41, -2123], [-73, 732, 172, 174, 376, -2265], [25, 720, -138, -271, -967, -2388], [-43, 711, -111, -54, -772, -2636], [-22, 700, -67, -179, -1120, -2506], [-131, 676, -5, 43, -1070, -2137], [-105, 697, 29, 143, -1135, -2530], [112, 714, -135, 500, -735, -2333], [-94, 715, 60, 1068, 162, -2138], [-62, 757, 71, 573, 65, -2099], [5, 673, -65, -174, -1087, -2191], [-2, 726, -8, 568, -517, -2241], [13, 685, -98, 703, -414, -2137], [-48, 749, -37, 644, -344, -2457], [113, 689, -155, -505, -1400, -2521], [8, 709, -112, 314, -536, -2329], [25, 701, -101, 409, -371, -2124], [20, 676, -75, 369, -645, -1867], [164, 690, -162, 2611, 1276, -816], [154, 695, -161, 2739, 1155, -441], [215, 686, -145, -238, -1624, -2135], [172, 683, -159, -123, -1551, -2295], [240, 649, -158, 2293, 562, -709], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-14, 673, 46, -705, -257, 1186], [80, 732, -22, 803, -1417, 1127], [-158, 620, 302, -1498, 1204, 234], [-20, 695, 85, -1542, 1068, 877], [23, 703, -14, -1431, 962, 1148], [53, 727, 165, -1727, 1437, 673], [37, 699, 243, 548, -1284, 1789], [15, 736, 238, -1802, 1249, 1056], [-86, 660, 187, -1672, 883, 626], [7, 716, 147, -1583, 839, 587], [24, 700, 128, -1542, 1026, 1506], [-65, 643, 144, -1571, 1197, 660], [54, 716, 166, -791, -353, 1259], [-288, 535, 305, -1680, 279, 499], [-28, 648, 179, -879, 769, 1807], [-30, 656, 201, 205, -714, 1761], [-244, 554, 306, -919, 452, 1114], [-111, 634, 206, -916, -561, 1117], [-276, 530, 348, -1145, 537, 1296], [-121, 576, 233, -19, -1231, 789], [-8, 691, 296, -942, 532, 1764], [-219, 565, 305, -878, -1092, 835], [40, 722, 222, -1544, 777, 1012], [-382, 494, 401, -926, -259, 753], [-150, 590, 269, 1312, -1653, 1722], [-21, 657, 401, 55, 122, 1875], [-204, 570, 348, 699, -1207, 1522], [-134, 599, 251, -854, -118, 1235], [-352, 540, 402, -528, -869, 1133], [-336, 558, 462, -1305, 211, 842], [-418, 472, 356, -907, -406, 760], [-289, 520, 349, -843, -210, 1109], [-187, 585, 326, -1408, 843, 798], [-362, 539, 432, -1319, -529, 684], [-498, 440, 337, -1010, -387, 588], [-396, 508, 410, -1190, -292, 758], [-347, 608, 535, -1326, 361, 1058], [-198, 624, 473, -1421, 314, 936], [-283, 555, 445, -1262, 92, 889], [-361, 510, 398, -986, -128, 1045], [-407, 508, 414, -1146, -360, 761], [-614, 492, 408, -532, -1614, 1010], [-358, 525, 374, -1345, -173, 590], [-408, 518, 423, -1036, -365, 983], [-635, 449, 303, -772, -585, 1255]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-8, 739, 164, -2032, 815, -1835], [38, 715, 183, 2370, -1042, -756], [-19, 168, 148, -2229, -289, -852], [0, 680, 145, 612, 2386, -175], [18, 721, 134, 179, 2460, -1711], [-89, 782, 212, -79, 1461, 3099], [-127, 757, 191, 686, 1058, 2930], [34, 769, 119, -3029, -1187, 112], [-114, 749, 207, -402, 952, -2194], [17, 748, 213, -2847, -211, -738], [-115, 758, 224, -2567, -1872, 196], [-87, 749, 229, -225, 1457, -2233], [-58, 752, 29, -694, -147, -2599], [-131, 791, 124, -37, 456, -2163], [-62, 759, 248, 96, 2002, -2400], [-117, 758, 154, 700, 395, -2521], [-77, 772, 175, -366, 419, -2614], [-111, 747, 183, 533, 851, -2827], [-139, 775, 179, 89, 553, -2562], [-90, 647, 83, 140, -838, -2617], [-105, 763, 95, -352, -290, -2908], [106, 721, -140, 2159, 1977, -407], [-142, 746, 215, 144, -159, -2369], [-127, 766, 194, 158, 288, -2434], [316, 574, 210, -3106, -429, -990], [-108, 759, 192, 352, -258, -2099], [-142, 756, 98, -110, -308, -2681], [-82, 731, 139, 157, -596, -2475], [-151, 768, 192, 265, 182, -2133], [-58, 730, 193, 123, 568, -2247], [0, 733, -111, -303, -801, -2453], [-62, 734, -74, -89, -574, -2761], [-52, 720, -27, -164, -928, -2578], [-164, 690, 29, 235, -707, -2184], [-120, 705, 70, 218, -913, -2526], [52, 736, -125, 459, -671, -2353], [-110, 721, 101, 1084, 395, -2182], [-83, 760, 124, 482, 58, -2083], [-41, 684, -18, -44, -835, -2200], [-47, 732, 49, 534, -454, -2245], [-32, 692, -67, 755, -228, -2180], [-83, 753, 4, 598, -269, -2451], [61, 684, -125, -403, -1175, -2487], [-32, 721, -78, 287, -341, -2373], [-25, 714, -56, 405, -228, -2153], [-33, 682, -36, 565, -314, -1910], [118, 679, -137, -426, -1647, -2233], [108, 681, -142, -342, -1779, -2592], [160, 680, -128, -32, -1333, -2100], [124, 685, -153, 47, -1164, -2314], [188, 652, -172, 2386, 744, -752], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [61, 740, -79, -1451, 1005, 1212], [74, 741, 104, -1739, 1522, 642], [84, 737, 208, 539, -1134, 1884], [49, 759, 196, -1834, 1373, 991], [-59, 682, 116, -1675, 891, 623], [44, 741, 93, -1627, 952, 548], [72, 743, 70, 1193, -1631, 1673], [-29, 665, 86, -1606, 1267, 710], [84, 744, 115, -939, -125, 1288], [-236, 540, 255, -1615, 256, 605], [2, 666, 118, -823, 814, 1848], [19, 690, 148, 253, -636, 1819], [-202, 559, 245, -804, 370, 1196], [-68, 659, 147, -899, -542, 1129], [-223, 547, 312, -1307, 812, 1365], [-74, 617, 184, 26, -1226, 798], [17, 703, 248, -679, 407, 1748], [-169, 590, 262, -814, -1055, 860], [82, 749, 172, -1648, 1004, 963], [-329, 501, 368, -873, -156, 817], [-94, 619, 220, 990, -1239, 1733], [14, 675, 366, 295, 85, 1892], [-158, 583, 303, 1222, -1657, 1522], [-80, 630, 206, -893, 27, 1291], [-296, 543, 362, -500, -833, 1138], [-294, 586, 469, -1406, 403, 808], [-349, 482, 331, -862, -400, 803], [-232, 540, 321, -825, -153, 1158], [-142, 602, 279, -1457, 999, 819], [-317, 563, 424, -1391, -377, 702], [-428, 453, 334, -990, -347, 652], [-342, 527, 400, -1270, -50, 791], [-305, 622, 529, -1412, 696, 950], [-147, 646, 454, -1539, 607, 887], [-228, 585, 437, -1371, 306, 886], [-305, 532, 375, -1030, -11, 1067], [-349, 515, 389, -1137, -233, 792], [-565, 496, 414, -602, -1402, 1019], [-288, 551, 360, -1396, -12, 618], [-353, 535, 424, -1092, -213, 993], [-564, 450, 307, -764, -537, 1260]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [13, 675, 115, 401, 2512, -86], [35, 714, 104, -2715, -306, -1457], [-69, 783, 206, 2863, -1233, 94], [-107, 765, 188, 583, 1313, 2766], [53, 760, 86, -3102, -1044, 124], [-97, 743, 209, -464, 1267, -2085], [28, 745, 190, -2877, -18, -768], [-99, 765, 220, -2648, -1678, 319], [-68, 746, 227, -266, 1764, -2181], [-52, 742, 74, -774, -51, -2584], [-123, 786, 149, -177, 500, -2120], [-47, 757, 237, 34, 2229, -2377], [-116, 772, 181, 685, 546, -2606], [-56, 769, 190, -458, 603, -2626], [-97, 758, 192, -2760, -1771, 29], [-119, 777, 192, 17, 761, -2610], [-112, 657, 118, 249, -729, -2609], [-86, 769, 128, -423, 59, -3029], [69, 707, -90, 2190, 2044, -435], [-138, 753, 230, 259, 177, -2480], [-115, 767, 205, 54, 706, -2518], [349, 595, 178, 3019, -353, -926], [-103, 768, 214, 432, -5, -2165], [-132, 762, 127, -158, 32, -2770], [-88, 736, 176, 173, -486, -2485], [-148, 769, 214, 158, 320, -2135], [-39, 727, 204, 51, 898, -2204], [-22, 744, -81, -391, -605, -2533], [-72, 755, -30, -163, -455, -2849], [-75, 740, 20, -170, -710, -2667], [-187, 705, 62, 391, -346, -2279], [-127, 714, 106, 266, -770, -2531], [-3, 756, -114, 389, -589, -2369], [-114, 727, 135, 1079, 674, -2240], [-96, 761, 168, 357, 43, -2062], [-81, 699, 36, 24, -695, -2213], [-83, 737, 99, 515, -420, -2247], [-70, 700, -30, 775, -12, -2232], [-111, 755, 43, 495, -95, -2428], [13, 684, -85, -351, -1063, -2478], [-65, 733, -35, 232, -201, -2398], [-68, 726, -4, 362, -73, -2179], [-80, 690, 8, 666, -93, -1958], [72, 673, -104, -324, -1489, -2180], [62, 674, -110, -236, -1564, -2494], [101, 682, -101, 87, -1178, -2095], [78, 692, -134, 119, -979, -2340], [137, 661, -177, 2487, 933, -780], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-32, 704, 46, -1673, 881, 621], [75, 764, 32, -1691, 1144, 467], [112, 782, 10, 1041, -1397, 1724], [8, 694, 19, -1622, 1295, 732], [109, 769, 59, -1135, 157, 1306], [-182, 555, 204, -1541, 201, 703], [27, 688, 49, -815, 832, 1863], [62, 724, 88, 306, -619, 1851], [-158, 575, 181, -690, 254, 1245], [-25, 687, 81, -890, -531, 1136], [-172, 569, 270, -1469, 1032, 1403], [-30, 660, 133, 67, -1201, 821], [38, 714, 197, -499, 317, 1742], [-119, 621, 211, -764, -1026, 880], [117, 773, 116, -1691, 1114, 931], [-278, 514, 325, -831, -137, 857], [-41, 653, 161, 796, -956, 1762], [41, 691, 321, 438, 70, 1904], [-115, 597, 254, -1399, 1047, 1644], [-29, 663, 155, -954, 149, 1316], [-242, 548, 320, -354, -859, 1150], [-254, 612, 470, -1495, 588, 758], [-283, 496, 305, -753, -428, 891], [-179, 563, 290, -807, -92, 1214], [-100, 622, 220, -1484, 1076, 835], [-274, 586, 406, -1493, -170, 712], [-359, 470, 329, -955, -303, 760], [-289, 547, 380, -1335, 137, 813], [-267, 632, 515, -1434, 983, 834], [-100, 664, 428, -1625, 867, 823], [-177, 612, 423, -1438, 442, 875], [-253, 554, 351, -1095, 150, 1098], [-292, 525, 353, -1106, -146, 839], [-514, 500, 412, -664, -1166, 1023], [-219, 579, 335, -1423, 66, 631], [-300, 552, 422, -1154, -52, 1002], [-490, 451, 308, -666, -584, 1310]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [67, 748, 48, 3109, -861, 112], [-79, 738, 209, -461, 1578, -1989], [37, 741, 156, -2893, 104, -788], [-82, 770, 212, -2866, -1278, 491], [-46, 742, 216, -278, 1974, -2145], [-43, 732, 112, -907, 110, -2544], [-115, 781, 171, -353, 540, -2065], [-32, 754, 218, -3141, -776, -783], [-112, 784, 202, 662, 670, -2676], [-33, 764, 197, -648, 984, -2602], [-77, 765, 188, -2956, -1387, 195], [-94, 777, 197, -127, 1121, -2661], [-127, 669, 147, 406, -570, -2617], [-61, 770, 151, -522, 389, -3114], [32, 695, -39, -895, -1032, -2676], [-131, 760, 240, 314, 908, -2846], [-97, 766, 206, -69, 1089, -2561], [375, 613, 137, 2900, -240, -862], [-95, 775, 229, 489, 548, -2375], [-112, 763, 147, -247, 419, -2847], [-87, 740, 202, 184, -402, -2494], [-143, 769, 232, -37, 575, -2117], [-21, 724, 208, -7, 1403, -2123], [-37, 753, -43, -459, -521, -2569], [-73, 771, 23, -202, -398, -2889], [-84, 756, 72, -183, -590, -2717], [-193, 720, 93, 456, -138, -2359], [-130, 722, 137, 336, -553, -2549], [-52, 772, -95, 276, -476, -2380], [-108, 732, 160, 1032, 1045, -2317], [-103, 759, 201, 279, 31, -2049], [-110, 715, 87, 95, -545, -2235], [-111, 740, 142, 483, -363, -2249], [-101, 711, 12, 775, 237, -2297], [-126, 754, 80, 375, 117, -2382], [-31, 688, -42, -253, -822, -2475], [-91, 743, 15, 201, -126, -2409], [-98, 737, 55, 321, 60, -2198], [-115, 703, 54, 715, 42, -1995], [29, 672, -67, -130, -1209, -2122], [20, 675, -69, -162, -1429, -2447], [42, 688, -69, 178, -1039, -2098], [35, 702, -108, 185, -728, -2388], [89, 671, -179, 2562, 1078, -789], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [125, 790, 4, -1526, 703, 1297], [-127, 577, 153, -1493, 164, 756], [50, 711, -19, -773, 916, 1937], [99, 757, 25, 407, -572, 1916], [-113, 596, 119, -544, 98, 1284], [17, 715, 17, -873, -498, 1154], [-123, 594, 226, -1639, 1240, 1426], [12, 704, 76, 76, -1162, 850], [54, 723, 143, -356, 247, 1741], [-69, 656, 150, -740, -997, 898], [144, 793, 56, -1755, 1312, 860], [-229, 532, 282, -717, -164, 940], [9, 691, 92, 758, -874, 1781], [63, 705, 274, 643, 60, 1924], [-75, 614, 205, -1158, 885, 1688], [18, 697, 99, -1098, 376, 1337], [-189, 560, 267, -209, -942, 1152], [-217, 635, 465, -1614, 899, 634], [-218, 518, 276, -634, -476, 970], [-128, 591, 251, -803, 16, 1292], [-60, 646, 156, -1499, 1118, 848], [-232, 606, 384, -1593, 33, 705], [-291, 494, 321, -929, -258, 860], [-236, 569, 349, -1373, 244, 825], [-231, 637, 484, -1432, 1068, 800], [-59, 680, 391, -1662, 1011, 781], [-131, 637, 404, -1521, 617, 851], [-203, 577, 320, -1157, 291, 1121], [-236, 539, 309, -1051, -107, 897], [-461, 503, 404, -680, -996, 1030], [-153, 608, 305, -1449, 144, 643], [-250, 568, 411, -1237, 162, 1012], [-411, 460, 307, -364, -855, 1389]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-61, 773, 194, -2966, -1115, 531], [-24, 737, 199, -276, 2198, -2108], [-27, 720, 138, -1072, 318, -2466], [-103, 774, 188, -619, 564, -1985], [-15, 749, 193, 3113, -643, -804], [-105, 793, 218, 446, 1256, -2951], [-9, 756, 191, -791, 1297, -2537], [-53, 770, 177, -3119, -1109, 258], [-65, 773, 192, -191, 1272, -2669], [-138, 681, 171, 741, -231, -2710], [-29, 766, 162, -601, 611, 3133], [-6, 688, 20, -825, -961, -2644], [-118, 765, 241, 221, 1299, -3046], [-77, 764, 201, -154, 1336, -2567], [388, 629, 89, 2811, -91, -800], [-82, 780, 235, 402, 1003, -2576], [-86, 762, 160, -348, 774, -2885], [-85, 743, 224, 217, -82, -2533], [-131, 767, 240, -258, 876, -2064], [-1, 721, 198, -1, 1764, -2067], [-49, 759, -3, -521, -471, -2594], [-69, 783, 72, -273, -297, -2950], [-83, 767, 117, -206, -455, -2772], [-195, 735, 120, 509, 234, -2547], [-128, 730, 164, 398, -347, -2578], [-93, 783, -68, 130, -344, -2376], [-95, 736, 175, -2236, -1579, -741], [-107, 756, 229, -6, -29, -2012], [-131, 730, 130, 192, -319, -2282], [-126, 741, 173, 464, -329, -2249], [-115, 722, 57, 754, 452, -2356], [-128, 750, 113, 258, 347, -2314], [-69, 695, 11, -200, -680, -2482], [-107, 751, 64, 153, -14, -2422], [-118, 746, 109, 304, 112, -2205], [-143, 715, 96, 763, 234, -2061], [-13, 678, -23, 40, -949, -2103], [-20, 680, -23, -101, -1311, -2419], [-14, 694, -37, 292, -801, -2119], [-4, 713, -77, 193, -611, -2414], [44, 683, -176, -391, -1661, -2378], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-67, 621, 59, -306, -153, 1321], [53, 745, -55, -843, -436, 1188], [-77, 622, 179, 1246, -1602, 1698], [51, 747, 16, 71, -1053, 926], [67, 732, 88, -81, 132, 1745], [-18, 695, 81, -740, -960, 916], [162, 807, -4, -1795, 1500, 777], [-180, 558, 234, -649, -201, 977], [56, 728, 21, 733, -745, 1827], [76, 718, 218, 753, 60, 1936], [-40, 636, 148, -1054, 846, 1734], [61, 732, 35, -1227, 564, 1343], [-138, 577, 212, -58, -1048, 1145], [-185, 653, 446, -1676, 1182, 478], [-154, 548, 244, -551, -507, 1021], [-81, 623, 206, -860, 168, 1350], [-22, 669, 94, -1532, 1195, 878], [-194, 625, 351, -1668, 189, 689], [-223, 529, 305, -923, -205, 930], [-187, 591, 315, -1402, 323, 834], [-198, 641, 451, -1424, 1196, 749], [-25, 693, 347, -1693, 1170, 731], [-89, 661, 381, -1642, 903, 785], [-155, 601, 284, -1212, 406, 1136], [-181, 560, 259, -969, -112, 963], [-406, 506, 385, -651, -870, 1044], [-92, 635, 272, -1515, 324, 663], [-204, 584, 393, -1378, 513, 1013], [-329, 479, 304, -82, -1119, 1421]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [1, 743, 157, 3095, -550, -819], [-91, 797, 222, -3059, -1208, -79], [14, 746, 176, 2248, -1576, -687], [-25, 771, 155, 3021, -875, 274], [-35, 767, 181, -268, 1452, -2666], [-139, 696, 185, 1014, 46, -2890], [2, 759, 164, 2388, -2132, 26], [-40, 689, 80, -747, -883, -2615], [-103, 768, 236, -3041, -1529, 25], [-56, 761, 192, -201, 1474, -2563], [393, 643, 39, 2747, 101, -740], [-66, 781, 230, 199, 1508, -2749], [-53, 757, 161, -416, 994, -2890], [-78, 745, 233, 234, 321, -2593], [-115, 763, 241, -509, 1269, -1955], [18, 718, 183, 52, 2174, -2015], [-56, 762, 39, -653, -366, -2635], [-62, 790, 116, -346, -197, -3003], [-76, 775, 153, -269, -195, -2868], [-185, 748, 141, 460, 648, -2789], [-120, 737, 183, 471, -55, -2638], [-123, 788, -32, -21, -213, -2356], [-74, 739, 178, -2377, -1136, -712], [-104, 751, 243, -305, -114, -1984], [-141, 743, 165, 244, -179, -2321], [-137, 742, 199, 436, -278, -2249], [-121, 733, 99, 733, 579, -2390], [-122, 744, 139, 180, 531, -2249], [-100, 704, 62, -123, -467, -2504], [-117, 757, 108, 107, 91, -2431], [-132, 754, 157, 259, 242, -2220], [-157, 727, 132, 779, 363, -2114], [-51, 691, 32, 247, -626, -2114], [-57, 687, 24, 30, -1064, -2384], [-64, 706, 7, 347, -647, -2141], [-39, 724, -41, 175, -483, -2443], [6, 698, -161, -326, -1487, -2411], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [32, 734, 8, -762, -864, 956], [167, 815, -60, -1813, 1704, 673], [-132, 588, 186, -502, -298, 1038], [90, 764, -55, 730, -673, 1857], [85, 729, 160, 850, 64, 1947], [-7, 661, 88, -975, 848, 1801], [93, 764, -31, -1356, 751, 1343], [-88, 597, 158, 89, -1156, 1129], [-156, 668, 420, -1685, 1293, 406], [-94, 583, 209, -420, -538, 1106], [-37, 660, 151, -1008, 398, 1384], [16, 699, 24, -1557, 1247, 900], [-158, 641, 312, -1728, 318, 670], [-159, 567, 284, -952, -91, 1010], [-141, 613, 277, -1468, 503, 853], [-168, 644, 415, -1411, 1328, 705], [4, 704, 300, -1711, 1289, 690], [-55, 681, 346, -1734, 1191, 685], [-111, 626, 244, -1347, 669, 1157], [-127, 588, 203, -922, -128, 994], [-347, 511, 355, -560, -837, 1066], [-36, 663, 228, -1587, 513, 673], [-164, 599, 363, -1442, 675, 1009], [-250, 501, 299, 415, -1579, 1441]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [4, 766, 122, 2921, -713, 266], [-5, 760, 166, -353, 1655, -2649], [-133, 711, 192, 1367, 410, 2910], [32, 750, 157, 2342, -2010, 19], [-67, 692, 129, -701, -835, -2601], [-85, 769, 225, 3112, -1247, 96], [-34, 756, 178, -273, 1689, -2546], [386, 655, -14, 2729, 205, -713], [-47, 779, 215, 124, 1661, -2781], [-20, 751, 157, -477, 1196, -2882], [-70, 746, 238, 139, 1431, -2742], [-96, 758, 233, -599, 1453, -1896], [35, 715, 157, 114, 2459, -1989], [-53, 758, 79, -755, -283, -2658], [-50, 792, 151, -486, -12, -3077], [-63, 776, 176, -332, 4, -2929], [-163, 759, 154, 399, 849, -2899], [-110, 743, 198, 536, 376, -2762], [-142, 788, 7, -121, -128, -2336], [-48, 740, 170, -2430, -974, -714], [-100, 746, 253, -983, -345, -1968], [-145, 755, 194, 297, -10, -2377], [-144, 742, 219, 389, -193, -2247], [-119, 742, 135, 703, 720, -2427], [-108, 737, 158, 105, 761, -2160], [-114, 715, 109, -43, -218, -2548], [-117, 759, 145, 67, 181, -2435], [-133, 758, 193, 201, 399, -2233], [-163, 738, 161, 761, 673, -2264], [-78, 709, 86, 441, -306, -2160], [-80, 700, 73, 94, -947, -2376], [-106, 717, 51, 411, -434, -2181], [-67, 735, 0, 116, -285, -2483], [-27, 714, -141, -243, -1120, -2523], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [89, 738, 100, 958, 74, 1959], [23, 692, 21, -935, 865, 1852], [121, 791, -89, -1413, 834, 1341], [-40, 624, 101, 202, -1237, 1111], [-131, 681, 389, -1677, 1514, 256], [-37, 626, 167, -349, -519, 1173], [4, 698, 92, -1133, 562, 1388], [49, 731, -49, -1605, 1343, 936], [-125, 656, 271, -1791, 465, 641], [-98, 608, 258, -1041, 97, 1078], [-97, 638, 227, -1510, 612, 862], [-142, 644, 373, -1391, 1475, 662], [28, 713, 248, -1721, 1388, 658], [-27, 697, 301, -1771, 1370, 605], [-70, 655, 191, -1419, 802, 1158], [-74, 622, 144, -875, -144, 1023], [-289, 521, 319, -445, -884, 1083], [13, 691, 174, -1628, 619, 673], [-127, 615, 329, -1505, 837, 1002], [-175, 527, 292, 941, -2054, 1433]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [59, 740, 145, 2212, -1649, -33], [-88, 695, 170, -609, -743, -2580], [-62, 767, 201, 3061, -1145, 111], [-10, 748, 153, -307, 1795, -2532], [368, 667, -65, 2712, 433, -660], [-28, 775, 197, 24, 1856, -2806], [13, 743, 145, 2579, -1648, -293], [-57, 746, 229, 93, 1700, -2758], [-73, 751, 218, -659, 1626, -1842], [47, 714, 119, -2955, -410, -1169], [-46, 752, 113, -957, -117, -2682], [-35, 788, 175, -612, 148, -3118], [-48, 776, 194, -517, 477, -3017], [-137, 768, 164, 257, 1187, -3048], [-93, 748, 202, 542, 763, -2893], [-152, 785, 45, -240, -27, -2304], [-22, 740, 159, -2487, -799, -722], [-92, 741, 255, -1684, -559, -2017], [-143, 765, 214, 364, 380, -2547], [-147, 742, 234, 258, 48, -2228], [-111, 750, 164, 614, 1043, -2497], [-92, 730, 171, 63, 1039, -2055], [-116, 726, 146, -8, -97, -2575], [-113, 761, 175, -33, 401, -2435], [-128, 761, 219, 95, 676, -2243], [-158, 747, 180, 644, 1042, -2455], [-93, 729, 133, 503, -195, -2186], [-98, 713, 115, 228, -707, -2377], [-131, 729, 91, 443, -307, -2209], [-84, 743, 48, 84, -189, -2499], [-51, 730, -110, -237, -936, -2599], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-111, 688, 347, -1649, 1673, 147], [15, 676, 115, -353, -457, 1214], [43, 736, 28, -1354, 848, 1376], [72, 759, -106, -1653, 1431, 965], [-94, 669, 224, -1857, 638, 600], [-43, 652, 221, -1209, 376, 1118], [-56, 663, 171, -1534, 672, 865], [-121, 642, 321, -1377, 1603, 643], [46, 720, 193, -1732, 1560, 604], [-6, 711, 248, -1788, 1523, 527], [-31, 683, 134, -1477, 911, 1151], [-23, 656, 86, -815, -152, 1065], [-232, 536, 279, -196, -1043, 1097], [56, 718, 116, -1666, 718, 668], [-94, 630, 290, -1580, 1037, 989], [-105, 556, 281, -1749, 712, 1740]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [339, 678, -112, 2714, 568, -632], [-8, 767, 166, 3111, -1182, -331], [44, 732, 119, 2517, -1396, -338], [-44, 744, 216, -3108, -1107, -382], [-48, 744, 195, -676, 1705, -1818], [55, 713, 75, -2917, -303, -1174], [-35, 742, 137, -1089, -9, -2681], [-19, 782, 192, -919, 535, -3130], [-29, 771, 197, 2378, -2083, -146], [-103, 773, 165, 176, 1350, -3100], [-76, 751, 203, -2675, -1853, -84], [-157, 780, 81, -439, 137, -2232], [4, 739, 140, -2537, -636, -737], [-84, 736, 255, 557, 2500, -970], [-135, 772, 227, 278, 1047, -2887], [-144, 741, 240, -61, 774, -2075], [-93, 755, 181, 484, 1415, -2548], [-72, 723, 178, 85, 1357, -1954], [-115, 736, 177, 60, 211, -2663], [-105, 760, 198, -210, 813, -2390], [-117, 761, 236, 3, 912, -2237], [-146, 755, 193, 387, 1530, -2649], [-102, 747, 173, 554, -97, -2214], [-107, 726, 149, 395, -396, -2413], [-148, 739, 126, 486, -58, -2276], [-92, 748, 91, 10, 21, -2526], [-70, 745, -73, -258, -800, -2665], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-66, 680, 164, -1877, 701, 587], [6, 698, 174, -1377, 633, 1114], [-18, 689, 114, -1588, 806, 865], [-104, 640, 259, -1374, 1714, 647], [59, 725, 132, -1734, 1645, 581], [11, 722, 190, -1791, 1579, 496], [5, 711, 75, -1520, 991, 1139], [28, 698, 20, -774, -134, 1108], [-173, 563, 231, 7, -1187, 1089], [95, 744, 58, -1717, 852, 655], [-65, 645, 249, -1667, 1284, 968], [-41, 589, 264, -1316, 414, 1809]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-28, 742, 191, -3122, -1031, -383], [-20, 735, 162, -682, 1746, -1807], [58, 713, 25, -2822, -140, -1177], [-22, 732, 153, -1269, 139, -2660], [-3, 771, 196, 1973, -2287, -94], [-9, 762, 188, 2228, -1674, -242], [-64, 775, 157, -3078, -1581, 2], [-54, 753, 193, -2724, -1651, -34], [-151, 771, 112, -642, 293, -2139], [29, 737, 114, -2576, -503, -753], [-71, 730, 243, 343, 2523, -926], [-119, 776, 227, 176, 1329, -3005], [-136, 739, 239, -53, 1790, -1842], [-72, 758, 190, -2832, -1268, -590], [-48, 716, 176, 214, 1765, -1866], [-108, 745, 200, 97, 708, -2846], [-88, 756, 207, -376, 1312, -2276], [-104, 760, 247, -196, 1502, -2168], [-123, 759, 193, 236, 1773, -2700], [-107, 763, 204, 602, 1, -2247], [-105, 738, 172, 530, -119, -2481], [-154, 748, 153, 500, 131, -2335], [-89, 751, 127, -27, 121, -2534], [-83, 758, -34, -298, -701, -2722], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [65, 729, 66, -1736, 1685, 574], [24, 731, 128, -1790, 1681, 437], [40, 738, 13, -1584, 1121, 1112], [71, 746, -51, -731, -117, 1151], [-113, 598, 180, 159, -1287, 1078], [124, 766, -4, -1793, 1063, 624], [-42, 660, 199, -1706, 1403, 956], [14, 626, 238, -1046, 283, 1878]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [13, 758, 192, 1688, -1888, -317], [11, 751, 167, 2155, -1414, -331], [-21, 772, 141, 3107, -1405, 20], [-30, 752, 175, -2754, -1542, -12], [-133, 758, 136, -754, 373, -2081], [49, 733, 82, -2608, -356, -774], [-56, 724, 224, 199, 2548, -897], [-102, 779, 224, 3104, -1350, -22], [-120, 736, 226, 50, 2062, -1808], [-45, 757, 185, -2888, -1115, -603], [-24, 710, 168, -2515, -614, -1340], [-93, 751, 210, 74, 993, -2956], [-65, 750, 204, -427, 1571, -2203], [-85, 758, 246, -243, 1687, -2135], [-98, 763, 189, -2984, -1246, -429], [-107, 777, 229, 651, 112, -2290], [-98, 748, 186, 652, 193, -2602], [-152, 755, 174, 496, 348, -2409], [-84, 752, 157, -127, 386, -2540], [-92, 769, 7, -334, -624, -2763], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-53, 641, 123, 255, -1332, 1076], [138, 782, -62, -1865, 1293, 574], [-24, 677, 142, -1752, 1544, 944], [60, 666, 204, -948, 245, 1902]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-7, 751, 155, -2798, -1397, 12], [-113, 746, 157, -997, 516, -1949], [66, 728, 46, -2613, -227, -789], [-38, 718, 193, 141, 2560, -885], [-80, 778, 211, 2981, -1109, -4], [-100, 733, 205, 100, 2175, -1798], [-18, 756, 175, -2959, -910, -632], [2, 705, 148, -2135, 21, -1325], [-76, 757, 215, -4, 1373, -3085], [-43, 744, 197, -446, 1790, -2142], [-64, 754, 238, -289, 1953, -2084], [-71, 764, 179, -3110, -1051, -426], [-106, 788, 249, 717, 295, -2378], [-88, 756, 195, 741, 832, -2977], [-145, 760, 188, 372, 965, -2612], [-74, 751, 178, -294, 841, -2501], [-95, 777, 48, -416, -461, -2841], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-52, 773, 184, 2935, -1020, -5], [-75, 729, 178, 157, 2293, -1789], [9, 752, 160, -3007, -759, -659], [26, 702, 117, -1929, 427, -1279], [-57, 760, 213, 2963, -1224, 56], [-18, 737, 181, -436, 2062, -2072], [-43, 749, 224, -307, 2204, -2035], [-40, 762, 160, 3118, -966, -432], [-102, 797, 262, 762, 878, -2772], [-73, 762, 193, -2476, -1910, 82], [-129, 762, 192, 225, 1371, -2701], [-56, 748, 186, -379, 1117, -2449], [-88, 778, 87, -497, -315, -2899], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [46, 702, 77, -1842, 649, -1236], [-33, 760, 194, 2868, -969, 72], [6, 729, 154, -412, 2224, -2036], [-19, 743, 199, -306, 2323, -2013], [-9, 759, 138, 3060, -876, -442], [-94, 803, 264, -2553, -1747, -17], [-55, 765, 183, -2637, -1501, 269], [-110, 763, 192, 131, 1598, -2726], [-37, 743, 185, -484, 1641, -2318], [-76, 776, 120, -682, -8, -2977], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [20, 754, 111, 2964, -722, -471], [-82, 804, 257, -2758, -1370, 146], [-34, 765, 165, -2767, -1238, 343], [-88, 763, 186, 42, 1806, -2731], [-15, 736, 172, -497, 1966, -2232], [-57, 769, 143, -786, 155, -2995], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-65, 761, 176, 3089, -1113, -424], [7, 729, 150, 2656, -994, -954], [-35, 759, 159, -896, 327, -2996], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        version: "1.0",
        rotation: !0
    }
      , b = {
        sprite_rotation: !1,
        precision: 1e3,
        velocity: !1,
        frames: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-8, 725, -26], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-8, 725, -26], [-10, 735, 5], [8, 714, 43], [-2, 664, 1], [-58, 729, -51], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-8, 725, -26], [-10, 734, 3], [8, 714, 41], [-3, 666, 1], [-57, 728, -49], [6, 715, -26], [16, 739, 17], [-3, 732, 15], [-23, 713, 38], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-9, 725, -28], [-12, 736, 1], [8, 713, 41], [-3, 667, 1], [-55, 728, -47], [8, 714, -29], [19, 741, 18], [-3, 734, 17], [-25, 713, 41], [-29, 787, -21], [-49, 672, -14], [-14, 759, -6], [-25, 720, -8], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-10, 726, -44], [-15, 743, -1], [15, 709, 54], [-1, 657, 1], [-60, 728, -51], [19, 708, -43], [35, 750, 25], [0, 741, 28], [-33, 709, 56], [-32, 797, -24], [-56, 665, -15], [-15, 773, -8], [-31, 716, -9], [-15, 737, -11], [-48, 712, -11], [-64, 729, 21], [17, 777, -59], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-5, 725, -83], [-16, 763, 4], [33, 698, 83], [7, 630, 3], [-81, 728, -72], [46, 694, -72], [69, 767, 41], [13, 755, 59], [-47, 699, 90], [-41, 823, -30], [-72, 642, -19], [-15, 811, -9], [-48, 702, -14], [-14, 746, -21], [-74, 701, -14], [-83, 731, 31], [22, 784, -67], [34, 747, 16], [7, 720, 26], [-9, 739, 11], [6, 760, 37], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[1, 721, -138], [-22, 800, 12], [54, 683, 117], [16, 596, 4], [-110, 728, -101], [77, 676, -105], [112, 786, 59], [33, 775, 110], [-63, 687, 130], [-53, 860, -40], [-91, 613, -23], [-15, 868, -11], [-75, 674, -22], [-12, 759, -46], [-120, 681, -20], [-121, 733, 53], [34, 799, -86], [71, 754, 24], [24, 706, 44], [-7, 739, 19], [10, 770, 49], [54, 770, 35], [28, 669, -41], [10, 758, -14], [22, 736, -11], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[6, 718, -182], [-34, 849, 22], [72, 671, 145], [24, 571, 5], [-134, 728, -123], [100, 663, -130], [148, 802, 74], [52, 796, 159], [-74, 679, 161], [-64, 891, -47], [-106, 591, -26], [-15, 917, -11], [-104, 643, -31], [-14, 775, -84], [-163, 662, -25], [-154, 736, 72], [47, 815, -108], [122, 761, 31], [46, 679, 69], [-11, 735, 31], [14, 787, 73], [79, 785, 45], [35, 656, -48], [16, 765, -24], [28, 732, -16], [-15, 722, -3], [-6, 780, 10], [56, 694, 1], [16, 729, 74], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[9, 716, -213], [-47, 893, 33], [86, 664, 165], [30, 555, 4], [-150, 728, -137], [115, 655, -146], [174, 814, 83], [68, 811, 195], [-79, 673, 181], [-71, 912, -51], [-116, 577, -27], [-15, 953, -10], [-128, 617, -38], [-18, 791, -123], [-194, 648, -28], [-176, 738, 86], [56, 827, -125], [169, 767, 36], [68, 649, 94], [-25, 728, 48], [16, 808, 104], [107, 803, 56], [42, 641, -58], [22, 779, -42], [37, 724, -27], [-30, 710, -7], [-13, 794, 11], [64, 686, -1], [16, 727, 81], [6, 761, 12], [15, 744, -20], [-6, 744, -8], [4, 708, 40], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[11, 716, -234], [-55, 927, 42], [97, 661, 175], [33, 548, 3], [-160, 727, -144], [122, 651, -157], [191, 820, 89], [81, 821, 219], [-80, 671, 194], [-75, 926, -52], [-123, 569, -26], [-15, 977, -8], [-146, 597, -42], [-22, 804, -155], [-216, 637, -29], [-189, 739, 96], [62, 835, -136], [205, 771, 39], [87, 623, 115], [-49, 720, 72], [17, 828, 133], [133, 820, 65], [49, 626, -68], [29, 799, -67], [53, 712, -47], [-55, 692, -15], [-26, 818, 14], [80, 671, -4], [16, 724, 98], [5, 772, 15], [17, 745, -32], [-14, 745, -14], [3, 701, 45], [53, 698, 35], [-68, 728, 39], [-1, 757, 16], [-9, 708, 8], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[12, 716, -246], [-59, 952, 48], [104, 660, 179], [36, 548, 1], [-164, 726, -144], [124, 650, -162], [200, 823, 91], [92, 827, 232], [-76, 671, 199], [-75, 934, -49], [-127, 568, -24], [-17, 992, -6], [-159, 583, -44], [-25, 814, -179], [-230, 628, -29], [-193, 738, 103], [64, 839, -142], [229, 774, 42], [101, 605, 130], [-78, 711, 103], [19, 844, 155], [154, 833, 71], [53, 613, -76], [38, 822, -94], [76, 699, -74], [-86, 670, -26], [-43, 848, 17], [102, 653, -8], [18, 720, 124], [5, 796, 22], [23, 749, -56], [-32, 749, -27], [2, 685, 59], [69, 687, 43], [-84, 728, 44], [-4, 765, 21], [-12, 701, 7], [16, 732, 6], [7, 777, 16], [-51, 760, -34], [-32, 706, -67], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[12, 718, -251], [-60, 969, 52], [108, 662, 177], [37, 554, -1], [-163, 724, -140], [120, 652, -162], [205, 824, 90], [101, 830, 239], [-69, 673, 197], [-73, 937, -45], [-129, 570, -22], [-20, 1e3, -3], [-167, 574, -42], [-27, 820, -193], [-237, 621, -27], [-190, 735, 106], [62, 839, -143], [244, 777, 44], [112, 594, 140], [-104, 703, 132], [21, 854, 170], [168, 842, 75], [56, 603, -84], [45, 843, -119], [99, 686, -101], [-119, 648, -37], [-58, 878, 22], [123, 636, -12], [21, 717, 152], [9, 834, 34], [34, 755, -90], [-57, 756, -49], [2, 661, 82], [93, 673, 54], [-107, 729, 53], [-8, 780, 33], [-17, 683, 5], [30, 729, 6], [15, 794, 19], [-63, 766, -42], [-35, 703, -74], [-5, 761, 3], [22, 729, 16], [-5, 744, -8], [-11, 772, -21], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[11, 721, -249], [-58, 980, 54], [110, 666, 170], [37, 565, -4], [-158, 721, -130], [113, 656, -159], [205, 822, 87], [109, 831, 239], [-60, 678, 191], [-70, 937, -38], [-130, 577, -18], [-24, 1001, 2], [-172, 569, -39], [-28, 822, -201], [-238, 616, -24], [-181, 732, 107], [58, 837, -143], [253, 780, 46], [119, 589, 144], [-125, 697, 156], [24, 860, 178], [179, 846, 77], [57, 597, -89], [50, 860, -139], [119, 676, -125], [-146, 630, -47], [-72, 904, 27], [140, 622, -16], [24, 714, 177], [15, 879, 49], [49, 762, -128], [-91, 764, -79], [2, 635, 106], [117, 660, 64], [-133, 730, 64], [-14, 803, 58], [-25, 653, 6], [59, 722, 6], [32, 824, 26], [-91, 780, -55], [-43, 692, -91], [-5, 771, 5], [35, 722, 28], [-6, 741, -12], [-14, 781, -27], [-49, 690, 35], [10, 807, 25], [-18, 757, -6], [2, 724, 24], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[10, 725, -241], [-55, 985, 54], [110, 670, 161], [37, 577, -7], [-151, 719, -118], [102, 661, -153], [202, 819, 83], [116, 830, 235], [-50, 683, 182], [-66, 933, -31], [-130, 585, -15], [-28, 998, 8], [-174, 569, -34], [-28, 823, -202], [-234, 613, -20], [-168, 728, 105], [52, 835, -142], [255, 783, 47], [123, 589, 144], [-138, 692, 172], [28, 861, 180], [185, 847, 77], [56, 594, -92], [53, 873, -154], [133, 668, -143], [-169, 615, -53], [-84, 925, 32], [151, 613, -19], [28, 712, 195], [23, 919, 63], [62, 768, -163], [-127, 773, -111], [3, 610, 128], [139, 648, 72], [-157, 732, 74], [-24, 832, 94], [-35, 614, 8], [103, 712, 4], [58, 862, 35], [-124, 796, -69], [-53, 678, -114], [-5, 789, 12], [60, 708, 47], [-8, 731, -24], [-19, 801, -46], [-63, 676, 46], [16, 826, 34], [-28, 759, -9], [3, 718, 30], [2, 713, -2], [25, 694, -21], [18, 694, -53], [36, 743, -67], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[8, 730, -230], [-50, 986, 53], [109, 675, 150], [36, 586, -10], [-143, 717, -105], [92, 667, -147], [196, 816, 78], [120, 827, 225], [-40, 688, 171], [-62, 928, -23], [-130, 593, -10], [-31, 991, 14], [-173, 572, -28], [-28, 821, -199], [-226, 612, -16], [-153, 724, 102], [47, 832, -140], [253, 785, 48], [124, 592, 141], [-146, 689, 183], [32, 859, 177], [188, 845, 76], [54, 593, -95], [52, 880, -165], [140, 662, -157], [-187, 604, -58], [-92, 941, 36], [157, 607, -23], [32, 711, 207], [31, 953, 74], [74, 774, -193], [-158, 780, -136], [4, 591, 145], [157, 639, 78], [-175, 733, 82], [-33, 858, 130], [-44, 574, 10], [150, 703, 2], [85, 897, 42], [-153, 811, -80], [-63, 663, -137], [-5, 816, 23], [91, 694, 72], [-12, 719, -44], [-27, 830, -72], [-82, 659, 62], [25, 852, 46], [-49, 767, -13], [4, 708, 48], [4, 696, -3], [35, 678, -28], [22, 685, -65], [41, 746, -75], [-21, 758, 12], [20, 712, -10], [-9, 744, 2], [-36, 763, -6], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[6, 735, -215], [-44, 984, 52], [108, 679, 139], [37, 589, -13], [-136, 715, -93], [83, 672, -143], [188, 812, 72], [123, 824, 211], [-30, 692, 161], [-58, 923, -16], [-129, 599, -6], [-34, 982, 22], [-171, 577, -22], [-29, 817, -193], [-215, 612, -12], [-138, 721, 100], [42, 831, -139], [246, 786, 49], [124, 599, 134], [-148, 687, 187], [36, 856, 170], [188, 840, 74], [52, 592, -98], [48, 882, -171], [142, 659, -167], [-200, 596, -59], [-97, 952, 41], [159, 604, -26], [35, 710, 213], [37, 978, 82], [81, 777, -216], [-180, 785, -154], [6, 578, 156], [171, 632, 81], [-188, 733, 89], [-41, 880, 160], [-52, 539, 13], [193, 696, -2], [107, 926, 47], [-176, 823, -88], [-73, 650, -158], [-6, 850, 38], [122, 681, 97], [-25, 709, -73], [-37, 861, -98], [-101, 641, 81], [36, 878, 58], [-85, 785, -16], [6, 696, 80], [4, 671, 2], [56, 653, -37], [28, 668, -90], [56, 755, -92], [-31, 772, 28], [33, 710, -8], [-10, 749, 8], [-44, 770, -5], [-20, 766, 61], [-72, 744, 34], [0, 757, -18], [-3, 739, -24], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[3, 739, -201], [-38, 981, 52], [108, 683, 130], [38, 585, -16], [-134, 713, -84], [76, 675, -142], [179, 808, 65], [124, 819, 194], [-21, 696, 154], [-56, 920, -10], [-128, 604, -1], [-35, 973, 29], [-168, 584, -16], [-29, 814, -186], [-203, 614, -7], [-127, 718, 99], [39, 831, -140], [235, 787, 50], [123, 607, 125], [-146, 686, 187], [40, 852, 161], [185, 834, 70], [50, 590, -101], [42, 880, -174], [139, 657, -173], [-209, 591, -58], [-98, 961, 45], [158, 604, -29], [39, 710, 214], [43, 998, 87], [84, 779, -233], [-195, 787, -164], [9, 571, 162], [181, 627, 82], [-194, 732, 93], [-45, 896, 181], [-57, 514, 15], [227, 690, -5], [123, 948, 51], [-191, 829, -92], [-81, 640, -173], [-5, 885, 52], [151, 670, 118], [-44, 695, -113], [-47, 891, -122], [-119, 623, 99], [49, 903, 70], [-132, 808, -21], [9, 682, 120], [4, 633, 11], [82, 621, -48], [36, 646, -122], [78, 769, -114], [-47, 796, 57], [61, 706, -5], [-8, 758, 21], [-64, 787, -8], [-23, 776, 88], [-92, 745, 46], [7, 769, -25], [-1, 738, -31], [-3, 716, -13], [12, 729, -50], [47, 764, -34], [27, 671, -40], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-1, 743, -189], [-31, 979, 53], [110, 686, 125], [40, 574, -18], [-136, 711, -78], [73, 676, -146], [171, 804, 59], [123, 814, 174], [-14, 698, 153], [-55, 918, -5], [-128, 606, 4], [-35, 966, 36], [-164, 590, -9], [-31, 810, -180], [-190, 616, -2], [-120, 716, 102], [36, 834, -141], [222, 786, 49], [122, 615, 116], [-140, 685, 183], [45, 849, 153], [181, 827, 67], [47, 585, -105], [34, 874, -174], [132, 658, -175], [-213, 588, -53], [-97, 966, 50], [156, 605, -32], [43, 710, 210], [47, 1010, 90], [83, 780, -243], [-204, 788, -168], [14, 570, 164], [187, 625, 81], [-195, 731, 96], [-45, 908, 195], [-61, 499, 18], [250, 685, -8], [133, 963, 53], [-199, 833, -92], [-87, 634, -181], [-3, 918, 66], [177, 662, 136], [-67, 681, -155], [-56, 914, -141], [-133, 608, 115], [62, 926, 79], [-178, 831, -25], [12, 667, 160], [4, 588, 23], [110, 588, -59], [42, 622, -155], [102, 785, -136], [-67, 826, 90], [101, 701, 0], [-3, 771, 41], [-94, 812, -15], [-25, 788, 124], [-120, 746, 61], [20, 796, -38], [-1, 740, -45], [-5, 702, -12], [18, 729, -68], [62, 775, -38], [29, 663, -42], [4, 727, -33], [-13, 738, 23], [5, 744, -7], [41, 713, -19], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-6, 745, -184], [-24, 977, 55], [114, 688, 122], [41, 558, -21], [-141, 710, -75], [74, 675, -156], [164, 800, 53], [121, 808, 154], [-9, 700, 157], [-56, 918, -2], [-128, 607, 9], [-34, 961, 41], [-160, 596, -2], [-35, 808, -175], [-178, 619, 3], [-117, 713, 109], [35, 839, -144], [208, 785, 48], [121, 622, 108], [-132, 686, 175], [49, 846, 146], [176, 821, 62], [44, 578, -111], [26, 867, -172], [123, 659, -175], [-214, 589, -46], [-93, 968, 55], [154, 607, -35], [46, 710, 203], [50, 1017, 91], [78, 779, -247], [-207, 788, -166], [18, 573, 161], [191, 625, 79], [-192, 729, 98], [-42, 916, 201], [-64, 493, 21], [263, 681, -11], [138, 973, 55], [-201, 833, -90], [-90, 631, -183], [0, 946, 80], [197, 655, 148], [-89, 668, -193], [-63, 929, -153], [-143, 596, 128], [75, 944, 87], [-213, 848, -27], [17, 652, 196], [2, 544, 35], [134, 557, -69], [45, 599, -187], [126, 799, -156], [-88, 854, 122], [149, 695, 6], [0, 791, 69], [-127, 837, -22], [-28, 800, 161], [-151, 749, 76], [34, 838, -52], [-11, 748, -66], [-17, 677, -4], [26, 730, -101], [92, 797, -45], [33, 640, -48], [-1, 723, -38], [-21, 738, 39], [4, 751, 0], [51, 710, -17], [-53, 693, -35], [-38, 745, 67], [-11, 757, 14], [-17, 749, -6], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-12, 747, -185], [-18, 977, 56], [120, 689, 123], [43, 543, -23], [-149, 708, -73], [77, 673, -170], [159, 797, 46], [120, 804, 136], [-4, 699, 164], [-58, 920, -1], [-128, 605, 14], [-34, 957, 44], [-157, 599, 4], [-40, 807, -173], [-169, 622, 9], [-118, 711, 118], [34, 846, -149], [194, 783, 46], [121, 626, 100], [-122, 686, 167], [55, 845, 142], [172, 816, 58], [40, 570, -117], [17, 861, -170], [113, 660, -175], [-210, 592, -37], [-89, 968, 60], [153, 608, -38], [50, 710, 196], [52, 1019, 90], [71, 778, -246], [-207, 788, -160], [23, 580, 156], [192, 625, 75], [-188, 727, 100], [-36, 921, 200], [-65, 493, 23], [269, 678, -12], [138, 977, 56], [-200, 832, -85], [-91, 632, -181], [4, 971, 92], [212, 651, 155], [-107, 658, -222], [-68, 938, -160], [-148, 590, 137], [87, 960, 93], [-238, 860, -28], [21, 640, 224], [2, 507, 46], [153, 534, -78], [47, 582, -212], [143, 810, -172], [-106, 878, 151], [195, 689, 9], [5, 816, 103], [-157, 860, -27], [-31, 810, 197], [-179, 753, 90], [48, 884, -68], [-28, 763, -99], [-35, 638, 6], [36, 731, -143], [127, 823, -55], [39, 607, -57], [-9, 716, -50], [-36, 736, 66], [8, 768, 10], [75, 700, -14], [-77, 679, -42], [-47, 745, 83], [-16, 768, 21], [-24, 753, -9], [-6, 712, -7], [8, 761, 40], [-30, 787, -21], [63, 708, -38], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-20, 749, -191], [-11, 979, 58], [127, 689, 125], [43, 530, -26], [-160, 707, -73], [80, 670, -184], [158, 797, 40], [121, 800, 122], [0, 698, 175], [-61, 922, 0], [-129, 600, 20], [-34, 956, 47], [-156, 600, 10], [-48, 808, -174], [-165, 624, 15], [-121, 708, 132], [34, 854, -154], [184, 781, 43], [122, 628, 94], [-113, 687, 161], [62, 846, 142], [170, 813, 54], [36, 563, -122], [9, 856, -169], [103, 662, -174], [-204, 596, -26], [-83, 968, 65], [152, 608, -43], [55, 711, 191], [54, 1018, 88], [63, 776, -242], [-203, 787, -150], [28, 588, 149], [193, 627, 71], [-183, 726, 102], [-29, 923, 196], [-64, 499, 27], [268, 677, -12], [135, 978, 57], [-195, 829, -79], [-91, 634, -177], [9, 993, 104], [221, 649, 156], [-120, 650, -241], [-72, 939, -161], [-150, 587, 143], [98, 972, 97], [-254, 869, -28], [25, 632, 244], [3, 481, 53], [165, 519, -85], [47, 571, -229], [153, 818, -184], [-119, 897, 174], [234, 685, 11], [9, 843, 138], [-181, 879, -31], [-32, 819, 226], [-204, 757, 102], [61, 926, -82], [-50, 780, -136], [-51, 593, 17], [47, 730, -185], [159, 846, -64], [44, 572, -67], [-17, 703, -73], [-54, 732, 99], [24, 795, 16], [109, 688, -13], [-107, 662, -55], [-64, 748, 111], [-25, 790, 33], [-37, 761, -19], [-5, 696, -8], [19, 769, 54], [-38, 802, -28], [70, 706, -42], [2, 729, 34], [-23, 714, -10], [9, 724, -6], [-5, 756, -39], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-29, 749, -201], [-4, 983, 58], [137, 689, 130], [43, 520, -29], [-172, 706, -73], [81, 667, -198], [160, 799, 32], [125, 799, 112], [4, 695, 189], [-65, 926, 0], [-131, 591, 26], [-34, 955, 48], [-158, 598, 15], [-57, 810, -178], [-165, 625, 21], [-128, 706, 147], [34, 863, -159], [180, 780, 40], [124, 628, 89], [-105, 686, 159], [71, 849, 145], [172, 814, 50], [31, 557, -127], [1, 853, -169], [95, 663, -174], [-196, 602, -15], [-77, 966, 70], [151, 609, -47], [61, 711, 187], [57, 1015, 86], [53, 774, -236], [-197, 786, -137], [32, 598, 141], [192, 629, 65], [-180, 724, 104], [-22, 923, 189], [-63, 508, 30], [262, 676, -12], [129, 977, 57], [-189, 826, -71], [-91, 637, -170], [15, 1011, 115], [226, 649, 152], [-128, 647, -251], [-75, 936, -159], [-148, 588, 145], [106, 980, 99], [-263, 874, -26], [30, 628, 255], [4, 464, 57], [171, 510, -91], [45, 565, -239], [155, 822, -192], [-126, 912, 191], [265, 681, 11], [13, 869, 173], [-199, 893, -32], [-32, 826, 247], [-221, 760, 112], [70, 958, -94], [-74, 797, -170], [-64, 548, 28], [57, 730, -224], [182, 864, -72], [49, 541, -76], [-27, 685, -106], [-74, 725, 135], [48, 832, 20], [146, 672, -15], [-138, 644, -72], [-84, 755, 145], [-42, 822, 48], [-62, 774, -35], [-2, 665, -10], [37, 781, 78], [-54, 830, -41], [87, 700, -54], [8, 718, 49], [-35, 703, -13], [18, 719, -8], [-3, 761, -48], [40, 791, -3], [27, 806, -3], [1, 759, -15], [-23, 730, 13], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-39, 749, -212], [2, 987, 58], [146, 687, 136], [42, 514, -32], [-184, 705, -74], [82, 664, -210], [166, 803, 23], [133, 800, 109], [9, 691, 203], [-70, 930, -1], [-133, 580, 34], [-35, 957, 49], [-162, 592, 20], [-67, 815, -184], [-170, 627, 28], [-136, 703, 164], [35, 873, -163], [182, 779, 36], [127, 625, 86], [-100, 684, 163], [83, 853, 151], [177, 818, 47], [26, 554, -131], [-7, 853, -171], [89, 664, -175], [-189, 607, -5], [-71, 964, 75], [150, 609, -52], [67, 711, 185], [59, 1012, 82], [44, 772, -230], [-188, 784, -124], [36, 606, 134], [192, 631, 60], [-177, 723, 107], [-14, 922, 181], [-61, 517, 33], [254, 676, -12], [121, 973, 56], [-183, 822, -63], [-91, 640, -164], [21, 1026, 123], [227, 651, 144], [-133, 646, -254], [-76, 928, -153], [-144, 591, 145], [113, 986, 99], [-265, 876, -25], [34, 628, 259], [4, 455, 59], [172, 508, -95], [42, 564, -243], [152, 824, -197], [-125, 921, 203], [289, 678, 11], [18, 890, 205], [-212, 902, -32], [-29, 831, 260], [-231, 761, 120], [75, 981, -102], [-99, 811, -201], [-73, 510, 38], [65, 729, -258], [197, 876, -78], [52, 515, -84], [-38, 664, -141], [-91, 719, 171], [75, 877, 20], [181, 658, -19], [-166, 627, -87], [-104, 765, 180], [-66, 858, 66], [-98, 791, -52], [2, 622, -13], [57, 793, 107], [-74, 865, -56], [110, 693, -70], [16, 701, 74], [-56, 684, -20], [36, 708, -13], [1, 771, -71], [59, 805, -11], [35, 824, -10], [2, 765, -19], [-29, 728, 17], [-14, 726, -14], [34, 739, -37], [28, 673, 18], [-69, 743, 32], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[-48, 748, -223], [9, 992, 57], [156, 686, 141], [40, 509, -36], [-195, 704, -73], [81, 662, -219], [176, 810, 12], [145, 802, 110], [14, 688, 216], [-75, 935, -1], [-134, 567, 43], [-36, 960, 50], [-168, 585, 25], [-78, 819, -191], [-178, 629, 35], [-145, 701, 180], [35, 881, -167], [190, 778, 32], [130, 620, 83], [-95, 678, 168], [94, 857, 158], [186, 825, 45], [20, 552, -133], [-14, 855, -175], [83, 664, -175], [-184, 611, 4], [-66, 963, 81], [149, 608, -57], [74, 711, 185], [62, 1008, 79], [35, 771, -224], [-180, 783, -110], [41, 612, 127], [192, 632, 54], [-176, 723, 110], [-6, 921, 175], [-58, 525, 37], [245, 676, -12], [115, 969, 54], [-178, 819, -56], [-91, 643, -157], [27, 1036, 130], [225, 654, 132], [-134, 648, -251], [-78, 918, -146], [-138, 595, 144], [118, 990, 98], [-263, 877, -22], [38, 631, 257], [5, 452, 57], [168, 510, -99], [38, 567, -243], [143, 824, -198], [-119, 927, 210], [304, 676, 9], [24, 908, 230], [-219, 907, -32], [-26, 834, 266], [-233, 760, 125], [75, 996, -105], [-121, 824, -227], [-82, 478, 47], [70, 728, -284], [205, 884, -80], [53, 495, -91], [-49, 643, -174], [-104, 715, 206], [103, 919, 18], [213, 645, -25], [-190, 613, -100], [-121, 775, 211], [-90, 889, 84], [-136, 809, -68], [6, 576, -17], [76, 805, 140], [-95, 898, -69], [134, 685, -90], [24, 682, 104], [-83, 660, -28], [60, 690, -21], [3, 783, -102], [84, 822, -22], [43, 851, -20], [1, 777, -25], [-43, 724, 28], [-22, 719, -21], [47, 737, -50], [33, 661, 22], [-76, 745, 36], [-15, 745, -30], [-8, 729, -26], [15, 735, 2], [-14, 774, 11], 0, 0, 0, 0, 0, 0, 0], [[-58, 747, -233], [16, 998, 56], [165, 685, 146], [38, 507, -39], [-205, 704, -72], [78, 661, -227], [187, 817, 0], [157, 805, 113], [19, 686, 225], [-81, 940, 0], [-136, 553, 51], [-37, 963, 51], [-175, 577, 31], [-88, 824, -197], [-187, 631, 44], [-152, 700, 194], [34, 887, -171], [200, 777, 28], [134, 614, 82], [-90, 673, 175], [105, 861, 164], [196, 832, 43], [14, 551, -135], [-21, 859, -179], [78, 664, -177], [-183, 613, 11], [-62, 962, 87], [149, 607, -63], [81, 712, 186], [66, 1006, 75], [26, 770, -221], [-174, 781, -99], [46, 616, 123], [193, 632, 49], [-175, 723, 114], [2, 920, 169], [-55, 531, 41], [236, 677, -13], [111, 966, 51], [-175, 816, -48], [-93, 645, -152], [34, 1042, 133], [221, 659, 119], [-133, 652, -244], [-79, 907, -138], [-132, 600, 142], [123, 992, 95], [-255, 876, -20], [42, 637, 250], [5, 455, 54], [161, 516, -101], [33, 573, -239], [130, 822, -197], [-109, 930, 213], [312, 675, 7], [29, 923, 247], [-223, 909, -30], [-21, 836, 267], [-230, 757, 129], [73, 1003, -105], [-139, 833, -245], [-87, 455, 55], [70, 728, -302], [206, 887, -80], [53, 482, -96], [-59, 625, -202], [-115, 712, 236], [128, 956, 14], [239, 634, -32], [-208, 603, -107], [-133, 783, 236], [-111, 915, 101], [-170, 824, -80], [10, 534, -21], [93, 815, 171], [-113, 929, -80], [158, 678, -110], [32, 664, 137], [-111, 634, -39], [89, 667, -30], [7, 798, -137], [113, 842, -35], [51, 881, -30], [-1, 800, -32], [-62, 721, 48], [-38, 705, -31], [68, 735, -71], [41, 641, 29], [-92, 752, 47], [-25, 752, -41], [-10, 725, -36], [22, 735, 10], [-16, 782, 18], [17, 692, 56], [-3, 671, -52], [1, 759, -14], [16, 749, -6], 0, 0, 0], [[-67, 746, -241], [22, 1004, 53], [174, 684, 149], [35, 505, -43], [-212, 704, -69], [74, 660, -232], [199, 825, -13], [169, 807, 116], [23, 685, 232], [-86, 946, 1], [-137, 541, 60], [-38, 968, 51], [-182, 569, 37], [-99, 828, -203], [-197, 633, 53], [-156, 698, 206], [32, 892, -173], [212, 777, 24], [139, 606, 80], [-84, 667, 183], [115, 864, 167], [206, 839, 41], [8, 552, -135], [-27, 863, -184], [74, 663, -179], [-185, 615, 17], [-58, 962, 93], [150, 604, -70], [89, 712, 186], [71, 1005, 71], [18, 769, -219], [-172, 779, -90], [51, 615, 121], [194, 631, 44], [-174, 724, 117], [10, 919, 164], [-52, 536, 45], [229, 678, -14], [109, 963, 48], [-176, 815, -39], [-97, 646, -147], [41, 1044, 134], [216, 663, 105], [-130, 657, -233], [-81, 898, -130], [-125, 604, 142], [126, 993, 91], [-245, 874, -17], [45, 645, 241], [5, 461, 49], [151, 525, -102], [27, 580, -232], [115, 819, -193], [-96, 930, 214], [312, 674, 4], [34, 934, 258], [-223, 908, -27], [-17, 836, 264], [-222, 753, 132], [68, 1004, -102], [-152, 839, -255], [-90, 440, 62], [67, 727, -312], [203, 888, -79], [51, 473, -99], [-68, 610, -224], [-122, 709, 261], [150, 987, 8], [259, 625, -38], [-220, 597, -110], [-140, 789, 255], [-128, 937, 116], [-202, 839, -92], [12, 497, -25], [108, 824, 197], [-129, 954, -88], [178, 673, -129], [39, 647, 168], [-139, 609, -51], [120, 642, -42], [11, 812, -172], [140, 862, -50], [59, 912, -42], [-3, 835, -40], [-85, 718, 75], [-64, 682, -44], [96, 735, -99], [50, 615, 38], [-114, 763, 63], [-44, 766, -59], [-12, 715, -53], [38, 735, 30], [-23, 803, 37], [20, 686, 73], [-4, 655, -63], [1, 770, -13], [22, 753, -3], [-10, 732, 20], [19, 730, 46], [-34, 673, 1]], [[-75, 745, -246], [28, 1011, 51], [181, 684, 151], [33, 504, -47], [-217, 704, -66], [68, 660, -235], [209, 831, -25], [180, 810, 117], [28, 685, 237], [-91, 950, 2], [-137, 531, 69], [-39, 972, 52], [-187, 562, 43], [-109, 831, -207], [-207, 635, 62], [-158, 697, 216], [30, 895, -174], [223, 776, 20], [144, 598, 80], [-79, 662, 190], [124, 867, 169], [214, 844, 38], [2, 553, -136], [-34, 868, -190], [71, 662, -182], [-188, 615, 23], [-54, 961, 99], [151, 601, -77], [96, 714, 187], [76, 1005, 67], [11, 768, -219], [-172, 777, -83], [57, 611, 122], [197, 629, 39], [-174, 725, 121], [18, 918, 159], [-49, 538, 51], [223, 680, -17], [108, 961, 44], [-179, 814, -30], [-101, 645, -144], [49, 1043, 133], [212, 667, 92], [-126, 663, -220], [-84, 892, -123], [-119, 608, 142], [130, 993, 87], [-232, 872, -13], [49, 652, 229], [6, 470, 43], [139, 535, -103], [21, 589, -223], [99, 815, -188], [-81, 928, 212], [307, 674, 0], [39, 942, 262], [-221, 904, -23], [-11, 836, 258], [-212, 749, 134], [62, 1001, -97], [-161, 843, -258], [-90, 433, 67], [60, 726, -316], [196, 888, -76], [48, 470, -101], [-75, 600, -240], [-125, 707, 279], [167, 1012, 2], [274, 619, -43], [-226, 594, -108], [-143, 792, 269], [-139, 954, 127], [-228, 850, -100], [12, 466, -28], [121, 831, 217], [-142, 972, -92], [193, 668, -144], [46, 630, 196], [-164, 586, -62], [149, 619, -55], [15, 826, -203], [164, 879, -64], [65, 939, -54], [-4, 873, -48], [-108, 716, 104], [-95, 658, -60], [124, 736, -126], [61, 585, 47], [-137, 778, 81], [-67, 784, -80], [-14, 704, -76], [62, 739, 55], [-30, 830, 62], [24, 678, 96], [-4, 633, -79], [2, 790, -12], [36, 762, 0], [-17, 733, 34], [23, 734, 63], [-39, 664, 3]], [[-83, 745, -249], [33, 1017, 47], [187, 684, 151], [30, 503, -51], [-221, 704, -61], [62, 661, -237], [217, 836, -36], [188, 811, 117], [33, 685, 241], [-94, 954, 4], [-136, 523, 77], [-39, 976, 53], [-190, 556, 49], [-118, 833, -210], [-215, 638, 72], [-157, 695, 224], [26, 898, -174], [233, 776, 15], [149, 589, 79], [-74, 657, 198], [131, 868, 168], [219, 849, 35], [-4, 553, -137], [-41, 872, -194], [68, 661, -186], [-192, 616, 28], [-50, 961, 105], [152, 597, -86], [104, 715, 189], [81, 1006, 63], [4, 767, -220], [-174, 775, -77], [64, 604, 125], [201, 627, 35], [-174, 726, 126], [26, 917, 155], [-46, 540, 56], [219, 681, -21], [110, 959, 39], [-182, 814, -22], [-107, 645, -141], [56, 1038, 130], [209, 671, 80], [-121, 669, -207], [-88, 887, -117], [-112, 610, 143], [134, 992, 82], [-219, 869, -10], [53, 660, 219], [7, 480, 36], [128, 546, -104], [14, 598, -214], [84, 811, -184], [-65, 926, 208], [299, 674, -5], [44, 947, 260], [-217, 900, -19], [-5, 835, 249], [-201, 745, 136], [55, 995, -90], [-166, 844, -255], [-87, 431, 71], [52, 725, -314], [187, 886, -74], [43, 471, -102], [-81, 593, -251], [-126, 706, 291], [179, 1030, -3], [283, 615, -48], [-228, 594, -103], [-142, 792, 278], [-143, 966, 136], [-248, 860, -106], [11, 441, -32], [131, 836, 230], [-151, 984, -94], [203, 665, -156], [53, 616, 220], [-185, 566, -70], [174, 599, -66], [18, 838, -231], [183, 893, -76], [70, 963, -65], [-6, 907, -55], [-128, 716, 130], [-124, 635, -75], [148, 737, -150], [72, 556, 55], [-157, 792, 97], [-88, 800, -100], [-15, 696, -100], [89, 746, 77], [-37, 854, 86], [29, 670, 119], [-4, 612, -95], [2, 813, -14], [53, 773, 0], [-27, 736, 47], [28, 741, 80], [-45, 654, 4]], [[-90, 744, -250], [39, 1024, 43], [193, 684, 149], [26, 503, -55], [-223, 704, -56], [55, 661, -238], [223, 839, -46], [195, 812, 115], [38, 686, 243], [-98, 957, 7], [-134, 518, 84], [-39, 981, 54], [-192, 552, 55], [-127, 835, -210], [-222, 640, 81], [-154, 695, 230], [21, 899, -174], [240, 775, 10], [154, 582, 77], [-68, 653, 206], [137, 869, 165], [223, 852, 31], [-11, 553, -137], [-48, 876, -198], [66, 660, -189], [-196, 616, 33], [-46, 961, 111], [153, 593, -94], [113, 717, 190], [87, 1008, 59], [-2, 766, -221], [-177, 773, -72], [71, 596, 127], [204, 623, 30], [-175, 726, 131], [34, 916, 152], [-43, 540, 62], [216, 683, -26], [113, 957, 34], [-184, 813, -13], [-113, 644, -139], [63, 1032, 125], [208, 674, 70], [-117, 674, -194], [-93, 884, -112], [-106, 611, 146], [137, 991, 77], [-207, 866, -6], [57, 666, 211], [9, 490, 30], [117, 555, -105], [7, 606, -206], [70, 808, -180], [-49, 923, 203], [287, 674, -10], [49, 949, 253], [-212, 895, -15], [1, 832, 239], [-190, 741, 138], [48, 987, -84], [-167, 844, -247], [-83, 435, 73], [41, 725, -307], [179, 885, -72], [38, 474, -101], [-86, 591, -255], [-124, 705, 297], [186, 1042, -8], [287, 614, -52], [-227, 596, -95], [-138, 790, 283], [-143, 974, 142], [-262, 867, -107], [9, 424, -35], [139, 840, 236], [-158, 988, -92], [208, 662, -164], [60, 604, 238], [-201, 550, -75], [196, 582, -77], [20, 848, -255], [197, 905, -88], [74, 982, -76], [-8, 936, -62], [-144, 717, 154], [-150, 615, -86], [167, 738, -170], [82, 532, 61], [-173, 805, 111], [-107, 813, -116], [-16, 689, -119], [113, 753, 94], [-42, 874, 106], [32, 662, 138], [-5, 594, -107], [2, 831, -15], [67, 783, -3], [-36, 740, 57], [32, 748, 95], [-49, 645, 4]], [[-96, 743, -249], [44, 1030, 39], [197, 684, 146], [22, 502, -59], [-223, 705, -50], [48, 662, -238], [226, 842, -55], [200, 812, 111], [43, 686, 244], [-100, 959, 11], [-130, 515, 90], [-39, 985, 55], [-192, 551, 61], [-134, 836, -209], [-225, 642, 89], [-150, 694, 234], [16, 900, -174], [246, 774, 5], [159, 576, 75], [-62, 649, 213], [142, 870, 160], [225, 855, 26], [-18, 553, -138], [-56, 880, -201], [63, 660, -192], [-199, 616, 38], [-41, 961, 116], [153, 590, -103], [121, 719, 191], [93, 1010, 55], [-9, 766, -223], [-180, 771, -67], [78, 589, 128], [207, 620, 25], [-175, 727, 135], [43, 914, 149], [-40, 541, 67], [212, 685, -32], [116, 955, 28], [-187, 812, -4], [-119, 643, -137], [71, 1026, 119], [207, 677, 60], [-115, 679, -182], [-97, 882, -107], [-100, 611, 148], [141, 989, 71], [-196, 863, -1], [63, 670, 204], [12, 499, 24], [107, 563, -106], [0, 613, -200], [57, 805, -176], [-32, 919, 196], [276, 674, -17], [54, 950, 243], [-206, 890, -10], [8, 830, 228], [-181, 739, 140], [41, 981, -78], [-167, 842, -236], [-77, 443, 74], [29, 724, -296], [171, 883, -71], [31, 479, -101], [-89, 591, -254], [-120, 705, 298], [187, 1048, -12], [287, 614, -56], [-223, 599, -86], [-132, 786, 283], [-137, 977, 146], [-270, 872, -106], [6, 413, -37], [144, 842, 237], [-162, 988, -87], [208, 659, -169], [67, 597, 250], [-213, 540, -77], [214, 568, -87], [18, 856, -272], [207, 914, -97], [76, 998, -85], [-12, 960, -68], [-156, 717, 175], [-172, 599, -95], [180, 738, -187], [91, 511, 65], [-186, 815, 124], [-123, 823, -128], [-17, 685, -134], [134, 760, 108], [-47, 890, 124], [36, 654, 154], [-6, 579, -117], [2, 846, -16], [80, 791, -5], [-43, 744, 65], [35, 755, 106], [-53, 638, 5]], [[-102, 743, -247], [49, 1035, 34], [200, 685, 141], [18, 502, -62], [-222, 705, -43], [40, 662, -239], [227, 844, -63], [204, 813, 107], [48, 688, 244], [-101, 960, 15], [-125, 516, 95], [-38, 990, 57], [-190, 551, 67], [-141, 836, -207], [-227, 644, 96], [-144, 693, 238], [10, 900, -173], [250, 773, -1], [162, 572, 71], [-57, 646, 219], [146, 870, 155], [226, 856, 21], [-25, 551, -139], [-63, 882, -202], [61, 659, -195], [-201, 617, 43], [-37, 961, 122], [152, 588, -111], [129, 721, 191], [100, 1013, 50], [-15, 765, -225], [-182, 769, -62], [84, 583, 128], [210, 617, 20], [-175, 727, 139], [51, 913, 147], [-36, 543, 72], [209, 687, -38], [121, 952, 21], [-188, 810, 4], [-125, 642, -134], [78, 1019, 113], [207, 680, 52], [-115, 684, -172], [-102, 881, -102], [-95, 612, 151], [145, 987, 65], [-186, 861, 4], [68, 674, 199], [15, 508, 19], [98, 569, -108], [-7, 617, -195], [45, 802, -173], [-17, 915, 190], [264, 675, -23], [59, 948, 229], [-200, 885, -5], [14, 827, 217], [-175, 738, 144], [34, 974, -74], [-164, 840, -223], [-70, 454, 74], [16, 723, -284], [162, 882, -71], [25, 485, -100], [-91, 594, -249], [-114, 706, 295], [185, 1049, -17], [284, 616, -60], [-218, 602, -77], [-124, 781, 280], [-127, 977, 148], [-272, 875, -102], [2, 410, -39], [147, 843, 233], [-163, 982, -80], [206, 657, -172], [72, 593, 257], [-221, 534, -77], [226, 557, -96], [15, 860, -283], [212, 920, -103], [77, 1011, -93], [-16, 981, -73], [-165, 717, 194], [-190, 585, -102], [189, 737, -198], [98, 496, 67], [-195, 824, 135], [-138, 832, -138], [-18, 682, -145], [152, 766, 119], [-50, 903, 139], [39, 647, 166], [-9, 566, -125], [1, 859, -18], [91, 798, -8], [-49, 747, 72], [38, 761, 114], [-56, 632, 6]], [[-108, 742, -243], [53, 1040, 28], [202, 686, 135], [13, 502, -64], [-219, 706, -36], [33, 663, -240], [226, 845, -69], [207, 812, 102], [53, 689, 243], [-102, 961, 20], [-120, 518, 98], [-36, 994, 59], [-186, 552, 72], [-147, 836, -203], [-225, 646, 103], [-138, 693, 240], [4, 898, -171], [252, 772, -7], [164, 570, 66], [-50, 643, 223], [150, 870, 149], [225, 857, 15], [-33, 549, -141], [-70, 884, -202], [60, 659, -197], [-202, 618, 48], [-33, 962, 126], [150, 586, -118], [137, 722, 190], [106, 1017, 45], [-21, 766, -226], [-184, 767, -57], [90, 579, 128], [212, 615, 15], [-175, 726, 142], [60, 912, 145], [-32, 544, 76], [205, 689, -45], [126, 950, 14], [-189, 809, 12], [-131, 642, -131], [85, 1012, 106], [207, 682, 44], [-116, 688, -164], [-106, 880, -96], [-89, 612, 154], [149, 985, 59], [-178, 859, 10], [74, 677, 194], [18, 515, 14], [89, 575, -110], [-14, 621, -192], [33, 800, -170], [-2, 912, 184], [254, 675, -30], [64, 945, 213], [-195, 881, 1], [21, 824, 207], [-169, 738, 147], [27, 969, -71], [-162, 838, -208], [-62, 467, 73], [4, 723, -271], [155, 880, -71], [18, 491, -99], [-92, 599, -241], [-108, 707, 289], [179, 1046, -22], [277, 619, -64], [-212, 605, -67], [-115, 774, 274], [-114, 974, 148], [-269, 877, -95], [-3, 411, -40], [149, 843, 225], [-163, 973, -72], [201, 655, -172], [77, 594, 257], [-225, 532, -74], [235, 550, -103], [8, 860, -289], [212, 924, -106], [76, 1019, -99], [-21, 998, -76], [-172, 717, 212], [-205, 573, -106], [192, 734, -206], [103, 486, 66], [-200, 830, 145], [-151, 839, -145], [-19, 680, -152], [168, 771, 127], [-52, 914, 152], [42, 641, 176], [-12, 556, -131], [0, 870, -19], [100, 804, -10], [-54, 750, 78], [41, 766, 121], [-58, 628, 7]], [[-113, 742, -239], [57, 1044, 22], [204, 687, 129], [8, 503, -66], [-216, 706, -29], [26, 663, -241], [223, 845, -75], [209, 812, 96], [59, 691, 241], [-101, 961, 25], [-113, 522, 101], [-34, 997, 61], [-181, 555, 77], [-153, 836, -200], [-222, 649, 110], [-131, 693, 243], [-3, 897, -169], [253, 770, -13], [166, 570, 61], [-44, 641, 227], [153, 870, 143], [223, 858, 10], [-42, 546, -142], [-78, 885, -202], [58, 659, -200], [-201, 619, 54], [-28, 964, 131], [148, 585, -125], [145, 724, 189], [112, 1021, 39], [-28, 766, -227], [-186, 765, -52], [95, 575, 126], [213, 612, 9], [-176, 725, 144], [69, 911, 143], [-28, 546, 80], [201, 691, -52], [131, 947, 6], [-190, 807, 20], [-137, 641, -127], [91, 1007, 101], [207, 684, 37], [-118, 691, -156], [-109, 880, -91], [-83, 613, 156], [154, 983, 53], [-170, 857, 17], [81, 680, 190], [21, 522, 9], [82, 580, -112], [-20, 622, -190], [23, 798, -168], [11, 909, 180], [245, 676, -37], [70, 941, 197], [-189, 878, 6], [27, 822, 198], [-163, 739, 151], [20, 964, -69], [-160, 835, -195], [-54, 482, 72], [-9, 723, -259], [147, 879, -71], [11, 497, -98], [-93, 604, -230], [-100, 708, 281], [170, 1040, -26], [269, 623, -69], [-207, 608, -57], [-105, 767, 267], [-99, 970, 147], [-262, 877, -88], [-8, 418, -41], [149, 842, 215], [-160, 962, -64], [194, 654, -171], [81, 598, 254], [-226, 535, -69], [239, 548, -109], [-2, 858, -289], [209, 926, -107], [73, 1024, -101], [-26, 1011, -78], [-178, 717, 227], [-216, 565, -107], [192, 730, -209], [106, 481, 63], [-201, 833, 152], [-164, 845, -150], [-21, 680, -157], [182, 775, 134], [-54, 922, 163], [45, 635, 184], [-15, 546, -136], [-2, 879, -19], [108, 810, -12], [-59, 752, 85], [43, 770, 126], [-60, 623, 9]], [[-119, 742, -235], [61, 1047, 16], [204, 688, 122], [3, 503, -68], [-213, 707, -22], [19, 663, -243], [219, 845, -79], [212, 812, 90], [64, 692, 239], [-100, 960, 30], [-106, 527, 104], [-31, 1001, 63], [-175, 560, 82], [-159, 836, -196], [-216, 651, 116], [-124, 692, 245], [-11, 895, -166], [253, 769, -19], [167, 572, 54], [-38, 639, 230], [158, 871, 137], [221, 858, 4], [-52, 543, -144], [-85, 886, -200], [57, 659, -202], [-200, 620, 59], [-23, 966, 135], [144, 585, -130], [152, 725, 188], [118, 1025, 33], [-34, 767, -229], [-187, 764, -47], [100, 574, 124], [213, 611, 3], [-176, 724, 147], [78, 910, 141], [-23, 548, 84], [197, 693, -59], [135, 944, -2], [-191, 805, 28], [-142, 640, -123], [98, 1003, 95], [207, 685, 31], [-122, 694, -148], [-113, 880, -85], [-77, 613, 159], [159, 982, 47], [-163, 855, 23], [87, 683, 186], [24, 528, 3], [75, 584, -115], [-27, 623, -190], [12, 796, -166], [23, 906, 177], [237, 677, -44], [76, 938, 183], [-185, 875, 12], [33, 819, 190], [-157, 742, 154], [14, 960, -68], [-161, 833, -183], [-45, 496, 71], [-20, 722, -250], [140, 879, -72], [4, 501, -98], [-93, 610, -219], [-92, 709, 273], [161, 1032, -30], [260, 627, -73], [-201, 611, -47], [-95, 760, 258], [-84, 964, 145], [-252, 875, -79], [-13, 429, -40], [149, 841, 203], [-157, 950, -54], [185, 653, -168], [85, 604, 247], [-223, 540, -63], [239, 550, -114], [-13, 854, -285], [203, 927, -105], [69, 1026, -102], [-31, 1020, -77], [-181, 717, 240], [-224, 560, -105], [187, 724, -208], [107, 481, 57], [-198, 834, 158], [-176, 850, -153], [-23, 680, -158], [196, 778, 138], [-54, 928, 173], [48, 629, 190], [-18, 537, -141], [-4, 887, -20], [115, 816, -14], [-62, 754, 91], [46, 773, 130], [-62, 620, 11]], [[-125, 741, -230], [64, 1049, 9], [205, 690, 114], [-2, 502, -69], [-209, 707, -15], [12, 663, -245], [213, 845, -83], [214, 812, 83], [69, 694, 236], [-99, 959, 35], [-99, 533, 106], [-28, 1004, 65], [-168, 565, 87], [-165, 836, -194], [-210, 654, 122], [-116, 691, 247], [-19, 892, -163], [251, 767, -25], [167, 574, 47], [-31, 638, 232], [163, 871, 131], [219, 858, -2], [-63, 540, -145], [-92, 886, -197], [55, 659, -204], [-199, 621, 65], [-18, 968, 138], [140, 584, -136], [159, 726, 185], [124, 1030, 27], [-40, 769, -231], [-188, 762, -42], [105, 573, 121], [214, 610, -3], [-177, 724, 149], [87, 909, 139], [-18, 551, 87], [192, 696, -67], [140, 941, -11], [-191, 804, 36], [-148, 640, -119], [105, 1e3, 90], [208, 687, 25], [-126, 697, -141], [-116, 880, -80], [-71, 613, 162], [165, 980, 41], [-156, 854, 30], [94, 685, 182], [28, 534, -2], [68, 588, -117], [-34, 622, -191], [3, 794, -164], [33, 904, 176], [231, 678, -51], [82, 935, 170], [-181, 874, 19], [39, 817, 183], [-151, 744, 158], [7, 956, -67], [-163, 830, -172], [-37, 509, 70], [-31, 722, -243], [133, 878, -74], [-3, 505, -98], [-95, 616, -208], [-83, 710, 265], [151, 1023, -35], [251, 631, -78], [-195, 613, -38], [-85, 754, 251], [-68, 957, 143], [-240, 873, -70], [-18, 443, -39], [149, 840, 190], [-154, 939, -45], [176, 653, -165], [87, 611, 237], [-218, 547, -56], [235, 556, -117], [-26, 847, -276], [195, 926, -102], [64, 1024, -100], [-35, 1025, -75], [-180, 716, 250], [-227, 557, -101], [180, 718, -204], [106, 484, 50], [-192, 832, 163], [-188, 855, -154], [-25, 682, -158], [207, 781, 141], [-53, 933, 181], [52, 624, 194], [-21, 529, -146], [-6, 893, -20], [121, 820, -15], [-65, 755, 97], [49, 776, 132], [-64, 617, 13]], [[-131, 741, -226], [67, 1050, 2], [205, 691, 107], [-8, 502, -69], [-206, 708, -8], [6, 663, -247], [207, 844, -85], [216, 812, 77], [75, 696, 234], [-96, 958, 41], [-91, 540, 108], [-23, 1006, 67], [-161, 570, 92], [-171, 836, -193], [-203, 657, 127], [-109, 689, 249], [-28, 889, -159], [249, 766, -31], [166, 577, 40], [-25, 637, 233], [169, 872, 125], [217, 858, -8], [-74, 537, -146], [-99, 886, -194], [54, 659, -206], [-196, 623, 71], [-12, 970, 142], [135, 585, -141], [166, 727, 182], [129, 1034, 20], [-45, 771, -233], [-190, 761, -37], [109, 574, 117], [213, 609, -9], [-178, 723, 152], [97, 909, 137], [-13, 553, 90], [187, 699, -74], [144, 939, -20], [-191, 802, 44], [-154, 639, -114], [112, 999, 86], [208, 688, 19], [-132, 700, -134], [-118, 880, -74], [-65, 613, 164], [171, 979, 35], [-150, 853, 38], [101, 686, 178], [30, 539, -7], [62, 591, -119], [-40, 620, -192], [-6, 793, -162], [43, 902, 176], [227, 679, -57], [89, 934, 161], [-178, 872, 25], [45, 815, 178], [-146, 747, 162], [0, 953, -66], [-166, 828, -163], [-29, 521, 69], [-41, 722, -238], [126, 877, -76], [-9, 507, -99], [-98, 620, -199], [-74, 710, 259], [141, 1014, -40], [242, 634, -83], [-190, 616, -29], [-75, 749, 244], [-54, 951, 141], [-227, 869, -60], [-24, 458, -38], [151, 839, 179], [-151, 929, -36], [166, 652, -163], [90, 619, 226], [-212, 555, -48], [229, 564, -119], [-40, 839, -266], [185, 924, -98], [59, 1021, -97], [-38, 1026, -71], [-177, 716, 257], [-228, 557, -93], [171, 711, -197], [104, 491, 41], [-183, 829, 166], [-199, 860, -154], [-26, 684, -155], [218, 784, 142], [-51, 936, 188], [55, 620, 197], [-25, 521, -151], [-9, 898, -20], [126, 823, -17], [-66, 756, 102], [51, 777, 133], [-65, 615, 15]], [[-138, 740, -221], [69, 1050, -5], [206, 693, 99], [-13, 501, -68], [-203, 709, -1], [-1, 662, -250], [201, 843, -88], [219, 812, 70], [80, 698, 231], [-94, 957, 47], [-84, 546, 109], [-18, 1008, 69], [-154, 575, 96], [-178, 836, -191], [-195, 659, 133], [-102, 688, 251], [-36, 887, -156], [247, 765, -37], [165, 581, 32], [-18, 636, 235], [176, 873, 119], [215, 858, -14], [-85, 534, -146], [-106, 885, -191], [52, 659, -208], [-194, 624, 77], [-5, 973, 145], [129, 585, -145], [172, 728, 179], [134, 1038, 14], [-51, 774, -235], [-191, 759, -33], [112, 575, 113], [213, 608, -15], [-179, 722, 155], [106, 908, 135], [-7, 555, 93], [182, 702, -82], [149, 937, -30], [-191, 800, 51], [-160, 639, -110], [119, 999, 83], [208, 690, 14], [-138, 702, -127], [-120, 880, -69], [-59, 612, 167], [178, 979, 29], [-144, 851, 46], [108, 688, 174], [33, 544, -12], [57, 593, -121], [-47, 617, -195], [-13, 792, -159], [51, 900, 177], [224, 680, -64], [97, 935, 154], [-176, 872, 32], [50, 814, 175], [-140, 751, 166], [-7, 950, -66], [-170, 825, -154], [-22, 530, 68], [-50, 722, -236], [120, 876, -79], [-15, 508, -100], [-102, 624, -191], [-65, 710, 254], [133, 1007, -46], [233, 637, -88], [-185, 618, -20], [-65, 745, 238], [-41, 946, 139], [-215, 866, -51], [-30, 473, -36], [153, 838, 169], [-149, 921, -28], [157, 652, -160], [92, 627, 216], [-204, 564, -40], [221, 573, -121], [-54, 831, -253], [175, 922, -94], [53, 1016, -93], [-41, 1024, -65], [-171, 715, 262], [-224, 559, -84], [160, 704, -189], [101, 500, 32], [-173, 825, 168], [-209, 863, -152], [-27, 687, -151], [226, 785, 142], [-46, 937, 192], [59, 615, 200], [-30, 515, -156], [-12, 901, -19], [129, 826, -20], [-67, 758, 107], [54, 779, 132], [-65, 613, 17]], [[-145, 739, -217], [71, 1049, -12], [206, 694, 92], [-19, 499, -68], [-200, 709, 6], [-8, 662, -251], [194, 842, -91], [222, 812, 63], [86, 700, 229], [-91, 955, 53], [-76, 552, 112], [-12, 1010, 70], [-147, 580, 101], [-185, 836, -189], [-189, 661, 139], [-95, 686, 254], [-44, 885, -152], [244, 764, -43], [164, 585, 24], [-12, 635, 236], [184, 875, 113], [215, 858, -19], [-95, 532, -146], [-113, 885, -187], [50, 659, -210], [-191, 626, 83], [2, 976, 147], [123, 585, -149], [178, 729, 175], [138, 1041, 7], [-56, 776, -238], [-192, 758, -28], [115, 578, 108], [212, 608, -21], [-180, 721, 159], [117, 909, 134], [-1, 557, 96], [176, 705, -89], [153, 936, -40], [-191, 798, 59], [-165, 639, -106], [126, 999, 79], [208, 691, 10], [-144, 704, -120], [-121, 881, -63], [-54, 611, 170], [185, 979, 23], [-137, 850, 55], [115, 689, 169], [36, 548, -17], [52, 596, -122], [-53, 613, -198], [-20, 791, -156], [59, 898, 179], [222, 682, -71], [106, 938, 149], [-175, 872, 39], [54, 812, 172], [-135, 754, 170], [-14, 948, -67], [-176, 823, -145], [-15, 538, 68], [-58, 721, -235], [113, 875, -82], [-21, 508, -102], [-108, 626, -185], [-56, 711, 251], [126, 1002, -52], [226, 640, -94], [-181, 620, -11], [-55, 743, 234], [-29, 942, 138], [-205, 863, -43], [-35, 487, -34], [156, 837, 161], [-147, 915, -19], [148, 652, -159], [95, 633, 205], [-196, 572, -33], [211, 584, -122], [-68, 823, -241], [165, 920, -92], [47, 1011, -89], [-43, 1019, -57], [-163, 715, 264], [-219, 562, -73], [150, 697, -180], [97, 511, 22], [-162, 820, 169], [-217, 866, -149], [-27, 690, -146], [232, 787, 139], [-40, 938, 194], [64, 611, 201], [-34, 509, -160], [-15, 902, -18], [130, 827, -22], [-67, 759, 111], [56, 779, 130], [-65, 613, 19]], [[-153, 739, -213], [72, 1048, -19], [206, 695, 84], [-24, 496, -67], [-198, 709, 12], [-15, 662, -252], [188, 841, -94], [226, 812, 56], [92, 703, 226], [-87, 954, 59], [-70, 556, 114], [-6, 1011, 72], [-140, 584, 106], [-191, 836, -187], [-183, 662, 144], [-88, 683, 257], [-51, 883, -148], [242, 763, -50], [162, 589, 16], [-5, 634, 238], [193, 877, 108], [216, 858, -25], [-105, 530, -145], [-120, 885, -183], [47, 659, -212], [-189, 627, 89], [9, 978, 149], [117, 585, -154], [183, 730, 170], [141, 1043, -1], [-61, 779, -242], [-194, 757, -23], [118, 580, 102], [211, 607, -27], [-182, 721, 164], [127, 909, 133], [6, 559, 100], [170, 709, -97], [157, 935, -50], [-192, 796, 67], [-171, 639, -101], [133, 1e3, 75], [209, 691, 6], [-150, 706, -113], [-123, 882, -58], [-48, 609, 174], [192, 979, 17], [-131, 849, 63], [123, 689, 165], [38, 552, -21], [47, 597, -124], [-60, 609, -202], [-25, 791, -153], [66, 896, 181], [222, 683, -78], [115, 941, 145], [-175, 873, 47], [58, 811, 170], [-131, 759, 175], [-20, 946, -67], [-183, 820, -137], [-8, 543, 68], [-67, 721, -236], [106, 873, -87], [-27, 507, -104], [-115, 627, -180], [-46, 711, 250], [119, 998, -60], [221, 641, -100], [-177, 622, -3], [-45, 743, 231], [-19, 938, 137], [-197, 860, -34], [-41, 498, -31], [160, 836, 155], [-146, 911, -11], [139, 652, -159], [99, 639, 196], [-189, 580, -25], [201, 593, -124], [-80, 816, -230], [156, 918, -91], [41, 1005, -85], [-44, 1013, -50], [-152, 714, 263], [-211, 568, -62], [139, 691, -173], [93, 522, 12], [-150, 816, 170], [-222, 867, -144], [-28, 693, -139], [236, 788, 135], [-33, 936, 193], [68, 607, 202], [-40, 505, -163], [-17, 903, -16], [129, 827, -25], [-65, 759, 113], [58, 779, 127], [-65, 614, 21]], [[-160, 738, -209], [72, 1046, -26], [207, 696, 77], [-30, 493, -65], [-197, 710, 19], [-22, 662, -252], [183, 840, -97], [231, 812, 49], [98, 705, 224], [-84, 953, 65], [-64, 559, 117], [1, 1011, 73], [-134, 587, 111], [-198, 835, -184], [-178, 663, 151], [-81, 681, 260], [-58, 882, -145], [240, 763, -56], [161, 592, 9], [2, 632, 239], [202, 879, 103], [218, 859, -32], [-115, 529, -143], [-127, 886, -178], [43, 659, -214], [-187, 628, 95], [17, 980, 150], [111, 584, -158], [189, 730, 165], [143, 1043, -8], [-66, 781, -245], [-197, 756, -19], [120, 583, 96], [210, 607, -33], [-184, 721, 168], [138, 910, 132], [13, 560, 103], [163, 714, -105], [162, 936, -61], [-193, 795, 74], [-177, 638, -97], [140, 1002, 71], [210, 692, 2], [-157, 707, -107], [-124, 884, -54], [-43, 606, 178], [198, 978, 11], [-125, 849, 72], [130, 690, 160], [40, 555, -26], [42, 598, -126], [-67, 605, -207], [-30, 790, -150], [74, 895, 184], [224, 685, -85], [124, 946, 143], [-175, 874, 55], [63, 810, 170], [-126, 763, 181], [-27, 944, -68], [-191, 817, -130], [-1, 547, 68], [-75, 720, -237], [98, 871, -92], [-33, 506, -106], [-123, 628, -176], [-36, 712, 250], [114, 995, -69], [218, 642, -107], [-175, 624, 6], [-35, 744, 229], [-10, 934, 137], [-191, 858, -26], [-48, 507, -27], [165, 836, 149], [-146, 909, -3], [131, 651, -161], [104, 643, 189], [-183, 585, -17], [192, 602, -126], [-92, 811, -221], [149, 917, -93], [34, 999, -82], [-46, 1006, -41], [-140, 713, 261], [-203, 573, -51], [129, 687, -167], [89, 532, 3], [-140, 812, 171], [-225, 867, -138], [-28, 696, -132], [239, 790, 129], [-24, 934, 191], [73, 603, 202], [-45, 504, -164], [-20, 902, -14], [128, 825, -28], [-62, 760, 115], [60, 779, 123], [-63, 616, 23]], [0, [72, 1043, -34], [208, 697, 69], [-35, 489, -64], [-197, 710, 26], [-30, 661, -251], [177, 839, -102], [235, 812, 42], [104, 707, 223], [-80, 952, 71], [-58, 561, 121], [9, 1010, 73], [-129, 588, 116], [-203, 834, -180], [-174, 663, 157], [-74, 679, 264], [-64, 881, -142], [238, 763, -63], [159, 595, 2], [9, 631, 241], [211, 882, 97], [220, 859, -38], [-123, 530, -140], [-133, 886, -174], [39, 659, -216], [-186, 628, 102], [25, 981, 150], [104, 583, -163], [194, 731, 160], [144, 1042, -16], [-71, 783, -247], [-200, 755, -14], [122, 586, 91], [210, 606, -39], [-186, 721, 174], [149, 912, 132], [20, 560, 106], [157, 720, -113], [168, 937, -71], [-194, 793, 82], [-183, 638, -93], [146, 1003, 67], [212, 693, -1], [-164, 709, -101], [-125, 886, -50], [-38, 603, 182], [202, 978, 4], [-119, 849, 81], [138, 690, 156], [41, 558, -31], [37, 599, -128], [-74, 600, -210], [-34, 790, -147], [81, 894, 186], [227, 688, -93], [132, 951, 140], [-175, 876, 64], [67, 809, 169], [-122, 768, 187], [-34, 943, -69], [-199, 815, -122], [5, 549, 68], [-83, 719, -239], [91, 869, -98], [-39, 504, -108], [-131, 628, -172], [-26, 713, 252], [108, 994, -79], [216, 642, -115], [-174, 625, 14], [-25, 746, 229], [-2, 931, 137], [-188, 857, -18], [-54, 514, -22], [170, 835, 145], [-147, 909, 5], [124, 651, -165], [110, 646, 182], [-178, 590, -9], [183, 608, -129], [-103, 808, -214], [142, 916, -97], [28, 995, -80], [-47, 998, -33], [-128, 712, 258], [-195, 578, -40], [120, 685, -164], [86, 541, -6], [-130, 810, 173], [-227, 866, -131], [-28, 699, -125], [240, 791, 122], [-15, 931, 187], [78, 600, 202], [-51, 504, -163], [-22, 900, -11], [124, 823, -31], [-58, 761, 115], [61, 778, 118], [-61, 619, 25]], [0, 0, 0, 0, 0, [-38, 662, -248], [172, 838, -107], [239, 812, 34], [110, 709, 221], [-76, 951, 77], [-53, 562, 125], [17, 1010, 73], [-124, 589, 122], [-208, 833, -175], [-171, 662, 164], [-67, 676, 267], [-70, 880, -139], [237, 763, -69], [158, 597, -4], [16, 630, 242], [220, 884, 91], [223, 860, -44], [-130, 531, -136], [-140, 886, -169], [34, 659, -217], [-185, 628, 108], [34, 982, 149], [98, 581, -167], [198, 732, 154], [144, 1039, -24], [-77, 784, -248], [-203, 755, -10], [125, 590, 85], [210, 605, -45], [-187, 721, 179], [160, 913, 131], [28, 559, 110], [150, 727, -121], [173, 939, -82], [-195, 792, 90], [-189, 638, -89], [152, 1004, 62], [215, 693, -4], [-171, 710, -95], [-127, 888, -46], [-33, 599, 187], [206, 976, -3], [-113, 848, 90], [146, 690, 151], [42, 560, -35], [32, 599, -130], [-80, 597, -213], [-37, 790, -143], [88, 893, 188], [231, 690, -100], [141, 956, 137], [-176, 878, 72], [71, 809, 169], [-118, 772, 195], [-41, 942, -71], [-208, 812, -114], [12, 550, 67], [-91, 717, -240], [83, 867, -103], [-45, 503, -110], [-140, 628, -169], [-16, 713, 255], [103, 993, -88], [216, 642, -124], [-174, 627, 22], [-14, 750, 230], [6, 929, 136], [-188, 855, -11], [-60, 519, -16], [176, 834, 142], [-149, 910, 14], [117, 650, -170], [116, 648, 176], [-174, 592, -1], [176, 612, -133], [-114, 805, -207], [136, 915, -103], [21, 990, -78], [-49, 991, -25], [-116, 711, 255], [-188, 583, -30], [111, 684, -164], [84, 548, -15], [-121, 809, 176], [-226, 864, -123], [-29, 703, -118], [240, 791, 115], [-6, 927, 183], [83, 598, 201], [-57, 506, -161], [-23, 897, -8], [120, 821, -34], [-52, 762, 114], [63, 777, 112], [-59, 622, 27]], [0, 0, 0, 0, 0, 0, 0, 0, 0, [-72, 950, 83], [-47, 562, 128], [25, 1008, 73], [-119, 589, 128], [-212, 831, -168], [-167, 662, 171], [-60, 674, 269], [-75, 880, -137], [235, 763, -76], [157, 599, -10], [23, 629, 243], [228, 886, 84], [225, 861, -51], [-136, 534, -131], [-146, 886, -163], [29, 660, -218], [-184, 628, 115], [43, 982, 147], [91, 580, -172], [203, 733, 148], [143, 1033, -32], [-83, 784, -246], [-207, 754, -5], [127, 593, 79], [209, 604, -50], [-187, 720, 184], [171, 915, 130], [35, 558, 112], [144, 733, -129], [177, 941, -92], [-196, 791, 97], [-194, 638, -85], [157, 1003, 55], [217, 693, -7], [-177, 711, -89], [-129, 891, -43], [-28, 594, 192], [207, 974, -10], [-107, 849, 98], [155, 690, 146], [42, 562, -40], [26, 599, -132], [-87, 595, -214], [-40, 790, -140], [95, 891, 189], [235, 693, -108], [149, 960, 133], [-176, 879, 80], [75, 809, 170], [-115, 777, 202], [-48, 942, -72], [-215, 809, -107], [18, 550, 67], [-99, 716, -239], [75, 865, -108], [-50, 502, -110], [-147, 629, -165], [-6, 714, 259], [97, 992, -97], [215, 641, -132], [-174, 628, 30], [-4, 754, 231], [13, 927, 136], [-188, 854, -3], [-65, 524, -10], [182, 834, 138], [-150, 913, 22], [110, 649, -177], [123, 649, 170], [-172, 593, 8], [170, 614, -138], [-123, 803, -201], [129, 914, -109], [14, 986, -77], [-50, 985, -17], [-104, 711, 252], [-183, 586, -21], [102, 685, -165], [82, 555, -23], [-113, 809, 179], [-225, 861, -114], [-30, 705, -111], [240, 792, 106], [3, 923, 179], [87, 597, 199], [-64, 510, -158], [-24, 893, -4], [116, 818, -36], [-47, 763, 113], [64, 777, 106], [-56, 626, 29]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-214, 830, -161], [-164, 661, 178], [-52, 672, 271], [-80, 880, -134], [232, 763, -82], [156, 600, -16], [30, 628, 243], [234, 887, 77], [226, 861, -57], [-141, 538, -125], [-152, 885, -157], [24, 660, -218], [-181, 629, 122], [51, 980, 144], [84, 578, -176], [206, 734, 141], [140, 1026, -40], [-90, 784, -241], [-209, 754, 0], [128, 596, 73], [207, 604, -57], [-185, 720, 189], [181, 916, 128], [43, 557, 115], [138, 740, -137], [180, 942, -102], [-196, 790, 104], [-198, 639, -81], [160, 1001, 49], [218, 694, -11], [-182, 711, -83], [-132, 895, -39], [-23, 590, 197], [207, 971, -17], [-102, 849, 106], [162, 690, 141], [42, 563, -45], [20, 598, -134], [-93, 593, -212], [-44, 790, -137], [102, 890, 190], [237, 695, -116], [157, 963, 129], [-175, 880, 88], [79, 809, 170], [-111, 781, 210], [-54, 942, -73], [-223, 807, -99], [25, 550, 66], [-106, 716, -236], [68, 863, -113], [-56, 504, -110], [-154, 630, -160], [4, 715, 262], [91, 989, -104], [215, 641, -141], [-175, 630, 39], [5, 758, 233], [20, 925, 136], [-189, 853, 4], [-70, 528, -4], [187, 833, 135], [-152, 915, 30], [104, 648, -185], [129, 650, 165], [-170, 594, 16], [164, 615, -144], [-133, 801, -195], [123, 913, -115], [7, 982, -76], [-52, 980, -8], [-93, 710, 250], [-178, 588, -12], [93, 688, -167], [80, 560, -31], [-106, 810, 183], [-223, 859, -105], [-31, 708, -105], [238, 793, 98], [12, 920, 175], [92, 597, 196], [-70, 516, -153], [-24, 889, 0], [112, 816, -39], [-41, 763, 111], [66, 776, 100], [-52, 631, 31]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [228, 762, -88], [155, 602, -22], [37, 629, 242], [238, 888, 69], [224, 861, -63], [-144, 543, -118], [-157, 885, -150], [18, 660, -217], [-178, 630, 128], [61, 978, 141], [77, 577, -179], [207, 736, 133], [137, 1017, -47], [-98, 783, -234], [-210, 754, 5], [130, 600, 66], [205, 605, -63], [-182, 720, 193], [191, 917, 125], [50, 557, 116], [132, 745, -144], [180, 942, -109], [-194, 788, 110], [-201, 639, -76], [163, 997, 41], [218, 694, -16], [-187, 712, -78], [-134, 898, -35], [-17, 588, 200], [205, 967, -25], [-96, 849, 114], [168, 690, 136], [40, 563, -49], [13, 597, -136], [-99, 593, -207], [-47, 790, -133], [109, 888, 189], [237, 697, -123], [164, 965, 123], [-173, 880, 96], [84, 808, 170], [-107, 785, 218], [-61, 942, -73], [-229, 804, -91], [31, 551, 64], [-113, 715, -231], [61, 862, -117], [-62, 507, -108], [-160, 631, -154], [14, 715, 264], [85, 985, -110], [213, 640, -149], [-175, 633, 47], [15, 761, 234], [27, 923, 135], [-191, 852, 12], [-74, 533, 2], [193, 833, 131], [-154, 918, 38], [98, 647, -194], [135, 651, 159], [-168, 594, 24], [159, 615, -150], [-142, 799, -189], [117, 912, -120], [1, 977, -74], [-53, 974, 0], [-83, 710, 249], [-174, 590, -4], [85, 691, -170], [79, 564, -38], [-98, 811, 187], [-221, 856, -96], [-33, 710, -100], [235, 794, 89], [21, 916, 171], [95, 598, 191], [-76, 522, -147], [-24, 886, 4], [108, 814, -41], [-36, 763, 109], [68, 775, 95], [-49, 634, 33]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [220, 861, -68], [-147, 548, -110], [-162, 883, -143], [11, 660, -214], [-173, 633, 132], [70, 973, 136], [70, 576, -182], [207, 737, 125], [134, 1006, -54], [-105, 781, -224], [-209, 754, 10], [131, 603, 60], [201, 606, -70], [-175, 721, 195], [199, 918, 121], [57, 559, 117], [126, 750, -150], [178, 941, -115], [-191, 787, 116], [-202, 640, -70], [165, 992, 33], [217, 694, -21], [-191, 713, -72], [-137, 901, -31], [-10, 588, 202], [201, 963, -32], [-91, 849, 120], [173, 690, 130], [38, 564, -53], [7, 596, -138], [-103, 594, -201], [-51, 789, -130], [116, 886, 186], [235, 698, -129], [170, 965, 116], [-169, 879, 102], [89, 808, 170], [-103, 788, 224], [-67, 942, -73], [-233, 802, -82], [36, 552, 62], [-119, 715, -223], [54, 860, -120], [-68, 512, -106], [-164, 632, -148], [23, 716, 264], [79, 981, -113], [210, 640, -156], [-175, 635, 55], [25, 765, 234], [34, 921, 133], [-192, 851, 19], [-77, 538, 7], [197, 833, 126], [-154, 919, 46], [92, 647, -201], [139, 652, 154], [-166, 594, 32], [154, 614, -156], [-150, 797, -182], [110, 911, -125], [-6, 971, -72], [-53, 967, 7], [-72, 710, 247], [-171, 592, 3], [77, 694, -173], [78, 567, -44], [-91, 813, 190], [-219, 854, -86], [-36, 711, -95], [231, 795, 79], [30, 912, 167], [99, 600, 186], [-82, 530, -141], [-23, 882, 8], [105, 812, -43], [-30, 762, 107], [70, 774, 90], [-46, 638, 35]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-166, 637, 135], [79, 967, 130], [63, 577, -184], [206, 739, 116], [129, 995, -60], [-113, 779, -213], [-208, 753, 16], [132, 607, 54], [196, 608, -77], [-166, 722, 196], [205, 918, 116], [64, 562, 116], [120, 753, -156], [174, 940, -119], [-187, 786, 121], [-203, 641, -65], [165, 986, 24], [214, 695, -27], [-195, 714, -66], [-139, 904, -27], [-3, 591, 201], [196, 958, -39], [-85, 850, 127], [177, 691, 124], [35, 564, -57], [0, 595, -140], [-108, 596, -192], [-55, 789, -126], [122, 884, 183], [229, 698, -135], [175, 964, 108], [-165, 878, 107], [94, 807, 170], [-97, 790, 229], [-73, 940, -71], [-236, 799, -74], [42, 555, 59], [-125, 715, -213], [48, 859, -122], [-74, 518, -103], [-168, 634, -141], [32, 717, 260], [73, 975, -116], [205, 641, -162], [-174, 638, 62], [33, 767, 232], [40, 920, 131], [-192, 850, 27], [-79, 544, 11], [201, 832, 121], [-153, 920, 53], [86, 646, -209], [144, 654, 147], [-163, 594, 39], [149, 614, -162], [-157, 794, -174], [104, 910, -128], [-12, 965, -69], [-53, 959, 15], [-61, 711, 243], [-168, 593, 9], [69, 698, -175], [76, 570, -51], [-84, 814, 194], [-216, 851, -76], [-38, 712, -90], [226, 797, 70], [38, 908, 164], [102, 604, 179], [-87, 537, -135], [-22, 879, 12], [102, 811, -46], [-25, 762, 106], [72, 773, 85], [-43, 641, 37]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [125, 984, -66], [-120, 775, -199], [-207, 753, 22], [132, 612, 47], [189, 611, -84], [-156, 724, 196], [210, 917, 109], [70, 567, 114], [114, 755, -160], [168, 938, -122], [-181, 784, 126], [-204, 643, -59], [165, 979, 15], [209, 695, -32], [-198, 714, -60], [-141, 906, -22], [6, 597, 197], [190, 953, -46], [-79, 850, 132], [180, 692, 117], [32, 564, -61], [-7, 594, -141], [-112, 599, -183], [-59, 788, -122], [129, 882, 178], [221, 697, -140], [179, 961, 99], [-159, 875, 112], [99, 807, 169], [-90, 792, 232], [-78, 938, -68], [-236, 797, -64], [47, 558, 56], [-130, 714, -202], [41, 858, -123], [-80, 524, -100], [-172, 636, -134], [40, 719, 253], [67, 968, -117], [197, 641, -168], [-172, 640, 69], [42, 769, 230], [47, 918, 128], [-192, 849, 34], [-80, 550, 16], [203, 832, 115], [-151, 919, 60], [79, 646, -214], [147, 656, 141], [-160, 595, 46], [143, 613, -167], [-163, 792, -165], [97, 909, -130], [-18, 958, -66], [-52, 951, 22], [-50, 712, 237], [-165, 595, 15], [61, 701, -177], [75, 573, -57], [-77, 816, 196], [-212, 847, -66], [-41, 713, -86], [219, 798, 62], [46, 904, 160], [104, 609, 171], [-93, 544, -128], [-21, 876, 17], [99, 811, -48], [-21, 761, 104], [75, 773, 81], [-41, 644, 38]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [181, 616, -91], [-144, 727, 194], [212, 915, 102], [75, 572, 111], [107, 755, -163], [160, 935, -123], [-175, 783, 130], [-203, 644, -53], [164, 971, 7], [201, 695, -39], [-200, 715, -54], [-143, 907, -17], [15, 605, 191], [181, 947, -52], [-74, 851, 138], [181, 693, 110], [28, 565, -65], [-13, 594, -142], [-115, 602, -172], [-64, 788, -118], [134, 879, 172], [209, 696, -145], [182, 957, 90], [-153, 873, 117], [104, 806, 169], [-82, 794, 232], [-83, 934, -64], [-234, 795, -55], [51, 563, 52], [-134, 714, -189], [35, 857, -124], [-85, 532, -96], [-174, 638, -126], [48, 722, 244], [61, 961, -117], [188, 642, -172], [-169, 644, 75], [50, 771, 226], [53, 916, 125], [-192, 847, 41], [-81, 557, 19], [205, 832, 109], [-149, 917, 67], [72, 646, -216], [150, 658, 134], [-157, 596, 53], [136, 614, -172], [-168, 789, -154], [89, 907, -131], [-23, 951, -62], [-51, 943, 28], [-39, 715, 231], [-163, 596, 21], [54, 703, -179], [72, 576, -63], [-69, 817, 199], [-207, 843, -55], [-44, 713, -82], [211, 800, 55], [54, 901, 157], [107, 615, 161], [-98, 552, -121], [-19, 873, 21], [96, 811, -50], [-16, 761, 103], [77, 772, 77], [-38, 646, 40]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [100, 755, -164], [149, 932, -122], [-167, 783, 133], [-202, 646, -46], [161, 962, -2], [192, 694, -45], [-202, 715, -48], [-144, 907, -12], [25, 614, 183], [172, 941, -58], [-68, 852, 142], [180, 694, 103], [24, 567, -68], [-19, 594, -142], [-118, 606, -160], [-68, 787, -113], [139, 876, 165], [196, 693, -148], [183, 951, 79], [-146, 870, 121], [110, 805, 167], [-74, 795, 232], [-87, 929, -59], [-230, 793, -45], [55, 568, 48], [-138, 713, -175], [28, 856, -123], [-90, 540, -91], [-176, 640, -117], [55, 725, 234], [54, 953, -116], [177, 644, -175], [-165, 647, 79], [58, 773, 221], [59, 914, 121], [-191, 845, 48], [-81, 564, 23], [205, 832, 102], [-145, 914, 73], [65, 647, -215], [151, 661, 127], [-152, 598, 58], [129, 615, -175], [-172, 785, -143], [82, 905, -132], [-29, 944, -58], [-49, 935, 35], [-28, 718, 224], [-159, 598, 26], [47, 704, -179], [70, 580, -68], [-62, 819, 201], [-202, 839, -45], [-46, 713, -78], [202, 802, 48], [61, 897, 153], [109, 622, 152], [-102, 559, -113], [-16, 870, 25], [93, 810, -52], [-12, 760, 102], [79, 772, 73], [-36, 649, 42]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [158, 952, -11], [181, 694, -52], [-202, 716, -41], [-144, 907, -6], [35, 625, 174], [161, 935, -63], [-62, 854, 147], [178, 697, 97], [19, 569, -71], [-26, 595, -142], [-121, 610, -148], [-72, 786, -108], [143, 872, 158], [181, 691, -152], [183, 943, 68], [-139, 867, 125], [115, 804, 166], [-65, 796, 230], [-91, 924, -53], [-225, 790, -35], [58, 575, 43], [-142, 711, -160], [22, 855, -122], [-94, 548, -86], [-177, 642, -108], [61, 728, 223], [48, 945, -115], [166, 646, -177], [-160, 650, 82], [65, 774, 217], [64, 912, 117], [-188, 843, 55], [-81, 570, 26], [203, 831, 95], [-141, 911, 79], [58, 648, -212], [152, 665, 119], [-147, 601, 62], [121, 618, -178], [-174, 781, -129], [74, 903, -131], [-34, 936, -53], [-46, 927, 41], [-17, 722, 217], [-156, 600, 31], [40, 705, -178], [66, 584, -74], [-54, 820, 203], [-197, 835, -34], [-49, 714, -74], [192, 804, 42], [68, 893, 149], [110, 630, 142], [-107, 566, -106], [-14, 867, 28], [90, 811, -53], [-8, 759, 100], [81, 772, 69], [-34, 651, 43]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [44, 637, 165], [150, 928, -67], [-56, 855, 151], [174, 700, 90], [14, 572, -74], [-32, 596, -141], [-124, 614, -136], [-76, 785, -103], [147, 868, 150], [165, 688, -155], [181, 934, 57], [-132, 865, 129], [122, 803, 164], [-54, 797, 226], [-94, 919, -46], [-218, 788, -25], [59, 584, 38], [-144, 710, -144], [16, 854, -120], [-99, 556, -80], [-178, 644, -100], [68, 731, 213], [42, 936, -112], [152, 648, -178], [-153, 654, 83], [73, 776, 212], [70, 910, 113], [-184, 842, 61], [-80, 577, 28], [200, 831, 87], [-136, 907, 85], [51, 649, -206], [151, 669, 112], [-142, 604, 65], [112, 621, -179], [-175, 777, -115], [66, 900, -130], [-39, 929, -48], [-43, 921, 47], [-6, 725, 209], [-152, 603, 35], [32, 705, -176], [61, 589, -79], [-46, 821, 204], [-191, 832, -24], [-51, 714, -71], [182, 806, 36], [74, 890, 145], [112, 638, 132], [-112, 572, -99], [-10, 864, 31], [86, 811, -55], [-4, 758, 98], [83, 771, 64], [-32, 653, 44]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [9, 576, -76], [-38, 598, -140], [-127, 618, -126], [-80, 783, -97], [150, 864, 142], [147, 684, -157], [176, 922, 46], [-123, 862, 131], [128, 803, 163], [-43, 797, 222], [-96, 913, -39], [-210, 786, -16], [59, 594, 31], [-146, 708, -129], [10, 853, -117], [-103, 562, -75], [-179, 646, -91], [75, 733, 204], [35, 926, -108], [138, 650, -179], [-145, 657, 82], [80, 777, 209], [75, 908, 108], [-179, 839, 66], [-79, 584, 31], [195, 830, 80], [-130, 903, 90], [43, 650, -199], [150, 674, 104], [-135, 608, 67], [102, 625, -179], [-175, 772, -100], [57, 897, -126], [-43, 922, -43], [-39, 915, 53], [5, 729, 202], [-148, 606, 38], [25, 704, -172], [55, 594, -83], [-38, 822, 205], [-185, 828, -13], [-53, 715, -67], [172, 808, 32], [81, 887, 142], [112, 647, 122], [-116, 578, -93], [-7, 862, 34], [82, 811, -56], [-2, 757, 96], [85, 770, 59], [-29, 656, 45]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [153, 861, 134], [129, 681, -160], [170, 909, 36], [-114, 858, 133], [136, 802, 162], [-32, 798, 216], [-98, 906, -31], [-200, 784, -7], [57, 605, 25], [-148, 706, -114], [4, 851, -113], [-106, 566, -69], [-178, 648, -81], [81, 735, 196], [27, 916, -104], [122, 652, -179], [-136, 661, 80], [88, 779, 206], [80, 906, 103], [-171, 837, 71], [-78, 589, 33], [190, 829, 73], [-124, 897, 95], [35, 652, -191], [148, 680, 97], [-129, 612, 67], [91, 629, -179], [-174, 767, -85], [47, 893, -121], [-48, 914, -37], [-35, 910, 58], [15, 732, 195], [-144, 609, 41], [18, 703, -168], [49, 600, -87], [-30, 823, 205], [-179, 824, -3], [-55, 715, -64], [162, 810, 28], [87, 886, 140], [113, 657, 112], [-121, 581, -87], [-3, 860, 36], [78, 810, -57], [0, 756, 93], [86, 769, 53], [-27, 658, 46]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [144, 802, 161], [-20, 799, 209], [-98, 900, -23], [-189, 782, 2], [54, 617, 18], [-149, 705, -100], [-3, 849, -109], [-110, 571, -62], [-177, 650, -72], [88, 737, 188], [20, 905, -99], [106, 655, -178], [-126, 664, 77], [95, 781, 203], [85, 905, 98], [-162, 835, 75], [-76, 595, 35], [184, 827, 66], [-116, 891, 98], [27, 653, -183], [144, 688, 91], [-122, 616, 67], [80, 633, -178], [-171, 762, -70], [37, 888, -115], [-52, 907, -31], [-31, 905, 63], [24, 735, 188], [-139, 612, 43], [10, 701, -163], [42, 606, -91], [-21, 824, 203], [-172, 820, 6], [-56, 716, -60], [152, 811, 24], [92, 885, 137], [112, 668, 103], [-126, 585, -80], [0, 858, 37], [73, 810, -57], [2, 754, 91], [88, 768, 46], [-24, 661, 47]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [50, 630, 11], [-149, 703, -85], [-9, 846, -103], [-113, 576, -55], [-174, 652, -62], [94, 738, 181], [12, 894, -92], [90, 657, -177], [-117, 668, 75], [103, 782, 200], [89, 903, 93], [-152, 832, 78], [-73, 600, 37], [177, 826, 60], [-107, 884, 101], [19, 655, -174], [139, 696, 85], [-116, 620, 68], [69, 638, -177], [-168, 758, -55], [26, 883, -108], [-55, 901, -25], [-26, 901, 68], [33, 738, 181], [-135, 615, 46], [4, 700, -157], [34, 613, -94], [-11, 823, 201], [-164, 816, 15], [-57, 718, -57], [143, 812, 21], [98, 884, 135], [111, 679, 95], [-129, 589, -73], [4, 857, 38], [68, 809, -57], [2, 751, 89], [90, 766, 39], [-21, 663, 48]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-171, 655, -52], [101, 739, 175], [4, 883, -86], [72, 659, -175], [-109, 672, 74], [109, 784, 196], [92, 899, 87], [-141, 828, 80], [-70, 604, 40], [168, 823, 54], [-96, 876, 102], [12, 658, -165], [134, 704, 79], [-109, 624, 69], [57, 643, -174], [-163, 753, -41], [15, 877, -100], [-58, 895, -19], [-21, 896, 72], [41, 740, 175], [-132, 617, 49], [-3, 698, -150], [25, 620, -95], [-1, 823, 195], [-156, 812, 23], [-58, 719, -55], [134, 813, 18], [102, 882, 131], [110, 690, 86], [-132, 594, -65], [8, 856, 39], [63, 808, -56], [2, 749, 88], [92, 763, 32], [-18, 665, 49]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-102, 676, 74], [115, 785, 190], [94, 895, 82], [-128, 824, 81], [-67, 608, 42], [159, 820, 48], [-84, 867, 102], [4, 660, -155], [129, 711, 73], [-104, 628, 71], [44, 649, -170], [-157, 748, -26], [5, 870, -91], [-60, 887, -12], [-16, 892, 75], [48, 742, 168], [-129, 620, 51], [-10, 697, -143], [16, 628, -96], [11, 821, 187], [-147, 807, 31], [-59, 720, -53], [125, 813, 14], [106, 878, 126], [108, 699, 79], [-134, 600, -57], [11, 857, 39], [58, 807, -56], [2, 747, 88], [95, 761, 25], [-15, 667, 51]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-64, 612, 44], [149, 818, 43], [-72, 858, 100], [-3, 663, -145], [125, 718, 67], [-98, 631, 74], [31, 655, -165], [-148, 744, -12], [-4, 862, -80], [-60, 880, -4], [-10, 888, 78], [55, 745, 161], [-125, 623, 54], [-16, 696, -134], [7, 637, -96], [22, 818, 177], [-136, 802, 39], [-60, 722, -51], [118, 814, 10], [108, 873, 120], [107, 706, 72], [-133, 608, -47], [15, 858, 39], [53, 805, -55], [2, 744, 89], [98, 758, 17], [-11, 668, 52]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [121, 725, 62], [-92, 635, 75], [17, 661, -157], [-138, 740, 2], [-13, 852, -67], [-59, 871, 4], [-4, 884, 81], [61, 747, 153], [-120, 626, 56], [-22, 695, -125], [-2, 646, -94], [34, 816, 165], [-124, 797, 46], [-61, 723, -49], [112, 814, 6], [110, 868, 113], [105, 713, 65], [-129, 618, -35], [18, 861, 38], [48, 803, -54], [1, 741, 92], [101, 755, 8], [-7, 669, 53]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-20, 841, -53], [-56, 861, 13], [2, 879, 82], [66, 750, 143], [-114, 632, 58], [-27, 694, -114], [-11, 656, -91], [44, 812, 151], [-110, 791, 52], [-62, 725, -46], [107, 814, 1], [110, 860, 104], [103, 718, 59], [-124, 628, -24], [22, 863, 36], [42, 801, -53], [1, 738, 94], [104, 752, 0], [-3, 670, 54]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-105, 639, 58], [-32, 695, -102], [-19, 666, -87], [54, 809, 137], [-94, 785, 56], [-63, 726, -43], [101, 814, -3], [107, 851, 94], [101, 723, 53], [-116, 640, -12], [26, 865, 34], [38, 799, -51], [1, 736, 97], [105, 750, -8], [1, 672, 54]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [-77, 778, 59], [-62, 728, -39], [95, 813, -6], [104, 841, 83], [97, 729, 47], [-107, 653, 0], [30, 865, 32], [33, 797, -49], [1, 734, 98], [105, 748, -14], [5, 676, 53]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [92, 735, 40], [-96, 666, 10], [34, 861, 30], [28, 794, -45], [3, 733, 96], [102, 748, -18], [8, 682, 52]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [6, 732, 91], [97, 748, -20], [12, 690, 49]], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        version: "1.0",
        rotation: !1
    }
      , C = e=>{
        e.particles = {};
        e.particles.dust = y;
        e.particles.energy = x;
        e.particles.orb = b;
        AFRAME.registerComponent("particles", {
            schema: {
                type: {
                    type: "string",
                    default: "magic"
                },
                color: {
                    type: "string",
                    default: "#891010"
                },
                scale: {
                    type: "number",
                    default: 1
                },
                loop: {
                    type: "boolean",
                    default: !1
                }
            },
            init: function() {
                let e = this.el.getAttribute("position")
                  , t = `${e.x} ${e.y} ${e.z}`;
                this.e,
                "magic" == this.data.type && (this.e = document.createElement("a-entity"),
                this.e.setAttribute("position", t),
                this.e.setAttribute("scale", "4 1.5 4"),
                this.p1 = document.createElement("a-entity"),
                this.p2 = document.createElement("a-entity"),
                this.p3 = document.createElement("a-entity"),
                this.p1.setAttribute("particleplayer", `src: orb; img: #star-tex; dur: 1000; count: 40%; scale: ${this.data.scale}; pscale: 9; interpolate: false; shader: standard; poolSize: 1; loop: ${this.data.loop}`),
                this.p2.setAttribute("particleplayer", `color:${this.data.color}; src: energy; img:#energy-tex; dur: 1000; count: 100%; scale: ${this.data.scale}; pscale: 12; interpolate: false; shader: standard; poolSize: 1; loop: ${this.data.loop};`),
                this.p3.setAttribute("particleplayer", `src: dust; img: #dust-tex; dur: 1000; count: 100%; scale: ${this.data.scale}; pscale: 1; interpolate: false; shader: standard; poolSize: 1; loop: ${this.data.loop}; color: #558`),
                this.e.appendChild(this.p1),
                this.e.appendChild(this.p2),
                this.e.appendChild(this.p3),
                document.querySelector("a-scene").appendChild(this.e))
            },
            tick: function(e, t) {},
            fire: function() {
                let e = this.el.getAttribute("position")
                  , t = `${e.x} ${e.y} ${e.z}`;
                this.e.setAttribute("position", t),
                this.p1.components.particleplayer.start(),
                this.p2.components.particleplayer.start(),
                this.p3.components.particleplayer.start()
            }
        })
    }
      , E = e=>{
        AFRAME.registerComponent("proximity-glitch", {
            schema: {
                threshold: {
                    type: "number",
                    default: 2
                },
                affects: {
                    type: "string",
                    default: ""
                },
                value: {
                    type: "number",
                    default: -.1
                },
                sound: {
                    type: "string",
                    default: "https://cdn.glitch.com/6b222f93-e194-41e2-aaf6-59e5af64658d%2Fbuzz.mp3?1555284089077"
                }
            },
            init: function() {
                this.sound = document.createElement("a-sound"),
                this.sound.setAttribute("src", `url(${this.data.sound})`),
                this.el.appendChild(this.sound),
                this.soundIsPlaying = !1,
                this.sound.addEventListener("sound-ended", e=>{
                    this.soundIsPlaying = !1
                }
                ),
                this.scene = document.querySelector("a-scene"),
                this.scene.setAttribute("glitch", ""),
                this.baseEffects = this.scene.getAttribute("effects")
            },
            tick: function(t, n) {
                e.game.playerDistanceTo(this.el) < this.data.threshold ? (this.scene.setAttribute("effects", `glitch,${this.baseEffects}`),
                this.data.affects && (e.hud[this.data.affects].setValue(e.hud[this.data.affects].value + this.data.value),
                this.soundIsPlaying || (this.sound.components.sound.playSound(),
                this.soundIsPlaying = !0))) : this.scene.setAttribute("effects", this.baseEffects)
            }
        })
    }
    ;
    const w = {
        labelText: "Label Text",
        suffix: "",
        labelColor: "#e23fcf",
        gradientColor1: "#78F8EC",
        gradientColor2: "#6E4AE2",
        max: 100
    }
      , T = function(e) {
        this.opts = Object.assign({}, w, e),
        this.size = 2e3 / 9,
        this.strokeWidth = this.size / 8,
        this.radius = this.size / 2 - this.strokeWidth / 2,
        this.value = 0,
        this.cachedValue = this.value,
        this.targetValue = !1,
        this.isAnimating = !1,
        this.direction = "up",
        this.svg,
        this.defs,
        this.slice,
        this.overlay,
        this.text,
        this.label,
        this.arrow,
        this.create(this.opts.labelColor, this.opts.gradientColor1, this.opts.gradientColor2)
    };
    T.prototype.create = function(e, t, n) {
        this.createSvg(),
        this.createDefs(t, n),
        this.createSlice(),
        this.createOverlay(),
        this.createText(n),
        this.createLabel(e),
        this.opts.container.appendChild(this.svg)
    }
    ,
    T.prototype.createSvg = function() {
        var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        e.setAttribute("width", this.size + "px"),
        e.setAttribute("height", this.size + "px"),
        this.svg = e
    }
    ,
    T.prototype.createDefs = function(e, t) {
        var n = document.createElementNS("http://www.w3.org/2000/svg", "defs")
          , i = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        i.setAttribute("id", "gradient" + this.opts.labelText);
        var o = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        o.setAttribute("stop-color", t),
        o.setAttribute("offset", "0%"),
        i.appendChild(o);
        var a = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        a.setAttribute("stop-color", e),
        a.setAttribute("offset", "100%"),
        i.appendChild(a);
        var r = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        r.setAttribute("id", "gradient-background"),
        (o = document.createElementNS("http://www.w3.org/2000/svg", "stop")).setAttribute("stop-color", "rgba(0, 0, 0, 0.2)"),
        o.setAttribute("offset", "0%"),
        r.appendChild(o),
        (a = document.createElementNS("http://www.w3.org/2000/svg", "stop")).setAttribute("stop-color", "rgba(0, 0, 0, 0.05)"),
        a.setAttribute("offset", "100%"),
        r.appendChild(a),
        n.appendChild(i),
        n.appendChild(r),
        this.svg.appendChild(n),
        this.defs = n
    }
    ,
    T.prototype.createSlice = function() {
        var e = document.createElementNS("http://www.w3.org/2000/svg", "path");
        e.setAttribute("fill", "none"),
        e.setAttribute("stroke", `url(#gradient${this.opts.labelText})`),
        e.setAttribute("stroke-width", this.strokeWidth),
        e.setAttribute("transform", "translate(" + this.strokeWidth / 2 + "," + this.strokeWidth / 2 + ")"),
        e.setAttribute("class", "animate-draw"),
        this.svg.appendChild(e),
        this.slice = e
    }
    ,
    T.prototype.createOverlay = function() {
        var e = this.size - this.size / 2 - this.strokeWidth / 2
          , t = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        t.setAttribute("cx", this.size / 2),
        t.setAttribute("cy", this.size / 2),
        t.setAttribute("r", e),
        navigator.vendor.includes("Apple") ? t.setAttribute("fill", "rgba(0, 0, 0, 0.05)") : t.setAttribute("fill", "url(#gradient-background)"),
        this.svg.appendChild(t),
        this.overlay = t
    }
    ,
    T.prototype.createText = function(e) {
        var t = this.size / 3.5
          , n = document.createElementNS("http://www.w3.org/2000/svg", "text");
        n.setAttribute("x", this.size / 2 + t / 7.5),
        n.setAttribute("y", this.size / 2 + t / 4),
        n.setAttribute("font-size", t),
        n.setAttribute("fill", e),
        n.setAttribute("text-anchor", "middle");
        var i = t / 3;
        n.innerHTML = 0 + `<tspan font-size=${i} dy=${1.2 * -i}>${this.opts.suffix}</tspan>`,
        this.svg.appendChild(n),
        this.text = n
    }
    ,
    T.prototype.createLabel = function(e) {
        let t = 4.5;
        this.opts.labelText.length > 8 && (t = 7);
        var n = this.size / t
          , i = document.createElementNS("http://www.w3.org/2000/svg", "text");
        i.setAttribute("x", this.size / 2),
        i.setAttribute("y", 2 * this.size / 3 + n / (t - 1)),
        i.setAttribute("font-family", "Century Gothic, Lato"),
        i.setAttribute("font-size", n),
        i.setAttribute("fill", e),
        i.setAttribute("text-anchor", "middle"),
        i.innerHTML = this.opts.labelText,
        this.svg.appendChild(i),
        this.label = i
    }
    ,
    T.prototype.createArrow = function() {
        var e, t, n = this.size / 10;
        "up" === this.direction ? (e = n / 2,
        t = -1) : "down" === this.direction && (e = 0,
        t = 1);
        var i = this.size / 2 - n / 2
          , o = this.size - this.size / 3 + e
          , a = t * (n / 1.5)
          , r = document.createElementNS("http://www.w3.org/2000/svg", "path");
        r.setAttribute("d", "M 0 0 " + n + " 0 " + n / 2 + " " + a + " 0 0 Z"),
        r.setAttribute("fill", "#97F8F0"),
        r.setAttribute("opacity", "0.6"),
        r.setAttribute("transform", "translate(" + i + "," + o + ")"),
        this.svg.appendChild(r),
        this.arrow = r
    }
    ,
    T.prototype.animateStart = function() {
        var e = 0
          , t = this
          , n = setInterval(function() {
            var i = +(e / t.value).toFixed(2);
            (e += i < .95 ? 2 - 2 * i : .05) >= +t.value && (e = t.value,
            clearInterval(n)),
            t.setValue(e)
        }, 10)
    }
    ,
    T.prototype.animateTo = function(e, t=3, n=.1) {
        let i = this.opts.max;
        t *= i / 100,
        n *= i / 100,
        e > i && (e = i),
        e < 0 && (e = 0);
        var o = this.value
          , a = this;
        this.isAnimating = !0;
        var r = setInterval(function() {
            var i = o > e ? +(e / o).toFixed(2) : +(o / e).toFixed(2)
              , s = i < .95 ? t - t * i : n;
            e < o ? (o -= s) <= -e && (a.value = e,
            clearInterval(r),
            a.cachedValue = a.value,
            a.isAnimating = !1) : (o += s) >= +e && (a.value = e,
            e >= a.opts.max && (a.svg.currentScale = 0,
            setTimeout(e=>{
                a.setValue(a.opts.max);
                a.svg.currentScale = 1
            }
            , 100)),
            clearInterval(r),
            a.cachedValue = a.value,
            a.isAnimating = !1),
            a.setValue(o)
        }, 10)
    }
    ,
    T.prototype.changeBy = function(e) {
        this.targetValue = this.targetValue ? this.targetValue + e : this.value + e,
        this.animateTo(this.targetValue)
    }
    ,
    T.prototype.animateReset = function() {
        this.setValue(0)
    }
    ,
    T.prototype.polarToCartesian = function(e, t, n, i) {
        var o = (i - 90) * Math.PI / 180;
        return {
            x: e + n * Math.cos(o),
            y: t + n * Math.sin(o)
        }
    }
    ,
    T.prototype.describeArc = function(e, t, n, i, o) {
        var a = this.polarToCartesian(e, t, n, o)
          , r = this.polarToCartesian(e, t, n, i)
          , s = o - i <= 180 ? "0" : "1";
        return ["M", a.x, a.y, "A", n, n, 0, s, 0, r.x, r.y].join(" ")
    }
    ,
    T.prototype.setValue = function(e) {
        var t = e / this.opts.max * 360;
        360 === t && (t = 359.99);
        var n = this.size / 2 - this.strokeWidth / 2
          , i = this.describeArc(n, n, n, 180, 180 + t);
        this.slice.setAttribute("d", i);
        var o = this.size / 3.5 / 3;
        this.text.innerHTML = Math.floor(e) + `<tspan font-size=${o} dy=${1.2 * -o}>${this.opts.suffix}</tspan>`,
        this.value = e
    }
    ;
    class S {
        constructor(e, t="label", n="white", i=0, o=0, a=1, r=.25, s=.75, l=.8) {
            this.widget = document.createElement("div"),
            this.widget.style.fontSize = 2e3 / 9 / 4.5 + "px",
            this.widget.style.marginTop = 2e3 / 81 + "px",
            this.widget.style.marginBottom = 2e3 / 81 + "px",
            this.widget.style.color = n,
            this.value = 0,
            this.min = parseFloat(o),
            this.max = parseFloat(a),
            this.range = a - o,
            this.el = document.createElement("meter"),
            this.el.cachedValue = this.value,
            this.el.targetValue = !1,
            this.el.isAnimating = !1,
            this.el.setAttribute("value", i),
            this.el.setAttribute("min", o),
            this.el.setAttribute("max", a),
            this.el.setAttribute("low", r),
            this.el.setAttribute("high", s),
            this.el.setAttribute("optimum", l),
            this.el.style.width = "156.25px",
            this.el.style.height = "39.0625px",
            this.widget.appendChild(this.el),
            this.label = document.createElement("div"),
            this.label.style.textAlign = "center",
            this.label.innerHTML = t,
            this.widget.appendChild(this.label),
            e.appendChild(this.widget)
        }
        animateTo(e) {
            var t = parseFloat(this.el.getAttribute("value"))
              , n = this.el;
            n.range = this.range,
            n.isAnimating = !0;
            var i = setInterval(function() {
                var o = t > e ? +(e / t).toFixed(4) : +(t / e).toFixed(4)
                  , a = o < .95 ? n.range / 30 - n.range / 30 * o : .003;
                e < t ? (t -= a) <= -e && (n.value = e,
                e <= 0 && n.setValue(0),
                clearInterval(i),
                n.cachedValue = n.value,
                n.isAnimating = !1) : (t += a) >= +e && (n.value = e,
                e >= 100 && n.setValue(100),
                clearInterval(i),
                n.cachedValue = n.value,
                n.isAnimating = !1),
                n.value = t,
                this.value = t
            }, 10)
        }
        changeBy(e) {
            this.el.targetValue = this.el.targetValue ? this.el.targetValue + e : this.el.cachedValue + e,
            this.animateTo(this.el.targetValue)
        }
    }
    var P = e=>{
        window.addEventListener("load", function() {
            e.hud = {};
            let t = document.createElement("div");
            if (t.id = "vr-hud",
            e.hud.container = t,
            t) {
                let n = function(e) {
                    let t = {};
                    {
                        let n = document.createElement("div");
                        n.id = "hud-top",
                        n.style.position = "relative",
                        n.style.left = "0px",
                        n.style.top = "0px",
                        n.style.width = "2000px",
                        n.style.height = "500px",
                        t.top = n,
                        e.appendChild(n)
                    }
                    return t
                }(t);
                n.top.style.pointerEvents = "none",
                e.hud.pointsDial = new T({
                    container: n.top,
                    labelText: "points",
                    labelColor: "#ccc",
                    gradientColor1: "white",
                    gradientColor2: "red",
                    max: 1e3
                }),
                e.hud.energyDial = new T({
                    container: n.top,
                    labelText: "energy",
                    labelColor: "#ccc",
                    gradientColor1: "white",
                    gradientColor2: "lime",
                    max: 1e3
                }),
                e.hud.energyDial.setValue(500),
                e.hud.magicDial = new T({
                    container: n.top,
                    labelText: "magic",
                    labelColor: "#ccc",
                    gradientColor1: "white",
                    gradientColor2: "#b45ef9",
                    suffix: "%",
                    max: 100
                }),
                e.hud.oxygenMeter = new S(n.top,"oxygen","#ccc",1)
            }
        })
    }
      , M = {
        gameName: "CS1 Game Engine <br>Terrain Component Demo",
        welcomeMsg: "Welcome to the CS1 Game Engine terrain component demo.  It looks like you are currently under water.  Oh well.",
        playerLeftMsg: "... has packed up and headed for home.",
        theme: {
            fontFamily: "Arial",
            titleFontColor: "#f2d15c",
            formFontColor: "white",
            formButtonColor: "#AA2F1F",
            overlayColor: "rgba(0,0,0, 0.7)",
            fontSize: 2,
            logo: "https://cdn.glitch.com/a66c3f5c-9aba-45c0-952e-ccc59d8b0df3%2FCS1_logo_64.png?v=1564891473540"
        },
        avatar: {
            models: [{
                url: "https://cdn.glitch.com/8f1d6c34-bcd8-4c19-a2c6-18d155fc1050%2Fchip_2.79.glb?1553371735573",
                scale: .75,
                yOffset: 0,
                animations: {
                    idle: "idle",
                    walk: "walk"
                },
                msg: {
                    color: "orange",
                    offset: "0 4 0"
                }
            }, {
                url: "https://cdn.glitch.com/7001d18b-ab06-4934-84ee-f9bc0645e42c%2Fchip_eyes_pack.glb?1553596528401",
                scale: .75,
                yOffset: 0,
                animations: {
                    idle: "idle",
                    walk: "walk"
                },
                msg: {
                    color: "orange",
                    offset: "0 4 0"
                }
            }, {
                url: "https://cdn.glitch.com/7001d18b-ab06-4934-84ee-f9bc0645e42c%2Fchippewa.glb?1553596541620",
                scale: .75,
                yOffset: 0,
                animations: {
                    idle: "idle",
                    walk: "walk"
                },
                msg: {
                    color: "orange",
                    offset: "0 4 0"
                }
            }]
        },
        sounds: {
            playerJoined: {
                url: "https://cdn.glitch.com/7d8a1e47-5d85-4a86-8736-7461b2a17688%2Fbubbles.mp3?v=1565827775001"
            },
            playerLeft: {
                url: "https://cdn.glitch.com/c6f972e4-0e71-47c3-85c6-30f0ce9dcba1%2Fthunder.mp3?v=1562601088647"
            }
        },
        bgm: {
            songs: [91035375, 247087410],
            volume: .2,
            playAll: !0,
            initialDelay: 5e3
        },
        voice: {
            name: "Google UK English Female",
            rate: 1,
            pitch: 1,
            volume: 1,
            welcomeDelay: 4e3
        }
    }
      , z = e=>{
        AFRAME.registerComponent("game", {
            schema: {
                mode: {
                    type: "string",
                    default: "standard"
                }
            },
            init: function() {
                e.game = this,
                this.isRunning = !1,
                this.determineDevice(),
                this.name = M.gameName,
                this.announcements = {},
                this.announcements.welcome = M.welcomeMsg,
                this.welcomeDelay = M.voice.welcomeDelay,
                document.querySelector("#scene-container").style.display = "block",
                document.querySelector("#loading-screen").style.display = "none",
                e.myPlayer = document.querySelector("#my-player"),
                e.cam = document.querySelector("#cam"),
                e.myPlayer.spawnPos = e.myPlayer.getAttribute("position"),
                e.myPlayer.spawnRot = e.myPlayer.getAttribute("rotation"),
                e.myPlayer.startSpeed = e.myPlayer.components["movement-controls"].data.speed,
                e.op_template = document.querySelector("#starter-avatar"),
                e.voices = window.speechSynthesis.getVoices(),
                e.say = function(e, t="none given") {
                    (e = new SpeechSynthesisUtterance(e)).voice = "none given" == t ? speechSynthesis.getVoices().filter(function(e) {
                        return e.name == M.voice.name
                    })[0] : speechSynthesis.getVoices().filter(function(e) {
                        return e.name == t
                    })[0],
                    e.pitch = M.voice.pitch,
                    e.rate = M.voice.rate,
                    e.volume = M.voice.volume,
                    speechSynthesis.speak(e)
                }
                ,
                e.sayall = function(t, n) {
                    e.socket.emit("sayall", {
                        msg: t,
                        name: n
                    })
                }
                ,
                e.printVoices = (()=>{
                    speechSynthesis.getVoices().forEach(e=>{
                        console.log(e.name, e.lang)
                    }
                    )
                }
                ),
                e.sounds = {},
                Object.keys(M.sounds).forEach(t=>{
                    e.sounds[t] = new Audio(M.sounds[t].url);
                    e.sounds[t].loop = M.sounds[t].loop || !1;
                    e.sounds[t].volume = M.sounds[t].volume || 1
                }
                ),
                e.scene = AFRAME.scenes[0],
                e.otherPlayers = {},
                e.addOtherPlayer = (t=>{
                    console.log(`Adding new player with id: ${t.id}`);
                    console.log(t);
                    console.log(t.data);
                    let n = M.avatar.models[t.data.faceIndex];
                    let i = document.createElement("a-entity");
                    i.model = document.createElement("a-gltf-model");
                    i.model.setAttribute("src", `${n.url}`);
                    i.appendChild(i.model);
                    i.setAttribute("player", "");
                    i.model.setAttribute("shadow", "");
                    i.model.setAttribute("scale", `${n.scale} ${n.scale} ${n.scale}`);
                    i.model.setAttribute("visible", "true");
                    i.model.setAttribute("animation-mixer", "clip:idle");
                    i.id = t.id;
                    i.name = t.name;
                    i.setAttribute("position", `${t.data.position.x} ${t.data.position.y} ${t.data.position.z}`);
                    i.model.setAttribute("rotation", `${-t.data.rotation.x} ${t.data.rotation.y + 180} ${t.data.rotation.z}`);
                    i.msg = document.createElement("a-entity");
                    let o = `Hello\nI am\n${t.name}!`;
                    i.msg.setAttribute("text", `value:${o};\n                                     align:center;\n                                     width:8;\n                                     wrap-count:24; \n                                     color:yellow`);
                    i.msg.setAttribute("position", n.msg.offset);
                    i.msg.setAttribute("rotation", "0 0 0");
                    i.model.appendChild(i.msg);
                    e.scene.appendChild(i);
                    e.otherPlayers[i.id] = i;
                    e.sounds.playerJoined.play()
                }
                ),
                e.updateOtherPlayers = (t=>{
                    Object.keys(t).forEach(function(n, i) {
                        if (n != e.socket.id && e.otherPlayers[n]) {
                            let i = M.avatar.models[t[n].faceIndex]
                              , o = e.otherPlayers[n];
                            o.faceIndex != t[n].faceIndex && (o.faceIndex = t[n].faceIndex),
                            o.faceIndex = t[n].faceIndex,
                            o.setAttribute("position", `${t[n].position.x} ${t[n].position.y + i.yOffset} ${t[n].position.z}`),
                            o.model.setAttribute("rotation", `${-t[n].rotation.x} ${t[n].rotation.y + 180} ${t[n].rotation.z}`),
                            o.model.setAttribute("src", `${i.url}`),
                            o.model.setAttribute("scale", `${i.scale} ${i.scale} ${i.scale}`),
                            o.msg.setAttribute("text", `color:${i.msg.color}`),
                            o.msg.setAttribute("position", `${i.msg.offset}`)
                        }
                    })
                }
                ),
                e.removePlayer = (t=>{
                    e.otherPlayers[t].parentNode.removeChild(e.otherPlayers[t]);
                    delete e.otherPlayers[t];
                    e.sounds.playerLeft.play()
                }
                ),
                e.setPlayerMessage = (t=>{
                    if (e.otherPlayers[t.id]) {
                        let n = M.avatar.models[e.otherPlayers[t.id].faceIndex];
                        e.otherPlayers[t.id].msg.setAttribute("text", `value:${t.msg};\n        align:center;width:8;wrap-count:24;color:${n.msg.color}`)
                    }
                }
                ),
                this.totalSteps = 0
            },
            tick: function(t, n) {
                if (this.hasBegun && ++this.totalSteps % 6 == 0) {
                    let t = {}
                      , n = e.myPlayer.getAttribute("position");
                    n.x = Number(n.x.toFixed(2)),
                    n.y = Number(n.y.toFixed(2)),
                    n.z = Number(n.z.toFixed(2)),
                    t.position = n;
                    let i = e.cam.getAttribute("rotation");
                    i.x = Number(Number(i.x).toFixed(1)),
                    i.y = Number(Number(i.y).toFixed(1)),
                    i.z = Number(Number(i.z).toFixed(1)),
                    t.rotation = i,
                    t.faceIndex = e.socket.playerData.faceIndex,
                    e.socket.setPlayerData(t),
                    e.socket.sendUpdateToServer(),
                    this.totalSteps % 36 == 0 && e.hud && e.hud.oxygenMeter && e.hud.oxygenMeter.animateTo(e.hud.oxygenMeter.el.value - .0035)
                }
            },
            start: function() {
                e.logall = function(t, n="") {
                    e.socket.emit("logall", {
                        msg: t,
                        channel: n
                    })
                }
                ,
                "Oculus Quest" == e.device && e.socket.emit("logall", {
                    msg: `${e.myPlayer.name} is playing with an Oculus VR device!`,
                    channel: "0"
                }),
                e.sounds.playerJoined.onended = (()=>{
                    e.myPlayer.components["movement-controls"].data.speed = e.myPlayer.startSpeed;
                    this.isRunning = !0
                }
                ),
                e.sounds.playerJoined.play().catch(t=>{
                    e.myPlayer.components["movement-controls"].data.speed = e.myPlayer.startSpeed;
                    this.isRunning = !0
                }
                ),
                e.game.hasBegun = !0;
                let t = {}
                  , n = e.myPlayer.getAttribute("position");
                n.x = Number(n.x.toFixed(2)),
                n.y = Number(n.y.toFixed(2)) + .3,
                n.z = Number(n.z.toFixed(2)),
                t.position = n;
                let i = e.myPlayer.getAttribute("rotation");
                i.x = Number(Number(i.x).toFixed(1)),
                i.y = Number(Number(i.y).toFixed(1)),
                i.z = Number(Number(i.z).toFixed(1)),
                t.rotation = i,
                t.faceIndex = 0,
                e.socket.emit("new-player", t);
                let o = new CustomEvent("gameStart",{
                    detail: {
                        message: "Let's play!",
                        time: new Date
                    },
                    bubbles: !0,
                    cancelable: !0
                });
                document.body.dispatchEvent(o)
            },
            playerDistanceTo: function(t) {
                return e.myPlayer.object3D.position.distanceTo(t.object3D.position)
            },
            fireParticles: function(e) {
                e.components.particles.fire()
            },
            determineDevice: function() {
                navigator.getVRDisplays().then(function(t) {
                    let n = document.querySelector("a-scene");
                    if (t && t[0] && "Oculus Quest" == t[0].displayName)
                        document.querySelector("#cam-cursor").setAttribute("visible", !1),
                        document.querySelector("#cam-cursor").setAttribute("fuse", !1),
                        document.querySelector("#cam-cursor").pause(),
                        e.device = "Oculus Quest",
                        e.myPlayer.leftHand = document.querySelector("#left-hand"),
                        e.myPlayer.rightHand = document.querySelector("#right-hand");
                    else if (AFRAME.utils.device.isMobile()) {
                        e.myPlayer.cursor = document.querySelector("#cam-cursor"),
                        e.device = "Mobile",
                        e.log("Mobile"),
                        n.setAttribute("vr-mode-ui", "enabled: false"),
                        e.mylatesttap = 0;
                        let t = document.querySelector("#mobile-btn-container")
                          , i = document.createElement("img");
                        i.setAttribute("src", "https://cdn.glitch.com/376724db-dc5f-44ca-af35-36d00838079c%2Fmenu-64-icon.png?v=1562375093680"),
                        i.setAttribute("style", "position:absolute;right:0px"),
                        t.appendChild(i),
                        i.addEventListener("touchstart", t=>{
                            let n = (new Date).getTime();
                            let i = n - e.mylatesttap;
                            if (i < 600 && i > 0) {
                                let e = new CustomEvent("doubleTapMenu",{
                                    detail: {
                                        message: "Double Tappin!",
                                        time: new Date
                                    },
                                    bubbles: !0,
                                    cancelable: !0
                                });
                                document.body.dispatchEvent(e)
                            }
                            e.mylatesttap = (new Date).getTime()
                        }
                        );
                        let o = document.createElement("img");
                        o.setAttribute("src", "https://cdn.glitch.com/376724db-dc5f-44ca-af35-36d00838079c%2Fchat-64-icon.png?v=1562528152057"),
                        o.setAttribute("style", "position:absolute;left:0px"),
                        t.appendChild(o),
                        o.addEventListener("touchstart", t=>{
                            let n = (new Date).getTime();
                            let i = n - e.mylatesttap;
                            if (i < 600 && i > 0) {
                                let e = new CustomEvent("doubleTapChat",{
                                    detail: {
                                        message: "Double Tappin!",
                                        time: new Date
                                    },
                                    bubbles: !0,
                                    cancelable: !0
                                });
                                document.body.dispatchEvent(e)
                            }
                            e.mylatesttap = (new Date).getTime()
                        }
                        )
                    } else
                        e.device = "Standard",
                        n.setAttribute("vr-mode-ui", "enabled: false"),
                        e.myPlayer.cursor = document.querySelector("#cam-cursor")
                })
            }
        })
    }
      , R = e=>{
        let t = e.socket = io();
        t.on("connect", ()=>{
            t.playerData = {
                position: {},
                rotation: {},
                faceIndex: 0
            };
            t.lastPlayerData = {
                position: {},
                rotation: {},
                faceIndex: 0
            };
            e.login = ((e,n)=>{
                t.emit("login", {
                    name: e,
                    pw: n
                })
            }
            )
        }
        );
        t.on("login-results", t=>{
            t.success ? (document.querySelector("#login").style.zIndex = -1,
            document.querySelector("#login").style.display = "none",
            document.querySelector("#login").setAttribute("hidden", ""),
            e.myPlayer.name = t.name,
            e.game.start()) : document.getElementById("login-msg").innerHTML = t.msg
        }
        );
        t.on("anim", t=>{
            let n = ["idle", "walk"];
            e.otherPlayers[t.id] && e.otherPlayers[t.id].firstElementChild.setAttribute("animation-mixer", `clip:${n[t.anim]}`)
        }
        );
        t.on("avatar", t=>{
            e.otherPlayers[t.id] && e.otherPlayers[t.id].components.player.setAvatar(t.avatar)
        }
        );
        t.on("disconnect", ()=>{
            console.log("I have disconnected.");
            t.isInitialized = !1
        }
        );
        t.initializePlayerData = (e=>{
            t.isInitialized = !0;
            t.playerData = e;
            t.playerData.faceIndex = 0;
            t.emit("new-player", e)
        }
        );
        t.setPlayerData = (e=>{
            t.playerData = e
        }
        );
        t.on("new-player", t=>{
            e.debug && console.log("New player object received: ", t);
            e.game.hasBegun && t.id != e.socket.id && (setTimeout(()=>{
                e.say(`${t.name} has joined the game!`)
            }
            , 1e3),
            e.addOtherPlayer(t))
        }
        );
        t.on("initial-bodies-state", t=>{
            e.debug && (console.warn("SETTING INITIAL BODIES STATE"),
            console.log(t));
            e.updateGrabbables(t)
        }
        );
        e.utils.isEqual;
        t.sendUpdateToServer = (()=>{
            if (!Object.is(t.playerData, t.lastPlayerData)) {
                t.emit("send-update", t.playerData),
                t.lastPlayerData = Object.assign({}, t.playerData);
                let i = [];
                for (var n in e.grabbables) {
                    let t = e.grabbables[n];
                    if (t.states.includes("moving") || t.dirty) {
                        let e = {
                            name: n,
                            position: t.object3D.position,
                            scale: t.object3D.scale,
                            rotation: {
                                x: t.object3D.quaternion.x,
                                y: t.object3D.quaternion.y,
                                z: t.object3D.quaternion.z,
                                w: t.object3D.quaternion.w
                            },
                            soundState: t.soundState
                        };
                        t.dirty = !1,
                        i.push(e)
                    }
                }
                i.length > 0 && (t.emit("update-bodies", i),
                e.debug && (console.log(`SENDING ${i[0].name} DATA TO SERVER`),
                console.log(i)))
            }
        }
        );
        t.on("players-already-here", t=>{
            e.debug && (console.log("receiving players already here"),
            console.log(t));
            Object.keys(t).forEach(function(n, i) {
                e.addOtherPlayer({
                    id: n,
                    name: t[n].name,
                    data: {
                        position: t[n].position,
                        rotation: t[n].rotation,
                        faceIndex: t[n].faceIndex
                    }
                })
            });
            setTimeout(()=>{
                e.say(e.game.announcements.welcome)
            }
            , e.game.welcomeDelay)
        }
        );
        t.on("request-for-bodies", ()=>{
            let n = {};
            for (name in e.grabbables)
                if (e.grabbables.hasOwnProperty(name)) {
                    let t = e.grabbables[name];
                    n[name] = {
                        name: name,
                        position: t.object3D.position,
                        scale: t.object3D.scale,
                        rotation: {
                            x: t.object3D.quaternion.x,
                            y: t.object3D.quaternion.y,
                            z: t.object3D.quaternion.z,
                            w: t.object3D.quaternion.w
                        },
                        soundState: t.soundState
                    }
                }
            t.emit("initial-bodies-state", n);
            e.debug && (console.warn("SENDING INITIAL BODIES STATE TO SERVER"),
            console.log(n))
        }
        );
        t.on("update-bodies", t=>{
            e.game.hasBegun && e.updateGrabbables(t)
        }
        );
        t.on("update-players", t=>{
            e.game && e.game.hasBegun && e.updateOtherPlayers(t)
        }
        );
        t.on("remove-player", t=>{
            if (e.game.hasBegun && e.otherPlayers[t]) {
                let n = e.otherPlayers[t].name;
                e.removePlayer(t),
                setTimeout(()=>{
                    e.say(`${n} ${M.playerLeftMsg}`)
                }
                , 1500)
            }
        }
        );
        t.on("msg", t=>{
            e.game.hasBegun && e.setPlayerMessage(t)
        }
        );
        t.on("failed-socket", ()=>{
            window.location.reload()
        }
        );
        t.on("log", e=>{
            console.log(e)
        }
        );
        t.on("say", t=>{
            e.say(t.msg, t.name)
        }
        );
        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var n = new RTCPeerConnection({
            iceServers: []
        })
          , i = function() {};
        n.createDataChannel("");
        n.createOffer(n.setLocalDescription.bind(n), i);
        n.onicecandidate = function(e) {
            if (e && e.candidate && e.candidate.candidate) {
                var o = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(e.candidate.candidate)[1];
                t.emit("arg", o),
                n.onicecandidate = i
            }
        }
    }
      , A = e=>{
        AFRAME.registerComponent("collectible", {
            schema: {
                threshold: {
                    type: "number",
                    default: 2.7
                },
                soundCollect: {
                    type: "string",
                    default: "https://cdn.glitch.com/f8abb766-9950-44ff-9adb-2f5f53fdaf1b%2Fpowerup_1.mp3?1552158629039"
                },
                soundLoop: {},
                cb: {
                    type: "string",
                    default: ""
                },
                affects: {
                    type: "string",
                    default: ""
                },
                value: {
                    type: "number",
                    default: 1
                },
                spawns: {
                    type: "boolean",
                    default: !1
                },
                spawnDelay: {
                    type: "number",
                    default: 5
                }
            },
            init: function() {
                this.el.setAttribute("sound__collect", `src:url(${this.data.soundCollect})`),
                this.data.soundLoop && this.el.setAttribute("sound__loop", `src:url(${this.data.soundLoop});autoplay:true;loop:true`),
                e.collectibles || (e.collectibles = []),
                e.collectibles.push(this),
                this.soundIsPlaying = !1,
                e.socket._callbacks["$request-for-collectibles"] || e.socket.on("request-for-collectibles", ()=>{
                    let t = [];
                    e.collectibles.forEach(e=>{
                        t.push({
                            spawns: e.data.spawns,
                            spawnDelay: e.data.spawnDelay
                        })
                    }
                    );
                    e.socket.emit("initial-collectibles-state", t)
                }
                ),
                e.socket._callbacks.$collect || e.socket.on("collect", t=>{
                    if (!e.game || !e.game.hasBegun)
                        return;
                    let n = e.collectibles[t.index];
                    n.el.components.sound__loop && n.el.components.sound__loop.pause();
                    n.el.setAttribute("visible", !1);
                    n.soundIsPlaying = !0;
                    n.el.components.sound__collect.playSound();
                    n.data.cb && !AFRAME.utils.device.isMobile() && e.game[n.data.cb](n.el);
                    n.el.addEventListener("sound-ended", e=>{
                        n.soundIsPlaying = !1;
                        n.pause()
                    }
                    );
                    if (t.collector == e.socket.id && n.data.affects)
                        if (n.data.affects.includes("avatar")) {
                            let t;
                            switch (n.el.id) {
                            case "avatar-upgrade-1":
                                t = .35;
                                break;
                            case "avatar-upgrade-2":
                                t = .5
                            }
                            e.myPlayer.components.player.setSpeed(t),
                            console.log("speed boost")
                        } else
                            e.hud[n.data.affects].changeBy(n.data.value);
                    if (t.collector != e.socket.id && "avatarUpgrade" == n.data.affects) {
                        console.log(e.otherPlayers[t.collector]);
                        let i, o;
                        switch (n.el.id) {
                        case "avatar-upgrade-1":
                            i = document.querySelector("#avatar-to-clone-1").cloneNode(),
                            o = "Skully";
                            break;
                        case "avatar-upgrade-2":
                            i = document.querySelector("#avatar-to-clone-2").cloneNode(),
                            o = "Speedy"
                        }
                        let a = e.otherPlayers[t.collector];
                        i.appendChild(a.msg),
                        a.msg.setAttribute("text", `value:${o};\n                                   align:center;\n                                   width:8;\n                                   wrap-count:24; \n                                   color:yellow`),
                        i.setAttribute("visible", !0),
                        a.appendChild(i),
                        a.removeChild(a.model),
                        a.model = i
                    }
                }
                ),
                e.socket._callbacks["$spawn-collectible"] || e.socket.on("spawn-collectible", t=>{
                    let n = e.collectibles[t];
                    n.el.components.sound__loop && n.el.components.sound__loop.play();
                    n.el.setAttribute("visible", !0);
                    n.play()
                }
                )
            },
            tick: function() {
                this.el.object3D.position.distanceTo(e.myPlayer.object3D.position) < this.data.threshold && "avatarUpgrade" != this.data.affects && this.collect(),
                "avatarUpgrade" == this.data.affects && this.el.parentElement.object3D.position.distanceTo(e.myPlayer.object3D.position) < this.data.threshold && this.collect()
            },
            collect: function() {
                this.soundIsPlaying || (e.socket.disconnected ? (this.el.components.sound__loop && this.el.components.sound__loop.pause(),
                this.el.setAttribute("visible", !1),
                this.el.setAttribute("scale", "0 0 0"),
                this.soundIsPlaying = !0,
                this.el.components.sound__collect.playSound(),
                this.data.cb && e.game[this.data.cb](this.el),
                this.data.affects && "avatarUpgrade" !== this.data.affects && e.hud[this.data.affects].animateTo(e.hud[this.data.affects].value + this.data.value),
                this.el.addEventListener("sound-ended", e=>{
                    this.soundIsPlaying = !1;
                    this.pause()
                }
                ),
                this.data.spawns && setTimeout(()=>{
                    this.el.components.sound__loop && this.el.components.sound__loop.play();
                    this.el.setAttribute("visible", !0);
                    this.el.setAttribute("scale", "1 1 1");
                    this.play()
                }
                , 1e3 * this.data.spawnDelay)) : e.socket.emit("request-collection", {
                    index: e.collectibles.indexOf(this)
                }))
            }
        })
    }
      , F = e=>{
        AFRAME.registerComponent("player", {
            schema: {
                me: {
                    type: "boolean",
                    default: !1
                }
            },
            init: function() {
                this.data.me && (this.isWalking = !1,
                this.setKeyCtls(),
                this.setTouchCtls(),
                this.setOculusCtls(),
                this.setAvatarChoices(),
                this.addMyListeners(),
                this.el.timePlayed = 0)
            },
            addMyListeners: function() {
                let t = this;
                document.addEventListener("gameStart", n=>{
                    t.el.id = e.socket.id;
                    t.el.classList = "my-player";
                    t.isPlaying = !0
                }
                )
            },
            setKeyCtls: function() {
                document.body.addEventListener("keydown", t=>{
                    switch (t.which) {
                    case 87:
                    case 38:
                    case 83:
                    case 40:
                        this.isWalking || (e.socket.emit("anim", 1),
                        this.isWalking = !0)
                    }
                }
                ),
                document.body.addEventListener("keyup", t=>{
                    switch (t.which) {
                    case 87:
                    case 38:
                    case 83:
                    case 40:
                        e.socket.emit("anim", 0),
                        this.isWalking = !1
                    }
                }
                )
            },
            setTouchCtls: function() {
                window.addEventListener("touchstart", t=>{
                    this.isWalking || (e.socket.emit("anim", 1),
                    this.isWalking = !0)
                }
                ),
                window.addEventListener("touchend", t=>{
                    e.socket.emit("anim", 0);
                    this.isWalking = !1
                }
                )
            },
            setOculusCtls: function() {
                let t = document.querySelector("#left-hand").components["oculus-touch-controls"]
                  , n = document.querySelector("#right-hand").components["oculus-touch-controls"];
                setTimeout(()=>{
                    AFRAME.utils.device.checkHeadsetConnected() && (t.el.addEventListener("thumbsticktouchstart", t=>{
                        this.isWalking || (e.socket.emit("anim", 1),
                        this.isWalking = !0)
                    }
                    ),
                    t.el.addEventListener("thumbsticktouchend", t=>{
                        e.socket.emit("anim", 0);
                        this.isWalking = !1
                    }
                    ),
                    n.el.addEventListener("thumbsticktouchstart", t=>{
                        this.isWalking || (e.socket.emit("anim", 1),
                        this.isWalking = !0)
                    }
                    ),
                    n.el.addEventListener("thumbsticktouchend", t=>{
                        e.socket.emit("anim", 0);
                        this.isWalking = !1
                    }
                    ))
                }
                , 3e3)
            },
            setAvatarChoices: function() {
                this.avatar_0 = document.querySelector("#starter-avatar"),
                this.avatar_1 = document.querySelector("#avatar-upgrade"),
                this.avatarUpgradeZone = document.querySelector("#avatar-upgrade-zone")
            },
            tick: function(t, n) {
                this.data.me && e.game.hasBegun && (this.el.timePlayed += n)
            },
            setAvatar: function(t) {
                this.avatar_1 || (this.avatar_1 = document.querySelector("#avatar-upgrade")),
                this.avatar_0 = this.el.firstElementChild,
                e.scene.appendChild(this.avatar_0),
                this.avatar_0.setAttribute("visible", !1),
                1 == t && (this.avatar_1.setAttribute("position", "0 8 0"),
                this.avatar_1.setAttribute("scale", "2 2 2"),
                this.avatar_1.setAttribute("rotation", "0 180 0"),
                this.avatar_1.setAttribute("animation-mixer", "clip:idle"),
                this.el.model = this.avatar_1,
                this.el.appendChild(this.avatar_1))
            },
            setSpeed: function(e) {
                this.el.setAttribute("movement-controls", `constrainToNavMesh: true; speed: ${e}`)
            }
        })
    }
    ;
    (()=>{
        window.onload = (e=>{
            function t(e) {
                e.preventDefault(),
                CS1 && CS1.socket.connected ? document.querySelector(".q1").value.length > 0 && document.querySelector(".q2").value.length > 0 && (navigator.vendor.includes("Apple") && CS1.sounds.playerJoined.play().catch(e=>{
                    console.log(e)
                }
                ),
                CS1.login(document.querySelector(".q1").value, document.querySelector(".q2").value),
                document.querySelector(".q1").value = "",
                document.querySelector(".q2").value = "") : (n.style.zIndex = -1,
                n.setAttribute("hidden", ""),
                CS1.myPlayer.components["movement-controls"].data.speed = CS1.myPlayer.startSpeed,
                CS1.sounds.playerJoined.play(),
                setTimeout(()=>{
                    CS1.say(CS1.game.announcements.welcome)
                }
                , CS1.game.welcomeDelay))
            }
            `\n<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: block;">\n    <div class="modal-dialog">\n\t\t  <div class="loginmodal-container">\n          <image id="logo" src="" width="64px">\n          <h3 id="gamename">CS1</h3>\n\t\t\t<div>\t  \n\t\t\t\t\t<input  placeholder="username" class="q1">\n          <input  placeholder="password" type="password" class="q2"> \n          <button id="lb">Submit</button> \n          <div style="color:red" id="login-msg"></div> \n      </div>\t\t\t\t\n\n\t\t\t</div>\n\t</div>\n</div>\n`;
            let n = document.querySelector("#login");
            n.innerHTML = '\n<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: block;">\n    <div class="modal-dialog">\n\t\t  <div class="loginmodal-container">\n          <image id="logo" src="" width="64px">\n          <h3 id="gamename">CS1</h3>\n\t\t\t<div>\t  \n\t\t\t\t\t<input  placeholder="username" class="q1">\n          <input  placeholder="password" type="password" class="q2"> \n          <button id="lb">Submit</button> \n          <div style="color:red" id="login-msg"></div> \n      </div>\t\t\t\t\n\n\t\t\t</div>\n\t</div>\n</div>\n';
            document.querySelector("#logo").setAttribute("src", M.theme.logo);
            document.querySelector("#gamename").innerHTML = M.gameName;
            document.getElementById("lb").setAttribute("style", `background-color:${M.theme.formButtonColor}`);
            setTimeout(e=>{
                CS1 && CS1.socket.connected || (document.getElementById("login-msg").innerHTML = "OFFLINE MODE",
                document.querySelector("#lb").setAttribute("value", "Play Game Offline"))
            }
            , 1e3);
            document.getElementById("lb").addEventListener("click", t);
            document.querySelector(".q2").addEventListener("keydown", e=>{
                "Enter" == e.code && t(e)
            }
            )
        }
        )
    }
    )(),
    function() {
        !function(e) {
            function t(i) {
                if (n[i])
                    return n[i].exports;
                var o = n[i] = {
                    exports: {},
                    id: i,
                    loaded: !1
                };
                return e[i].call(o.exports, o, o.exports, t),
                o.loaded = !0,
                o.exports
            }
            var n = {};
            t.m = e,
            t.c = n,
            t.p = "",
            t(0)
        }([function(e, t, n) {
            if (!window.AFRAME) {
                var i = function(e, t) {
                    this.el = e,
                    this.el,
                    this.id = t,
                    this.attrName = this.name + (t ? "__" + t : ""),
                    this.el.components[this.attrName] = this,
                    this.data = {}
                }
                  , o = function(e) {
                    this.el = this.sceneEl = e,
                    this.el.systems[this.name] = this
                };
                AFRAME = {
                    components: {},
                    systems: {},
                    registerShader: function() {}
                },
                AFRAME.registerComponent = function(e, t) {
                    var n, o = {};
                    return Object.keys(t).forEach(function(e) {
                        o[e] = {
                            value: t[e],
                            writable: !0
                        }
                    }),
                    n = function(e, t, n) {
                        i.call(this, e, t, n)
                    }
                    ,
                    n.prototype = Object.create(i.prototype, o),
                    n.prototype.name = e,
                    n.prototype.constructor = n,
                    AFRAME.components[e] = n,
                    n
                }
                ,
                AFRAME.registerSystem = function(e, t) {
                    var n, i = {};
                    return Object.keys(t).forEach(function(e) {
                        i[e] = {
                            value: t[e],
                            writable: !0
                        }
                    }),
                    n = function(e, t, n) {
                        o.call(this, e, t, n)
                    }
                    ,
                    n.prototype = Object.create(o.prototype, i),
                    n.prototype.name = e,
                    n.prototype.constructor = n,
                    AFRAME.systems[e] = n,
                    n
                }
                ;
                var a = function(e, t, n) {
                    this.sceneEl = this,
                    this.renderTarget = null,
                    this.renderer = e,
                    this.object3D = t,
                    this.cameras = Array.isArray(n) ? n : [n],
                    this.components = {},
                    this.systems = {},
                    this.isPlaying = !0,
                    this.systems.effects = new AFRAME.systems.effects(this),
                    this.systems.effects.init()
                };
                a.prototype = Object.create({}, {
                    chain: {
                        value: function(e) {
                            var t = this.systems.effects
                              , n = t.data;
                            t.data = e,
                            t.update(n),
                            t.tick(0, 0)
                        }
                    },
                    camera: {
                        set: function(e) {
                            this.cameras = Array.isArray(e) ? e : [e]
                        },
                        get: function() {
                            return this.cameras[0]
                        }
                    },
                    scene: {
                        set: function(e) {
                            this.object3D = e
                        },
                        get: function() {
                            return this.object3D
                        }
                    },
                    init: {
                        value: function(e) {
                            this.remove(e);
                            var t = e.split("__")
                              , n = AFRAME.components[t[0]];
                            if (!n)
                                return null;
                            var i = new n(this,t[1]);
                            if (i.schema.type || i.schema.default)
                                i.data = i.schema.default;
                            else
                                for (var o in i.schema)
                                    i.data[o] = i.schema[o].default;
                            return i.init && i.init(),
                            i.update && i.update({}),
                            i
                        }
                    },
                    update: {
                        value: function(e, t) {
                            var n = this.components[e];
                            if (n || (n = this.init(e)),
                            n && void 0 !== t) {
                                var i = n.data
                                  , o = n.data;
                                n.schema;
                                if (n.schema.type || n.schema.default)
                                    n.data = t;
                                else {
                                    i = {};
                                    for (var a in o)
                                        i[a] = o[a],
                                        t[a] && (o[a] = t[a])
                                }
                                n.update && n.update(i)
                            }
                        }
                    },
                    remove: {
                        value: function(e) {
                            var t = this.components[e];
                            t && t.remove && t.remove(),
                            delete this.components[e]
                        }
                    },
                    render: {
                        value: function(e) {
                            var t = this.components
                              , n = this.systems.effects
                              , i = this.time ? e - this.time : 0;
                            this.time = e;
                            for (var o in t)
                                (a = t[o]).tick && a.tick(e, i);
                            n.tick(e, i),
                            n.cameras = this.cameras;
                            for (var o in t) {
                                var a = t[o];
                                a.tock && a.tock(e, i)
                            }
                            n.tock(e, i)
                        }
                    }
                }),
                window.AFRAME.Effects = a
            }
            n(1),
            n(3),
            n(17)
        }
        , function(e, t, n) {
            n(2)
        }
        , function(e, t) {
            AFRAME.registerSystem("effects", {
                schema: {
                    type: "array",
                    default: []
                },
                init: function() {
                    this.effects = {},
                    this.passes = [],
                    this._passes = [],
                    this.cameras = [],
                    this.setupPostState(),
                    this.needsOverride = !0,
                    this.lightComponents = [],
                    this.LightState = {
                        rows: 0,
                        cols: 0,
                        width: 0,
                        height: 0,
                        tileData: {
                            value: null
                        },
                        tileTexture: {
                            value: null
                        },
                        lightTexture: {
                            value: new THREE.DataTexture(new Float32Array(256),32,2,THREE.RGBAFormat,THREE.FloatType)
                        }
                    }
                },
                update: function() {
                    this.needsUpdate = !0
                },
                addLight: function(e) {
                    this.lightComponents.push(e)
                },
                removeLight: function(e) {
                    var t = this.lightComponents.indexOf(e);
                    this.lightComponents.splice(t)
                },
                setupPostState: function() {
                    this.renderTarget = new THREE.WebGLRenderTarget(1,1,{
                        minFilter: THREE.LinearFilter,
                        magFilter: THREE.LinearFilter,
                        format: THREE.RGBAFormat
                    }),
                    this.renderTarget.texture.generateMipmaps = !1,
                    this.renderTarget.depthBuffer = !0,
                    this.renderTarget.depthTexture = new THREE.DepthTexture,
                    this.renderTarget.depthTexture.type = THREE.UnsignedShortType,
                    this.renderTarget.depthTexture.minFilter = THREE.LinearFilter,
                    this.renderTarget.stencilBuffer = !1,
                    this.scene = new THREE.Scene,
                    this.camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1),
                    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),
                    this.quad.frustumCulled = !1,
                    this.scene.add(this.quad),
                    this.sceneLeft = new THREE.Scene,
                    this.quadLeft = new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),
                    this.quadLeft.geometry.attributes.uv.array.set([0, 1, .5, 1, 0, 0, .5, 0]),
                    this.quadLeft.frustumCulled = !1,
                    this.sceneLeft.add(this.quadLeft),
                    this.sceneRight = new THREE.Scene,
                    this.quadRight = new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),
                    this.quadRight.geometry.attributes.uv.array.set([.5, 1, 1, 1, .5, 0, 1, 0]),
                    this.quadRight.frustumCulled = !1,
                    this.sceneRight.add(this.quadRight),
                    this.targets = [new THREE.WebGLRenderTarget(1,1,{
                        minFilter: THREE.LinearFilter,
                        magFilter: THREE.LinearFilter,
                        format: THREE.RGBAFormat
                    }), new THREE.WebGLRenderTarget(1,1,{
                        minFilter: THREE.LinearFilter,
                        magFilter: THREE.LinearFilter,
                        format: THREE.RGBAFormat
                    })],
                    this.tDiffuse = {
                        type: "t",
                        value: null
                    },
                    this.tDepth = {
                        type: "t",
                        value: this.renderTarget.depthTexture
                    },
                    this.cameraFar = {
                        type: "f",
                        value: 0
                    },
                    this.cameraNear = {
                        type: "f",
                        value: 0
                    },
                    this.time = {
                        type: "f",
                        value: 0
                    },
                    this.timeDelta = {
                        type: "f",
                        value: 0
                    },
                    this.uvClamp = {
                        type: "v2",
                        value: this.uvBoth
                    },
                    this.resolution = {
                        type: "v4",
                        value: new THREE.Vector4
                    }
                },
                vertexShader: ["#include <common>", "varying vec2 vUv;", "void main() {", "   vUv = uv;", "   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
                uvLeft: new THREE.Vector2(0,.5),
                uvRight: new THREE.Vector2(.5,1),
                uvBoth: new THREE.Vector2(0,1),
                parseToken: /([#a-z0-9\-\_]+)\.{0,1}([#a-z0-9\-\_]*)\s*\({0,1}\s*([\$a-z0-9\-\_\.\s]*)\){0,1}([\!\?]{0,1})/i,
                renderPass: function(e, t, n, i) {
                    function o(e, n, i, o) {
                        t ? (t.viewport.set(e, n, i, o),
                        t.scissor.set(e, n, i, o)) : (a.setViewport(e, n, i, o),
                        a.setScissor(e, n, i, o))
                    }
                    var a = this.sceneEl.renderer;
                    this.quad.material = e;
                    var r = "function" == typeof n
                      , s = t || a.getSize();
                    this.resolution.value.set(s.width, s.height, 1 / s.width, 1 / s.height);
                    var l = a.autoClear;
                    a.autoClear = !1,
                    n ? this.cameras.length > 1 ? (this.quadLeft.material = e,
                    this.uvClamp.value = this.uvLeft,
                    o(0, 0, Math.round(.5 * s.width), s.height),
                    r && n(e, this.cameras[0], -1),
                    a.render(this.sceneLeft, this.camera, t, l || i),
                    this.quadRight.material = e,
                    this.uvClamp.value = this.uvRight,
                    o(Math.round(.5 * s.width), 0, Math.round(.5 * s.width), s.height),
                    r && n(e, this.cameras[1], 1),
                    a.render(this.sceneRight, this.camera, t),
                    this.uvClamp.value = this.uvBoth,
                    o(0, 0, s.width, s.height)) : (o(0, 0, s.width, s.height),
                    r && n(e, this.sceneEl.camera, 0),
                    a.render(this.scene, this.camera, t, l || i)) : (o(0, 0, s.width, s.height),
                    a.render(this.scene, this.camera, t, l || i)),
                    a.autoClear = l
                },
                materialize: function(e) {
                    var t = ["uniform vec2 uvClamp;", "vec4 textureVR( sampler2D sampler, vec2 uv ) {", " return texture2D(sampler, vec2(clamp(uv.x, uvClamp.x, uvClamp.y), uv.y));", "} ", e.fragmentShader].join("\n");
                    return e.uniforms.uvClamp = this.uvClamp,
                    new THREE.ShaderMaterial({
                        uniforms: e.uniforms,
                        vertexShader: e.vertexShader || this.vertexShader,
                        fragmentShader: t,
                        depthWrite: !1,
                        depthTest: !1,
                        blending: THREE.NoBlending,
                        fog: !1,
                        extensions: {
                            derivatives: !0
                        },
                        defines: e.defines || {}
                    })
                },
                fuse: function(e, t) {
                    if (e.length) {
                        var n, i = this, o = 0, a = [], r = [], s = [], l = {}, c = !1, u = !1, v = {
                            time: this.time,
                            timeDelta: this.timeDelta,
                            resolution: this.resolution
                        };
                        e.forEach(function(e) {
                            var t = !0
                              , n = !1
                              , r = [];
                            if ("string" == typeof e) {
                                var m = i.parseToken.exec(e);
                                if (!m)
                                    return;
                                t = "!" !== m[4],
                                n = "?" === m[4],
                                e = m[1];
                                var d = m[2];
                                if ("#" === e[0]) {
                                    var p = document.querySelector(e);
                                    if (!p)
                                        return;
                                    e = {
                                        attrName: [e.replace("#", "script_"), "_", o++, "_"].join(""),
                                        fragment: d ? p[d]instanceof Document ? p[d].body.textContent : p[d] : p.textContent,
                                        depth: void 0 !== p.dataset.depth,
                                        diffuse: void 0 !== p.dataset.diffuse,
                                        includes: p.dataset.includes ? p.dataset.includes.trim().split(" ") : null,
                                        defaults: p.dataset.defaults ? p.dataset.defaults.trim().split(" ") : null
                                    }
                                } else {
                                    if (!(e = i.effects[e]))
                                        return;
                                    if (d) {
                                        if (!(e = e.exports ? e.exports[d] : null))
                                            return;
                                        e.attrName = m[1] + "_" + d + "_"
                                    }
                                }
                                m[3] && (r = m[3].trim().split(" "))
                            }
                            var f = (e.attrName ? e.attrName : "undefined_" + o++) + "_";
                            if (f = f.replace("__", "_"),
                            e.defaults && e.defaults.forEach(function(e, t) {
                                var n = r[t];
                                a.push(["#define $", t, " ", n && "$" !== n ? n : e].join("").replace(/\$/g, f).replace("__", "_"))
                            }),
                            e.diffuse && (u = !0),
                            e.depth && (c = !0),
                            e.fragment && a.push(e.fragment.replace(/\$/g, f)),
                            e.uniforms)
                                for (var h in e.uniforms)
                                    v[f + h] = e.uniforms[h];
                            e.includes && e.includes.forEach(function(e) {
                                l[e] = !0
                            }),
                            t && s.push(["  ", f, "main(", n ? "origColor, color" : "color, origColor", ", vUv, depth);"].join(""))
                        });
                        var m = {
                            i: "int",
                            f: "float",
                            t: "sampler2D",
                            v2: "vec2",
                            v3: "vec3",
                            c: "vec3",
                            v4: "vec4",
                            m2: "mat2",
                            m3: "mat3",
                            m4: "mat4",
                            b: "bool"
                        };
                        for (n in l)
                            r.push("#include <" + n + ">");
                        var d = ["void main () {"];
                        v.tDiffuse = this.tDiffuse,
                        u ? d.push("  vec4 color = texture2D(tDiffuse, vUv);") : d.push("  vec4 color = vec4(0.0);"),
                        d.push("  vec4 origColor = color;"),
                        v.tDepth = this.tDepth,
                        v.cameraFar = this.cameraFar,
                        v.cameraNear = this.cameraNear,
                        c ? d.push("  float depth = texture2D(tDepth, vUv).x;") : d.push("  float depth = 0.0;");
                        for (n in v) {
                            var p = v[n];
                            r.push(["uniform", m[p.type], n, ";"].join(" "))
                        }
                        r.push("varying vec2 vUv;");
                        var f = [r.join("\n"), a.join("\n"), "\n", d.join("\n"), s.join("\n"), t ? "  gl_FragColor = color;" : "  gl_FragColor = vec4(color.rgb, 1.0);", "}"].join("\n")
                          , h = this.materialize({
                            fragmentShader: f,
                            uniforms: v
                        });
                        return this.sceneEl.components.debug && console.log(f, h),
                        h
                    }
                },
                rebuild: function() {
                    function e() {
                        o.length && (i.push({
                            pass: t(n.fuse(o), !0)
                        }),
                        o = [])
                    }
                    function t(e, t, i) {
                        return {
                            render: function(t, o, a) {
                                n.renderPass(e, o, i)
                            },
                            dispose: function() {
                                t && e.dispose()
                            }
                        }
                    }
                    var n = this
                      , i = []
                      , o = [];
                    this.passes.forEach(function(e) {
                        e.dispose && e.dispose()
                    }),
                    this.data.forEach(function(a) {
                        if (!a)
                            return void e();
                        var r, s, l = n.parseToken.exec(a);
                        if (l && l[1]) {
                            if (s = l[1],
                            !(r = n.effects[s]))
                                return void o.push(a);
                            r.pass ? (e(),
                            i.push({
                                pass: r.pass,
                                behavior: r
                            })) : r.material ? (e(),
                            i.push({
                                pass: t(r.material, !1, r.vr),
                                behavior: r
                            })) : o.push(a)
                        }
                    }),
                    e(),
                    this.needsUpdate = !1,
                    this.passes = i
                },
                isActive: function(e, t) {
                    var n = this.sceneEl;
                    if (e.bypass)
                        return !1;
                    if (!!!n.renderTarget)
                        return !1;
                    if (t && (this.needsResize || e.needsResize) && e.setSize) {
                        var i = n.renderer.getSize();
                        e.setSize(i.width, i.height),
                        delete e.needsResize
                    }
                    return !0
                },
                register: function(e) {
                    this.effects[e.attrName] = e,
                    this.needsUpdate = !0
                },
                unregister: function(e) {
                    delete this.effects[e.attrName],
                    this.needsUpdate = !0
                },
                tick: function(e, t) {
                    var n = this
                      , i = this.sceneEl
                      , o = i.renderer
                      , a = (i.effect,
                    this.renderTarget)
                      , r = this.targets
                      , s = i.object3D;
                    if (a && o) {
                        if (this.needsOverride) {
                            if (s.onBeforeRender)
                                s.onBeforeRender = function(e, t, i) {
                                    var o = e.getSize();
                                    o.width === a.width && o.height === a.height || (a.setSize(o.width, o.height),
                                    r[0].setSize(o.width, o.height),
                                    r[1].setSize(o.width, o.height),
                                    n.resolution.value.set(o.width, o.height, 1 / o.width, 1 / o.height),
                                    n.needsResize = !0,
                                    n.resizeTiles()),
                                    i instanceof THREE.ArrayCamera ? n.cameras = i.cameras : n.cameras.push(i),
                                    n.tileLights(e, t, i)
                                }
                                ;
                            else {
                                var l = o.render;
                                o.render = function(e, t, i, s) {
                                    if (i === a) {
                                        var c = o.getSize();
                                        c.width === a.width && c.height === a.height || (a.setSize(c.width, c.height),
                                        r[0].setSize(c.width, c.height),
                                        r[1].setSize(c.width, c.height),
                                        n.resolution.value.set(c.width, c.height, 1 / c.width, 1 / c.height),
                                        n.needsResize = !0),
                                        n.cameras.push(t)
                                    }
                                    l.call(o, e, t, i, s)
                                }
                            }
                            this.needsOverride = !1
                        }
                        this.cameras = [],
                        this.time.value = e / 1e3,
                        this.timeDelta.value = t / 1e3,
                        !0 === this.needsUpdate && this.rebuild(),
                        this.setupPasses(),
                        this.tDiffuse.value = this.renderTarget.texture,
                        this.tDepth.value = this.renderTarget.depthTexture;
                        var c = this.sceneEl.camera;
                        this.cameraFar.value = c.far,
                        this.cameraNear.value = c.near
                    }
                },
                setupPasses: function() {
                    var e = []
                      , t = this.renderTarget;
                    this.passes.forEach(function(t) {
                        t.behavior && !0 === t.behavior.bypass || e.push(t)
                    }),
                    this.sceneEl.renderTarget = e.length && this.sceneEl.isPlaying ? t : null,
                    this._passes = e
                },
                tock: function() {
                    var e = this.sceneEl
                      , t = e.renderer
                      , n = this;
                    if (e.renderTarget) {
                        var i = e.renderTarget
                          , o = this.targets;
                        this._passes.forEach(function(e, a) {
                            var r = a ? o[1 & a] : i;
                            n.tDiffuse.value = r.texture,
                            e.behavior && e.behavior.resize && n.isActive(e.behavior, !0),
                            e.pass.render(t, a < n._passes.length - 1 ? o[a + 1 & 1] : null, r)
                        }),
                        this.needsResize = !1
                    }
                },
                resizeTiles: function() {
                    var e = this.LightState
                      , t = e.width
                      , n = e.height;
                    e.cols = Math.ceil(t / 32),
                    e.rows = Math.ceil(e.height / 32),
                    e.tileData.value = [t, n, .5 / Math.ceil(t / 32), .5 / Math.ceil(n / 32)],
                    e.tileTexture.value = new THREE.DataTexture(new Uint8Array(e.cols * e.rows * 4),e.cols,e.rows)
                },
                tileLights: function(e, t, n) {
                    if (n.projectionMatrix) {
                        var i = this.LightState
                          , o = this.lightComponents
                          , a = (e.getSize(),
                        i.tileTexture.value.image.data)
                          , r = i.lightTexture.value.image.data
                          , s = n.matrixWorldInverse;
                        a.fill(0);
                        var l = new THREE.Vector3;
                        (n instanceof THREE.ArrayCamera ? [[.5, 0, n.cameras[0]], [.5, .5, n.cameras[1]]] : [1, 0, n]).forEach(function(e) {
                            o.forEach(function(t, n) {
                                l.setFromMatrixPosition(t.el.object3D.matrixWorld);
                                var o = i.width * e[0]
                                  , c = i.width * e[1]
                                  , u = self.lightBounds(e[2], l, t.data.radius, o);
                                if (l.applyMatrix4(s),
                                l.toArray(r, 4 * n),
                                r[4 * n + 3] = t.data.radius,
                                t.data.color.toArray(r, 128 + 4 * n),
                                r[128 + 4 * n + 3] = t.data.decay,
                                !(u[1] < 0 || u[0] > o || u[3] < 0 || u[2] > i.height)) {
                                    u[0] < 0 && (u[0] = 0),
                                    u[1] > o && (u[1] = o),
                                    u[2] < 0 && (u[2] = 0),
                                    u[3] > i.height && (u[3] = i.height);
                                    for (var v = Math.floor(n / 8), m = 7 - n % 8, d = Math.floor(u[2] / 32); d <= Math.ceil(u[3] / 32); d++)
                                        for (var p = Math.floor((u[0] + c) / 32); p <= Math.ceil((u[1] + c) / 32); p++)
                                            a[4 * (i.cols * d + p) + v] |= 1 << m
                                }
                            })
                        }),
                        i.tileTexture.value.needsUpdate = !0,
                        i.lightTexture.value.needsUpdate = !0
                    }
                },
                lightBounds: function() {
                    let e = new THREE.Vector3;
                    return function(t, n, i, o) {
                        for (var a = this.LightState, r = o, s = 0, l = a.height, c = 0, u = o / 2, v = a.height / 2, m = 0; m < 8; m++) {
                            e.copy(n),
                            e.x += 1 & m ? i : -i,
                            e.y += 2 & m ? i : -i,
                            e.z += 4 & m ? i : -i;
                            var d = e.project(t)
                              , p = d.x * u + u
                              , f = d.y * v + v;
                            r = Math.min(r, p),
                            s = Math.max(s, p),
                            l = Math.min(l, f),
                            c = Math.max(c, f)
                        }
                        return [r, s, l, c]
                    }
                }()
            })
        }
        , function(e, t, n) {
            n(4),
            n(5),
            n(6),
            n(8),
            n(10),
            n(11),
            n(12),
            n(13),
            n(16)
        }
        , function(e, t) {
            AFRAME.registerComponent("outline", {
                multiple: !0,
                schema: {
                    enabled: {
                        default: !0
                    },
                    color: {
                        type: "color",
                        default: "#000000"
                    },
                    width: {
                        type: "vec2",
                        default: new THREE.Vector2(1,1)
                    },
                    range: {
                        type: "vec2",
                        default: new THREE.Vector2(0,1500)
                    },
                    strength: {
                        type: "number",
                        default: 1
                    },
                    ratio: {
                        type: "number",
                        default: .5
                    },
                    smooth: {
                        default: !1
                    }
                },
                init: function() {
                    this.system = this.el.sceneEl.systems.effects;
                    var e = {
                        minFilter: THREE.LinearFilter,
                        magFilter: THREE.LinearFilter,
                        format: THREE.RGBAFormat
                    };
                    this.renderTarget = new THREE.WebGLRenderTarget(1,1,e),
                    this.blurTarget = new THREE.WebGLRenderTarget(1,1,e),
                    this.needsResize = !0,
                    this.resolution = {
                        type: "v4",
                        value: new THREE.Vector4
                    },
                    this.tockUniforms = {
                        resolution: this.resolution,
                        color: {
                            type: "c",
                            value: new THREE.Color
                        },
                        width: {
                            type: "v2",
                            value: null
                        },
                        range: {
                            type: "v2",
                            value: null
                        },
                        strength: {
                            type: "f",
                            value: 1
                        }
                    },
                    this.blurDirection = {
                        type: "v2",
                        value: new THREE.Vector2
                    },
                    this.exports = {
                        sobel: {
                            fragment: this.sobel,
                            uniforms: this.tockUniforms,
                            includes: ["packing"],
                            depth: !0
                        },
                        blur: {
                            fragment: this.blur,
                            uniforms: {
                                resolution: this.tockUniforms.resolution,
                                direction: this.blurDirection
                            },
                            diffuse: !0
                        }
                    },
                    this.currentMaterial = this.system.fuse([this.exports.sobel], !0),
                    this.blurMaterial = this.system.fuse([this.exports.blur], !0),
                    this.uniforms = {
                        texture: {
                            type: "t",
                            value: this.renderTarget.texture
                        }
                    },
                    this.system.register(this)
                },
                update: function(e) {
                    this.bypass = !this.data.enabled,
                    this.tockUniforms.color.value.set(this.data.color),
                    this.tockUniforms.width.value = this.data.width,
                    this.tockUniforms.range.value = this.data.range,
                    this.tockUniforms.strength.value = 1 / this.data.strength
                },
                setSize: function(e, t) {
                    e = Math.round(e * this.data.ratio),
                    t = Math.round(t * this.data.ratio),
                    this.renderTarget.setSize(e, t),
                    this.blurTarget.setSize(e, t),
                    this.resolution.value.set(e, t, 1 / e, 1 / t)
                },
                tock: function() {
                    this.system.isActive(this, !0) && (this.system.renderPass(this.currentMaterial, this.renderTarget),
                    this.system.tDiffuse.value = this.renderTarget,
                    this.data.smooth && (this.blurDirection.value.set(1, 0),
                    this.system.renderPass(this.blurMaterial, this.blurTarget),
                    this.system.tDiffuse.value = this.blurTarget,
                    this.blurDirection.value.set(0, 1),
                    this.system.renderPass(this.blurMaterial, this.renderTarget)))
                },
                remove: function() {
                    this.system.unregister(this)
                },
                diffuse: !0,
                sobel: ["mat3 $G[2];", "const mat3 $g0 = mat3( 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0 );", "const mat3 $g1 = mat3( 1.0, 0.0, -1.0, 2.0, 0.0, -2.0, 1.0, 0.0, -1.0 );", "void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth) {", "vec3 I[3];", "float cnv[2];", "float d;", "$G[0] = $g0;", "$G[1] = $g1;", "for (float i=0.0; i<3.0; i++)", "for (float j=0.0; j<3.0; j++) {", "           d = texture2D(tDepth, uv + resolution.zw * vec2(i-1.0,j-1.0) ).x;", "           d = perspectiveDepthToViewZ(d, cameraNear, cameraFar); ", "\t\t\tI[int(i)][int(j)] = viewZToOrthographicDepth(d, cameraNear, cameraFar);", "}", "for (int i=0; i<2; i++) {", "float dp3 = dot($G[i][0], I[0]) + dot($G[i][1], I[1]) + dot($G[i][2], I[2]);", "cnv[i] = dp3 * dp3; ", "}", "color = vec4($color, sqrt(cnv[0]*cnv[0]+cnv[1]*cnv[1]));", "} "].join("\n"),
                blur: ["void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth){", "color.a *= 0.44198;", "color.a += texture2D(tDiffuse, uv + ($direction * $resolution.zw )).a * 0.27901;", "color.a += texture2D(tDiffuse, uv - ($direction * $resolution.zw )).a * 0.27901;", "}"].join("\n"),
                fragment: ["void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth){", "\tvec4 texel = texture2D($texture, uv);", "   color.rgb = mix(color.rgb, texel.rgb, smoothstep(0.1,0.3,texel.a));", "}"].join("\n")
            })
        }
        , function(e, t) {
            AFRAME.registerComponent("film", {
                multiple: !0,
                schema: {
                    speed: {
                        default: 1
                    },
                    nIntensity: {
                        default: .5
                    },
                    sIntensity: {
                        default: .05
                    },
                    sCount: {
                        default: 4096
                    }
                },
                init: function() {
                    this.uniforms = {
                        speed: {
                            type: "f",
                            value: 0
                        },
                        nIntensity: {
                            type: "f",
                            value: .5
                        },
                        sIntensity: {
                            type: "f",
                            value: .05
                        },
                        sCount: {
                            type: "f",
                            value: 4096
                        }
                    },
                    this.system = this.el.sceneEl.systems.effects,
                    this.system.register(this)
                },
                update: function() {
                    var e = this.data
                      , t = this.uniforms;
                    for (var n in t)
                        e[n] && (t[n].value = e[n])
                },
                remove: function() {
                    this.system.unregister(this)
                },
                includes: ["common"],
                diffuse: !0,
                fragment: ["void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth) {", "   vec4 cTextureScreen = color;", "   float dx = rand( uv + mod(time, 3.14) * $speed );", "   vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );", "   vec2 sc = vec2( sin( uv.y * $sCount ), cos( uv.y * $sCount ) );", "   cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * $sIntensity;", "   cResult = cTextureScreen.rgb + clamp( $nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );", "   color.rgb =  cResult; //cResult;", "}"].join("\n")
            })
        }
        , function(e, t, n) {
            var i = n(7);
            AFRAME.registerComponent("fxaa", {
                schema: {
                    default: !0
                },
                init: function() {
                    this.system = this.el.sceneEl.systems.effects,
                    this.material = new THREE.ShaderMaterial({
                        fragmentShader: i.fragmentShader,
                        vertexShader: i.vertexShader,
                        uniforms: {
                            tDiffuse: this.system.tDiffuse,
                            resolution: {
                                type: "v2",
                                value: new THREE.Vector2
                            }
                        }
                    }),
                    this.system.register(this),
                    this.needsResize = !0
                },
                update: function() {
                    this.bypass = !this.data
                },
                setSize: function(e, t) {
                    this.material.uniforms.resolution.value.set(e, t)
                },
                resize: !0,
                remove: function() {
                    this.material.dispose(),
                    this.system.unregister(this)
                }
            })
        }
        , function(e, t) {
            e.exports = {
                uniforms: {
                    tDiffuse: {
                        type: "t",
                        value: null
                    },
                    resolution: {
                        type: "v2",
                        value: new THREE.Vector2
                    }
                },
                vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec2 resolution;\n\nvoid main() {\n  vUv = uv;\n  vec2 fragCoord = uv * resolution;\n  vec2 inverseVP = 1.0 / resolution.xy;\n  v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n  v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n  v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n  v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n  v_rgbM = vec2(fragCoord * inverseVP);\n\n  gl_Position = projectionMatrix *\n              modelViewMatrix *\n              vec4(position,1.0);\n}\n",
                fragmentShader: '#define GLSLIFY 1\nvarying vec2 vUv;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\n//make sure to have a resolution uniform set to the screen size\nuniform vec2 resolution;\nuniform sampler2D tDiffuse;\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent \n//texture reads can be a bottleneck\nvec4 fxaa_1540259130(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE, \n            vec2 v_rgbSW, vec2 v_rgbSE, \n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n  vec2 fragCoord = vUv * resolution;   \n  gl_FragColor = fxaa_1540259130(tDiffuse, fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n'
            }
        }
        , function(e, t, n) {
            n(9);
            var i = new THREE.Vector2(1,0)
              , o = new THREE.Vector2(0,1);
            AFRAME.registerComponent("bloom", {
                multiple: !0,
                schema: {
                    enable: {
                        default: !0
                    },
                    strength: {
                        default: 1
                    },
                    radius: {
                        default: .4
                    },
                    threshold: {
                        default: .8
                    },
                    filter: {
                        type: "array",
                        default: []
                    }
                },
                init: function() {
                    this.system = this.el.sceneEl.systems.effects;
                    var e = {
                        minFilter: THREE.LinearFilter,
                        magFilter: THREE.LinearFilter,
                        format: THREE.RGBAFormat
                    };
                    this.renderTargetsHorizontal = [],
                    this.renderTargetsVertical = [],
                    this.nMips = 5,
                    this.renderTargetBright = new THREE.WebGLRenderTarget(1,1,e),
                    this.renderTargetBright.texture.name = "UnrealBloomPass.bright",
                    this.renderTargetBright.texture.generateMipmaps = !1;
                    for (i = 0; i < this.nMips; i++) {
                        var t = new THREE.WebGLRenderTarget(1,1,e);
                        t.texture.name = "UnrealBloomPass.h" + i,
                        t.texture.generateMipmaps = !1,
                        this.renderTargetsHorizontal.push(t),
                        (t = new THREE.WebGLRenderTarget(1,1,e)).texture.name = "UnrealBloomPass.v" + i,
                        t.texture.generateMipmaps = !1,
                        this.renderTargetsVertical.push(t)
                    }
                    this.exports = {
                        filter: {
                            uniforms: {
                                luminosityThreshold: {
                                    type: "f",
                                    value: 1
                                },
                                smoothWidth: {
                                    type: "f",
                                    value: .01
                                },
                                defaultColor: {
                                    type: "c",
                                    value: new THREE.Color(0)
                                },
                                defaultOpacity: {
                                    type: "f",
                                    value: 1
                                }
                            },
                            diffuse: !0,
                            fragment: ["void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth) {", "vec4 texel = color;", "float v = dot( texel.xyz, vec3( 0.299, 0.587, 0.114 ) );", "vec4 outputColor = vec4( $defaultColor.rgb, $defaultOpacity );", "float alpha = smoothstep( $luminosityThreshold, $luminosityThreshold + $smoothWidth, v );", "color = mix( outputColor, texel, alpha );", "}"].join("\n")
                        }
                    },
                    this.materialHighPassFilter = null,
                    this.separableBlurMaterials = [];
                    for (var n = [3, 5, 7, 9, 11], i = 0; i < this.nMips; i++)
                        this.separableBlurMaterials.push(this.getSeperableBlurMaterial(n[i])),
                        this.separableBlurMaterials[i].uniforms.texSize.value = new THREE.Vector2(1,1);
                    this.compositeMaterial = this.getCompositeMaterial(this.nMips),
                    this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture,
                    this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture,
                    this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture,
                    this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture,
                    this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture,
                    this.compositeMaterial.needsUpdate = !0;
                    var o = [1, .8, .6, .4, .2];
                    this.compositeMaterial.uniforms.bloomFactors.value = o,
                    this.bloomTintColors = [new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1)],
                    this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors,
                    this.oldClearColor = new THREE.Color,
                    this.uniforms = {
                        texture: {
                            type: "t",
                            value: this.renderTargetsHorizontal[0]
                        }
                    },
                    this.needsResize = !0,
                    this.system.register(this)
                },
                update: function(e) {
                    if (e.filter !== this.data.filter) {
                        this.materialHighPassFilter && this.materialHighPassFilter.dispose();
                        var t = this.data.filter.length ? this.data.filter : [this.exports.filter];
                        this.materialHighPassFilter = this.system.fuse(t, !1)
                    }
                },
                tock: function(e) {
                    if (this.data.enable && this.system.isActive(this, !0)) {
                        var t = this.el.sceneEl
                          , n = t.renderer
                          , a = t.renderTarget;
                        this.oldClearColor.copy(n.getClearColor()),
                        this.oldClearAlpha = n.getClearAlpha();
                        var r = n.autoClear;
                        n.autoClear = !1,
                        n.setClearColor(new THREE.Color(0,0,0), 0),
                        this.system.tDiffuse.value = a.texture,
                        this.exports.filter.uniforms.luminosityThreshold.value = this.data.threshold,
                        this.system.renderPass(this.materialHighPassFilter, this.renderTargetBright, null, !1);
                        for (var s = this.renderTargetBright, l = 0; l < this.nMips; l++)
                            this.separableBlurMaterials[l].uniforms.colorTexture.value = s.texture,
                            this.separableBlurMaterials[l].uniforms.direction.value = i,
                            this.system.renderPass(this.separableBlurMaterials[l], this.renderTargetsHorizontal[l], !0),
                            this.separableBlurMaterials[l].uniforms.colorTexture.value = this.renderTargetsHorizontal[l].texture,
                            this.separableBlurMaterials[l].uniforms.direction.value = o,
                            this.system.renderPass(this.separableBlurMaterials[l], this.renderTargetsVertical[l], !0),
                            s = this.renderTargetsVertical[l];
                        this.compositeMaterial.uniforms.bloomStrength.value = this.data.strength,
                        this.compositeMaterial.uniforms.bloomRadius.value = this.data.radius,
                        this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors,
                        this.system.renderPass(this.compositeMaterial, this.renderTargetsHorizontal[0], null),
                        n.setClearColor(this.oldClearColor, this.oldClearAlpha),
                        n.autoClear = r
                    }
                },
                setSize: function(e, t) {
                    var n = Math.round(e / 2)
                      , i = Math.round(t / 2);
                    this.renderTargetBright.setSize(n, i);
                    for (var o = 0; o < this.nMips; o++)
                        this.renderTargetsHorizontal[o].setSize(n, i),
                        this.renderTargetsVertical[o].setSize(n, i),
                        this.separableBlurMaterials[o].uniforms.texSize.value = new THREE.Vector2(n,i),
                        n = Math.round(n / 2),
                        i = Math.round(i / 2)
                },
                remove: function() {
                    this.system.unregister(this);
                    for (e = 0; e < this.renderTargetsHorizontal.length; e++)
                        this.renderTargetsHorizontal[e].dispose();
                    for (var e = 0; e < this.renderTargetsVertical.length; e++)
                        this.renderTargetsVertical[e].dispose();
                    this.renderTargetBright.dispose()
                },
                getSeperableBlurMaterial: function(e) {
                    return this.system.materialize({
                        defines: {
                            KERNEL_RADIUS: e,
                            SIGMA: e
                        },
                        uniforms: {
                            colorTexture: {
                                value: null
                            },
                            texSize: {
                                value: new THREE.Vector2(.5,.5)
                            },
                            direction: {
                                value: new THREE.Vector2(.5,.5)
                            }
                        },
                        vertexShader: "varying vec2 vUv;\n\t\t\t\t\tvoid main() {\n\t\t\t\t\t\tvUv = uv;\n\t\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t\t}",
                        fragmentShader: "#include <common>\t\t\t\t\tvarying vec2 vUv;\n\t\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\t\tuniform vec2 texSize;\t\t\t\t\tuniform vec2 direction;\t\t\t\t\tfloat gaussianPdf(in float x, in float sigma) {\t\t\t\t\t\treturn 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\t\t\t\t\t}\t\t\t\t\tvoid main() {\n\t\t\t\t\t\tvec2 invSize = 1.0 / texSize;\t\t\t\t\t\tfloat fSigma = float(SIGMA);\t\t\t\t\t\tfloat weightSum = gaussianPdf(0.0, fSigma);\t\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\t\t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {\t\t\t\t\t\t\tfloat x = float(i);\t\t\t\t\t\t\tfloat w = gaussianPdf(x, fSigma);\t\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\t\t\t\t\t\t\tvec3 sample1 = textureVR( colorTexture, vUv + uvOffset).rgb;\t\t\t\t\t\t\tvec3 sample2 = textureVR( colorTexture, vUv - uvOffset).rgb;\t\t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;\t\t\t\t\t\t\tweightSum += 2.0 * w;\t\t\t\t\t\t}\t\t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\t\t\t\t\t}"
                    })
                },
                getCompositeMaterial: function(e) {
                    return new THREE.ShaderMaterial({
                        defines: {
                            NUM_MIPS: e
                        },
                        uniforms: {
                            blurTexture1: {
                                value: null
                            },
                            blurTexture2: {
                                value: null
                            },
                            blurTexture3: {
                                value: null
                            },
                            blurTexture4: {
                                value: null
                            },
                            blurTexture5: {
                                value: null
                            },
                            bloomStrength: {
                                value: 1
                            },
                            bloomFactors: {
                                value: null
                            },
                            bloomTintColors: {
                                value: null
                            },
                            bloomRadius: {
                                value: 0
                            }
                        },
                        vertexShader: "varying vec2 vUv;\n\t\t\t\t\tvoid main() {\n\t\t\t\t\t\tvUv = uv;\n\t\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t\t}",
                        fragmentShader: "varying vec2 vUv;\t\t\t\t\tuniform sampler2D blurTexture1;\t\t\t\t\tuniform sampler2D blurTexture2;\t\t\t\t\tuniform sampler2D blurTexture3;\t\t\t\t\tuniform sampler2D blurTexture4;\t\t\t\t\tuniform sampler2D blurTexture5;\t\t\t\t\tuniform float bloomStrength;\t\t\t\t\tuniform float bloomRadius;\t\t\t\t\tuniform float bloomFactors[NUM_MIPS];\t\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\t\t\t\t\t\t\t\t\t\tfloat lerpBloomFactor(const in float factor) { \t\t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\t\t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);\t\t\t\t\t}\t\t\t\t\t\t\t\t\t\tvoid main() {\t\t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) + \t\t\t\t\t\t \t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) + \t\t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) + \t\t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) + \t\t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\t\t\t\t\t}"
                    })
                },
                diffuse: !0,
                defaults: ["1.0"],
                fragment: ["void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth){", "   color.rgb += texture2D($texture, uv).rgb;", "}"].join("\n")
            })
        }
        , function(e, t) {
            e.exports = {
                shaderID: "luminosityHighPass",
                uniforms: {
                    tDiffuse: {
                        type: "t",
                        value: null
                    },
                    luminosityThreshold: {
                        type: "f",
                        value: 1
                    },
                    smoothWidth: {
                        type: "f",
                        value: 1
                    },
                    defaultColor: {
                        type: "c",
                        value: new THREE.Color(0)
                    },
                    defaultOpacity: {
                        type: "f",
                        value: 0
                    }
                },
                vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
                fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec3 defaultColor;", "uniform float defaultOpacity;", "uniform float luminosityThreshold;", "uniform float smoothWidth;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "vec3 luma = vec3( 0.299, 0.587, 0.114 );", "float v = dot( texel.xyz, luma );", "vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );", "float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );", "gl_FragColor = mix( outputColor, texel, alpha );", "}"].join("\n")
            }
        }
        , function(e, t) {
            AFRAME.registerComponent("colors", {
                multiple: !0,
                schema: {
                    mode: {
                        default: "map"
                    },
                    lut: {
                        type: "selector"
                    },
                    lutClamp: {
                        default: !1
                    },
                    lutFlip: {
                        default: !1
                    },
                    add: {
                        type: "vec3",
                        default: new THREE.Vector3(0,0,0)
                    },
                    mul: {
                        type: "vec3",
                        default: new THREE.Vector3(1,1,1)
                    },
                    pow: {
                        type: "vec3",
                        default: new THREE.Vector3(1,1,1)
                    },
                    left: {
                        type: "vec3",
                        default: new THREE.Vector3(0,0,0)
                    },
                    right: {
                        type: "vec3",
                        default: new THREE.Vector3(1,1,1)
                    },
                    min: {
                        type: "vec3",
                        default: new THREE.Vector3(0,0,0)
                    },
                    max: {
                        type: "vec3",
                        default: new THREE.Vector3(1,1,1)
                    },
                    quant: {
                        type: "vec3",
                        default: new THREE.Vector3(.2,.2,.2)
                    },
                    orig: {
                        type: "vec3",
                        default: new THREE.Vector3(1,1,1)
                    },
                    red: {
                        type: "vec3",
                        default: new THREE.Vector3(1,0,0)
                    },
                    green: {
                        type: "vec3",
                        default: new THREE.Vector3(0,.5,.5)
                    },
                    blue: {
                        type: "vec3",
                        default: new THREE.Vector3(0,.5,.5)
                    }
                },
                init: function() {
                    this.system = this.el.sceneEl.systems.effects,
                    this.uniforms = {
                        add: {
                            type: "v3",
                            value: null
                        },
                        mul: {
                            type: "v3",
                            value: null
                        },
                        pow: {
                            type: "v3",
                            value: null
                        },
                        left: {
                            type: "v3",
                            value: null
                        },
                        right: {
                            type: "v3",
                            value: null
                        },
                        min: {
                            type: "v3",
                            value: null
                        },
                        max: {
                            type: "v3",
                            value: null
                        },
                        quant: {
                            type: "v3",
                            value: null
                        },
                        orig: {
                            type: "v3",
                            value: null
                        },
                        red: {
                            type: "v3",
                            value: null
                        },
                        green: {
                            type: "v3",
                            value: null
                        },
                        blue: {
                            type: "v3",
                            value: null
                        },
                        texture: {
                            type: "t",
                            value: new THREE.Texture(void 0,void 0,void 0,void 0,THREE.NearestFilter,THREE.NearestFilter)
                        }
                    },
                    this.rebuild(),
                    this.system.register(this)
                },
                update: function(e) {
                    var t = this.data
                      , n = this.uniforms;
                    for (var i in n)
                        void 0 !== t[i] && (n[i].value = t[i]);
                    if (this.data.lutFlip === e.lutFlip && this.data.lutClamp === e.lutClamp && this.data.mode == e.mode || this.rebuild(),
                    this.data.lut !== e.lut) {
                        const e = this.uniforms.texture.value;
                        e.image = this.data.lut,
                        e.needsUpdate = !0
                    }
                },
                remove: function() {
                    this.system.unregister(this)
                },
                rebuild: function() {
                    for (var e = [], t = this.data.mode, n = 0; n < t.length; n++) {
                        var i = this.ops[t[n]];
                        i && e.push(i)
                    }
                    this.fragment = [this.data.lutClamp ? "" : "#define $LUT_NO_CLAMP 1", this.data.lutFlip ? "#define $LUT_FLIP_Y 1" : "", this.preFragment, e.join("\n"), "}"].join("\n"),
                    this.system.needsUpdate = !0
                },
                ops: {
                    m: "color.rgb *= $mul;",
                    a: "color.rgb += $add;",
                    p: "color.rgb = pow(color.rgb, $pow);",
                    h: "color.rgb = $rgb2hsv(color.rgb);",
                    r: "color.rgb = $hsv2rgb(color.rgb);",
                    s: "color.rgb = smoothstep($left, $right, color.rgb);",
                    l: "color.rgb = $lut(color).rgb;",
                    q: "color.rgb = floor(color.rgb / $quant) * $quant;",
                    c: "color.rgb = clamp(color.rgb, $min, $max);",
                    g: "color.rgb = vec3(dot(color.rgb, vec3(0.299, 0.587, 0.114)));",
                    o: "color.rgb = mix(color.rgb, orig.rgb, $orig);",
                    t: "color.rgb = vec3(dot(color.rgb, $red), dot(color.rgb, $green), dot(color.rgb, $blue));",
                    b: "color.rgb = color.rgb;"
                },
                diffuse: !0,
                preFragment: ["vec4 $lut(vec4 textureColor) {", "    #ifndef $LUT_NO_CLAMP", "        textureColor = clamp(textureColor, 0.0, 1.0);", "    #endif", "    mediump float blueColor = textureColor.b * 63.0;", "    mediump vec2 quad1;", "    quad1.y = floor(floor(blueColor) / 8.0);", "    quad1.x = floor(blueColor) - (quad1.y * 8.0);", "    mediump vec2 quad2;", "    quad2.y = floor(ceil(blueColor) / 8.0);", "    quad2.x = ceil(blueColor) - (quad2.y * 8.0);", "    highp vec2 texPos1;", "    texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);", "    texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);", "    #ifdef $LUT_FLIP_Y", "        texPos1.y = 1.0-texPos1.y;", "    #endif", "    highp vec2 texPos2;", "    texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);", "    texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);", "    #ifdef $LUT_FLIP_Y", "        texPos2.y = 1.0-texPos2.y;", "    #endif", "    lowp vec4 newColor1 = texture2D($texture, texPos1);", "    lowp vec4 newColor2 = texture2D($texture, texPos2);", "    lowp vec4 newColor = mix(newColor1, newColor2, fract(blueColor));", "    return newColor;", "}", "vec3 $rgb2hsv(vec3 c){", "    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);", "    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));", "    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));", "    float d = q.x - min(q.w, q.y);", "    float e = 1.0e-10;", "    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);", "}", "vec3 $hsv2rgb(vec3 c)", "{", "    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);", "    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);", "    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);", "}", "void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth){", "vec3 orig = color.rgb;"].join("\n")
            })
        }
        , function(e, t) {
            AFRAME.registerComponent("glitch", {
                schema: {
                    default: !0
                },
                init: function() {
                    this.system = this.el.sceneEl.systems.effects,
                    this.uniforms = {
                        tDisp: {
                            type: "t",
                            value: this.generateHeightmap(64)
                        },
                        amount: {
                            type: "f",
                            value: .08
                        },
                        angle: {
                            type: "f",
                            value: .02
                        },
                        seed: {
                            type: "f",
                            value: .02
                        },
                        seed_x: {
                            type: "f",
                            value: .02
                        },
                        seed_y: {
                            type: "f",
                            value: .02
                        },
                        distortion_x: {
                            type: "f",
                            value: .5
                        },
                        distortion_y: {
                            type: "f",
                            value: .6
                        },
                        col_s: {
                            type: "f",
                            value: .05
                        }
                    },
                    this.exports = {
                        glitch: {
                            fragment: this.fragment,
                            uniforms: this.uniforms
                        }
                    },
                    this.material = this.system.fuse([this.exports.glitch]),
                    this.system.register(this)
                },
                vr: !0,
                update: function() {
                    this.bypass = !this.data,
                    this.curF = 0,
                    this.generateTrigger()
                },
                remove: function() {
                    this.system.unregister(this)
                },
                tock: function() {
                    this.uniforms.seed.value = Math.random(),
                    this.curF % this.randX == 0 ? (this.uniforms.amount.value = Math.random() / 30,
                    this.uniforms.angle.value = THREE.Math.randFloat(-Math.PI, Math.PI),
                    this.uniforms.seed_x.value = THREE.Math.randFloat(-1, 1),
                    this.uniforms.seed_y.value = THREE.Math.randFloat(-1, 1),
                    this.uniforms.distortion_x.value = THREE.Math.randFloat(0, 1),
                    this.uniforms.distortion_y.value = THREE.Math.randFloat(0, 1),
                    this.curF = 0,
                    this.generateTrigger()) : this.curF % this.randX < this.randX / 5 && (this.uniforms.amount.value = Math.random() / 90,
                    this.uniforms.angle.value = THREE.Math.randFloat(-Math.PI, Math.PI),
                    this.uniforms.distortion_x.value = THREE.Math.randFloat(0, 1),
                    this.uniforms.distortion_y.value = THREE.Math.randFloat(0, 1),
                    this.uniforms.seed_x.value = THREE.Math.randFloat(-.3, .3),
                    this.uniforms.seed_y.value = THREE.Math.randFloat(-.3, .3)),
                    this.curF++
                },
                generateTrigger: function() {
                    this.randX = THREE.Math.randInt(120, 240)
                },
                generateHeightmap: function(e) {
                    for (var t = new Float32Array(e * e * 3), n = e * e, i = 0; i < n; i++) {
                        var o = THREE.Math.randFloat(0, 1);
                        t[3 * i + 0] = o,
                        t[3 * i + 1] = o,
                        t[3 * i + 2] = o
                    }
                    var a = new THREE.DataTexture(t,e,e,THREE.RGBFormat,THREE.FloatType);
                    return a.needsUpdate = !0,
                    a
                },
                fragment: ["float $rand(vec2 co){", "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);", "}", "void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth) {", "vec2 p = uv;", "vec2 p2 = vec2( smoothstep(uvClamp.x, uvClamp.y, p.x),p.y);", "float xs = floor(gl_FragCoord.x / 0.5);", "float ys = floor(gl_FragCoord.y / 0.5);", "vec4 normal = texture2D ($tDisp, p2 * $seed * $seed);", "if(p2.y < $distortion_x + $col_s && p2.y > $distortion_x - $col_s * $seed) {", "if($seed_x>0.){", "p.y = 1. - (p.y + $distortion_y);", "}", "else {", "p.y = $distortion_y;", "}", "}", "if(p2.x < $distortion_y + $col_s && p2.x > $distortion_y - $col_s * $seed) {", "if( $seed_y > 0.){", "p.x = $distortion_x;", "}", "else {", "p.x = 1. - (p.x + $distortion_x);", "}", "}", "p.x+=normal.x* $seed_x * ($seed/5.);", "p.y+=normal.y* $seed_y * ($seed/5.);", "vec2 offset = $amount * vec2( cos($angle), sin($angle));", "vec4 cr = textureVR(tDiffuse, p + offset);", "vec4 cga = textureVR(tDiffuse, p);", "vec4 cb = textureVR(tDiffuse, p - offset);", "color = vec4(cr.r, cga.g, cb.b, cga.a);", "vec4 snow = 200.*$amount*vec4($rand(vec2(xs * $seed,ys * $seed*50.))*0.2);", "color = color+ snow;", "}"].join("\n")
            })
        }
        , function(e, t) {
            AFRAME.registerComponent("godrays", {
                schema: {
                    tint: {
                        type: "color",
                        default: "#FFFFFF"
                    },
                    threshold: {
                        type: "vec4",
                        default: new THREE.Vector4(0,1,1)
                    },
                    src: {
                        type: "selector",
                        default: null
                    },
                    intensity: {
                        default: 1
                    },
                    filter: {
                        type: "array",
                        default: []
                    },
                    ratio: {
                        default: .25
                    }
                },
                init: function() {
                    this.system = this.el.sceneEl.systems.effects;
                    var e = {
                        minFilter: THREE.LinearFilter,
                        magFilter: THREE.LinearFilter,
                        format: THREE.RGBAFormat
                    };
                    this.rtFilter = new THREE.WebGLRenderTarget(1,1,e),
                    this.rtTextureGodRays1 = new THREE.WebGLRenderTarget(1,1,e),
                    this.rtTextureGodRays2 = new THREE.WebGLRenderTarget(1,1,e),
                    this.exports = {
                        filter: {
                            includes: ["packing"],
                            uniforms: {
                                tint: {
                                    type: "c",
                                    value: new THREE.Color
                                },
                                threshold: {
                                    type: "v2",
                                    value: new THREE.Vector2(0,1)
                                }
                            },
                            depth: !0,
                            fragment: ["void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth) {", "   float v = viewZToOrthographicDepth(perspectiveDepthToViewZ(depth, cameraNear, cameraFar), cameraNear, cameraFar);", "   color.rgb = vec3(smoothstep($threshold.x, $threshold.y, v)) * $tint;", "}"].join("\n")
                        },
                        blur: {
                            uniforms: {
                                step: {
                                    type: "f",
                                    value: 1
                                },
                                src: {
                                    type: "v3",
                                    value: new THREE.Vector3(.5,.5,0)
                                }
                            },
                            fragment: ["void $main(inout vec4 color, vec4 orig, vec2 uv, float depth) {", "vec2 center = vec2(mix(uvClamp.x, uvClamp.y, $src.x), $src.y);", "vec2 delta = center - uv;", "float dist = length( delta );", "vec2 stepv = $step * delta / dist;", "float iters = dist/$step;", "vec4 col = vec4(0.0);", "if ( 0.0 <= iters && uv.y < 1.0 ) col += textureVR( tDiffuse, uv );", "uv += stepv;", "if ( 1.0 <= iters && uv.y < 1.0 ) col += textureVR( tDiffuse, uv );", "uv += stepv;", "if ( 2.0 <= iters && uv.y < 1.0 ) col += textureVR( tDiffuse, uv );", "uv += stepv;", "if ( 3.0 <= iters && uv.y < 1.0 ) col += textureVR( tDiffuse, uv );", "uv += stepv;", "if ( 4.0 <= iters && uv.y < 1.0 ) col += textureVR( tDiffuse, uv );", "uv += stepv;", "if ( 5.0 <= iters && uv.y < 1.0 ) col += textureVR( tDiffuse, uv );", "color = col/6.0;", "}"].join("\n")
                        }
                    },
                    this.materialGodraysGenerate = this.system.fuse([this.exports.blur]),
                    this.uniforms = {
                        intensity: {
                            type: "f",
                            value: 1
                        },
                        attenuation: {
                            type: "f",
                            value: 1
                        },
                        texture: {
                            type: "t",
                            value: this.rtTextureGodRays2
                        }
                    },
                    this.materialFilter = null,
                    this.needsResize = !0,
                    this.system.register(this)
                },
                setSize: function(e, t) {
                    e = Math.round(e * this.data.ratio),
                    t = Math.round(t * this.data.ratio),
                    this.rtTextureGodRays1.setSize(e, t),
                    this.rtTextureGodRays2.setSize(e, t),
                    this.rtFilter.setSize(e, t)
                },
                update: function(e) {
                    this.exports.filter.uniforms.tint.value.set(this.data.tint),
                    this.uniforms.intensity.value = this.data.intensity,
                    this.data.filter !== e.filter && (this.materialFilter && this.materialFilter.dispose(),
                    this.materialFilter = this.system.fuse(this.data.filter.length ? this.data.filter : [this.exports.filter])),
                    this.bypass = null === this.data.src
                },
                tock: function() {
                    if (this.system.isActive(this, !0)) {
                        var e = this;
                        this.system.tDiffuse.value = this.system.renderTarget.texture,
                        this.system.renderPass(this.materialFilter, this.rtFilter, t);
                        var t = function(t, n, i) {
                            var o = new THREE.Vector3
                              , a = new THREE.Vector3
                              , r = e.exports.blur.uniforms.src.value;
                            e.data.src.object3D.getWorldPosition(r),
                            n.getWorldPosition(o),
                            n.getWorldDirection(a),
                            o.sub(r),
                            o.normalize(),
                            a.normalize(),
                            e.uniforms.attenuation.value = Math.pow(Math.max(0, -a.dot(o)), 1.33),
                            r.project(n),
                            r.set((r.x + 1) / 2, (r.y + 1) / 2, 0)
                        }
                          , n = 1
                          , i = 1 * Math.pow(6, -n);
                        this.exports.blur.uniforms.step.value = i,
                        this.system.tDiffuse.value = this.rtFilter.texture,
                        this.system.renderPass(this.materialGodraysGenerate, this.rtTextureGodRays2, t),
                        n = 2,
                        i = 1 * Math.pow(6, -n),
                        this.exports.blur.uniforms.step.value = i,
                        this.system.tDiffuse.value = this.rtTextureGodRays2.texture,
                        this.system.renderPass(this.materialGodraysGenerate, this.rtTextureGodRays1, t),
                        n = 3,
                        i = 1 * Math.pow(6, -n),
                        this.exports.blur.uniforms.step.value = i,
                        this.system.tDiffuse.value = this.rtTextureGodRays1.texture,
                        this.system.renderPass(this.materialGodraysGenerate, this.rtTextureGodRays2, t)
                    }
                },
                remove: function() {
                    this.rtTextureGodRays1.dispose(),
                    this.rtTextureGodRays2.dispose(),
                    this.rtFilter.dispose(),
                    this.materialGodraysGenerate.dispose(),
                    this.materialFilter.dispose(),
                    this.system.unregister(this)
                },
                diffuse: !0,
                fragment: ["float $blendScreen(float base, float blend) {", "    return 1.0-((1.0-base)*(1.0-blend));", "}", "vec3 $blendScreen(vec3 base, vec3 blend) {", "    return vec3($blendScreen(base.r,blend.r),$blendScreen(base.g,blend.g),$blendScreen(base.b,blend.b));", "}", "vec3 $blendScreen(vec3 base, vec3 blend, float opacity) {", "    return ($blendScreen(base, blend) * opacity + base * (1.0 - opacity));", "}", "void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth) {", "   vec4 texel = texture2D($texture, uv);", "   color.rgb = $blendScreen( color.rgb, texel.rgb, $intensity * $attenuation);", "}"].join("\n")
            })
        }
        , function(e, t, n) {
            var i = n(14)
              , o = n(15);
            AFRAME.registerComponent("ssao", {
                schema: {
                    samples: {
                        type: "number",
                        default: 16
                    },
                    rings: {
                        type: "number",
                        default: 7
                    },
                    radius: {
                        type: "number",
                        default: .5
                    },
                    ratio: {
                        default: .5
                    },
                    intensity: {
                        default: 1
                    },
                    maxDepth: {
                        default: .99
                    },
                    bias: {
                        default: .05
                    },
                    scale: {
                        default: .15
                    },
                    blurRadius: {
                        default: 7
                    },
                    depthCutoff: {
                        default: 10
                    }
                },
                init: function() {
                    this.system = this.el.sceneEl.systems.effects;
                    var e = {
                        minFilter: THREE.LinearFilter,
                        magFilter: THREE.LinearFilter,
                        format: THREE.RGBAFormat
                    };
                    this.renderTargets = [],
                    this.renderTargets.push(new THREE.WebGLRenderTarget(1,1,e)),
                    this.renderTargets.push(new THREE.WebGLRenderTarget(1,1,e)),
                    this.uniforms = {
                        texture: {
                            type: "t",
                            value: this.renderTargets[0].texture
                        },
                        intensity: {
                            type: "f",
                            value: 1
                        },
                        maxDepth: {
                            type: "f",
                            value: .99
                        },
                        depthCutoff: {
                            type: "f",
                            default: 1
                        }
                    },
                    this.SAOMaterial = null,
                    this.hBlurMaterial = null,
                    this.vBlurMaterial = null,
                    this.sizeUniform = {
                        type: "v2",
                        value: new THREE.Vector2
                    },
                    this.system.register(this)
                },
                update: function(e) {
                    var t = this.data;
                    this.rebuild(t.rings !== e.rings || t.samples !== e.samples, t.blurRadius !== e.blurRadius),
                    this.uniforms.depthCutoff.value = t.depthCutoff,
                    this.uniforms.intensity.value = t.intensity,
                    this.uniforms.maxDepth.value = t.maxDepth,
                    this.SAOMaterial.uniforms.bias.value = t.bias,
                    this.SAOMaterial.uniforms.scale.value = t.scale,
                    this.SAOMaterial.uniforms.kernelRadius.value = t.radius,
                    this.hBlurMaterial.uniforms.depthCutoff.value = t.depthCutoff,
                    this.vBlurMaterial.uniforms.depthCutoff.value = t.depthCutoff
                },
                rebuild: function(e, t) {
                    var n = this.data;
                    e && (this.SAOMaterial && this.SAOMaterial.dispose(),
                    this.SAOMaterial = this.system.materialize(i(!0)),
                    this.SAOMaterial.defines.RINGS = parseInt(n.rings) + ".",
                    this.SAOMaterial.defines.SAMPLES = parseInt(n.samples) + ".",
                    this.SAOMaterial.uniforms.cameraFar = this.system.cameraFar,
                    this.SAOMaterial.uniforms.cameraNear = this.system.cameraNear),
                    t && (this.hBlurMaterial && (this.hBlurMaterial.dispose(),
                    this.vBlurMaterial.dispose()),
                    this.hBlurMaterial = this.system.materialize(o(n.blurRadius, n.blurRadius / 2, new THREE.Vector2(1,0))),
                    this.vBlurMaterial = this.system.materialize(o(n.blurRadius, n.blurRadius / 2, new THREE.Vector2(0,1))),
                    this.hBlurMaterial.uniforms.size = this.sizeUniform,
                    this.vBlurMaterial.uniforms.size = this.sizeUniform,
                    this.hBlurMaterial.uniforms.cameraFar = this.system.cameraFar,
                    this.hBlurMaterial.uniforms.cameraNear = this.system.cameraNear,
                    this.vBlurMaterial.uniforms.cameraFar = this.system.cameraFar,
                    this.vBlurMaterial.uniforms.cameraNear = this.system.cameraNear)
                },
                setSize: function(e, t) {
                    e = Math.ceil(e * this.data.ratio),
                    t = Math.ceil(t * this.data.ratio),
                    this.sizeUniform.value.set(e, t),
                    this.renderTargets.forEach(function(n) {
                        n.setSize(e, t)
                    })
                },
                tock: function(e) {
                    this.system.isActive(this, !0) && (this.SAOMaterial.uniforms.cameraInverseProjectionMatrix.value.getInverse(this.el.sceneEl.camera.projectionMatrix),
                    this.SAOMaterial.uniforms.cameraProjectionMatrix.value = this.el.sceneEl.camera.projectionMatrix,
                    this.SAOMaterial.uniforms.tDepth.value = this.el.sceneEl.renderTarget.depthTexture,
                    this.system.renderPass(this.SAOMaterial, this.renderTargets[0], !0),
                    this.data.blurRadius && (this.hBlurMaterial.uniforms.tDiffuse.value = this.renderTargets[0].texture,
                    this.system.renderPass(this.hBlurMaterial, this.renderTargets[1], !0),
                    this.vBlurMaterial.uniforms.tDiffuse.value = this.renderTargets[1].texture,
                    this.system.renderPass(this.vBlurMaterial, this.renderTargets[0], !0)))
                },
                remove: function() {
                    this.SAOMaterial.dispose(),
                    this.hBlurMaterial.dispose(),
                    this.vBlurMaterial.dispose(),
                    this.renderTargets[0].dispose(),
                    this.renderTargets[1].dispose(),
                    this.system.unregister(this)
                },
                includes: ["packing"],
                depth: !0,
                diffuse: !0,
                fragment: ["float $unpackDepth(vec3 pack) {", "\tfloat depth = dot( pack, 1.0 / vec3(1.0, 256.0, 256.0*256.0) );", "\treturn depth * (256.0*256.0*256.0) / (256.0*256.0*256.0 - 1.0);", "}", "void $main(inout vec4 color, vec4 origColor, vec2 uv, float depth) {", "   vec4 texel = texture2D($texture, uv);", "   float z = perspectiveDepthToViewZ( $unpackDepth(texel.xyz), cameraNear, cameraFar );", "   float Z = perspectiveDepthToViewZ( depth, cameraNear, cameraFar );", "   color.rgb *= abs(z-Z) > $depthCutoff || Z >= $maxDepth * cameraFar ? 1.0  :  1.0 - texel.a * $intensity;", "}"].join("\n")
            })
        }
        , function(e, t) {
            e.exports = function(e) {
                return {
                    defines: {},
                    uniforms: {
                        tDepth: {
                            type: "t",
                            value: null
                        },
                        cameraNear: {
                            type: "f",
                            value: 1
                        },
                        cameraFar: {
                            type: "f",
                            value: 100
                        },
                        cameraProjectionMatrix: {
                            type: "m4",
                            value: new THREE.Matrix4
                        },
                        cameraInverseProjectionMatrix: {
                            type: "m4",
                            value: new THREE.Matrix4
                        },
                        scale: {
                            type: "f",
                            value: 1
                        },
                        bias: {
                            type: "f",
                            value: .5
                        },
                        minResolution: {
                            type: "f",
                            value: 0
                        },
                        kernelRadius: {
                            type: "f",
                            value: .5
                        },
                        randomSeed: {
                            type: "f",
                            value: 0
                        },
                        maxDepth: {
                            type: "f",
                            value: 1
                        }
                    },
                    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
                    fragmentShader: ["#include <common>", "#include <packing>", "varying vec2 vUv;", "uniform sampler2D tDepth;", "uniform float cameraNear;", "uniform float cameraFar;", "uniform mat4 cameraProjectionMatrix;", "uniform mat4 cameraInverseProjectionMatrix;", "uniform float scale;", "uniform float intensity;", "uniform float bias;", "uniform float kernelRadius;", "uniform float minResolution;", "uniform float randomSeed;", "uniform float maxDepth;", "float unpackDepth(vec3 pack) {", "\tfloat depth = dot( pack, 1.0 / vec3(1.0, 256.0, 256.0*256.0) );", "\treturn depth * (256.0*256.0*256.0) / (256.0*256.0*256.0 - 1.0);", "}", "vec3 packDepth(float depth) {", "\tfloat depthVal = depth * (256.0*256.0*256.0 - 1.0) / (256.0*256.0*256.0);", "\tvec4 encode = fract( depthVal * vec4(1.0, 256.0, 256.0*256.0, 256.0*256.0*256.0) );", "\treturn encode.xyz - encode.yzw / 256.0 + 1.0/512.0;", "}", "float getViewZ( const in float depth ) {", "return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );", "}", "vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {", "float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];", "vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );", "clipPosition *= clipW;", "return ( cameraInverseProjectionMatrix * clipPosition ).xyz;", "}", "vec3 getViewNormal( const in vec3 viewPosition, const in vec2 screenPosition ) {", "return normalize( cross( dFdx( viewPosition ), dFdy( viewPosition ) ) );", "}", "float scaleDividedByCameraFar;", "float minResolutionMultipliedByCameraFar;", "float getOcclusion( const in vec3 centerViewPosition, const in vec3 centerViewNormal, const in vec3 sampleViewPosition ) {", "vec3 viewDelta = sampleViewPosition - centerViewPosition;", "float viewDistance = length( viewDelta );", "float scaledScreenDistance = scaleDividedByCameraFar * viewDistance;", "return max(0.0, (dot(centerViewNormal, viewDelta) - minResolutionMultipliedByCameraFar) / scaledScreenDistance - bias) / (1.0 + pow2( scaledScreenDistance ) );", "}", "const float ANGLE_STEP = PI2 * RINGS / SAMPLES;", "const float INV_NUM_SAMPLES = 1.0 / SAMPLES;", "float getAmbientOcclusion( const in vec3 centerViewPosition) {", "scaleDividedByCameraFar = scale;", "minResolutionMultipliedByCameraFar = minResolution * cameraFar;", "vec3 centerViewNormal = getViewNormal( centerViewPosition, vUv );", "float angle = rand( vUv + randomSeed ) * PI2;", "vec2 radius = vec2( kernelRadius * INV_NUM_SAMPLES );", "vec2 radiusStep = radius;", "float occlusionSum = 0.;", "float weightSum = 0.;", "for( int i = 0; i < int(SAMPLES); i ++ ) {", "vec2 sampleUv = vUv + vec2( cos( angle ), sin( angle ) ) * radius;", "radius += radiusStep;", "angle += ANGLE_STEP;", "float sampleDepth = textureVR( tDepth, sampleUv ).x;", "if( sampleDepth >= ( 1.0 - EPSILON ) ) {", "continue;", "}", "float sampleViewZ = getViewZ( sampleDepth );", "vec3 sampleViewPosition = getViewPosition( sampleUv, sampleDepth, sampleViewZ );", "occlusionSum += getOcclusion( centerViewPosition, centerViewNormal, sampleViewPosition );", "weightSum += 1.0;", "}", "if( weightSum == 0.0 ) discard;", "return occlusionSum / weightSum;", "}", "void main() {", "vec4 texel = texture2D( tDepth, vUv );", "float centerDepth = texel.x;", "if( centerDepth >= ( maxDepth - EPSILON ) ) {", "discard;", "}", "float centerViewZ = getViewZ( centerDepth );", "vec3 viewPosition = getViewPosition( vUv, centerDepth, centerViewZ );", "gl_FragColor =  vec4(packDepth(texel.x), getAmbientOcclusion( viewPosition));", "}"].join("\n")
                }
            }
        }
        , function(e, t) {
            THREE.BlurShaderUtils = {
                createSampleWeights: function(e, t) {
                    for (var n = [], i = 0; i <= e; i++)
                        n.push(function(e, t) {
                            return Math.exp(-e * e / (t * t * 2)) / (Math.sqrt(2 * Math.PI) * t)
                        }(i, t));
                    return n
                },
                createSampleOffsets: function(e, t) {
                    for (var n = [], i = 0; i <= e; i++)
                        n.push(t.clone().multiplyScalar(i));
                    return n
                },
                configure: function(e, t, n) {
                    return {
                        sampleUvOffsets: THREE.BlurShaderUtils.createSampleOffsets(e, n),
                        sampleWeights: THREE.BlurShaderUtils.createSampleWeights(e, t)
                    }
                }
            },
            e.exports = function(e, t, n) {
                e = e || 4;
                var i = THREE.BlurShaderUtils.configure(e, t, n);
                return {
                    defines: {
                        KERNEL_RADIUS: e
                    },
                    uniforms: {
                        tDiffuse: {
                            type: "t",
                            value: null
                        },
                        size: {
                            type: "v2",
                            value: new THREE.Vector2(512,512)
                        },
                        sampleUvOffsets: {
                            type: "v2v",
                            value: i.sampleUvOffsets
                        },
                        sampleWeights: {
                            type: "1fv",
                            value: i.sampleWeights
                        },
                        depthCutoff: {
                            type: "f",
                            value: 10
                        },
                        cameraFar: {
                            type: "f",
                            value: 1
                        },
                        cameraNear: {
                            type: "f",
                            value: 1e3
                        }
                    },
                    vertexShader: ["#include <common>", "uniform vec2 size;", "varying vec2 vUv;", "varying vec2 vInvSize;", "void main() {", "vUv = uv;", "vInvSize = 1.0 / size;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
                    fragmentShader: ["#include <common>", "#include <packing>", "uniform sampler2D tDiffuse;", "uniform vec2 sampleUvOffsets[ KERNEL_RADIUS + 1 ];", "uniform float sampleWeights[ KERNEL_RADIUS + 1 ];", "uniform float depthCutoff;", "uniform float cameraFar;", "uniform float cameraNear;", "varying vec2 vUv;", "varying vec2 vInvSize;", "float unpackDepth(vec3 pack) {", "\tfloat depth = dot( pack, 1.0 / vec3(1.0, 256.0, 256.0*256.0) );", "\treturn depth * (256.0*256.0*256.0) / (256.0*256.0*256.0 - 1.0);", "}", "float getViewZ( const in float depth ) {", "return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );", "}", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "vec3 orig = texel.xyz;", "float depth = unpackDepth( orig );", "if( depth >= ( 1.0 - EPSILON ) ) {", "discard;", "}", "float centerViewZ = -getViewZ( depth );", "bool rBreak = false, lBreak = false;", "float weightSum = sampleWeights[0];", "float AOSum = texel.a * weightSum;", "for( int i = 1; i <= KERNEL_RADIUS; i ++ ) {", "float sampleWeight = sampleWeights[i];", "vec2 sampleUvOffset = sampleUvOffsets[i] * vInvSize;", "vec2 sampleUv = vUv + sampleUvOffset;", "texel = textureVR( tDiffuse, sampleUv );", "float viewZ = -getViewZ(unpackDepth( texel.xyz ));", "if( abs( viewZ - centerViewZ ) > depthCutoff ) rBreak = true;", "if( ! rBreak ) {", "AOSum += texel.a * sampleWeight;", "weightSum += sampleWeight;", "}", "sampleUv = vUv - sampleUvOffset;", "texel = textureVR( tDiffuse, sampleUv );", "viewZ = -getViewZ(unpackDepth( texel.xyz ));", "if( abs( viewZ - centerViewZ ) > depthCutoff ) lBreak = true;", "if( ! lBreak ) {", "AOSum += texel.a * sampleWeight;", "weightSum += sampleWeight;", "}", "}", "gl_FragColor = vec4(orig, AOSum / weightSum);", "}"].join("\n")
                }
            }
        }
        , function(e, t) {
            AFRAME.registerComponent("lighty", {
                schema: {
                    color: {
                        type: "color",
                        default: "#000000"
                    },
                    radius: {
                        type: "number",
                        default: 0
                    },
                    decay: {
                        type: "number",
                        default: 1
                    }
                },
                init: function() {
                    this.el.sceneEl.systems.effects.addLight(this)
                },
                remove: function() {
                    this.el.sceneEl.systems.effects.removeLight(this)
                }
            })
        }
        , function(e, t) {
            function n(e) {
                var t = {
                    color: new THREE.Color(e.color),
                    emissive: new THREE.Color(e.emissive),
                    emissiveIntensity: e.emissiveIntensity,
                    fog: e.fog,
                    metalness: e.metalness,
                    roughness: e.roughness,
                    wireframe: e.wireframe,
                    wireframeLinewidth: e.wireframeLinewidth
                };
                return e.normalMap && (t.normalScale = e.normalScale),
                e.ambientOcclusionMap && (t.aoMapIntensity = e.ambientOcclusionMapIntensity),
                e.displacementMap && (t.displacementScale = e.displacementScale,
                t.displacementBias = e.displacementBias),
                t
            }
            THREE.ShaderChunk.lights_pars_maps += ["#if defined TILED_FORWARD", "uniform vec4 tileData;", "uniform sampler2D tileTexture;", "uniform sampler2D lightTexture;", "#endif"].join("\n"),
            THREE.ShaderChunk.lights_fragment_maps += ["", "#if defined TILED_FORWARD", "vec2 tUv = floor(gl_FragCoord.xy / tileData.xy * 32.) / 32. + tileData.zw;", "vec4 tile = texture2D(tileTexture, tUv);", "for (int i=0; i < 4; i++) {", "\tfloat tileVal = tile.x * 255.;", "  \ttile.xyzw = tile.yzwx;", "\tif(tileVal == 0.){ continue; }", "  \tfloat tileDiv = 128.;", "\tfor (int j=0; j < 8; j++) {", "  \t\tif (tileVal < tileDiv) {  tileDiv *= 0.5; continue; }", "\t\ttileVal -= tileDiv;", "\t\ttileDiv *= 0.5;", "  \t\tPointLight pointlight;", "\t\tfloat uvx = (float(8 * i + j) + 0.5) / 32.;", "  \t\tvec4 lightData = texture2D(lightTexture, vec2(uvx, 0.));", "  \t\tvec4 lightColor = texture2D(lightTexture, vec2(uvx, 1.));", "  \t\tpointlight.position = lightData.xyz;", "  \t\tpointlight.distance = lightData.w;", "  \t\tpointlight.color = lightColor.rgb;", "  \t\tpointlight.decay = lightColor.a;", "  \t\tgetPointDirectLightIrradiance( pointlight, geometry, directLight );", "\t\tRE_Direct( directLight, geometry, material, reflectedLight );", "\t}", "}", "#endif"].join("\n");
            var i = AFRAME.utils
              , o = new THREE.CubeTextureLoader
              , a = {};
            AFRAME.registerShader("standard-fx", {
                schema: {
                    ambientOcclusionMap: {
                        type: "map"
                    },
                    ambientOcclusionMapIntensity: {
                        default: 1
                    },
                    ambientOcclusionTextureOffset: {
                        type: "vec2"
                    },
                    ambientOcclusionTextureRepeat: {
                        type: "vec2",
                        default: {
                            x: 1,
                            y: 1
                        }
                    },
                    color: {
                        type: "color"
                    },
                    displacementMap: {
                        type: "map"
                    },
                    displacementScale: {
                        default: 1
                    },
                    displacementBias: {
                        default: .5
                    },
                    displacementTextureOffset: {
                        type: "vec2"
                    },
                    displacementTextureRepeat: {
                        type: "vec2",
                        default: {
                            x: 1,
                            y: 1
                        }
                    },
                    emissive: {
                        type: "color",
                        default: "#000"
                    },
                    emissiveIntensity: {
                        default: 1
                    },
                    envMap: {
                        default: ""
                    },
                    fog: {
                        default: !0
                    },
                    height: {
                        default: 256
                    },
                    metalness: {
                        default: 0,
                        min: 0,
                        max: 1
                    },
                    metalnessMap: {
                        type: "map"
                    },
                    metalnessTextureOffset: {
                        type: "vec2"
                    },
                    metalnessTextureRepeat: {
                        type: "vec2",
                        default: {
                            x: 1,
                            y: 1
                        }
                    },
                    normalMap: {
                        type: "map"
                    },
                    normalScale: {
                        type: "vec2",
                        default: {
                            x: 1,
                            y: 1
                        }
                    },
                    normalTextureOffset: {
                        type: "vec2"
                    },
                    normalTextureRepeat: {
                        type: "vec2",
                        default: {
                            x: 1,
                            y: 1
                        }
                    },
                    offset: {
                        type: "vec2",
                        default: {
                            x: 0,
                            y: 0
                        }
                    },
                    repeat: {
                        type: "vec2",
                        default: {
                            x: 1,
                            y: 1
                        }
                    },
                    roughness: {
                        default: .5,
                        min: 0,
                        max: 1
                    },
                    roughnessMap: {
                        type: "map"
                    },
                    roughnessTextureOffset: {
                        type: "vec2"
                    },
                    roughnessTextureRepeat: {
                        type: "vec2",
                        default: {
                            x: 1,
                            y: 1
                        }
                    },
                    sphericalEnvMap: {
                        type: "map"
                    },
                    src: {
                        type: "map"
                    },
                    width: {
                        default: 512
                    },
                    wireframe: {
                        default: !1
                    },
                    wireframeLinewidth: {
                        default: 2
                    }
                },
                init: function(e) {
                    this.material = new THREE.MeshStandardMaterial(n(e)),
                    i.material.updateMap(this, e),
                    e.normalMap && i.material.updateDistortionMap("normal", this, e),
                    e.displacementMap && i.material.updateDistortionMap("displacement", this, e),
                    e.ambientOcclusionMap && i.material.updateDistortionMap("ambientOcclusion", this, e),
                    e.metalnessMap && i.material.updateDistortionMap("metalness", this, e),
                    e.roughnessMap && i.material.updateDistortionMap("roughness", this, e),
                    this.updateEnvMap(e),
                    this.material.onBeforeCompile = function(e) {
                        e.uniforms.tileData = State.tileData,
                        e.uniforms.tileTexture = State.tileTexture,
                        e.uniforms.lightTexture = State.lightTexture,
                        e.defines.TILED_FORWARD = 1
                    }
                },
                update: function(e) {
                    this.updateMaterial(e),
                    i.material.updateMap(this, e),
                    e.normalMap && i.material.updateDistortionMap("normal", this, e),
                    e.displacementMap && i.material.updateDistortionMap("displacement", this, e),
                    e.ambientOcclusionMap && i.material.updateDistortionMap("ambientOcclusion", this, e),
                    e.metalnessMap && i.material.updateDistortionMap("metalness", this, e),
                    e.roughnessMap && i.material.updateDistortionMap("roughness", this, e),
                    this.updateEnvMap(e)
                },
                updateMaterial: function(e) {
                    var t = this.material;
                    e = n(e),
                    Object.keys(e).forEach(function(n) {
                        t[n] = e[n]
                    })
                },
                updateEnvMap: function(e) {
                    var t = this
                      , n = this.material
                      , r = e.envMap
                      , s = e.sphericalEnvMap;
                    return !r && !s || this.isLoadingEnvMap ? (n.envMap = null,
                    void (n.needsUpdate = !0)) : (this.isLoadingEnvMap = !0,
                    s ? void this.el.sceneEl.systems.material.loadTexture(s, {
                        src: s
                    }, function(e) {
                        t.isLoadingEnvMap = !1,
                        e.mapping = THREE.SphericalReflectionMapping,
                        n.envMap = e,
                        i.material.handleTextureEvents(t.el, e),
                        n.needsUpdate = !0
                    }) : a[r] ? void a[r].then(function(e) {
                        t.isLoadingEnvMap = !1,
                        n.envMap = e,
                        i.material.handleTextureEvents(t.el, e),
                        n.needsUpdate = !0
                    }) : void (a[r] = new Promise(function(e) {
                        i.srcLoader.validateCubemapSrc(r, function(a) {
                            o.load(a, function(o) {
                                t.isLoadingEnvMap = !1,
                                n.envMap = o,
                                i.material.handleTextureEvents(t.el, o),
                                e(o)
                            })
                        })
                    }
                    )))
                }
            })
        }
        ])
    }(),
    function() {
        AFRAME.registerComponent("cloud", {
            schema: {
                color: {
                    type: "string",
                    default: "blue"
                }
            },
            init: function() {
                const e = this.el;
                e.setAttribute("material", "shader", "cloud-shader"),
                e.setAttribute("material", "myColor", this.data.color)
            },
            update: function() {
                this.el.setAttribute("material", "myColor", this.data.color)
            }
        });
        `\n\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat pnoise3(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n`;
        AFRAME.registerShader("cloud-shader", {
            schema: {
                timeMsec: {
                    type: "time",
                    is: "uniform"
                },
                myOffset: {
                    type: "vec3",
                    is: "uniform"
                },
                myColor: {
                    type: "color",
                    is: "uniform",
                    default: "pink"
                }
            },
            vertexShader: '\n\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat pnoise3(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n\n\n//\n// Based on @thespite\'s article:\n// \n// "Vertex displacement with a noise function using GLSL and three.js"\n// Source: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/\n//\n\nvarying float noise;\nuniform float timeMsec; // A-Frame time in milliseconds.\nuniform vec3 myOffset;\n\nfloat turbulence( vec3 p ) {\n\n  float w = 100.0;\n  float t = -.5;\n\n  for (float f = 1.0 ; f <= 10.0 ; f++ ){\n    float power = pow( 2.0, f );\n    t += abs( pnoise3( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );\n  }\n\n  return t;\n\n}\n\nvoid main() {\n  float time = timeMsec / 1000.0; // Convert from A-Frame milliseconds to typical time in seconds.\n  noise = 10.0 *  -.10 * turbulence( .5 * normal + time / 3.0 );\n  float b = 5.0 * pnoise3( 0.05 * position, vec3( 100.0 ) );\n  float displacement = (- 10. * noise + b) / 50.0;\n\n  vec3 newPosition = position + normal * displacement + myOffset;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );\n}\n\n',
            fragmentShader: `\n\nvarying float noise;\nuniform vec3 myColor;\n\nvoid main() {\n\n  vec3 color = myColor  - vec3(2. * noise);\n  gl_FragColor = vec4( color.rgb , 1.0 );\n\n}\n\n`
        })
    }();
    var D = e=>{
        AFRAME.registerComponent("ufo", {
            schema: {
                type: {
                    type: "string",
                    default: "sentinel"
                },
                speed: {
                    type: "number",
                    default: 10
                },
                rotOffset: {
                    type: "number",
                    default: 0
                },
                engineSound: {
                    type: "string",
                    default: "https://cdn.glitch.com/6b222f93-e194-41e2-aaf6-59e5af64658d%2Fufo_engines.mp3?1555803047342"
                },
                engineVolume: {
                    type: "number",
                    default: 15
                }
            },
            init: function() {
                e.ufo = this,
                this.target = !1,
                this.lockedIn = !1,
                this.lerpCount = 0,
                this.thruster = document.getElementById("thruster"),
                this.thruster.object3D.visible = !1;
                let t = this;
                e.socket.on("set-ufo-target", e=>{
                    t.setTarget(e)
                }
                ),
                document.addEventListener("signInFail", t=>{
                    console.log("Handling signInFail on ufo.");
                    e.socket.emit("set-ufo-target", e.socket.id)
                }
                ),
                this.el.setAttribute("sound__engine", `src:url(${this.data.engineSound});loop:true;volume:${this.data.engineVolume}`)
            },
            tick: function(e, t) {
                if (this.target) {
                    let e = this.el.object3D.position.clone().sub(this.target.object3D.position)
                      , n = Math.atan2(e.x, e.z);
                    this.lockedIn ? new THREE.Vector2(this.el.object3D.position.x,this.el.object3D.position.z).distanceTo(new THREE.Vector2(this.target.object3D.position.x,this.target.object3D.position.z)) > 1 ? (this.el.object3D.translateZ(-this.data.speed * t / 3e3),
                    this.thruster.object3D.visible = !0,
                    this.engineSoundPlaying || (this.el.components.sound__engine.playSound(),
                    this.engineSoundPlaying = !0),
                    this.el.object3D.rotation.set(0, n + THREE.Math.degToRad(this.data.rotOffset), 0)) : (this.el.components.sound__engine.pauseSound(),
                    this.engineSoundPlaying = !1,
                    this.thruster.object3D.visible = !1) : (this.el.object3D.rotateY((n + THREE.Math.degToRad(this.data.rotOffset)) / 40),
                    this.lerpCount += 1,
                    this.lerpCount > 40 && (this.lockedIn = !0,
                    this.lerpCount = 0))
                }
            },
            setTarget: function(e) {
                let t = e ? document.getElementById(e) : e;
                this.target = t,
                this.lockedIn = !1
            }
        })
    }
      , I = e=>{
        AFRAME.registerComponent("npc", {
            schema: {
                waypoints: {
                    type: "array"
                },
                name: {
                    type: "string"
                },
                roam: {
                    type: "boolean",
                    default: !1
                }
            },
            init: function() {
                this.waypoints = this.data.waypoints,
                this.waypointsIndex = 0,
                this.moves = 0,
                this.data.name ? this.name = this.data.name : this.name = e.npc ? `npc${e.npc.length}` : "npc0",
                e.npc ? e.npc[this.name] = this : (e.npc = {},
                e.npc[this.name] = this),
                this.addListeners(),
                e.socket.emit("register-npc", {
                    name: this.name,
                    waypoints: this.waypoints
                }),
                this.data.roam && this.requestMove()
            },
            addListeners: function() {
                let t = this;
                this.el.addEventListener("navigation-end", this.onNavigationEnd.bind(t)),
                e.socket._callbacks["$npc-move"] || e.socket.on("npc-move", n=>{
                    if (n.dest === t.dest)
                        return;
                    e.npc[n.name].dest = n.dest;
                    e.npc[n.name].setPosition(n.pos);
                    e.npc[n.name].move(n.dest)
                }
                )
            },
            setWaypoints: function(t) {
                this.waypoints = t,
                e.socket.emit("set-npc-waypoints", {
                    name: this.name,
                    waypoints: t
                })
            },
            addWaypoint: function(t) {
                this.waypoints.push(t),
                e.socket.emit("add-npc-waypoint", {
                    name: this.name,
                    waypoint: t
                })
            },
            move: function(e=!1) {
                this.moves++;
                let t, n = {};
                if (!(t = e || this.waypoints[this.waypointsIndex]))
                    return void console.error("You must define some waypoints for your npc to roam! < npc component >");
                {
                    let e = t.split(" ");
                    n.x = e[0],
                    n.y = e[1],
                    n.z = e[2],
                    n && this.el.setAttribute("nav-agent", {
                        active: !0,
                        destination: n,
                        speed: 2
                    })
                }
            },
            setPosition: function(e) {
                this.el.setAttribute("position", e)
            },
            tick: function(e, t) {},
            requestMove: function(t="") {
                e.socket.emit("npc-move", {
                    name: this.name,
                    pos: this.el.getAttribute("position"),
                    dest: t
                })
            },
            onNavigationEnd: function(e) {
                ++this.waypointsIndex == this.waypoints.length && (this.waypointsIndex = 0);
                let t = this.waypoints[this.waypointsIndex];
                this.data.roam && this.requestMove(t)
            }
        })
    }
    ;
    !function() {
        AFRAME.registerComponent("dotrow", {
            schema: {
                change: {
                    type: "string",
                    default: "x"
                },
                to: {
                    type: "number",
                    default: 10
                }
            },
            init: function() {
                let e = this.data.change
                  , t = this.data.to
                  , n = this.el.getAttribute("position")
                  , i = n[e]
                  , o = t > i ? 2 : -2
                  , a = "x" == e;
                this.dots = [];
                let r = document.querySelector("a-scene");
                for (let e = i; e * (o / 2) < t * (o / 2); e += o) {
                    let t = document.createElement("a-sphere");
                    t.setAttribute("position", a ? `${e} 1 ${n.z}` : `${n.x} 1 ${e}`),
                    t.setAttribute("shader-frog", "name:Ova_Shader"),
                    t.setAttribute("radius", "0.5"),
                    t.setAttribute("collectible", "affects:pointsDial;value:10;threshold:1.6"),
                    r.appendChild(t),
                    this.dots.push(t)
                }
                this.firstInitTime = Date.now()
            },
            update: function() {
                Date.now() - this.firstInitTime < 5e3 || (console.log("updating dotrow..."),
                this.dots.forEach(e=>{
                    e.parentNode.removeChild(e)
                }
                ),
                this.init())
            }
        })
    }();
    var N = e=>{
        AFRAME.registerComponent("userdata", {
            init: function() {
                e.db = {},
                e.db.set = ((t,n)=>{
                    e.socket.emit("db-set", t, n)
                }
                ),
                e.db.get = ((t,n)=>{
                    e.socket.emit("db-get", t, n)
                }
                )
            }
        })
    }
      , V = e=>{
        AFRAME.registerComponent("iot-api", {
            schema: {
                LED: {
                    type: "string",
                    default: "on"
                }
            },
            init: function() {
                const t = this;
                this.el.addEventListener("click", e=>{
                    console.log("Click detected on LED.");
                    t.toggleLED()
                }
                ),
                e.iot = {},
                e.iot.set = ((t,n)=>{
                    e.socket.emit("iot-set", t, n)
                }
                ),
                e.iot.get = ((t,n)=>{
                    e.socket.emit("iot-get", t, n)
                }
                ),
                e.socket.on("iot-update", e=>{
                    console.log("LED update");
                    "on" == e.LED ? this.onLED() : this.offLED()
                }
                ),
                e.iot.get("LED", e=>{
                    console.log("LED INITIALIZE");
                    "on" == e ? this.onLED() : this.offLED()
                }
                )
            },
            setLED: function(e) {},
            offLED: function() {
                this.data.LED = "off",
                this.el.setAttribute("material", "color:#551818;emissiveIntensity:0")
            },
            onLED: function() {
                this.data.LED = "on",
                this.el.setAttribute("material", "color:red;emissiveIntensity:4")
            },
            toggleLED: function() {
                "on" == this.data.LED ? (this.offLED(),
                e.iot.set({
                    LED: "off"
                }, ()=>{}
                )) : (this.onLED(),
                e.iot.set({
                    LED: "on"
                }, ()=>{}
                ))
            },
            tick: function(e, t) {}
        })
    }
    ;
    (()=>{
        AFRAME.registerSystem("log", {
            schema: {
                console: {
                    default: !0
                }
            },
            init: function() {
                var e = this.data
                  , t = this.logs = []
                  , n = this.loggers = [];
                window.CS1.log = function(i, o) {
                    t.push([i, o]),
                    n.forEach(function(e) {
                        e.receiveLog(i, o)
                    }),
                    e.console && console.log("[log:" + (o || "") + "] " + i)
                }
                ,
                window.CS1.socket.on("vr-log", e=>{
                    window.CS1.log(e.msg, e.channel)
                }
                ),
                window.CS1.logall = function(e, t) {
                    window.CS1.socket.emit("logall", {
                        msg: e,
                        channel: t
                    })
                }
            },
            registerLogger: function(e) {
                this.loggers.push(e),
                this.logs.forEach(function(t) {
                    e.receiveLog.apply(e, t)
                })
            },
            unregisterLogger: function(e) {
                this.loggers.splice(this.loggers.indexOf(e), 1)
            }
        });
        AFRAME.registerComponent("log", {
            schema: {
                channel: {
                    type: "string"
                },
                filter: {
                    type: "string"
                },
                max: {
                    default: 100
                },
                showErrors: {
                    default: !0
                }
            },
            init: function() {
                this.logs = [],
                this.system.registerLogger(this)
            },
            play: function() {
                var e = this;
                this.el.sceneEl.addEventListener("log", function(t) {
                    t.detail && e.receiveLog(t.detail.message, t.detail.channel)
                }),
                window.onerror = function(t, n, i, o, a) {
                    e.receiveLog("Error: " + t)
                }
            },
            receiveLog: function(e, t) {
                var n = this.data;
                "string" != typeof e && (e = JSON.stringify(e)),
                n.channel && t && n.channel !== t || n.filter && -1 === e.indexOf(n.filter) || (this.logs.push(e),
                n.max && this.logs.length > n.max && this.logs.shift(),
                this.el.setAttribute("text", {
                    value: this.logs.join("\n")
                }))
            },
            remove: function() {
                this.el.removeAttribute("text"),
                this.system.unregisterLogger(this)
            }
        })
    }
    )(),
    (()=>{
        AFRAME.registerComponent("launchable", {
            schema: {
                burst: {
                    type: "boolean",
                    default: !0
                },
                launchSound: {
                    type: "string",
                    default: "https://cdn.glitch.com/83b7f985-f6ce-40dd-ac98-772aff98ebbf%2Fwoosh.mp3"
                }
            },
            dependencies: ["grabbable"],
            init: function() {
                let e = this;
                e.grabbable = e.el.components.grabbable,
                e.el.setAttribute("sound__launch", `src:url(${this.data.launchSound})`),
                e.el.addEventListener("grabEnd", t=>{
                    CS1.socket.emit("logall", {
                        msg: `${CS1.myPlayer.name} launched grabbable ${e.grabbable.name}!`,
                        channel: "0"
                    });
                    e.grabbable.isDragging = !0;
                    let n = {
                        name: e.grabbable.name,
                        dir: e.getDir()
                    };
                    CS1.socket.emit("launch", n)
                }
                ),
                CS1.socket._callbacks["$launch-sound"] || CS1.socket.on("launch-sound", e=>{
                    CS1.grabbables[e].components.sound__launch.playSound()
                }
                )
            },
            getDir: function() {
                if ("Oculus Quest" == CS1.device) {
                    let e = this.grabbable.cursor.components.raycaster.raycaster.ray.direction;
                    return e.x *= -1,
                    e.y *= -1,
                    e.z *= -1,
                    e
                }
                return this.grabbable.cursor.object3D.getWorldDirection()
            }
        })
    }
    )(),
    function() {
        AFRAME.registerComponent("launchrow", {
            schema: {
                change: {
                    type: "string",
                    default: "x"
                },
                to: {
                    type: "number",
                    default: 10
                }
            },
            init: function() {
                let e = this.data.change
                  , t = this.data.to
                  , n = this.el.getAttribute("position")
                  , i = n[e]
                  , o = t > i ? 4 : -4
                  , a = "x" == e;
                this.dots = [];
                let r = document.querySelector("a-scene");
                for (let e = i; e * (o / 2) < t * (o / 2); e += o) {
                    let t = document.createElement("a-sphere");
                    t.setAttribute("position", a ? `${e} 1.4 ${n.z}` : `${n.x} 1.4 ${e}`),
                    t.setAttribute("shader-frog", "name:Disco_Shader"),
                    t.setAttribute("radius", "1"),
                    t.setAttribute("collectible", "affects:energyDial;value:-10;threshold:1.6"),
                    t.setAttribute("grabbable", ""),
                    t.setAttribute("launchable", ""),
                    r.appendChild(t),
                    this.dots.push(t)
                }
                this.firstInitTime = Date.now()
            },
            update: function() {
                Date.now() - this.firstInitTime < 5e3 || (console.log("updating dotrow..."),
                this.dots.forEach(e=>{
                    e.parentNode.removeChild(e)
                }
                ),
                this.init())
            }
        })
    }(),
    (()=>{
        AFRAME.registerSystem("vrui", {
            schema: {
                panels: {
                    default: 3
                }
            },
            dependencies: ["htmlembed"],
            init: ()=>{
                document.head.innerHTML += `\n\n    \n       <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">\n    <style>\n    body{\n      font-family: 'Roboto', sans-serif;\n      \n      font-size: 32px;\n    }\n    h1{\n      font-size: 52px;\n    }\n    .dark{\n      background-color: rgba(0,0,0,0.2);\n      border-radius:50px;  \n      background-repeat: no-repeat;\n      background-position: bottom right;\n      padding: 40px;\n      color: #fff;\n    }\n    .main{\n      width: 1024px;\n      height: 900px;\n      overflow: hidden;\n    }\n    .menu{\n      width: 256px;\n      height: 900px;\n      text-align: center;\n    }\n    .menu ul{\n      list-style-type: none;\n      margin: 0;\n      padding: 0;\n    }\n    a.button{\n      display: inline-block;\n      width: 100%;\n      border-radius: 20px;\n      background-color: #000;\n      color: #fff;\n      text-decoration: none;\n      text-align: center;\n      padding: 10px 0;\n      margin-bottom: 20px;\n    }\n    a.button:hover{\n      background-color: #fff;\n      color: #888;\n    }\n    a.button:active{\n      background-color: #fff;\n      color: #888;\n      box-shadow: 0px 0px 50px #00d2ff;\n    }\n    a.imgLink{\n      width: 100%;\n      border-radius: 20px;\n      color: #fff;\n      text-decoration: none;\n      text-align: center;\n      padding: 10px 0;\n      margin-bottom: 20px;\n      background-color: #444;\n      border: 3px solid #444;\n      text-shadow: none;\n      display: block;\n    }\n    a.imgLink:hover{\n      border: 3px solid #fff;\n      background-color: #444;\n    }\n    .code{\n      white-space: pre;\n      font-size: 0.7em;\n      background-color: #000;\n      margin-bottom: 30px;\n    }\n    .next,.prev{\n      position: absolute;\n      bottom: 0px;\n      right: 30px;\n      display: inline-block;\n      width: auto !important;\n      padding: 20px 30px !important;\n    }\n    .prev{\n      right: auto;\n      left: 30px;\n    }\n    #page1{\n      position: relative;\n      height: 100%;\n    }\n    #page2, #page3, #page4{\n      display: none;\n      position: relative;\n      height: 100%;\n    }\n    .slide{\n      height:100%;\n    }\n    .slide:target #page1{\n      display: none;\n    }\n    #slide2:target #page2{\n      display: block;\n    }\n    #slide3:target #page3{\n      display: block;\n    }\n    #slide4:target #page4{\n      display: block;\n    }\n    #page4 ul{\n      list-style-type: square;\n      font-size: 0.8em;\n    }\n    </style>\n  `;
                AFRAME.registerComponent("showbutton", {
                    schema: {
                        target: {
                            type: "selector"
                        }
                    },
                    init: function() {
                        var e = !1;
                        this.el.addEventListener("click", ()=>{
                            e ? (this.data.target.setAttribute("visible", "false"),
                            this.el.querySelector("a").innerHTML = "Show Box") : (this.data.target.setAttribute("visible", "true"),
                            this.el.querySelector("a").innerHTML = "Hide Box");
                            e = !e
                        }
                        )
                    }
                });
                `<a-entity id="menu1" class="screen menu dark"  position="-2.712 1.5 -1.476" rotation="0 45 0">\n       <h2>Menu</h2>\n       <ul>\n          <li><a id="b1" href="#" class="button">Stats</a></li>\n          <li><a id="b2" href="#slide2" class="button">Mission</a></li>\n          <li><a id="b3" href="#slide3" class="button">Interactivity</a></li>\n          <li><a id="b4" href="#slide4" class="button">Limitations</a></li>\n       </ul>\n    </a-entity>\n    <a-entity id="main" class="screen dark main" position="0 1.5 -2">\n       <div id="page1">\n         \n       </div>\n       <div id="page2">\n          <h1>Mission</h1>\n         <p>Roam the virtual world looking for mission clues. Be nice and helpful to everyone you meet.</p>\n         <p>Once you have gathered enough clues and your mission is clear, gather the neccessary resources and fulfill your calling. 🦄</p>\n           \n           <a href="#" class="button prev">Prev Page</a>\n           <a href="#slide3" class="button next">Next Page</a>\n       </div>\n       <div id="page3">\n          <h1>Interactivity</h1>\n          <p>You can add javascript interactivity in the standard way either by events on the elements themselves or alternatively by adding event listeners to the DOM.</p>\n          <div class="code">  \n             cubebutton.addEventListener("click",function(){\n             if(show){\n             box.setAttribute("visible","false");\n             cubebutton.innerHTML="Show Box";\n             }else{\n             box.setAttribute("visible","true");\n             cubebutton.innerHTML="Hide Box";\n             }\n             show=!show;\n             });\n          </div>\n          <a-entity id="showbutton" showbutton="target:#box"><a class="button" href="javascript:void(0)">Show Box</a></a-entity>\n          <a href="#slide2" class="button prev">Prev Page</a>\n          <a href="#slide4" class="button next">Next Page</a>\n       </div>\n       <div id="page4">\n          <h1>Limitations</h1>\n          <ul>\n             <li>All styles and images must be in the same origin or allow access via CORS; this allows the component to embed all of the assets required to render the html properly to the canvas via the foreignObject element. </li>\n             <li>transform-style css is limited to flat. This is mainly due to it not being rendered properly to canvas so element bounding for preserve-3d has not yet been implemented. If the rendering is fixed as some point I may go back and get it working as well.</li>\n             <li>"a-" tags do not render correctly as XHTML embeded into SVG, so any parent "a-" elements of the embed html will be converted to div tags for rendering. This may mean your css will require modification.</li>\n             <li>Elements that require rendering outside of the DOM such as the iframe and canvas element will not work.</li>\n             <li>:before and :after pseudo elements can't be accessed via the DOM so they can't be used in the element to determine the object bounds. As such, use them with caution. </li>\n             <li>Form elements are not consistently rendered to the canvas element so some basic default styles are included for consistency.</li>\n             <li>Currently there is no support for css transitions.</li>\n          </ul>\n          <a href="#slide3" class="button prev">Prev Page</a>\n       </div>\n    </a-entity>\n    <a-entity id="menu2" class="screen menu dark" position="2.712 1.5 -1.476" rotation="0 -45 0">\n       <h2>Box Logo</h2>\n       <a id="top-btn" class="imgLink" href="#">\n          <img crossorigin="anonymous"   src="https://cdn.glitch.com/376724db-dc5f-44ca-af35-36d00838079c%2Fcow.png?v=1562353505829" width="80" height="80">\n          <div>Cow Cud</div>\n       </a>\n       <a id="mid-btn" class="imgLink" href="#">\n          <img crossorigin="anonymous"  src="https://cdn.glitch.com/a66c3f5c-9aba-45c0-952e-ccc59d8b0df3%2FCS1_logo_512.png?v=1564891633017" width="80" height="80">\n          <div>CS1 Game Engine</div>\n       </a>\n       <a id="bot-btn" class="imgLink" href="#">\n          <img  crossorigin="anonymous" src="https://cdn.glitch.com/36918312-2de3-4283-951d-240b263949f7%2Fgo.png?v=1562106636316" width="80" height="80">\n          <div>Golang</div>\n       </a>\n    </a-entity>\n    <a-box material="src:#go" scale="0.5 0.5 0.5" position="1 1 -1.5" id="box" visible="false"></a-box> `;
                const e = document.createElement("a-entity");
                e.setAttribute("style", "visibility:hidden");
                e.setAttribute("vrui", "");
                e.id = "embed-container";
                e.innerHTML = `<a-entity id="menu1" class="screen menu dark"  position="-2.712 1.5 -1.476" rotation="0 45 0">\n       <h2>Menu</h2>\n       <ul>\n          <li><a id="b1" href="#" class="button">Stats</a></li>\n          <li><a id="b2" href="#slide2" class="button">Mission</a></li>\n          <li><a id="b3" href="#slide3" class="button">Interactivity</a></li>\n          <li><a id="b4" href="#slide4" class="button">Limitations</a></li>\n       </ul>\n    </a-entity>\n    <a-entity id="main" class="screen dark main" position="0 1.5 -2">\n       <div id="page1">\n         \n       </div>\n       <div id="page2">\n          <h1>Mission</h1>\n         <p>Roam the virtual world looking for mission clues. Be nice and helpful to everyone you meet.</p>\n         <p>Once you have gathered enough clues and your mission is clear, gather the neccessary resources and fulfill your calling. 🦄</p>\n           \n           <a href="#" class="button prev">Prev Page</a>\n           <a href="#slide3" class="button next">Next Page</a>\n       </div>\n       <div id="page3">\n          <h1>Interactivity</h1>\n          <p>You can add javascript interactivity in the standard way either by events on the elements themselves or alternatively by adding event listeners to the DOM.</p>\n          <div class="code">  \n             cubebutton.addEventListener("click",function(){\n             if(show){\n             box.setAttribute("visible","false");\n             cubebutton.innerHTML="Show Box";\n             }else{\n             box.setAttribute("visible","true");\n             cubebutton.innerHTML="Hide Box";\n             }\n             show=!show;\n             });\n          </div>\n          <a-entity id="showbutton" showbutton="target:#box"><a class="button" href="javascript:void(0)">Show Box</a></a-entity>\n          <a href="#slide2" class="button prev">Prev Page</a>\n          <a href="#slide4" class="button next">Next Page</a>\n       </div>\n       <div id="page4">\n          <h1>Limitations</h1>\n          <ul>\n             <li>All styles and images must be in the same origin or allow access via CORS; this allows the component to embed all of the assets required to render the html properly to the canvas via the foreignObject element. </li>\n             <li>transform-style css is limited to flat. This is mainly due to it not being rendered properly to canvas so element bounding for preserve-3d has not yet been implemented. If the rendering is fixed as some point I may go back and get it working as well.</li>\n             <li>"a-" tags do not render correctly as XHTML embeded into SVG, so any parent "a-" elements of the embed html will be converted to div tags for rendering. This may mean your css will require modification.</li>\n             <li>Elements that require rendering outside of the DOM such as the iframe and canvas element will not work.</li>\n             <li>:before and :after pseudo elements can't be accessed via the DOM so they can't be used in the element to determine the object bounds. As such, use them with caution. </li>\n             <li>Form elements are not consistently rendered to the canvas element so some basic default styles are included for consistency.</li>\n             <li>Currently there is no support for css transitions.</li>\n          </ul>\n          <a href="#slide3" class="button prev">Prev Page</a>\n       </div>\n    </a-entity>\n    <a-entity id="menu2" class="screen menu dark" position="2.712 1.5 -1.476" rotation="0 -45 0">\n       <h2>Box Logo</h2>\n       <a id="top-btn" class="imgLink" href="#">\n          <img crossorigin="anonymous"   src="https://cdn.glitch.com/376724db-dc5f-44ca-af35-36d00838079c%2Fcow.png?v=1562353505829" width="80" height="80">\n          <div>Cow Cud</div>\n       </a>\n       <a id="mid-btn" class="imgLink" href="#">\n          <img crossorigin="anonymous"  src="https://cdn.glitch.com/a66c3f5c-9aba-45c0-952e-ccc59d8b0df3%2FCS1_logo_512.png?v=1564891633017" width="80" height="80">\n          <div>CS1 Game Engine</div>\n       </a>\n       <a id="bot-btn" class="imgLink" href="#">\n          <img  crossorigin="anonymous" src="https://cdn.glitch.com/36918312-2de3-4283-951d-240b263949f7%2Fgo.png?v=1562106636316" width="80" height="80">\n          <div>Golang</div>\n       </a>\n    </a-entity>\n    <a-box material="src:#go" scale="0.5 0.5 0.5" position="1 1 -1.5" id="box" visible="false"></a-box> `;
                let t = document.querySelector("a-scene");
                t.appendChild(e);
                document.addEventListener("gameStart", e=>{
                    function t() {
                        r.setAttribute("sound", "src:url(https://cdn.glitch.com/36918312-2de3-4283-951d-240b263949f7%2Fclick.mp3?v=1561929149589)"),
                        s.setAttribute("sound", "src:url(https://cdn.glitch.com/36918312-2de3-4283-951d-240b263949f7%2Fclick.mp3?v=1561929149589)"),
                        document.removeEventListener("click", t)
                    }
                    let n = document.createElement("a");
                    n.href = "#slide2";
                    n.classList = "button next";
                    n.innerText = "Next Page";
                    let i = document.createElement("div");
                    i.style.width = "100%";
                    i.style.height = "100%";
                    i.appendChild(CS1.hud.container);
                    i.appendChild(n);
                    document.querySelector("#page1").appendChild(i);
                    document.querySelector("a-scene");
                    let o = document.querySelector("#embed-container");
                    o.setAttribute("visible", !1);
                    o.setAttribute("position", "0 0 0");
                    CS1.myPlayer.add(o);
                    CS1.hud.container = o;
                    let a = document.querySelector("#main");
                    let r = document.querySelector("#menu1");
                    let s = document.querySelector("#menu2");
                    a.setAttribute("htmlembed", "");
                    r.setAttribute("htmlembed", "");
                    s.setAttribute("htmlembed", "");
                    document.addEventListener("click", t);
                    const l = document.querySelector("#box");
                    let c = document.querySelector("#top-btn");
                    c && c.addEventListener("mouseenter", e=>{
                        CS1.hud.container.getAttribute("visible") && s.components.sound && s.components.sound.playSound()
                    }
                    );
                    c && c.addEventListener("click", e=>{
                        e.preventDefault();
                        l.setAttribute("material", "src:#cow")
                    }
                    );
                    let u = document.querySelector("#mid-btn");
                    u && u.addEventListener("mouseenter", e=>{
                        CS1.hud.container.getAttribute("visible") && s.components.sound && s.components.sound.playSound()
                    }
                    );
                    u && u.addEventListener("click", e=>{
                        e.preventDefault();
                        l.setAttribute("material", "src:#cs1")
                    }
                    );
                    let v = document.querySelector("#bot-btn");
                    v && v.addEventListener("mouseenter", e=>{
                        CS1.hud.container.getAttribute("visible") && s.components.sound && s.components.sound.playSound()
                    }
                    );
                    v && v.addEventListener("click", e=>{
                        e.preventDefault();
                        l.setAttribute("material", "src:#go")
                    }
                    );
                    let m = document.querySelector("#b1");
                    m && m.addEventListener("mouseenter", e=>{
                        CS1.hud.container.getAttribute("visible") && r.components.sound && r.components.sound.playSound()
                    }
                    );
                    let d = document.querySelector("#b2");
                    d && d.addEventListener("mouseenter", e=>{
                        CS1.hud.container.getAttribute("visible") && r.components.sound && r.components.sound.playSound()
                    }
                    );
                    let p = document.querySelector("#b3");
                    p && p.addEventListener("mouseenter", e=>{
                        CS1.hud.container.getAttribute("visible") && r.components.sound && r.components.sound.playSound()
                    }
                    );
                    let f = document.querySelector("#b4");
                    f && f.addEventListener("mouseenter", e=>{
                        CS1.hud.container.getAttribute("visible") && r.components.sound && r.components.sound.playSound()
                    }
                    );
                    document.querySelectorAll(".dark").forEach(e=>{
                        e.classList.remove("screen")
                    }
                    );
                    let h = document.querySelector("#left-hand").components["oculus-touch-controls"];
                    let g = document.querySelector("#right-hand").components["oculus-touch-controls"];
                    if ("Oculus Quest" == CS1.device) {
                        let e = document.querySelector("a-cursor");
                        e.pause(),
                        CS1.cam.components.raycaster && CS1.cam.components.raycaster.pause(),
                        h.el.addEventListener("abuttondown", e=>{
                            CS1.hud.container.object3D.rotation.y = CS1.cam.object3D.rotation.y;
                            let t = CS1.hud.container.getAttribute("visible");
                            CS1.hud.container.setAttribute("visible", !t);
                            t ? document.querySelectorAll(".dark").forEach(e=>{
                                e.classList.remove("screen")
                            }
                            ) : document.querySelectorAll(".dark").forEach(e=>{
                                e.classList.add("screen")
                            }
                            )
                        }
                        ),
                        g.el.addEventListener("abuttondown", e=>{
                            CS1.hud.container.object3D.rotation.y = CS1.cam.object3D.rotation.y;
                            let t = CS1.hud.container.getAttribute("visible");
                            CS1.hud.container.setAttribute("visible", !t);
                            t ? document.querySelectorAll(".dark").forEach(e=>{
                                e.classList.remove("screen")
                            }
                            ) : document.querySelectorAll(".dark").forEach(e=>{
                                e.classList.add("screen")
                            }
                            )
                        }
                        )
                    } else
                        "Standard" == CS1.device ? document.addEventListener("keypress", e=>{
                            if ("Backquote" == e.code) {
                                CS1.hud.container.object3D.rotation.y = CS1.cam.object3D.rotation.y;
                                let e = CS1.hud.container.getAttribute("visible");
                                CS1.hud.container.setAttribute("visible", !e),
                                e ? document.querySelectorAll(".dark").forEach(e=>{
                                    e.classList.remove("screen")
                                }
                                ) : document.querySelectorAll(".dark").forEach(e=>{
                                    e.classList.add("screen")
                                }
                                )
                            }
                        }
                        ) : "Mobile" == CS1.device && document.addEventListener("doubleTapMenu", e=>{
                            CS1.hud.container.object3D.rotation.y = CS1.cam.object3D.rotation.y;
                            let t = CS1.hud.container.getAttribute("visible");
                            CS1.hud.container.setAttribute("visible", !t);
                            t ? document.querySelectorAll(".dark").forEach(e=>{
                                e.classList.remove("screen")
                            }
                            ) : document.querySelectorAll(".dark").forEach(e=>{
                                e.classList.add("screen")
                            }
                            )
                        }
                        )
                }
                )
            }
        })
    }
    )(),
    (()=>{
        AFRAME.registerComponent("chat", {
            schema: {
                inputColor: {
                    default: "#fff"
                },
                keyboardColor: {
                    default: "#fff"
                },
                highlightColor: {
                    default: "#1a79dc"
                }
            },
            dependencies: ["aframe-keyboard"],
            init: function() {
                this.container = document.createElement("a-entity"),
                this.container.setAttribute("visible", !1),
                this.input = document.createElement("a-text"),
                this.input.setAttribute("font", "dejavu"),
                this.input.setAttribute("color", this.data.inputColor),
                this.input.setAttribute("value", "Enter message ..."),
                this.input.setAttribute("scale", "0.7 0.7 0.7"),
                this.input.setAttribute("rotation", "-20 0 0"),
                this.input.setAttribute("position", "-0.5 1.9 -1.5"),
                this.keyboard = document.createElement("a-entity"),
                this.keyboard.setAttribute("a-keyboard", "dismissable:false"),
                this.keyboard.setAttribute("position", "-1 1.6 -1.5"),
                this.keyboard.setAttribute("rotation", "-20 0 0"),
                this.keyboard.setAttribute("scale", "4 4 4"),
                this.container.appendChild(this.input),
                this.container.appendChild(this.keyboard),
                this.el.appendChild(this.container);
                const e = this;
                document.addEventListener("gameStart", t=>{
                    function n() {
                        e.input.setAttribute("value", e.value),
                        e.container.setAttribute("visible", !1),
                        document.querySelectorAll(".collidable").forEach(e=>{
                            e.classList.remove("collidable")
                        }
                        ),
                        e.keyboard.components["a-keyboard"].pause(),
                        document.removeEventListener("a-keyboard-update", i),
                        CS1.socket.emit("msg", {
                            msg: e.value
                        }),
                        r.blur()
                    }
                    function i(t) {
                        switch (parseInt(t.detail.code)) {
                        case 8:
                            e.value = e.value.slice(0, -1);
                            break;
                        case 999:
                        case 13:
                            return void n();
                        default:
                            if (!t.detail.value)
                                return;
                            40 == t.detail.code && (t.detail.value = "\n"),
                            e.value = e.value + t.detail.value
                        }
                        e.input.setAttribute("value", e.value + "_")
                    }
                    function o() {
                        e.input.setAttribute("value", e.value),
                        e.container.setAttribute("visible", !1),
                        document.querySelectorAll(".collidable").forEach(e=>{
                            e.classList.remove("collidable")
                        }
                        ),
                        e.keyboard.components["a-keyboard"].pause(),
                        document.removeEventListener("a-keyboard-update", a),
                        CS1.socket.emit("msg", {
                            msg: e.value
                        })
                    }
                    function a(t) {
                        switch (parseInt(t.detail.code)) {
                        case 8:
                            e.value = e.value.slice(0, -1);
                            break;
                        case 999:
                            return void o();
                        default:
                            if (!t.detail.value)
                                return;
                            40 == t.detail.code && (t.detail.value = "\n"),
                            e.value = e.value + t.detail.value
                        }
                        e.input.setAttribute("value", e.value + "_")
                    }
                    e.normalKeys = document.querySelectorAll(".collidable");
                    document.querySelectorAll(".collidable").forEach(e=>{
                        e.classList.remove("collidable")
                    }
                    );
                    const r = document.querySelector("#standard-chat-dummy");
                    e.value = "";
                    let s = document.querySelector("#left-hand").components["oculus-touch-controls"];
                    let l = document.querySelector("#right-hand").components["oculus-touch-controls"];
                    switch (CS1.device) {
                    case "Oculus Quest":
                        let t = document.querySelector("a-cursor");
                        t.pause(),
                        CS1.cam.components.raycaster && CS1.cam.components.raycaster.pause(),
                        s.el.addEventListener("bbuttondown", t=>{
                            e.value = "";
                            e.input.setAttribute("value", e.value);
                            document.addEventListener("a-keyboard-update", a);
                            e.container.object3D.rotation.y = CS1.cam.object3D.rotation.y;
                            let n = e.container.getAttribute("visible");
                            e.container.setAttribute("visible", !n);
                            e.keyboard.components["a-keyboard"].play();
                            n ? document.querySelectorAll(".collidable").forEach(e=>{
                                e.classList.remove("collidable")
                            }
                            ) : e.keys.forEach(e=>{
                                e.classList.add("collidable")
                            }
                            )
                        }
                        ),
                        l.el.addEventListener("bbuttondown", t=>{
                            e.value = "";
                            e.input.setAttribute("value", e.value);
                            document.addEventListener("a-keyboard-update", a);
                            e.container.object3D.rotation.y = CS1.cam.object3D.rotation.y;
                            let n = e.container.getAttribute("visible");
                            e.container.setAttribute("visible", !n);
                            e.keyboard.components["a-keyboard"].play();
                            n ? document.querySelectorAll(".collidable").forEach(e=>{
                                e.classList.remove("collidable")
                            }
                            ) : AFK.template.toggleActiveMode("normal")
                        }
                        );
                        break;
                    case "Mobile":
                        CS1.chatInput = document.querySelector("#mobile-chat-input"),
                        CS1.chatInput.style.position = "absolute",
                        CS1.chatInput.style.top = "10px",
                        CS1.chatInput.style.margin = "0 auto",
                        CS1.chatInput.addEventListener("keydown", e=>{
                            switch (e.keyCode) {
                            case 13:
                                CS1.socket.emit("msg", {
                                    msg: CS1.chatInput.value
                                }),
                                CS1.chatInput.style.zIndex = -1e3,
                                CS1.chatInput.style.top = "-100px",
                                CS1.chatInput.blur()
                            }
                        }
                        ),
                        document.addEventListener("doubleTapChat", e=>{
                            -1e3 == CS1.chatInput.style.zIndex ? (CS1.chatInput.style.zIndex = 200,
                            CS1.chatInput.style.top = "10px") : (CS1.chatInput.style.zIndex = -1e3,
                            CS1.chatInput.style.top = "-100px")
                        }
                        );
                        break;
                    case "Standard":
                        document.querySelector("#mobile-chat-input").setAttribute("style", "position:absolute;top:-1000px");
                        const n = document.querySelector("#standard-chat-dummy");
                        document.addEventListener("keypress", t=>{
                            if (61 == t.keyCode) {
                                e.value = "",
                                e.input.setAttribute("value", e.value),
                                document.addEventListener("a-keyboard-update", i),
                                e.container.object3D.rotation.y = CS1.cam.object3D.rotation.y;
                                let t = e.container.getAttribute("visible");
                                e.container.setAttribute("visible", !t),
                                e.keyboard.components["a-keyboard"].play(),
                                t ? document.querySelectorAll(".collidable").forEach(e=>{
                                    n.blur();
                                    e.classList.remove("collidable")
                                }
                                ) : (AFK.template.toggleActiveMode("normal"),
                                e.normalKeys.forEach(e=>{
                                    n.focus();
                                    e.classList.add("collidable")
                                }
                                ))
                            }
                        }
                        )
                    }
                }
                )
            }
        })
    }
    )(),
    (()=>{
        AFRAME.registerComponent("terrain", {
            schema: {
                ocean: {
                    default: "https://cdn.glitch.com/7e6b3197-5c1e-4085-b6f9-b585ec0f94cd%2Fcartoon_desert_soil1.jpg?v=1565735566070"
                },
                sand: {
                    default: "https://cdn.glitch.com/7e6b3197-5c1e-4085-b6f9-b585ec0f94cd%2Fcartoon_sand2.png?v=1565735753925"
                },
                grass: {
                    default: "https://cdn.glitch.com/7e6b3197-5c1e-4085-b6f9-b585ec0f94cd%2Fcartoon_grass3.jpg"
                },
                rock: {
                    default: "https://cdn.glitch.com/7e6b3197-5c1e-4085-b6f9-b585ec0f94cd%2Fcartoon_rock_1.jpg?v=1565734703001"
                },
                snow: {
                    default: "https://cdn.glitch.com/7d8a1e47-5d85-4a86-8736-7461b2a17688%2Fsnow-512.jpg?v=1565387895694"
                },
                heightmap: {
                    default: "https://cdn.glitch.com/7d8a1e47-5d85-4a86-8736-7461b2a17688%2Fheightmap.png?v=1565387568467"
                },
                water: {
                    default: "https://cdn.glitch.com/7d8a1e47-5d85-4a86-8736-7461b2a17688%2Fwater512.jpg?v=1565388458934"
                },
                scale: {
                    default: 1
                },
                addwater: {
                    default: !0
                },
                waterlevel: {
                    default: 5
                }
            },
            init: function() {
                const e = this;
                var t = (new THREE.TextureLoader).load(e.data.heightmap)
                  , n = 100 * this.data.scale
                  , i = (new THREE.TextureLoader).load(e.data.ocean);
                i.wrapS = i.wrapT = THREE.RepeatWrapping;
                var o = (new THREE.TextureLoader).load(e.data.sand);
                o.wrapS = o.wrapT = THREE.RepeatWrapping;
                var a = (new THREE.TextureLoader).load(e.data.grass);
                a.wrapS = a.wrapT = THREE.RepeatWrapping;
                var r = (new THREE.TextureLoader).load(e.data.rock);
                r.wrapS = r.wrapT = THREE.RepeatWrapping;
                var s = (new THREE.TextureLoader).load(e.data.snow);
                s.wrapS = s.wrapT = THREE.RepeatWrapping,
                this.customUniforms = {
                    bumpTexture: {
                        type: "t",
                        value: t
                    },
                    bumpScale: {
                        type: "f",
                        value: n
                    },
                    oceanTexture: {
                        type: "t",
                        value: i
                    },
                    sandyTexture: {
                        type: "t",
                        value: o
                    },
                    grassTexture: {
                        type: "t",
                        value: a
                    },
                    rockyTexture: {
                        type: "t",
                        value: r
                    },
                    snowyTexture: {
                        type: "t",
                        value: s
                    }
                };
                `\n\nuniform sampler2D bumpTexture;\nuniform float bumpScale;\nvarying float vAmount;\nvarying vec2 vUV;\nvoid main() \n{ \n\tvUV = uv;\n\tvec4 bumpData = texture2D( bumpTexture, uv );\n\t\n\tvAmount = bumpData.r; // assuming map is grayscale it doesn't matter if you use r, g, or b.\n\t\n\t// move the position along the normal\n    vec3 newPosition = position + normal * bumpScale * vAmount;\n\t\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );\n}\n\n\n\n`,
                `\n\nuniform sampler2D oceanTexture;\nuniform sampler2D sandyTexture;\nuniform sampler2D grassTexture;\nuniform sampler2D rockyTexture;\nuniform sampler2D snowyTexture;\nvarying vec2 vUV;\nvarying float vAmount;\nvoid main() \n{\n\tvec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D( oceanTexture, vUV * 10.0 );\n\tvec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D( sandyTexture, vUV * 10.0 );\n\tvec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUV * 20.0 );\n\tvec4 rocky = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUV * 20.0 );\n\tvec4 snowy = (smoothstep(0.50, 0.65, vAmount))                                   * texture2D( snowyTexture, vUV * 10.0 );\n\tgl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; //, 1.0);\n}  \n\n\n`;
                const l = new THREE.ShaderMaterial({
                    uniforms: this.customUniforms,
                    vertexShader: "\n\nuniform sampler2D bumpTexture;\nuniform float bumpScale;\nvarying float vAmount;\nvarying vec2 vUV;\nvoid main() \n{ \n\tvUV = uv;\n\tvec4 bumpData = texture2D( bumpTexture, uv );\n\t\n\tvAmount = bumpData.r; // assuming map is grayscale it doesn't matter if you use r, g, or b.\n\t\n\t// move the position along the normal\n    vec3 newPosition = position + normal * bumpScale * vAmount;\n\t\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );\n}\n\n\n\n",
                    fragmentShader: "\n\nuniform sampler2D oceanTexture;\nuniform sampler2D sandyTexture;\nuniform sampler2D grassTexture;\nuniform sampler2D rockyTexture;\nuniform sampler2D snowyTexture;\nvarying vec2 vUV;\nvarying float vAmount;\nvoid main() \n{\n\tvec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D( oceanTexture, vUV * 10.0 );\n\tvec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D( sandyTexture, vUV * 10.0 );\n\tvec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUV * 20.0 );\n\tvec4 rocky = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUV * 20.0 );\n\tvec4 snowy = (smoothstep(0.50, 0.65, vAmount))                                   * texture2D( snowyTexture, vUV * 10.0 );\n\tgl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; //, 1.0);\n}  \n\n\n"
                })
                  , c = AFRAME.scenes[0].object3D
                  , u = new THREE.PlaneGeometry(512,512,512,512);
                let v = new THREE.Mesh(u,l);
                if (v.rotation.x = -Math.PI / 2,
                v.position.y = 0,
                c.add(v),
                e.data.addwater) {
                    new THREE.PlaneGeometry(512,512,1,1);
                    let t = (new THREE.TextureLoader).load(e.data.water);
                    t.wrapS = t.wrapT = THREE.RepeatWrapping,
                    t.repeat.set(5, 5);
                    const n = new THREE.MeshBasicMaterial({
                        map: t,
                        transparent: !0,
                        opacity: .4
                    });
                    let i = new THREE.Mesh(u,n);
                    i.rotation.x = -Math.PI / 2,
                    i.position.y = this.data.waterlevel,
                    c.add(i)
                }
            }
        })
    }
    )(),
    (()=>{
        AFRAME.registerComponent("terrain-walk", {
            schema: {
                heightmap: {
                    default: "https://cdn.glitch.com/7d8a1e47-5d85-4a86-8736-7461b2a17688%2Fheightmap.png?v=1565387568467"
                },
                scale: {
                    default: 100 / 255
                }
            },
            dependencies: ["terrain"],
            init: function() {
                let e = this
                  , t = document.createElement("canvas");
                t.width = 512,
                t.height = 512;
                const n = t.getContext("2d");
                let i = new Image;
                i.crossOrigin = "Anonymous",
                i.onload = function() {
                    n.drawImage(i, 0, 0),
                    e.iData = n.getImageData(0, 0, 512, 512).data,
                    e.iData = e.iData.filter((e,t)=>t % 4 == 0)
                }
                ,
                i.src = this.data.heightmap,
                this.nextPos = new THREE.Vector3
            },
            tick: function(e, t) {
                if (CS1 && CS1.myPlayer && this.iData) {
                    const e = CS1.myPlayer.object3D.position.x
                      , t = CS1.myPlayer.object3D.position.z;
                    if (CS1.game.totalSteps % 6 == 0) {
                        const n = Number(512 * (256 + Math.round(t)) + (255 + Math.round(e)))
                          , i = this.iData[n] * this.data.scale + 2;
                        this.nextY = i,
                        CS1.myPlayer.object3D.position.lerp(new THREE.Vector3(e,i,t), .167)
                    } else
                        CS1.myPlayer.object3D.position.lerp(new THREE.Vector3(e,this.nextY,t), CS1.game.totalSteps % 6 * .167)
                }
            }
        })
    }
    )(),
    (()=>{
        AFRAME.registerComponent("wobble-normal", {
            schema: {},
            init: function() {
                this.el.setAttribute("rotation", "-90 0 0")
            },
            tick: function(e) {
                this.el.components.material.material.normalMap && (this.el.components.material.material.normalMap.offset.x += 1e-4 * Math.sin(e / 5e3),
                this.el.components.material.material.normalMap.offset.y += 1e-4 * Math.cos(e / 4e3),
                this.el.components.material.material.normalScale.x = .5 + .5 * Math.cos(e / 500),
                this.el.components.material.material.normalScale.x = .5 + .5 * Math.sin(e / 600))
            }
        });
        AFRAME.registerPrimitive("a-water", {
            defaultComponents: {
                geometry: {
                    primitive: "plane",
                    height: 1e3,
                    width: 1e3
                },
                rotation: "0 0 0",
                material: {
                    shader: "standard",
                    color: "#8ab39f",
                    metalness: 1,
                    roughness: .2,
                    normalMap: "url(https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg)",
                    normalTextureRepeat: "50 50",
                    normalTextureOffset: "0 0",
                    normalScale: "0.5 0.5",
                    opacity: .8
                },
                "wobble-normal": {}
            }
        })
    }
    )(),
    (()=>{
        AFRAME.registerComponent("splash", {
            schema: {
                waterlevel: {
                    default: 28
                },
                soundin: {
                    default: "https://cdn.glitch.com/7d8a1e47-5d85-4a86-8736-7461b2a17688%2Fsplash.mp3?v=1565827421579"
                },
                soundout: {
                    default: "https://cdn.glitch.com/7d8a1e47-5d85-4a86-8736-7461b2a17688%2Fsplash.mp3?v=1565827421579"
                }
            },
            init: function() {
                const e = document.querySelector("a-water");
                CS1.waterlevel = e ? e.object3D.position.y : this.data.waterlevel,
                CS1.splashIn = new Audio(this.data.soundin),
                CS1.splashIn.addEventListener("load", e=>{
                    CS1.splashIn.volume = .01
                }
                ),
                CS1.splashOut = new Audio(this.data.soundout),
                CS1.splashOut.addEventListener("load", e=>{
                    CS1.splashOUt.volume = .01
                }
                ),
                CS1.playerIsUnderWater = !1,
                CS1.env = document.querySelector("[environment]")
            },
            tick: (e,t)=>{
                if (!(CS1 && CS1.myPlayer && CS1.myPlayer.object3D && CS1.game.hasBegun))
                    return;
                const n = CS1.myPlayer.object3D.position.y;
                CS1.playerIsUnderWater && n > CS1.waterlevel ? (CS1.splashOut.play(),
                CS1.env && CS1.env.setAttribute("environment", "fog:0.25"),
                CS1.bgm && CS1.bgm.play(1)) : !CS1.playerIsUnderWater && n < CS1.waterlevel && (CS1.splashIn.play(),
                CS1.env && CS1.env.setAttribute("environment", "fog:0.9"),
                CS1.bgm && CS1.bgm.play(0));
                n < CS1.waterlevel ? CS1.playerIsUnderWater = !0 : CS1.playerIsUnderWater = !1
            }
        })
    }
    )(),
    (()=>{
        document.addEventListener("gameStart", e=>{}
        );
        AFRAME.registerComponent("my-component", {
            schema: {
                color: {
                    type: "color",
                    default: "#fff"
                }
            },
            init: function() {}
        })
    }
    )();
    let U = window.CS1 = {};
    e(U),
    _(U),
    C(U),
    E(U),
    P(U),
    z(U),
    function(e) {
        let t = M.bgm.songs
          , n = document.createElement("audio")
          , i = "https://api.soundcloud.com/tracks/"
          , o = "/stream?client_id=b9d11449cd4c64d461b8b5c30650cd06";
        n.src = i + t[0] + o,
        n.crossorigin = "anonymous",
        n.autoplay = "autoplay",
        n.loop = !0,
        n.volume = 0;
        let a = document.createElement("button");
        a.innerHTML = "PLAY NEXT SONG",
        a.zIndex = 100,
        a.style.display = "none",
        a.addEventListener("click", t=>{
            e.bgm.playNextSong()
        }
        );
        let r = document.createElement("div");
        r.style.margin = "0 auto",
        r.style.width = "800px",
        setTimeout(()=>{
            document.body.appendChild(r);
            r.appendChild(a)
        }
        , 5e3),
        n.addEventListener("ended", t=>{
            console.log("bgm song ended");
            e.bgm.playNextSong()
        }
        );
        let s = 0;
        e.bgm = {
            tracks: t,
            play: (e=!1)=>{
                (e || 0 === e) && (console.log(`Playing track index: ${e}.`),
                n.src = i + t[e] + o,
                n.crossorigin = "anonymous",
                n.load(),
                n.loop = !0);
                n.volume = M.bgm.volume;
                n.play()
            }
            ,
            pause: ()=>{
                n.pause()
            }
            ,
            playNext: ()=>{
                s++;
                s == t.length && (s = 0);
                n.src = i + t[s] + o;
                n.crossorigin = "anonymous";
                n.load();
                n.loop = !0;
                n.play()
            }
        },
        document.addEventListener("gameStart", t=>{
            e.bgm.play()
        }
        )
    }(U),
    R(U),
    A(U),
    F(U),
    D(U),
    I(U),
    N(U),
    V(U),
    window.console.warn = function() {}
}();
//# sourceMappingURL=bundle.js.map
