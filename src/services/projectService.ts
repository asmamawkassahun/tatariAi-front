import { BaseService } from './base';
import { API_ENDPOINTS } from '@/constants/api';
import { 
  Project, 
  CreateProjectRequest, 
  UpdateProjectRequest, 
  ProjectFilters,
  PaginatedResponse,
  ApiResponse,
  User 
} from '@/types/api';

/**
 * Project service for handling project CRUD operations
 */
export class ProjectService extends BaseService {
  constructor() {
    super('');
  }

  /**
   * Get all projects with optional filtering and pagination
   */
  async getProjects(filters?: ProjectFilters): Promise<PaginatedResponse<Project>> {
    try {
      const params = this.buildQueryString(filters || {});
      return await this.getPaginated<Project>(API_ENDPOINTS.PROJECTS.GET_ALL + (params ? `?${params}` : ''));
    } catch (error) {
      console.error('Failed to get projects:', error);
      throw error;
    }
  }

  /**
   * Get project by ID
   */
  async getProjectById(id: string): Promise<Project> {
    try {
      return await this.get<Project>(API_ENDPOINTS.PROJECTS.GET_BY_ID(id));
    } catch (error) {
      console.error(`Failed to get project ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create new project
   */
  async createProject(projectData: CreateProjectRequest): Promise<Project> {
    try {
      return await this.post<Project>(API_ENDPOINTS.PROJECTS.CREATE, projectData);
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  }

  /**
   * Update project by ID
   */
  async updateProject(id: string, projectData: UpdateProjectRequest): Promise<Project> {
    try {
      return await this.put<Project>(API_ENDPOINTS.PROJECTS.UPDATE_BY_ID(id), projectData);
    } catch (error) {
      console.error(`Failed to update project ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete project by ID
   */
  async deleteProject(id: string): Promise<ApiResponse> {
    try {
      return await this.delete<ApiResponse>(API_ENDPOINTS.PROJECTS.DELETE_BY_ID(id));
    } catch (error) {
      console.error(`Failed to delete project ${id}:`, error);
      throw error;
    }
  }

  /**
   * Duplicate project
   */
  async duplicateProject(id: string, newTitle?: string): Promise<Project> {
    try {
      const data = newTitle ? { title: newTitle } : {};
      return await this.post<Project>(API_ENDPOINTS.PROJECTS.DUPLICATE(id), data);
    } catch (error) {
      console.error(`Failed to duplicate project ${id}:`, error);
      throw error;
    }
  }

  /**
   * Share project
   */
  async shareProject(id: string, shareData: { visibility: string; expiresAt?: string }): Promise<ApiResponse> {
    try {
      return await this.post<ApiResponse>(API_ENDPOINTS.PROJECTS.SHARE(id), shareData);
    } catch (error) {
      console.error(`Failed to share project ${id}:`, error);
      throw error;
    }
  }

  /**
   * Export project
   */
  async exportProject(id: string, format: 'json' | 'pdf' | 'html' = 'json'): Promise<Blob> {
    try {
      const response = await this.get<Blob>(`${API_ENDPOINTS.PROJECTS.EXPORT(id)}?format=${format}`);
      return response;
    } catch (error) {
      console.error(`Failed to export project ${id}:`, error);
      throw error;
    }
  }

  /**
   * Import project
   */
  async importProject(file: File): Promise<Project> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      return await this.upload<Project>(API_ENDPOINTS.PROJECTS.IMPORT, formData);
    } catch (error) {
      console.error('Failed to import project:', error);
      throw error;
    }
  }

  /**
   * Search projects
   */
  async searchProjects(query: string, filters?: Omit<ProjectFilters, 'search'>): Promise<PaginatedResponse<Project>> {
    try {
      const searchFilters = { search: query, ...filters };
      const params = this.buildQueryString(searchFilters);
      return await this.getPaginated<Project>(API_ENDPOINTS.PROJECTS.SEARCH + (params ? `?${params}` : ''));
    } catch (error) {
      console.error('Failed to search projects:', error);
      throw error;
    }
  }

  /**
   * Filter projects
   */
  async filterProjects(filters: ProjectFilters): Promise<PaginatedResponse<Project>> {
    try {
      const params = this.buildQueryString(filters);
      return await this.getPaginated<Project>(API_ENDPOINTS.PROJECTS.FILTER + (params ? `?${params}` : ''));
    } catch (error) {
      console.error('Failed to filter projects:', error);
      throw error;
    }
  }

  /**
   * Get user's projects
   */
  async getUserProjects(userId: string, filters?: Omit<ProjectFilters, 'author'>): Promise<PaginatedResponse<Project>> {
    try {
      const userFilters = { author: userId, ...filters };
      const params = this.buildQueryString(userFilters);
      return await this.getPaginated<Project>(API_ENDPOINTS.PROJECTS.USER_PROJECTS(userId) + (params ? `?${params}` : ''));
    } catch (error) {
      console.error(`Failed to get projects for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Get project collaborators
   */
  async getCollaborators(projectId: string): Promise<User[]> {
    try {
      return await this.get<User[]>(API_ENDPOINTS.PROJECTS.COLLABORATORS(projectId));
    } catch (error) {
      console.error(`Failed to get collaborators for project ${projectId}:`, error);
      throw error;
    }
  }

  /**
   * Add collaborator to project
   */
  async addCollaborator(projectId: string, userId: string, role: string = 'editor'): Promise<ApiResponse> {
    try {
      return await this.post<ApiResponse>(API_ENDPOINTS.PROJECTS.ADD_COLLABORATOR(projectId), {
        userId,
        role,
      });
    } catch (error) {
      console.error(`Failed to add collaborator to project ${projectId}:`, error);
      throw error;
    }
  }

  /**
   * Remove collaborator from project
   */
  async removeCollaborator(projectId: string, userId: string): Promise<ApiResponse> {
    try {
      return await this.delete<ApiResponse>(API_ENDPOINTS.PROJECTS.REMOVE_COLLABORATOR(projectId, userId));
    } catch (error) {
      console.error(`Failed to remove collaborator from project ${projectId}:`, error);
      throw error;
    }
  }

  /**
   * Get project analytics
   */
  async getProjectAnalytics(projectId: string): Promise<any> {
    try {
      return await this.get<any>(`${API_ENDPOINTS.DASHBOARD.PROJECT_ANALYTICS(projectId)}`);
    } catch (error) {
      console.error(`Failed to get analytics for project ${projectId}:`, error);
      throw error;
    }
  }

  /**
   * Like/unlike project
   */
  async toggleLike(projectId: string): Promise<{ liked: boolean; likeCount: number }> {
    try {
      return await this.post<{ liked: boolean; likeCount: number }>(`${API_ENDPOINTS.PROJECTS.BASE}/${projectId}/like`);
    } catch (error) {
      console.error(`Failed to toggle like for project ${projectId}:`, error);
      throw error;
    }
  }

  /**
   * View project (increment view count)
   */
  async viewProject(projectId: string): Promise<{ viewCount: number }> {
    try {
      return await this.post<{ viewCount: number }>(`${API_ENDPOINTS.PROJECTS.BASE}/${projectId}/view`);
    } catch (error) {
      console.error(`Failed to record view for project ${projectId}:`, error);
      throw error;
    }
  }
}

// Export singleton instance
export const projectService = new ProjectService();
