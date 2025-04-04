document.addEventListener("DOMContentLoaded", function () {

    // adjust body background
    function adjustImage() {
        let bg = document.body;
        Object.assign(bg.style, {
            "backgroundImage": 'url("/images/about.webp")',
            "height": "auto",
            "minHeight": "100dvh",
            "display": "flex",
            "flexDirection": "column",
            "backgroundRepeat": "no-repeat",
            "backgroundPosition": "center center",
            "backgroundSize": "cover",
        });
    }

    adjustImage();
    window.addEventListener("resize", adjustImage);
    window.addEventListener("orientationchange", adjustImage);

    function adjustStyles() {
        let screenWidth = window.innerWidth;

        let boxes = document.querySelectorAll('.box');
        boxes.forEach(function (box) {
            if (screenWidth < 600) {
                box.style.fontSize = '0.9em';
                box.style.padding = '0.3em';
                box.style.lineHeight = '1.7em';
                box.style.margin = '0.5em 0px';

                let icons = document.querySelectorAll(".social-icons img");
                icons.forEach(function (icon) {
                    icon.style.width = '25px';
                    icon.style.height = '25px';
                    icon.style.margin = '5px';
                });

            } else if (screenWidth < 900) {
                box.style.fontSize = '1.2em';
                box.style.padding = '0.5em';
                box.style.lineHeight = '1.8em';
                box.style.margin = '0.7em 0px';

                let icons = document.querySelectorAll(".social-icons img");
                icons.forEach(function (icon) {
                    icon.style.width = '30px';
                    icon.style.height = '30px';
                    icon.style.margin = '7px';
                });

            } else {
                box.style.fontSize = '1.3em';
                box.style.padding = '0.7em';
                box.style.lineHeight = '1.9em';
                box.style.margin = '1em 0px';

                let icons = document.querySelectorAll(".social-icons img");
                icons.forEach(function (icon) {
                    icon.style.width = '35px';
                    icon.style.height = '35px';
                    icon.style.margin = '10px';
                });
            }
        });
    }

    adjustStyles();
    window.addEventListener("resize", adjustStyles);
    window.addEventListener("orientationchange", adjustStyles);

    // Hover effect for social icons
    let socialIcons = document.querySelectorAll(".social-icons img");
    socialIcons.forEach(function (icon) {
        icon.addEventListener("mouseenter", function () {
            icon.style.opacity = "0.7";
            icon.style.cursor = "pointer";
        });
        icon.addEventListener("mouseleave", function () {
            icon.style.opacity = "1";
        });
    });

});
