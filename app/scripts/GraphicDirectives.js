/**
 * Módulo contento diretivas gráficas.
 */
GraphicDirectives = {};

/**
 * Matriz de projeção em perspectiva (cônica) a partir de um plano (definido por um ponto
 * e um vetor) e um ponto de vista.
 *
 * @param   planePoint  - Vector contendo um ponto do plano.
 *          planeNormal - Vector contendo o vetor normal ao plano.
 *          viewPoint   - Vector contendo o ponto de vista.
 * @return  Array de Array de Number a matriz de transformação de projeção em perspectiva.
 */
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

/**
 * Matriz de projeção paralela (cilíndrica) a partir de um plano (definido por um ponto
 * e um vetor) e um ponto de vista.
 *
 * @param   planePoint  - Vector contendo um ponto do plano.
 *          planeNormal - Vector contendo o vetor normal ao plano.
 *          viewPoint   - Vector contendo o ponto de vista.
 * @return  Array de Array de Number a matriz de transformação de projeção paralela.
 */
GraphicDirectives.projectionParalel = function(planePoint, planeNormal, viewPoint) {
  var d0 = planeNormal.dotProduct(planePoint, planeNormal),
    d1 = planeNormal.dotProduct(viewPoint, planeNormal);

  return [
    [d1 + viewPoint.x * planeNormal.x, -viewPoint.x * planeNormal.y, -viewPoint.x * planeNormal.z, viewPoint.x * d0],
    [-viewPoint.y * planeNormal.x, d1 - viewPoint.y * planeNormal.y, -viewPoint.y * planeNormal.z, viewPoint.y * d0],
    [-viewPoint.z * planeNormal.x, -viewPoint.z * planeNormal.y, d1 - viewPoint.z * planeNormal.z, viewPoint.z * d0],
    [0, 0, 0, d1]
  ];
};

/**
 * Matriz de transformação Janela-Viewport.
 *
 * @param   window    - Objeto contento o ponto máximo e mínimo da janela em Vector.
 *          viewport  - Objeto contento o ponto máximo e mínimo da viewport em Vector.
 * @return  Array de Array de Number a matriz de transformação Janela-Viewport.
 */
GraphicDirectives.windowViewPort = function(window, viewport) {
  var a, t, aspectWindow, aspectViewport, newMaxX, newMaxY, sx, sy;
  sx = (viewport.max.x - viewport.min.x) / (window.max.x - window.min.x);
  sy = (viewport.max.y - viewport.min.y) / (window.max.y - window.min.y);
  a = [
    [sx, 0, 0, (-window.min.x * (viewport.max.x - viewport.min.x) / (window.max.x - window.min.x)) + viewport.min.x],
    [0, sy, 0, (-window.min.y * (viewport.max.y - viewport.min.y) / (window.max.y - window.min.y)) + viewport.min.y],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
  return a;
}

/**
 * Matriz de transformação de translação.
 *
 * @param   dx  - Number contendo o deslocamento no eixo x.
 *          dy  - Number contendo o deslocamento no eixo y.
 *          dz  - Number contendo o deslocamento no eixo z.
 * @return  Array de Array de Number a matriz de transformação de translação.
 */
GraphicDirectives.translation = function(dx, dy, dz) {
  return [
    [1, 0, 0, dx],
    [0, 1, 0, dy],
    [0, 0, 1, dz],
    [0, 0, 0, 1],
  ];
};

/**
 * Matriz de transformação de reflexão em relação ao eixo Y.
 *
 * @return  Array de Array de Number a matriz de transformação de reflexão.
 */
GraphicDirectives.reflectionY = function() {
  return [
    [1, 0, 0, 0],
    [0, -1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
};
