import Render from 'scratch-render'
import { onMount } from 'solid-js'
import { QslashStore } from '../../store'

export function Player(props: {
  store: QslashStore
}) {
  let canvas!: HTMLCanvasElement
  onMount(async () => {
    const renderer = new Render(canvas)
    props.store.vm.attachRenderer(renderer)
    await props.store.vm.loadProject({
      "targets": [
        {
          "isStage": true,
          "name": "Stage",
          "variables": {},
          "lists": {},
          "broadcasts": {},
          "blocks": {},
          "comments": {},
          "currentCostume": 0,
          "costumes": [
            {
              "name": "背景1",
              "dataFormat": "svg",
              "assetId": "cd21514d0531fdffb22204e0ec5ed84a",
              "md5ext": "cd21514d0531fdffb22204e0ec5ed84a.svg",
              "rotationCenterX": 240,
              "rotationCenterY": 180
            }
          ],
          "sounds": [],
          "volume": 100,
          "layerOrder": 0,
          "tempo": 60,
          "videoTransparency": 50,
          "videoState": "on",
          "textToSpeechLanguage": null
        },
        {
          "isStage": false,
          "name": "スプライト1",
          "variables": {},
          "lists": {},
          "broadcasts": {},
          "blocks": {},
          "comments": {},
          "currentCostume": 0,
          "costumes": [
            {
              "name": "コスチューム1",
              "bitmapResolution": 1,
              "dataFormat": "svg",
              "assetId": "bcf454acf82e4504149f7ffe07081dbc",
              "md5ext": "bcf454acf82e4504149f7ffe07081dbc.svg",
              "rotationCenterX": 48,
              "rotationCenterY": 50
            },
            {
              "name": "コスチューム2",
              "bitmapResolution": 1,
              "dataFormat": "svg",
              "assetId": "0fb9be3e8397c983338cb71dc84d0b25",
              "md5ext": "0fb9be3e8397c983338cb71dc84d0b25.svg",
              "rotationCenterX": 46,
              "rotationCenterY": 53
            }
          ],
          "sounds": [
            {
              "name": "ニャー",
              "assetId": "83c36d806dc92327b9e7049a565c6bff",
              "dataFormat": "wav",
              "format": "",
              "rate": 48000,
              "sampleCount": 40681,
              "md5ext": "83c36d806dc92327b9e7049a565c6bff.wav"
            }
          ],
          "volume": 100,
          "layerOrder": 1,
          "visible": true,
          "x": 0,
          "y": 0,
          "size": 100,
          "direction": 90,
          "draggable": false,
          "rotationStyle": "all around"
        }
      ],
      "monitors": [],
      "extensions": [],
      "meta": {
        "semver": "3.0.0",
	     	"vm": "5.0.0",
	    	"agent": "aa"
      }
    })
    props.store.vm.start()
  })
  return <div class="w-full max-h-full grid place-items-center p-2">
    <canvas class="h-36 border rounded-sm" ref={canvas} />
  </div>
}