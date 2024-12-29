/// <reference types="@turbowarp/types" />
import VirtualMachine from 'scratch-vm'
import { createEffect, createSignal } from 'solid-js'
import { Storage } from '../lib/storage'

export class QslashStore {
  #workspace = createSignal<any>()
  readonly vm: VirtualMachine
  readonly storage: ScratchStorage = new Storage() as unknown as ScratchStorage
  constructor() {
    const vm = new VirtualMachine()
    this.vm = vm
    this.vm.attachStorage(this.storage)

    createEffect(() => {
      // @ts-ignore
      this.workspace?.addChangeListener?.(vm.blockListener)
    })
  }
  get workspace() {
    return this.#workspace[0]()!
  }
  set workspace(v: any) {
    this.#workspace[1](() => v)
  }
}