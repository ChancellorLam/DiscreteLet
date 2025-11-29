import { Request, Response } from 'express';
import pool from '../config/database';
import { auth } from '../config/firebase';

// Verify Firebase token and sync with database
export const verifyAndSyncUser = async (req: Request, res: Response) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({ error: 'Firebase token required' });
    }

    // Verify the Firebase token
    const decodedToken = await auth.verifyIdToken(firebaseToken);
    const { uid, email, name } = decodedToken;

    // Check if user exists in our database
    let userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      // Create new user in database
      userResult = await pool.query(
        'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username',
        [email, name || email?.split('@')[0] || 'User', uid] // Use Firebase UID as password_hash (not actually used)
      );

      const newUser = userResult.rows[0];

      // Create initial progress entry
      await pool.query(
        'INSERT INTO user_progress (user_id) VALUES ($1)',
        [newUser.id]
      );
    }

    const user = userResult.rows[0];

    res.json({
      message: 'User verified and synced',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firebaseUid: uid
      }
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ error: 'Server error during verification' });
  }
};

// Optional: Get current user info from Firebase token
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    
    // Get user from database
    const result = await pool.query(
      'SELECT id, email, username, created_at FROM users WHERE email = $1',
      [decodedToken.email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found in database' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};