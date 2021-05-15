const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
const cw = cvs.width;
const ch = cvs.height;
let standardDelX = cw / 4;

function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.r = 25;
    this.l = 15;
    this.level = 0;
    this.display_node = function() {
        ctx.font = "28px Georgia ";
        ctx.fillStyle = "yellow";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillText(this.data, this.x - this.r * 0.7, this.r * 0.1 + this.y, 50);

    }
}


function push_back(root, value, level) {
    if (value <= root.data) {
        if (root.left != null) {
            push_back(root.left, value, level + 1);
        } else {
            let newNode = new Node(value);
            newNode.level = level + 1;
            root.left = newNode;
        }
    } else {
        if (root.right != null) {
            push_back(root.right, value, level + 1);
        } else {
            let newNode = new Node(value);
            newNode.level = level + 1;
            root.right = newNode;
        }
    }
}

function printBST(root) {
    if (root === null) {
        return;
    }
    printBST(root.left);
    console.log(root.data);
    printBST(root.right);
    return null;
}

let root = new Node(30);
root.x = cw / 2 + 20;
root.y = 100;

// root.display_node();

for (let i = 0; i < Math.floor(Math.random() * 40 + 10); i++) {
    push_back(root, Math.floor(Math.random() * 60), 0);
}

// drawCanvas();

function addOfParentNode(node, prevnode, value) {
    if (node == null) return;
    let gotNode = false;
    if (node.data == value) {
        console.log("Got it");
        nayiNode = prevnode;
        gotNode = true;
        return;
    }
    addOfParentNode(node.left, node, value);
    addOfParentNode(node.right, node, value);
    // if (gotNode == false) return null;
    if (nayiNode == undefined) return null;
    return nayiNode;
}

let opt1 = null;
let opt2 = null;

function isPresent(root, value) {
    if (root.data == value) return true;
    return ((root.left != null) && isPresent(root.left, value)) || ((root.right != null) && isPresent(root.right, value));
}

let address = null;

function search(root, value) {
    if (root == null) return;
    if (root.data == value) {
        address = root;
        return;
    }
    search(root.left, value);
    search(root.right, value);
    return;
}

function pop_back(node, value) {
    search(node, value);
    if (address == null) return;

    address = null;
}

function drawBST(root) {
    if (root === null) return;
    //root.y = prevRoot.y + 15;
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    // ctx.moveTo(prevRoot.x, prevRoot.y);
    // ctx.lineWidth = 4;
    // ctx.lineTo(root.x, root.y);
    let delX = standardDelX;
    let gg = root.level;
    while (gg--) {
        delX /= 2;
    }
    if (root.left != null) {
        // ctx.save();
        // ctx.beginPath();
        root.left.x = root.x - delX;
        root.left.y = root.y + 60;
        ctx.strokeStyle = "green";
        ctx.moveTo(root.x, root.y);
        ctx.lineTo(root.left.x, root.left.y);
        ctx.moveTo(root.x, root.y);
        ctx.stroke();
        // ctx.closePath();
        // ctx.restore();
    }
    if (root.right != null) {
        // ctx.save();
        // ctx.beginPath();
        root.right.x = root.x + delX;
        root.right.y = root.y + 60;
        ctx.strokeStyle = "green";
        ctx.moveTo(root.x, root.y);
        ctx.lineTo(root.right.x, root.right.y);
        ctx.moveTo(root.x, root.y);
        ctx.stroke();
        // ctx.closePath();
        // ctx.restore();
    }

    ctx.beginPath();
    root.display_node();
    ctx.closePath();
    drawBST(root.left);
    drawBST(root.right);
}

drawBST(root);

function addNode() {
    let node_value = document.getElementById("input").value;
    document.getElementById("input").value = null;
    if (isNaN(node_value) || node_value === "") return;
    push_back(root, node_value, 0);
    drawBST(root);
}

function deleteNode() {
    let node_value = document.getElementById("input").value;
    document.getElementById("input").value = null;
    if (isNaN(node_value) || node_value === "") return;
    pop_back(root, node_value);
}

function drawCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);
}

function draw() {
    drawCanvas();
    drawBST(root);
}
setInterval(draw, 100);