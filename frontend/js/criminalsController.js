var criminalsApp = angular.module('CriminalsApp', []);

criminalsApp.controller('CriminalsController', ['$scope', '$http', function($scope, $http) {
    $scope.criminals = [];
    $scope.criminal = {};
    $scope.createMode = true;
    $scope.newCriminal = newCriminal;
    $scope.editCriminal = editCriminal;
    $scope.deleteCriminal = deleteCriminal;
    $scope.saveCriminal = saveCriminal;

    getCriminals();

  function getCriminals () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/criminals'
    }).then(function (resp){
      console.log('Success');
      console.log(resp);
      $scope.criminals = resp.data.criminals;
    }, function (resp) {
      console.log('Error');
      console.log(resp);
    })
  }

  function newCriminal () {
    $scope.criminal = {};
    $scope.createMode = true;
  }

  function createCriminal () {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/criminals',
      data: $scope.criminal
    }).then(function (resp){
      console.log('Success');
      getCriminals();
      }
    );
    $scope.criminal = {}
  }

  function deleteCriminal(criminal) {
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/criminals/:id'
    }).then(function (resp){
      console.log('Success');
      var index = $scope.criminals.indexOf(criminal);
      $scope.criminals.splice(index, 1)
      }
    );
  }

  function editCriminal(criminal) {
    $scope.criminal = {
      _id: criminal._id,
      name: criminal.name,
      status: criminal.status,
      location: criminal.location
    };
    $scope.createMode = false;
  }

  function updateCriminal() {
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/criminals/' + $scope.criminal._id,
      data: $scope.criminal
    }).then(function (resp){
      console.log('Success');
      getCriminals();
      $scope.createMode = true;
    });
    $scope.criminal = {};
  }

  function saveCriminal() {
    if ($scope.createMode) {
      createCriminal();
    } else {
      updateCriminal();
    }
  }

}]);