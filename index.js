"use strict";

var buildUrl = function(sites, keyword) {
  var googleUrl = "https://www.google.co.jp/search?q=";
  var siteParams = [];
  for(var name in sites) { siteParams.push("site:" + sites[name]) }
  var fullPath = keyword + " 歌詞 " + siteParams.join(" OR ");

  return googleUrl + encodeURI(fullPath);
};

var getSites = function(url, onloadCb) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      onloadCb(data);
    }
  }

  request.send();
}

$(function() {
  var targetSites = {};
  getSites("sites.json", function(json) { targetSites = json; });

  $("#keyword").keyup(function(e) {
    if (e.which !== 13) { return false; } // Return unless enter
    var keyword = $(this).val();

    window.open(buildUrl(targetSites, keyword));

    $(this).val("");
    return false;
  });

  $("#submit").click(function(e) {
    var $keyword = $("#keyword")
    var keyword = $keyword.val();

    window.open(buildUrl(targetSites, keyword));

    $keyword.val("");
    return false;
  });
});
