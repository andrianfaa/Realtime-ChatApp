/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
export type RoomCardPropTypes = {
    id: string;
    name: string;
    onClick: () => void,
    isActive?: boolean;
}

export default function RoomCard({
    id, name, onClick, isActive,
}: RoomCardPropTypes) {
    if (isActive) {
        return (
            <li className="border-2 border-black rounded-md p-4 mb-2 last:mb-0 custom-shadow flex flex-col cursor-pointer bg-primary text-white group transition-all duration-200 ease-in-out" onClick={onClick}>
                <small className="badge bg-black transition-all duration-200 ease-in-out w-20 text-center mb-2">{id}</small>
                <span className="text-lg text-white transition-all duration-200 ease-in-out font-semibold">{name}</span>
            </li>
        );
    }

    return (
        <li className="border-2 border-black rounded-md p-4 mb-2 last:mb-0 custom-shadow flex flex-col cursor-pointer hover:bg-primary hover:text-white group transition-all duration-200 ease-in-out" onClick={onClick}>
            <small className="badge group-hover:bg-black transition-all duration-200 ease-in-out w-20 text-center mb-2">{id}</small>
            <span className="text-lg text-black group-hover:text-white transition-all duration-200 ease-in-out font-semibold">{name}</span>
        </li>
    );
}
