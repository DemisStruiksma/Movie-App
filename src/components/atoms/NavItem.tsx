import Link from "next/link";

interface Props {
    text: string;
    route: string;
    isActive: boolean;
}

export default function NavItem({ text, route, isActive }: Props) {
    return (
        <li className={isActive ? 'text-blue-500' : 'hover:text-blue-500'}>
            <Link href={route}>{text}</Link>
        </li>
    )
}