"use strict";

var buildUrl = function(sites, keyword) {
  var googleUrl = "https://www.google.co.jp/search?q=";
  var sitesQuery = "";

  for(var name in sites) { sitesQuery += ("site:" + sites[name]) }

  return googleUrl + encodeURI(sitesQuery + " 歌詞 " + keyword);
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
});
