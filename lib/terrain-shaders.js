var TerrainShaders = {
    createStandardShader: function(color) {
        var r = Math.floor(color / 256 / 256) / 256;
        var g = Math.floor(color / 256 % 256) / 256;
        var b = Math.floor(color % 256) / 256;
        var result = [r, g, b];
        return {
            getColorAt: function() {
                return result;
            }
        };
    },
    createTerraShader: function(height) {
        var resolution = 128;
        var results = new Array(resolution);
        results[0] = [.5, .5, 0];
        results[35] = [.9, .9, 0];
        results[40] = [.3, .7, .1];
        results[45] = [.3, .7, .1];
        results[50] = [.6, .5, .2];
        results[80] = [.5, .5, .5];
        results[100] = [1, 1, 1];
        results[127] = [1, 1, 1];
        _interpolateAll(results);
        return {
            getColorAt: function(y) {
                if (!results[Math.floor(y / height * 3.55 * resolution)]) {
                    console.error('adjust to', height / y, 'or less');
                    debugger;
                }
                return results[Math.floor(y / height * 3.6 * resolution)];
            }
        };
        function _interpolateAll(array) {
            var from = undefined;
            for (var i = 0; i < array.length; i++) {
                if (array[i] === undefined && from === undefined) {
                    from = i;
                }
                if (array[i] !== undefined && from !== undefined) {
                    _interpolate(array, from - 1, i);
                    from = undefined;
                }
            }
        }
        function _interpolate(array, from, to) {
            var c0 = array[from];
            var c1 = array[to];
            var diff = to - from;
            for (var i = 1; i < diff; i++) {
                var w1 = i / diff;
                var w0 = 1 - w1;
                array[from + i] = [
                    c0[0] * w0 + c1[0] * w1,
                    c0[1] * w0 + c1[1] * w1,
                    c0[2] * w0 + c1[2] * w1
                ];
            }
        }
    }
};
