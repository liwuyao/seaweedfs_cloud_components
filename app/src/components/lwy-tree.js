/**树的数据结构
 * {
 *  title:''，//标题
 *  id:'', //标题
 *  children:[],//子集
 *  menuState:'',//展开状态
 *  isActive:'',//是否当前选中
 *  loading:'',//加载中
 * }
 * 
*/
function sugonTree(config) {
  var defaultConfig = {
    list: [],
    idKey: 'count',
    container: '',
    width:'200px',
    choose:function(res){
      console.log(res,'选中')
    }
  }
  defaultConfig = Object.assign(defaultConfig, config)
  for (var i in defaultConfig) {
    if(i == 'list'){
      this[i] = this.$clone(defaultConfig[i])
    }else{
      this[i] = defaultConfig[i]
    }
  }
  this.department = {
    tag: "department",
    type: "div",
    attr: {
      class: `cloud-application-menu-content`
    },
    children: []
  };
  this.domTree = {}
  this.domTreeData = {}
}
sugonTree.prototype.create = function (data = [],fn) {
  this.list = this.$clone(data)
  this.rendTree(this.list)
  fn(this.list)
}
sugonTree.prototype.rendTree = function (list, hadRender) {
  var _this = this
  setCount(list)
  function setCount(arr, num) {
    arr.forEach((ele) => {
      if (!num) {
        ele.count = 1
      } else {
        ele.count = num + 1
      }
      if (ele.children) {
        setCount(ele.children, ele.count)
      }
    })
  }
  
  function computeHeight(item, more) {
    if (!item.menuState) {
      item.height = 0
    }
    if (item. menuState && !more) {
      if (item.children) {
        item.height = item.children.length * 40
        let hadTrue = item.children.filter((ite) => ite. menuState)
        if (hadTrue.length) {
          computeHeight(item, hadTrue)
        }
      }
    }
    if (item. menuState && more) {
      more.forEach((ele)=>{
        if (ele.children) {
          item.height = ele.children.length * 40 + item.height
          // console.log(item.title,more)
          let hadTrue = ele.children.filter((ite) => ite. menuState)
          if (hadTrue.length){
            computeHeight(item, hadTrue)
          }
        }
      })
    }
  }
  setHeight(list)
  function setHeight(arr) {
    arr.forEach((ele) => {
      computeHeight(ele)
      if (ele.children) {
        setHeight(ele.children)
      }
    })
  }
  var target = [];
  setTree(list, target);
  function setTree(arr, source) {
    arr.forEach((item) => {
      const msgDom = [];
      let iconStr = 'icon-xiala iconfont'
      if(item.menuState && !item.loading){
        iconStr = 'icon-xiala tree-rotate iconfont'
      }
      if(!item.menuState && item.loading){
        iconStr = 'el-icon-loading'
      }
      if(!item.menuState && !item.loading && !item.children){
        iconStr = 'icon-xiala iconfont'
      }
      if(!item.menuState && !item.loading && item.children){
        if(!item.children.length){
          iconStr=""
        }
      }
      if(item.children){
        if(!item.children.length){
          iconStr = ""
        }
      }
      msgDom.push({
        type: "i",
        attr: {
          class: `tree-caret iconfont ${iconStr}`
        }
      });
      if(_this.html){
        var htmlDom = _this.html(item)
        msgDom.push(htmlDom)
      }else{
        msgDom.push({
          type: "span",
          attr: {
            class: "cloud-tree-menu-span",
            innerText: item.title
          }
        });
      }
      var obj = {
        type: "div",
        attr: {
          class: "cloud-tree-menu"
        },
        event: [
          {
            type: "click",
            fn: function (e) {
              e.stopPropagation();
              //let not_need_false = [item]
              list.forEach(() => {
                if (item.children) {
                  find(item.children, [])
                }
              })
              //setFalse(list)
              // function setFalse(data) {
              //   data.forEach((ele) => {
              //     if (!not_need_false.some((ite) => ite[_this.idKey] === ele[_this.idKey])) {
              //       ele. menuState = false
              //     }
              //     if (ele.children) {
              //       setFalse(ele.children)
              //     }
              //   })
              // }
              function find(data, startArr) {
                data.forEach((ele) => {
                  if (ele === item) {
                    //not_need_false = startArr
                  } else if (ele.children) {
                    startArr.push(ele)
                    find(ele.children, startArr)
                  }
                })
              }
              if (item. menuState) {
                item. menuState = false;
                item.loading = false
                _this.rendTree(list, true)
              } else {
                item.loading = true
                _this.choose(item,e)
              }
            }
          }
        ],
        children: [
          {
            type: "div",
            attr: {
              class: `cloud-application-menu-msg ${item.isActive?'menu-active':''}`,
              style: {
                paddingLeft: item.count ? 18 * (item.count - 1) + "px" : 0,
                width:'calc(100% - '+ (item.count ? 18 * (item.count - 1):0) + 'px'+')'
              }
            },
            children: msgDom
          }
        ]
      };
      source.push(obj);
      if (item.children) {
        var box = {
          type: "div",
          attr: {
            class: "cloud-application-menu-box",
            style: {
              height: item.height ? item.height + 'px' : 0
            },
          },
          children: []
        };
        obj.children.push(box);
        setTree(item.children, box.children, item.count);
      }
    });
  }
  _this.department.children = target
  var departmentDom = _this.render(_this.department,_this.container);
  if (!hadRender) {
    document.getElementById(_this.container).appendChild(departmentDom);
  }
}
sugonTree.prototype.resetTree=function(list){
  document.getElementById(this.container).innerHTML = ''
  this.domTree = {}
  delete this.domTreeData[this.container]
  this.rendTree(list,false)
}
sugonTree.prototype.createUUID = function(){
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
sugonTree.prototype.render = function (domMsg,container) {
  var _this = this
  if(!this.domTreeData[container]){
    this.domTreeData[container] = this.$clone(domMsg)
  }else{
    resetMsg(domMsg,this.domTreeData[container])
  }
  setTreeId()
  function setTreeId(){
    if(!_this.domTreeData[container].elementId){
      _this.domTreeData[container].elementId = _this.createUUID()
    }
    setId(_this.domTreeData[container].children)
  }
  function setId(arr){
    arr.forEach((item)=>{
      if(!item.elementId){
        item.elementId = _this.createUUID()
      }
      if(item.children){
        setId(item.children)
      }
    })
  }
  function resetMsg(target,source){
    for(var i in target){
      if(typeof(target[i]) !== 'object'){
        source[i] = target[i]
      }
      if(typeof(target[i]) === 'object' && !Array.isArray(target[i])){
        resetMsg(target[i],source[i])
      }
      if(Array.isArray(target[i])){
        source[i].forEach((item,index)=>{
          resetMsg(target[i][index],item)
        })
      }
    }
  }
  var firstDom = createDom(_this.domTreeData[container], _this.domTreeData[container].tag)
  _this.domTree[_this.domTreeData[container].tag] = firstDom
  rendDom(_this.domTreeData[container].children ? _this.domTreeData[container].children : [], firstDom, _this.domTreeData[container].tag)
  function rendDom(data, fatherDom,fatherIndex) {
    data.forEach((item, index) => {
      item.tag = `${fatherIndex}-${index}`
      var dom = createDom(item, item.elementId)
      if (fatherDom && !_this.domTree[item.elementId]) {
        fatherDom.appendChild(dom)
      }
      if (!_this.domTree[item.elementId]) {
        _this.domTree[item.elementId] = dom
      }

      if (item.children) {
        rendDom(item.children, dom, `${fatherIndex}-${index}`)
      }
    })
  }
  function createDom(item, id) {
    var dom = null
    if (!_this.domTree[id]) {
      dom = document.createElement(item.type)
    } else {
      dom = _this.domTree[id]
    }
    if (item.attr) {
      for (var i in item.attr) {
        if (i === 'style') {
          for (var key in item.attr.style) {
            dom.style[key] = item.attr.style[key]
          }
        } else {
          var notAttr = ['innerText', 'innerHtml']
          if (notAttr.indexOf(i) === -1) {
            dom.setAttribute(i, item.attr[i])
          } else {
            dom[i] = item.attr[i]
          }
        }
      }
    }
    if (item.event && !_this.domTree[id]) {
      item.event.forEach((ite) => {
        dom.addEventListener(ite.type, null)
        dom.addEventListener(ite.type, function (e) {
          ite.fn(e)
        })
      })
    }
    return dom
  }
  return firstDom
}
sugonTree.prototype.$clone = function(obj){
  var _toString = Object.prototype.toString;
    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
      return obj;
    }
    // DOM Node
    if (obj.nodeType && 'cloneNode' in obj) {
      return obj.cloneNode(true);
    }
    // Date
    if (_toString.call(obj) === '[object Date]') {
      return new Date(obj.getTime());
    }
    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
      var flags = [];
      if (obj.global) { flags.push('g'); }
      if (obj.multiline) { flags.push('m'); }
      if (obj.ignoreCase) { flags.push('i'); }
  
      return new RegExp(obj.source, flags.join(''));
    }
    var result = Array.isArray(obj) ? [] :
      obj.constructor ? new obj.constructor() : {};
  
    for (var key in obj ) {
      result[key] = this.$clone(obj[key]);
    }
    return result;	
  }
  export default sugonTree