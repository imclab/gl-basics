window.onload = main;

var points = [];

for (var i = 0; i < 2000000; i++) {
    points.push(Math.random() - 0.5, Math.random() - 0.5, Math.round(Math.random()));
}

function main() {
    // Get A WebGL context
    var canvas = document.getElementById('canvas'),
    gl = getWebGLContext(canvas);

    if (!gl) return;

    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // setup GLSL program
    vertexShader = createShaderFromScriptElement(gl, '2d-vertex-shader');
    fragmentShader = createShaderFromScriptElement(gl, '2d-fragment-shader');
    program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);

    var positionLocation = gl.getAttribLocation(program, 'a_position');
    var pointLocation = gl.getUniformLocation(program, 'u_pointsize');
    var matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    var centerLocation = gl.getUniformLocation(program, 'u_centerpoint');
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    gl.uniform1f(pointLocation, 2);
    gl.uniform2f(centerLocation, canvas.width / 2, canvas.height / 2);
    gl.drawArrays(gl.POINTS, 0, 2000000);

    var matrix = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];

    // Set the matrix.
    gl.uniformMatrix3fv(matrixLocation, false, matrix);

    var start = +new Date();
    d3.select(canvas)
    .call(d3.behavior.zoom().scaleExtent([0, 100]).on('zoom', zoom));

    function zoom() {
        console.log(d3.event.scale);
        matrix[6] = (d3.event.translate[0] - (canvas.width/2)) / 200;
        matrix[7] = (-d3.event.translate[1] + (canvas.height/2)) / 200;
        matrix[0] = d3.event.scale;
        matrix[4] = d3.event.scale;
        frame();
    }

    function frame() {
        var top = (Math.sin((+new Date() - start) / 100)) * 0.9;

        gl.uniformMatrix3fv(matrixLocation, false, matrix);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 2000000);
    }
}
