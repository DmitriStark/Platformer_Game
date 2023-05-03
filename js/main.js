const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}
const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}
const collisionBlocks = []

floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            collisionBlocks.push(new CollisionBlock({
                position:
                {
                    x: x * 16,
                    y: y * 16
                }
            }))

        }
    })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}
const platformCollisionBlocks = []

platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            platformCollisionBlocks.push(new CollisionBlock({
                position:
                {
                    x: x * 16,
                    y: y * 16
                }, height: 4
            }))

        }
    })
})

console.log(platformCollisions2D)
const gravity = 0.1




const player = new Player({
    position: {
        x: 100,
        y: 300
    },
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc: "./img/warrior/idle.png",
    frameRate: 8,



    animations: {
        idle: {
            imageSrc: "./img/warrior/idle.png",
            frameRate: 8,
            frameBuffer: 3

        },
        idleleft: {
            imageSrc: "./img/warrior/idleLeft.png",
            frameRate: 8,
            frameBuffer: 3

        },
        run: {
            imageSrc: "./img/warrior/Run.png",
            frameRate: 8,
            frameBuffer: 5

        },
        jump: {
            imageSrc: "./img/warrior/jump.png",
            frameRate: 2,
            frameBuffer: 3

        },
        jumpleft: {
            imageSrc: "./img/warrior/jumpLeft.png",
            frameRate: 2,
            frameBuffer: 3

        },
        fall: {
            imageSrc: "./img/warrior/Fall.png",
            frameRate: 2,
            frameBuffer: 3

        },
        fallleft: {
            imageSrc: "./img/warrior/FallLeft.png",
            frameRate: 2,
            frameBuffer: 3

        },
        runleft: {
            imageSrc: "./img/warrior/RunLeft.png",
            frameRate: 8,
            frameBuffer: 5

        }
    }
})
// const player2 = new Player({
//     x: 300,
//     y: 100
// })

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/background.png"

})
const backgroundImageHeight = 432
const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height
    },
}

function animate() {
    window.requestAnimationFrame(animate)

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.scale(4, 4)
    ctx.translate(camera.position.x, camera.position.y)
    background.update()
    // collisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.update()
    // })
    // platformCollisionBlocks.forEach((block) => {
    //     block.update()
    // })
    player.chackForHorizontalCanvascollision()
    player.update()
    // player2.update()

    player.velocity.x = 0
    if (keys.d.pressed) {
        console.log(keys.pressed)
        player.switchSprite("run")
        player.velocity.x = 2
        player.lastDirection = "rigth"
        player.shouldPanCameraToTheLeft({ canvas, camera })

    } else if (keys.a.pressed) {
        player.switchSprite("runleft")
        player.velocity.x = -2
        player.lastDirection = "left"
        player.shouldPanCameraToTheRigth({ canvas, camera })

    } else if (player.velocity.x === 0) {
        if (player.lastDirection === "rigth") {
            player.switchSprite("idle")
        }
        else {
            player.switchSprite("idleleft")
        }
    }
    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({ canvas, camera })

        if (player.lastDirection === "rigth") {
            player.switchSprite("jump")
        }
        else {
            player.switchSprite("jumpleft")
        }
    }
    else if (player.velocity.y > 0) {
        player.shouldPanCameraUp({ canvas, camera })
        if (player.lastDirection === "rigth") {
            player.switchSprite("fall")
        }
        else {
            player.switchSprite("fallleft")

        }
    }
    ctx.restore()






}
animate()

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true

            break
        case "a":
            keys.a.pressed = true

            break
        case "w":
            player.velocity.y = -4
            break
    }
})

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false

            break
        case "a":
            keys.a.pressed = false

            break

    }
})