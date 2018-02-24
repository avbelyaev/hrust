/**
 * Created by anthony on 10.02.2018.
 */


class Line extends Drawable {
    constructor(startPoint, endPoint, color, gl, vsSource, fsSource, id) {
        const positions = [...startPoint, ...endPoint];
        const colors = [...color, ...color];
        const idWithPrefix = `line-${id}`;

        super(positions, colors, gl, vsSource, fsSource, idWithPrefix);
        log(`constructing Line ${this.id}. pos: ${this.positions}, colors: ${this.colors}`);

        // draw mode
        this.drawMode = gl.LINE_LOOP;
    }

    draw() {
        this.gl.useProgram(this.program);

        // vertices
        bindBufferToAttribute(this.attribLocations.vertexPosition, this.positionBufferInfo);

        // colors
        bindBufferToAttribute(this.attribLocations.vertexColor, this.colorBufferInfo);

        // uniforms
        this.__updateMatrices();
        this.gl.uniformMatrix4fv(this.uniformLocations.uModel, false, this.mModel);
        this.gl.uniformMatrix4fv(this.uniformLocations.uView, false, this.mView);
        this.gl.uniformMatrix4fv(this.uniformLocations.uProjection, false, this.mProj);

        // draw
        this.gl.drawArrays(this.drawMode, 0, this.numElements);
    }
}
