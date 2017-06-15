/* global $, document */
(function(doc){
  let page = 1;
  let globalType = 'A';
  let globalValue = 0;
  const perPage = 3;

  function closeSidebar () {
    $( ".obj2" ).toggle( "slide", function() {
      $( ".obj3").off('click', closeSidebar);
    });
  }

  function renderBlock(type, order) {
    return `<div><p>Item ${type}${order}</p></div>`;
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
    return `<div>${blocks}</div>`;
  }

  function renderPaginator(page, quantity) {
    const totalPages = quantity / perPage;
    if (page === 1) {
      if (page < totalPages) {
        return '<button id="go-forward">></button>';
      } else {
        return '';
      }
    } else {
      if (page < totalPages) {
        return '<button id="go-back"><</button><button id="go-forward">></button>';
      } else {
        return '<button id="go-back"><</button>';
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
      $( ".obj3").click(closeSidebar);
    });
    $( "#qty" ).on('change', function(e) {
      const value = parseInt(e.target.value);
      globalValue = value;
      render(value, globalType, page);
    });
    $( "#type" ).on('change', function(e) {
      const value = e.target.value;
      globalType = value;
      render(globalValue, value, page);
    });

    render(globalValue, globalType, page);
  });

})(document);
