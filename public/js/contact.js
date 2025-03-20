$(function () {

    // Adjust container
    function adjustWidth() {
        const windowWidth = $(window).innerWidth();
        const container = $(".c-container");
        const box = $(".c-flex");
        const item = $(".c-flex-item");
        const input = $(".c-input");

        if (windowWidth > 1000) {
            box.css({ width: "35vw", fontSize: "1.2em" });
            container.css({ marginTop: "3em" });
            item.css({ margin: "0.8em auto" });
            input.css({ height: "3.3em", padding: "0.7em" });
        } else if (windowWidth > 850) {
            box.css({ width: "60vw", fontSize: "1em" });
            container.css({ marginTop: "2.8em" });
            item.css({ margin: "0.65em auto" });
            input.css({ height: "3.1em", padding: "0.6em" });
        } else if (windowWidth > 480) {
            box.css({ width: "75vw", fontSize: "0.7em" });
            container.css({ marginTop: "1.8em" });
            item.css({ margin: "0.55em auto" });
            input.css({ height: "3em", padding: "0.5em" });
        } else if (windowWidth > 350) {
            box.css({ width: "85vw", fontSize: "0.55em" });
            container.css({ marginTop: "1.3em" });
            item.css({ margin: "0.5em auto" });
            input.css({ height: "2.5em", padding: "0.4em" });
        } else {
            box.css({ width: "95vw", fontSize: "0.45em" });
            container.css({ marginTop: "0.5em" });
            item.css({ margin: "0.3em auto" });
            input.css({ height: "1.8em", padding: "0.3em" });
        }
    }

    adjustWidth();
    $(window).on("resize orientationchange", adjustWidth);

    function adjustImage() {
        let bg = $("body"); 
        bg.css({
            "background-repeat": "no-repeat",
            "background-position": "center center",
            "background-size": "cover",
        });
    }

    adjustImage();
    $(window).on("resize orientationchange", adjustImage);








    // Input Styling  
    const input = $(".c-input");
    input.css({ borderRadius: "1em", textAlign: "center" });

    input.on("mouseenter focus", function () {
        $(this).css({
            cursor: "pointer",
            border: "2px solid rgb(197, 253, 253)",
            transform: "scale(1.025)",
            transition: "transform 0.2s ease, border-color 0.3s ease",
        });
    });

    input.on("mouseleave blur", function () {
        $(this).css({
            border: "2px solid transparent",
            transform: "scale(1)",
            transition: "transform 0.2s ease, border-color 0.3s ease",
        });
    });

    // Form Validation
    $(document).on("submit", "#contact-form", function (event) {
        const email = $("#c-email");
        const issue = $("#c-issue");
        let isValid = true;

        // Issue Validation
        if (!issue.val().trim()) {
            issue.val("");
            issue.attr("placeholder", "This field is required")
                 .css({ borderColor: "red" });
            isValid = false;
        }

        // Email Validation
        const emailVal = email.val().trim();
        if (!emailVal) {
            email.val("");
            email.attr("placeholder", "This field is required")
                 .css({ borderColor: "#F26262" });
            isValid = false;
        } else if (!emailVal.includes("@gmail.com") || emailVal.length < 11) {
            email.val("");
            email.val("").attr("placeholder", "Enter valid email")
                 .css({ borderColor: "#F26262" });
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        } else {
            alert("Submitted successfully");
        }
    });

});
