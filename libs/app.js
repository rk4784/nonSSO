// var scotchApp = angular.module('FL', ['ngRoute', 'ngMaterial', 'angucomplete-alt', 'ui.router', 'ngSanitize','ui.materialize']);
var scotchApp = angular.module('FL', ['ngRoute', 'ngMaterial', 'angucomplete-alt', 'ui.router', 'ngSanitize']);

scotchApp.config(function($routeProvider, $stateProvider, $urlRouterProvider) {

    $routeProvider

        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/forgotPassword', {
            templateUrl: 'pages/forgotPassword.html',
            controller: 'forgotPasswordController'
        })

        .when('/changePassword', {
            templateUrl: 'pages/changePassword.html',
            controller: 'changePasswordController'
        })

        .when('/signup', {
            templateUrl: 'pages/signup.html',
            controller: 'signupController'
        })

        .when('/AddCobrand', {
            templateUrl: 'pages/AddCobrand.html',
            controller: 'addCobrandController'
        })

        .when('/AddSSOCobrand', {
            templateUrl: 'pages/AddCobrandSSO.html',
            controller: 'addSSOCobrandController'
        })

        .when('/editCobrand', {
            templateUrl: 'pages/EditCobrand.html',
            controller: 'editCobrandController',
            paramExample: 'rahul'
        })

        .when('/editSSOCobrand', {
            templateUrl: 'pages/EditSSOCobrand.html',
            controller: 'editSSOCobrandController',
            paramExample: 'rahul'
        })

        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        .when('/syncApi', {
            templateUrl: 'pages/syncApi/syncApiTest.html',
            controller: 'syncApiController'
        })

        .when('/editCobrandSync', {
            templateUrl: 'pages/syncApi/EditCobrand.html',
            controller: 'editCobrandsyncApiController'
        })

        .when('/projectsDetails', {
            templateUrl: 'pages/productDetails.html',
            controller: 'projectsController'
        })

        .when('/SiteDetails', {
            templateUrl: 'pages/SiteDetails.html',
            controller: 'contactController'
        })

        .otherwise({
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        });

});