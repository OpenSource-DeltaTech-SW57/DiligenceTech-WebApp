import { Component, ViewChild } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexLegend, ApexNonAxisChartSeries, ApexResponsive, ApexTooltip, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    responsive: ApexResponsive[];
    labels: any;
    tooltip: ApexTooltip;
    colors: string[];
};

@Component({
  selector: 'app-projects-progress',
  templateUrl: './projects-progress.component.html',
  styleUrl: './projects-progress.component.scss'
})

export class ProjectsProgressComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [60, 30, 10],
      chart: {
        height: 450,
        type: "donut"
      },
      labels: [
        "In Progress", "Not Started", "Completed"
      ],
      legend: {
        offsetY: 11,
        fontSize: "14px",
        position: "bottom",
        horizontalAlign: "center",
        labels: {
          colors: "#919aa3",
        },
        itemMargin: {
          horizontal: 12,
          vertical: 7
        }
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '14px'
        },
        dropShadow: {
          enabled: false
        }
      },
      colors: [
        "#00cae3", "#0e7aee", "#796df6"
      ],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + "%";
          }
        }
      }
    };
  }
}
