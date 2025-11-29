import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';

dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
}


// Initialize Firebase Admin
admin.initializeApp({
  credential: cert(serviceAccount)
});

export const auth = admin.auth();
export default admin;