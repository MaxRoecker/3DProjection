var modelsJSON = [{
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
      "x": 0,
      "y": 0,
      "z": 20
    },
    "6": {
      "x": 20,
      "y": 0,
      "z": 20
    },
    "7": {
      "x": 20,
      "y": 20,
      "z": 20
    },

  },
  "surfaces": {
    "0": [1, 0, 3, 2],
    "1": [1, 6, 5, 0],
    "2": [5, 4, 3, 0],
    "3": [5, 6, 7, 4],
    "4": [6, 1, 2, 7],
    "5": [7, 2, 3, 4]
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
    "0": [0, 1, 5],
    "1": [0, 3, 2, 1],
    "2": [0, 5, 4, 3],
    "3": [1, 2, 4, 5],
    "4": [2, 3, 4]
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
    "0": [2, 1, 6, 4],
    "1": [3, 0, 1, 2],
    "2": [3, 2, 4, 8, 5],
    "3": [4, 6, 9, 8, 4],
    "4": [5, 7, 0, 3, 5],
    "5": [7, 9, 6, 1, 0],
    "6": [8, 9, 7, 5]
  }
}];

function Vector(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};
Vector.prototype.toString = function() {
  return "<" + this.x + "," + this.y + "," + this.z + ">";
};
Vector.prototype.crossProduct = function(u, v) {
  var w = new Vector(
    u.y * v.z - u.z * v.y,
    u.z * v.x - u.x * v.z,
    u.x * v.y - u.y * v.x
  );
  for (var axis in w) {
    if (w.hasOwnProperty(axis)) {
      w[axis] = (w[axis] === 0) ? 0 : w[axis];
    }
  }
  return w;
};
Vector.prototype.dotProduct = function(u, v) {
  return u.x * v.x + u.y * v.y + u.z * v.z;
};
Vector.prototype.min = function(vectors) {
  var min = new Vector(Infinity, Infinity, Infinity);
  for (var i = 0; i < vectors.length; i++) {
    if (vectors[i].x < min.x) {
      min.x = vectors[i].x;
    }
    if (vectors[i].y < min.y) {
      min.y = vectors[i].y;
    }
    if (vectors[i].z < min.z) {
      min.z = vectors[i].z;
    }
  }
  return min;
};
Vector.prototype.max = function(vectors) {
  var max = new Vector(-Infinity, -Infinity, -Infinity);
  for (var i = 0; i < vectors.length; i++) {
    if (vectors[i].x > max.x) {
      max.x = vectors[i].x;
    }
    if (vectors[i].y > max.y) {
      max.y = vectors[i].y;
    }
    if (vectors[i].z > max.z) {
      max.z = vectors[i].z;
    }
  }
  return max;
};

var Matrix = {};
Matrix.multiply = function(a, b) {
  var aNumRows = a.length,
    aNumCols = a[0].length,
    bNumRows = b.length,
    bNumCols = b[0].length,
    m = new Array(aNumRows);
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols);
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
};

function Model(name, vertices, surfaces) {
  this.name = name;
  this.vertices = [];
  this.surfaces = [];
  for (var point in vertices) {
    if (vertices.hasOwnProperty(point)) {
      this.vertices.push(
        new Vector(
          vertices[point].x,
          vertices[point].y,
          vertices[point].z
        )
      );
    }
  }
  for (var surface in surfaces) {
    if (surfaces.hasOwnProperty(surface)) {
      this.surfaces.push(surfaces[surface]);
    }
  }
}
Model.prototype.homogeneousCoordinates = function(cartesianCoordinates) {
  var axisX = new Array(cartesianCoordinates.length),
    axisY = new Array(cartesianCoordinates.length),
    axisZ = new Array(cartesianCoordinates.length),
    axisW = new Array(cartesianCoordinates.length);
  for (var i = 0; i < cartesianCoordinates.length; i++) {
    axisX[i] = (cartesianCoordinates[i].x);
    axisY[i] = (cartesianCoordinates[i].y);
    axisZ[i] = (cartesianCoordinates[i].z);
    axisW[i] = 1;
  }
  return [axisX, axisY, axisZ, axisW];
};
Model.prototype.cartesianCoordinates = function(homogeneousCoordinates) {
  var cartesianCoordinates = [homogeneousCoordinates[0].length];
  for (var i = 0; i < homogeneousCoordinates[0].length; i++) {
    cartesianCoordinates[i] = new Vector(
      homogeneousCoordinates[0][i] / homogeneousCoordinates[3][i],
      homogeneousCoordinates[1][i] / homogeneousCoordinates[3][i],
      homogeneousCoordinates[2][i] / homogeneousCoordinates[3][i]
    );
  }
  return cartesianCoordinates;
};



