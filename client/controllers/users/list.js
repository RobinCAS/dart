export default function($scope, $state, User){
  $scope.current = ($state.params.page || 1) * 1;

  User.count($scope.current).then(res =>{
    $scope.users = res.data.rows;
    $scope.pages = Math.ceil(res.data.count / 2);
  });

  $scope.delete = function(id){
    User.delete(id).then(res => {
      $scope.users = $scope.users.filter(u => u.id != res.data);
    });
  };

  $scope.prev = function(){
    if($scope.current > 1){
      $state.go('users', {page: $scope.current - 1});
    }
  }

  $scope.next = function(){
    if($scope.current < $scope.pages){
      $state.go('users', {page: $scope.current + 1});
    }
  }
}
