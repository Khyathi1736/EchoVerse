$(function () {
    const navbar = $(".navbar");
    const navitems = $(".nav-items");
    const navitem = $(".nav-item");
    const logo = $(".logo");
    const signin = $(".signin");
    const footer = $(".footer");
    const menuItems = $(".dropdown-item");

    function adjustWidth() {
        const windowWidth = window.innerWidth;

        let navbarStyles = {};
        let navitemStyles = {};
        let logoStyles = {};
        let signinStyles = {};
        let footerStyles = {};
        let navitemsStyles = {};
        let dropdownStyles = {};

        if (windowWidth > 1200) {
            navbarStyles = { padding: "0em 0.4em" };
            navitemStyles = { padding: "0px 1.6em", fontSize: "1.2em" };
            logoStyles = { width: "70px", height: "70px", margin: "0.5em 0em" };
            signinStyles = { width: "5em", fontSize: "1em" };
            footerStyles = { fontSize: "1.2em", padding: "1em" };
            dropdownStyles = { margin: "0.5em 0px", padding: "0.5em", fontSize: "1.2em" }
        } else if (windowWidth > 750) {
            navbarStyles = { padding: "0em 0.3em" };
            navitemStyles = { padding: "0px 1.2em", fontSize: "1em" };
            logoStyles = { width: "50px", height: "50px", margin: "0.3em 0em" };
            signinStyles = { width: "5em", fontSize: "0.7em" };
            footerStyles = { fontSize: "1em", padding: "0.8em" };
            dropdownStyles = { margin: "0.35em 0px", padding: "0.35em", fontSize: "1em" }
        } else if (windowWidth > 450) {
            navbarStyles = { padding: "0em 0.2em" };
            navitemStyles = { padding: "0px 0.7em", fontSize: "0.6em" };
            logoStyles = { width: "35px", height: "35px", margin: "0.2em 0em" };
            signinStyles = { width: "4em", fontSize: "0.55em" };
            footerStyles = { fontSize: "0.6em", padding: "0.6em" };
            dropdownStyles = { margin: "0.25em 0px", padding: "0.25em", fontSize: "0.6em" }
        } else if (windowWidth > 320) {
            navbarStyles = {};
            navitemStyles = { padding: "0px 0.45em", fontSize: "0.55em" };
            logoStyles = { width: "20px", height: "20px", margin: "0.15em 0em" };
            signinStyles = { width: "5em", fontSize: "0.5em" };
            footerStyles = { fontSize: "0.55em", padding: "0.5em" };
            dropdownStyles = { margin: "0.15em 0px", padding: "0.2em", fontSize: "0.55em" }
        } else {
            navbarStyles = {};
            navitemStyles = { padding: "0px 0.4em", fontSize: "0.1em" };
            logoStyles = { width: "10px", height: "10px", margin: "0.1em 0em" };
            signinStyles = { width: "10em", fontSize: "0.1em" };
            footerStyles = { fontSize: "0.1em", padding: "0.3em" };
            navitemsStyles = { paddingLeft: "0px", marginLeft: "0px" };
            dropdownStyles = { margin: "0.1em 0px", padding: "0.1em", fontSize: "0.1em" }
        }

        navbar.css(navbarStyles);
        navitem.css(navitemStyles);
        logo.css(logoStyles);
        signin.css(signinStyles);
        footer.css(footerStyles);
        navitems.css(navitemsStyles);
        menuItems.css(dropdownStyles);

    };
    adjustWidth();
    $(window).on('resize orientationchange', adjustWidth);

    const signIn = $("#signin");
    const menu = $(".dropdown-menu");

    function adjustButton() {
        const fName = JSON.parse(document.getElementById("fName").textContent || '""');
        if (fName) {
            const size = $(".navbar").outerHeight();
            signIn.text(fName[0].toUpperCase()).css({
                height: size / 2,
                width: size / 2,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "1em",
                overflow: "hidden",
            });

            // enabling logout button
            signIn.off("click").on("click", function () {
                const position = $(signIn).offset();
                const height = $(signIn).outerHeight();
                const menuWidth = menu.outerWidth();
                menu.css({
                    position:"absolute",
                    display: menu.is(":visible") ? "none" : "block",
                    left: (position.left - menuWidth) + "px",
                    top: (position.top + height) + "px",
                });
            });

            let menuItem = $(".dropdown-item");
            menuItem.off("click").on("click", function () {
                window.location.href = "/logout";
            });
            menuItem.on("mouseenter", function () {
                menu.css({
                    cursor: "pointer",
                });
            });
        }
        else {
            signIn.off("click").on("click", function () {
                window.location.href = "/signin";
            });
        }
    };

    $(window).on("click", function (e) {
        if (!$(e.target).closest("#signin, .dropdown-menu").length) {
            $(".dropdown-menu").hide();
        }
    });

    signIn.on("mouseenter", function () {
        signIn.css({
            cursor: "pointer",
            boxShadow: "0 0 10px black",
        });
    });
    signIn.on("mouseleave", function () {
        signIn.css({
            boxShadow: "0px 0px"
        })
    })
    adjustButton();
    $(window).on('resize orientationchange', function () {
        menu.hide();
        adjustButton();
    });
})


