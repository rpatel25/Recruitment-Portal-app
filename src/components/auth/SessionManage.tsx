import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/util/firebaseClient';
import { getRememberMeSession, clearRememberMeSession } from '@/util/rememberMeSession';

/**
 * SessionManager component to handle automatic session cleanup
 * This should be included in your main app component or layout
 */
export const SessionManager = () => {
  useEffect(() => {
    // Check for expired sessions on app load
    const checkSessionValidity = () => {
      const session = getRememberMeSession();
      if (session === null) {
        // Session was expired and automatically cleared
        // Check if user is still authenticated in Firebase
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log('⏰ Remember me session expired, signing out user...');
          signOut(auth).catch((error) => {
            console.error('❌ Error signing out expired user:', error);
          });
        }
      }
    };

    // Check session validity on component mount
    checkSessionValidity();

    // Set up periodic checks every hour to clean up expired sessions
    const intervalId = setInterval(() => {
      checkSessionValidity();
    }, 60 * 60 * 1000); // Check every hour

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User signed out, clear remember me session
        const session = getRememberMeSession();
        if (session) {
          console.log('👋 User signed out, clearing remember me session');
          clearRememberMeSession();
        }
      }
    });

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default SessionManager;