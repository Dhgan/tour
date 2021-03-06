var app = require('./app.js');

// 设置angular路由
app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

	// 将!#变成#
	$locationProvider.hashPrefix('');

	$stateProvider
        .state('register', {
            url: '/register?redirect',
            templateUrl: './register.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    Pace.restart();
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/register/register.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            },
            controller: 'RegisterCtrl'
        })
        .state('login', {
            url: '/login?redirect',
            templateUrl: './login.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    Pace.restart();
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/login/login.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            },
            controller: 'LoginCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: './home.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/home/home.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', function($http) {
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/homePackage?t=' + Math.random()
                    }).then(function (res) {
                        return res.data;
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'HomeCtrl'
        })
        .state('package', {
            url: '/package/{packageId}',
            templateUrl: './package.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/package/package.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$stateParams', function($http, $stateParams) {
                    var packageId = $stateParams.packageId;
                    if(!packageId) return ;
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/package/' + packageId,
                        params: {
                            t: Math.random()
                        }
                    }).then(function(res) {
                        return res.data;
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'PackageCtrl'
        })
        .state('orderConfirm', {
            url: '/orderConfirm?packageId&date&number',
            templateUrl: './orderConfirm.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/orderConfirm/orderConfirm.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$stateParams', '$state', function($http, $stateParams, $state) {
                    var packageId = $stateParams.packageId,
                        date = $stateParams.date,
                        number = $stateParams.number;
                    if(!packageId || !date || !number) return;
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/order',
                        params: {
                            packageId: packageId,
                            date: date,
                            number: number,
                            t: Math.random()
                        }
                    }).then(function(res) {
                        var data = res.data,
                            status = data.status;
                        if(status === '1024') {
                            return $state.go('login', {
                                redirect: encodeURIComponent('orderConfirm?' + JSON.stringify({packageId: packageId, date: date, number: number})),
                            });
                        } else {
                            return data;
                        }
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'OrderConfirmCtrl'
        })
        .state('pay', {
            url: '/pay?orderId',
            templateUrl: './pay.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/pay/pay.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$stateParams', '$state', function($http, $stateParams, $state) {
                    var orderId = $stateParams.orderId;
                    if(!orderId) return;
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/getPayOrder',
                        params: {
                            orderId: orderId,
                            t: Math.random()
                        }
                    }).then(function(res) {
                        var data = res.data,
                            status = data.status;
                        if(status === '1024') {
                            return $state.go('login', {
                                redirect: encodeURIComponent('pay?' + JSON.stringify({orderId: orderId})),
                            });
                        } else {
                            return data;
                        }
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'PayCtrl'
        })
        .state('search', {
            url: '/search/:q/:p?pageSize', // q = query and p = page num
            templateUrl: './search.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/search/search.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$stateParams', function($http, $stateParams) {
                    var page = $stateParams.p || 1,
                        query = $stateParams.q,
                        pageSize = $stateParams.pageSize || 10;
                    if(!query) return null;
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/search/' + query + '/' + page,
                        params: {
                            t: Math.random(),
                            pageSize: pageSize
                        }
                    }).then(function(res) {
                        return res.data;
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'SearchCtrl'
        })
        .state('member', {
            url: '/member',
            templateUrl: './member.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/member/member.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            },
            abstract: true
        })
        .state('member.order', {
            url: '/order?p&pageSize&q',
            templateUrl: './order.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/order/order.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$stateParams', '$state', function($http, $stateParams, $state) {
                    var page = $stateParams.p || 1,
                        pageSize = $stateParams.pageSize || 10,
                        queryStr = $stateParams.q || '';
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/orderList/' + page,
                        params: {
                            t: Math.random(),
                            pageSize: pageSize,
                            queryStr: queryStr
                        }
                    }).then(function(res) {
                        var data = res.data,
                            status = data.status;
                        if(status === '1024') {
                            return $state.go('login', {
                                redirect: 'member.order'
                            });
                        } else {
                            return data;
                        }
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'OrderCtrl'
        })
        .state('member.collection', {
            url: '/collection?p&pageSize',
            templateUrl: './collection.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/collection/collection.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$stateParams', '$state', function($http, $stateParams, $state) {
                    var page = $stateParams.p || 1,
                        pageSize = $stateParams.pageSize || 10;
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/collection/' + page,
                        params: {
                            t: Math.random(),
                            pageSize: pageSize
                        }
                    }).then(function(res) {
                        var data = res.data,
                            status = data.status;
                        if(status === '1024') {
                            return $state.go('login', {
                                redirect: 'member.collection'
                            });
                        } else {
                            return data;
                        }
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'CollectionCtrl'
        })
        .state('member.user', {
            url: '/user',
            templateUrl: './user.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/user/user.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$state', function($http, $state) {
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/user',
                        params: {
                            t: Math.random()
                        }
                    }).then(function(res) {
                        var data = res.data,
                            status = data.status;
                        if(status === '1024') {
                            return $state.go('login', {
                                redirect: 'member.user'
                            });
                        } else {
                            return data;
                        }
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'UserCtrl'
        })
        .state('member.changePassword', {
            url: '/changePassword',
            templateUrl: './changePassword.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/changePassword/changePassword.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$state', function($http, $state) {
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/user',
                        params: {
                            t: Math.random()
                        }
                    }).then(function(res) {
                        var data = res.data,
                            status = data.status;
                        if(status === '1024') {
                            return $state.go('login', {
                                redirect: 'member.changePassword'
                            });
                        } else {
                            return data;
                        }
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'ChangePasswordCtrl'
        })
        .state('member.changeEmail', {
            url: '/changeEmail',
            templateUrl: './changeEmail.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/changeEmail/changeEmail.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$state', function($http, $state) {
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/user',
                        params: {
                            t: Math.random()
                        }
                    }).then(function(res) {
                        var data = res.data,
                            status = data.status;
                        if(status === '1024') {
                            return $state.go('login', {
                                redirect: 'member.changeEmail'
                            });
                        } else {
                            return data;
                        }
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'ChangeEmailCtrl'
        })
        .state('forgetPassword', {
            url: '/forgetPassword',
            templateUrl: './forgetPassword.html',
            abstract: true,
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    Pace.restart();
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/forgetPassword/forgetPassword.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            }
        })
        .state('forgetPassword.step1', {
            url: '/step1',
            templateUrl: './step1.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    Pace.restart();
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/step1/step1.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            },
            controller: 'Step1Ctrl'
        })
        .state('forgetPassword.step2', {
            url: '/step2',
            templateUrl: './step2.html',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    Pace.restart();
                    var deferred = $q.defer();
                    require.ensure([], function() {
                        var module = require('../pages/step2/step2.js');
                        $ocLazyLoad.load({
                            name: 'tour'
                        });
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                PageInfo: ['$http', '$state', function($http, $state) {
                    Pace.restart();
                    return $http({
                        method: 'get',
                        url: '/api/tourist/getValidateEmail',
                        params: {
                            t: Math.random()
                        }
                    }).then(function(res) {
                        var data = res.data,
                            status = data.status;
                        if(status === '1000') {
                            return $state.go('forgetPassword.step1');
                        } else {
                            return data;
                        }
                    }, function(error) {
                        swal('', error.data, 'error');
                    });
                }]
            },
            controller: 'Step2Ctrl'
        });


	$urlRouterProvider.otherwise('/home');

}]);