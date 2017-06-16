/* global $, document */
(function(doc){
  let page = 1;
  let globalType = 'A';
  let globalValue = "";
  const perPage = 3;

  function closeSidebar () {
    $( ".obj2" ).toggle( "slide", function() {
      $( ".obj3").off('click', closeSidebar);
    });
  }

  function renderBlock(type, order) {
    return `<div class="item"><p>Item ${type}${order}</p></div>`;
  }

  function renderBlocks(page, type, quantity) {
    const orderStart = (page - 1) * perPage + 1;
    let blocks = '';
    for (let i = orderStart; i < orderStart + perPage; i++) {
      if (i > quantity) {
        break;
      }
      blocks += renderBlock(type, i);
    }
    return `<div class="item-container">${blocks}</div>`;
  }

  function renderPaginator(page, quantity) {
    const totalPages = quantity / perPage;
    if (page === 1) {
      if (page < totalPages) {
        return '<div class="pagination-container"><button class="btn-pagination" id="go-forward">></button></div>';
      } else {
        return '';
      }
    } else {
      if (page < totalPages) {
        return '<div class="pagination-container"><button class="btn-pagination" id="go-back"><</button><button class="btn-pagination" id="go-forward">></button></div>';
      } else {
        return '<div class="pagination-container"><button class="btn-pagination" id="go-back"><</button></div>';
      }
    }
  }

  function appendToDom(htmlTxt) {
    const containerDiv = doc.querySelector('.obj3');
    containerDiv.innerHTML = htmlTxt;
  }

  function goBack() {
    page = page - 1;
    render(globalValue, globalType, page);
  }

  function goForward() {
    page = page + 1;
    render(globalValue, globalType, page);
  }

  function deregisterPaginatorEvents() {
    $('#go-back').off('click', goBack);
    $('#go-forward').off('click', goForward);
  }

  function registerPaginatorEvents() {
    $('#go-back').click(goBack);
    $('#go-forward').click(goForward);
  }

  function render(quantity, type, page) {
    deregisterPaginatorEvents();
    const paginator = renderPaginator(page, quantity);
    const blocks = renderBlocks(page, type, quantity);
    const htmlTxt = `${blocks} ${paginator}`;
    appendToDom(htmlTxt);
    registerPaginatorEvents();
  }

  $( doc ).ready(function () {
    $( ".obj2" ).hide();
    $( ".btn" ).click(function() {
      $( ".obj2" ).toggle( "slide" );
      $( ".obj3" ).off('click', closeSidebar);
      $( ".obj3" ).on('click', closeSidebar);
    });
    $( "#qty" ).on('change', function(e) {
      const value = parseInt(e.target.value);
      if (isNaN(value)) {
        $( "#qty" ).addClass( "danger" );
        globalValue = e.target.value;
      } else {
        $( "#qty" ).removeClass( "danger" );
        globalValue = value;
        render(value, globalType, page);
      }
    });
    $( "#type" ).on('change', function(e) {
      const value = e.target.value;
      globalType = value;
      if (isNaN(parseInt(globalValue))) {
        $( "#qty" ).addClass( "danger" );
      } else {
        $( "#qty" ).removeClass( "danger" );
        render(globalValue, value, page);
      }
    });
  });

})(document);
