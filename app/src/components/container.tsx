/* eslint-disable react/require-default-props */
import { ReactNode } from "react";

export type ContainerPropTypes = {
    children: ReactNode;
    className?: string;
};

export default function Container({ children, className }: ContainerPropTypes) {
    const defaultContainerStyle = "p-4 md:p-6 w-full max-w-[1080px] mx-auto";

    return (
        <div id="container" className={`${defaultContainerStyle} ${className}`}>
            {children}
        </div>
    );
}
