import { useEffect, useRef } from "react";

const usePreviousState = <T>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default usePreviousState;
