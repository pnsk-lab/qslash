import Render from 'scratch-render'
import { onMount } from 'solid-js'
import { QslashStore } from '../../store'
import defaultProject from '../../lib/default-project.json'

export function Player(props: {
  store: QslashStore
}) {
  let canvas!: HTMLCanvasElement

  const postMouse = (evt: PointerEvent, isDown?: boolean) => {
    const { width, height, top, left } = canvas.getBoundingClientRect()
    props.store.vm.postIOData('mouse', {
      canvasWidth: width,
      canvasHeight: height,
      x: evt.clientX - left,
      y: evt.clientY - top,
      isDown
    })
  }

  onMount(async () => {
    const renderer = new Render(canvas)
    props.store.vm.attachRenderer(renderer)
    await props.store.vm.loadProject(defaultProject)
    props.store.vm.start()
  })

  return <div class="w-full max-h-full grid place-items-center p-2">
    <div>
      <div class="grid grid-cols-2">
        <button class="i-tabler:flag w-8 h-8" onClick={() => {
          props.store.vm.greenFlag()
        }} />
        <button class="i-tabler:player-stop w-8 h-8" onClick={() => {
          props.store.vm.stopAll()
        }} />
      </div>
      <canvas
        class="h-36 border rounded-sm"
        ref={canvas}
        onPointerDown={ev => postMouse(ev, true)}
        onPointerMove={ev => postMouse(ev)}
        onPointerUp={ev => postMouse(ev, false)}
      />
    </div>
  </div>
}
