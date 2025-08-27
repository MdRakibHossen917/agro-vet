import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  productsCollection: "products",
  usersCollection: "users",
  bookingsCollection: "bookings",
};

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error("Please define the MONGODB_URI environment variable");
if (!dbName) throw new Error("Please define the DB_NAME environment variable");

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 60000,
};

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function dbConnect(collectionName) {
  if (!collectionName) throw new Error("Please provide a collection name");
  const client = await clientPromise;
  const db = client.db(dbName);
  return db.collection(collectionName);
}
