
//I've but a this so you can submit a card wihtout having to upload a file first
var file;
var fileUrl={};


var example;
var exampleUrls=[{},{},{}]


fileUrl.name="tfss-9a49a45a-da5a-401a-b0c7-c25b215f25db-yellow.jpg";
fileUrl.url="http://files.parsetfss.com/a830439b-7aa4-4898-b70b-8a9a5ef07a84/tfss-9a49a45a-da5a-401a-b0c7-c25b215f25db-yellow.jpg";

exampleUrls[0].name=exampleUrls[1].name=exampleUrls[2].name="tfss-9a49a45a-da5a-401a-b0c7-c25b215f25db-yellow.jpg";
exampleUrls[0].url=exampleUrls[1].url=exampleUrls[2].url="http://files.parsetfss.com/a830439b-7aa4-4898-b70b-8a9a5ef07a84/tfss-9a49a45a-da5a-401a-b0c7-c25b215f25db-yellow.jpg";


$(function() {

  console.log("init")
    //Authnetic using the jquery parse library
    _authenticate();
    getCategories();
    $('#submitCard').click(function(e){
      e.preventDefault();
      newCard();
    });
    $('#image').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
     // file = files[0];
     uploadFile(files[0])
   });
    $('.example').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      example = files[0];
      uploadExample(files[0],$(this).attr('id')-1)
    });
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

/*Get list of categories and populate the dropdown*/
function getCategories(){
  console.log("cetCategories()")
  $.ajax({
    type: 'GET',
    headers: {'X-Parse-Application-Id': appID,'X-Parse-REST-API-Key': RESTAPIKey},
    contentType: "application/json",
    url: "https://api.parse.com/1/classes/Category",
    success: function(results) {
      console.log("Categories:",results)
      _.each(results.results,function(result){
        $("#category").append('<option value="' + result.objectId + '">'+result.title+'</option>')
      })
      getTags();
    },        
    error: function(error) {
      console.log("Error:",error)
    }
  });
}


/*Get list of attributes and populate the checkboxes*/
function getTags(){
  $.ajax({
    type: 'GET',
    headers: {'X-Parse-Application-Id': appID,'X-Parse-REST-API-Key': RESTAPIKey},
    contentType: "application/json",
    url: "https://api.parse.com/1/classes/Tag",
    success: function(results) {
      console.log("getTags()",results)
      _.each(results.results,function(result){
        $("#tags").append('<div class="checkbox"><label><input type="checkbox" value="' + result.objectId + '">'+result.title+'</label></div>')
      })

    },        
    error: function(error) {
      console.log("Error:",error)
    }
  });
}


function uploadFile(thefile){
  console.log("uploadFile()")
  var serverUrl = 'https://api.parse.com/1/files/' + thefile.name;
  $.ajax({
    type: "POST",
    beforeSend: function(request) {
      request.setRequestHeader("X-Parse-Application-Id", appID);
      request.setRequestHeader("X-Parse-REST-API-Key", RESTAPIKey);
      request.setRequestHeader("Content-Type", thefile.type);
    },
    url: serverUrl,
    data: thefile,
    processData: false,
    contentType: false,
    success: function(data) {
      console.log(data)
      fileUrl=data;
      console.log("File available at: " + fileUrl.url);
    },
    error: function(data) {
      var obj = jQuery.parseJSON(data);
      alert(obj.error);
    }
  })
}


function uploadExample(thefile,exampleNumber){
  console.log("uploadExample()",exampleNumber)
  var serverUrl = 'https://api.parse.com/1/files/' + thefile.name;
  $.ajax({
    type: "POST",
    beforeSend: function(request) {
      request.setRequestHeader("X-Parse-Application-Id", appID);
      request.setRequestHeader("X-Parse-REST-API-Key", RESTAPIKey);
      request.setRequestHeader("Content-Type", thefile.type);
    },
    url: serverUrl,
    data: thefile,
    processData: false,
    contentType: false,
    success: function(data) {
      console.log(data)
      exampleUrls[exampleNumber]=data;
      console.log("File available at: " + exampleUrls[exampleNumber].url);
    },
    error: function(data) {
      var obj = jQuery.parseJSON(data);
      alert(obj.error);
    }
  })
}


