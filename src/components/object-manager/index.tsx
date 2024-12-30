import { QslashStore } from "../../store"
import { SpritesSelector } from "./SpritesSelector"

export function ObjectManager(props: {
  store: QslashStore
}) {
  return <div class="flex w-full h-full">
    <div class='grow'>
      <SpritesSelector
        targets={props.store.targets.filter(target => target.isSprite())}
        selected={props.store.editingTarget ?? ''}
        onSelected={(id) => {
          props.store.editingTarget = id
        }}
      />
    </div>
    <div class="border rounded-md p-1" role='button' onClick={() => {
      props.store.editingTarget = props.store.vm.runtime.getTargetForStage()?.id ?? ''
    }} classList={{
      'border-blue-500': props.store.vm.runtime.getTargetById(props.store.editingTarget ?? '')?.isStage
    }}>
      Stage
    </div>
  </div>
}
