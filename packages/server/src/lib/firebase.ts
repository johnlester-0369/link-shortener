import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// Singleton Firebase Admin SDK initialization
// Ensures consistent Firestore connection across entire application
const initializeFirebase = () => {
  const hexKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!hexKey) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not defined',
    );
  }

  // Decode base64-encoded service account credentials
  // Base64 encoding prevents credential files in version control
  const serviceAccount = JSON.parse(
    Buffer.from(hexKey, 'base64').toString(),
  ) as ServiceAccount;

  // Initialize only if not already initialized (prevents duplicate initialization errors)
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin;
};

export const firebase = initializeFirebase();
