/* eslint-disable react/no-unescaped-entities */
import { Container } from "components";
import { UserContext } from "context";
import {
    ChangeEvent, FormEvent, useContext, useState,
} from "react";

export default function Login() {
    const [name, setName] = useState<string>("");

    const { setUsername } = useContext(UserContext);

    const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        const regex = /^[\w\d]+$/;
        const pattern = new RegExp(regex);

        if (value.length > 0 && !pattern.test(value)) return;

        setName(value);
    };

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUsername(name);
    };

    const handleClickRandomName = () => {
        const randomName = `Anonymous#${Math.floor(Math.random() * 12345)}`;
        setUsername(randomName);
    };

    return (
        <Container className="min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleOnSubmit}
                id="wrapper"
                className="w-full max-w-md rounded-md p-4 border-2 border-black text-center custom-shadow"
            >
                <h1>Login</h1>
                <p className="mb-4">
                    You don't think you should login first and behave like humans not robot.
                </p>

                <input
                    type="text"
                    className="input-base mb-2"
                    onChange={handleOnInputChange}
                    value={name}
                    placeholder="Type your name here"
                />

                <button className="button-base button-primary mb-4" type="submit">
                    Login
                </button>

                <button type="button" className="link" onClick={() => handleClickRandomName()}>
                    Use random name?
                </button>
            </form>
        </Container>
    );
}
