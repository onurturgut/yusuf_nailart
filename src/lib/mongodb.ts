import { MongoClient, type ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();
const dbName = process.env.MONGODB_DB || "yusuf_nailart";

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise() {
  if (clientPromise) {
    return clientPromise;
  }

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
    return clientPromise;
  }

  const client = new MongoClient(uri);
  clientPromise = client.connect();
  return clientPromise;
}

export async function getDb() {
  const connectedClient = await getClientPromise();
  return connectedClient.db(dbName);
}

export interface AppointmentDoc {
  _id?: ObjectId;
  first_name: string;
  last_name: string;
  email?: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  addons?: string[];
  created_at: Date;
}
