import { Response } from 'express';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';

// Helper function
const getUserIdFromEmail = async (email: string | undefined): Promise<number | null> => {
  if (!email) return null;
  const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  return result.rows.length > 0 ? result.rows[0].id : null;
};

// Submit quiz results
export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const userId = await getUserIdFromEmail(req.userEmail);
    if (!userId) return res.status(404).json({ error: 'User not found' });

    const { quizName, score, totalQuestions } = req.body;

    if (!quizName || score === undefined || !totalQuestions) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await pool.query(
      'INSERT INTO quiz_results (user_id, quiz_name, score, total_questions) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, quizName, score, totalQuestions]
    );

    res.status(201).json({
      message: 'Quiz submitted successfully',
      result: result.rows[0]
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get quiz history
export const getQuizHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = await getUserIdFromEmail(req.userEmail);
    if (!userId) return res.status(404).json({ error: 'User not found' });

    const result = await pool.query(
      'SELECT * FROM quiz_results WHERE user_id = $1 ORDER BY completed_at DESC',
      [userId]
    );

    res.json({ quizzes: result.rows });
  } catch (error) {
    console.error('Get quiz history error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get quiz stats
export const getQuizStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = await getUserIdFromEmail(req.userEmail);
    if (!userId) return res.status(404).json({ error: 'User not found' });

    const result = await pool.query(
      `SELECT 
        COUNT(*) as total_quizzes,
        AVG(score::float / total_questions * 100) as average_score,
        SUM(score) as total_correct,
        SUM(total_questions) as total_questions
      FROM quiz_results 
      WHERE user_id = $1`,
      [userId]
    );

    res.json({ stats: result.rows[0] });
  } catch (error) {
    console.error('Get quiz stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};