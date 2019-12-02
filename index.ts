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

        Rotate(angle: number) {
            const rad = Helper.DegToRad(angle);
            const newX = (this.x * Math.cos(rad)) - (this.y * Math.sin(rad)); //?
            const newY = (this.x * Math.sin(rad) + (this.y * Math.cos(rad))) //?

            return new Engine.Point(newX, newY);
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

        Rotate(angle: number) {
            //Need to rotate around origin 
            //Need to set the origin as it's center and then calculate for World Space and Object Space
            for (let i = 0; i < this.Points.length; i += 1) {
                this.Points[i] = this.Points[i].Rotate(angle);
            }
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

    export enum UIInputs {
        TEXT,
        SLIDER,
        NUMBER,
        BUTTON
    }

    export class Vector {
        x: number;
        y: number;
        mag: number;
        direction: string;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;

            this.mag = Math.sqrt((this.x * this.x) + (this.y * this.y));
            // this.mag = (this.x * this.x) + (this.y * this.y);
        }



        Dot(vector: Vector) {
            return (this.x * vector.x) + (this.y * vector.y);
        }

        Cross() {

        }

        AngleBetween(vector: Vector, degress?: boolean) {
            const theta = Math.acos(this.Dot(vector) / (this.mag * vector.mag)); 

            if (degress)
                return Helper.RadToDeg(theta);

            return theta;
        }

        Draw() {
            Engine.context.moveTo(0, 0);
            Engine.context.lineTo(this.x, this.y);
            Engine.context.stroke();
        }
    }

    export class UI {
        static Draw(inputType: UIInputs, callback: (this: GlobalEventHandlers, ev: Event) => any) {
            switch (inputType) {
                case UIInputs.SLIDER: {

                }


                case UIInputs.BUTTON: {
                    const button = document.createElement('button');
                    button.textContent = "Click";
                    button.onclick = callback;

                    document.body.append(button);

                    return;
                }

                case UIInputs.TEXT: {
                    const input = document.createElement('input');
                    input.onkeydown = callback;

                    document.body.append(input);

                    return;
                }

                case UIInputs.NUMBER: {
                    const input = document.createElement('input');
                    input.type = "number";
                    input.onchange = callback;

                    document.body.append(input);

                    return;
                }

                default: return
            }
        }
    }

    class Helper {
        static DegToRad(deg): number {
            return deg * Math.PI / 180;
        }

        static RadToDeg(rad): number {
            return rad * 180 / Math.PI;
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

//See about World Space and Object Space


//Draw two triangles and roate one of them

Engine.context.translate(center.x, center.y);

const p = new Engine.Point();
const p1 = new Engine.Point(30,0);
const p2 = new Engine.Point(0,30);

const t = new Engine.Triangle(p, p1, p2);

t.Draw();

t.Rotate(90);
// t.Draw();