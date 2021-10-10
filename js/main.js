// JavaScript Document

//-------------scroll-----------------
$(document).ready(function () {
  // scroll-to-anchor
  $("a[href*=#]").click(function () {
    var target = $(this.hash);
    //$(this).text(target.length+"/");
    if (target) {
      var targetOffset = target.offset().top;
      $("html,body").animate(
        { scrollTop: targetOffset },
        400,
        "easeInOutQuart"
      );
      return false;
    }
  });

  // back-to-top
  $("#back-top").hide();
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        $("#back-top").fadeIn();
      } else {
        $("#back-top").fadeOut();
      }
    });

    $("#back-top a").click(function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        400,
        "easeInOutQuart"
      );
      return false;
    });
  });

  // window.close
  $("li.close a").click(function () {
    window.close();
    return false;
  });
});

//-------------menu-----------------
(function ($) {
  $(function () {
    var nav = $("#menu-bar");
    var info = $("#info");
    var navTop = nav.offset().top;
    $(window).scroll(function () {
      var winTop = $(this).scrollTop();
      if (winTop >= navTop) {
        nav.addClass("fixed");
      } else if (winTop <= navTop) {
        nav.removeClass("fixed");
      }
    });
    // Nav Toggle Button
    $("#nav-toggle").click(function () {
      nav.toggleClass("open");
    });
    $("#menu-nav li a").click(function () {
      nav.removeClass("open");
    });
  });
})(jQuery);

//-------------animate-----------------

$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    this.addClass("animated " + animationName).one(animationEnd, function () {
      $(this).removeClass("animated " + animationName);
    });
    return this;
  },
});

$(window).load(function () {
  $(".sp-animate").queue(function () {
    $(this).animateCss("fadeInUp");
  });
  $(".sp-animate_2").queue(function () {
    $(this).animateCss("fadeInUp");
  });
});

//-------------youtube-----------------
$(function () {
  var player;

  $("body").append('<script src="https://www.youtube.com/iframe_api">');

  function resizeMovie() {
    var $w = $(window),
      bw = 1200,
      bh = (bw / 16) * 9,
      w = $w.width(),
      h = $w.height(),
      mw = w,
      mh = Math.round(bh * (mw / bw));

    if (mh < h) {
      mh = h;
      mw = Math.round(bw * (mh / bh));
    }

    console.log(w, h, mw, mh);

    $("#player").css({
      width: mw,
      height: mh,
      marginTop: (h - mh) / 2,
      marginLeft: (w - mw) / 2,
    });
  }

  resizeMovie();

  $(window).resize(resizeMovie);

  $("#player_cover").click(function () {
    switch (player.getPlayerState()) {
      case 1:
        player.pauseVideo();
        break;
      default:
        player.playVideo();
    }
  });

  function onPlayerReady(event) {
    $("#loader")
      .delay(2500)
      .animate({ opacity: 0 }, 800, "swing", function () {
        $(this).css("display", "none");
      });
    event.target.mute();
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      player.playVideo();
    }
  }

  var onYouTubeIframeAPIReady = function () {
    player = new YT.Player("player", {
      videoId: "PLzqYubcOAIZGVi_11GWk8bT33SZLbiF-r",
      playerVars: {
        loop: 1,
        playlist: "TSNOQEdwWsM",
        autoplay: 1,
        controls: 0,
        enablejsapi: 1,
        iv_load_policy: 3,
        disablekb: 1,
        showinfo: 0,
        rel: 0,
        start: 5,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
});
//-------------tab-----------------

$(function () {
  $("ul.tab-area li").click(function () {
    var index = $("ul.tab-area li").index(this);
    $(".content-area").css("display", "none");
    $(".content-area").eq(index).fadeIn();
    $(".tab-area li").removeClass("select");
    $(this).addClass("select");
  });
});

$(function () {
  $("ul.tab-area_news_more li").click(function () {
    var index = $("ul.tab-area_news_more li").index(this);
    $(".content-area_news_more").css("display", "none");
    $(".content-area_news_more").eq(index).fadeIn();
    $(".tab-area_news_more li").removeClass("select");
    $(this).addClass("select");
  });
});
