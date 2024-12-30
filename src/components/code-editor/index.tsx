import Blockly from '@evex/scratch-blocks'
import { createEffect, onCleanup, onMount } from 'solid-js'
import { QslashStore } from '../../store'

export function CodeEditor (props: {
  store: QslashStore
}) {
  const onWorkSpaceUpdate = ({ xml }: { xml: string }) => {
    
  }
  onMount(() => {
    props.store.vm.on('workspaceUpdate', onWorkSpaceUpdate)
  })
  onCleanup(() => {
    props.store.vm.off('workspaceUpdate', onWorkSpaceUpdate)
  })

  let blocklyContainer!: HTMLDivElement
  onMount(() => {
    // @ts-ignore Type wrong
    const workspace = Blockly.inject(blocklyContainer, {
      zoom: {
        controls: true,
        startScale: 0.675
      },
      scrollbar: true,
      toolboxOptions: {
        color: true,
        inverted: true
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      comments: true,
      collapse: false,
      sounds: false
    })
    props.store.workspace = workspace
  })
  createEffect(() => {
    const editingTarget = props.store.editingTarget
    if (!editingTarget) {
      return
    }
    //console.log(props.store.workspace, Blockly.serialization)
   // console.log(props.store.vm.runtime.getTargetById(editingTarget))
  })
  return <div class="h-full">
    <div class="h-full" ref={blocklyContainer} />
  </div>
}