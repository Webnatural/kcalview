export type Recipes = {
  items: Recipe[];
};

export type Recipe = {
  id?: number;
  title: string;
  description?: string;
  created_at?: Date;
};
