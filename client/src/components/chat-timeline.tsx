import { UserContext } from "context";
import { useContext } from "react";
import type { MessageType } from "./chat-rooms";

export type ChatTimelinePropTypes = {
    messages: MessageType[];
}

export default function ChatTimeline({ messages }: ChatTimelinePropTypes) {
    const { username } = useContext(UserContext);

    return (
        <div className="flex-1 w-full overflow-x-hidden overflow-y-auto p-4 h-full flex flex-col">
            {messages.length > 0 && messages.map(({ name, message }) => {
                if (name === username) {
                    return (
                        <div id="chat-wrapper" className="mb-2 last:mb-0 flex justify-end" key={`message#${Math.floor(Math.random() * 12345)}`}>
                            <div className="bg-primary text-white p-4 rounded-md custom-shadow border-2 border-black w-auto h-auto inline-block mb-2 last:mb-0">
                                <pre className="font-sans">
                                    {message}
                                </pre>
                            </div>
                        </div>
                    );
                }

                return (
                    <div id="chat-wrapper" className="mb-2 last:mb-0" key={`message#${Math.floor(Math.random() * 12345)}`}>
                        <div className="bg-white w-auto inline-block text-black p-4 rounded-md custom-shadow border-2 border-black">
                            <small className="text-sm font-bold">{name}</small>
                            <pre className="font-sans">
                                {message}
                            </pre>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
