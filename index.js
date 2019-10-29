(function(global) {
  var canvas, gl, program;

  glUtils.SL.init({
    callback: function() {
      main();
    }
  });

  function main() {
    window.addEventListener("resize", resizer);
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(
        gl,
        gl.VERTEX_SHADER,
        glUtils.SL.Shaders.v1.vertex
      ),
      fragmentShader = glUtils.getShader(
        gl,
        gl.FRAGMENT_SHADER,
        glUtils.SL.Shaders.v1.fragment
      );
    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    resizer();
  }

  function draw() {
    var n = initBuffers(gl);
    if (n < 0) {
      console.log("Failed to set the positions of the vertices");
      return;
    }

    var thetaUniformLocation = gl.getUniformLocation(program, "theta");
    var translateXUniformLocation = gl.getUniformLocation(
      program,
      "translateX"
    );
    var translateYUniformLocation = gl.getUniformLocation(
      program,
      "translateY"
    );

    var scaleXUniformLocation = gl.getUniformLocation(program, "scaleX");
    var scaleYUniformLocation = gl.getUniformLocation(program, "scaleY");

    var scaleX = 1;
    var scaleY = 1;
    var theta = 0;
    var translateX;
    var translateY;
    var melebar = 1;

    function render() {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(scaleXUniformLocation, 1);
      gl.uniform1f(scaleYUniformLocation, 1);
      theta += 0.0074;
      gl.uniform1f(thetaUniformLocation, theta);
      translateX = 0.65;
      gl.uniform1f(translateXUniformLocation, translateX);
      translateY = -0.3;
      gl.uniform1f(translateYUniformLocation, translateY);
      gl.drawArrays(gl.LINE_LOOP, n - 9, 9); //0.65, -0.3

      if (scaleX >= 1.0) melebar = -1.0;
      else if (scaleX <= -1.0) melebar = 1.0;
      scaleX += 0.0074 * melebar;
  
      gl.uniform1f(scaleXUniformLocation, scaleX);
      gl.uniform1f(scaleYUniformLocation, scaleY);
      gl.uniform1f(thetaUniformLocation, 0);
      translateX = -0.35;
      gl.uniform1f(translateXUniformLocation, translateX);
      translateY = -0.3;
      gl.uniform1f(translateYUniformLocation, translateY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n - 9); //-0.35, -0.3,

      requestAnimationFrame(render);
    }
    render();
  }

  function initBuffers() {
    var vertices = new Float32Array([
      0.3,
      0.75,
      0.2,
      0.75,
      0.35,
      0.4,
      0.3,
      0.16,
      0.4,
      0.16,
      0.4,
      0.75,
      0.5,
      0.75,
      0.3,
      0.16,
      0.4,
      0.16,
      0.3,
      -0.15,
      0.4,
      -0.15,

      -0.8,
      0.75,
      -0.7,
      0.75,

      -0.65,
      0.4,

      -0.6,
      0.75,
      -0.5,
      0.75,

      -0.6,
      0.16,
      -0.6,
      -0.15,
      -0.7,
      -0.15,
      -0.7,
      0.16
    ]);

    var n = vertices.length / 2;
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    if (aPosition < 0) {
      console.log("Failed to get the storage location of aPosition");
      return -1;
    }
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
    return n;
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    draw();
  }
})(window || this);
