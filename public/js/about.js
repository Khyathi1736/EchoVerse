$(function () {

    // adjust body background
    function adjustImage() {
        let bg = $("body");
        bg.css({
            "background-image": 'url("/images/about.webp")',
            "height": "auto",
            "min-height": "100dvh",
            "display": "flex",
            "flex-direction": "column",
            "background-repeat": "no-repeat",
            "background-position": "center center",
            "background-size": "cover",
        });
    }

    adjustImage();
    $(window).on("resize orientationchange", adjustImage);

    function adjustStyles() {
        let screenWidth = $(window).width();
    
        $('.box').each(function () {
            if (screenWidth < 600) {
                $(this).css({
                    'font-size': '0.9em',
                    'padding': '0.3em',
                    'line-height': '1.7em',
                    'margin': '0.5em 0px'
                });
    
                $(".social-icons img").css({
                    'width': '25px',
                    'height': '25px',
                    'margin': '5px'
                });
    
            } else if (screenWidth < 900) {
                $(this).css({
                    'font-size': '1.2em',
                    'padding': '0.5em',
                    'line-height': '1.8em',
                    'margin': '0.7em 0px'
                });
    
                $(".social-icons img").css({
                    'width': '30px',
                    'height': '30px',
                    'margin': '7px'
                });
    
            } else {
                $(this).css({
                    'font-size': '1.3em',
                    'padding': '0.7em',
                    'line-height': '1.9em',
                    'margin': '1em 0px'
                });
    
                $(".social-icons img").css({
                    'width': '35px',
                    'height': '35px',
                    'margin': '10px'
                });
            }
        });
    }    
    adjustStyles();
    $(window).on("resize orientationchange",adjustStyles);

    // Hover effect for social icons
    $(".social-icons img").on("mouseenter", function () {
        $(this).css(
            {
                "opacity": "0.7",
                "cursor":"pointer",
            });
    }).on("mouseleave", function () {
        $(this).css("opacity", "1");
    });
    
})