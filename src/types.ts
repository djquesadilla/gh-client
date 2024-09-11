export type User = {
  login: string;
  name: string;
  location: string;
}

export type UserWithLanguages = User & {
  languages: string[];
}