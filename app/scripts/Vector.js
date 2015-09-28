/**
 * Classe que representa um vetor dado em
 * coordenadas euclidianas (x, y, z).
 *
 * O Vetor é definido pela equação xi + yj + kz,
 * onde (i,j,k) são os vetores da base canônica.

 * @constructor x - número coeficiente do vetor i.
 *              y - número coeficiente do vetor j.
 *              z - número coeficiente do vetor k.
 */
function Vector(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};

/**
 * @return String contento a representação textual do vetor
 */
Vector.prototype.toString = function() {
  return "<" + this.x + "," + this.y + "," + this.z + ">";
};

/**
 * @param   u - instância de Vector.
 *          v - instância de Vector.
 * @return  Vector contento o resultado do
 *          produto escalar dos vetores u e v.
 */
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


 /**
  * @param   u - instância de Vector.
  *          v - instância de Vector.
  * @return  Number contento o resultado do
  *          produto escalar dos vetores u e v.
  */
Vector.prototype.dotProduct = function(u, v) {
  return u.x * v.x + u.y * v.y + u.z * v.z;
};

/**
 * @param   Array contendo instâncias de Vector.
 * @return  Vector contento os menores resultados para
 *          as coordenadas x, y e z.
 */
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

/**
 * @param   Array contendo instâncias de Vector.
 * @return  Vector contento os maiores resultados para
 *          as coordenadas x, y e z.
 */
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
