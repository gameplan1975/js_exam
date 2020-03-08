//面倒なので、どこからでも得点を参照できるように入れ物を用意
let tokuten =　[0,0,0,0,0];
let gouhi = "合格";

// DOMの読み込みが終わったらfunction()の中の処理を実行します。
$(document).ready(function(){

    function score_indicate(){
      
      let subject_points = [Number($('#national_language').val()),
                            Number($('#english').val()),
                            Number($('#mathematics').val()),
                            Number($('#science').val()),
                            Number($('#society').val())
                            ];
      

      /*追加課題１……以下の部分を短縮する
      let sum = subject_points[0];
      sum = sum + subject_points[1];
      sum = sum + subject_points[2];
      sum = sum + subject_points[3];
      sum = sum + subject_points[4];
      */
     let sum = subject_points.reduce(function(a, b){return a + b;}); 

      $("#sum_indicate").text(sum);
      
      let average = (sum / subject_points.length); 
      $("#average_indicate").text(average);    
      
      tokuten = subject_points; //仮の入れ物tokutenに移し替える
    };
    
    function get_achievement(){
      let averageIndicate = $("#average_indicate").text();

      if ( averageIndicate >= 80){
        return "A";
        }else if ( averageIndicate >= 60){
            return "B";
        }else if ( averageIndicate >= 40){
            return "C"
        } else {
        return "D";
        }
    };    

    function get_pass_or_failure(){
          for (let i = 0; i < tokuten.length; i++){
          if (tokuten[i] < 60){
              gouhi = "不合格";
          };
        }
      return gouhi;
    };

    function judgement(){
      let achievement = get_achievement();
      let pass_or_failure = get_pass_or_failure();

      //追加課題２……最終ジャッジメッセージ出力の前に、以前のメッセージを削除(removeではなくemptyを採用)
      $("#declaration").empty();
   
      $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${achievement}で${pass_or_failure}です</label>`);
    };

    $('#national_language, #english, #mathematics, #science, #society').change(function() {
      score_indicate();
    });

    $('#btn-evaluation').click(function() {
      $("#evaluation").text(get_achievement());
    });

    $('#btn-judge').click(function() {
        $("#judge").text(get_pass_or_failure());
    });

    $('#btn-declaration').click(function() {
        $("#declaration").text(judgement());
    });
});

