/*

GET
I'm using jquery Ajax

POST 
I'm using a jquery library because I wasn't able to POST using jquery Ajax

UPLOAD
Upload nearly works, however it inserts the wrong URL into the DB
When you upload, look at the inspecotr, it will give you two URLs
Try opening both in your browser
- It submits the shorter one that has ... in the middle of it
- However it  should be the other one


*/




var file;
//I've but a default in so you can submit a card wihtout having to upload a file first
var uploadedFileUrl="http://files.parsetfss.com/a830439b-7aa4-4898-b70b-8a9a5ef07a84/tfss-0c12a959-14cc-40ce-a3c0-f41c9782851f-yellow.jpg";
var appID="";
var RESTAPIKey="";


$(function() {
    console.log("init")
    //Authnetic using the jquery parse library
    _authenticate();
    //Get list of cateogries then attributes and popoulate the UI
    getCategories();

    $('#submitCard').click(function(){
        newCard()
    });
    $('#image').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      file = files[0];
    });
    $('#uploadButton').click(function() {
        uploadFile()
    })

});

//Authenticate with jquery library
function _authenticate(){
    console.log("_authenticate()")
    var creds = {
        app_id:appID,
        rest_key:RESTAPIKey
    };
    $.parse.init(creds);
}

//Get list of categories and populate the dropdown
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
            getAttributes();
        },        
        error: function(error) {
            console.log("Error:",error)
        }
    });
}


//Get list of attributes and populate the checkboxes
function getAttributes(){
    console.log("cetAttributes()")
    $.ajax({
        type: 'GET',
        headers: {'X-Parse-Application-Id': appID,'X-Parse-REST-API-Key': RESTAPIKey},
        contentType: "application/json",
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


function uploadFile(){
    console.log("uploadFile()")
    var serverUrl = 'https://api.parse.com/1/files/' + file.name;
    $.ajax({
        type: "POST",
        beforeSend: function(request) {
          request.setRequestHeader("X-Parse-Application-Id", appID);
          request.setRequestHeader("X-Parse-REST-API-Key", RESTAPIKey);
          request.setRequestHeader("Content-Type", file.type);
      },
      url: serverUrl,
      data: file,
      processData: false,
      contentType: false,
      success: function(data) {
        console.log(data)
        uploadedFileUrl=data.url;
        console.log("File available at: " + uploadedFileUrl);
    },
    error: function(data) {
      var obj = jQuery.parseJSON(data);
      alert(obj.error);
  }
})
}






function newCard(){

    console.log("newCard()")
    $.parse.post('Card', { 
        title: $("#title","#cardForm").val(),
        description: $("#description","#cardForm").val(),
        goals: $("#goals","#cardForm").val(),
        category:{
            "__type":"Pointer",
            "className":"Category",
            "objectId":$("#category","#cardForm").val()
        },
        image: {
            "__type": "File",
            "name": uploadedFileUrl  
        }

    }, function(json) { 
        console.log("Card Created",json);
    });
}

/*

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