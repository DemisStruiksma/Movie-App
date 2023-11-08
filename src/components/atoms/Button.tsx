interface Props {
    text?: string,
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
    children?: React.ReactNode;
    customClassNames?: string;
    onClick?: () => void;
}

export default function Button({text, type, children, customClassNames, onClick }: Props) {
    return (
        <button type={type} onClick={onClick} className={`text-white ${customClassNames}`}>
            {text}

            {children}
        </button>
    )
}