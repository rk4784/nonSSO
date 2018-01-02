var scotchApp = angular.module('FL')
    .controller('forgotPasswordController', function($scope, $location, $rootScope, myService) {

        $('.carousel.carousel-slider').carousel({ fullWidth: true });

        $scope.forgotPasswordButtonClicked = function() {
            $rootScope.progressBar = true;

            var ForgotPasswordParams = {

                email: $scope.email,

            };

            myService.postRequest(url.webSiteMainUrl + 'forgotPassword.php', ForgotPasswordParams).then(function(data) {

                // console.log('Forgot Password Data==================' + angular.toJson(data.data));

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
                    if (data[0].userStatus == 1 && data[1].mailStatus == 1) {
                        swal({
                            title: 'Success',
                            text: 'Please check your mail.',
                            timer: 1500,
                            type: 'success'
                        });
                        $scope.email = '';

                    } else {
                        swal({
                            title: 'Error',
                            text: 'Invalid Email Address',
                            timer: 1500,
                            type: 'error'
                        });
                    }
                };
            });
        };
    });