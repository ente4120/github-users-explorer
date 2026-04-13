import axios, { AxiosError } from 'axios'
import { GitHubUser, APIError } from '../types'

const API_BASE_URL = 'https://api.github.com'
const PER_PAGE = 10

/**
 * Fetch GitHub users with pagination
 * @param {number} page - Page number (1-based)
 * @returns {Promise<GitHubUser[]>} Array of user objects
 */
export const fetchUsers = async (page: number = 1): Promise<GitHubUser[]> => {
  try {
    // Calculate the 'since' parameter for pagination
    // GitHub API uses 'since' (user ID offset) for pagination
    const since = (page - 1) * PER_PAGE;

    const response = await axios.get<GitHubUser[]>(`${API_BASE_URL}/users`, {
      params: {
        per_page: PER_PAGE,
        since: since,
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
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
