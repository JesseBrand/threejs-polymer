function ShipKeyHandler(shipController) {
    return {
        keyDown: function (event) {
            switch (event.keyCode) {
            case 38: // up
            case 87: // w
                shipController.moveForward = true;
                break;
            case 37: // left
            case 65: // a
                shipController.moveLeft = true;
                break;
            case 40: // down
            case 83: // s
                shipController.moveBackward = true;
                break;
            case 39: // right
            case 68: // d
                shipController.moveRight = true;
                break;
            case 16: // shift
                shipController.moveDown = true;
                break;
            case 32: // space
                shipController.moveUp = true;
                break;
            case 80: // p
                shipController.pause = true;
                break;
            }
        },
        keyUp: function (event) {
            switch (event.keyCode) {
            case 38: // up
            case 87: // w
                shipController.moveForward = false;
                break;
            case 37: // left
            case 65: // a
                shipController.moveLeft = false;
                break;
            case 40: // down
            case 83: // s
                shipController.moveBackward = false;
                break;
            case 39: // right
            case 68: // d
                shipController.moveRight = false;
                break;
            case 16: // shift
                shipController.moveDown = false;
                break;
            case 17: // ctrl
                if (shipController.switchCursorMode) {
                    shipController.switchCursorMode();
                }
                break;
            case 80: // p
                shipController.pause = false;
                break;
            case 32: // space
                shipController.moveUp = false;
                break;
            }
        }
    }
};
