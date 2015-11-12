/*----------------------------------
    function    :   dart_create_catalog
    author      :
    added       :   10/20/15

    description :   ui js from startbootstrap

----------------------------------*/
// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


'use strict';

// declare a module
var DartApp = angular.module('DartApp', [
  'ngRoute',
  'ui.bootstrap'
]);


DartApp.controller('CarouselCtrl', ['$scope','$http', function($scope, $http)  {
  $http({
    method: 'GET',
    //url: 'query/json_app.php'
    url: 'assets/json/a3.json'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      $scope.apps = response.data;
      $scope.predicate = 'title';
      $scope.reverse = true;
      $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      alert('bad');
    });
}]);

DartApp.controller('TeamCtrl', ['$scope', function($scope)  {
  $scope.team=[{
      name:'Yung Fung',
      image:'yung.png',
      bio:''
    },{
      name:'Manika Gupta',
      image:'manika_f.png',
      bio: ''
  },{
      name:'Ramesh Rethnasiromoni',
      image:'ramesh_f.png',
      bio:''
  }, {
      name:'Bin Luo',
      image:'bin_f.png',
      bio:''
  }, {
      name:'Seth DeSantis',
      image:'seth_f.png',
      bio:''
  }, {
      name:'Baljinder Singh',
      image:'bali_f.png',
      bio:''
  }]
}]);
