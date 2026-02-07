import Image from "next/image"

export default function Logo() {
    return (
        <div className="flex row items-center justify-center">
            <Image
                className="dark:invert"
                src={"/logo/logo.svg"}
                alt="Logo"
                width={40}
                height={40}
                priority
            />
            <span className="pl-2 font-semibold">Rivine</span>
        </div>
    )
}