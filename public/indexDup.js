var searchUrl = "http://localhost:3000/api/bears/";

document.getElementById("clickMe").addEventListener("click", function() {
  $.getJSON(searchUrl, function(result) {
    if (!result) {
      console.log("There are no results.");
      return false;
    } else {
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        var html = '';
        html += '<div class="panel panel-default">';
        html += '<div class="panel-body">';
        html += '<h4>Name: '+ result[i].name + '</h4>';
        html += '<em>Age: ' + result[i].age + '</em><br>';
        html += '<em>Species: ' + result[i].species + '</em><br>';
        html += '<em>Color: ' + result[i].color + '</em><br>';
        html += '<em>isFriendly: ' + result[i].isFriendly + '</em><br>';
        html += '<em>isHibernating: ' + result[i].isHibernating + '</em><br>';
        html += '</div>';
        html += '</div>';
        $("#bearData").append(html);
        console.log(result);
      }
    }
  });
});
