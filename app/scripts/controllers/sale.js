'use strict';
 function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;

}
/**
 * @ngdoc function
 * @name woollyFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the woollyFrontApp
 */
angular.module('woollyFrontApp')
  .controller('SaleCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
  angular.module('woollyFrontApp')
  .controller('SaleCtrl', function ($scope,$routeParams,serviceAjax) {
     var id = $routeParams.id;  
     console.log(id);
     document.querySelector('body').style.backgroundImage = '../images/2.jpg';
     document.getElementsByTagName('body')[0].style.backgroundImage = 'http://wallpaperdj.com/download/qlimax_festival-1920x1080.jpg';
     $scope.sale_bg = {'background-image' : ' url("../images/2.jpg")'};
          var loadSales = function(){
          $scope.loading = true;
          serviceAjax.path("sales/"+id).then(function(data){
                console.log("Poulet",data.data.data);
                $scope.sale = data.data.data;

                $scope.loading = false;

            });
        };

        $scope.pageChanged = function(){
            loadSales();
        };
        loadSales();

       var loadItems = function(){
            $scope.loading = true;
            
          serviceAjax.url("http://localhost:8000/items/"+id).then(function(data){
                console.log("Poulet2",data.data.data);
                $scope.items = data.data.data;
                $scope.loading = false;
                
               
            });
        };

        $scope.pageChanged = function(){
            loadItems();
        };
        loadItems();
        var loadItemSpecification = function(){
            $scope.loading = true;
            
          serviceAjax.url("http://localhost:8000/items/"+id+"/itemspecifications").then(function(data){
                
                //$scope.itemSpecification = data.data.data;
                $scope.loading = false;
                $scope.itemSpecification = data.data.data;
                console.log("Poulet3",$scope.itemSpecification);
            });
        };

        $scope.pageChanged = function(){
            loadItemSpecification();
        };

        loadItemSpecification();
            
             $scope.addOrder = function(item){
               
                console.log('Value is', item.nbPlace);
 
                $scope.nbPlace = item.nbPlace;
            
     
                  var data={"data": {"type": "orders","id": null,"attributes": {"status": "not_payed","date": new Date().toISOString(),"hash_key":"test","orderlines": {"item ": "test", "order":"test"}}}};
console.log("data :",data);
                  serviceAjax.urlPost("http://localhost:8000/orders/",data).then(function(data){
                      console.log("data",data);

                    });
        };

       
        
        /*var loadAsso = function(){
            $scope.loading = true;
            console.log(url);
          serviceAjax.url("http://assos.utc.fr/profile/obledaym/json").then(function(data){
                console.log("Poulet2",data.data.data);
                $scope.asso = data.data.data;
                $scope.loading = false;

            });
        };

        $scope.pageChanged = function(){
            loadAsso();
        };
        loadAsso();*/

});
