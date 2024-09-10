import { Octokit } from 'octokit';
import dotenv from 'dotenv';
import { User } from './types';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function fetchUser(username: string): Promise<User> {
  try {
    const { data } = await octokit.rest.users.getByUsername({ username });
    return {
      login: data.login,
      name: data.name,
      location: data.location,
    }
  } catch (error) {
    throw error;
  }
}