
// ensuring dom is loaded properly.
$(function(){
    
// to adjust container accoring to height.
function adjustHeight(){
    const windowHeight=window.innerHeight;
    const containerHeight=$(".flex").innerHeight();
    if(windowHeight>=containerHeight){
        let t=windowHeight-containerHeight
        $(".container").css("margin-top",t/2)
    }
    else{
        $(".container").css("margin-top","0.5em");
        $(".container").css("margin-bottom","0.5em");
    }
}
adjustHeight();
$(window).on('resize orientationchange',adjustHeight);

// to adjust container according to width
function adjustWidth(){
    const windowWidth=window.innerWidth;
    const container=$(".flex");
    if (windowWidth>1000){
        container.css("width","30vw");
    }
    else if (windowWidth<=1000 && windowWidth>850){
        container.css("width","60vw")
    }
    else if (windowWidth<=850 && windowWidth>480){
        container.css("width","80vw")
    }
    else if (windowWidth<470){
        container.css("width","90vw")
    }
    else{
        container.css("width","98vw")
    }
}
adjustWidth();
$(window).on('resize orientationchange',adjustWidth);


// input styling


const input=$("input");
input.on('mouseenter focus',function(){
    $(this).css({
       cursor:"pointer",
       border:"2px solid #fab078",
       borderRadius:"1em",
       transform:"scale(1.025)",
       transition: "transform 0.2s ease, border-color 0.3s ease",
    });
});

input.on('mouseleave blur',function(){
        $(this).css({
            border: "2px solid transparent",
            transform: "scale(1)",
            transition: "transform 0.2s ease, border-color 0.3s ease",
        }); 
});


$("h1").addClass("orange-color");
$("#signin").addClass("bg-orange text-center");
$("#signup").addClass("bg-orange text-center");
$(".container").addClass("border-radius");
$("input").addClass("border-radius");
$("#signin").addClass("bg-orange");

});

