// Remember Me Session Management
// Handles 30-day auto-login sessions

const REMEMBER_ME_KEY = 'rememberMeSession';
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

interface RememberMeSession {
  email: string;
  expiresAt: number;
  createdAt: number;
}

/**
 * Sets a remember me session that expires after 30 days
 */
export const setRememberMeSession = (email: string): void => {
  const now = Date.now();
  const session: RememberMeSession = {
    email,
    expiresAt: now + SESSION_DURATION,
    createdAt: now
  };
  
  try {
    localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(session));
    console.log('✅ Remember me session set for 30 days');
  } catch (error) {
    console.error('❌ Failed to set remember me session:', error);
  }
};

/**
 * Gets the remember me session if it exists and hasn't expired
 */
export const getRememberMeSession = (): RememberMeSession | null => {
  try {
    const sessionData = localStorage.getItem(REMEMBER_ME_KEY);
    if (!sessionData) {
      return null;
    }

    const session: RememberMeSession = JSON.parse(sessionData);
    const now = Date.now();

    // Check if session has expired
    if (now > session.expiresAt) {
      console.log('⏰ Remember me session expired, removing...');
      clearRememberMeSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('❌ Failed to get remember me session:', error);
    clearRememberMeSession(); // Clear corrupted data
    return null;
  }
};

/**
 * Clears the remember me session
 */
export const clearRememberMeSession = (): void => {
  try {
    localStorage.removeItem(REMEMBER_ME_KEY);
    console.log('🗑️ Remember me session cleared');
  } catch (error) {
    console.error('❌ Failed to clear remember me session:', error);
  }
};

/**
 * Checks if a remember me session exists and is valid
 */
export const hasValidRememberMeSession = (): boolean => {
  return getRememberMeSession() !== null;
};

/**
 * Gets the remaining days for the current session
 */
export const getSessionRemainingDays = (): number => {
  const session = getRememberMeSession();
  if (!session) return 0;
  
  const now = Date.now();
  const remainingMs = session.expiresAt - now;
  return Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
};