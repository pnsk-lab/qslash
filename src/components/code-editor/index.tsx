import Blockly from '@evex/scratch-blocks'
import { onMount } from 'solid-js'
import { QslashStore } from '../../store'

export function CodeEditor (props: {
  store: QslashStore
}) {
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
  return <div class="h-full">
    <div class="h-full" ref={blocklyContainer} />
  </div>
}