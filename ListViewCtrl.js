cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Prefab
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        componentName : "item",
        spacing: 0, // space between each item
    },

    // use this for initialization
    onLoad: function () {
    	this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
        this.updateTimer = 0;
        this.updateInterval = 0.01;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
    },

    initialize: function (totalCount) {
        this.totalCount = totalCount
        this.spawnCount = Math.ceil(this.scrollView.node.height / (this.itemTemplate.data.height + this.spacing)) + 1
        this.bufferZone = (this.itemTemplate.data.height + this.scrollView.node.height) * 0.5
        this.content.height = this.totalCount * (this.itemTemplate.data.height + this.spacing) + this.spacing; // get total content height
    	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
    		let item = cc.instantiate(this.itemTemplate);
    		this.content.addChild(item);
    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
    		item.getComponent(this.componentName).updateItem(i);
            this.items.push(item);
    	}
    },
    
    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function(dt) {
    this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemTemplate.data.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer) {
                    let pageCount = Math.ceil((-buffer - viewPos.y)/offset)
                    let dy = pageCount * offset
                    if(items[i].y + dy < 0)
                    {
                    
                        items[i].y = items[i].y + dy;
                        let item = items[i].getComponent(this.componentName);
                        let itemId = item.itemID - items.length * pageCount; // update item id
                        item.updateItem(itemId);
                    }
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer) {
                    let pageCount = Math.ceil((viewPos.y - buffer)/offset)
                    let dy = pageCount * offset
                    if(items[i].y - dy > -this.content.height)
                    {
                    
                        items[i].y = items[i].y - dy;
                        let item = items[i].getComponent(this.componentName);
                        let itemId = item.itemID + items.length * pageCount;
                        item.updateItem(itemId);
                    }
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    },
});
