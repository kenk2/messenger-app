import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { IMessage } from "@customTypes/messages";

export default function useMessages(date: Date) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  useEffect(() => {
    const newMessages: IMessage[] = new Array(5).fill(0).map(() => ({
      name: faker.internet.userName(),
      message: faker.lorem.sentences(),
      id: faker.datatype.number(),
      timestamp: faker.date.past(),
    }));

    setMessages(newMessages);
  }, []);

  return { messages };
}
