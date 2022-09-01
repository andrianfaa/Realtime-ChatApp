/* eslint-disable react/require-default-props */
import { UserContext } from "context";
import { useContext } from "react";

export type HeaderPropTypes = {
    className?: string;
}

export default function Header({ className }: HeaderPropTypes) {
    const { username } = useContext(UserContext);

    return (
        <header className={`border-2 border-black p-4 rounded-md custom-shadow ${className}`}>
            <span className="text-black">
                username:
                {" "}
                {username}
            </span>
        </header>
    );
}
