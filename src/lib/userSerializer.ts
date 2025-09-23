import { User } from 'firebase/auth';
import { SerializableUser } from '@/types/auth';

export const serializeUser = (user: User): SerializableUser => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
    metadata: {
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
    },
  };
};

export const deserializeUser = (serializableUser: SerializableUser): Partial<User> => {
  return {
    uid: serializableUser.uid,
    email: serializableUser.email,
    displayName: serializableUser.displayName,
    photoURL: serializableUser.photoURL,
    emailVerified: serializableUser.emailVerified,
    isAnonymous: serializableUser.isAnonymous,
    metadata: {
      creationTime: serializableUser.metadata.creationTime,
      lastSignInTime: serializableUser.metadata.lastSignInTime,
    },
  } as Partial<User>;
};
