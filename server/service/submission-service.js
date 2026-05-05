const pool = require('../db');

class SubmissionService {
    async submitAssignment(lessonId, studentId, type, content) {
        const newSubmission = await pool.query(
            `INSERT INTO submissions (lesson_id, student_id, type, content) VALUES ($1, $2, $3, $4) RETURNING *`,
            [lessonId, studentId, type, content]
        );
        return newSubmission.rows[0];
    }

    async getSubmissionsByLesson(lessonId) {
        const submissions = await pool.query(
            `SELECT s.*, u.full_name as student_name 
             FROM submissions s 
             JOIN users u ON s.student_id = u.id 
             WHERE s.lesson_id = $1`,
            [lessonId]
        );
        return submissions.rows;
    }

    async getStudentSubmission(lessonId, studentId) {
        const submission = await pool.query(
            `SELECT * FROM submissions WHERE lesson_id = $1 AND student_id = $2`,
            [lessonId, studentId]
        );
        return submission.rows[0];
    }
}

module.exports = new SubmissionService();