function newCard(){
  console.log("newCard()")
  var tagsBlock = [];
  
  $('#tags :checked').each(function() {
    tagsBlock.push({
      __type: 'Pointer',
      className: 'Tag',
      objectId: $(this).val()
    })

  });
  $.parse.post('Card', { 
    title: $("#title","#cardForm").val(),
    description: $("#description","#cardForm").val(),
    goals: $("#goals","#cardForm").val(),
    category:{
      "__type":"Pointer",
      "className":"Category",
      "objectId":$("#category","#cardForm").val()
    },
    tags:tagsBlock,
    image: {
     "__type": "File",
     "name": fileUrl.name,
     "url": fileUrl.url
   },
   caption1:$("#caption1","#cardForm").val(),
   example1: {
     "__type": "File",
     "name": exampleUrls[0].name,
     "url": exampleUrls[0].url
   },
   caption2:$("#caption2","#cardForm").val(),
   example2: {
     "__type": "File",
     "name": exampleUrls[1].name,
     "url": exampleUrls[1].url
   },
   caption3:$("#caption3","#cardForm").val(),
   example3: {
     "__type": "File",
     "name": exampleUrls[2].name,
     "url": exampleUrls[2].url
   }
 }, function(json) { 
  console.log("Card Created",json);
});
}


function newCard(){
  console.log("newCard()")
  var tagsBlock = [];
  
  $('#tags :checked').each(function() {
    tagsBlock.push({
      __type: 'Pointer',
      className: 'Tag',
      objectId: $(this).val()
    })

  });
  $.parse.post('Card', { 
    title: $("#title","#cardForm").val(),
    description: $("#description","#cardForm").val(),
    goals: $("#goals","#cardForm").val(),
    tips: $("#tips","#cardForm").val(),
    category:{
      "__type":"Pointer",
      "className":"Category",
      "objectId":$("#category","#cardForm").val()
    },
    tags:tagsBlock,
    image: {
     "__type": "File",
     "name": fileUrl.name,
     "url": fileUrl.url
   },
   caption1:$("#caption1","#cardForm").val(),
   example1: {
     "__type": "File",
     "name": exampleUrls[0].name,
     "url": exampleUrls[0].url
   },
   caption2:$("#caption1","#cardForm").val(),
   example2: {
     "__type": "File",
     "name": exampleUrls[1].name,
     "url": exampleUrls[1].url
   },
   caption3:$("#caption1","#cardForm").val(),
   example3: {
     "__type": "File",
     "name": exampleUrls[2].name,
     "url": exampleUrls[2].url
   }
 }, function(json) { 
  console.log("Card Created",json);
});
}


/*


function addAttributes(id){
  console.log("AddingAttributes")
  var relationBlock = [];
  $('#attributes :checked').each(function() {
    relationBlock.push({
      __type: 'Pointer',
      className: 'Attribute',
      objectId: $(this).val()
    })

  });

  $.parse.put("Card/" + id, { 
    attributes: {
      __op: 'AddRelation',  // or 'RemoveRelation'
      objects: relationBlock
    }
  }, function(json) {
    console.log('updated ' + id, json)
  });
}





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



{"__type":"Pointer","className":"Attribute","objectId":"7pMMXL3CvN"}



function cr(){


    $.ajax({
        type: "POST",
        headers: {
            'X-Parse-Application-Id': appID,
            'X-Parse-REST-API-Key': RESTAPIKey,
            "Content-Type": "application/json"},
            url: "https://api.parse.com/1/classes/Category",
            data: { title: "John"},
            success: function(results) {
                alert(11)
            },
            error: function(error) {
                console.log("Error:",error)
            }
        })
}


function createCard(){
    $.ajax({
        type: 'GET',headers: {'X-Parse-Application-Id': appID,'X-Parse-REST-API-Key': RESTAPIKey},contentType: "application/json",
        url: "https://api.parse.com/1/classes/Attribute",
        success: function(results) {
            console.log("Attributes:",results)
            _.each(results.results,function(result){
                $("#attributes").append('<div class="checkbox"><label><input type="checkbox" value="' + result.objectId + '">'+result.title+'</label></div>')
            })

        },        
        error: function(error) {
            console.log("Error:",error)
        }
    });
}
*/





