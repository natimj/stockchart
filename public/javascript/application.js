$(document).ready(function() {

  var BASE_URI = 'http://query.yahooapis.com/v1/public/yql?q='; 
  var END_URI = "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";  
  
 $("#done").click(function() {
    // console.log($("#stock_ticker").val());
    stock = $("#stock_ticker").val();
    
    //query particular stock
    var yql_query_stocks = stock;
    var yql_query = 'select * from yahoo.finance.quote where symbol in ("'+ yql_query_stocks +'")';
    var yql_query_str = encodeURI(BASE_URI+yql_query);
    var query_str_final = yql_query_str + END_URI;
    
    // AJAX particualr
    var stockData = $.ajax({
        url: query_str_final,
        method: 'GET'
      });

    // using particular data
    stockData.then(function(data){
      console.log(data);
      var changeVal = data.query.results.quote.Change;
      var stockName = data.query.results.quote.Name;
      var change = "Change: " + changeVal;
      $('<p>').text(change).appendTo('hello');
    });

    // query historical data
    var startDate = '2015-06-29';
    var endDate = '2016-06-29';
    var yql_hist_stocks = stock;
    var yql_hist_query = 'select * from yahoo.finance.historicaldata where symbol = "' + yql_hist_stocks + '" and startDate = "' + startDate +'" and endDate = "' + endDate +'"';
    var yql_hist_query_str = encodeURI(BASE_URI+yql_hist_query);
    var query_str_final = yql_hist_query_str + END_URI;
  
    // AJAX historical
    var stockHistData =$.ajax({
      url: query_str_final,
      method: 'GET'
    });


    // creating graph
    var stockHisChart = stockHistData.then(function (data){
      
      //prep variables
      // console.log(data)
      var arrMix =[];
      var stockArray = data.query.results.quote;
      
      // query graph, set up variables
      for (var i =0; i <stockArray.length; i++) {
        var currentObject = stockArray[i];
        var closeStock = parseInt(currentObject.Close);
        var dateStock = Date.parse(currentObject.Date);
        arrMix.push([dateStock, closeStock])
      };

      //sorting
      arrMix.sort(function(a, b){return a[0]-b[0]});
      // console.log(arrMix);

      //high graph
      $('#container').highcharts('StockChart', {
        rangeSelector : {
            selected : 1
          },
        title : {
            text : 'HI'
        },
        series : [{
            name : stock,
            data : arrMix,
            tooltip: {
                valueDecimals: 2
            }
        }]
      });
    });
  });
});

  // var startDate = '2015-06-29'
  // var endDate = '2016-06-29'
  // var yql_hist_stocks = "YHOO"
  // var yql_hist_query = 'select * from yahoo.finance.historicaldata where symbol = "' + yql_hist_stocks + '" and startDate = "' + startDate +'" and endDate = "' + endDate +'"';
  // var yql_hist_query_str = encodeURI(BASE_URI+yql_hist_query);
  // var query_str_final = yql_hist_query_str + END_URI;


  // var stockHistData =$.ajax({
  //   url: query_str_final,
  //   method: 'GET'
  // });

  // var stockHisChart = stockHistData.then(function (data){
  //   console.log(data)
  //   var arrClose =[];
  //   var arrDate =[];
  //   var arrMix =[];
  //   var stockArray = data.query.results.quote;
  //   for (var i =0; i <stockArray.length; i++) {
  //     var currentObject = stockArray[i];
  //     var closeStock = parseInt(currentObject.Close);
  //     var dateStock = Date.parse(currentObject.Date);

  //     arrMix.push([dateStock, closeStock])
  //     };

  //     arrMix.sort(function(a, b){return a[0]-b[0]});


  //     console.log(arrMix);

  // $('#container').highcharts('StockChart', {


  //           rangeSelector : {
  //               selected : 1
  //           },

  //           title : {
  //               text : 'YHOO Stock Price'
  //           },

  //           series : [{
  //               name : 'YHOO',
  //               data : arrMix,
  //               tooltip: {
  //                   valueDecimals: 2
  //               }
  //           }]
  //       });



      

    
  // });






