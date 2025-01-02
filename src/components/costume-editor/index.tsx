import { createMemo, onMount, For, createSignal, createEffect } from "solid-js"
import { QslashStore } from "../../store"
import { PaintEditor } from "./PaintEditor"
import CostumeSelector from "../costume-selector"

export function CostumeEditor (props: {
  store: QslashStore
}) {
  let paintContainer!: HTMLDivElement
  const getCostumes = createMemo(() => props.store.targets.find(({id}) => id === props.store.editingTarget)?.getCostumes())
  const [getSelectedCostumeId, setSelectedCostumeId] = createSignal('')

  let lastTargetId = ''
  createEffect(() => {
    const targetId = props.store.editingTarget
    if (targetId !== lastTargetId) {
      setSelectedCostumeId(getCostumes()?.[0].name ?? '')
    }
    targetId && (lastTargetId = targetId)
  })
  const getSelectedCostume = createMemo(() => getCostumes()?.find(costume => getSelectedCostumeId() === costume.name))

  return <div class="flex">
    <div class="w-30 overflow-y-auto">
      <For each={getCostumes() ?? []}>{costume => (
        <div>
          <CostumeSelector
            name={costume.name}
            image={costume.asset.encodeDataURI()}
            selected={costume.name === getSelectedCostumeId()}
            onClick={() => setSelectedCostumeId(costume.name)} />
        </div>
      )}</For>
    </div>
    <div class="grow">
      <PaintEditor costume={getSelectedCostume()!} />
    </div>
  </div>
}
