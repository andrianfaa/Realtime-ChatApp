import type { Server as SocketIOServer } from "socket.io";

const rooms = [
    {
        id: `public#1`,
        name: "Public Chat"
    },
    {
        id: `public#2`,
        name: "Public Chat 2"
    }
];

type MessageDataType = {
    room_id: string;
    chat: {
        name: string;
        message: string;
    };
};

export default function Socket(io: SocketIOServer) {
    io.on("connection", (socket) => {
        console.log(`${socket.id} has been connected`);

        io.emit("welcome", rooms);

        socket.on("join_room", (room_id: string) => {
            const room = rooms.find(({ id }) => room_id === id);

            if (!room) socket.disconnect();

            socket.join(room_id);
            console.log(`${socket.id} joined room ${room?.name}`);
        });

        socket.on('leave_room', (room_id: string) => {
            const room = rooms.find(({ id }) => room_id === id);

            socket.leave(room_id)
            console.log(`${socket.id} leave room ${room?.name}`);
        });

        socket.on("send_message", (data: MessageDataType) => {
            const { room_id, chat } = data;
            const room = rooms.find(({ id }) => room_id === id);

            if (!room) {
                console.log('room not found');
            };

            socket.to(room_id).emit("receive_message", chat);
        });

        socket.on("disconnect", () => {
            console.log(`${socket.id} disconnected`);
        });
    });
}
