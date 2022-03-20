<template>
  <canvas class="canvas" ref="playground"></canvas>
</template>

<style scoped>
  .canvas {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
  }
</style>

<script>
  export default {
    props: {
      theme: {
        type: Object,
        required: true
      }
    },
    mounted() {
      const canvas = this.$refs.playground
      const ctx = canvas.getContext('2d')

      let config = {
        maxParticles: 2,
        maxRadius: 10,
        maxDistance: 100,
        speed: 60
      }
      let particles = []

      const animate = () => {
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const newArray = []
        for (let i = 0; i < particles.length; i++) {
          if (!particles[i].done) {
            particles[i].update()
            newArray.push(particles[i])
          }
        }

        particles = newArray
      }

      const drawParticles = e => {
        let nParticles = Math.round(
          Math.random() * config.maxParticles) + 1
        for (let i = 0; i < nParticles; i++) {
          const p = new Particle(e.clientX, e.clientY)
          particles.push(p)
        }
      }

      const randomColor = () => {
        // random 0 or 1, main color or sub color
        // random alpha 0 to 1
        const randomColor = Math.round(Math.random())
        const randomAlpha = Math.random()
        let theme = this.theme.mainColor

        if (randomColor == 1) theme = this.theme.subColor
        return `hsla(${theme.h}, ${theme.s}%, ${theme.l}%, ${randomAlpha})`
      }

      // return positive/negative distance from n
      const randomPosition = n => {
        const pos = Math.round(Math.random() * config.maxDistance)
        const control = Math.round(Math.random()) * 2 - 1 // -1 or 1
        return control > 0 ? n + pos : n - pos
      }

      const requestAnimationFrame = (() => {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60)
          }
      })()

      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      const touchMove = e => drawParticles(e.changedTouches[0])

      class Particle {
        constructor(x, y) {
          /*
          * p*   particle properties
          * c*   current properties, will be iterated on
          * inc* increments/decrements
          */
          this.x = x
          this.y = y
          this.pX = randomPosition(x)
          this.pY = randomPosition(y)
          this.pRadius = Math.round(Math.random() * config.maxRadius) + 1
          this.pColor = randomColor()
          this.cX = x
          this.cY = y
          this.cRadius = this.pRadius
          this.incX = Math.abs(x - this.pX) / config.speed
          this.incY = Math.abs(y - this.pY) / config.speed
          this.incRadius = this.pRadius / config.speed
          this.done = false

          if (x > this.pX) this.incX *= -1
          if (y > this.pY) this.incY *= -1
        }

        draw() {
          ctx.beginPath()
          ctx.arc(this.cX, this.cY, this.cRadius, 0, Math.PI * 2)
          ctx.fillStyle = this.pColor
          ctx.fill()
          ctx.closePath()
        }

        update() {
          this.cX += this.incX
          this.cY += this.incY
          this.cRadius = this.cRadius > this.incRadius ? this.cRadius - this.incRadius : 0
          this.draw()

          if (this.cX >= Math.max(this.x, this.pX) ||
            this.cY >= Math.max(this.y, this.pY) ||
            this.cRadius <= 0) {
            this.done = true
          }
        }
      }

      animate()
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas, false)
      canvas.addEventListener('mousemove', drawParticles)
      canvas.addEventListener('click', drawParticles)
      canvas.addEventListener('touchstart',
        () => canvas.addEventListener('touchmove', touchMove))
      canvas.addEventListener('touchend',
        () =>  canvas.removeEventListener('touchmove', touchMove))
    }
  }
</script>
