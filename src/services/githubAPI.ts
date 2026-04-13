import axios, { AxiosError } from 'axios'
import { GitHubUser, APIError } from '../types'

const API_BASE_URL = 'https://api.github.com'
const PER_PAGE = 10

/**
 * Fetch GitHub users with pagination
 * @param {number} page - Page number (1-based)
 * @returns {Promise<GitHubUser[]>} Array of user objects
 */
export const fetchUsers = async (page: number = 1, perPage: number = PER_PAGE): Promise<GitHubUser[]> => {
  try {
    const since = (page - 1) * perPage;

    const response = await axios.get<GitHubUser[]>(`${API_BASE_URL}/users`, {
      params: {
        per_page: perPage,
        since: since,
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error('Error fetching users:', error);
    throw {
      message: axiosError.response?.data?.message || 'Failed to fetch users from GitHub API',
      status: axiosError.response?.status,
    } as APIError;
  }
}
