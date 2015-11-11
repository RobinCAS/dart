export default function($scope, $state, User){
  $scope.add = function(){
    let u = new User(this.user);
    u.save().then(res => {
      $state.go('users');
    });
  };
}
