/// <reference types="@turbowarp/types" />
import VirtualMachine, { type Target } from 'scratch-vm'
import { createEffect, createSignal } from 'solid-js'
import { Storage } from '../lib/storage'

export class QslashStore {
  #workspace = createSignal<any>()
  #editingTarget = createSignal<string | undefined>()
  #targets = createSignal<Target[]>([])
  readonly vm: VirtualMachine
  readonly storage: ScratchStorage = new Storage() as unknown as ScratchStorage
  constructor() {
    const vm = new VirtualMachine()
    this.vm = vm
    this.vm.attachStorage(this.storage)
    this.vm.on('targetsUpdate', () => {
      this.targets = vm.runtime.targets
    })

    createEffect(() => {
      // @ts-ignore
      this.workspace?.addChangeListener?.(vm.blocklyListener)
    })
  }
  get workspace() {
    return this.#workspace[0]()!
  }
  set workspace(v: any) {
    this.#workspace[1](() => v)
  }

  get editingTarget (): string | undefined {
    const id = this.vm.editingTarget?.id
    if (this.#editingTarget[0]() !== id) {
      this.#editingTarget[1](id)
    }
    return id
  }
  set editingTarget (target: string) {
    this.#editingTarget[1](target)
    this.vm.setEditingTarget(target)
  }

  get targets() {
    return this.#targets[0]()
  }
  set targets(targets: Target[]) {
    this.#targets[1](targets)
  }
}
