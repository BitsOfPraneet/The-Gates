import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserData {
  uid: string;
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
  age?: string;
  phone?: string;
  dateOfBirth?: string;
  createdAt: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  signup: (email: string, password: string, username: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Clear any potential cached auth issues on component mount
  useEffect(() => {
    // Aggressive cache clearing for Firebase auth issues
    const clearAllAuthCache = () => {
      try {
        // Clear all localStorage
        const localKeys = Object.keys(localStorage);
        localKeys.forEach(key => {
          if (key.startsWith('firebase:') || 
              key.includes('auth') || 
              key.includes('firebase') ||
              key === 'lastAuthLoad') {
            localStorage.removeItem(key);
          }
        });
        
        // Clear all sessionStorage  
        const sessionKeys = Object.keys(sessionStorage);
        sessionKeys.forEach(key => {
          if (key.includes('firebase') || key.includes('auth')) {
            sessionStorage.removeItem(key);
          }
        });

        // Clear cookies related to Firebase
        document.cookie.split(";").forEach(cookie => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          if (name.includes('firebase') || name.includes('auth')) {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          }
        });

      } catch (error) {
        console.log('Cache clear failed:', error);
      }
    };

    // Always clear cache on reload to prevent stuck states
    clearAllAuthCache();
    
    // Set loading timeout regardless
    const forceLoadTimeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(forceLoadTimeout);
  }, []);

  const signup = async (email: string, password: string, username: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: username });
    
    // Create user document in Firestore
    const userDoc = {
      uid: user.uid,
      username,
      email,
      bio: "A mysterious soul wandering through the digital realm...",
      profilePicture: "",
      createdAt: new Date()
    };
    
    await setDoc(doc(db, 'users', user.uid), userDoc);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserData = async (data: Partial<UserData>) => {
    if (!currentUser) return;
    
    await updateDoc(doc(db, 'users', currentUser.uid), data);
  };

  useEffect(() => {
    let userDataUnsubscribe: (() => void) | null = null;
    let isComponentMounted = true;
    
    // Immediate failsafe: stop loading after 200ms regardless of Firebase state
    const immediateTimeout = setTimeout(() => {
      if (isComponentMounted) {
        setLoading(false);
      }
    }, 200);
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isComponentMounted) return;
      
      setCurrentUser(user);
      
      if (user) {
        // Set up real-time listener for user data
        const userDocRef = doc(db, 'users', user.uid);
        userDataUnsubscribe = onSnapshot(userDocRef, (doc) => {
          if (!isComponentMounted) return;
          if (doc.exists()) {
            setUserData(doc.data() as UserData);
          }
          setLoading(false);
        });
      } else {
        setUserData(null);
        if (isComponentMounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      isComponentMounted = false;
      unsubscribe();
      if (userDataUnsubscribe) {
        userDataUnsubscribe();
      }
      clearTimeout(immediateTimeout);
    };
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 text-primary animate-spin mx-auto mb-4">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 10 C60 10, 65 15, 65 25 C65 35, 70 40, 70 50 C70 70, 60 80, 50 80 C40 80, 30 70, 30 50 C30 40, 35 35, 35 25 C35 15, 40 10, 50 10 Z" />
                <rect x="48" y="5" width="4" height="8" rx="2" />
                <circle cx="42" cy="45" r="3" fill="hsl(var(--background))" />
                <circle cx="58" cy="45" r="3" fill="hsl(var(--background))" />
                <path d="M45 60 Q50 65, 55 60" stroke="hsl(var(--background))" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground font-creepster">Awakening the spirits...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};