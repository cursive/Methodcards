$(function() {
  console.log("init")
    //Authnetic using the jquery parse library
    _authenticate();
    getCards()
    $("#print").click(function(){
      window.print();
    })

    $('body').on('focus', '[contenteditable]', function() {
      var $this = $(this);
      $this.data('before', $this.html());
      return $this;
    }).on('blur keyup paste input', '[contenteditable]', function() {
      var $this = $(this);
      if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $this.trigger('change');
      }
      return $this;
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




function getCards(){
  console.log($("#card-template").html())
/*  var cardTemplate=_.template($("#card-template").html());
var cardTemplate =   _.template("hello:<%= name =%>");*/
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
     $(".allCards").append(cardTemplate(result))
   })
    setTimeout(initPackery,200)
  },        
  error: function(error) {
    console.log("Error:",error)
  }
});
}

function getCard(id){
  console.log("getCard")
  console.log($("#expanded-card-template").html())
  var cardTemplate = _.template($("#expanded-card-template").html());
  $.ajax({
    type: 'GET',
    headers: {'X-Parse-Application-Id': appID,'X-Parse-REST-API-Key': RESTAPIKey},
    contentType: "application/json",
    url: "https://api.parse.com/1/classes/Card/"+id,
    data:"include=category,tags",
    success: function(results) {
      console.log("getCard():",results)
      console.log("ds")
      $(".expandedCard").append(cardTemplate(results))
      fieldListeners();
    },        
    error: function(error) {
      console.log("Error:",error)
    }
  });
}

function fieldListeners(){
  console.log("fieldListeners")
  $( "div" ).blur(function() {
    alert( "Handler for .blur() called." );
  });
}


function expandCard(id){
  console.log("expand card")
  $(".allCards").addClass("faded")
  getCard(id)
}


function closeCard(){
  $(".allCards").removeClass("faded")
  $(".expandedCard").html("")
}

function initPackery(){
  console.log("initPackery")
  var $grid = $('.allCards').packery({
    itemSelector: '.card',
  // columnWidth helps with drop positioning
  //columnWidth: 100
  gutter: 10
});

// make all items draggable
var $items = $grid.find('.card').draggable();
// bind drag events to Packery
$grid.packery( 'bindUIDraggableEvents', $items );
$(".card").click(function(){

  expandCard($(this).attr('id'))
})
$(".close").click(function(){

  closeCard()
})
}




