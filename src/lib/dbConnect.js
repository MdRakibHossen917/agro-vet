import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  productsCollection: "products",
  usersCollection: "users",
  bookingsCollection: "booking",
};

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please define the MONGODB_URI environment variable");
if (!process.env.DB_NAME)
  throw new Error("Please define the DB_NAME environment variable");

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 60000, // 60 seconds
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
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  return db.collection(collectionName);
}
