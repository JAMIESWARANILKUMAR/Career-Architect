import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot, increment } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  incrementPoints: (amount: number) => Promise<void>;
  incrementApplications: () => Promise<void>;
  profile: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = undefined;
      }

      if (authUser) {
        const docRef = doc(db, 'users', authUser.uid);
        
        // Use onSnapshot for real-time profile updates
        unsubscribeProfile = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            // Initial profile creation if it doesn't exist
            const newProfile = {
              uid: authUser.uid,
              displayName: authUser.displayName,
              handle: `@${authUser.displayName?.toLowerCase().replace(/\s+/g, '')}_${Math.floor(1000 + Math.random() * 9000)}`,
              email: authUser.email,
              careerPoints: 1250,
              applicationsCount: 0,
              resumeWeightage: 65,
              dailyStreak: 1,
              skills: ['React', 'TypeScript', 'Node.js'],
              currentRole: 'Computer Science Student',
              targetIndustry: 'Big Tech',
              targetRole: 'Software Engineer',
              onboardingComplete: true,
              createdAt: serverTimestamp(),
            };
            setDoc(docRef, newProfile).catch(error => {
              handleFirestoreError(error, OperationType.WRITE, `users/${authUser.uid}`);
            });
          }
          setLoading(false);
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${authUser.uid}`);
          setLoading(false);
        });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const updateProfile = async (data: any) => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, data);
      // No need to setProfile manually anymore because onSnapshot handles it
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const incrementPoints = async (amount: number) => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        careerPoints: increment(amount)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const incrementApplications = async () => {
    if (!user) return;
    const path = `users/${user.uid}`;
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        applicationsCount: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logOut, profile, updateProfile, incrementPoints, incrementApplications }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
