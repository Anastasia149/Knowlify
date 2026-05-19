const pool = require('../db');
const ApiError = require('../exceptions/api-error');

class SubmissionService {
    async submitAssignment(lessonId, studentId, type, content, items) {
        let storedType = type;
        let storedContent = content || '';

        if (Array.isArray(items) && items.length > 0) {
            const normalized = items
                .map((item) => ({
                    type: item.type,
                    content: String(item.content || '').trim(),
                    label: item.label ? String(item.label).trim() : undefined,
                }))
                .filter(
                    (item) =>
                        item.content &&
                        (item.type === 'link' || item.type === 'file')
                );

            if (normalized.length === 0) {
                throw ApiError.BadRequest('Нет корректных вложений для отправки');
            }

            storedContent = JSON.stringify({ items: normalized });
            const types = new Set(normalized.map((item) => item.type));
            storedType = types.size === 1 ? [...types][0] : 'mixed';
        }

        const newSubmission = await pool.query(
            `INSERT INTO submissions (lesson_id, student_id, type, content) VALUES ($1, $2, $3, $4) RETURNING *`,
            [lessonId, studentId, storedType, storedContent]
        );
        return newSubmission.rows[0];
    }

    async getSubmissionsByLesson(lessonId) {
        const submissions = await pool.query(
            `SELECT s.*, COALESCE(NULLIF(TRIM(u.name), ''), u.email, 'Ученик') AS student_name
             FROM submissions s
             JOIN users u ON u.id = s.student_id
             WHERE s.lesson_id = $1
             ORDER BY s.created_at DESC`,
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

    async deleteStudentSubmission(lessonId, studentId) {
        const result = await pool.query(
            `DELETE FROM submissions WHERE lesson_id = $1 AND student_id = $2 RETURNING id`,
            [lessonId, studentId]
        );
        return result.rowCount > 0;
    }

    async updateReviewStatus(submissionId, teacherId, status) {
        const allowed = ['passed', 'failed'];
        if (!allowed.includes(status)) {
            throw ApiError.BadRequest('Недопустимый статус проверки');
        }

        const result = await pool.query(
            `UPDATE submissions s
             SET review_status = $1
             FROM lessons l
             JOIN courses c ON c.id = l.course_id
             WHERE s.id = $2
               AND s.lesson_id = l.id
               AND c.author_id = $3
             RETURNING s.*`,
            [status, submissionId, teacherId]
        );

        if (result.rowCount === 0) {
            throw new ApiError(404, 'Работа не найдена или нет доступа');
        }

        return result.rows[0];
    }
}

module.exports = new SubmissionService();
