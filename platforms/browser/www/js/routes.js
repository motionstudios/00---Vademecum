angular.module('app.routes', [])

        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                    .state('menu', {
                        cache: false,
                        url: '/menu',
                        templateUrl: 'templates/menu.html',
                        controller: 'menuCtrl'

                    })

                    .state('login', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'loginCtrl'
                    })
                    .state('cerrar', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'cerrarCtrl'
                    })
                    // página Home logos
                    .state('menu.index', {
                        url: '/home',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/index.html',
                            }
                        }
                    })

                    .state('reenvio', {
                        cache: false,
                        url: '/reenvio',
                        templateUrl: 'templates/reenvio.html'
                    })


                    // Categoria
                    .state('menu.categoria', {
                        cache: false,
                        url: '/categoria/:id',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/categoria.html',
                                controller: 'categoriaCtrl'
                            }
                        }
                    })
                    // Detalle
                    .state('menu.detalle', {
                        cache: false,
                        url: '/detalle/:id/:parent_id',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/detalle.html',
                                controller: 'detalleCtrl'
                            }
                        }
                    })
                    // Buscar
                    .state('menu.buscar', {
                        cache: false,
                        url: '/buscar/:id',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/buscar.html',
                                controller: 'buscarCtrl'
                            }
                        }
                    })




            // página de inicio por defecto (Login) IMPORTATE ¡¡¡¡¡ DEJAR ESTA LÍNEA AL FINAL
            $urlRouterProvider.otherwise('/login');


        });