import Particles from "react-particles";
import { loadFull } from "tsparticles";
// import "./styles.css";

const Fire = () => {
    const particleInit = async (engine) => {
        await loadFull(engine);
    };

    const particleConfig = {
        fullScreen: {
            enable: true
        },
        detectRetina: true,
        // background: {
        //     color: "#000"
        // },
        fpsLimit: 60,
        emitters: {
            // direction: ["left", 'right'],
            life: {
                count: 0,
                duration: 0.1,
                delay: 0.1
            },
            rate: {
                delay: 0.01,
                quantity: 1
            },
            size: {
                width: 100,
                height: 0
            },
            position: {
                y: 100,
                x: 50
            }
        },
        particles: {
            number: {
                value: 0
            },
            life: {
                count: 1
            },
            shape: {
                type: "line"
            },
            size: {
                value: { min: 1, max: 100 },
                animation: {
                    enable: true,
                    sync: true,
                    speed: 150,
                    destroy: "min"
                }
            },
            stroke: {
                color: {
                    // value: "#303030"
                },
                width: 3
            },
            rotate: {
                path: true
            },
            move: {
                enable: true,
                speed: { min: 10, max: 20 },
                outModes: {
                    default: "destroy",
                    top: "none"
                },
                // trail: {
                //     fillColor: "#000",
                //     enable: true,
                //     length: 10
                // }
            },
            destroy: {
                mode: "split",
                split: {
                    count: 1,
                    factor: { value: 1 / 3 },
                    rate: {
                        value: 100
                    },
                    particles: {
                        color: {
                            value: ["#FF0000", "#FFD700", "#00FF00", "#00BFFF", "#FF1493"]
                        },
                        stroke: {
                            width: 0
                        },
                        number: {
                            value: 0
                        },
                        collisions: {
                            enable: false
                        },
                        opacity: {
                            value: 1,
                            // animation: {
                            //     enable: false,
                            //     speed: 0.6,
                            //     minimumValue: 0.1,
                            //     sync: false,
                            //     startValue: "max",
                            //     destroy: "min"
                            // }
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            value: { min: 2, max: 3 },
                            animation: {
                                enable: false
                            }
                        },
                        life: {
                            count: 1,
                            duration: {
                                value: {
                                    min: 1,
                                    max: 2
                                }
                            }
                        },
                        move: {
                            enable: true,
                            gravity: {
                                enable: false
                            },
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                            outMode: "destroy"
                        }
                    }
                }
            }
        }
    };
    return (
        // <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
            <Particles options={particleConfig} init={particleInit} />
        // </div>
    )
}

export default Fire

