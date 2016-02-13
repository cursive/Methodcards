$(function() {
  console.log("init")
    //Authnetic using the jquery parse library
    _authenticate();
    getCards()
    $("#print").click(function(){
      window.print();
    })

  });

/*Authenticate with jquery library*/
function _authenticate(){
  console.log("_authenticate()")
  var creds = {
    app_id:appID,
    rest_key:RESTAPIKey
  };
  $.parse.init(creds);
}




function getCards(){
  console.log($("#card-template").html())
  // var cardTemplate=_.template($("#card-template").html());
  //var cardTemplate =   _.template("hello:<%= name =%>");
  var cardTemplate = _.template($("#card-template").html());
  $.ajax({
    type: 'GET',
    headers: {'X-Parse-Application-Id': appID,'X-Parse-REST-API-Key': RESTAPIKey},
    contentType: "application/json",
    url: "https://api.parse.com/1/classes/Card",
    data:"include=category,tags",
    success: function(results) {
      console.log("getCards():",results)
      _.each(results.results,function(result){
        $(".cards").append(cardTemplate(result))
     })

    },        
    error: function(error) {
      console.log("Error:",error)
    }
  });
}


