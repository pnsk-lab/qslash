import { EditMode } from "./EditModeSelector";

export const EDIT_PROCESSES: Record<EditMode, (scope: paper.PaperScope) => {
  onMouseDown?: (evt: paper.MouseEvent) => void
  onMouseDrag?: (evt: paper.MouseEvent) => void
  onMouseUp?: (evt: paper.MouseEvent) => void
}> = {
  select: (scope) => {
    let selectedItem: paper.Item | null = null
    return {
      onMouseDown: (evt: paper.MouseEvent) => {
        const hit = scope.project.hitTest(evt.point, {
          stroke: true,
          fill: true,
        })
        selectedItem && (selectedItem.bounds.selected = false)
        selectedItem = null
        if (!hit) return
        selectedItem = hit.item
        selectedItem.bounds.selected = true
      },
    }
  },
  segment: (scope) => {
    let selectedObject: paper.Item | null = null
    let selectedHandle: {
      segment: paper.Segment
      selected: 'handle-in' | 'handle-out' | 'segment'
    } | null = null
    scope.settings.handleSize = 7

    const onMouseDown = (evt: paper.MouseEvent) => {
      const handleHits = scope.project.hitTestAll(evt.point, {
        handles: true,
        segments: true,
        tolerance: 5,
      })
      for (const hit of handleHits) {
        if ((hit.type === 'handle-in' || hit.type === 'handle-out') && hit.segment.selected) {
          selectedHandle = {
            segment: hit.segment,
            selected: hit.type,
          }
        }
        if (hit.type === 'segment' && hit.item.selected) {
          selectedHandle && (selectedHandle.segment.selected = false)
          hit.segment.selected = true
          selectedHandle = {
            segment: hit.segment,
            selected: hit.type,
          }
          return
        }
      }

      const objectHit = scope.project.hitTest(evt.point, {
        stroke: true,
        fill: true,
      })
      if (!objectHit) {
        selectedHandle && (selectedHandle.segment.selected = false)
        selectedHandle = null
        selectedObject && (selectedObject.selected = false)
        selectedObject = null
        return
      }
      switch (objectHit.type) {
        case 'stroke':
        case 'fill':
          if (selectedObject) {
            selectedObject.selected = false
            selectedObject = null
          }
          selectedObject = objectHit.item
          selectedObject.selected = true
          break
      }
    }
    const onMouseDrag = (evt: paper.MouseEvent) => {
      if (selectedHandle) {
        if (selectedHandle.selected === 'handle-in') {
          selectedHandle.segment.handleIn = selectedHandle.segment.handleIn.add(evt.delta)
        } else if (selectedHandle.selected === 'handle-out') {
          selectedHandle.segment.handleOut = selectedHandle.segment.handleOut.add(evt.delta)
        } else if (selectedHandle.selected === 'segment') {
          selectedHandle.segment.point = evt.point
        }
      }
    }
    return {
      onMouseDown,
      onMouseDrag,
    }
  }
}
