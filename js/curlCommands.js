GET

Get all of one type

curl -X GET \
  -H "X-Parse-Application-Id: Yh9fuRIjw3JLhbaSM3e5P2LOEEVpb83IJHeQLqZ8" \
  -H "X-Parse-REST-API-Key: 8K7dx2fCRdd1y3H2rifhKqDkg8E1e7xRhwv6jkCF" \
  https://api.parse.com/1/classes/Card

    $.ajax({
    type: 'GET',
    headers: {'X-Parse-Application-Id': appID,'X-Parse-REST-API-Key': RESTAPIKey},
    contentType: "application/json",
    url: "https://api.parse.com/1/classes/Card",
    success: function(results) {
      console.log("getCards():",results)
      _.each(results.results,function(result){
       $("body").append('<p>'+result.title+'</p>')
     })
    },        
    error: function(error) {
      console.log("Error:",error)
    }
  });




Get all of one type and incldue content it points setTimeout(function() {}, 
  curl -X GET \
  -H "X-Parse-Application-Id: Yh9fuRIjw3JLhbaSM3e5P2LOEEVpb83IJHeQLqZ8" \
  -H "X-Parse-REST-API-Key: 8K7dx2fCRdd1y3H2rifhKqDkg8E1e7xRhwv6jkCF" \
  -G \
  --data-urlencode 'include=category' \
  https://api.parse.com/1/classes/Card


curl -X POST \
  -H "X-Parse-Application-Id:Yh9fuRIjw3JLhbaSM3e5P2LOEEVpb83IJHeQLqZ8" \
  -H "X-Parse-REST-API-Key:8K7dx2fCRdd1y3H2rifhKqDkg8E1e7xRhwv6jkCF" \
  -H "Content-Type: text/plain" \
  -d 'Hello, World!' \
  https://api.parse.com/1/files/hello.txt



  curl -X POST \
  -H "X-Parse-Application-Id:Yh9fuRIjw3JLhbaSM3e5P2LOEEVpb83IJHeQLqZ8" \
  -H "X-Parse-REST-API-Key:8K7dx2fCRdd1y3H2rifhKqDkg8E1e7xRhwv6jkCF" \
  -H "Content-Type: image/jpeg" \
  --data-binary '@diagram.jpg' \
  https://api.parse.com/1/files/pic.jpg

PUT

curl -X PUT \
  -H "X-Parse-Application-Id: Yh9fuRIjw3JLhbaSM3e5P2LOEEVpb83IJHeQLqZ8" \
  -H "X-Parse-REST-API-Key: 8K7dx2fCRdd1y3H2rifhKqDkg8E1e7xRhwv6jkCF" \
  -H "Content-Type: application/json" \
  -d '{"attributes":{"__op":"Add","objects":["fly","king"]}}' \
  https://api.parse.com/1/classes/Card/Ve2XdRTgEt

  PUT Array

curl -X PUT \
  -H "X-Parse-Application-Id: Yh9fuRIjw3JLhbaSM3e5P2LOEEVpb83IJHeQLqZ8" \
  -H "X-Parse-REST-API-Key: 8K7dx2fCRdd1y3H2rifhKqDkg8E1e7xRhwv6jkCF" \
  -H "Content-Type: application/json" \
  -d '{"attributes":{"__op":"Add","objects":[{"__type":"Pointer","className":"Attribute","objectId":"7pMMXL3CvN"}]}}' \
  https://api.parse.com/1/classes/Card/fn5cox9qxA




