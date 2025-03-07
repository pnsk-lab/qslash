/// <reference types="@turbowarp/types" />
import VirtualMachine, { ThreadStatus, type Target } from 'scratch-vm'
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
      this.targets = [...vm.runtime.targets]
    })
  }

  async loadProject(json: object) {
    this.vm.stopAll()
    this.vm.clear()
    await this.vm.loadProject(json)
    this.editingTarget = this.vm.runtime.targets[0].id
    this.targets = [...this.vm.runtime.targets]
    this.vm.start()
  }

  get workspace() {
    return this.#workspace[0]()!
  }
  set workspace(v: any) {
    this.#workspace[1](() => v)
  }

  get editingTarget (): string | undefined {
    return this.#editingTarget[0]()
  }
  set editingTarget (target: string) {
    this.vm.setEditingTarget(target)
    this.#editingTarget[1](target)
  }

  get targets() {
    return this.#targets[0]()
  }
  set targets(targets: Target[]) {
    this.#targets[1](targets)
  }
}
