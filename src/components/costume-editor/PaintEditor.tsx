import paper from 'paper'
import type { Costume } from 'scratch-vm'
import { createEffect, createSignal, onMount, createMemo } from 'solid-js'
import { EditMode, EditModeSelector } from './EditModeSelector'
import { EDIT_PROCESSES } from './edit-process'

export function PaintEditor (props: {
  costume: Costume
}) {
  const [getEditMode, setEditMode] = createSignal<EditMode>('select')
  let canvas!: HTMLCanvasElement
  let scope!: paper.PaperScope

  onMount(() => {
    scope = new paper.PaperScope()
    scope.setup(canvas)
    scope.view.viewSize = new paper.Size(480, 360)

    const editProcesses = Object.fromEntries(Object.entries(EDIT_PROCESSES).map(([mode, process]) => [
      mode,
      process(scope),
    ]))
    scope.view.onMouseDown = (evt: paper.MouseEvent) => {
      editProcesses[getEditMode()]?.onMouseDown?.(evt)
    }
    scope.view.onMouseDrag = (evt: paper.MouseEvent) => {
      editProcesses[getEditMode()]?.onMouseDrag?.(evt)
    }
    scope.view.onMouseUp = (evt: paper.MouseEvent) => {
      editProcesses[getEditMode()]?.onMouseUp?.(evt)
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
  return <div class="flex">
    <div>
      <EditModeSelector onSelect={setEditMode} />
    </div>
    <div>
      <canvas ref={canvas} />
    </div>
  </div>
}