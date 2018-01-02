scotchApp.controller('editSSOCobrandController', function($scope, $rootScope, myService, $location) {
    $rootScope.navBar = true;
    $rootScope.progressBar = true;
    var fetchSingleCobrandDetailsParams = {

        CobrandId: $rootScope.CobrandDetails.id

    };

    myService.postRequest(url.webSiteMainUrl + 'fetchSingleCobrandDetails.php', fetchSingleCobrandDetailsParams).then(function(data) {

        var data = data.data;
        // console.log('fetchSingleCobrandDetails=====================' + angular.toJson(data));
        if (data[0].Product == "FL") {
            $scope.hideInFL = false;
        } else {
            $scope.hideInFL = true;
        }
        $scope.BankName = data[0].BankName;
        $scope.ProductType = data[0].Product;
        $scope.productTypes = ['IAV', 'FL', 'PFM3.0'];
        $scope.TARGET_URL = data[0].TARGET_URL;
        $scope.CONSUMER_URL = data[0].CONSUMER_URL;
        $scope.UNIQUE_ISSUER = data[0].UNIQUE_ISSUER;
        $scope.CONSUMER_URL = data[0].CONSUMER_URL;
        $scope.TARGET_URL = data[0].TARGET_URL;
        $scope.PROXY_URL = data[0].PROXY_URL;
        $scope.SAML_VERSION = data[0].SAML_VERSION;
        $scope.ASS_ENCRYPT_FLAG = data[0].ASS_ENCRYPT_FLAG;
        $scope.MULTI_KEY_FLAG = data[0].MULTI_KEY_FLAG;
        $scope.ATTRIB_ENCRYPTION_MECHANISM = data[0].ATTRIB_ENCRYPTION_MECHANISM;
        $scope.ENCODE_ATTR_FLAG = data[0].ENCODE_ATTR_FLAG;
        $scope.SIGN_RES_FLAG = data[0].SIGN_RES_FLAG;
        $scope.SIGN_ASSER_FLAG = data[0].SIGN_ASSER_FLAG;
        $scope.SIGN_ALIAS_KEY = data[0].SIGN_ALIAS_KEY;
        $scope.LIT_FLAG = data[0].LIT_FLAG;
        $rootScope.progressBar = false;
        if (data[0].is_itemAccountIdFlow == '1') {
            $scope.is_itemAccoutIdFlow = true;
        } else {
            $scope.is_itemAccoutIdFlow = false;
        };

        if (data[0].is_AccountNumberMatch == '1') {
            $scope.is_ANM = true;
        } else {
            $scope.is_ANM = false;
        }
        $rootScope.activeMenu = 'home';
        $scope.itemAccoutIdFlowType = ['true', 'false'];
        $scope.ANMTypes = ['true', 'false'];

    });

    $scope.editButtonClicked = function() {
        $rootScope.progressBar = true;
        // console.log($scope.BankName);
        var EditCobrandDetailsParams = {

            CobrandId: $rootScope.CobrandDetails.id,
            BankName: $scope.BankName,
            restUrl: $scope.restUrl,
            cobrandName: $scope.cobrandName,
            cobrandPassword: $scope.cobrandPassword,
            finAppUrl: $scope.finAppUrl,
            is_itemAccountIdFlow: $scope.is_itemAccoutIdFlow,
            is_ANM: $scope.is_ANM,
            Product: $scope.ProductType

        };

        myService.postRequest(url.webSiteMainUrl + 'UpdateCobrandsDetails.php', EditCobrandDetailsParams).then(function(data) {

            var data = data.data;

            if (data[0].status == 1) {
                $location.path('/home');
                $rootScope.activeMenu = 'home';
            } else {
                alert('Cobrand Edit Failed');
            }
            $rootScope.progressBar = false;
            // console.log('EditCobrandDetails=============================' + angular.toJson(data));
        });
    };

});