export type Recipes = {
  items: Recipe[];
};

export type Recipe = {
  id: number | undefined;
  title: string;
  description?: string;
  ingredients: string;
  created_at?: Date;
};
