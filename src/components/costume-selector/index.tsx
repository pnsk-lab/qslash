export default function CostumeSelector(props: {
  image: string
  name: string
  selected: boolean
  onClick: () => void
}) {
  return <button type="button" onClick={props.onClick} aria-selected={props.selected}>
    <div class="flex flex-col border p-1 rounded-md transition-colors" classList={{
      'border-blue-500': props.selected
    }}>
      <div class="grid place-items-center h-20">
        <img class="grow h-12" src={props.image} />
      </div>
      <div class="border-t">
        {props.name}
      </div>
    </div>
  </button>
}
