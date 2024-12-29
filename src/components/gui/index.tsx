import { QslashStore } from '../../store'
import { EditPanel } from '../editpanel'
import { Nav } from '../nav'
import { ObjectManager } from '../object-manager'
import { Player } from '../player'

export function GUI (props: {
  store: QslashStore
}) {
  return <div class="flex flex-col h-dvh">
    <div>
      <Nav />
    </div>
    <div class="grow grid grid-cols-3">
      <div class="col-span-2 h-full">
        <EditPanel store={props.store} />
      </div>
      <div class="flex flex-col h-full">
        <div class="max-h-1/2">
          <Player store={props.store} />
        </div>
        <div class="max-h-1/2">
          <ObjectManager />
        </div>
      </div>
    </div>
  </div>
}