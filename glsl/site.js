window.onload = main;

function main() {
    // Get A WebGL context
    var canvas = document.getElementById('canvas'),
    gl = getWebGLContext(canvas);

    if (!gl) return;

    gl.clearColor(1, 1, 1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // setup GLSL program
    vertexShader = createShaderFromScriptElement(gl, '2d-vertex-shader');
    fragmentShader = createShaderFromScriptElement(gl, '2d-fragment-shader');
    program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);

    var positionLocation = gl.getAttribLocation(program, 'a_position');
    var resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,
        -1,  1,
        +1,  1,
        +1,  1,
        +1, -1,
        -1, -1
    ]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // var start = +new Date();
    // function frame() {
    //     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //     gl.drawArrays(gl.TRIANGLES, 0, 6);
    //     requestAnimationFrame(frame);
    // }

    // frame();
}
