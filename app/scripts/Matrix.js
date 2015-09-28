/**
 * Módulo contento operações para matrizes.
 */
var Matrix = {};

/**
 * Função que executa multiplicação
 * de matrizes de Arrays contento Arrays.
 * A multiplicação somente irá ser correta se,
 * dada as matrizes A(n*m) e B(m·p).
 *
 * @param   a - Array de Array de Number.
 *          b - Array de Array de Number.
 * @return  Array de Array de Number contento o resultado
 *          da multiplicação de a por b.
 */
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
