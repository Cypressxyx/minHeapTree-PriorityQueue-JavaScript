class minHeap {
    constructor(){
      this.pointers = new Array();
    }
    /* Array indexing */
    par(i) { return Math.floor((i-1) / 2); }
    left(i)   { return 2*i + 1; }
    right(i)  { return 2*i + 2; }
    
    /* Class operators */
    swap(prev, next) {
        var tempObj = this.pointers[prev]
        this.pointers[prev] = this.pointers[next]
        this.pointers[next] = tempObj;
    }

    insertKey(obj) {
        var i = this.pointers.length; //store prev size
        this.pointers.push(obj);
        if(i == 0)
            return;

        var objOne = this.pointers[this.par(i)];
        var objTwo = this.pointers[i];
        var keyOne = objOne.key; //comparing key values here
        var keyTwo = objTwo.key;
        
        while(i > 0 && keyOne > keyTwo) //trickle down
        {
            this.swap(this.par(i), i);
            i = this.par(i);
            if(i == 0)
                return;
            objOne = this.pointers[this.par(i)];
            objTwo = this.pointers[i];
            keyOne = objOne.key; //comparing key values here
            keyTwo = objTwo.key;
        }
    }
    popMin()  {
        var minObj = this.pointers[0];
        if(this.pointers.length == 1) {
            this.pointers.pop();
            return minObj;
        }

        this.swap(0,this.pointers.length - 1);
        this.pointers.pop();
        this.heapify(0);
        return minObj;
    }

    heapify(i) {
        var leftidx = this.left(i);
        var rightidx = this.right(i);
        var smallest = i;
        var currentObj = this.pointers[smallest];
        var objKey = currentObj.key;

        if(leftidx < this.pointers.length) {
            var leftObj = this.pointers[leftidx]
            var leftObjKey = leftObj.key;
            if(leftObjKey < objKey) {
                smallest = leftidx
            }
        }

        currentObj = this.pointers[smallest] //redo computation: smallest might have changed
        objKey = currentObj.key;

        if(rightidx < this.pointers.length) {
            var rightObj = this.pointers[rightidx]
            var rightObjKey = rightObj.key;
            if(rightObjKey < objKey) {
                smallest = rightidx;
            }
        }

        if(smallest != i)
        {
            this.swap(i,smallest)
            this.heapify(smallest)
        }
    }

    print() {
        for(var i = 0; i < this.pointers.length; i++)
            console.log((this.pointers[i]).key);
    }

    getSize() { return this.pointers.length; }
}


function test() {
    let tree= new minHeap();
    var obj = { key:19 };
    var obj2 = { key:3 };
    var obj3 = { key:9 };
    var obj4 = { key:2 };
    var obj5 = { key:1 };
    var obj6 = { key:4 };

    tree.insertKey(obj)
    tree.insertKey(obj2)
    tree.insertKey(obj3)
    tree.insertKey(obj4)
    tree.insertKey(obj5)
    tree.insertKey(obj6)
    tree.print()
    console.log(tree.popMin())
    tree.print()
}

test()
