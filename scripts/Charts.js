import React from 'react';
import {render} from 'react-dom';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import higchartsDrilldown from 'highcharts/modules/drilldown';
import LibraryStorage from "./LibraryStorage";

const data = LibraryStorage.DB.getChartData();
const defaultConfig = {
        title: {
            text: 'My Reading Progress'
        },
        xAxis: {
            type: 'category'
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: data.series,  
        drilldown: data.drilldown
};




class Chart extends React.Component {
  componentDidMount =  () => {
      if (this.props.modules) {
          this.props.modules.forEach(function (module) {
              module(Highcharts);
          });
      }

      this.chart = new Highcharts[this.props.type || "Chart"](
          this.props.container,
          this.props.options,
          this.props.modules
      );
  }

  componentWillUnmount =  () => {
      this.chart.destroy();
  }

  render() {
      return (<div  id ={this.props.container} ></div>);
  }
}

class Charts extends React.Component {
  render() {
    return(<Chart container='Chart' options={defaultConfig} modules={[higchartsDrilldown]} />);
  }
}

export default Charts;
