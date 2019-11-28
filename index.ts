namespace Engine {

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

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
        Draw(point: Point, point1: Point, point2: Point) {
            Line.Draw(point, point1);
            Line.Draw(point1, point2);
            Line.Draw(point2, point);
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

