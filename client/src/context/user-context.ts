import { createContext } from "react";

export type UserContextType = {
    username: string;
    setUsername: (name: string) => void;
};

export const UserContext = createContext<UserContextType>({
    username: "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUsername: () => {},
});
