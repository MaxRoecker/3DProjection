/**
 * Definição do módulo Angular da aplicação.
 */
var app = angular.module('3DProjections', []);

/**
 * Definição do controller da aplicação.
 */
app.controller('mainController', ['$scope', function($scope) {
  $scope.views = ['projection', 'about', 'contact'];
  $scope.view = $scope.views[0];

  $scope.models = new Array(modelsJSON.length);
  for (var i = 0; i < modelsJSON.length; i++) {
    var model = modelsJSON[i];
    $scope.models[i] = new Model(model.name, model.vertices, model.surfaces);
  };
  $scope.projectionTypes = ['Paralela', 'Perspectiva']

  $scope.model = $scope.models[3];
  $scope.viewpoint = new Vector(0, 0, -20);
  $scope.plane = [
    new Vector(1, 0, 0),
    new Vector(0, 0, 0),
    new Vector(0, 1, 0)
  ];
  $scope.viewport = {
    'min': new Vector(0, 0, 0),
    'max': new Vector(500, 500, 0),
  }
  $scope.projection = {
    'type': 'Perspectiva',
    'grid': true,
    'dots': [],
    'lines': []
  };

  /**
   * Função que realiza a projeção.
   *
   * @param type      - String contendo o tipo da projeção. Pode ser 'Paralela' ou 'Perspectiva'.
   *        grid      - Boolean checando se a grade deve ser mostrada ou não.
   *        model     - Model contendo o modelo a ser projetado.
   *        plane     - Array[3] de Vector contendo os três pontos que definem o plano.
   *        viewpoint - Vector contendo o ponto de vista.
   */
  $scope.project = function(type, grid, model, plane, viewpoint) {
    var u, v, w, n, d0, m, p, t, window;
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


    console.table(model.vertices);
    p = model.homogeneousCoordinates(model.vertices);
    if (type == 'Paralela') {
      m = Matrix.multiply(GraphicDirectives.projectionParalel(plane[1], n, viewpoint), p);
    } else {
      m = Matrix.multiply(GraphicDirectives.projectionPerspective(plane[1], n, viewpoint), p);
    }
    m = Matrix.multiply(GraphicDirectives.reflectionY(), m);
    m = model.cartesianCoordinates(m);

    var window = {
      'min': new Vector().min(m),
      'max': new Vector().max(m)
    };

    p = model.homogeneousCoordinates(m);


    t = Matrix.multiply(GraphicDirectives.windowViewPort(window, $scope.viewport), p);
    console.table(t);
    t = model.cartesianCoordinates(t);

    var lines = [];
    var dots = [];

    console.table(t);

    for (var i = 0; i < model.surfaces.length; i++) {
      var surface = model.surfaces[i];

      u = new Vector(
        model.vertices[surface[1]].x - model.vertices[surface[0]].x,
        model.vertices[surface[1]].y - model.vertices[surface[0]].y,
        model.vertices[surface[1]].z - model.vertices[surface[0]].z
      );
      v = new Vector(
        model.vertices[surface[2]].x - model.vertices[surface[0]].x,
        model.vertices[surface[2]].y - model.vertices[surface[0]].y,
        model.vertices[surface[2]].z - model.vertices[surface[0]].z
      );
      n = u.crossProduct(u, v);
      w = new Vector(
        viewpoint.x - model.vertices[surface[0]].x,
        viewpoint.y - model.vertices[surface[0]].y,
        viewpoint.z - model.vertices[surface[0]].z
      );
      p = n.dotProduct(n, w);

      if (p > 0 || grid) {
        for (var j = 0; j < surface.length; j++) {
          u = t[surface[j]];
          v = t[surface[(j + 1) % surface.length]];
          lines.push({
            'u': u,
            'v': v
          });
        }
      }
    }
    $scope.projection.dots = t;
    $scope.projection.lines = lines;
  };

  $scope.removeDot = function(index) {
    delete $scope.model.vertices.splice(index, 1);
  };
  $scope.addDot = function() {
    $scope.model.vertices.push(new Vector(0, 0, 0));
  };
  $scope.newSurface = function(index, surface) {
    $scope.model.surfaces[index] = JSON.parse(surface);
  };
  $scope.removeSurface = function(index) {
    delete $scope.model.surfaces.splice(index, 1);
    $scope.model.surfacesStr = [];
    for (var i = 0; i < $scope.model.surfaces.length; i++) {
      $scope.model.surfacesStr.push(JSON.stringify($scope.model.surfaces[i]));
    }
  };
  $scope.addSurface = function() {
    $scope.model.surfaces.push([]);
    $scope.model.surfacesStr = [];
    for (var i = 0; i < $scope.model.surfaces.length; i++) {
      $scope.model.surfacesStr.push(JSON.stringify($scope.model.surfaces[i]));
    }
  }

  $(document).keypress(function(event) {
    var aux;
    switch (String.fromCharCode(event.which)) {
      case 'w':
        $scope.viewpoint.y += 1;
        break;
      case 's':
        $scope.viewpoint.y -= 1;
        break;
      case 'a':
        $scope.viewpoint.x -= 1;
        break;
      case 'd':
        $scope.viewpoint.x += 1;
        break;
      case 'q':
        $scope.viewpoint.z -= 1;
        break;
      case 'e':
        $scope.viewpoint.z += 1;
        break;
    };
    $('#btn-project').click();
  });


}]);
