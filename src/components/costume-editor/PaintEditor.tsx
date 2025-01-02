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
    scope.setup(canvas)
    scope.view.viewSize = new paper.Size(480, 360)

    let selectedObject: paper.Item | null = null
    let selectedHandle: {
      segment: paper.Segment
      selected: 'handle-in' | 'handle-out' | 'segment'
    } | null = null
    scope.settings.handleSize = 7
    scope.view.onMouseDown = (evt: paper.MouseEvent) => {
      const handleHits = scope.project.hitTestAll(evt.point, {
        handles: true,
        segments: true,
        tolerance: 5,
      })
      for (const hit of handleHits) {
        if ((hit.type === 'handle-in' || hit.type === 'handle-out') && hit.segment.selected) {
          selectedHandle = {
            segment: hit.segment,
            selected: hit.type,
          }
        }
        if (hit.type === 'segment' && hit.item.selected) {
          selectedHandle && (selectedHandle.segment.selected = false)
          hit.segment.selected = true
          selectedHandle = {
            segment: hit.segment,
            selected: hit.type,
          }
          return
        }
      }

      const objectHit = scope.project.hitTest(evt.point, {
        stroke: true,
        fill: true,
      })
      if (!objectHit) {
        return
      }
      switch (objectHit.type) {
        case 'stroke':
        case 'fill':
          if (selectedObject) {
            selectedObject.selected = false
            selectedObject = null
          }
          selectedObject = objectHit.item
          selectedObject.selected = true
          break
      }
    }
    scope.view.onMouseDrag = (evt: paper.MouseEvent) => {
      if (selectedHandle) {
        if (selectedHandle.selected === 'handle-in') {
          selectedHandle.segment.handleIn = selectedHandle.segment.handleIn.add(evt.delta)
        } else if (selectedHandle.selected === 'handle-out') {
          selectedHandle.segment.handleOut = selectedHandle.segment.handleOut.add(evt.delta)
        } else if (selectedHandle.selected === 'segment') {
          selectedHandle.segment.point = evt.point
        }
      }
    }
    scope.view.onMouseUp = (evt: paper.MouseEvent) => {
    }
  })
  createEffect(() => {
    scope.project.clear()
    const item = scope.project.importSVG(props.costume.asset.decodeText())
    scope.view.center = new paper.Point(10, 0)
    //item.selected = true
    scope.view.zoom = 2
    //scope.view.translate(new paper.Point(100, 0))
  })
  return <div>
    <canvas ref={canvas} />
  </div>
}