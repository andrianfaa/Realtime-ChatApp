import { server, port } from "./app";

server.listen(port, () => console.log(`Server running on port ${port}`));
