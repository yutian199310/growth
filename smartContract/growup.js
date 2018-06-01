"use strict";

var GrowthItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.value = obj.value;
        this.date = obj.date;
    } else {
        this.key = "";
        this.author = "";
        this.value = "";
    }
};

GrowthItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};
var Growth = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new GrowthItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

Growth.prototype = {
    init: function () {
    },
    save: function (value, date) {
        var from = Blockchain.transaction.from;
        var growthItem = this.repo.get(from);
        if (growthItem) {
            growthItem.value = JSON.parse(growthItem).value + '|-' + value;
            growthItem.date = JSON.parse(growthItem).date + '|-' + date;
            this.repo.put(from, growthItem);

        } else {
            growthItem = new GrowthItem();
            growthItem.key = from;
            growthItem.value = value;
            growthItem.date = date;
            this.repo.put(from, growthItem);
        }
    },
    get: function () {
        var from = Blockchain.transaction.from;
        return this.repo.get(from);
    }
};
module.exports = Growth;