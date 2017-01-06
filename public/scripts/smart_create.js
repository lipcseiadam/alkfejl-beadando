/*function insertName(item, $textarea1) {
  const $row = $(`
    <div class="form-group smart-name">
        <div class="col-lg-10">
            <input required class="form-control smart-name" value="${item.name}" type="text"
            pattern="^\\S*$"
            placeholder="Eszköz neve"
            required>
        </div>
    </div>
  `)
  $row.insertBefore($textarea1)
  $('form').validator('update')
}


function collectName() {
  $('.smart-name').each(function () {
    $this = $(this)
    const name = $this.find('.smart-name').val()
  })
  return name
    // .map(ingr => `${ingr.amount} ${ingr.name}`)
    //.map(({ description }) => `${description}`)
    //.join('\n')
}


const $textarea1 = $('#name')
$textarea1.hide()

$textarea1.closest('.form-group')
  .on('click', 'button', function (e) {
    $(this).closest('.smart-name').remove()
    $('form').validator('update')
  })


$addButton1 = $(`
  <button type="button" class="btn btn-success btn-block">
    <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
  </button>
`)
  .insertAfter($textarea1)
  .on('click', function (e) {
    insertName({
      name: ''
    }, $textarea1)
    console.log(name)
  })

$addButton1.click(function(){
	$addButton1.hide();
  $addButton1.attr("disabled", true);
  $removeButton1.show();
  $removeButton1.attr("disabled", false);
  $removeButton1.insertAfter($textarea1)
});

$removeButton1 = $(`
    <button type="remove-button" class="btn btn-danger btn-block">
      <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
    </button>
`)
  .click(function(){
    $textarea1.prev().remove()
    $addButton1.show();
    $addButton1.attr("disabled", false);
    $removeButton1.hide();
    $removeButton1.attr("disabled", true);
    
  })
*/

function insertDescription(item, $textarea) {
  const $row = $(`
    <div class="form-group smart-description">
        <div class="col-lg-10">
            <textarea class="form-control smart-description" rows="3" id="description" name="description" 
            pattern="^\\S*$"
            placeholder="leírás"
            required></textarea>
        </div>
    </div>
  `)
  $row.insertBefore($textarea)
  $('form').validator('update')
}


function collectDescription() {
  $('.smart-description').each(function () {
    $this = $(this)
    const description = $this.find('.smart-description').val()
  })
  return description
    // .map(ingr => `${ingr.amount} ${ingr.name}`)
    //.map(({ description }) => `${description}`)
    //.join('\n')
}


const $textarea = $('#description')
$textarea.hide()

$textarea.closest('.form-group')
  .on('click', 'button', function (e) {
    $(this).closest('.smart-description').remove()
    $('form').validator('update')
  })


$addButton = $(`
  <button type="button" class="btn btn-success btn-block">
    <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
  </button>
`)
  .insertAfter($textarea)
  .on('click', function (e) {
    insertDescription({
      description: ''
    }, $textarea)
  })


$addButton.click(function(){
	$addButton.hide();
  $addButton.attr("disabled", true);
  $removeButton.show();
  $removeButton.attr("disabled", false);
  $removeButton.insertAfter($textarea)
});

$removeButton = $(`
    <button type="remove-button" class="btn btn-danger btn-block">
      <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
    </button>
`)
  .click(function(){
    $textarea.prev().remove()
    $addButton.show();
    $addButton.attr("disabled", false);
    $removeButton.hide();
    $removeButton.attr("disabled", true);
    
  })


$('form').on('submit', function (e) {
  //e.preventDefault()
  $textarea1.val(collectName() )
  $textarea.val( collectDescription() )
})