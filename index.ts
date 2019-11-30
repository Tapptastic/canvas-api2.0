namespace Engine {

    export const canvas = document.createElement('canvas');
    export const context = canvas.getContext('2d');

    export function Start() {
        document.body.append(canvas);
        document.body.style.margin = '0px';
    }

    export class Point {
        x: number;
        y: number;

        constructor(x: number = 5, y: number = 5) {
            this.x = x;
            this.y = y;
        }

        Draw() {
            context.beginPath();
            context.ellipse(this.x, this.y, 3, 3, 0, 0, Math.PI * 2);
            context.closePath();
            context.stroke();
        }
    }

    export class Line {
        static Draw(point: Point, point1: Point) {
            context.moveTo(point.x, point.y);
            context.lineTo(point1.x, point1.y);
            context.stroke();
        }
    }

    export class Triangle {
        Points: Point[];

        constructor(point: Point, point1: Point, point2: Point) {
            this.Points = [];
            this.Points.push(point);
            this.Points.push(point1);
            this.Points.push(point2);
        }

        Draw() {
            Line.Draw(this.Points[0], this.Points[1]);
            Line.Draw(this.Points[1], this.Points[2]);
            Line.Draw(this.Points[2], this.Points[0]);
        }
    }

    export class Square {
        x: number;
        y: number;
        w: number;
        h: number;

        constructor(x: number = 0, y: number = 0, w: number = 20, h: number = 20) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }

        Draw() {
            context.strokeRect(this.x, this.y, this.w, this.h);
        }
    }

    export class Cirlce {
        x: number;
        y: number;
        radius: number;

        constructor(x: number = 0, y: number = 0, radius: number = 5) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }

        Draw() {
            context.beginPath();
            context.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI * 2);
            context.closePath();
            context.stroke();
        }
    }
}

Engine.Start();

const center = {
    x: Engine.canvas.clientWidth / 2,
    y: Engine.canvas.clientHeight / 2
}

function RotatePoint(point, angle) {
    const rad = DegToRad(angle);
    const newX = (point.x * Math.cos(rad)) - (point.y * Math.sin(rad)); //?
    const newY = (point.x * Math.sin(rad) + (point.y * Math.cos(rad))) //?

    return new Engine.Point(newX, newY);
}

function Rotate(triangle: Engine.Triangle, angle: number) {
    const rad = DegToRad(angle);

    let newPoints: Engine.Point[] = [];

    triangle.Points.map(point => {
        //Take the centre x & y from point x & y
        //Rotate point 
        //Add centre x & y to point

        //See about world space and object space
        newPoints.push(RotatePoint({ x: point.x , y: point.y }, angle));
        // const newPoint = RotatePoint(new Engine.Point(
        //     center.x - point.x,
        //     center.y - point.y
        // ), angle)

        // newPoints.push(
        //     new Engine.Point(newPoint.x + center.x, newPoint.y + center.y)
        // );
    });

    return newPoints;
}

function DegToRad(deg) {
    return deg * Math.PI / 180;
}

// Engine.context.translate(Engine.canvas.clientWidth / 2, Engine.canvas.clientHeight / 2);

const p = new Engine.Point(20, 20);
const p1 = new Engine.Point(40, 40);
const p2 = new Engine.Point(60, 20);

const t = new Engine.Triangle(p, p1, p2);

const points = Rotate(t, 13);
const t1 = new Engine.Triangle(
    points[0],
    points[1],
    points[2]
);

t.Draw();
t1.Draw();