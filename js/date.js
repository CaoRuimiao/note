$(function(){
    //输入框的动画
    var add=$(".add");
    var form=$("form");
    var formClose=$(".formclose");
    var flag=true;
    add.click(function(){
        if(flag){
            form.attr({"data-a":"animate-slidedown"}).css("display","block");
            flag=false;
        }else{
            form.attr({"data-a":"animate-slideup"});
            flag=true;
        }
    });
    formClose.click(function(){
        form.attr({"data-a":"animate-slideup"});
        flag=true;
    });
    var submitBtn=$('.submitBtn');
    submitBtn.click(function(){
        var textv=form.find(":text").val();
        var conv=form.find("textarea").val();
        var timev=form.find("#time").val();
        //表单验证
        if(textv==""){
            alert("标题不能为空！");
            return;
        }
        if(conv==""){
            alert("内容不能为空！");
            return;
        }
        if(timev==""){
            alert("时间必填！");
            return;
        }
        //存储信息
        var obj={title:textv,content:conv,time:timev,id:new Date().getTime()};
        var oldv=(localStorage.message==null)?[]:(JSON.parse(localStorage.message));
        oldv.push(obj);

        var str=JSON.stringify(oldv);
        localStorage.message=str;

        //清空表单
        form.find(":text").val("");
        form.find("textarea").val("");
        form.find("#time").val("");

        // 显示信息
        var left=Math.random()*($(window).width()-$(".news").outerWidth());
        var top=Math.random()*($(window).height()-$(".news").outerHeight());

        var copy=$(".news:first").clone(false).appendTo("body").fadeIn(100).css({left:left,top:top}).attr({"data-a":"animate-sd"}).attr("id",obj.id);
        // var ran=Math.floor(Math.random()*3+1);
        // copy.css({background:"url(images/bg"+ran+".svg) no-repeat",backgroundSize:"cover"});
        copy.find(".news-title").html(obj.title);
        copy.find(".news-con").html(obj.content);
        copy.find(".news-time").html(obj.time);

    });


    //刷新页面是让原来的内容显示在页面
    var newv=(localStorage.getItem("message")==null)?[]:JSON.parse(localStorage.getItem("message"));
    for(var i=0;i<newv.length;i++){
        var left=Math.random()*($(window).width()-$(".news").outerWidth());
        var top=Math.random()*($(window).height()-$(".news").outerHeight());
        var news=$(".news:first").clone(false).appendTo("body").fadeIn(100).css({left:left,top:top}).removeAttr("data-a").attr("id",newv[i].id);
        // var ran=Math.floor(Math.random()*3+1);
        // news.css({background:"url(images/bg"+ran+".svg) no-repeat",backgroundSize:"cover"});
        var newvtitle=news.find(".news-title").html(newv[i].title);
        var newvcon=news.find(".news-con").html(newv[i].content);
        var newvtime=news.find(".news-time").html(newv[i].time);
    }



    //删除每一个
    $(document).delegate(".conclose","click",function(){
        var arr=JSON.parse(localStorage.getItem("message"));
        var id=$(this).parent().attr("id");
        for(var i=0;i<arr.length;i++){
            if(id==arr[i].id){
                arr.splice(i,1);
                $(this).parent().remove();
                localStorage.message=JSON.stringify(arr);
            }
        }
    })

    //拖动
    $(document).on("mousedown",function(e){
        var target= e.target;
        var ox= e.offsetX;
        var oy= e.offsetY;
        var w=$(".news").outerWidth();
        var h=$(".news").outerHeight();
        //e.preventDefault();
        $(document).on("mousemove",function(e){
            var px= e.pageX;
            var py= e.pageY;
            //边界判断
            var lefts=px-ox;
            var tops=py-oy;
            if(lefts>$("body").width()-w){
                lefts=$("body").width()-w;
            }
            if(lefts<0){
                lefts=0;
            }
            if(tops>$(window).height()-h){
                tops=$(window).height()-h;
            }
            if(tops<0){
                tops=0;
            }
            
            $(target).trigger("drag",{left:lefts,top:tops});
            // $(target).trigger("drag",{ox:ox,oy:oy,px:px,py:py});
        });
        $(document).on("mouseup",function(){
            $(document).off("mousemove");
            $(document).off("mouseup");
        })
    });
    
    // 拖拽事件
    $(document).delegate(".news","drag",function(e,data){
        $(this).css({left:data.left,top:data.top});
        // $(this).css({left:data.px-data.ox,top:data.py-data.oy});
    })
    $(document).delegate(".news","mousedown",function(e){
        $(".news").css({zIndex:0});
        $(this).css({zIndex:1});
    })


})