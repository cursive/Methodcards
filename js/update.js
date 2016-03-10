
//I've but a this so you can submit a card wihtout having to upload a file first

var fileUrl={};

var exampleUrls=[{},{},{}]
var jsonData;
var imageBlock;
var egBlocks=[{},{},{}];
var updateID="d4QgCrZHvZ";
/*
fileUrl.name="tfss-9a49a45a-da5a-401a-b0c7-c25b215f25db-yellow.jpg";
fileUrl.url="http://files.parsetfss.com/a830439b-7aa4-4898-b70b-8a9a5ef07a84/tfss-9a49a45a-da5a-401a-b0c7-c25b215f25db-yellow.jpg";

exampleUrls[0].name=exampleUrls[1].name=exampleUrls[2].name="tfss-9a49a45a-da5a-401a-b0c7-c25b215f25db-yellow.jpg";
exampleUrls[0].url=exampleUrls[1].url=exampleUrls[2].url="http://files.parsetfss.com/a830439b-7aa4-4898-b70b-8a9a5ef07a84/tfss-9a49a45a-da5a-401a-b0c7-c25b215f25db-yellow.jpg";

*/
$(function() {

  console.log("init")
    //Authnetic using the jquery parse library
    _authenticate();
    getCategories();
    $('#submitCard').click(function(e){
      e.preventDefault();
      updateCard("apGjaUnJxM");
    });
    $('#image').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      uploadFile(files[0])
    });
    $('.example').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
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
      getCard(updateID);
    },        
    error: function(error) {
      console.log("Error:",error)
    }
  });
}


function getCard(id){
  console.log("getCard",id)
  $.ajax({
    type: 'GET',
    headers: {'X-Parse-Application-Id': appID,'X-Parse-REST-API-Key': RESTAPIKey},
    contentType: "application/json",
    url: "https://api.parse.com/1/classes/Card/"+id,
    data:"include=category,tags",
    success: function(results) {
      console.log("Results:",results)
      jsonData=results;
      populateFields();
      console.log("ds")
    },        
    error: function(error) {
      console.log("Error:",error)
    }
  });
}


function populateFields(){
  $("#title").val(jsonData.title);
  $("#description").val(jsonData.description);
  $("#goals").val(jsonData.goals);
  $("#category").val(jsonData.category.objectId);
  for(var i=0;i<jsonData.tags.length;i++){
    console.log(i,jsonData.tags[i].objectId)
    $("input:checkbox[value="+jsonData.tags[i].objectId+"]").prop('checked', true);
  }
  $("#hero>img").attr("src", jsonData.image.url);
  $("#eg1>img").attr("src", jsonData.example1.url);
  $("#eg2>img").attr("src", jsonData.example2.url);
  $("#eg3>img").attr("src", jsonData.example3.url);
  imageBlock=jsonData.image;
  egBlocks[0]=jsonData.example1;
  egBlocks[1]=jsonData.example2;
  egBlocks[2]=jsonData.example3;
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
      $("#hero>img").attr("src", fileUrl.url);
      imageBlock.__type="File";
      imageBlock.name=fileUrl.name;
      imageBlock.url=fileUrl.url;

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
      $("#eg"+(exampleNumber+1)+">img").attr("src", exampleUrls[exampleNumber].url);
      egBlocks[exampleNumber].__type="File";
      egBlocks[exampleNumber].name=exampleUrls[exampleNumber].name;
      egBlocks[exampleNumber].url=exampleUrls[exampleNumber].url;
    },
    error: function(data) {
      var obj = jQuery.parseJSON(data);
      alert(obj.error);
    }
  })
}


function updateCard(id){
  console.log("updateCard",id)
  var tagsBlock = [];
  
  $('#tags :checked').each(function() {
    tagsBlock.push({
      __type: 'Pointer',
      className: 'Tag',
      objectId: $(this).val()
    })

  });

  $.parse.put('Card/apGjaUnJxM', { 
    title: $("#title","#cardForm").val(),
    description: $("#description","#cardForm").val(),
    goals: $("#goals","#cardForm").val(),
    category:{
      "__type":"Pointer",
      "className":"Category",
      "objectId":$("#category","#cardForm").val()
    },
    tags:tagsBlock,
    image: imageBlock,
    example1: egBlocks[0],
    example2: egBlocks[0],
    example3: egBlocks[2],
    caption1:$("#caption1","#cardForm").val(),
    caption2:$("#caption1","#cardForm").val(),
    caption3:$("#caption1","#cardForm").val()
  }, function(json) { 
    console.log("Card Updated",json);
  });
}



