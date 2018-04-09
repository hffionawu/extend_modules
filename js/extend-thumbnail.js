(function($){
  function extendThumbnail() {
    var extendItems = $('.extend-cell'),
        expanedCtrl = $('.extend-thumbnail'),
        extendContent = $('.extend-content'),
        extendClosed = $('.extend-closed');
   /*
    * 當每一個 class 為 extend-thumbnail 下的元素被點擊時
    * 點擊事件發生的元素尋找符合指定字串的祖輩元素
    * 如果符合指定字串的祖輩元素 吻合條件 (三元) 運算子的指定 
    *   -> conditions ? true do : false do
    * 執行 function extend
    * 則對符合指定字串的祖輩元素 添加或移除  is-collapse 或 is-extended 類名
    * 不符合條件 (三元) 運算子的指定時 
    * 執行 function unExpand(parent)
    * 則所有指定字串的祖輩元素移除 is-extended (開) 類名，添加 is-collapse (閉) 類名
    * 
    * 擴展 div 關閉
    * 當 extendClosed 發生點擊事件時 如果符合指定字串的祖輩元素是有 is-extended 的類名
    * 符合指定字串的祖輩元素 添加 is-collapse 的類名 隨後移除  is-extended 類名
  */
    $("*", expanedCtrl).each(function (i, elm) {
      $(elm).on('click', function (event) {
        event.preventDefault();
        function extend() {
          $(event.target).closest(extendItems).toggleClass('is-collapse is-extended')
            .siblings().closest(extendItems).removeClass('is-extended').addClass('is-collapse');
        }
        function unExpand(parent) {
          $(elm).parents(parent).toggleClass('is-extended is-collapse')
        }
        $(event.target)
          .closest(extendItems).is('.is-collapse') ? extend() : unExpand(extendItems)
        setTimeout(function () {
          $('body, html').animate({
            scrollTop: $(elm).parents().offset().top + $(elm).parents().height() / 2
          }, 400);
        }, 400, true)
        return false;
      });//click

    });
    extendClosed.on('click', function (event) {
      if ($(event.target).parents(extendItems).is('.is-extended')) {
        $(event.target).parents(extendItems).toggleClass('is-extended is-collapse');
      }
    });
  }; extendThumbnail();
})(jQuery);