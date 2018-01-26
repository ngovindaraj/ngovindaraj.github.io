//dti,length_credit_history,addr_state,annual_inc,int_rate,loan_amount,risky_applicant
var dtiChart = dc.pieChart("#dti-chart");
var length_credit_historyChart = dc.pieChart("#length_credit_history-chart");
var addr_stateChart = dc.barChart("#addr_state-chart");
var annual_incChart = dc.pieChart("#annual_inc-chart");
var int_rateChart = dc.rowChart("#int_rate-chart");
var loan_amountChart = dc.rowChart("#loan_amount-chart");
var risky_applicantChart = dc.pieChart("#risky_applicant-chart");
var seriesChart = dc.seriesChart("#series-chart");

d3.csv("for_d3_loan.csv", function (error, csv) {
  var data = crossfilter(csv);
  var all = data.groupAll();

  // Formatting helpers
  var parseDate = d3.time.format('%Y');
  var numFormat = d3.format(",");

  // define the dimensions and groups to be used by the charts
  var dtis = data.dimension(function (d) { return d.dti; });
  var dtisCount = dtis.group().reduceCount(function(d) { return d.risky_applicant });
  var length_credit_historys = data.dimension(function (d) { return d.length_credit_history; });
  var length_credit_historysCount = length_credit_historys.group().reduceCount(function(d) { return d.risky_applicant; });
  var addr_states = data.dimension(function (d) { return d.addr_state; });
  var addr_statesCount = addr_states.group().reduceCount(function(d) { return d.risky_applicant; });
  var annual_incs = data.dimension(function (d) { return d.annual_inc; });
  var annual_incsCount = annual_incs.group().reduceCount(function(d) { return d.risky_applicant; });
  var int_rates = data.dimension(function (d) { return d.int_rate; });
  var int_ratesCount = int_rates.group().reduceCount(function(d) { return d.risky_applicant; });
  var loan_amounts = data.dimension(function (d) { return d.loan_amount; });
  var loan_amountsCount = loan_amounts.group().reduceCount(function(d) { return d.risky_applicant; });
  var risky_applicants = data.dimension(function (d) { return d.risky_applicant; });
  var risky_applicantsCount = risky_applicants.group().reduceCount(function(d) { return d.risky_applicant; });

  // tooltips
  var pieTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
      return "<strong>Frequency:</strong> <span style='color:red'>" + d.risky_applicant + "</span>"
      //return "<span style='color: #f0027f'>" +  d.data.key + "</span> : "  + parseInt(d.risky_applicant);
    });
  var barTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) { return "<span style='color: #c6dbef'>" + d.key + "</span> : " + numFormat(d.risky_applicant);});
  var seriesTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) { return "<span style='color: #c6dbef'>" + d.data.key[0] + " ("+ parseDate(d.data.key[1]) + ")" + "</span> : " + numFormat(d.data.risky_applicant);});
  var areaTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) { return "<span style='color: #c6dbef'>" + parseDate(d.data.key) + "</span> : " + numFormat(d.data.risky_applicant);});

  // the records count
  dc.dataCount("#data-count-top").dimension(data).group(all);

  // Configure charts
  dtiChart.width(200).height(200)
    .transitionDuration(1000)
    .radius(60).innerRadius(40)
    .dimension(dtis).group(dtisCount)
    .ordinalColors(["#92c5de","#2166ac"])
    .title(function () { return ""; })
    .legend(dc.legend().x(50).y(0))
    .renderLabel(false);

  length_credit_historyChart.width(200).height(200)
    .transitionDuration(1000)
    .radius(60).innerRadius(40)
    .dimension(length_credit_historys).group(length_credit_historysCount)
    .ordinalColors(["#92c5de","#2166ac"])
    .title(function () { return ""; })
    .legend(dc.legend().x(50).y(0))
    .renderLabel(false);

  addr_stateChart.width(800).height(260)
    .margins({top: 10, right: 40, bottom: 30, left: 120})
    .transitionDuration(1000)
    .dimension(addr_states).group(addr_statesCount)
    // .labelOffsetX([-8]).labelOffsetY([8])
    .x(d3.scale.ordinal().domain([
      "MI", "NJ", "CA", "MD", "PA", "NC", "TX", "GA", "NY", "FL", "IL", "OH", "VA"
        ]))
    .gap(6)
    .elasticY(true)
    .xUnits(dc.units.ordinal)
    .ordinalColors(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666","#49006a"])
    .title(function () { return ""; })
    .brushOn(false)
    .elasticX(true).xAxis().ticks(4);

  annual_incChart.width(200).height(200)
    .transitionDuration(1000)
    .radius(60).innerRadius(40)
    .dimension(annual_incs).group(annual_incsCount)
    .ordinalColors(["#92c5de","#2166ac"])
    .title(function () { return ""; })
    .legend(dc.legend().x(50).y(0))
    .renderLabel(false);

  int_rateChart.width(600).height(260)
    .margins({top: 10, right: 120, bottom: 30, left: 120}).transitionDuration(1000)
    .dimension(int_rates).group(int_ratesCount)
    .ordinalColors(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666","#49006a"])
    .labelOffsetX([-8]).labelOffsetY([8])
    .title(function () { return ""; })
    .elasticX(true)
    .xAxis().ticks(4);

  loan_amountChart.width(600).height(260)
    .margins({top: 10, right: 40, bottom: 30, left: 120})
    .transitionDuration(1000)
    .dimension(loan_amounts).group(loan_amountsCount)
    .ordinalColors(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666","#49006a"])
    .labelOffsetX([-8]).labelOffsetY([8])
    .title(function () { return ""; })
    .elasticX(true)
    .xAxis().ticks(4);

  risky_applicantChart.width(200).height(200)
    .transitionDuration(1000)
    .radius(60).innerRadius(40)
    .dimension(risky_applicants).group(risky_applicantsCount)
    .ordinalColors(["#92c5de","#2166ac"])
    .title(function () { return ""; })
    .legend(dc.legend().x(50).y(0))
    .renderLabel(false);

    seriesChart.width(0)
            .height(0)
            .margins({top: 0, right: 0, bottom: 0, left: 0})
            .transitionDuration(1000)
            .dimension(length_credit_historys)
            .group(risky_applicantsCount)
            .elasticY(true)
            .brushOn(false)
            .ordinalColors(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666","#49006a"])
            .x(d3.time.scale().domain([new Date(1983, 01, 01), new Date(2013, 12, 31)]))
            .chart(function(c) { return dc.lineChart(c).interpolate('basis'); })
            .seriesAccessor(function(d) {return d.key[0];})
            .keyAccessor(function(d) {return +d.key[1];})
            .valueAccessor(function(d) {return +d.value;})
            .xUnits(d3.time.years)
             .renderHorizontalGridLines(true)
            .filterPrinter(function (filters) {
                var filter = filters[0], s = "";
                var dateObj = new Date(filter[0]);
                s += (dateObj.getFullYear() + 1) + " - " + parseDate(filter[1]);
                return s;
            })
             .title(function () { return ""; })
             .legend(dc.legend().x(450).y(40).itemHeight(13).gap(5).horizontal(1).legendWidth(150).itemWidth(150))
             .yAxis().ticks(5);

  // the second record count
  dc.dataCount("#data-count-bottom").dimension(data).group(all);

  // the data table
  dc.dataTable(".dc-data-table")
    .dimension(dtis)
    .group(function (d) { return d.dti; })
    .size(170)
    .columns([
      function (d) { return d.dti; },
      function (d) { return d.length_credit_history; },
      function (d) { return d.addr_state; },
      function (d) { return d.annual_inc; },
      function (d) { return d.int_rate; },
      function (d) { return d.loan_amount; },
      function (d) { return d.risky_applicant; } ])
    .sortBy(function (d) {  return d.length_credit_history; })
    .order(d3.ascending)
    .renderlet(function (table) {
      table.selectAll(".dc-table-group").classed("info", true);
    });

  dc.renderAll();

  //set up the tool tips
//   d3.selectAll(".pie-slice").call(pieTip);
//   d3.selectAll(".pie-slice").on('mouseover', pieTip.show)
//     .on('mouseout', pieTip.hide);
//   d3.selectAll("g.row").call(barTip);
//   d3.selectAll("g.row").on('mouseover', barTip.show)
//     .on('mouseout', barTip.hide);
//   d3.selectAll("#series-chart circle.dot").call(seriesTip);
//   d3.selectAll("#series-chart circle.dot")
//     .on('mouseover.foo', seriesTip.show)
//     .on('mouseout.foo', seriesTip.hide);
});
