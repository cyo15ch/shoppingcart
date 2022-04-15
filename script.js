var updateMarketValue = function (ele) {
    var sharesOwned = parseFloat($(ele).find('.price input').val());
    var marketPrice = parseFloat($(ele).find('.qty input').val());
  
    // market value is shares times market price per share
    var marketValue = sharesOwned * marketPrice;
    $(ele).children('.subtotal').html(marketValue);
  
    return marketValue;
  }
  
  var updateUnrealizedProfit = function (ele, marketValue) {
    var sharesOwned = parseFloat($(ele).find('.price input').val());
    var costPerShare = parseFloat($(ele).find('.cost input').val());
    var costOfPurchase = sharesOwned * costPerShare;
  
    // unrealized profit is market value minus cost of purchase
    var unrealizedProfit = marketValue - costOfPurchase;
    $(ele).children('.profit').html(unrealizedProfit);
  
    return unrealizedProfit;
  }
  
  var sum = function (acc, x) { return acc + x; };
  
  var updatePortfolioValueAndProfit = function () {
    var stocksMarketValues = [];
    var stocksUnrealizedProfits = [];
  
    $('tbody tr').each(function (i, ele) {
      var marketValue = updateMarketValue(ele);
      stocksMarketValues.push(marketValue);
      var unrealizedProfit = updateUnrealizedProfit(ele, marketValue);
      stocksUnrealizedProfits.push(unrealizedProfit);
    });
  
    var portfolioMarketValue = stocksMarketValues.reduce(sum);
    var portfolioUnrealizedProfit = stocksUnrealizedProfits.reduce(sum);
    $('#totalprice').html(portfolioMarketValue);
    $('#portfolioProfit').html(portfolioUnrealizedProfit);
  }
  
  $(document).ready(function () {
    updatePortfolioValueAndProfit();
  
    $(document).on('click', '.btn.remove', function (event) {
      $(this).closest('tr').remove();
      updatePortfolioValueAndProfit();
    });
  
    var timeout;
    $(document).on('input', 'tr input', function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        updatePortfolioValueAndProfit();
      }, 1000);
    });
  
    $('#addStock').on('submit', function (event) {
      event.preventDefault();
      var name = $(this).children('[name=name]').val();
      var price = $(this).children('[name=price]').val();
      var qty = $(this).children('[name=qty]').val();
      
      
      $('tbody').append('<tr>' +
        '<td class="name">' + name + '</td>' +
        '<td class="price"><input type="number" value="' + price + '" /></td>' +
        '<td class="qty"><input type="number" value="' + qty + '" /></td>' +
        '<td class="subtotal"></td>' +
        '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
      '</tr>');
  
      updatePortfolioValueAndProfit();
      $(this).children('[name=name]').val('');
      $(this).children('[name=shares]').val('');
      $(this).children('[name=cost]').val('');
      $(this).children('[name=marketPrice]').val('');
    });
  });
  