import { createContext, useContext } from "react";
import type { UserProfile } from "../types/spotify";

interface AuthContextType {
    userProfile: UserProfile | null;
    fetchProfile: () => Promise<void>
}

export const AuthContext  = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);

    if(context === null) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}