import SocketClientData from "../../SocketClientData";

export default interface ClientToServerEvents{
    message: (clientData: SocketClientData) => void;
    joinRoom: (userId: string) => void;
}