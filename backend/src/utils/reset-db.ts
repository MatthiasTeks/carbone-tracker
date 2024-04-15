import { db } from '../db';
import ActivityEntryService from '../services/activity-entry-service';
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
// Pour executer resetDB :
// docker exec -it {BackendContainerId} sh
// npm run resetDB
async function main() {
  await db.initialize();
  await resetDB();

  const user1 = UserService.create({
    email: 'carbon-tracker@support.fr',
    password: 'carbonpassword',
  });

  const category1 = CategoryService.create({
    name: 'Transport',
  });
  const category2 = CategoryService.create({
    name: 'Alimentation',
  });
  const category3 = CategoryService.create({
    name: 'Logement',
  });

  await ActivityEntryService.create({
    name: 'Ma dépense carbone voiture',
    input: 20,
    category: await category1,
    user: await user1,
  });

  await ActivityEntryService.create({
    name: 'Ma dépense carbone repas',
    input: 30,
    category: await category2,
    user: await user1,
  });

  await ActivityEntryService.create({
    name: 'Electricité mois de mars',
    input: 55,
    category: await category3,
    user: await user1,
  });
  await ActivityEntryService.create({
    name: 'Trajet Lyon Paris',
    input: 23,
    category: await category1,
    user: await user1,
  });

  await ActivityEntryService.create({
    name: 'Restaurant en famille',
    input: 5,
    category: await category2,
    user: await user1,
  });

  await ActivityEntryService.create({
    name: 'Electricité mois de février',
    input: 55,
    category: await category3,
    user: await user1,
  });
  await ActivityEntryService.create({
    name: 'Electricité mois de mars',
    input: 55,
    category: await category3,
    user: await user1,
  });
  await ActivityEntryService.create({
    name: 'Trajet Lyon Paris',
    input: 23,
    category: await category1,
    user: await user1,
  });

  await ActivityEntryService.create({
    name: 'Restaurant en famille',
    input: 5,
    category: await category2,
    user: await user1,
  });

  await ActivityEntryService.create({
    name: 'Electricité mois de février',
    input: 55,
    category: await category3,
    user: await user1,
  });
  await ActivityEntryService.create({
    name: 'Trajet Lyon Paris',
    input: 23,
    category: await category1,
    user: await user1,
  });

  await ActivityEntryService.create({
    name: 'Restaurant en famille',
    input: 5,
    category: await category2,
    user: await user1,
  });

  await ActivityEntryService.create({
    name: 'Electricité mois de février',
    input: 55,
    category: await category3,
    user: await user1,
  });
  await db.destroy();
  console.info('♻️ Database successfully reset!');
}

main();
