var commonMouseEnter = function () {
};

var commonMouseLeave = function () {
};

var createConnection = function (sourcePort, targetPort) {
    return new RubberConnection({
        source: sourcePort,
        target: targetPort
    });
};

var getDistance = function (startPoint, endPoint) {
    return Math.pow((startPoint.x - endPoint.getX()), 2) + Math.pow((startPoint.y - endPoint.getY()), 2);
}

var getNearestPoint = function (mousePoint, points) {
    var nearDistance = getDistance(mousePoint, points.data[0]), index = 0;

    for (i = 1; i < points.data.length; i++) {
        distance = getDistance(mousePoint, points.data[i]);
        if (nearDistance > distance) {
            nearDistance = distance;
            index = i;
        }
    }
    return index;
};

var sKeyUpAction = function (canvas, x, y) {
	canvas.calculateConnectionIntersection();

    canvas.mouseDown = false;

    var pos = canvas.fromDocumentToCanvasCoordinate(x, y);
    canvas.editPolicy.each(function(i, policy) {
        policy.onMouseUp(canvas, pos.x, pos.y, false, false);
    });

    canvas.mouseDragDiffX = 0;
    canvas.mouseDragDiffY = 0;

    return;
}

var sKeyDownAction = function (canvas, x ,y) {
	try{
        var pos = null;

        try{
            canvas.mouseDownX = x;
            canvas.mouseDownY = y;
            canvas.mouseDragDiffX = 0;
            canvas.mouseDragDiffY = 0;
            pos = canvas.fromDocumentToCanvasCoordinate(x, y);
            canvas.mouseDown = true;
            canvas.editPolicy.each(function(i, policy) {
                policy.onMouseDown(canvas, pos.x, pos.y, false, false);
            });
        }
        catch(exc){
            console.log(exc);
        }

    } catch(exc) {
        console.log(exc);
    }

    return;
}

var getAllSelectedFigures = function (canvas) {
	if (canvas == null) {
		console.log('Canvas is NULL!!!!!');
		return null;
	}

	var selection = canvas.getSelection();

	if (selection == null)
		return null;

	var figureList = selection.getAll();

	return figureList;
}

var removeSelectedFigures = function (canvas) {
	if (canvas == null) {
		console.log('Canvas is NULL!!!!!');
		return false;
	}

	var figureList = getAllSelectedFigures(canvas);

	if (figureList == null)
		return false;

	figureList.each(function(i, figure) {
		canvas.remove(figure);
	});
}

var getSelectedFigure = function (canvas) {
	if (canvas == null) {
		console.log('Canvas is NULL!!!!!');
		return null;
	}
	
    var selection = canvas.getSelection();
    if (selection == null)
        return null;

    var selectedRect = selection.getPrimary();
    
    return selectedRect;
}

var getSelectFigureOnCanvas = function (canvas, x ,y) {
    var overMouseFigureParent = null;
    var overMouseFigure = canvas.getBestFigure(x, y);

    if (overMouseFigure == undefined)
        return null;

    if (overMouseFigure instanceof draw2d.ResizeHandle)
        return null;

    if (overMouseFigure instanceof draw2d.Port)
        return null;

    if (!(overMouseFigure instanceof draw2d.Figure))
        return null;

    if (overMouseFigure != null)
        overMouseFigureParent = overMouseFigure.getRoot();

    if (overMouseFigureParent != null)
        overMouseFigure = overMouseFigureParent;

    return overMouseFigure;
};

var createRectangle = function (canvas, x, y, ports = false) {
    var rect = new LabelRectangle({
        width:100, 
        height:80,
        keepAspectRatio: false,
        userData: {
            moveKeyStatus: false,
            linkKeyStatus: false,
            selected: false,
            mouseOffset: {
                x: 0,
                y: 0
            },
            objectType: {
                type: 'Activity'
            }
        }, 
        onMouseEnter: commonMouseEnter, 
        onMouseLeave: commonMouseLeave
    });

    if (!ports) {
        rect.createPort("hybrid", new draw2d.layout.locator.LeftLocator(rect));
        rect.createPort("hybrid", new draw2d.layout.locator.RightLocator(rect));
        rect.createPort("hybrid", new draw2d.layout.locator.TopLocator(rect));
        rect.createPort("hybrid", new draw2d.layout.locator.BottomLocator(rect));
    }

    canvas.add( rect, x, y);

    return rect;
}

var createDiamond = function (canvas, x, y, ports = false) {
    var diamond = new LabelDiamond({
        width:150, 
        height:100,
        keepAspectRatio: false,
        userData: {
            moveKeyStatus: false,
            linkKeyStatus: false,
            selected: false,
            mouseOffset: {
                x: 0,
                y: 0
            },
            objectType: {
                type: 'Abstract'
            }
        }, 
        onMouseEnter: commonMouseEnter, 
        onMouseLeave: commonMouseLeave
    });

    if (!ports) {
        diamond.createPort("hybrid", new draw2d.layout.locator.LeftLocator(diamond));
        diamond.createPort("hybrid", new draw2d.layout.locator.RightLocator(diamond));
        diamond.createPort("hybrid", new draw2d.layout.locator.TopLocator(diamond));
        diamond.createPort("hybrid", new draw2d.layout.locator.BottomLocator(diamond));
    }

    canvas.add( diamond, x, y);

    return diamond;
}

var createCircle = function (canvas, x, y, ports = false) {
    var circle = new LabelCircle({
        width:150, 
        height:100,
        keepAspectRatio: false,
        userData: {
            moveKeyStatus: false,
            linkKeyStatus: false,
            selected: false,
            mouseOffset: {
                x: 0,
                y: 0
            },
            objectType: {
                type: 'Goal'
            }
        }, 
        onMouseEnter: commonMouseEnter, 
        onMouseLeave: commonMouseLeave
    });

    if (!ports) {
        circle.createPort("hybrid", new draw2d.layout.locator.LeftLocator(circle));
        circle.createPort("hybrid", new draw2d.layout.locator.RightLocator(circle));
        circle.createPort("hybrid", new draw2d.layout.locator.TopLocator(circle));
        circle.createPort("hybrid", new draw2d.layout.locator.BottomLocator(circle));
    }

    canvas.add( circle, x, y);

    return circle;
}