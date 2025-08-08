$(function () {
  console.log("Login tab script loaded");
  $(".tab").on("click", function () {
    console.log("Tab clicked:", $(this).data("tab"));
    $(".tab").removeClass("active");
    $(this).addClass("active");

    $(".tab-pane").hide();
    $("#" + $(this).data("tab")).show();
  });
});
