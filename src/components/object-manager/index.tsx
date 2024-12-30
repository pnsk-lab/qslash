import { createEffect, createSignal, onCleanup, onMount } from "solid-js"
import { QslashStore } from "../../store"
import { Target } from "scratch-vm"
import { SpritesSelector } from "./SpritesSelector"

export function ObjectManager(props: {
  store: QslashStore
}) {
  return <div>
    <SpritesSelector targets={props.store.targets.filter(target => target.isSprite())} />
  </div>
}