GraphicDirectives = {};
GraphicDirectives.projectionPerspective = function(planePoint, planeNormal, viewPoint) {
  var d0 = planeNormal.dotProduct(planePoint, planeNormal),
    d1 = planeNormal.dotProduct(viewPoint, planeNormal),
    d = d0 - d1;
  return [
    [d + viewPoint.x * planeNormal.x, viewPoint.x * planeNormal.y, viewPoint.x * planeNormal.z, -viewPoint.x * d0],
    [viewPoint.y * planeNormal.x, d + viewPoint.y * planeNormal.y, viewPoint.y * planeNormal.z, -viewPoint.y * d0],
    [viewPoint.z * planeNormal.x, viewPoint.z * planeNormal.y, d + viewPoint.z * planeNormal.z, -viewPoint.z * d0],
    [planeNormal.x, planeNormal.y, planeNormal.z, -d1],
  ];
};

GraphicDirectives.projectionParalel = function(planePoint, planeNormal, viewPoint) {
  var d0 = planeNormal.dotProduct(planePoint, planeNormal),
    d1 = planeNormal.dotProduct(viewPoint, planeNormal),
    d = d0 - d1;
  return [
    [d - viewPoint.x * planeNormal.x, -viewPoint.x * planeNormal.y, -viewPoint.x * planeNormal.z, viewPoint.x * d0],
    [-viewPoint.y * planeNormal.x, d - viewPoint.y * planeNormal.y, -viewPoint.y * planeNormal.z, viewPoint.y * d0],
    [-viewPoint.z * planeNormal.x, -viewPoint.z * planeNormal.y, d - viewPoint.z * planeNormal.z, viewPoint.z * d0],
    [0, 0, 0, -d1],
  ];
};

GraphicDirectives.windowViewPort = function(window, viewport) {
  var a, t, aspectWindow, aspectViewport, newMaxX, newMaxY, sx, sy;

  aspectWindow = (window.max.x - window.min.x) / (window.max.y - window.min.y);
  aspectViewport = (viewport.max.x - viewport.min.x) / (viewport.max.y - viewport.min.y);

  sx = (viewport.max.x - viewport.min.x) / (window.max.x - window.min.x);
  sy = (viewport.max.y - viewport.min.y) / (window.max.y - window.min.y);

  t = [
    [sx, 0, 0, -sx * window.min.x],
    [0, sy, 0, -sy * window.min.y],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];

  if (aspectWindow > aspectViewport) {
    newMaxY = ((viewport.max.x - viewport.min.x) / aspectWindow) + viewport.min.y;
    a = [
      [1, 0, 0, 0],
      [0, 1, 0, (viewport.max.y - newMaxY) / 2],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  } else {
    newMaxX = ((viewport.max.y - viewport.min.y) * aspectWindow) + viewport.min.x;
    a = [
      [1, 0, 0, (viewport.max.x - newMaxX) / 2],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }
  return Matrix.multiply(a, t);
};

GraphicDirectives.translation = function(dx, dy, dz) {
  return [
    [1, 0, 0, dx],
    [0, 1, 0, dy],
    [0, 0, 1, dz],
    [0, 0, 0, 1],
  ];
};

GraphicDirectives.reflectionY = function() {
  return [
    [1, 0, 0, 0],
    [0, -1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
};


var app = angular.module('3DProjections', []);

app.controller('mainController', ['$scope', function($scope) {
  $scope.models = new Array(modelsJSON.length);
  for (var i = 0; i < modelsJSON.length; i++) {
    var model = modelsJSON[i];
    $scope.models[i] = new Model(model.name, model.vertices, model.surfaces);
  };

  $scope.model = $scope.models[0];
  $scope.viewpoint = new Vector(0, 0, -20);
  $scope.plane = [
    new Vector(20, 0, 0),
    new Vector(0, 0, 0),
    new Vector(0, 20, 0)
  ];
  $scope.projection = {
    'dots': [],
    'lines': []
  };

  $scope.project = function(model, plane, viewpoint) {
    var u, v, n, d0, m, t, p;
    u = new Vector(
      plane[0].x - plane[1].x,
      plane[0].y - plane[1].y,
      plane[0].z - plane[1].z
    );
    v = new Vector(
      plane[2].x - plane[1].x,
      plane[2].y - plane[1].y,
      plane[2].z - plane[1].z
    );
    n = u.crossProduct(u, v);
    d0 = n.dotProduct(n, plane[0]);
    p = model.homogeneousCoordinates(model.vertices);
    m = Matrix.multiply(GraphicDirectives.projectionPerspective(plane[0], n, viewpoint), p);
    m = model.cartesianCoordinates(m);

    var window = {
      'min': new Vector().min(m),
      'max': new Vector().max(m)
    }
    viewport = {
      'min': new Vector(0,0,0),
      'max': new Vector(400,400,0),
    }
    p = model.homogeneousCoordinates(m);
    m = Matrix.multiply(GraphicDirectives.windowViewPort(window,viewport),p);
    m = model.cartesianCoordinates(m);
    $scope.projection.dots = m;
    console.table(model.vertices);
    console.table(m);

    var lines = [];
    for (var i = 0; i < model.surfaces.length; i++) {
      var dots = model.surfaces[i];
      for (var j = 0; j < dots.length; j++) {
        u = $scope.projection.dots[dots[j]];
        v = $scope.projection.dots[dots[(j + 1) % dots.length]];
        lines.push({
          'u': u,
          'v': v
        });
      }
    }
    $scope.projection.lines = lines;


  };



}]);
