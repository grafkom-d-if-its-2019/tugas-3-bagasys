// Attributes are values that are applied to individual vertices.
// Attributes are only available to the vertex shader.
// This could be something like each vertex having a distinct color.
// Attributes have a one-to-one relationship with vertices.
attribute vec4 aPosition;
uniform float theta;
uniform float translateX;
uniform float translateY;
uniform float scaleX;
uniform float scaleY;

void main(){
  mat4 translateMat=mat4(
    1.,0.,0.,0.,
    0.,1.,0.,0.,
    0.,0.,1.,0.,
    translateX,translateY,0.,1.
  );
  
  mat4 translateMatR=mat4(
    1.,0.,0.,0.,
    0.,1.,0.,0.,
    0.,0.,1.,0.,
    -translateX,-translateY,0.,1.
  );
  
  mat4 rotationMat=mat4(
    cos(theta),sin(theta),0.,0.,
    -sin(theta),cos(theta),0.,0.,
    0.,0.,1.,0.,
    0.,0.,0.,1.
  );
  
  mat4 scalationMat=mat4(
    scaleX,0.,0.,0.,
    0.,scaleY,0.,0.,
    0.,0.,1.,0.,
    0.,0.,0.,1.
  );
  
  gl_Position=translateMatR*rotationMat*scalationMat*translateMat*aPosition;
  
  gl_PointSize=10.;
}
