export default function CostumeSelector(props: {
  image: string
  name: string
}) {
  return <button>
    <img src={props.image} />
    <div>
      {props.name}
    </div>
  </button>
}
