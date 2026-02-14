import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/types';
import { auth as authApi } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await authApi.getMe();
                    setUser({
                        id: userData.id,
                        name: userData.name || userData.email,
                        email: userData.email,
                        role: userData.role as 'student' | 'admin'
                    });
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authApi.login(email, password);
        localStorage.setItem('token', response.token);
        setUser({
            id: response.user.id,
            name: response.user.name || response.user.email,
            email: response.user.email,
            role: response.user.role as 'student' | 'admin'
        });
    };

    const register = async (name: string, email: string, password: string) => {
        const response = await authApi.register(email, password, name);
        localStorage.setItem('token', response.token);
        setUser({
            id: response.user.id,
            name: response.user.name || response.user.email,
            email: response.user.email,
            role: response.user.role as 'student' | 'admin'
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
