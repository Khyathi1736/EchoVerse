import pkg from 'pg';
const { Pool } = pkg; 

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false, // Required for cloud-hosted databases
//     },
//   });

const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"Blogs",
    password:"Khyathi@1736",
    port:5432,
});
pool.connect();


async function fetchEmails() {
    let userMails;
    try {
        const result = await pool.query("select email from users");
        const emails = result.rows;
        userMails = emails.map(ele => ele['email']);
        return userMails;
        // console.log(userMails);
    } catch (err) {
        console.error("some error occured", err);
    };
};

async function insertNewUser(fn, ln, em, ps) {
    await pool.query(
        `insert into users(fname,lname,email,password) 
         values($1,$2,$3,$4)`,
        [fn, ln, em, ps]
    );
};

async function fetchPasswords() {
    let userPasswords;
    try {
        const result = await pool.query('select password from users');
        const passwords = result.rows;
        userPasswords = passwords.map(ele => ele['password']);
        return userPasswords;
        // console.log(userPasswords);

    }
    catch (err) {
        console.log("some error occured", err);
    }
}

async function findFnameIdbyEmail(email) {
    try {
        const result = await pool.query("select fname,user_id from users where email=$1", [email]);
        const details = result.rows[0];
        const fName = details['fname'];
        const Id = details['user_id'];
        return [fName, Id];
    }
    catch (err) {
        console.log("some error occured while fetching fName", err);
    }
}

async function allPosts() {
    try {
        const result = await pool.query(`
            SELECT 
                p.post_id,
                p.user_id,
                p.user_name,
                p.post_category,
                p.post_title,
                p.post_content,
                p.post_date,
                COALESCE(SUM(CASE WHEN pr.reaction_type = 'like' THEN 1 ELSE 0 END), 0) AS post_likes,
                COALESCE(SUM(CASE WHEN pr.reaction_type = 'dislike' THEN 1 ELSE 0 END), 0) AS post_dislikes
            FROM posts p
            LEFT JOIN post_reactions pr ON p.post_id = pr.post_id
            GROUP BY p.post_id, p.user_id, p.user_name, p.post_category, p.post_title, p.post_content, p.post_date
            ORDER BY p.post_date DESC
        `);

        return result.rows;
    } catch (err) {
        console.log("Error occurred while fetching posts", err);
    }
}


async function findMyPosts(id) {
    try {
        if (id) {
            const result = await pool.query(`
                SELECT 
                    p.post_id,
                    p.user_id,
                    p.user_name,
                    p.post_category,
                    p.post_title,
                    p.post_content,
                    p.post_date,
                    COALESCE(SUM(CASE WHEN pr.reaction_type = 'like' THEN 1 ELSE 0 END), 0) AS post_likes,
                    COALESCE(SUM(CASE WHEN pr.reaction_type = 'dislike' THEN 1 ELSE 0 END), 0) AS post_dislikes
                FROM posts p
                LEFT JOIN post_reactions pr ON p.post_id = pr.post_id
                where p.user_id=$1
                GROUP BY p.post_id, p.user_id, p.user_name, p.post_category, p.post_title, p.post_content, p.post_date
                ORDER BY p.post_date DESC 
            `, [id]);
            // console.log(result.rows);
            return result.rows;
        } else {
            return [];
        }
    } catch (err) {
        console.log("Error occurred while fetching this user posts", err);
    }

}

// to get trending posts
async function trendingPosts() {
    try {
        let daysInterval = 7;
        let trendingPosts = [];

        while (trendingPosts.length < 10) {
            const result = await pool.query(`
                SELECT 
                    p.post_id,
                    p.user_id,
                    p.user_name,
                    p.post_category,
                    p.post_title,
                    p.post_content,
                    p.post_date,
                    COALESCE(SUM(CASE WHEN pr.reaction_type = 'like' THEN 1 ELSE 0 END), 0) AS post_likes,
                    COALESCE(SUM(CASE WHEN pr.reaction_type = 'dislike' THEN 1 ELSE 0 END), 0) AS post_dislikes
                FROM posts p
                LEFT JOIN post_reactions pr ON p.post_id = pr.post_id
                WHERE p.post_date >= NOW() - INTERVAL '${daysInterval} days'
                GROUP BY p.post_id, p.user_id, p.user_name, p.post_category, p.post_title, p.post_content, p.post_date
                ORDER BY post_likes DESC, p.post_date DESC
                LIMIT 10;
            `);

            trendingPosts = result.rows;
            if (trendingPosts.length >= 10) break; // Stop if we have 10 posts
            daysInterval += 7; // Extend by another 7 days
        }

        return trendingPosts;
    } catch (err) {
        console.error("Error while fetching trending posts:", err);
        return [];
    }
}




// to get user reactions when logged in.
async function userReactions(user_id) {
    let response = await pool.query("select * from post_reactions where user_id=$1", [user_id]);
    let result = response.rows;
    return result;
}


// Function to update like count
async function updateReactions(userId, postId, likes, dislikes, action) {
    console.log("fun called");
    try {
        const user_reactions = await userReactions(userId);
        let existingReaction = user_reactions.find(obj => obj.post_id == postId);

        if (existingReaction) {
            console.log("reaction found")
            if (existingReaction.reaction_type == action) {
                console.log("reaction found of same type")
                // Same reaction: User is toggling off their reaction
                await pool.query('DELETE FROM post_reactions WHERE user_id=$1 AND post_id=$2', [userId, postId]);
                if (action == "like") {
                    return [likes - 1, dislikes];
                }
                else {
                    return [likes, dislikes - 1];
                }
            } else {
                console.log("reaction found of diferent type")
                // Opposite reaction exists: User is switching reaction types
                await pool.query('UPDATE post_reactions SET reaction_type=$1 WHERE user_id=$2 AND post_id=$3',
                    [action, userId, postId]);
                // For the new reaction type, count should be increased by one and old reaction should decreased by one.

                if (action == "like") {
                    return [likes + 1, dislikes - 1];
                }
                else {
                    return [likes - 1, dislikes + 1];
                }
            }
        } else {
            console.log("no reaction found");
            // No reaction exists add new reaction and increment reaction count.
            await pool.query('INSERT INTO post_reactions(user_id, post_id, reaction_type) VALUES ($1, $2, $3)',
                [userId, postId, action]);
            if (action == "like") {
                return [likes + 1, dislikes];
            }
            else {
                return [likes, dislikes + 1];
            }
        }
    } catch (err) {
        console.log("Some error occurred", err);
    }
}

async function addPost(userId, userName, category, title, content, date) {
    try {
        const result = await pool.query('insert into posts(user_id,user_name,post_category,post_title,post_content,post_date) values($1,$2,$3,$4,$5,$6)', [userId, userName, category, title, content, date]);
        return true;
    } catch (err) {
        console.log("error occurred while inserting new post", err);
        return false;
    }
}

async function deletePost(userId, postId) {
    try {
        const result = await pool.query('delete from posts where user_id=$1 and post_id=$2', [userId, postId]);
        return true;
    }
    catch (err) {
        console.log("error occured while deleting post", err);
        return false;
    }
}


export { fetchEmails, insertNewUser, fetchPasswords, findFnameIdbyEmail, allPosts, findMyPosts, trendingPosts, userReactions, updateReactions, deletePost, addPost };

