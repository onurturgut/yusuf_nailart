import { MongoClient, type ObjectId } from "mongodb";

const dbName = process.env.MONGODB_DB || "yusuf_nailart";
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }

  return clientPromise;
}

export async function getDb() {
  const connectedClient = await getMongoClientPromise();
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
