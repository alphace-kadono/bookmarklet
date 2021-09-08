(function bootstrap(func,a,b){
    var script = document.createElement('script');
    script.src = '//code.jquery.com/jquery-3.2.1.min.js';
    script.onload = function(){
        var $ = jQuery.noConflict(true);
        func($,a,b);
    };
    document.body.appendChild(script);
}(
    function($,a,b){
        console.log('jQuery: ', $().jquery);

        //イベントハンドラから使う変数
        var cnt = 0;
        var parama = a;
        var paramb = b;

        //HTMLに部品を追加する部分
        $('body').prepend(
            '<div style="margin:20px">'+
            '<button id="mybutton1">ボタンです</button><br>'+
            '<input type="checkbox" id="mycheck1">画像を隠す</input>'+
            '<input type="checkbox" id="mycheck2">iframeを隠す</input>'+
            '</div>'
        );

        //ボタンが押されたときの動作を定義
        $('#mybutton1').on('click', function(){
            cnt++;
            alert('button click:'+ cnt);
            console.log('param=%s, %s', parama,paramb);
        });

        //チェックボックスがクリックされたときの動作を定義
        $('#mycheck1').on('click', function(e){
            console.log('check click');
            console.log(e);
            if( $(this).is(':checked')){
                $("img").hide();
            }else{
                $("img").show();
            }
        });
        $('#mycheck2').on('click', function(e){
            if( $(this).is(':checked')){
                $("iframe").hide();
            }else{
                $("iframe").show();
            }
        });

    }
    ,'parameter-A'
    ,'parameter-B'
)
);
