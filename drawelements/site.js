window.onload = main;

function main() {
    var canvas = document.getElementById('canvas'),
    gl = getWebGLContext(canvas);

    if (!gl) return;

    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    vertexShader = createShaderFromScriptElement(gl, '2d-vertex-shader');
    fragmentShader = createShaderFromScriptElement(gl, '2d-fragment-shader');
    program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);

    var positionLocation = gl.getAttribLocation(program, 'a_position');

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -0.9, -0.5,
        -0.1, -0.5,
        -0.9,  0.3,
    ]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    var elementBuffer = gl.createBuffer();
    elementBuffer.itemSize = 2;
    var indices = new Uint16Array([0, 1, 2]);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
}
