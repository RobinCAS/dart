'use strict';

// declare a module
var DartApp = angular.module('DartApp', [
  'ui.router',
  'ui.bootstrap',
  'angular.filter'

]);


/*
DartApp.filter('app_meta_filter', function(){
  return function (items, letter, af_owner) {
    alert(items.length);
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i=0;i<items.length;i++){
      var item = items[i];
      if (letterMatch.test(item.owner.substring(0, 1))) {
        filtered.push(item)
      }
    }
    return filtered;
  };
})

*/
/*
DartApp.filter('app_filter_owner', function(){
  return function (items, afowner) {
    alert(afowner);

  };
})
*/

/* -------------------------
  Author  :  Seth DeSantis
  Created :  11/5/15
  -------------------------*/
DartApp.filter('catalogfilter_category', function () {
    return function (items, af_category) {
        var filtered = [];
        //BEGIN : IF items
        if(items){
          //BEGIN : see if any items checked
          var flag_noCheck = 1;
          for(var key in af_category){
            //BEGIN : IF anything is checked
            if(af_category[key]){
              flag_noCheck = 0;
            }
            //END : IF anything is checked
          }
          //END   : see if any items checked

          //BEGIN :  IF/ELSE any items are checked
          if(flag_noCheck){
            //BEGIN : no items are checked
            filtered = items;
            //END : no items are checked
          } else {
            //BEGIN : items are checked
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              //BEGIN : loop through af_category
              for(var key in af_category){
                //BEGIN : evaluate if condition checked or not
                if(af_category[key]){
                    //BEGIN :   IF this condition matches items attribute
                    if(key == item.category){
                        filtered.push(item);
                    }
                    //END :   IF this condition matches items attribute
                }
                //END : evaluate if item checked or not
              }
              //END   : loop through af_category
            }
            //END :   items are checked
          }
          //BEGIN :  IF/ELSE any items are checked
          return filtered;
        }
        //END : IF items

    };
});


/* -------------------------
  Author  :  Seth DeSantis
  Created :  11/5/15
  -------------------------*/
DartApp.filter('catalogfilter_owner', function () {
    return function (items, af_owner) {
        var filtered = [];
        //BEGIN : IF items
        if(items){
          //BEGIN : see if any items checked
          var flag_noCheck = 1;
          for(var key in af_owner){
            //BEGIN : IF anything is checked
            if(af_owner[key]){
              flag_noCheck = 0;
            }
            //END : IF anything is checked
          }
          //END   : see if any items checked

          //BEGIN :  IF/ELSE any items are checked
          if(flag_noCheck){
            //BEGIN : no items are checked
            filtered = items;
            //END : no items are checked
          } else {
            //BEGIN : items are checked
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              //BEGIN : loop through af_category
              for(var key in af_owner){
                //BEGIN : evaluate if condition checked or not
                if(af_owner[key]){
                    //BEGIN :   IF this condition matches items attribute
                    if(key == item.owner){
                        filtered.push(item);
                    }
                    //END :   IF this condition matches items attribute
                }
                //END : evaluate if item checked or not
              }
              //END   : loop through af_category
            }
            //END :   items are checked
          }
          //BEGIN :  IF/ELSE any items are checked
          return filtered;
        }
        //END : IF items

    };
});

DartApp.factory('appFactory',function($http){
  var data = {name:'seth'}
  /*
  return {
    getApps: function(){
      return   $http({
          method: 'GET',
          url: 'json/a3.json'
          //url: 'query/json_cat.php'
        })
    }
  };
  */
  return data;

})

DartApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http)  {


  $scope.af_category = {};
  $scope.af_owner = {};

  $http({
    method: 'GET',
    url: 'json/a3.json'
    //url: 'query/json_app.php'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      $scope.apps = response.data;

      //qtip

      //qtip2
      $('[qtd!=""]').qtip({
        content: {
            attr: 'qtd'
        },
        style: { classes: 'qtip-rounded qtip-green' }
    });




    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      //alert('bad');
  });



}]);

DartApp.directive('repeatDone', function($timeout) {
    //BEGIN : timeout function, ensures DOM is rendered
    $timeout(function() {

      //BEGIN : qTip2 ------------------------
      $('[qtd!=""]').qtip({
        content: {
            attr: 'qtd'
        },
        style: { classes: 'qtip-rounded qtip-green' },
        position:{
          my: 'top center',  // Position my top left...
          at: 'center center'
        },
        show: {
        delay: 1000
        }
      });
      //BEGIN : qTip2 ------------------------

    },0);
    //END : timeout function, ensures DOM is rendered
});


DartApp.controller('CatCtrl', ['$scope','$http','$location','$anchorScroll', function($scope, $http, $location, $anchorScroll)  {
  $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
     }

  $http({
    method: 'GET',
    //url: 'json/categorys.json'
    url: 'query/json_cat.php'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      $scope.categories = response.data;

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      //alert('bad');
  });

}]);


DartApp.controller('AppDetailCtrl', ['$scope','$state',function($scope, $state)  {
  $scope.id_in = $state.params.appid;
}]);

DartApp.controller('FormAddAppCtrl', ['$scope','$http', function($scope, $http)  {
  $scope.app = {};

  // process the form
  $scope.processForm = function() {
    //set variables to be passed
    $scope.all_data = $.param($scope.app);
    alert($scope.all_data);
    $http({
      method  : 'POST',
      url     : 'query/insert_row.php',
      data    : $scope.all_data,  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
   })
  .success(function(data) {
    console.log(data);
    $location.path('/#/list_icon');
    $location.replace();

  });
};

}]);



DartApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('deal_t_db', {
      url: "/deal_t_db",
      templateUrl:'views/deal_t_db.html'
    })
  .state('documentation', {
      url: "/documentation",
      templateUrl:'views/documentation.html'
    })
  .state('app', {
      url: "/app/{appid}",
      templateUrl:'views/app_detail.html',
      controller: 'AppDetailCtrl'
    })
  .state('tools', {
      url: "/tools",
      templateUrl:'views/tools.html'
  })
  .state('catalog', {
      url: "/catalog",
      views : {
        "":{
          templateUrl:'views/catalog.html'
        },
        'sidebar_dynamic': {
          templateUrl:'views/cat_sb_d.html',
          data:{
            td:'hello world'
          }
        }
      }
    })
  .state('add_app_form', {
      url: "/add_app_form",
      templateUrl:'views/add_app_form.html'
    })
  .state('deal', {
      url: "/deal",
      templateUrl:'views/deal.html'
    })
  .state('inv', {
      url: "/inv",
      templateUrl:'views/inv2.html'
    })
  .state('tl', {
      url: "/tl",
      templateUrl:'views/tl.html'
    })
  .state('hotline', {
      url: "/hotline",
      templateUrl:'views/hotline.html'
    })

})
