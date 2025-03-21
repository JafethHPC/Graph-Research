import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-world-map',
  standalone: true,
  template: `<div id="worldMap" style="width: 100%; height: 600px;"></div>`,
  styles: [],
})
export class WorldMapComponent implements AfterViewInit, OnDestroy {
  private chart: any;
  private worldJson: any;

  ngAfterViewInit() {
    this.loadMapData().then(() => this.initChart());
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.chart) {
      this.chart.resize();
    }
  }

  private async loadMapData() {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/naturalearth/naturalearthdata/master/geojson/ne_110m_admin_0_countries.geojson'
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
      }
      this.worldJson = await response.json();
      echarts.registerMap('world', this.worldJson);
    } catch (error) {
      console.error('Failed to load world map GeoJSON:', error);
    }
  }

  private initChart() {
    const chartDom = document.getElementById('worldMap') as HTMLElement;
    if (!chartDom) {
      console.error('Chart container #worldMap not found');
      return;
    }

    this.chart = echarts.init(chartDom);

    // If the GeoJSON failed to load, don't proceed
    if (!this.worldJson) {
      console.error('World map data not loaded');
      return;
    }

    // Team member data by city (replace with your actual data)
    const teamData = [
      {
        name: 'Chennai',
        value: [80.2707, 13.0827], // [longitude, latitude]
        teamMembers: [
          { name: 'Dinesh Shetye, Siddhi', role: 'Delivery Lead - Tech' },
          { name: 'Veerasamy, Tamilselvan', role: 'Software Engineer/Data' },
          { name: 'Rajitha, Sandamalla', role: 'Software Engineer/Data' },
          { name: 'Janakiraman, Karthikeyan', role: 'Product Owner' },
          { name: 'Pandian, Sadhana', role: 'Analyst' },
        ],
      },
      {
        name: 'Delhi',
        value: [77.1025, 28.7041],
        teamMembers: [{ name: 'Amit Sharma', role: 'Developer' }],
      },
      {
        name: 'Beijing',
        value: [116.4074, 39.9042],
        teamMembers: [{ name: 'Li Wei', role: 'Manager' }],
      },
      {
        name: 'Shanghai',
        value: [121.4737, 31.2304],
        teamMembers: [{ name: 'Zhang Min', role: 'Analyst' }],
      },
      {
        name: 'Sydney',
        value: [151.2093, -33.8688],
        teamMembers: [{ name: 'Emma Brown', role: 'Designer' }],
      },
      {
        name: 'Melbourne',
        value: [144.9631, -37.8136],
        teamMembers: [{ name: 'James Wilson', role: 'Developer' }],
      },
      {
        name: 'Latin America',
        value: [-60.0, -15.0],
        teamMembers: [{ name: 'Maria Gonzalez', role: 'Project Manager' }],
      },
      {
        name: 'Europe',
        value: [10.0, 50.0],
        teamMembers: [{ name: 'Sophie Müller', role: 'Analyst' }],
      },
    ];

    const option = {
      geo: {
        map: 'world',
        roam: false,
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: '#f0f0f0',
          borderColor: '#ccc',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: {
          name: string;
          data: { teamMembers: { name: string; role: string }[] };
        }) => {
          const city = params.name;
          const teamMembers = params.data.teamMembers;
          let content = `<div style="background: #000000; color: #FFFFFF; padding: 10px; font-weight: bold; font-size: 14px;">${city}</div>`;
          content +=
            '<div style="padding: 10px; font-size: 12px; color: #000000; text-align: left;">';
          teamMembers.forEach((member) => {
            content += `<div style="display: flex; align-items: center; margin-bottom: 5px;">
                         <span style="display: inline-block; width: 20px; height: 20px; background: url('https://via.placeholder.com/20') no-repeat center; background-size: cover; margin-right: 5px;"></span>
                         ${member.name}<br>${member.role}
                       </div>`;
          });
          content += '</div>';
          return `<div style="background: #FFFFFF; border: 1px solid #000000; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${content}</div>`;
        },
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: teamData,
          symbolSize: 10,
          itemStyle: {
            color: 'black',
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            color: '#000000',
            fontSize: 12,
          },
        },
      ],
    };

    this.chart.setOption(option);
    this.chart.resize();
  }
}
