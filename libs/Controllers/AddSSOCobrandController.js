var scotchApp = angular.module('FL')
    .controller('addSSOCobrandController', function($scope, $rootScope, myService, $location) {
        $rootScope.navBar = true;

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
        $scope.ASS_ENCRYPT_FLAGS = ['none', 'ON'];
        $scope.MULTI_KEY_FLAGS = ['none', 'ON'];
        $scope.CUSTOM_ENCRYPTION_FLAGS = ['none', 'ON'];
        $scope.ENCRYPT_FLAGS = ['none', 'ON'];
        $scope.ATTRIB_ENCRYPTION_MECHANISMS = ['tripledes-cbc', 'aes128-cbc', 'aes256-cbc', 'aes192-cbc'];
        $scope.SignResponseS = ['true', 'false'];
        $scope.SignAssertionS = ['true', 'false'];
        $scope.LIT_FLAGS = ['true', 'false'];
        $scope.ENCODE_ATTR_FLAGS = ['none', 'ON'];

        $scope.SAML_Versions = ['1.0', '2.0'];
        $scope.hideInFL = false;

        $scope.ProductTypeCheck = function() {
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

        $scope.addSSOCobrandButtonClicked = function() {

            var ssoParams = {
                'BankName': $scope.BankName,
                'UNIQUE_ISSUER': $scope.UNIQUE_ISSUER,
                'CONSUMER_URL': $scope.CONSUMER_URL,
                'TARGET_URL': $scope.TARGET_URL,
                'PROXY_URL': $scope.TARGET_URL,
                'SAML_VERSION': $scope.SAML_Version,
                'ASS_ENCRYPT_FLAG': $scope.ASS_ENCRYPT_FLAG,
                'MULTI_KEY_FLAG': $scope.MULTI_KEY_FLAG,
                'CUSTOM_ENCRYPTION_FLAG': $scope.CUSTOM_ENCRYPTION_FLAG,
                'ENCRYPT_FLAG': $scope.ENCRYPT_FLAG,
                'ATTRIB_ENCRYPTION_MECHANISM': 'http://www.w3.org/2001/04/xmlenc#' + $scope.ATTRIB_ENCRYPTION_MECHANISM,
                'ENCODE_ATTR_FLAG': $scope.ENCODE_ATTR_FLAG,
                'SIGN_RES_FLAG': $scope.SignResponse,
                'SIGN_ASSER_FLAG': $scope.SignAssertion,
                'SIGN_ALIAS_KEY': $scope.SIGN_ALIAS_KEY,
                'LIT_FLAG': $scope.LIT_FLAG,
                'is_itemAccountIdFlow': $scope.is_itemAccoutIdFlow,
                'is_AccountNumberMatch': $scope.is_ANM,
                'Product': $scope.ProductType,
                'envs': $scope.envs,
                'uid': localStorage.getItem('userId')
            };
            console.log(ssoParams);
            myService.postRequest(url.webSiteMainUrl + 'insertSSOCobrand.php', ssoParams).then(function(data) {
                var data = data.data;
                if (data[0].status == '1') {
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