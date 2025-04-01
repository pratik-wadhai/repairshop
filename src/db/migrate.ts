import { db } from ".";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });
    console.log("Migration completed");
  } catch (err) {
    console.error("Error during migration: ", err);
    process.exit();
  }
};

main();
