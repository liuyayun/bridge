/**
 * Created with JetBrains WebStorm.
 * User: liuyayun
 * Date: 12-11-2
 * Time: 下午3:57
 * To change this template use File | Settings | File Templates.
 */
/**
 * 哈希函数,js语言本身没有哈希函数，通过此办法创建自己的哈希函数，
 * 这样方便用于每个对象的id与对象之间的对应。
 * @constructor
 */
Type.registerNamespace("SuperMap.Web.Util");
SuperMap.Web.Util.HashTable=function(){
    /**
     * 存放值得数组。
     */
    this._hash={};
    /**
     * 存放哈希表中值得个数。
     */
    this._count=0;
}
SuperMap.Web.Util.HashTable.prototype={

    /**
     * 添加一个元素。
     * @param key   {String}：
     * @param value    {Object}：
     * @return {Boolean}    是否添加成功。
     */
    add:function(key,value)
    {
        if(this._hash.hasOwnProperty(key))
        {
            return false;
        }
        else
        {
            this._hash[key]=value;
            this._count++;
            return true;
        }
    },
    /**
     * 格局键值移除元素。
     * @param key
     */
    remove:function(key)
    {
        delete this._hash[key];
        this._count--;
    },
    /**
     * 移除所有元素，清空哈希表
     */
    removeAll:function()
    {
        this._hash={};
        this._count=0;
    },
    /**
     * 获取当前哈希表的长度。
     * @return {Number}
     */
    getLength:function()
    {
        return this._count;
    },
    /**
     * 判断某元素是否在当前哈希表中。
     * @param key
     * @return {Boolean}
     */
    contains:function(key)
    {
        return this._hash.hasOwnProperty(key);
    },
    /**
     * 根据键值获取元素值。
     * @param key
     * @return {*}
     */
    getItem:function(key)
    {
        if(this.contains(key))
        {
            return this._hash[key];
        }
        else
        {
            return null;
        }
    }

}
