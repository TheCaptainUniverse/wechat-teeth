var app = getApp();
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  data: {
    curring:-1,
    avatarurl:'',
    detail: [
      {
        id: '1', title: '牙龈是否有出血？',zs:'在刷牙漱口的时候，吐出来的泡沫或者牙刷上是否带有血迹？在吃苹果等水果时，食物上是否会有血迹？照镜子看牙龈，如果有牙龈红肿、有脓，可判断有牙龈炎。局部原因引起的牙龈出血，常见的是患牙龈炎和牙周炎病人。',array: [
          { name: '是' }, { name: '否'},
        ]
      },
      {
        id: '2', title: '牙齿是否发黄、发黑？',zs:'检查牙齿表面、咬合面、里面是否有发黄、发黑的现象。96%的成人和儿童都存在牙齿发黄、发黑的问题。如果明显看到牙结石和牙渍，说明口腔清洁方面存在问题。',array: [
          { name: '是' }, { name: '否'},
        ]
      },
      {
        id: '3', title: '是否有龋齿（蛀牙）？',zs:'检查两个牙齿之间，或牙齿根部是否有变色（初期为浅褐色，透着亮）、破洞现象。检查牙齿表面是否有小黑点。',array: [
          { name: '是' }, { name: '否'},
        ]
      },
      {
        id: '4', title: '牙齿敏感吗？',zs:'当牙齿受到冷、热、酸、甜和机械性作用（摩擦、咬硬物）的刺激时，会突然产生酸痛感觉，或一闪而过，或短暂持续，当刺激去除后，这种酸痛感就会消失。成人牙齿敏感的最普遍原因是牙龈衰退导致牙根暴露。',array: [
          { name: '是' }, { name: '否'},
        ]
      },
      {
        id: '5', title: '牙表面有无裂痕？',zs:'如果进食时，咬在某一特殊部位有剧烈疼痛（咬合痛）。仔细对咀嚼不适的部位进行观察，发现浅黑或深棕色隐裂线，可能横贯牙的牙合面，也可能只在邻近边缘处查见。隐裂部位咬棉签或触碰时常有痛感。牙齿有裂缝，则极有可能出现牙隐裂。',array: [
          { name: '是' }, { name: '否'},
        ]
      },
      {
        id: '6', title: '口腔是否有异味？',zs:'最简单的粗略测试方法：用舌头舔一下手臂，闭上嘴，闻刚刚舔过的部位是否有异味。牙周炎、口腔菌群失调均可以导致口腔异味，早期可更换成专业抗菌，调节口腔菌群的清幽牙膏，清幽牙膏不但能有效缓解口臭、牙龈出血、口腔溃疡等情况，更能抵御胃部第一大致病菌——幽门螺杆菌的侵袭',array: [
          { name: '是' }, { name: '否'},
        ]
      },
      {
        id: '7', title: '牙龈是否有萎缩？',zs:'最典型的，莫过于“黑三角”。相邻牙齿外形最突点虽然接触在一起，可是相邻牙齿之间的牙龈并不能完全覆盖两个牙齿的邻接点之间的间隙到牙齿的牙颈部时，肉眼所能看到的一个三角形间隙，俗称“黑三角”。牙周炎会导致牙龈萎缩、牙槽骨吸收，是导致“黑三角”形成的主要原因。',array: [
          { name: '是' }, { name: '否'},
        ]
      },
      {
        id: '8', title: '是否牙痛？ ',zs:'牙痛则直接表明牙齿出了问题，提示你需要到口腔医院接受治疗。牙痛的原因很多，可能是牙龈炎、牙髓炎或牙周炎等。',array: [
          { name: '是' }, { name: '否'},
        ]
      },
    ],
    number: 0,
  },
  onLoad: function (options) {
    this.setData({
      avatarurl:app.globalData.avatarUrl
    })
  },
  previous:function(e){
    this.setData({
      number: this.data.number-1,
      curring: this.data.curring-1,
    })
  },
  radioChange:function(e){
    let index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    console.log(e.currentTarget.dataset.id)
    console.log(this.data.detail)
    let id = e.currentTarget.dataset.id
    let detail = this.data.detail
    for(let i = 0;i<detail.length;i++){
      if(detail[i].id == id){
        detail[i].array[index].usname = true
        for(let j = 0;j<detail[i].array.length;j++){
          if (j != index){
            detail[i].array[j].usname = false
            console.log(detail[i].array[0].usname)
            if(detail[i].array[0].usname==true){
              Dialog.alert({
                message: detail[i].zs,
                theme: 'round-button',
              }).then(() => {
                // on close
              });
            }
          }
        }
      }
    }
    this.setData({
      detail:detail
    })
  },
  nextstep:function(e){
    let detail = this.data.detail
    let number = this.data.number
    let curring = this.data.curring
    let usname = 0;
    for(let i = 0;i<detail[number].array.length;i++){
      if(!detail[number].array[i].usname){
        usname++
      }
    }
    if(usname == detail[number].array.length){
      wx.showToast({
        title: '答题选项不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    curring++
    number++
    if (curring > 7){
      curring = -1
    }
    this.setData({
      curring: curring,
      number: number,
    })
  },
  subsic:function(e){
    wx.showToast({
      title: '感谢您的答题！',
      icon: 'none',
      duration: 2000, //弹出提示框时长
      mask: true,
      success(data) {
        setTimeout(function () {
          //要延时执行的代码
          wx.navigateBack({
            delta: 1,
          })
        }, 1000) //延迟时间
      }
    })
  },
})
