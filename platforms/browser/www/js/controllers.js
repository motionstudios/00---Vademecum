angular.module('app.controllers', [])

        .controller('cargaCtrl', ['$scope', '$stateParams',
            function ($scope, $stateParams) {
                // variable general de la URL
                $URL = 'https://www.vademecumj.com/';
                //$URL = 'http://localhost/16-015_vademecum/';

            }])
        /* Login acceso */
        .controller('postController', function ($scope, $http, $state, $ionicLoading, $timeout) {


            /* Carga los paises al Select del registro */
            $http.get($URL + 'rest/categorias.php?parent_id=0').success(function (data) {
                $scope.paises = data;
                $scope.countSelected = $scope.paises[0].id; 
                console.log(data);
            });

            $scope.rsJSON = [];
            // obtenemos el evento submit del formulario ng-submit="entrar()"
            $scope.entrar = function () {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                })
                var req = {
                    method: 'POST',
                    url: $URL + 'rest/login.php',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: {id: $scope.txtID, nombre: $scope.txtNombre, email: $scope.txtEmail, pais: $scope.txtPais},
                    dataType: "jsonp"
                }

                $http(req)
                        .success(function (data) {
                            console.log(data);
                            // si no existe el usuario nos muestre un alerta de error
                            if (typeof (data.nombre) == "undefined") {
                                $ionicLoading.hide();
                                alert(data);
                            } else {
                                // guarda datos en local
                                window.localStorage['MM_Pais'] = data.pais;
                                window.localStorage['MM_id'] = data.id;
                                window.localStorage['MM_Email'] = data.email;
                                window.localStorage['MM_Nombre'] = data.nombre;
                                $timeout(function () {
                                    $ionicLoading.hide();
                                    $state.go("menu.index");
                                }, 2000);
                            }
                        })
                        .error(function (data) {
                            $ionicLoading.hide();
                            alert('Error: ' + data);
                        });
            };
        })

        .controller('loginCtrl', ['$scope', '$stateParams',
            function ($scope, $stateParams) {

            }])

        .controller('cerrarCtrl', ['$scope', '$stateParams',
            function ($scope, $stateParams) {
                // vaciar datos del usuario al cerrar sesión
                window.localStorage['MM_Pais'] = "";
                window.localStorage['MM_id'] = "";
                window.localStorage['MM_Email'] = "";
                window.localStorage['MM_Nombre'] = "";

            }])

        /* detecta si hay login en la home y redirige al inicio */
        .controller('ProtectedController3', ['$scope', '$stateParams',
            function ($scope, $location, $ionicViewService, $state) {
                var user = window.localStorage['MM_Pais'];
                if (user !== "") {
                    window.location = "#/menu/home";
                    //alert('Sin acceso');

                }
            }])
        /* detecta si hay login a la carga de cualquier página */
        .controller('ProtectedController', ['$scope', '$stateParams',
            function ($scope, $location, $ionicViewService, $state) {
                var user = window.localStorage['MM_Pais'];
                if (user === "" || user == undefined) {
                    //$state.go("login");
                    //alert('Sin acceso');
                    window.location = "#/login";
                }
            }])
        /* detecta el cambio de estado del navegador para ver si está logeado */
        .controller('ProtectedController2', ['$rootScope', function ($rootScope) {
                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                    //alert(toState.name);
                    var user = window.localStorage['MM_Pais'];
                    if (user === "" || user == undefined) {
                        //$state.go("login");
                        //alert('Sin acceso');
                        window.location = "#/login";
                    }

                });
                //alert("controller loaded");
            }
        ])


        .controller('homeCtrl', ['$scope', '$stateParams',
            function ($scope, $stateParams) {



            }])

        /* CATEGORÍA PRODUCTOS MENÚ*******/
        .controller('menuCtrl', ['$scope', '$http', function ($scope, $http) {

                // carga variable del País
                var pais = window.localStorage['MM_Pais'];
                var nombre = window.localStorage['MM_Nombre'];
                $scope.pais = pais;
                $scope.nombre = nombre;
                // listado de Categorías
                $http.get($URL + 'rest/categorias.php?parent_id=' + pais).success(function (data) {
                    $scope.sessions = data;
                    console.log(data);
                });
                // recupera el nombre del País
                var URL2 = $URL + 'rest/categoria_detalle.php?id=' + pais;
                $http.get(URL2).success(function (data1) {
                    $scope.nombrePais = data1[0].caption;
                });

            }])

        /* CATEGORÍA listado PRODUCTOS  *******/
        .controller('categoriaCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', function ($scope, $http, $stateParams, $ionicLoading) {

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                var idcat = $stateParams.id;

                var URL2 = $URL + 'rest/categoria_detalle.php?id=' + idcat;
                $http.get(URL2).success(function (data1) {

                    $scope.id = data1[0].id;
                    $scope.titulo = data1[0].caption;
                    $scope.color = data1[0].color;
                    $scope.img = data1[0].img;
                    $scope.details = data1[0].details;
                    console.log(data1);

                });

                var URL1 = $URL + 'rest/categorias.php?parent_id=' + idcat;
                $http.get(URL1).success(function (data) {
                    $scope.sessions = data;
                    $ionicLoading.hide();
                    console.log(data);
                });

            }])
        /* BÚSQUEDA  PRODUCTOS  *******/
        .controller('buscarCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', function ($scope, $http, $stateParams, $ionicLoading) {
                
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                var texto = $stateParams.id;
                var pais = window.localStorage['MM_Pais'];

                var URL2 = $URL + 'rest/buscar.php?texto=' + texto + '&pais=' + pais;
                $http.get(URL2).success(function (data2) {
                    $scope.texto = texto;
                    $scope.sessions3 = data2;
                    $ionicLoading.hide();
                    console.log(data2);
                });

            }])
        /* PRODUCTOS DETALLE *******/
        .controller('detalleCtrl', ['$scope', '$http', '$stateParams', '$ionicLoading', function ($scope, $http, $stateParams, $ionicLoading) {
                
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                var idcat = $stateParams.id;
                var parent_id = $stateParams.parent_id;
                /* producto */
                var URL2 = $URL + 'rest/categoria_detalle.php?id=' + idcat;
                $http.get(URL2).success(function (data1) {

                    $scope.id = data1[0].id;
                    $scope.caption = data1[0].caption;
                    $scope.color = data1[0].color;
                    $scope.img = data1[0].img;
                    $scope.details = data1[0].details;
                    $scope.pdf = data1[0].pdf;
                    $ionicLoading.hide();
                    console.log(data1);
                });
                /* categoria */
                var URL1 = $URL + 'rest/categoria_detalle.php?id=' + parent_id;
                $http.get(URL1).success(function (data) {

                    $scope.id_1 = data[0].id;
                    $scope.caption_1 = data[0].caption;
                    $scope.color_1 = data[0].color;
                    $scope.img_1 = data[0].img;
                    $scope.details_1 = data[0].details;
                    console.log(data);
                });

            }])

        // formulario actualizar datos
        .controller('postController3',
                function ($scope, $stateParams, $http, $state, $ionicLoading, $location) {

                    $scope.pais_modal = window.localStorage['MM_Pais'];
                    $scope.nombre_modal = window.localStorage['MM_Nombre'];
                    $scope.email_modal = window.localStorage['MM_Email'];
                    $scope.id_modal = window.localStorage['MM_id'];

                    /* Carga los paises al Select del registro */
                    $http.get($URL + 'rest/categorias.php?parent_id=0').success(function (data) {
                        $scope.paises1 = data;
                        console.log(data);
                    });

                    $scope.rsJSON = [];
                    // obtenemos el evento submit del formulario ng-submit="actualizar()"
                    $scope.actualizar = function () {

                        var req = {
                            method: 'POST',
                            url: $URL + 'rest/update_pais.php',
                            headers: {
                                'Content-Type': undefined
                            },
                            data: {nombre: $scope.nombre_modal, email: $scope.email_modal, pais: $scope.pais_modal, id: $scope.id_modal},
                            dataType: "jsonp"
                        }

                        $http(req)
                                .success(function (data) {
                                    console.log(data);
                                    // si no existe el usuario nos muestre un alerta de error
                                    if (typeof (data.id) == "undefined") {
                                        //$ionicLoading.hide();
                                        alert("Datos no correctos");
                                    } else {
                                        // guarda datos en local
                                        window.localStorage['MM_Pais'] = data.pais;
                                        window.localStorage['MM_id'] = data.id;
                                        window.localStorage['MM_Email'] = data.email;
                                        window.localStorage['MM_Nombre'] = data.nombre;
                                        alert("Actualización correcta");
                                        $scope.closeModal();
                                        //redirigir a la página de inicio y recargar menú
                                        //window.location = "#/menu/home";
                                        $state.go("reenvio");

                                        //$state.go("menu.index");
                                    }
                                })
                                .error(function (data) {
                                    //$ionicLoading.hide();
                                    alert('Error: ' + data);
                                });
                    };

                })

        .controller('reenvioCtrl', ['$scope', '$stateParams', '$timeout', '$state',
            function ($scope, $stateParams, $timeout, $state) {

                //window.location = "#/menu/home";
                $timeout(function () {
                    $state.go("menu.index");
                }, 1000);

            }])


// Ventanas Modales ******************************************************/

        // 
        .controller('cambiarPais', function ($scope, $ionicModal) {

            $ionicModal.fromTemplateUrl('templates/pais.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.openModal = function () {

                $scope.modal.show();

            };
            $scope.closeModal = function () {
                $scope.modal.hide();
            };
        })

