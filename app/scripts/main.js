var models = [{
  "name": "cube",
  "vertices": {
    "0": {
      "x": 0,
      "y": 0,
      "z": 0
    },
    "1": {
      "x": 20,
      "y": 0,
      "z": 0
    },
    "2": {
      "x": 20,
      "y": 20,
      "z": 0
    },
    "3": {
      "x": 0,
      "y": 20,
      "z": 0
    },
    "4": {
      "x": 0,
      "y": 20,
      "z": 20
    },
    "5": {
      "x": 20,
      "y": 20,
      "z": 20
    }
  },
  "surfaces": {
    "0": [2, 1, 4, 3],
    "1": [2, 7, 6, 1],
    "2": [6, 5, 4, 1],
    "3": [6, 7, 8, 5],
    "4": [7, 2, 3, 8],
    "5": [8, 3, 4, 5]
  }
}, {
  "name": "prism",
  "vertices": {
    "0": {
      "x": 0,
      "y": 0,
      "z": 0
    },
    "1": {
      "x": 2,
      "y": 0,
      "z": 0
    },
    "2": {
      "x": 2,
      "y": 3,
      "z": 0
    },
    "3": {
      "x": 0,
      "y": 3,
      "z": 0
    },
    "4": {
      "x": 1,
      "y": 2,
      "z": 1
    },
    "5": {
      "x": 1,
      "y": 1,
      "z": 1
    }
  },
  "surfaces": {
    "0": [1, 2, 6],
    "1": [1, 4, 3, 2],
    "2": [1, 6, 5, 4],
    "3": [2, 3, 5, 6],
    "4": [3, 4, 5]
  }
}, {
  "name": "house",
  "vertices": {
    "0": {
      "x": 0,
      "y": 0,
      "z": 0
    },
    "1": {
      "x": 10,
      "y": 0,
      "z": 0
    },
    "2": {
      "x": 10,
      "y": 0,
      "z": 15
    },
    "3": {
      "x": 0,
      "y": 0,
      "z": 15
    },
    "4": {
      "x": 10,
      "y": 8,
      "z": 15
    },
    "5": {
      "x": 0,
      "y": 8,
      "z": 15
    },
    "6": {
      "x": 10,
      "y": 8,
      "z": 0
    },
    "7": {
      "x": 0,
      "y": 8,
      "z": 0
    },
    "8": {
      "x": 5,
      "y": 13,
      "z": 15
    },
    "9": {
      "x": 5,
      "y": 13,
      "z": 0
    }
  },
  "surfaces": {
    "0": [3, 2, 7, 5],
    "1": [4, 1, 2, 3],
    "2": [4, 3, 5, 9, 6],
    "3": [5, 7, 10, 9, 5],
    "4": [6, 8, 1, 4, 6],
    "5": [8, 10, 7, 2, 1],
    "6": [9, 10, 8, 6]
  }
}]

var vectorFactory = function(x, y, z) {
  var obj = {
    'x': x || 0,
    'y': y || 0,
    'z': z || 0
  };
  return obj;
};

var crossProduct = function(u,v){
  return vectorFactory(
    u.y*v.z - u.z*v.y,
    u.z*v.x - u.x*v.z,
    u.x*v.y - u.y*v.x
  );
}

var dotProduct = function(u,v){
  return u.x*v.x + u.y*v.y + u.z*v.z;
}



var app = angular.module('3DProjections', []);

app.controller('mainController', ['$scope', function($scope) {
  $scope.models = models;
  $scope.model = models[0];
  $scope.viewpoint = vectorFactory(0, 1, 0);
  $scope.plane = [
    vectorFactory(1, 0, 0),
    vectorFactory(0, 0, 0),
    vectorFactory(0, 1, 0)
  ];

  $scope.project = function(model, plane, viewpoint) {
    var u, v, n, d0;
    u = vectorFactory(
      plane[1].x - plane[0].x,
      plane[1].y - plane[0].y,
      plane[1].z - plane[0].z
    );
    v = vectorFactory(
      plane[2].x - plane[0].x,
      plane[2].y - plane[0].y,
      plane[2].z - plane[0].z
    );
    //Cross product
    n = crossProduct(u,v);
    d0 = dotProduct(n,plane[0]);

    console.log(u);
    console.log(v);
    console.log(n);
    console.log('Produto escalar: '+d0);

  };



}]);
