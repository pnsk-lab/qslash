import { createEffect, createSignal } from "solid-js"

export type EditMode = 'select' | 'segment'

const MODE_ICON_CLASSES: Record<EditMode, string> = {
  select: 'i-tabler:pointer',
  segment: 'i-tabler:route-square',
}
function EditModeButton(props: { mode: EditMode, selected: EditMode, onSelect: (mode: EditMode) => void }) {
  return <div classList={{
    'bg-yellow-500': props.mode === props.selected,
  }} class="transition-colors rounded-md w-8 h-8 p-1 grid place-items-center">
    <button
      class={`w-full h-full ${MODE_ICON_CLASSES[props.mode]} transition-colors`}
      classList={{
        'bg-white': props.mode === props.selected,
      }}
      onClick={() => props.onSelect(props.mode)} />
  </div>
}
export function EditModeSelector(props: {
  onSelect: (mode: EditMode) => void
}) {
  const [getMode, setMode] = createSignal<EditMode>('select')
  createEffect(() => {
    props.onSelect(getMode())
  })
  return <div class="grid grid-cols-2 gap-2">
    <EditModeButton mode="select" selected={getMode()} onSelect={setMode} />
    <EditModeButton mode="segment" selected={getMode()} onSelect={setMode} />
  </div>
}
