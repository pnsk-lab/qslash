import paper from 'paper'
import type { Costume } from 'scratch-vm'
import { createEffect, onMount, ParentProps } from 'solid-js'

export function PaintEditor (props: {
  costume: Costume
}) {
  let canvas!: HTMLCanvasElement

  let scope!: paper.PaperScope
  onMount(() => {
    scope = new paper.PaperScope()
    canvas.width = 480
    canvas.height = 360
    scope.setup(canvas)
    scope.view.viewSize = new paper.Size(480, 360)

    scope.view.onMouseDown = (evt: paper.MouseEvent) => {
      const hits = scope.project.hitTestAll(evt.point, {
        handles: true,
        fill: true,
        stroke: true,
        segments: true,
        tolerance: 30
      })
      console.log(hits)
      //hit.item.selected = true
    }
  })
  createEffect(() => {
    scope.project.clear()
    const item = scope.project.importSVG(props.costume.asset.decodeText())
    scope.view.center = new paper.Point(10, 0)
    item.selected = true
    //scope.view.translate(new paper.Point(100, 0))
  })
  return <div>
    <canvas ref={canvas} />
  </div>
}