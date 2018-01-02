var scotchApp = angular.module('FL')
scotchApp.controller('signupController', function($scope, $location, $rootScope, myService) {

    $('.carousel.carousel-slider').carousel({ fullWidth: true });
    $scope.passwordType = "password";
    $scope.showText = "Show";
    $scope.showPasswordButtonClicked = function() {
        // console.log($scope.showText);
        if ($scope.showText == "Show") {
            $scope.showText = "Hide";
            $scope.passwordType = "text";
        } else {
            $scope.showText = "Show";
            $scope.passwordType = "password";
        }
    };
    $scope.signupButtonClicked = function() {

        var DeveloperSignupParams = {

            userName: $scope.uname,

            password: $scope.password,

            name: $scope.name
        };

        myService.postRequest(url.webSiteMainUrl + 'signup.php', DeveloperSignupParams).then(function(data) {

            // console.log('Signup Data==================' + angular.toJson(data.data));

            if (data.data[0].status == '1') {

                var userId = data.data[0].userId;

                localStorage.setItem('is_userLogin', "true");

                localStorage.setItem('userId', userId);

                localStorage.setItem('userEmail', data.data[0].userName);

                $location.path('/home');

            } else {
                alert('Try again');
            }

        });
    };

});