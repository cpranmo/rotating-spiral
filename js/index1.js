(function(){
    var oA = document.getElementById("App");
    var oUl = document.querySelector("#App .list ul");
    var oBtn = document.querySelectorAll("#App .btn ul li");
    var oLi = [];  
    var timer = null; 
    
    // 创建125个li添加到ul上
    (function(){
        var fg = document.createDocumentFragment();   /* DOM文档节点 */
        for(var i = 0; i < 125; i++){
            let Li = document.createElement("li");
            let dd = data[i] || {"order":"118","name":"Uuo","mass":""};
            Li.innerHTML = `<p>${dd.name}</p>
                            <p>${dd.order}</p>
                            <p>${dd.mass}</p>`;
            oLi.push(Li);       // 保存所有的li
            Li.style.transform = `translate3d(${Math.floor(Math.random()*7000-3500)}px,${Math.floor(Math.random()*7000-3500)}px,${Math.floor(Math.random()*8000-4000)}px)`;
            fg.appendChild(Li);
        }
        oUl.appendChild(fg);  
        oUl.offsetLeft;   //让浏览器先重绘
        move();
    })();

    // 点击按钮切换
    (function(){
        oBtn.forEach((ele,index)=>{
            ele.onclick = function(){
                // 点击之前先清除定时器
                clearInterval(timer)
                switch(index){
                    case 0 :
                        Table();
                        move();
                        break;
                    case 1:
                        Sphere();
                        move();
                        break;
                    case 2:
                        Helix();
                        move();
                        break;
                    case 3:
                        Grid();
                        move();
                        break;
                }
            }
        });
    })();

    // 随机自动轮播布局
    function move(){
        timer =  setInterval(() => {
            count = random(1,5);
            if(count == 1){   
                Table();
            }else if(count == 2){
                Sphere();
            }else if(count == 3){
                Helix();
            }else{
                Grid();
            }
            console.log(count);
        }, 8000);
    }

    // 产生两个数之间的随机数
    function random(max,min){
        return Math.floor(Math.random()*(max - min) + min);
    }

    // 创建Table布局
    function Table(){
        // 前18个不规则坐标
        var coordinate = [
            {x:0,y:0},
            {x:17,y:0},
            {x:0,y:1},
            {x:1,y:1},
            {x:12,y:1},
            {x:13,y:1},
            {x:14,y:1},
            {x:15,y:1},
            {x:16,y:1},
            {x:17,y:1},
            {x:0,y:2},
            {x:1,y:2},
            {x:12,y:2},
            {x:13,y:2},
            {x:14,y:2},
            {x:15,y:2},
            {x:16,y:2},
            {x:17,y:2},
        ];
        oLi.forEach((ele,index)=>{
            var x,y;
            if(index < 18){
                x = coordinate[index].x;
                y = coordinate[index].y;
            }
            else if(index < 125){
                x = index % 18;
                y = Math.floor(index/18) + 2;
            }
            // 倆个系列元素新排布位置
            if(index > 89 && index < 120){
                x = (index - 90)% 15 + 1.5;
                y = Math.floor((index - 90)/ 15) + 7;
            }
            // 最后5个未知重金属位置
            if(index >= 120 && index < 125){
                x = 17;
                y = 6;
            }
           var x_ = x - 8.5;
           var y_ = y - 4;
           ele.style.transform = `translate3d(${x_*150}px,${y_*200}px,0px)`;
        });        
    };

    // 创建Sphere布局
    function Sphere(){
        // 球表面到球心的距离是相等的所有z轴距离是固定的
        // 这个布局主要计算的是第几圈，第几圈的第几个？
        // 球各个层上面的个数
        var foor = [1,3,7,9,13,16,22,18,14,10,7,4,1];
        // 将球划分为多少层
        var len = foor.length;
        // x轴上每圈旋转的角度
        var x = 180 / (len - 1);
        oLi.forEach((ele,index)=>{
            // 定义第几层,第几个
            var circ,num;  
            // 统计循环的个数
            let sum = 0;
            for(var i = 0; i < len ; i++){
                sum += foor[i];
                if(sum >= (index+1)){
                    // 确定第几圈
                    circ = i;     
                    // num = index - (sum - foor[i]);
                    //  确定第几圈的第几个
                    num = index - sum + foor[i];
                    // console.log(i,num);
                    break;
                }
            }
            var xdeg = 90 - x * circ;
            // 改变每圈初始位置
            var dd = foor[circ]* 10;
            var ydeg = 360 / (foor[circ]) * num + dd;
            ele.style.transform = `rotateY(${ydeg}deg) rotateX(${xdeg}deg) translate3d(0px,0px,1000px)`;          
        });
    }

    // 创建Helix布局
    function Helix(){
        oLi.forEach((ele,index)=>{
            var rin = 125/4;    // 一圈圆环的个数
            var deg = 360/rin;   // 旋转的角度 
            var hh = 10;     // 控制高度
            ele.style.transform = `rotateY(${deg*index}deg) translateZ(${820}px) translateY(${10*(index-62)}px)`;
        });
    };

    // 创建Grid布局
    function Grid(){
        oLi.forEach((ele,index)=>{
            var x = index % 5;   // x坐标
            var y = Math.floor((index % 25) / 5);   // y坐标 向下取整
            var z = Math.floor( index / 25);    // z坐标
            // 将第一个坐标置在中间
            var x_ = x - 2;
            var y_ = y - 2;
            var z_ = z - 2;
            ele.style.transform = `translate3d(${x_*300}px,${y_*300}px,${-z_*1000}px)`;
        });
    };

    // 鼠标点击事件
    (function(){
        var rX = 0,
            rY = 0,
            tZ = -3410;   
        // 鼠标拖拽事件
        (function(){
            var lastX,lastY,        // 鼠标按下时坐标
                srotateX,srotateY,  // 鼠标旋转变化量
                startX,startY,
                XX = 0,YY = 0,     // 两点坐标
                minss,
                moveDate;   
            // 鼠标在页面按下之后
            document.onmousedown = function(e){
                e = e || window.event;
                // 先清除惯性事件
                cancelAnimationFrame(minss);
                startX = lastX = e.clientX;
                startY = lastY = e.clientY;
                srotateX = rX;
                srotateY = rY;

                document.onmousemove = function(e){
                    e = e || window.event;
                    // 获取移动实时时间
                    moveDate = new Date(); 
                
                    // 移动时当前位置坐标
                    var newX = e.clientX,
                        newY = e.clientY;
                    // 差值
                    var x_ = newX - lastX,
                        y_ = newY - lastY;
                    
                    // 角度的变化
                    rX = srotateX - y_ * 0.1;
                    rY = srotateY + x_ * 0.1;

                    // 改变样式
                    oUl.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
                    
                    // 移动连续两点之间距离
                    XX = newX - startX;
                    YY = newY - startY;
                   
                    // 实时改变位置
                    startX = newX;
                    startY = newY;
                }
            } 
            // 鼠标在页面抬起时
            document.onmouseup = function(){
                document.onmousemove = null;

                // 时间和最后一次的move时间相差较大就不惯性
                if(new Date() - moveDate > 10) return;
                // 惯性函数
                minss = requestAnimationFrame(inertia);
                function inertia(){
                    XX *= 0.92;
                    YY *= 0.92;
                    // 改变的角度
                    rY += XX * 0.1;
                    rX -= YY * 0.1;
                    // 样式改变
                    oUl.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
                    if(Math.abs(XX)< 0.5 && Math.abs(YY)< 0.5){
                        return;
                    }
                    requestAnimationFrame(inertia);
                }

            };
            // 鼠标移动到ul上暂停
            oUl.addEventListener("mouseenter",function(){
                clearInterval(timer);
            });


            // 鼠标按下事件监听函数
            // document.addEventListener("mousedown",function(ev){
            //     // 清除定时器
            //     cancelAnimationFrame(minss);
            //     lastX = ev.clientX;
            //     lastY = ev.clientY;
            //     srotateX = rX;    // 旋转的角度
            //     srotateY = rY;

            //     startX = ev.clientX;
            //     startY = ev.clientY;
            //     XX = 0;
            //     YY = 0;
            //     this.addEventListener("mousemove",move);
            // });

            // 鼠标抬起事件监听
            // document.addEventListener("mouseup",function(){
            //     this.removeEventListener("mousemove",move);

            //     // 抬起时间和最后一次的move时间相差较大，那就不要惯性动画了
            //     if(new Date() - moveDate > 10) return;
            //     // 抬起时的惯性变化    
            //     minss = requestAnimationFrame(inertia);   // 定时器监听
            //     function inertia(){
            //         XX *= 0.92;
            //         YY *= 0.92;
            //         // console.log(XX);
            //         // console.log(YY);
            //         // 改变的角度
            //         rY += XX * 0.1;
            //         rX -= YY * 0.1;
            //         // 惯性改变样式
            //         oUl.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
                    
            //         // 当条件不合时停止
            //         if(Math.abs(XX) <= 0.5 && Math.abs(YY) <= 0.5)
            //             return;
            //         minss = requestAnimationFrame(inertia);
            //     }

            // });

            // 鼠标移动函数
            // function move(ev){
            //     // 移动实时实际  当new Date()不传参时可以省略()不写
            //     moveDate = new Date();

            //     var newX = ev.clientX,
            //         newY = ev.clientY;
            //     // 移动之间差值
            //     var x_ = newX - lastX,
            //         y_ = newY - lastY;
            //     //  移动时角度的改变
            //     rY = srotateY + x_ * 0.1  ;
            //     rX = srotateX - y_ * 0.1 ;

            //     // 给定样式
            //     oUl.style.transform = ` translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
                
            //     // 计算最后两点坐标的距离
            //     XX = newX - startX;
            //     YY = newY - startY;

            //     // 保存当前坐标
            //     startX = newX;
            //     startY = newY;
            //     // console.log(XX);
            //     // console.log(YY);
            // }

        })();

        // 鼠标滚轮事件
        (function(){
            // 火狐滚轮
            document.addEventListener("DOMMouseScroll",wheel);
            // 谷歌滚轮
            document.addEventListener("mousewheel",wheel);
            // 滚轮函数
            function wheel(e){
                // console.log(e);
                /*
                * chrome 用 e.wheelDelta 来区分滚动方向
                *       数值是120的倍数
                *       往下拉是负值，往上推是正值
                *
                * Firefox 用 e.detail 来区分滚轮方向
                *       数值是3的倍数
                *       往下拉是正值，往上推是负值
                *
                * */
                var spend = e.detail/ -3 || e.wheelDelta/120;
                tZ += spend *200;
                tZ = Math.max(tZ,-7000);    // 限制最大值
                tZ = Math.min(tZ,-1500);    // 限制最小值
                oUl.style.transform = `translateZ(${tZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
            }
        })();

    })();
    

})();