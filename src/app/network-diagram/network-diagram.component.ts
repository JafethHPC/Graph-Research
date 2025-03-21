import {
  Component,
  AfterViewInit,
  HostListener,
  OnDestroy,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-network-diagram',
  standalone: true,
  templateUrl: './network-diagram.component.html',
  styleUrls: ['./network-diagram.component.css'],
})
export class NetworkDiagramComponent implements AfterViewInit, OnDestroy {
  private chart: any;

  ngAfterViewInit() {
    this.initChart();
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

  private initChart() {
    const chartDom = document.getElementById('chart') as HTMLElement;
    if (!chartDom) {
      console.error('Chart container #chart1 not found');
      return;
    }

    this.chart = echarts.init(chartDom);

    // Tree data for Portfolio, PDT, and TEAMS
    const treeData = {
      name: 'Portfolio',
      nodeType: 'portfolio',
      portfolioId: 'P001',
      portfolioName: 'Enterprise Solutions',
      type: 'Strategic',
      techMgr: 'John Doe',
      symbolSize: 150, // Larger size for Portfolio
      itemStyle: { color: '#1976D2' }, // Blue color
      label: {
        position: 'inside',
        color: '#FFFFFF',
        fontSize: 25,
      },
      children: [
        {
          name: 'PDT',
          nodeType: 'pdt',
          pdtId: 'PDT001',
          pdtName: 'Core Development',
          lead: 'Jane Smith',
          symbolSize: 100, // Larger size for PDT
          itemStyle: { color: '#E0E0E0' }, // Light gray
          label: {
            position: 'inside',
            color: '#000000',
            fontSize: 18,
          },
          children: [
            {
              name: 'TEAMS',
              nodeType: 'team',
              teamId: 'T001',
              teamName: 'Development Squad',
              manager: 'Alice Johnson',
              symbolSize: 80, // Larger size for TEAMS
              itemStyle: { color: '#E0E0E0' },
              label: {
                position: 'inside',
                color: '#000000',
                fontSize: 15,
              },
              children: [
                {
                  name: 'Team\nMember',
                  nodeType: 'contributor',
                  symbolSize: 80, // Larger size for TEAMS
                  itemStyle: {
                    color: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                  label: {
                    position: 'inside',
                    color: '#000000',
                    fontSize: 14,
                  },
                },
                {
                  name: 'AIT',
                  nodeType: 'contributor',
                  symbolSize: 80, // Larger size for TEAMS
                  itemStyle: {
                    color: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                  label: {
                    position: 'inside',
                    color: '#000000',
                    fontSize: 14,
                  },
                },
                {
                  name: 'Team\nBacklog',
                  nodeType: 'contributor',
                  symbolSize: 80, // Larger size for TEAMS
                  itemStyle: {
                    color: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                  label: {
                    position: 'inside',
                    color: '#000000',
                    fontSize: 14,
                  },
                },
                {
                  name: 'SPK',
                  nodeType: 'contributor',
                  symbolSize: 80, // Larger size for TEAMS
                  itemStyle: {
                    color: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                  },
                  label: {
                    position: 'inside',
                    color: '#000000',
                    fontSize: 14,
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    const option = {
      tooltip: {
        trigger: 'item',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 0,
        formatter: (params: { data: any }) => {
          const data = params.data;
          let content = '';
          if (data.nodeType === 'portfolio') {
            content = `
              <div style="background: #000000; color: #FFFFFF; padding: 10px; font-weight: bold; font-size: 14px;">Portfolio</div>
              <div style="padding: 10px; font-size: 12px; color: #000000; text-align: left;">
                Portfolio ID: ${data.portfolioId}<br>
                Portfolio Name: ${data.portfolioName}<br>
                Type: ${data.type}<br>
                Tech Mgr: ${data.techMgr}
              </div>
            `;
          } else if (data.nodeType === 'pdt') {
            content = `
              <div style="background: #000000; color: #FFFFFF; padding: 10px; font-weight: bold; font-size: 14px;">PDT</div>
              <div style="padding: 10px; font-size: 12px; color: #000000; text-align: left;">
                PDT ID: ${data.pdtId}<br>
                PDT Name: ${data.pdtName}<br>
                Lead: ${data.lead}
              </div>
            `;
          } else if (data.nodeType === 'team') {
            content = `
              <div style="background: #000000; color: #FFFFFF; padding: 10px; font-weight: bold; font-size: 14px;">Team Details</div>
              <div style="padding: 10px; font-size: 12px; color: #000000; text-align: left;">
                Team ID: ${data.teamId}<br>
                Team Name: ${data.teamName}<br>
                Manager: ${data.manager}
              </div>
            `;
          }
          return `<div style="background: #FFFFFF; border: 1px solid #000000; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${content}</div>`;
        },
      },
      series: [
        {
          type: 'tree',
          data: [treeData],
          layout: 'orthogonal',
          orient: 'vertical',
          symbol: 'circle',
          edgeShape: 'polyline',
          lineStyle: { color: '#B0BEC5', width: 1 },
          top: '15%',
          bottom: '30%',
          left: '20%',
          right: '20%',
          height: '500px',
          roam: false,
          initialTreeDepth: -1,
          animation: false,
        },
      ],
    };
    this.chart.setOption(option);
  }
}
