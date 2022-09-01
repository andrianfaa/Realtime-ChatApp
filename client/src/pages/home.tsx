import { ChatRoom, Container, Header } from "components";

export default function Home() {
    return (
        <Container>
            <Header className="mb-4" />
            <ChatRoom />
        </Container>
    );
}
