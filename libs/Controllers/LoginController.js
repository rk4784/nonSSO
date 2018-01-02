var scotchApp = angular.module('FL')
    .controller('loginController', function($scope, $location, $rootScope, myService) {

        $rootScope.navBar = false;
        $('.carousel.carousel-slider').carousel({ fullWidth: true });

        autoplay();

        function autoplay() {
            // $('.carousel.carousel-slider').carousel('next');
            // setTimeout(autoplay, 3000);
        }

        // if (localStorage.getItem('is_userLogin') == 'true') {
        //     $location.path('/home');
        // };

        $scope.passwordType = "password";

        $scope.showText = "Show";
        $scope.showPasswordButtonClicked = function() {
            if ($scope.showText == "Show") {
                $scope.showText = "Hide";
                $scope.passwordType = "text";
            } else {
                $scope.showText = "Show";
                $scope.passwordType = "password";
            }
        };
        $scope.goToSignupPage = function() {
            $location.path('/signup');
        };

        $scope.loginButtonClicked = function() {
            $rootScope.progressBar = true;
            var DeveloperLoginParams = {

                userName: $scope.uname,

                password: $scope.password
            };

            myService.postRequest(url.webSiteMainUrl + 'Login.php', DeveloperLoginParams).then(function(data) {

                // console.log('Cobrand List Data==================' + angular.toJson(data.data));

                var data = data.data;
                $rootScope.progressBar = false;
                if (data.length == 0) {

                    swal({
                        title: 'Error',
                        text: 'Invalid credentials',
                        timer: 1500,
                        type: 'error'
                    });

                } else {

                    var userId = data[0].id;

                    var DeveloperRole = data[0].role;

                    localStorage.setItem('userEmail', data[0].userName);

                    localStorage.setItem('is_userLogin', "true");

                    localStorage.setItem('userId', userId);

                    localStorage.setItem('DeveloperRole', DeveloperRole);

                    $location.path('/home');
                }

            });

        };
        $scope.guestLogin = function() {
            $location.path('/home');
            localStorage.setItem('guestLogin', true);
        }

    });