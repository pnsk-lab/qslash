import { createEffect, createSignal, Match, Switch } from 'solid-js'
import { CodeEditor } from '../code-editor'
import { QslashStore } from '../../store'

function EditModeButton (props: {
  icon: string
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return <button onClick={props.onSelect} aria-selected={props.selected} class="transition-colors p-1 block rounded-lg border-r border-t border-l flex items-center gap-1" classList={{
    'border-blue-400': props.selected
  }}>
    <div class={"w-8 h-8 " + props.icon} />
    <div class="text-lg">{props.label}</div>
  </button>
}
type Mode = 'code' | 'costumes' | 'sounds'
function ModeSwitcher(props: {
  onChange: (mode: Mode) => void
}) {
  const [getSelected, setSelected] = createSignal<Mode>('code')

  createEffect(() => props.onChange(getSelected()))

  return <div class="flex">
    <EditModeButton icon="i-tabler:code" label="Code" selected={getSelected() === 'code'} onSelect={() => setSelected('code')} />
    <EditModeButton icon="i-tabler:palette" label="Costumes" selected={getSelected() === 'costumes'} onSelect={() => setSelected('costumes')} />
    <EditModeButton icon="i-tabler:device-speaker" label="Sounds" selected={getSelected() === 'sounds'} onSelect={() => setSelected('sounds')} />
  </div>
}

export function EditPanel (props: {
  store: QslashStore
}) {
  const [getEditMode, setEditMode] = createSignal<Mode>('code')

  return <div class="p-1 flex flex-col h-full">
    <ModeSwitcher onChange={setEditMode} />
    <div class="grow border rounded-md">
      <Switch fallback={'Not implemented yet.'}>
        <Match when={getEditMode() === 'code'}><CodeEditor store={props.store} /></Match>
      </Switch>
    </div>
  </div>
}