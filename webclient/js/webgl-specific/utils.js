/**
 * Created by anthony on 14.01.2018.
 */

const resizeCanvas = () => {
    const width = gl.canvas.clientWidth;
    const height = gl.canvas.clientHeight;
    if (gl.canvas.width !== width || gl.canvas.height !== height) {
        gl.canvas.width = width;
        gl.canvas.height = height;
    }
};

const countNumElem = (positionsArray, numComponents) => {
    let numElem = positionsArray.length / numComponents;

    if (Math.floor(numElem) !== Math.ceil(numElem)) {
        throw new Error('Error occurred while evaluating element num');

    } else {
        numElem = Math.round(numElem);
    }
    return numElem;
};


const checkAgainstColors = (numElementsByPositions, colorsArray) => {
    const colorNumComponents = 3;
    let numElemByColors = countNumElem(colorsArray, colorNumComponents);

    if (numElementsByPositions > numElemByColors) {
        throw new Error('Not all vertices have colors (vec3)!');
    }
};


const bindBufferToAttribute = (attribArray, bufferInfo) => {
    gl.enableVertexAttribArray(attribArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.buffer);

    const numComponents = bufferInfo.numComponents;
    const type = bufferInfo.componentType;
    const normalize = bufferInfo.normalize;
    const stride = 0;
    const offset = 0;

    // binds current ARRAY_BUFFER (nearest one) to attribute
    gl.vertexAttribPointer(
        attribArray,
        numComponents,
        type,
        normalize,
        stride,
        offset);
};

const createBufferInfo = (gl, array, numComponents, componentType, normalize) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);


    return {
        buffer,
        numComponents,
        componentType,
        normalize,
    }
};
