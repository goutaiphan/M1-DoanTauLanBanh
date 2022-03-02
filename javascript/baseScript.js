let map = document.querySelector('#map');

class Wagon {
    constructor(url, position, size, step, speed) {
        this.url = url;
        this.position = position;
        this.size = size;
        this.step = step;
        this.speed = speed;

        let object = this.getObject();
        this.object = object;
        map.append(object);
    }

    left() {
        return parseInt(this.object.style.left);
    }

    top() {
        return parseInt(this.object.style.top);
    }

    moveX(step) {
        this.object.style.left = this.left() + step + 'px';
    }

    moveY(step) {
        this.object.style.top = this.top() + step + 'px';
    }

    rotate(degree) {
        this.object.style.transform = `rotate(${degree}deg)`;
    }

    getObject() {
        let object = document.createElement('img');
        object.src = this.url;
        object.style.width = this.size + 'px';
        object.style.height = this.size + 'px';
        object.style.position = 'absolute';
        object.style.inset = '0';
        object.style.left = this.position + 'px';
        object.style.transform = `rotate(180deg)`;
        return object;
    }

    animate() {
        let self = this;
        setInterval(function () {
            if (self.top() === 0 && self.left() < limit) {
                self.moveX(self.step)
                self.rotate(180);
            }
            if (self.left() === limit && self.top() < limit) {
                self.moveY(self.step);
                self.rotate(-90);
            }
            if (self.top() === limit && self.left() > 0) {
                self.moveX(-self.step);
                self.rotate(0);
            }
            if (self.left() === 0 && self.top() > 0) {
                self.moveY(-self.step);
                self.rotate(90);
            }
        }, self.speed);
    }
}

let wagon, quantity = 5;
for (let i = 0; i < quantity; i++) {
    let url = i === quantity - 1
        ? './media/Train.png'
        : './media/Wagon.png';
    wagon = new Wagon(url, 70 * i, 70, 14, 100);
    wagon.animate();
}

let limit = map.clientWidth - wagon.size;
let stepArray = [];
for (let i = 0; i <= limit; i++) {
    if (limit % i === 0) stepArray.push(i);
}
console.log(stepArray);

function getProperty(object, property) {
    return parseInt(getComputedStyle(object).getPropertyValue(property));
}