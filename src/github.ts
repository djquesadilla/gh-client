import { Octokit } from 'octokit';
import dotenv from 'dotenv';
import { UserWithLanguages } from './types';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function fetchUser(username: string): Promise<UserWithLanguages> {
  try {
    const { data: user } = await octokit.rest.users.getByUsername({ username });
    const { data: repos } = await octokit.rest.repos.listForUser({ username });

    const languages = new Set<string>();
    for (const repo of repos) {
      if (repo.language) {
        languages.add(repo.language);
      }
    }

    return {
      login: user.login,
      name: user.name,
      location: user.location,
      languages: Array.from(languages),
    }
  } catch (error) {
    throw error;
  }
}
