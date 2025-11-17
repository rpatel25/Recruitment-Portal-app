import { signOut } from 'firebase/auth';
import { auth } from './firebaseClient';
import { clearRememberMeSession } from './rememberMeSession';

/**
 * Enhanced logout function that clears both Firebase auth and remember me session
 */
export const logout = async (): Promise<void> => {
    try {
        // Clear remember me session first
        clearRememberMeSession();

        // Sign out from Firebase
        await signOut(auth);

        console.log('👋 User logged out successfully');
    } catch (error) {
        console.error('❌ Error during logout:', error);
        throw error;
    }
};

/**
 * Check if user should be automatically logged in based on remember me session
 */
export const shouldAutoLogin = (): boolean => {
    // This is handled by Firebase persistence and our SessionManager
    // Just return false as we rely on Firebase's built-in persistence
    return false;
};