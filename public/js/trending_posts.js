document.addEventListener('DOMContentLoaded', function () {
    const colours = [
      "rgba(255, 215, 0, 0.7)",
      "#ADD8E6",  // 2nd - Light Blue (Soft & Clear)
      "#F4A460",  // 3rd - SandyBrown (Warm & Elegant)
      "#FFA07A",  // 4th - Light Salmon (Soft Orange)
      "#FF69B4",  // 6th - Hot Pink (Vibrant but Light)
      "#DDA0DD",  // 7th - Plum (Soft & Elegant Purple)
      "#FFB6C1",  // 5th - Light Pink (Gentle & Stylish)
      "#D4A373",  // 8th - Light Brown (Subtle & Elegant)
      "#C3B1E1",  // 9th - Soft Lavender (Calm & Modern)
      "#8FA6B2"   // 10th - Muted Steel Blue (Cool, Calm, and Distinct)
    ];
  
    const posts = document.querySelectorAll(".posts .post");
    posts.forEach(function (post, index) {
      if (index < 10) {
        post.style.boxShadow = `0px 0px 20px 10px ${colours[index]}`;
      }
    });
  });
  