function counter(fruit){
  var count = 0
  $("<div id='" + fruit + "'>"+
    "<span>" + fruit +": </span><span class='count'>0</span>" +
    "<button class='increase'>+</button><button class='decrease'>-</button>"+
      "</div>").appendTo('body')


  $('#'+fruit+' .increase').on('click', function() {
    console.log('increase', fruit)
    count++
    update()
  })
  $('#'+fruit+' .decrease').on('click', function() {
    console.log('decrease', fruit)
    count--
    update()
  })

  function update(){
    $('#'+fruit+' .count').remove()
      $("<span class='count'>"+ count +"</span>").append()
  }
}

counter("Apple")
counter("Pear")
