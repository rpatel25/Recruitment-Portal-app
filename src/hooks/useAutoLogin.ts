import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/util/firebaseClient';
import { getRememberMeSession, clearRememberMeSession } from '@/util/rememberMeSession';

interface UseAutoLoginReturn {
  isCheckingAutoLogin: boolean;
  autoLoginAttempted: boolean;
}

/**
 * Hook to handle automatic login for users with valid remember me sessions
 * Should be used in the main app component or auth guard
 */
export const useAutoLogin = (): UseAutoLoginReturn => {
  const [isCheckingAutoLogin, setIsCheckingAutoLogin] = useState(true);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAutoLogin = async () => {
      try {
        // Check if user is already authenticated
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log('👤 User already authenticated, skipping auto-login');
          setIsCheckingAutoLogin(false);
          setAutoLoginAttempted(true);
          return;
        }

        // Check for remember me session
        const session = getRememberMeSession();
        if (!session) {
          console.log('📝 No remember me session found');
          setIsCheckingAutoLogin(false);
          setAutoLoginAttempted(true);
          return;
        }

        console.log(`🔄 Found remember me session for ${session.email}, attempting auto-login...`);

        // Note: For security reasons, we can't store passwords in localStorage
        // So we'll just pre-fill the email and let the user enter their password
        // Or implement a different strategy like refresh tokens
        
        // For now, we'll just pre-fill the email on the login form
        // and clear the session if it's expired (which is already handled in getRememberMeSession)
        
        console.log('📧 Remember me session is valid, email will be pre-filled on login form');
        
      } catch (error) {
        console.error('❌ Auto-login check failed:', error);
        clearRememberMeSession(); // Clear potentially corrupted session
      } finally {
        if (mounted) {
          setIsCheckingAutoLogin(false);
          setAutoLoginAttempted(true);
        }
      }
    };

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('✅ User authenticated via Firebase auth state change');
      }
      
      if (!autoLoginAttempted) {
        checkAutoLogin();
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [autoLoginAttempted]);

  return {
    isCheckingAutoLogin,
    autoLoginAttempted
  };
};