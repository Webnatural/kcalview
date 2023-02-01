import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import { Recipe } from '@screens/recipes/index.types';

const tableName = 'recipes';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'recipes.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getRecipeItems = async (db: SQLiteDatabase): Promise<Recipe[]> => {
  try {
    const recipeItems: Recipe[] = [];
    const results = await db.executeSql(
      `SELECT id,title, description, created_at FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        recipeItems.push(result.rows.item(index));
      }
    });
    return recipeItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get recipeItems');
  }
};

export const saveRecipeItems = async (
  db: SQLiteDatabase,
  recipeItems: Recipe[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(title, description, created_at) values` +
    recipeItems.map(i => `('${i.title}', '${i.title}', '0')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteRecipeItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
  console.log(deleteQuery);
  console.log(id);
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
