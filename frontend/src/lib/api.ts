// API Base URL
const API_BASE_URL = 'https://skill-development-platform-2cjy.vercel.app/api';

// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Generic fetch wrapper
async function apiCall(endpoint: string, options: RequestInit = {}) {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
}

// Auth API
export const auth = {
    login: async (email, password) => {
        return apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    register: async (email, password, name) => {
        return apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
        });
    },

    getMe: async () => {
        return apiCall('/me');
    },
};

// Skills API
export const skills = {
    getAll: async () => {
        return apiCall('/skills');
    },

    getById: async (id) => {
        return apiCall(`/skills/${id}`);
    },

    create: async (skillData) => {
        return apiCall('/admin/skills', {
            method: 'POST',
            body: JSON.stringify(skillData),
        });
    },
};

// Progress API
export const progress = {
    getAll: async () => {
        return apiCall('/progress');
    },

    update: async (progressData) => {
        return apiCall('/progress', {
            method: 'POST',
            body: JSON.stringify(progressData),
        });
    },

    getGaps: async () => {
        return apiCall('/progress/gaps');
    },
};

// Assessment API
export const assessments = {
    getAll: async () => {
        return apiCall('/assessments');
    },

    getById: async (id) => {
        return apiCall(`/assessments/${id}`);
    },

    submit: async (id, answers) => {
        return apiCall(`/assessments/${id}/submit`, {
            method: 'POST',
            body: JSON.stringify({ answers }),
        });
    },
};

// Learning Path API
export const learningPath = {
    getAll: async () => {
        return apiCall('/learning-path');
    },

    updateStatus: async (id, status) => {
        return apiCall(`/learning-path/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    },
};

// Admin API
export const admin = {
    getStats: async () => {
        return apiCall('/admin/stats');
    },

    getUsers: async () => {
        return apiCall('/admin/users');
    },

    getWeakestSkills: async () => {
        return apiCall('/admin/weakest-skills');
    },
};

export default {
    auth,
    skills,
    progress,
    assessments,
    learningPath,
    admin,
};
