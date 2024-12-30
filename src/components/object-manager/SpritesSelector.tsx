import { Target } from "scratch-vm";
import { createEffect, For } from "solid-js";
import CostumeSelector from '../costume-selector'

export function SpritesSelector(props: {
  targets: Target[]
  selected: string
  onSelected: (id: string) => void
}) {
  return <div>
    <For each={props.targets}>{target => (
      <CostumeSelector selected={props.selected === target.id} onClick={() => props.onSelected(target.id)} name={target.getName()} image={target.getCurrentCostume().asset.encodeDataURI()} />
    )}</For>
  </div>
}
