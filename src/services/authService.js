import { INITIAL_USERS, ROLES } from '../utils/constants';
import { getStorageItem, setStorageItem } from '../utils/helpers';

const STORAGE_USERS_KEY = 'apex_registered_users';
const STORAGE_CURRENT_USER_KEY = 'apex_current_user';
const STORAGE_TOKEN_KEY = 'apex_token';

// Seed initial users if empty
if (!getStorageItem(STORAGE_USERS_KEY, null)) {
  setStorageItem(STORAGE_USERS_KEY, INITIAL_USERS);
}

export const authService = {
  login: async (email, password) => {
    // Artificial latency for realism
    await new Promise((res) => setTimeout(res, 400));
    const users = getStorageItem(STORAGE_USERS_KEY, INITIAL_USERS);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = `mock-jwt-token-${user.id}-${Date.now()}`;
    setStorageItem(STORAGE_TOKEN_KEY, token);
    setStorageItem(STORAGE_CURRENT_USER_KEY, user);
    return { user, token };
  },

  register: async (userData) => {
    await new Promise((res) => setTimeout(res, 500));
    const users = getStorageItem(STORAGE_USERS_KEY, INITIAL_USERS);
    
    if (users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: `usr_${userData.role || ROLES.STUDENT}_${Date.now()}`,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      ...userData,
    };

    const updated = [...users, newUser];
    setStorageItem(STORAGE_USERS_KEY, updated);

    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`;
    setStorageItem(STORAGE_TOKEN_KEY, token);
    setStorageItem(STORAGE_CURRENT_USER_KEY, newUser);
    return { user: newUser, token };
  },

  getCurrentUser: () => {
    return getStorageItem(STORAGE_CURRENT_USER_KEY, null);
  },

  logout: () => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    return true;
  },

  resetPassword: async (email) => {
    await new Promise((res) => setTimeout(res, 400));
    const users = getStorageItem(STORAGE_USERS_KEY, INITIAL_USERS);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('No user found with this email address');
    }
    return { success: true, message: 'Password reset link sent to your registered email.' };
  },
};

export default authService;
