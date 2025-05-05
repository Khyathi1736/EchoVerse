document.addEventListener("DOMContentLoaded", function () {

    // Adjust container
    function adjustWidth() {
        const windowWidth = window.innerWidth;
        const container = document.querySelector(".c-container");
        const box = document.querySelector(".c-flex");
        const items = document.querySelectorAll(".c-flex-item");
        const inputs = document.querySelectorAll(".c-input");

        if (windowWidth > 1000) {
            box.style.width = "35vw";
            box.style.fontSize = "1.2em";
            container.style.marginTop = "3em";
            items.forEach(item => item.style.margin = "0.8em auto");
            inputs.forEach(input => {
                input.style.height = "3.3em";
                input.style.padding = "0.7em";
            });
        } else if (windowWidth > 850) {
            box.style.width = "60vw";
            box.style.fontSize = "1em";
            container.style.marginTop = "2.8em";
            items.forEach(item => item.style.margin = "0.65em auto");
            inputs.forEach(input => {
                input.style.height = "3.1em";
                input.style.padding = "0.6em";
            });
        } else if (windowWidth > 480) {
            box.style.width = "75vw";
            box.style.fontSize = "0.7em";
            container.style.marginTop = "1.8em";
            items.forEach(item => item.style.margin = "0.55em auto");
            inputs.forEach(input => {
                input.style.height = "3em";
                input.style.padding = "0.5em";
            });
        } else if (windowWidth > 350) {
            box.style.width = "85vw";
            box.style.fontSize = "0.55em";
            container.style.marginTop = "1.3em";
            items.forEach(item => item.style.margin = "0.5em auto");
            inputs.forEach(input => {
                input.style.height = "2.5em";
                input.style.padding = "0.4em";
            });
        } else {
            box.style.width = "95vw";
            box.style.fontSize = "0.45em";
            container.style.marginTop = "0.5em";
            items.forEach(item => item.style.margin = "0.3em auto");
            inputs.forEach(input => {
                input.style.height = "1.8em";
                input.style.padding = "0.3em";
            });
        }
    }

    adjustWidth();
    window.addEventListener("resize", adjustWidth);
    window.addEventListener("orientationchange", adjustWidth);

    function adjustImage() {
        const bg = document.body;
        bg.style.backgroundRepeat = "no-repeat";
        bg.style.backgroundPosition = "center center";
        bg.style.backgroundSize = "cover";
    }

    adjustImage();
    window.addEventListener("resize", adjustImage);
    window.addEventListener("orientationchange", adjustImage);

    // Input Styling  
    const inputElems = document.querySelectorAll(".c-input");
    inputElems.forEach(input => {
        input.style.borderRadius = "1em";
        input.style.textAlign = "center";

        input.addEventListener("mouseenter", function () {
            input.style.cursor = "pointer";
            input.style.border = "2px solid rgb(197, 253, 253)";
            input.style.transform = "scale(1.025)";
            input.style.transition = "transform 0.2s ease, border-color 0.3s ease";
        });

        input.addEventListener("focus", function () {
            input.style.cursor = "pointer";
            input.style.border = "2px solid rgb(197, 253, 253)";
            input.style.transform = "scale(1.025)";
            input.style.transition = "transform 0.2s ease, border-color 0.3s ease";
        });

        input.addEventListener("mouseleave", function () {
            input.style.border = "2px solid transparent";
            input.style.transform = "scale(1)";
            input.style.transition = "transform 0.2s ease, border-color 0.3s ease";
        });

        input.addEventListener("blur", function () {
            input.style.border = "2px solid transparent";
            input.style.transform = "scale(1)";
            input.style.transition = "transform 0.2s ease, border-color 0.3s ease";
        });
    });

    // Form Validation
    document.addEventListener("submit", function (event) {
        const form = event.target;
        if (form.id === "contact-form") {
            const email = document.getElementById("c-email");
            const issue = document.getElementById("c-issue");
            let isValid = true;

            // Issue Validation
            if (!issue.value.trim()) {
                issue.value = "";
                issue.placeholder = "This field is required";
                issue.style.borderColor = "red";
                isValid = false;
            }

            // Email Validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailVal = email.value.trim();
            if (!emailVal) {
                email.value = "";
                email.placeholder = "This field is required";
                email.style.borderColor = "#F26262";
                isValid = false;
                    
            } else if (!emailPattern.test(emailVal.trim())){
                email.value = "";
                email.placeholder = "Enter valid email";
                email.style.borderColor = "#F26262";
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                alert("Thanks for reaching out! We’ll get back to you soon.");
            }
        }
    });

});
