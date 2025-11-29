import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';

// Helper function to get database user ID from email
const getUserIdFromEmail = async (email: string | undefined): Promise<number | null> => {
  if (!email) return null;
  
  const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  return result.rows.length > 0 ? result.rows[0].id : null;
};

// Get user progress
export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = await getUserIdFromEmail(req.userEmail);

    if (!userId) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await pool.query(
      'SELECT * FROM user_progress WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    res.json({ progress: result.rows[0] });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user progress
export const updateProgress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = await getUserIdFromEmail(req.userEmail);

    if (!userId) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { pointsToAdd, level, streak } = req.body;

    let query;
    let params;

    if (pointsToAdd !== undefined) {
      query = `UPDATE user_progress 
               SET total_points = total_points + $1,
                   current_level = COALESCE($2, current_level),
                   current_streak = COALESCE($3, current_streak),
                   updated_at = CURRENT_TIMESTAMP
               WHERE user_id = $4
               RETURNING *`;
      params = [pointsToAdd, level, streak, userId];
    } else {
      query = `UPDATE user_progress 
               SET current_level = COALESCE($1, current_level),
                   current_streak = COALESCE($2, current_streak),
                   updated_at = CURRENT_TIMESTAMP
               WHERE user_id = $3
               RETURNING *`;
      params = [level, streak, userId];
    }

    const result = await pool.query(query, params);

    res.json({ 
      message: 'Progress updated',
      progress: result.rows[0]
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user info
export const getUserInfo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = await getUserIdFromEmail(req.userEmail);

    if (!userId) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await pool.query(
      'SELECT id, email, username, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get user info error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};