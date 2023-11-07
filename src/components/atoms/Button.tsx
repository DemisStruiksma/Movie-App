interface Props {
    text: string,
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
    onClick: () => void;
}

export default function Button({text, type, onClick }: Props) {
    return (
        <button type={type} onClick={onClick}>
            {text}
        </button>
    )
}