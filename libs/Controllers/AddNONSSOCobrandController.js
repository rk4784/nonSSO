var scotchApp = angular.module('FL')
scotchApp.controller('addCobrandController', function($scope, $rootScope, myService, $location, $mdDialog) {

    $rootScope.navBar = true;
    // if (localStorage.getItem('guestLogin') == null) {
    //     $location.path('/login');
    // };

    var confirm = $mdDialog.confirm()
        .title('Choose Cobrand Type.')
        .textContent('')
        .ariaLabel('Choose Cobrand Type.')
        .ok('SSO')
        .cancel('nonSSO');

    $mdDialog.show(confirm).then(function() {
        $location.path('/AddSSOCobrand');
        $scope.showpage = true;
    }, function() {
        $scope.showpage = true;
    });

    if (localStorage.getItem('is_userLogin') == "true") {

        $scope.Envstypes = ['QA', 'Stage', 'Local'];

    } else {

        $scope.Envstypes = ['QA', 'Stage'];
    };

    $scope.ANMTypes = ['true', 'false'];
    $scope.productTypes = ['PFM3.0', 'IAV', 'FL'];
    $scope.productTypess = ['MS', 'DS'];
    $scope.itemAccoutIdFlowType = ['true', 'false'];
    $scope.is_SyncApiTypes = ['true', 'false'];
    $scope.is_urlTypes = ['YSL', 'REST'];
    $scope.hideInFL = false;

    $scope.ProductTypeCheck = function() {
        // console.log($scope.ProductType);
        if ($scope.ProductType == "IAV") {
            $scope.hideInFL = true;
            $scope.is_itemAccoutIdFlow = '';
            $scope.is_ANM = '';
        } else {
            $scope.hideInFL = false;
            $scope.is_itemAccoutIdFlow = false;
            $scope.is_ANM = false;
        }
    };


    $scope.addCobrandButtonClicked = function() {

        var CobrandUserNameSave;
        var a = localStorage.getItem('userId');

        if ($scope.envs == 'Local') {
            CobrandUserNameSave = 'test@' + a + 'Local423';
        } else {
            CobrandUserNameSave = 'test@' + a + 'QA423';
        }
        var checkLastCharofRestUrl = $scope.restUrl.slice(-1);
        var checkLastCharoffinAppUrl = $scope.finAppUrl.slice(-1);
        var checkLastCharofYSLUrl = $scope.YSLURL.slice(-1);
        if (checkLastCharofRestUrl != "/") {
            $scope.restUrl = $scope.restUrl + '/';
        }
        if (checkLastCharoffinAppUrl != "/") {
            $scope.finAppUrl = $scope.finAppUrl + '/';
        }
        if (checkLastCharofYSLUrl != "/") {
            $scope.YSLURL = $scope.YSLURL + "/";
        }
        var CreateCobrandParams = {
            BankName: $scope.BankName,
            restUrl: $scope.restUrl,
            cobrandName: $scope.cobrandName,
            cobrandPassword: $scope.cobrandPassword,
            userLoginName: $scope.userLoginName,
            userLoginPassword: $scope.userLoginPassword,
            Product: $scope.ProductType,
            envs: $scope.envs,
            finAppUrl: $scope.finAppUrl,
            CobrandUserNameSave: CobrandUserNameSave,
            is_itemAccountIdFlow: $scope.is_itemAccoutIdFlow,
            is_AccountNumberMatch: $scope.is_ANM,
            is_SyncApi: $scope.is_SyncApi,
            YSLURL: $scope.YSLURL,
            is_YSL: $scope.is_YSL,
            uid: localStorage.getItem('userId')

        };

        myService.postRequest(url.webSiteMainUrl + 'insertCobrand.php', CreateCobrandParams).then(function(data) {

            var data = data.data;

            // console.log('Create Cobrand Data======================' + angular.toJson(data));

            if (data[0].status == '1') {
                // swal({
                //     title: 'Success',
                //     text: 'Cobrand created',
                //     timer: 1000,
                //     type: 'success'
                // });
                // $scope.BankName = '';
                // $scope.restUrl = '';
                // $scope.cobrandName = '';
                // $scope.cobrandPassword = '';
                // $scope.userLoginName = '';
                // $scope.userLoginPassword = '';
                // $scope.finAppUrl = '';
                $rootScope.activeMenu = 'home';
                $location.path('/home');

            } else {
                swal({
                    title: 'Error',
                    text: 'Please try again',
                    timer: 1500,
                    type: 'error'
                });
            }
        });
    };
});