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
