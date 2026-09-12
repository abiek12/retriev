import { BaseRepository } from "../../core/repositories";
import type { IChatRepository } from "./chat.repository.interface";

class ChatRepository extends BaseRepository implements IChatRepository {}

export default ChatRepository;
