import paper from 'paper'
import { onMount } from 'solid-js'

export function PaintEditor () {
  let canvas!: HTMLCanvasElement
  onMount(() => {
    const scope = new paper.PaperScope()
    scope.setup(canvas)
    const circle = new scope.Path.Circle({
      center: scope.view.center,
      radius: 50,
      fillColor: 'red'
    })
    circle.selected = true
  })
  return <div>
    <canvas ref={canvas} />
  </div>
}