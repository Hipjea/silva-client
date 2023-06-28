interface Props {
  label: string
  callback: () => void
}

const ButtonElement = ({ label, callback }: Props) => {
  return (
    <button
      onClick={callback}
    >
      {label}
    </button>
  )
}

export { type Props as ButtonElementProps, ButtonElement }