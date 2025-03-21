import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-network-diagram2',
  standalone: true,
  templateUrl: './network-diagram2.component.html',
  styleUrls: ['./network-diagram2.component.css'],
})
export class NetworkDiagram2Component implements AfterViewInit, OnDestroy {
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
      console.error('Chart container #chart2 not found');
      return;
    }

    this.chart = echarts.init(chartDom);

    // Define nodes with fixed x, y coordinates
    const nodes = [
      // Center: AITs
      {
        name: 'AITs',
        x: 500,
        y: 300,
        symbolSize: 175,
        itemStyle: { color: '#1976D2' },
        label: { color: '#FFFFFF', fontSize: 30 },
        nodeType: 'aits',
        aitsName: 'JOMPAY-MY',
      },
      // Top-left quadrant
      {
        name: 'Products',
        x: 275,
        y: 400,
        symbolSize: 80,
        itemStyle: { color: '#E0E0E0' },
        label: { color: '#000000', fontSize: 14 },
      },
      {
        name: 'Value Stream',
        x: 350,
        y: 500,
        symbolSize: 80,
        itemStyle: { color: '#E0E0E0' },
        label: { color: '#000000', fontSize: 14 },
      },
      // Top-right quadrant
      {
        name: 'Portfolio Backlog',
        x: 750,
        y: 550,
        symbolSize: 80,
        itemStyle: { color: '#E0E0E0' },
        label: { color: '#000000', fontSize: 14 },
      },
      {
        name: 'PDT Backlog',
        x: 750,
        y: 400,
        symbolSize: 80,
        itemStyle: { color: '#E0E0E0' },
        label: { color: '#000000', fontSize: 14 },
      },
      // Bottom-right quadrant
      {
        name: 'Team Backlog',
        x: 675,
        y: 275,
        symbolSize: 80,
        itemStyle: { color: '#E0E0E0' },
        label: { color: '#000000', fontSize: 14 },
      },
      {
        name: 'Team SPK',
        x: 750,
        y: 125,
        symbolSize: 80,
        itemStyle: { color: '#E0E0E0' },
        label: { color: '#000000', fontSize: 14 },
      },
      // Bottom-left quadrant
      {
        name: 'Team',
        x: 550,
        y: 175,
        symbolSize: 80,
        itemStyle: { color: '#E0E0E0' },
        label: { color: '#000000', fontSize: 14 },
      },
      // Bottom-center (new PDT node)
      {
        name: 'PDT',
        x: 500,
        y: 500,
        symbolSize: 80,
        itemStyle: { color: '#E0E0E0' },
        label: { color: '#000000', fontSize: 14 },
      },
      {
        name: 'Portfolio',
        x: 600,
        y: 600,
        symbolSize: 80,
        itemStyle: { color: '#E0E0E0' },
        label: { color: '#000000', fontSize: 14 },
      },
    ];

    // Define links to match the mockup
    const links = [
      // AITs connections
      { source: 'AITs', target: 'Products' },
      { source: 'AITs', target: 'Team' },
      { source: 'AITs', target: 'PDT' },
      // Products to Value Stream
      { source: 'Products', target: 'Value Stream' },
      // Portfolio Backlog to PDT Backlog
      { source: 'Portfolio Backlog', target: 'PDT Backlog' },
      // Team connections
      { source: 'Team', target: 'Team Backlog' },
      { source: 'Team', target: 'Team SPK' },
      { source: 'Team Backlog', target: 'PDT Backlog' },
      // PDT connections (new)
      { source: 'PDT', target: 'Portfolio' },
      { source: 'PDT', target: 'PDT Backlog' },
      { source: 'Portfolio', target: 'Portfolio Backlog' },
      { source: 'PDT Backlog', target: 'Portfolio Backlog' },
    ];

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
          if (data.nodeType === 'aits') {
            content = `
              <div style="background: #000000; color: #FFFFFF; padding: 10px; font-weight: bold; font-size: 14px;">AITs</div>
              <div style="padding: 10px; font-size: 12px; color: #000000; text-align: left;">
                Name: ${data.aitsName}
              </div>
            `;
          } else {
            content = `
              <div style="padding: 10px; font-size: 12px; color: #000000; text-align: left;">
                ${data.name}
              </div>
            `;
          }
          return `<div style="background: #FFFFFF; border: 1px solid #000000; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${content}</div>`;
        },
      },
      series: [
        {
          type: 'graph',
          layout: 'none', // Use fixed positions
          nodes: nodes,
          links: links,
          categories: [{ name: 'AITs' }, { name: 'Other' }],
          roam: false,
          draggable: false,
          animation: false,
          label: {
            show: true,
            position: 'inside',
          },
          lineStyle: {
            color: '#B0BEC5',
            width: 1,
          },
          edgeSymbol: ['none', 'none'],
        },
      ],
    };

    this.chart.setOption(option);
  }
}
