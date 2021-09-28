(function (DOM) {
    'use strict';

    function inicialize() {

        var $mega_sena = new DOM('[data-js="megasenhatable"]');
        var $loto_mania = new DOM('[data-js="lotomaniatable"]');
        var $loto_facil = new DOM('[data-js="lotofaciltable"]');
        var $btn_megasenha = new DOM('[data-js="megasenha"]');
        var $btn_lotofacil = new DOM('[data-js="lotofacil"]');
        var $btn_lotomania = new DOM('[data-js="lotomania"]');
        var $CompleteGame = new DOM('[data-js="CompleteGame"]');
        var $clearGame = new DOM('[data-js="ClearGame"]');
        var $Number = new DOM('[data-js="number"]');
        var data = [];
        var userChoiseGame = {
            type:'',
            range:'',
            price: '',
            max_number:''};

        function setAttr(element,rules) {
            element.get()[0].setAttribute('type',rules.type);
            element.get()[0].setAttribute('range',rules.range);
            element.get()[0].setAttribute('price',rules.price);
            element.get()[0].setAttribute('max-number',rules.max_number);
        };

        function stylesBtnGame(element,style) {
            element.get()[0].style.borderColor = style.color;
            element.get()[0].textContent = style.type;
        };

        function rulesGame() {
            var ajax = new XMLHttpRequest();
            ajax.open('get','games.json');
            ajax.send();
            ajax.addEventListener("readystatechange", function () {
                if(isOk(ajax)){
                    var rules = JSON.parse(ajax.responseText);

                    stylesBtnGame($btn_lotofacil,rules.types[0]);
                    stylesBtnGame($btn_megasenha,rules.types[1]);
                    stylesBtnGame($btn_lotomania,rules.types[2]);
                    setAttr($btn_lotofacil,rules.types[0]);
                    setAttr($btn_megasenha,rules.types[1]);
                    setAttr($btn_lotomania,rules.types[2]);

                    

                    showlotomania();
                    showMegaSena();
                    showlotofacil();
                    chooiseDefault();
                };
            });
        };

        

        function isOk(ajax) {
            return ajax.readyState === 4 && ajax.status === 200;
        };

        function isVisible(game1,game2,game3) {
            
            game1.get()[0].style.display = 'block'
            game2.get()[0].style.display = 'none';
            game3.get()[0].style.display = 'none';
        };

        function showMegaSena() {
          $btn_megasenha.on('click',function () {
              isVisible($mega_sena,$loto_mania,$loto_facil);
              setUserChoise($btn_megasenha);
          },false) ;
        };

        function showlotofacil() {  
            $btn_lotofacil.on('click',function () {
                isVisible($loto_facil,$loto_mania,$mega_sena);
                setUserChoise($btn_lotofacil);
            },false);
          };

          function showlotomania() { 
            $btn_lotomania.on('click',function () {
                isVisible($loto_mania,$loto_facil,$mega_sena);
                setUserChoise($btn_lotomania);
            },false);
          };

        function setUserChoise(element) {
            userChoiseGame = {
                type:element.get()[0].getAttribute('type'),
                range:element.get()[0].getAttribute('range'),
                price:element.get()[0].getAttribute('price'),
                max_number:element.get()[0].getAttribute('max-number')
            };
        }
        function chooiseDefault() {
            isVisible($loto_facil,$loto_mania,$mega_sena);
            setUserChoise($btn_lotofacil);
        };

        //função q verifica se os num gerado/escolhido ja existe no painel
        function  isEqualNumber(number) {
            var newArray = data.filter((item)=>{
                return item === number;
            });
            return newArray.length==0 ? true : false;
        };

        function generateNumber(max,lenght) {
    
            var i =0;
            while(i<lenght){
                var numberGenerate = Math.floor(Math.random() * max + 1);
                if(isEqualNumber(numberGenerate)){
                    data.push(numberGenerate);
                    i++;
                };
            };
        };

        function ClearData() {
            data = [];
            $Number.select();
        };

        $CompleteGame.on('click',function () {
            ClearData();
            generateNumber(userChoiseGame.range,userChoiseGame.max_number);
        },false);

        $clearGame.on('click',function () {
           ClearData();
           },false)



        $Number.on('click',function (div) {   
            if(isEqualNumber(div.target.childNodes[0].nodeValue) && isOtherNumber()){
                data.push(div.target.childNodes[0].nodeValue);
                div.target.style.backgroundColor = 'yellow';
            };
        },false);

        function isOtherNumber() {
            return userChoiseGame.max_number > data.length ? true : false;
        };
    
        rulesGame();
    
    };

    return inicialize()
})(window.DOM);