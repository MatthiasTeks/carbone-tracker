import db from '../db';
import CategoryService from '../services/category-service';
import UserService from '../services/user-service';

export default async function resetDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`),
    ),
  );
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`),
    ),
  );
  await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await resetDB();

  await UserService.create({
    email: 'carbon-tracker@support.fr',
    password: 'carbonpassword',
  });

  await CategoryService.create({
    name: 'Transport',
  });
  await CategoryService.create({
    name: 'Alimentation',
  });
  await CategoryService.create({
    name: 'Energie',
  });
  await CategoryService.create({
    name: 'Habillement',
  });

  await db.destroy();
  console.info('♻️ Database successfully reset!');
}

main();
