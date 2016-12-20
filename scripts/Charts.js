import React from 'react';
import {render} from 'react-dom';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import higchartsDrilldown from 'highcharts/modules/drilldown';
import LibraryStorage from "./LibraryStorage";
import BookListChart from "./BookListChart";
import Channel from "./Channel";
const defaultConfig = {
        chart: {
            type: 'column'
        },
        rangeSelector: {
            selected: 1
        },
        title: {
            text: 'My Reading Progress'
        },
        xAxis: {
            type: 'category'
        },

        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false
                },
                point: {
                    events: {
                        click:function (e) {
                          if (e.point.name != null)
                            Channel.emit('myBooklist.showBookListByMonth' , e.point.index);
                        }
                    }
                }
            }
        },
        series: [],
        drilldown: {}
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
  state = {
    config: {}
  }
  componentWillMount = () => {
    var data = LibraryStorage.DB.getChartData();
    this.setState({data: data});
    var config = defaultConfig;
    config.series = data.series;
    config.drilldown = data.drilldown;
    this.setState({config :config});
  }
  render() {
    return(
      <div>
        <BookListChart />
        <Chart container='Chart' options={this.state.config} modules={[higchartsDrilldown]} />
      </div>);
  }
}

export default Charts;
