$(function () {
    async function updateReactions(userId, postId, existingLikes, existingDislikes, action) {
        try {
            const response = await fetch("/update-reactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, post_id: postId, likes: existingLikes, dislikes: existingDislikes, action: action }),
            });

            const data = await response.json();
            if (data.success) {
                let postElement = $(`.post`).filter(function () {
                    return $(this).find(".post_id").text().trim() == postId;
                });
                postElement.find("#like_num").text(data.newLikes);
                postElement.find("#dislike_num").text(data.newDislikes);

            }
        } catch (error) {
            console.error("Error updating vote:", error);
        }
    }
    async function deletePost(userId, postId) {
        try {
            const response = await fetch("/delete-post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId, postId: postId }),
            });

            const result = await response.json();
            if (result.success) {
                let postElement = $(`.post`).filter(function () {
                    return $(this).find(".post_id").text().trim() == postId;
                });
                postElement.remove();
                setTimeout(() => {
                    window.alert("Post deleted successfully");
                }, 100);
            }


        } catch (err) {
            console.log("error occured while deleting post", err);
        }
    }

    async function addPost(category, title, content) {
        try {
            // sending request to server to update in db.
            const response = await fetch("/add-post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: category, title: title, content: content }),
            });
            result=await response.json();
            if (!result.success){
                console.log("error while adding new post");
            }
        } catch (err) {
            console.log("error occurred while adding post", err);
        }
    }

    function adjustLayout() {
        var windowWidth = $(window).width();
        const newPostBtn = $(".btn-background");
        var titleFontSize, popupWidth;

        // Determine the title font size based on the window width
        if (windowWidth >= 1201) {
            titleFontSize = "2em";
            popupWidth = "45%";
        } else if (windowWidth >= 750 && windowWidth < 1200) {
            titleFontSize = "1.8em";
            popupWidth = "55%";
        } else if (windowWidth >= 450 && windowWidth < 750) {
            titleFontSize = "1.5em";
            popupWidth = "65%";
        } else if (windowWidth >= 320 && windowWidth < 450) {
            titleFontSize = "1.3em";
            popupWidth = "75%";
        } else {
            titleFontSize = "1.1em";
            popupWidth = "80%";
        }

        // Apply font size and popup width
        $(".title").css("font-size", titleFontSize);
        $(".new_post_popup").css({
            "width": popupWidth,
            "position": "fixed",
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%, -50%)"
        });

        // Adjust layout for posts based on window width
        if (windowWidth >= 1201) {
            $(".posts").css({ "margin": "2em auto", "padding": "0 2em" });
            $(".post").css({ "font-size": "1.5em", "margin": "1.3em auto", "padding": "1em", "width": "80%", "margin-bottom": "2em" });
            $(".delete-icon,.edit-icon,.add-icon").css({ "width": "25px", "height": "25px" });
            $(".delete-btn,.edit-btn,.add-btn").css({ "padding": "10px", "margin": "5px" });
            $(".icons").css({ "top": "17px", "right": "10px" });
        } else if (windowWidth >= 750 && windowWidth < 1200) {
            $(".posts").css({ "margin": "1.5em auto", "padding": "0 1.3em" });
            $(".post").css({ "font-size": "1.3em", "margin": "1.8em auto", "padding": "1.3em", "width": "85%", "margin-bottom": "1.5em" });
            $(".delete-icon,.edit-icon,.add-icon").css({ "width": "21px", "height": "21px" });
            $(".delete-btn,.edit-btn,.add-btn").css({ "padding": "10px", "margin": "4.5px" });
            $(".icons").css({ "top": "17px", "right": "10px" });
        } else if (windowWidth >= 450 && windowWidth < 750) {
            $(".posts").css({ "margin": "1em auto", "padding": "0 1.1em" });
            $(".post").css({ "font-size": "1.2em", "margin": "1.5em auto", "padding": "1.1em", "width": "90%", "margin-bottom": "1.3em" });
            $(".delete-icon,.edit-icon,.add-icon").css({ "width": "19px", "height": "19px" });
            $(".delete-btn,.edit-btn,.add-btn").css({ "padding": "7px", "margin": "3.5px" });
            $(".icons").css({ "top": "16px", "right": "10px" });
        } else if (windowWidth >= 350 && windowWidth < 450) {
            $(".posts").css({ "margin": "1em auto", "padding": "0.9em" });
            $(".post").css({ "font-size": "1.1em", "margin": "1.5em auto", "padding": "0.9em", "width": "95%", "margin-bottom": "1em" });
            $(".delete-icon,.edit-icon,.add-icon").css({ "width": "16px", "height": "16px" });
            $(".delete-btn,.edit-btn,.add-btn").css({ "padding": "6px", "margin": "2.5px" });
            $(".icons").css({ "top": "15px", "right": "8px" });
        } else {
            $(".posts").css({ "margin": "1em auto", "padding": "0 0.7em" });
            $(".post").css({ "font-size": "0.8em", "margin": "1.5em auto", "padding": "0.7em", "width": "100%", "margin-bottom": "0.8em" });
            $(".delete-icon,.edit-icon,.add-icon").css({ "width": "11px", "height": "11px" });
            $(".delete-btn,.edit-btn,.add-btn").css({ "padding": "4px", "margin": "2px" });
            $(".icons").css({ "top": "10px", "right": "5px" });
        }

        // Adjust close button size
        let closeBtnSize = windowWidth > 450 ? "35px" : "30px";
        $(".new_post_popup .close-btn").css({
            "width": closeBtnSize,
            "height": closeBtnSize,
            "top": "5px",
            "right": "8px"
        });

        // Adjust add new post button in my_posts page
        newPostBtn.css({
            "width": $(".post").outerWidth(),
            "margin": "auto",
        });
    }

    adjustLayout();
    $(window).on("resize orientationchange", adjustLayout);



    const colors = ["#FF5733", "#FF8C00", "#FF1493", "#32CD32", "#1E90FF", "#8A2BE2", "#FFD700", "#00CED1"];

    $(".category").each(function () {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        $(this).css({
            "color": randomColor,
        });
    });


    // disabling add post button
    $(".btn-background").addClass("displaynone");

    if ($('#signin').text() != "Sign in") {

        // enabling add  post button
        $(".btn-background").removeClass("displaynone");


        const like_button = $(".upvote");
        const dislike_button = $(".downvote");
        like_button.on("mouseover", function () {
            $(this).css({
                cursor: "pointer",
            });
        });
        dislike_button.on("mouseover", function () {
            $(this).css({
                cursor: "pointer",
            });
        });
        $(".upvote").on("click", function () {
            let postElement = $(this).closest(".post");
            let postId = postElement.find(".post_id").text().trim();
            let userId = postElement.find(".user_id").text().trim();
            let likes = parseInt(postElement.find("#like_num").text().trim());
            let dislikes = parseInt(postElement.find("#dislike_num").text().trim());
            let downvote = postElement.find(".downvote");
            if (downvote.hasClass("disliked")) {
                downvote.removeClass("disliked");
            }
            updateReactions(userId, postId, likes, dislikes, "like");
            $(this).toggleClass("liked");
        });

        $(".downvote").on("click", function () {
            let postElement = $(this).closest(".post");
            let postId = postElement.find(".post_id").text().trim();
            let userId = postElement.find(".user_id").text().trim();
            let likes = parseInt(postElement.find("#like_num").text().trim());
            let dislikes = parseInt(postElement.find("#dislike_num").text().trim());
            let upvote = postElement.find(".upvote");
            if (upvote.hasClass("liked")) {
                upvote.removeClass("liked");
            }
            updateReactions(userId, postId, likes, dislikes, "dislike");
            $(this).toggleClass("disliked");
        });

        // display this user reactions for posts they reacted when logged in.
        for (i of reactions) {
            let pid = i['post_id'];
            let reaction = i['reaction_type'];
            let postElement = $(".post_id").filter(function () {
                return $(this).text().trim() == pid;
            });

            if (reaction == 'like') {
                let likeElement = postElement.closest(".post").find(".upvote").first();
                likeElement.addClass("liked");
            }
            else {
                let dislikeElement = postElement.closest(".post").find(".downvote").first();
                dislikeElement.addClass("disliked");
            }
        }

    }
    const $scrollToTopBtn = $("#scrollToTop");

    // Show/hide button on scroll
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 200) {
            $scrollToTopBtn.fadeIn(); // Smoothly show the button
        } else {
            $scrollToTopBtn.fadeOut(); // Smoothly hide the button
        }
    });

    // Scroll to top smoothly on button click
    $scrollToTopBtn.on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, "smooth");
    });

    // Function to adjust button size based on screen width
    function adjustButtonSize() {
        let screenWidth = $(window).width();

        if (screenWidth < 300) {
            $scrollToTopBtn.css({
                width: "35px",
                height: "35px",
                fontSize: "16px",
                bottom: "8px",
                right: "8px",
            });
        } else if (screenWidth < 400) {
            $scrollToTopBtn.css({
                width: "40px",
                height: "40px",
                fontSize: "18px",
                bottom: "10px",
                right: "10px",
            });
        } else if (screenWidth < 600) {
            $scrollToTopBtn.css({
                width: "42px",
                height: "42px",
                fontSize: "19px",
                bottom: "12px",
                right: "12px",
            });
        } else if (screenWidth < 800) {
            $scrollToTopBtn.css({
                width: "45px",
                height: "45px",
                fontSize: "20px",
                bottom: "10px",
                right: "10px",
            });
        } else if (screenWidth < 1000) {
            $scrollToTopBtn.css({
                width: "48px",
                height: "48px",
                fontSize: "22px",
                bottom: "18px",
                right: "18px",
            });
        } else if (screenWidth < 1200) {
            $scrollToTopBtn.css({
                width: "50px",
                height: "50px",
                fontSize: "24px",
                bottom: "20px",
                right: "20px",
            });
        } else {
            $scrollToTopBtn.css({
                width: "55px",
                height: "55px",
                fontSize: "26px",
                bottom: "25px",
                right: "25px",
            });
        }

    }

    // Adjust button size on page load and window resize
    adjustButtonSize();
    $(window).on("resize orientationchange", adjustButtonSize);


    // backend logic triggering when delete button clicked
    let deleteButton = $(".delete-btn");
    deleteButton.on("click", async function () {
        let result = confirm("Do you want to delete this Post?");
        if (result) {
            let postElement = $(this).closest(".post");
            let postId = postElement.find(".post_id").text().trim();
            let userId = postElement.find(".user_id").text().trim();
            await deletePost(userId, postId);
        }
    })


    function adjustPopup() {
        var windowHeight = $(window).height();
        var popup = $(".new_post_popup");

        // Reset styles before applying new ones
        popup.css({
            "max-height": "",
            "overflow-y": "",
            "top": "",
            "transform": ""
        });

        if (popup.outerHeight() > windowHeight) {
            popup.css({
                "top": "50%",
                "transform": "translate(-50%, -50%)",
                "max-height": "90vh", // Limit height to prevent cutoff
                "overflow-y": "auto"  // Enable scrolling
            });
        } else {
            popup.css({
                "top": "50%",
                "transform": "translate(-50%, -50%)",
                "overflow-y": "hidden"
            });
        }
    }
    $(window).on("resize orientationchange", adjustPopup)

    // Prevent background scrolling when popup is open
    function disableBgScroll() {
        $("body").css("overflow", "hidden");
    }

    // Enable background scrolling when popup is closed
    function enableBgScroll() {
        $("body").css("overflow", "auto");
    }

    // Open popup
    $(".add-btn").on("click", function () {
        $(".new_post_popup").fadeIn();
        adjustPopup();
        disableBgScroll();
    });

    // Close popup when clicking close button
    $(".close-btn").on("click", function () {
        $(".new_post_popup").fadeOut();
        enableBgScroll();
    });

    // Close when clicking outside the popup
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".new_post_popup, .add-btn").length) {
            $(".new_post_popup").fadeOut();
            enableBgScroll();
        }
    });


    newPostSubmit = $(".np_submit");
    newPostSubmit.on("click", function () {
        let category = $(".np_category").val().trim();
        let title = $(".np_title").val().trim();
        let content = $(".np_content").val().trim();
        addPost(category, title, content);
    })
});
