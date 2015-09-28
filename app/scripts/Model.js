/**
 * Classe que representa um modelo de desenho
 * dado em coordenadas euclidianas (x, y, z)
 * através de instâncias de Vector.
 *
 * @constructor name -      String contendo o nome do modelo.
 *              vertices -  Array de Vector contendo os
 *                          vértices do modelo.
 *              surfaces -  Array de Number que indicam os
 *                          indices de vertices dos pontos que
 *                         compoẽm a superfície.
 */
function Model(name, vertices, surfaces) {
  this.name = name;
  this.vertices = [];
  this.surfaces = [];
  this.surfacesStr = [];
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
      this.surfacesStr.push(JSON.stringify(surfaces[surface]));
    }
  }
}

/**
 * @param   cartesianCoordinates - Array de Vector.

 * @return  Array de Array de Number contendo as instâncias de Vector em
 *          coordenadas homogeneas.
 */
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

/**
 * @param   homogeneousCoordinates - Array de Array de Number.

 * @return  Array de Vector contendo as instâncias de Vector em
 *          coordenadas euclidianas.
 */
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

/**
 * Modelos serializados.
 */
var modelsJSON = [{
  "name": "Cubo",
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
  "name": "Prisma",
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
  "name": "Casa",
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
}, {
  "name": "Outro",
  "vertices": {},
  "surfaces": {}
}];
