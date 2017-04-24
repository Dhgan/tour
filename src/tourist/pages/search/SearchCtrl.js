var app = require('../../common/app.js');

app.controller('SearchCtrl',['$scope', '$http', '$stateParams', '$state', '$anchorScroll',
function($scope, $http, $stateParams, $state, $anchorScroll) {

    var currentPage = $stateParams.p || 1;

    $scope.packages = [
        {
            url: 'https://m.tuniucdn.com/fb2/t1/G2/M00/74/DB/Cii-T1hbhkCINUd4AB7XBb7MUOkAAF4SQIzSywAHtcd583_w640_h480_c1_t0_w640_h320_c1_t0.jpg',
            title: '泰国普吉岛6或7日游',
            packageId: '1',
            departureCity: '西安',
            days: '3天',
            price: '899.00',
            features: '0购物，15人精品小团，醉美花季骑行洱海，十里春风百亩花田，明星导游贴心服务，亲子蜜月畅游古城'
        },
        {
            url: 'http://b4-q.mafengwo.net/s9/M00/5C/56/wKgBs1hLebqAGNdpAAL8ymB_VtM64.jpeg?imageMogr2%2Fthumbnail%2F%21220x130r%2Fgravity%2FCenter%2Fcrop%2F%21220x130%2Fquality%2F100',
            title: '泰国普吉岛6或7日游',
            packageId: '1',
            departureCity: '西安',
            days: '3天',
            price: '899.00'
        },
        {
            url: 'https://m.tuniucdn.com/fb2/t1/G2/M00/A7/C9/Cii-TFf80PGIapBPADplLY7PuykAADRhAAuVhgAOmVF841_w640_h480_c1_t0_w640_h320_c1_t0.png',
            title: '泰国普吉岛6或7日游泰国普吉岛国普吉岛6或7日游泰国普吉岛6或7日游',
            packageId: '1',
            departureCity: '西安',
            days: '3天',
            price: '899.00',
            features: '0购物，15人精品小团，醉美花季骑行洱海，十里春风百亩花田，明星导游贴心服务，亲子蜜月畅游古城'
        },
        {
            url: 'https://m.tuniucdn.com/fb2/t1/G2/M00/23/89/Cii-TFiv7HWIe9lMAAUMarHWU8IAAHjjwElbhIABQyC965_w640_h480_c1_t0_w640_h320_c1_t0.jpg',
            title: '泰国普吉岛6或7日游',
            packageId: '1',
            departureCity: '西安',
            days: '3天',
            price: '899.00',
            features: '0购物，15人精品小团，醉美花季骑行洱海，十里春风百亩花田，明星导游贴心服务，亲子蜜月畅游古城0购物，15人精品小团，醉美花季骑行洱海，十里春风百亩花田，明星导游贴心服务，亲子蜜月畅游古城'
        },
        {
            url: 'https://m.tuniucdn.com/fb2/t1/G2/M00/74/DB/Cii-T1hbhkCINUd4AB7XBb7MUOkAAF4SQIzSywAHtcd583_w640_h480_c1_t0_w640_h320_c1_t0.jpg',
            title: '泰国普吉岛6或7日游',
            packageId: '1',
            departureCity: '西安',
            days: '3天',
            price: '899.00',
            features: '0购物，15人精品小团，醉美花季骑行洱海，十里春风百亩花田，明星导游贴心服务，亲子蜜月畅游古城，0购物，15人精品小团，醉美花季骑行洱海，十里春风百亩花田，明星导游贴心服务，亲子蜜月畅游古城'
        },
        {
            url: 'https://m.tuniucdn.com/fb2/t1/G2/M00/E6/18/Cii-TFgZvlyIGKhRAAPnIr3YkYgAAEGqgL28e8AA-c6091_w640_h480_c1_t0_w640_h320_c1_t0.jpg',
            title: '泰国普吉岛6或7日游',
            packageId: '1',
            departureCity: '西安',
            days: '3天',
            price: '899.00',
            features: '0购物，15人精品小团，醉美花季骑行洱海，十里春风百亩花田，明星导游贴心服务，亲子蜜月畅游古城'
        },
        {
            url: 'https://m.tuniucdn.com/fb2/t1/G2/M00/A7/C9/Cii-TFf80PGIapBPADplLY7PuykAADRhAAuVhgAOmVF841_w640_h480_c1_t0_w640_h320_c1_t0.png',
            title: '泰国普吉岛6或7日游',
            packageId: '1',
            departureCity: '西安',
            days: '3天',
            price: '899.00',
            features: '0购物，15人精品小团，醉美花季骑行洱海，十里春风百亩花田，明星导游贴心服务，亲子蜜月畅游古城'
        },
        {
            url: 'https://m.tuniucdn.com/fb2/t1/G2/M00/23/89/Cii-TFiv7HWIe9lMAAUMarHWU8IAAHjjwElbhIABQyC965_w640_h480_c1_t0_w640_h320_c1_t0.jpg',
            title: '泰国普吉岛6或7日游',
            packageId: '1',
            departureCity: '西安',
            days: '3天',
            price: '899.00',
            features: '0购物，15人精品小团，醉美花季骑行洱海，十里春风百亩花田，明星导游贴心服务，亲子蜜月畅游古城'
        }
    ];

    $scope.totalItems = 186;

    $scope.currentPage = currentPage;

    $scope.maxSize = 5;

    $scope.goPage = function() {
        $state.go('search', {
            p: $scope.currentPage
        });
        $anchorScroll('searchResult');
    };
}]);