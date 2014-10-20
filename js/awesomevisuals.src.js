//new file
/* ========================================================================
 * Bootstrap: awesome_visuals.src.js v0.1
 * use Font awesome to create great data visualisations
 * ========================================================================
 * Copyright 2014 Wundle.com
 * Licensed under MIT
 * ======================================================================== */


+function ($) {
  'use strict';

  // AwesomeVisuals PUBLIC CLASS DEFINITION
  // ===============================

  var AwesomeVisuals = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.$element   = null
    this.prop =

    this.init('AwesomeVisuals', element, options)
  }

  AwesomeVisuals.VERSION  = '0.1'

  AwesomeVisuals.DEFAULTS = {
    fontawesomeIcon: 'male',
    fillColor: 'red',
    nonFillColor: 'lightgrey',
    fillText:{
      color: 'white',
      format: '{value.percentage}'
    },
    fillDirection: 'up',
    fillAdjustment: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    height: 400,
    fillProportion: 0.6
  }

  AwesomeVisuals.PRIVATES = {
    containerWidth: 400,
    lang: {
            decimalPoint: '.',
            thousandsSep: ','
        }
  }

  AwesomeVisuals.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)

    var selectWidth = this.$element.width();

    this.options.fillProportion = Math.max(Math.min(this.options.fillProportion,1),0);

    //
    if (selectWidth == 0){
      this.$element.css("width", AwesomeVisuals.PRIVATES.containerWidth );
    }

    var wrapper = $("<div>").addClass("awesomeVisualsWrapper").css("height", this.options.height);

    var fill = $("<div>").addClass("fill").css("color", this.options.nonFillColor);
    var partFill = $("<div>").addClass("partFill").css("color", this.options.fillColor);


    var fillHeight = (this.options.height - this.options.fillAdjustment.top - this.options.fillAdjustment.bottom) ;
    var partFillMarginTop = fillHeight* (1-this.options.fillProportion) + this.options.fillAdjustment.top;
    var partFillHeight = this.options.height - partFillMarginTop;
     partFill.css({
      "margin-top": partFillMarginTop,
      "height": partFillHeight  
     });

     //create fill elements
    var fillIcon = $("<div>").addClass('iconHolder').css({
      "font-size":this.options.height}).append($("<i>").addClass('fa fa-'+ this.options.fontawesomeIcon))
    var fillText = $("<div>").addClass("fillText").css({
      "height": this.options.height,
      "color": this.options.fillColor }).append($("<div>").html(this.getLabel(this.options.fillText.format,this.options.fillProportion )))

    fill.append(fillIcon).append(fillText);
    //
    //create part fill elements
    var partFillIcon = $("<div>").addClass('iconHolder').css({
      "font-size":this.options.height}).append($("<i>").addClass('fa fa-'+ this.options.fontawesomeIcon))
    var partFillText = $("<div>").addClass("fillText").css({
      "height": this.options.height,
      "color": this.options.fillText.color}).append($("<div>").html(this.getLabel(this.options.fillText.format,this.options.fillProportion )))

    partFill.append(partFillIcon).append(partFillText);

    wrapper.append(fill).append(partFill);

    this.$element.append(wrapper);
  }

  AwesomeVisuals.prototype.getDefaults = function () {
    return AwesomeVisuals.DEFAULTS
  }

  AwesomeVisuals.prototype.getOptions = function (options) {
    options = $.extend(true,this.getDefaults(), this.$element.data(), options)

    return options
  }

  AwesomeVisuals.prototype.getLabel = function (str, val){

      var lang = AwesomeVisuals.PRIVATES.lang;
     return str.replace(/{value.percentage}/g,this.numberFormat(val*100, 0, lang.decimalPoint, lang.thousandsSep ) + "%")

  }


  AwesomeVisuals.prototype.numberFormat = function (number, decimals, decPoint, thousandsSep) {
        // http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_number_format/
      var  n = number, c = decimals,
    d = decPoint === undefined ? defualtOptions.decimalPoint : decPoint,
    t = thousandsSep === undefined ? defualtOptions.thousandsSep : thousandsSep, s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(+n || 0).toFixed(c))),
    j = i.length > 3 ? i.length % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
    (c>0 ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }

  // AwesomeVisuals PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('wun.AwesomeVisuals')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('wun.AwesomeVisuals', (data = new AwesomeVisuals(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.AwesomeVisuals

  $.fn.AwesomeVisuals             = Plugin
  $.fn.AwesomeVisuals.Constructor = AwesomeVisuals


  // AwesomeVisuals NO CONFLICT
  // ===================

  $.fn.AwesomeVisuals.noConflict = function () {
    $.fn.AwesomeVisuals = old
    return this
  }

}(jQuery);
