import squareImg from 'App/Assets/Images/square.png'
import circleImg from 'App/Assets/Images/circle.png'
import starImg from 'App/Assets/Images/star.png'


class Shape {
  constructor(id, name, activeImg, inactiveImg) {
    // let nextId = 0;

    this.id = id;
    this.name = name;
    this.activeImg = activeImg;
    this.inactiveImg = inactiveImg;
    // shapesArr.push(this);
  };
};

export const getShapes = () => {
  const name = ['square', 'circle', 'star'];
  const shapeImgs = [squareImg, circleImg, starImg];
  const shapesArr = [];
  for (let i = 0; i < 3 ; i++) {
    const item = new Shape(i, name[i], shapeImgs[i], shapeImgs[i]);
    shapesArr.push(item);
  }

  return shapesArr;
  // new Shape(1, 'square', squareImg, squareImg);
  // new Shape(2, 'circle', circleImg, circleImg);
  // new Shape(3, 'star', starImg, starImg);
  // return shapesArr;

  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
  // const square = new Shape('square', matrixImg, matrixImg);
}
