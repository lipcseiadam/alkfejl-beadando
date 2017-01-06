function ajaxDelete(url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.ajax({
      url,
      method: 'DELETE',
      dataType: 'json',
      headers
    })
  )
}

function my_confirm(question) {
  //return Promise.resolve(confirm(question))
  let _resolve
  let _reject

  
  const $modal = $('.confirm-modal')
  $modal.show()

  $modal.find('.modal-ok').on('click', function (e) {
    _resolve(false)
  })

  $modal.find('.modal-cancel').on('click', function (e) {
    _resolve(false)
  })

  return new Promise(function (resolve, reject) {
    _resolve = resolve
    _reject = reject
  })
}

$('#btnDelete').on('click', function (e) {
 // e.preventDefault()
  console.log('kérdés')
  my_confirm('Biztos törölni akarod?').then(response => {
    if (response) {

      const url = '/ajax' + $(this).attr('href')
      ajaxDelete(url)
        .then(data => {
          location.assign('/')
        })
        .catch(xhr => {
          $('.help-block').text(xhr.responseText)
        })
    }
  })
})