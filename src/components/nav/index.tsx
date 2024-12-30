import { unzipSync } from "fflate"
import { downloadBlob, uploadBlob } from "../../lib/file"
import type { QslashStore } from "../../store"

const decoder = new TextDecoder()

export function Nav(props: {
  store: QslashStore
}) {
  const save = async () => {
    downloadBlob(await props.store.vm.saveProjectSb3(), 'project.sb3')
  }
  const load = async () => {
    const [file] = await uploadBlob()
    if (!file) {
      return
    }
    const tree = unzipSync(new Uint8Array(await file.arrayBuffer()))
    const projectJSON = JSON.parse(decoder.decode(tree['project.json']))
    //await props.store.vm.deserializeProject(projectJSON, )
    await props.store.loadProject(projectJSON)
  }
  return <div class="flex justify-between items-center p-2 border-b">
    <div class="font-bold text-xl">Q/</div>
    <div class="flex gap-1 items-center">
      <div>
        <button class="i-tabler:download w-6 h-6" onClick={save}></button>
      </div>
      <div>
        <button class="i-tabler:upload w-6 h-6" onClick={load}></button>
      </div>
    </div>
  </div>
}
