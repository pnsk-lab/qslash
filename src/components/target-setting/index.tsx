import type { RenderedTarget } from 'scratch-vm'
import { QslashStore } from '../../store'
import { createEffect, createMemo, createSignal, Show } from 'solid-js'

export function TargetSetting (props: {
  store: QslashStore
}) {
  const [getVisible, setVisible] = createSignal(false)
  const [getName, setName] = createSignal('')
  const getEditingTarget = createMemo(() => {
    const target = props.store.targets.find(target => target.id === props.store.editingTarget)
    if (target?.isStage) {
      return null
    }
    setVisible(target?.visible ?? true)
    setName(target?.getName() ?? '')
    return target ?? null
  })

  const [getTargetInfo, setTargetInfo] = createSignal<{
    x: number
    y: number
  }>()

  const targetMoved = (target: RenderedTarget, x: number, y: number) => {
    const info = getTargetInfo()
    if (info && (info.x !== x || info.y !== y)) {
      setTargetInfo({
        x,
        y
      })
    }
  }
  
  let lastTarget: RenderedTarget | null = getEditingTarget()
  createEffect(() => {
    if (lastTarget) {
      lastTarget.off('TARGET_MOVED', targetMoved)
    }
    const target = getEditingTarget()
    target?.on('TARGET_MOVED', targetMoved)

    setTargetInfo(target ? {
      x: target.x,
      y: target.y
    } : undefined)
    lastTarget = target
  })

  return <Show when={getEditingTarget()}>{editingTarget => (
    <div class="border rounded-md p-1 flex flex-col gap-1">
      <div class="flex justify-between">
        <div>
          <input
            class="w-30 border p-1 rounded-full"
            value={getName()}
            placeholder="Name"
            onChange={(e) => {
              if (e.target.value.trim() === '') {
                return e.target.value = getName()
              }
              props.store.editingTarget && props.store.vm.renameSprite(props.store.editingTarget, e.target.value)
            }} />
        </div>
        <div>
          <label class="flex items-center gap-1">
            <div class="font-bold">X</div>
            <input onChange={(ev) => {
              let parsed = Number.parseInt(ev.target.value)
              if (Number.isNaN(parsed)) {
                ev.target.value = '0'
                parsed = 0
              }
              getEditingTarget()?.setXY(parsed, getTargetInfo()?.y ?? 0)
            }} type="number" class="w-10 border p-1 rounded-full" value={getTargetInfo()?.x} placeholder="x" />
          </label>
        </div>
        <div>
        <label class="flex items-center gap-1">
          <div class="font-bold">Y</div>
            <input onChange={(ev) => {
              let parsed = Number.parseInt(ev.target.value)
              if (Number.isNaN(parsed)) {
                ev.target.value = '0'
                parsed = 0
              }
              getEditingTarget()?.setXY(getTargetInfo()?.x ?? 0, parsed)
            }} type="number" class="w-10 border p-1 rounded-full" value={getTargetInfo()?.y} placeholder="y" />
          </label>
        </div>
      </div>
      <div class="flex justify-around">
        <button onClick={() => {
          getEditingTarget()?.setVisible(!getVisible())
        }} class="border rounded-md" role="checkbox" aria-selected={getVisible()} aria-label='Is target visible?'>
          <div classList={{
            'i-tabler:eye': getVisible(),
            'i-tabler:eye-off': !getVisible()
          }} class="w-8 h-8" />
        </button>
      </div>
    </div>
  )}</Show>
}
