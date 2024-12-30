import { Target } from "scratch-vm";
import { createEffect, createSignal, For } from "solid-js";
import CostumeSelector from '../costume-selector'

export function SpritesSelector(props: {
  targets: Target[]
  selected: string
  onSelected: (id: string) => void
}) {
  interface Sprite {
    name: string
    image: string
    id: string
  }
  let lastSpritesJSON = '[]'
  let lastChanged = 0
  const [getSprites, setSprites] = createSignal<Sprite[]>([])

  createEffect(() => {
    const sprites = props.targets.map((t): Sprite => ({
      name: t.getName(),
      id: t.id,
      image: t.getCurrentCostume().asset.encodeDataURI()
    }))
    const json = JSON.stringify(sprites)
    const crr = Date.now()
    if (json === lastSpritesJSON || crr - lastChanged < 500) {
      return
    }
    lastChanged = crr
    setSprites(sprites)
    lastSpritesJSON = json
  })

  return <div class="grid grid-cols-3">
    <For each={getSprites()}>{target => (
      <CostumeSelector
        selected={props.selected === target.id}
        onClick={() => props.onSelected(target.id)}
        name={target.name}
        image={target.image} />
    )}</For>
  </div>
}
