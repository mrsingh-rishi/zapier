import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();
const TOPIC_NAME = "zap-events";
const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();

  await producer.connect();

  while (1) {
    const pendingRows = await prisma.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });
    if (pendingRows.length === 0) continue;
    console.log(`take out ${pendingRows.length} rows`);
    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => ({ value: r.zapRunId })),
    });
    console.log("Pushed to kafka");
    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: { in: pendingRows.map((r) => r.id) },
      },
    });

    console.log("delete the pending rows");
  }
}

main();
