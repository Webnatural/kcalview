import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import { Recipe } from '@screens/recipes/index.types';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'recipes.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TEXT NOT NULL
    );`;
  try {
    const response = await db.executeSql(query);
    return response;
  } catch (error) {
    throw Error(`Failed to create table: ${tableName}`);
  }
};

export const getRecipeItems = async (
  db: SQLiteDatabase,
  tableName: string,
): Promise<Recipe[]> => {
  try {
    const recipeItems: Recipe[] = [];
    const response = await db.executeSql(
      `SELECT id,title, description, created_at FROM ${tableName}`,
    );

    response.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        recipeItems.push(result.rows.item(index));
      }
    });
    return recipeItems;
  } catch (error) {
    throw Error(`Failed to get items from table: ${tableName}`);
  }
};

export const saveRecipeItems = async (
  db: SQLiteDatabase,
  recipeItems: Recipe[],
  tableName: string,
) => {
  const query =
    `INSERT OR REPLACE INTO ${tableName}(title, description, created_at) values` +
    recipeItems.map(i => `('${i.title}', '${i.description}', '0')`).join(',');

  try {
    const response = await db.executeSql(query);
    const first = response[0];

    if (!Array.isArray(response)) {
      return;
    }

    if (first?.insertId > 0) {
      return first.insertId;
    }
  } catch (error) {
    throw Error(`Failed to put item(s): ${JSON.stringify(recipeItems)}`);
  }
};

export const deleteRecipeItem = async (
  db: SQLiteDatabase,
  id: number,
  tableName: string,
) => {
  const query = `DELETE from ${tableName} where id = ${id}`;

  try {
    const response = await db.executeSql(query);
    return response;
  } catch (error) {
    throw Error(`Failed to delete item: ${id}`);
  }
};

export const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `drop table ${tableName}`;

  try {
    const response = await db.executeSql(query);
    return response;
  } catch (error) {
    throw Error(`Failed to delete table: ${tableName}`);
  }
};
