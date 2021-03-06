window.onload = main;

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
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -0.9, -0.9,
        0.9, -0.9,
        -0.9,  0.9,
        -0.9,  0.9,
        0.9, -0.9,
        0.9,  0.9]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    var start = +new Date();
    function frame() {
        var top = (Math.sin((+new Date() - start) / 100)) * 0.9;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -0.9, -0.9,
            0.9, -0.9,
            -0.9,  top,
            -0.9,  top,
            0.9, -0.9,
            0.9,  top]), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        requestAnimationFrame(frame);
    }

    frame();
}
