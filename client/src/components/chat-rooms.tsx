import { UserContext } from "context";
import { usePreviousState } from "hooks";
import {
    ChangeEvent,
    FormEvent, KeyboardEvent, useContext, useEffect, useState,
} from "react";
import { FiChevronLeft, FiSend } from "react-icons/fi";
import { io } from "socket.io-client";
import ChatTimeline from "./chat-timeline";
import RoomCard from "./room-card";

export type RoomType = {
    id: string;
    name: string;
}

export type MessageType = {
    name: string;
    message: string;
}

export default function ChatRoom() {
    const { username } = useContext(UserContext);

    const [socket, setSocket] = useState<ReturnType<typeof io>>();
    const [selectedRoomId, setRoomId] = useState<string>("");
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [message, setMessage] = useState<string>("");

    const previousRoomId = usePreviousState(selectedRoomId);

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;

        const regex = /^[\w\d\s]+$/;
        const pattern = new RegExp(regex);

        if (value.length > 0 && !pattern.test(value)) return;

        setMessage(value);
    };

    const sendMessage = () => {
        if (!message || !socket) return;

        socket.emit("send_message", {
            room_id: selectedRoomId,
            chat: {
                name: username,
                message,
            },
        });

        setMessages((prevState) => [...prevState, {
            name: username,
            message,
        }]);
        setMessage("");
    };

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage();
    };

    const handleSendWithKeyboardShortcut = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        const { ctrlKey, key } = event;

        if (ctrlKey && key === "Enter") {
            sendMessage();
        }
    };

    useEffect(() => {
        const socketConnection = io(process.env.REACT_APP_SOCKET_URL as string || "http://localhost:5000");

        socketConnection.on("welcome", (listRooms: RoomType[]) => {
            setRooms(listRooms);
        });

        setSocket(socketConnection);
    }, []);

    useEffect(() => {
        if (socket && selectedRoomId) {
            socket.emit("leave_room", previousRoomId);
            socket.emit("join_room", selectedRoomId);
            setMessages([]);
            setMessage("");
        }
    }, [selectedRoomId]);

    useEffect(() => {
        if (!socket) return;

        socket.on("receive_message", (chat: MessageType) => {
            const handleDuplicateMessage = messages.find((msg) => JSON.stringify(msg) === JSON.stringify(chat));

            if (handleDuplicateMessage) return;

            setMessages((prevState) => [...prevState, chat]);
        });
    }, [socket]);

    return (
        <div className="flex flex-row w-full relative pb-4">
            <ul id="rooms" className="flex-1 w-full sm:max-w-xs sm:mr-4 border-2 border-black rounded-md custom-shadow p-4 h-[80vh]">
                {rooms.length > 0 && rooms.map(({ id, name }) => (
                    <RoomCard
                        id={id}
                        name={name}
                        onClick={() => setRoomId(id)}
                        key={id}
                        isActive={id === selectedRoomId}
                    />
                ))}
            </ul>

            <section id="chat" className={`absolute sm:relative border-2 border-black rounded-md h-[80vh] bg-white flex-1 w-full custom-shadow transition-all duration-200 ease-in-out ${selectedRoomId ? "" : "hidden sm:translate-x-0 sm:block"}`}>
                {selectedRoomId ? (
                    <div className="grid timeline-wrapper sm:timeline-wrapper-sm h-full">
                        <header id="chat-header" className="w-full border-b-2 border-b-black p-4 flex flex-row items-center">
                            <button className="button-base w-auto p-2 px-3 sm:hidden mr-4" type="button" onClick={() => setRoomId("")} title="Back">
                                <FiChevronLeft className="text-base inline align-middle" />
                            </button>
                            <span className="font-bold text-black">
                                {rooms.find(({ id }) => id === selectedRoomId)?.name}
                            </span>
                        </header>

                        <ChatTimeline messages={messages} />

                        <form onSubmit={handleOnSubmit} className="flex flex-row items-end p-4 border-t-2 border-t-black h-[122px]">
                            <textarea
                                name="message"
                                id="message"
                                title="Type your message"
                                placeholder="Message..."
                                className="w-full p-2 border-2 border-black rounded-md custom-shadow"
                                rows={3}
                                onKeyDown={handleSendWithKeyboardShortcut}
                                onChange={handleOnChange}
                                value={message}
                            />
                            <button type="submit" className="button-base w-auto ml-2" title="Send message" aria-label="Send message">
                                <FiSend className="inline text-base align-middle" />
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="h-full w-full flex flex-col text-center items-center justify-center">
                        <h2>Choose room</h2>
                        <p>choose a room to start a conversation</p>
                    </div>
                )}
            </section>
        </div>
    );
}
