export default function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home',
    {url: '/',
    templateUrl:
    '/index.html'
    })
  .state('users', {url: '/users?page', templateUrl: '/views/users/list.html', controller: 'UsersController'})
  .state('new_user', {url: '/users/new', templateUrl: '/views/users/new.html', controller: 'NewUserController'})
  .state('user_detail', {url: '/users/{user_id}', templateUrl: '/views/users/detail.html', controller: 'UserDetailController'})
}
