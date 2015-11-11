export default function($http){
  class User {
    constructor(obj) {
      this.name = obj.name;
      this.title = obj.title;
      this.age = obj.age;
      this.gender = obj.gender;
    }

    save(){
      return $http.post('/users', this);
    }

    static count(page){
      return $http.get('/users/count/' + page);
    }

    static findById(id){
         return $http.get('/users/' + id);
       }


    static all(){
      return $http.get('/users');
    }

    static delete(id){
      return $http.delete('/users/' + id);
    }
  }

  return User;
}
