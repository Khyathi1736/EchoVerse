import pkg from 'pg';
const { Pool } = pkg; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required for cloud-hosted databases
    },
  });

async function fetchEmails() {
    try {
        const result = await pool.query("SELECT email FROM users");
        return result.rows.map(ele => ele['email']);
    } catch (err) {
        console.error("Error fetching emails:", err);
    }
}

async function insertNewUser(fn, ln, em, ps) {
    try {
        await pool.query(
            `INSERT INTO users(fname, lname, email, password) 
             VALUES($1, $2, $3, $4)`,
            [fn, ln, em, ps]
        );
    } catch (err) {
        console.error("Error inserting new user:", err);
    }
}

async function fetchPasswords() {
    try {
        const result = await pool.query('SELECT password FROM users');
        return result.rows.map(ele => ele['password']);
    } catch (err) {
        console.error("Error fetching passwords:", err);
    }
}

async function findFnameIdbyEmail(email) {
    try {
        const result = await pool.query("SELECT fname, user_id FROM users WHERE email=$1", [email]);
        if (result.rows.length > 0) {
            return [result.rows[0].fname, result.rows[0].user_id];
        }
        return null;
    } catch (err) {
        console.error("Error fetching user details:", err);
    }
}

async function allPosts() {
    try {
        const result = await pool.query(`
            SELECT 
                p.post_id, p.user_id, p.user_name, p.post_category,
                p.post_title, p.post_content, p.post_date,
                COALESCE(SUM(CASE WHEN pr.reaction_type = 'like' THEN 1 ELSE 0 END), 0) AS post_likes,
                COALESCE(SUM(CASE WHEN pr.reaction_type = 'dislike' THEN 1 ELSE 0 END), 0) AS post_dislikes
            FROM posts p
            LEFT JOIN post_reactions pr ON p.post_id = pr.post_id
            GROUP BY p.post_id
            ORDER BY p.post_date DESC
        `);
        return result.rows;
    } catch (err) {
        console.error("Error fetching posts:", err);
    }
}

async function userReactions(user_id) {
    try {
        const response = await pool.query("SELECT * FROM post_reactions WHERE user_id=$1", [user_id]);
        return response.rows;
    } catch (err) {
        console.error("Error fetching user reactions:", err);
    }
}

async function updateReactions(userId, postId, likes, dislikes, action) {
    try {
        const userReactionsList = await userReactions(userId);
        const existingReaction = userReactionsList.find(obj => obj.post_id == postId);

        if (existingReaction) {
            if (existingReaction.reaction_type === action) {
                await pool.query('DELETE FROM post_reactions WHERE user_id=$1 AND post_id=$2', [userId, postId]);
                return action === "like" ? [likes - 1, dislikes] : [likes, dislikes - 1];
            } else {
                await pool.query('UPDATE post_reactions SET reaction_type=$1 WHERE user_id=$2 AND post_id=$3',
                    [action, userId, postId]);
                return action === "like" ? [likes + 1, dislikes - 1] : [likes - 1, dislikes + 1];
            }
        } else {
            await pool.query('INSERT INTO post_reactions(user_id, post_id, reaction_type) VALUES ($1, $2, $3)',
                [userId, postId, action]);
            return action === "like" ? [likes + 1, dislikes] : [likes, dislikes + 1];
        }
    } catch (err) {
        console.error("Error updating reactions:", err);
    }
}

async function addPost(userId, userName, category, title, content, date) {
    try {
        await pool.query('INSERT INTO posts(user_id, user_name, post_category, post_title, post_content, post_date) VALUES($1, $2, $3, $4, $5, $6)', 
            [userId, userName, category, title, content, date]);
        return true;
    } catch (err) {
        console.error("Error inserting new post:", err);
        return false;
    }
}

async function deletePost(userId, postId) {
    try {
        await pool.query('DELETE FROM posts WHERE user_id=$1 AND post_id=$2', [userId, postId]);
        return true;
    } catch (err) {
        console.error("Error deleting post:", err);
        return false;
    }
}

export { fetchEmails, insertNewUser, fetchPasswords, findFnameIdbyEmail, allPosts, userReactions, updateReactions, deletePost, addPost };
