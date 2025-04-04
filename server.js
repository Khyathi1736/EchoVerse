import express from 'express';
import session from 'express-session';
import { fetchEmails, insertNewUser, fetchPasswords, findFnameIdbyEmail, allPosts, findMyPosts, trendingPosts, userReactions, updateReactions, deletePost, addPost } from "./config/db.js";

const app = express();
const port = 3000;


async function fetchAllPostsMiddleware(req, res, next) {
    try {
        res.locals.posts = await allPosts();
    }
    catch (err) {
        console.log("error occured while fetching posts", err);
        res.locals.posts = [];
    }
    next();
}

async function fetchUserReactionsMiddleware(id) {
    try {
        if (id) {
            const result = userReactions(id);
            return result;
        }
        else {
            return [];
        }
    } catch (err) {
        console.log("error while fetching user reactions", err);
    }
}
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// session middleware to track users login and logout.
app.use(session({
    secret: '12346789',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fetchAllPostsMiddleware);

// default route
app.get("/", async (req, res) => {
    let user_reactions = await fetchUserReactionsMiddleware(req.session.userId);
    res.render("./home.ejs", { fName: req.session.fName || '', userId: req.session.userId || '', reactions: user_reactions, posts: res.locals.posts });
});

// after clicked signin in home page
app.get("/signin", async (req, res) => {
    // find existing usernames and passwors.
    const emails = await fetchEmails();
    const passwords = await fetchPasswords();

    // verify entered details if correct redirect to home page else show error.
    res.render("./signin.ejs", { userMails: emails, userPasswords: passwords });
});

// after clicked signup in login page
app.get("/signup", async (req, res) => {
    const emails = await fetchEmails();
    console.log(emails);
    res.render("./signup.ejs", { userMails: emails });
});

app.get("/home", (req, res) => {
    res.redirect("/");
});
// after clicked signin in signin page to redirect to home page
app.post("/home", async (req, res) => {

    const email = req.body.email;
    const result = await findFnameIdbyEmail(email);
    // Store first name,user id in session so now we can use that in any route.
    req.session.fName = result[0];
    req.session.userId = result[1];
    res.redirect("/");
});
app.get("/myposts", async (req, res) => {
    const myPosts = await findMyPosts(req.session.userId);
    let user_reactions = await fetchUserReactionsMiddleware(req.session.userId);
    res.render("./myposts.ejs", { fName: req.session.fName || '', userId: req.session.userId || '', myPosts: myPosts, reactions: user_reactions });
});
app.get("/trending-posts", async (req, res) => {
    const trending_posts = await trendingPosts();
    let user_reactions = await fetchUserReactionsMiddleware(req.session.userId);
    res.render("./trendingposts.ejs", { fName: req.session.fName || '', userId: req.session.userId || '', trending_posts: trending_posts, reactions: user_reactions });
});
app.get("/about", (req, res) => {
    res.render("./about.ejs", { fName: req.session.fName || '' });
});
app.get("/contact", (req, res) => {
    res.render("./contact.ejs", { fName: req.session.fName || '' || '' });
});


// after clicked signup in signup page to go to login page to login
app.post("/signin", async (req, res) => {
    // open database and insert new user data
    const newData = req.body;
    try {
        await insertNewUser(newData['fname'], newData['lname'], newData['mail'], newData['password']);
        res.redirect("/signin?message=successful");
    }
    catch (err) {
        console.log("error!!", err);
        res.redirect("/signin?message=error");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        }
        res.redirect("/home");
    });
});


app.post("/post-issue", (req, res) => {
    res.redirect("/contact");
})

// updating likes and dislikes
app.post("/update-reactions", async (req, res) => {
    const { user_id, post_id, likes, dislikes, action } = req.body;
    try {
        if (action === "like") {
            const newReactions = await updateReactions(user_id, post_id, likes, dislikes, "like");
            return res.json({ success: true, newLikes: newReactions[0], newDislikes: newReactions[1] });
        } else if (action === "dislike") {
            const newReactions = await updateReactions(user_id, post_id, likes, dislikes, "dislike");
            return res.json({ success: true, newLikes: newReactions[0], newDislikes: newReactions[1] });
        }
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
});

app.post("/delete-post", async (req, res) => {
    const { userId, postId } = req.body;
    try {
        const result = await deletePost(userId, postId);
        return res.json({ success: result });

    } catch (error) {
        console.log("error occured while deleting post in server route", err);
        return res.json({ success: false });
    }

})

app.post("/add-post", async (req, res) => {
    try {
        const { category, title, content } = req.body;
        let userId = req.session.userId;
        let userName = req.session.fName;
        const formattedDate= getFormattedDate();

        // adding new_post in database.
        const result = await addPost(userId, userName, category, title, content, formattedDate);
        return res.json({ success: true })
    } catch (err) {
        return res.json({ success: false })
    }

})






app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});