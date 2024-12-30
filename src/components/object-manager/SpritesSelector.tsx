import { Target } from "scratch-vm";
import { For } from "solid-js";
import CostumeSelector from "../costume-selector";

export function SpritesSelector(props: {
  targets: Target[]
}) {
  return <div>
    <For each={props.targets}>{target => (
      <CostumeSelector name={target.getName()} image={target.getCurrentCostume().asset} />
    )}</For>
  </div>
}
