import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
// import * as d3 from 'd3';
// import jsonData from './risko.json'
declare var d3: any;
@Component({
  selector: 'app-risko-meter',
  templateUrl: './risko-meter.component.html',
  styleUrls: ['./risko-meter.component.scss'],

})
export class RiskoMeterComponent implements OnInit {
  @Input() set content(val){
    this.data=val
    this.creditScore =parseFloat(val.score)
  }
  data:any;
  gaugemap:any = {};
  creditScore = 250;
  constructor() { }
  ngOnInit() {

  }
ngAfterViewInit() {
  setTimeout(() => {

    this.draw();
  }, 2000);
}
  draw() {
    var self = this;
    var gauge = function (container, configuration) {

      var config = {
        size: 100000,
        clipWidth: 200,
        clipHeight: 110,
        ringInset: 20,
        ringWidth: 20,

        pointerWidth: 10,
        pointerTailLength: 2,
        pointerHeadLengthPercent: 0.5,

        minValue: 0,
        maxValue: 10,

        minAngle: -90,
        maxAngle: 90,

        transitionMs: 750,

        majorTicks: 4,
        labelFormat: d3.format('d'),
        labelInset: 10,

        arcColorFn: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
      };
      var range = undefined;
      var r = undefined;
      var pointerHeadLength = undefined;
      var value = 0;

      var svg = undefined;
      var arc = undefined;
      var scale = undefined;
      var ticks = undefined;
      var tickData = undefined;
      var pointer = undefined;

      var donut = d3.pie();

      function deg2rad(deg) {
        return deg * Math.PI / 180;
      }

      function newAngle(d) {
        var ratio = scale(d);
        var newAngle = config.minAngle + (ratio * range);
        return newAngle;
      }

      function configure(configuration) {
        var prop = undefined;
        for (prop in configuration) {
          config[prop] = configuration[prop];
        }

        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale this.gaugemap maps domain values to a percent from 0..1
        scale = d3.scaleLinear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        ticks = scale.ticks(config.majorTicks);
        tickData = d3.range(config.majorTicks).map(function () { return 1 / config.majorTicks; });

        arc = d3.arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle(function (d, i) {
            var ratio


            = d * i;
            return deg2rad(config.minAngle + (ratio * range));
          })
          .endAngle(function (d, i) {
            var ratio = d * (i + 1);
            return deg2rad(config.minAngle + (ratio * range));
          });
      }
      self.gaugemap.configure = configure;

      function centerTranslation() {
        return 'translate(' + r + ',' + r + ')';
      }

      function isRendered() {
        return (svg !== undefined);
      }
      self.gaugemap.isRendered = isRendered;

      function render(newValue) {
        svg = d3.select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', config.clipWidth)
          .attr('height', config.clipHeight);

        var centerTx = centerTranslation();

        var arcs = svg.append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);
          var colors = ['#d23d50','#f8bd19',  '#ee8d3c','#29ad00'];
        arcs.selectAll('path')
          .data(tickData)
          .enter().append('path')
          .attr('fill', function (d, i) {
            return colors[i]
          })
          .attr('d', arc);

        var lg = svg.append('g')
          .attr('class', 'label')
          .attr('transform', centerTx);
          lg.append("text").attr("dy", "1em").attr("dx", "-9em").attr("text-anchor", "left").text("Poor");
          lg.append("text").attr("dy", "-8em").attr("dx", "-8.5em").attr("text-anchor", "left").text("Average");
          lg.append("text").attr("dy", "-8em").attr("dx", "4.5em").attr("text-anchor", "left").text("Good");
          lg.append("text").attr("dy", "1em").attr("dx", "5.2em").attr("text-anchor", "left").text("Excellent");



        // lg.selectAll('text')
        //   .data(ticks)
        //   .enter().append('text')
          // .attr('transform', function (d) {
          //   var ratio = scale(d);
          //   var newAngle = config.minAngle + (ratio * range);
          //   // console.log(ratio,"akshay");
          //   // console.log(range,"akshay");
          //   // console.log(config.minAngle,"akshay");

          //   return 'rotate(' + newAngle + ') translate(0,' + (config.labelInset - r) + ')';
          // })
          // .text(config.labelFormat);

        var lineData = [[config.pointerWidth / 2, 0],
        [0, -pointerHeadLength],
        [-(config.pointerWidth / 2), 0],
        [0, config.pointerTailLength],
        [config.pointerWidth / 2, 0]];
        var pointerLine = d3.line().curve(d3.curveLinear)


        var needle = svg.append("g")



        var pg = needle.append('g').data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

        pointer = pg.append('path')
          .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/)
          // .attr('transform', 'rotate(' + config.minAngle + ')');
          .attr('fill', '#44c8f5');


        var circle = needle.append('g')
        .attr('class', 'circle')
        .attr('transform', "translate(166.942 305.996)");

          circle.append('path')
          .attr('d', "M3777.2,2050.719a6.751,6.751,0,1,1,5.97,7.45A6.751,6.751,0,0,1,3777.2,2050.719Z")
          .attr('transform', "translate(-3806 -2213)")//#039
          .attr('fill', '#039');
        update(newValue === undefined ? 0 : newValue);
      }
      self.gaugemap.render = render;
      function update(newValue, newConfiguration?) {
        if (newConfiguration !== undefined) {
          configure(newConfiguration);
        }
        var ratio = scale(newValue);
        var newAngle = config.minAngle + (ratio * range);
        pointer.transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', 'rotate(' + newAngle + ')');
      }
      self.gaugemap.update = update;

      configure(configuration);

      return self.gaugemap;
    };

    var powerGauge = gauge('#power-gauge', {
      size: 290,
      clipWidth: 280,
      clipHeight: 200,
      ringWidth: 50,
      maxValue: 10,
      transitionMs: 4000,
      // arcColorFn: d3.scale.quantize()
		  //             .domain([0, 0.2, 0.4, 0.6, 0.8, 1])
		  //             .range(['orange','red','green','blue', 'purple'])
    });
    powerGauge.render(this.creditScore/100);

  }
}
