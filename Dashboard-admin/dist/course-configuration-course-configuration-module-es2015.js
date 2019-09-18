(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["course-configuration-course-configuration-module"],{

/***/ "./node_modules/angular-d3-tree/fesm2015/angular-d3-tree.js":
/*!******************************************************************!*\
  !*** ./node_modules/angular-d3-tree/fesm2015/angular-d3-tree.js ***!
  \******************************************************************/
/*! exports provided: AngularD3TreeLibService, AngularD3TreeLibComponent, AngularD3TreeLibModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularD3TreeLibService", function() { return AngularD3TreeLibService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularD3TreeLibComponent", function() { return AngularD3TreeLibComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularD3TreeLibModule", function() { return AngularD3TreeLibModule; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TreeModel {
    constructor() {
        this.margin = { top: 200, bottom: 90, left: 100, right: 90 };
        this.duration = 750;
        this.nodeWidth = 1;
        this.nodeHeight = 1;
        this.nodeRadius = 5;
        this.horizontalSeparationBetweenNodes = 1;
        this.verticalSeparationBetweenNodes = 1;
        this.nodeTextDistanceY = "-5px";
        this.nodeTextDistanceX = 5;
    }
    /**
     * @param {?} chartContainer
     * @return {?}
     */
    addSvgToContainer(chartContainer) {
        let /** @type {?} */ element = chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        this.svg = Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight)
            .append("g")
            .attr("transform", "translate("
            + this.margin.left + "," + this.margin.top + ")");
        this.setZoomBehaviour();
    }
    /**
     * @return {?}
     */
    setZoomBehaviour() {
        const /** @type {?} */ zoom$$1 = Object(d3__WEBPACK_IMPORTED_MODULE_0__["zoom"])().on("zoom", zoomed);
        const /** @type {?} */ svg = Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])("svg");
        var /** @type {?} */ t = d3__WEBPACK_IMPORTED_MODULE_0__["zoomIdentity"].translate(this.margin.left, this.margin.top);
        svg.call(zoom$$1.transform, t);
        svg.call(zoom$$1);
        /**
         * @return {?}
         */
        function zoomed() {
            var /** @type {?} */ transform = d3__WEBPACK_IMPORTED_MODULE_0__["event"].transform;
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])("g").attr("transform", d3__WEBPACK_IMPORTED_MODULE_0__["event"].transform);
        }
    }
    /**
     * @return {?}
     */
    createLayout() {
        this.treeLayout = Object(d3__WEBPACK_IMPORTED_MODULE_0__["tree"])()
            .size([this.height, this.width])
            .nodeSize([this.nodeWidth + this.horizontalSeparationBetweenNodes, this.nodeHeight + this.verticalSeparationBetweenNodes])
            .separation((a, b) => { return a.parent == b.parent ? 10 : 20; });
    }
    /**
     * @param {?} treeData
     * @return {?}
     */
    createTreeData(treeData) {
        this.root = Object(d3__WEBPACK_IMPORTED_MODULE_0__["stratify"])()
            .id(function (d) { return d.id; })
            .parentId(function (d) { return d.parent; })(treeData);
        this.root.x0 = this.height / 2;
        this.root.y0 = 0;
        this.root.children.map((d) => this.collapse(d));
    }
    /**
     * @param {?} d
     * @return {?}
     */
    collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.map((d) => this.collapse(d));
            d.children = null;
        }
    }
    /**
     * @param {?} d
     * @return {?}
     */
    expand(d) {
        if (d._children) {
            d.children = d._children;
            d.children.map((d) => this.expand(d));
            d.children = null;
        }
    }
    /**
     * @param {?} d
     * @param {?} newParent
     * @return {?}
     */
    expandAndFixHeight(d, newParent) {
        d.height = newParent.height - 1;
        d.depth = newParent.depth + 1;
        if (d._children) {
            d.children = d._children;
            d._children = null;
        }
        if (d.children) {
            d.children.map((child) => this.expandAndFixHeight(child, d));
        }
    }
    /**
     * @param {?} source
     * @return {?}
     */
    update(source) {
        const /** @type {?} */ treeData = this.treeLayout(this.root);
        this.setNodes(source, treeData);
        this.setLinks(source, treeData);
    }
    /**
     * @param {?} source
     * @param {?} treeData
     * @return {?}
     */
    setNodes(source, treeData) {
        let /** @type {?} */ nodes = treeData.descendants();
        let /** @type {?} */ treeModel = this;
        nodes.forEach(function (d) { d.y = d.depth * 180; });
        var /** @type {?} */ node = this.svg.selectAll('g.node')
            .data(nodes, function (d) { return d.id || (d.id = ++this.i); });
        var /** @type {?} */ nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        });
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });
        nodeEnter.append('text')
            .attr("dy", this.nodeTextDistanceY)
            .attr("x", function (d) {
            return d.children || d._children ? -1 : 1;
        })
            .attr("text-anchor", function (d) {
            return d.children || d._children ? "end" : "start";
        })
            .text(function (d) {
            return d.data.name || d.data.description || d.id;
        });
        nodeEnter.append("circle")
            .attr('class', 'ghostCircle')
            .attr("r", this.nodeRadius * 2)
            .attr("opacity", 0.2) // change this to zero to hide the target area
            .style("fill", "red")
            .attr('pointer-events', 'mouseover')
            .on("mouseover", function (node) {
            treeModel.overCircle(node);
            this.classList.add("over");
        })
            .on("mouseout", function (node) {
            treeModel.outCircle(node);
            this.classList.remove("over");
        });
        var /** @type {?} */ nodeUpdate = nodeEnter.merge(node);
        nodeUpdate.transition()
            .duration(this.duration)
            .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });
        nodeUpdate.select('circle.node')
            .attr('r', this.nodeRadius)
            .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        })
            .attr('cursor', 'pointer');
        var /** @type {?} */ nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
            .remove();
        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);
        // Store the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);
        nodeEnter
            .call(this.dragBehaviour())
            .on('click', function (d) {
            treeModel.click(d, this);
            treeModel.update(d);
        });
    }
    /**
     * @return {?}
     */
    dragBehaviour() {
        let /** @type {?} */ treeModel = this;
        /**
         * @param {?} d
         * @return {?}
         */
        function subject(d) {
            return { x: d3__WEBPACK_IMPORTED_MODULE_0__["event"].x, y: d3__WEBPACK_IMPORTED_MODULE_0__["event"].y };
        }
        /**
         * @param {?} d
         * @return {?}
         */
        function dragStart(d) {
            treeModel.draggingNode = d;
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(this).classed("active", true);
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(this).select('.ghostCircle').attr('pointer-events', 'none');
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"])('.ghostCircle').attr('class', 'ghostCircle show');
            treeModel.nodes = d.descendants();
            treeModel.dragStarted = true;
        }
        /**
         * @param {?} d
         * @return {?}
         */
        function dragged(d) {
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("transform", "translate(" + d3__WEBPACK_IMPORTED_MODULE_0__["event"].x + "," + d3__WEBPACK_IMPORTED_MODULE_0__["event"].y + ")");
            if (treeModel.dragStarted) {
                treeModel.svg.selectAll("g.node").sort((a, b) => {
                    // select the parent and sort the path's
                    if (a.id != treeModel.draggingNode.id)
                        return 1; // a is not the hovered element, send "a" to the back
                    else
                        return -1; // a is the hovered element, bring "a" to the front
                });
                // if nodes has children, remove the links and nodes
                const /** @type {?} */ childs = d.descendants();
                if (childs.length > 1) {
                    // remove link paths
                    let /** @type {?} */ links = d.links();
                    treeModel.svg.selectAll('path.link').filter(function (d, i) {
                        if (d.id == treeModel.draggingNode.id) {
                            return true;
                        }
                        return false;
                    }).remove();
                    // remove child nodes
                    let /** @type {?} */ nodesExit = treeModel.svg.selectAll("g.node")
                        .data(treeModel.nodes, function (d) {
                        return d.id;
                    }).filter(function (d, i) {
                        if (d.id == treeModel.draggingNode.id) {
                            return false;
                        }
                        return true;
                    }).remove();
                }
                // remove parent link
                const /** @type {?} */ parentLink = d.links(d.parent.descendants());
                treeModel.svg.selectAll('path.link').filter(function (d, i) {
                    if (d.id == treeModel.draggingNode.id) {
                        return true;
                    }
                    return false;
                }).remove();
                treeModel.dragStarted = false;
            }
        }
        /**
         * @param {?} d
         * @return {?}
         */
        function dragEnd(d) {
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(this).classed("active", false);
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"])('.ghostCircle').attr('class', 'ghostCircle');
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(this).attr('class', 'node');
            if (d == treeModel.root) {
                return;
            }
            let /** @type {?} */ domNode = this;
            if (treeModel.selectedNodeByDrag) {
                // now remove the element from the parent, and insert it into the new elements children
                var /** @type {?} */ index = treeModel.draggingNode.parent.children.indexOf(treeModel.draggingNode);
                if (index > -1) {
                    treeModel.draggingNode.parent.children.splice(index, 1);
                }
                if (treeModel.selectedNodeByDrag.children != null || treeModel.selectedNodeByDrag._children != null) {
                    if (treeModel.selectedNodeByDrag.children != null) {
                        treeModel.selectedNodeByDrag.children.push(treeModel.draggingNode);
                    }
                    else {
                        treeModel.selectedNodeByDrag._children.push(treeModel.draggingNode);
                    }
                }
                else {
                    treeModel.selectedNodeByDrag.children = [treeModel.draggingNode];
                }
                //set new parent
                treeModel.draggingNode.parent = treeModel.selectedNodeByDrag;
                // Make sure that the node being added to is expanded so user can see added node is correctly moved
                treeModel.expandAndFixHeight(treeModel.draggingNode, treeModel.selectedNodeByDrag);
                //sortTree();
                treeModel.nodechanged(treeModel.draggingNode);
                endDrag(domNode);
            }
            else {
                endDrag(domNode);
            }
        }
        /**
         * @param {?} domNode
         * @return {?}
         */
        function endDrag(domNode) {
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"])('.ghostCircle').attr('class', 'ghostCircle');
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(domNode).attr('class', 'node');
            // now restore the mouseover event or we won't be able to drag a 2nd time
            Object(d3__WEBPACK_IMPORTED_MODULE_0__["select"])(domNode).select('.ghostCircle').attr('pointer-events', '');
            if (treeModel.draggingNode !== null) {
                treeModel.update(treeModel.root);
                //centerNode(treeModel.draggingNode);
                treeModel.draggingNode = null;
            }
            treeModel.selectedNodeByDrag = null;
        }
        return Object(d3__WEBPACK_IMPORTED_MODULE_0__["drag"])()
            .subject(subject)
            .on("start", dragStart)
            .on("drag", dragged)
            .on("end", dragEnd);
    }
    /**
     * @param {?} d
     * @return {?}
     */
    overCircle(d) {
        this.selectedNodeByDrag = d;
    }
    ;
    /**
     * @param {?} d
     * @return {?}
     */
    outCircle(d) {
        this.selectedNodeByDrag = null;
    }
    ;
    /**
     * @param {?} source
     * @param {?} treeData
     * @return {?}
     */
    setLinks(source, treeData) {
        let /** @type {?} */ links = treeData.descendants().slice(1);
        var /** @type {?} */ link = this.svg.selectAll('path.link')
            .data(links, function (d) { return d.id; });
        // Enter any new links at the parent's previous position.
        var /** @type {?} */ linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', (d) => {
            var /** @type {?} */ o = { x: source.x0, y: source.y0 };
            return this.diagonalCurvedPath(o, o);
        });
        var /** @type {?} */ linkUpdate = linkEnter.merge(link);
        linkUpdate.transition()
            .duration(this.duration)
            .attr('d', (d) => { return this.diagonalCurvedPath(d, d.parent); });
        var /** @type {?} */ linkExit = link.exit().transition()
            .duration(this.duration)
            .attr('d', (d) => {
            var /** @type {?} */ o = { x: source.x, y: source.y };
            return this.diagonalCurvedPath(o, o);
        })
            .remove();
    }
    /**
     * @param {?} d
     * @param {?} domNode
     * @return {?}
     */
    click(d, domNode) {
        if (this.previousClickedDomNode)
            this.previousClickedDomNode.classList.remove("selected");
        if (d.children) {
            d._children = d.children;
            d.children = null;
            domNode.classList.remove("selected");
        }
        else {
            d.children = d._children;
            d._children = null;
            domNode.classList.add("selected");
        }
        this.selectedNodeByClick = d;
        this.previousClickedDomNode = domNode;
        this.nodeselected(d);
    }
    /**
     * @param {?} s
     * @param {?} d
     * @return {?}
     */
    diagonalCurvedPath(s, d) {
        const /** @type {?} */ path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
        return path;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    radialPoint(x, y) {
        return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
    }
    /**
     * @param {?} newNode
     * @return {?}
     */
    addNode(newNode) {
        if (this.selectedNodeByClick) {
            if (this.selectedNodeByClick.children)
                this.selectedNodeByClick.children.push(newNode);
            else if (this.selectedNodeByClick._children)
                this.selectedNodeByClick._children.push(newNode);
            else
                this.selectedNodeByClick.children = [newNode];
            this.update(this.selectedNodeByClick);
        }
        else {
            this.root.children.push(newNode);
            this.update(this.root);
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nodechanged(node) {
        console.info("nodechanged default");
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeselected(node) { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularD3TreeLibService {
    constructor() {
        this.treeModel = new TreeModel();
    }
    /**
     * @param {?} chartContainer
     * @param {?} treeData
     * @return {?}
     */
    createChart(chartContainer, treeData) {
        let /** @type {?} */ element = chartContainer.nativeElement;
        element.innerHTML = "";
        this.treeModel.addSvgToContainer(chartContainer);
        this.treeModel.createLayout();
        this.treeModel.createTreeData(treeData);
    }
    /**
     * @return {?}
     */
    update() {
        this.treeModel.update(this.treeModel.root);
    }
    /**
     * @param {?} callable
     * @return {?}
     */
    setNodeChangedListener(callable) {
        this.treeModel.nodechanged = callable;
    }
    /**
     * @param {?} callable
     * @return {?}
     */
    setNodeSelectedListener(callable) {
        this.treeModel.nodeselected = callable;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    addNode(node) {
        this.treeModel.addNode(node);
    }
}
AngularD3TreeLibService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
AngularD3TreeLibService.ctorParameters = () => [];
/** @nocollapse */ AngularD3TreeLibService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function AngularD3TreeLibService_Factory() { return new AngularD3TreeLibService(); }, token: AngularD3TreeLibService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularD3TreeLibComponent {
    /**
     * @param {?} treeService
     */
    constructor(treeService) {
        this.treeService = treeService;
        this.treeData = [];
        this.onNodeChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onNodeSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        treeService.setNodeChangedListener((node) => {
            this.onNodeChanged.emit(node);
        });
        treeService.setNodeSelectedListener((node) => {
            this.onNodeSelected.emit(node);
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.seedTree();
    }
    /**
     * @return {?}
     */
    seedTree() {
        if (!!this.treeData) {
            this.treeService.createChart(this.chartContainer, this.treeData);
            this.treeService.update();
        }
    }
}
AngularD3TreeLibComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                selector: 's2w-angular-d3-tree-lib',
                template: `
    <div
      class="d3-chart"
      #chart></div>
  `,
                styles: [`.d3-chart{width:100%;min-height:600px}.node circle{fill:#fff;stroke:#4682b4;stroke-width:.2px}.node text{font:10px sans-serif}.link{fill:none;stroke:#ccc;stroke-width:.5px}.active{stroke-width:1px!important}.selected text{stroke-width:2px!important;fill:#0f0}.ghostCircle.show{display:block}.ghostCircle.over{fill:green!important;stroke:#4682b4;stroke-width:.2px}.active .ghostCircle,.ghostCircle{display:none}.templink{fill:none;stroke:red;stroke-width:3px}`]
            },] },
];
/** @nocollapse */
AngularD3TreeLibComponent.ctorParameters = () => [
    { type: AngularD3TreeLibService }
];
AngularD3TreeLibComponent.propDecorators = {
    chartContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['chart',] }],
    treeData: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    onNodeChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
    onNodeSelected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularD3TreeLibModule {
}
AngularD3TreeLibModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                imports: [],
                declarations: [AngularD3TreeLibComponent],
                exports: [AngularD3TreeLibComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1kMy10cmVlLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWQzLXRyZWUvbGliL3RyZWUuZGVuZG8ubW9kZWwudHMiLCJuZzovL2FuZ3VsYXItZDMtdHJlZS9saWIvYW5ndWxhci1kMy10cmVlLWxpYi5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLWQzLXRyZWUvbGliL2FuZ3VsYXItZDMtdHJlZS1saWIuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLWQzLXRyZWUvbGliL2FuZ3VsYXItZDMtdHJlZS1saWIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcblxuLyogYmFzZWQgb24gaHR0cDovL2JsLm9ja3Mub3JnL3JvYnNjaG11ZWNrZXIvNzg4MDAzMyAqL1xuZXhwb3J0IGNsYXNzIFRyZWVNb2RlbCB7XG5cbiAgcm9vdDogYW55O1xuICB0cmVlTGF5b3V0OiBhbnk7XG4gIHN2ZzogYW55O1xuXG4gIHRyZWVEYXRhOiBhbnk7XG5cbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIG1hcmdpbjogYW55ID0geyB0b3A6IDIwMCwgYm90dG9tOiA5MCwgbGVmdDogMTAwLCByaWdodDogOTB9O1xuICBkdXJhdGlvbjogbnVtYmVyPSA3NTA7XG4gIG5vZGVXaWR0aDogbnVtYmVyID0gMTtcbiAgbm9kZUhlaWdodDogbnVtYmVyID0gMTtcbiAgbm9kZVJhZGl1czogbnVtYmVyID0gNTtcbiAgaG9yaXpvbnRhbFNlcGFyYXRpb25CZXR3ZWVuTm9kZXM6IG51bWJlciA9IDE7XG4gIHZlcnRpY2FsU2VwYXJhdGlvbkJldHdlZW5Ob2RlczogbnVtYmVyID0gMTtcbiAgbm9kZVRleHREaXN0YW5jZVk6IHN0cmluZz0gXCItNXB4XCI7XG4gIG5vZGVUZXh0RGlzdGFuY2VYOiBudW1iZXI9IDU7XG5cbiAgZHJhZ1N0YXJ0ZWQ6IGJvb2xlYW47XG4gIGRyYWdnaW5nTm9kZTogYW55O1xuICBub2RlczogYW55W107XG4gIHNlbGVjdGVkTm9kZUJ5RHJhZzogYW55O1xuXG4gIHNlbGVjdGVkTm9kZUJ5Q2xpY2s6IGFueTtcbiAgcHJldmlvdXNDbGlja2VkRG9tTm9kZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCl7fVxuXG4gIGFkZFN2Z1RvQ29udGFpbmVyKGNoYXJ0Q29udGFpbmVyOiBhbnkpe1xuICAgIGxldCBlbGVtZW50ID0gY2hhcnRDb250YWluZXIubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMud2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgIHRoaXMuaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG5cbiAgICB0aGlzLnN2ZyA9IGQzLnNlbGVjdChlbGVtZW50KS5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCBlbGVtZW50Lm9mZnNldFdpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIGVsZW1lbnQub2Zmc2V0SGVpZ2h0KVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiXG4gICAgICAgICAgICArIHRoaXMubWFyZ2luLmxlZnQgKyBcIixcIiArIHRoaXMubWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgIHRoaXMuc2V0Wm9vbUJlaGF2aW91cigpO1xuICB9XG5cbiAgc2V0Wm9vbUJlaGF2aW91cigpIHtcbiAgICBjb25zdCB6b29tPSBkMy56b29tKCkub24oXCJ6b29tXCIsIHpvb21lZCApO1xuICAgIGNvbnN0IHN2Zz0gZDMuc2VsZWN0KFwic3ZnXCIpO1xuXG4gICAgdmFyIHQgPSBkMy56b29tSWRlbnRpdHkudHJhbnNsYXRlKHRoaXMubWFyZ2luLmxlZnQsIHRoaXMubWFyZ2luLnRvcCk7XG4gICAgc3ZnLmNhbGwoem9vbS50cmFuc2Zvcm0sIHQpO1xuICAgIHN2Zy5jYWxsKHpvb20pO1xuICAgIGZ1bmN0aW9uIHpvb21lZCgpe1xuICAgICAgdmFyIHRyYW5zZm9ybT0gZDMuZXZlbnQudHJhbnNmb3JtO1xuICAgICAgZDMuc2VsZWN0KFwiZ1wiKS5hdHRyKFwidHJhbnNmb3JtXCIsIGQzLmV2ZW50LnRyYW5zZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTGF5b3V0KCl7XG4gICAgdGhpcy50cmVlTGF5b3V0ID0gZDMudHJlZSgpXG4gICAgICAuc2l6ZShbdGhpcy5oZWlnaHQsIHRoaXMud2lkdGhdKVxuICAgICAgLm5vZGVTaXplKFt0aGlzLm5vZGVXaWR0aCArIHRoaXMuaG9yaXpvbnRhbFNlcGFyYXRpb25CZXR3ZWVuTm9kZXMsIHRoaXMubm9kZUhlaWdodCArIHRoaXMudmVydGljYWxTZXBhcmF0aW9uQmV0d2Vlbk5vZGVzXSlcbiAgICAgIC5zZXBhcmF0aW9uKChhLGIpPT57cmV0dXJuIGEucGFyZW50ID09IGIucGFyZW50ID8gMTAgOiAyMH0pO1xuICB9XG5cbiAgY3JlYXRlVHJlZURhdGEodHJlZURhdGE6IGFueSl7XG4gICAgdGhpcy5yb290ID0gZDMuc3RyYXRpZnk8YW55PigpXG4gICAgICAgICAgLmlkKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaWQ7IH0pXG4gICAgICAgICAgLnBhcmVudElkKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQucGFyZW50OyB9KVxuICAgICAgICAgICh0cmVlRGF0YSk7XG4gICAgdGhpcy5yb290LngwID0gdGhpcy5oZWlnaHQgLyAyO1xuICAgIHRoaXMucm9vdC55MCA9IDA7XG5cbiAgICB0aGlzLnJvb3QuY2hpbGRyZW4ubWFwKChkKT0+dGhpcy5jb2xsYXBzZShkKSk7XG4gIH1cblxuICBjb2xsYXBzZShkKSB7XG4gICAgaWYoZC5jaGlsZHJlbikge1xuICAgICAgZC5fY2hpbGRyZW4gPSBkLmNoaWxkcmVuXG4gICAgICBkLl9jaGlsZHJlbi5tYXAoKGQpPT50aGlzLmNvbGxhcHNlKGQpKTtcbiAgICAgIGQuY2hpbGRyZW4gPSBudWxsXG4gICAgfVxuICB9XG4gIGV4cGFuZChkKSB7XG4gICAgaWYoZC5fY2hpbGRyZW4pIHtcbiAgICAgIGQuY2hpbGRyZW4gPSBkLl9jaGlsZHJlblxuICAgICAgZC5jaGlsZHJlbi5tYXAoKGQpPT50aGlzLmV4cGFuZChkKSk7XG4gICAgICBkLmNoaWxkcmVuID0gbnVsbFxuICAgIH1cbiAgfVxuICBleHBhbmRBbmRGaXhIZWlnaHQoZCwgbmV3UGFyZW50KSB7XG4gICAgZC5oZWlnaHQ9IG5ld1BhcmVudC5oZWlnaHQtMTtcbiAgICBkLmRlcHRoPSBuZXdQYXJlbnQuZGVwdGgrMTtcblxuICAgIGlmKGQuX2NoaWxkcmVuKXtcbiAgICAgIGQuY2hpbGRyZW49IGQuX2NoaWxkcmVuO1xuICAgICAgZC5fY2hpbGRyZW49IG51bGw7XG4gICAgfVxuICAgIGlmKGQuY2hpbGRyZW4pIHtcbiAgICAgIGQuY2hpbGRyZW4ubWFwKChjaGlsZCk9PnRoaXMuZXhwYW5kQW5kRml4SGVpZ2h0KGNoaWxkLCBkKSk7XG4gICAgfVxuICB9XG4gIHVwZGF0ZShzb3VyY2UpIHtcbiAgICBjb25zdCB0cmVlRGF0YSA9IHRoaXMudHJlZUxheW91dCh0aGlzLnJvb3QpO1xuXG4gICAgdGhpcy5zZXROb2Rlcyhzb3VyY2UsIHRyZWVEYXRhKTtcblxuICAgIHRoaXMuc2V0TGlua3Moc291cmNlLCB0cmVlRGF0YSk7XG5cbiAgfVxuXG4gIHNldE5vZGVzKHNvdXJjZTphbnksIHRyZWVEYXRhOiBhbnkpe1xuICAgIGxldCBub2RlcyA9IHRyZWVEYXRhLmRlc2NlbmRhbnRzKCk7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCB0cmVlTW9kZWw9IHRoaXM7XG5cbiAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGQpeyBkLnkgPSBkLmRlcHRoICogMTgwfSk7XG5cbiAgICB2YXIgbm9kZSA9IHRoaXMuc3ZnLnNlbGVjdEFsbCgnZy5ub2RlJylcbiAgICAgICAgLmRhdGEobm9kZXMsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5pZCB8fCAoZC5pZCA9ICsrdGhpcy5pKTsgfSk7XG5cbiAgICB2YXIgbm9kZUVudGVyID0gbm9kZS5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlJylcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgc291cmNlLnkwICsgXCIsXCIgKyBzb3VyY2UueDAgKyBcIilcIjtcbiAgICAgICAgfSk7XG5cbiAgICBub2RlRW50ZXIuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbm9kZScpXG4gICAgICAgIC5hdHRyKCdyJywgMWUtNilcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5fY2hpbGRyZW4gPyBcImxpZ2h0c3RlZWxibHVlXCIgOiBcIiNmZmZcIjtcbiAgICAgICAgfSk7XG5cbiAgICBub2RlRW50ZXIuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLmF0dHIoXCJkeVwiLCB0aGlzLm5vZGVUZXh0RGlzdGFuY2VZIClcbiAgICAgICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNoaWxkcmVuIHx8IGQuX2NoaWxkcmVuID8gLTEgOiAxO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNoaWxkcmVuIHx8IGQuX2NoaWxkcmVuID8gXCJlbmRcIiA6IFwic3RhcnRcIjtcbiAgICAgICAgfSlcbiAgICAgICAgLnRleHQoZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICAgIHJldHVybiBkLmRhdGEubmFtZSB8fCBkLmRhdGEuZGVzY3JpcHRpb24gfHwgZC5pZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgbm9kZUVudGVyLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnZ2hvc3RDaXJjbGUnKVxuICAgICAgICAuYXR0cihcInJcIiwgdGhpcy5ub2RlUmFkaXVzKjIpXG4gICAgICAgIC5hdHRyKFwib3BhY2l0eVwiLCAwLjIpIC8vIGNoYW5nZSB0aGlzIHRvIHplcm8gdG8gaGlkZSB0aGUgdGFyZ2V0IGFyZWFcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInJlZFwiKVxuICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnbW91c2VvdmVyJylcbiAgICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgIHRyZWVNb2RlbC5vdmVyQ2lyY2xlKG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwib3ZlclwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgdHJlZU1vZGVsLm91dENpcmNsZShub2RlKTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcIm92ZXJcIik7XG4gICAgICAgIH0pO1xuICAgIHZhciBub2RlVXBkYXRlID0gbm9kZUVudGVyLm1lcmdlKG5vZGUpO1xuXG4gICAgbm9kZVVwZGF0ZS50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmR1cmF0aW9uKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIGQueSArIFwiLFwiICsgZC54ICsgXCIpXCI7XG4gICAgICAgfSk7XG5cbiAgICBub2RlVXBkYXRlLnNlbGVjdCgnY2lyY2xlLm5vZGUnKVxuICAgICAgLmF0dHIoJ3InLCB0aGlzLm5vZGVSYWRpdXMpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5fY2hpbGRyZW4gPyBcImxpZ2h0c3RlZWxibHVlXCIgOiBcIiNmZmZcIjtcbiAgICAgIH0pXG4gICAgICAuYXR0cignY3Vyc29yJywgJ3BvaW50ZXInKTtcblxuICAgIHZhciBub2RlRXhpdCA9IG5vZGUuZXhpdCgpLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24odGhpcy5kdXJhdGlvbilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgc291cmNlLnkgKyBcIixcIiArIHNvdXJjZS54ICsgXCIpXCI7XG4gICAgICAgIH0pXG4gICAgICAgIC5yZW1vdmUoKTtcblxuICAgIC8vIE9uIGV4aXQgcmVkdWNlIHRoZSBub2RlIGNpcmNsZXMgc2l6ZSB0byAwXG4gICAgbm9kZUV4aXQuc2VsZWN0KCdjaXJjbGUnKVxuICAgICAgLmF0dHIoJ3InLCAxZS02KTtcblxuICAgIC8vIFN0b3JlIHRoZSBvbGQgcG9zaXRpb25zIGZvciB0cmFuc2l0aW9uLlxuICAgIG5vZGVzLmZvckVhY2goZnVuY3Rpb24oZCl7XG4gICAgICBkLngwID0gZC54O1xuICAgICAgZC55MCA9IGQueTtcbiAgICB9KTtcbiAgICAvLyBPbiBleGl0IHJlZHVjZSB0aGUgb3BhY2l0eSBvZiB0ZXh0IGxhYmVsc1xuICAgIG5vZGVFeGl0LnNlbGVjdCgndGV4dCcpXG4gICAgICAuc3R5bGUoJ2ZpbGwtb3BhY2l0eScsIDFlLTYpO1xuXG4gICAgbm9kZUVudGVyXG4gICAgICAuY2FsbCh0aGlzLmRyYWdCZWhhdmlvdXIoKSlcbiAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihkKXtcbiAgICAgICAgdHJlZU1vZGVsLmNsaWNrKGQsIHRoaXMpO1xuICAgICAgICB0cmVlTW9kZWwudXBkYXRlKGQpO1xuICAgICAgfSk7XG4gIH1cblxuICBkcmFnQmVoYXZpb3VyKCl7XG4gICAgbGV0IHRyZWVNb2RlbD0gdGhpcztcbiAgICBmdW5jdGlvbiBzdWJqZWN0KGQpIHtcbiAgICAgICAgcmV0dXJuIHsgeDogZDMuZXZlbnQueCwgeTogZDMuZXZlbnQueSB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBkcmFnU3RhcnQoZCl7XG4gICAgICB0cmVlTW9kZWwuZHJhZ2dpbmdOb2RlPSBkO1xuICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoXCJhY3RpdmVcIiwgdHJ1ZSk7XG5cbiAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJy5naG9zdENpcmNsZScpLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbiAgICAgIGQzLnNlbGVjdEFsbCgnLmdob3N0Q2lyY2xlJykuYXR0cignY2xhc3MnLCAnZ2hvc3RDaXJjbGUgc2hvdycpO1xuXG4gICAgICB0cmVlTW9kZWwubm9kZXM9IGQuZGVzY2VuZGFudHMoKTtcbiAgICAgIHRyZWVNb2RlbC5kcmFnU3RhcnRlZD0gdHJ1ZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdnZWQoZCl7XG4gICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBkMy5ldmVudC54ICsgXCIsXCIgKyBkMy5ldmVudC55ICsgXCIpXCIpO1xuXG4gICAgICBpZih0cmVlTW9kZWwuZHJhZ1N0YXJ0ZWQpe1xuICAgICAgICB0cmVlTW9kZWwuc3ZnLnNlbGVjdEFsbChcImcubm9kZVwiKS5zb3J0KChhLCBiKSA9PiB7IC8vIHNlbGVjdCB0aGUgcGFyZW50IGFuZCBzb3J0IHRoZSBwYXRoJ3NcbiAgICAgICAgICAgIGlmIChhLmlkICE9IHRyZWVNb2RlbC5kcmFnZ2luZ05vZGUuaWQpIHJldHVybiAxOyAvLyBhIGlzIG5vdCB0aGUgaG92ZXJlZCBlbGVtZW50LCBzZW5kIFwiYVwiIHRvIHRoZSBiYWNrXG4gICAgICAgICAgICBlbHNlIHJldHVybiAtMTsgLy8gYSBpcyB0aGUgaG92ZXJlZCBlbGVtZW50LCBicmluZyBcImFcIiB0byB0aGUgZnJvbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaWYgbm9kZXMgaGFzIGNoaWxkcmVuLCByZW1vdmUgdGhlIGxpbmtzIGFuZCBub2Rlc1xuICAgICAgICBjb25zdCBjaGlsZHM9IGQuZGVzY2VuZGFudHMoKTtcbiAgICAgICAgaWYgKGNoaWxkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgbGluayBwYXRoc1xuICAgICAgICAgICAgbGV0IGxpbmtzID0gZC5saW5rcygpO1xuICAgICAgICAgICAgdHJlZU1vZGVsLnN2Zy5zZWxlY3RBbGwoJ3BhdGgubGluaycpLmZpbHRlcihmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZC5pZCA9PSB0cmVlTW9kZWwuZHJhZ2dpbmdOb2RlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH0pLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgY2hpbGQgbm9kZXNcbiAgICAgICAgICAgIGxldCBub2Rlc0V4aXQgPSB0cmVlTW9kZWwuc3ZnLnNlbGVjdEFsbChcImcubm9kZVwiKVxuICAgICAgICAgICAgICAgIC5kYXRhKHRyZWVNb2RlbC5ub2RlcywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgICAgICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5pZCA9PSB0cmVlTW9kZWwuZHJhZ2dpbmdOb2RlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSkucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgcGFyZW50IGxpbmtcbiAgICAgICAgY29uc3QgcGFyZW50TGluayA9IGQubGlua3MoZC5wYXJlbnQuZGVzY2VuZGFudHMoKSk7XG4gICAgICAgIHRyZWVNb2RlbC5zdmcuc2VsZWN0QWxsKCdwYXRoLmxpbmsnKS5maWx0ZXIoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQuaWQgPT0gdHJlZU1vZGVsLmRyYWdnaW5nTm9kZS5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KS5yZW1vdmUoKTtcblxuICAgICAgICB0cmVlTW9kZWwuZHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdFbmQoZCl7XG4gICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcImFjdGl2ZVwiLCBmYWxzZSk7XG5cbiAgICAgIGQzLnNlbGVjdEFsbCgnLmdob3N0Q2lyY2xlJykuYXR0cignY2xhc3MnLCAnZ2hvc3RDaXJjbGUnKTtcbiAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdjbGFzcycsICdub2RlJyk7XG5cbiAgICAgIGlmIChkID09IHRyZWVNb2RlbC5yb290KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IGRvbU5vZGUgPSB0aGlzO1xuICAgICAgaWYgKHRyZWVNb2RlbC5zZWxlY3RlZE5vZGVCeURyYWcpIHtcbiAgICAgICAgICAvLyBub3cgcmVtb3ZlIHRoZSBlbGVtZW50IGZyb20gdGhlIHBhcmVudCwgYW5kIGluc2VydCBpdCBpbnRvIHRoZSBuZXcgZWxlbWVudHMgY2hpbGRyZW5cbiAgICAgICAgICB2YXIgaW5kZXggPSB0cmVlTW9kZWwuZHJhZ2dpbmdOb2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRyZWVNb2RlbC5kcmFnZ2luZ05vZGUpO1xuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgIHRyZWVNb2RlbC5kcmFnZ2luZ05vZGUucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0cmVlTW9kZWwuc2VsZWN0ZWROb2RlQnlEcmFnLmNoaWxkcmVuICE9IG51bGwgfHwgdHJlZU1vZGVsLnNlbGVjdGVkTm9kZUJ5RHJhZy5fY2hpbGRyZW4gIT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgaWYgKHRyZWVNb2RlbC5zZWxlY3RlZE5vZGVCeURyYWcuY2hpbGRyZW4gIT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICAgIHRyZWVNb2RlbC5zZWxlY3RlZE5vZGVCeURyYWcuY2hpbGRyZW4ucHVzaCh0cmVlTW9kZWwuZHJhZ2dpbmdOb2RlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRyZWVNb2RlbC5zZWxlY3RlZE5vZGVCeURyYWcuX2NoaWxkcmVuLnB1c2godHJlZU1vZGVsLmRyYWdnaW5nTm9kZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0cmVlTW9kZWwuc2VsZWN0ZWROb2RlQnlEcmFnLmNoaWxkcmVuID0gW3RyZWVNb2RlbC5kcmFnZ2luZ05vZGVdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL3NldCBuZXcgcGFyZW50XG4gICAgICAgICAgdHJlZU1vZGVsLmRyYWdnaW5nTm9kZS5wYXJlbnQ9IHRyZWVNb2RlbC5zZWxlY3RlZE5vZGVCeURyYWc7XG4gICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG5vZGUgYmVpbmcgYWRkZWQgdG8gaXMgZXhwYW5kZWQgc28gdXNlciBjYW4gc2VlIGFkZGVkIG5vZGUgaXMgY29ycmVjdGx5IG1vdmVkXG4gICAgICAgICAgdHJlZU1vZGVsLmV4cGFuZEFuZEZpeEhlaWdodCh0cmVlTW9kZWwuZHJhZ2dpbmdOb2RlLCB0cmVlTW9kZWwuc2VsZWN0ZWROb2RlQnlEcmFnKTtcbiAgICAgICAgICAvL3NvcnRUcmVlKCk7XG4gICAgICAgICAgdHJlZU1vZGVsLm5vZGVjaGFuZ2VkKHRyZWVNb2RlbC5kcmFnZ2luZ05vZGUpO1xuICAgICAgICAgIGVuZERyYWcoZG9tTm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVuZERyYWcoZG9tTm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kRHJhZyhkb21Ob2RlKSB7XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnLmdob3N0Q2lyY2xlJykuYXR0cignY2xhc3MnLCAnZ2hvc3RDaXJjbGUnKTtcbiAgICAgICAgZDMuc2VsZWN0KGRvbU5vZGUpLmF0dHIoJ2NsYXNzJywgJ25vZGUnKTtcbiAgICAgICAgLy8gbm93IHJlc3RvcmUgdGhlIG1vdXNlb3ZlciBldmVudCBvciB3ZSB3b24ndCBiZSBhYmxlIHRvIGRyYWcgYSAybmQgdGltZVxuICAgICAgICBkMy5zZWxlY3QoZG9tTm9kZSkuc2VsZWN0KCcuZ2hvc3RDaXJjbGUnKS5hdHRyKCdwb2ludGVyLWV2ZW50cycsICcnKTtcblxuICAgICAgICBpZiAodHJlZU1vZGVsLmRyYWdnaW5nTm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdHJlZU1vZGVsLnVwZGF0ZSh0cmVlTW9kZWwucm9vdCk7XG4gICAgICAgICAgICAvL2NlbnRlck5vZGUodHJlZU1vZGVsLmRyYWdnaW5nTm9kZSk7XG4gICAgICAgICAgICB0cmVlTW9kZWwuZHJhZ2dpbmdOb2RlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyZWVNb2RlbC5zZWxlY3RlZE5vZGVCeURyYWcgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBkMy5kcmFnKClcbiAgICAgICAgICAgIC5zdWJqZWN0KHN1YmplY3QpXG4gICAgICAgICAgICAub24oXCJzdGFydFwiLCBkcmFnU3RhcnQpXG4gICAgICAgICAgICAub24oXCJkcmFnXCIsIGRyYWdnZWQpXG4gICAgICAgICAgICAub24oXCJlbmRcIiwgZHJhZ0VuZCk7XG4gIH1cblxuICBvdmVyQ2lyY2xlKGQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWROb2RlQnlEcmFnID0gZDtcbiAgfTtcbiAgb3V0Q2lyY2xlKGQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWROb2RlQnlEcmFnID0gbnVsbDtcbiAgfTtcblxuICBzZXRMaW5rcyggc291cmNlOiBhbnksIHRyZWVEYXRhOiBhbnkpe1xuICAgIGxldCBsaW5rcyA9IHRyZWVEYXRhLmRlc2NlbmRhbnRzKCkuc2xpY2UoMSk7XG4gICAgdmFyIGxpbmsgPSB0aGlzLnN2Zy5zZWxlY3RBbGwoJ3BhdGgubGluaycpXG4gICAgICAgIC5kYXRhKGxpbmtzLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmlkOyB9KTtcblxuICAgIC8vIEVudGVyIGFueSBuZXcgbGlua3MgYXQgdGhlIHBhcmVudCdzIHByZXZpb3VzIHBvc2l0aW9uLlxuICAgIHZhciBsaW5rRW50ZXIgPSBsaW5rLmVudGVyKCkuaW5zZXJ0KCdwYXRoJywgXCJnXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsaW5rXCIpXG4gICAgICAgIC5hdHRyKCdkJywgKGQpPT57XG4gICAgICAgICAgdmFyIG8gPSB7eDogc291cmNlLngwLCB5OiBzb3VyY2UueTB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlhZ29uYWxDdXJ2ZWRQYXRoKG8sIG8pXG4gICAgICAgIH0pO1xuXG4gICAgdmFyIGxpbmtVcGRhdGUgPSBsaW5rRW50ZXIubWVyZ2UobGluayk7XG5cbiAgICBsaW5rVXBkYXRlLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24odGhpcy5kdXJhdGlvbilcbiAgICAgICAgLmF0dHIoJ2QnLCAoZCk9PntyZXR1cm4gdGhpcy5kaWFnb25hbEN1cnZlZFBhdGgoZCwgZC5wYXJlbnQpfSk7XG5cbiAgICB2YXIgbGlua0V4aXQgPSBsaW5rLmV4aXQoKS50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKHRoaXMuZHVyYXRpb24pXG4gICAgICAgIC5hdHRyKCdkJywgKGQpID0+IHtcbiAgICAgICAgICB2YXIgbyA9IHt4OiBzb3VyY2UueCwgeTogc291cmNlLnl9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlhZ29uYWxDdXJ2ZWRQYXRoKG8sIG8pXG4gICAgICAgIH0pXG4gICAgICAgIC5yZW1vdmUoKTtcbiAgfVxuXG4gIGNsaWNrKGQsIGRvbU5vZGUpIHtcbiAgICBpZih0aGlzLnByZXZpb3VzQ2xpY2tlZERvbU5vZGUpXG4gICAgICB0aGlzLnByZXZpb3VzQ2xpY2tlZERvbU5vZGUuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgIGlmIChkLmNoaWxkcmVuKSB7XG4gICAgICAgIGQuX2NoaWxkcmVuID0gZC5jaGlsZHJlbjtcbiAgICAgICAgZC5jaGlsZHJlbiA9IG51bGw7XG5cbiAgICAgICAgZG9tTm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGQuY2hpbGRyZW4gPSBkLl9jaGlsZHJlbjtcbiAgICAgIGQuX2NoaWxkcmVuID0gbnVsbDtcblxuICAgICAgZG9tTm9kZS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWROb2RlQnlDbGljaz0gZDtcbiAgICB0aGlzLnByZXZpb3VzQ2xpY2tlZERvbU5vZGU9IGRvbU5vZGU7XG4gICAgdGhpcy5ub2Rlc2VsZWN0ZWQoZCk7XG4gIH1cblxuICAvLyBDcmVhdGVzIGEgY3VydmVkIChkaWFnb25hbCkgcGF0aCBmcm9tIHBhcmVudCB0byB0aGUgY2hpbGQgbm9kZXNcbiAgZGlhZ29uYWxDdXJ2ZWRQYXRoKHMsIGQpIHtcblxuICAgIGNvbnN0IHBhdGggPSBgTSAke3MueX0gJHtzLnh9XG4gICAgICAgICAgICBDICR7KHMueSArIGQueSkgLyAyfSAke3MueH0sXG4gICAgICAgICAgICAgICR7KHMueSArIGQueSkgLyAyfSAke2QueH0sXG4gICAgICAgICAgICAgICR7ZC55fSAke2QueH1gXG5cbiAgICByZXR1cm4gcGF0aFxuICB9XG5cbiAgcmFkaWFsUG9pbnQoeCwgeSkge1xuICAgIHJldHVybiBbKHkgPSAreSkgKiBNYXRoLmNvcyh4IC09IE1hdGguUEkgLyAyKSwgeSAqIE1hdGguc2luKHgpXTtcbiAgfVxuXG4gIGFkZE5vZGUobmV3Tm9kZTogYW55KXtcbiAgICBpZih0aGlzLnNlbGVjdGVkTm9kZUJ5Q2xpY2spe1xuICAgICAgaWYodGhpcy5zZWxlY3RlZE5vZGVCeUNsaWNrLmNoaWxkcmVuKVxuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZUJ5Q2xpY2suY2hpbGRyZW4ucHVzaChuZXdOb2RlKTtcbiAgICAgIGVsc2UgaWYodGhpcy5zZWxlY3RlZE5vZGVCeUNsaWNrLl9jaGlsZHJlbilcbiAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVCeUNsaWNrLl9jaGlsZHJlbi5wdXNoKG5ld05vZGUpO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZUJ5Q2xpY2suY2hpbGRyZW49IFtuZXdOb2RlXTtcbiAgICAgIHRoaXMudXBkYXRlKHRoaXMuc2VsZWN0ZWROb2RlQnlDbGljayk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLnJvb3QuY2hpbGRyZW4ucHVzaChuZXdOb2RlKTtcbiAgICAgIHRoaXMudXBkYXRlKHRoaXMucm9vdCk7XG4gICAgfVxuICB9XG5cbiAgLy9ldmVudHNcbiAgbm9kZWNoYW5nZWQobm9kZSl7XG4gICAgY29uc29sZS5pbmZvKFwibm9kZWNoYW5nZWQgZGVmYXVsdFwiKTtcbiAgfVxuICBub2Rlc2VsZWN0ZWQobm9kZSl7fVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL3RyZWUuZGVuZG8ubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRDNUcmVlTGliU2VydmljZSB7XG4gIHRyZWVNb2RlbDogVHJlZU1vZGVsPSBuZXcgVHJlZU1vZGVsKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBjcmVhdGVDaGFydChjaGFydENvbnRhaW5lcjogYW55LCB0cmVlRGF0YTogYW55KTogdm9pZCB7XG4gICAgbGV0IGVsZW1lbnQgPSBjaGFydENvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MPSBcIlwiO1xuICAgIHRoaXMudHJlZU1vZGVsLmFkZFN2Z1RvQ29udGFpbmVyKGNoYXJ0Q29udGFpbmVyKTtcblxuICAgIHRoaXMudHJlZU1vZGVsLmNyZWF0ZUxheW91dCgpO1xuXG4gICAgdGhpcy50cmVlTW9kZWwuY3JlYXRlVHJlZURhdGEodHJlZURhdGEpO1xuXG4gIH1cblxuICB1cGRhdGUoKXtcbiAgICB0aGlzLnRyZWVNb2RlbC51cGRhdGUodGhpcy50cmVlTW9kZWwucm9vdCk7XG4gIH1cblxuICBzZXROb2RlQ2hhbmdlZExpc3RlbmVyKGNhbGxhYmxlKXtcbiAgICB0aGlzLnRyZWVNb2RlbC5ub2RlY2hhbmdlZD0gY2FsbGFibGU7XG4gIH1cbiAgc2V0Tm9kZVNlbGVjdGVkTGlzdGVuZXIoY2FsbGFibGUpe1xuICAgIHRoaXMudHJlZU1vZGVsLm5vZGVzZWxlY3RlZD0gY2FsbGFibGU7XG4gIH1cblxuICBhZGROb2RlKG5vZGU6IGFueSl7XG4gICAgdGhpcy50cmVlTW9kZWwuYWRkTm9kZShub2RlKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsXG4gICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFyRDNUcmVlTGliU2VydmljZSB9IGZyb20gJy4vYW5ndWxhci1kMy10cmVlLWxpYi5zZXJ2aWNlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Mydy1hbmd1bGFyLWQzLXRyZWUtbGliJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImQzLWNoYXJ0XCJcbiAgICAgICNjaGFydD48L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbYC5kMy1jaGFydHt3aWR0aDoxMDAlO21pbi1oZWlnaHQ6NjAwcHh9Lm5vZGUgY2lyY2xle2ZpbGw6I2ZmZjtzdHJva2U6IzQ2ODJiNDtzdHJva2Utd2lkdGg6LjJweH0ubm9kZSB0ZXh0e2ZvbnQ6MTBweCBzYW5zLXNlcmlmfS5saW5re2ZpbGw6bm9uZTtzdHJva2U6I2NjYztzdHJva2Utd2lkdGg6LjVweH0uYWN0aXZle3N0cm9rZS13aWR0aDoxcHghaW1wb3J0YW50fS5zZWxlY3RlZCB0ZXh0e3N0cm9rZS13aWR0aDoycHghaW1wb3J0YW50O2ZpbGw6IzBmMH0uZ2hvc3RDaXJjbGUuc2hvd3tkaXNwbGF5OmJsb2NrfS5naG9zdENpcmNsZS5vdmVye2ZpbGw6Z3JlZW4haW1wb3J0YW50O3N0cm9rZTojNDY4MmI0O3N0cm9rZS13aWR0aDouMnB4fS5hY3RpdmUgLmdob3N0Q2lyY2xlLC5naG9zdENpcmNsZXtkaXNwbGF5Om5vbmV9LnRlbXBsaW5re2ZpbGw6bm9uZTtzdHJva2U6cmVkO3N0cm9rZS13aWR0aDozcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckQzVHJlZUxpYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgnY2hhcnQnKSBwcml2YXRlIGNoYXJ0Q29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBwcml2YXRlIHRyZWVEYXRhOiBhbnk9IFtdO1xuICBAT3V0cHV0KCkgb25Ob2RlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT49IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTm9kZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55Pj0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIHRyZWVTZXJ2aWNlOiBBbmd1bGFyRDNUcmVlTGliU2VydmljZSApIHtcbiAgICB0cmVlU2VydmljZS5zZXROb2RlQ2hhbmdlZExpc3RlbmVyKChub2RlKT0+e1xuICAgICAgdGhpcy5vbk5vZGVDaGFuZ2VkLmVtaXQobm9kZSk7XG4gICAgfSlcbiAgICB0cmVlU2VydmljZS5zZXROb2RlU2VsZWN0ZWRMaXN0ZW5lcigobm9kZSk9PntcbiAgICAgIHRoaXMub25Ob2RlU2VsZWN0ZWQuZW1pdChub2RlKTtcbiAgICB9KVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgdGhpcy5zZWVkVHJlZSgpO1xuICB9XG4gIHNlZWRUcmVlKCl7XG4gICAgaWYoISF0aGlzLnRyZWVEYXRhKXtcbiAgICAgIHRoaXMudHJlZVNlcnZpY2UuY3JlYXRlQ2hhcnQodGhpcy5jaGFydENvbnRhaW5lciwgdGhpcy50cmVlRGF0YSk7XG4gICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuZ3VsYXJEM1RyZWVMaWJDb21wb25lbnQgfSBmcm9tICcuL2FuZ3VsYXItZDMtdHJlZS1saWIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtBbmd1bGFyRDNUcmVlTGliQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0FuZ3VsYXJEM1RyZWVMaWJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJEM1RyZWVMaWJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiZDMuc2VsZWN0Iiwiem9vbSIsImQzLnpvb20iLCJkMy56b29tSWRlbnRpdHkiLCJkMy5ldmVudCIsImQzLnRyZWUiLCJkMy5zdHJhdGlmeSIsImQzLnNlbGVjdEFsbCIsImQzLmRyYWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtJQStCRTtzQkFsQmMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDO3dCQUN6QyxHQUFHO3lCQUNELENBQUM7MEJBQ0EsQ0FBQzswQkFDRCxDQUFDO2dEQUNxQixDQUFDOzhDQUNILENBQUM7aUNBQ2YsTUFBTTtpQ0FDTixDQUFDO0tBVWI7Ozs7O0lBRWYsaUJBQWlCLENBQUMsY0FBbUI7UUFDbkMscUJBQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFFM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUUxRSxJQUFJLENBQUMsR0FBRyxHQUFHQSxNQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUN4QyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUM7YUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVk7Y0FDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQ3pCOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsdUJBQU1DLE9BQUksR0FBRUMsSUFBTyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQztRQUMxQyx1QkFBTSxHQUFHLEdBQUVGLE1BQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1QixxQkFBSSxDQUFDLEdBQUdHLFlBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRSxHQUFHLENBQUMsSUFBSSxDQUFDRixPQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUNBLE9BQUksQ0FBQyxDQUFDOzs7O1FBQ2Y7WUFDRSxxQkFBSSxTQUFTLEdBQUVHLEtBQVEsQ0FBQyxTQUFTLENBQUM7WUFDbENKLE1BQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFSSxLQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEQ7S0FDRjs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsVUFBVSxHQUFHQyxJQUFPLEVBQUU7YUFDeEIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0IsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQzthQUN6SCxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFJLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUEsRUFBQyxDQUFDLENBQUM7S0FDL0Q7Ozs7O0lBRUQsY0FBYyxDQUFDLFFBQWE7UUFDMUIsSUFBSSxDQUFDLElBQUksR0FBR0MsUUFBVyxFQUFPO2FBQ3ZCLEVBQUUsQ0FBQyxVQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2hDLFFBQVEsQ0FBQyxVQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQzFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9DOzs7OztJQUVELFFBQVEsQ0FBQyxDQUFDO1FBQ1IsSUFBRyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ2IsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFBO1lBQ3hCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtTQUNsQjtLQUNGOzs7OztJQUNELE1BQU0sQ0FBQyxDQUFDO1FBQ04sSUFBRyxDQUFDLENBQUMsU0FBUyxFQUFFO1lBQ2QsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFBO1lBQ3hCLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtTQUNsQjtLQUNGOzs7Ozs7SUFDRCxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsU0FBUztRQUM3QixDQUFDLENBQUMsTUFBTSxHQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxLQUFLLEdBQUUsU0FBUyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7UUFFM0IsSUFBRyxDQUFDLENBQUMsU0FBUyxFQUFDO1lBQ2IsQ0FBQyxDQUFDLFFBQVEsR0FBRSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxTQUFTLEdBQUUsSUFBSSxDQUFDO1NBQ25CO1FBQ0QsSUFBRyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ2IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVEO0tBQ0Y7Ozs7O0lBQ0QsTUFBTSxDQUFDLE1BQU07UUFDWCx1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FFakM7Ozs7OztJQUVELFFBQVEsQ0FBQyxNQUFVLEVBQUUsUUFBYTtRQUNoQyxxQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5DLHFCQUFJLFNBQVMsR0FBRSxJQUFJLENBQUM7UUFFcEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFTLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFBLEVBQUMsQ0FBQyxDQUFDO1FBRWpELHFCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDbEMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFTLENBQUMsSUFBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVuRSxxQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7YUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFTLENBQUM7WUFDekIsT0FBTyxZQUFZLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7U0FDM0QsQ0FBQyxDQUFDO1FBRVAsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7YUFDckIsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7YUFDZixLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVMsQ0FBQztZQUNyQixPQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO1NBQ2xELENBQUMsQ0FBQztRQUVQLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFFO2FBQ25DLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBUyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QyxDQUFDO2FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFTLENBQUM7WUFDM0IsT0FBTyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQztTQUN0RCxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQVMsQ0FBQztZQUNWLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFFWCxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQzthQUM1QixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDO2FBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDO2FBQ3BCLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUM7YUFDbkMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFTLElBQUk7WUFDMUIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM5QixDQUFDO2FBQ0QsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFTLElBQUk7WUFDekIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFDUCxxQkFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QyxVQUFVLENBQUMsVUFBVSxFQUFFO2FBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBUyxDQUFDO1lBQ3pCLE9BQU8sWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQzlDLENBQUMsQ0FBQztRQUVOLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO2FBQzdCLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUMxQixLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVMsQ0FBQztZQUNyQixPQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO1NBQ2xELENBQUM7YUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTdCLHFCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFO2FBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBUyxDQUFDO1lBQ3pCLE9BQU8sWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3pELENBQUM7YUFDRCxNQUFNLEVBQUUsQ0FBQzs7UUFHZCxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUN0QixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOztRQUduQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVMsQ0FBQztZQUN0QixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDWixDQUFDLENBQUM7O1FBRUgsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDcEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUvQixTQUFTO2FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUMxQixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBQztZQUNyQixTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6QixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JCLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsYUFBYTtRQUNYLHFCQUFJLFNBQVMsR0FBRSxJQUFJLENBQUM7Ozs7O1FBQ3BCLGlCQUFpQixDQUFDO1lBQ2QsT0FBTyxFQUFFLENBQUMsRUFBRUYsS0FBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUVBLEtBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtTQUMxQzs7Ozs7UUFDRCxtQkFBbUIsQ0FBQztZQUNsQixTQUFTLENBQUMsWUFBWSxHQUFFLENBQUMsQ0FBQztZQUMxQkosTUFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFeENBLE1BQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RFTyxTQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBRS9ELFNBQVMsQ0FBQyxLQUFLLEdBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pDLFNBQVMsQ0FBQyxXQUFXLEdBQUUsSUFBSSxDQUFDO1NBRTdCOzs7OztRQUVELGlCQUFpQixDQUFDO1lBQ2hCUCxNQUFTLENBQUMsSUFBSSxDQUFDO2lCQUNaLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxHQUFHSSxLQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBR0EsS0FBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUV6RSxJQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUM7Z0JBQ3ZCLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztvQkFDeEMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRTt3QkFBRSxPQUFPLENBQUMsQ0FBQzs7d0JBQzNDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ2xCLENBQUMsQ0FBQzs7Z0JBR0gsdUJBQU0sTUFBTSxHQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7b0JBRW5CLHFCQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3RCLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNuRCxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUU7NEJBQ25DLE9BQU8sSUFBSSxDQUFDO3lCQUNmO3dCQUNELE9BQU8sS0FBSyxDQUFDO3FCQUNoQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7O29CQUdkLHFCQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7eUJBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQVMsQ0FBQzt3QkFDN0IsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDO3FCQUNmLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFOzRCQUNuQyxPQUFPLEtBQUssQ0FBQzt5QkFDaEI7d0JBQ0QsT0FBTyxJQUFJLENBQUM7cUJBQ2YsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNuQjs7Z0JBR0QsdUJBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQztvQkFDckQsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFO3dCQUNuQyxPQUFPLElBQUksQ0FBQztxQkFDZjtvQkFDRCxPQUFPLEtBQUssQ0FBQztpQkFDaEIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUVaLFNBQVMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2FBQy9CO1NBRUY7Ozs7O1FBRUQsaUJBQWlCLENBQUM7WUFDaEJKLE1BQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXpDTyxTQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMxRFAsTUFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDckIsT0FBTzthQUNWO1lBQ0QscUJBQUksT0FBTyxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRTs7Z0JBRTlCLHFCQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ1osU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzNEO2dCQUNELElBQUksU0FBUyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsSUFBSSxJQUFLLEVBQUU7b0JBQ2xHLElBQUksU0FBUyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsSUFBSSxJQUFLLEVBQUU7d0JBQ2hELFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDdEU7eUJBQU07d0JBQ0gsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUN2RTtpQkFDSjtxQkFBTTtvQkFDSCxTQUFTLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNwRTs7Z0JBRUQsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDOztnQkFFNUQsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7O2dCQUVuRixTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwQjtTQUNGOzs7OztRQUVELGlCQUFpQixPQUFPO1lBQ3BCTyxTQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMxRFAsTUFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7O1lBRXpDQSxNQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVyRSxJQUFJLFNBQVMsQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFO2dCQUNqQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBRWpDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ2pDO1lBRUQsU0FBUyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUN2QztRQUVELE9BQU9RLElBQU8sRUFBRTthQUNQLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDaEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7YUFDdEIsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7YUFDbkIsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM3Qjs7Ozs7SUFFRCxVQUFVLENBQUMsQ0FBQztRQUNSLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7S0FDL0I7Ozs7OztJQUNELFNBQVMsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztLQUNsQzs7Ozs7OztJQUVELFFBQVEsQ0FBRSxNQUFXLEVBQUUsUUFBYTtRQUNsQyxxQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxxQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO2FBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBUyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUcvQyxxQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2FBQzNDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO2FBQ3JCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ1gscUJBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUMsQ0FBQTtZQUNwQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDckMsQ0FBQyxDQUFDO1FBRVAscUJBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsVUFBVSxDQUFDLFVBQVUsRUFBRTthQUNsQixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN2QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUM7UUFFbkUscUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUU7YUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDWCxxQkFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFBO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUNyQyxDQUFDO2FBQ0QsTUFBTSxFQUFFLENBQUM7S0FDZjs7Ozs7O0lBRUQsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPO1FBQ2QsSUFBRyxJQUFJLENBQUMsc0JBQXNCO1lBQzVCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNaLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUVsQixPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN4QzthQUFNO1lBQ0wsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBRW5CLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFFLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsc0JBQXNCLEdBQUUsT0FBTyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEI7Ozs7OztJQUdELGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXJCLHVCQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUV4QixPQUFPLElBQUksQ0FBQTtLQUNaOzs7Ozs7SUFFRCxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pFOzs7OztJQUVELE9BQU8sQ0FBQyxPQUFZO1FBQ2xCLElBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFDO1lBQzFCLElBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVE7Z0JBQ2xDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3QyxJQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTO2dCQUN4QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Z0JBRWpELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3ZDO2FBQUk7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7S0FDRjs7Ozs7SUFHRCxXQUFXLENBQUMsSUFBSTtRQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUNyQzs7Ozs7SUFDRCxZQUFZLENBQUMsSUFBSSxLQUFHO0NBRXJCOzs7Ozs7QUNyYUQ7SUFTRTt5QkFGc0IsSUFBSSxTQUFTLEVBQUU7S0FFcEI7Ozs7OztJQUVqQixXQUFXLENBQUMsY0FBbUIsRUFBRSxRQUFhO1FBQzVDLHFCQUFJLE9BQU8sR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxTQUFTLEdBQUUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUV6Qzs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVDOzs7OztJQUVELHNCQUFzQixDQUFDLFFBQVE7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUUsUUFBUSxDQUFDO0tBQ3RDOzs7OztJQUNELHVCQUF1QixDQUFDLFFBQVE7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUUsUUFBUSxDQUFDO0tBQ3ZDOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFTO1FBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7OztZQWhDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7QUNMRDs7OztJQW1CRSxZQUFxQixXQUFvQztRQUFwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7d0JBSnpCLEVBQUU7NkJBQ1UsSUFBSSxZQUFZLEVBQUU7OEJBQ2pCLElBQUksWUFBWSxFQUFFO1FBRzdELFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUk7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFBO1FBQ0YsV0FBVyxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSTtZQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQyxDQUFDLENBQUE7S0FDSDs7OztJQUVELFFBQVE7S0FDUDs7Ozs7SUFDRCxXQUFXLENBQUMsT0FBWTtRQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7Ozs7SUFDRCxRQUFRO1FBQ04sSUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO0tBQ0Y7OztZQWxDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsNGNBQTRjLENBQUM7YUFDdmQ7Ozs7WUFUUSx1QkFBdUI7Ozs2QkFXN0IsU0FBUyxTQUFDLE9BQU87dUJBQ2pCLEtBQUs7NEJBQ0wsTUFBTTs2QkFDTixNQUFNOzs7Ozs7O0FDakJUOzs7WUFHQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQ3JDOzs7Ozs7Ozs7Ozs7Ozs7In0=

/***/ }),

/***/ "./node_modules/d3-axis/src/array.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-axis/src/array.js ***!
  \*******************************************/
/*! exports provided: slice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return slice; });
var slice = Array.prototype.slice;


/***/ }),

/***/ "./node_modules/d3-axis/src/axis.js":
/*!******************************************!*\
  !*** ./node_modules/d3-axis/src/axis.js ***!
  \******************************************/
/*! exports provided: axisTop, axisRight, axisBottom, axisLeft */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axisTop", function() { return axisTop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axisRight", function() { return axisRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axisBottom", function() { return axisBottom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axisLeft", function() { return axisLeft; });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./node_modules/d3-axis/src/array.js");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./identity */ "./node_modules/d3-axis/src/identity.js");



var top = 1,
    right = 2,
    bottom = 3,
    left = 4,
    epsilon = 1e-6;

function translateX(x) {
  return "translate(" + (x + 0.5) + ",0)";
}

function translateY(y) {
  return "translate(0," + (y + 0.5) + ")";
}

function number(scale) {
  return function(d) {
    return +scale(d);
  };
}

function center(scale) {
  var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
  if (scale.round()) offset = Math.round(offset);
  return function(d) {
    return +scale(d) + offset;
  };
}

function entering() {
  return !this.__axis;
}

function axis(orient, scale) {
  var tickArguments = [],
      tickValues = null,
      tickFormat = null,
      tickSizeInner = 6,
      tickSizeOuter = 6,
      tickPadding = 3,
      k = orient === top || orient === left ? -1 : 1,
      x = orient === left || orient === right ? "x" : "y",
      transform = orient === top || orient === bottom ? translateX : translateY;

  function axis(context) {
    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : _identity__WEBPACK_IMPORTED_MODULE_1__["default"]) : tickFormat,
        spacing = Math.max(tickSizeInner, 0) + tickPadding,
        range = scale.range(),
        range0 = +range[0] + 0.5,
        range1 = +range[range.length - 1] + 0.5,
        position = (scale.bandwidth ? center : number)(scale.copy()),
        selection = context.selection ? context.selection() : context,
        path = selection.selectAll(".domain").data([null]),
        tick = selection.selectAll(".tick").data(values, scale).order(),
        tickExit = tick.exit(),
        tickEnter = tick.enter().append("g").attr("class", "tick"),
        line = tick.select("line"),
        text = tick.select("text");

    path = path.merge(path.enter().insert("path", ".tick")
        .attr("class", "domain")
        .attr("stroke", "currentColor"));

    tick = tick.merge(tickEnter);

    line = line.merge(tickEnter.append("line")
        .attr("stroke", "currentColor")
        .attr(x + "2", k * tickSizeInner));

    text = text.merge(tickEnter.append("text")
        .attr("fill", "currentColor")
        .attr(x, k * spacing)
        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

    if (context !== selection) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);

      tickExit = tickExit.transition(context)
          .attr("opacity", epsilon)
          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform"); });

      tickEnter
          .attr("opacity", epsilon)
          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform(p && isFinite(p = p(d)) ? p : position(d)); });
    }

    tickExit.remove();

    path
        .attr("d", orient === left || orient == right
            ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter : "M0.5," + range0 + "V" + range1)
            : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + ",0.5H" + range1));

    tick
        .attr("opacity", 1)
        .attr("transform", function(d) { return transform(position(d)); });

    line
        .attr(x + "2", k * tickSizeInner);

    text
        .attr(x, k * spacing)
        .text(format);

    selection.filter(entering)
        .attr("fill", "none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

    selection
        .each(function() { this.__axis = position; });
  }

  axis.scale = function(_) {
    return arguments.length ? (scale = _, axis) : scale;
  };

  axis.ticks = function() {
    return tickArguments = _array__WEBPACK_IMPORTED_MODULE_0__["slice"].call(arguments), axis;
  };

  axis.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : _array__WEBPACK_IMPORTED_MODULE_0__["slice"].call(_), axis) : tickArguments.slice();
  };

  axis.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : _array__WEBPACK_IMPORTED_MODULE_0__["slice"].call(_), axis) : tickValues && tickValues.slice();
  };

  axis.tickFormat = function(_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };

  axis.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
  };

  axis.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
  };

  axis.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
  };

  axis.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };

  return axis;
}

function axisTop(scale) {
  return axis(top, scale);
}

function axisRight(scale) {
  return axis(right, scale);
}

function axisBottom(scale) {
  return axis(bottom, scale);
}

function axisLeft(scale) {
  return axis(left, scale);
}


/***/ }),

/***/ "./node_modules/d3-axis/src/identity.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-axis/src/identity.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return x;
});


/***/ }),

/***/ "./node_modules/d3-axis/src/index.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-axis/src/index.js ***!
  \*******************************************/
/*! exports provided: axisTop, axisRight, axisBottom, axisLeft */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _axis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./axis */ "./node_modules/d3-axis/src/axis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "axisTop", function() { return _axis__WEBPACK_IMPORTED_MODULE_0__["axisTop"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "axisRight", function() { return _axis__WEBPACK_IMPORTED_MODULE_0__["axisRight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "axisBottom", function() { return _axis__WEBPACK_IMPORTED_MODULE_0__["axisBottom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "axisLeft", function() { return _axis__WEBPACK_IMPORTED_MODULE_0__["axisLeft"]; });




/***/ }),

/***/ "./node_modules/d3-chord/src/array.js":
/*!********************************************!*\
  !*** ./node_modules/d3-chord/src/array.js ***!
  \********************************************/
/*! exports provided: slice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return slice; });
var slice = Array.prototype.slice;


/***/ }),

/***/ "./node_modules/d3-chord/src/chord.js":
/*!********************************************!*\
  !*** ./node_modules/d3-chord/src/chord.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./node_modules/d3-chord/src/math.js");



function compareValue(compare) {
  return function(a, b) {
    return compare(
      a.source.value + a.target.value,
      b.source.value + b.target.value
    );
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var padAngle = 0,
      sortGroups = null,
      sortSubgroups = null,
      sortChords = null;

  function chord(matrix) {
    var n = matrix.length,
        groupSums = [],
        groupIndex = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(n),
        subgroupIndex = [],
        chords = [],
        groups = chords.groups = new Array(n),
        subgroups = new Array(n * n),
        k,
        x,
        x0,
        dx,
        i,
        j;

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(n));
      k += x;
    }

    // Sort groups…
    if (sortGroups) groupIndex.sort(function(a, b) {
      return sortGroups(groupSums[a], groupSums[b]);
    });

    // Sort subgroups…
    if (sortSubgroups) subgroupIndex.forEach(function(d, i) {
      d.sort(function(a, b) {
        return sortSubgroups(matrix[i][a], matrix[i][b]);
      });
    });

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified?
    // TODO Allow padding to be specified as percentage?
    k = Object(_math__WEBPACK_IMPORTED_MODULE_1__["max"])(0, _math__WEBPACK_IMPORTED_MODULE_1__["tau"] - padAngle * n) / k;
    dx = k ? padAngle : _math__WEBPACK_IMPORTED_MODULE_1__["tau"] / n;

    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = matrix[di][dj],
            a0 = x,
            a1 = x += v * k;
        subgroups[dj * n + di] = {
          index: di,
          subindex: dj,
          startAngle: a0,
          endAngle: a1,
          value: v
        };
      }
      groups[di] = {
        index: di,
        startAngle: x0,
        endAngle: x,
        value: groupSums[di]
      };
      x += dx;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[j * n + i],
            target = subgroups[i * n + j];
        if (source.value || target.value) {
          chords.push(source.value < target.value
              ? {source: target, target: source}
              : {source: source, target: target});
        }
      }
    }

    return sortChords ? chords.sort(sortChords) : chords;
  }

  chord.padAngle = function(_) {
    return arguments.length ? (padAngle = Object(_math__WEBPACK_IMPORTED_MODULE_1__["max"])(0, _), chord) : padAngle;
  };

  chord.sortGroups = function(_) {
    return arguments.length ? (sortGroups = _, chord) : sortGroups;
  };

  chord.sortSubgroups = function(_) {
    return arguments.length ? (sortSubgroups = _, chord) : sortSubgroups;
  };

  chord.sortChords = function(_) {
    return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord) : sortChords && sortChords._;
  };

  return chord;
});


/***/ }),

/***/ "./node_modules/d3-chord/src/constant.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-chord/src/constant.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "./node_modules/d3-chord/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-chord/src/index.js ***!
  \********************************************/
/*! exports provided: chord, ribbon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chord */ "./node_modules/d3-chord/src/chord.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "chord", function() { return _chord__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ribbon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ribbon */ "./node_modules/d3-chord/src/ribbon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ribbon", function() { return _ribbon__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./node_modules/d3-chord/src/math.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-chord/src/math.js ***!
  \*******************************************/
/*! exports provided: cos, sin, pi, halfPi, tau, max */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cos", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sin", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pi", function() { return pi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "halfPi", function() { return halfPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tau", function() { return tau; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
var cos = Math.cos;
var sin = Math.sin;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = pi * 2;
var max = Math.max;


/***/ }),

/***/ "./node_modules/d3-chord/src/ribbon.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-chord/src/ribbon.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./node_modules/d3-chord/src/array.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-chord/src/constant.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./node_modules/d3-chord/src/math.js");
/* harmony import */ var d3_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-path */ "./node_modules/d3-path/index.js");





function defaultSource(d) {
  return d.source;
}

function defaultTarget(d) {
  return d.target;
}

function defaultRadius(d) {
  return d.radius;
}

function defaultStartAngle(d) {
  return d.startAngle;
}

function defaultEndAngle(d) {
  return d.endAngle;
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var source = defaultSource,
      target = defaultTarget,
      radius = defaultRadius,
      startAngle = defaultStartAngle,
      endAngle = defaultEndAngle,
      context = null;

  function ribbon() {
    var buffer,
        argv = _array__WEBPACK_IMPORTED_MODULE_0__["slice"].call(arguments),
        s = source.apply(this, argv),
        t = target.apply(this, argv),
        sr = +radius.apply(this, (argv[0] = s, argv)),
        sa0 = startAngle.apply(this, argv) - _math__WEBPACK_IMPORTED_MODULE_2__["halfPi"],
        sa1 = endAngle.apply(this, argv) - _math__WEBPACK_IMPORTED_MODULE_2__["halfPi"],
        sx0 = sr * Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(sa0),
        sy0 = sr * Object(_math__WEBPACK_IMPORTED_MODULE_2__["sin"])(sa0),
        tr = +radius.apply(this, (argv[0] = t, argv)),
        ta0 = startAngle.apply(this, argv) - _math__WEBPACK_IMPORTED_MODULE_2__["halfPi"],
        ta1 = endAngle.apply(this, argv) - _math__WEBPACK_IMPORTED_MODULE_2__["halfPi"];

    if (!context) context = buffer = Object(d3_path__WEBPACK_IMPORTED_MODULE_3__["path"])();

    context.moveTo(sx0, sy0);
    context.arc(0, 0, sr, sa0, sa1);
    if (sa0 !== ta0 || sa1 !== ta1) { // TODO sr !== tr?
      context.quadraticCurveTo(0, 0, tr * Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(ta0), tr * Object(_math__WEBPACK_IMPORTED_MODULE_2__["sin"])(ta0));
      context.arc(0, 0, tr, ta0, ta1);
    }
    context.quadraticCurveTo(0, 0, sx0, sy0);
    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  ribbon.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_1__["default"])(+_), ribbon) : radius;
  };

  ribbon.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_1__["default"])(+_), ribbon) : startAngle;
  };

  ribbon.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_1__["default"])(+_), ribbon) : endAngle;
  };

  ribbon.source = function(_) {
    return arguments.length ? (source = _, ribbon) : source;
  };

  ribbon.target = function(_) {
    return arguments.length ? (target = _, ribbon) : target;
  };

  ribbon.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), ribbon) : context;
  };

  return ribbon;
});


/***/ }),

/***/ "./node_modules/d3-contour/src/area.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-contour/src/area.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(ring) {
  var i = 0, n = ring.length, area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
  while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
  return area;
});


/***/ }),

/***/ "./node_modules/d3-contour/src/array.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-contour/src/array.js ***!
  \**********************************************/
/*! exports provided: slice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return slice; });
var array = Array.prototype;

var slice = array.slice;


/***/ }),

/***/ "./node_modules/d3-contour/src/ascending.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-contour/src/ascending.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return a - b;
});


/***/ }),

/***/ "./node_modules/d3-contour/src/blur.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-contour/src/blur.js ***!
  \*********************************************/
/*! exports provided: blurX, blurY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blurX", function() { return blurX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blurY", function() { return blurY; });
// TODO Optimize edge cases.
// TODO Optimize index calculation.
// TODO Optimize arguments.
function blurX(source, target, r) {
  var n = source.width,
      m = source.height,
      w = (r << 1) + 1;
  for (var j = 0; j < m; ++j) {
    for (var i = 0, sr = 0; i < n + r; ++i) {
      if (i < n) {
        sr += source.data[i + j * n];
      }
      if (i >= r) {
        if (i >= w) {
          sr -= source.data[i - w + j * n];
        }
        target.data[i - r + j * n] = sr / Math.min(i + 1, n - 1 + w - i, w);
      }
    }
  }
}

// TODO Optimize edge cases.
// TODO Optimize index calculation.
// TODO Optimize arguments.
function blurY(source, target, r) {
  var n = source.width,
      m = source.height,
      w = (r << 1) + 1;
  for (var i = 0; i < n; ++i) {
    for (var j = 0, sr = 0; j < m + r; ++j) {
      if (j < m) {
        sr += source.data[i + j * n];
      }
      if (j >= r) {
        if (j >= w) {
          sr -= source.data[i + (j - w) * n];
        }
        target.data[i + (j - r) * n] = sr / Math.min(j + 1, m - 1 + w - j, w);
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/d3-contour/src/constant.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-contour/src/constant.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "./node_modules/d3-contour/src/contains.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-contour/src/contains.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(ring, hole) {
  var i = -1, n = hole.length, c;
  while (++i < n) if (c = ringContains(ring, hole[i])) return c;
  return 0;
});

function ringContains(ring, point) {
  var x = point[0], y = point[1], contains = -1;
  for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    var pi = ring[i], xi = pi[0], yi = pi[1], pj = ring[j], xj = pj[0], yj = pj[1];
    if (segmentContains(pi, pj, point)) return 0;
    if (((yi > y) !== (yj > y)) && ((x < (xj - xi) * (y - yi) / (yj - yi) + xi))) contains = -contains;
  }
  return contains;
}

function segmentContains(a, b, c) {
  var i; return collinear(a, b, c) && within(a[i = +(a[0] === b[0])], c[i], b[i]);
}

function collinear(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b[1] - a[1]);
}

function within(p, q, r) {
  return p <= q && q <= r || r <= q && q <= p;
}


/***/ }),

/***/ "./node_modules/d3-contour/src/contours.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-contour/src/contours.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./node_modules/d3-contour/src/array.js");
/* harmony import */ var _ascending__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ascending */ "./node_modules/d3-contour/src/ascending.js");
/* harmony import */ var _area__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./area */ "./node_modules/d3-contour/src/area.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-contour/src/constant.js");
/* harmony import */ var _contains__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contains */ "./node_modules/d3-contour/src/contains.js");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./noop */ "./node_modules/d3-contour/src/noop.js");








var cases = [
  [],
  [[[1.0, 1.5], [0.5, 1.0]]],
  [[[1.5, 1.0], [1.0, 1.5]]],
  [[[1.5, 1.0], [0.5, 1.0]]],
  [[[1.0, 0.5], [1.5, 1.0]]],
  [[[1.0, 1.5], [0.5, 1.0]], [[1.0, 0.5], [1.5, 1.0]]],
  [[[1.0, 0.5], [1.0, 1.5]]],
  [[[1.0, 0.5], [0.5, 1.0]]],
  [[[0.5, 1.0], [1.0, 0.5]]],
  [[[1.0, 1.5], [1.0, 0.5]]],
  [[[0.5, 1.0], [1.0, 0.5]], [[1.5, 1.0], [1.0, 1.5]]],
  [[[1.5, 1.0], [1.0, 0.5]]],
  [[[0.5, 1.0], [1.5, 1.0]]],
  [[[1.0, 1.5], [1.5, 1.0]]],
  [[[0.5, 1.0], [1.0, 1.5]]],
  []
];

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var dx = 1,
      dy = 1,
      threshold = d3_array__WEBPACK_IMPORTED_MODULE_0__["thresholdSturges"],
      smooth = smoothLinear;

  function contours(values) {
    var tz = threshold(values);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      var domain = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["extent"])(values), start = domain[0], stop = domain[1];
      tz = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["tickStep"])(start, stop, tz);
      tz = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(Math.floor(start / tz) * tz, Math.floor(stop / tz) * tz, tz);
    } else {
      tz = tz.slice().sort(_ascending__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }

    return tz.map(function(value) {
      return contour(values, value);
    });
  }

  // Accumulate, smooth contour rings, assign holes to exterior rings.
  // Based on https://github.com/mbostock/shapefile/blob/v0.6.2/shp/polygon.js
  function contour(values, value) {
    var polygons = [],
        holes = [];

    isorings(values, value, function(ring) {
      smooth(ring, values, value);
      if (Object(_area__WEBPACK_IMPORTED_MODULE_3__["default"])(ring) > 0) polygons.push([ring]);
      else holes.push(ring);
    });

    holes.forEach(function(hole) {
      for (var i = 0, n = polygons.length, polygon; i < n; ++i) {
        if (Object(_contains__WEBPACK_IMPORTED_MODULE_5__["default"])((polygon = polygons[i])[0], hole) !== -1) {
          polygon.push(hole);
          return;
        }
      }
    });

    return {
      type: "MultiPolygon",
      value: value,
      coordinates: polygons
    };
  }

  // Marching squares with isolines stitched into rings.
  // Based on https://github.com/topojson/topojson-client/blob/v3.0.0/src/stitch.js
  function isorings(values, value, callback) {
    var fragmentByStart = new Array,
        fragmentByEnd = new Array,
        x, y, t0, t1, t2, t3;

    // Special case for the first row (y = -1, t2 = t3 = 0).
    x = y = -1;
    t1 = values[0] >= value;
    cases[t1 << 1].forEach(stitch);
    while (++x < dx - 1) {
      t0 = t1, t1 = values[x + 1] >= value;
      cases[t0 | t1 << 1].forEach(stitch);
    }
    cases[t1 << 0].forEach(stitch);

    // General case for the intermediate rows.
    while (++y < dy - 1) {
      x = -1;
      t1 = values[y * dx + dx] >= value;
      t2 = values[y * dx] >= value;
      cases[t1 << 1 | t2 << 2].forEach(stitch);
      while (++x < dx - 1) {
        t0 = t1, t1 = values[y * dx + dx + x + 1] >= value;
        t3 = t2, t2 = values[y * dx + x + 1] >= value;
        cases[t0 | t1 << 1 | t2 << 2 | t3 << 3].forEach(stitch);
      }
      cases[t1 | t2 << 3].forEach(stitch);
    }

    // Special case for the last row (y = dy - 1, t0 = t1 = 0).
    x = -1;
    t2 = values[y * dx] >= value;
    cases[t2 << 2].forEach(stitch);
    while (++x < dx - 1) {
      t3 = t2, t2 = values[y * dx + x + 1] >= value;
      cases[t2 << 2 | t3 << 3].forEach(stitch);
    }
    cases[t2 << 3].forEach(stitch);

    function stitch(line) {
      var start = [line[0][0] + x, line[0][1] + y],
          end = [line[1][0] + x, line[1][1] + y],
          startIndex = index(start),
          endIndex = index(end),
          f, g;
      if (f = fragmentByEnd[startIndex]) {
        if (g = fragmentByStart[endIndex]) {
          delete fragmentByEnd[f.end];
          delete fragmentByStart[g.start];
          if (f === g) {
            f.ring.push(end);
            callback(f.ring);
          } else {
            fragmentByStart[f.start] = fragmentByEnd[g.end] = {start: f.start, end: g.end, ring: f.ring.concat(g.ring)};
          }
        } else {
          delete fragmentByEnd[f.end];
          f.ring.push(end);
          fragmentByEnd[f.end = endIndex] = f;
        }
      } else if (f = fragmentByStart[endIndex]) {
        if (g = fragmentByEnd[startIndex]) {
          delete fragmentByStart[f.start];
          delete fragmentByEnd[g.end];
          if (f === g) {
            f.ring.push(end);
            callback(f.ring);
          } else {
            fragmentByStart[g.start] = fragmentByEnd[f.end] = {start: g.start, end: f.end, ring: g.ring.concat(f.ring)};
          }
        } else {
          delete fragmentByStart[f.start];
          f.ring.unshift(start);
          fragmentByStart[f.start = startIndex] = f;
        }
      } else {
        fragmentByStart[startIndex] = fragmentByEnd[endIndex] = {start: startIndex, end: endIndex, ring: [start, end]};
      }
    }
  }

  function index(point) {
    return point[0] * 2 + point[1] * (dx + 1) * 4;
  }

  function smoothLinear(ring, values, value) {
    ring.forEach(function(point) {
      var x = point[0],
          y = point[1],
          xt = x | 0,
          yt = y | 0,
          v0,
          v1 = values[yt * dx + xt];
      if (x > 0 && x < dx && xt === x) {
        v0 = values[yt * dx + xt - 1];
        point[0] = x + (value - v0) / (v1 - v0) - 0.5;
      }
      if (y > 0 && y < dy && yt === y) {
        v0 = values[(yt - 1) * dx + xt];
        point[1] = y + (value - v0) / (v1 - v0) - 0.5;
      }
    });
  }

  contours.contour = contour;

  contours.size = function(_) {
    if (!arguments.length) return [dx, dy];
    var _0 = Math.ceil(_[0]), _1 = Math.ceil(_[1]);
    if (!(_0 > 0) || !(_1 > 0)) throw new Error("invalid size");
    return dx = _0, dy = _1, contours;
  };

  contours.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? Object(_constant__WEBPACK_IMPORTED_MODULE_4__["default"])(_array__WEBPACK_IMPORTED_MODULE_1__["slice"].call(_)) : Object(_constant__WEBPACK_IMPORTED_MODULE_4__["default"])(_), contours) : threshold;
  };

  contours.smooth = function(_) {
    return arguments.length ? (smooth = _ ? smoothLinear : _noop__WEBPACK_IMPORTED_MODULE_6__["default"], contours) : smooth === smoothLinear;
  };

  return contours;
});


/***/ }),

/***/ "./node_modules/d3-contour/src/density.js":
/*!************************************************!*\
  !*** ./node_modules/d3-contour/src/density.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./node_modules/d3-contour/src/array.js");
/* harmony import */ var _blur__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blur */ "./node_modules/d3-contour/src/blur.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-contour/src/constant.js");
/* harmony import */ var _contours__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contours */ "./node_modules/d3-contour/src/contours.js");






function defaultX(d) {
  return d[0];
}

function defaultY(d) {
  return d[1];
}

function defaultWeight() {
  return 1;
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var x = defaultX,
      y = defaultY,
      weight = defaultWeight,
      dx = 960,
      dy = 500,
      r = 20, // blur radius
      k = 2, // log2(grid cell size)
      o = r * 3, // grid offset, to pad for blur
      n = (dx + o * 2) >> k, // grid width
      m = (dy + o * 2) >> k, // grid height
      threshold = Object(_constant__WEBPACK_IMPORTED_MODULE_3__["default"])(20);

  function density(data) {
    var values0 = new Float32Array(n * m),
        values1 = new Float32Array(n * m);

    data.forEach(function(d, i, data) {
      var xi = (+x(d, i, data) + o) >> k,
          yi = (+y(d, i, data) + o) >> k,
          wi = +weight(d, i, data);
      if (xi >= 0 && xi < n && yi >= 0 && yi < m) {
        values0[xi + yi * n] += wi;
      }
    });

    // TODO Optimize.
    Object(_blur__WEBPACK_IMPORTED_MODULE_2__["blurX"])({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
    Object(_blur__WEBPACK_IMPORTED_MODULE_2__["blurY"])({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);
    Object(_blur__WEBPACK_IMPORTED_MODULE_2__["blurX"])({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
    Object(_blur__WEBPACK_IMPORTED_MODULE_2__["blurY"])({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);
    Object(_blur__WEBPACK_IMPORTED_MODULE_2__["blurX"])({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
    Object(_blur__WEBPACK_IMPORTED_MODULE_2__["blurY"])({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);

    var tz = threshold(values0);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      var stop = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["max"])(values0);
      tz = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["tickStep"])(0, stop, tz);
      tz = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(0, Math.floor(stop / tz) * tz, tz);
      tz.shift();
    }

    return Object(_contours__WEBPACK_IMPORTED_MODULE_4__["default"])()
        .thresholds(tz)
        .size([n, m])
      (values0)
        .map(transform);
  }

  function transform(geometry) {
    geometry.value *= Math.pow(2, -2 * k); // Density in points per square pixel.
    geometry.coordinates.forEach(transformPolygon);
    return geometry;
  }

  function transformPolygon(coordinates) {
    coordinates.forEach(transformRing);
  }

  function transformRing(coordinates) {
    coordinates.forEach(transformPoint);
  }

  // TODO Optimize.
  function transformPoint(coordinates) {
    coordinates[0] = coordinates[0] * Math.pow(2, k) - o;
    coordinates[1] = coordinates[1] * Math.pow(2, k) - o;
  }

  function resize() {
    o = r * 3;
    n = (dx + o * 2) >> k;
    m = (dy + o * 2) >> k;
    return density;
  }

  density.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_3__["default"])(+_), density) : x;
  };

  density.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_3__["default"])(+_), density) : y;
  };

  density.weight = function(_) {
    return arguments.length ? (weight = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_3__["default"])(+_), density) : weight;
  };

  density.size = function(_) {
    if (!arguments.length) return [dx, dy];
    var _0 = Math.ceil(_[0]), _1 = Math.ceil(_[1]);
    if (!(_0 >= 0) && !(_0 >= 0)) throw new Error("invalid size");
    return dx = _0, dy = _1, resize();
  };

  density.cellSize = function(_) {
    if (!arguments.length) return 1 << k;
    if (!((_ = +_) >= 1)) throw new Error("invalid cell size");
    return k = Math.floor(Math.log(_) / Math.LN2), resize();
  };

  density.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? Object(_constant__WEBPACK_IMPORTED_MODULE_3__["default"])(_array__WEBPACK_IMPORTED_MODULE_1__["slice"].call(_)) : Object(_constant__WEBPACK_IMPORTED_MODULE_3__["default"])(_), density) : threshold;
  };

  density.bandwidth = function(_) {
    if (!arguments.length) return Math.sqrt(r * (r + 1));
    if (!((_ = +_) >= 0)) throw new Error("invalid bandwidth");
    return r = Math.round((Math.sqrt(4 * _ * _ + 1) - 1) / 2), resize();
  };

  return density;
});


/***/ }),

/***/ "./node_modules/d3-contour/src/index.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-contour/src/index.js ***!
  \**********************************************/
/*! exports provided: contours, contourDensity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _contours__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contours */ "./node_modules/d3-contour/src/contours.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contours", function() { return _contours__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _density__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./density */ "./node_modules/d3-contour/src/density.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contourDensity", function() { return _density__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./node_modules/d3-contour/src/noop.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-contour/src/noop.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function() {});


/***/ }),

/***/ "./node_modules/d3-dsv/src/autoType.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-dsv/src/autoType.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return autoType; });
function autoType(object) {
  for (var key in object) {
    var value = object[key].trim(), number;
    if (!value) value = null;
    else if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (value === "NaN") value = NaN;
    else if (!isNaN(number = +value)) value = number;
    else if (/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/.test(value)) value = new Date(value);
    else continue;
    object[key] = value;
  }
  return object;
}


/***/ }),

/***/ "./node_modules/d3-dsv/src/csv.js":
/*!****************************************!*\
  !*** ./node_modules/d3-dsv/src/csv.js ***!
  \****************************************/
/*! exports provided: csvParse, csvParseRows, csvFormat, csvFormatBody, csvFormatRows */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvParse", function() { return csvParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvParseRows", function() { return csvParseRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormat", function() { return csvFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormatBody", function() { return csvFormatBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormatRows", function() { return csvFormatRows; });
/* harmony import */ var _dsv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsv */ "./node_modules/d3-dsv/src/dsv.js");


var csv = Object(_dsv__WEBPACK_IMPORTED_MODULE_0__["default"])(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatBody = csv.formatBody;
var csvFormatRows = csv.formatRows;


/***/ }),

/***/ "./node_modules/d3-dsv/src/dsv.js":
/*!****************************************!*\
  !*** ./node_modules/d3-dsv/src/dsv.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "]";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function pad(value, width) {
  var s = value + "", length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6)
    : year > 9999 ? "+" + pad(year, 6)
    : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date"
      : formatYear(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
      + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
      : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
      : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
      : "");
}

/* harmony default export */ __webpack_exports__["default"] = (function(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? ""
        : value instanceof Date ? formatDate(value)
        : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
        : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows
  };
});


/***/ }),

/***/ "./node_modules/d3-dsv/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/d3-dsv/src/index.js ***!
  \******************************************/
/*! exports provided: dsvFormat, csvParse, csvParseRows, csvFormat, csvFormatBody, csvFormatRows, tsvParse, tsvParseRows, tsvFormat, tsvFormatBody, tsvFormatRows, autoType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dsv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsv */ "./node_modules/d3-dsv/src/dsv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dsvFormat", function() { return _dsv__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _csv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./csv */ "./node_modules/d3-dsv/src/csv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvParse", function() { return _csv__WEBPACK_IMPORTED_MODULE_1__["csvParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvParseRows", function() { return _csv__WEBPACK_IMPORTED_MODULE_1__["csvParseRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormat", function() { return _csv__WEBPACK_IMPORTED_MODULE_1__["csvFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormatBody", function() { return _csv__WEBPACK_IMPORTED_MODULE_1__["csvFormatBody"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormatRows", function() { return _csv__WEBPACK_IMPORTED_MODULE_1__["csvFormatRows"]; });

/* harmony import */ var _tsv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tsv */ "./node_modules/d3-dsv/src/tsv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvParse", function() { return _tsv__WEBPACK_IMPORTED_MODULE_2__["tsvParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvParseRows", function() { return _tsv__WEBPACK_IMPORTED_MODULE_2__["tsvParseRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormat", function() { return _tsv__WEBPACK_IMPORTED_MODULE_2__["tsvFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormatBody", function() { return _tsv__WEBPACK_IMPORTED_MODULE_2__["tsvFormatBody"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormatRows", function() { return _tsv__WEBPACK_IMPORTED_MODULE_2__["tsvFormatRows"]; });

/* harmony import */ var _autoType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autoType */ "./node_modules/d3-dsv/src/autoType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "autoType", function() { return _autoType__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "./node_modules/d3-dsv/src/tsv.js":
/*!****************************************!*\
  !*** ./node_modules/d3-dsv/src/tsv.js ***!
  \****************************************/
/*! exports provided: tsvParse, tsvParseRows, tsvFormat, tsvFormatBody, tsvFormatRows */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvParse", function() { return tsvParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvParseRows", function() { return tsvParseRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormat", function() { return tsvFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormatBody", function() { return tsvFormatBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormatRows", function() { return tsvFormatRows; });
/* harmony import */ var _dsv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsv */ "./node_modules/d3-dsv/src/dsv.js");


var tsv = Object(_dsv__WEBPACK_IMPORTED_MODULE_0__["default"])("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatBody = tsv.formatBody;
var tsvFormatRows = tsv.formatRows;


/***/ }),

/***/ "./node_modules/d3-fetch/src/blob.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-fetch/src/blob.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function responseBlob(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.blob();
}

/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return fetch(input, init).then(responseBlob);
});


/***/ }),

/***/ "./node_modules/d3-fetch/src/buffer.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-fetch/src/buffer.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function responseArrayBuffer(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.arrayBuffer();
}

/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return fetch(input, init).then(responseArrayBuffer);
});


/***/ }),

/***/ "./node_modules/d3-fetch/src/dsv.js":
/*!******************************************!*\
  !*** ./node_modules/d3-fetch/src/dsv.js ***!
  \******************************************/
/*! exports provided: default, csv, tsv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dsv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csv", function() { return csv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsv", function() { return tsv; });
/* harmony import */ var d3_dsv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dsv */ "./node_modules/d3-dsv/src/index.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text */ "./node_modules/d3-fetch/src/text.js");



function dsvParse(parse) {
  return function(input, init, row) {
    if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
    return Object(_text__WEBPACK_IMPORTED_MODULE_1__["default"])(input, init).then(function(response) {
      return parse(response, row);
    });
  };
}

function dsv(delimiter, input, init, row) {
  if (arguments.length === 3 && typeof init === "function") row = init, init = undefined;
  var format = Object(d3_dsv__WEBPACK_IMPORTED_MODULE_0__["dsvFormat"])(delimiter);
  return Object(_text__WEBPACK_IMPORTED_MODULE_1__["default"])(input, init).then(function(response) {
    return format.parse(response, row);
  });
}

var csv = dsvParse(d3_dsv__WEBPACK_IMPORTED_MODULE_0__["csvParse"]);
var tsv = dsvParse(d3_dsv__WEBPACK_IMPORTED_MODULE_0__["tsvParse"]);


/***/ }),

/***/ "./node_modules/d3-fetch/src/image.js":
/*!********************************************!*\
  !*** ./node_modules/d3-fetch/src/image.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return new Promise(function(resolve, reject) {
    var image = new Image;
    for (var key in init) image[key] = init[key];
    image.onerror = reject;
    image.onload = function() { resolve(image); };
    image.src = input;
  });
});


/***/ }),

/***/ "./node_modules/d3-fetch/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-fetch/src/index.js ***!
  \********************************************/
/*! exports provided: blob, buffer, dsv, csv, tsv, image, json, text, xml, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blob__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blob */ "./node_modules/d3-fetch/src/blob.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "blob", function() { return _blob__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer */ "./node_modules/d3-fetch/src/buffer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buffer", function() { return _buffer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _dsv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dsv */ "./node_modules/d3-fetch/src/dsv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dsv", function() { return _dsv__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csv", function() { return _dsv__WEBPACK_IMPORTED_MODULE_2__["csv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsv", function() { return _dsv__WEBPACK_IMPORTED_MODULE_2__["tsv"]; });

/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image */ "./node_modules/d3-fetch/src/image.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "image", function() { return _image__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./json */ "./node_modules/d3-fetch/src/json.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "json", function() { return _json__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text */ "./node_modules/d3-fetch/src/text.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "text", function() { return _text__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _xml__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./xml */ "./node_modules/d3-fetch/src/xml.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "xml", function() { return _xml__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return _xml__WEBPACK_IMPORTED_MODULE_6__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return _xml__WEBPACK_IMPORTED_MODULE_6__["svg"]; });










/***/ }),

/***/ "./node_modules/d3-fetch/src/json.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-fetch/src/json.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.json();
}

/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return fetch(input, init).then(responseJson);
});


/***/ }),

/***/ "./node_modules/d3-fetch/src/text.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-fetch/src/text.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return fetch(input, init).then(responseText);
});


/***/ }),

/***/ "./node_modules/d3-fetch/src/xml.js":
/*!******************************************!*\
  !*** ./node_modules/d3-fetch/src/xml.js ***!
  \******************************************/
/*! exports provided: default, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return svg; });
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text */ "./node_modules/d3-fetch/src/text.js");


function parser(type) {
  return function(input, init)  {
    return Object(_text__WEBPACK_IMPORTED_MODULE_0__["default"])(input, init).then(function(text) {
      return (new DOMParser).parseFromString(text, type);
    });
  };
}

/* harmony default export */ __webpack_exports__["default"] = (parser("application/xml"));

var html = parser("text/html");

var svg = parser("image/svg+xml");


/***/ }),

/***/ "./node_modules/d3-geo/src/adder.js":
/*!******************************************!*\
  !*** ./node_modules/d3-geo/src/adder.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return new Adder;
});

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add(temp, y, this.t);
    add(this, temp.s, this.s);
    if (this.s) this.t += temp.t;
    else this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};

var temp = new Adder;

function add(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/area.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/area.js ***!
  \*****************************************/
/*! exports provided: areaRingSum, areaStream, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areaRingSum", function() { return areaRingSum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areaStream", function() { return areaStream; });
/* harmony import */ var _adder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adder */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./noop */ "./node_modules/d3-geo/src/noop.js");
/* harmony import */ var _stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stream */ "./node_modules/d3-geo/src/stream.js");





var areaRingSum = Object(_adder__WEBPACK_IMPORTED_MODULE_0__["default"])();

var areaSum = Object(_adder__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    lambda00,
    phi00,
    lambda0,
    cosPhi0,
    sinPhi0;

var areaStream = {
  point: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineStart: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineEnd: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  polygonStart: function() {
    areaRingSum.reset();
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum;
    areaSum.add(areaRing < 0 ? _math__WEBPACK_IMPORTED_MODULE_1__["tau"] + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = _noop__WEBPACK_IMPORTED_MODULE_2__["default"];
  },
  sphere: function() {
    areaSum.add(_math__WEBPACK_IMPORTED_MODULE_1__["tau"]);
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaRingEnd() {
  areaPoint(lambda00, phi00);
}

function areaPointFirst(lambda, phi) {
  areaStream.point = areaPoint;
  lambda00 = lambda, phi00 = phi;
  lambda *= _math__WEBPACK_IMPORTED_MODULE_1__["radians"], phi *= _math__WEBPACK_IMPORTED_MODULE_1__["radians"];
  lambda0 = lambda, cosPhi0 = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi = phi / 2 + _math__WEBPACK_IMPORTED_MODULE_1__["quarterPi"]), sinPhi0 = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi);
}

function areaPoint(lambda, phi) {
  lambda *= _math__WEBPACK_IMPORTED_MODULE_1__["radians"], phi *= _math__WEBPACK_IMPORTED_MODULE_1__["radians"];
  phi = phi / 2 + _math__WEBPACK_IMPORTED_MODULE_1__["quarterPi"]; // half the angular distance from south pole

  // Spherical excess E for a spherical triangle with vertices: south pole,
  // previous point, current point.  Uses a formula derived from Cagnoli’s
  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
  var dLambda = lambda - lambda0,
      sdLambda = dLambda >= 0 ? 1 : -1,
      adLambda = sdLambda * dLambda,
      cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi),
      sinPhi = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi),
      k = sinPhi0 * sinPhi,
      u = cosPhi0 * cosPhi + k * Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(adLambda),
      v = k * sdLambda * Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(adLambda);
  areaRingSum.add(Object(_math__WEBPACK_IMPORTED_MODULE_1__["atan2"])(v, u));

  // Advance the previous points.
  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
}

/* harmony default export */ __webpack_exports__["default"] = (function(object) {
  areaSum.reset();
  Object(_stream__WEBPACK_IMPORTED_MODULE_3__["default"])(object, areaStream);
  return areaSum * 2;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/bounds.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/bounds.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adder */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _area__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./area */ "./node_modules/d3-geo/src/area.js");
/* harmony import */ var _cartesian__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cartesian */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _stream__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stream */ "./node_modules/d3-geo/src/stream.js");






var lambda0, phi0, lambda1, phi1, // bounds
    lambda2, // previous lambda-coordinate
    lambda00, phi00, // first point
    p0, // previous 3D point
    deltaSum = Object(_adder__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    ranges,
    range;

var boundsStream = {
  point: boundsPoint,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function() {
    boundsStream.point = boundsRingPoint;
    boundsStream.lineStart = boundsRingStart;
    boundsStream.lineEnd = boundsRingEnd;
    deltaSum.reset();
    _area__WEBPACK_IMPORTED_MODULE_1__["areaStream"].polygonStart();
  },
  polygonEnd: function() {
    _area__WEBPACK_IMPORTED_MODULE_1__["areaStream"].polygonEnd();
    boundsStream.point = boundsPoint;
    boundsStream.lineStart = boundsLineStart;
    boundsStream.lineEnd = boundsLineEnd;
    if (_area__WEBPACK_IMPORTED_MODULE_1__["areaRingSum"] < 0) lambda0 = -(lambda1 = 180), phi0 = -(phi1 = 90);
    else if (deltaSum > _math__WEBPACK_IMPORTED_MODULE_3__["epsilon"]) phi1 = 90;
    else if (deltaSum < -_math__WEBPACK_IMPORTED_MODULE_3__["epsilon"]) phi0 = -90;
    range[0] = lambda0, range[1] = lambda1;
  },
  sphere: function() {
    lambda0 = -(lambda1 = 180), phi0 = -(phi1 = 90);
  }
};

function boundsPoint(lambda, phi) {
  ranges.push(range = [lambda0 = lambda, lambda1 = lambda]);
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
}

function linePoint(lambda, phi) {
  var p = Object(_cartesian__WEBPACK_IMPORTED_MODULE_2__["cartesian"])([lambda * _math__WEBPACK_IMPORTED_MODULE_3__["radians"], phi * _math__WEBPACK_IMPORTED_MODULE_3__["radians"]]);
  if (p0) {
    var normal = Object(_cartesian__WEBPACK_IMPORTED_MODULE_2__["cartesianCross"])(p0, p),
        equatorial = [normal[1], -normal[0], 0],
        inflection = Object(_cartesian__WEBPACK_IMPORTED_MODULE_2__["cartesianCross"])(equatorial, normal);
    Object(_cartesian__WEBPACK_IMPORTED_MODULE_2__["cartesianNormalizeInPlace"])(inflection);
    inflection = Object(_cartesian__WEBPACK_IMPORTED_MODULE_2__["spherical"])(inflection);
    var delta = lambda - lambda2,
        sign = delta > 0 ? 1 : -1,
        lambdai = inflection[0] * _math__WEBPACK_IMPORTED_MODULE_3__["degrees"] * sign,
        phii,
        antimeridian = Object(_math__WEBPACK_IMPORTED_MODULE_3__["abs"])(delta) > 180;
    if (antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = inflection[1] * _math__WEBPACK_IMPORTED_MODULE_3__["degrees"];
      if (phii > phi1) phi1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = -inflection[1] * _math__WEBPACK_IMPORTED_MODULE_3__["degrees"];
      if (phii < phi0) phi0 = phii;
    } else {
      if (phi < phi0) phi0 = phi;
      if (phi > phi1) phi1 = phi;
    }
    if (antimeridian) {
      if (lambda < lambda2) {
        if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
      } else {
        if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
      }
    } else {
      if (lambda1 >= lambda0) {
        if (lambda < lambda0) lambda0 = lambda;
        if (lambda > lambda1) lambda1 = lambda;
      } else {
        if (lambda > lambda2) {
          if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
        }
      }
    }
  } else {
    ranges.push(range = [lambda0 = lambda, lambda1 = lambda]);
  }
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
  p0 = p, lambda2 = lambda;
}

function boundsLineStart() {
  boundsStream.point = linePoint;
}

function boundsLineEnd() {
  range[0] = lambda0, range[1] = lambda1;
  boundsStream.point = boundsPoint;
  p0 = null;
}

function boundsRingPoint(lambda, phi) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add(Object(_math__WEBPACK_IMPORTED_MODULE_3__["abs"])(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda00 = lambda, phi00 = phi;
  }
  _area__WEBPACK_IMPORTED_MODULE_1__["areaStream"].point(lambda, phi);
  linePoint(lambda, phi);
}

function boundsRingStart() {
  _area__WEBPACK_IMPORTED_MODULE_1__["areaStream"].lineStart();
}

function boundsRingEnd() {
  boundsRingPoint(lambda00, phi00);
  _area__WEBPACK_IMPORTED_MODULE_1__["areaStream"].lineEnd();
  if (Object(_math__WEBPACK_IMPORTED_MODULE_3__["abs"])(deltaSum) > _math__WEBPACK_IMPORTED_MODULE_3__["epsilon"]) lambda0 = -(lambda1 = 180);
  range[0] = lambda0, range[1] = lambda1;
  p0 = null;
}

// Finds the left-right distance between two longitudes.
// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
// the distance between ±180° to be 360°.
function angle(lambda0, lambda1) {
  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
}

function rangeCompare(a, b) {
  return a[0] - b[0];
}

function rangeContains(range, x) {
  return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}

/* harmony default export */ __webpack_exports__["default"] = (function(feature) {
  var i, n, a, b, merged, deltaMax, delta;

  phi1 = lambda1 = -(lambda0 = phi0 = Infinity);
  ranges = [];
  Object(_stream__WEBPACK_IMPORTED_MODULE_4__["default"])(feature, boundsStream);

  // First, sort ranges by their minimum longitudes.
  if (n = ranges.length) {
    ranges.sort(rangeCompare);

    // Then, merge any ranges that overlap.
    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
      b = ranges[i];
      if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
        if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
        if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
      } else {
        merged.push(a = b);
      }
    }

    // Finally, find the largest gap between the merged ranges.
    // The final bounding box will be the inverse of this gap.
    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
      b = merged[i];
      if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0 = b[0], lambda1 = a[1];
    }
  }

  ranges = range = null;

  return lambda0 === Infinity || phi0 === Infinity
      ? [[NaN, NaN], [NaN, NaN]]
      : [[lambda0, phi0], [lambda1, phi1]];
});


/***/ }),

/***/ "./node_modules/d3-geo/src/cartesian.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/cartesian.js ***!
  \**********************************************/
/*! exports provided: spherical, cartesian, cartesianDot, cartesianCross, cartesianAddInPlace, cartesianScale, cartesianNormalizeInPlace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spherical", function() { return spherical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesian", function() { return cartesian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianDot", function() { return cartesianDot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianCross", function() { return cartesianCross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianAddInPlace", function() { return cartesianAddInPlace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianScale", function() { return cartesianScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianNormalizeInPlace", function() { return cartesianNormalizeInPlace; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");


function spherical(cartesian) {
  return [Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan2"])(cartesian[1], cartesian[0]), Object(_math__WEBPACK_IMPORTED_MODULE_0__["asin"])(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi);
  return [cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda), cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda), Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/centroid.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/centroid.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noop */ "./node_modules/d3-geo/src/noop.js");
/* harmony import */ var _stream__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stream */ "./node_modules/d3-geo/src/stream.js");




var W0, W1,
    X0, Y0, Z0,
    X1, Y1, Z1,
    X2, Y2, Z2,
    lambda00, phi00, // first point
    x0, y0, z0; // previous point

var centroidStream = {
  sphere: _noop__WEBPACK_IMPORTED_MODULE_1__["default"],
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  }
};

// Arithmetic mean of Cartesian vectors.
function centroidPoint(lambda, phi) {
  lambda *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"];
  var cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi);
  centroidPointCartesian(cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda), cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda), Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi));
}

function centroidPointCartesian(x, y, z) {
  ++W0;
  X0 += (x - X0) / W0;
  Y0 += (y - Y0) / W0;
  Z0 += (z - Z0) / W0;
}

function centroidLineStart() {
  centroidStream.point = centroidLinePointFirst;
}

function centroidLinePointFirst(lambda, phi) {
  lambda *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"];
  var cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi);
  x0 = cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda);
  y0 = cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda);
  z0 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi);
  centroidStream.point = centroidLinePoint;
  centroidPointCartesian(x0, y0, z0);
}

function centroidLinePoint(lambda, phi) {
  lambda *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"];
  var cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi),
      x = cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda),
      y = cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda),
      z = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi),
      w = Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan2"])(Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).
function centroidRingStart() {
  centroidStream.point = centroidRingPointFirst;
}

function centroidRingEnd() {
  centroidRingPoint(lambda00, phi00);
  centroidStream.point = centroidPoint;
}

function centroidRingPointFirst(lambda, phi) {
  lambda00 = lambda, phi00 = phi;
  lambda *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"];
  centroidStream.point = centroidRingPoint;
  var cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi);
  x0 = cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda);
  y0 = cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda);
  z0 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi);
  centroidPointCartesian(x0, y0, z0);
}

function centroidRingPoint(lambda, phi) {
  lambda *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math__WEBPACK_IMPORTED_MODULE_0__["radians"];
  var cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi),
      x = cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda),
      y = cosPhi * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda),
      z = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi),
      cx = y0 * z - z0 * y,
      cy = z0 * x - x0 * z,
      cz = x0 * y - y0 * x,
      m = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(cx * cx + cy * cy + cz * cz),
      w = Object(_math__WEBPACK_IMPORTED_MODULE_0__["asin"])(m), // line weight = angle
      v = m && -w / m; // area weight multiplier
  X2 += v * cx;
  Y2 += v * cy;
  Z2 += v * cz;
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

/* harmony default export */ __webpack_exports__["default"] = (function(object) {
  W0 = W1 =
  X0 = Y0 = Z0 =
  X1 = Y1 = Z1 =
  X2 = Y2 = Z2 = 0;
  Object(_stream__WEBPACK_IMPORTED_MODULE_2__["default"])(object, centroidStream);

  var x = X2,
      y = Y2,
      z = Z2,
      m = x * x + y * y + z * z;

  // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
  if (m < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon2"]) {
    x = X1, y = Y1, z = Z1;
    // If the feature has zero length, fall back to arithmetic mean of point vectors.
    if (W1 < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) x = X0, y = Y0, z = Z0;
    m = x * x + y * y + z * z;
    // If the feature still has an undefined ccentroid, then return.
    if (m < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon2"]) return [NaN, NaN];
  }

  return [Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan2"])(y, x) * _math__WEBPACK_IMPORTED_MODULE_0__["degrees"], Object(_math__WEBPACK_IMPORTED_MODULE_0__["asin"])(z / Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(m)) * _math__WEBPACK_IMPORTED_MODULE_0__["degrees"]];
});


/***/ }),

/***/ "./node_modules/d3-geo/src/circle.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/circle.js ***!
  \*******************************************/
/*! exports provided: circleStream, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleStream", function() { return circleStream; });
/* harmony import */ var _cartesian__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cartesian */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-geo/src/constant.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rotation */ "./node_modules/d3-geo/src/rotation.js");





// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(radius),
      sinRadius = Object(_math__WEBPACK_IMPORTED_MODULE_2__["sin"])(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * _math__WEBPACK_IMPORTED_MODULE_2__["tau"];
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * _math__WEBPACK_IMPORTED_MODULE_2__["tau"];
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["spherical"])([cosRadius, -sinRadius * Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(t), -sinRadius * Object(_math__WEBPACK_IMPORTED_MODULE_2__["sin"])(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesian"])(point), point[0] -= cosRadius;
  Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianNormalizeInPlace"])(point);
  var radius = Object(_math__WEBPACK_IMPORTED_MODULE_2__["acos"])(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + _math__WEBPACK_IMPORTED_MODULE_2__["tau"] - _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"]) % _math__WEBPACK_IMPORTED_MODULE_2__["tau"];
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var center = Object(_constant__WEBPACK_IMPORTED_MODULE_1__["default"])([0, 0]),
      radius = Object(_constant__WEBPACK_IMPORTED_MODULE_1__["default"])(90),
      precision = Object(_constant__WEBPACK_IMPORTED_MODULE_1__["default"])(6),
      ring,
      rotate,
      stream = {point: point};

  function point(x, y) {
    ring.push(x = rotate(x, y));
    x[0] *= _math__WEBPACK_IMPORTED_MODULE_2__["degrees"], x[1] *= _math__WEBPACK_IMPORTED_MODULE_2__["degrees"];
  }

  function circle() {
    var c = center.apply(this, arguments),
        r = radius.apply(this, arguments) * _math__WEBPACK_IMPORTED_MODULE_2__["radians"],
        p = precision.apply(this, arguments) * _math__WEBPACK_IMPORTED_MODULE_2__["radians"];
    ring = [];
    rotate = Object(_rotation__WEBPACK_IMPORTED_MODULE_3__["rotateRadians"])(-c[0] * _math__WEBPACK_IMPORTED_MODULE_2__["radians"], -c[1] * _math__WEBPACK_IMPORTED_MODULE_2__["radians"], 0).invert;
    circleStream(stream, r, p, 1);
    c = {type: "Polygon", coordinates: [ring]};
    ring = rotate = null;
    return c;
  }

  circle.center = function(_) {
    return arguments.length ? (center = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_1__["default"])([+_[0], +_[1]]), circle) : center;
  };

  circle.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_1__["default"])(+_), circle) : radius;
  };

  circle.precision = function(_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_1__["default"])(+_), circle) : precision;
  };

  return circle;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/antimeridian.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/antimeridian.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/clip/index.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");



/* harmony default export */ __webpack_exports__["default"] = (Object(_index__WEBPACK_IMPORTED_MODULE_0__["default"])(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-_math__WEBPACK_IMPORTED_MODULE_1__["pi"], -_math__WEBPACK_IMPORTED_MODULE_1__["halfPi"]]
));

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? _math__WEBPACK_IMPORTED_MODULE_1__["pi"] : -_math__WEBPACK_IMPORTED_MODULE_1__["pi"],
          delta = Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda1 - lambda0);
      if (Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(delta - _math__WEBPACK_IMPORTED_MODULE_1__["pi"]) < _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? _math__WEBPACK_IMPORTED_MODULE_1__["halfPi"] : -_math__WEBPACK_IMPORTED_MODULE_1__["halfPi"]);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= _math__WEBPACK_IMPORTED_MODULE_1__["pi"]) { // line crosses antimeridian
        if (Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda0 - sign0) < _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]) lambda0 -= sign0 * _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]; // handle degeneracies
        if (Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda1 - sign1) < _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]) lambda1 -= sign1 * _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"];
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda0 - lambda1);
  return Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(sinLambda0Lambda1) > _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]
      ? Object(_math__WEBPACK_IMPORTED_MODULE_1__["atan"])((Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi0) * (cosPhi1 = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi1)) * Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda1)
          - Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi1) * (cosPhi0 = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi0)) * Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * _math__WEBPACK_IMPORTED_MODULE_1__["halfPi"];
    stream.point(-_math__WEBPACK_IMPORTED_MODULE_1__["pi"], phi);
    stream.point(0, phi);
    stream.point(_math__WEBPACK_IMPORTED_MODULE_1__["pi"], phi);
    stream.point(_math__WEBPACK_IMPORTED_MODULE_1__["pi"], 0);
    stream.point(_math__WEBPACK_IMPORTED_MODULE_1__["pi"], -phi);
    stream.point(0, -phi);
    stream.point(-_math__WEBPACK_IMPORTED_MODULE_1__["pi"], -phi);
    stream.point(-_math__WEBPACK_IMPORTED_MODULE_1__["pi"], 0);
    stream.point(-_math__WEBPACK_IMPORTED_MODULE_1__["pi"], phi);
  } else if (Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(from[0] - to[0]) > _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]) {
    var lambda = from[0] < to[0] ? _math__WEBPACK_IMPORTED_MODULE_1__["pi"] : -_math__WEBPACK_IMPORTED_MODULE_1__["pi"];
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/buffer.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/buffer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop */ "./node_modules/d3-geo/src/noop.js");


/* harmony default export */ __webpack_exports__["default"] = (function() {
  var lines = [],
      line;
  return {
    point: function(x, y) {
      line.push([x, y]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: _noop__WEBPACK_IMPORTED_MODULE_0__["default"],
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/circle.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/circle.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cartesian__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cartesian */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../circle */ "./node_modules/d3-geo/src/circle.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _pointEqual__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pointEqual */ "./node_modules/d3-geo/src/pointEqual.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/clip/index.js");






/* harmony default export */ __webpack_exports__["default"] = (function(radius) {
  var cr = Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(radius),
      delta = 6 * _math__WEBPACK_IMPORTED_MODULE_2__["radians"],
      smallRadius = cr > 0,
      notHemisphere = Object(_math__WEBPACK_IMPORTED_MODULE_2__["abs"])(cr) > _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"]; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    Object(_circle__WEBPACK_IMPORTED_MODULE_1__["circleStream"])(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(lambda) * Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? _math__WEBPACK_IMPORTED_MODULE_2__["pi"] : -_math__WEBPACK_IMPORTED_MODULE_2__["pi"]), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        // Handle degeneracies.
        // TODO ignore if not clipping polygons.
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || Object(_pointEqual__WEBPACK_IMPORTED_MODULE_3__["default"])(point0, point2) || Object(_pointEqual__WEBPACK_IMPORTED_MODULE_3__["default"])(point1, point2)) {
            point1[0] += _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"];
            point1[1] += _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"];
            v = visible(point1[0], point1[1]);
          }
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1]);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
            }
          }
        }
        if (v && (!point0 || !Object(_pointEqual__WEBPACK_IMPORTED_MODULE_3__["default"])(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesian"])(a),
        pb = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesian"])(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianCross"])(pa, pb),
        n2n2 = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianDot"])(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianCross"])(n1, n2),
        A = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianScale"])(n1, c1),
        B = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianScale"])(n2, c2);
    Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianAddInPlace"])(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianDot"])(A, u),
        uu = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianDot"])(u, u),
        t2 = w * w - uu * (Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianDot"])(A, A) - 1);

    if (t2 < 0) return;

    var t = Object(_math__WEBPACK_IMPORTED_MODULE_2__["sqrt"])(t2),
        q = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianScale"])(u, (-w - t) / uu);
    Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianAddInPlace"])(q, A);
    q = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["spherical"])(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = Object(_math__WEBPACK_IMPORTED_MODULE_2__["abs"])(delta - _math__WEBPACK_IMPORTED_MODULE_2__["pi"]) < _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"],
        meridian = polar || delta < _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"];

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (Object(_math__WEBPACK_IMPORTED_MODULE_2__["abs"])(q[0] - lambda0) < _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"] ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > _math__WEBPACK_IMPORTED_MODULE_2__["pi"] ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianScale"])(u, (-w + t) / uu);
      Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesianAddInPlace"])(q1, A);
      return [q, Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["spherical"])(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : _math__WEBPACK_IMPORTED_MODULE_2__["pi"] - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return Object(_index__WEBPACK_IMPORTED_MODULE_4__["default"])(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-_math__WEBPACK_IMPORTED_MODULE_2__["pi"], radius - _math__WEBPACK_IMPORTED_MODULE_2__["pi"]]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/extent.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/extent.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangle */ "./node_modules/d3-geo/src/clip/rectangle.js");


/* harmony default export */ __webpack_exports__["default"] = (function() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      cache,
      cacheStream,
      clip;

  return clip = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = Object(_rectangle__WEBPACK_IMPORTED_MODULE_0__["default"])(x0, y0, x1, y1)(cacheStream = stream);
    },
    extent: function(_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
    }
  };
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/clip/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer */ "./node_modules/d3-geo/src/clip/buffer.js");
/* harmony import */ var _rejoin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rejoin */ "./node_modules/d3-geo/src/clip/rejoin.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _polygonContains__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../polygonContains */ "./node_modules/d3-geo/src/polygonContains.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");






/* harmony default export */ __webpack_exports__["default"] = (function(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
    var line = clipLine(sink),
        ringBuffer = Object(_buffer__WEBPACK_IMPORTED_MODULE_0__["default"])(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = Object(d3_array__WEBPACK_IMPORTED_MODULE_4__["merge"])(segments);
        var startInside = Object(_polygonContains__WEBPACK_IMPORTED_MODULE_3__["default"])(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          Object(_rejoin__WEBPACK_IMPORTED_MODULE_1__["default"])(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
});

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - _math__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"] : _math__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - _math__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"] : _math__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - b[1]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/line.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/clip/line.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/rectangle.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/rectangle.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return clipRectangle; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer */ "./node_modules/d3-geo/src/clip/buffer.js");
/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./line */ "./node_modules/d3-geo/src/clip/line.js");
/* harmony import */ var _rejoin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rejoin */ "./node_modules/d3-geo/src/clip/rejoin.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");






var clipMax = 1e9, clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(p[0] - x0) < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"] ? direction > 0 ? 0 : 3
        : Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(p[0] - x1) < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"] ? direction > 0 ? 2 : 1
        : Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(p[1] - y0) < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"] ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = Object(_buffer__WEBPACK_IMPORTED_MODULE_1__["default"])(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = Object(d3_array__WEBPACK_IMPORTED_MODULE_4__["merge"])(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          Object(_rejoin__WEBPACK_IMPORTED_MODULE_3__["default"])(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (Object(_line__WEBPACK_IMPORTED_MODULE_2__["default"])(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/rejoin.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/rejoin.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pointEqual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pointEqual */ "./node_modules/d3-geo/src/pointEqual.js");


function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
/* harmony default export */ __webpack_exports__["default"] = (function(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    // If the first and last points of a segment are coincident, then treat as a
    // closed ring. TODO if all rings are closed, then the winding order of the
    // exterior ring should be checked.
    if (Object(_pointEqual__WEBPACK_IMPORTED_MODULE_0__["default"])(p0, p1)) {
      stream.lineStart();
      for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
      stream.lineEnd();
      return;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
});

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/compose.js":
/*!********************************************!*\
  !*** ./node_modules/d3-geo/src/compose.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/constant.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/constant.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "./node_modules/d3-geo/src/contains.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/contains.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polygonContains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polygonContains */ "./node_modules/d3-geo/src/polygonContains.js");
/* harmony import */ var _distance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./distance */ "./node_modules/d3-geo/src/distance.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");




var containsObjectType = {
  Feature: function(object, point) {
    return containsGeometry(object.geometry, point);
  },
  FeatureCollection: function(object, point) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) if (containsGeometry(features[i].geometry, point)) return true;
    return false;
  }
};

var containsGeometryType = {
  Sphere: function() {
    return true;
  },
  Point: function(object, point) {
    return containsPoint(object.coordinates, point);
  },
  MultiPoint: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPoint(coordinates[i], point)) return true;
    return false;
  },
  LineString: function(object, point) {
    return containsLine(object.coordinates, point);
  },
  MultiLineString: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsLine(coordinates[i], point)) return true;
    return false;
  },
  Polygon: function(object, point) {
    return containsPolygon(object.coordinates, point);
  },
  MultiPolygon: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPolygon(coordinates[i], point)) return true;
    return false;
  },
  GeometryCollection: function(object, point) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) if (containsGeometry(geometries[i], point)) return true;
    return false;
  }
};

function containsGeometry(geometry, point) {
  return geometry && containsGeometryType.hasOwnProperty(geometry.type)
      ? containsGeometryType[geometry.type](geometry, point)
      : false;
}

function containsPoint(coordinates, point) {
  return Object(_distance__WEBPACK_IMPORTED_MODULE_1__["default"])(coordinates, point) === 0;
}

function containsLine(coordinates, point) {
  var ao, bo, ab;
  for (var i = 0, n = coordinates.length; i < n; i++) {
    bo = Object(_distance__WEBPACK_IMPORTED_MODULE_1__["default"])(coordinates[i], point);
    if (bo === 0) return true;
    if (i > 0) {
      ab = Object(_distance__WEBPACK_IMPORTED_MODULE_1__["default"])(coordinates[i], coordinates[i - 1]);
      if (
        ab > 0 &&
        ao <= ab &&
        bo <= ab &&
        (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < _math__WEBPACK_IMPORTED_MODULE_2__["epsilon2"] * ab
      )
        return true;
    }
    ao = bo;
  }
  return false;
}

function containsPolygon(coordinates, point) {
  return !!Object(_polygonContains__WEBPACK_IMPORTED_MODULE_0__["default"])(coordinates.map(ringRadians), pointRadians(point));
}

function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}

function pointRadians(point) {
  return [point[0] * _math__WEBPACK_IMPORTED_MODULE_2__["radians"], point[1] * _math__WEBPACK_IMPORTED_MODULE_2__["radians"]];
}

/* harmony default export */ __webpack_exports__["default"] = (function(object, point) {
  return (object && containsObjectType.hasOwnProperty(object.type)
      ? containsObjectType[object.type]
      : containsGeometry)(object, point);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/distance.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/distance.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _length__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./length */ "./node_modules/d3-geo/src/length.js");


var coordinates = [null, null],
    object = {type: "LineString", coordinates: coordinates};

/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return Object(_length__WEBPACK_IMPORTED_MODULE_0__["default"])(object);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/graticule.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/graticule.js ***!
  \**********************************************/
/*! exports provided: default, graticule10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return graticule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graticule10", function() { return graticule10; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");



function graticuleX(y0, y1, dy) {
  var y = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(y0, y1 - _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"], dy).concat(y1);
  return function(x) { return y.map(function(y) { return [x, y]; }); };
}

function graticuleY(x0, x1, dx) {
  var x = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(x0, x1 - _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"], dx).concat(x1);
  return function(y) { return x.map(function(x) { return [x, y]; }); };
}

function graticule() {
  var x1, x0, X1, X0,
      y1, y0, Y1, Y0,
      dx = 10, dy = dx, DX = 90, DY = 360,
      x, y, X, Y,
      precision = 2.5;

  function graticule() {
    return {type: "MultiLineString", coordinates: lines()};
  }

  function lines() {
    return Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(Object(_math__WEBPACK_IMPORTED_MODULE_1__["ceil"])(X0 / DX) * DX, X1, DX).map(X)
        .concat(Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(Object(_math__WEBPACK_IMPORTED_MODULE_1__["ceil"])(Y0 / DY) * DY, Y1, DY).map(Y))
        .concat(Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(Object(_math__WEBPACK_IMPORTED_MODULE_1__["ceil"])(x0 / dx) * dx, x1, dx).filter(function(x) { return Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(x % DX) > _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]; }).map(x))
        .concat(Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(Object(_math__WEBPACK_IMPORTED_MODULE_1__["ceil"])(y0 / dy) * dy, y1, dy).filter(function(y) { return Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(y % DY) > _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]; }).map(y));
  }

  graticule.lines = function() {
    return lines().map(function(coordinates) { return {type: "LineString", coordinates: coordinates}; });
  };

  graticule.outline = function() {
    return {
      type: "Polygon",
      coordinates: [
        X(X0).concat(
        Y(Y1).slice(1),
        X(X1).reverse().slice(1),
        Y(Y0).reverse().slice(1))
      ]
    };
  };

  graticule.extent = function(_) {
    if (!arguments.length) return graticule.extentMinor();
    return graticule.extentMajor(_).extentMinor(_);
  };

  graticule.extentMajor = function(_) {
    if (!arguments.length) return [[X0, Y0], [X1, Y1]];
    X0 = +_[0][0], X1 = +_[1][0];
    Y0 = +_[0][1], Y1 = +_[1][1];
    if (X0 > X1) _ = X0, X0 = X1, X1 = _;
    if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
    return graticule.precision(precision);
  };

  graticule.extentMinor = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    x0 = +_[0][0], x1 = +_[1][0];
    y0 = +_[0][1], y1 = +_[1][1];
    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
    return graticule.precision(precision);
  };

  graticule.step = function(_) {
    if (!arguments.length) return graticule.stepMinor();
    return graticule.stepMajor(_).stepMinor(_);
  };

  graticule.stepMajor = function(_) {
    if (!arguments.length) return [DX, DY];
    DX = +_[0], DY = +_[1];
    return graticule;
  };

  graticule.stepMinor = function(_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule;
  };

  graticule.precision = function(_) {
    if (!arguments.length) return precision;
    precision = +_;
    x = graticuleX(y0, y1, 90);
    y = graticuleY(x0, x1, precision);
    X = graticuleX(Y0, Y1, 90);
    Y = graticuleY(X0, X1, precision);
    return graticule;
  };

  return graticule
      .extentMajor([[-180, -90 + _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]], [180, 90 - _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]]])
      .extentMinor([[-180, -80 - _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]], [180, 80 + _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"]]]);
}

function graticule10() {
  return graticule()();
}


/***/ }),

/***/ "./node_modules/d3-geo/src/identity.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/identity.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return x;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/d3-geo/src/index.js ***!
  \******************************************/
/*! exports provided: geoArea, geoBounds, geoCentroid, geoCircle, geoClipAntimeridian, geoClipCircle, geoClipExtent, geoClipRectangle, geoContains, geoDistance, geoGraticule, geoGraticule10, geoInterpolate, geoLength, geoPath, geoAlbers, geoAlbersUsa, geoAzimuthalEqualArea, geoAzimuthalEqualAreaRaw, geoAzimuthalEquidistant, geoAzimuthalEquidistantRaw, geoConicConformal, geoConicConformalRaw, geoConicEqualArea, geoConicEqualAreaRaw, geoConicEquidistant, geoConicEquidistantRaw, geoEqualEarth, geoEqualEarthRaw, geoEquirectangular, geoEquirectangularRaw, geoGnomonic, geoGnomonicRaw, geoIdentity, geoProjection, geoProjectionMutator, geoMercator, geoMercatorRaw, geoNaturalEarth1, geoNaturalEarth1Raw, geoOrthographic, geoOrthographicRaw, geoStereographic, geoStereographicRaw, geoTransverseMercator, geoTransverseMercatorRaw, geoRotation, geoStream, geoTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./area */ "./node_modules/d3-geo/src/area.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoArea", function() { return _area__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bounds */ "./node_modules/d3-geo/src/bounds.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoBounds", function() { return _bounds__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _centroid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./centroid */ "./node_modules/d3-geo/src/centroid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoCentroid", function() { return _centroid__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./circle */ "./node_modules/d3-geo/src/circle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoCircle", function() { return _circle__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _clip_antimeridian__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clip/antimeridian */ "./node_modules/d3-geo/src/clip/antimeridian.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipAntimeridian", function() { return _clip_antimeridian__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _clip_circle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clip/circle */ "./node_modules/d3-geo/src/clip/circle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipCircle", function() { return _clip_circle__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _clip_extent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./clip/extent */ "./node_modules/d3-geo/src/clip/extent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipExtent", function() { return _clip_extent__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _clip_rectangle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clip/rectangle */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipRectangle", function() { return _clip_rectangle__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _contains__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contains */ "./node_modules/d3-geo/src/contains.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoContains", function() { return _contains__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _distance__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./distance */ "./node_modules/d3-geo/src/distance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoDistance", function() { return _distance__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _graticule__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./graticule */ "./node_modules/d3-geo/src/graticule.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGraticule", function() { return _graticule__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGraticule10", function() { return _graticule__WEBPACK_IMPORTED_MODULE_10__["graticule10"]; });

/* harmony import */ var _interpolate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./interpolate */ "./node_modules/d3-geo/src/interpolate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoInterpolate", function() { return _interpolate__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _length__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./length */ "./node_modules/d3-geo/src/length.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoLength", function() { return _length__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _path_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./path/index */ "./node_modules/d3-geo/src/path/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoPath", function() { return _path_index__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _projection_albers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./projection/albers */ "./node_modules/d3-geo/src/projection/albers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAlbers", function() { return _projection_albers__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _projection_albersUsa__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./projection/albersUsa */ "./node_modules/d3-geo/src/projection/albersUsa.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAlbersUsa", function() { return _projection_albersUsa__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _projection_azimuthalEqualArea__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./projection/azimuthalEqualArea */ "./node_modules/d3-geo/src/projection/azimuthalEqualArea.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEqualArea", function() { return _projection_azimuthalEqualArea__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEqualAreaRaw", function() { return _projection_azimuthalEqualArea__WEBPACK_IMPORTED_MODULE_16__["azimuthalEqualAreaRaw"]; });

/* harmony import */ var _projection_azimuthalEquidistant__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./projection/azimuthalEquidistant */ "./node_modules/d3-geo/src/projection/azimuthalEquidistant.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEquidistant", function() { return _projection_azimuthalEquidistant__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEquidistantRaw", function() { return _projection_azimuthalEquidistant__WEBPACK_IMPORTED_MODULE_17__["azimuthalEquidistantRaw"]; });

/* harmony import */ var _projection_conicConformal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./projection/conicConformal */ "./node_modules/d3-geo/src/projection/conicConformal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicConformal", function() { return _projection_conicConformal__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicConformalRaw", function() { return _projection_conicConformal__WEBPACK_IMPORTED_MODULE_18__["conicConformalRaw"]; });

/* harmony import */ var _projection_conicEqualArea__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./projection/conicEqualArea */ "./node_modules/d3-geo/src/projection/conicEqualArea.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEqualArea", function() { return _projection_conicEqualArea__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEqualAreaRaw", function() { return _projection_conicEqualArea__WEBPACK_IMPORTED_MODULE_19__["conicEqualAreaRaw"]; });

/* harmony import */ var _projection_conicEquidistant__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./projection/conicEquidistant */ "./node_modules/d3-geo/src/projection/conicEquidistant.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEquidistant", function() { return _projection_conicEquidistant__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEquidistantRaw", function() { return _projection_conicEquidistant__WEBPACK_IMPORTED_MODULE_20__["conicEquidistantRaw"]; });

/* harmony import */ var _projection_equalEarth__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./projection/equalEarth */ "./node_modules/d3-geo/src/projection/equalEarth.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEqualEarth", function() { return _projection_equalEarth__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEqualEarthRaw", function() { return _projection_equalEarth__WEBPACK_IMPORTED_MODULE_21__["equalEarthRaw"]; });

/* harmony import */ var _projection_equirectangular__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./projection/equirectangular */ "./node_modules/d3-geo/src/projection/equirectangular.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEquirectangular", function() { return _projection_equirectangular__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEquirectangularRaw", function() { return _projection_equirectangular__WEBPACK_IMPORTED_MODULE_22__["equirectangularRaw"]; });

/* harmony import */ var _projection_gnomonic__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./projection/gnomonic */ "./node_modules/d3-geo/src/projection/gnomonic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGnomonic", function() { return _projection_gnomonic__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGnomonicRaw", function() { return _projection_gnomonic__WEBPACK_IMPORTED_MODULE_23__["gnomonicRaw"]; });

/* harmony import */ var _projection_identity__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./projection/identity */ "./node_modules/d3-geo/src/projection/identity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoIdentity", function() { return _projection_identity__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _projection_index__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./projection/index */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoProjection", function() { return _projection_index__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoProjectionMutator", function() { return _projection_index__WEBPACK_IMPORTED_MODULE_25__["projectionMutator"]; });

/* harmony import */ var _projection_mercator__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./projection/mercator */ "./node_modules/d3-geo/src/projection/mercator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoMercator", function() { return _projection_mercator__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoMercatorRaw", function() { return _projection_mercator__WEBPACK_IMPORTED_MODULE_26__["mercatorRaw"]; });

/* harmony import */ var _projection_naturalEarth1__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./projection/naturalEarth1 */ "./node_modules/d3-geo/src/projection/naturalEarth1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoNaturalEarth1", function() { return _projection_naturalEarth1__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoNaturalEarth1Raw", function() { return _projection_naturalEarth1__WEBPACK_IMPORTED_MODULE_27__["naturalEarth1Raw"]; });

/* harmony import */ var _projection_orthographic__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./projection/orthographic */ "./node_modules/d3-geo/src/projection/orthographic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoOrthographic", function() { return _projection_orthographic__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoOrthographicRaw", function() { return _projection_orthographic__WEBPACK_IMPORTED_MODULE_28__["orthographicRaw"]; });

/* harmony import */ var _projection_stereographic__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./projection/stereographic */ "./node_modules/d3-geo/src/projection/stereographic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoStereographic", function() { return _projection_stereographic__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoStereographicRaw", function() { return _projection_stereographic__WEBPACK_IMPORTED_MODULE_29__["stereographicRaw"]; });

/* harmony import */ var _projection_transverseMercator__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./projection/transverseMercator */ "./node_modules/d3-geo/src/projection/transverseMercator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoTransverseMercator", function() { return _projection_transverseMercator__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoTransverseMercatorRaw", function() { return _projection_transverseMercator__WEBPACK_IMPORTED_MODULE_30__["transverseMercatorRaw"]; });

/* harmony import */ var _rotation__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./rotation */ "./node_modules/d3-geo/src/rotation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoRotation", function() { return _rotation__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _stream__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./stream */ "./node_modules/d3-geo/src/stream.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoStream", function() { return _stream__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./transform */ "./node_modules/d3-geo/src/transform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoTransform", function() { return _transform__WEBPACK_IMPORTED_MODULE_33__["default"]; });







 // DEPRECATED! Use d3.geoIdentity().clipExtent(…).





























/***/ }),

/***/ "./node_modules/d3-geo/src/interpolate.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/interpolate.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var x0 = a[0] * _math__WEBPACK_IMPORTED_MODULE_0__["radians"],
      y0 = a[1] * _math__WEBPACK_IMPORTED_MODULE_0__["radians"],
      x1 = b[0] * _math__WEBPACK_IMPORTED_MODULE_0__["radians"],
      y1 = b[1] * _math__WEBPACK_IMPORTED_MODULE_0__["radians"],
      cy0 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y0),
      sy0 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y0),
      cy1 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y1),
      sy1 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y1),
      kx0 = cy0 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(x0),
      ky0 = cy0 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(x0),
      kx1 = cy1 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(x1),
      ky1 = cy1 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(x1),
      d = 2 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["asin"])(Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(Object(_math__WEBPACK_IMPORTED_MODULE_0__["haversin"])(y1 - y0) + cy0 * cy1 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["haversin"])(x1 - x0))),
      k = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(d);

  var interpolate = d ? function(t) {
    var B = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(t *= d) / k,
        A = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(d - t) / k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan2"])(y, x) * _math__WEBPACK_IMPORTED_MODULE_0__["degrees"],
      Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan2"])(z, Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(x * x + y * y)) * _math__WEBPACK_IMPORTED_MODULE_0__["degrees"]
    ];
  } : function() {
    return [x0 * _math__WEBPACK_IMPORTED_MODULE_0__["degrees"], y0 * _math__WEBPACK_IMPORTED_MODULE_0__["degrees"]];
  };

  interpolate.distance = d;

  return interpolate;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/length.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/length.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adder */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./noop */ "./node_modules/d3-geo/src/noop.js");
/* harmony import */ var _stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stream */ "./node_modules/d3-geo/src/stream.js");





var lengthSum = Object(_adder__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    lambda0,
    sinPhi0,
    cosPhi0;

var lengthStream = {
  sphere: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  point: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineStart: lengthLineStart,
  lineEnd: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  polygonStart: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  polygonEnd: _noop__WEBPACK_IMPORTED_MODULE_2__["default"]
};

function lengthLineStart() {
  lengthStream.point = lengthPointFirst;
  lengthStream.lineEnd = lengthLineEnd;
}

function lengthLineEnd() {
  lengthStream.point = lengthStream.lineEnd = _noop__WEBPACK_IMPORTED_MODULE_2__["default"];
}

function lengthPointFirst(lambda, phi) {
  lambda *= _math__WEBPACK_IMPORTED_MODULE_1__["radians"], phi *= _math__WEBPACK_IMPORTED_MODULE_1__["radians"];
  lambda0 = lambda, sinPhi0 = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi), cosPhi0 = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi);
  lengthStream.point = lengthPoint;
}

function lengthPoint(lambda, phi) {
  lambda *= _math__WEBPACK_IMPORTED_MODULE_1__["radians"], phi *= _math__WEBPACK_IMPORTED_MODULE_1__["radians"];
  var sinPhi = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi),
      cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi),
      delta = Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda - lambda0),
      cosDelta = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(delta),
      sinDelta = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(delta),
      x = cosPhi * sinDelta,
      y = cosPhi0 * sinPhi - sinPhi0 * cosPhi * cosDelta,
      z = sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosDelta;
  lengthSum.add(Object(_math__WEBPACK_IMPORTED_MODULE_1__["atan2"])(Object(_math__WEBPACK_IMPORTED_MODULE_1__["sqrt"])(x * x + y * y), z));
  lambda0 = lambda, sinPhi0 = sinPhi, cosPhi0 = cosPhi;
}

/* harmony default export */ __webpack_exports__["default"] = (function(object) {
  lengthSum.reset();
  Object(_stream__WEBPACK_IMPORTED_MODULE_3__["default"])(object, lengthStream);
  return +lengthSum;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/math.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/math.js ***!
  \*****************************************/
/*! exports provided: epsilon, epsilon2, pi, halfPi, quarterPi, tau, degrees, radians, abs, atan, atan2, cos, ceil, exp, floor, log, pow, sin, sign, sqrt, tan, acos, asin, haversin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "epsilon", function() { return epsilon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "epsilon2", function() { return epsilon2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pi", function() { return pi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "halfPi", function() { return halfPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quarterPi", function() { return quarterPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tau", function() { return tau; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degrees", function() { return degrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radians", function() { return radians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atan", function() { return atan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atan2", function() { return atan2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cos", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exp", function() { return exp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pow", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sin", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sign", function() { return sign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrt", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tan", function() { return tan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acos", function() { return acos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asin", function() { return asin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "haversin", function() { return haversin; });
var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;

var degrees = 180 / pi;
var radians = pi / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;
var floor = Math.floor;
var log = Math.log;
var pow = Math.pow;
var sin = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;
var tan = Math.tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function haversin(x) {
  return (x = sin(x / 2)) * x;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/noop.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/noop.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return noop; });
function noop() {}


/***/ }),

/***/ "./node_modules/d3-geo/src/path/area.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/path/area.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adder */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../noop */ "./node_modules/d3-geo/src/noop.js");




var areaSum = Object(_adder__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    areaRingSum = Object(_adder__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    x00,
    y00,
    x0,
    y0;

var areaStream = {
  point: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineStart: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineEnd: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = _noop__WEBPACK_IMPORTED_MODULE_2__["default"];
    areaSum.add(Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(areaRingSum));
    areaRingSum.reset();
  },
  result: function() {
    var area = areaSum / 2;
    areaSum.reset();
    return area;
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function areaPoint(x, y) {
  areaRingSum.add(y0 * x - x0 * y);
  x0 = x, y0 = y;
}

function areaRingEnd() {
  areaPoint(x00, y00);
}

/* harmony default export */ __webpack_exports__["default"] = (areaStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/bounds.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/bounds.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop */ "./node_modules/d3-geo/src/noop.js");


var x0 = Infinity,
    y0 = x0,
    x1 = -x0,
    y1 = x1;

var boundsStream = {
  point: boundsPoint,
  lineStart: _noop__WEBPACK_IMPORTED_MODULE_0__["default"],
  lineEnd: _noop__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonStart: _noop__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonEnd: _noop__WEBPACK_IMPORTED_MODULE_0__["default"],
  result: function() {
    var bounds = [[x0, y0], [x1, y1]];
    x1 = y1 = -(y0 = x0 = Infinity);
    return bounds;
  }
};

function boundsPoint(x, y) {
  if (x < x0) x0 = x;
  if (x > x1) x1 = x;
  if (y < y0) y0 = y;
  if (y > y1) y1 = y;
}

/* harmony default export */ __webpack_exports__["default"] = (boundsStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/centroid.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-geo/src/path/centroid.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");


// TODO Enforce positive area for exterior, negative area for interior?

var X0 = 0,
    Y0 = 0,
    Z0 = 0,
    X1 = 0,
    Y1 = 0,
    Z1 = 0,
    X2 = 0,
    Y2 = 0,
    Z2 = 0,
    x00,
    y00,
    x0,
    y0;

var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2]
        : Z1 ? [X1 / Z1, Y1 / Z1]
        : Z0 ? [X0 / Z0, Y0 / Z0]
        : [NaN, NaN];
    X0 = Y0 = Z0 =
    X1 = Y1 = Z1 =
    X2 = Y2 = Z2 = 0;
    return centroid;
  }
};

function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}

function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0 = x, y0 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0, dy = y - y0, z = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(dx * dx + dy * dy);
  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;
  centroidPoint(x0 = x, y0 = y);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}

function centroidRingEnd() {
  centroidPointRing(x00, y00);
}

function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00 = x0 = x, y00 = y0 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0,
      dy = y - y0,
      z = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(dx * dx + dy * dy);

  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;

  z = y0 * x - x0 * y;
  X2 += z * (x0 + x);
  Y2 += z * (y0 + y);
  Z2 += z * 3;
  centroidPoint(x0 = x, y0 = y);
}

/* harmony default export */ __webpack_exports__["default"] = (centroidStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/context.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/context.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PathContext; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop */ "./node_modules/d3-geo/src/noop.js");



function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, _math__WEBPACK_IMPORTED_MODULE_0__["tau"]);
        break;
      }
    }
  },
  result: _noop__WEBPACK_IMPORTED_MODULE_1__["default"]
};


/***/ }),

/***/ "./node_modules/d3-geo/src/path/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/path/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../identity */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _stream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _area__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./area */ "./node_modules/d3-geo/src/path/area.js");
/* harmony import */ var _bounds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bounds */ "./node_modules/d3-geo/src/path/bounds.js");
/* harmony import */ var _centroid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./centroid */ "./node_modules/d3-geo/src/path/centroid.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context */ "./node_modules/d3-geo/src/path/context.js");
/* harmony import */ var _measure__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./measure */ "./node_modules/d3-geo/src/path/measure.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./string */ "./node_modules/d3-geo/src/path/string.js");









/* harmony default export */ __webpack_exports__["default"] = (function(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      Object(_stream__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    Object(_stream__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(_area__WEBPACK_IMPORTED_MODULE_2__["default"]));
    return _area__WEBPACK_IMPORTED_MODULE_2__["default"].result();
  };

  path.measure = function(object) {
    Object(_stream__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(_measure__WEBPACK_IMPORTED_MODULE_6__["default"]));
    return _measure__WEBPACK_IMPORTED_MODULE_6__["default"].result();
  };

  path.bounds = function(object) {
    Object(_stream__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(_bounds__WEBPACK_IMPORTED_MODULE_3__["default"]));
    return _bounds__WEBPACK_IMPORTED_MODULE_3__["default"].result();
  };

  path.centroid = function(object) {
    Object(_stream__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(_centroid__WEBPACK_IMPORTED_MODULE_4__["default"]));
    return _centroid__WEBPACK_IMPORTED_MODULE_4__["default"].result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, _identity__WEBPACK_IMPORTED_MODULE_0__["default"]) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new _string__WEBPACK_IMPORTED_MODULE_7__["default"]) : new _context__WEBPACK_IMPORTED_MODULE_5__["default"](context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/path/measure.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/measure.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adder */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../noop */ "./node_modules/d3-geo/src/noop.js");




var lengthSum = Object(_adder__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    lengthRing,
    x00,
    y00,
    x0,
    y0;

var lengthStream = {
  point: _noop__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x00, y00);
    lengthStream.point = _noop__WEBPACK_IMPORTED_MODULE_2__["default"];
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum.reset();
    return length;
  }
};

function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function lengthPoint(x, y) {
  x0 -= x, y0 -= y;
  lengthSum.add(Object(_math__WEBPACK_IMPORTED_MODULE_1__["sqrt"])(x0 * x0 + y0 * y0));
  x0 = x, y0 = y;
}

/* harmony default export */ __webpack_exports__["default"] = (lengthStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/string.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/string.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PathString; });
function PathString() {
  this._string = [];
}

PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}


/***/ }),

/***/ "./node_modules/d3-geo/src/pointEqual.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/pointEqual.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(a[0] - b[0]) < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"] && Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(a[1] - b[1]) < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"];
});


/***/ }),

/***/ "./node_modules/d3-geo/src/polygonContains.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-geo/src/polygonContains.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adder */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _cartesian__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cartesian */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");




var sum = Object(_adder__WEBPACK_IMPORTED_MODULE_0__["default"])();

function longitude(point) {
  if (Object(_math__WEBPACK_IMPORTED_MODULE_2__["abs"])(point[0]) <= _math__WEBPACK_IMPORTED_MODULE_2__["pi"])
    return point[0];
  else
    return Object(_math__WEBPACK_IMPORTED_MODULE_2__["sign"])(point[0]) * ((Object(_math__WEBPACK_IMPORTED_MODULE_2__["abs"])(point[0]) + _math__WEBPACK_IMPORTED_MODULE_2__["pi"]) % _math__WEBPACK_IMPORTED_MODULE_2__["tau"] - _math__WEBPACK_IMPORTED_MODULE_2__["pi"]);
}

/* harmony default export */ __webpack_exports__["default"] = (function(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = Object(_math__WEBPACK_IMPORTED_MODULE_2__["sin"])(phi),
      normal = [Object(_math__WEBPACK_IMPORTED_MODULE_2__["sin"])(lambda), -Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(lambda), 0],
      angle = 0,
      winding = 0;

  sum.reset();

  if (sinPhi === 1) phi = _math__WEBPACK_IMPORTED_MODULE_2__["halfPi"] + _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"];
  else if (sinPhi === -1) phi = -_math__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"];

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + _math__WEBPACK_IMPORTED_MODULE_2__["quarterPi"],
        sinPhi0 = Object(_math__WEBPACK_IMPORTED_MODULE_2__["sin"])(phi0),
        cosPhi0 = Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + _math__WEBPACK_IMPORTED_MODULE_2__["quarterPi"],
          sinPhi1 = Object(_math__WEBPACK_IMPORTED_MODULE_2__["sin"])(phi1),
          cosPhi1 = Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > _math__WEBPACK_IMPORTED_MODULE_2__["pi"],
          k = sinPhi0 * sinPhi1;

      sum.add(Object(_math__WEBPACK_IMPORTED_MODULE_2__["atan2"])(k * sign * Object(_math__WEBPACK_IMPORTED_MODULE_2__["sin"])(absDelta), cosPhi0 * cosPhi1 + k * Object(_math__WEBPACK_IMPORTED_MODULE_2__["cos"])(absDelta)));
      angle += antimeridian ? delta + sign * _math__WEBPACK_IMPORTED_MODULE_2__["tau"] : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = Object(_cartesian__WEBPACK_IMPORTED_MODULE_1__["cartesianCross"])(Object(_cartesian__WEBPACK_IMPORTED_MODULE_1__["cartesian"])(point0), Object(_cartesian__WEBPACK_IMPORTED_MODULE_1__["cartesian"])(point1));
        Object(_cartesian__WEBPACK_IMPORTED_MODULE_1__["cartesianNormalizeInPlace"])(arc);
        var intersection = Object(_cartesian__WEBPACK_IMPORTED_MODULE_1__["cartesianCross"])(normal, arc);
        Object(_cartesian__WEBPACK_IMPORTED_MODULE_1__["cartesianNormalizeInPlace"])(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * Object(_math__WEBPACK_IMPORTED_MODULE_2__["asin"])(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -_math__WEBPACK_IMPORTED_MODULE_2__["epsilon"] || angle < _math__WEBPACK_IMPORTED_MODULE_2__["epsilon"] && sum < -_math__WEBPACK_IMPORTED_MODULE_2__["epsilon"]) ^ (winding & 1);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/albers.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/albers.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _conicEqualArea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conicEqualArea */ "./node_modules/d3-geo/src/projection/conicEqualArea.js");


/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_conicEqualArea__WEBPACK_IMPORTED_MODULE_0__["default"])()
      .parallels([29.5, 45.5])
      .scale(1070)
      .translate([480, 250])
      .rotate([96, 0])
      .center([-0.6, 38.7]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/albersUsa.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/albersUsa.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _albers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./albers */ "./node_modules/d3-geo/src/projection/albers.js");
/* harmony import */ var _conicEqualArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conicEqualArea */ "./node_modules/d3-geo/src/projection/conicEqualArea.js");
/* harmony import */ var _fit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fit */ "./node_modules/d3-geo/src/projection/fit.js");





// The projections must have mutually exclusive clip regions on the sphere,
// as this will avoid emitting interleaving lines and polygons.
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
    sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
    lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
    lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
    polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
    polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
  };
}

// A composite projection for the United States, configured by default for
// 960×500. The projection also works quite well at 960×600 if you change the
// scale to 1285 and adjust the translate accordingly. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
/* harmony default export */ __webpack_exports__["default"] = (function() {
  var cache,
      cacheStream,
      lower48 = Object(_albers__WEBPACK_IMPORTED_MODULE_1__["default"])(), lower48Point,
      alaska = Object(_conicEqualArea__WEBPACK_IMPORTED_MODULE_2__["default"])().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
      hawaii = Object(_conicEqualArea__WEBPACK_IMPORTED_MODULE_2__["default"])().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
      point, pointStream = {point: function(x, y) { point = [x, y]; }};

  function albersUsa(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    return point = null,
        (lower48Point.point(x, y), point)
        || (alaskaPoint.point(x, y), point)
        || (hawaiiPoint.point(x, y), point);
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
        : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
        : lower48).invert(coordinates);
  };

  albersUsa.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };

  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
    return reset();
  };

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x = +_[0], y = +_[1];

    lower48Point = lower48
        .translate(_)
        .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
        .stream(pointStream);

    alaskaPoint = alaska
        .translate([x - 0.307 * k, y + 0.201 * k])
        .clipExtent([[x - 0.425 * k + _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"], y + 0.120 * k + _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]], [x - 0.214 * k - _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"], y + 0.234 * k - _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]]])
        .stream(pointStream);

    hawaiiPoint = hawaii
        .translate([x - 0.205 * k, y + 0.212 * k])
        .clipExtent([[x - 0.214 * k + _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"], y + 0.166 * k + _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]], [x - 0.115 * k - _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"], y + 0.234 * k - _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]]])
        .stream(pointStream);

    return reset();
  };

  albersUsa.fitExtent = function(extent, object) {
    return Object(_fit__WEBPACK_IMPORTED_MODULE_3__["fitExtent"])(albersUsa, extent, object);
  };

  albersUsa.fitSize = function(size, object) {
    return Object(_fit__WEBPACK_IMPORTED_MODULE_3__["fitSize"])(albersUsa, size, object);
  };

  albersUsa.fitWidth = function(width, object) {
    return Object(_fit__WEBPACK_IMPORTED_MODULE_3__["fitWidth"])(albersUsa, width, object);
  };

  albersUsa.fitHeight = function(height, object) {
    return Object(_fit__WEBPACK_IMPORTED_MODULE_3__["fitHeight"])(albersUsa, height, object);
  };

  function reset() {
    cache = cacheStream = null;
    return albersUsa;
  }

  return albersUsa.scale(1070);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/azimuthal.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/azimuthal.js ***!
  \*********************************************************/
/*! exports provided: azimuthalRaw, azimuthalInvert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azimuthalRaw", function() { return azimuthalRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azimuthalInvert", function() { return azimuthalInvert; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");


function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(x),
        cy = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y),
        k = scale(cx * cy);
    return [
      k * cy * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(x),
      k * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(x * x + y * y),
        c = angle(z),
        sc = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(c),
        cc = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(c);
    return [
      Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan2"])(x * sc, z * cc),
      Object(_math__WEBPACK_IMPORTED_MODULE_0__["asin"])(z && y * sc / z)
    ];
  }
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/azimuthalEqualArea.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/azimuthalEqualArea.js ***!
  \******************************************************************/
/*! exports provided: azimuthalEqualAreaRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azimuthalEqualAreaRaw", function() { return azimuthalEqualAreaRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/projection/index.js");




var azimuthalEqualAreaRaw = Object(_azimuthal__WEBPACK_IMPORTED_MODULE_1__["azimuthalRaw"])(function(cxcy) {
  return Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = Object(_azimuthal__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(function(z) {
  return 2 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["asin"])(z / 2);
});

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index__WEBPACK_IMPORTED_MODULE_2__["default"])(azimuthalEqualAreaRaw)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/azimuthalEquidistant.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/azimuthalEquidistant.js ***!
  \********************************************************************/
/*! exports provided: azimuthalEquidistantRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azimuthalEquidistantRaw", function() { return azimuthalEquidistantRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/projection/index.js");




var azimuthalEquidistantRaw = Object(_azimuthal__WEBPACK_IMPORTED_MODULE_1__["azimuthalRaw"])(function(c) {
  return (c = Object(_math__WEBPACK_IMPORTED_MODULE_0__["acos"])(c)) && c / Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(c);
});

azimuthalEquidistantRaw.invert = Object(_azimuthal__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(function(z) {
  return z;
});

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index__WEBPACK_IMPORTED_MODULE_2__["default"])(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conic.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conic.js ***!
  \*****************************************************/
/*! exports provided: conicProjection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conicProjection", function() { return conicProjection; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/projection/index.js");



function conicProjection(projectAt) {
  var phi0 = 0,
      phi1 = _math__WEBPACK_IMPORTED_MODULE_0__["pi"] / 3,
      m = Object(_index__WEBPACK_IMPORTED_MODULE_1__["projectionMutator"])(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    return arguments.length ? m(phi0 = _[0] * _math__WEBPACK_IMPORTED_MODULE_0__["radians"], phi1 = _[1] * _math__WEBPACK_IMPORTED_MODULE_0__["radians"]) : [phi0 * _math__WEBPACK_IMPORTED_MODULE_0__["degrees"], phi1 * _math__WEBPACK_IMPORTED_MODULE_0__["degrees"]];
  };

  return p;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conicConformal.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conicConformal.js ***!
  \**************************************************************/
/*! exports provided: conicConformalRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conicConformalRaw", function() { return conicConformalRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _conic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conic */ "./node_modules/d3-geo/src/projection/conic.js");
/* harmony import */ var _mercator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mercator */ "./node_modules/d3-geo/src/projection/mercator.js");




function tany(y) {
  return Object(_math__WEBPACK_IMPORTED_MODULE_0__["tan"])((_math__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + y) / 2);
}

function conicConformalRaw(y0, y1) {
  var cy0 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y0),
      n = y0 === y1 ? Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y0) : Object(_math__WEBPACK_IMPORTED_MODULE_0__["log"])(cy0 / Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y1)) / Object(_math__WEBPACK_IMPORTED_MODULE_0__["log"])(tany(y1) / tany(y0)),
      f = cy0 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["pow"])(tany(y0), n) / n;

  if (!n) return _mercator__WEBPACK_IMPORTED_MODULE_2__["mercatorRaw"];

  function project(x, y) {
    if (f > 0) { if (y < -_math__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) y = -_math__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]; }
    else { if (y > _math__WEBPACK_IMPORTED_MODULE_0__["halfPi"] - _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) y = _math__WEBPACK_IMPORTED_MODULE_0__["halfPi"] - _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]; }
    var r = f / Object(_math__WEBPACK_IMPORTED_MODULE_0__["pow"])(tany(y), n);
    return [r * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(n * x), f - r * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(n * x)];
  }

  project.invert = function(x, y) {
    var fy = f - y, r = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sign"])(n) * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(x * x + fy * fy);
    return [Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan2"])(x, Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(fy)) / n * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sign"])(fy), 2 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan"])(Object(_math__WEBPACK_IMPORTED_MODULE_0__["pow"])(f / r, 1 / n)) - _math__WEBPACK_IMPORTED_MODULE_0__["halfPi"]];
  };

  return project;
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_conic__WEBPACK_IMPORTED_MODULE_1__["conicProjection"])(conicConformalRaw)
      .scale(109.5)
      .parallels([30, 30]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conicEqualArea.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conicEqualArea.js ***!
  \**************************************************************/
/*! exports provided: conicEqualAreaRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conicEqualAreaRaw", function() { return conicEqualAreaRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _conic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conic */ "./node_modules/d3-geo/src/projection/conic.js");
/* harmony import */ var _cylindricalEqualArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cylindricalEqualArea */ "./node_modules/d3-geo/src/projection/cylindricalEqualArea.js");




function conicEqualAreaRaw(y0, y1) {
  var sy0 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y0), n = (sy0 + Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y1)) / 2;

  // Are the parallels symmetrical around the Equator?
  if (Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(n) < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) return Object(_cylindricalEqualArea__WEBPACK_IMPORTED_MODULE_2__["cylindricalEqualAreaRaw"])(y0);

  var c = 1 + sy0 * (2 * n - sy0), r0 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(c) / n;

  function project(x, y) {
    var r = Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(c - 2 * n * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y)) / n;
    return [r * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(x *= n), r0 - r * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(x)];
  }

  project.invert = function(x, y) {
    var r0y = r0 - y;
    return [Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan2"])(x, Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(r0y)) / n * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sign"])(r0y), Object(_math__WEBPACK_IMPORTED_MODULE_0__["asin"])((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_conic__WEBPACK_IMPORTED_MODULE_1__["conicProjection"])(conicEqualAreaRaw)
      .scale(155.424)
      .center([0, 33.6442]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conicEquidistant.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conicEquidistant.js ***!
  \****************************************************************/
/*! exports provided: conicEquidistantRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conicEquidistantRaw", function() { return conicEquidistantRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _conic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conic */ "./node_modules/d3-geo/src/projection/conic.js");
/* harmony import */ var _equirectangular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equirectangular */ "./node_modules/d3-geo/src/projection/equirectangular.js");




function conicEquidistantRaw(y0, y1) {
  var cy0 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y0),
      n = y0 === y1 ? Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y0) : (cy0 - Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y1)) / (y1 - y0),
      g = cy0 / n + y0;

  if (Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(n) < _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) return _equirectangular__WEBPACK_IMPORTED_MODULE_2__["equirectangularRaw"];

  function project(x, y) {
    var gy = g - y, nx = n * x;
    return [gy * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(nx), g - gy * Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(nx)];
  }

  project.invert = function(x, y) {
    var gy = g - y;
    return [Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan2"])(x, Object(_math__WEBPACK_IMPORTED_MODULE_0__["abs"])(gy)) / n * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sign"])(gy), g - Object(_math__WEBPACK_IMPORTED_MODULE_0__["sign"])(n) * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(x * x + gy * gy)];
  };

  return project;
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_conic__WEBPACK_IMPORTED_MODULE_1__["conicProjection"])(conicEquidistantRaw)
      .scale(131.154)
      .center([0, 13.9389]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/cylindricalEqualArea.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/cylindricalEqualArea.js ***!
  \********************************************************************/
/*! exports provided: cylindricalEqualAreaRaw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cylindricalEqualAreaRaw", function() { return cylindricalEqualAreaRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");


function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, Object(_math__WEBPACK_IMPORTED_MODULE_0__["asin"])(y * cosPhi0)];
  };

  return forward;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/equalEarth.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/equalEarth.js ***!
  \**********************************************************/
/*! exports provided: equalEarthRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalEarthRaw", function() { return equalEarthRaw; });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



var A1 = 1.340264,
    A2 = -0.081106,
    A3 = 0.000893,
    A4 = 0.003796,
    M = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sqrt"])(3) / 2,
    iterations = 12;

function equalEarthRaw(lambda, phi) {
  var l = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["asin"])(M * Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi)), l2 = l * l, l6 = l2 * l2 * l2;
  return [
    lambda * Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
  ];
}

equalEarthRaw.invert = function(x, y) {
  var l = y, l2 = l * l, l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(delta) < _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon2"]) break;
  }
  return [
    M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(l),
    Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["asin"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(l) / M)
  ];
};

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(equalEarthRaw)
      .scale(177.158);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/equirectangular.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/equirectangular.js ***!
  \***************************************************************/
/*! exports provided: equirectangularRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equirectangularRaw", function() { return equirectangularRaw; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/projection/index.js");


function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index__WEBPACK_IMPORTED_MODULE_0__["default"])(equirectangularRaw)
      .scale(152.63);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/fit.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/fit.js ***!
  \***************************************************/
/*! exports provided: fitExtent, fitSize, fitWidth, fitHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitExtent", function() { return fitExtent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitSize", function() { return fitSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitWidth", function() { return fitWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitHeight", function() { return fitHeight; });
/* harmony import */ var _stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _path_bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../path/bounds */ "./node_modules/d3-geo/src/path/bounds.js");



function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  Object(_stream__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projection.stream(_path_bounds__WEBPACK_IMPORTED_MODULE_1__["default"]));
  fitBounds(_path_bounds__WEBPACK_IMPORTED_MODULE_1__["default"].result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function(b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

function fitWidth(projection, width, object) {
  return fit(projection, function(b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function(b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/gnomonic.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/gnomonic.js ***!
  \********************************************************/
/*! exports provided: gnomonicRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gnomonicRaw", function() { return gnomonicRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/projection/index.js");




function gnomonicRaw(x, y) {
  var cy = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y), k = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(x) * cy;
  return [cy * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(x) / k, Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y) / k];
}

gnomonicRaw.invert = Object(_azimuthal__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(_math__WEBPACK_IMPORTED_MODULE_0__["atan"]);

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index__WEBPACK_IMPORTED_MODULE_2__["default"])(gnomonicRaw)
      .scale(144.049)
      .clipAngle(60);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/identity.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/identity.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clip_rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clip/rectangle */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../identity */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transform */ "./node_modules/d3-geo/src/transform.js");
/* harmony import */ var _fit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fit */ "./node_modules/d3-geo/src/projection/fit.js");





function scaleTranslate(kx, ky, tx, ty) {
  return kx === 1 && ky === 1 && tx === 0 && ty === 0 ? _identity__WEBPACK_IMPORTED_MODULE_1__["default"] : Object(_transform__WEBPACK_IMPORTED_MODULE_2__["transformer"])({
    point: function(x, y) {
      this.stream.point(x * kx + tx, y * ky + ty);
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, transform = _identity__WEBPACK_IMPORTED_MODULE_1__["default"], // scale, translate and reflect
      x0 = null, y0, x1, y1, // clip extent
      postclip = _identity__WEBPACK_IMPORTED_MODULE_1__["default"],
      cache,
      cacheStream,
      projection;

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return projection = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = transform(postclip(cacheStream = stream));
    },
    postclip: function(_) {
      return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
    },
    clipExtent: function(_) {
      return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, _identity__WEBPACK_IMPORTED_MODULE_1__["default"]) : Object(_clip_rectangle__WEBPACK_IMPORTED_MODULE_0__["default"])(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
    },
    scale: function(_) {
      return arguments.length ? (transform = scaleTranslate((k = +_) * sx, k * sy, tx, ty), reset()) : k;
    },
    translate: function(_) {
      return arguments.length ? (transform = scaleTranslate(k * sx, k * sy, tx = +_[0], ty = +_[1]), reset()) : [tx, ty];
    },
    reflectX: function(_) {
      return arguments.length ? (transform = scaleTranslate(k * (sx = _ ? -1 : 1), k * sy, tx, ty), reset()) : sx < 0;
    },
    reflectY: function(_) {
      return arguments.length ? (transform = scaleTranslate(k * sx, k * (sy = _ ? -1 : 1), tx, ty), reset()) : sy < 0;
    },
    fitExtent: function(extent, object) {
      return Object(_fit__WEBPACK_IMPORTED_MODULE_3__["fitExtent"])(projection, extent, object);
    },
    fitSize: function(size, object) {
      return Object(_fit__WEBPACK_IMPORTED_MODULE_3__["fitSize"])(projection, size, object);
    },
    fitWidth: function(width, object) {
      return Object(_fit__WEBPACK_IMPORTED_MODULE_3__["fitWidth"])(projection, width, object);
    },
    fitHeight: function(height, object) {
      return Object(_fit__WEBPACK_IMPORTED_MODULE_3__["fitHeight"])(projection, height, object);
    }
  };
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/index.js ***!
  \*****************************************************/
/*! exports provided: default, projectionMutator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return projection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projectionMutator", function() { return projectionMutator; });
/* harmony import */ var _clip_antimeridian__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clip/antimeridian */ "./node_modules/d3-geo/src/clip/antimeridian.js");
/* harmony import */ var _clip_circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../clip/circle */ "./node_modules/d3-geo/src/clip/circle.js");
/* harmony import */ var _clip_rectangle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clip/rectangle */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../compose */ "./node_modules/d3-geo/src/compose.js");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../identity */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../rotation */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../transform */ "./node_modules/d3-geo/src/transform.js");
/* harmony import */ var _fit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fit */ "./node_modules/d3-geo/src/projection/fit.js");
/* harmony import */ var _resample__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resample */ "./node_modules/d3-geo/src/projection/resample.js");











var transformRadians = Object(_transform__WEBPACK_IMPORTED_MODULE_7__["transformer"])({
  point: function(x, y) {
    this.stream.point(x * _math__WEBPACK_IMPORTED_MODULE_5__["radians"], y * _math__WEBPACK_IMPORTED_MODULE_5__["radians"]);
  }
});

function transformRotate(rotate) {
  return Object(_transform__WEBPACK_IMPORTED_MODULE_7__["transformer"])({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy) {
  function transform(x, y) {
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
    return [(x - dx) / k, (dy - y) / k];
  };
  return transform;
}

function scaleTranslateRotate(k, dx, dy, alpha) {
  var cosAlpha = Object(_math__WEBPACK_IMPORTED_MODULE_5__["cos"])(alpha),
      sinAlpha = Object(_math__WEBPACK_IMPORTED_MODULE_5__["sin"])(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform(x, y) {
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [ai * x - bi * y + ci, fi - bi * x - ai * y];
  };
  return transform;
}

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, // pre-rotate
      alpha = 0, // post-rotate
      theta = null, preclip = _clip_antimeridian__WEBPACK_IMPORTED_MODULE_0__["default"], // pre-clip angle
      x0 = null, y0, x1, y1, postclip = _identity__WEBPACK_IMPORTED_MODULE_4__["default"], // post-clip extent
      delta2 = 0.5, // precision
      projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * _math__WEBPACK_IMPORTED_MODULE_5__["radians"], point[1] * _math__WEBPACK_IMPORTED_MODULE_5__["radians"]);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * _math__WEBPACK_IMPORTED_MODULE_5__["degrees"], point[1] * _math__WEBPACK_IMPORTED_MODULE_5__["degrees"]];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? Object(_clip_circle__WEBPACK_IMPORTED_MODULE_1__["default"])(theta = _ * _math__WEBPACK_IMPORTED_MODULE_5__["radians"]) : (theta = null, _clip_antimeridian__WEBPACK_IMPORTED_MODULE_0__["default"]), reset()) : theta * _math__WEBPACK_IMPORTED_MODULE_5__["degrees"];
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, _identity__WEBPACK_IMPORTED_MODULE_4__["default"]) : Object(_clip_rectangle__WEBPACK_IMPORTED_MODULE_2__["default"])(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * _math__WEBPACK_IMPORTED_MODULE_5__["radians"], phi = _[1] % 360 * _math__WEBPACK_IMPORTED_MODULE_5__["radians"], recenter()) : [lambda * _math__WEBPACK_IMPORTED_MODULE_5__["degrees"], phi * _math__WEBPACK_IMPORTED_MODULE_5__["degrees"]];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * _math__WEBPACK_IMPORTED_MODULE_5__["radians"], deltaPhi = _[1] % 360 * _math__WEBPACK_IMPORTED_MODULE_5__["radians"], deltaGamma = _.length > 2 ? _[2] % 360 * _math__WEBPACK_IMPORTED_MODULE_5__["radians"] : 0, recenter()) : [deltaLambda * _math__WEBPACK_IMPORTED_MODULE_5__["degrees"], deltaPhi * _math__WEBPACK_IMPORTED_MODULE_5__["degrees"], deltaGamma * _math__WEBPACK_IMPORTED_MODULE_5__["degrees"]];
  };

  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * _math__WEBPACK_IMPORTED_MODULE_5__["radians"], recenter()) : alpha * _math__WEBPACK_IMPORTED_MODULE_5__["degrees"];
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = Object(_resample__WEBPACK_IMPORTED_MODULE_9__["default"])(projectTransform, delta2 = _ * _), reset()) : Object(_math__WEBPACK_IMPORTED_MODULE_5__["sqrt"])(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return Object(_fit__WEBPACK_IMPORTED_MODULE_8__["fitExtent"])(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return Object(_fit__WEBPACK_IMPORTED_MODULE_8__["fitSize"])(projection, size, object);
  };

  projection.fitWidth = function(width, object) {
    return Object(_fit__WEBPACK_IMPORTED_MODULE_8__["fitWidth"])(projection, width, object);
  };

  projection.fitHeight = function(height, object) {
    return Object(_fit__WEBPACK_IMPORTED_MODULE_8__["fitHeight"])(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, alpha).apply(null, project(lambda, phi)),
        transform = (alpha ? scaleTranslateRotate : scaleTranslate)(k, x - center[0], y - center[1], alpha);
    rotate = Object(_rotation__WEBPACK_IMPORTED_MODULE_6__["rotateRadians"])(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = Object(_compose__WEBPACK_IMPORTED_MODULE_3__["default"])(project, transform);
    projectRotateTransform = Object(_compose__WEBPACK_IMPORTED_MODULE_3__["default"])(rotate, projectTransform);
    projectResample = Object(_resample__WEBPACK_IMPORTED_MODULE_9__["default"])(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/mercator.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/mercator.js ***!
  \********************************************************/
/*! exports provided: mercatorRaw, default, mercatorProjection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mercatorRaw", function() { return mercatorRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mercatorProjection", function() { return mercatorProjection; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rotation */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/projection/index.js");




function mercatorRaw(lambda, phi) {
  return [lambda, Object(_math__WEBPACK_IMPORTED_MODULE_0__["log"])(Object(_math__WEBPACK_IMPORTED_MODULE_0__["tan"])((_math__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan"])(Object(_math__WEBPACK_IMPORTED_MODULE_0__["exp"])(y)) - _math__WEBPACK_IMPORTED_MODULE_0__["halfPi"]];
};

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / _math__WEBPACK_IMPORTED_MODULE_0__["tau"]);
});

function mercatorProjection(project) {
  var m = Object(_index__WEBPACK_IMPORTED_MODULE_2__["default"])(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = _math__WEBPACK_IMPORTED_MODULE_0__["pi"] * scale(),
        t = m(Object(_rotation__WEBPACK_IMPORTED_MODULE_1__["default"])(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/naturalEarth1.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/naturalEarth1.js ***!
  \*************************************************************/
/*! exports provided: naturalEarth1Raw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "naturalEarth1Raw", function() { return naturalEarth1Raw; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");



function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))
  ];
}

naturalEarth1Raw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) /
        (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(delta) > _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"] && --i > 0);
  return [
    x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))),
    phi
  ];
};

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index__WEBPACK_IMPORTED_MODULE_0__["default"])(naturalEarth1Raw)
      .scale(175.295);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/orthographic.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/orthographic.js ***!
  \************************************************************/
/*! exports provided: orthographicRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orthographicRaw", function() { return orthographicRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/projection/index.js");




function orthographicRaw(x, y) {
  return [Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y) * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(x), Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y)];
}

orthographicRaw.invert = Object(_azimuthal__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(_math__WEBPACK_IMPORTED_MODULE_0__["asin"]);

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index__WEBPACK_IMPORTED_MODULE_2__["default"])(orthographicRaw)
      .scale(249.5)
      .clipAngle(90 + _math__WEBPACK_IMPORTED_MODULE_0__["epsilon"]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/resample.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/resample.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cartesian__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cartesian */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transform */ "./node_modules/d3-geo/src/transform.js");




var maxDepth = 16, // maximum depth of subdivision
    cosMinDistance = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(30 * _math__WEBPACK_IMPORTED_MODULE_1__["radians"]); // cos(minimum angular distance)

/* harmony default export */ __webpack_exports__["default"] = (function(project, delta2) {
  return +delta2 ? resample(project, delta2) : resampleNone(project);
});

function resampleNone(project) {
  return Object(_transform__WEBPACK_IMPORTED_MODULE_2__["transformer"])({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sqrt"])(a * a + b * b + c * c),
          phi2 = Object(_math__WEBPACK_IMPORTED_MODULE_1__["asin"])(c /= m),
          lambda2 = Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(c) - 1) < _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"] || Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda0 - lambda1) < _math__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? (lambda0 + lambda1) / 2 : Object(_math__WEBPACK_IMPORTED_MODULE_1__["atan2"])(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = Object(_cartesian__WEBPACK_IMPORTED_MODULE_0__["cartesian"])([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/stereographic.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/stereographic.js ***!
  \*************************************************************/
/*! exports provided: stereographicRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stereographicRaw", function() { return stereographicRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./node_modules/d3-geo/src/projection/index.js");




function stereographicRaw(x, y) {
  var cy = Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(y), k = 1 + Object(_math__WEBPACK_IMPORTED_MODULE_0__["cos"])(x) * cy;
  return [cy * Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(x) / k, Object(_math__WEBPACK_IMPORTED_MODULE_0__["sin"])(y) / k];
}

stereographicRaw.invert = Object(_azimuthal__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(function(z) {
  return 2 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan"])(z);
});

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index__WEBPACK_IMPORTED_MODULE_2__["default"])(stereographicRaw)
      .scale(250)
      .clipAngle(142);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/transverseMercator.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/transverseMercator.js ***!
  \******************************************************************/
/*! exports provided: transverseMercatorRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transverseMercatorRaw", function() { return transverseMercatorRaw; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _mercator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mercator */ "./node_modules/d3-geo/src/projection/mercator.js");



function transverseMercatorRaw(lambda, phi) {
  return [Object(_math__WEBPACK_IMPORTED_MODULE_0__["log"])(Object(_math__WEBPACK_IMPORTED_MODULE_0__["tan"])((_math__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function(x, y) {
  return [-y, 2 * Object(_math__WEBPACK_IMPORTED_MODULE_0__["atan"])(Object(_math__WEBPACK_IMPORTED_MODULE_0__["exp"])(x)) - _math__WEBPACK_IMPORTED_MODULE_0__["halfPi"]];
};

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var m = Object(_mercator__WEBPACK_IMPORTED_MODULE_1__["mercatorProjection"])(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90])
      .scale(159.155);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/rotation.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/rotation.js ***!
  \*********************************************/
/*! exports provided: rotateRadians, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateRadians", function() { return rotateRadians; });
/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compose */ "./node_modules/d3-geo/src/compose.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./node_modules/d3-geo/src/math.js");



function rotationIdentity(lambda, phi) {
  return [Object(_math__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda) > _math__WEBPACK_IMPORTED_MODULE_1__["pi"] ? lambda + Math.round(-lambda / _math__WEBPACK_IMPORTED_MODULE_1__["tau"]) * _math__WEBPACK_IMPORTED_MODULE_1__["tau"] : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= _math__WEBPACK_IMPORTED_MODULE_1__["tau"]) ? (deltaPhi || deltaGamma ? Object(_compose__WEBPACK_IMPORTED_MODULE_0__["default"])(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > _math__WEBPACK_IMPORTED_MODULE_1__["pi"] ? lambda - _math__WEBPACK_IMPORTED_MODULE_1__["tau"] : lambda < -_math__WEBPACK_IMPORTED_MODULE_1__["pi"] ? lambda + _math__WEBPACK_IMPORTED_MODULE_1__["tau"] : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(deltaPhi),
      sinDeltaPhi = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(deltaPhi),
      cosDeltaGamma = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(deltaGamma),
      sinDeltaGamma = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi),
        x = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(lambda) * cosPhi,
        y = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda) * cosPhi,
        z = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      Object(_math__WEBPACK_IMPORTED_MODULE_1__["atan2"])(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      Object(_math__WEBPACK_IMPORTED_MODULE_1__["asin"])(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi),
        x = Object(_math__WEBPACK_IMPORTED_MODULE_1__["cos"])(lambda) * cosPhi,
        y = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda) * cosPhi,
        z = Object(_math__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      Object(_math__WEBPACK_IMPORTED_MODULE_1__["atan2"])(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      Object(_math__WEBPACK_IMPORTED_MODULE_1__["asin"])(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

/* harmony default export */ __webpack_exports__["default"] = (function(rotate) {
  rotate = rotateRadians(rotate[0] * _math__WEBPACK_IMPORTED_MODULE_1__["radians"], rotate[1] * _math__WEBPACK_IMPORTED_MODULE_1__["radians"], rotate.length > 2 ? rotate[2] * _math__WEBPACK_IMPORTED_MODULE_1__["radians"] : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * _math__WEBPACK_IMPORTED_MODULE_1__["radians"], coordinates[1] * _math__WEBPACK_IMPORTED_MODULE_1__["radians"]);
    return coordinates[0] *= _math__WEBPACK_IMPORTED_MODULE_1__["degrees"], coordinates[1] *= _math__WEBPACK_IMPORTED_MODULE_1__["degrees"], coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * _math__WEBPACK_IMPORTED_MODULE_1__["radians"], coordinates[1] * _math__WEBPACK_IMPORTED_MODULE_1__["radians"]);
    return coordinates[0] *= _math__WEBPACK_IMPORTED_MODULE_1__["degrees"], coordinates[1] *= _math__WEBPACK_IMPORTED_MODULE_1__["degrees"], coordinates;
  };

  return forward;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/stream.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/stream.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

/* harmony default export */ __webpack_exports__["default"] = (function(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
});


/***/ }),

/***/ "./node_modules/d3-geo/src/transform.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/transform.js ***!
  \**********************************************/
/*! exports provided: default, transformer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformer", function() { return transformer; });
/* harmony default export */ __webpack_exports__["default"] = (function(methods) {
  return {
    stream: transformer(methods)
  };
});

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};


/***/ }),

/***/ "./node_modules/d3-polygon/src/area.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-polygon/src/area.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(polygon) {
  var i = -1,
      n = polygon.length,
      a,
      b = polygon[n - 1],
      area = 0;

  while (++i < n) {
    a = b;
    b = polygon[i];
    area += a[1] * b[0] - a[0] * b[1];
  }

  return area / 2;
});


/***/ }),

/***/ "./node_modules/d3-polygon/src/centroid.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-polygon/src/centroid.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(polygon) {
  var i = -1,
      n = polygon.length,
      x = 0,
      y = 0,
      a,
      b = polygon[n - 1],
      c,
      k = 0;

  while (++i < n) {
    a = b;
    b = polygon[i];
    k += c = a[0] * b[1] - b[0] * a[1];
    x += (a[0] + b[0]) * c;
    y += (a[1] + b[1]) * c;
  }

  return k *= 3, [x / k, y / k];
});


/***/ }),

/***/ "./node_modules/d3-polygon/src/contains.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-polygon/src/contains.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(polygon, point) {
  var n = polygon.length,
      p = polygon[n - 1],
      x = point[0], y = point[1],
      x0 = p[0], y0 = p[1],
      x1, y1,
      inside = false;

  for (var i = 0; i < n; ++i) {
    p = polygon[i], x1 = p[0], y1 = p[1];
    if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside;
    x0 = x1, y0 = y1;
  }

  return inside;
});


/***/ }),

/***/ "./node_modules/d3-polygon/src/cross.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-polygon/src/cross.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
// the 3D cross product in a quadrant I Cartesian coordinate system (+x is
// right, +y is up). Returns a positive value if ABC is counter-clockwise,
// negative if clockwise, and zero if the points are collinear.
/* harmony default export */ __webpack_exports__["default"] = (function(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
});


/***/ }),

/***/ "./node_modules/d3-polygon/src/hull.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-polygon/src/hull.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cross__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cross */ "./node_modules/d3-polygon/src/cross.js");


function lexicographicOrder(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}

// Computes the upper convex hull per the monotone chain algorithm.
// Assumes points.length >= 3, is sorted by x, unique in y.
// Returns an array of indices into points in left-to-right order.
function computeUpperHullIndexes(points) {
  var n = points.length,
      indexes = [0, 1],
      size = 2;

  for (var i = 2; i < n; ++i) {
    while (size > 1 && Object(_cross__WEBPACK_IMPORTED_MODULE_0__["default"])(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size;
    indexes[size++] = i;
  }

  return indexes.slice(0, size); // remove popped points
}

/* harmony default export */ __webpack_exports__["default"] = (function(points) {
  if ((n = points.length) < 3) return null;

  var i,
      n,
      sortedPoints = new Array(n),
      flippedPoints = new Array(n);

  for (i = 0; i < n; ++i) sortedPoints[i] = [+points[i][0], +points[i][1], i];
  sortedPoints.sort(lexicographicOrder);
  for (i = 0; i < n; ++i) flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];

  var upperIndexes = computeUpperHullIndexes(sortedPoints),
      lowerIndexes = computeUpperHullIndexes(flippedPoints);

  // Construct the hull polygon, removing possible duplicate endpoints.
  var skipLeft = lowerIndexes[0] === upperIndexes[0],
      skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1],
      hull = [];

  // Add upper hull in right-to-l order.
  // Then add lower hull in left-to-right order.
  for (i = upperIndexes.length - 1; i >= 0; --i) hull.push(points[sortedPoints[upperIndexes[i]][2]]);
  for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) hull.push(points[sortedPoints[lowerIndexes[i]][2]]);

  return hull;
});


/***/ }),

/***/ "./node_modules/d3-polygon/src/index.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-polygon/src/index.js ***!
  \**********************************************/
/*! exports provided: polygonArea, polygonCentroid, polygonHull, polygonContains, polygonLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./area */ "./node_modules/d3-polygon/src/area.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonArea", function() { return _area__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _centroid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./centroid */ "./node_modules/d3-polygon/src/centroid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonCentroid", function() { return _centroid__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _hull__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hull */ "./node_modules/d3-polygon/src/hull.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonHull", function() { return _hull__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _contains__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contains */ "./node_modules/d3-polygon/src/contains.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonContains", function() { return _contains__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _length__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./length */ "./node_modules/d3-polygon/src/length.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonLength", function() { return _length__WEBPACK_IMPORTED_MODULE_4__["default"]; });








/***/ }),

/***/ "./node_modules/d3-polygon/src/length.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-polygon/src/length.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(polygon) {
  var i = -1,
      n = polygon.length,
      b = polygon[n - 1],
      xa,
      ya,
      xb = b[0],
      yb = b[1],
      perimeter = 0;

  while (++i < n) {
    xa = xb;
    ya = yb;
    b = polygon[i];
    xb = b[0];
    yb = b[1];
    xa -= xb;
    ya -= yb;
    perimeter += Math.sqrt(xa * xa + ya * ya);
  }

  return perimeter;
});


/***/ }),

/***/ "./node_modules/d3-random/src/bates.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-random/src/bates.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaultSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultSource */ "./node_modules/d3-random/src/defaultSource.js");
/* harmony import */ var _irwinHall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./irwinHall */ "./node_modules/d3-random/src/irwinHall.js");



/* harmony default export */ __webpack_exports__["default"] = ((function sourceRandomBates(source) {
  function randomBates(n) {
    var randomIrwinHall = _irwinHall__WEBPACK_IMPORTED_MODULE_1__["default"].source(source)(n);
    return function() {
      return randomIrwinHall() / n;
    };
  }

  randomBates.source = sourceRandomBates;

  return randomBates;
})(_defaultSource__WEBPACK_IMPORTED_MODULE_0__["default"]));


/***/ }),

/***/ "./node_modules/d3-random/src/defaultSource.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-random/src/defaultSource.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Math.random();
});


/***/ }),

/***/ "./node_modules/d3-random/src/exponential.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-random/src/exponential.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaultSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultSource */ "./node_modules/d3-random/src/defaultSource.js");


/* harmony default export */ __webpack_exports__["default"] = ((function sourceRandomExponential(source) {
  function randomExponential(lambda) {
    return function() {
      return -Math.log(1 - source()) / lambda;
    };
  }

  randomExponential.source = sourceRandomExponential;

  return randomExponential;
})(_defaultSource__WEBPACK_IMPORTED_MODULE_0__["default"]));


/***/ }),

/***/ "./node_modules/d3-random/src/index.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-random/src/index.js ***!
  \*********************************************/
/*! exports provided: randomUniform, randomNormal, randomLogNormal, randomBates, randomIrwinHall, randomExponential */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uniform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uniform */ "./node_modules/d3-random/src/uniform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomUniform", function() { return _uniform__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _normal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normal */ "./node_modules/d3-random/src/normal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomNormal", function() { return _normal__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _logNormal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logNormal */ "./node_modules/d3-random/src/logNormal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomLogNormal", function() { return _logNormal__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _bates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bates */ "./node_modules/d3-random/src/bates.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomBates", function() { return _bates__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _irwinHall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./irwinHall */ "./node_modules/d3-random/src/irwinHall.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomIrwinHall", function() { return _irwinHall__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _exponential__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./exponential */ "./node_modules/d3-random/src/exponential.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomExponential", function() { return _exponential__WEBPACK_IMPORTED_MODULE_5__["default"]; });









/***/ }),

/***/ "./node_modules/d3-random/src/irwinHall.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-random/src/irwinHall.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaultSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultSource */ "./node_modules/d3-random/src/defaultSource.js");


/* harmony default export */ __webpack_exports__["default"] = ((function sourceRandomIrwinHall(source) {
  function randomIrwinHall(n) {
    return function() {
      for (var sum = 0, i = 0; i < n; ++i) sum += source();
      return sum;
    };
  }

  randomIrwinHall.source = sourceRandomIrwinHall;

  return randomIrwinHall;
})(_defaultSource__WEBPACK_IMPORTED_MODULE_0__["default"]));


/***/ }),

/***/ "./node_modules/d3-random/src/logNormal.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-random/src/logNormal.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaultSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultSource */ "./node_modules/d3-random/src/defaultSource.js");
/* harmony import */ var _normal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normal */ "./node_modules/d3-random/src/normal.js");



/* harmony default export */ __webpack_exports__["default"] = ((function sourceRandomLogNormal(source) {
  function randomLogNormal() {
    var randomNormal = _normal__WEBPACK_IMPORTED_MODULE_1__["default"].source(source).apply(this, arguments);
    return function() {
      return Math.exp(randomNormal());
    };
  }

  randomLogNormal.source = sourceRandomLogNormal;

  return randomLogNormal;
})(_defaultSource__WEBPACK_IMPORTED_MODULE_0__["default"]));


/***/ }),

/***/ "./node_modules/d3-random/src/normal.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-random/src/normal.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaultSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultSource */ "./node_modules/d3-random/src/defaultSource.js");


/* harmony default export */ __webpack_exports__["default"] = ((function sourceRandomNormal(source) {
  function randomNormal(mu, sigma) {
    var x, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function() {
      var y;

      // If available, use the second previously-generated uniform random.
      if (x != null) y = x, x = null;

      // Otherwise, generate a new x and y.
      else do {
        x = source() * 2 - 1;
        y = source() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);

      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
  }

  randomNormal.source = sourceRandomNormal;

  return randomNormal;
})(_defaultSource__WEBPACK_IMPORTED_MODULE_0__["default"]));


/***/ }),

/***/ "./node_modules/d3-random/src/uniform.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-random/src/uniform.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaultSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultSource */ "./node_modules/d3-random/src/defaultSource.js");


/* harmony default export */ __webpack_exports__["default"] = ((function sourceRandomUniform(source) {
  function randomUniform(min, max) {
    min = min == null ? 0 : +min;
    max = max == null ? 1 : +max;
    if (arguments.length === 1) max = min, min = 0;
    else max -= min;
    return function() {
      return source() * max + min;
    };
  }

  randomUniform.source = sourceRandomUniform;

  return randomUniform;
})(_defaultSource__WEBPACK_IMPORTED_MODULE_0__["default"]));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/Accent.js":
/*!*******************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/Accent.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/Dark2.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/Dark2.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/Paired.js":
/*!*******************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/Paired.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/Pastel1.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/Pastel1.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/Pastel2.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/Pastel2.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/Set1.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/Set1.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/Set2.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/Set2.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/Set3.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/Set3.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/Tableau10.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/Tableau10.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/categorical/category10.js":
/*!***********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/categorical/category10.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/colors.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/colors.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
});


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/diverging/BrBG.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/diverging/BrBG.js ***!
  \***************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "d8b365f5f5f55ab4ac",
  "a6611adfc27d80cdc1018571",
  "a6611adfc27df5f5f580cdc1018571",
  "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
  "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
  "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
  "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
  "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/diverging/PRGn.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/diverging/PRGn.js ***!
  \***************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "af8dc3f7f7f77fbf7b",
  "7b3294c2a5cfa6dba0008837",
  "7b3294c2a5cff7f7f7a6dba0008837",
  "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
  "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
  "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
  "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
  "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/diverging/PiYG.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/diverging/PiYG.js ***!
  \***************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e9a3c9f7f7f7a1d76a",
  "d01c8bf1b6dab8e1864dac26",
  "d01c8bf1b6daf7f7f7b8e1864dac26",
  "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
  "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
  "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
  "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
  "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/diverging/PuOr.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/diverging/PuOr.js ***!
  \***************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "998ec3f7f7f7f1a340",
  "5e3c99b2abd2fdb863e66101",
  "5e3c99b2abd2f7f7f7fdb863e66101",
  "542788998ec3d8daebfee0b6f1a340b35806",
  "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
  "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
  "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
  "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
  "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/diverging/RdBu.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/diverging/RdBu.js ***!
  \***************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ef8a62f7f7f767a9cf",
  "ca0020f4a58292c5de0571b0",
  "ca0020f4a582f7f7f792c5de0571b0",
  "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
  "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
  "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
  "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
  "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
  "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/diverging/RdGy.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/diverging/RdGy.js ***!
  \***************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ef8a62ffffff999999",
  "ca0020f4a582bababa404040",
  "ca0020f4a582ffffffbababa404040",
  "b2182bef8a62fddbc7e0e0e09999994d4d4d",
  "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
  "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
  "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
  "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
  "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js ***!
  \*****************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fc8d59ffffbf91bfdb",
  "d7191cfdae61abd9e92c7bb6",
  "d7191cfdae61ffffbfabd9e92c7bb6",
  "d73027fc8d59fee090e0f3f891bfdb4575b4",
  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js ***!
  \*****************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/diverging/Spectral.js":
/*!*******************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/diverging/Spectral.js ***!
  \*******************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fc8d59ffffbf99d594",
  "d7191cfdae61abdda42b83ba",
  "d7191cfdae61ffffbfabdda42b83ba",
  "d53e4ffc8d59fee08be6f59899d5943288bd",
  "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
  "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
  "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
  "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/index.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/index.js ***!
  \******************************************************/
/*! exports provided: schemeCategory10, schemeAccent, schemeDark2, schemePaired, schemePastel1, schemePastel2, schemeSet1, schemeSet2, schemeSet3, schemeTableau10, interpolateBrBG, schemeBrBG, interpolatePRGn, schemePRGn, interpolatePiYG, schemePiYG, interpolatePuOr, schemePuOr, interpolateRdBu, schemeRdBu, interpolateRdGy, schemeRdGy, interpolateRdYlBu, schemeRdYlBu, interpolateRdYlGn, schemeRdYlGn, interpolateSpectral, schemeSpectral, interpolateBuGn, schemeBuGn, interpolateBuPu, schemeBuPu, interpolateGnBu, schemeGnBu, interpolateOrRd, schemeOrRd, interpolatePuBuGn, schemePuBuGn, interpolatePuBu, schemePuBu, interpolatePuRd, schemePuRd, interpolateRdPu, schemeRdPu, interpolateYlGnBu, schemeYlGnBu, interpolateYlGn, schemeYlGn, interpolateYlOrBr, schemeYlOrBr, interpolateYlOrRd, schemeYlOrRd, interpolateBlues, schemeBlues, interpolateGreens, schemeGreens, interpolateGreys, schemeGreys, interpolatePurples, schemePurples, interpolateReds, schemeReds, interpolateOranges, schemeOranges, interpolateCividis, interpolateCubehelixDefault, interpolateRainbow, interpolateWarm, interpolateCool, interpolateSinebow, interpolateTurbo, interpolateViridis, interpolateMagma, interpolateInferno, interpolatePlasma */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _categorical_category10_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categorical/category10.js */ "./node_modules/d3-scale-chromatic/src/categorical/category10.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeCategory10", function() { return _categorical_category10_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _categorical_Accent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categorical/Accent.js */ "./node_modules/d3-scale-chromatic/src/categorical/Accent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeAccent", function() { return _categorical_Accent_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _categorical_Dark2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./categorical/Dark2.js */ "./node_modules/d3-scale-chromatic/src/categorical/Dark2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeDark2", function() { return _categorical_Dark2_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _categorical_Paired_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./categorical/Paired.js */ "./node_modules/d3-scale-chromatic/src/categorical/Paired.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePaired", function() { return _categorical_Paired_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _categorical_Pastel1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./categorical/Pastel1.js */ "./node_modules/d3-scale-chromatic/src/categorical/Pastel1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePastel1", function() { return _categorical_Pastel1_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _categorical_Pastel2_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./categorical/Pastel2.js */ "./node_modules/d3-scale-chromatic/src/categorical/Pastel2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePastel2", function() { return _categorical_Pastel2_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _categorical_Set1_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./categorical/Set1.js */ "./node_modules/d3-scale-chromatic/src/categorical/Set1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSet1", function() { return _categorical_Set1_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _categorical_Set2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./categorical/Set2.js */ "./node_modules/d3-scale-chromatic/src/categorical/Set2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSet2", function() { return _categorical_Set2_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _categorical_Set3_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./categorical/Set3.js */ "./node_modules/d3-scale-chromatic/src/categorical/Set3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSet3", function() { return _categorical_Set3_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _categorical_Tableau10_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./categorical/Tableau10.js */ "./node_modules/d3-scale-chromatic/src/categorical/Tableau10.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeTableau10", function() { return _categorical_Tableau10_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _diverging_BrBG_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./diverging/BrBG.js */ "./node_modules/d3-scale-chromatic/src/diverging/BrBG.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBrBG", function() { return _diverging_BrBG_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBrBG", function() { return _diverging_BrBG_js__WEBPACK_IMPORTED_MODULE_10__["scheme"]; });

/* harmony import */ var _diverging_PRGn_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./diverging/PRGn.js */ "./node_modules/d3-scale-chromatic/src/diverging/PRGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePRGn", function() { return _diverging_PRGn_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePRGn", function() { return _diverging_PRGn_js__WEBPACK_IMPORTED_MODULE_11__["scheme"]; });

/* harmony import */ var _diverging_PiYG_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./diverging/PiYG.js */ "./node_modules/d3-scale-chromatic/src/diverging/PiYG.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePiYG", function() { return _diverging_PiYG_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePiYG", function() { return _diverging_PiYG_js__WEBPACK_IMPORTED_MODULE_12__["scheme"]; });

/* harmony import */ var _diverging_PuOr_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./diverging/PuOr.js */ "./node_modules/d3-scale-chromatic/src/diverging/PuOr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuOr", function() { return _diverging_PuOr_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuOr", function() { return _diverging_PuOr_js__WEBPACK_IMPORTED_MODULE_13__["scheme"]; });

/* harmony import */ var _diverging_RdBu_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./diverging/RdBu.js */ "./node_modules/d3-scale-chromatic/src/diverging/RdBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdBu", function() { return _diverging_RdBu_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdBu", function() { return _diverging_RdBu_js__WEBPACK_IMPORTED_MODULE_14__["scheme"]; });

/* harmony import */ var _diverging_RdGy_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./diverging/RdGy.js */ "./node_modules/d3-scale-chromatic/src/diverging/RdGy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdGy", function() { return _diverging_RdGy_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdGy", function() { return _diverging_RdGy_js__WEBPACK_IMPORTED_MODULE_15__["scheme"]; });

/* harmony import */ var _diverging_RdYlBu_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./diverging/RdYlBu.js */ "./node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdYlBu", function() { return _diverging_RdYlBu_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdYlBu", function() { return _diverging_RdYlBu_js__WEBPACK_IMPORTED_MODULE_16__["scheme"]; });

/* harmony import */ var _diverging_RdYlGn_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./diverging/RdYlGn.js */ "./node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdYlGn", function() { return _diverging_RdYlGn_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdYlGn", function() { return _diverging_RdYlGn_js__WEBPACK_IMPORTED_MODULE_17__["scheme"]; });

/* harmony import */ var _diverging_Spectral_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./diverging/Spectral.js */ "./node_modules/d3-scale-chromatic/src/diverging/Spectral.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateSpectral", function() { return _diverging_Spectral_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSpectral", function() { return _diverging_Spectral_js__WEBPACK_IMPORTED_MODULE_18__["scheme"]; });

/* harmony import */ var _sequential_multi_BuGn_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./sequential-multi/BuGn.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBuGn", function() { return _sequential_multi_BuGn_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBuGn", function() { return _sequential_multi_BuGn_js__WEBPACK_IMPORTED_MODULE_19__["scheme"]; });

/* harmony import */ var _sequential_multi_BuPu_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./sequential-multi/BuPu.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBuPu", function() { return _sequential_multi_BuPu_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBuPu", function() { return _sequential_multi_BuPu_js__WEBPACK_IMPORTED_MODULE_20__["scheme"]; });

/* harmony import */ var _sequential_multi_GnBu_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./sequential-multi/GnBu.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateGnBu", function() { return _sequential_multi_GnBu_js__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeGnBu", function() { return _sequential_multi_GnBu_js__WEBPACK_IMPORTED_MODULE_21__["scheme"]; });

/* harmony import */ var _sequential_multi_OrRd_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./sequential-multi/OrRd.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateOrRd", function() { return _sequential_multi_OrRd_js__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeOrRd", function() { return _sequential_multi_OrRd_js__WEBPACK_IMPORTED_MODULE_22__["scheme"]; });

/* harmony import */ var _sequential_multi_PuBuGn_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./sequential-multi/PuBuGn.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuBuGn", function() { return _sequential_multi_PuBuGn_js__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuBuGn", function() { return _sequential_multi_PuBuGn_js__WEBPACK_IMPORTED_MODULE_23__["scheme"]; });

/* harmony import */ var _sequential_multi_PuBu_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./sequential-multi/PuBu.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuBu", function() { return _sequential_multi_PuBu_js__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuBu", function() { return _sequential_multi_PuBu_js__WEBPACK_IMPORTED_MODULE_24__["scheme"]; });

/* harmony import */ var _sequential_multi_PuRd_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./sequential-multi/PuRd.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuRd", function() { return _sequential_multi_PuRd_js__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuRd", function() { return _sequential_multi_PuRd_js__WEBPACK_IMPORTED_MODULE_25__["scheme"]; });

/* harmony import */ var _sequential_multi_RdPu_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./sequential-multi/RdPu.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdPu", function() { return _sequential_multi_RdPu_js__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdPu", function() { return _sequential_multi_RdPu_js__WEBPACK_IMPORTED_MODULE_26__["scheme"]; });

/* harmony import */ var _sequential_multi_YlGnBu_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./sequential-multi/YlGnBu.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlGnBu", function() { return _sequential_multi_YlGnBu_js__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlGnBu", function() { return _sequential_multi_YlGnBu_js__WEBPACK_IMPORTED_MODULE_27__["scheme"]; });

/* harmony import */ var _sequential_multi_YlGn_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./sequential-multi/YlGn.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlGn", function() { return _sequential_multi_YlGn_js__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlGn", function() { return _sequential_multi_YlGn_js__WEBPACK_IMPORTED_MODULE_28__["scheme"]; });

/* harmony import */ var _sequential_multi_YlOrBr_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./sequential-multi/YlOrBr.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlOrBr", function() { return _sequential_multi_YlOrBr_js__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlOrBr", function() { return _sequential_multi_YlOrBr_js__WEBPACK_IMPORTED_MODULE_29__["scheme"]; });

/* harmony import */ var _sequential_multi_YlOrRd_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./sequential-multi/YlOrRd.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlOrRd", function() { return _sequential_multi_YlOrRd_js__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlOrRd", function() { return _sequential_multi_YlOrRd_js__WEBPACK_IMPORTED_MODULE_30__["scheme"]; });

/* harmony import */ var _sequential_single_Blues_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./sequential-single/Blues.js */ "./node_modules/d3-scale-chromatic/src/sequential-single/Blues.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBlues", function() { return _sequential_single_Blues_js__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBlues", function() { return _sequential_single_Blues_js__WEBPACK_IMPORTED_MODULE_31__["scheme"]; });

/* harmony import */ var _sequential_single_Greens_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./sequential-single/Greens.js */ "./node_modules/d3-scale-chromatic/src/sequential-single/Greens.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateGreens", function() { return _sequential_single_Greens_js__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeGreens", function() { return _sequential_single_Greens_js__WEBPACK_IMPORTED_MODULE_32__["scheme"]; });

/* harmony import */ var _sequential_single_Greys_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./sequential-single/Greys.js */ "./node_modules/d3-scale-chromatic/src/sequential-single/Greys.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateGreys", function() { return _sequential_single_Greys_js__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeGreys", function() { return _sequential_single_Greys_js__WEBPACK_IMPORTED_MODULE_33__["scheme"]; });

/* harmony import */ var _sequential_single_Purples_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./sequential-single/Purples.js */ "./node_modules/d3-scale-chromatic/src/sequential-single/Purples.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePurples", function() { return _sequential_single_Purples_js__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePurples", function() { return _sequential_single_Purples_js__WEBPACK_IMPORTED_MODULE_34__["scheme"]; });

/* harmony import */ var _sequential_single_Reds_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./sequential-single/Reds.js */ "./node_modules/d3-scale-chromatic/src/sequential-single/Reds.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateReds", function() { return _sequential_single_Reds_js__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeReds", function() { return _sequential_single_Reds_js__WEBPACK_IMPORTED_MODULE_35__["scheme"]; });

/* harmony import */ var _sequential_single_Oranges_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./sequential-single/Oranges.js */ "./node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateOranges", function() { return _sequential_single_Oranges_js__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeOranges", function() { return _sequential_single_Oranges_js__WEBPACK_IMPORTED_MODULE_36__["scheme"]; });

/* harmony import */ var _sequential_multi_cividis_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./sequential-multi/cividis.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/cividis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCividis", function() { return _sequential_multi_cividis_js__WEBPACK_IMPORTED_MODULE_37__["default"]; });

/* harmony import */ var _sequential_multi_cubehelix_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./sequential-multi/cubehelix.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelixDefault", function() { return _sequential_multi_cubehelix_js__WEBPACK_IMPORTED_MODULE_38__["default"]; });

/* harmony import */ var _sequential_multi_rainbow_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./sequential-multi/rainbow.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRainbow", function() { return _sequential_multi_rainbow_js__WEBPACK_IMPORTED_MODULE_39__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateWarm", function() { return _sequential_multi_rainbow_js__WEBPACK_IMPORTED_MODULE_39__["warm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCool", function() { return _sequential_multi_rainbow_js__WEBPACK_IMPORTED_MODULE_39__["cool"]; });

/* harmony import */ var _sequential_multi_sinebow_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./sequential-multi/sinebow.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateSinebow", function() { return _sequential_multi_sinebow_js__WEBPACK_IMPORTED_MODULE_40__["default"]; });

/* harmony import */ var _sequential_multi_turbo_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./sequential-multi/turbo.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/turbo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTurbo", function() { return _sequential_multi_turbo_js__WEBPACK_IMPORTED_MODULE_41__["default"]; });

/* harmony import */ var _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./sequential-multi/viridis.js */ "./node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateViridis", function() { return _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateMagma", function() { return _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__["magma"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateInferno", function() { return _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__["inferno"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePlasma", function() { return _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__["plasma"]; });














































/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/ramp.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/ramp.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/index.js");


/* harmony default export */ __webpack_exports__["default"] = (function(scheme) {
  return Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_0__["interpolateRgbBasis"])(scheme[scheme.length - 1]);
});


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js ***!
  \**********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e5f5f999d8c92ca25f",
  "edf8fbb2e2e266c2a4238b45",
  "edf8fbb2e2e266c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js ***!
  \**********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e0ecf49ebcda8856a7",
  "edf8fbb3cde38c96c688419d",
  "edf8fbb3cde38c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js ***!
  \**********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e0f3dba8ddb543a2ca",
  "f0f9e8bae4bc7bccc42b8cbe",
  "f0f9e8bae4bc7bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js ***!
  \**********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fee8c8fdbb84e34a33",
  "fef0d9fdcc8afc8d59d7301f",
  "fef0d9fdcc8afc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js ***!
  \**********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ece7f2a6bddb2b8cbe",
  "f1eef6bdc9e174a9cf0570b0",
  "f1eef6bdc9e174a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js":
/*!************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js ***!
  \************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ece2f0a6bddb1c9099",
  "f6eff7bdc9e167a9cf02818a",
  "f6eff7bdc9e167a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js ***!
  \**********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e7e1efc994c7dd1c77",
  "f1eef6d7b5d8df65b0ce1256",
  "f1eef6d7b5d8df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js ***!
  \**********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fde0ddfa9fb5c51b8a",
  "feebe2fbb4b9f768a1ae017e",
  "feebe2fbb4b9f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js":
/*!**********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js ***!
  \**********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "f7fcb9addd8e31a354",
  "ffffccc2e69978c679238443",
  "ffffccc2e69978c67931a354006837",
  "ffffccd9f0a3addd8e78c67931a354006837",
  "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js":
/*!************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js ***!
  \************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "edf8b17fcdbb2c7fb8",
  "ffffcca1dab441b6c4225ea8",
  "ffffcca1dab441b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js":
/*!************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js ***!
  \************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fff7bcfec44fd95f0e",
  "ffffd4fed98efe9929cc4c02",
  "ffffd4fed98efe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js":
/*!************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js ***!
  \************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ffeda0feb24cf03b20",
  "ffffb2fecc5cfd8d3ce31a1c",
  "ffffb2fecc5cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/cividis.js":
/*!*************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/cividis.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb("
      + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", "
      + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", "
      + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67)))))))
      + ")";
});


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js":
/*!***************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/index.js");



/* harmony default export */ __webpack_exports__["default"] = (Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateCubehelixLong"])(Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(300, 0.5, 0.0), Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(-240, 0.5, 1.0)));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js":
/*!*************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js ***!
  \*************************************************************************/
/*! exports provided: warm, cool, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warm", function() { return warm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cool", function() { return cool; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/index.js");



var warm = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateCubehelixLong"])(Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(-100, 0.75, 0.35), Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(80, 1.50, 0.8));

var cool = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateCubehelixLong"])(Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(260, 0.75, 0.35), Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(80, 1.50, 0.8));

var c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])();

/* harmony default export */ __webpack_exports__["default"] = (function(t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  c.h = 360 * t - 100;
  c.s = 1.5 - 1.5 * ts;
  c.l = 0.8 - 0.9 * ts;
  return c + "";
});


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js":
/*!*************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");


var c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(),
    pi_1_3 = Math.PI / 3,
    pi_2_3 = Math.PI * 2 / 3;

/* harmony default export */ __webpack_exports__["default"] = (function(t) {
  var x;
  t = (0.5 - t) * Math.PI;
  c.r = 255 * (x = Math.sin(t)) * x;
  c.g = 255 * (x = Math.sin(t + pi_1_3)) * x;
  c.b = 255 * (x = Math.sin(t + pi_2_3)) * x;
  return c + "";
});


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/turbo.js":
/*!***********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/turbo.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb("
      + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", "
      + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", "
      + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66)))))))
      + ")";
});


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js":
/*!*************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js ***!
  \*************************************************************************/
/*! exports provided: default, magma, inferno, plasma */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magma", function() { return magma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inferno", function() { return inferno; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plasma", function() { return plasma; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");


function ramp(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (ramp(Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")));

var magma = ramp(Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

var inferno = ramp(Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

var plasma = ramp(Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-single/Blues.js":
/*!************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-single/Blues.js ***!
  \************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-single/Greens.js":
/*!*************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-single/Greens.js ***!
  \*************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e5f5e0a1d99b31a354",
  "edf8e9bae4b374c476238b45",
  "edf8e9bae4b374c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-single/Greys.js":
/*!************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-single/Greys.js ***!
  \************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "f0f0f0bdbdbd636363",
  "f7f7f7cccccc969696525252",
  "f7f7f7cccccc969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js":
/*!**************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js ***!
  \**************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fee6cefdae6be6550d",
  "feeddefdbe85fd8d3cd94701",
  "feeddefdbe85fd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-single/Purples.js":
/*!**************************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-single/Purples.js ***!
  \**************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "efedf5bcbddc756bb1",
  "f2f0f7cbc9e29e9ac86a51a3",
  "f2f0f7cbc9e29e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-scale-chromatic/src/sequential-single/Reds.js":
/*!***********************************************************************!*\
  !*** ./node_modules/d3-scale-chromatic/src/sequential-single/Reds.js ***!
  \***********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "./node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "./node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fee0d2fc9272de2d26",
  "fee5d9fcae91fb6a4acb181d",
  "fee5d9fcae91fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./node_modules/d3-voronoi/src/Beach.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-voronoi/src/Beach.js ***!
  \**********************************************/
/*! exports provided: removeBeach, addBeach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeBeach", function() { return removeBeach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addBeach", function() { return addBeach; });
/* harmony import */ var _RedBlackTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RedBlackTree */ "./node_modules/d3-voronoi/src/RedBlackTree.js");
/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cell */ "./node_modules/d3-voronoi/src/Cell.js");
/* harmony import */ var _Circle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Circle */ "./node_modules/d3-voronoi/src/Circle.js");
/* harmony import */ var _Edge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Edge */ "./node_modules/d3-voronoi/src/Edge.js");
/* harmony import */ var _Diagram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Diagram */ "./node_modules/d3-voronoi/src/Diagram.js");






var beachPool = [];

function Beach() {
  Object(_RedBlackTree__WEBPACK_IMPORTED_MODULE_0__["RedBlackNode"])(this);
  this.edge =
  this.site =
  this.circle = null;
}

function createBeach(site) {
  var beach = beachPool.pop() || new Beach;
  beach.site = site;
  return beach;
}

function detachBeach(beach) {
  Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["detachCircle"])(beach);
  _Diagram__WEBPACK_IMPORTED_MODULE_4__["beaches"].remove(beach);
  beachPool.push(beach);
  Object(_RedBlackTree__WEBPACK_IMPORTED_MODULE_0__["RedBlackNode"])(beach);
}

function removeBeach(beach) {
  var circle = beach.circle,
      x = circle.x,
      y = circle.cy,
      vertex = [x, y],
      previous = beach.P,
      next = beach.N,
      disappearing = [beach];

  detachBeach(beach);

  var lArc = previous;
  while (lArc.circle
      && Math.abs(x - lArc.circle.x) < _Diagram__WEBPACK_IMPORTED_MODULE_4__["epsilon"]
      && Math.abs(y - lArc.circle.cy) < _Diagram__WEBPACK_IMPORTED_MODULE_4__["epsilon"]) {
    previous = lArc.P;
    disappearing.unshift(lArc);
    detachBeach(lArc);
    lArc = previous;
  }

  disappearing.unshift(lArc);
  Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["detachCircle"])(lArc);

  var rArc = next;
  while (rArc.circle
      && Math.abs(x - rArc.circle.x) < _Diagram__WEBPACK_IMPORTED_MODULE_4__["epsilon"]
      && Math.abs(y - rArc.circle.cy) < _Diagram__WEBPACK_IMPORTED_MODULE_4__["epsilon"]) {
    next = rArc.N;
    disappearing.push(rArc);
    detachBeach(rArc);
    rArc = next;
  }

  disappearing.push(rArc);
  Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["detachCircle"])(rArc);

  var nArcs = disappearing.length,
      iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearing[iArc];
    lArc = disappearing[iArc - 1];
    Object(_Edge__WEBPACK_IMPORTED_MODULE_3__["setEdgeEnd"])(rArc.edge, lArc.site, rArc.site, vertex);
  }

  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = Object(_Edge__WEBPACK_IMPORTED_MODULE_3__["createEdge"])(lArc.site, rArc.site, null, vertex);

  Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["attachCircle"])(lArc);
  Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["attachCircle"])(rArc);
}

function addBeach(site) {
  var x = site[0],
      directrix = site[1],
      lArc,
      rArc,
      dxl,
      dxr,
      node = _Diagram__WEBPACK_IMPORTED_MODULE_4__["beaches"]._;

  while (node) {
    dxl = leftBreakPoint(node, directrix) - x;
    if (dxl > _Diagram__WEBPACK_IMPORTED_MODULE_4__["epsilon"]) node = node.L; else {
      dxr = x - rightBreakPoint(node, directrix);
      if (dxr > _Diagram__WEBPACK_IMPORTED_MODULE_4__["epsilon"]) {
        if (!node.R) {
          lArc = node;
          break;
        }
        node = node.R;
      } else {
        if (dxl > -_Diagram__WEBPACK_IMPORTED_MODULE_4__["epsilon"]) {
          lArc = node.P;
          rArc = node;
        } else if (dxr > -_Diagram__WEBPACK_IMPORTED_MODULE_4__["epsilon"]) {
          lArc = node;
          rArc = node.N;
        } else {
          lArc = rArc = node;
        }
        break;
      }
    }
  }

  Object(_Cell__WEBPACK_IMPORTED_MODULE_1__["createCell"])(site);
  var newArc = createBeach(site);
  _Diagram__WEBPACK_IMPORTED_MODULE_4__["beaches"].insert(lArc, newArc);

  if (!lArc && !rArc) return;

  if (lArc === rArc) {
    Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["detachCircle"])(lArc);
    rArc = createBeach(lArc.site);
    _Diagram__WEBPACK_IMPORTED_MODULE_4__["beaches"].insert(newArc, rArc);
    newArc.edge = rArc.edge = Object(_Edge__WEBPACK_IMPORTED_MODULE_3__["createEdge"])(lArc.site, newArc.site);
    Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["attachCircle"])(lArc);
    Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["attachCircle"])(rArc);
    return;
  }

  if (!rArc) { // && lArc
    newArc.edge = Object(_Edge__WEBPACK_IMPORTED_MODULE_3__["createEdge"])(lArc.site, newArc.site);
    return;
  }

  // else lArc !== rArc
  Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["detachCircle"])(lArc);
  Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["detachCircle"])(rArc);

  var lSite = lArc.site,
      ax = lSite[0],
      ay = lSite[1],
      bx = site[0] - ax,
      by = site[1] - ay,
      rSite = rArc.site,
      cx = rSite[0] - ax,
      cy = rSite[1] - ay,
      d = 2 * (bx * cy - by * cx),
      hb = bx * bx + by * by,
      hc = cx * cx + cy * cy,
      vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];

  Object(_Edge__WEBPACK_IMPORTED_MODULE_3__["setEdgeEnd"])(rArc.edge, lSite, rSite, vertex);
  newArc.edge = Object(_Edge__WEBPACK_IMPORTED_MODULE_3__["createEdge"])(lSite, site, null, vertex);
  rArc.edge = Object(_Edge__WEBPACK_IMPORTED_MODULE_3__["createEdge"])(site, rSite, null, vertex);
  Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["attachCircle"])(lArc);
  Object(_Circle__WEBPACK_IMPORTED_MODULE_2__["attachCircle"])(rArc);
}

function leftBreakPoint(arc, directrix) {
  var site = arc.site,
      rfocx = site[0],
      rfocy = site[1],
      pby2 = rfocy - directrix;

  if (!pby2) return rfocx;

  var lArc = arc.P;
  if (!lArc) return -Infinity;

  site = lArc.site;
  var lfocx = site[0],
      lfocy = site[1],
      plby2 = lfocy - directrix;

  if (!plby2) return lfocx;

  var hl = lfocx - rfocx,
      aby2 = 1 / pby2 - 1 / plby2,
      b = hl / plby2;

  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;

  return (rfocx + lfocx) / 2;
}

function rightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc) return leftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site[1] === directrix ? site[0] : Infinity;
}


/***/ }),

/***/ "./node_modules/d3-voronoi/src/Cell.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-voronoi/src/Cell.js ***!
  \*********************************************/
/*! exports provided: createCell, cellHalfedgeStart, cellHalfedgeEnd, sortCellHalfedges, clipCells */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCell", function() { return createCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cellHalfedgeStart", function() { return cellHalfedgeStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cellHalfedgeEnd", function() { return cellHalfedgeEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortCellHalfedges", function() { return sortCellHalfedges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clipCells", function() { return clipCells; });
/* harmony import */ var _Edge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edge */ "./node_modules/d3-voronoi/src/Edge.js");
/* harmony import */ var _Diagram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Diagram */ "./node_modules/d3-voronoi/src/Diagram.js");



function createCell(site) {
  return _Diagram__WEBPACK_IMPORTED_MODULE_1__["cells"][site.index] = {
    site: site,
    halfedges: []
  };
}

function cellHalfedgeAngle(cell, edge) {
  var site = cell.site,
      va = edge.left,
      vb = edge.right;
  if (site === vb) vb = va, va = site;
  if (vb) return Math.atan2(vb[1] - va[1], vb[0] - va[0]);
  if (site === va) va = edge[1], vb = edge[0];
  else va = edge[0], vb = edge[1];
  return Math.atan2(va[0] - vb[0], vb[1] - va[1]);
}

function cellHalfedgeStart(cell, edge) {
  return edge[+(edge.left !== cell.site)];
}

function cellHalfedgeEnd(cell, edge) {
  return edge[+(edge.left === cell.site)];
}

function sortCellHalfedges() {
  for (var i = 0, n = _Diagram__WEBPACK_IMPORTED_MODULE_1__["cells"].length, cell, halfedges, j, m; i < n; ++i) {
    if ((cell = _Diagram__WEBPACK_IMPORTED_MODULE_1__["cells"][i]) && (m = (halfedges = cell.halfedges).length)) {
      var index = new Array(m),
          array = new Array(m);
      for (j = 0; j < m; ++j) index[j] = j, array[j] = cellHalfedgeAngle(cell, _Diagram__WEBPACK_IMPORTED_MODULE_1__["edges"][halfedges[j]]);
      index.sort(function(i, j) { return array[j] - array[i]; });
      for (j = 0; j < m; ++j) array[j] = halfedges[index[j]];
      for (j = 0; j < m; ++j) halfedges[j] = array[j];
    }
  }
}

function clipCells(x0, y0, x1, y1) {
  var nCells = _Diagram__WEBPACK_IMPORTED_MODULE_1__["cells"].length,
      iCell,
      cell,
      site,
      iHalfedge,
      halfedges,
      nHalfedges,
      start,
      startX,
      startY,
      end,
      endX,
      endY,
      cover = true;

  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = _Diagram__WEBPACK_IMPORTED_MODULE_1__["cells"][iCell]) {
      site = cell.site;
      halfedges = cell.halfedges;
      iHalfedge = halfedges.length;

      // Remove any dangling clipped edges.
      while (iHalfedge--) {
        if (!_Diagram__WEBPACK_IMPORTED_MODULE_1__["edges"][halfedges[iHalfedge]]) {
          halfedges.splice(iHalfedge, 1);
        }
      }

      // Insert any border edges as necessary.
      iHalfedge = 0, nHalfedges = halfedges.length;
      while (iHalfedge < nHalfedges) {
        end = cellHalfedgeEnd(cell, _Diagram__WEBPACK_IMPORTED_MODULE_1__["edges"][halfedges[iHalfedge]]), endX = end[0], endY = end[1];
        start = cellHalfedgeStart(cell, _Diagram__WEBPACK_IMPORTED_MODULE_1__["edges"][halfedges[++iHalfedge % nHalfedges]]), startX = start[0], startY = start[1];
        if (Math.abs(endX - startX) > _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] || Math.abs(endY - startY) > _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"]) {
          halfedges.splice(iHalfedge, 0, _Diagram__WEBPACK_IMPORTED_MODULE_1__["edges"].push(Object(_Edge__WEBPACK_IMPORTED_MODULE_0__["createBorderEdge"])(site, end,
              Math.abs(endX - x0) < _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] && y1 - endY > _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? [x0, Math.abs(startX - x0) < _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? startY : y1]
              : Math.abs(endY - y1) < _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] && x1 - endX > _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? [Math.abs(startY - y1) < _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? startX : x1, y1]
              : Math.abs(endX - x1) < _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] && endY - y0 > _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? [x1, Math.abs(startX - x1) < _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? startY : y0]
              : Math.abs(endY - y0) < _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] && endX - x0 > _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? [Math.abs(startY - y0) < _Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? startX : x0, y0]
              : null)) - 1);
          ++nHalfedges;
        }
      }

      if (nHalfedges) cover = false;
    }
  }

  // If there weren’t any edges, have the closest site cover the extent.
  // It doesn’t matter which corner of the extent we measure!
  if (cover) {
    var dx, dy, d2, dc = Infinity;

    for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
      if (cell = _Diagram__WEBPACK_IMPORTED_MODULE_1__["cells"][iCell]) {
        site = cell.site;
        dx = site[0] - x0;
        dy = site[1] - y0;
        d2 = dx * dx + dy * dy;
        if (d2 < dc) dc = d2, cover = cell;
      }
    }

    if (cover) {
      var v00 = [x0, y0], v01 = [x0, y1], v11 = [x1, y1], v10 = [x1, y0];
      cover.halfedges.push(
        _Diagram__WEBPACK_IMPORTED_MODULE_1__["edges"].push(Object(_Edge__WEBPACK_IMPORTED_MODULE_0__["createBorderEdge"])(site = cover.site, v00, v01)) - 1,
        _Diagram__WEBPACK_IMPORTED_MODULE_1__["edges"].push(Object(_Edge__WEBPACK_IMPORTED_MODULE_0__["createBorderEdge"])(site, v01, v11)) - 1,
        _Diagram__WEBPACK_IMPORTED_MODULE_1__["edges"].push(Object(_Edge__WEBPACK_IMPORTED_MODULE_0__["createBorderEdge"])(site, v11, v10)) - 1,
        _Diagram__WEBPACK_IMPORTED_MODULE_1__["edges"].push(Object(_Edge__WEBPACK_IMPORTED_MODULE_0__["createBorderEdge"])(site, v10, v00)) - 1
      );
    }
  }

  // Lastly delete any cells with no edges; these were entirely clipped.
  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = _Diagram__WEBPACK_IMPORTED_MODULE_1__["cells"][iCell]) {
      if (!cell.halfedges.length) {
        delete _Diagram__WEBPACK_IMPORTED_MODULE_1__["cells"][iCell];
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/d3-voronoi/src/Circle.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-voronoi/src/Circle.js ***!
  \***********************************************/
/*! exports provided: firstCircle, attachCircle, detachCircle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstCircle", function() { return firstCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachCircle", function() { return attachCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachCircle", function() { return detachCircle; });
/* harmony import */ var _RedBlackTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RedBlackTree */ "./node_modules/d3-voronoi/src/RedBlackTree.js");
/* harmony import */ var _Diagram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Diagram */ "./node_modules/d3-voronoi/src/Diagram.js");



var circlePool = [];

var firstCircle;

function Circle() {
  Object(_RedBlackTree__WEBPACK_IMPORTED_MODULE_0__["RedBlackNode"])(this);
  this.x =
  this.y =
  this.arc =
  this.site =
  this.cy = null;
}

function attachCircle(arc) {
  var lArc = arc.P,
      rArc = arc.N;

  if (!lArc || !rArc) return;

  var lSite = lArc.site,
      cSite = arc.site,
      rSite = rArc.site;

  if (lSite === rSite) return;

  var bx = cSite[0],
      by = cSite[1],
      ax = lSite[0] - bx,
      ay = lSite[1] - by,
      cx = rSite[0] - bx,
      cy = rSite[1] - by;

  var d = 2 * (ax * cy - ay * cx);
  if (d >= -_Diagram__WEBPACK_IMPORTED_MODULE_1__["epsilon2"]) return;

  var ha = ax * ax + ay * ay,
      hc = cx * cx + cy * cy,
      x = (cy * ha - ay * hc) / d,
      y = (ax * hc - cx * ha) / d;

  var circle = circlePool.pop() || new Circle;
  circle.arc = arc;
  circle.site = cSite;
  circle.x = x + bx;
  circle.y = (circle.cy = y + by) + Math.sqrt(x * x + y * y); // y bottom

  arc.circle = circle;

  var before = null,
      node = _Diagram__WEBPACK_IMPORTED_MODULE_1__["circles"]._;

  while (node) {
    if (circle.y < node.y || (circle.y === node.y && circle.x <= node.x)) {
      if (node.L) node = node.L;
      else { before = node.P; break; }
    } else {
      if (node.R) node = node.R;
      else { before = node; break; }
    }
  }

  _Diagram__WEBPACK_IMPORTED_MODULE_1__["circles"].insert(before, circle);
  if (!before) firstCircle = circle;
}

function detachCircle(arc) {
  var circle = arc.circle;
  if (circle) {
    if (!circle.P) firstCircle = circle.N;
    _Diagram__WEBPACK_IMPORTED_MODULE_1__["circles"].remove(circle);
    circlePool.push(circle);
    Object(_RedBlackTree__WEBPACK_IMPORTED_MODULE_0__["RedBlackNode"])(circle);
    arc.circle = null;
  }
}


/***/ }),

/***/ "./node_modules/d3-voronoi/src/Diagram.js":
/*!************************************************!*\
  !*** ./node_modules/d3-voronoi/src/Diagram.js ***!
  \************************************************/
/*! exports provided: epsilon, epsilon2, beaches, cells, circles, edges, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "epsilon", function() { return epsilon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "epsilon2", function() { return epsilon2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beaches", function() { return beaches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cells", function() { return cells; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circles", function() { return circles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "edges", function() { return edges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Diagram; });
/* harmony import */ var _Beach__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Beach */ "./node_modules/d3-voronoi/src/Beach.js");
/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cell */ "./node_modules/d3-voronoi/src/Cell.js");
/* harmony import */ var _Circle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Circle */ "./node_modules/d3-voronoi/src/Circle.js");
/* harmony import */ var _Edge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Edge */ "./node_modules/d3-voronoi/src/Edge.js");
/* harmony import */ var _RedBlackTree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RedBlackTree */ "./node_modules/d3-voronoi/src/RedBlackTree.js");






var epsilon = 1e-6;
var epsilon2 = 1e-12;
var beaches;
var cells;
var circles;
var edges;

function triangleArea(a, b, c) {
  return (a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]);
}

function lexicographic(a, b) {
  return b[1] - a[1]
      || b[0] - a[0];
}

function Diagram(sites, extent) {
  var site = sites.sort(lexicographic).pop(),
      x,
      y,
      circle;

  edges = [];
  cells = new Array(sites.length);
  beaches = new _RedBlackTree__WEBPACK_IMPORTED_MODULE_4__["default"];
  circles = new _RedBlackTree__WEBPACK_IMPORTED_MODULE_4__["default"];

  while (true) {
    circle = _Circle__WEBPACK_IMPORTED_MODULE_2__["firstCircle"];
    if (site && (!circle || site[1] < circle.y || (site[1] === circle.y && site[0] < circle.x))) {
      if (site[0] !== x || site[1] !== y) {
        Object(_Beach__WEBPACK_IMPORTED_MODULE_0__["addBeach"])(site);
        x = site[0], y = site[1];
      }
      site = sites.pop();
    } else if (circle) {
      Object(_Beach__WEBPACK_IMPORTED_MODULE_0__["removeBeach"])(circle.arc);
    } else {
      break;
    }
  }

  Object(_Cell__WEBPACK_IMPORTED_MODULE_1__["sortCellHalfedges"])();

  if (extent) {
    var x0 = +extent[0][0],
        y0 = +extent[0][1],
        x1 = +extent[1][0],
        y1 = +extent[1][1];
    Object(_Edge__WEBPACK_IMPORTED_MODULE_3__["clipEdges"])(x0, y0, x1, y1);
    Object(_Cell__WEBPACK_IMPORTED_MODULE_1__["clipCells"])(x0, y0, x1, y1);
  }

  this.edges = edges;
  this.cells = cells;

  beaches =
  circles =
  edges =
  cells = null;
}

Diagram.prototype = {
  constructor: Diagram,

  polygons: function() {
    var edges = this.edges;

    return this.cells.map(function(cell) {
      var polygon = cell.halfedges.map(function(i) { return Object(_Cell__WEBPACK_IMPORTED_MODULE_1__["cellHalfedgeStart"])(cell, edges[i]); });
      polygon.data = cell.site.data;
      return polygon;
    });
  },

  triangles: function() {
    var triangles = [],
        edges = this.edges;

    this.cells.forEach(function(cell, i) {
      if (!(m = (halfedges = cell.halfedges).length)) return;
      var site = cell.site,
          halfedges,
          j = -1,
          m,
          s0,
          e1 = edges[halfedges[m - 1]],
          s1 = e1.left === site ? e1.right : e1.left;

      while (++j < m) {
        s0 = s1;
        e1 = edges[halfedges[j]];
        s1 = e1.left === site ? e1.right : e1.left;
        if (s0 && s1 && i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
          triangles.push([site.data, s0.data, s1.data]);
        }
      }
    });

    return triangles;
  },

  links: function() {
    return this.edges.filter(function(edge) {
      return edge.right;
    }).map(function(edge) {
      return {
        source: edge.left.data,
        target: edge.right.data
      };
    });
  },

  find: function(x, y, radius) {
    var that = this, i0, i1 = that._found || 0, n = that.cells.length, cell;

    // Use the previously-found cell, or start with an arbitrary one.
    while (!(cell = that.cells[i1])) if (++i1 >= n) return null;
    var dx = x - cell.site[0], dy = y - cell.site[1], d2 = dx * dx + dy * dy;

    // Traverse the half-edges to find a closer cell, if any.
    do {
      cell = that.cells[i0 = i1], i1 = null;
      cell.halfedges.forEach(function(e) {
        var edge = that.edges[e], v = edge.left;
        if ((v === cell.site || !v) && !(v = edge.right)) return;
        var vx = x - v[0], vy = y - v[1], v2 = vx * vx + vy * vy;
        if (v2 < d2) d2 = v2, i1 = v.index;
      });
    } while (i1 !== null);

    that._found = i0;

    return radius == null || d2 <= radius * radius ? cell.site : null;
  }
}


/***/ }),

/***/ "./node_modules/d3-voronoi/src/Edge.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-voronoi/src/Edge.js ***!
  \*********************************************/
/*! exports provided: createEdge, createBorderEdge, setEdgeEnd, clipEdges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEdge", function() { return createEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBorderEdge", function() { return createBorderEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEdgeEnd", function() { return setEdgeEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clipEdges", function() { return clipEdges; });
/* harmony import */ var _Diagram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Diagram */ "./node_modules/d3-voronoi/src/Diagram.js");


function createEdge(left, right, v0, v1) {
  var edge = [null, null],
      index = _Diagram__WEBPACK_IMPORTED_MODULE_0__["edges"].push(edge) - 1;
  edge.left = left;
  edge.right = right;
  if (v0) setEdgeEnd(edge, left, right, v0);
  if (v1) setEdgeEnd(edge, right, left, v1);
  _Diagram__WEBPACK_IMPORTED_MODULE_0__["cells"][left.index].halfedges.push(index);
  _Diagram__WEBPACK_IMPORTED_MODULE_0__["cells"][right.index].halfedges.push(index);
  return edge;
}

function createBorderEdge(left, v0, v1) {
  var edge = [v0, v1];
  edge.left = left;
  return edge;
}

function setEdgeEnd(edge, left, right, vertex) {
  if (!edge[0] && !edge[1]) {
    edge[0] = vertex;
    edge.left = left;
    edge.right = right;
  } else if (edge.left === right) {
    edge[1] = vertex;
  } else {
    edge[0] = vertex;
  }
}

// Liang–Barsky line clipping.
function clipEdge(edge, x0, y0, x1, y1) {
  var a = edge[0],
      b = edge[1],
      ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (!(t0 > 0) && !(t1 < 1)) return true; // TODO Better check?

  if (t0 > 0) edge[0] = [ax + t0 * dx, ay + t0 * dy];
  if (t1 < 1) edge[1] = [ax + t1 * dx, ay + t1 * dy];
  return true;
}

function connectEdge(edge, x0, y0, x1, y1) {
  var v1 = edge[1];
  if (v1) return true;

  var v0 = edge[0],
      left = edge.left,
      right = edge.right,
      lx = left[0],
      ly = left[1],
      rx = right[0],
      ry = right[1],
      fx = (lx + rx) / 2,
      fy = (ly + ry) / 2,
      fm,
      fb;

  if (ry === ly) {
    if (fx < x0 || fx >= x1) return;
    if (lx > rx) {
      if (!v0) v0 = [fx, y0];
      else if (v0[1] >= y1) return;
      v1 = [fx, y1];
    } else {
      if (!v0) v0 = [fx, y1];
      else if (v0[1] < y0) return;
      v1 = [fx, y0];
    }
  } else {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;
    if (fm < -1 || fm > 1) {
      if (lx > rx) {
        if (!v0) v0 = [(y0 - fb) / fm, y0];
        else if (v0[1] >= y1) return;
        v1 = [(y1 - fb) / fm, y1];
      } else {
        if (!v0) v0 = [(y1 - fb) / fm, y1];
        else if (v0[1] < y0) return;
        v1 = [(y0 - fb) / fm, y0];
      }
    } else {
      if (ly < ry) {
        if (!v0) v0 = [x0, fm * x0 + fb];
        else if (v0[0] >= x1) return;
        v1 = [x1, fm * x1 + fb];
      } else {
        if (!v0) v0 = [x1, fm * x1 + fb];
        else if (v0[0] < x0) return;
        v1 = [x0, fm * x0 + fb];
      }
    }
  }

  edge[0] = v0;
  edge[1] = v1;
  return true;
}

function clipEdges(x0, y0, x1, y1) {
  var i = _Diagram__WEBPACK_IMPORTED_MODULE_0__["edges"].length,
      edge;

  while (i--) {
    if (!connectEdge(edge = _Diagram__WEBPACK_IMPORTED_MODULE_0__["edges"][i], x0, y0, x1, y1)
        || !clipEdge(edge, x0, y0, x1, y1)
        || !(Math.abs(edge[0][0] - edge[1][0]) > _Diagram__WEBPACK_IMPORTED_MODULE_0__["epsilon"]
            || Math.abs(edge[0][1] - edge[1][1]) > _Diagram__WEBPACK_IMPORTED_MODULE_0__["epsilon"])) {
      delete _Diagram__WEBPACK_IMPORTED_MODULE_0__["edges"][i];
    }
  }
}


/***/ }),

/***/ "./node_modules/d3-voronoi/src/RedBlackTree.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-voronoi/src/RedBlackTree.js ***!
  \*****************************************************/
/*! exports provided: RedBlackNode, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedBlackNode", function() { return RedBlackNode; });
function RedBlackTree() {
  this._ = null; // root node
}

function RedBlackNode(node) {
  node.U = // parent node
  node.C = // color - true for red, false for black
  node.L = // left node
  node.R = // right node
  node.P = // previous node
  node.N = null; // next node
}

RedBlackTree.prototype = {
  constructor: RedBlackTree,

  insert: function(after, node) {
    var parent, grandpa, uncle;

    if (after) {
      node.P = after;
      node.N = after.N;
      if (after.N) after.N.P = node;
      after.N = node;
      if (after.R) {
        after = after.R;
        while (after.L) after = after.L;
        after.L = node;
      } else {
        after.R = node;
      }
      parent = after;
    } else if (this._) {
      after = RedBlackFirst(this._);
      node.P = null;
      node.N = after;
      after.P = after.L = node;
      parent = after;
    } else {
      node.P = node.N = null;
      this._ = node;
      parent = null;
    }
    node.L = node.R = null;
    node.U = parent;
    node.C = true;

    after = node;
    while (parent && parent.C) {
      grandpa = parent.U;
      if (parent === grandpa.L) {
        uncle = grandpa.R;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.R) {
            RedBlackRotateLeft(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateRight(this, grandpa);
        }
      } else {
        uncle = grandpa.L;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.L) {
            RedBlackRotateRight(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateLeft(this, grandpa);
        }
      }
      parent = after.U;
    }
    this._.C = false;
  },

  remove: function(node) {
    if (node.N) node.N.P = node.P;
    if (node.P) node.P.N = node.N;
    node.N = node.P = null;

    var parent = node.U,
        sibling,
        left = node.L,
        right = node.R,
        next,
        red;

    if (!left) next = right;
    else if (!right) next = left;
    else next = RedBlackFirst(right);

    if (parent) {
      if (parent.L === node) parent.L = next;
      else parent.R = next;
    } else {
      this._ = next;
    }

    if (left && right) {
      red = next.C;
      next.C = node.C;
      next.L = left;
      left.U = next;
      if (next !== right) {
        parent = next.U;
        next.U = node.U;
        node = next.R;
        parent.L = node;
        next.R = right;
        right.U = next;
      } else {
        next.U = parent;
        parent = next;
        node = next.R;
      }
    } else {
      red = node.C;
      node = next;
    }

    if (node) node.U = parent;
    if (red) return;
    if (node && node.C) { node.C = false; return; }

    do {
      if (node === this._) break;
      if (node === parent.L) {
        sibling = parent.R;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateLeft(this, parent);
          sibling = parent.R;
        }
        if ((sibling.L && sibling.L.C)
            || (sibling.R && sibling.R.C)) {
          if (!sibling.R || !sibling.R.C) {
            sibling.L.C = false;
            sibling.C = true;
            RedBlackRotateRight(this, sibling);
            sibling = parent.R;
          }
          sibling.C = parent.C;
          parent.C = sibling.R.C = false;
          RedBlackRotateLeft(this, parent);
          node = this._;
          break;
        }
      } else {
        sibling = parent.L;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateRight(this, parent);
          sibling = parent.L;
        }
        if ((sibling.L && sibling.L.C)
          || (sibling.R && sibling.R.C)) {
          if (!sibling.L || !sibling.L.C) {
            sibling.R.C = false;
            sibling.C = true;
            RedBlackRotateLeft(this, sibling);
            sibling = parent.L;
          }
          sibling.C = parent.C;
          parent.C = sibling.L.C = false;
          RedBlackRotateRight(this, parent);
          node = this._;
          break;
        }
      }
      sibling.C = true;
      node = parent;
      parent = parent.U;
    } while (!node.C);

    if (node) node.C = false;
  }
};

function RedBlackRotateLeft(tree, node) {
  var p = node,
      q = node.R,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.R = q.L;
  if (p.R) p.R.U = p;
  q.L = p;
}

function RedBlackRotateRight(tree, node) {
  var p = node,
      q = node.L,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.L = q.R;
  if (p.L) p.L.U = p;
  q.R = p;
}

function RedBlackFirst(node) {
  while (node.L) node = node.L;
  return node;
}

/* harmony default export */ __webpack_exports__["default"] = (RedBlackTree);


/***/ }),

/***/ "./node_modules/d3-voronoi/src/constant.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-voronoi/src/constant.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "./node_modules/d3-voronoi/src/index.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-voronoi/src/index.js ***!
  \**********************************************/
/*! exports provided: voronoi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _voronoi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./voronoi */ "./node_modules/d3-voronoi/src/voronoi.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "voronoi", function() { return _voronoi__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./node_modules/d3-voronoi/src/point.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-voronoi/src/point.js ***!
  \**********************************************/
/*! exports provided: x, y */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return y; });
function x(d) {
  return d[0];
}

function y(d) {
  return d[1];
}


/***/ }),

/***/ "./node_modules/d3-voronoi/src/voronoi.js":
/*!************************************************!*\
  !*** ./node_modules/d3-voronoi/src/voronoi.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-voronoi/src/constant.js");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ "./node_modules/d3-voronoi/src/point.js");
/* harmony import */ var _Diagram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Diagram */ "./node_modules/d3-voronoi/src/Diagram.js");




/* harmony default export */ __webpack_exports__["default"] = (function() {
  var x = _point__WEBPACK_IMPORTED_MODULE_1__["x"],
      y = _point__WEBPACK_IMPORTED_MODULE_1__["y"],
      extent = null;

  function voronoi(data) {
    return new _Diagram__WEBPACK_IMPORTED_MODULE_2__["default"](data.map(function(d, i) {
      var s = [Math.round(x(d, i, data) / _Diagram__WEBPACK_IMPORTED_MODULE_2__["epsilon"]) * _Diagram__WEBPACK_IMPORTED_MODULE_2__["epsilon"], Math.round(y(d, i, data) / _Diagram__WEBPACK_IMPORTED_MODULE_2__["epsilon"]) * _Diagram__WEBPACK_IMPORTED_MODULE_2__["epsilon"]];
      s.index = i;
      s.data = d;
      return s;
    }), extent);
  }

  voronoi.polygons = function(data) {
    return voronoi(data).polygons();
  };

  voronoi.links = function(data) {
    return voronoi(data).links();
  };

  voronoi.triangles = function(data) {
    return voronoi(data).triangles();
  };

  voronoi.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), voronoi) : x;
  };

  voronoi.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : Object(_constant__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), voronoi) : y;
  };

  voronoi.extent = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
  };

  voronoi.size = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]];
  };

  return voronoi;
});


/***/ }),

/***/ "./node_modules/d3-zoom/src/constant.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-zoom/src/constant.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "./node_modules/d3-zoom/src/event.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-zoom/src/event.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ZoomEvent; });
function ZoomEvent(target, type, transform) {
  this.target = target;
  this.type = type;
  this.transform = transform;
}


/***/ }),

/***/ "./node_modules/d3-zoom/src/index.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-zoom/src/index.js ***!
  \*******************************************/
/*! exports provided: zoom, zoomTransform, zoomIdentity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom.js */ "./node_modules/d3-zoom/src/zoom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoom", function() { return _zoom_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ "./node_modules/d3-zoom/src/transform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoomTransform", function() { return _transform_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoomIdentity", function() { return _transform_js__WEBPACK_IMPORTED_MODULE_1__["identity"]; });





/***/ }),

/***/ "./node_modules/d3-zoom/src/noevent.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-zoom/src/noevent.js ***!
  \*********************************************/
/*! exports provided: nopropagation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nopropagation", function() { return nopropagation; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/index.js");


function nopropagation() {
  d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].stopImmediatePropagation();
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].preventDefault();
  d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].stopImmediatePropagation();
});


/***/ }),

/***/ "./node_modules/d3-zoom/src/transform.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-zoom/src/transform.js ***!
  \***********************************************/
/*! exports provided: Transform, identity, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return Transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return transform; });
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity = new Transform(1, 0, 0);

transform.prototype = Transform.prototype;

function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity;
  return node.__zoom;
}


/***/ }),

/***/ "./node_modules/d3-zoom/src/zoom.js":
/*!******************************************!*\
  !*** ./node_modules/d3-zoom/src/zoom.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ "./node_modules/d3-dispatch/index.js");
/* harmony import */ var d3_drag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-drag */ "./node_modules/d3-drag/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-transition */ "./node_modules/d3-transition/index.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-zoom/src/constant.js");
/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./event.js */ "./node_modules/d3-zoom/src/event.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./transform.js */ "./node_modules/d3-zoom/src/transform.js");
/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./noevent.js */ "./node_modules/d3-zoom/src/noevent.js");










// Ignore right-click, since that should open the context menu.
function defaultFilter() {
  return !d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].ctrlKey && !d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].button;
}

function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}

function defaultTransform() {
  return this.__zoom || _transform_js__WEBPACK_IMPORTED_MODULE_7__["identity"];
}

function defaultWheelDelta() {
  return -d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].deltaY * (d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].deltaMode === 1 ? 0.05 : d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].deltaMode ? 1 : 0.002);
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var filter = defaultFilter,
      extent = defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = d3_interpolate__WEBPACK_IMPORTED_MODULE_2__["interpolateZoom"],
      listeners = Object(d3_dispatch__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("start", "zoom", "end"),
      touchstarting,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled)
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform, point) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k, p) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p);
  };

  zoom.scaleTo = function(selection, k, p) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p);
  };

  zoom.translateBy = function(selection, x, y) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    });
  };

  zoom.translateTo = function(selection, x, y, p) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(_transform_js__WEBPACK_IMPORTED_MODULE_7__["identity"].translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p);
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_7__["Transform"](k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_7__["Transform"](transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, point) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args),
              e = extent.apply(that, args),
              p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new _transform_js__WEBPACK_IMPORTED_MODULE_7__["Transform"](k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args, clean) {
    return (!clean && that.__zooming) || new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }

  Gesture.prototype = {
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["customEvent"])(new _event_js__WEBPACK_IMPORTED_MODULE_6__["default"](zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function wheeled() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["mouse"])(this);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__["interrupt"])(this);
      g.start();
    }

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])();
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var g = gesture(this, arguments, true),
        v = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["mouse"])(this),
        x0 = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].clientX,
        y0 = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].clientY;

    Object(d3_drag__WEBPACK_IMPORTED_MODULE_1__["dragDisable"])(d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].view);
    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["nopropagation"])();
    g.mouse = [p, this.__zoom.invert(p)];
    Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__["interrupt"])(this);
    g.start();

    function mousemoved() {
      Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])();
      if (!g.moved) {
        var dx = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].clientX - x0, dy = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["mouse"])(g.that), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped() {
      v.on("mousemove.zoom mouseup.zoom", null);
      Object(d3_drag__WEBPACK_IMPORTED_MODULE_1__["dragEnable"])(d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].view, g.moved);
      Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])();
      g.end();
    }
  }

  function dblclicked() {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["mouse"])(this),
        p1 = t0.invert(p0),
        k1 = t0.k * (d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments), translateExtent);

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])();
    if (duration > 0) Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).transition().duration(duration).call(schedule, t1, p0);
    else Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).call(zoom.transform, t1);
  }

  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var touches = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].touches,
        n = touches.length,
        g = gesture(this, arguments, d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].changedTouches.length === n),
        started, i, t, p;

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["nopropagation"])();
    for (i = 0; i < n; ++i) {
      t = touches[i], p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["touch"])(this, touches, t.identifier);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }

    if (touchstarting) touchstarting = clearTimeout(touchstarting);

    if (started) {
      if (g.taps < 2) touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      Object(d3_transition__WEBPACK_IMPORTED_MODULE_4__["interrupt"])(this);
      g.start();
    }
  }

  function touchmoved() {
    if (!this.__zooming) return;
    var g = gesture(this, arguments),
        touches = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].changedTouches,
        n = touches.length, i, t, p, l;

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["default"])();
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    g.taps = 0;
    for (i = 0; i < n; ++i) {
      t = touches[i], p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["touch"])(this, touches, t.identifier);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended() {
    if (!this.__zooming) return;
    var g = gesture(this, arguments),
        touches = d3_selection__WEBPACK_IMPORTED_MODULE_3__["event"].changedTouches,
        n = touches.length, i, t;

    Object(_noevent_js__WEBPACK_IMPORTED_MODULE_8__["nopropagation"])();
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        var p = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).on("dblclick.zoom");
        if (p) p.apply(this, arguments);
      }
    }
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__["default"])(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__["default"])(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__["default"])(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_5__["default"])([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  return zoom;
});


/***/ }),

/***/ "./node_modules/d3/dist/package.js":
/*!*****************************************!*\
  !*** ./node_modules/d3/dist/package.js ***!
  \*****************************************/
/*! exports provided: name, version, description, keywords, homepage, license, author, main, unpkg, jsdelivr, module, repository, files, scripts, devDependencies, dependencies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "description", function() { return description; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keywords", function() { return keywords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "homepage", function() { return homepage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "license", function() { return license; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "author", function() { return author; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "main", function() { return main; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpkg", function() { return unpkg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsdelivr", function() { return jsdelivr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "module", function() { return module; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repository", function() { return repository; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "files", function() { return files; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scripts", function() { return scripts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "devDependencies", function() { return devDependencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dependencies", function() { return dependencies; });
var name = "d3";
var version = "5.12.0";
var description = "Data-Driven Documents";
var keywords = ["dom","visualization","svg","animation","canvas"];
var homepage = "https://d3js.org";
var license = "BSD-3-Clause";
var author = {"name":"Mike Bostock","url":"https://bost.ocks.org/mike"};
var main = "dist/d3.node.js";
var unpkg = "dist/d3.min.js";
var jsdelivr = "dist/d3.min.js";
var module = "index.js";
var repository = {"type":"git","url":"https://github.com/d3/d3.git"};
var files = ["dist/**/*.js","index.js"];
var scripts = {"pretest":"rimraf dist && mkdir dist && json2module package.json > dist/package.js && rollup -c","test":"tape 'test/**/*-test.js'","prepublishOnly":"yarn test","postpublish":"git push && git push --tags && cd ../d3.github.com && git pull && cp ../d3/dist/d3.js d3.v5.js && cp ../d3/dist/d3.min.js d3.v5.min.js && git add d3.v5.js d3.v5.min.js && git commit -m \"d3 ${npm_package_version}\" && git push && cd - && cd ../d3-bower && git pull && cp ../d3/LICENSE ../d3/README.md ../d3/dist/d3.js ../d3/dist/d3.min.js . && git add -- LICENSE README.md d3.js d3.min.js && git commit -m \"${npm_package_version}\" && git tag -am \"${npm_package_version}\" v${npm_package_version} && git push && git push --tags && cd - && zip -j dist/d3.zip -- LICENSE README.md API.md CHANGES.md dist/d3.js dist/d3.min.js"};
var devDependencies = {"json2module":"0.0","rimraf":"2","rollup":"1","rollup-plugin-ascii":"0.0","rollup-plugin-node-resolve":"3","rollup-plugin-terser":"5","tape":"4"};
var dependencies = {"d3-array":"1","d3-axis":"1","d3-brush":"1","d3-chord":"1","d3-collection":"1","d3-color":"1","d3-contour":"1","d3-dispatch":"1","d3-drag":"1","d3-dsv":"1","d3-ease":"1","d3-fetch":"1","d3-force":"1","d3-format":"1","d3-geo":"1","d3-hierarchy":"1","d3-interpolate":"1","d3-path":"1","d3-polygon":"1","d3-quadtree":"1","d3-random":"1","d3-scale":"2","d3-scale-chromatic":"1","d3-selection":"1","d3-shape":"1","d3-time":"1","d3-time-format":"2","d3-timer":"1","d3-transition":"1","d3-voronoi":"1","d3-zoom":"1"};


/***/ }),

/***/ "./node_modules/d3/index.js":
/*!**********************************!*\
  !*** ./node_modules/d3/index.js ***!
  \**********************************/
/*! exports provided: version, bisect, bisectRight, bisectLeft, ascending, bisector, cross, descending, deviation, extent, histogram, thresholdFreedmanDiaconis, thresholdScott, thresholdSturges, max, mean, median, merge, min, pairs, permute, quantile, range, scan, shuffle, sum, ticks, tickIncrement, tickStep, transpose, variance, zip, brush, brushX, brushY, brushSelection, nest, set, map, keys, values, entries, color, rgb, hsl, lab, hcl, lch, gray, cubehelix, dispatch, drag, dragDisable, dragEnable, easeLinear, easeQuad, easeQuadIn, easeQuadOut, easeQuadInOut, easeCubic, easeCubicIn, easeCubicOut, easeCubicInOut, easePoly, easePolyIn, easePolyOut, easePolyInOut, easeSin, easeSinIn, easeSinOut, easeSinInOut, easeExp, easeExpIn, easeExpOut, easeExpInOut, easeCircle, easeCircleIn, easeCircleOut, easeCircleInOut, easeBounce, easeBounceIn, easeBounceOut, easeBounceInOut, easeBack, easeBackIn, easeBackOut, easeBackInOut, easeElastic, easeElasticIn, easeElasticOut, easeElasticInOut, forceCenter, forceCollide, forceLink, forceManyBody, forceRadial, forceSimulation, forceX, forceY, formatDefaultLocale, format, formatPrefix, formatLocale, formatSpecifier, precisionFixed, precisionPrefix, precisionRound, cluster, hierarchy, pack, packSiblings, packEnclose, partition, stratify, tree, treemap, treemapBinary, treemapDice, treemapSlice, treemapSliceDice, treemapSquarify, treemapResquarify, interpolate, interpolateArray, interpolateBasis, interpolateBasisClosed, interpolateDate, interpolateDiscrete, interpolateHue, interpolateNumber, interpolateObject, interpolateRound, interpolateString, interpolateTransformCss, interpolateTransformSvg, interpolateZoom, interpolateRgb, interpolateRgbBasis, interpolateRgbBasisClosed, interpolateHsl, interpolateHslLong, interpolateLab, interpolateHcl, interpolateHclLong, interpolateCubehelix, interpolateCubehelixLong, piecewise, quantize, path, quadtree, create, creator, local, matcher, mouse, namespace, namespaces, clientPoint, select, selectAll, selection, selector, selectorAll, style, touch, touches, window, event, customEvent, arc, area, line, pie, areaRadial, radialArea, lineRadial, radialLine, pointRadial, linkHorizontal, linkVertical, linkRadial, symbol, symbols, symbolCircle, symbolCross, symbolDiamond, symbolSquare, symbolStar, symbolTriangle, symbolWye, curveBasisClosed, curveBasisOpen, curveBasis, curveBundle, curveCardinalClosed, curveCardinalOpen, curveCardinal, curveCatmullRomClosed, curveCatmullRomOpen, curveCatmullRom, curveLinearClosed, curveLinear, curveMonotoneX, curveMonotoneY, curveNatural, curveStep, curveStepAfter, curveStepBefore, stack, stackOffsetExpand, stackOffsetDiverging, stackOffsetNone, stackOffsetSilhouette, stackOffsetWiggle, stackOrderAscending, stackOrderDescending, stackOrderInsideOut, stackOrderNone, stackOrderReverse, timeInterval, timeMillisecond, timeMilliseconds, utcMillisecond, utcMilliseconds, timeSecond, timeSeconds, utcSecond, utcSeconds, timeMinute, timeMinutes, timeHour, timeHours, timeDay, timeDays, timeWeek, timeWeeks, timeSunday, timeSundays, timeMonday, timeMondays, timeTuesday, timeTuesdays, timeWednesday, timeWednesdays, timeThursday, timeThursdays, timeFriday, timeFridays, timeSaturday, timeSaturdays, timeMonth, timeMonths, timeYear, timeYears, utcMinute, utcMinutes, utcHour, utcHours, utcDay, utcDays, utcWeek, utcWeeks, utcSunday, utcSundays, utcMonday, utcMondays, utcTuesday, utcTuesdays, utcWednesday, utcWednesdays, utcThursday, utcThursdays, utcFriday, utcFridays, utcSaturday, utcSaturdays, utcMonth, utcMonths, utcYear, utcYears, timeFormatDefaultLocale, timeFormat, timeParse, utcFormat, utcParse, timeFormatLocale, isoFormat, isoParse, now, timer, timerFlush, timeout, interval, transition, active, interrupt, axisTop, axisRight, axisBottom, axisLeft, chord, ribbon, contours, contourDensity, dsvFormat, csvParse, csvParseRows, csvFormat, csvFormatBody, csvFormatRows, tsvParse, tsvParseRows, tsvFormat, tsvFormatBody, tsvFormatRows, autoType, blob, buffer, dsv, csv, tsv, image, json, text, xml, html, svg, geoArea, geoBounds, geoCentroid, geoCircle, geoClipAntimeridian, geoClipCircle, geoClipExtent, geoClipRectangle, geoContains, geoDistance, geoGraticule, geoGraticule10, geoInterpolate, geoLength, geoPath, geoAlbers, geoAlbersUsa, geoAzimuthalEqualArea, geoAzimuthalEqualAreaRaw, geoAzimuthalEquidistant, geoAzimuthalEquidistantRaw, geoConicConformal, geoConicConformalRaw, geoConicEqualArea, geoConicEqualAreaRaw, geoConicEquidistant, geoConicEquidistantRaw, geoEqualEarth, geoEqualEarthRaw, geoEquirectangular, geoEquirectangularRaw, geoGnomonic, geoGnomonicRaw, geoIdentity, geoProjection, geoProjectionMutator, geoMercator, geoMercatorRaw, geoNaturalEarth1, geoNaturalEarth1Raw, geoOrthographic, geoOrthographicRaw, geoStereographic, geoStereographicRaw, geoTransverseMercator, geoTransverseMercatorRaw, geoRotation, geoStream, geoTransform, polygonArea, polygonCentroid, polygonHull, polygonContains, polygonLength, randomUniform, randomNormal, randomLogNormal, randomBates, randomIrwinHall, randomExponential, scaleBand, scalePoint, scaleIdentity, scaleLinear, scaleLog, scaleSymlog, scaleOrdinal, scaleImplicit, scalePow, scaleSqrt, scaleQuantile, scaleQuantize, scaleThreshold, scaleTime, scaleUtc, scaleSequential, scaleSequentialLog, scaleSequentialPow, scaleSequentialSqrt, scaleSequentialSymlog, scaleSequentialQuantile, scaleDiverging, scaleDivergingLog, scaleDivergingPow, scaleDivergingSqrt, scaleDivergingSymlog, tickFormat, schemeCategory10, schemeAccent, schemeDark2, schemePaired, schemePastel1, schemePastel2, schemeSet1, schemeSet2, schemeSet3, schemeTableau10, interpolateBrBG, schemeBrBG, interpolatePRGn, schemePRGn, interpolatePiYG, schemePiYG, interpolatePuOr, schemePuOr, interpolateRdBu, schemeRdBu, interpolateRdGy, schemeRdGy, interpolateRdYlBu, schemeRdYlBu, interpolateRdYlGn, schemeRdYlGn, interpolateSpectral, schemeSpectral, interpolateBuGn, schemeBuGn, interpolateBuPu, schemeBuPu, interpolateGnBu, schemeGnBu, interpolateOrRd, schemeOrRd, interpolatePuBuGn, schemePuBuGn, interpolatePuBu, schemePuBu, interpolatePuRd, schemePuRd, interpolateRdPu, schemeRdPu, interpolateYlGnBu, schemeYlGnBu, interpolateYlGn, schemeYlGn, interpolateYlOrBr, schemeYlOrBr, interpolateYlOrRd, schemeYlOrRd, interpolateBlues, schemeBlues, interpolateGreens, schemeGreens, interpolateGreys, schemeGreys, interpolatePurples, schemePurples, interpolateReds, schemeReds, interpolateOranges, schemeOranges, interpolateCividis, interpolateCubehelixDefault, interpolateRainbow, interpolateWarm, interpolateCool, interpolateSinebow, interpolateTurbo, interpolateViridis, interpolateMagma, interpolateInferno, interpolatePlasma, voronoi, zoom, zoomTransform, zoomIdentity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist_package_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dist/package.js */ "./node_modules/d3/dist/package.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _dist_package_js__WEBPACK_IMPORTED_MODULE_0__["version"]; });

/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bisect", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["bisect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bisectRight", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["bisectRight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bisectLeft", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["bisectLeft"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ascending", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["ascending"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bisector", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["bisector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["cross"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "descending", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["descending"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deviation", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["deviation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extent", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["extent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "histogram", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["histogram"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "thresholdFreedmanDiaconis", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["thresholdFreedmanDiaconis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "thresholdScott", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["thresholdScott"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "thresholdSturges", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["thresholdSturges"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "max", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["max"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mean", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["mean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "median", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["median"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["merge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "min", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["min"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pairs", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["pairs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "permute", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["permute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quantile", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["quantile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "range", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["range"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["scan"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["shuffle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sum", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["sum"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ticks", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["ticks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tickIncrement", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["tickIncrement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tickStep", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["tickStep"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["transpose"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "variance", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["variance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return d3_array__WEBPACK_IMPORTED_MODULE_1__["zip"]; });

/* harmony import */ var d3_axis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-axis */ "./node_modules/d3-axis/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "axisTop", function() { return d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisTop"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "axisRight", function() { return d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisRight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "axisBottom", function() { return d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisBottom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "axisLeft", function() { return d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisLeft"]; });

/* harmony import */ var d3_brush__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-brush */ "./node_modules/d3-brush/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "brush", function() { return d3_brush__WEBPACK_IMPORTED_MODULE_3__["brush"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "brushX", function() { return d3_brush__WEBPACK_IMPORTED_MODULE_3__["brushX"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "brushY", function() { return d3_brush__WEBPACK_IMPORTED_MODULE_3__["brushY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "brushSelection", function() { return d3_brush__WEBPACK_IMPORTED_MODULE_3__["brushSelection"]; });

/* harmony import */ var d3_chord__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-chord */ "./node_modules/d3-chord/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "chord", function() { return d3_chord__WEBPACK_IMPORTED_MODULE_4__["chord"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ribbon", function() { return d3_chord__WEBPACK_IMPORTED_MODULE_4__["ribbon"]; });

/* harmony import */ var d3_collection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-collection */ "./node_modules/d3-collection/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nest", function() { return d3_collection__WEBPACK_IMPORTED_MODULE_5__["nest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "set", function() { return d3_collection__WEBPACK_IMPORTED_MODULE_5__["set"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "map", function() { return d3_collection__WEBPACK_IMPORTED_MODULE_5__["map"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return d3_collection__WEBPACK_IMPORTED_MODULE_5__["keys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "values", function() { return d3_collection__WEBPACK_IMPORTED_MODULE_5__["values"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entries", function() { return d3_collection__WEBPACK_IMPORTED_MODULE_5__["entries"]; });

/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "color", function() { return d3_color__WEBPACK_IMPORTED_MODULE_6__["color"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return d3_color__WEBPACK_IMPORTED_MODULE_6__["rgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return d3_color__WEBPACK_IMPORTED_MODULE_6__["hsl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lab", function() { return d3_color__WEBPACK_IMPORTED_MODULE_6__["lab"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hcl", function() { return d3_color__WEBPACK_IMPORTED_MODULE_6__["hcl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lch", function() { return d3_color__WEBPACK_IMPORTED_MODULE_6__["lch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "gray", function() { return d3_color__WEBPACK_IMPORTED_MODULE_6__["gray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cubehelix", function() { return d3_color__WEBPACK_IMPORTED_MODULE_6__["cubehelix"]; });

/* harmony import */ var d3_contour__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-contour */ "./node_modules/d3-contour/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contours", function() { return d3_contour__WEBPACK_IMPORTED_MODULE_7__["contours"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contourDensity", function() { return d3_contour__WEBPACK_IMPORTED_MODULE_7__["contourDensity"]; });

/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! d3-dispatch */ "./node_modules/d3-dispatch/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return d3_dispatch__WEBPACK_IMPORTED_MODULE_8__["dispatch"]; });

/* harmony import */ var d3_drag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! d3-drag */ "./node_modules/d3-drag/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drag", function() { return d3_drag__WEBPACK_IMPORTED_MODULE_9__["drag"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dragDisable", function() { return d3_drag__WEBPACK_IMPORTED_MODULE_9__["dragDisable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dragEnable", function() { return d3_drag__WEBPACK_IMPORTED_MODULE_9__["dragEnable"]; });

/* harmony import */ var d3_dsv__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! d3-dsv */ "./node_modules/d3-dsv/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dsvFormat", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["dsvFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvParse", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["csvParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvParseRows", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["csvParseRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormat", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["csvFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormatBody", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["csvFormatBody"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormatRows", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["csvFormatRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvParse", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["tsvParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvParseRows", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["tsvParseRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormat", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["tsvFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormatBody", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["tsvFormatBody"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormatRows", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["tsvFormatRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "autoType", function() { return d3_dsv__WEBPACK_IMPORTED_MODULE_10__["autoType"]; });

/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! d3-ease */ "./node_modules/d3-ease/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeLinear", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeLinear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuad", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeQuad"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuadIn", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeQuadIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuadOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeQuadOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuadInOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeQuadInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubic", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeCubic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubicIn", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeCubicIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubicOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeCubicOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubicInOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeCubicInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePoly", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easePoly"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePolyIn", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easePolyIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePolyOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easePolyOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePolyInOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easePolyInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSin", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeSin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSinIn", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeSinIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSinOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeSinOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSinInOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeSinInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExp", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeExp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExpIn", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeExpIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExpOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeExpOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExpInOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeExpInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircle", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeCircle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircleIn", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeCircleIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircleOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeCircleOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircleInOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeCircleInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounce", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeBounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounceIn", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeBounceIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounceOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeBounceOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounceInOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeBounceInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBack", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeBack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBackIn", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeBackIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBackOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeBackOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBackInOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeBackInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElastic", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeElastic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElasticIn", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeElasticIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElasticOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeElasticOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElasticInOut", function() { return d3_ease__WEBPACK_IMPORTED_MODULE_11__["easeElasticInOut"]; });

/* harmony import */ var d3_fetch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! d3-fetch */ "./node_modules/d3-fetch/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "blob", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["blob"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buffer", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["buffer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dsv", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["dsv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csv", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["csv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsv", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["tsv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "image", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["image"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "json", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["json"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "text", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["text"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "xml", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["xml"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return d3_fetch__WEBPACK_IMPORTED_MODULE_12__["svg"]; });

/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! d3-force */ "./node_modules/d3-force/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forceCenter", function() { return d3_force__WEBPACK_IMPORTED_MODULE_13__["forceCenter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forceCollide", function() { return d3_force__WEBPACK_IMPORTED_MODULE_13__["forceCollide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forceLink", function() { return d3_force__WEBPACK_IMPORTED_MODULE_13__["forceLink"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forceManyBody", function() { return d3_force__WEBPACK_IMPORTED_MODULE_13__["forceManyBody"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forceRadial", function() { return d3_force__WEBPACK_IMPORTED_MODULE_13__["forceRadial"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forceSimulation", function() { return d3_force__WEBPACK_IMPORTED_MODULE_13__["forceSimulation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forceX", function() { return d3_force__WEBPACK_IMPORTED_MODULE_13__["forceX"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forceY", function() { return d3_force__WEBPACK_IMPORTED_MODULE_13__["forceY"]; });

/* harmony import */ var d3_format__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! d3-format */ "./node_modules/d3-format/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatDefaultLocale", function() { return d3_format__WEBPACK_IMPORTED_MODULE_14__["formatDefaultLocale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "format", function() { return d3_format__WEBPACK_IMPORTED_MODULE_14__["format"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatPrefix", function() { return d3_format__WEBPACK_IMPORTED_MODULE_14__["formatPrefix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatLocale", function() { return d3_format__WEBPACK_IMPORTED_MODULE_14__["formatLocale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatSpecifier", function() { return d3_format__WEBPACK_IMPORTED_MODULE_14__["formatSpecifier"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "precisionFixed", function() { return d3_format__WEBPACK_IMPORTED_MODULE_14__["precisionFixed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "precisionPrefix", function() { return d3_format__WEBPACK_IMPORTED_MODULE_14__["precisionPrefix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "precisionRound", function() { return d3_format__WEBPACK_IMPORTED_MODULE_14__["precisionRound"]; });

/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoArea", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoArea"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoBounds", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoBounds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoCentroid", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoCentroid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoCircle", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoCircle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipAntimeridian", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoClipAntimeridian"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipCircle", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoClipCircle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipExtent", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoClipExtent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipRectangle", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoClipRectangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoContains", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoContains"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoDistance", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoDistance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGraticule", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoGraticule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGraticule10", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoGraticule10"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoInterpolate", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoInterpolate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoLength", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoLength"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoPath", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAlbers", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoAlbers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAlbersUsa", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoAlbersUsa"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEqualArea", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoAzimuthalEqualArea"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEqualAreaRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoAzimuthalEqualAreaRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEquidistant", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoAzimuthalEquidistant"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEquidistantRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoAzimuthalEquidistantRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicConformal", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoConicConformal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicConformalRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoConicConformalRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEqualArea", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoConicEqualArea"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEqualAreaRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoConicEqualAreaRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEquidistant", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoConicEquidistant"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEquidistantRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoConicEquidistantRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEqualEarth", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoEqualEarth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEqualEarthRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoEqualEarthRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEquirectangular", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoEquirectangular"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEquirectangularRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoEquirectangularRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGnomonic", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoGnomonic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGnomonicRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoGnomonicRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoIdentity", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoIdentity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoProjection", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoProjection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoProjectionMutator", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoProjectionMutator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoMercator", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoMercator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoMercatorRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoMercatorRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoNaturalEarth1", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoNaturalEarth1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoNaturalEarth1Raw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoNaturalEarth1Raw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoOrthographic", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoOrthographic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoOrthographicRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoOrthographicRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoStereographic", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoStereographic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoStereographicRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoStereographicRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoTransverseMercator", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoTransverseMercator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoTransverseMercatorRaw", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoTransverseMercatorRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoRotation", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoRotation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoStream", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoStream"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoTransform", function() { return d3_geo__WEBPACK_IMPORTED_MODULE_15__["geoTransform"]; });

/* harmony import */ var d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! d3-hierarchy */ "./node_modules/d3-hierarchy/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cluster", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["cluster"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hierarchy", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["hierarchy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pack", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["pack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "packSiblings", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["packSiblings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "packEnclose", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["packEnclose"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "partition", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["partition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stratify", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["stratify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tree", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["tree"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "treemap", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["treemap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "treemapBinary", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["treemapBinary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "treemapDice", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["treemapDice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "treemapSlice", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["treemapSlice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "treemapSliceDice", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["treemapSliceDice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "treemapSquarify", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["treemapSquarify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "treemapResquarify", function() { return d3_hierarchy__WEBPACK_IMPORTED_MODULE_16__["treemapResquarify"]; });

/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateArray", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBasis", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateBasis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBasisClosed", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateBasisClosed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateDate", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateDate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateDiscrete", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateDiscrete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHue", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateHue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateNumber", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateObject", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRound", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateRound"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateString", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateTransformCss"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateTransformSvg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateZoom", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateZoom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgb", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateRgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasis", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateRgbBasis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasisClosed", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateRgbBasisClosed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHsl", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateHsl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHslLong", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateHslLong"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateLab", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateLab"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHcl", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateHcl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHclLong", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateHclLong"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelix", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateCubehelix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelixLong", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["interpolateCubehelixLong"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "piecewise", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["piecewise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quantize", function() { return d3_interpolate__WEBPACK_IMPORTED_MODULE_17__["quantize"]; });

/* harmony import */ var d3_path__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! d3-path */ "./node_modules/d3-path/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "path", function() { return d3_path__WEBPACK_IMPORTED_MODULE_18__["path"]; });

/* harmony import */ var d3_polygon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! d3-polygon */ "./node_modules/d3-polygon/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonArea", function() { return d3_polygon__WEBPACK_IMPORTED_MODULE_19__["polygonArea"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonCentroid", function() { return d3_polygon__WEBPACK_IMPORTED_MODULE_19__["polygonCentroid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonHull", function() { return d3_polygon__WEBPACK_IMPORTED_MODULE_19__["polygonHull"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonContains", function() { return d3_polygon__WEBPACK_IMPORTED_MODULE_19__["polygonContains"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "polygonLength", function() { return d3_polygon__WEBPACK_IMPORTED_MODULE_19__["polygonLength"]; });

/* harmony import */ var d3_quadtree__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! d3-quadtree */ "./node_modules/d3-quadtree/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quadtree", function() { return d3_quadtree__WEBPACK_IMPORTED_MODULE_20__["quadtree"]; });

/* harmony import */ var d3_random__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! d3-random */ "./node_modules/d3-random/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomUniform", function() { return d3_random__WEBPACK_IMPORTED_MODULE_21__["randomUniform"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomNormal", function() { return d3_random__WEBPACK_IMPORTED_MODULE_21__["randomNormal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomLogNormal", function() { return d3_random__WEBPACK_IMPORTED_MODULE_21__["randomLogNormal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomBates", function() { return d3_random__WEBPACK_IMPORTED_MODULE_21__["randomBates"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomIrwinHall", function() { return d3_random__WEBPACK_IMPORTED_MODULE_21__["randomIrwinHall"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomExponential", function() { return d3_random__WEBPACK_IMPORTED_MODULE_21__["randomExponential"]; });

/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3/node_modules/d3-scale/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleBand", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleBand"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scalePoint", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scalePoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleIdentity", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleIdentity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleLinear", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleLinear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleLog", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleLog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSymlog", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleSymlog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleOrdinal", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleOrdinal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleImplicit", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleImplicit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scalePow", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scalePow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSqrt", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleSqrt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleQuantile", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleQuantile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleQuantize", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleQuantize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleThreshold", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleThreshold"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleTime", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleUtc", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleUtc"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequential", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleSequential"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialLog", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleSequentialLog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialPow", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleSequentialPow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialSqrt", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleSequentialSqrt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialSymlog", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleSequentialSymlog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialQuantile", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleSequentialQuantile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDiverging", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleDiverging"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDivergingLog", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleDivergingLog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDivergingPow", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleDivergingPow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDivergingSqrt", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleDivergingSqrt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDivergingSymlog", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["scaleDivergingSymlog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tickFormat", function() { return d3_scale__WEBPACK_IMPORTED_MODULE_22__["tickFormat"]; });

/* harmony import */ var d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! d3-scale-chromatic */ "./node_modules/d3-scale-chromatic/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeCategory10", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeCategory10"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeAccent", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeAccent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeDark2", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeDark2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePaired", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePaired"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePastel1", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePastel1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePastel2", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePastel2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSet1", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeSet1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSet2", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeSet2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSet3", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeSet3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeTableau10", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeTableau10"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBrBG", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateBrBG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBrBG", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeBrBG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePRGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolatePRGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePRGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePRGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePiYG", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolatePiYG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePiYG", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePiYG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuOr", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolatePuOr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuOr", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePuOr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateRdBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeRdBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdGy", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateRdGy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdGy", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeRdGy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdYlBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateRdYlBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdYlBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeRdYlBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdYlGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateRdYlGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdYlGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeRdYlGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateSpectral", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateSpectral"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSpectral", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeSpectral"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBuGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateBuGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBuGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeBuGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBuPu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateBuPu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBuPu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeBuPu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateGnBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateGnBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeGnBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeGnBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateOrRd", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateOrRd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeOrRd", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeOrRd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuBuGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolatePuBuGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuBuGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePuBuGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolatePuBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePuBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuRd", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolatePuRd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuRd", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePuRd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdPu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateRdPu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdPu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeRdPu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlGnBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateYlGnBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlGnBu", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeYlGnBu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateYlGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlGn", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeYlGn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlOrBr", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateYlOrBr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlOrBr", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeYlOrBr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlOrRd", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateYlOrRd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlOrRd", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeYlOrRd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBlues", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateBlues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBlues", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeBlues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateGreens", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateGreens"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeGreens", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeGreens"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateGreys", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateGreys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeGreys", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeGreys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePurples", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolatePurples"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePurples", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemePurples"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateReds", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateReds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeReds", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeReds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateOranges", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateOranges"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeOranges", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["schemeOranges"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCividis", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateCividis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelixDefault", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateCubehelixDefault"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRainbow", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateRainbow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateWarm", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateWarm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCool", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateCool"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateSinebow", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateSinebow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTurbo", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateTurbo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateViridis", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateViridis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateMagma", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateMagma"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateInferno", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolateInferno"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePlasma", function() { return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_23__["interpolatePlasma"]; });

/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "create", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["create"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "creator", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["creator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "local", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["local"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matcher", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["matcher"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouse", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["mouse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "namespace", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["namespace"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "namespaces", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["namespaces"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clientPoint", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["clientPoint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["select"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectAll", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["selectAll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selection", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["selection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selector", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["selector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectorAll", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["selectorAll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "style", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["style"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "touch", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["touch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "touches", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["touches"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "window", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["window"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "event", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["event"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customEvent", function() { return d3_selection__WEBPACK_IMPORTED_MODULE_24__["customEvent"]; });

/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! d3-shape */ "./node_modules/d3-shape/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arc", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["arc"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "area", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["area"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "line", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["line"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pie", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["pie"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "areaRadial", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["areaRadial"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "radialArea", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["radialArea"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lineRadial", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["lineRadial"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "radialLine", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["radialLine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pointRadial", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["pointRadial"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "linkHorizontal", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["linkHorizontal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "linkVertical", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["linkVertical"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "linkRadial", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["linkRadial"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbol", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["symbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbols", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["symbols"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbolCircle", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["symbolCircle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbolCross", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["symbolCross"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbolDiamond", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["symbolDiamond"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbolSquare", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["symbolSquare"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbolStar", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["symbolStar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbolTriangle", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["symbolTriangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbolWye", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["symbolWye"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveBasisClosed", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveBasisClosed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveBasisOpen", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveBasisOpen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveBasis", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveBasis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveBundle", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveBundle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveCardinalClosed", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveCardinalClosed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveCardinalOpen", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveCardinalOpen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveCardinal", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveCardinal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRomClosed", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveCatmullRomClosed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRomOpen", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveCatmullRomOpen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRom", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveCatmullRom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveLinearClosed", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveLinearClosed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveLinear", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveLinear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveMonotoneX", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveMonotoneX"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveMonotoneY", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveMonotoneY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveNatural", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveNatural"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveStep", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveStep"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveStepAfter", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveStepAfter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curveStepBefore", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["curveStepBefore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stack", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOffsetExpand", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOffsetExpand"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOffsetDiverging", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOffsetDiverging"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOffsetNone", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOffsetNone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOffsetSilhouette", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOffsetSilhouette"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOffsetWiggle", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOffsetWiggle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOrderAscending", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOrderAscending"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOrderDescending", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOrderDescending"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOrderInsideOut", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOrderInsideOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOrderNone", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOrderNone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackOrderReverse", function() { return d3_shape__WEBPACK_IMPORTED_MODULE_25__["stackOrderReverse"]; });

/* harmony import */ var d3_time__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! d3-time */ "./node_modules/d3-time/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeInterval", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeMillisecond", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeMillisecond"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeMilliseconds", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeMilliseconds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcMillisecond", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcMillisecond"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcMilliseconds", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcMilliseconds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeSecond", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeSecond"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeSeconds", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeSeconds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcSecond", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcSecond"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcSeconds", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcSeconds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeMinute", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeMinute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeMinutes", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeMinutes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeHour", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeHour"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeHours", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeHours"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeDay", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeDay"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeDays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeDays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeWeek", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeWeek"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeWeeks", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeWeeks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeSunday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeSunday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeSundays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeSundays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeMonday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeMonday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeMondays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeMondays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeTuesday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeTuesday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeTuesdays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeTuesdays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeWednesday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeWednesday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeWednesdays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeWednesdays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeThursday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeThursday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeThursdays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeThursdays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeFriday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeFriday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeFridays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeFridays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeSaturday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeSaturday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeSaturdays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeSaturdays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeMonth", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeMonth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeMonths", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeMonths"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeYear", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeYear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeYears", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["timeYears"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcMinute", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcMinute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcMinutes", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcMinutes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcHour", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcHour"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcHours", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcHours"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcDay", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcDay"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcDays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcDays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcWeek", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcWeek"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcWeeks", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcWeeks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcSunday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcSunday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcSundays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcSundays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcMonday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcMonday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcMondays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcMondays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcTuesday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcTuesday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcTuesdays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcTuesdays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcWednesday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcWednesday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcWednesdays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcWednesdays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcThursday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcThursday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcThursdays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcThursdays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcFriday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcFriday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcFridays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcFridays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcSaturday", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcSaturday"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcSaturdays", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcSaturdays"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcMonth", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcMonth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcMonths", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcMonths"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcYear", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcYear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcYears", function() { return d3_time__WEBPACK_IMPORTED_MODULE_26__["utcYears"]; });

/* harmony import */ var d3_time_format__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! d3-time-format */ "./node_modules/d3-time-format/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeFormatDefaultLocale", function() { return d3_time_format__WEBPACK_IMPORTED_MODULE_27__["timeFormatDefaultLocale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeFormat", function() { return d3_time_format__WEBPACK_IMPORTED_MODULE_27__["timeFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeParse", function() { return d3_time_format__WEBPACK_IMPORTED_MODULE_27__["timeParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcFormat", function() { return d3_time_format__WEBPACK_IMPORTED_MODULE_27__["utcFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "utcParse", function() { return d3_time_format__WEBPACK_IMPORTED_MODULE_27__["utcParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeFormatLocale", function() { return d3_time_format__WEBPACK_IMPORTED_MODULE_27__["timeFormatLocale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isoFormat", function() { return d3_time_format__WEBPACK_IMPORTED_MODULE_27__["isoFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isoParse", function() { return d3_time_format__WEBPACK_IMPORTED_MODULE_27__["isoParse"]; });

/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "now", function() { return d3_timer__WEBPACK_IMPORTED_MODULE_28__["now"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return d3_timer__WEBPACK_IMPORTED_MODULE_28__["timer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timerFlush", function() { return d3_timer__WEBPACK_IMPORTED_MODULE_28__["timerFlush"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeout", function() { return d3_timer__WEBPACK_IMPORTED_MODULE_28__["timeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return d3_timer__WEBPACK_IMPORTED_MODULE_28__["interval"]; });

/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! d3-transition */ "./node_modules/d3-transition/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transition", function() { return d3_transition__WEBPACK_IMPORTED_MODULE_29__["transition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "active", function() { return d3_transition__WEBPACK_IMPORTED_MODULE_29__["active"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interrupt", function() { return d3_transition__WEBPACK_IMPORTED_MODULE_29__["interrupt"]; });

/* harmony import */ var d3_voronoi__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! d3-voronoi */ "./node_modules/d3-voronoi/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "voronoi", function() { return d3_voronoi__WEBPACK_IMPORTED_MODULE_30__["voronoi"]; });

/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! d3-zoom */ "./node_modules/d3-zoom/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoom", function() { return d3_zoom__WEBPACK_IMPORTED_MODULE_31__["zoom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoomTransform", function() { return d3_zoom__WEBPACK_IMPORTED_MODULE_31__["zoomTransform"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoomIdentity", function() { return d3_zoom__WEBPACK_IMPORTED_MODULE_31__["zoomIdentity"]; });



































/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/array.js":
/*!************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/array.js ***!
  \************************************************************/
/*! exports provided: map, slice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return slice; });
var array = Array.prototype;

var map = array.map;
var slice = array.slice;


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/band.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/band.js ***!
  \***********************************************************/
/*! exports provided: default, point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return band; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "point", function() { return point; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");
/* harmony import */ var _ordinal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ordinal */ "./node_modules/d3/node_modules/d3-scale/src/ordinal.js");




function band() {
  var scale = Object(_ordinal__WEBPACK_IMPORTED_MODULE_2__["default"])().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      range = [0, 1],
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = range[1] < range[0],
        start = range[reverse - 0],
        stop = range[1 - reverse];
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = [+_[0], +_[1]], round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), range)
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__["initRange"].apply(rescale(), arguments);
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/constant.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/constant.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/continuous.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/continuous.js ***!
  \*****************************************************************/
/*! exports provided: identity, copy, transformer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformer", function() { return transformer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return continuous; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/index.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array */ "./node_modules/d3/node_modules/d3-scale/src/array.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constant */ "./node_modules/d3/node_modules/d3-scale/src/constant.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number */ "./node_modules/d3/node_modules/d3-scale/src/number.js");






var unit = [0, 1];

function identity(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : Object(_constant__WEBPACK_IMPORTED_MODULE_3__["default"])(isNaN(b) ? NaN : 0.5);
}

function clamper(domain) {
  var a = domain[0], b = domain[domain.length - 1], t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["bisect"])(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer() {
  var domain = unit,
      range = unit,
      interpolate = d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolate"],
      transform,
      untransform,
      unknown,
      clamp = identity,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateNumber"])))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = _array__WEBPACK_IMPORTED_MODULE_2__["map"].call(_, _number__WEBPACK_IMPORTED_MODULE_4__["default"]), clamp === identity || (clamp = clamper(domain)), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = _array__WEBPACK_IMPORTED_MODULE_2__["slice"].call(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = _array__WEBPACK_IMPORTED_MODULE_2__["slice"].call(_), interpolate = d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateRound"], rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? clamper(domain) : identity, scale) : clamp !== identity;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous(transform, untransform) {
  return transformer()(transform, untransform);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/diverging.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/diverging.js ***!
  \****************************************************************/
/*! exports provided: default, divergingLog, divergingSymlog, divergingPow, divergingSqrt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return diverging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divergingLog", function() { return divergingLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divergingSymlog", function() { return divergingSymlog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divergingPow", function() { return divergingPow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divergingSqrt", function() { return divergingSqrt; });
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./continuous */ "./node_modules/d3/node_modules/d3-scale/src/continuous.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linear */ "./node_modules/d3/node_modules/d3-scale/src/linear.js");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./log */ "./node_modules/d3/node_modules/d3-scale/src/log.js");
/* harmony import */ var _sequential__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sequential */ "./node_modules/d3/node_modules/d3-scale/src/sequential.js");
/* harmony import */ var _symlog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./symlog */ "./node_modules/d3/node_modules/d3-scale/src/symlog.js");
/* harmony import */ var _pow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pow */ "./node_modules/d3/node_modules/d3-scale/src/pow.js");








function transformer() {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      t0,
      t1,
      t2,
      k10,
      k21,
      interpolator = _continuous__WEBPACK_IMPORTED_MODULE_0__["identity"],
      transform,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (x < t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), t2 = transform(x2 = +_[2]), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), scale) : [x0, x1, x2];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1);
    return scale;
  };
}

function diverging() {
  var scale = Object(_linear__WEBPACK_IMPORTED_MODULE_2__["linearish"])(transformer()(_continuous__WEBPACK_IMPORTED_MODULE_0__["identity"]));

  scale.copy = function() {
    return Object(_sequential__WEBPACK_IMPORTED_MODULE_4__["copy"])(scale, diverging());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__["initInterpolator"].apply(scale, arguments);
}

function divergingLog() {
  var scale = Object(_log__WEBPACK_IMPORTED_MODULE_3__["loggish"])(transformer()).domain([0.1, 1, 10]);

  scale.copy = function() {
    return Object(_sequential__WEBPACK_IMPORTED_MODULE_4__["copy"])(scale, divergingLog()).base(scale.base());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__["initInterpolator"].apply(scale, arguments);
}

function divergingSymlog() {
  var scale = Object(_symlog__WEBPACK_IMPORTED_MODULE_5__["symlogish"])(transformer());

  scale.copy = function() {
    return Object(_sequential__WEBPACK_IMPORTED_MODULE_4__["copy"])(scale, divergingSymlog()).constant(scale.constant());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__["initInterpolator"].apply(scale, arguments);
}

function divergingPow() {
  var scale = Object(_pow__WEBPACK_IMPORTED_MODULE_6__["powish"])(transformer());

  scale.copy = function() {
    return Object(_sequential__WEBPACK_IMPORTED_MODULE_4__["copy"])(scale, divergingPow()).exponent(scale.exponent());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__["initInterpolator"].apply(scale, arguments);
}

function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/identity.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/identity.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return identity; });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./node_modules/d3/node_modules/d3-scale/src/array.js");
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./linear */ "./node_modules/d3/node_modules/d3-scale/src/linear.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./number */ "./node_modules/d3/node_modules/d3-scale/src/number.js");




function identity(domain) {
  var unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = _array__WEBPACK_IMPORTED_MODULE_0__["map"].call(_, _number__WEBPACK_IMPORTED_MODULE_2__["default"]), scale) : domain.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return identity(domain).unknown(unknown);
  };

  domain = arguments.length ? _array__WEBPACK_IMPORTED_MODULE_0__["map"].call(domain, _number__WEBPACK_IMPORTED_MODULE_2__["default"]) : [0, 1];

  return Object(_linear__WEBPACK_IMPORTED_MODULE_1__["linearish"])(scale);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/index.js":
/*!************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/index.js ***!
  \************************************************************/
/*! exports provided: scaleBand, scalePoint, scaleIdentity, scaleLinear, scaleLog, scaleSymlog, scaleOrdinal, scaleImplicit, scalePow, scaleSqrt, scaleQuantile, scaleQuantize, scaleThreshold, scaleTime, scaleUtc, scaleSequential, scaleSequentialLog, scaleSequentialPow, scaleSequentialSqrt, scaleSequentialSymlog, scaleSequentialQuantile, scaleDiverging, scaleDivergingLog, scaleDivergingPow, scaleDivergingSqrt, scaleDivergingSymlog, tickFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _band__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./band */ "./node_modules/d3/node_modules/d3-scale/src/band.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleBand", function() { return _band__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scalePoint", function() { return _band__WEBPACK_IMPORTED_MODULE_0__["point"]; });

/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./identity */ "./node_modules/d3/node_modules/d3-scale/src/identity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleIdentity", function() { return _identity__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linear */ "./node_modules/d3/node_modules/d3-scale/src/linear.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleLinear", function() { return _linear__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./log */ "./node_modules/d3/node_modules/d3-scale/src/log.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleLog", function() { return _log__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _symlog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./symlog */ "./node_modules/d3/node_modules/d3-scale/src/symlog.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSymlog", function() { return _symlog__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _ordinal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ordinal */ "./node_modules/d3/node_modules/d3-scale/src/ordinal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleOrdinal", function() { return _ordinal__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleImplicit", function() { return _ordinal__WEBPACK_IMPORTED_MODULE_5__["implicit"]; });

/* harmony import */ var _pow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pow */ "./node_modules/d3/node_modules/d3-scale/src/pow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scalePow", function() { return _pow__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSqrt", function() { return _pow__WEBPACK_IMPORTED_MODULE_6__["sqrt"]; });

/* harmony import */ var _quantile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./quantile */ "./node_modules/d3/node_modules/d3-scale/src/quantile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleQuantile", function() { return _quantile__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _quantize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./quantize */ "./node_modules/d3/node_modules/d3-scale/src/quantize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleQuantize", function() { return _quantize__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _threshold__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./threshold */ "./node_modules/d3/node_modules/d3-scale/src/threshold.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleThreshold", function() { return _threshold__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./time */ "./node_modules/d3/node_modules/d3-scale/src/time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleTime", function() { return _time__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _utcTime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utcTime */ "./node_modules/d3/node_modules/d3-scale/src/utcTime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleUtc", function() { return _utcTime__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _sequential__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sequential */ "./node_modules/d3/node_modules/d3-scale/src/sequential.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequential", function() { return _sequential__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialLog", function() { return _sequential__WEBPACK_IMPORTED_MODULE_12__["sequentialLog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialPow", function() { return _sequential__WEBPACK_IMPORTED_MODULE_12__["sequentialPow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialSqrt", function() { return _sequential__WEBPACK_IMPORTED_MODULE_12__["sequentialSqrt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialSymlog", function() { return _sequential__WEBPACK_IMPORTED_MODULE_12__["sequentialSymlog"]; });

/* harmony import */ var _sequentialQuantile__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./sequentialQuantile */ "./node_modules/d3/node_modules/d3-scale/src/sequentialQuantile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleSequentialQuantile", function() { return _sequentialQuantile__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _diverging__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./diverging */ "./node_modules/d3/node_modules/d3-scale/src/diverging.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDiverging", function() { return _diverging__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDivergingLog", function() { return _diverging__WEBPACK_IMPORTED_MODULE_14__["divergingLog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDivergingPow", function() { return _diverging__WEBPACK_IMPORTED_MODULE_14__["divergingPow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDivergingSqrt", function() { return _diverging__WEBPACK_IMPORTED_MODULE_14__["divergingSqrt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaleDivergingSymlog", function() { return _diverging__WEBPACK_IMPORTED_MODULE_14__["divergingSymlog"]; });

/* harmony import */ var _tickFormat__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tickFormat */ "./node_modules/d3/node_modules/d3-scale/src/tickFormat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tickFormat", function() { return _tickFormat__WEBPACK_IMPORTED_MODULE_15__["default"]; });


































/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/init.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/init.js ***!
  \***********************************************************/
/*! exports provided: initRange, initInterpolator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initRange", function() { return initRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initInterpolator", function() { return initInterpolator; });
function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.interpolator(domain); break;
    default: this.interpolator(interpolator).domain(domain); break;
  }
  return this;
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/linear.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/linear.js ***!
  \*************************************************************/
/*! exports provided: linearish, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linearish", function() { return linearish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return linear; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./continuous */ "./node_modules/d3/node_modules/d3-scale/src/continuous.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");
/* harmony import */ var _tickFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tickFormat */ "./node_modules/d3/node_modules/d3-scale/src/tickFormat.js");





function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["ticks"])(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return Object(_tickFormat__WEBPACK_IMPORTED_MODULE_3__["default"])(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["tickIncrement"])(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["tickIncrement"])(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["tickIncrement"])(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = Object(_continuous__WEBPACK_IMPORTED_MODULE_1__["default"])(_continuous__WEBPACK_IMPORTED_MODULE_1__["identity"], _continuous__WEBPACK_IMPORTED_MODULE_1__["identity"]);

  scale.copy = function() {
    return Object(_continuous__WEBPACK_IMPORTED_MODULE_1__["copy"])(scale, linear());
  };

  _init__WEBPACK_IMPORTED_MODULE_2__["initRange"].apply(scale, arguments);

  return linearish(scale);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/log.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/log.js ***!
  \**********************************************************/
/*! exports provided: loggish, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loggish", function() { return loggish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return log; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var d3_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-format */ "./node_modules/d3-format/src/index.js");
/* harmony import */ var _nice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nice */ "./node_modules/d3/node_modules/d3-scale/src/nice.js");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./continuous */ "./node_modules/d3/node_modules/d3-scale/src/continuous.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");






function transformLog(x) {
  return Math.log(x);
}

function transformExp(x) {
  return Math.exp(x);
}

function transformLogn(x) {
  return -Math.log(-x);
}

function transformExpn(x) {
  return -Math.exp(-x);
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}

function loggish(transform) {
  var scale = transform(transformLog, transformExp),
      domain = scale.domain,
      base = 10,
      logs,
      pows;

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function(count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;

    if (r = v < u) i = u, u = v, v = i;

    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["ticks"])(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = Object(d3_format__WEBPACK_IMPORTED_MODULE_1__["format"])(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(Object(_nice__WEBPACK_IMPORTED_MODULE_2__["default"])(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  return scale;
}

function log() {
  var scale = loggish(Object(_continuous__WEBPACK_IMPORTED_MODULE_3__["transformer"])()).domain([1, 10]);

  scale.copy = function() {
    return Object(_continuous__WEBPACK_IMPORTED_MODULE_3__["copy"])(scale, log()).base(scale.base());
  };

  _init__WEBPACK_IMPORTED_MODULE_4__["initRange"].apply(scale, arguments);

  return scale;
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/nice.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/nice.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
});


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/number.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/number.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return +x;
});


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/ordinal.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/ordinal.js ***!
  \**************************************************************/
/*! exports provided: implicit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "implicit", function() { return implicit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ordinal; });
/* harmony import */ var d3_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-collection */ "./node_modules/d3-collection/index.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./node_modules/d3/node_modules/d3-scale/src/array.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");




var implicit = {name: "implicit"};

function ordinal() {
  var index = Object(d3_collection__WEBPACK_IMPORTED_MODULE_0__["map"])(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = Object(d3_collection__WEBPACK_IMPORTED_MODULE_0__["map"])();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = _array__WEBPACK_IMPORTED_MODULE_1__["slice"].call(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  _init__WEBPACK_IMPORTED_MODULE_2__["initRange"].apply(scale, arguments);

  return scale;
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/pow.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/pow.js ***!
  \**********************************************************/
/*! exports provided: powish, default, sqrt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "powish", function() { return powish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrt", function() { return sqrt; });
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linear */ "./node_modules/d3/node_modules/d3-scale/src/linear.js");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./continuous */ "./node_modules/d3/node_modules/d3-scale/src/continuous.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");




function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(_continuous__WEBPACK_IMPORTED_MODULE_1__["identity"], _continuous__WEBPACK_IMPORTED_MODULE_1__["identity"]),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(_continuous__WEBPACK_IMPORTED_MODULE_1__["identity"], _continuous__WEBPACK_IMPORTED_MODULE_1__["identity"])
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return Object(_linear__WEBPACK_IMPORTED_MODULE_0__["linearish"])(scale);
}

function pow() {
  var scale = powish(Object(_continuous__WEBPACK_IMPORTED_MODULE_1__["transformer"])());

  scale.copy = function() {
    return Object(_continuous__WEBPACK_IMPORTED_MODULE_1__["copy"])(scale, pow()).exponent(scale.exponent());
  };

  _init__WEBPACK_IMPORTED_MODULE_2__["initRange"].apply(scale, arguments);

  return scale;
}

function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/quantile.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/quantile.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return quantile; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./node_modules/d3/node_modules/d3-scale/src/array.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");




function quantile() {
  var domain = [],
      range = [],
      thresholds = [],
      unknown;

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["quantile"])(domain, i / n);
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : range[Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["bisect"])(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(d3_array__WEBPACK_IMPORTED_MODULE_0__["ascending"]);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = _array__WEBPACK_IMPORTED_MODULE_1__["slice"].call(_), rescale()) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return _init__WEBPACK_IMPORTED_MODULE_2__["initRange"].apply(scale, arguments);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/quantize.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/quantize.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return quantize; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./node_modules/d3/node_modules/d3-scale/src/array.js");
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linear */ "./node_modules/d3/node_modules/d3-scale/src/linear.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");





function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1],
      unknown;

  function scale(x) {
    return x <= x ? range[Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["bisect"])(domain, x, 0, n)] : unknown;
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = _array__WEBPACK_IMPORTED_MODULE_1__["slice"].call(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };

  scale.thresholds = function() {
    return domain.slice();
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range)
        .unknown(unknown);
  };

  return _init__WEBPACK_IMPORTED_MODULE_3__["initRange"].apply(Object(_linear__WEBPACK_IMPORTED_MODULE_2__["linearish"])(scale), arguments);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/sequential.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/sequential.js ***!
  \*****************************************************************/
/*! exports provided: copy, default, sequentialLog, sequentialSymlog, sequentialPow, sequentialSqrt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sequential; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sequentialLog", function() { return sequentialLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sequentialSymlog", function() { return sequentialSymlog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sequentialPow", function() { return sequentialPow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sequentialSqrt", function() { return sequentialSqrt; });
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./continuous */ "./node_modules/d3/node_modules/d3-scale/src/continuous.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linear */ "./node_modules/d3/node_modules/d3-scale/src/linear.js");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./log */ "./node_modules/d3/node_modules/d3-scale/src/log.js");
/* harmony import */ var _symlog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./symlog */ "./node_modules/d3/node_modules/d3-scale/src/symlog.js");
/* harmony import */ var _pow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pow */ "./node_modules/d3/node_modules/d3-scale/src/pow.js");







function transformer() {
  var x0 = 0,
      x1 = 1,
      t0,
      t1,
      k10,
      transform,
      interpolator = _continuous__WEBPACK_IMPORTED_MODULE_0__["identity"],
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .interpolator(source.interpolator())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function sequential() {
  var scale = Object(_linear__WEBPACK_IMPORTED_MODULE_2__["linearish"])(transformer()(_continuous__WEBPACK_IMPORTED_MODULE_0__["identity"]));

  scale.copy = function() {
    return copy(scale, sequential());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__["initInterpolator"].apply(scale, arguments);
}

function sequentialLog() {
  var scale = Object(_log__WEBPACK_IMPORTED_MODULE_3__["loggish"])(transformer()).domain([1, 10]);

  scale.copy = function() {
    return copy(scale, sequentialLog()).base(scale.base());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__["initInterpolator"].apply(scale, arguments);
}

function sequentialSymlog() {
  var scale = Object(_symlog__WEBPACK_IMPORTED_MODULE_4__["symlogish"])(transformer());

  scale.copy = function() {
    return copy(scale, sequentialSymlog()).constant(scale.constant());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__["initInterpolator"].apply(scale, arguments);
}

function sequentialPow() {
  var scale = Object(_pow__WEBPACK_IMPORTED_MODULE_5__["powish"])(transformer());

  scale.copy = function() {
    return copy(scale, sequentialPow()).exponent(scale.exponent());
  };

  return _init__WEBPACK_IMPORTED_MODULE_1__["initInterpolator"].apply(scale, arguments);
}

function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/sequentialQuantile.js":
/*!*************************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/sequentialQuantile.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sequentialQuantile; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./continuous */ "./node_modules/d3/node_modules/d3-scale/src/continuous.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");




function sequentialQuantile() {
  var domain = [],
      interpolator = _continuous__WEBPACK_IMPORTED_MODULE_1__["identity"];

  function scale(x) {
    if (!isNaN(x = +x)) return interpolator((Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["bisect"])(domain, x) - 1) / (domain.length - 1));
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(d3_array__WEBPACK_IMPORTED_MODULE_0__["ascending"]);
    return scale;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return sequentialQuantile(interpolator).domain(domain);
  };

  return _init__WEBPACK_IMPORTED_MODULE_2__["initInterpolator"].apply(scale, arguments);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/symlog.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/symlog.js ***!
  \*************************************************************/
/*! exports provided: symlogish, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symlogish", function() { return symlogish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symlog; });
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linear */ "./node_modules/d3/node_modules/d3-scale/src/linear.js");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./continuous */ "./node_modules/d3/node_modules/d3-scale/src/continuous.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");




function transformSymlog(c) {
  return function(x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}

function transformSymexp(c) {
  return function(x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}

function symlogish(transform) {
  var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));

  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };

  return Object(_linear__WEBPACK_IMPORTED_MODULE_0__["linearish"])(scale);
}

function symlog() {
  var scale = symlogish(Object(_continuous__WEBPACK_IMPORTED_MODULE_1__["transformer"])());

  scale.copy = function() {
    return Object(_continuous__WEBPACK_IMPORTED_MODULE_1__["copy"])(scale, symlog()).constant(scale.constant());
  };

  return _init__WEBPACK_IMPORTED_MODULE_2__["initRange"].apply(scale, arguments);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/threshold.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/threshold.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return threshold; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./node_modules/d3/node_modules/d3-scale/src/array.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");




function threshold() {
  var domain = [0.5],
      range = [0, 1],
      unknown,
      n = 1;

  function scale(x) {
    return x <= x ? range[Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["bisect"])(domain, x, 0, n)] : unknown;
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = _array__WEBPACK_IMPORTED_MODULE_1__["slice"].call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = _array__WEBPACK_IMPORTED_MODULE_1__["slice"].call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return threshold()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return _init__WEBPACK_IMPORTED_MODULE_2__["initRange"].apply(scale, arguments);
}


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/tickFormat.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/tickFormat.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var d3_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-format */ "./node_modules/d3-format/src/index.js");



/* harmony default export */ __webpack_exports__["default"] = (function(start, stop, count, specifier) {
  var step = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["tickStep"])(start, stop, count),
      precision;
  specifier = Object(d3_format__WEBPACK_IMPORTED_MODULE_1__["formatSpecifier"])(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = Object(d3_format__WEBPACK_IMPORTED_MODULE_1__["precisionPrefix"])(step, value))) specifier.precision = precision;
      return Object(d3_format__WEBPACK_IMPORTED_MODULE_1__["formatPrefix"])(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = Object(d3_format__WEBPACK_IMPORTED_MODULE_1__["precisionRound"])(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = Object(d3_format__WEBPACK_IMPORTED_MODULE_1__["precisionFixed"])(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return Object(d3_format__WEBPACK_IMPORTED_MODULE_1__["format"])(specifier);
});


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/time.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/time.js ***!
  \***********************************************************/
/*! exports provided: calendar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calendar", function() { return calendar; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var d3_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-time */ "./node_modules/d3-time/index.js");
/* harmony import */ var d3_time_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-time-format */ "./node_modules/d3-time-format/src/index.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./array */ "./node_modules/d3/node_modules/d3-scale/src/array.js");
/* harmony import */ var _continuous__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./continuous */ "./node_modules/d3/node_modules/d3-scale/src/continuous.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");
/* harmony import */ var _nice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nice */ "./node_modules/d3/node_modules/d3-scale/src/nice.js");








var durationSecond = 1000,
    durationMinute = durationSecond * 60,
    durationHour = durationMinute * 60,
    durationDay = durationHour * 24,
    durationWeek = durationDay * 7,
    durationMonth = durationDay * 30,
    durationYear = durationDay * 365;

function date(t) {
  return new Date(t);
}

function number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
  var scale = Object(_continuous__WEBPACK_IMPORTED_MODULE_4__["default"])(_continuous__WEBPACK_IMPORTED_MODULE_4__["identity"], _continuous__WEBPACK_IMPORTED_MODULE_4__["identity"]),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  var tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) interval = 10;

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["bisector"])(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["tickStep"])(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = Math.max(Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["tickStep"])(start, stop, interval), 1);
        interval = millisecond;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(_array__WEBPACK_IMPORTED_MODULE_3__["map"].call(_, number)) : domain().map(date);
  };

  scale.ticks = function(interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
        ? domain(Object(_nice__WEBPACK_IMPORTED_MODULE_6__["default"])(d, interval))
        : scale;
  };

  scale.copy = function() {
    return Object(_continuous__WEBPACK_IMPORTED_MODULE_4__["copy"])(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
  };

  return scale;
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return _init__WEBPACK_IMPORTED_MODULE_5__["initRange"].apply(calendar(d3_time__WEBPACK_IMPORTED_MODULE_1__["timeYear"], d3_time__WEBPACK_IMPORTED_MODULE_1__["timeMonth"], d3_time__WEBPACK_IMPORTED_MODULE_1__["timeWeek"], d3_time__WEBPACK_IMPORTED_MODULE_1__["timeDay"], d3_time__WEBPACK_IMPORTED_MODULE_1__["timeHour"], d3_time__WEBPACK_IMPORTED_MODULE_1__["timeMinute"], d3_time__WEBPACK_IMPORTED_MODULE_1__["timeSecond"], d3_time__WEBPACK_IMPORTED_MODULE_1__["timeMillisecond"], d3_time_format__WEBPACK_IMPORTED_MODULE_2__["timeFormat"]).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
});


/***/ }),

/***/ "./node_modules/d3/node_modules/d3-scale/src/utcTime.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3/node_modules/d3-scale/src/utcTime.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time */ "./node_modules/d3/node_modules/d3-scale/src/time.js");
/* harmony import */ var d3_time_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-time-format */ "./node_modules/d3-time-format/src/index.js");
/* harmony import */ var d3_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-time */ "./node_modules/d3-time/index.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./init */ "./node_modules/d3/node_modules/d3-scale/src/init.js");





/* harmony default export */ __webpack_exports__["default"] = (function() {
  return _init__WEBPACK_IMPORTED_MODULE_3__["initRange"].apply(Object(_time__WEBPACK_IMPORTED_MODULE_0__["calendar"])(d3_time__WEBPACK_IMPORTED_MODULE_2__["utcYear"], d3_time__WEBPACK_IMPORTED_MODULE_2__["utcMonth"], d3_time__WEBPACK_IMPORTED_MODULE_2__["utcWeek"], d3_time__WEBPACK_IMPORTED_MODULE_2__["utcDay"], d3_time__WEBPACK_IMPORTED_MODULE_2__["utcHour"], d3_time__WEBPACK_IMPORTED_MODULE_2__["utcMinute"], d3_time__WEBPACK_IMPORTED_MODULE_2__["utcSecond"], d3_time__WEBPACK_IMPORTED_MODULE_2__["utcMillisecond"], d3_time_format__WEBPACK_IMPORTED_MODULE_1__["utcFormat"]).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
});


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/course-configuration/course/course.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/course-configuration/course/course.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"Course container\">\r\n  <nb-card *ngIf=\"CourseModule\">\r\n    <nb-card-body>\r\n      <div class=\"row\">\r\n        <div class=\"col-5\">\r\n            <div  class=\"HeadTitle p-3\">COURSE CONFIGURATION</div>\r\n            <div class=\"CardContent pl-3\">{{CardContent}}</div>\r\n            <div class=\"CreateBtn pt-2 pl-3\">\r\n                  <button class=\"Morebtn mr-2\" nbButton shape=\"rectangle\" size=\"small\">More Info<nb-icon icon=\"arrowhead-right-outline\"></nb-icon></button>\r\n                  <button (click)=\"BlockTree($event)\" class=\"Blockbtn\" nbButton shape=\"rectangle\" size=\"small\">Block View</button>\r\n            </div>      \r\n        </div>\r\n        <div class=\"col-7 CourseCategory\">\r\n            <button (click)=\"Course($event)\" class=\"Coursebtn\"  nbButton size=\"giant\">\r\n              <ul style=\"list-style-type:none;\">\r\n                <li><nb-icon  class=\"CourseIcons\" icon=\"archive-outline\"></nb-icon></li>\r\n                <li>Set</li>\r\n                <li>Courses</li>\r\n              </ul>\r\n            </button>\r\n            <button (click)=\"Depts($event)\" class=\"Coursebtn ml-4 mr-4\" nbButton size=\"giant\">\r\n                <ul style=\"list-style-type:none;\">\r\n                <li><nb-icon  class=\"CourseIcons\" icon=\"npm-outline\"></nb-icon></li>\r\n                <li>Set</li>\r\n                <li>Depts.</li>\r\n              </ul>\r\n            </button>\r\n            <button (click)=\"Levels($event)\" class=\"Coursebtn\"  nbButton size=\"giant\">\r\n              <ul style=\"list-style-type:none;\">\r\n                <li><nb-icon  class=\"CourseIcons\" icon=\"bookmark-outline\"></nb-icon></li>\r\n                <li>Set</li>\r\n                <li>Levels</li>\r\n              </ul>\r\n          </button>\r\n          </div>\r\n        </div>\r\n      </nb-card-body>\r\n  </nb-card>\r\n  \r\n  <!-- Course table -->\r\n  <nb-card *ngIf=\"setcourse\">\r\n      <nb-card-header>\r\n        <div class=\"row\">\r\n          <div class=\"col-6 CourseTitle\"> {{CourseTitle}}</div>\r\n        </div>\r\n       \r\n      </nb-card-header>\r\n      <nb-card-body>\r\n          <div class=\"row\">\r\n          <div class=\"col-8\">\r\n          <table class=\"table table-borderless\" id=\"coursetable\">\r\n              <thead>\r\n                  <tr>\r\n                      <!-- <th *ngFor=\"let head of headElements\" scope=\"col\">{{head}}</th> -->\r\n                      <th class=\"ActionTitle\" scope=\"col\">Actions</th>\r\n                      <th scope=\"col\">ID</th>\r\n                      <th scope=\"col\">Course Name</th>\r\n  \r\n                  </tr>\r\n                 <tr>\r\n                    <td><button type=\"button\" nbButton size=\"medium\" class=\"Addbtn\"  (click)=\"addFieldValue()\"   fullWidth><nb-icon icon=\"plus-outline\"></nb-icon></button></td>\r\n                    <td><input type=\"text\"  class=\"CourseId \" name=\"newAttributeid\" [(ngModel)]=\"newAttribute.id\" nbInput fullWidth placeholder=\"ID\"></td>\r\n                    <td><input type=\"text\" class=\"CourseName\" id=\"newAttributecoursename\" name=\"newAttributecoursename\" [(ngModel)]=\"newAttribute.coursename\" nbInput fullWidth placeholder=\"Course Name\"></td>\r\n                </tr>\r\n                <tr *ngFor=\"let field of fieldArray; let i = index\">\r\n                  <td>\r\n                      <button class=\"btn btn-default\" *ngIf=\"!course.id\"  (click)=\"addcourse(coursename)\"><nb-icon icon=\"checkmark-outline\"></nb-icon></button>\r\n                      <button class=\"btn btn-default\"  type=\"button\" (click)=\"deleteFieldValue(i)\"><nb-icon icon=\"close-outline\"></nb-icon></button>\r\n                  </td>\r\n                    <td><input type=\"text\" class=\"CourseId\" name=\"id\" [(ngModel)]=\"id\" nbInput fullWidth placeholder=\"ID\"></td>\r\n                    <td><input type=\"text\" class=\"CourseName\" name=\"coursename\" [(ngModel)]=\"coursename\" nbInput fullWidth placeholder=\"Course Name\"></td>\r\n              </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let course of courses ;let i=index\">\r\n                    <td>\r\n                          <div class=\"\" *ngIf=\"EditRecord\">\r\n                        <!--  Edit course  -->\r\n                          <button class=\"btn text-center\"   (click)=\"editCourse(course)\"><nb-icon icon=\"edit-outline\"></nb-icon></button>\r\n                          <!-- Remove course  -->\r\n                          <button class=\"btn text-center\" (click)=\"removecourse(course.id)\"><nb-icon icon=\"trash-2-outline\"></nb-icon></button>\r\n                          \r\n                          </div>\r\n                          <div class=\"\" *ngIf=\"EditActions\">\r\n                              <button class=\"btn btn-default\" *ngIf=\"course.id\"  type=\"button\"  (click)=\"updatecourse(coursename)\"><nb-icon icon=\"checkmark-outline\"></nb-icon></button>\r\n                              <button class=\"btn btn-default\"  type=\"button\" (click)=\"Cancel(course)\"><nb-icon icon=\"close-outline\"></nb-icon></button>\r\n                          </div>\r\n                      </td>\r\n\r\n                  <td class=\"CourseData\">{{ i+1 }}</td>\r\n                  <td class=\"CourseData\">\r\n                    <span *ngIf=\"!course.editable\">{{course.coursename}}</span>\r\n                    <input type=\"text\" class=\"CourseName\"  [(ngModel)]=\"course.coursename\" *ngIf=\"course.editable\" nbInput fullWidth placeholder=\"Course Name\" name=\"coursename\">\r\n                  </td>\r\n                </tr>\r\n                  \r\n              </tbody>\r\n            </table>\r\n          </div>\r\n          <div class=\"col-4\">\r\n            <img class=\"SetCourse\" [src]=\"'assets/images/Set_course.png'\">\r\n          </div>\r\n    </div>\r\n    </nb-card-body>\r\n  </nb-card>\r\n  <ng-template #elseBlock>\r\n  \r\n  </ng-template>\r\n  \r\n  <!-- department table -->\r\n  <nb-card *ngIf=\"department\">\r\n    <nb-card-header>\r\n      <div class=\"row\">\r\n        <div class=\"col-6 CourseTitle\"> {{DepartmentTitle}}</div>\r\n      </div>\r\n     \r\n    </nb-card-header>\r\n    <nb-card-body>\r\n        <div class=\"row\">\r\n        <table class=\"table table-borderless\" id=\"departmenttable\">\r\n            <thead>\r\n                <tr>\r\n                    <!-- <th *ngFor=\"let head of headElements\" scope=\"col\">{{head}}</th> -->\r\n                    <th scope=\"col\">Actions</th>\r\n                    <th scope=\"col\">ID</th>\r\n                    <th scope=\"col\">Department Name</th>\r\n                    <th scope=\"col\">Shortcode</th>\r\n                </tr>\r\n               <tr>\r\n                  <td><button  nbButton size=\"medium\"  (click)=\"addcourse(coursename)\"   fullWidth><nb-icon icon=\"plus-outline\"></nb-icon></button></td>\r\n                  <td><input type=\"text\" class=\"CourseId\" name=\"id\" [(ngModel)]=\"id\" nbInput fullWidth placeholder=\"ID\"></td>\r\n                  <td><input type=\"text\" class=\"CourseName\" name=\"departmentname\" [(ngModel)]=\"departmentname\" nbInput fullWidth placeholder=\"Department Name\"></td>\r\n                  <td><input type=\"text\" class=\"CourseName\" name=\"shortcode\" [(ngModel)]=\"shortcode\" nbInput fullWidth placeholder=\"Shortcode\"></td>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let dept of departments;let i=index\">\r\n                  <td>\r\n                      <!-- Show Edit User Form  -->\r\n                      <div class=\"row\">\r\n                        <div class=\"btn text-center\"  (click)=\"showEditcourseForm(course, template)\"><nb-icon icon=\"edit-outline\"></nb-icon>\r\n                        </div>\r\n                        <!-- Remove User  -->\r\n                        <div class=\"btn text-center\" (click)=\"removecourse(course.id)\"><nb-icon icon=\"trash-2-outline\"></nb-icon>\r\n  \r\n                        </div>\r\n                        <div  class=\"btn text-center\" (click)=\"viewcourse(course.id)\"><nb-icon icon=\"person-outline\"></nb-icon>\r\n  \r\n                        </div>\r\n                      </div>\r\n                    </td>\r\n                <td class=\"CourseData\">{{ i+1 }}</td>\r\n                <td class=\"CourseData\">{{ dept.departmentname }}</td>\r\n                <td class=\"CourseData\">{{ dept.shortcode }}</td>\r\n              </tr>\r\n                \r\n            </tbody>\r\n          </table>\r\n      \r\n  </div>\r\n  </nb-card-body>\r\n  </nb-card>\r\n  <!-- set levels table -->\r\n  <nb-card *ngIf=\"level\">\r\n    <nb-card-header>\r\n      <div class=\"row\">\r\n        <div class=\"col-6 CourseTitle\"> {{LevelTitle}}</div>\r\n      </div>\r\n     \r\n    </nb-card-header>\r\n    <nb-card-body>\r\n        <div class=\"row\">\r\n        <table class=\"table table-borderless\" id=\"coursetable\">\r\n            <thead>\r\n                <tr>\r\n                    <!-- <th *ngFor=\"let head of headElements\" scope=\"col\">{{head}}</th> -->\r\n                    <th scope=\"col\">Actions</th>\r\n                    <th scope=\"col\">ID</th>\r\n                    <th scope=\"col\">Level Name</th>\r\n                    <th scope=\"col\">Shortcode</th>\r\n                    <th scope=\"col\">Year</th>\r\n                    <th scope=\"col\">Terms</th>\r\n                </tr>\r\n               <tr>\r\n                  <td><button  nbButton size=\"medium\"  (click)=\"addcourse(coursename)\"   fullWidth><nb-icon icon=\"plus-outline\"></nb-icon></button></td>\r\n                  <td><input type=\"text\" class=\"CourseId\" name=\"id\" [(ngModel)]=\"id\" nbInput fullWidth placeholder=\"ID\"></td>\r\n                  <td><input type=\"text\" class=\"CourseName\" name=\"levelname\" [(ngModel)]=\"levelname\" nbInput fullWidth placeholder=\"Level Name\"></td>\r\n                  <td><input type=\"text\" class=\"CourseName\" name=\"shortcode\" [(ngModel)]=\"shortcode\" nbInput fullWidth placeholder=\"Shortcode\"></td>\r\n                  <td><input type=\"text\" class=\"CourseName\" name=\"year\" [(ngModel)]=\"year\" nbInput fullWidth placeholder=\"Year\"></td>\r\n                  <td><input type=\"text\" class=\"CourseName\" name=\"terms\" [(ngModel)]=\"terms\" nbInput fullWidth placeholder=\"Terms\"></td>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let level of levels;let i=index\">\r\n                  <td>\r\n                      <!-- Show Edit User Form  -->\r\n                      <div class=\"row\">\r\n                        <div class=\"btn text-center\"  (click)=\"showEditcourseForm(course, template)\"><nb-icon icon=\"edit-outline\"></nb-icon>\r\n                        </div>\r\n                        <!-- Remove User  -->\r\n                        <div class=\"btn text-center\" (click)=\"removecourse(course.id)\"><nb-icon icon=\"trash-2-outline\"></nb-icon>\r\n  \r\n                        </div>\r\n                        <div  class=\"btn text-center\" (click)=\"viewcourse(course.id)\"><nb-icon icon=\"person-outline\"></nb-icon>\r\n  \r\n                        </div>\r\n                      </div>\r\n                    </td>\r\n                <td class=\"CourseData\">{{ i+1 }}</td>\r\n                <td class=\"CourseData\">{{ level.levelname }}</td>\r\n                <td class=\"CourseData\">{{ level.shortcode }}</td>\r\n                <td class=\"CourseData\">{{ level.year }}</td>\r\n                <td class=\"CourseData\">{{ level.terms }}</td>\r\n  \r\n              </tr>\r\n                \r\n            </tbody>\r\n          </table>\r\n        \r\n  </div>\r\n  </nb-card-body>\r\n  </nb-card>\r\n  <nb-card *ngIf=\"Blocktree\">\r\n    <nb-card-header>\r\n       <button class=\"btn btn-default\"   (click)=\"blocktree()\"><nb-icon icon=\"close-outline\"></nb-icon>Institute Course Specifications Block View</button>\r\n    </nb-card-header>\r\n <nb-card-body>\r\n     <s2w-angular-d3-tree-lib\r\n     [(treeData)]=\"data\"\r\n     (onNodeChanged)=\"nodeUpdated($event)\"\r\n     (onNodeSelected)=\"nodeSelected($event)\"></s2w-angular-d3-tree-lib>  \r\n </nb-card-body>  \r\n   </nb-card>\r\n  <nb-card *ngIf=\"Unknownstate\">\r\n    <img style=\"width: 100%;\" [src]=\"'assets/images/Not_found.png'\">\r\n  </nb-card>\r\n  </div>\r\n  "

/***/ }),

/***/ "./src/app/pages/course-configuration/course-configuration-routing.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/pages/course-configuration/course-configuration-routing.module.ts ***!
  \***********************************************************************************/
/*! exports provided: CourseConfigurationRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseConfigurationRoutingModule", function() { return CourseConfigurationRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _course_course_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./course/course.component */ "./src/app/pages/course-configuration/course/course.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");





const routes = [
    {
        path: '',
        component: _course_course_component__WEBPACK_IMPORTED_MODULE_3__["CourseComponent"],
        children: [
            {
                path: 'course',
                component: _course_course_component__WEBPACK_IMPORTED_MODULE_3__["CourseComponent"],
            },
        ],
    },
];
let CourseConfigurationRoutingModule = class CourseConfigurationRoutingModule {
};
CourseConfigurationRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], CourseConfigurationRoutingModule);



/***/ }),

/***/ "./src/app/pages/course-configuration/course-configuration.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/pages/course-configuration/course-configuration.module.ts ***!
  \***************************************************************************/
/*! exports provided: CourseConfigurationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseConfigurationModule", function() { return CourseConfigurationModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/fesm2015/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var angular_d3_tree__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-d3-tree */ "./node_modules/angular-d3-tree/fesm2015/angular-d3-tree.js");
/* harmony import */ var _course_configuration_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./course-configuration-routing.module */ "./src/app/pages/course-configuration/course-configuration-routing.module.ts");
/* harmony import */ var _course_course_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./course/course.component */ "./src/app/pages/course-configuration/course/course.component.ts");









let CourseConfigurationModule = class CourseConfigurationModule {
};
CourseConfigurationModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_course_course_component__WEBPACK_IMPORTED_MODULE_8__["CourseComponent"]],
        imports: [
            angular_d3_tree__WEBPACK_IMPORTED_MODULE_6__["AngularD3TreeLibModule"],
            _theme_theme_module__WEBPACK_IMPORTED_MODULE_3__["ThemeModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbInputModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbCardModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbButtonModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbActionsModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbUserModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbCheckboxModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbRadioModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbDatepickerModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbSelectModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbIconModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbStepperModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _course_configuration_routing_module__WEBPACK_IMPORTED_MODULE_7__["CourseConfigurationRoutingModule"],
        ],
    })
], CourseConfigurationModule);



/***/ }),

/***/ "./src/app/pages/course-configuration/course/course.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/pages/course-configuration/course/course.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".HeadTitle {\n  font-size: 25px;\n  font-weight: bolder; }\n\n.CardContent {\n  font-size: 17px;\n  font-weight: 600; }\n\n.CourseId {\n  padding: 8px !important;\n  width: 40px !important; }\n\n.CourseName {\n  padding: 8px !important; }\n\n.CourseCategory {\n  text-align: center; }\n\n.SetCourse {\n  width: 100%; }\n\n.Morebtn {\n  text-transform: none !important; }\n\n.Blockbtn {\n  height: 36px;\n  text-transform: none !important; }\n\n.ActionTitle {\n  padding-left: 20px; }\n\n.Addbtn {\n  width: 50%;\n  margin-left: 10px; }\n\n.Coursebtn {\n  text-transform: none !important;\n  font-size: 13px !important;\n  height: 100%;\n  width: 16%;\n  border-radius: 20px !important; }\n\n.Coursebtn:hover {\n  box-shadow: 0 0 11px rgba(41, 23, 23, 0.43); }\n\n.CourseIcons {\n  font-size: 42px; }\n\nul {\n  padding: unset !important; }\n\nli {\n  color: #ffffff !important;\n  line-height: normal !important; }\n\n::ng-deep.CourseData {\n  padding: 20px !important; }\n\n.CourseTitle {\n  font-weight: bold;\n  font-size: 20px; }\n\npath.link {\n  fill: none !important;\n  stroke: #CCC !important;\n  stroke-width: 2px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvY291cnNlLWNvbmZpZ3VyYXRpb24vY291cnNlL0Q6XFxSZXN0YXhQcm9qZWN0XFxSZXN0YXhWMVxcZGFzaGJvYXJkLWFkbWluL3NyY1xcYXBwXFxwYWdlc1xcY291cnNlLWNvbmZpZ3VyYXRpb25cXGNvdXJzZVxcY291cnNlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtFQUNmLG1CQUFtQixFQUFBOztBQUVyQjtFQUNFLGVBQWU7RUFDZixnQkFBZ0IsRUFBQTs7QUFJbEI7RUFDQSx1QkFBdUI7RUFDdkIsc0JBQXFCLEVBQUE7O0FBRXJCO0VBQ0EsdUJBQXNCLEVBQUE7O0FBRXRCO0VBQ0Usa0JBQWtCLEVBQUE7O0FBRXBCO0VBQ0UsV0FBVyxFQUFBOztBQUdiO0VBQ0UsK0JBQThCLEVBQUE7O0FBRWhDO0VBQ0UsWUFBWTtFQUNaLCtCQUE4QixFQUFBOztBQUVoQztFQUNFLGtCQUFrQixFQUFBOztBQUVwQjtFQUNJLFVBQVU7RUFDVixpQkFBaUIsRUFBQTs7QUFFckI7RUFDSSwrQkFBOEI7RUFDOUIsMEJBQXlCO0VBQ3pCLFlBQVk7RUFDWixVQUFVO0VBQ1YsOEJBQTZCLEVBQUE7O0FBR2pDO0VBQ0UsMkNBQTJDLEVBQUE7O0FBRTdDO0VBQ0EsZUFBYyxFQUFBOztBQUVkO0VBQ0UseUJBQXdCLEVBQUE7O0FBRTFCO0VBQ0UseUJBQXdCO0VBQ3hCLDhCQUE2QixFQUFBOztBQUUvQjtFQUNBLHdCQUF1QixFQUFBOztBQUd2QjtFQUNFLGlCQUFpQjtFQUNqQixlQUFlLEVBQUE7O0FBRWpCO0VBQ0UscUJBQXFCO0VBQ3JCLHVCQUF1QjtFQUN2Qiw0QkFBNEIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvdXJzZS1jb25maWd1cmF0aW9uL2NvdXJzZS9jb3Vyc2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuSGVhZFRpdGxle1xyXG4gIGZvbnQtc2l6ZTogMjVweDtcclxuICBmb250LXdlaWdodDogYm9sZGVyO1xyXG59XHJcbi5DYXJkQ29udGVudHtcclxuICBmb250LXNpemU6IDE3cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuLy8gQ291cnNlIHRhYmxlXHJcbi5Db3Vyc2VJZHtcclxucGFkZGluZzogOHB4ICFpbXBvcnRhbnQ7XHJcbndpZHRoOiA0MHB4IWltcG9ydGFudDtcclxufVxyXG4uQ291cnNlTmFtZXtcclxucGFkZGluZzogOHB4IWltcG9ydGFudDtcclxufVxyXG4uQ291cnNlQ2F0ZWdvcnl7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5TZXRDb3Vyc2V7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLy9CbG9ja2J0blxyXG4uTW9yZWJ0bntcclxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZSFpbXBvcnRhbnQ7XHJcbn1cclxuLkJsb2NrYnRue1xyXG4gIGhlaWdodDogMzZweDtcclxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZSFpbXBvcnRhbnQ7XHJcbn1cclxuLkFjdGlvblRpdGxle1xyXG4gIHBhZGRpbmctbGVmdDogMjBweDtcclxufVxyXG4uQWRkYnRue1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG59XHJcbi5Db3Vyc2VidG57XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZSFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDEzcHghaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDE2JTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHghaW1wb3J0YW50O1xyXG4gICAgLy8gZmlsdGVyOmRyb3Atc2hhZG93KDE2cHggMTZweCAxMHB4IGJsYWNrKTtcclxufVxyXG4uQ291cnNlYnRuOmhvdmVyIHtcclxuICBib3gtc2hhZG93OiAwIDAgMTFweCByZ2JhKDQxLCAyMywgMjMsIDAuNDMpO1xyXG59XHJcbi5Db3Vyc2VJY29uc3tcclxuZm9udC1zaXplOjQycHg7XHJcbn1cclxudWx7XHJcbiAgcGFkZGluZzogdW5zZXQhaW1wb3J0YW50O1xyXG59XHJcbmxpe1xyXG4gIGNvbG9yOiAjZmZmZmZmIWltcG9ydGFudDtcclxuICBsaW5lLWhlaWdodDogbm9ybWFsIWltcG9ydGFudDtcclxufVxyXG46Om5nLWRlZXAuQ291cnNlRGF0YXtcclxucGFkZGluZzogMjBweCFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5Db3Vyc2VUaXRsZXtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxucGF0aC5saW5re1xyXG4gIGZpbGw6IG5vbmUgIWltcG9ydGFudDtcclxuICBzdHJva2U6ICNDQ0MgIWltcG9ydGFudDtcclxuICBzdHJva2Utd2lkdGg6IDJweCAhaW1wb3J0YW50O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/pages/course-configuration/course/course.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/course-configuration/course/course.component.ts ***!
  \***********************************************************************/
/*! exports provided: CourseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseComponent", function() { return CourseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var apollo_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-angular */ "./node_modules/apollo-angular/fesm2015/ng.apollo.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./query */ "./src/app/pages/course-configuration/course/query.ts");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm2015/add/operator/map.js");
/* harmony import */ var angular_d3_tree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-d3-tree */ "./node_modules/angular-d3-tree/fesm2015/angular-d3-tree.js");
/* harmony import */ var _data_tree_simple__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data-tree-simple */ "./src/app/pages/course-configuration/course/data-tree-simple.ts");







let CourseComponent = class CourseComponent {
    constructor(apollo, treeService) {
        this.apollo = apollo;
        this.treeService = treeService;
        this.user = {};
        this.isVisible = false;
        this.fieldArray = [];
        this.newAttribute = {};
        this.courses = [];
        this.course = [];
        this.departments = [];
        this.levels = [];
        this.CardContent = ['This page is used to manipulate institute Configuration Data'];
        this.CourseTitle = ['Set Courses'];
        this.DepartmentTitle = ['Set Departments'];
        this.LevelTitle = ['Set Levels'];
        this.CourseModule = true;
        this.setcourse = false;
        // course: true;
        this.EditRecord = true;
        this.EditActions = false;
        this.department = false;
        this.level = false;
        this.Blocktree = false;
        this.Unknownstate = true;
        this.data = _data_tree_simple__WEBPACK_IMPORTED_MODULE_6__["default"].result;
    }
    nodeUpdated(node) {
        console.info('app detected node change');
    }
    nodeSelected(node) {
        console.info('app detected node selected', node);
        this.selectedNode = node;
    }
    addNode() {
        const parent = this.selectedNode ? this.selectedNode.id : '1';
        const name = window.prompt('new node name');
        this.treeService.addNode({ id: '999', descripcion: name, parent: parent });
    }
    ngOnInit() {
        this.getAllcourses();
    }
    addFieldValue() {
        this.fieldArray.push(this.newAttribute);
        this.newAttribute = {};
    }
    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
    }
    editCourse(course) {
        course.editable = !course.editable;
        this.EditRecord = false;
        this.EditActions = true;
    }
    // testcourse() {
    //   alert('it worked');
    // }
    Cancel(course) {
        course.editable = !course.editable;
        this.EditRecord = true;
        this.EditActions = false;
    }
    /**
     * @param coursename
     */
    addcourse(coursename, index) {
        this.apollo
            .mutate({
            mutation: _query__WEBPACK_IMPORTED_MODULE_3__["addcourse"],
            variables: {
                coursename: coursename,
            },
            // @ts-ignore
            update: (proxy, { data: { addcourse } }) => {
                // Read the data from our cache for this query.
                const data = proxy.readQuery({ query: _query__WEBPACK_IMPORTED_MODULE_3__["courses"] });
                data.courses.push(addcourse);
                // write our data back to cache
                proxy.writeQuery({ query: _query__WEBPACK_IMPORTED_MODULE_3__["courses"], data });
            },
        }).subscribe(({ data }) => {
            console.log('it is worked');
            this.fieldArray.splice(index, 1);
        }, (error) => {
            console.log('there was an error sending query', error);
        });
    }
    getAllcourses() {
        this.apollo.watchQuery({ query: _query__WEBPACK_IMPORTED_MODULE_3__["courses"] })
            .valueChanges
            .map((result) => result.data.courses).subscribe((data) => {
            this.courses = data;
        });
    }
    /**
     * Remove course
     * @param id
     */
    // tslint:disable-next-line: no-shadowed-variable
    removecourse(id) {
        this.apollo
            .mutate({
            mutation: _query__WEBPACK_IMPORTED_MODULE_3__["removecourse"],
            variables: {
                id: id,
            },
            // @ts-ignore
            update: (proxy, { data: { removecourse } }) => {
                // Read the data from our cache for this query.
                const data = proxy.readQuery({ query: _query__WEBPACK_IMPORTED_MODULE_3__["courses"] });
                const index = data.courses.map(function (x) { return x.id; }).indexOf(id);
                data.courses.splice(index, 1);
                // Write our data back to the cache.
                proxy.writeQuery({ query: _query__WEBPACK_IMPORTED_MODULE_3__["courses"], data });
            },
        }).subscribe(({ data }) => {
            console.log(data);
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }
    /**
       * Update User
       * @param course
       */
    // tslint:disable-next-line: no-shadowed-variable
    updatecourse(course) {
        this.apollo
            .mutate({
            mutation: _query__WEBPACK_IMPORTED_MODULE_3__["updatecourse"],
            variables: {
                id: this.course.id,
                coursename: course,
            },
            // @ts-ignore
            update: (proxy, { data: { updatecourse } }) => {
                // Read the data from our cache for this query.
                const data = proxy.readQuery({ query: _query__WEBPACK_IMPORTED_MODULE_3__["courses"] });
                const index = data.users.map(function (x) { return x.id; }).indexOf(this.course.id);
                data.users[index].coursename = course;
                // Write our data back to the cache.
                proxy.writeQuery({ query: _query__WEBPACK_IMPORTED_MODULE_3__["courses"], data });
            },
        })
            .subscribe(({ data }) => {
            console.log(data);
            course.editable = !course.editable;
        }, (error) => {
            console.log('there was an error sending the query', error);
        });
    }
    Course() {
        this.setcourse = true;
        this.department = false;
        this.level = false;
        this.Unknownstate = false;
        this.Blocktree = false;
    }
    Depts() {
        this.setcourse = false;
        this.department = true;
        this.level = false;
        this.Unknownstate = false;
        this.Blocktree = false;
    }
    Levels() {
        this.setcourse = false;
        this.department = false;
        this.level = true;
        this.Unknownstate = false;
        this.Blocktree = false;
    }
    BlockTree() {
        this.Blocktree = true;
        this.Unknownstate = false;
        this.setcourse = false;
        this.level = false;
        this.department = false;
        this.CourseModule = false;
    }
};
CourseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'ngx-course',
        template: __webpack_require__(/*! raw-loader!./course.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/course-configuration/course/course.component.html"),
        styles: [__webpack_require__(/*! ./course.component.scss */ "./src/app/pages/course-configuration/course/course.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [apollo_angular__WEBPACK_IMPORTED_MODULE_2__["Apollo"], angular_d3_tree__WEBPACK_IMPORTED_MODULE_5__["AngularD3TreeLibService"]])
], CourseComponent);



/***/ }),

/***/ "./src/app/pages/course-configuration/course/data-tree-simple.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/course-configuration/course/data-tree-simple.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const dataTreeSimple = {
    'result': [
        { 'id': '1', 'description': 'PU' },
        { 'id': '2', 'description': 'Engineering', 'parent': '1' },
        { 'id': '3', 'description': 'Arts and Science', 'parent': '1' },
        { 'id': '4', 'description': 'Medicine', 'parent': '1' },
        { 'id': '5', 'description': 'ME', 'parent': '2' },
        { 'id': '6', 'description': 'CSE', 'parent': '2' },
        { 'id': '7', 'description': 'EEE', 'parent': '2' },
        { 'id': '8', 'description': 'CE', 'parent': '2' },
        { 'id': '9', 'description': '1 YEAR', 'parent': '5' },
        { 'id': '10', 'description': '2 YEAR', 'parent': '5' },
        { 'id': '11', 'description': '3 YEAR', 'parent': '5' },
        { 'id': '12', 'description': '4 YEAR', 'parent': '5' },
        { 'id': '13', 'description': '1 Term', 'parent': '12' },
        { 'id': '14', 'description': '2 Term', 'parent': '12' },
        { 'id': '15', 'description': '3 Term', 'parent': '12' },
        { 'id': '16', 'description': '4 Term', 'parent': '12' },
        { 'id': '17', 'description': '5 Term', 'parent': '12' },
        { 'id': '18', 'description': '6 Term', 'parent': '12' },
        { 'id': '19', 'description': '7 Term', 'parent': '12' },
        { 'id': '20', 'description': '8 Term', 'parent': '12' },
    ],
};
/* harmony default export */ __webpack_exports__["default"] = (dataTreeSimple);


/***/ }),

/***/ "./src/app/pages/course-configuration/course/query.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/course-configuration/course/query.ts ***!
  \************************************************************/
/*! exports provided: addcourse, courses, removecourse, updatecourse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addcourse", function() { return addcourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "courses", function() { return courses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removecourse", function() { return removecourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatecourse", function() { return updatecourse; });
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);


const addcourse = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a `
  mutation addcourse($coursename: String!) {
    addcourse(
      coursename: $coursename,
    ) {
      id
      coursename
    }
  }
`;
const courses = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a `
  query {
    courses{
      id
      coursename
    }
  }`;
const removecourse = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a `
  mutation removecourse($id: String!) {
    removecourse(id: $id) {
      id
      coursename
    }
  }`;
const updatecourse = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a `
mutation updatecourse(
  $id:String!,
  $coursename:String!
  ){
  updatecourse(
    id:$id,
    coursename:$coursename
    ){
    id
    coursename
  }
}`;


/***/ })

}]);
//# sourceMappingURL=course-configuration-course-configuration-module-es2015.js.map